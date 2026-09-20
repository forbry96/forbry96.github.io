function openQuestion(id){
  const q = byId(id); if(!q) return;
  const done = isComplete(q.id);
  const module = moduleForStudy(q.id);
  const bigIdea = q.bigIdea || memorableBigIdeas[q.id] || q.evidence?.claim || q.lesson?.heading || q.teaser;
  let html = `<p class="detail-kicker">${esc(module?.label || q.tag)} · Study ${String(q.id).padStart(2,'0')}</p><h2 id="modalTitle">${esc(q.title)}</h2><p class="wide-copy">${esc(q.teaser)}</p><div class="where-fit"><span>Where this fits</span><strong>${esc(module?.title || q.tag)}</strong><p>${esc(module?.description || '')}</p></div>`;
  if(q.thread) html += `<div class="thread-note"><span>THE THREAD</span><p>${esc(q.thread)}</p></div>`;

  html += `<section class="learning-phase big-idea-block"><div class="phase-badge">1</div><div><span class="lesson-kicker">THE IDEA</span><h3>${esc(bigIdea)}</h3><p>${esc(q.why)}</p></div></section>`;

  if(q.terms?.length){
    html += `<details class="terms-details"><summary><div><span class="lesson-kicker">KEY TERMS</span><strong>Open the words you need for this study</strong></div><span class="details-mark" aria-hidden="true">+</span></summary><div class="terms-grid">${q.terms.map(([term,definition])=>`<div class="term-item"><strong>${esc(term)}</strong><p>${esc(definition)}</p></div>`).join('')}</div></details>`;
  }

  html += `<section class="learning-phase evidence-teaching-block"><div class="phase-badge">2</div><div class="phase-content">`;
  if(q.id===4){
    html += `<span class="lesson-kicker">BUILD YOUR CASE</span><h3>Lay out the Kalam clearly</h3><ol class="steps evidence-steps">${q.core.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;
    if(q.lesson){
      html += `<div class="kalam-evidence-separator"><span class="lesson-kicker">THE EVIDENCE</span><h3>${esc(q.lesson.heading)}</h3>${q.lesson.body.split('\n').filter(Boolean).map(p=>p.startsWith('## ')?`<h5 class="lesson-subhead">${esc(p.slice(3))}</h5>`:`<p>${esc(p)}</p>`).join('')}</div><div class="fact-grid memory-facts">${q.lesson.facts.map((x,i)=>`<div class="fact"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(x)}</p></div>`).join('')}</div>`;
    }
  } else {
    html += `<span class="lesson-kicker">THE EVIDENCE</span><h3>Build the case</h3><ol class="steps evidence-steps">${q.core.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;
    if(q.lesson){
      html += `<div class="plain-explanation"><h4>${esc(q.lesson.heading)}</h4>${q.lesson.body.split('\n').filter(Boolean).map(p=>p.startsWith('## ')?`<h5 class="lesson-subhead">${esc(p.slice(3))}</h5>`:`<p>${esc(p)}</p>`).join('')}</div><div class="fact-grid memory-facts">${q.lesson.facts.map((x,i)=>`<div class="fact"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(x)}</p></div>`).join('')}</div>`;
    }
  }
  if(q.conclusion) html += `<div class="remember-box"><span>REMEMBER THIS</span><p>${esc(q.conclusion)}</p></div>`;
  if(q.synthesis) html += `<div class="synthesis-block"><div class="lesson-kicker">PUT IT TOGETHER</div><h3>${esc(q.synthesis.title)}</h3><p>${esc(q.synthesis.body)}</p>${q.synthesis.points?.length?`<ul>${q.synthesis.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</div>`;
  html += `</div></section>`;

  const checks = [
    {question:"What is this lesson actually claiming?", answer:bigIdea},
    ...(q.limits ? [{question:"What is one thing this lesson does not prove?", answer:q.limits}] : []),
    ...(q.pressure?.length ? [{question:`How would you answer this objection: ${q.pressure[0][0]}`, answer:q.pressure[0][1]}] : [])
  ].slice(0,3);

  if(checks.length){
    html += `<section class="comprehension-block active-check-block"><span class="lesson-kicker">QUICK COMPREHENSION CHECK</span><h3>Try it before you keep going.</h3><p class="retrieval-note">Answer from memory first. Then reveal a short answer and compare it with your own words.</p><div class="active-check-list">${checks.map((item,i)=>`<article class="active-check-item"><strong>${i+1}. ${esc(item.question)}</strong><textarea data-check-input="${i}" placeholder="Answer in your own words..."></textarea><button class="button light" type="button" data-check-reveal="${i}">Reveal answer</button><div class="check-answer" id="checkAnswer-${i}" hidden><span class="lesson-kicker">ONE GOOD ANSWER</span><p>${esc(item.answer)}</p></div></article>`).join('')}</div></section>`;
  }

  html += `<section class="learning-phase practice-phase"><div class="phase-badge">3</div><div class="phase-content"><span class="lesson-kicker">PRACTICE</span><h3>Use the idea in a real conversation</h3><div class="practice-box embedded-practice"><p><strong>${esc(q.practice)}</strong></p><textarea id="practiceInput" placeholder="Write your answer before checking the model..."></textarea><button class="button light practice-btn" id="revealModel">Show one model response</button><div id="modelHolder"></div></div></div></section>`;

  html += `<details class="challenges-details"><summary><div><span class="lesson-kicker">COMMON OBJECTIONS</span><strong>Open the main challenges and responses</strong></div><span class="details-mark" aria-hidden="true">+</span></summary><div class="challenges-body">${q.pressure.map(x=>`<div class="pressure"><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join('')}</div></details>`;
  if(q.limits) html += `<div class="limitations-note"><span>ONE LIMIT TO REMEMBER</span><p>${esc(q.limits)}</p></div>`;

  html += evidenceHtml(q);
  if(!q.evidence && q.sources?.length){
    html += `<div class="sources-in-card"><h3>Go deeper</h3><div class="source-line">${q.sources.map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener noreferrer">${esc(s[0])} ↗</a>`).join('')}</div></div>`;
  }

  html += `<div class="study-completion"><div><span class="about-label">PROGRESS</span><h3>${done?'Study completed':'Finished this study?'}</h3><p>${done?'You can mark it incomplete if you want to review it again as unfinished.':'Mark it complete when you can state the main idea, explain the evidence, and attempt the practice response.'}</p></div><button class="button ${done?'secondary':'primary'}" id="toggleComplete">${done?'Mark incomplete':'Mark study complete'}</button></div>`;
  const ordered = [...questions].sort((x,y)=>x.id-y.id);
  const currentIndex = ordered.findIndex(x=>x.id===q.id);
  const previous = currentIndex>0 ? ordered[currentIndex-1] : null;
  const next = currentIndex<ordered.length-1 ? ordered[currentIndex+1] : null;
  html += `<div class="next-links"><span class="question-tag next-label">Keep going</span>${previous?`<button data-open-next="${previous.id}">← Previous: ${esc(previous.title)}</button>`:''}${next?`<button data-open-next="${next.id}">Next: ${esc(next.title)} →</button>`:''}</div>`;
  showModal(html);
  document.querySelectorAll('[data-check-reveal]').forEach(button=>{
    button.onclick=()=>{
      const i=button.dataset.checkReveal;
      const holder=document.querySelector(`#checkAnswer-${i}`);
      if(!holder) return;
      holder.hidden=false;
      button.textContent='Answer revealed';
      button.disabled=true;
    };
  });
  document.querySelector('#revealModel').onclick = () => {
    const answer = document.querySelector('#practiceInput').value.trim();
    if(answer) markPracticed(q.id);
    document.querySelector('#modelHolder').innerHTML = `<div class="model"><h4>One possible response</h4><p>${esc(q.model)}</p>${answer?'':'<small>Write your own answer first if you want this question counted as practice.</small>'}</div>`;
  };
  document.querySelector('#toggleComplete').onclick = () => { toggleComplete(q.id); closeModal(); openQuestion(q.id); };
  document.querySelectorAll('[data-open-next]').forEach(btn=>btn.onclick=()=>{closeModal(); openQuestion(Number(btn.dataset.openNext));});
}

function openStep1QuickReference(){
  const r = step1QuickReference;
  const html = `<span class="question-tag">QUICK REFERENCE · NOT A LESSON</span><h2 id="modalTitle">${esc(r.title)}</h2><p class="modal-intro">${esc(r.intro)}</p><div class="quick-reference-list">${r.points.map(([title,body])=>`<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div><div class="remember-box"><span>THE SHORT VERSION</span><p>${esc(r.bottom)}</p></div><p class="microcopy">This page is for review only. It does not count toward course progress.</p>`;
  showModal(html);
}

function openStep2QuickReference(){
  const r = step2QuickReference;
  const html = `<span class="question-tag">QUICK REFERENCE · NOT A LESSON</span><h2 id="modalTitle">${esc(r.title)}</h2><p class="modal-intro">${esc(r.intro)}</p><div class="quick-reference-list">${r.points.map(([title,body])=>`<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div><div class="remember-box"><span>THE SHORT VERSION</span><p>${esc(r.bottom)}</p></div><p class="microcopy">This page is for review only. It does not count toward course progress.</p>`;
  showModal(html);
}

function showModal(html){
  document.querySelector('#modalBody').innerHTML = html;
  document.querySelector('#modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.querySelector('.modal-panel').scrollTop = 0;
}
function closeModal(){
  document.querySelector('#modal').classList.add('hidden');
  document.body.style.overflow = '';
}

let promptIndex = Math.floor(Math.random()*questions.length);

function renderPrompt(){
  const q = questions[promptIndex];
  document.querySelector('#promptCard').innerHTML = `<div class="prompt-meta">QUESTION ${String(q.id).padStart(2,'0')} · ${esc(q.tag)}</div><div class="prompt-objection">${esc(q.practice)}</div><textarea id="promptAnswer" placeholder="Write your response in your own words..."></textarea><div class="prompt-actions"><button class="button light" id="showPromptModel">Show model</button><button class="button" id="nextPrompt">Another question</button></div><div id="promptModel"></div>`;
  document.querySelector('#showPromptModel').onclick = () => {
    const answer = document.querySelector('#promptAnswer').value.trim();
    if(answer) markPracticed(q.id);
    document.querySelector('#promptModel').innerHTML = `<div class="model"><h4>One possible response</h4><p>${esc(q.model)}</p>${answer?'':'<small>Write your own answer first if you want this question counted as practice.</small>'}</div>`;
  };
  document.querySelector('#nextPrompt').onclick = () => { promptIndex=(promptIndex+1)%questions.length; renderPrompt(); };
}

const diagnosisLabels = {
  foundation: ['Foundation','Truth, reasoning, knowledge, or standards of evidence'],
  step1: ['Step 1 · Natural theology','Whether God exists or nature is all there is'],
  bridge: ['Bridge · Miracles','Whether divine action is possible in principle'],
  step2: ['Step 2 · Christian evidences','Jesus, resurrection, or Christianity specifically']
};
let diagnosisIndex = 0;
function renderDiagnosis(){
  const card = document.querySelector('#diagnoseCard');
  if(!card || !practiceScenarios.length) return;
  const scenario = practiceScenarios[diagnosisIndex % practiceScenarios.length];
  card.innerHTML = `<div class="diagnose-count">Scenario ${diagnosisIndex+1} of ${practiceScenarios.length}</div><blockquote>${esc(scenario.diagnose)}</blockquote><p class="practice-question">Where would you begin?</p><div class="diagnose-options">${Object.entries(diagnosisLabels).map(([key,v])=>`<button type="button" data-diagnose="${key}"><strong>${esc(v[0])}</strong><span>${esc(v[1])}</span></button>`).join('')}</div><div id="diagnoseFeedback" aria-live="polite"></div>`;
  card.querySelectorAll('[data-diagnose]').forEach(button=>button.addEventListener('click',()=>{
    const selected=button.dataset.diagnose;
    const correct=selected===scenario.entryKey;
    card.querySelectorAll('[data-diagnose]').forEach(b=>{ b.disabled=true; if(b.dataset.diagnose===scenario.entryKey) b.classList.add('choice-correct'); });
    if(!correct) button.classList.add('choice-missed');
    card.querySelector('#diagnoseFeedback').innerHTML=`<div class="practice-feedback ${correct?'strong':'mixed'}"><strong>${correct?'Good diagnosis.':'A better starting point:'}</strong><p>${esc(scenario.entry)}</p><button class="button light" type="button" id="nextDiagnosis">Next scenario</button></div>`;
    card.querySelector('#nextDiagnosis').onclick=()=>{ diagnosisIndex=(diagnosisIndex+1)%practiceScenarios.length; renderDiagnosis(); };
  }));
}

let currentScenario = null;
let currentNodeId = 'start';
let scenarioGrades = [];
function renderScenarioPicker(){
  const select=document.querySelector('#scenarioSelect');
  if(!select) return;
  select.innerHTML=practiceScenarios.map(s=>`<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('');
}
function renderConversationNode(){
  const box=document.querySelector('#conversationPractice');
  if(!box || !currentScenario) return;
  const node=currentScenario.nodes[currentNodeId];
  if(!node) return;
  if(node.end){
    const strong=scenarioGrades.filter(x=>x==='strong').length;
    const mixed=scenarioGrades.filter(x=>x==='mixed').length;
    const weak=scenarioGrades.filter(x=>x==='weak').length;
    const quality=weak===0 && strong>=mixed ? 'You kept the conversation focused.' : strong>weak ? 'You made several useful moves.' : 'This route exposed a common conversational trap.';
    box.innerHTML=`<div class="conversation-result"><span class="test-label">DEBRIEF</span><h4>${esc(quality)}</h4><p>${esc(node.summary)}</p><div class="route-summary"><span>Strong choices: <b>${strong}</b></span><span>Partial choices: <b>${mixed}</b></span><span>Common traps: <b>${weak}</b></span></div><p><strong>Best entry point:</strong> ${esc(currentScenario.entry)}</p><div class="prompt-actions"><button class="button light" type="button" id="restartScenario">Try this one again</button><button class="button" type="button" id="anotherScenario">Choose another scenario</button></div></div>`;
    box.querySelector('#restartScenario').onclick=()=>startScenario(currentScenario.id);
    box.querySelector('#anotherScenario').onclick=()=>{ box.innerHTML='<p class="practice-placeholder">Choose a scenario above and start when you are ready.</p>'; document.querySelector('#scenarioSelect').focus(); };
    return;
  }
  box.innerHTML=`<div class="conversation-turn"><span>${esc(node.speaker || 'Other person')}</span><p>${esc(node.text)}</p></div><div class="response-choices"><p class="practice-question">What would you say next?</p>${(node.options||[]).map((opt,i)=>`<button type="button" data-response-index="${i}">${esc(opt.text)}</button>`).join('')}</div>`;
  box.querySelectorAll('[data-response-index]').forEach(button=>button.addEventListener('click',()=>{
    const opt=node.options[Number(button.dataset.responseIndex)];
    scenarioGrades.push(opt.grade || 'mixed');
    currentNodeId=opt.next;
    renderConversationNode();
  }));
}
function startScenario(id){
  currentScenario=practiceScenarios.find(s=>s.id===id) || practiceScenarios[0];
  currentNodeId='start';
  scenarioGrades=[];
  renderConversationNode();
}
function setPracticeMode(mode){
  document.querySelectorAll('[data-practice-mode]').forEach(button=>{
    const active=button.dataset.practiceMode===mode;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',active?'true':'false');
  });
  document.querySelectorAll('[data-practice-panel]').forEach(panel=>{
    const active=panel.dataset.practicePanel===mode;
    panel.hidden=!active;
    panel.classList.toggle('active',active);
  });
}
