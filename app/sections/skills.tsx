const skillGroups = [
  { number: '01', category: 'AI', title: 'ทักษะ AI', items: [{ name: 'Gemini', level: 'Advanced' }, { name: 'ChatGPT', level: 'Advanced' }, { name: 'Claude', level: 'Intermediate' }] },
  { number: '02', category: 'COMPUTER', title: 'ทักษะคอมพิวเตอร์', items: [{ name: 'Python', level: 'Intermediate' }, { name: 'C#', level: 'Basic' }, { name: 'SQL', level: 'Intermediate' }, { name: 'Photoshop', level: 'Intermediate' }] },
];

export default function Skills() {
  return <section id="skills" className="page-main portfolio-section" aria-labelledby="skills-heading">
    <div className="page-heading"><h2 id="skills-heading">Skills</h2><p>ทักษะ AI และทักษะคอมพิวเตอร์</p></div>
    <div className="skill-grid">{skillGroups.map(group => <article className="skill-card" key={group.number}>
      
      <h3>{group.title}</h3>
      <dl className="skill-level-list">{group.items.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.level}</dd></div>)}</dl>
    </article>)}</div>
  </section>;
}
