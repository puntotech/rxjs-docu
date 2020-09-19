import { ScullyConfig } from '@scullyio/scully';

export const config: Partial<ScullyConfig> = {
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
