import React from 'react';

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <main className="w-full max-w-2xl p-10 sm:p-14 bg-gray-900 rounded-3xl
                       shadow-[0_0_20px_rgba(0,0,0,0.5)] text-center">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-200 mb-6">
          Remerciements pour votre participation
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          Nous vous remercions pour le temps consacré à la complétion de cette enquête.
          <br /><br />
          Les informations recueillies contribueront à l’amélioration continue de nos formations.
        </p>
      </main>
    </div>
  );
}
