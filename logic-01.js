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
  version: 5,
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
    // Preserve progress from earlier course layouts as the core path expands in v5.
    if(oldVersion < 3 && id === 17) return 23; // original workshop
    if(oldVersion < 4 && id === 18) return 23; // workshop in v3
    if(oldVersion < 5 && id === 17) return 21; // problem of evil in v4
    if(oldVersion < 5 && id === 18) return 22; // origins in v4
    if(oldVersion < 5 && id === 19) return 23; // workshop in v4
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
  document.querySelector('#startPreTest').textContent = progressState.pre ? 'Retake the pre-test' : 'Take the pre-test';
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
  ['heroCourseAction','methodCourseAction','closingCourseAction'].forEach(key => {
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
