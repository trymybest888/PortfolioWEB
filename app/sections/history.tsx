const education = [
  { year: '2566 – ปัจจุบัน', title: 'สถาบันเทคโนโลยีไทย-ญี่ปุ่น', degree: 'ระดับปริญญาตรี', field: 'คณะเทคโนโลยีสารสนเทศ (IT)' },
  { year: '2563 – 2566', title: 'วิทยาลัยเทคนิคเลย', degree: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', field: 'ด้านเทคโนโลยีสารสนเทศ (IT)' },
];

export default function History() {
  return <section id="history" className="page-main portfolio-section" aria-labelledby="history-heading">
    <div className="page-heading"><div><span className="eyebrow">[ 03 — MY JOURNEY ]</span><h2 id="history-heading">THE <em>STORY.</em><span className="red">*</span></h2></div><p>ประวัติการศึกษา</p></div>
    <div className="timeline">{education.map(item => <article key={item.year}>
      <div className="year">{item.year}</div>
      <div><span className="eyebrow">EDUCATION</span><h3 style={{ marginTop: 15 }}>{item.title}</h3><p>{item.degree}<br/>{item.field}</p></div>
    </article>)}</div>
  </section>;
}
