(function(){
  function esc(value){
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function paras(text){
    return String(text || "").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean)
      .map(p=>"<p>"+esc(p)+"</p>").join("");
  }
  function byId(id){ return (typeof questions !== "undefined" ? questions : []).find(q=>Number(q.id)===Number(id)); }
  function moduleFor(id){ return (typeof lessonModules !== "undefined" ? lessonModules : []).find(m=>(m.studyIds||[]).map(Number).includes(Number(id))); }
  const slugs={
    1:"how-do-arguments-actually-work",2:"how-can-we-know-something-is-true",3:"why-is-there-something-rather-than-nothing",
    4:"did-the-universe-begin-to-exist",5:"does-design-point-to-a-designer",6:"why-is-the-universe-life-permitting",
    7:"does-the-information-and-machinery-of-life-point-to-design",8:"if-right-and-wrong-are-real-what-makes-them-real",
    9:"why-can-we-trust-reason",10:"if-god-exists-are-miracles-possible",11:"can-we-investigate-jesus-historically",
    12:"who-did-jesus-claim-to-be",13:"did-jesus-really-die-and-was-the-tomb-empty",14:"did-jesus-rise-from-the-dead",
    15:"liar-lunatic-or-lord",16:"what-does-the-resurrection-say-about-jesus",17:"if-jesus-is-lord-can-we-trust-what-he-teaches",
    18:"how-did-jesus-treat-the-old-testament",19:"what-about-the-new-testament",20:"so-has-god-spoken",
    21:"where-should-i-begin-in-a-real-apologetics-conversation",22:"if-god-is-good-and-powerful-why-is-there-so-much-evil-and-suffering",
    23:"how-should-a-christian-think-about-creation-evolution-and-worldview"
  };
  function pathFor(id){ return slugs[id] ? "/studies/"+slugs[id]+"/" : "/#questions"; }
  function sourceItems(q){
    if(q.evidence && Array.isArray(q.evidence.resources) && q.evidence.resources.length){
      return q.evidence.resources.map(r=>({title:r.title,url:r.url,why:r.why}));
    }
    return (q.sources||[]).map(s=>({title:s[0],url:s[1],why:""}));
  }
  function render(){
    const root=document.getElementById("studyRoot");
    if(!root) return;
    const id=Number(root.dataset.studyId);
    const q=byId(id);
    if(!q){ root.innerHTML="<p>This study could not be loaded. <a href='/#questions'>Return to the course.</a></p>"; return; }
    const mod=moduleFor(id)||{};
    const order=(typeof lessonModules!=="undefined"?lessonModules:[]).flatMap(m=>m.studyIds||[]);
    const pos=order.indexOf(id), prev=pos>0?byId(order[pos-1]):null, next=pos>=0&&pos<order.length-1?byId(order[pos+1]):null;
    const full="/?study="+id+"#questions";
    let html="";
    html+=\`<header class="study-hero">
      <div class="eyebrow">\${esc(mod.shortLabel||q.tag)} · Study \${String(id).padStart(2,"0")}</div>
      <h1>\${esc(q.title)}</h1>
      <p class="lede">\${esc(q.teaser)}</p>
      <div class="study-actions"><a class="study-button primary" href="\${full}">Return to full course and continue progress</a><a class="study-button" href="/#questions">Browse all lessons</a></div>
      <p class="progress-note"><strong>You are viewing a shareable lesson page.</strong> Return to the full course to have this study count toward your progress and mark it complete there.</p>
      <div class="where-fit"><strong>Where this fits</strong>\${esc(mod.title||q.tag)}</div>
    </header>\`;
    if(q.thread) html+=\`<section class="study-section"><div class="eyebrow">THE THREAD</div><p>\${esc(q.thread)}</p></section>\`;
    if(q.story&&q.story.lines&&q.story.lines.length){
      html+=\`<section class="study-section story"><div class="eyebrow">A WALK WITH JORDAN</div><h2>\${esc(q.story.title||"The conversation continues")}</h2>\${q.story.lines.map(x=>"<p>"+esc(x)+"</p>").join("")}</section>\`;
    }
    html+=\`<section class="study-section"><div class="eyebrow">THE IDEA</div><h2>\${esc(q.bigIdea||q.lesson?.heading||q.teaser)}</h2><p>\${esc(q.why||"")}</p></section>\`;
    html+=\`<section class="study-section"><div class="eyebrow">THE EVIDENCE</div><h2>\${esc(q.lesson?.heading||"Build the case")}</h2>\${paras(q.lesson?.body||(q.core||[]).join("\\n\\n"))}\`;
    if(q.conclusion) html+=\`<p class="bottom-line"><strong>Bottom line:</strong> \${esc(q.conclusion)}</p>\`;
    const check=(q.checkpoints||[]).find(c=>c.after==="body")||(q.checkpoints||[])[0];
    if(check) html+=\`<details class="think"><summary>Think about it: \${esc(check.question)}</summary><div><strong>Answer:</strong> \${esc(check.answer)}</div></details>\`;
    html+="</section>";
    const resolution=(typeof jordanResolutions!=="undefined"&&jordanResolutions[String(id)])||null;
    if(resolution&&resolution.lines&&resolution.lines.length){
      html+=\`<section class="study-section story"><div class="eyebrow">BACK ON THE WALK</div><h2>\${esc(resolution.title||"Jordan's question answered")}</h2>\${resolution.lines.map(x=>"<p>"+esc(x)+"</p>").join("")}</section>\`;
    }
    html+=\`<section class="study-section practice"><div class="eyebrow">PRACTICE · NEW SCENARIO</div><h2>Use what you learned in a different situation</h2><p><strong>\${esc(q.practice||"")}</strong></p><p>The full course lets you write your response, compare it with a model, and track your progress.</p><a class="study-button" href="\${full}">Practice this inside the full course</a></section>\`;
    if(q.pressure&&q.pressure.length){
      html+=\`<section class="study-section objections"><div class="eyebrow">COMMON OBJECTIONS</div><h2>Questions this argument still has to face</h2>\${q.pressure.map(x=>"<details><summary>"+esc(x[0])+"</summary><p>"+esc(x[1])+"</p></details>").join("")}</section>\`;
    }
    if(q.limits) html+=\`<section class="study-section"><div class="eyebrow">KEEP THE CLAIM CLEAR</div><p>\${esc(q.limits)}</p></section>\`;
    const sources=sourceItems(q);
    if(sources.length){
      html+=\`<section class="study-section sources"><div class="eyebrow">GO DEEPER</div><h2>Sources for further study</h2><ul>\${sources.map(r=>"<li><a href='"+esc(r.url)+"' target='_blank' rel='noopener noreferrer'>"+esc(r.title)+"</a>"+(r.why?" — "+esc(r.why):"")+"</li>").join("")}</ul></section>\`;
    }
    html+=\`<div class="course-return"><p>Continue in the full course to track your progress and explore more lessons.</p><a class="study-button primary" href="/#questions">Return to full course for more lessons</a></div>\`;
    html+=\`<nav class="study-pager" aria-label="Previous and next lessons">\${prev?"<a href='"+pathFor(prev.id)+"'><span>Previous study</span>"+esc(prev.title)+"</a>":"<div></div>"}\${next?"<a href='"+pathFor(next.id)+"'><span>Next study</span>"+esc(next.title)+"</a>":"<div></div>"}</nav>\`;
    root.innerHTML=html;
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",render); else render();
})();