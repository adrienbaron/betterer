import '@betterer/fixture';

jest.setTimeout(300000);

type BettererUtils = typeof import('../packages/betterer/src/utils');
jest.mock('../packages/betterer/src/utils', (): BettererUtils => {
  const original: BettererUtils = jest.requireActual('../packages/betterer/src/utils');

  return {
    ...original,
    getTime: () => 0
  };
});

type BettererTasksUtils = typeof import('../packages/tasks/src/utils');
jest.mock('../packages/tasks/src/utils', (): BettererTasksUtils => {
  return {
    getTime: () => 0,
    getPreciseTime: () => 0
  };
});
