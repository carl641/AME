/* =============================================================
   Additive Manufacturing & Engineering
   No scroll listeners anywhere. Nav state and reveals both run
   on IntersectionObserver.
   ============================================================= */
(function () {
  'use strict';

  /* Set this to your form handler endpoint (Formspree, Netlify
     Forms, a Lambda, whatever you use). While it is empty the
     form validates and then tells the visitor to call instead. */
  var FORM_ENDPOINT = '';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('ame-theme'); } catch (e) { /* private mode */ }
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ame-theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- icon font ----------
     Only reveal the icons once the face is genuinely available, so
     a blocked stylesheet cannot paint ligature names on the page. */
  if (document.fonts && document.fonts.load) {
    document.fonts.load('24px "Material Symbols Outlined"').then(function (faces) {
      if (faces && faces.length) root.classList.add('icons-ready');
    }).catch(function () { /* leave icons hidden */ });
  } else {
    root.classList.add('icons-ready');
  }

  /* ---------- nav: stuck state via a sentinel, not a scroll handler ---------- */
  var nav = document.getElementById('nav');
  var sentinel = document.getElementById('top-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { rootMargin: '0px' }).observe(sentinel);
  }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('nav-links');
  if (burger && links) {
    var setMenu = function (open) {
      links.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      burger.querySelector('.material-symbols-outlined').textContent = open ? 'close' : 'menu';
    };
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- image slots ----------
     Each .shot carries the path to its intended photo. We preload
     it; only on a successful load do we swap the placeholder for
     a real <img>. Drop files into assets/img/ and they appear. */
  var shots = document.querySelectorAll('.shot[data-src]');
  Array.prototype.forEach.call(shots, function (fig) {
    var probe = new Image();
    probe.onload = function () {
      var img = document.createElement('img');
      img.src = fig.getAttribute('data-src');
      img.alt = fig.getAttribute('data-alt') || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      fig.insertBefore(img, fig.firstChild);
      fig.classList.add('is-loaded');
    };
    probe.src = fig.getAttribute('data-src');
  });

  /* ---------- scroll reveals ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ---------- gallery arrows ---------- */
  var strip = document.getElementById('strip');
  if (strip) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-scroll]'), function (btn) {
      btn.addEventListener('click', function () {
        var dir = Number(btn.getAttribute('data-scroll'));
        strip.scrollBy({
          left: dir * Math.min(strip.clientWidth * 0.8, 640),
          behavior: reduced ? 'auto' : 'smooth'
        });
      });
    });
  }

  /* ---------- quote form ---------- */
  var form = document.getElementById('quote-form');
  if (form) {
    var status = document.getElementById('form-status');
    var submit = document.getElementById('submit');

    var checks = [
      { id: 'f-name',  err: 'e-name',  test: function (v) { return v.trim().length > 1; } },
      { id: 'f-email', err: 'e-email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
      { id: 'f-msg',   err: 'e-msg',   test: function (v) { return v.trim().length > 8; } }
    ];

    var validate = function (check, silent) {
      var input = document.getElementById(check.id);
      var err = document.getElementById(check.err);
      var ok = check.test(input.value);
      if (!silent) {
        input.parentNode.classList.toggle('has-err', !ok);
        err.hidden = ok;
        input.setAttribute('aria-invalid', String(!ok));
      }
      return ok;
    };

    checks.forEach(function (check) {
      var input = document.getElementById(check.id);
      input.addEventListener('blur', function () { validate(check); });
      input.addEventListener('input', function () {
        if (input.parentNode.classList.contains('has-err')) validate(check);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      status.classList.remove('is-ok');

      var valid = true;
      checks.forEach(function (check) { if (!validate(check)) valid = false; });
      if (!valid) {
        status.textContent = 'Check the highlighted fields and try again.';
        var firstBad = form.querySelector('.has-err input, .has-err textarea');
        if (firstBad) firstBad.focus();
        return;
      }

      if (!FORM_ENDPOINT) {
        /* Developer placeholder. Set FORM_ENDPOINT above to go live. */
        status.textContent = 'This form is not connected to a handler yet. Call (256) 527-1737 in the meantime.';
        return;
      }

      submit.classList.add('is-busy');
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error('Bad response');
        form.reset();
        status.textContent = 'Received. An engineer will get back to you.';
        status.classList.add('is-ok');
      }).catch(function () {
        status.textContent = 'That did not send. Call (256) 527-1737 and we will pick it up from there.';
      }).then(function () {
        submit.classList.remove('is-busy');
      });
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
