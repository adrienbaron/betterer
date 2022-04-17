import { workerRequire } from '@phenomnomnominal/worker-require';

import { BettererVersionControlWorker, BettererVersionControlWorkerModule } from './types';

export function createVersionControl(): BettererVersionControlWorker {
  // TODO: Change me!
  // workerRequire doesn't seem to work with babel jest :(
  // I've tried various things like dynamically importing the file first to prime node require cache
  // but so far the only thing I could make work is importing directly the compiled worker.
  const worker = workerRequire<BettererVersionControlWorkerModule>('../../dist/fs/version-control-worker');
  return worker.versionControl;
}
