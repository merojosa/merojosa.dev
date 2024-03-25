import { defineConfig } from 'astro/config';
import aws from 'astro-sst';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: aws(),
	integrations: [tailwind({ applyBaseStyles: false })],
});
