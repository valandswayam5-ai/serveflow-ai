import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ServeFlow AI | Restaurant & Cafe Operating System',
  description: 'A unified restaurant and cafe operating system for orders, tables, kitchen, reservations, menu, inventory, customers, staff and business insights.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}

      <footer style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",gap:"10px 18px",padding:"14px 18px",background:"#080808",borderTop:"1px solid #252525",color:"#a3a3a3",fontSize:11,letterSpacing:".03em",textAlign:"center"}}>
        <span>Powered by <a href="https://getautomated.co" target="_blank" rel="noopener noreferrer" style={{color:"#A3E635",fontWeight:800,textDecoration:"none"}}>GETAUTOMATED.CO</a></span>
        <span style={{color:"#555"}}>·</span>
        <a href="https://www.instagram.com/getautomate.co/" target="_blank" rel="noopener noreferrer" style={{color:"#d4d4d4",textDecoration:"none"}}>Instagram @getautomate.co ↗</a>
      </footer>
      </body>
    </html>
  );
}
