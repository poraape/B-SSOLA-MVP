declare module 'vitest' {
  export const describe: (...args: any[]) => any;
  export const it: (...args: any[]) => any;
  export const expect: (...args: any[]) => any;
  export const vi: any;
  export const beforeEach: any;
  export const afterEach: any;
}

declare module '@testing-library/jest-dom';
