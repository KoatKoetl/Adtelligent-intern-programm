import type { Plugin } from "vite";

export type VirtualModulesOptions = {
	selectedModules?: string[];
};

function virtualModules(options: VirtualModulesOptions = {}): Plugin {
	const selected = options.selectedModules ?? [];

	return {
		name: "vite-virtual-modules",

		async resolveId(id) {
			if (id === "virtual:plugins") return id;
			return null;
		},
		load(id) {
			if (id === "virtual:plugins") {
				const imports = selected
					.filter(Boolean)
					.map((m) => `import "@modules/${m}.js";`)
					.join("\n");
				return `${imports}`;
			}
			return null;
		},
	};
}

export default virtualModules;
