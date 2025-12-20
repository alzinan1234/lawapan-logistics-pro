'use client';

import { useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './shipper.css';


import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ShipperAdmin/Sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);



  // Function to go back from NotificationPage (e.g., from the back arrow)
  const handleGoBack = () => {
    setShowNotifications(false);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex  text-white min-h-screen">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          <main
            className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ${
              isOpen ? 'ml-64' : 'ml-0'
            }`}
          >
        
      <Navbar />

      <div className="p-4">{children}</div>
            
          </main>
        </div>
      </body>
    </html>
  );
}