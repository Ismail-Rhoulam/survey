'use client';

import Image from 'next/image';
import React from 'react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen w-full flex justify-center px-4 pt-14 bg-gray-900">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Ophelia"
          width={120}
          height={120}
          priority
          className="mb-10 opacity-95"
        />

        {/* Card */}
        <main
          className="w-full p-10 sm:p-14 bg-gray-900 rounded-3xl
                     shadow-[0_0_20px_rgba(0,0,0,0.5)] text-center"
        >
          <h1 className="text-4xl font-bold text-gray-200 mb-6">
            Remerciements pour votre participation
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Nous vous remercions pour le temps consacré à la complétion de cette enquête.
            <br />
            <br />
            Les informations recueillies contribueront à l’amélioration continue de nos formations.
          </p>
        </main>
      </div>
    </div>
  );
}
