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
  const payload = {project:'Classical Apologetics for Lay Christians', exportedAt:new Date().toISOString(), state:progressState};
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
  if((e.key==='Enter'||e.key===' ') && e.target.matches('[data-open-quick]')){ e.preventDefault(); e.target.dataset.openQuick === 'step2' ? openStep2QuickReference() : openStep1QuickReference(); }
  if((e.key==='Enter'||e.key===' ') && e.target.matches('[data-open]')){ e.preventDefault(); openQuestion(e.target.dataset.open); }
  if(e.key==='Escape') closeModal();
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