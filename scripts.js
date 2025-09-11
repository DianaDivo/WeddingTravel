// Mobile drawer
(function(){
  const burger = document.querySelector('.burger');
  const drawer = document.getElementById('drawer');
  const toggle = () => drawer.style.display = drawer.style.display === 'none' || !drawer.style.display ? 'block' : 'none';
  burger.addEventListener('click', toggle);
  drawer.addEventListener('click', e => { if(e.target.tagName === 'A') toggle(); });
})();

// Smooth scroll
(function(){
  const OFFSET = 70;
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

// Parallax hero
(function(){
  const media = document.getElementById('hero-media');
  window.addEventListener('scroll', ()=>{
    const s = window.scrollY;
    const v = Math.min(1, s/600);
    media.style.transform = `translateY(${v* -18}px) scale(${1 + v*0.02})`;
  }, { passive: true });
})();

// Reveal on scroll
(function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){ ent.target.classList.add('in'); obs.unobserve(ent.target); }
    });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// Slider
(function(){
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsWrap = document.getElementById('dots');
  let index = 0, timer;

  const createDots = () => {
    slides.forEach((_, i)=>{
      const d = document.createElement('span');
      d.className = 'dot' + (i===0?' active':'');
      d.addEventListener('click', ()=> go(i));
      dotsWrap.appendChild(d);
    });
  };
  const updateDots = () => dotsWrap.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active', i===index));
  const go = (i)=>{
    index = (i + slides.length) % slides.length;
    const x = -index * track.getBoundingClientRect().width * 0.8 - index * 16;
    track.style.transform = `translateX(${x}px)`;
    updateDots();
    restart();
  };
  const nextF = ()=> go(index+1);
  const prevF = ()=> go(index-1);
  const restart = ()=>{
    clearInterval(timer);
    timer = setInterval(nextF, 5000);
  };
  createDots(); restart();
  next.addEventListener('click', nextF);
  prev.addEventListener('click', prevF);
  window.addEventListener('resize', ()=> go(index));
})();

// Lightbox
(function(){
  const links = document.querySelectorAll('.lightbox-link');
  const lb = document.getElementById('lightbox');
  const img = lb.querySelector('img');
  const close = lb.querySelector('.close');
  links.forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      img.src = a.href;
      img.alt = a.querySelector('img')?.alt || 'Фото';
      lb.classList.add('open');
    });
  });
  const hide = ()=> lb.classList.remove('open');
  close.addEventListener('click', hide);
  lb.addEventListener('click', e=> { if(e.target===lb) hide(); });
  window.addEventListener('keydown', e=> { if(e.key==='Escape') hide(); });
})();

// Form validation + toast
(function(){
  const form = document.getElementById('contactForm');
  const toast = (msg, ok=true)=>{
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
      background: ok ? 'linear-gradient(135deg, #6ee7b7, #34d399)' : 'linear-gradient(135deg, #ff6b6b, #ef4444)',
      color:'#0c0c
