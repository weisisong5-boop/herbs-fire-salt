(() => {
  const key = "season-cover-handoff";
  const cover = document.querySelector(".season-header .season-cover-photo");
  if (!cover) {
    const saveCover = () => {
      const image = document.querySelector('.season-cover .season-card[data-active="true"]:not([data-tile]) img');
      if (!image?.naturalWidth || !image.currentSrc) return;
      try { sessionStorage.setItem(key, JSON.stringify({ src: image.currentSrc, time: Date.now() })); } catch {}
    };
    const explore = document.querySelector(".season-cover .explore");
    let navigating = false;
    const prepareCover = () => {
      const image = document.querySelector('.season-cover .season-card[data-active="true"]:not([data-tile]) img');
      return image?.decode().catch(() => {});
    };
    explore?.addEventListener("pointerenter", prepareCover);
    explore?.addEventListener("focus", prepareCover);
    explore?.addEventListener("click", (event) => {
      const destination = new URL(explore.href);
      if (!/^\/recipes\/season\/(spring|summer)\/$/.test(destination.pathname) ||
          event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (navigating) return;
      navigating = true;
      window.setTimeout(() => { navigating = false; }, 1500);
      void Promise.race([
        prepareCover(),
        new Promise((resolve) => window.setTimeout(resolve, 800)),
      ]).then(() => {
        saveCover();
        location.assign(destination.href);
      });
    });
    window.addEventListener("pageswap", saveCover);
    return;
  }

  const header = cover.closest(".season-header");
  const accents = [...header.querySelectorAll(".spring-pea-shoot, .season-title-accent img, img.season-title-accent")];
  const decode = (image) => image.decode().then(() => true, () => false);
  let transition = Promise.resolve();
  let fallback;
  let fallbackReady = false;
  window.addEventListener("pagereveal", (event) => {
    const from = window.navigation?.activation?.from?.url;
    const fromRecipes = fallback || (from && new URL(from).pathname === "/");
    if (fromRecipes && !fallbackReady && !(cover.complete && cover.naturalWidth)) {
      event.viewTransition?.skipTransition();
    }
    transition = event.viewTransition?.finished.catch(() => {}) ?? transition;
  }, { once: true });

  try {
    const record = JSON.parse(sessionStorage.getItem(key) || "null");
    sessionStorage.removeItem(key);
    if (record && Date.now() - record.time < 15000 &&
        cover.srcset.split(",").some((candidate) => new URL(candidate.trim().split(/\s+/)[0], location.href).href === record.src)) {
      fallback = new Image();
      fallback.className = "season-cover-handoff";
      fallback.alt = "";
      fallback.src = record.src;


    }
  } catch {}

  const coverReady = decode(cover);
  const firstCoverReady = fallback ? Promise.any([
    coverReady.then((ready) => { if (!ready) throw new Error("Cover unavailable"); }),
    decode(fallback).then((ready) => {
      if (!ready) throw new Error("Cached cover unavailable");
      fallbackReady = true;
      if (!cover.complete || !cover.naturalWidth) {
        cover.before(fallback);
        header.classList.add("has-cover-handoff");
      }
    }),
  ]).catch(() => {}) : coverReady;
  window.addEventListener("pageshow", () => {
    void Promise.all([firstCoverReady, transition, ...accents.map(decode)]).then(() => {
      header.setAttribute("data-motion-ready", "");
    });
    void Promise.all([coverReady, transition]).then(([ready]) => {
      if (!fallback || !ready) return;
      fallback.remove();
      header.classList.remove("has-cover-handoff");
    });
  }, { once: true });
})();
