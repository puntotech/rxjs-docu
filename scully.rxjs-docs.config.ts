import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'rxjs-docs',
  outDir: './dist/static',
  routes: {
    '/:page': {
      type: 'contentFolder',
      page: {
        folder: './src/assets/doc',
      },
    },
  },
};
