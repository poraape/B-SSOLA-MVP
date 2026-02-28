import { describe, expect, it } from 'vitest';
import extensions from '../../../data/model.v2.extensions.json';
import { loadPremiumExtensions } from '../loadPremiumExtensions';

describe('loadPremiumExtensions', () => {
  it('returns extension payload from bundled JSON', () => {
    expect(loadPremiumExtensions()).toEqual(extensions);
  });
});
