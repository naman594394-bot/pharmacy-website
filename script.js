/**
 * Bharat Medical Store — script.js
 *
 * Responsibilities:
 *   1. Hamburger menu toggle (adds/removes .is-open on .mobile-menu)
 *   2. Close mobile menu when a nav link is clicked (smooth-scroll already
 *      handled by CSS scroll-behavior: smooth)
 *   3. Close mobile menu on outside click
 */

(function () {
  'use strict';

  var hamburger  = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) {
    return;
  }

  /** Toggle the mobile menu open / closed. */
  function toggleMenu() {
    var isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  }

  /** Close the mobile menu. */
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  }

  /* Hamburger click */
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  /* Close when any mobile-menu link is clicked (smooth scroll takes over) */
  var mobileLinks = mobileMenu.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', closeMenu);
  }

  /* Close when clicking outside the nav */
  document.addEventListener('click', function (e) {
    var nav = document.querySelector('.site-nav');
    if (nav && !nav.contains(e.target)) {
      closeMenu();
    }
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}());
