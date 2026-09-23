'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const manual = useRef(false);
  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.volume = 0.1225;
    let disposed = false;
    const detach = () => {
      window.removeEventListener('pointerup', retry);
      window.removeEventListener('keydown', retry);
    };
    const retry = (event: Event) => {
      if (manual.current || (event.target instanceof Element && event.target.closest('.music-widget'))) return;
      void player.play().then(detach).catch(() => {});
    };
    void player.play().catch(() => {
      if (disposed || manual.current) return;
      window.addEventListener('pointerup', retry);
      window.addEventListener('keydown', retry);
    });
    return () => { disposed = true; detach(); player.pause(); };
  }, []);
  async function toggle() {
    const player = audio.current;
    if (!player || pending) return;
    manual.current = true;
    setError('');
    if (!player.paused) { player.pause(); return; }
    setPending(true);
    player.volume = 0.1225;
    try { await player.play(); }
    catch { setError('เล่นเพลงไม่ได้ กรุณาลองกดเปิดอีกครั้ง'); }
    finally { setPending(false); }
  }
  return <aside className="music-widget" aria-label="เพลงประกอบเว็บไซต์">
    <audio ref={audio} src="/rather-lie.mp3" loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setPending(false); setError('ไม่สามารถโหลดเพลงได้ กรุณาลองใหม่'); }}/>
    {error && <p className="music-error" role="status">{error}</p>}
    <button className="music-toggle" type="button" onClick={toggle} disabled={pending} aria-pressed={playing} aria-label={playing ? 'ปิดเพลง Rather Lie' : 'เปิดเพลง Rather Lie'}>{pending ? 'กำลังโหลดเพลง…' : playing ? '♫ ปิดเพลง' : '♫ เปิดเพลง'}</button>
  </aside>;
}

