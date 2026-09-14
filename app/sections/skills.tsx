const skillGroups = [
  { number: '01', category: 'AI', title: 'ทักษะ AI', items: [{ name: 'Gemini', level: 'Very good' }, { name: 'ChatGPT', level: 'Very good' }, { name: 'Claude', level: 'Good' }] },
  { number: '02', category: 'COMPUTER', title: 'ทักษะคอมพิวเตอร์', items: [{ name: 'Python', level: 'Good' }, { name: 'C#', level: 'Mid' }, { name: 'SQL', level: 'Good' }, { name: 'Photoshop', level: 'Good' }] },
];

export default function Skills() {
  return <section id="skills" className="page-main portfolio-section" aria-labelledby="skills-heading">
    <div className="page-heading"><div><span className="eyebrow">[ 02 — THE TOOLKIT ]</span><h2 id="skills-heading">MY <em>SKILLS.</em><span className="red">*</span></h2></div><p>ทักษะ AI และทักษะคอมพิวเตอร์</p></div>
    <div className="skill-grid">{skillGroups.map(group => <article className="skill-card" key={group.number}>
      <div className="skill-top"><span>{group.category}</span><span>{group.number} / 02</span></div>
      <h3>{group.title}</h3>
      <dl className="skill-level-list">{group.items.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.level}</dd></div>)}</dl>
    </article>)}</div>
  </section>;
}
