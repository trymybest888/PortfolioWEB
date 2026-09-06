'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'opium-handshake-intro-v1';
const FRAMES = ['/handshake-clasp.jpg', '/handshake-hook.jpg', '/handshake-dap.jpg'];
type Phase = 'off' | 'loading' | 'playing';

export default function HandshakeIntro() {
  const [phase, setPhase] = useState<Phase>('off');
  const skipRef = useRef<HTMLButtonElement>(null);
  const dismissedRef = useRef(false);
  const dismiss = useCallback(() => {
    dismissedRef.current = true;
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* Storage is optional. */ }
    setPhase('off');
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || window.location.hash || window.scrollY > 0) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch { /* The intro also works when browser storage is unavailable. */ }

    let cancelled = false;
    dismissedRef.current = false;
    setPhase('loading');
    const loadingLimit = window.setTimeout(() => {
      cancelled = true;
      dismiss();
    }, 3500);
    const images = FRAMES.map(src => {
      const image = new Image();
      image.src = src;
      return image.decode();
    });
    Promise.all(images).then(() => {
      if (!cancelled && !dismissedRef.current) {
        window.clearTimeout(loadingLimit);
        try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* Storage is optional. */ }
        setPhase('playing');
      }
    }).catch(() => {
      window.clearTimeout(loadingLimit);
      if (!cancelled && !dismissedRef.current) dismiss();
    });
    return () => {
      cancelled = true;
      window.clearTimeout(loadingLimit);
    };
  }, [dismiss]);

  const visible = phase !== 'off';
  useEffect(() => {
    if (!visible) return;
    const shell = document.getElementById('portfolio-shell');
    const previousOverflow = document.body.style.overflow;
    const previousInert = shell?.inert ?? false;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (shell) shell.inert = true;
    skipRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (motion.matches) dismiss(); };
    document.addEventListener('keydown', onKey);
    motion.addEventListener('change', onMotion);
    return () => {
      const hadIntroFocus = document.activeElement === skipRef.current;
      document.body.style.overflow = previousOverflow;
      if (shell) shell.inert = previousInert;
      document.removeEventListener('keydown', onKey);
      motion.removeEventListener('change', onMotion);
      if (hadIntroFocus || document.activeElement === document.body) {
        if (previousFocus instanceof HTMLElement && previousFocus !== document.body) {
          previousFocus.focus({ preventScroll: true });
        } else {
          const main = document.getElementById('main');
          main?.setAttribute('tabindex', '-1');
          main?.focus({ preventScroll: true });
        }
      }
    };
  }, [visible, dismiss]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const finish = window.setTimeout(dismiss, 3450);
    return () => window.clearTimeout(finish);
  }, [phase, dismiss]);

  if (!visible) return null;
  return (
    <section className={`handshake-intro handshake-intro--${phase}`} aria-label="แอนิเมชันเปิดเว็บไซต์">
      <div className="handshake-top"><span>OPIUM® / VOL. 01</span><span>A CONNECTION BEYOND WORDS.</span></div>
      <div className="handshake-stage" aria-hidden="true">
        <span className="handshake-bracket handshake-bracket--left">[</span>
        {phase === 'playing' && FRAMES.map((src, index) => (
          <img key={src} src={src} alt="" className={`handshake-frame handshake-frame--${index + 1}`} width="1536" height="1024" draggable="false"/>
        ))}
        <span className="handshake-bracket handshake-bracket--right">]</span>
        <div className="handshake-title">opium<span>®</span></div>
      </div>
      <div className="handshake-bottom"><div><span className="handshake-caption">A MOMENT OF CONNECTION.</span><span className="handshake-rule" aria-hidden="true"/></div><button ref={skipRef} onClick={dismiss} className="handshake-skip">ข้ามอินโทร <span aria-hidden="true">↗</span></button></div>
    </section>
  );
}



