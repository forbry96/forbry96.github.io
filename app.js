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
  version: 7,
  completed: [],
  practiced: [],
  pre: null,
  post: null,
  step1Checkpoint: null
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
  const step1 = raw.step1Checkpoint;
  if(step1 && Number.isFinite(Number(step1.score)) && Number.isFinite(Number(step1.total))){
    base.step1Checkpoint = {score:Number(step1.score), total:Number(step1.total), date:String(step1.date || '')};
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
  const step1Score = document.querySelector('#step1Score');
  if(step1Score) step1Score.textContent = scoreLabel(progressState.step1Checkpoint);
  document.querySelector('#practiceScore').textContent = `${progressState.practiced.length} topic${progressState.practiced.length===1?'':'s'}`;
  document.querySelector('#startPreTest').textContent = progressState.pre ? 'Retake the pre-test' : 'Take the pre-test';
  ['heroPreTest','methodPreTest'].forEach(id => {
    const button = document.querySelector('#'+id);
    if(button) button.textContent = progressState.pre ? 'Retake the pre-test' : 'Take the pre-test';
  });
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

const studySearchAliases = {
  1: "logic argument premise conclusion valid sound reasoning disagreement",
  2: "truth certainty know knowledge evidence true for you relative relativism",
  3: "creator self creator own creator self-created self created universe created itself universe cause itself brute fact does not need a creator doesn’t need a creator does not need creator universe does not need creator need a creator necessary being contingent dependent why something rather than nothing",
  4: "universe beginning cause big bang first cause who caused god creator kalam",
  5: "design designer watch purpose order teleological",
  6: "fine tuning fine-tuning constants multiverse life permitting universe",
  7: "dna information cell molecular machine irreducible complexity evolution design",
  8: "morality moral objective right wrong good evil atheists moral",
  9: "reason mind brain naturalism evolution trust thinking logic",
  10: "miracle miracles possible dead people resurrection hume supernatural",
  11: "bible reliable reliability manuscripts historical source eyewitness new testament",
  12: "jesus god deity son of man son of god claims",
  13: "jesus died crucifixion burial empty tomb swoon survived crucifixion",
  14: "resurrection appearances hallucination conspiracy legend paul james risen",
  15: "liar lunatic lord great teacher legend trilemma",
  16: "resurrection vindication what does resurrection mean jesus authority",
  17: "jesus authority teaching trust scripture circular",
  18: "old testament scripture jesus bible authority canon",
  19: "new testament canon council nicaea apostles apostolic 2 peter church chose bible church chose the bible church made the bible who picked the books",
  20: "god spoken scripture inspiration revelation whole case",
  21: "conversation talk skeptic objection questions columbo apologetics practice",
  22: "evil suffering problem evil free will pain tragedy why god allows evil why is there suffering why does god allow suffering why bad things happen",
  23: "evolution darwin common ancestry common descent creation creator dna naturalism abiogenesis origins"
};

const studySlugs = {
  1: "how-do-arguments-actually-work",
  2: "how-can-we-know-something-is-true",
  3: "why-is-there-something-rather-than-nothing",
  4: "did-the-universe-begin-to-exist",
  5: "does-design-point-to-a-designer",
  6: "why-is-the-universe-life-permitting",
  7: "does-the-information-and-machinery-of-life-point-to-design",
  8: "if-right-and-wrong-are-real-what-makes-them-real",
  9: "why-can-we-trust-reason",
  10: "if-god-exists-are-miracles-possible",
  11: "can-we-investigate-jesus-historically",
  12: "who-did-jesus-claim-to-be",
  13: "did-jesus-really-die-and-was-the-tomb-empty",
  14: "did-jesus-rise-from-the-dead",
  15: "liar-lunatic-or-lord",
  16: "what-does-the-resurrection-say-about-jesus",
  17: "how-did-jesus-treat-the-old-testament",
  18: "did-jesus-authorize-apostles-to-speak-for-him",
  19: "what-about-the-new-testament",
  20: "so-has-god-spoken",
  21: "where-should-i-begin-in-a-real-apologetics-conversation",
  22: "if-god-is-good-and-powerful-why-is-there-so-much-evil-and-suffering",
  23: "how-should-a-christian-think-about-creation-evolution-and-worldview"
};
function studyDirectPath(id){
  const slug = studySlugs[Number(id)];
  return slug ? `/studies/${slug}/` : '/';
}

function studySearchText(q){
  const objectionText=(q.pressure||[]).flat().join(' ');
  const terms=(q.terms||[]).flat().join(' ');
  const core=(q.core||[]).join(' ');
  return [
    q.title,q.teaser,q.tag,q.why,q.lesson?.heading,q.lesson?.body,q.conclusion,
    q.practice,q.model,objectionText,(q.conversationTips||[]).join(' '),terms,core,studySearchAliases[q.id]||''
  ].filter(Boolean).join(' ').toLowerCase();
}

function renderQuestions(){
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  if(!search || !category) return;
  const term = (search.value || '').trim().toLowerCase();
  const stage = category.value;
  const grid = document.querySelector('#questionGrid');

  const renderCard = (q, module) => {
    const done = isComplete(q.id);
    return `<article id="question-${q.id}" class="question-card${done?' completed':''}" data-open="${q.id}" tabindex="0" role="button" aria-label="Open study: ${esc(q.title)}">
      <div class="question-card-top"><span class="question-tag">Study ${String(q.id).padStart(2,'0')} · ${esc(module.shortLabel)} · ${esc(q.tag)}</span>${done?'<span class="complete-badge">✓ Complete</span>':''}</div>
      <h3>${esc(q.title)}</h3><p>${esc(q.teaser)}</p><div class="card-foot with-direct-link"><span>Open study</span><a class="card-direct-link" href="${esc(studyDirectPath(q.id))}" target="_blank" rel="noopener noreferrer" aria-label="Open shareable lesson page in a new tab: ${esc(q.title)}">Share this lesson</a></div></article>`;
  };
  const modules = lessonModules.filter(m => stage === 'all' || m.key === stage);
  const html = modules.map(module => {
    const groups = module.groups || [];
    const matches = q => studySearchText(q).includes(term) ||
      groups.some(g => (g.studyIds || []).includes(q.id) && (g.title + ' ' + (g.description || '')).toLowerCase().includes(term));
    const items = module.studyIds.map(byId).filter(Boolean).filter(matches);
    if(!items.length) return '';
    const sectionContent = groups.length ? groups.map((group, i) => {
      const groupItems = items.filter(q => group.studyIds.includes(q.id));
      if(!groupItems.length) return '';
      const headingId = 'subquestion-' + module.key + '-' + (i + 1);
      const range = 'Studies ' + group.studyIds[0] + '–' + group.studyIds[group.studyIds.length - 1];
      return `<section class="study-subgroup" aria-labelledby="${headingId}">
        <div class="study-subgroup-head"><div class="study-subgroup-meta">Question ${i + 1} of ${groups.length} · ${range}</div>
        <h4 id="${headingId}">${esc(group.title)}</h4><p>${esc(group.description || '')}</p></div>
        <div class="question-grid">${groupItems.map(q => renderCard(q, module)).join('')}</div>
      </section>`;
    }).join('') : `<div class="question-grid">${items.map(q => renderCard(q, module)).join('')}</div>`;
    const first = items[0];
    const moduleDone = module.studyIds.filter(isComplete).length;
    const progressLabel = `${moduleDone}/${module.studyIds.length} complete`;
    const quickReference = !term && (module.key === 'step1' || module.key === 'step2') ? `<article class="question-card quick-reference-card" data-open-quick="${module.key}" tabindex="0" role="button" aria-label="Open ${module.key === 'step1' ? 'Step 1' : 'Step 2'} quick reference">
        <div class="question-card-top"><span class="question-tag">${module.key === 'step1' ? 'CHECKPOINT · NOT A LESSON' : 'QUICK REFERENCE · NOT A LESSON'}</span></div>
        <h3>${module.key === 'step1' ? 'Step 1 Review + Checkpoint' : 'Step 2 in one minute: Has God spoken?'}</h3>
        <p>${module.key === 'step1' ? 'See how Studies 3–9 fit together, check your understanding, and try one cumulative conversation challenge.' : 'A short review of Studies 11–20 for quick reference before a conversation or after finishing the section.'}</p>
        <div class="card-foot">${module.key === 'step1' ? 'Open review + checkpoint' : 'Open quick reference'}</div>
      </article>` : '';
    return `<section class="learning-module ${module.core?'core-module':'bonus-module'}" data-module="${esc(module.key)}">
      <div class="learning-module-head"><div><span class="module-label">${esc(module.label)}</span><h3>${esc(module.title)}</h3><p>${esc(module.description)}</p></div><div class="module-actions"><span class="module-count">${progressLabel}</span><button class="module-start" type="button" data-open="${first.id}">${module.key==='foundation'?'Start here':'Start this section'}</button></div></div>
      ${sectionContent}${quickReference}
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
    <article class="about-main"><div class="about-brand"><img src="/lca-logo.svg?v=20261001-1" alt="" width="60" height="60" aria-hidden="true"><span class="about-label">WHY I BUILT THIS SITE</span></div><h3>${esc(about.title)}</h3><div class="about-mission">${String(about.mission || '').split(/\n\s*\n/).map(p=>`<p>${esc(p)}</p>`).join('')}</div></article>
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
  6: "The universe has the conditions needed for complex life. Design offers an explanation worth comparing with chance and necessity.",
  7: "The information in DNA and the machinery inside cells give us positive reasons to consider a Designer.",
  8: "If moral duties are objectively binding, a personal and necessarily good God gives them a fitting foundation.",
  9: "A worldview must explain not only why we have beliefs, but why our reasoning can be trusted to reach truth.",
  10: "If God exists, miracles cannot be ruled out before the historical evidence is considered.",
  11: "The New Testament can be investigated as early historical testimony before inspiration is assumed.",
  12: "Before the resurrection can confirm Jesus, we need to know what Jesus claimed about himself.",
  13: "The resurrection case begins with Jesus’ real death, the burial accounts, and the evidence concerning the empty tomb.",
  14: "The resurrection case is cumulative: one explanation should account for the whole pattern.",
  15: "Jesus’ claims cannot be set aside as those of just a good teacher; the resurrection gives us reason to take them seriously.",
  16: "The resurrection is God’s vindication of Jesus in the context of Jesus’ own claims.",
  17: "The resurrection establishes Jesus’ authority; Jesus’ authority then becomes the bridge to Scripture.",
  18: "We receive the Old Testament through the authority of the divinely vindicated Jesus.",
  19: "Jesus’ authority reaches the New Testament through the apostles he commissioned and the writings received as their witness.",
  20: "The destination of classical apologetics is not merely ‘God exists,’ but ‘the God who exists has spoken.’",
  21: "Good apologetics starts by finding the real point of disagreement before choosing an argument.",
  22: "The problem of evil raises both intellectual and personal questions, and those questions should not be confused.",
  23: "Origins evidence is interpreted inside larger worldviews, so observations, historical inferences, and assumptions must be kept distinct."
};


const thinkAboutChecks = {
  "1": {
    "q": "What is the difference between a possible alternative and a good alternative in a historical argument?",
    "a": "A possible alternative only shows that we can imagine something else happening. A good alternative still needs evidence, and it has to explain the facts at least as well as the explanation it is trying to replace."
  },
  "2": {
    "q": "Why can testimony count as evidence even when you did not see the event yourself?",
    "a": "Because we can reasonably learn from people who were in a position to know what happened and who have reason to be trusted. We use testimony all the time. The question is not whether it is testimony, but how good the testimony is."
  },
  "3": {
    "q": "Why would an eternal universe not automatically be a necessary universe?",
    "a": "Because eternal and necessary are different ideas. Something could exist without a first moment and still depend on conditions beyond itself. The contingency argument is asking whether the universe exists in and of itself, not simply how long it has existed."
  },
  "4": {
    "q": "If the Kalam says the universe needs a cause, why does it not also say God needs a cause?",
    "a": "Because the argument does not say everything needs a cause. It says whatever begins to exist has a cause. If the universe began to exist, then it needs a cause. The cause being argued for is not another thing that began inside the physical universe, so asking “Who caused God?” changes the first premise of the argument."
  },
  "5": {
    "q": "Why would a complicated pile of rocks not count as evidence of design just because it is complicated?",
    "a": "Because complexity by itself is not the point. The stronger clue is when parts are arranged in a specific way to accomplish something. The design argument is interested in functionally organized patterns, not just things that have a lot of pieces."
  },
  "6": {
    "q": "Why does saying, “Of course we observe a life-permitting universe, because otherwise we would not be here,” not fully explain fine-tuning?",
    "a": "It explains why we should not be surprised to find ourselves in a life-permitting universe once one exists. It does not explain why life-permitting conditions exist in the first place. That is still the question the fine-tuning argument is asking."
  },
  "7": {
    "q": "If one part of a biological system had another use before becoming part of the system, why would that not by itself explain how the whole system arose?",
    "a": "Because having a possible earlier use for one part still leaves the larger problem. The parts have to be produced, changed where necessary, regulated, assembled, and coordinated into a working system, with useful steps along the way."
  },
  "8": {
    "q": "If atheists can be kind and moral people, does that answer the moral argument?",
    "a": "No. The moral argument is not saying atheists cannot know right from wrong or live good lives. It is asking what makes right and wrong objectively real in the first place and why those moral duties actually apply to us."
  },
  "9": {
    "q": "What is the difference between explaining what caused a thought and explaining why the thought is reasonable?",
    "a": "Brain activity may explain how the thought happened. It does not tell us whether the thought is true or whether the conclusion follows from good reasons. Those are questions about logic, evidence, and truth."
  },
  "10": {
    "q": "Why does the regularity of nature not by itself show that God could never act in the world?",
    "a": "The regular patterns of nature tell us how nature normally behaves. They do not show that a Creator, if one exists, is unable to act in the world He made. That is a separate question."
  },
  "11": {
    "q": "Why is recovering what an ancient document said different from proving that the events in it happened?",
    "a": "Textual evidence can give us good reason to know what the author wrote. Historical evidence asks a second question: whether what the author wrote about the past is true. A well-preserved text gives us something reliable to investigate, but it does not make every claim in the text true automatically."
  },
  "12": {
    "q": "Why is asking, “Did Jesus ever say the exact words ‘I am God’?” too narrow?",
    "a": "Because people make claims about themselves in more ways than one exact sentence. We have to look at Jesus’ words, actions, titles, claimed authority, and the roles He takes for Himself. The case is cumulative rather than resting on one verse."
  },
  "13": {
    "q": "If the tomb was empty, why would that not prove the resurrection by itself?",
    "a": "Because an empty tomb only tells us the body is gone. By itself, it does not tell us why. The resurrection case becomes stronger when the tomb is put together with Jesus’ death, the appearance reports, the early resurrection message, and the other evidence."
  },
  "14": {
    "q": "Why does an early resurrection message matter if people can believe something false very early?",
    "a": "Because earliness does not prove the belief is true. What it does is make a slow, much-later legend explanation harder to fit. The resurrection still has to be argued from the whole body of evidence."
  },
  "15": {
    "q": "Why is “legend” different from liar, lunatic, and Lord?",
    "a": "Liar, lunatic, and Lord ask what follows if Jesus really made the extraordinary claims attributed to Him. Legend challenges that earlier historical premise by saying those claims may have developed later. That is why the historical work has to come first."
  },
  "16": {
    "q": "Why does the earlier case for God matter when we interpret the resurrection as God vindicating Jesus?",
    "a": "Because the earlier case gives us independent reason to think God exists and can act. Then, when we reach the resurrection evidence, divine action is already a live explanation rather than something introduced only because the event is difficult to explain."
  },
  "17": {
    "q": "Why does Jesus’ authority not mean we can simply attach any later Christian claim to Him?",
    "a": "Because we still have to establish what Jesus actually taught and whom He actually authorized. His authority gives weight to His teaching, but it does not excuse us from doing the historical and interpretive work carefully."
  },
  "18": {
    "q": "Why does Jesus’ high view of the Old Testament not settle every later question about the exact canon or the interpretation of every passage?",
    "a": "Because this lesson establishes how Jesus treated Israel’s Scriptures as authoritative revelation. Questions about the exact boundaries of the canon, genre, textual issues, and the interpretation of particular passages still require their own work."
  },
  "19": {
    "q": "Why is the Council of Nicaea not the point where the New Testament first became authoritative?",
    "a": "Because apostolic writings were already being written, circulated, read in churches, and treated as authoritative long before Nicaea. The church later recognized the boundaries of the canon; it did not create apostolic authority by voting it into existence."
  },
  "20": {
    "q": "If Scripture is God’s Word, why does that not mean every Christian interpretation of Scripture is automatically right?",
    "a": "Because the authority and truth belong to God’s Word, not to every reader. Human beings can misunderstand a true message. Receiving Scripture as authoritative still leaves us responsible to interpret it carefully."
  },
  "21": {
    "q": "Why can saying, “I do not know, but I will look into that,” be a better apologetic answer than trying to bluff through a question?",
    "a": "Because apologetics is supposed to be truthful. Admitting what you do not know protects accuracy, keeps the conversation honest, and gives you the chance to come back with a real answer instead of defending something you made up on the spot."
  },
  "22": {
    "q": "What is the difference between the logical problem of evil and the evidential problem of evil?",
    "a": "The logical problem says God and evil cannot possibly exist together. The evidential problem makes a different claim: that the amount or apparent pointlessness of suffering counts as evidence against God. Answering one does not automatically answer the other."
  },
  "23": {
    "q": "Why can the same DNA similarities be interpreted differently depending on the worldview someone brings to the evidence?",
    "a": "Similarity is real evidence, but it does not interpret itself. A naturalistic framework will look for an explanation entirely within natural ancestry, while a theistic framework can also consider common design. The explanations still have to be compared with the rest of the evidence rather than treating one worldview as if it had no assumptions."
  }
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

  const check = (q.checkpoints || []).find(item => item.after === 'body') || (q.checkpoints || [])[0];
  const thinkAbout = check
    ? '<details class="inline-checkpoint think-about-check"><summary><span class="check-label">THINK ABOUT IT</span><strong>' + esc(check.question) + '</strong><span class="check-action">Reveal answer</span></summary><div class="checkpoint-answer"><span>ANSWER</span><p>' + esc(check.answer) + '</p></div></details>'
    : '';

  return '<div class="evidence-narrative">' + paragraphs + bottomLine + thinkAbout + '</div>';
}
function openQuestion(id){
  const q = byId(id); if(!q) return;
  const done = isComplete(q.id);
  const module = moduleForStudy(q.id);
  const subgroup = module?.groups?.find(g => (g.studyIds || []).includes(q.id));
  const bigIdea = q.bigIdea || memorableBigIdeas[q.id] || q.evidence?.claim || q.lesson?.heading || q.teaser;
  let html = `<p class="detail-kicker">${esc(module?.label || q.tag)} · Study ${String(q.id).padStart(2,'0')}</p><h2 id="modalTitle">${esc(q.title)}</h2><p class="wide-copy">${esc(q.teaser)}</p><div class="where-fit"><span>${esc(module?.label || 'Course')} · Where this fits</span><strong>${esc(subgroup?.title || module?.title || q.tag)}</strong><p>${esc(subgroup?.description || module?.description || '')}</p></div>`;
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
  if(q.conversationTips?.length){
    html += `<details class="challenges-details conversation-tips-details"><summary><div><span class="lesson-kicker">CONVERSATION TIPS</span><strong>Use this in a real conversation</strong></div><span class="details-mark" aria-hidden="true">+</span></summary><div class="challenges-body conversation-tips-body"><ul>${q.conversationTips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></details>`;
  }
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

function step1ChallengePreviewHtml(r){
  return `<section class="step-check-section step-challenge-preview">
    <span class="step-check-kicker">CONVERSATION PRACTICE</span>
    <h3>${esc(r.challenge.title)}</h3>
    <p>${esc(r.challenge.lockedNote)}</p>
    <div class="step-check-practice-preview"><strong>What you will do:</strong> answer one cumulative objection in your own words, compare it with a model, then respond to one follow-up.</div>
  </section>`;
}

function step1ChallengeHtml(r){
  const c = r.challenge;
  const h = r.handoff;
  return `<section class="step-check-section step-challenge">
    <span class="step-check-kicker">CONVERSATION PRACTICE</span>
    <h3>${esc(c.title)}</h3>
    <p>${esc(c.intro)}</p>
    <blockquote>${esc(c.prompt)}</blockquote>
    <label class="step-check-text-label" for="step1ChallengeInput">What would you say?</label>
    <textarea id="step1ChallengeInput" class="step-check-textarea" placeholder="Write your response in your own words."></textarea>
    <button class="button secondary" type="button" id="step1ChallengeModel">Show a possible response</button>
    <div id="step1ChallengeModelHolder"></div>
    <div id="step1PushbackHolder"></div>
  </section>
  <section class="step-check-section step-handoff">
    <span class="step-check-kicker">WHAT COMES NEXT</span>
    <h3>${esc(h.title)}</h3>
    <p>${esc(h.body)}</p>
    <button class="button primary" type="button" data-open-step1-next="10">${esc(h.button)}</button>
  </section>`;
}

function wireStep1Challenge(r){
  const modelButton = document.querySelector('#step1ChallengeModel');
  if(modelButton){
    modelButton.onclick = () => {
      const answer = document.querySelector('#step1ChallengeInput')?.value.trim();
      document.querySelector('#step1ChallengeModelHolder').innerHTML = `<div class="step-check-model"><span>ONE POSSIBLE RESPONSE</span><p>${esc(r.challenge.model)}</p>${answer?'':'<small>You will get a better sense of what you remember if you answer before checking the model.</small>'}</div>`;
      document.querySelector('#step1PushbackHolder').innerHTML = `<div class="step-check-pushback"><span>ONE MORE PUSHBACK</span><blockquote>${esc(r.challenge.pushback)}</blockquote><label class="step-check-text-label" for="step1PushbackInput">How would you answer?</label><textarea id="step1PushbackInput" class="step-check-textarea" placeholder="Keep it short and answer the actual objection."></textarea><button class="button secondary" type="button" id="step1PushbackModel">Show a possible response</button><div id="step1PushbackModelHolder"></div></div>`;
      document.querySelector('#step1PushbackModel').onclick = () => {
        const answer2 = document.querySelector('#step1PushbackInput')?.value.trim();
        document.querySelector('#step1PushbackModelHolder').innerHTML = `<div class="step-check-model"><span>ONE POSSIBLE RESPONSE</span><p>${esc(r.challenge.pushbackModel)}</p>${answer2?'':'<small>Answer first if you can, then compare it with the model.</small>'}</div>`;
      };
    };
  }
  document.querySelector('[data-open-step1-next]')?.addEventListener('click',()=>{
    closeModal();
    openQuestion(10);
  });
}

function openStep1QuickReference(options={}){
  const r = step1QuickReference;
  const prior = progressState.step1Checkpoint;
  const reviewHtml = r.sections.map((section,index)=>`<section class="step-check-section">
    <div class="step-check-section-head"><span class="step-check-number">${index+1}</span><div><span class="step-check-kicker">${esc(section.studies)}</span><h3>${esc(section.title)}</h3></div></div>
    <div class="step-check-review-grid">${section.items.map(item=>`<article><h4>${esc(item.title)}</h4><p>${esc(item.body)}</p><div class="step-check-adds"><span>WHAT IT ADDS</span><p>${esc(item.adds)}</p></div></article>`).join('')}</div>
    <div class="step-check-takeaway"><strong>Put it together:</strong> ${esc(section.takeaway)}</div>
  </section>`).join('');

  const quizHtml = r.questions.map((item,i)=>{
    const choices = shufflePracticeChoices(item.opts.map((opt,j)=>({opt,j})));
    return `<fieldset class="test-question step-check-question"><legend><span>QUESTION ${i+1}</span>${esc(item.q)}</legend>${choices.map(choice=>`<label><input type="radio" name="step1-check-${i}" value="${choice.j}"><span>${esc(choice.opt)}</span></label>`).join('')}</fieldset>`;
  }).join('');

  const html = `<button class="lesson-back" id="step1ReviewBack" type="button">Back to course</button>
    <span class="question-tag">CHECKPOINT · NOT A LESSON</span>
    <h2 id="modalTitle">${esc(r.title)}</h2>
    <p class="modal-intro">${esc(r.intro)}</p>
    <p class="step-check-note">${esc(r.note)}</p>
    ${prior?`<p class="step-check-prior"><strong>Last checkpoint:</strong> ${prior.score}/${prior.total}</p>`:''}
    <div class="step-check-review">${reviewHtml}</div>
    <section class="step-check-synthesis"><span class="step-check-kicker">THE CASE SO FAR</span><h3>${esc(r.synthesisTitle)}</h3><p>${esc(r.synthesis)}</p></section>
    <section class="step-check-section" id="step1QuizSection">
      <span class="step-check-kicker">6-QUESTION CHECKPOINT</span>
      <h3>${esc(r.checkpointTitle)}</h3>
      <p>${esc(r.checkpointIntro)}</p>
      <form id="step1CheckpointForm" class="test-form">${quizHtml}<button class="button primary" type="submit">Score my checkpoint</button></form>
      <div id="step1CheckpointResults"></div>
    </section>
    <div id="step1ChallengeHolder">${prior?step1ChallengeHtml(r):step1ChallengePreviewHtml(r)}</div>`;

  showModal(html, 'lesson');
  document.querySelector('#step1ReviewBack').onclick = closeModal;
  if(prior) wireStep1Challenge(r);
  if(options.scrollToQuiz){
    requestAnimationFrame(()=>document.querySelector('#step1QuizSection')?.scrollIntoView({block:'start'}));
  }

  document.querySelector('#step1CheckpointForm').onsubmit = e => {
    e.preventDefault();
    let score = 0;
    const missed = [];
    const review = r.questions.map((item,i)=>{
      const picked = document.querySelector(`input[name="step1-check-${i}"]:checked`);
      const selected = picked ? Number(picked.value) : null;
      const correct = selected === item.a;
      if(correct) score++;
      else missed.push(item);
      const selectedText = selected === null ? 'No answer selected.' : `Your answer: ${item.opts[selected]}`;
      return `<div class="test-review ${correct?'right':'wrong'}"><strong>${correct?'✓':'×'} ${esc(item.q)}</strong><p>${esc(selectedText)}</p><p><strong>Best answer:</strong> ${esc(item.opts[item.a])}</p><p class="test-explanation">${esc(item.exp)}</p></div>`;
    }).join('');

    progressState.step1Checkpoint = {score, total:r.questions.length, date:new Date().toISOString()};
    saveState();

    const band = r.scoreBands.find(x=>score>=x.min) || r.scoreBands[r.scoreBands.length-1];
    const missedUnique = [];
    missed.forEach(item=>{
      const key=item.reviewLabel;
      if(key && !missedUnique.some(x=>x.label===key)) missedUnique.push({label:key,ids:item.reviewStudyIds||[]});
    });
    const reviewLinks = missedUnique.length ? `<div class="step-check-review-links"><span>WORTH ANOTHER LOOK</span>${missedUnique.map(x=>`<div><strong>${esc(x.label)}</strong>${x.ids.filter(id=>id>=1&&id<=9).map(id=>`<button type="button" data-review-study="${id}">Study ${id}</button>`).join('')}</div>`).join('')}</div>` : '';

    document.querySelector('#step1CheckpointForm').remove();
    document.querySelector('#step1CheckpointResults').innerHTML = `<div class="test-score"><span>Step 1 checkpoint</span><strong>${score}/${r.questions.length}</strong><b>${Math.round((score/r.questions.length)*100)}%</b><p><strong>${esc(band.title)}</strong> ${esc(band.body)}</p></div><div class="step-check-retake"><button class="button secondary" type="button" id="retakeStep1Checkpoint">Retake checkpoint</button><p>Your current score stays saved until you submit the new attempt.</p></div>${reviewLinks}<details class="test-review-wrap"><summary>Review answers</summary>${review}</details>`;
    document.querySelector('#retakeStep1Checkpoint')?.addEventListener('click',()=>openStep1QuickReference({scrollToQuiz:true}));
    document.querySelectorAll('[data-review-study]').forEach(btn=>btn.onclick=()=>{
      closeModal();
      openQuestion(Number(btn.dataset.reviewStudy));
    });
    document.querySelector('#step1ChallengeHolder').innerHTML = step1ChallengeHtml(r);
    wireStep1Challenge(r);
    document.querySelector('#step1CheckpointResults').scrollIntoView({behavior:'smooth',block:'start'});
  };
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
    const first = mode==='lesson' ? document.querySelector('.lesson-back') : document.querySelector('#closeModal');
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
  const url = new URL(window.location.href);
  if(url.searchParams.has('study')){
    url.searchParams.delete('study');
    history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
  }
}

const practiceScenarioGroups = [
  {label:'Standard', levels:['guided','applied']},
  {label:'Complex', levels:['pressure']},
  {label:'Multiple issues', levels:['mixed']}
];
const practiceScenarioLevelNames = {
  guided:'Standard',
  applied:'Standard',
  pressure:'Complex',
  mixed:'Multiple issues'
};

let diagnosisRound = [];
let diagnosisPosition = 0;
let diagnosisScore = 0;
let currentScenario = null;
let currentNodeId = 'start';
let scenarioTrail = [];
let buildScenarioIndex = 0;
let buildStep = 0;
let buildAnswers = [];

function shufflePracticeChoices(items){
  const a=[...items];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

const diagnosisLabels = {
  clarify: 'Ask first',
  foundation: 'Reasoning & truth',
  step1: 'God',
  bridge: 'Miracles',
  step2: 'Jesus & Christianity'
};

function makeDiagnosisRound(){
  const items = typeof practiceDiagnosisItems !== 'undefined' ? practiceDiagnosisItems : [];
  const round = [];
  Object.keys(diagnosisLabels).forEach(key=>{
    const candidates = items.filter(item=>item.entryKey===key);
    if(candidates.length) round.push(candidates[Math.floor(Math.random()*candidates.length)]);
  });
  diagnosisRound = shufflePracticeChoices(round);
  diagnosisPosition = 0;
  diagnosisScore = 0;
}

function renderDiagnosis(){
  const card = document.querySelector('#diagnoseCard');
  if(!card) return;
  if(!diagnosisRound.length) makeDiagnosisRound();

  if(diagnosisPosition >= diagnosisRound.length){
    card.innerHTML = `<div class="conversation-result"><span class="test-label">ROUND COMPLETE</span><h4>${diagnosisScore}/${diagnosisRound.length} correct</h4><p>Each round gives you one question from each starting point, so you have to keep sorting out what kind of question you are actually hearing.</p><div class="prompt-actions"><button class="button light" type="button" id="newDiagnosisRound">Try another 5</button></div></div>`;
    card.querySelector('#newDiagnosisRound').onclick=()=>{ makeDiagnosisRound(); renderDiagnosis(); };
    return;
  }

  const item = diagnosisRound[diagnosisPosition];
  const choices = Object.entries(diagnosisLabels);
  card.innerHTML = `<div class="diagnose-count">Question ${diagnosisPosition+1} of ${diagnosisRound.length}</div><blockquote>${esc(item.q)}</blockquote><p class="practice-question">Where would you begin?</p><div class="diagnose-options">${choices.map(([key,label])=>`<button type="button" data-diagnose="${key}"><strong>${esc(label)}</strong></button>`).join('')}</div><div id="diagnoseFeedback" aria-live="polite"></div>`;

  card.querySelectorAll('[data-diagnose]').forEach(button=>button.addEventListener('click',()=>{
    const selected=button.dataset.diagnose;
    const correct=selected===item.entryKey;
    if(correct) diagnosisScore++;
    card.querySelectorAll('[data-diagnose]').forEach(b=>{
      b.disabled=true;
      if(b.dataset.diagnose===item.entryKey) b.classList.add('choice-correct');
    });
    if(!correct) button.classList.add('choice-missed');
    card.querySelector('#diagnoseFeedback').innerHTML=`<div class="practice-feedback ${correct?'strong':'mixed'}"><strong>${correct?'Yes. Start there.':'Not quite. A better place to begin is:'}</strong><p>${esc(item.entry)}</p><p class="diagnose-why">${esc(item.why||'')}</p><button class="button light" type="button" id="nextDiagnosis">${diagnosisPosition===diagnosisRound.length-1?'Finish round':'Next question'}</button></div>`;
    card.querySelector('#nextDiagnosis').onclick=()=>{ diagnosisPosition++; renderDiagnosis(); };
  }));
}

function scenarioOptionsHtml(){
  return practiceScenarioGroups.map(group=>{
    const items=practiceScenarios.filter(s=>group.levels.includes(s.level));
    if(!items.length) return '';
    return `<optgroup label="${esc(group.label)}">${items.map(s=>`<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('')}</optgroup>`;
  }).join('');
}

function renderScenarioPicker(){
  const html=scenarioOptionsHtml();
  const conversationSelect=document.querySelector('#scenarioSelect');
  if(conversationSelect) conversationSelect.innerHTML=html;
  const buildSelect=document.querySelector('#buildScenarioSelect');
  if(buildSelect){
    buildSelect.innerHTML=html;
    const current=practiceScenarios[buildScenarioIndex];
    if(current) buildSelect.value=current.id;
  }
}

function conversationGradeLabel(grade){
  if(grade==='strong') return 'Strong move';
  if(grade==='weak') return 'Needs work';
  return 'Reasonable, but tighten it';
}
function scenarioLevelName(scenario){
  return practiceScenarioLevelNames[scenario?.level] || 'Practice';
}
function renderConversationNode(){
  const box=document.querySelector('#conversationPractice');
  if(!box || !currentScenario) return;
  const node=currentScenario.nodes[currentNodeId];
  if(!node) return;
  if(node.end){
    const strong=scenarioTrail.filter(x=>x.grade==='strong').length;
    const mixed=scenarioTrail.filter(x=>x.grade==='mixed').length;
    const weak=scenarioTrail.filter(x=>x.grade==='weak').length;
    const quality=weak===0 && mixed===0 ? 'You kept the argument clean all the way through.' : weak===0 ? 'You stayed on the right issue, with a few places to sharpen.' : 'You found some good moves, and the debrief shows where the conversation drifted.';
    const trailHtml=scenarioTrail.map((item,i)=>`<article class="route-debrief-item ${esc(item.grade)}"><div class="route-debrief-head"><span>Turn ${i+1}</span><strong>${conversationGradeLabel(item.grade)}</strong></div><p class="route-debrief-response">${esc(item.response)}</p><p class="route-debrief-note">${esc(item.note||'')}</p></article>`).join('');
    box.innerHTML=`<div class="conversation-result"><span class="test-label">DEBRIEF</span><h4>${esc(quality)}</h4><p>${esc(node.summary)}</p><div class="route-summary"><span>Strong: <b>${strong}</b></span><span>Tighten: <b>${mixed}</b></span><span>Needs work: <b>${weak}</b></span></div><div class="route-debrief-list">${trailHtml}</div><p><strong>Best entry point:</strong> ${esc(currentScenario.entry)}</p><div class="prompt-actions"><button class="button light" type="button" id="restartScenario">Try this one again</button><button class="button" type="button" id="anotherScenario">Choose another scenario</button></div></div>`;
    box.querySelector('#restartScenario').onclick=()=>startScenario(currentScenario.id);
    box.querySelector('#anotherScenario').onclick=()=>{ box.innerHTML='<p class="practice-placeholder">Choose a scenario above and start when you are ready.</p>'; document.querySelector('#scenarioSelect')?.focus(); };
    return;
  }
  const options=shufflePracticeChoices(node.options||[]);
  box.innerHTML=`<div class="conversation-progress">${esc(scenarioLevelName(currentScenario))} · Turn ${scenarioTrail.length+1}</div><div class="conversation-turn"><span>${esc(node.speaker || 'Other person')}</span><p>${esc(node.text)}</p></div><div class="response-choices"><p class="practice-question">What would you say next?</p>${options.map((opt,i)=>`<button type="button" data-response-index="${i}">${esc(opt.text)}</button>`).join('')}</div><p class="practice-microcopy">I made the choices close on purpose. You will see why each one was graded the way it was at the end.</p>`;
  box.querySelectorAll('[data-response-index]').forEach(button=>button.addEventListener('click',()=>{
    const opt=options[Number(button.dataset.responseIndex)];
    scenarioTrail.push({prompt:node.text,response:opt.text,grade:opt.grade||'mixed',note:opt.note||''});
    currentNodeId=opt.next;
    renderConversationNode();
  }));
}
function startScenario(id){
  currentScenario=practiceScenarios.find(s=>s.id===id) || practiceScenarios[0];
  currentNodeId='start';
  scenarioTrail=[];
  renderConversationNode();
}

function currentBuildScenario(){
  return practiceScenarios[buildScenarioIndex % practiceScenarios.length];
}
function setBuildScenario(id){
  const index=practiceScenarios.findIndex(s=>s.id===id);
  if(index>=0) buildScenarioIndex=index;
  buildStep=0;
  buildAnswers=[];
  const select=document.querySelector('#buildScenarioSelect');
  if(select) select.value=currentBuildScenario().id;
  renderBuildPrompt();
}
function buildQuestionForStep(build, step){
  return step===0 ? build.prompt : build.followUps[step-1];
}
function renderBuildPrompt(){
  const card=document.querySelector('#promptCard');
  const scenario=currentBuildScenario();
  if(!card || !scenario || !scenario.build) return;
  const build=scenario.build;
  const total=1+(build.followUps||[]).length;
  const prompt=buildQuestionForStep(build,buildStep);
  const prior=buildAnswers.map((answer,i)=>`<div class="build-prior-turn"><span>${i===0?'Opening':'Follow-up '+i}</span><p class="build-prior-question">${esc(buildQuestionForStep(build,i))}</p><p class="build-prior-answer">${esc(answer)}</p></div>`).join('');
  card.innerHTML=`<div class="prompt-meta">${esc(scenarioLevelName(scenario))} · ${esc(scenario.title)} · Response ${buildStep+1} of ${total}</div>${prior?`<div class="build-history">${prior}</div>`:''}<div class="prompt-objection">${esc(prompt)}</div><textarea id="promptAnswer" placeholder="Write what you would actually say..."></textarea><div class="prompt-actions"><button class="button" id="advanceBuild">${buildStep<total-1?'Continue conversation':'Finish and self-check'}</button></div><div id="promptModel"></div>`;
  card.querySelector('#advanceBuild').onclick=()=>{
    const answer=card.querySelector('#promptAnswer').value.trim();
    if(!answer){
      card.querySelector('#promptAnswer').focus();
      card.querySelector('#promptAnswer').classList.add('practice-input-needed');
      return;
    }
    buildAnswers.push(answer);
    if(buildStep<total-1){ buildStep++; renderBuildPrompt(); return; }
    renderBuildSelfCheck();
  };
}
function renderBuildSelfCheck(){
  const card=document.querySelector('#promptCard');
  const scenario=currentBuildScenario();
  const build=scenario.build;
  const checks=[
    'I answered the claim that was actually made, not the objection I expected.',
    'I used the right part of the case instead of dumping everything I know.',
    'I explained the reason, not just the Christian conclusion.',
    'I did not claim more than the evidence establishes.',
    'I conceded any fair point that should have been conceded.',
    'I left room for the other person to answer rather than turning it into a speech.'
  ];
  const turns=buildAnswers.map((answer,i)=>`<div class="build-prior-turn"><span>${i===0?'Opening':'Follow-up '+i}</span><p class="build-prior-question">${esc(buildQuestionForStep(build,i))}</p><p class="build-prior-answer">${esc(answer)}</p></div>`).join('');
  card.innerHTML=`<div class="prompt-meta">SELF-CHECK · ${esc(scenario.title)}</div><div class="build-history">${turns}</div><div class="build-self-check"><h4>Before you look at the model, check your own answer.</h4>${checks.map((c,i)=>`<label><input type="checkbox" id="selfCheck${i}"><span>${esc(c)}</span></label>`).join('')}</div><div class="prompt-actions"><button class="button" id="showPromptModel">Show model and debrief</button><button class="button light" id="retryBuild">Rewrite this one</button></div><div id="promptModel"></div>`;
  card.querySelector('#retryBuild').onclick=()=>{buildStep=0;buildAnswers=[];renderBuildPrompt();};
  card.querySelector('#showPromptModel').onclick=()=>{
    if(build.studyId) markPracticed(build.studyId);
    const modelTurns=(build.models||[]).map((model,i)=>`<article class="model-turn"><span>${i===0?'Opening':'Follow-up '+i}</span><p class="model-question">${esc(buildQuestionForStep(build,i))}</p><p>${esc(model)}</p></article>`).join('');
    card.querySelector('#promptModel').innerHTML=`<div class="model build-model"><h4>One way to handle the whole exchange</h4>${modelTurns}<div class="build-compare"><strong>Use the model to compare, not to memorize.</strong><p>What did your answer include that the model included? What did you miss? Did you say anything true that still answered the wrong question? Could you actually say your version in a real conversation?</p><p><strong>Review:</strong> ${esc(build.studies||'')}</p></div></div>`;
    card.querySelector('#showPromptModel').disabled=true;
  };
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
  if(!confirm('Clear all saved study completion, practice, checkpoint, and test scores from this browser?')) return;
  progressState = defaultState();
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  saveState();
}

// Search/filter and study cards
document.querySelector('#search').addEventListener('input', renderQuestions);
document.querySelector('#category').addEventListener('change', renderQuestions);

// Practice lab
document.querySelectorAll('[data-practice-mode]').forEach(button=>button.addEventListener('click',()=>setPracticeMode(button.dataset.practiceMode)));
document.querySelector('#randomPrompt')?.addEventListener('click',()=>{
  buildScenarioIndex=Math.floor(Math.random()*practiceScenarios.length);
  buildStep=0;
  buildAnswers=[];
  const select=document.querySelector('#buildScenarioSelect');
  if(select) select.value=currentBuildScenario().id;
  renderBuildPrompt();
});
document.querySelector('#startScenario')?.addEventListener('click',()=>startScenario(document.querySelector('#scenarioSelect').value));
document.querySelector('#startBuildScenario')?.addEventListener('click',()=>setBuildScenario(document.querySelector('#buildScenarioSelect').value));

// Tests and progress
document.querySelector('#startPreTest').onclick = () => renderTest('pre');
document.querySelector('#heroPreTest').onclick = () => renderTest('pre');
document.querySelector('#methodPreTest').onclick = () => renderTest('pre');
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
  const direct=e.target.closest('.card-direct-link');
  if(direct) return;
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
renderDiagnosis();
renderScenarioPicker();
renderBuildPrompt();
renderConversationTips();
renderAbout();
renderProgress();
// Open a specific study when a search or shared lesson page sends someone into the full course.
const initialStudyId = Number(new URLSearchParams(window.location.search).get('study'));
if(Number.isInteger(initialStudyId) && byId(initialStudyId)){
  requestAnimationFrame(()=>openQuestion(initialStudyId));
}