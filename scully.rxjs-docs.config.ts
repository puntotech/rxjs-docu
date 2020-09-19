import { ScullyConfig } from '@scullyio/scully';

export const config: Partial<ScullyConfig> = {
  projectRoot: './src',
  projectName: 'rxjs-docs',
  outDir: './dist/static',
  routes: {
    '/:page': {
      type: 'contentFolder',
      page: {
        folder: './src/assets/doc/sections',
      },
    },
    '/concepts/:page': {
      type: 'contentFolder',
      page: {
        folder: './src/assets/doc/concepts',
      },
    },
    /* '/operators/:category/:page': {
      type: 'contentFolder',
      category: {
        folder: './src/assets/doc/operators',
      },
      page: {
        folder: './src/assets/operators/:category',
      },
    }, */
  },
};
