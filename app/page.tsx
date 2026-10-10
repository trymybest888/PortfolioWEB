import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import Skills from './sections/skills';
import PortfolioMotion from './portfolio-motion';
import History from './sections/history';
import Work from './sections/work';
import { getRepos } from './github';

// Enough repeated sets that two of them always span a wide screen, keeping the -50% loop seamless.
const MARQUEE_COPIES = [0,1,2,3,4,5,6,7];

export default async function Home(){const repos=await getRepos();return <main id="main"><PortfolioMotion/><section id="introduction" className="hero" aria-labelledby="introduction-heading"><div className="hero-top"><span>Portfolio Vol. 01</span><span>Bangkok, Thailand</span></div><div className="hero-grid"><div className="hero-art"><img src="/angel.webp" width="1086" height="1448" alt="" fetchPriority="high"/></div><div className="hero-copy"><h1 id="introduction-heading"><span>Nattawut</span> <span>Wongnimit</span></h1><div className="intro"><h2>สวัสดี ผม <span className="name">ณัฐวุฒิ ว่องนิมิต</span></h2><p>นักศึกษาด้านเทคโนโลยีสารสนเทศ<br className="desktop-break"/>สนใจการพัฒนาซอฟต์แวร์และ IoT</p></div><div className="hero-actions"><a className="button" href="#work">สำรวจผลงาน <ArrowUpRight aria-hidden="true" className="icon-inline" size="1em" strokeWidth={2}/></a><a className="text-link" href="#history">เรื่องราวของผม</a></div></div></div><div className="hero-bottom"><span>Information technology student</span><span>Web / App / IoT</span><a href="#skills">เลื่อนลงดูทักษะ <ArrowDown aria-hidden="true" className="icon-inline" size="1em" strokeWidth={1.75}/></a></div></section>{repos.length>0&&<div className="marquee" aria-hidden="true"><div className="marquee-track">{MARQUEE_COPIES.map(copy=><span className="marquee-set" key={copy}>{repos.map(repo=><span className="marquee-item" key={repo.name}><span>{repo.name}</span><b><Asterisk size="1em" strokeWidth={2.25}/></b></span>)}</span>)}</div></div>}<Skills/><History/><Work repos={repos}/></main>}
