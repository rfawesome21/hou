import * as migration_20251112_114957 from './20251112_114957';
import * as migration_20251112_115040 from './20251112_115040';

export const migrations = [
  {
    up: migration_20251112_114957.up,
    down: migration_20251112_114957.down,
    name: '20251112_114957',
  },
  {
    up: migration_20251112_115040.up,
    down: migration_20251112_115040.down,
    name: '20251112_115040'
  },
];
