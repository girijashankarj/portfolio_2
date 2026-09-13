const links=[...document.querySelectorAll('.nav nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
const progress=document.querySelector('.scroll-progress span');

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    links.forEach(a=>a.removeAttribute('aria-current'));
    const active=links.find(a=>a.getAttribute('href')==='#'+e.target.id);
    if(active)active.setAttribute('aria-current','page');
  }
}),{rootMargin:'-35% 0px -55%'});
sections.forEach(s=>observer.observe(s));

function updateProgress(){
  const scrollTop=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?Math.min(100,(scrollTop/max)*100):0)+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();

/* Portfolio-owned branding and icon system. */
(function(){
  const head=document.head;

  const favicon=document.createElement('link');
  favicon.rel='icon';
  favicon.type='image/svg+xml';
  favicon.href='assets/gj-favicon.svg';
  head.appendChild(favicon);

  const appleIcon=document.createElement('link');
  appleIcon.rel='apple-touch-icon';
  appleIcon.href='assets/gj-favicon.svg';
  head.appendChild(appleIcon);

  const icons=document.createElement('link');
  icons.rel='stylesheet';
  icons.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css';
  icons.crossOrigin='anonymous';
  head.appendChild(icons);

  const iconStyles=document.createElement('style');
  iconStyles.textContent=`
    .brand-mark{display:block;width:100%;height:100%;object-fit:contain}
    .skill-icon,.project-icon,.contact-icon,.meta-icon{margin-right:9px;font-size:.72em;vertical-align:middle}
    .skill-icon{width:20px;text-align:center;color:#77736b;font-size:.7em}
    .skill-list span{display:flex;align-items:center;gap:5px}
    .project-icon{opacity:.7}
    .contact-icon{margin-right:8px}
    .meta-icon{font-size:.9em;color:#171715}
  `;
  head.appendChild(iconStyles);

  const brand=document.querySelector('.brand');
  if(brand) brand.setAttribute('title','Garry Jambhale');

  const initials=document.querySelector('.initials');
  if(initials){
    initials.innerHTML='<img src="assets/gj-favicon.svg" alt="GJ" class="brand-mark">';
    initials.setAttribute('aria-label','GJ');
  }

  const iconMap={
    'Frontend':'fa-solid fa-code',
    'Backend':'fa-solid fa-server',
    'Cloud':'fa-solid fa-cloud',
    'AI / Data':'fa-solid fa-wand-magic-sparkles',
    'Leadership':'fa-solid fa-people-group'
  };
  document.querySelectorAll('.skill-list>div').forEach(item=>{
    const label=item.querySelector('span');
    if(!label) return;
    const icon=iconMap[label.textContent.trim()];
    if(icon) label.insertAdjacentHTML('afterbegin',`<i class="${icon} skill-icon" aria-hidden="true"></i>`);
  });

  document.querySelectorAll('.project').forEach(card=>{
    const title=card.querySelector('h3');
    const small=card.querySelector('small');
    if(!title || !small) return;
    const iconsByTitle={
      'Cursor Handbook':'fa-solid fa-book-open',
      'Portfolio 1':'fa-solid fa-window-maximize',
      'GenAI Engineering':'fa-solid fa-brain',
      'AWS Engineering':'fa-brands fa-aws'
    };
    const icon=iconsByTitle[title.textContent.trim()];
    if(icon) small.insertAdjacentHTML('afterbegin',`<i class="${icon} project-icon" aria-hidden="true"></i>`);
  });

  document.querySelectorAll('.contact-links a').forEach(a=>{
    const label=a.textContent.trim();
    const icon=label==='GitHub'?'fa-brands fa-github':label==='LinkedIn'?'fa-brands fa-linkedin-in':'fa-solid fa-code';
    a.insertAdjacentHTML('afterbegin',`<i class="${icon} contact-icon" aria-hidden="true"></i>`);
  });

  const heroMeta=document.querySelector('.hero-meta');
  if(heroMeta){
    const parts=[...heroMeta.children];
    parts.forEach((part,i)=>{
      const icon=i===0?'fa-solid fa-layer-group':'fa-solid fa-location-dot';
      part.insertAdjacentHTML('afterbegin',`<i class="${icon} meta-icon" aria-hidden="true"></i>`);
    });
  }

  /* Remove accidental ChatGPT tracking from shared URLs without changing the page content. */
  const cleanUrl=new URL(window.location.href);
  let changed=false;
  [...cleanUrl.searchParams.keys()].forEach(key=>{
    if(key.toLowerCase().includes('chatgpt')){
      cleanUrl.searchParams.delete(key);
      changed=true;
    }
  });
  if(cleanUrl.searchParams.get('utm_source')?.toLowerCase()==='chatgpt.com'){
    cleanUrl.searchParams.delete('utm_source');
    changed=true;
  }
  if(changed){
    window.history.replaceState({},document.title,cleanUrl.pathname+(cleanUrl.search?cleanUrl.search:'')+(cleanUrl.hash||''));
  }
})();
