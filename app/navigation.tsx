'use client';
import { usePathname } from 'next/navigation';

const links = [['/','แนะนำตัว','01'],['/skills','SKILLS','02'],['/history','ประวัติ','03'],['/work','ผลงาน','04']];
export default function Navigation(){const path = usePathname();return <header className="header"><a className="wordmark" href="/" aria-label="Opium หน้าหลัก">opium<span>®</span></a><nav aria-label="เมนูหลัก">{links.map(([url,label,n])=><a key={url} href={url} aria-current={path===url?'page':undefined}><small>{n}</small>{label}</a>)}</nav><span className="edition">INDEPENDENT MIND.<br/>UNLIMITED POSSIBILITIES.</span></header>}

