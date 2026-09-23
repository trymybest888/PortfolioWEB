'use client';

import { useRef, useState } from 'react';

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function toggle() {
    const player = audio.current;
    if (!player || pending) return;
    setError('');
    if (!player.paused) { player.pause(); return; }
    setPending(true);
    player.volume = 0.35;
    try { await player.play(); }
    catch { setError('เล่นเพลงไม่ได้ กรุณาลองกดเปิดอีกครั้ง'); }
    finally { setPending(false); }
  }
  return <aside className="music-widget" aria-label="เพลงประกอบเว็บไซต์">
    <audio ref={audio} src="/rather-lie.mp3" loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setPending(false); setError('ไม่สามารถโหลดเพลงได้ กรุณาลองใหม่'); }}/>
    {error && <p className="music-error" role="status">{error}</p>}
    <button className="music-toggle" type="button" onClick={toggle} disabled={pending} aria-pressed={playing} aria-label={playing ? 'ปิดเพลง Rather Lie' : 'เปิดเพลง Rather Lie'}>{pending ? 'กำลังโหลดเพลง…' : playing ? '♫ ปิดเพลง' : '♫ เปิดเพลง'}</button>
  </aside>;
}
