const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('.nav');
const closeMenu=()=>{menuButton.classList.remove('active');navigation.classList.remove('active');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')};
menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('active');menuButton.classList.toggle('active',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});

const header=document.querySelector('.site-header');
const progress=document.querySelector('.scroll-progress');
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
const updatePage=()=>{header.classList.toggle('scrolled',scrollY>20);const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;let current='';sections.forEach(section=>{if(scrollY>=section.offsetTop-180)current=section.id});navLinks.forEach(link=>link.classList.toggle('current',link.getAttribute('href')===`#${current}`))};
updatePage();window.addEventListener('scroll',updatePage,{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach((element,index)=>{element.style.transitionDelay=`${Math.min(index%4,3)*55}ms`;observer.observe(element)});
document.getElementById('year').textContent=new Date().getFullYear();

const finePointer=matchMedia('(pointer:fine)').matches;
const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(finePointer&&!reducedMotion){
  const dot=document.querySelector('.cursor-dot');const ring=document.querySelector('.cursor-ring');let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  document.addEventListener('pointermove',event=>{x=event.clientX;y=event.clientY;dot.style.transform=`translate(${x}px,${y}px)`},{passive:true});
  const follow=()=>{rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(follow)};follow();
  document.querySelectorAll('a,button,.project-card').forEach(element=>{element.addEventListener('pointerenter',()=>ring.classList.add(element.classList.contains('project-card')?'project-hover':'active'));element.addEventListener('pointerleave',()=>ring.classList.remove('active','project-hover'))});
  document.querySelectorAll('.magnetic').forEach(element=>{element.addEventListener('pointermove',event=>{const rect=element.getBoundingClientRect();element.style.transform=`translate(${(event.clientX-rect.left-rect.width/2)*.1}px,${(event.clientY-rect.top-rect.height/2)*.14}px)`});element.addEventListener('pointerleave',()=>element.style.transform='')});
  document.querySelectorAll('.project-card').forEach(card=>{card.addEventListener('pointermove',event=>{const rect=card.getBoundingClientRect();card.style.setProperty('--card-x',`${(event.clientX-rect.left)/rect.width*100}%`);card.style.setProperty('--card-y',`${(event.clientY-rect.top)/rect.height*100}%`)});card.addEventListener('pointerleave',()=>{card.style.removeProperty('--card-x');card.style.removeProperty('--card-y')})});
}
