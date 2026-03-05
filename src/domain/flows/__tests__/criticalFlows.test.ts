import { describe, it, expect } from 'vitest';
import { loadModel } from '../../model/loadModel';

describe('critical flows validation', () => {
  it('all critical flows have valid structure', () => {
    const model = loadModel();
    const criticalFlows = model.flows.filter(f => 
      f.meta.severity === 'CRITICAL' || 
      f.meta.type === 'medical_emergency' ||
      f.meta.type === 'security_emergency'
    );

    expect(criticalFlows.length).toBeGreaterThan(0);

    criticalFlows.forEach(flow => {
      // Meta validation
      expect(flow.meta.id).toBeDefined();
      expect(flow.meta.categoryId).toBeDefined();
      expect(flow.meta.title).toBeDefined();

      // Triage validation
      expect(flow.triage).toBeDefined();
      expect(flow.triage.questions).toBeDefined();
      expect(flow.triage.questions.length).toBeGreaterThan(0);

      // Questions validation
      flow.triage.questions.forEach(question => {
        expect(question.id).toBeDefined();
        expect(question.text).toBeDefined();
        expect(question.options).toBeDefined();
        expect(question.options.length).toBeGreaterThan(0);

        // Options validation
        question.options.forEach(option => {
          expect(option.label).toBeDefined();
          
          // Each option must have level, next, nextFlow, or redirectToCategories
          const hasTermination = 
            option.level || 
            option.next || 
            option.nextFlow || 
            option.redirectToCategories;
          
          expect(hasTermination).toBe(true);
        });
      });

      // Results validation
      expect(flow.results).toBeDefined();
      expect(Object.keys(flow.results).length).toBeGreaterThan(0);
    });
  });
});
