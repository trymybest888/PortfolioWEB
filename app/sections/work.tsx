import { ArrowUpRight } from 'lucide-react';
import { GITHUB_PROFILE, type Repo } from '../github';

const updated = new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Work({ repos }: { repos: Repo[] }) {
  return <section id="work" className="page-main portfolio-section" aria-labelledby="work-heading">
    <div className="page-heading"><h2 id="work-heading">Work</h2><p>โปรเจกต์จาก GitHub</p></div>
    {repos.length > 0
      ? <ul className="repo-list">{repos.map(repo => <li className="repo" key={repo.name}>
          <h3 className="repo-name"><a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}<ArrowUpRight aria-hidden="true" size="0.4em" strokeWidth={2}/></a></h3>
          <p className="repo-description">{repo.description}</p>
          <dl className="repo-meta">
            {repo.language && <div><dt>ภาษา</dt><dd>{repo.language}</dd></div>}
            <div><dt>อัปเดตล่าสุด</dt><dd><time dateTime={repo.pushedAt}>{updated.format(new Date(repo.pushedAt))}</time></dd></div>
            {repo.homepage && <div><dt>เดโม</dt><dd><a href={repo.homepage} target="_blank" rel="noopener noreferrer">เปิดดู</a></dd></div>}
          </dl>
        </li>)}</ul>
      : <p className="repo-empty">ตอนนี้โหลดรายการโปรเจกต์จาก GitHub ไม่ได้ ดูโปรเจกต์ทั้งหมดได้ที่หน้าโปรไฟล์ GitHub</p>}
    <a className="button repo-profile" href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">ดูโปรไฟล์ GitHub <ArrowUpRight aria-hidden="true" className="icon-inline" size="1em" strokeWidth={2}/></a>
  </section>;
}
