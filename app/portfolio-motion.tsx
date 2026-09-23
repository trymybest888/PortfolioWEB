'use client';

import { useEffect } from 'react';

export default function PortfolioMotion() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shell = document.getElementById('portfolio-shell');
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!shell || !hero) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.hero-copy,.hero-art,.about>div,.page-heading,.skill-card,.timeline article,.project,.work-slider-shell'));
    let frame = 0;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>('.hero-art,.skill-card'));
    const resets = surfaces.map(surface => {
      let pointerFrame = 0;
      const reset = () => {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        ['--tilt-x','--tilt-y','--glow-x','--glow-y'].forEach(name => surface.style.removeProperty(name));
      };
      const move = (event: PointerEvent) => {
        if (motion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
        cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
          const box = surface.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width;
          const y = (event.clientY - box.top) / box.height;
          surface.style.setProperty('--tilt-x', `${(0.5-y)*5}deg`);
          surface.style.setProperty('--tilt-y', `${(x-0.5)*5}deg`);
          surface.style.setProperty('--glow-x', `${x*100}%`);
          surface.style.setProperty('--glow-y', `${y*100}%`);
        });
      };
      surface.addEventListener('pointermove', move);
      surface.addEventListener('pointerleave', reset);
      motion.addEventListener('change', reset);
      return () => { reset(); surface.removeEventListener('pointermove', move); surface.removeEventListener('pointerleave', reset); motion.removeEventListener('change', reset); };
    });
    const observer = new IntersectionObserver(entries => {
      if (shell.inert) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    const reveal = () => {
      items.forEach((item, index) => {
        if (motion.matches) {
          item.classList.remove('motion-reveal');
          observer.unobserve(item);
        } else {
          item.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 90}ms`);
          item.classList.add('motion-reveal');
          observer.unobserve(item);
          observer.observe(item);
        }
      });
    };
    const update = () => {
      frame = 0;
      const top = hero.getBoundingClientRect().top;
      const shift = motion.matches ? 0 : Math.max(-45, Math.min(45, -top * .075));
      hero.style.setProperty('--art-drift', `${shift}px`);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const mutation = new MutationObserver(() => { if (!shell.inert) reveal(); });
    mutation.observe(shell, { attributes: true, attributeFilter: ['inert'] });
    reveal();
    update();
    motion.addEventListener('change', reveal);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      resets.forEach(reset => reset());
      observer.disconnect();
      mutation.disconnect();
      motion.removeEventListener('change', reveal);
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
      hero.style.removeProperty('--art-drift');
      items.forEach(item => { item.classList.remove('motion-reveal', 'is-revealed'); item.style.removeProperty('--reveal-delay'); });
    };
  }, []);
  return null;
}
