const video = document.getElementById('bg-video');
const card = document.querySelector('[data-glass-card]');
const container = document.getElementById('dup-video-container');
const canvas = document.getElementById('dup-image');

if (video && card && container && canvas) {
  const ctx = canvas.getContext('2d');
  const DUP_PIXEL_RATIO = 1;

  // Sizing the duplicate to the viewport rather than to the card is deliberate.
  // The filter shifts each colour channel by a different amount, so the filtered element's
  // own leading edges show hard channel-separation bands. At viewport size those bands fall
  // outside the card and only clean refraction shows.

  // The duplicate stays at 1× even on retina: the SVG filter's cost scales with pixel count,
  // and what shows through is a soft refraction where 4× the filter work buys nothing.

  let currentW = 0;
  let currentH = 0;

  function render() {
    requestAnimationFrame(render);

    const rect = card.getBoundingClientRect();
    const vh = document.documentElement.clientHeight;
    const vw = document.documentElement.clientWidth;

    // Performance optimization: skip canvas drawing if card is outside the viewport
    if (rect.width === 0 || rect.height === 0 || rect.bottom < -50 || rect.top > vh + 50 || !video.videoWidth || !video.videoHeight) {
      return;
    }

    container.style.left = `${-rect.left}px`;
    container.style.top = `${-rect.top}px`;
    container.style.width = `${vw}px`;
    container.style.height = `${vh}px`;

    const targetW = Math.round(vw * DUP_PIXEL_RATIO);
    const targetH = Math.round(vh * DUP_PIXEL_RATIO);

    if (canvas.width !== targetW || canvas.height !== targetH || currentW !== vw || currentH !== vh) {
      canvas.width = targetW;
      canvas.height = targetH;
      currentW = vw;
      currentH = vh;
    }

    try {
      const cover = Math.max(vw / video.videoWidth, vh / video.videoHeight);
      const sw = vw / cover;
      const sh = vh / cover;
      const sx = (video.videoWidth - sw) / 2;
      const sy = (video.videoHeight - sh) / 2;
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetW, targetH);
    } catch {
      // Frame may not be decodable yet
    }
  }

  requestAnimationFrame(render);
}
