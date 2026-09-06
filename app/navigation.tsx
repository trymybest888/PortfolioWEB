'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const links = [['/','แนะนำตัว','01'],['/skills','SKILLS','02'],['/history','ประวัติ','03'],['/work','ผลงาน','04']];
export default function Navigation(){const path = usePathname();return <header className="header"><Link className="wordmark" href="/" aria-label="Opium หน้าหลัก">opium<span>®</span></Link><nav aria-label="เมนูหลัก">{links.map(([url,label,n])=><Link key={url} href={url} aria-current={path===url?'page':undefined}><small>{n}</small>{label}</Link>)}</nav><span className="edition">INDEPENDENT MIND.<br/>UNLIMITED POSSIBILITIES.</span></header>}
