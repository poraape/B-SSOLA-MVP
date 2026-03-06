import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getServices } from '../../domain/flows/selectors';
import { ServiceFilters } from './components/ServiceFilters';
import { ServiceList } from './components/ServiceList';
import { NetworkMap } from './components/NetworkMap';
import { ServiceDrawer } from './components/ServiceDrawer';
import { Service } from '../../types';
import { toSafeServiceQuery } from '../../domain/services/serviceQuery';
import { NetworkErrorBoundary } from './NetworkErrorBoundary';
import { useTriageRecommendation } from '../../app/context/TriageRecommendationContext';

export const NetworkPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryType = searchParams.get('type');
  const highlightId = searchParams.get('highlight');
  const allServices = getServices();
  const servicesById = useMemo(() => new Map(allServices.map(service => [service.id, service])), [allServices]);
  const { recommendation, setRecommendation } = useTriageRecommendation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!serviceId);

  const effectiveHighlightId = highlightId || recommendation.highlightId;
  const effectiveQueryType = queryType || recommendation.queryType;
  const safeQuery = toSafeServiceQuery(
    effectiveHighlightId ? `highlight=${effectiveHighlightId}` : effectiveQueryType ? `type=${effectiveQueryType}` : null,
    servicesById
  );
  const isUsingRecommendationContext = !highlightId && Boolean(recommendation.highlightId);

  const categories = useMemo(() => {
    return Array.from(new Set(allServices.map(s => s.category)));
  }, [allServices]);

  const filteredServices = useMemo(() => {
    let result = allServices;

    if (safeQuery.kind === 'type') {
      result = result.filter(s =>
        safeQuery.serviceType === 'interno'
          ? s.type === 'interno' || s.category === 'institucional'
          : s.type !== 'interno'
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...result].sort((a, b) => {
      const highlightServiceId = safeQuery.kind === 'highlight' ? safeQuery.id : null;
      if (a.id === highlightServiceId) return -1;
      if (b.id === highlightServiceId) return 1;

      if (a.type === 'interno' && b.type !== 'interno') return -1;
      if (b.type === 'interno' && a.type !== 'interno') return 1;

      return a.name.localeCompare(b.name);
    });
  }, [allServices, safeQuery, searchTerm, selectedCategory]);

  const selectedService = useMemo(() => {
    return allServices.find(s => s.id === serviceId) || null;
  }, [allServices, serviceId]);

  const handleSelectService = (service: Service) => {
    navigate(`/rede/servico/${service.id}`);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-4 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900/85">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Rede de apoio</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Localize serviços e encaminhamentos com mais rapidez.</p>
      </header>

      <div className="h-[calc(100vh-16rem)] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm">
        {isUsingRecommendationContext && (
          <div className="mx-4 mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            <span>Serviços recomendados para esta situação · </span>
            <button
              onClick={() => {
                setRecommendation({ highlightId: null, queryType: null });
                navigate('/rede');
              }}
              className="font-semibold underline"
            >
              Ver todos os serviços
            </button>
          </div>
        )}
        <ServiceFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <ServiceList 
            services={filteredServices} 
            onSelect={handleSelectService}
            selectedId={serviceId}
            highlightId={safeQuery.kind === 'highlight' ? safeQuery.id : null}
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <NetworkErrorBoundary fallback={
          <div className="p-4 text-sm text-gray-600 bg-yellow-50 rounded">
            Mapa temporariamente indisponível.
          </div>
        }>
          <NetworkMap 
            services={filteredServices}
            selectedService={selectedService}
            onMarkerClick={handleSelectService}
          />
        </NetworkErrorBoundary>
        
        {isDrawerOpen && selectedService && (
          <ServiceDrawer 
            service={selectedService} 
            onClose={() => {
              setIsDrawerOpen(false);
              navigate('/rede');
            }} 
          />
        )}
      </div>
    </div>
    </div>
  );
};
