'use client';

import { useEffect, useState } from 'react';

const links = [
  ['introduction', 'แนะนำตัว', '1'],
  ['skills', 'SKILLS', '2'],
  ['history', 'ประวัติ', '3'],
  ['work', 'ผลงาน', '4'],
];

export default function Navigation() {
  const [active, setActive] = useState('introduction');

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const offset = 48;
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
    updateActive();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
      <nav className="section-navigation" aria-label="เมนูหัวข้อ">
        {links.map(([id, label, number]) => (
          <a key={id} className="section-navigation-link" href={`#${id}`} aria-label={label} aria-current={active === id ? 'location' : undefined}>
            <span className="section-navigation-label" aria-hidden="true">{label}</span>
            <span className="section-navigation-number" aria-hidden="true">{number}</span>
          </a>
        ))}
      </nav>
  );
}
