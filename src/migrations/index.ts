import * as migration_20251112_114957 from './20251112_114957';
import * as migration_20251112_115040 from './20251112_115040';
import * as migration_20251117_122650 from './20251117_122650';
import * as migration_20251118_082734 from './20251118_082734';
import * as migration_20251118_082818 from './20251118_082818';
import * as migration_20251119_131427 from './20251119_131427';

export const migrations = [
  {
    up: migration_20251112_114957.up,
    down: migration_20251112_114957.down,
    name: '20251112_114957',
  },
  {
    up: migration_20251112_115040.up,
    down: migration_20251112_115040.down,
    name: '20251112_115040',
  },
  {
    up: migration_20251117_122650.up,
    down: migration_20251117_122650.down,
    name: '20251117_122650',
  },
  {
    up: migration_20251118_082734.up,
    down: migration_20251118_082734.down,
    name: '20251118_082734',
  },
  {
    up: migration_20251118_082818.up,
    down: migration_20251118_082818.down,
    name: '20251118_082818',
  },
  {
    up: migration_20251119_131427.up,
    down: migration_20251119_131427.down,
    name: '20251119_131427'
  },
];
