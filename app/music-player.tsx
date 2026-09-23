'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <aside className="music-widget" aria-label="เพลงประกอบเว็บไซต์">
    {open && <section id="music-panel" className="music-panel" aria-label="เครื่องเล่น Rather Lie">
      <div className="music-heading"><span>RATHER LIE</span><button type="button" onClick={() => { setOpen(false); toggle.current?.focus(); }} aria-label="ปิดเครื่องเล่นและหยุดเพลง">ปิด ×</button></div>
      <iframe title="Playboi Carti & The Weeknd — Rather Lie" src="https://www.youtube-nocookie.com/embed/fYD7YsSRHOY?autoplay=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      <a href="https://www.youtube.com/watch?v=fYD7YsSRHOY" target="_blank" rel="noopener noreferrer">หากเล่นไม่ได้ เปิดใน YouTube ↗</a>
    </section>}
    <button ref={toggle} className="music-toggle" type="button" aria-expanded={open} aria-controls={open ? 'music-panel' : undefined} onClick={() => setOpen(value => !value)}>{open ? 'ปิดเพลง ×' : '♫ เปิดเพลง'}</button>
  </aside>;
}
