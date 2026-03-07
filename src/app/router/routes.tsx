import React, { lazy } from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../../features/home/HomePage').then(m => ({ default: m.HomePage })));
const CategoriesIndexPage = lazy(() =>
  import('../../features/home/CategoriesIndexPage').then(m => ({ default: m.CategoriesIndexPage }))
);
const AtendimentoGatePage = lazy(() => import('../../features/gateway/AtendimentoGatePage').then(m => ({ default: m.AtendimentoGatePage })));
const CategoryPage = lazy(() => import('../../features/triage/CategoryPage').then(m => ({ default: m.CategoryPage })));
const FlowPage = lazy(() => import('../../features/triage/FlowPage').then(m => ({ default: m.FlowPage })));
const ResultPage = lazy(() => import('../../features/triage/ResultPage').then(m => ({ default: m.ResultPage })));
const NetworkPage = lazy(() => import('../../features/network/NetworkPage').then(m => ({ default: m.NetworkPage })));
const ServiceDetailsPage = lazy(() => import('../../features/network/ServiceDetailsPage').then(m => ({ default: m.ServiceDetailsPage })));
const ResourcesPage = lazy(() => import('../../features/resources/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const GlossaryGraphTermRoutePage = lazy(() =>
  import('../../features/resources/glossaryGraph/pages/GlossaryGraphTermRoutePage').then((m) => ({ default: m.GlossaryGraphTermRoutePage }))
);
const GlossaryGraphExplorerPage = lazy(() =>
  import('../../features/resources/glossaryGraph/pages/GlossaryGraphExplorerPage').then((m) => ({ default: m.GlossaryGraphExplorerPage }))
);
const GlossaryCategoryHubPage = lazy(() =>
  import('../../features/resources/glossaryGraph/pages/GlossaryCategoryHubPage').then((m) => ({ default: m.GlossaryCategoryHubPage }))
);
const NotFoundPage = lazy(() => import('../../features/shared/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const ResourcesTabRedirect: React.FC = () => {
  const { tab = 'glossary' } = useParams();

  return <Navigate to={`/recursos?tab=${encodeURIComponent(tab)}`} replace />;
};


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/atendimento" element={<AtendimentoGatePage />} />
      <Route path="/categorias" element={<CategoriesIndexPage />} />
      <Route path="/categoria/:categoryId" element={<CategoryPage />} />
      <Route path="/fluxo/:flowId" element={<FlowPage />} />
      <Route path="/resultado/:flowId" element={<ResultPage />} />
      <Route path="/rede" element={<NetworkPage />} />
      <Route path="/rede/servico/:serviceId" element={<NetworkPage />} />
      <Route path="/servico/:serviceId" element={<ServiceDetailsPage />} />
      <Route path="/recursos" element={<ResourcesPage />} />
      <Route path="/recursos/:tab" element={<ResourcesTabRedirect />} />
      <Route path="/resources" element={<Navigate to="/recursos" replace />} />
      <Route path="/resources/:tab" element={<ResourcesTabRedirect />} />
      <Route path="/network" element={<Navigate to="/rede" replace />} />
      <Route path="/gateway" element={<Navigate to="/atendimento" replace />} />
      <Route path="/recursos/glossario/grafo" element={<GlossaryGraphExplorerPage />} />
      <Route path="/recursos/glossario/categoria/:category" element={<GlossaryCategoryHubPage />} />
      <Route path="/recursos/glossario/:slug" element={<GlossaryGraphTermRoutePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
