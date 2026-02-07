import React from 'react';

export const RatingIcon = ({ rating, className }: { rating: number; className:string }) => {
    return (
        <span className={className}>
            {rating}
        </span>
    );
};


export const RatingColors = [
  'text-red-700', // 1
  'text-red-500', // 2
  'text-orange-500', // 3
  'text-orange-400', // 4
  'text-yellow-500', // 5
  'text-yellow-400', // 6
  'text-lime-500', // 7
  'text-lime-400', // 8
  'text-green-500', // 9
  'text-green-400', // 10
];

export const surveyQuestions = [
    {
      id: 'contenu',
      name: 'contenu' as const,
      label: 'Dans quelle mesure le contenu de la formation a-t-il répondu à vos attentes en termes d’apports théoriques, pratiques et de pertinence clinique ?',
    },
    {
      id: 'intervenants',
      name: 'intervenants' as const,
      label: "Comment évaluez-vous la qualité globale du ou des intervenant(s), au regard de leur expertise théorique, de leur expérience pratique et de leur maîtrise clinique ?",
    },
    {
      id: 'organisation',
      name: 'organisation' as const,
      label: "Comment appréciez-vous l’organisation générale et le déroulement de la formation, notamment en termes de logistique, de rythme et de supports pédagogiques ?",
    },
    {
      id: 'nps',
      name: 'nps' as const,
      label: "Dans quelle mesure recommanderiez-vous une formation de l’Institut Ophelia à un confrère médecin-dentiste ?",
    },
    {
      id: 'free_text',
      name: 'free_text' as const,
      label: "Souhaitez-vous formuler des observations, suggestions ou commentaires complémentaires concernant cette formation, afin de contribuer à l’amélioration continue de nos actions pédagogiques ?",
    },

];

export const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

