<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Junghyun Kim - Portfolio</title>
<style>
  /* ══ 전역 설정 및 터치 효과 제거 ══ */
  *, *::before, *::after { 
    margin: 0; padding: 0; box-sizing: border-box; 
    -webkit-tap-highlight-color: transparent; 
  }
  
  :root {
    --black: #111; --gray: #999; --bg: #fff; --line: #eee;
    --font: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --bar: 44px; --side: 22%;
  }
  body.dark {
    --black: #f5f5f5; --gray: #888; --bg: #0a0a0a; --line: #222;
  }

  html, body { 
    background: var(--bg); color: var(--black); font-family: var(--font); font-size: 13px;
    transition: background 0.25s ease, color 0.25s ease;
    scroll-behavior: smooth; overflow-x: hidden;
  }
  
  body { padding: 0; }
  a { color: inherit; text-decoration: none; }

  /* ══ 상단 고정 바 ══ */
  .top-bar {
    position: fixed; left: 0; right: 0; top: 0; z-index: 300;
    height: var(--bar);
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 20px; background: transparent; 
    transition: background 0.4s ease, color 0.25s ease;
  }

  /* ══ 하단 고정 바 (잘림 방지 강화) ══ */
  .bottom-bar {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 300;
    min-height: 60px; /* 높이 증가 */
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 20px calc(env(safe-area-inset-bottom) + 12px); /* 하단 여백 대폭 강화 */
    background: transparent; 
    transition: background 0.4s ease, color 0.25s ease;
  }
  
  .top-bar.scrolled, .bottom-bar.scrolled { background: var(--bg); }
  
  .nav-btn {
    cursor: pointer; font-size: 13px; user-select: none; color: var(--black); white-space: nowrap;
    padding: 2px 4px; transition: background 0.2s ease, color 0.2s ease;
  }
  .nav-btn:hover {
    text-decoration: none;
    background: var(--black);
    color: var(--bg);
  }

  .mid-label {
    position: fixed; z-index: 200; top: 50%; transform: translateY(-50%);
    font-size: 13px; color: var(--black);
  }
  .mid-right { right: 20px; font-variant-numeric: tabular-nums; pointer-events: none; }

  /* ══ 페이지 관리 ══ */
  #page-portfolio { display: block; background: var(--bg); }
  #page-moodboard { display: none; background: var(--bg); min-height: 100vh; }
  body.on-moodboard #page-portfolio { display: none; }
  body.on-moodboard #page-moodboard { display: block; }
  body.on-moodboard .top-bar, body.on-moodboard .bottom-bar { background: var(--bg); }

  .wrap { margin: 0 auto; width: calc(100% - var(--side) * 2); max-width: 1040px; position: relative; }

  /* ══ HERO 영상 & 위치 텍스트 ══ */
  .hero { 
    height: 100vh; width: 100vw; position: relative;
    display: flex; align-items: center; justify-content: center; text-align: center;
    background: var(--bg);
  }
  .hero-video {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover; z-index: 1; opacity: 1; transition: opacity 0.6s ease;
  }
  .hero-location {
    position: fixed; left: 20px; top: 50%; transform: translateY(-50%);
    z-index: 2; text-align: left; line-height: 1.5; font-size: 13px;
    color: var(--black); opacity: 1; transition: opacity 0.6s ease; pointer-events: none;
  }
  .hero.video-hidden .hero-video, .hero.video-hidden .hero-location { opacity: 0; pointer-events: none; }
  .hero-text {
    position: relative; z-index: 3; display: flex; flex-direction: column; gap: 10px; 
    font-size: 13px; font-weight: 400; line-height: 1.4;
  }
  .hero-link {
    display: inline-block; align-self: center; padding: 2px 4px;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .hero-link:hover {
    text-decoration: none;
    opacity: 1;
    background: var(--black);
    color: var(--bg);
  }

  /* ══ 섹션 공통 모션 ══ */
  .project-section .wrap, .about-section .wrap {
    opacity: 1; transform: translateY(0);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .project-section .wrap.below, .about-section .wrap.below { opacity: 0; transform: translateY(60px); }
  .project-section .wrap.above, .about-section .wrap.above { opacity: 0; transform: translateY(-60px); }

  /* ══ 프로젝트 섹션 ══ */
  .project-section { min-height: 100vh; display: flex; align-items: center; padding: 100px 0; }
  .slideshow {
    width: 100%; position: relative; overflow: hidden;
    user-select: none; background: rgba(127,127,127,0.08); min-height: 200px;
  }
  .slide { position: relative; display: none; width: 100%; }
  .slide.active { display: block; }
  .slide-img { width: 100%; height: auto; display: block; }
  .slide-counter { position: absolute; bottom: 10px; right: 14px; font-size: 11px; color: var(--gray); z-index: 4; }
  .zone { position: absolute; top: 0; bottom: 0; width: 50%; z-index: 5; cursor: pointer; }

  .project-info { display: grid; grid-template-columns: 1fr 1fr; padding: 20px 0 60px; color: var(--black); }
  .pname { font-size: 13px; font-weight: 500; }
  .pyear { font-size: 13px; }
  .ptags { font-size: 13px; font-weight: 500; line-height: 1.5; }
  .pdesc { font-size: 12px; color: var(--gray); line-height: 1.7; margin-top: 10px; }

  /* ══ ABOUT ══ */
  .about-section { 
    min-height: 50vh; display: flex; align-items: flex-start;
    padding: 10vh 0 20px; color: var(--black); 
  }
  .about-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; width: 100%; }
  .about-col { padding-right: 28px; }
  .about-col-title { font-size: 13px; font-weight: 600; margin-bottom: 14px; }
  .about-col p, .about-col a { font-size: 13px; line-height: 1.6; display: block; color: var(--black); }
  .about-col a {
    width: fit-content; padding: 2px 4px;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .about-col a:hover {
    text-decoration: none;
    background: var(--black);
    color: var(--bg);
  }
  .about-col .bio { font-size: 12px; color: var(--gray); line-height: 1.7; margin-top: 12px; }
  .about-col .cv-entry { margin-bottom: 14px; }
  .about-col .cv-entry:last-child { margin-bottom: 0; }
  .cv-place { line-height: 1.45; }
  .cv-year { margin-top: 3px; font-size: 12px; color: var(--gray); line-height: 1.4; }

  /* ══ 모바일 최적화 ══ */
  @media (max-width: 800px) {
    :root { --side: 0; } 
    .wrap { width: 100%; padding: 0 20px; margin: 0 auto; }
    .project-info { grid-template-columns: 1fr; gap: 12px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .mid-right { display: none; } 
    .project-section { padding: 60px 0; }
    .about-section { padding-top: 60px; min-height: auto; }
    .hero-location { display: none; } 
    .bottom-bar { padding-bottom: calc(env(safe-area-inset-bottom) + 8px); }
  }

  /* ══ 무드보드 ══ */
  .mb-masonry {
    display: grid; grid-template-columns: repeat(8, 1fr); column-gap: 10px;
    row-gap: 30px; padding: calc(var(--bar) + 20px) 20px 120px; align-items: start;
  }
  @media (max-width: 1100px) { .mb-masonry { grid-template-columns: repeat(6, 1fr); } }
  @media (max-width: 800px)  { .mb-masonry { grid-template-columns: repeat(4, 1fr); } }
  @media (max-width: 500px)  { .mb-masonry { grid-template-columns: repeat(2, 1fr); } }

  .mb-item {
    display: block; position: relative; cursor: pointer;
    --mb-dur: 0.7s; --mb-dy: 40px; opacity: 0; transform: translateY(var(--mb-dy));
    transition: opacity var(--mb-dur) cubic-bezier(0.16,1,0.3,1), transform var(--mb-dur) cubic-bezier(0.16,1,0.3,1);
  }
  .mb-item.visible { opacity: 1 !important; transform: translateY(0) !important; }
  .mb-item.exit-up { opacity: 0; transform: translateY(calc(var(--mb-dy) * -1)); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.4,0,1,1); }
  .mb-ph { position: relative; width: 100%; overflow: hidden; line-height: 0; }
  .mb-real { width: 100%; height: auto; display: block; }
  .mb-info { margin-top: 6px; line-height: 1.3; color: var(--black); transition: color 0.25s ease; }

  /* ══ 라이트박스 ══ */
  .lb {
    display: none; position: fixed; inset: 0; z-index: 1000; 
    background: var(--bg); transition: opacity 0.3s ease;
    flex-direction: column; align-items: center; justify-content: center;
  }
  .lb.open { display: flex; opacity: 1; }
  .lb-close, .lb-arrow { position: fixed; background: none; border: none; cursor: pointer; color: var(--black); font-family: var(--font); z-index: 1001; }
  .lb-close { top: 18px; right: 24px; font-size: 22px; }
  .lb-arrow { top: 50%; transform: translateY(-50%); font-size: 22px; padding: 20px; }
  .lb-arrow.prev { left: 16px; }
  .lb-arrow.next { right: 16px; }
  .lb-img-wrap { display: flex; align-items: center; justify-content: center; max-width: 90vw; max-height: 75vh; }
  .lb-img-wrap img { max-width: 90vw; max-height: 75vh; width: auto !important; height: auto !important; object-fit: contain; }
  .lb-info { color: var(--black); margin-top: 15px; text-align: center; }

  /* ══ 보안 ══ */
  body { -webkit-user-select: none; -moz-user-select: none; user-select: none; }
  img { -webkit-user-drag: none; }
</style>
</head>
<body class="light">

<div class="top-bar" id="top-bar">
  <div id="top-bar-content" style="display:flex;justify-content:space-between;align-items:center;width:100%">
    <span id="cargo-logo" class="nav-btn">Junghyun Kim</span>
    <span id="dark-mode-toggle" class="nav-btn">Dark</span>
    <span id="nav-right" class="nav-btn">About</span>
  </div>
</div>

<div class="bottom-bar" id="bottom-bar">
  <div id="bottom-bar-content" style="display:flex;justify-content:space-between;align-items:center;width:100%">
    <span id="mb-btn" class="nav-btn">Moodboard</span>
    <a href="https://instagram.com/bi2ter" target="_blank" class="nav-btn">IG ↗</a>
  </div>
</div>

<div class="mid-label mid-right" id="clock">00:00:00</div>

<div id="page-portfolio">
  <section class="hero" id="hero-section">
    <video class="hero-video" id="main-video" autoplay loop muted playsinline></video>
    <div class="hero-location" id="hero-location"></div>
    <div class="wrap">
      <div class="hero-text">
        <a href="#ss1" class="hero-link">Londonban</a>
        <a href="#ss2" class="hero-link">Blowm</a>
        <a href="#ss3" class="hero-link">Transtoola</a>
      </div>
    </div>
  </section>

  <section class="project-section" id="ss1">
    <div class="wrap">
      <div class="slideshow" id="slides-ss1" data-cur="0">
        <div class="slide active"><img src="1-1.png" class="slide-img"></div>
        <div class="slide"><img src="1-2.png" class="slide-img"></div>
        <div class="slide"><img src="1-3.png" class="slide-img"></div>
        <div class="zone zone-l" onclick="slide('slides-ss1',-1)" style="position:absolute;left:0;top:0;bottom:0;width:50%;z-index:5;"></div>
        <div class="zone zone-r" onclick="slide('slides-ss1',1)" style="position:absolute;right:0;top:0;bottom:0;width:50%;z-index:5;"></div>
        <div class="slide-counter">1 / 2</div>
      </div>
      <div class="project-info">
        <div><div class="pname">Londonban</div><div class="pyear">2026</div></div>
        <div><div class="ptags">Sustainable Design<br>Bio Design<br>Culture & Tradition</div><div class="pdesc">This project reinterprets the soban, a traditional Korean small dining table, through locally sourced materials from London and places it within Britain’s food and drink culture. It proposes a new dining experience where people from diverse cultural backgrounds can share food and drink, fostering mutual understanding and communication. Just as traditional soban reflected the materials and ways of life of their regions, Londonban brings together London’s local materials, food culture, and the circular value of resources.</div></div>
      </div>
    </div>
  </section>

  <section class="project-section" id="ss2">
    <div class="wrap">
      <div class="slideshow" id="slides-ss2" data-cur="0">
        <div class="slide active"><img src="2-1.png" class="slide-img"></div>
        <div class="slide"><img src="2-2.png" class="slide-img"></div>
          <div class="slide"><img src="2-3.png" class="slide-img"></div>
        <div class="zone zone-l" onclick="slide('slides-ss2',-1)" style="position:absolute;left:0;top:0;bottom:0;width:50%;z-index:5;"></div>
        <div class="zone zone-r" onclick="slide('slides-ss2',1)" style="position:absolute;right:0;top:0;bottom:0;width:50%;z-index:5;"></div>
        <div class="slide-counter">1 / 1</div>
      </div>
      <div class="project-info">
        <div><div class="pname">Blowm</div><div class="pyear">2026</div></div>
        <div><div class="ptags">Mental well-being<br>Interaction Design</div><div class="pdesc">BLOWM is a kinetic table lamp that visualises and sonifies human breathing through light, sound, and motion, using radar sensors and NeoPixel LEDs. The project explores how interactions with everyday objects can foster a sense of calm and joy.</div></div>
      </div>
    </div>
  </section>

  <section class="project-section" id="ss3">
    <div class="wrap">
      <div class="slideshow" id="slides-ss3" data-cur="0">
        <div class="slide active"><img src="3-1.jpg" class="slide-img"></div>
         <div class="slide"><img src="3-2.jpg" class="slide-img"></div>
         <div class="slide"><img src="3-3.jpg" class="slide-img"></div>
         <div class="slide"><img src="3-4.jpg" class="slide-img"></div>
        <div class="zone zone-l" onclick="slide('slides-ss3',-1)" style="position:absolute;left:0;top:0;bottom:0;width:50%;z-index:5;"></div>
        <div class="zone zone-r" onclick="slide('slides-ss3',1)" style="position:absolute;right:0;top:0;bottom:0;width:50%;z-index:5;"></div>
        <div class="slide-counter">1 / 1</div>
      </div>
      <div class="project-info">
        <div><div class="pname">Transtoola</div><div class="pyear">2026</div></div>
        <div><div class="ptags">RCA 1T1S(one tool one stool)<br>Experimental Design</div><div class="pdesc">This stool explores the “invisible strength” created through the tension of nylon thread. Its structure is formed from three arc-bent aluminium components, tightly bound and stabilised by a single continuous thread.

When weight is applied, the curved aluminium naturally pushes outward, while the nylon thread at the base resists this force and holds the frame in equilibrium. The stool therefore reveals a delicate balance between tension and compression, transforming an almost imperceptible material into the key structural element.

Its visually precarious form creates a sense of uncertainty and curiosity, inviting the user to approach, test, and physically engage with the object. This tension between visual fragility and structural stability reflects my broader design practice, which seeks to create intuitive interaction through form, material, and affordance.</div></div>
      </div>
    </div>
  </section>

  <section id="about" class="about-section">
    <div class="wrap">
      <div class="about-grid">
        <div class="about-col">
          <div class="about-col-title">Information</div>
          <a href="mailto:10069236@network.rca.ac.uk">Email ↗</a>
          <a href="https://instagram.com/bi2ter" target="_blank">Instagram ↗</a>
          <a href="https://soundcloud.com/97bawmjl5535?ref=clipboard&p=a&c=1&si=28871958483247959038169c14bdecba&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank">SoundCloud ↗</a>
          <p class="bio">Junghyun Kim is a designer working between Seoul and London and the founder of Heavywise Inc. A top graduate in Product Design from the Samsung Art & Design Institute (SADI), he brings together a broad range of disciplines in his practice, including engineering, craft, graphic design, and music. At the Royal College of Art (RCA), he focused on how design can guide human behaviour in more positive and sustainable directions.</p>
        </div>
        <div class="about-col">
          <div class="about-col-title">Education</div>
          <div class="cv-entry"><div class="cv-place">RCA — Design Products</div><div class="cv-year">2025-2026</div></div>
          <div class="cv-entry"><div class="cv-place">SADI — Product Design</div><div class="cv-year">2025 Graduated</div></div>
        </div>
        <div class="about-col">
          <div class="about-col-title">Awards</div>

          <div class="cv-entry">
            <div class="cv-place">Grand Prize, DET@MAKERVERSITY Residency Competition</div>
            <div class="cv-year">Interaction Design, 2026, UK</div>
          </div>

          <div class="cv-entry">
            <div class="cv-place">Winner, PIN UP CONTEST DESIGN AWARDS</div>
            <div class="cv-year">Universal Design, 2026, KOR</div>
          </div>

          <div class="cv-entry">
            <div class="cv-place">First Award, The 9th Seoul Tourism Souvenir Contest</div>
            <div class="cv-year">Product Design, 2021, KOR</div>
          </div>

          <div class="cv-entry">
            <div class="cv-place">Citizen’s Choice Award, The 9th Seoul Tourism Souvenir Contest</div>
            <div class="cv-year">Product Design, 2021, KOR</div>
          </div>

          <div class="cv-entry">
            <div class="cv-place">Silver Award, Gyeonggi Cultural Foundation Makerthon: Pet Family Game</div>
            <div class="cv-year">Product Design, 2021, KOR</div>
          </div>

          <div class="cv-entry">
            <div class="cv-place">Winner, The 7th National Symbols of the Republic of Korea Design Award</div>
            <div class="cv-year">Pattern Design, 2019, KOR</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div style="padding: 20px 20px 120px; text-align: center;">
    <span onclick="goToHome()" class="nav-btn">Top ↑</span>
  </div>

</div>

<div id="page-moodboard">
  <div class="mb-masonry">
    <div class="mb-item"><div class="mb-ph"><img class="mb-real" src="m1.jpg"></div><div class="mb-info">Mood 01</div></div>
    <div class="mb-item"><div class="mb-ph"><img class="mb-real" src="m2.jpg"></div><div class="mb-info">Mood 02</div></div>
    <div class="mb-item"><div class="mb-ph"><img class="mb-real" src="m3.jpg"></div><div class="mb-info">Mood 03</div></div>
  </div>
</div>

<div class="lb" id="lb">
  <button class="lb-close" id="lb-close">×</button>
  <button class="lb-arrow prev">‹</button>
  <div class="lb-img-wrap" id="lb-img"></div>
  <div class="lb-info" id="lb-info"></div>
  <button class="lb-arrow next">›</button>
</div>

<script>
  /* 🛠️ HERO 데이터 설정 (랜덤 영상 및 문구) */
  const heroData = [
    { video: 'i1.mp4', text: 'Pier Head, Liverpool L3 1BY<br>April 2026' },
    { video: 'i2.mp4', text: 'Seoul, South Korea<br>May 2026' },
    { video: 'i3.mp4', text: 'London, United Kingdom<br>June 2026' }
  ];

  function setRandomHero() {
    const randomIdx = Math.floor(Math.random() * heroData.length);
    const selected = heroData[randomIdx];
    document.getElementById('main-video').src = selected.video;
    document.getElementById('hero-location').innerHTML = selected.text;
  }

  /* ══ 기본 유틸리티 ══ */
  function slide(id, dir) {
    const ss = document.getElementById(id); if (!ss) return; 
    const slides = ss.querySelectorAll('.slide'); if (slides.length <= 1) return; 
    let cur = parseInt(ss.getAttribute('data-cur')) || 0;
    slides[cur].classList.remove('active');
    cur = (cur + dir + slides.length) % slides.length;
    slides[cur].classList.add('active'); ss.setAttribute('data-cur', cur);
    const counter = ss.querySelector('.slide-counter'); if (counter) counter.innerText = (cur + 1) + ' / ' + slides.length;
  }

  function tick(){
    const n = new Date(), p = x => String(x).padStart(2,'0');
    const c = document.getElementById('clock'); if (c) c.textContent = p(n.getHours())+':'+p(n.getMinutes())+':'+p(n.getSeconds());
  }
  setInterval(tick, 1000); tick();

  const darkToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  if (localStorage.getItem('theme') === 'dark') { body.classList.add('dark'); darkToggle.innerText = 'Light'; }
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark'); const isDark = body.classList.contains('dark');
    darkToggle.innerText = isDark ? 'Light' : 'Dark'; localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  /* 2. 네비게이션 & 홈/Top 이동 로직 */
  const tBar = document.getElementById('top-bar');
  const bBar = document.getElementById('bottom-bar');
  const hero = document.getElementById('hero-section');
  const mbBtn = document.getElementById('mb-btn');

  function goToHome() {
    body.classList.remove('on-moodboard');
    hero.classList.remove('video-hidden'); 
    tBar.classList.remove('scrolled'); 
    bBar.classList.remove('scrolled');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(onScroll, 50);
  }

  document.getElementById('cargo-logo').addEventListener('click', goToHome);
  document.getElementById('nav-right').addEventListener('click', () => {
    if (body.classList.contains('on-moodboard')) { 
      goToHome(); 
      setTimeout(() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }), 500); 
    } else {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* 3. 모션 & 스크롤 */
  function onScroll() {
    const sy = window.scrollY, vh = window.innerHeight;

    if (!body.classList.contains('on-moodboard')) {
      if (sy > 10) { hero.classList.add('video-hidden'); tBar.classList.add('scrolled'); bBar.classList.add('scrolled'); }
      else { hero.classList.remove('video-hidden'); tBar.classList.remove('scrolled'); bBar.classList.remove('scrolled'); }
    }

    // 프로젝트 및 어바웃 섹션 애니메이션
    document.querySelectorAll('.project-section .wrap, .about-section .wrap').forEach(w => {
      const r = w.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > vh * 0.05) w.classList.remove('below', 'above');
      else if (r.top >= vh * 0.85) w.classList.add('below');
      else if (r.bottom <= vh * 0.05) w.classList.add('above');
    });

    if (body.classList.contains('on-moodboard')) {
      document.querySelectorAll('.mb-item').forEach((it, i) => {
        const r = it.getBoundingClientRect();
        const ph = it.querySelector('.mb-ph');
        if (ph && !it.dataset.motionSet) {
          const img = it.querySelector('img');
          let ratio = (img.naturalHeight / img.naturalWidth) || 1;
          const r0 = Math.max(0.5, Math.min(1.6, ratio));
          it.style.setProperty('--mb-dur', (0.55 + r0 * 0.35).toFixed(2) + 's');
          it.style.setProperty('--mb-dy', Math.round(28 + r0 * 22) + 'px');
          it.dataset.motionSet = '1';
        }
        if (r.top < vh * 0.92 && r.bottom > vh * 0.08) {
          if (!it.classList.contains('visible')) { it.classList.remove('exit-up'); it.classList.add('visible'); }
        } else if (r.bottom < vh * 0.15) {
          if (it.classList.contains('visible')) { it.classList.remove('visible'); it.classList.add('exit-up'); }
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (mbBtn) {
    mbBtn.addEventListener('click', () => {
      body.classList.add('on-moodboard');
      window.scrollTo(0, 0);
      tBar.classList.add('scrolled'); bBar.classList.add('scrolled');
      const items = document.querySelectorAll('.mb-item');
      items.forEach(it => it.classList.remove('visible', 'exit-up'));
      setTimeout(() => {
        items.forEach((it, i) => {
          setTimeout(() => it.classList.add('visible'), i * 50);
        });
      }, 100);
    });
  }

  /* 4. 라이트박스 */
  let lbItems = [], lbIdx = 0;
  function setupLightbox() {
    document.getElementById('lb-close').onclick = () => {
      document.getElementById('lb').classList.remove('visible');
      setTimeout(() => document.getElementById('lb').classList.remove('open'), 300);
      body.style.overflow = '';
    };
    document.querySelector('.lb-arrow.prev').onclick = () => { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; renderLb(); };
    document.querySelector('.lb-arrow.next').onclick = () => { lbIdx = (lbIdx + 1) % lbItems.length; renderLb(); };
    
    document.addEventListener('click', e => {
      const it = e.target.closest('.mb-item'); if (!it) return;
      lbItems = [...document.querySelectorAll('.mb-item')]; lbIdx = lbItems.indexOf(it);
      const lb = document.getElementById('lb');
      lb.classList.add('open'); body.style.overflow = 'hidden';
      setTimeout(() => lb.classList.add('visible'), 10);
      renderLb();
    });

    function renderLb() {
      const srcItem = lbItems[lbIdx];
      const srcImg = srcItem.querySelector('img');
      const lbImgWrap = document.getElementById('lb-img');
      const newImg = srcImg.cloneNode();
      newImg.className = ''; 
      newImg.style.cssText = "max-width:90vw; max-height:75vh; width:auto !important; height:auto !important; object-fit:contain;";
      lbImgWrap.innerHTML = '';
      lbImgWrap.appendChild(newImg);
      document.getElementById('lb-info').innerHTML = srcItem.querySelector('.mb-info').innerHTML;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setRandomHero();
    document.querySelectorAll('.slideshow').forEach(ss => {
      const slides = ss.querySelectorAll('.slide');
      if (ss.querySelector('.slide-counter') && slides.length > 0) ss.querySelector('.slide-counter').innerText = '1 / ' + slides.length;
      ss.setAttribute('data-cur', '0');
    });
    setupLightbox(); onScroll();
  });
</script>

</body>
</html>
