import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';

setPluginConfig(baseHrefRewrite, { href: '/rxjs-docu/' });
export const config: Partial<ScullyConfig> = {
  projectRoot: './src',
  projectName: 'rxjs-docs',
  outDir: './dist/static',
  defaultPostRenderers: [baseHrefRewrite],
  routes: {
    '/:page': {
      type: 'contentFolder',
      page: {
        folder: './src/assets/doc',
      },
    },
  },
};
