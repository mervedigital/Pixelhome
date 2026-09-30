const header=document.querySelector('[data-header]');const toggle=document.querySelector('[data-menu-toggle]');const nav=document.querySelector('[data-nav]');
const menuLabels=document.documentElement.lang==='en'?{open:'Open menu',close:'Close menu'}:{open:'Menüyü aç',close:'Menüyü kapat'};
const closeMenu=({focus=true}={})=>{const wasOpen=nav?.classList.contains('open');nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label',menuLabels.open);if(focus&&wasOpen)toggle?.focus()};
toggle?.addEventListener('click',()=>{if(nav?.classList.contains('open')){closeMenu();return}nav?.classList.add('open');toggle.setAttribute('aria-expanded',String(!!nav));toggle.setAttribute('aria-label',nav?menuLabels.close:menuLabels.open);nav?.querySelector('a')?.focus()});
document.addEventListener('keydown',event=>{
  if(!nav?.classList.contains('open'))return;
  if(event.key==='Escape'){event.preventDefault();closeMenu();return}
  if(event.key!=='Tab')return;
  const items=[...nav.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')].filter(el=>!el.matches(':disabled,[tabindex="-1"]')&&el.getClientRects().length);
  const first=items[0],last=items[items.length-1];
  if(!first){event.preventDefault();toggle?.focus();return}
  if(!items.includes(document.activeElement)||(event.shiftKey?document.activeElement===first:document.activeElement===last)){
    event.preventDefault();(event.shiftKey?last:first).focus();
  }
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>12);addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
