import React, { useEffect, useMemo, useState } from 'react';
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
import { loadNetworkServicesWithFacade } from './clients/networkClient';

export const NetworkPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryType = searchParams.get('type');
  const highlightId = searchParams.get('highlight');
  const [allServices, setAllServices] = useState<Service[]>(() => getServices());
  const servicesById = useMemo(() => new Map(allServices.map(service => [service.id, service])), [allServices]);
  const { recommendation, setRecommendation } = useTriageRecommendation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(Boolean(serviceId));
  const [mobileView, setMobileView] = useState<'list' | 'map'>(serviceId ? 'map' : 'list');

  useEffect(() => {
    let active = true;
    void (async () => {
      const services = await loadNetworkServicesWithFacade();
      if (active) {
        setAllServices(services);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const hasSelectedService = Boolean(serviceId);
    setIsDrawerOpen(hasSelectedService);
    if (hasSelectedService) {
      setMobileView('map');
    }
  }, [serviceId]);

  const effectiveHighlightId = highlightId || recommendation.highlightId;
  const effectiveQueryType = queryType || recommendation.queryType;
  const hasQueryContext = Boolean(effectiveHighlightId || effectiveQueryType);
  const safeQuery = hasQueryContext
    ? toSafeServiceQuery(
        effectiveHighlightId
          ? `highlight=${effectiveHighlightId}`
          : `type=${effectiveQueryType}`,
        servicesById,
      )
    : null;
  const isUsingRecommendationContext =
    !highlightId && Boolean(recommendation.highlightId || recommendation.queryType);

  const categories = useMemo(() => {
    return Array.from(new Set(allServices.map(s => s.category)));
  }, [allServices]);

  const filteredServices = useMemo(() => {
    let result = allServices;

    if (safeQuery?.kind === 'type') {
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
      const highlightServiceId = safeQuery?.kind === 'highlight' ? safeQuery.id : null;
      if (a.id === highlightServiceId) return -1;
      if (b.id === highlightServiceId) return 1;

      if (a.type === 'interno' && b.type !== 'interno') return -1;
      if (b.type === 'interno' && a.type !== 'interno') return 1;

      return a.name.localeCompare(b.name);
    });
  }, [allServices, safeQuery, searchTerm, selectedCategory]);

  const missingServices = useMemo(() => {
    const visibleIds = new Set(filteredServices.map(service => service.id));
    return allServices.filter(service => !visibleIds.has(service.id));
  }, [allServices, filteredServices]);

  const selectedService = useMemo(() => {
    return allServices.find(s => s.id === serviceId) || null;
  }, [allServices, serviceId]);

  const highlightedService = useMemo(() => {
    if (safeQuery?.kind !== 'highlight') return null;
    return servicesById.get(safeQuery.id) || null;
  }, [safeQuery, servicesById]);

  const hasGuidedContext = Boolean(hasQueryContext || isUsingRecommendationContext);

  const handleSelectService = (service: Service) => {
    navigate(`/rede/servico/${service.id}`);
    setIsDrawerOpen(true);
    setMobileView('map');
  };

  return (
    <div className="space-y-5">
      <header className="rounded-[20px] border border-slate-200/70 bg-white/45 px-5 py-4 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Rede de apoio</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Localize serviços e encaminhamentos com mais rapidez.</p>
        {hasGuidedContext && (
          <div className="mt-3 rounded-[14px] border border-emerald-200 bg-emerald-50/85 px-3 py-2 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-200">
            <p className="font-black uppercase tracking-widest text-[11px]">Continuação da orientação institucional</p>
            <p className="mt-1">
              {highlightedService
                ? `Serviço indicado em destaque: ${highlightedService.name}.`
                : 'Serviços indicados para esta situação em destaque.'}
            </p>
          </div>
        )}
      </header>

      <div className="md:hidden space-y-4">
        <div className="inline-flex rounded-[18px] border border-slate-200/85 bg-white/85 p-1 shadow-[0_10px_20px_-16px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900/80">
          <button
            onClick={() => setMobileView('list')}
            className={`rounded-[14px] px-4 py-2 text-sm font-semibold transition-all ${
              mobileView === 'list'
                ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.9)]'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`rounded-[14px] px-4 py-2 text-sm font-semibold transition-all ${
              mobileView === 'map'
                ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.9)]'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Mapa
          </button>
        </div>

        {mobileView === 'list' ? (
          <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-slate-200/85 bg-white/85 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900/80">
            {isUsingRecommendationContext && (
              <div className="mx-4 mt-4 rounded-[14px] border border-emerald-200 bg-emerald-50/85 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-300">
                <span>Serviços indicados para esta situação · </span>
                <button
                  onClick={() => {
                    setRecommendation({ highlightId: null, queryType: null });
                    navigate('/rede');
                  }}
                  className="font-semibold underline decoration-emerald-500/70 underline-offset-2"
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
            <div className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
              Exibindo {filteredServices.length} de {allServices.length} serviços.
            </div>
            {missingServices.length > 0 && (
              <div className="mx-4 mb-3 rounded-[14px] border border-amber-200 bg-amber-50/85 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                <p className="font-semibold">Serviços fora da lista atual ({missingServices.length}):</p>
                <p>{missingServices.map(service => service.name).join(' • ')}</p>
              </div>
            )}
            <div className="max-h-[58vh] overflow-y-auto no-scrollbar">
              <ServiceList
                services={filteredServices}
                onSelect={handleSelectService}
                selectedId={serviceId}
                highlightId={safeQuery?.kind === 'highlight' ? safeQuery.id : null}
              />
            </div>
          </div>
        ) : (
          <div className="relative h-[58vh] min-h-[360px]">
            <NetworkErrorBoundary fallback={
              <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
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
        )}
      </div>

      <div className="hidden h-[calc(100vh-16rem)] md:flex md:flex-row gap-6">
        <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-slate-200/85 bg-white/85 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900/80 md:w-80">
          {isUsingRecommendationContext && (
            <div className="mx-4 mt-4 rounded-[14px] border border-emerald-200 bg-emerald-50/85 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-300">
              <span>Serviços indicados para esta situação · </span>
              <button
                onClick={() => {
                  setRecommendation({ highlightId: null, queryType: null });
                  navigate('/rede');
                }}
                className="font-semibold underline decoration-emerald-500/70 underline-offset-2"
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
          <div className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
            Exibindo {filteredServices.length} de {allServices.length} serviços.
          </div>
          {missingServices.length > 0 && (
            <div className="mx-4 mb-3 rounded-[14px] border border-amber-200 bg-amber-50/85 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              <p className="font-semibold">Serviços fora da lista atual ({missingServices.length}):</p>
              <p>{missingServices.map(service => service.name).join(' • ')}</p>
            </div>
          )}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <ServiceList
              services={filteredServices}
              onSelect={handleSelectService}
              selectedId={serviceId}
              highlightId={safeQuery?.kind === 'highlight' ? safeQuery.id : null}
            />
          </div>
        </div>

        <div className="relative flex-1">
          <NetworkErrorBoundary fallback={
            <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
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
