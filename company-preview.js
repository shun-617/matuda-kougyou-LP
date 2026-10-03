const tabs = [...document.querySelectorAll('[data-view]')];
function selectView(view, scroll = false) {
  for (const tab of tabs) {
    const active = tab.dataset.view === view;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
  document.title = `株式会社 松田工業｜${view === 'recruit' ? '採用情報' : '会社紹介'}`;
  if(scroll) document.querySelector('.switcher').scrollIntoView({block:'start'});
}
for(const tab of tabs) {
  tab.addEventListener('click',()=>{location.hash=tab.dataset.view;selectView(tab.dataset.view,true);});
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next=event.key==='Home'?tabs[0]:event.key==='End'?tabs[1]:tabs.find(t=>t!==tab);
    next.click();next.focus();
  });
}
function route(){
  const hash=location.hash.slice(1);
  if(hash==='recruit'||hash==='company') selectView(hash,true);
  else if(['philosophy','services','principles','overview'].includes(hash)) selectView('company');
}
addEventListener('hashchange',route);
selectView(location.hash==='#recruit'?'recruit':'company');

// Observe text blocks separately so nested links and emphasis do not animate twice.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && Element.prototype.animate) {
  const selector = 'h1,h2,h3,p,li,dt,dd,summary,figcaption,button,a:not(.brand):not(.skip),.brand>span,.photo-credit,.values-grid article>span,footer small';
  const candidates = [...document.querySelectorAll(selector)];
  const targets = candidates.filter(element => !candidates.some(parent => parent !== element && parent.contains(element)));
  const active = new Set();
  const animations = new Map();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const element = entry.target;
      if (!entry.isIntersecting) {
        // Ignore exits caused only by the reveal's own translation at an edge.
        const transform = getComputedStyle(element).transform;
        const offset = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42;
        const rect = entry.boundingClientRect;
        if (element.getClientRects().length && rect.bottom - offset > 0 && rect.top - offset < innerHeight) continue;
        active.delete(element);
        animations.get(element)?.cancel();
        animations.delete(element);
        continue;
      }
      if (active.has(element)) continue;
      active.add(element);
      if (motionPreference.matches || element.matches(':focus-within')) continue;
      const animation = element.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 1500, easing: 'cubic-bezier(.22,.61,.36,1)' });
      animations.set(element, animation);
      animation.onfinish = () => animations.delete(element);
    }
  }, { threshold: 0 });
  targets.forEach(element => observer.observe(element));
  document.addEventListener('focusin', event => {
    for (const [element, animation] of animations) {
      if (element.contains(event.target)) animation.cancel();
    }
  });
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) {
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
  });
}
