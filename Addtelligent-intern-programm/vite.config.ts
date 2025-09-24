import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
import virtualModules from "./src/plugins/virtual_modules.plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const selectedModules = env.VITE_SELECTED_MODULES?.split(",") || [];
	return defineConfig({
		plugins: [
			react(),
			virtualModules({ selectedModules: selectedModules }),
			tailwindcss(),
			svgr(),
			checker({ biome: true }),
			inspect({}),
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
		resolve: {
			alias: {
				"@modules": path.resolve(__dirname, "./src/modules"),
			},
		},
	});
});
