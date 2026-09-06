'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'opium-handshake-intro-v3';
const STEPS = [
  { src: '/handsign-v2-web.jpg', name: 'Thumb-web hook' },
  { src: '/handsign-v2-reverse.jpg', name: 'Reverse thumb-web hook' },
  { src: '/handsign-v2-pinky.jpg', name: 'Pinky hook' },
  { src: '/handsign-v2-double.jpg', name: 'Pinky and index hook' },
  { src: '/handsign-v2-web.jpg', name: 'Return to thumb-web hook' },
  { src: '/handsign-v2-clasp.jpg?v=interlaced', name: 'Interlaced clasp' },
];
const RELEASE_IMAGE = '/handsign-v2-release.jpg';
const FRAMES = [...new Set([...STEPS.map(step => step.src), RELEASE_IMAGE])];
const INTRO_DURATION = 4700;
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
    const finish = window.setTimeout(dismiss, INTRO_DURATION);
    return () => window.clearTimeout(finish);
  }, [phase, dismiss]);

    if (!visible) return null;
  return (
    <section className={`handshake-intro handshake-intro--${phase}`} aria-label="แอนิเมชันเปิดเว็บไซต์">
      <div className="handshake-door handshake-door--left" aria-hidden="true">
        {phase === 'playing' && <img src={RELEASE_IMAGE} alt="" width="1536" height="1024" className="handshake-release" draggable="false"/>}
      </div>
      <div className="handshake-door handshake-door--right" aria-hidden="true">
        {phase === 'playing' && <img src={RELEASE_IMAGE} alt="" width="1536" height="1024" className="handshake-release" draggable="false"/>}
      </div>
      <div className="handshake-top"><span>OPIUM® / VOL. 01</span><span>A CONNECTION BEYOND WORDS.</span></div>
      <div className="handshake-stage" aria-hidden="true">
        {phase === 'playing' && STEPS.map((step, index) => (
          <img key={index} src={step.src} alt="" data-step={index + 1} className={`handshake-frame handshake-frame--${index + 1}`} width="1536" height="1024" draggable="false"/>
        ))}
        {phase === 'loading' && <div className="handshake-title">opium<span>®</span></div>}
      </div>
      <div className="handshake-light" aria-hidden="true"/>
      <div className="handshake-light-core" aria-hidden="true"/>
      <div className="handshake-bottom">
        <div><span className="handshake-caption">A MOMENT OF CONNECTION.</span><span className="handshake-rule" aria-hidden="true"/></div>
        <button ref={skipRef} onClick={dismiss} className="handshake-skip">ข้ามอินโทร <span aria-hidden="true">↗</span></button>
      </div>
    </section>
  );
}