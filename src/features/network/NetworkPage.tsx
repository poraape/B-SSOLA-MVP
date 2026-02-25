import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServices } from '../../domain/flows/selectors';
import { ServiceFilters } from './components/ServiceFilters';
import { ServiceList } from './components/ServiceList';
import { NetworkMap } from './components/NetworkMap';
import { ServiceDrawer } from './components/ServiceDrawer';
import { Service } from '../../types';

export const NetworkPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const allServices = getServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!serviceId);

  const categories = useMemo(() => {
    return Array.from(new Set(allServices.map(s => s.category)));
  }, [allServices]);

  const filteredServices = useMemo(() => {
    return allServices.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.location.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allServices, searchTerm, selectedCategory]);

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
