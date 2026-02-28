import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../../features/home/HomePage').then(m => ({ default: m.HomePage })));
const AtendimentoGatePage = lazy(() => import('../../features/gateway/AtendimentoGatePage').then(m => ({ default: m.AtendimentoGatePage })));
const CategoryPage = lazy(() => import('../../features/triage/CategoryPage').then(m => ({ default: m.CategoryPage })));
const FlowPage = lazy(() => import('../../features/triage/FlowPage').then(m => ({ default: m.FlowPage })));
const ResultPage = lazy(() => import('../../features/triage/ResultPage').then(m => ({ default: m.ResultPage })));
const NetworkPage = lazy(() => import('../../features/network/NetworkPage').then(m => ({ default: m.NetworkPage })));
const ServiceDetailsPage = lazy(() => import('../../features/network/ServiceDetailsPage').then(m => ({ default: m.ServiceDetailsPage })));
const ResourcesPage = lazy(() => import('../../features/resources/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const NotFoundPage = lazy(() => import('../../features/shared/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/atendimento" element={<AtendimentoGatePage />} />
      <Route path="/categorias" element={<Navigate to="/" replace />} />
      <Route path="/categoria/:categoryId" element={<CategoryPage />} />
      <Route path="/fluxo/:flowId" element={<FlowPage />} />
      <Route path="/resultado/:flowId" element={<ResultPage />} />
      <Route path="/rede" element={<NetworkPage />} />
      <Route path="/rede/servico/:serviceId" element={<NetworkPage />} />
      <Route path="/servico/:serviceId" element={<ServiceDetailsPage />} />
      <Route path="/recursos" element={<ResourcesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
