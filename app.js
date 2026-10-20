(() => {
  'use strict';

  const { consoles, games } = window.GAME_ON;
  const byId = new Map(games.map(game => [game.id, game]));
  const systems = new Map(consoles.map(console => [console.id, console]));
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mediaNames = { cartridge: 'Cartridge', disc: 'Disc', 'mini-disc': 'Mini disc', 'game-card': 'Game card' };
  let currentConsole = 'snes';
  let selected = byId.get('super-mario-world');
  let player = null;
  let generation = 0;
  let playerTimer = null;
  let flyingMedia = null;
  let flight = null;
  let apiPromise = null;
  let phase = 'ready';
  let muted = true;

  function videoLink(game) {
    return `https://www.youtube.com/watch?v=${game.videoId}&t=${game.start}s`;
  }

  function renderNav() {
    $('console-nav').innerHTML = consoles.map(console => `<button class="console-tab" type="button" data-console="${console.id}" aria-label="${escape(console.name)}" aria-pressed="${console.id === currentConsole}">${window.consoleArt(console.id, `nav-${console.id}`)}<span>${escape(console.short)}</span></button>`).join('');
  }

  function renderShelf() {
    $('game-shelf').innerHTML = games.filter(game => game.console === currentConsole).map(game => `<button type="button" class="shelf-game" data-game="${game.id}" aria-pressed="${game.id === selected.id}" aria-label="Load ${escape(game.title)}${game.tournament ? ', tournament game' : ''}"><span class="shelf-cover"><img src="${game.cover}" alt="" width="120" height="96"></span>${game.tournament ? `<span class="shelf-trophy" title="${escape(game.tournament)}">${icon('trophy')}</span>` : ''}<strong>${escape(game.title)}</strong><small>${game.year} · ${escape(game.genre)}</small></button>`).join('');
  }

  function markShelf() {
    $('game-shelf').querySelectorAll('[data-game]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.game === selected.id)));
  }

  function renderStation() {
    const console = systems.get(currentConsole);
    $('console-model').innerHTML = window.consoleArt(console.id, 'station');
    $('console-model').setAttribute('role', 'img');
    $('console-model').setAttribute('aria-label', `${console.name} connected to a CRT television`);
    $('slot-target').style.left = `${console.slot[0]}%`;
    $('slot-target').style.top = `${console.slot[1]}%`;
    $('station-name').textContent = console.name;
    $('console-nav').querySelectorAll('[data-console]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.console === currentConsole)));
    renderShelf();
  }

  function updateInfo() {
    const console = systems.get(selected.console);
    $('game-title').textContent = selected.title;
    $('game-console').textContent = console.short;
    $('game-year').textContent = selected.year;
    $('info-cover').src = selected.cover;
    $('info-cover').alt = `${selected.title} ${selected.artworkType}`;
    $('game-synopsis').textContent = selected.synopsis;
    $('game-developer').textContent = selected.developer;
    $('game-publisher').textContent = selected.publisher;
    $('game-genre').textContent = selected.genre;
    $('game-media').textContent = mediaNames[console.media];
    $('game-tournament').hidden = !selected.tournament;
    $('game-tournament').querySelector('span').textContent = selected.tournament || '';
    $('game-source').href = selected.source;
    $('video-source').href = videoLink(selected);
    $('screen-watch').href = videoLink(selected);
    $('video-credit').textContent = `${selected.clipLength}-second preview · Video by ${selected.videoCredit}.`;
    markShelf();
  }

  function setPhase(next, status) {
    phase = next;
    $('game-state').textContent = ({ ready: 'Ready to load', loading: 'Loading game', playing: 'Now playing', paused: 'Game loaded', error: 'Preview unavailable' })[next];
    $('playback-status').textContent = status;
    $('insert-game').disabled = next === 'loading';
    $('insert-game').querySelector('span').textContent = next === 'loading' ? 'Inserting game…' : next === 'ready' ? 'Insert game & play' : next === 'error' ? 'Retry preview' : 'Restart preview';
    $('power-light').classList.toggle('on', next === 'playing' || next === 'paused');
  }

  function stopPlayback() {
    generation++;
    clearTimeout(playerTimer);
    if (flight) flight.cancel();
    flight = null;
    if (flyingMedia) flyingMedia.remove();
    flyingMedia = null;
    $('console-bay').classList.remove('is-loading');
    if (player) {
      try { player.destroy(); } catch (_) { /* A replaced iframe may already be gone. */ }
    }
    player = null;
    $('video-layer').replaceChildren();
    $('video-layer').hidden = true;
    $('screen-home').hidden = false;
    $('screen-loading').hidden = true;
    $('screen-error').hidden = true;
    $('play-toggle').disabled = true;
    $('play-toggle').textContent = 'Pause';
    $('sound-toggle').disabled = true;
    $('sound-toggle').textContent = 'Sound off';
    $('sound-toggle').setAttribute('aria-pressed', 'false');
    $('eject').disabled = true;
    muted = true;
  }

  function chooseConsole(id) {
    if (!systems.has(id)) return;
    stopPlayback();
    currentConsole = id;
    selected = id === 'snes' ? byId.get('super-mario-world') : games.find(game => game.console === id);
    renderStation();
    updateInfo();
    setPhase('ready', 'Ready when you are');
  }

  function loadAPI() {
    if (window.YT && window.YT.Player) return Promise.resolve();
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      const timer = setTimeout(() => fail(), 14000);
      const fail = () => {
        clearTimeout(timer);
        script.remove();
        apiPromise = null;
        reject(new Error('The video service could not be reached.'));
      };
      window.onYouTubeIframeAPIReady = () => { clearTimeout(timer); resolve(); };
      script.onerror = fail;
      document.head.appendChild(script);
    });
    return apiPromise;
  }

  async function insertMedia(source, console, game, token) {
    $('console-bay').classList.add('is-loading');
    if (reducedMotion.matches || !source || !Element.prototype.animate) {
      $('console-bay').classList.remove('is-loading');
      return;
    }
    const start = source.getBoundingClientRect();
    const target = $('slot-target').getBoundingClientRect();
    const media = document.createElement('div');
    media.className = `flying-media ${console.media}`;
    media.setAttribute('aria-hidden', 'true');
    const label = document.createElement('img');
    label.src = game.cover;
    label.alt = '';
    media.appendChild(label);
    document.body.appendChild(media);
    flyingMedia = media;
    const box = media.getBoundingClientRect();
    const x = start.left + start.width / 2 - box.width / 2;
    const y = start.top + start.height / 2 - box.height / 2;
    const endX = target.left - box.width / 2;
    const endY = target.top - box.height / 2;
    const disc = console.media.includes('disc');
    const turn = disc ? 360 : 0;
    const finalScale = console.id === 'wii' ? 'scale(.12,.7)' : console.id === 'ps4' || console.id === 'ps2' ? 'scale(.65,.08)' : 'scale(.65,.04)';
    const animation = media.animate([
      { transform: `translate(${x}px,${y}px) scale(.8) rotate(-12deg)`, opacity: 0, offset: 0 },
      { transform: `translate(${x}px,${y - 20}px) scale(1) rotate(-8deg)`, opacity: 1, offset: .12 },
      { transform: `translate(${endX}px,${endY - 60}px) rotate(${turn}deg)`, opacity: 1, offset: .67 },
      { transform: `translate(${endX}px,${endY}px) rotate(${turn}deg) ${finalScale}`, opacity: .9, offset: .94 },
      { transform: `translate(${endX}px,${endY}px) rotate(${turn}deg) ${finalScale}`, opacity: 0, offset: 1 }
    ], { duration: 1150, easing: 'cubic-bezier(.35,.05,.2,1)', fill: 'forwards' });
    flight = animation;
    try { await animation.finished; } catch (_) { /* Ejecting cancels the flight. */ }
    media.remove();
    if (token === generation) {
      flight = null;
      flyingMedia = null;
      $('console-bay').classList.remove('is-loading');
    }
  }

  function showError(message, game, token) {
    if (token !== generation) return;
    clearTimeout(playerTimer);
    if (player) { try { player.destroy(); } catch (_) {} }
    player = null;
    $('video-layer').hidden = true;
    $('screen-loading').hidden = true;
    $('screen-home').hidden = true;
    $('screen-error').hidden = false;
    $('screen-error').style.backgroundImage = `linear-gradient(#07120edb,#07120ef2),url("${game.poster}")`;
    $('error-message').textContent = message;
    $('play-toggle').disabled = true;
    $('sound-toggle').disabled = true;
    $('eject').disabled = false;
    setPhase('error', 'Preview unavailable · try the video link');
  }

  function createPlayer(game, token) {
    if (token !== generation) return;
    const mount = document.createElement('div');
    mount.id = `youtube-player-${token}`;
    $('video-layer').replaceChildren(mount);
    $('video-layer').hidden = false;
    const segment = { videoId: game.videoId, startSeconds: game.start, endSeconds: game.start + game.clipLength };
    playerTimer = setTimeout(() => showError('The preview is taking too long. Try again or watch the full video.', game, token), 18000);
    player = new window.YT.Player(mount.id, {
      host: 'https://www.youtube-nocookie.com',
      width: '100%', height: '100%', videoId: game.videoId,
      playerVars: { playsinline: 1, controls: 1, rel: 0, origin: window.location.origin, start: game.start },
      events: {
        onReady(event) {
          if (token !== generation) return;
          clearTimeout(playerTimer);
          const iframe = event.target.getIframe();
          iframe.title = `${game.title} gameplay preview`;
          iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
          event.target.mute();
          $('screen-loading').hidden = true;
          $('play-toggle').disabled = false;
          $('sound-toggle').disabled = false;
          setPhase('paused', 'Press Play if the preview doesn’t start');
          $('play-toggle').textContent = 'Play';
          event.target.loadVideoById(segment);
        },
        onStateChange(event) {
          if (token !== generation) return;
          if (event.data === 1) {
            clearTimeout(playerTimer);
            setPhase('playing', `${game.clipLength}-second preview · on repeat`);
            $('play-toggle').textContent = 'Pause';
          } else if (event.data === 2) {
            setPhase('paused', 'Preview paused');
            $('play-toggle').textContent = 'Play';
          } else if (event.data === 0) {
            if (document.hidden || reducedMotion.matches) {
              setPhase('paused', 'Preview finished · play again');
              $('play-toggle').textContent = 'Play';
            } else {
              event.target.loadVideoById(segment);
            }
          }
        },
        onAutoplayBlocked() {
          if (token !== generation) return;
          setPhase('paused', 'Press Play to start the preview');
          $('play-toggle').textContent = 'Play';
        },
        onError(event) {
          const message = event.data === 101 || event.data === 150 ? 'This video can only be watched on YouTube.' : event.data === 153 ? 'YouTube can’t play in this preview. Open the full video below.' : 'This preview couldn’t load. Watch the video on YouTube or try again.';
          showError(message, game, token);
        }
      }
    });
  }

  async function loadGame(id, source, scroll) {
    const game = byId.get(id);
    if (!game) return;
    stopPlayback();
    selected = game;
    if (currentConsole !== game.console) {
      currentConsole = game.console;
      renderStation();
    }
    updateInfo();
    if (scroll) {
      $('arcade').scrollIntoView({ behavior: 'instant', block: 'start' });
      source = $('game-shelf').querySelector(`[data-game="${game.id}"]`);
      source.focus({ preventScroll: true });
    }
    const token = generation;
    setPhase('loading', `Inserting ${game.title}…`);
    $('eject').disabled = false;
    $('screen-home').hidden = true;
    $('screen-loading').hidden = false;
    $('loading-label').textContent = `Loading ${game.title}…`;
    const api = location.protocol === 'file:' ? Promise.resolve({ local: true }) : loadAPI().then(() => ({ ok: true }), () => ({ ok: false }));
    await insertMedia(source || $('game-shelf').querySelector(`[data-game="${id}"]`), systems.get(game.console), game, token);
    const result = await api;
    if (token !== generation) return;
    if (result.local) return showError('Open the hosted website to play here, or watch on YouTube.', game, token);
    if (!result.ok) return showError('The video service couldn’t connect. Check your connection or watch on YouTube.', game, token);
    createPlayer(game, token);
  }

  function renderCatalogue() {
    $('catalogue-grid').innerHTML = games.map(game => `<li data-category="${game.category}" data-tournament="${Boolean(game.tournament)}"><button type="button" class="catalogue-card" data-load="${game.id}" aria-label="Preview ${escape(game.title)}${game.tournament ? `, ${escape(game.tournament)}` : ''}"><span class="catalogue-cover"><img src="${game.cover}" alt="" width="58" height="78" loading="lazy"></span><span class="catalogue-copy"><strong>${escape(game.title)}</strong><small>${escape(systems.get(game.console).short)} · ${escape(game.genre)}</small>${game.tournament ? `<span class="catalogue-badge">${icon('trophy')}${game.id === 'wii-sports' ? 'Bowling tournament' : 'Tournament game'}</span>` : ''}</span></button></li>`).join('');
  }

  $('console-nav').addEventListener('click', event => {
    const button = event.target.closest('[data-console]');
    if (button) chooseConsole(button.dataset.console);
  });
  $('console-nav').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const buttons = Array.from($('console-nav').querySelectorAll('button'));
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    buttons[next].click();
  });
  $('game-shelf').addEventListener('click', event => {
    const button = event.target.closest('[data-game]');
    if (button) loadGame(button.dataset.game, button, false);
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-load]');
    if (button) loadGame(button.dataset.load, button, true);
  });
  $('filters').addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const filter = button.dataset.filter;
    let count = 0;
    $('filters').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    $('catalogue-grid').querySelectorAll('li').forEach(item => {
      item.hidden = !(filter === 'all' || (filter === 'tournaments' ? item.dataset.tournament === 'true' : item.dataset.category === filter));
      if (!item.hidden) count++;
    });
    $('game-count').textContent = `${count} ${count === 1 ? 'game' : 'games'}`;
  });
  $('insert-game').addEventListener('click', () => loadGame(selected.id, null, true));
  $('retry-video').addEventListener('click', () => loadGame(selected.id));
  $('eject').addEventListener('click', () => {
    stopPlayback();
    setPhase('ready', 'Game ejected · pick your next one');
    $('game-shelf').querySelector(`[data-game="${selected.id}"]`).focus({ preventScroll: true });
  });
  $('play-toggle').addEventListener('click', () => {
    if (!player) return;
    if (phase === 'playing') player.pauseVideo();
    else if (player.getPlayerState() === 0) player.loadVideoById({ videoId: selected.videoId, startSeconds: selected.start, endSeconds: selected.start + selected.clipLength });
    else player.playVideo();
  });
  $('sound-toggle').addEventListener('click', () => {
    if (!player) return;
    muted = !muted;
    if (muted) player.mute(); else player.unMute();
    $('sound-toggle').textContent = muted ? 'Sound off' : 'Sound on';
    $('sound-toggle').setAttribute('aria-pressed', String(!muted));
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && player && phase === 'playing') player.pauseVideo();
  });
  renderNav();
  renderStation();
  updateInfo();
  renderCatalogue();
})();
