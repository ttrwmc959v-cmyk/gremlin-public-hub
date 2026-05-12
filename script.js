/*
  GREMLIN — Ku Ku Hub
  - JS fallback opener for in-app browsers (Facebook, IG webview, etc.)
  - Alien click ripple + scan feedback
*/

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. Footer year
  // ----------------------------------------------------------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ----------------------------------------------------------
  // 2. UFO ripple feedback (visual only — does not consume click)
  // ----------------------------------------------------------
  var ufoLayer = document.querySelector('.ufo-layer');

  function spawnRipple(x, y, variant) {
    if (!ufoLayer) return;
    var r = document.createElement('span');
    r.className = 'ufo-ripple' + (variant === 'purple' ? ' ufo-ripple--purple' : '');
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    ufoLayer.appendChild(r);
    setTimeout(function () {
      if (r.parentNode) r.parentNode.removeChild(r);
    }, 750);
  }

  // ----------------------------------------------------------
  // 3. Click handler — JS open fallback + ripple
  //    Required pattern: anchor click triggers window.open;
  //    if blocked, fall back to location.href.
  // ----------------------------------------------------------
  var openables = document.querySelectorAll('[data-open-url]');

  openables.forEach(function (el, idx) {
    // Visual press class for CSS feedback
    el.addEventListener('pointerdown', function (event) {
      el.classList.add('is-pressed');
      var rect = el.getBoundingClientRect();
      var x = (event.clientX || rect.left + rect.width / 2);
      var yy = (event.clientY || rect.top + rect.height / 2);
      spawnRipple(x, yy, idx % 2 ? 'purple' : 'green');
    });

    var clearPress = function () {
      setTimeout(function () { el.classList.remove('is-pressed'); }, 320);
    };
    el.addEventListener('pointerup', clearPress);
    el.addEventListener('pointercancel', clearPress);
    el.addEventListener('pointerleave', clearPress);

    // Critical: navigation fallback for Facebook / IG in-app browsers
    el.addEventListener('click', function (event) {
      var destination = el.getAttribute('data-open-url');
      if (!destination) return;
      // If user is doing modifier-click or middle-click, let the browser do its thing
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof event.button === 'number' && event.button !== 0) return;

      event.preventDefault();
      var opened = null;
      try {
        opened = window.open(destination, '_blank', 'noopener,noreferrer');
      } catch (e) {
        opened = null;
      }
      if (!opened) {
        // In-app webview blocked the popup — navigate top-level instead.
        window.location.href = destination;
      }
    });
  });

  // ----------------------------------------------------------
  // 4. Tiny ambient parallax on the orbit (skip if reduced motion)
  // ----------------------------------------------------------
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    var orbit = document.querySelector('.bg__orbit');
    if (orbit && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', function (e) {
        var dx = (e.clientX / window.innerWidth - 0.5) * 8;
        var dy = (e.clientY / window.innerHeight - 0.5) * 8;
        orbit.style.translate = dx + 'px ' + dy + 'px';
      }, { passive: true });
    }
  }
})();
