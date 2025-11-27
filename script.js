// Auto update year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const el = document.querySelector(href);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Fade-up reveal
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting) en.target.classList.add('visible');
  });
},{threshold:0.18});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

// 3D tilt for hero card (minimal)
;(function(){
  const card = document.getElementById('heroCard');
  if(!card) return;
  const strength = 10;
  const reset = 220;
  function move(e){
    const rect = card.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY);
    if(clientX == null) return;
    const dx = (clientX - (rect.left + rect.width/2)) / (rect.width/2);
    const dy = (clientY - (rect.top + rect.height/2)) / (rect.height/2);
    card.style.transform = `rotateX(${ -dy * strength }deg) rotateY(${ dx * strength }deg)`;
  }
  function leave(){
    card.style.transition = `transform ${reset}ms cubic-bezier(.2,.9,.3,1)`;
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    setTimeout(()=>card.style.transition = '', reset);
  }
  document.addEventListener('mousemove', move);
  card.addEventListener('mouseleave', leave);
  document.addEventListener('touchmove', (e)=>{ if(e.touches && e.touches[0]) move(e.touches[0]); }, {passive:true});
})();
