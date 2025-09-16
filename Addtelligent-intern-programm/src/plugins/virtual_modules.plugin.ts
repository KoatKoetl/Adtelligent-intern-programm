// function VirtualModules() {
// 	return {
// 		name: "virtual-modules",
// 		resolveId(id: string) {
// 			if (id === "virtual:plugins") {
// 				return id;
// 			}
// 			return null;
// 		},
// 		load(id: string) {
// 			if (id === "virtual:plugins") {
// 				return modules
// 					.map((m: any) => `import './src/modules/${m}'`)
// 					.join("\n");
// 			}
// 		},
// 	};
// }

// export default VirtualModules;
