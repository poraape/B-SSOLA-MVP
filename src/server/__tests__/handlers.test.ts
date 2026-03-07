import { describe, expect, it } from 'vitest';

import contentBootstrapHandler from '../../../api/content/bootstrap';
import networkServicesHandler from '../../../api/network/services';
import searchHandler from '../../../api/search';
import triageResolveHandler from '../../../api/triage/resolve';
import type { Flow } from '../../types';

type MockReq = { method?: string; body?: unknown };
type MockRes = {
  statusCode: number;
  jsonBody: unknown;
  headers: Record<string, string>;
  status: (code: number) => MockRes;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const createMockRes = (): MockRes => {
  const res: MockRes = {
    statusCode: 200,
    jsonBody: null,
    headers: {},
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.jsonBody = body;
    },
    setHeader(name: string, value: string) {
      this.headers[name] = value;
    },
  };
  return res;
};

const flowFixture: Flow = {
  meta: {
    id: 'flow_fixture',
    categoryId: 'saude_bem_estar',
    subcategory: 'Fixture',
    type: 'standard',
    title: 'Flow Fixture',
    keywords: [],
  },
  riskModel: {
    usedLevels: ['LOW'],
    defaultLevel: 'LOW',
  },
  triage: {
    maxQuestions: 1,
    questions: [
      {
        id: 'q1',
        text: 'Pergunta',
        options: [{ label: 'Sim', level: 'LOW' }],
      },
    ],
  },
  results: {
    LOW: {
      severity: 'baixo',
      primaryService: null,
      secondaryService: null,
      schoolActions: [],
    },
  },
};

describe('API handlers hardening', () => {
  it('returns 405 for GET on /api/search', () => {
    const req: MockReq = { method: 'GET' };
    const res = createMockRes();
    searchHandler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.jsonBody).toMatchObject({
      ok: false,
      error: { code: 'METHOD_NOT_ALLOWED' },
    });
  });

  it('returns 200 for valid POST on /api/search', () => {
    const req: MockReq = { method: 'POST', body: { query: 'febre', type: 'all' } };
    const res = createMockRes();
    searchHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toMatchObject({ ok: true });
  });

  it('returns 400 for invalid payload on /api/search', () => {
    const req: MockReq = { method: 'POST', body: { type: 'all' } };
    const res = createMockRes();
    searchHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });

  it('returns 405 for GET on /api/network/services', () => {
    const req: MockReq = { method: 'GET' };
    const res = createMockRes();
    networkServicesHandler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'METHOD_NOT_ALLOWED' } });
  });

  it('returns 200 for valid POST on /api/network/services', () => {
    const req: MockReq = { method: 'POST', body: {} };
    const res = createMockRes();
    networkServicesHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toMatchObject({ ok: true });
  });

  it('returns 400 for invalid payload on /api/network/services', () => {
    const req: MockReq = { method: 'POST', body: 1 };
    const res = createMockRes();
    networkServicesHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });

  it('returns 400 for null payload on /api/network/services', () => {
    const req: MockReq = { method: 'POST', body: null };
    const res = createMockRes();
    networkServicesHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });

  it('returns 405 for GET on /api/content/bootstrap', () => {
    const req: MockReq = { method: 'GET' };
    const res = createMockRes();
    contentBootstrapHandler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'METHOD_NOT_ALLOWED' } });
  });

  it('returns 200 for valid POST on /api/content/bootstrap', () => {
    const req: MockReq = { method: 'POST', body: {} };
    const res = createMockRes();
    contentBootstrapHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toMatchObject({ ok: true });
  });

  it('returns 400 for invalid payload on /api/content/bootstrap', () => {
    const req: MockReq = { method: 'POST', body: 1 };
    const res = createMockRes();
    contentBootstrapHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });

  it('returns 400 for undefined payload on /api/content/bootstrap', () => {
    const req: MockReq = { method: 'POST' };
    const res = createMockRes();
    contentBootstrapHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });

  it('returns 405 for GET on /api/triage/resolve', () => {
    const req: MockReq = { method: 'GET' };
    const res = createMockRes();
    triageResolveHandler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'METHOD_NOT_ALLOWED' } });
  });

  it('returns 200 for valid POST on /api/triage/resolve', () => {
    const req: MockReq = {
      method: 'POST',
      body: {
        input: {
          mode: 'flow',
          flow: flowFixture,
          state: {
            flowId: flowFixture.meta.id,
            currentQuestionId: 'q1',
            answers: {},
            result: null,
            isComplete: false,
          },
          questionId: 'q1',
          optionLabel: 'Sim',
        },
      },
    };
    const res = createMockRes();
    triageResolveHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toMatchObject({ ok: true });
  });

  it('returns 400 for invalid payload on /api/triage/resolve', () => {
    const req: MockReq = { method: 'POST', body: { foo: 'bar' } };
    const res = createMockRes();
    triageResolveHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });

  it('returns 400 for incomplete flow payload on /api/triage/resolve', () => {
    const req: MockReq = {
      method: 'POST',
      body: {
        input: {
          mode: 'flow',
          flow: flowFixture,
        },
      },
    };
    const res = createMockRes();
    triageResolveHandler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toMatchObject({ ok: false, error: { code: 'INVALID_REQUEST' } });
  });
});
