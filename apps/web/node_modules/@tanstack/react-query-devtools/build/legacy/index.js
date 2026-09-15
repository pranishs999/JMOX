"use client";
import { ReactQueryDevtools as ReactQueryDevtools$1 } from "./ReactQueryDevtools.js";
import { ReactQueryDevtoolsPanel as ReactQueryDevtoolsPanel$1 } from "./ReactQueryDevtoolsPanel.js";
//#region src/index.ts
const ReactQueryDevtools = process.env.NODE_ENV !== "development" ? function() {
	return null;
} : ReactQueryDevtools$1;
const ReactQueryDevtoolsPanel = process.env.NODE_ENV !== "development" ? function() {
	return null;
} : ReactQueryDevtoolsPanel$1;
//#endregion
export { ReactQueryDevtools, ReactQueryDevtoolsPanel };

//# sourceMappingURL=index.js.map