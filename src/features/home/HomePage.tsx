import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getEmergencyRoute } from '@/domain/flows/selectors';
import { getCategories } from '@/domain/model';

import { CategoryAppGridPreview } from './components/CategoryAppGridPreview';
import { HeroDecisionSurface } from './components/HeroDecisionSurface';
import { QuickModes } from './components/QuickModes';
import { ResourcesSupportLayer } from './components/ResourcesSupportLayer';
import { TrustLayer } from './components/TrustLayer';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const emergencyRoute = getEmergencyRoute();

  const categories = [...getCategories()]
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))
    .slice(0, 7);

  return (
    <div className="space-y-6 md:space-y-10">
      <HeroDecisionSurface
        onStartGuidedCare={() => navigate('/atendimento')}
        onOpenNetwork={() => navigate('/rede')}
        onOpenEmergency={() => navigate(emergencyRoute)}
      />

      <QuickModes
        onStartGuidedCare={() => navigate('/atendimento')}
        onOpenNetwork={() => navigate('/rede')}
        onOpenResources={() => navigate('/recursos')}
      />

      <CategoryAppGridPreview
        categories={categories}
        onOpenCategory={(categoryId) => navigate(`/categoria/${categoryId}`)}
        onOpenAllCategories={() => navigate('/categorias')}
      />

      <ResourcesSupportLayer
        onOpenGlossary={() => navigate('/recursos?tab=glossary')}
        onOpenFaq={() => navigate('/recursos?tab=faq')}
        onOpenSimulator={() => navigate('/recursos?tab=simulator')}
      />

      <TrustLayer onStartGuidedCare={() => navigate('/atendimento')} />
    </div>
  );
};
