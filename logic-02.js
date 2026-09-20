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
        <h3>${esc(q.title)}</h3><p>${esc(q.teaser)}</p><div class="card-foot">Open study →</div></article>`;
    }).join('');
    const groupGuide = module.groups?.length ? `<div class="module-subgroups">${module.groups.map(g=>`<span>${esc(g.title || g.label)}</span>`).join('')}</div>` : '';
    const first = items[0];
    const moduleDone = module.studyIds.filter(isComplete).length;
    const progressLabel = `${moduleDone}/${module.studyIds.length} complete`;
    const quickReference = !term && (module.key === 'step1' || module.key === 'step2') ? `<article class="question-card quick-reference-card" data-open-quick="${module.key}" tabindex="0" role="button" aria-label="Open ${module.key === 'step1' ? 'Step 1' : 'Step 2'} quick reference">
        <div class="question-card-top"><span class="question-tag">QUICK REFERENCE · NOT A LESSON</span></div>
        <h3>${module.key === 'step1' ? 'Step 1 in one minute: Why believe God exists?' : 'Step 2 in one minute: Why believe Jesus rose?'}</h3>
        <p>${module.key === 'step1' ? 'A short review of Studies 3–9 for quick reference before a conversation or after finishing the section.' : 'A short review of Studies 11–16 for quick reference before a conversation or after finishing the section.'}</p>
        <div class="card-foot">Open quick reference →</div>
      </article>` : '';
    return `<section class="learning-module ${module.core?'core-module':'bonus-module'}" data-module="${esc(module.key)}">
      <div class="learning-module-head"><div><span class="module-label">${esc(module.label)}</span><h3>${esc(module.title)}</h3><p>${esc(module.description)}</p></div><div class="module-actions"><span class="module-count">${progressLabel}</span><button class="module-start" type="button" data-open="${first.id}">${module.key==='foundation'?'Start here':'Start this section'} →</button></div></div>
      ${groupGuide}<div class="question-grid">${cards}</div>${quickReference}
    </section>`;
  }).join('');
  grid.innerHTML = html || '<p>No questions matched that search.</p>';
}

function renderSources(){
  document.querySelector('#sourceGrid').innerHTML = sourceItems.map(s => `<article class="source-card"><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><a href="${esc(s[2])}" target="_blank" rel="noopener noreferrer">Open source ↗</a></article>`).join('');
}

function renderOrientation(){
  const grid = document.querySelector('#orientationGrid');
  if(!grid) return;
  const items = [['definition','What is classical apologetics?'],['goal','What is this site for?'],['not','What is this site not?'],['engage','How should I engage in apologetics?']];
  grid.innerHTML = items.map(([key],i) => {
    const o = orientation[key];
    const links = o.sources?.length ? o.sources : [[o.sourceLabel,o.sourceUrl]];
    return `<article class="orientation-card"><div class="orientation-no">0${i+1}</div><h3>${esc(o.title)}</h3><p>${esc(o.body)}</p><ul>${o.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="orientation-sources"><span>Sources</span>${links.filter(s=>s&&s[0]&&s[1]).map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener noreferrer">${esc(s[0])} ↗</a>`).join('')}</div></article>`;
  }).join('');
}

function renderConversationTips(){
  const grid = document.querySelector('#conversationGrid');
  grid.innerHTML = conversationTips.map((tip,i) => `<article class="conversation-card"><span class="conversation-no">${String(i+1).padStart(2,'0')}</span><h3>${esc(tip.title)}</h3><p>${esc(tip.body)}</p>${tip.source?`<a href="${esc(tip.source[1])}" target="_blank" rel="noopener noreferrer">${esc(tip.source[0])} ↗</a>`:''}</article>`).join('');
}

function renderAbout(){
  const grid = document.querySelector('#aboutGrid');
  const contactAction = contact.email
    ? `<a class="button primary" href="mailto:${esc(contact.email)}?subject=${encodeURIComponent(contact.subject || 'Question')}">Contact me</a><p class="contact-address">${esc(contact.email)}</p>`
    : `<p class="contact-pending">Contact information has not been published yet. Add an email address to <code>contact.email</code> in <code>content.js</code> when you are ready.</p>`;
  grid.innerHTML = `
    <article class="about-main"><span class="about-label">MISSION</span><h3>${esc(about.title)}</h3><p class="about-mission">${esc(about.mission)}</p></article>
    <article class="about-card"><span class="about-label">HOW THIS SITE WORKS</span><ul>${about.approach.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>
    <article class="about-card"><span class="about-label">WHAT THIS IS NOT</span><ul>${about.boundaries.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>
    <article class="contact-card"><span class="about-label">CONTACT</span><h3>Questions, corrections, or source suggestions?</h3><p>Good apologetics should be willing to correct mistakes. Use this contact point for factual corrections, source recommendations, or questions about the project.</p>${contactAction}</article>`;
}

function evidenceHtml(q){
  if(!q.evidence) return '';
  return `<details class="evidence-panel evidence-details"><summary><div><span class="lesson-kicker">GO DEEPER</span><strong>Open research notes and source links</strong></div><span class="details-mark" aria-hidden="true">+</span></summary><div class="evidence-details-body"><h3>${esc(q.evidence.claim)}</h3><div class="evidence-summary"><div><strong>What these sources support</strong><p>${esc(q.evidence.establishes)}</p></div></div><div class="evidence-grid">${q.evidence.resources.map(r=>`<article class="evidence-card"><span class="evidence-type">${esc(r.type)}</span><h4>${esc(r.title)}</h4><p>${esc(r.why)}</p><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Open source ↗</a></article>`).join('')}</div></div></details>`;
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
  11: "The New Testament can be investigated as early historical testimony, including testimony connected to named eyewitnesses and the first Christian leaders.",
  12: "The resurrection claim begins with a genuinely dead Jesus, not a survivor of crucifixion.",
  13: "The resurrection proclamation appears too early to dismiss simply as a legend that emerged centuries later.",
  14: "Early Christians reported encounters with the risen Jesus, and any explanation must account for those reports.",
  15: "The empty tomb matters as one part of a cumulative case, not as a stand-alone proof.",
  16: "The strongest explanation is the one that accounts for the whole body of evidence with the fewest unsupported additions.",
  17: "The problem of evil raises both intellectual and personal questions, and those questions should not be confused.",
  18: "Origins evidence is interpreted inside larger worldviews, so observations, historical inferences, and assumptions must be kept distinct.",
  19: "Good apologetics starts by finding the real point of disagreement before choosing an argument."
};
