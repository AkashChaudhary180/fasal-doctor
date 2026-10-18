import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fasal Doctor (फसल डॉक्टर) - AI Crop Disease Diagnostic PWA',
  description:
    'Instant crop disease diagnosis, audio remedies in Hindi and Punjabi, and nearby Agri & Fertilizer stores within 10 km for Indian farmers.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fasal Doctor',
  },
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased min-h-screen bg-kisan-surface text-kisan-dark flex flex-col pb-24">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) { console.log('🌿 Fasal Doctor SW registered:', reg.scope); },
                    function(err) { console.log('SW registration failed:', err); }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
