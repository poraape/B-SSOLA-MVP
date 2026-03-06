import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getEmergencyRoute } from '@/domain/flows/selectors';
import { getCategories } from '@/domain/model';

import { CategoryGridPreview } from './components/CategoryGridPreview';
import { HeroDecisionSurface } from './components/HeroDecisionSurface';
import { ResourcesSupportLayer } from './components/ResourcesSupportLayer';
import { TrustLayer } from './components/TrustLayer';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const categories = [...getCategories()].sort((a, b) => (b.weight || 0) - (a.weight || 0));
  const emergencyRoute = getEmergencyRoute();

  return (
    <div className="space-y-16">
      <HeroDecisionSurface
        onStartGuidedCare={() => navigate('/atendimento')}
        onOpenNetwork={() => navigate('/rede')}
        onOpenEmergency={() => navigate(emergencyRoute)}
      />

      <CategoryGridPreview
        categories={categories}
        onOpenCategory={(categoryId) => navigate(`/categoria/${categoryId}`)}
        onOpenAllCategories={() => navigate('/categorias')}
      />

      <ResourcesSupportLayer
        onStartGuidedCare={() => navigate('/atendimento')}
        onOpenNetwork={() => navigate('/rede')}
        onOpenResources={() => navigate('/recursos')}
      />

      <TrustLayer onStartGuidedCare={() => navigate('/atendimento')} />
    </div>
  );
};
