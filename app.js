const header=document.querySelector('[data-header]');const toggle=document.querySelector('[data-menu-toggle]');const nav=document.querySelector('[data-nav]');
const menuLabels=document.documentElement.lang==='en'?{open:'Open menu',close:'Close menu'}:{open:'Menüyü aç',close:'Menüyü kapat'};
const closeMenu=({focus=false}={})=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label',menuLabels.open);if(focus)toggle?.focus()};
toggle?.addEventListener('click',()=>{const open=nav?.classList.toggle('open')??false;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?menuLabels.close:menuLabels.open);if(open)nav?.querySelector('a')?.focus()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('open')){event.preventDefault();closeMenu({focus:true})}});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>12);addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
