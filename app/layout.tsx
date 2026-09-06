import type { Metadata } from 'next';
import './globals.css';
import Navigation from './navigation';
export const metadata: Metadata = { title: 'OPIUM — Personal Portfolio', description: 'พื้นที่ของตัวตน ความคิดสร้างสรรค์ และผลงาน — Personal portfolio' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="th" className="dark"><body><a className="skip" href="#main">ข้ามไปยังเนื้อหา</a><Navigation/>{children}<footer><a className="wordmark" href="/">opium<span>®</span></a><span>PERSONAL PORTFOLIO · 2026</span><span>MADE OF IDEAS. BUILT WITH INTENT.</span></footer></body></html> }
