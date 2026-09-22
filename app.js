/* SITE FUNCTIONALITY
   Teaching material lives in content.js. This file handles rendering, progress,
   tests, practice, import/export, and modal behavior.
*/

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId = id => questions.find(q => q.id === Number(id));
const moduleForStudy = id => lessonModules.find(m => m.studyIds.includes(Number(id)));
const coreStudyIds = lessonModules.filter(m => m.core).flatMap(m => m.studyIds);
const bonusStudyIds = lessonModules.filter(m => !m.core).flatMap(m => m.studyIds);
const STORAGE_KEY = 'classicalApologeticsProgressV3';

const defaultState = () => ({
  version: 6,
  completed: [],
  practiced: [],
  pre: null,
  post: null
});

function normalizeState(raw){
  const base = defaultState();
  if(!raw || typeof raw !== 'object') return base;
  const ids = new Set(questions.map(q => q.id));
  const oldVersion = Number(raw.version || 0);
  const remapLegacyId = id => {
    id = Number(id);

    // v5 bonus numbering: 21 evil, 22 origins, 23 workshop.
    if(oldVersion === 5){
      if(id === 21) return 22;
      if(id === 22) return 23;
      if(id === 23) return 21;
    }

    // v4: 17 evil, 18 origins, 19 workshop.
    if(oldVersion === 4){
      if(id === 17) return 22;
      if(id === 18) return 23;
      if(id === 19) return 21;
    }

    // v3: 17 evil, 18 workshop.
    if(oldVersion === 3){
      if(id === 17) return 22;
      if(id === 18) return 21;
    }

    // Before v3, Study 17 was the conversation workshop.
    if(oldVersion < 3 && id === 17) return 21;
    return id;
  };
  base.completed = Array.isArray(raw.completed) ? [...new Set(raw.completed.map(remapLegacyId).filter(id => ids.has(id)))] : [];
  base.practiced = Array.isArray(raw.practiced) ? [...new Set(raw.practiced.map(remapLegacyId).filter(id => ids.has(id)))] : [];
  for(const type of ['pre','post']){
    const r = raw[type];
    if(r && Number.isFinite(Number(r.score)) && Number.isFinite(Number(r.total))){
      base[type] = {score:Number(r.score), total:Number(r.total), date:String(r.date || '')};
    }
  }
  return base;
}

function loadState(){
  try { return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); }
  catch { return defaultState(); }
}
let progressState = loadState();

function saveState(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState)); }
  catch { /* Site remains usable even if storage is unavailable. */ }
  renderProgress();
  renderQuestions();
}

function scoreLabel(result){
  if(!result) return 'Not taken';
  const pct = result.total ? Math.round((result.score/result.total)*100) : 0;
  return `${result.score}/${result.total} · ${pct}%`;
}

function renderProgress(){
  const coreDone = progressState.completed.filter(id => coreStudyIds.includes(id)).length;
  const bonusDone = progressState.completed.filter(id => bonusStudyIds.includes(id)).length;
  const totalCore = coreStudyIds.length;
  const pct = totalCore ? Math.round((coreDone/totalCore)*100) : 0;
  const count = document.querySelector('#progressCount');
  if(!count) return;
  count.textContent = `${coreDone} of ${totalCore} core studies complete`;
  document.querySelector('#progressPercent').textContent = `${pct}%`;
  document.querySelector('#progressFill').style.width = `${pct}%`;
  const coreLabel = document.querySelector('#coreProgress');
  const extraLabel = document.querySelector('#extraProgress');
  if(coreLabel) coreLabel.textContent = `Core path: ${coreDone}/${totalCore}`;
  if(extraLabel) extraLabel.textContent = `Bonus lessons: ${bonusDone}/${bonusStudyIds.length}`;
  document.querySelector('#preScore').textContent = scoreLabel(progressState.pre);
  document.querySelector('#postScore').textContent = scoreLabel(progressState.post);
  document.querySelector('#practiceScore').textContent = `${progressState.practiced.length} topic${progressState.practiced.length===1?'':'s'}`;
  document.querySelector('#startPreTest').textContent = progressState.pre ? 'Retake the optional pre-test' : 'Take the optional pre-test';
  document.querySelector('#startPostTest').textContent = progressState.post ? 'Retake the post-test' : 'Take the post-test';
  updateCourseActions();
}

function isComplete(id){ return progressState.completed.includes(Number(id)); }

function nextCourseStudyId(){
  const nextCore = coreStudyIds.find(id => !isComplete(id));
  if(nextCore) return nextCore;
  const nextBonus = bonusStudyIds.find(id => !isComplete(id));
  if(nextBonus) return nextBonus;
  return coreStudyIds[0] || questions[0]?.id || 1;
}

function updateCourseActions(){
  const id = nextCourseStudyId();
  const coreComplete = coreStudyIds.length > 0 && coreStudyIds.every(isComplete);
  const bonusComplete = bonusStudyIds.length > 0 && bonusStudyIds.every(isComplete);
  let label = `Continue with Study ${id}`;
  if(progressState.completed.length === 0) label = 'Start Study 1';
  else if(coreComplete && !bonusComplete) label = `Open Bonus Study ${id}`;
  else if(coreComplete && bonusComplete) label = 'Review Study 1';
  ['heroCourseAction','methodCourseAction'].forEach(key => {
    const button = document.querySelector(`#${key}`);
    if(!button) return;
    button.textContent = label;
    button.dataset.open = String(id);
    button.setAttribute('aria-label', `${label}: ${byId(id)?.title || ''}`.trim());
  });
}
function toggleComplete(id){
  id = Number(id);
  progressState.completed = isComplete(id)
    ? progressState.completed.filter(x => x !== id)
    : [...progressState.completed, id].sort((a,b)=>a-b);
  saveState();
}
function markPracticed(id){
  id = Number(id);
  if(!progressState.practiced.includes(id)){
    progressState.practiced = [...progressState.practiced, id].sort((a,b)=>a-b);
    saveState();
  }
}

function renderQuestions(){
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  if(!search || !category) return;
  const term = (search.value || '').trim().toLowerCase();
  const stage = category.value;
  const grid = document.querySelector('#questionGrid');

  const modules = lessonModules.filter(m => stage === 'all' || m.key === stage);
  const html = modules.map(module => {
    const items = module.studyIds.map(byId).filter(Boolean).filter(q => `${q.title} ${q.teaser} ${q.tag}`.toLowerCase().includes(term));
    if(!items.length) return '';
    const cards = items.map(q => {
      const done = isComplete(q.id);
      return `<article id="question-${q.id}" class="question-card${done?' completed':''}" data-open="${q.id}" tabindex="0" role="button" aria-label="Open study: ${esc(q.title)}">
        <div class="question-card-top"><span class="question-tag">Study ${String(q.id).padStart(2,'0')} · ${esc(module.shortLabel)} · ${esc(q.tag)}</span>${done?'<span class="complete-badge">✓ Complete</span>':''}</div>
        <h3>${esc(q.title)}</h3><p>${esc(q.teaser)}</p><div class="card-foot">Open study</div></article>`;
    }).join('');
    const groupGuide = module.groups?.length ? `<div class="module-subgroups">${module.groups.map(g=>`<span>${esc(g.title || g.label)}</span>`).join('')}</div>` : '';
    const first = items[0];
    const moduleDone = module.studyIds.filter(isComplete).length;
    const progressLabel = `${moduleDone}/${module.studyIds.length} complete`;
    const quickReference = !term && (module.key === 'step1' || module.key === 'step2') ? `<article class="question-card quick-reference-card" data-open-quick="${module.key}" tabindex="0" role="button" aria-label="Open ${module.key === 'step1' ? 'Step 1' : 'Step 2'} quick reference">
        <div class="question-card-top"><span class="question-tag">QUICK REFERENCE · NOT A LESSON</span></div>
        <h3>${module.key === 'step1' ? 'Step 1 in one minute: Why believe God exists?' : 'Step 2 in one minute: Has God spoken?'}</h3>
        <p>${module.key === 'step1' ? 'A short review of Studies 3–9 for quick reference before a conversation or after finishing the section.' : 'A short review of Studies 11–20 for quick reference before a conversation or after finishing the section.'}</p>
        <div class="card-foot">Open quick reference</div>
      </article>` : '';
    return `<section class="learning-module ${module.core?'core-module':'bonus-module'}" data-module="${esc(module.key)}">
      <div class="learning-module-head"><div><span class="module-label">${esc(module.label)}</span><h3>${esc(module.title)}</h3><p>${esc(module.description)}</p></div><div class="module-actions"><span class="module-count">${progressLabel}</span><button class="module-start" type="button" data-open="${first.id}">${module.key==='foundation'?'Start here':'Start this section'}</button></div></div>
      ${groupGuide}<div class="question-grid">${cards}</div>${quickReference}
    </section>`;
  }).join('');
  grid.innerHTML = html || '<p>No questions matched that search.</p>';
}

function renderSources(){
  document.querySelector('#sourceGrid').innerHTML = sourceItems.map(s => `<article class="source-card"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><a href="${esc(s[2])}" target="_blank" rel="noopener noreferrer">Open source</a></article>`).join('');
}

function renderOrientation(){
  const grid = document.querySelector('#orientationGrid');
  if(!grid) return;
  const items = [['definition','What is classical apologetics?'],['goal','What is this site for?'],['not','What is this site not?'],['engage','How should I engage in apologetics?']];
  grid.innerHTML = items.map(([key],i) => {
    const o = orientation[key];
    const links = o.sources?.length ? o.sources : [[o.sourceLabel,o.sourceUrl]];
    return `<article class="orientation-card"><div class="orientation-no">0${i+1}</div><h3>${esc(o.title)}</h3><p>${esc(o.body)}</p><ul>${o.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="orientation-sources"><span>Sources</span>${links.filter(s=>s&&s[0]&&s[1]).map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a>`).join('')}</div></article>`;
  }).join('');
}

function renderConversationTips(){
  const grid = document.querySelector('#conversationGrid');
  grid.innerHTML = conversationTips.map((tip,i) => `<article class="conversation-card"><span class="conversation-no">${String(i+1).padStart(2,'0')}</span><h3>${esc(tip.title)}</h3><p>${esc(tip.body)}</p>${tip.source?`<a href="${esc(tip.source[1])}" target="_blank" rel="noopener noreferrer">${esc(tip.source[0])}</a>`:''}</article>`).join('');
}

function renderAbout(){
  const grid = document.querySelector('#aboutGrid');
  if(!grid) return;
  const contactAction = contact.email
    ? `<div class="contact-actions"><a class="button primary" href="mailto:${esc(contact.email)}?subject=${encodeURIComponent(contact.subject || 'Question')}">Send an email</a><a class="contact-email" href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></div>`
    : `<p class="contact-pending">Contact information has not been published yet.</p>`;
  grid.innerHTML = `
    <article class="about-main"><span class="about-label">WHY I BUILT THIS SITE</span><h3>${esc(about.title)}</h3><p class="about-mission">${esc(about.mission)}</p></article>
    <article class="contact-card"><div><span class="about-label">CONTACT</span><h3>Questions, corrections, or source suggestions?</h3><p>Good apologetics should be willing to correct mistakes. Reach out with a factual correction, source recommendation, or question about the project.</p></div>${contactAction}</article>`;
}

function evidenceHtml(q){
  if(!q.evidence) return '';
  return `<details class="evidence-panel evidence-details"><summary><div><span class="lesson-kicker">GO DEEPER</span><strong>Open research notes and source links</strong></div><span class="details-mark" aria-hidden="true">+</span></summary><div class="evidence-details-body"><h3>${esc(q.evidence.claim)}</h3><div class="evidence-summary"><div><strong>What these sources support</strong><p>${esc(q.evidence.establishes)}</p></div></div><div class="evidence-list">${q.evidence.resources.map(r=>`<article class="evidence-card"><span class="evidence-type">${esc(r.type)}</span><h4>${esc(r.title)}</h4><p>${esc(r.why)}</p><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Open source</a></article>`).join('')}</div></div></details>`;
}

const memorableBigIdeas = {
  1: "An argument is only as strong as its reasons and the truth of its premises.",
  2: "We can know real things about the past without seeing them ourselves, if the evidence is strong enough.",
  3: "Dependent things point beyond themselves to an ultimate, non-dependent foundation of reality.",
  4: "If the universe began to exist, its cause cannot simply be another part of the universe.",
  5: "Order becomes evidence for design when intelligence explains the feature better than the alternatives.",
  6: "A life-permitting universe calls for an explanation, and design is one serious candidate.",
  7: "Life contains information and interdependent molecular systems that make intelligent design a live explanation.",
  8: "If moral duties are objectively binding, a personal and necessarily good God gives them a fitting foundation.",
  9: "A worldview must explain not only why we have beliefs, but why our reasoning can be trusted to reach truth.",
  10: "If God exists, miracles cannot be ruled out before the historical evidence is considered.",
  11: "The New Testament can be investigated as early historical testimony before inspiration is assumed.",
  12: "Before the resurrection can confirm Jesus, we need to know what Jesus claimed about himself.",
  13: "The resurrection case begins with a dead Jesus and a serious historical case for an empty tomb.",
  14: "The resurrection case is cumulative: one explanation should account for the whole pattern.",
  15: "The trilemma is strongest as a summary question after the evidence, not as a shortcut around it.",
  16: "The resurrection is God’s vindication of Jesus in the context of Jesus’ own claims.",
  17: "The resurrection establishes Jesus’ authority; Jesus’ authority then becomes the bridge to Scripture.",
  18: "We receive the Old Testament through the authority of the divinely vindicated Jesus.",
  19: "Jesus’ authority reaches the New Testament through the apostles he commissioned and the writings received as their witness.",
  20: "The destination of classical apologetics is not merely ‘God exists,’ but ‘the God who exists has spoken.’",
  21: "Good apologetics starts by finding the real point of disagreement before choosing an argument.",
  22: "The problem of evil raises both intellectual and personal questions, and those questions should not be confused.",
  23: "Origins evidence is interpreted inside larger worldviews, so observations, historical inferences, and assumptions must be kept distinct."
};


const evidenceTermAliases = {
  "Valid / Sound": ["valid", "sound", "soundness"],
  "Kalam cosmological argument": ["Kalam"],
  "Objective morality": ["objective moral"],
  "Moral duty": ["moral duties"],
  "Historical source": ["ancient sources", "historical sources"],
  "Inference to the best explanation": ["best explanation"],
  "Legend hypothesis": ["legendary development"],
  "Circular reasoning": ["circular"],
  "Authority of Scripture": ["Scripture’s authority"],
  "Apostolicity": ["apostolic"],
  "Revelation": ["revelation", "reveals"],
  "Divine inspiration": ["inspiration", "inspired"],
  "Cumulative argument": ["cumulative case"],
  "Point of disagreement": ["disagreement"],
  "Logical problem of evil": ["logical problem"],
  "Evidential problem of evil": ["evidential problem"],
  "Abiogenesis": ["origin of life"]
};

function evidenceAliasCandidates(term){
  const aliases = [term, ...(evidenceTermAliases[term] || [])];
  if(term.includes('/')) aliases.push(...term.split('/').map(x=>x.trim()).filter(Boolean));
  const words = term.trim().split(/\s+/);
  const last = words[words.length - 1];
  if(last && /^[A-Za-z]+$/.test(last)){
    const plural = last.endsWith('y') && !/[aeiou]y$/i.test(last)
      ? last.slice(0,-1) + 'ies'
      : last.endsWith('s') ? last : last + 's';
    if(plural !== last) aliases.push([...words.slice(0,-1), plural].join(' '));
  }
  return [...new Set(aliases)].sort((a,b)=>b.length-a.length);
}

function regexEscape(s){
  return String(s).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function weaveDefinitions(text, q, seen){
  let safe = esc(text);
  const replacements = [];

  for(const [term, definition] of (q.terms || [])){
    if(seen.has(term)) continue;
    for(const alias of evidenceAliasCandidates(term)){
      const escapedAlias = regexEscape(esc(alias));
      const re = new RegExp('(^|[^A-Za-z0-9])(' + escapedAlias + ')(?=$|[^A-Za-z0-9])', 'i');
      const m = safe.match(re);
      if(!m) continue;

      const token = '@@DEF' + replacements.length + '@@';
      const prefix = m[1] || '';
      const word = m[2];
      safe = safe.replace(re, prefix + token);
      replacements.push({
        token,
        html: '<dfn class="inline-term" tabindex="0"><span class="inline-term-word">' + word + '</span><span class="inline-term-definition" role="tooltip"><strong>' + esc(term) + '</strong>' + esc(definition) + '</span></dfn>'
      });
      seen.add(term);
      break;
    }
  }

  for(const item of replacements) safe = safe.replace(item.token, item.html);
  return safe;
}

function evidenceNarrativeHtml(q){
  const source = q.lesson?.body || (q.core || []).join('\n\n');
  const blocks = source.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  const seen = new Set();
  const paragraphs = blocks.map(block => {
    const lines = block.split('\n').map(line=>weaveDefinitions(line, q, seen));
    return '<p>' + lines.join('<br>') + '</p>';
  }).join('');

  const bottomLine = q.conclusion
    ? '<p class="evidence-bottom-line"><strong>Bottom line:</strong> ' + weaveDefinitions(q.conclusion, q, seen) + '</p>'
    : '';

  return '<div class="evidence-narrative">' + paragraphs + bottomLine + '</div>';
}
function openQuestion(id){
  const q = byId(id); if(!q) return;
  const done = isComplete(q.id);
  const module = moduleForStudy(q.id);
  const bigIdea = q.bigIdea || memorableBigIdeas[q.id] || q.evidence?.claim || q.lesson?.heading || q.teaser;
  let html = `<p class="detail-kicker">${esc(module?.label || q.tag)} · Study ${String(q.id).padStart(2,'0')}</p><h2 id="modalTitle">${esc(q.title)}</h2><p class="wide-copy">${esc(q.teaser)}</p><div class="where-fit"><span>Where this fits</span><strong>${esc(module?.title || q.tag)}</strong><p>${esc(module?.description || '')}</p></div>`;
  if(q.thread) html += `<div class="thread-note"><span>THE THREAD</span><p>${esc(q.thread)}</p></div>`;
  if(q.story?.lines?.length){
    html += `<section class="jordan-story"><div class="jordan-story-label">A WALK WITH JORDAN</div><h3>${esc(q.story.title || 'The conversation continues')}</h3><div class="jordan-story-copy">${q.story.lines.map(line=>`<p>${esc(line)}</p>`).join('')}</div></section>`;
  }

  html += `<section class="learning-phase big-idea-block"><div class="phase-badge">1</div><div><span class="lesson-kicker">THE IDEA</span><h3>${esc(bigIdea)}</h3><p>${esc(q.why)}</p></div></section>`;

  const evidenceHeading = q.lesson?.heading || 'Build the case';
  html += `<section class="learning-phase evidence-teaching-block simplified-evidence"><div class="phase-badge">2</div><div class="phase-content"><span class="lesson-kicker">THE EVIDENCE</span><h3>${esc(evidenceHeading)}</h3>${evidenceNarrativeHtml(q)}</div></section>`;
  const jordanResolution = (typeof jordanResolutions !== 'undefined' && jordanResolutions[q.id]) ? jordanResolutions[q.id] : q.resolution;
  if(jordanResolution?.lines?.length){
    html += `<section class="jordan-story jordan-resolution"><div class="jordan-story-label">BACK ON THE WALK</div><h3>${esc(jordanResolution.title || 'Jordan’s question answered')}</h3><div class="jordan-story-copy">${jordanResolution.lines.map(line=>`<p>${esc(line)}</p>`).join('')}</div></section>`;
  }

  html += `<section class="learning-phase practice-phase"><div class="phase-badge">3</div><div class="phase-content"><span class="lesson-kicker">PRACTICE · NEW SCENARIO</span><h3>Use what you learned in a different situation</h3><div class="practice-box embedded-practice"><p><strong>${esc(q.practice)}</strong></p><textarea id="practiceInput" placeholder="Write your answer before checking the model..."></textarea><button class="button light practice-btn" id="revealModel">Show one model response</button><div id="modelHolder"></div></div></div></section>`;

  html += `<details class="challenges-details"><summary><div><span class="lesson-kicker">COMMON OBJECTIONS</span><strong>Open the main challenges and responses</strong></div><span class="details-mark" aria-hidden="true">+</span></summary><div class="challenges-body">${q.pressure.map(x=>`<div class="pressure"><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join('')}</div></details>`;
  if(q.limits) html += `<div class="limitations-note"><span>KEEP THE CLAIM CLEAR</span><p>${esc(q.limits)}</p></div>`;

  html += evidenceHtml(q);
  if(!q.evidence && q.sources?.length){
    html += `<div class="sources-in-card"><h3>Go deeper</h3><div class="source-line">${q.sources.map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a>`).join('')}</div></div>`;
  }

  html += `<div class="study-completion"><div><span class="about-label">PROGRESS</span><h3>${done?'Study completed':'Finished this study?'}</h3><p>${done?'You can mark it incomplete if you want to review it again as unfinished.':'Mark it complete when you can state the main idea, explain the evidence, and attempt the practice response.'}</p></div><button class="button ${done?'secondary':'primary'}" id="toggleComplete">${done?'Mark incomplete':'Mark study complete'}</button></div>`;
  const courseOrderIds = lessonModules.flatMap(m => m.studyIds);
  const ordered = courseOrderIds.map(byId).filter(Boolean);
  const currentIndex = ordered.findIndex(x=>x.id===q.id);
  const previous = currentIndex>0 ? ordered[currentIndex-1] : null;
  const next = currentIndex<ordered.length-1 ? ordered[currentIndex+1] : null;
  html += `<div class="next-links"><span class="question-tag next-label">Keep going</span>${previous?`<button data-open-next="${previous.id}"> Previous: ${esc(previous.title)}</button>`:''}${next?`<button data-open-next="${next.id}">Next: ${esc(next.title)} </button>`:''}</div>`;
  html = `<button class="lesson-back" id="lessonBack" type="button">Back to course</button>${html}`;
  showModal(html, 'lesson');
  document.querySelector('#lessonBack').onclick = closeModal;
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

let lastFocusedBeforeModal = null;
function showModal(html, mode='default'){
  lastFocusedBeforeModal = document.activeElement;
  document.querySelector('#modalBody').innerHTML = html;
  const modal = document.querySelector('#modal');
  modal.classList.toggle('lesson-mode', mode==='lesson');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.querySelector('.modal-panel').scrollTop = 0;
  requestAnimationFrame(()=>{
    const first = mode==='lesson' ? document.querySelector('#lessonBack') : document.querySelector('#closeModal');
    first?.focus();
  });
}
function closeModal(){
  const modal = document.querySelector('#modal');
  if(modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.classList.remove('lesson-mode');
  document.body.style.overflow = '';
  if(lastFocusedBeforeModal && document.contains(lastFocusedBeforeModal)) lastFocusedBeforeModal.focus();
  lastFocusedBeforeModal = null;
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
  step2: ['Step 2 · Christian evidences','Jesus, resurrection, Scripture, or Christianity specifically']
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

function renderTest(type){
  const title = type === 'pre' ? 'Diagnostic pre-test' : 'Post-test';
  const intro = type === 'pre'
    ? 'This is a baseline, not a grade. Answer what you know before working through the studies.'
    : 'Use this after working through the material. The questions cover the same skills with different wording.';
  const items = tests[type];
  const form = items.map((item,i)=>`<fieldset class="test-question"><legend><span>${String(i+1).padStart(2,'0')}</span>${esc(item.q)}</legend>${item.opts.map((opt,j)=>`<label><input type="radio" name="test-${i}" value="${j}"><span>${esc(opt)}</span></label>`).join('')}</fieldset>`).join('');
  showModal(`<p class="detail-kicker">TEST YOURSELF</p><h2 id="modalTitle">${title}</h2><p class="wide-copy">${intro}</p><form id="testForm" class="test-form">${form}<button class="button primary" type="submit">Score my test</button></form><div id="testResults"></div>`);
  document.querySelector('#testForm').onsubmit = e => {
    e.preventDefault();
    let score = 0;
    const review = items.map((item,i)=>{
      const picked = document.querySelector(`input[name="test-${i}"]:checked`);
      const selected = picked ? Number(picked.value) : null;
      const correct = selected === item.a;
      if(correct) score++;
      return `<div class="test-review ${correct?'right':'wrong'}"><strong>${correct?'✓':'×'} ${esc(item.q)}</strong><p>${selected===null?'No answer selected. ':''}Correct answer: ${esc(item.opts[item.a])}</p>${item.exp?`<p class="test-explanation">${esc(item.exp)}</p>`:''}</div>`;
    }).join('');
    progressState[type] = {score, total:items.length, date:new Date().toISOString()};
    saveState();
    const pct = Math.round((score/items.length)*100);
    document.querySelector('#testForm').remove();
    document.querySelector('#testResults').innerHTML = `<div class="test-score"><span>${type==='pre'?'Baseline':'Result'}</span><strong>${score}/${items.length}</strong><b>${pct}%</b><p>${type==='pre'?'This is your baseline. Work through the studies and take the post-test when you are ready.':'Compare this with your pre-test. If a topic is still shaky, go back to that study and try it again.'}</p></div><details class="test-review-wrap"><summary>Review answers</summary>${review}</details>`;
    document.querySelector('.modal-panel').scrollTop = 0;
  };
}

function exportProgress(){
  const payload = {project:'Classical Apologetics for Everyday', exportedAt:new Date().toISOString(), state:progressState};
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `apologetics-progress-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

function importProgress(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      progressState = normalizeState(parsed.state || parsed);
      saveState();
      alert('Progress imported.');
    } catch {
      alert('I could not read that file. Choose a progress backup that was exported from this site.');
    }
  };
  reader.readAsText(file);
}

function resetProgress(){
  if(!confirm('Clear all saved study completion, practice, and test scores from this browser?')) return;
  progressState = defaultState();
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  saveState();
}

// Search/filter and study cards
document.querySelector('#search').addEventListener('input', renderQuestions);
document.querySelector('#category').addEventListener('change', renderQuestions);

// Practice lab
document.querySelectorAll('[data-practice-mode]').forEach(button=>button.addEventListener('click',()=>setPracticeMode(button.dataset.practiceMode)));
document.querySelector('#randomPrompt').onclick = () => { promptIndex=Math.floor(Math.random()*questions.length); renderPrompt(); };
document.querySelector('#startScenario').onclick = () => startScenario(document.querySelector('#scenarioSelect').value);

// Tests and progress
document.querySelector('#startPreTest').onclick = () => renderTest('pre');
document.querySelector('#startPostTest').onclick = () => renderTest('post');
document.querySelector('#exportProgress').onclick = exportProgress;
document.querySelector('#importProgressButton').onclick = () => document.querySelector('#importProgressFile').click();
document.querySelector('#importProgressFile').addEventListener('change', e => { importProgress(e.target.files[0]); e.target.value=''; });
document.querySelector('#resetProgress').onclick = resetProgress;

// Navigation and modal
document.querySelector('#navToggle').onclick = () => {
  const nav = document.querySelector('.desktop-nav');
  nav.classList.toggle('open');
  document.querySelector('#navToggle').setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
};
document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('.desktop-nav').classList.remove('open');
  document.querySelector('#navToggle').setAttribute('aria-expanded','false');
}));
document.addEventListener('click', e => {
  const quick=e.target.closest('[data-open-quick]');
  if(quick) quick.dataset.openQuick === 'step2' ? openStep2QuickReference() : openStep1QuickReference();
  const c=e.target.closest('[data-open]');
  if(c) openQuestion(c.dataset.open);
  if(e.target.dataset.close) closeModal();
});
document.addEventListener('keydown', e => {
  const modal = document.querySelector('#modal');
  const modalOpen = !modal.classList.contains('hidden');
  if(modalOpen && e.key==='Tab'){
    const focusable = [...modal.querySelectorAll('a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')]
      .filter(el=>el.offsetParent!==null);
    if(focusable.length){
      const first=focusable[0], last=focusable[focusable.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  }
  if(!modalOpen && (e.key==='Enter'||e.key===' ') && e.target.matches('[data-open-quick]')){ e.preventDefault(); e.target.dataset.openQuick === 'step2' ? openStep2QuickReference() : openStep1QuickReference(); }
  if(!modalOpen && (e.key==='Enter'||e.key===' ') && e.target.matches('[data-open]')){ e.preventDefault(); openQuestion(e.target.dataset.open); }
  if(modalOpen && e.key==='Escape') closeModal();
});
document.querySelector('#closeModal').onclick = closeModal;

// Initial render
renderQuestions();
renderSources();
renderPrompt();
renderDiagnosis();
renderScenarioPicker();
renderConversationTips();
renderAbout();
renderProgress();
