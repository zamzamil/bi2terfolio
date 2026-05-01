/* ════════════════════════════════════════════════════════════════
   PORTFOLIO EDITOR
   - Cmd/Ctrl+E to toggle edit mode
   - Inline contenteditable for all text
   - Drag-drop images on slideshows / moodboard
   - Add/delete/reorder projects, slides, moodboard items
   - Masonry moodboard
   - Dark mode
   - localStorage autosave + HTML export
   ════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const LS_KEY = 'portfolio.snapshot.v1';
  const DARK_KEY = 'portfolio.dark.v1';

  /* ─────────── EDIT MODE STATE ─────────── */
  let editMode = false;
  let dragSrc = null;          // for project/slide/moodboard reordering

  /* ─────────── KEYBOARD TOGGLE ─────────── */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      toggleEdit();
    }
  });

  function toggleEdit(force) {
    editMode = (typeof force === 'boolean') ? force : !editMode;
    document.body.classList.toggle('edit-mode', editMode);
    applyEditableState();
    document.getElementById('edit-toolbar').style.display = editMode ? 'flex' : 'none';
    document.getElementById('edit-hint').style.display = editMode ? 'none' : 'block';
  }

  /* ─────────── MAKE TEXT EDITABLE ─────────── */
  // selectors of text nodes that should become contenteditable in edit mode
  const TEXT_SELECTORS = [
    '.hero-text',
    '.pname', '.pyear', '.ptags', '.pdesc',
    '.about-col-title', '.about-col p', '.about-col a',
    '.cv-place', '.cv-italic', '.cv-year',
    '.bottom-bar a',
    '#cargo-logo',
    '.mb-code', '.mb-author', '.mb-src'
  ];

  function applyEditableState() {
    const editable = editMode;
    document.querySelectorAll(TEXT_SELECTORS.join(',')).forEach(el => {
      if (editable) {
        el.setAttribute('contenteditable', 'plaintext-only');
        if (!el.dataset.editBound) {
          el.addEventListener('input', scheduleSave);
          el.addEventListener('blur', scheduleSave);
          // prevent navigation on contenteditable links
          el.addEventListener('click', e => {
            if (editMode && el.tagName === 'A') e.preventDefault();
          });
          el.dataset.editBound = '1';
        }
      } else {
        el.removeAttribute('contenteditable');
      }
    });

    // dropzones / project chrome visible only in edit mode (CSS handles)
  }

  /* ─────────── DEBOUNCED AUTOSAVE ─────────── */
  let saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveSnapshot, 400);
    flashSaveStatus('saving');
  }
  function flashSaveStatus(state) {
    const el = document.getElementById('save-status');
    if (!el) return;
    if (state === 'saving') el.textContent = '저장 중…';
    else if (state === 'saved') el.textContent = '저장됨';
    else el.textContent = '';
  }

  /* ─────────── SNAPSHOT (capture + restore DOM) ─────────── */
  // Strategy: save innerHTML of #page-portfolio and #page-moodboard.
  // Images uploaded as DataURL are inlined as <img src="data:..."> so they persist.
  function saveSnapshot() {
    try {
      const snap = {
        portfolio: document.getElementById('page-portfolio').innerHTML,
        moodboard: document.getElementById('page-moodboard').innerHTML,
        topBar:    document.getElementById('top-bar-content').innerHTML,
        bottomBar: document.getElementById('bottom-bar-content').innerHTML,
        ts: Date.now()
      };
      localStorage.setItem(LS_KEY, JSON.stringify(snap));
      flashSaveStatus('saved');
      setTimeout(() => flashSaveStatus(''), 1200);
    } catch (e) {
      console.warn('save failed', e);
    }
  }

  function loadSnapshot() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return false;
      const snap = JSON.parse(raw);
      if (snap.portfolio) document.getElementById('page-portfolio').innerHTML = snap.portfolio;
      if (snap.moodboard) document.getElementById('page-moodboard').innerHTML = snap.moodboard;
      if (snap.topBar)    document.getElementById('top-bar-content').innerHTML = snap.topBar;
      if (snap.bottomBar) document.getElementById('bottom-bar-content').innerHTML = snap.bottomBar;
      return true;
    } catch (e) {
      console.warn('load failed', e);
      return false;
    }
  }

  /* ─────────── DRAG & DROP IMAGES ─────────── */
  // Slideshow: drop on a slide → replace; drop on slideshow background → append slide.
  // Moodboard: drop on moodboard area → append item.

  function readFileAsDataURL(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  function imageNaturalSize(src) {
    return new Promise(res => {
      const img = new Image();
      img.onload = () => res({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => res({ w: 800, h: 600 });
      img.src = src;
    });
  }

  /* drop on slideshow */
  async function handleSlideshowDrop(slideshow, files) {
    const imgs = [...files].filter(f => f.type.startsWith('image/'));
    if (!imgs.length) return;
    for (const f of imgs) {
      const url = await readFileAsDataURL(f);
      addSlide(slideshow, url);
    }
    refreshSlideshow(slideshow);
    scheduleSave();
  }

  function addSlide(slideshow, dataUrl) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `<img class="slide-img" src="${dataUrl}" alt=""><button class="del-btn" data-action="del-slide" title="슬라이드 삭제">×</button>`;
    // remove any empty placeholder slide
    const empty = slideshow.querySelector('.slide.empty-slide');
    if (empty) empty.remove();
    // insert before zones
    const zone = slideshow.querySelector('.zone-l');
    slideshow.insertBefore(slide, zone);
  }

  function refreshSlideshow(slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    if (!slides.length) return;
    slides.forEach((s, i) => s.classList.toggle('active', i === 0));
    const cnt = slideshow.querySelector('.slide-counter');
    if (cnt) cnt.textContent = `1 / ${slides.length}`;
    slideshow.dataset.cur = '0';
  }

  /* slideshow controls (override original + handle delete) */
  window.slide = function(id, dir) {
    const ss = (typeof id === 'string') ? document.getElementById(id) : id;
    if (!ss) return;
    const slides = ss.querySelectorAll('.slide');
    if (!slides.length) return;
    let cur = parseInt(ss.dataset.cur || '0', 10);
    slides[cur].classList.remove('active');
    cur = (cur + dir + slides.length) % slides.length;
    slides[cur].classList.add('active');
    ss.dataset.cur = String(cur);
    const cnt = ss.querySelector('.slide-counter');
    if (cnt) cnt.textContent = `${cur+1} / ${slides.length}`;
  };

  /* drop on moodboard */
  async function handleMoodboardDrop(files) {
    const imgs = [...files].filter(f => f.type.startsWith('image/'));
    if (!imgs.length) return;
    const grid = document.getElementById('mb-masonry');
    for (const f of imgs) {
      const url = await readFileAsDataURL(f);
      const size = await imageNaturalSize(url);
      const item = createMoodboardItem(url, size, f.name);
      grid.appendChild(item);
    }
    bindMoodboardItems();
    scheduleSave();
  }

  function createMoodboardItem(src, size, name) {
    const item = document.createElement('div');
    item.className = 'mb-item visible';
    item.draggable = true;
    item.innerHTML = `
      <div class="mb-ph">
        <img class="mb-real" src="${src}" alt="">
      </div>
      <div class="mb-info">
        <div class="mb-code" contenteditable="plaintext-only">${(name||'').replace(/\.[^.]+$/, '').slice(0,12) || '—'}</div>
        <div class="mb-author" contenteditable="plaintext-only">Author</div>
        <div class="mb-src" contenteditable="plaintext-only">SRC</div>
      </div>
      <button class="del-btn" data-action="del-mb" title="삭제">×</button>
    `;
    return item;
  }

  /* ─────────── DROPZONE WIRING ─────────── */
  function wireDropzones() {
    document.querySelectorAll('.slideshow').forEach(ss => {
      if (ss.dataset.dzBound) return;
      ss.dataset.dzBound = '1';

      // hidden file input for click-to-upload
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.style.display = 'none';
      ss.appendChild(input);
      ss._fileInput = input;

      input.addEventListener('change', e => {
        if (e.target.files && e.target.files.length) {
          handleSlideshowDrop(ss, e.target.files);
          input.value = '';
        }
      });

      // click to open file picker (only on empty slide or via add button)
      ss.addEventListener('click', e => {
        if (!editMode) return;
        // ignore clicks on zones, slides w/ images, delete buttons, or counter
        if (e.target.closest('.del-btn, .zone, .slide-counter, .add-slide-btn')) {
          if (e.target.closest('.add-slide-btn')) {
            e.preventDefault();
            e.stopPropagation();
            input.click();
          }
          return;
        }
        // click on empty area → open picker
        if (e.target.closest('.empty-slide') || e.target === ss) {
          e.preventDefault();
          input.click();
        }
      });

      ss.addEventListener('dragover', e => {
        if (!editMode) return;
        e.preventDefault();
        ss.classList.add('drag-over');
      });
      ss.addEventListener('dragleave', () => ss.classList.remove('drag-over'));
      ss.addEventListener('drop', e => {
        if (!editMode) return;
        e.preventDefault();
        ss.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
          handleSlideshowDrop(ss, e.dataTransfer.files);
        }
      });
    });

    const mbZone = document.getElementById('page-moodboard');
    if (mbZone && !mbZone.dataset.dzBound) {
      mbZone.dataset.dzBound = '1';

      // moodboard click-to-upload
      const mbInput = document.createElement('input');
      mbInput.type = 'file';
      mbInput.accept = 'image/*';
      mbInput.multiple = true;
      mbInput.style.display = 'none';
      mbZone.appendChild(mbInput);
      mbInput.addEventListener('change', e => {
        if (e.target.files && e.target.files.length) {
          handleMoodboardDrop(e.target.files);
          mbInput.value = '';
        }
      });
      // expose for hint button
      mbZone._fileInput = mbInput;

      mbZone.addEventListener('dragover', e => {
        if (!editMode) return;
        if (e.dataTransfer.types.includes('text/x-mb-reorder')) return;
        e.preventDefault();
        mbZone.classList.add('drag-over');
      });
      mbZone.addEventListener('dragleave', () => mbZone.classList.remove('drag-over'));
      mbZone.addEventListener('drop', e => {
        if (!editMode) return;
        if (e.dataTransfer.types.includes('text/x-mb-reorder')) return;
        e.preventDefault();
        mbZone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
          handleMoodboardDrop(e.dataTransfer.files);
        }
      });
    }
  }

  /* ─────────── DELETE BUTTONS (event delegation) ─────────── */
  document.addEventListener('click', e => {
    const t = e.target;
    if (!editMode) return;

    if (t.dataset && t.dataset.action) {
      e.preventDefault();
      e.stopPropagation();
      const a = t.dataset.action;
      if (a === 'del-slide') {
        const slide = t.closest('.slide');
        const ss = t.closest('.slideshow');
        slide.remove();
        refreshSlideshow(ss);
        scheduleSave();
      } else if (a === 'del-project') {
        if (confirm('이 프로젝트를 삭제할까요?')) {
          t.closest('.project-block').remove();
          scheduleSave();
        }
      } else if (a === 'del-mb') {
        t.closest('.mb-item').remove();
        scheduleSave();
      } else if (a === 'add-project') {
        addProject();
      } else if (a === 'move-up') {
        const block = t.closest('.project-block');
        const prev = block.previousElementSibling;
        if (prev && prev.classList.contains('project-block')) {
          block.parentNode.insertBefore(block, prev);
          scheduleSave();
        }
      } else if (a === 'move-down') {
        const block = t.closest('.project-block');
        const next = block.nextElementSibling;
        if (next && next.classList.contains('project-block')) {
          block.parentNode.insertBefore(next, block);
          scheduleSave();
        }
      }
    }
  });

  /* ─────────── ADD PROJECT ─────────── */
  function addProject() {
    const id = 'ss' + Date.now();
    const block = document.createElement('section');
    block.className = 'project-section project-block';
    block.innerHTML = `
      <div class="wrap">
        <div class="project-toolbar">
          <button class="drag-handle" draggable="true" title="드래그하여 이동">⋮⋮</button>
          <button data-action="move-up" title="위로">↑</button>
          <button data-action="move-down" title="아래로">↓</button>
          <button data-action="del-project" title="프로젝트 삭제">×</button>
        </div>
        <div class="slideshow" id="${id}" data-cur="0">
          <div class="slide active empty-slide">
            <div class="empty-hint">이미지를 여기로 드래그하세요</div>
          </div>
          <div class="zone zone-l" onclick="slide('${id}',-1)"></div>
          <div class="zone zone-r" onclick="slide('${id}',1)"></div>
          <div class="slide-counter">0 / 0</div>
        </div>
        <div class="project-info">
          <div>
            <div class="pname" contenteditable="plaintext-only">새 프로젝트</div>
            <div class="pyear" contenteditable="plaintext-only">2026</div>
          </div>
          <div>
            <div class="ptags" contenteditable="plaintext-only">Tag One<br>Tag Two</div>
            <div class="pdesc" contenteditable="plaintext-only">프로젝트 설명을 입력하세요.</div>
          </div>
        </div>
      </div>
    `;
    // insert before about
    const about = document.getElementById('about');
    about.parentNode.insertBefore(block, about);
    wireDropzones();
    applyEditableState();
    scheduleSave();
    block.scrollIntoView({behavior:'smooth', block:'center'});
  }

  /* ─────────── PROJECT/SLIDE REORDER (drag) ─────────── */
  function bindProjectDrag() {
    document.querySelectorAll('.project-block').forEach(b => {
      if (b.dataset.dragBound) return;
      b.dataset.dragBound = '1';
      const handle = b.querySelector('.drag-handle');
      if (handle) {
        handle.addEventListener('dragstart', e => {
          if (!editMode) return;
          dragSrc = b;
          b.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/x-proj-reorder', '1');
        });
        handle.addEventListener('dragend', () => {
          b.classList.remove('dragging');
          dragSrc = null;
        });
      }
      b.addEventListener('dragover', e => {
        if (!editMode || !dragSrc || dragSrc === b) return;
        if (!dragSrc.classList.contains('project-block')) return;
        e.preventDefault();
      });
      b.addEventListener('drop', e => {
        if (!editMode || !dragSrc || dragSrc === b) return;
        if (!dragSrc.classList.contains('project-block')) return;
        e.preventDefault();
        const rect = b.getBoundingClientRect();
        const after = (e.clientY - rect.top) > rect.height / 2;
        b.parentNode.insertBefore(dragSrc, after ? b.nextSibling : b);
        scheduleSave();
      });
    });
  }

  /* ─────────── MOODBOARD ITEM REORDER ─────────── */
  function bindMoodboardItems() {
    document.querySelectorAll('#mb-masonry .mb-item').forEach(it => {
      if (!it.dataset.dragBound) {
        it.dataset.dragBound = '1';
        it.draggable = true;
        it.addEventListener('dragstart', e => {
          if (!editMode) return;
          if (e.target.closest('[contenteditable]')) { e.preventDefault(); return; }
          dragSrc = it;
          it.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/x-mb-reorder', '1');
        });
        it.addEventListener('dragend', () => {
          it.classList.remove('dragging');
          dragSrc = null;
        });
        it.addEventListener('dragover', e => {
          if (!editMode || !dragSrc || dragSrc === it) return;
          if (!dragSrc.classList.contains('mb-item')) return;
          e.preventDefault();
        });
        it.addEventListener('drop', e => {
          if (!editMode || !dragSrc || dragSrc === it) return;
          if (!dragSrc.classList.contains('mb-item')) return;
          e.preventDefault();
          const rect = it.getBoundingClientRect();
          const after = (e.clientX - rect.left) > rect.width / 2;
          it.parentNode.insertBefore(dragSrc, after ? it.nextSibling : it);
          scheduleSave();
        });
      }
      // ensure delete button exists
      if (!it.querySelector('.del-btn')) {
        const btn = document.createElement('button');
        btn.className = 'del-btn';
        btn.dataset.action = 'del-mb';
        btn.title = '삭제';
        btn.textContent = '×';
        it.appendChild(btn);
      }
    });
  }

  /* ─────────── ENSURE DELETE BUTTONS EXIST ON EXISTING ITEMS ─────────── */
  function injectChrome() {
    // wrap each non-hero project section in a project-block class so we can manage it
    document.querySelectorAll('#page-portfolio .project-section').forEach(sec => {
      sec.classList.add('project-block');
      // NOTE: do NOT set draggable on whole section — conflicts with file drop on slideshow
      if (!sec.querySelector('.project-toolbar')) {
        const wrap = sec.querySelector('.wrap');
        const tb = document.createElement('div');
        tb.className = 'project-toolbar';
        tb.innerHTML = `
          <button class="drag-handle" draggable="true" title="드래그하여 이동">⋮⋮</button>
          <button data-action="move-up" title="위로">↑</button>
          <button data-action="move-down" title="아래로">↓</button>
          <button data-action="del-project" title="프로젝트 삭제">×</button>
        `;
        wrap.insertBefore(tb, wrap.firstChild);
      }
    });

    // add delete buttons to slides (existing static slides too)
    document.querySelectorAll('.slideshow .slide').forEach(s => {
      if (!s.querySelector('.del-btn')) {
        const b = document.createElement('button');
        b.className = 'del-btn';
        b.dataset.action = 'del-slide';
        b.title = '슬라이드 삭제';
        b.textContent = '×';
        s.appendChild(b);
      }
    });

    // mark slideshow current index attr
    document.querySelectorAll('.slideshow').forEach(ss => {
      if (!ss.dataset.cur) ss.dataset.cur = '0';
    });
  }

  /* ─────────── BUILD MOODBOARD MASONRY FROM EXISTING ITEMS ─────────── */
  function buildMoodboardMasonry() {
    const mb = document.getElementById('page-moodboard');
    if (!mb) return;
    // collect all .mb-item children of any .mb-grid AND any stray ones
    const items = [...mb.querySelectorAll('.mb-item')];
    // wipe and rebuild
    mb.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.id = 'mb-masonry';
    wrap.className = 'mb-masonry';
    items.forEach(it => {
      // make draggable
      it.draggable = true;
      it.classList.add('visible');
      // make text fields editable-friendly
      it.querySelectorAll('.mb-code, .mb-author, .mb-src').forEach(t => {
        if (!t.hasAttribute('contenteditable')) t.setAttribute('contenteditable','plaintext-only');
      });
      wrap.appendChild(it);
    });
    mb.appendChild(wrap);

    // dropzone hint
    const hint = document.createElement('div');
    hint.className = 'mb-drop-hint';
    hint.textContent = '이미지를 드래그하여 추가하세요';
    mb.appendChild(hint);

    bindMoodboardItems();
  }

  /* ─────────── ADD PROJECT BUTTON (placed at end of portfolio) ─────────── */
  function injectAddProjectButton() {
    const portfolio = document.getElementById('page-portfolio');
    if (document.getElementById('add-project-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'add-project-btn';
    btn.dataset.action = 'add-project';
    btn.textContent = '＋ 프로젝트 추가';
    // insert before about
    const about = document.getElementById('about');
    about.parentNode.insertBefore(btn, about);
  }

  /* ─────────── EXPORT AS HTML ─────────── */
  function exportHTML() {
    // clone the document, strip edit-mode artifacts
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll('.del-btn, .project-toolbar, #edit-toolbar, #edit-hint, #add-project-btn, .mb-drop-hint').forEach(n => n.remove());
    clone.querySelectorAll('[contenteditable]').forEach(n => n.removeAttribute('contenteditable'));
    clone.querySelectorAll('[draggable]').forEach(n => n.removeAttribute('draggable'));
    clone.querySelectorAll('.empty-slide').forEach(n => n.remove());
    clone.classList.remove('edit-mode');

    const html = '<!DOCTYPE html>\n<html lang="ko">' + clone.innerHTML + '</html>';
    const blob = new Blob([html], {type:'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ─────────── DARK MODE ─────────── */
  function applyDark(on) {
    document.body.classList.toggle('dark', !!on);
    localStorage.setItem(DARK_KEY, on ? '1' : '0');
    const btn = document.getElementById('dark-btn');
    if (btn) btn.textContent = on ? '☀' : '☾';
  }

  /* ─────────── RESET ─────────── */
  function resetAll() {
    if (!confirm('모든 변경사항을 초기화할까요? 되돌릴 수 없습니다.')) return;
    localStorage.removeItem(LS_KEY);
    location.reload();
  }

  /* ─────────── INIT ─────────── */
  function init() {
    // 1. try to restore from localStorage
    loadSnapshot();

    // 2. inject chrome (delete buttons, toolbars, etc) AFTER restore so it
    //    works on both fresh and restored DOM
    injectChrome();
    buildMoodboardMasonry();
    injectAddProjectButton();
    wireDropzones();
    bindProjectDrag();
    bindMoodboardItems();

    // 3. dark mode
    applyDark(localStorage.getItem(DARK_KEY) === '1');

    // 4. wire toolbar buttons
    document.getElementById('export-btn').onclick = exportHTML;
    document.getElementById('reset-btn').onclick = resetAll;
    document.getElementById('dark-btn').onclick = () => applyDark(!document.body.classList.contains('dark'));
    document.getElementById('close-btn').onclick = () => toggleEdit(false);

    // 5. clock
    function tick(){
      const n = new Date(), p = x => String(x).padStart(2,'0');
      const c = document.getElementById('clock');
      if (c) c.textContent = p(n.getHours())+':'+p(n.getMinutes())+':'+p(n.getSeconds());
    }
    tick(); setInterval(tick, 1000);

    // 6. moodboard toggle (preserve original behavior)
    window.toggleMoodboardPage = function() {
      const onMB = document.body.classList.toggle('on-moodboard');
      window.scrollTo(0,0);
    };
    document.getElementById('cargo-logo').addEventListener('click', e => {
      if (editMode) return;
      if (document.body.classList.contains('on-moodboard')) {
        document.body.classList.remove('on-moodboard');
        window.scrollTo(0,0);
      }
    });
    document.getElementById('mb-btn').addEventListener('click', e => {
      if (editMode) return;
      if (!document.body.classList.contains('on-moodboard')) {
        document.body.classList.add('on-moodboard');
        window.scrollTo(0,0);
      }
    });
    document.getElementById('nav-right').addEventListener('click', e => {
      if (editMode) return;
      if (document.body.classList.contains('on-moodboard')) {
        document.body.classList.remove('on-moodboard');
        window.scrollTo(0,0);
      } else {
        document.getElementById('about').scrollIntoView({behavior:'smooth'});
      }
    });

    // 7. lightbox (only when not editing)
    setupLightbox();

    // 8. apply current edit state
    applyEditableState();

    // 9. scroll motion (project sections + moodboard items)
    setupScrollMotion();
  }

  /* ─────────── SCROLL MOTION ─────────── */
  function setupScrollMotion() {
    // Initialize project section wraps as 'below' until they scroll into view
    document.querySelectorAll('.project-section .wrap').forEach(w => {
      const r = w.getBoundingClientRect();
      if (r.top >= window.innerHeight) w.classList.add('below');
    });

    function checkProjects() {
      document.querySelectorAll('.project-section .wrap').forEach(w => {
        const r = w.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.top < vh * 0.85 && r.bottom > vh * 0.05) {
          w.classList.remove('below', 'above');
        } else if (r.top >= vh * 0.85) {
          w.classList.remove('above');
          w.classList.add('below');
        } else if (r.bottom <= vh * 0.05) {
          w.classList.remove('below');
          w.classList.add('above');
        }
      });
    }

    function checkMoodboard() {
      const mb = document.getElementById('page-moodboard');
      if (!mb || mb.offsetParent === null) return; // hidden — skip
      const items = document.querySelectorAll('#mb-masonry .mb-item');
      const vh = window.innerHeight;
      items.forEach((it, i) => {
        const r = it.getBoundingClientRect();
        // per-aspect motion: tall items animate longer/slower, wide items snappier
        const ph = it.querySelector('.mb-ph');
        let ratio = 1;
        if (ph) {
          const phr = ph.getBoundingClientRect();
          if (phr.width > 0) ratio = phr.height / phr.width;
        }
        // duration & translate amount vary by ratio (range 0.5–1.6)
        const r0 = Math.max(0.5, Math.min(1.6, ratio));
        const dur = (0.55 + r0 * 0.35).toFixed(2);     // 0.72s … 1.11s
        const dy  = Math.round(28 + r0 * 22);          // 39px … 63px
        if (!it.dataset.motionSet) {
          it.style.setProperty('--mb-dur', dur + 's');
          it.style.setProperty('--mb-dy',  dy  + 'px');
          it.dataset.motionSet = '1';
        }

        const inView      = r.top < vh * 0.92 && r.bottom > vh * 0.08;
        const exitingUp   = r.bottom < vh * 0.15;
        const belowView   = r.top >= vh * 0.92;

        if (inView) {
          if (!it.classList.contains('visible')) {
            it.classList.remove('exit-up');
            const delay = (i % 8) * 40;
            setTimeout(() => it.classList.add('visible'), delay);
          }
        } else if (exitingUp) {
          if (it.classList.contains('visible')) {
            it.classList.remove('visible');
            it.classList.add('exit-up');
          }
        } else if (belowView) {
          it.classList.remove('visible', 'exit-up');
        }
      });
    }

    function onScroll() {
      checkProjects();
      if (document.body.classList.contains('on-moodboard')) checkMoodboard();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // also re-check when toggling moodboard page
    const mbBtn = document.getElementById('mb-btn');
    if (mbBtn) mbBtn.addEventListener('click', () => {
      // reset moodboard items so they animate in fresh
      document.querySelectorAll('#mb-masonry .mb-item').forEach(it => {
        it.classList.remove('visible', 'exit-up');
      });
      setTimeout(checkMoodboard, 50);
    });
    const cargo = document.getElementById('cargo-logo');
    if (cargo) cargo.addEventListener('click', () => setTimeout(onScroll, 50));

    // initial passes
    setTimeout(onScroll, 30);
    setTimeout(checkMoodboard, 60);
  }

  /* ─────────── LIGHTBOX (simplified) ─────────── */
  let lbItems = [], lbIdx = 0;
  function setupLightbox() {
    document.getElementById('lb-close').onclick = lbClose;
    document.querySelector('.lb-arrow.prev').onclick = () => lbMove(-1);
    document.querySelector('.lb-arrow.next').onclick = () => lbMove(1);
    document.addEventListener('keydown', e => {
      if (!document.getElementById('lb').classList.contains('open')) return;
      if (e.key === 'Escape') lbClose();
      if (e.key === 'ArrowRight') lbMove(1);
      if (e.key === 'ArrowLeft') lbMove(-1);
    });
    document.addEventListener('click', e => {
      if (editMode) return;
      const item = e.target.closest('#mb-masonry .mb-item');
      if (!item) return;
      // build list
      lbItems = [...document.querySelectorAll('#mb-masonry .mb-item')];
      lbIdx = lbItems.indexOf(item);
      lbOpen();
    });
  }
  function lbOpen() {
    const lb = document.getElementById('lb');
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbRender();
    requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('visible')));
  }
  function lbClose() {
    const lb = document.getElementById('lb');
    lb.classList.remove('visible');
    setTimeout(() => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }, 300);
  }
  function lbMove(dir) {
    if (!lbItems.length) return;
    lbIdx = (lbIdx + dir + lbItems.length) % lbItems.length;
    lbRender();
  }
  function lbRender() {
    const item = lbItems[lbIdx];
    const wrap = document.getElementById('lb-img');
    const info = document.getElementById('lb-info');
    const ph = item.querySelector('.mb-ph').cloneNode(true);
    ph.style.padding = '0';
    ph.style.paddingBottom = '0';
    ph.style.maxWidth = '90vw';
    ph.style.maxHeight = '75vh';
    ph.style.height = 'auto';
    const realImg = ph.querySelector('img');
    if (realImg) {
      realImg.style.position = 'static';
      realImg.style.maxWidth = '90vw';
      realImg.style.maxHeight = '75vh';
      realImg.style.width = 'auto';
      realImg.style.height = 'auto';
    }
    wrap.innerHTML = '';
    wrap.appendChild(ph);
    info.innerHTML = item.querySelector('.mb-info').innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
