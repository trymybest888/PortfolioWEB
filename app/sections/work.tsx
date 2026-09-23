'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';

const projects=[{"n":"01","name":"Foodrandom","type":"WEBSITE","word":"FOOD\nRANDOM.","sub":"FOODRANDOM / WEBSITE","style":"","description":"เว็บไซต์ Foodrandom","detail":"เว็บแอปพลิเคชันที่ช่วยแก้ปัญหา “วันนี้กินอะไรดี?” ด้วยการสุ่มเมนูอาหารและรวบรวมข้อมูลร้านอาหารภายในสถาบัน ผู้ใช้สามารถเลือกร้านตามอาคาร ดูรายละเอียดเมนู และอ่านคะแนนรีวิวเพื่อประกอบการตัดสินใจ โดยมีเป้าหมายให้การเลือกอาหารสะดวก สนุก และช่วยให้รู้จักร้านอาหารภายในสถาบันมากขึ้น","tools":"","href":"https://drive.google.com/file/d/1_kFaXzulpZDoI-jTAQ5KYf6-3QtQd0xF/view?usp=drive_link","image":{"src":"/foodrandom-preview.png","alt":"หน้าเว็บไซต์ Foodrandom แสดงรายการอาหารและตัวกรองค้นหา","width":806,"height":806}},{"n":"02","name":"Badmedic","type":"APPLICATION","word":"BAD\nMEDIC.","sub":"BADMEDIC / APPLICATION","style":"second","description":"แอป Badmedic","detail":"แอปพลิเคชันบนมือถือที่นำเสนอการทำนายสุขภาพในรูปแบบความบันเทิง ผู้ใช้สามารถอัปโหลดรูปภาพ กรอกชื่อและวันเกิด แล้วเลือกดูคำทำนายสุขภาพในอนาคต หรือใช้ฟังก์ชัน Death Clock เพื่อแสดงวันและสาเหตุการเสียชีวิตในลักษณะสมมติ โดยแสดงผลพร้อมข้อมูลและรูปภาพของผู้ใช้","tools":"","href":"https://drive.google.com/file/d/1iH99aRs9hSaRPqLLmcZkchAf3E68InYU/view?usp=drive_link","image":{"src":"/badmedic-preview.png","alt":"ภาพแอป Badmedic","width":985,"height":985}},{"n":"03","name":"Aniguide","type":"WEBSITE","word":"ANI\nGUIDE.","sub":"ANIGUIDE / WEBSITE","style":"third","description":"เว็บไซต์ Aniguide","detail":"เว็บไซต์สำหรับค้นหา รีวิว และจัดอันดับอนิเมะที่น่าสนใจ เพื่อช่วยแก้ปัญหาความยุ่งยากในการเลือกชมอนิเมะที่มีความหลากหลายในปัจจุบัน โดยออกแบบระบบให้ใช้งานง่าย เหมาะสำหรับผู้ใช้ทั่วไป วัยรุ่น และผู้ชมมือใหม่","tools":"","href":"https://drive.google.com/file/d/11j-W3FNY0grBidqOUEa9gWDDrJv0lJ9L/view?usp=sharing","image":{"src":"/aniguide-preview.png","alt":"หน้าเว็บไซต์ Aniguide แสดงหมวดหมู่และรายการอนิเมะ","width":1027,"height":696}}];

export default function Work() {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const gesture = useRef<{ id: number; x: number; y: number; time: number; width: number; horizontal: boolean } | null>(null);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function dismiss(direction: number) {
    if (busy.current) return;
    busy.current = true;
    gesture.current = null;
    setDragging(false);
    setExiting(true);
    setDrag({ x: direction * (window.innerWidth + 600), y: 100 });
    timer.current = setTimeout(() => {
      setSelected(current => (current + (direction < 0 ? 1 : projects.length - 1)) % projects.length);
      setDrag({ x: 0, y: 0 });
      setExiting(false);
      busy.current = false;
      timer.current = null;
    }, reducedMotion ? 0 : 320);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (busy.current || !event.isPrimary || event.button !== 0) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, width: event.currentTarget.clientWidth, horizontal: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const x = event.clientX - current.x;
    const y = event.clientY - current.y;
    if (!current.horizontal) {
      if (Math.abs(y) > Math.abs(x) && Math.abs(y) > 10) { cancelDrag(); return; }
      if (Math.abs(x) < 8) return;
      current.horizontal = true;
      setDragging(true);
    }
    setDrag({ x, y: Math.max(-60, Math.min(60, y * 0.2)) });
  }

  function cancelDrag() {
    gesture.current = null;
    if (busy.current) return;
    setDragging(false);
    setDrag({ x: 0, y: 0 });
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const distance = event.clientX - current.x;
    const speed = Math.abs(distance) / Math.max(1, event.timeStamp - current.time);
    if (current.horizontal && (Math.abs(distance) > Math.min(120, current.width * 0.23) || (Math.abs(distance) > 35 && speed > 0.5))) {
      dismiss(distance < 0 ? -1 : 1);
    } else cancelDrag();
  }

  const swipeProgress = reducedMotion ? 0 : Math.min(Math.abs(drag.x) / 180, 1);

  return <section id="work" className="page-main portfolio-section" aria-labelledby="work-heading">
    <div className="page-heading"><div><span className="eyebrow">[ 04 — SELECTED WORK ]</span><h2 id="work-heading">WORK <em>ARCHIVE.</em></h2></div></div>
    <div className="work-slider-shell">
      <div className="work-swipe-region" role="region" aria-roledescription="carousel" aria-label="ผลงานแบบการ์ดปัดซ้ายขวา" tabIndex={0} onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          dismiss(event.key === 'ArrowLeft' ? 1 : -1);
        }
      }}>
        <div className="work-card-stack">
          {[2, 1].map(depth => {
            const behind = projects[(selected + (drag.x > 0 ? projects.length - depth : depth)) % projects.length];
            return <div key={depth} className={'work-stack-back depth-' + depth} aria-hidden="true" style={reducedMotion ? undefined : { transform: `translateY(${(depth === 1 ? 14 : 27) * (1 - swipeProgress)}px) scale(${1 - depth * .04 + swipeProgress * .04}) rotate(${(depth === 1 ? -3 : 3) * (1 - swipeProgress)}deg)`, transition: dragging ? 'none' : 'transform 320ms ease-out' }}><img style={{ opacity: .35 + swipeProgress * .45 }} src={behind.image.src} alt="" draggable={false}/></div>;
          })}
          <article aria-live="polite" key={project.n} className={'work-slide-card work-stack-front' + (dragging ? ' is-dragging' : '') + (exiting ? ' is-exiting' : '')}
            style={{ opacity: exiting ? 0 : 1 - swipeProgress * .18, boxShadow: `0 ${18 + swipeProgress * 20}px ${50 + swipeProgress * 30}px #0008`, transform: 'translate3d(' + drag.x + 'px,' + drag.y + 'px,0) rotate(' + (reducedMotion ? 0 : Math.max(-28, Math.min(28, drag.x / 22))) + 'deg)', transition: exiting ? 'transform 320ms ease-in, opacity 320ms ease-in' : undefined }}>
            <div data-project={project.n} className="work-slide-banner" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag}>
              <img src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} draggable={false}/>
              <span className="work-slide-number">PROJECT {project.n} / 03</span>
            </div>
            <div className="work-slide-caption"><div><span className="eyebrow">{project.type}</span><h3>{project.name}</h3></div><a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">ดูคลิปสาธิต ↗</a></div>
            <section className="work-published-detail" aria-labelledby="published-detail-heading"><h4 id="published-detail-heading">เกี่ยวกับผลงาน</h4><p>{project.detail}</p></section>
          </article>
        </div>
      </div>


    </div>
  </section>;
}
