import { 
  projects, 
  regularProjects, 
  aiProjects, 
  animationProjects, 
  motionProjects 
} from './portfolio-data.js';

export function initPortfolio() {
  const container = document.getElementById('portfolio-track');
  const previewList = document.getElementById('hero-preview-list');
  const progressText = document.getElementById('portfolio-progress-indicator');
  const prevBtn = document.getElementById('portfolio-prev-btn');
  const nextBtn = document.getElementById('portfolio-next-btn');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');

  if (!container) return;

  const categoryTotals = {
    all: '15',
    works: '03',
    ai: '03',
    animation: '04',
    motion: '05'
  };

  // 1. Populate the hero card preview list (curated selection across categories)
  if (previewList) {
    const previewItems = [
      regularProjects[0],
      aiProjects[0],
      animationProjects[0],
      motionProjects[0]
    ];
    previewList.innerHTML = previewItems.map((p) => `
      <a href="#${p.id}" class="finding finding--link" data-jump-to="${p.id}" data-category="${p.categoryType}">
        <div class="finding__head">
          <h3 class="finding__title">${p.category === 'WORKS' ? 'WORK' : p.category} ${p.number}</h3>
          <span class="finding__meta">${p.category}</span>
        </div>
        <p class="finding__text">${p.description}</p>
      </a>
    `).join('');
  }

  // 2. Render Portfolio Items across all 4 categories
  function renderProjectCard(p, globalIndex) {
    const globalNumStr = String(globalIndex + 1).padStart(2, '0');

    return `
      <article class="portfolio-item" id="${p.id}" data-category="${p.categoryType}" data-number="${p.number}" data-global-number="${globalNumStr}">
        <div class="portfolio-item__video-wrapper">
          <div class="portfolio-item__video-shimmer" aria-hidden="true"></div>
          <video 
            class="portfolio-item__video" 
            data-src="${p.videoUrl}"
            playsinline 
            muted 
            loop 
            preload="metadata"
            aria-label="${p.title} - ${p.category} preview"
          ></video>
          
          <div class="portfolio-item__controls" aria-hidden="false">
            <button class="portfolio-control-btn portfolio-control-btn--play" type="button" aria-label="Play or pause video" data-action="toggle-play">
              <svg class="icon icon--play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <svg class="icon icon--pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <button class="portfolio-control-btn portfolio-control-btn--mute" type="button" aria-label="Mute or unmute video" data-action="toggle-mute">
              <svg class="icon icon--muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
              <svg class="icon icon--unmuted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="portfolio-item__info">
          <div class="portfolio-item__header">
            <div class="portfolio-item__titles">
              <span class="portfolio-item__num">// ${p.number}</span>
              <h3 class="portfolio-item__title">${p.title}</h3>
            </div>
            <span class="portfolio-item__year">${p.year}</span>
          </div>
          <div class="portfolio-item__details">
            <div class="portfolio-item__category-editorial">
              <span class="portfolio-item__category-text">${p.category}</span>
              <span class="portfolio-item__category-sep" aria-hidden="true">—</span>
              <span class="portfolio-item__category-sub">${p.categoryLabel}</span>
            </div>
            <p class="portfolio-item__desc">${p.description}</p>
          </div>
        </div>
      </article>
    `;
  }

  const worksIntroCard = `
    <article class="portfolio-item portfolio-item--intro" id="works-intro" data-category="works">
      <div class="portfolio-intro-card">
        <div class="portfolio-intro-card__header">
          <span class="portfolio-intro-card__eyebrow">// SECTION 01</span>
          <span class="portfolio-intro-card__category-title">WORKS</span>
        </div>
        <div class="portfolio-intro-card__body">
          <h3 class="portfolio-intro-card__title">Selected Animation &amp; Commercial Works</h3>
          <div class="portfolio-intro-card__divider" aria-hidden="true"></div>
          <p class="portfolio-intro-card__desc">
            Kinetic choreography, rhythm, and visual storytelling crafted across commercial motion design, brand narratives, and character dynamics.
          </p>
        </div>
        <div class="portfolio-intro-card__footer">
          <div class="portfolio-intro-card__rule">
            <span class="rule__seg rule__seg--mid"></span>
            <span class="rule__plus">+</span>
            <span class="rule__seg rule__seg--mid"></span>
          </div>
          <span class="portfolio-intro-card__meta">03 Studio Works →</span>
        </div>
      </div>
    </article>
  `;

  const aiIntroCard = `
    <article class="portfolio-item portfolio-item--intro" id="ai-works-intro" data-category="ai">
      <div class="portfolio-intro-card">
        <div class="portfolio-intro-card__header">
          <span class="portfolio-intro-card__eyebrow">// SECTION 02</span>
          <span class="portfolio-intro-card__category-title">AI WORKS</span>
        </div>
        <div class="portfolio-intro-card__body">
          <h3 class="portfolio-intro-card__title">Generative Motion &amp; Synthetic Cinematography</h3>
          <div class="portfolio-intro-card__divider" aria-hidden="true"></div>
          <p class="portfolio-intro-card__desc">
            Studio motion studies examining procedural camera velocity, organic textures, and synthetic cinematography within NDM's animation direction practice.
          </p>
        </div>
        <div class="portfolio-intro-card__footer">
          <div class="portfolio-intro-card__rule">
            <span class="rule__seg rule__seg--mid"></span>
            <span class="rule__plus">+</span>
            <span class="rule__seg rule__seg--mid"></span>
          </div>
          <span class="portfolio-intro-card__meta">03 Studio Studies →</span>
        </div>
      </div>
    </article>
  `;

  const animationIntroCard = `
    <article class="portfolio-item portfolio-item--intro" id="animation-intro" data-category="animation">
      <div class="portfolio-intro-card">
        <div class="portfolio-intro-card__header">
          <span class="portfolio-intro-card__eyebrow">// SECTION 03</span>
          <span class="portfolio-intro-card__category-title">ANIMATION</span>
        </div>
        <div class="portfolio-intro-card__body">
          <h3 class="portfolio-intro-card__title">Character &amp; Dimensional Animation</h3>
          <div class="portfolio-intro-card__divider" aria-hidden="true"></div>
          <p class="portfolio-intro-card__desc">
            Fluid simulations, character rhythm, and dimensional keyframe choreographies created for commercial, narrative, and editorial expressions.
          </p>
        </div>
        <div class="portfolio-intro-card__footer">
          <div class="portfolio-intro-card__rule">
            <span class="rule__seg rule__seg--mid"></span>
            <span class="rule__plus">+</span>
            <span class="rule__seg rule__seg--mid"></span>
          </div>
          <span class="portfolio-intro-card__meta">04 Selected Works →</span>
        </div>
      </div>
    </article>
  `;

  const motionIntroCard = `
    <article class="portfolio-item portfolio-item--intro" id="motion-intro" data-category="motion">
      <div class="portfolio-intro-card">
        <div class="portfolio-intro-card__header">
          <span class="portfolio-intro-card__eyebrow">// SECTION 04</span>
          <span class="portfolio-intro-card__category-title">MOTION DESIGN</span>
        </div>
        <div class="portfolio-intro-card__body">
          <h3 class="portfolio-intro-card__title">Spatial Composition &amp; Kinetic Systems</h3>
          <div class="portfolio-intro-card__divider" aria-hidden="true"></div>
          <p class="portfolio-intro-card__desc">
            Atmospheric lighting, geometric algorithmic curves, and kinetic typographic sequences designed for immersive brand and screen environments.
          </p>
        </div>
        <div class="portfolio-intro-card__footer">
          <div class="portfolio-intro-card__rule">
            <span class="rule__seg rule__seg--mid"></span>
            <span class="rule__plus">+</span>
            <span class="rule__seg rule__seg--mid"></span>
          </div>
          <span class="portfolio-intro-card__meta">05 Selected Works →</span>
        </div>
      </div>
    </article>
  `;

  const regularHtml = regularProjects.map((p, idx) => renderProjectCard(p, idx)).join('');
  const aiHtml = aiProjects.map((p, idx) => renderProjectCard(p, idx + 3)).join('');
  const animationHtml = animationProjects.map((p, idx) => renderProjectCard(p, idx + 6)).join('');
  const motionHtml = motionProjects.map((p, idx) => renderProjectCard(p, idx + 10)).join('');

  container.innerHTML = worksIntroCard + regularHtml + aiIntroCard + aiHtml + animationIntroCard + animationHtml + motionIntroCard + motionHtml;

  // 3. Category Filter Logic (ALL / WORKS / AI WORKS / ANIMATION / MOTION DESIGN)
  let activeFilter = 'all';

  function applyFilter(filter) {
    activeFilter = filter;

    // Update filter navigation active state
    filterBtns.forEach((btn) => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const allItems = container.querySelectorAll('.portfolio-item');

    allItems.forEach((item) => {
      const itemCat = item.dataset.category;

      let show = false;
      if (filter === 'all') {
        show = true;
      } else {
        // Direct category view: display section intro label and project cards for the active category
        show = itemCat === filter;
      }

      if (show) {
        item.classList.remove('is-hidden');
      } else {
        item.classList.add('is-hidden');
        // Pause any video that gets hidden
        const video = item.querySelector('.portfolio-item__video');
        if (video && !video.paused) {
          video.pause();
          const playIcon = item.querySelector('.icon--play');
          const pauseIcon = item.querySelector('.icon--pause');
          if (playIcon) playIcon.style.display = 'block';
          if (pauseIcon) pauseIcon.style.display = 'none';
        }
      }
    });

    // Reset horizontal / vertical scroll to starting project smoothly
    if (isHorizontalLayout()) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    }

    // Update progress indicator
    const totalDisplay = categoryTotals[filter] || '15';
    if (progressText) {
      progressText.textContent = `01 // ${totalDisplay}`;
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter) applyFilter(filter);
    });
  });

  // 4. Lazy Loading & Viewport Play/Pause Observer
  const videoElements = container.querySelectorAll('.portfolio-item__video');
  const itemElements = container.querySelectorAll('.portfolio-item:not(.portfolio-item--intro)');

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const card = video.closest('.portfolio-item');
      if (card && card.classList.contains('is-hidden')) return;

      const playIcon = card?.querySelector('.icon--play');
      const pauseIcon = card?.querySelector('.icon--pause');

      if (entry.isIntersecting) {
        // Lazy load src if not loaded yet
        if (!video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
        }

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (playIcon && pauseIcon) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
              }
            })
            .catch(() => {
              // Browser autoplay policy fallback
            });
        }
      } else {
        if (!video.paused) {
          video.pause();
          if (playIcon && pauseIcon) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
          }
        }
      }
    });
  }, {
    root: null,
    rootMargin: '100px 50px',
    threshold: 0.25
  });

  videoElements.forEach((video) => videoObserver.observe(video));

  // 5. Progress Tracker on Scroll
  function isHorizontalLayout() {
    return window.innerWidth >= 1024;
  }

  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        if (item.classList.contains('is-hidden')) return;

        if (progressText) {
          if (activeFilter === 'all') {
            const globalNum = item.dataset.globalNumber;
            if (globalNum) progressText.textContent = `${globalNum} // 15`;
          } else {
            const num = item.dataset.number;
            const total = categoryTotals[activeFilter] || '15';
            if (num) progressText.textContent = `${num} // ${total}`;
          }
        }
      }
    });
  }, {
    root: isHorizontalLayout() ? container : null,
    threshold: 0.5
  });

  itemElements.forEach((item) => itemObserver.observe(item));

  // 6. Individual Video Controls Interaction
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.portfolio-control-btn');
    if (!btn) return;

    const card = btn.closest('.portfolio-item');
    if (!card) return;

    const video = card.querySelector('.portfolio-item__video');
    if (!video) return;

    const action = btn.dataset.action;

    if (action === 'toggle-play') {
      const playIcon = btn.querySelector('.icon--play');
      const pauseIcon = btn.querySelector('.icon--pause');

      if (video.paused) {
        video.play();
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
      } else {
        video.pause();
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
      }
    } else if (action === 'toggle-mute') {
      const mutedIcon = btn.querySelector('.icon--muted');
      const unmutedIcon = btn.querySelector('.icon--unmuted');

      video.muted = !video.muted;
      if (video.muted) {
        if (mutedIcon) mutedIcon.style.display = 'block';
        if (unmutedIcon) unmutedIcon.style.display = 'none';
      } else {
        if (mutedIcon) mutedIcon.style.display = 'none';
        if (unmutedIcon) unmutedIcon.style.display = 'block';
      }
    }
  });

  // 7. Horizontal Navigation Buttons (Previous / Next)
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (isHorizontalLayout()) {
        container.scrollBy({ left: -window.innerWidth * 0.75, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -400, behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      if (isHorizontalLayout()) {
        container.scrollBy({ left: window.innerWidth * 0.75, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: 400, behavior: 'smooth' });
      }
    });
  }

  // 8. Mouse Wheel translation for Horizontal Track on Large Desktop
  const horizontalSection = document.getElementById('portfolio') || document.getElementById('portfolio-section');
  if (horizontalSection && container) {
    horizontalSection.addEventListener('wheel', (e) => {
      if (!isHorizontalLayout()) return;

      // Allow vertical scroll if at the very beginning/end
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const isScrollingRight = e.deltaY > 0;
      const isScrollingLeft = e.deltaY < 0;

      if ((isScrollingRight && container.scrollLeft < maxScrollLeft - 5) || 
          (isScrollingLeft && container.scrollLeft > 5)) {
        // Translate vertical wheel into horizontal movement
        container.scrollLeft += e.deltaY * 1.2;
        e.preventDefault();
      }
    }, { passive: false });
  }

  // 9. Jump to Project Handler (from Hero Card Preview or External Anchors)
  document.querySelectorAll('[data-jump-to]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = elem.getAttribute('href')?.replace('#', '') || elem.dataset.jumpTo;
      const targetElem = document.getElementById(targetId);
      if (!targetElem) return;

      // If target item is in a category that's currently hidden by the filter, activate 'all'
      const itemCategory = targetElem.dataset.category;
      if (itemCategory && activeFilter !== 'all' && activeFilter !== itemCategory) {
        applyFilter('all');
      }

      if (isHorizontalLayout()) {
        const portfolioSec = document.getElementById('portfolio');
        if (portfolioSec) {
          portfolioSec.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }, 200);
      } else {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

