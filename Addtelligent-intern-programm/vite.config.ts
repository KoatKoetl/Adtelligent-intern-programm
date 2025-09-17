import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr(),
		checker({ biome: true }),
		inspect({}),
		ViteImageOptimizer({
			logStats: true,
			ansiColors: true,
			test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
			exclude: undefined,
			include: undefined,
			includePublic: true,
			svg: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								cleanupNumericValues: false,
								cleanupIds: {
									minify: false,
									remove: false,
								},
								convertPathData: false,
							},
						},
					},
					"sortAttrs",
					{
						name: "addAttributesToSVGElement",
						params: {
							attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
						},
					},
				],
			},
			jpeg: {
				quality: 100,
			},
			jpg: {
				quality: 100,
			},
			webp: {
				lossless: true,
			},
			cache: false,
			cacheLocation: undefined,
		}),
	],
	build: {
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			format: {
				comments: false,
				beautify: false,
			},
		},
	},
});
