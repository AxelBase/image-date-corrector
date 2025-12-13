import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
	adapter: adapter({
	  pages: 'docs',
	  assets: 'docs',
	  fallback: undefined,
	  precompress: false
	}),
	paths: {
	  base: '/image-date-corrector'
	},
	prerender: {
	  entries: ['*'],
	  handleHttpError: 'warn'
	}
  }
};

export default config;
