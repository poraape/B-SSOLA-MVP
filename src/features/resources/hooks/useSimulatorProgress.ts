// src/features/resources/hooks/useSimulatorProgress.ts

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, CompletedCase } from '../data/simulatorTypes';

const STORAGE_KEY = 'bussola_simulator_progress';

// Gera ID anônimo para o usuário (hash do timestamp + random)
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Carrega progresso do localStorage
const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
  }
  
  // Progresso inicial
  return {
    userId: generateUserId(),
    completedCases: [],
    totalScore: 0,
    lastSession: new Date().toISOString(),
    startedAt: new Date().toISOString()
  };
};

// Salva progresso no localStorage
const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
  }
};

export const useSimulatorProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Atualiza localStorage sempre que progress mudar
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Adiciona caso concluído
  const addCompletedCase = useCallback((
    caseId: string,
    choiceId: string,
    score: number,
    timeSpent: number
  ) => {
    setProgress(prev => {
      // Remove tentativa anterior do mesmo caso (se houver)
      const filtered = prev.completedCases.filter(c => c.caseId !== caseId);
      
      const newCase: CompletedCase = {
        caseId,
        choiceId,
        score,
        timestamp: new Date().toISOString(),
        timeSpent
      };

      const updated = [...filtered, newCase];
      const totalScore = Math.round(
        updated.reduce((sum, c) => sum + c.score, 0) / updated.length
      );

      return {
        ...prev,
        completedCases: updated,
        totalScore,
        lastSession: new Date().toISOString()
      };
    });
  }, []);

  // Verifica se caso foi concluído
  const isCaseCompleted = useCallback((caseId: string): boolean => {
    return progress.completedCases.some(c => c.caseId === caseId);
  }, [progress]);

  // Pega score de um caso específico
  const getCaseScore = useCallback((caseId: string): number | null => {
    const completed = progress.completedCases.find(c => c.caseId === caseId);
    return completed ? completed.score : null;
  }, [progress]);

  // Reseta todo o progresso
  const resetProgress = useCallback(() => {
    const newProgress: UserProgress = {
      userId: generateUserId(),
      completedCases: [],
      totalScore: 0,
      lastSession: new Date().toISOString(),
      startedAt: new Date().toISOString()
    };
    setProgress(newProgress);
  }, []);

  // Exporta relatório (para futura funcionalidade PDF)
  const exportReport = useCallback(() => {
    return {
      ...progress,
      exportedAt: new Date().toISOString()
    };
  }, [progress]);

  return {
    progress,
    addCompletedCase,
    isCaseCompleted,
    getCaseScore,
    resetProgress,
    exportReport
  };
};
