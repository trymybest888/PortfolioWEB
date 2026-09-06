import type { Metadata } from 'next';
import './globals.css';
import './handshake-intro.css';
import HandshakeIntro from './handshake-intro';
import Navigation from './navigation';
export const metadata: Metadata = { title: 'OPIUM — Personal Portfolio', description: 'พื้นที่ของตัวตน ความคิดสร้างสรรค์ และผลงาน — Personal portfolio' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="th" className="dark"><body><HandshakeIntro/><div id="portfolio-shell"><a className="skip" href="#main">ข้ามไปยังเนื้อหา</a><Navigation/>{children}<footer><a className="wordmark" href="#introduction">opium<span>®</span></a><span>PERSONAL PORTFOLIO · 2026</span><span>MADE OF IDEAS. BUILT WITH INTENT.</span></footer></div></body></html> }


