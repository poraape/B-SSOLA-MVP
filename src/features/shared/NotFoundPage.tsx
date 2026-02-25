import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
        <span className="text-4xl font-black text-slate-300">404</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Página não encontrada</h2>
        <p className="text-slate-500 max-w-sm">
          A situação ou recurso que você está procurando não existe ou foi movido.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary">
          <Home className="w-4 h-4 mr-2" />
          Voltar para o Início
        </Button>
      </Link>
    </div>
  );
};
