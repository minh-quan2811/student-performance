import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Student Performance Predictor',
  description: 'Predict your academic performance and get personalized recommendations',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}