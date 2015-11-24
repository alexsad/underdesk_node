declare module 'velocity' {

	interface EngineOptions {
		template: string;
		output: string;
	}
	class EngineStatic {
		constructor(options: EngineOptions);
		render(dta: any): string;
	}
	export = {
		Engine: EngineStatic
	}

}