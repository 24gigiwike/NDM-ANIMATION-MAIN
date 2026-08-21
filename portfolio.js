import { projects } from './portfolio-data.js';

export function initPortfolio() {
  const container = document.getElementById('portfolio-track');
  const previewList = document.getElementById('hero-preview-list');
  const progressText = document.getElementById('portfolio-progress-indicator');
  const prevBtn = document.getElementById('portfolio-prev-btn');
  const nextBtn = document.getElementById('portfolio-next-btn');

  if (!container) return;

  // 1. Populate the hero card preview list (repurposing the right side findings panel)
  if (previewList) {
    previewList.innerHTML = projects.slice(0, 4).map((p, index) => `
      <a href="#${p.id}" class="finding finding--link" data-jump-to="${p.id}">
        <div class="finding__head">
          <h3 class="finding__title">WORK ${p.number}</h3>
          <span class="finding__meta">${p.category.split('&')[0].trim()}</span>
        </div>
        <p class="finding__text">${p.description}</p>
      </a>
    `).join('');
  }

  // 2. Render the 9 Portfolio Projects
  container.innerHTML = projects.map((p, index) => `
    <article class="portfolio-item" id="${p.id}" data-index="${index}" data-number="${p.number}">
      <div class="portfolio-item__video-wrapper">
        <div class="portfolio-item__video-shimmer" aria-hidden="true"></div>
        <video 
          class="portfolio-item__video" 
          data-src="${p.videoUrl}"
          playsinline 
          muted 
          loop 
          preload="metadata"
          aria-label="${p.title} - ${p.category} animation preview"
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

        <div class="portfolio-item__number-tag" aria-hidden="true">${p.number}</div>
      </div>

      <div class="portfolio-item__info">
        <div class="portfolio-item__header">
          <div class="portfolio-item__titles">
            <span class="portfolio-item__num">// ${p.number}</span>
            <h2 class="portfolio-item__title">${p.title}</h2>
          </div>
          <span class="portfolio-item__year">${p.year}</span>
        </div>
        <div class="portfolio-item__details">
          <span class="portfolio-item__category">${p.category}</span>
          <p class="portfolio-item__desc">${p.description}</p>
        </div>
      </div>
    </article>
  `).join('');

  // 3. Lazy Loading & Viewport Play/Pause Observer
  const videoElements = container.querySelectorAll('.portfolio-item__video');
  const itemElements = container.querySelectorAll('.portfolio-item');

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const card = video.closest('.portfolio-item');
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
              // Browser policy fallback
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

  // 4. Progress tracker on scroll
  const isHorizontalLayout = () => window.innerWidth >= 1024;

  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const num = entry.target.dataset.number;
        if (progressText && num) {
          progressText.textContent = `${num} // 09`;
        }
      }
    });
  }, {
    root: isHorizontalLayout() ? container : null,
    threshold: 0.5
  });

  itemElements.forEach((item) => itemObserver.observe(item));

  // 5. Individual Video Controls Interaction
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

  // 6. Horizontal Navigation Buttons (Previous / Next)
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

  // 7. Mouse Wheel translation for Horizontal Track on Large Desktop
  const horizontalSection = document.getElementById('portfolio-section');
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

  // 8. Jump to project handler (from hero card or menu links)
  document.querySelectorAll('[data-jump-to]').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = elem.getAttribute('href')?.replace('#', '') || elem.dataset.jumpTo;
      const targetElem = document.getElementById(targetId);
      if (!targetElem) return;

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
