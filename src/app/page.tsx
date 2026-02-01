'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RatingIcon, RatingColors, surveyQuestions, ratingScale } from './survey.config';

type SurveyFormData = {
  [K in typeof surveyQuestions[number]['name']]: number;
};

const initialFormData: SurveyFormData = surveyQuestions.reduce((acc, q) => {
  acc[q.name] = 0;
  return acc;
}, {} as SurveyFormData);

// Tailwind color to hex map (using common values for illustration)
const tailwindColorMap: { [key: string]: string } = {
  'red-700': '#b91c1c',
  'red-500': '#ef4444',
  'orange-500': '#f97316',
  'orange-400': '#fb923c',
  'yellow-500': '#eab308',
  'yellow-400': '#facc15',
  'lime-500': '#84cc16',
  'lime-400': '#a3e635',
  'green-500': '#22c55e',
  'green-400': '#4ade80',
  'gray-800': '#1f2937',
};

function HomeInner() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid') || 'anonymous_user';

  const [formData, setFormData] = useState<SurveyFormData>(initialFormData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = surveyQuestions[currentQuestionIndex];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completedQuestionsCount = Object.values(formData).filter((v) => v > 0).length;
    setProgress((completedQuestionsCount / surveyQuestions.length) * 100);
  }, [formData]);

  const handleRating = (name: keyof typeof formData, value: number) => {
    const newData = { ...formData, [name]: value };
    setFormData(newData);
  };

  const handleNext = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting survey:', formData);

    const dataToSend = { ...formData, uid };

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de la soumission: ${errorData.message}`);
        console.error('API Error:', errorData);
      }
    } catch (error) {
      alert('Une erreur inattendue est survenue.');
      console.error('Network or unexpected error:', error);
    }
  };

  const isComplete = progress === 100;
  const isCurrentQuestionAnswered = formData[currentQuestion.name] > 0;
  const isLastQuestion = currentQuestionIndex === surveyQuestions.length - 1;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <main className="w-full max-w-3xl p-8 sm:p-12 bg-gray-900 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-200">
          Enquête de Satisfaction
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Vos retours contribuent à l’amélioration continue de nos formations.
        </p>

        <div className="w-full bg-gray-900 rounded-full h-4 shadow-[inset_8px_8px_16px_#0c0f1a,inset_-8px_-8px_16px_#162134] mb-12">
          <div
            className="h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${progress}%`,
              background: isComplete
                ? 'linear-gradient(to right, #22c55e, #16a34a)'
                : 'linear-gradient(to right, #3b82f6, #2563eb)',
            }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div key={currentQuestion.id}>
            <p className="mb-6 text-xl font-light text-gray-300">{currentQuestion.label}</p>
            <div className="flex flex-wrap text-center justify-center items-center gap-4">
              {ratingScale.map((ratingValue) => {
                const isSelected = ratingValue === formData[currentQuestion.name];

                let buttonClasses =
                  'w-12 h-12 rounded-full transition-all duration-200 ease-in-out flex items-center justify-center border-2';
                let iconColorClasses = 'text-gray-200 text-lg';
                let currentBorderColor = tailwindColorMap['gray-800'];

                if (isSelected) {
                  const selectedColorClass = RatingColors[ratingValue - 1];
                  const colorName = selectedColorClass.replace('text-', '');
                  currentBorderColor = tailwindColorMap[colorName] || 'currentColor';

                  buttonClasses +=
                    ' bg-gray-900 shadow-[inset_6px_6px_12px_#0c0f1a,inset_-6px_-6px_12px_#162134]';
                  iconColorClasses += ` ${selectedColorClass}`;
                } else {
                  buttonClasses +=
                    ' bg-gray-900 shadow-[6px_6px_12px_#0c0f1a,-6px_-6px_12px_#162134] hover:shadow-[1px_1px_2px_#0c0f1a,-1px_-1px_2px_#162134]';
                }

                return (
                  <button
                    type="button"
                    key={ratingValue}
                    className={buttonClasses}
                    style={{ borderColor: currentBorderColor }}
                    onClick={() => handleRating(currentQuestion.name, ratingValue)}
                  >
                    <RatingIcon rating={ratingValue} className={iconColorClasses} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-10">
            {currentQuestionIndex > 0 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="min-w-[120px] py-3 px-6 rounded-full font-bold transition-all duration-150 ease-in-out
                           bg-gray-900 text-gray-200 border-2 border-gray-800 shadow-[6px_6px_12px_#0c0f1a,-6px_-6px_12px_#162134]
                           hover:shadow-[1px_1px_2px_#0c0f1a,-1px_-1px_2px_#162134]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
            ) : (
              <div className="py-3 px-6" />
            )}

            {isLastQuestion ? (
              <button
                type="submit"
                className={`min-w-[120px] py-3 px-6 text-lg font-bold rounded-full transition-all duration-150 ease-in-out ${
                  isComplete
                    ? 'bg-blue-500 text-white shadow-[6px_6px_12px_#0c0f1a,-6px_-6px_12px_#162134] hover:bg-blue-600 active:scale-[0.98] active:shadow-none'
                    : 'bg-gray-900 text-gray-600 shadow-[6px_6px_12px_#0c0f1a,-6px_-6px_12px_#162134] cursor-not-allowed opacity-50'
                }`}
                disabled={!isComplete}
              >
                Soumettre
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered}
                className="min-w-[120px] py-3 px-6 rounded-full font-bold transition-all duration-150 ease-in-out
                           bg-blue-500 text-white shadow-[6px_6px_12px_#0c0f1a,-6px_-6px_12px_#162134]
                           hover:bg-blue-600 active:scale-[0.98] active:shadow-none
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
}
