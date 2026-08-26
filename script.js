const menuButton=document.querySelector('.menu-button');const navigation=document.querySelector('.nav');
const closeMenu=()=>{menuButton.classList.remove('active');navigation.classList.remove('active');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')};
menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('active');menuButton.classList.toggle('active',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const header=document.querySelector('.site-header');const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>20);onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -48px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.getElementById('year').textContent=new Date().getFullYear();

const progress=document.querySelector('.scroll-progress');
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
const updatePage=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;let current='';sections.forEach(section=>{if(scrollY>=section.offsetTop-180)current=section.id});navLinks.forEach(link=>link.classList.toggle('current',link.getAttribute('href')===`#${current}`))};
updatePage();window.addEventListener('scroll',updatePage,{passive:true});

if(matchMedia('(pointer:fine)').matches){document.addEventListener('pointermove',event=>{document.documentElement.style.setProperty('--mouse-x',`${event.clientX}px`);document.documentElement.style.setProperty('--mouse-y',`${event.clientY}px`)},{passive:true});const visual=document.querySelector('.hero-visual');visual.addEventListener('pointermove',event=>{const rect=visual.getBoundingClientRect();visual.style.setProperty('--tilt-x',`${((event.clientY-rect.top)/rect.height-.5)*-5}deg`);visual.style.setProperty('--tilt-y',`${((event.clientX-rect.left)/rect.width-.5)*5}deg`)});visual.addEventListener('pointerleave',()=>{visual.style.setProperty('--tilt-x','0deg');visual.style.setProperty('--tilt-y','0deg')})}
