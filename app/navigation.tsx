'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  ['introduction', 'แนะนำตัว', '01'],
  ['skills', 'SKILLS', '02'],
  ['history', 'ประวัติ', '03'],
  ['work', 'ผลงาน', '04'],
];

export default function Navigation() {
  const [active, setActive] = useState('introduction');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const offset = header.getBoundingClientRect().height + 32;
      let current = 'introduction';
      for (const [id] of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    const updateOffset = () => {
      document.documentElement.style.setProperty('--nav-height', `${header.getBoundingClientRect().height}px`);
      scheduleUpdate();
    };
    const observer = new ResizeObserver(updateOffset);
    observer.observe(header);
    updateOffset();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('hashchange', scheduleUpdate);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--nav-height');
    };
  }, []);

  return (
    <header ref={headerRef} className="header">
      <a className="wordmark" href="#introduction" aria-label="Opium กลับด้านบน">opium<span>®</span></a>
      <nav aria-label="เมนูหัวข้อ">
        {links.map(([id, label, number]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
            <small>{number}</small>{label}
          </a>
        ))}
      </nav>
      <span className="edition">INDEPENDENT MIND.<br/>UNLIMITED POSSIBILITIES.</span>
    </header>
  );
}
