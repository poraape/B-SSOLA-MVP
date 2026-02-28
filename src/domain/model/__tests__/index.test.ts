import { describe, expect, it, vi } from 'vitest';

const { mockModel } = vi.hoisted(() => ({
  mockModel: {
    categories: [{ id: 'c1' }],
    flows: [{ meta: { id: 'f1' } }],
  },
}));

vi.mock('../loadModel', () => ({
  model: mockModel,
  loadModel: vi.fn(),
  getValidatedModel: vi.fn(),
}));

import { getCategories, getFlows } from '../index';

describe('model index helpers', () => {
  it('returns categories from UI model proxy', () => {
    expect(getCategories()).toEqual(mockModel.categories);
  });

  it('returns flows from UI model proxy', () => {
    expect(getFlows()).toEqual(mockModel.flows);
  });
});
