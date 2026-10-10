const education = [
  { year: '2566 – ปัจจุบัน', title: 'สถาบันเทคโนโลยีไทย-ญี่ปุ่น', degree: 'ระดับปริญญาตรี', field: 'คณะเทคโนโลยีสารสนเทศ (IT)', major: 'สาขา เทคโนโลยีสารสนเทศ' },
  { year: '2563 – 2566', title: 'วิทยาลัยเทคนิคเลย', degree: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', field: 'ด้านเทคโนโลยีสารสนเทศ (IT)' },
];

export default function History() {
  return <section id="history" className="page-main portfolio-section" aria-labelledby="history-heading">
    <div className="page-heading"><h2 id="history-heading">Education</h2><p>ประวัติการศึกษา</p></div>
    <div className="timeline">{education.map(item => <article key={item.year}>
      <div className="year">{item.year}</div>
      <div><h3>{item.title}</h3><p>{item.degree}<br/>{item.field}{item.major && <><br/>{item.major}</>}</p></div>
    </article>)}</div>
  </section>;
}
