'use client';

import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Textarea } from '@/components/ui/textarea';

const projects=[{"n":"01","name":"Foodrandom","type":"WEBSITE","word":"FOOD\nRANDOM.","sub":"FOODRANDOM / WEBSITE","style":"","description":"เว็บไซต์ Foodrandom","detail":"นำเสนอสาธิตการใช้งานโปรแกรม Foodrandom","tools":"","href":"https://drive.google.com/file/d/1_kFaXzulpZDoI-jTAQ5KYf6-3QtQd0xF/view?usp=drive_link","image":{"src":"/foodrandom-preview.png","alt":"หน้าเว็บไซต์ Foodrandom แสดงรายการอาหารและตัวกรองค้นหา","width":806,"height":806}},{"n":"02","name":"Badmedic","type":"APPLICATION","word":"BAD\nMEDIC.","sub":"BADMEDIC / APPLICATION","style":"second","description":"แอป Badmedic","detail":"","tools":"","href":"https://drive.google.com/file/d/1iH99aRs9hSaRPqLLmcZkchAf3E68InYU/view?usp=drive_link","image":{"src":"/badmedic-preview.png","alt":"ภาพแอป Badmedic","width":985,"height":985}},{"n":"03","name":"Aniguide","type":"WEBSITE","word":"ANI\nGUIDE.","sub":"ANIGUIDE / WEBSITE","style":"third","description":"เว็บไซต์ Aniguide","detail":"","tools":"","href":"https://drive.google.com/file/d/11j-W3FNY0grBidqOUEa9gWDDrJv0lJ9L/view?usp=sharing","image":{"src":"/aniguide-preview.png","alt":"หน้าเว็บไซต์ Aniguide แสดงหมวดหมู่และรายการอนิเมะ","width":1027,"height":696}}];

export default function Work() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [storageReady, setStorageReady] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const project = projects[selected];

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on('select', update);
    return () => { api.off('select', update); };
  }, [api]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('portfolio-project-details-v1') || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        setDetails(Object.fromEntries(Object.entries(saved).filter(([, value]) => typeof value === 'string')) as Record<string, string>);
      }
    } catch { setSaveError(true); }
    setStorageReady(true);
  }, []);

  function changeDetail(value: string) {
    const next = { ...details, [project.n]: value };
    setDetails(next);
    try {
      localStorage.setItem('portfolio-project-details-v1', JSON.stringify(next));
      setSaveError(false);
    } catch { setSaveError(true); }
  }

  return <section id="work" className="page-main portfolio-section" aria-labelledby="work-heading">
    <div className="page-heading"><div><span className="eyebrow">[ 04 — SELECTED WORK ]</span><h2 id="work-heading">WORK <em>ARCHIVE.</em></h2></div><p>ปัดซ้าย–ขวาเพื่อดูผลงาน<br/>เว็บไซต์และแอปพลิเคชัน</p></div>
    <div className="work-slider-shell">
      <Carousel className="work-slider" opts={{ loop: true, align: 'center' }} setApi={setApi} aria-label="ผลงานทั้งหมด" tabIndex={0}>
        <CarouselContent>
          {projects.map((p, index) => <CarouselItem key={p.n} aria-label={p.name + ' ' + (index + 1) + ' จาก ' + projects.length} aria-hidden={selected !== index}>
            <article className="work-slide-card">
              <div className="work-slide-banner"><img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} draggable={false}/><span className="work-slide-number">{p.n} / 03</span></div>
              <div className="work-slide-caption"><div><span className="eyebrow">{p.type}</span><h3>{p.name}</h3></div><a className="text-link" href={p.href} target="_blank" rel="noopener noreferrer" tabIndex={selected === index ? 0 : -1}>ดูคลิปสาธิต ↗</a></div>
            </article>
          </CarouselItem>)}
        </CarouselContent>
        <div className="work-slide-controls"><CarouselPrevious className="work-slide-arrow" aria-label="ผลงานก่อนหน้า"/><span aria-live="polite" aria-atomic="true">{selected + 1} / {projects.length} · {project.name}</span><CarouselNext className="work-slide-arrow" aria-label="ผลงานถัดไป"/></div>
      </Carousel>
      <div className="work-detail-editor">
        <label htmlFor="project-description">รายละเอียดผลงาน — {project.name}</label>
        <Textarea id="project-description" key={project.n} value={details[project.n] ?? ''} onChange={event => changeDetail(event.target.value)} disabled={!storageReady} placeholder="เพิ่มรายละเอียดผลงาน เช่น แนวคิด สิ่งที่พัฒนา และเครื่องมือที่ใช้…" aria-describedby="project-save-note"/>
        <p id="project-save-note" role="status">{saveError ? 'บันทึกในเบราว์เซอร์ไม่ได้ กรุณาคัดลอกข้อความเก็บไว้ก่อนปิดหน้า' : 'บันทึกอัตโนมัติในเบราว์เซอร์นี้ · ข้อความยังไม่แสดงแก่ผู้เข้าชมคนอื่น'}</p>
      </div>
    </div>
  </section>;
}
