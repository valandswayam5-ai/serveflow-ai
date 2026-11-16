import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ServeFlow AI | Restaurant & Cafe Operating System',
  description: 'A unified restaurant and cafe operating system for orders, tables, kitchen, reservations, menu, inventory, customers, staff and business insights.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
