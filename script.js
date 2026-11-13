(() => {
  const games = {
    gd: {
      title: "Geometry Dash",
      url: "https://geodashlite.pages.dev/",
      eyebrow: "NOW PLAYING / RHYTHM",
      label: "GEOMETRY DASH WINDOW"
    },
    skate: {
      title: "SKATE 3",
      url: "https://skate.aaddpp.lol/",
      eyebrow: "NOW PLAYING / SKATE",
      label: "SKATE 3 WINDOW"
    }
  };

  const homeView = document.getElementById("homeView");
  const playerView = document.getElementById("playerView");
  const gameFrame = document.getElementById("gameFrame");
  const playerFrame = document.getElementById("playerFrame");
  const playerTitle = document.getElementById("playerTitle");
  const playerEyebrow = document.getElementById("playerEyebrow");
  const frameLabel = document.getElementById("frameLabel");
  const openTab = document.getElementById("openTab");
  const embedNote = document.getElementById("embedNote");

  document.querySelectorAll("[data-game]").forEach((button) => {
    button.addEventListener("click", () => {
      const game = games[button.dataset.game];
      if (!game) return;
      playerTitle.textContent = game.title;
      playerEyebrow.textContent = game.eyebrow;
      frameLabel.textContent = game.label;
      openTab.href = game.url;
      gameFrame.src = game.url;
      homeView.hidden = true;
      playerView.hidden = false;
      embedNote.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.getElementById("backButton").addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    gameFrame.src = "about:blank";
    playerView.hidden = true;
    homeView.hidden = false;
    embedNote.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("homeLink").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("backButton").click();
  });

  document.getElementById("fullscreenButton").addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (playerFrame.requestFullscreen) {
        await playerFrame.requestFullscreen();
      } else {
        alert("Fullscreen is not supported by this browser.");
      }
    } catch (error) {
      alert("Fullscreen could not be started. Try using the game's own fullscreen control or open it in a new tab.");
    }
  });
})();
