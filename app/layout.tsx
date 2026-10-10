import type { Metadata } from 'next';
import './handshake-intro.css';
import './theme.css';
import HandshakeIntro from './handshake-intro';
import Navigation from './navigation';

export const metadata: Metadata = { title: 'Nattawut Wongnimit - Portfolio', description: 'พอร์ตโฟลิโอของณัฐวุฒิ ว่องนิมิต นักศึกษาเทคโนโลยีสารสนเทศ รวมทักษะและผลงานพัฒนาเว็บไซต์ แอปพลิเคชัน และ IoT' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="th" className="dark"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@500;700;900&family=IBM+Plex+Sans+Thai:wght@400;500;700&display=swap"/></head><body><HandshakeIntro/><div id="portfolio-shell"><a className="skip" href="#main">ข้ามไปยังเนื้อหา</a><Navigation/>{children}<footer><a className="wordmark" href="/#introduction" aria-label="กลับขึ้นด้านบน"><span className="logo" aria-hidden="true"/></a><span>Portfolio 2026</span><span>Bangkok, Thailand</span></footer></div></body></html> }
