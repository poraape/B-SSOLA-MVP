import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getServices } from '../../domain/flows/selectors';
import { ServiceFilters } from './components/ServiceFilters';
import { ServiceList } from './components/ServiceList';
import { NetworkMap } from './components/NetworkMap';
import { ServiceDrawer } from './components/ServiceDrawer';
import { Service } from '../../types';

export const NetworkPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryType = searchParams.get('type');
  const highlightId = searchParams.get('highlight');
  const allServices = getServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!serviceId);

  const categories = useMemo(() => {
    return Array.from(new Set(allServices.map(s => s.category)));
  }, [allServices]);

  const filteredServices = useMemo(() => {
    let result = allServices;

    if (queryType) {
      result = result.filter(s =>
        queryType === 'interno'
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
      if (a.id === highlightId) return -1;
      if (b.id === highlightId) return 1;

      if (a.type === 'interno' && b.type !== 'interno') return -1;
      if (b.type === 'interno' && a.type !== 'interno') return 1;

      return a.name.localeCompare(b.name);
    });
  }, [allServices, highlightId, queryType, searchTerm, selectedCategory]);

  const selectedService = useMemo(() => {
    return allServices.find(s => s.id === serviceId) || null;
  }, [allServices, serviceId]);

  const handleSelectService = (service: Service) => {
    navigate(`/rede/servico/${service.id}`);
    setIsDrawerOpen(true);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm">
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
            highlightId={highlightId}
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <NetworkMap 
          services={filteredServices}
          selectedService={selectedService}
          onMarkerClick={handleSelectService}
        />
        
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
  );
};
