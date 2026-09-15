"use client";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_ReactQueryDevtools = require("./ReactQueryDevtools.cjs");
const require_ReactQueryDevtoolsPanel = require("./ReactQueryDevtoolsPanel.cjs");
//#region src/index.ts
const ReactQueryDevtools = process.env.NODE_ENV !== "development" ? function() {
	return null;
} : require_ReactQueryDevtools.ReactQueryDevtools;
const ReactQueryDevtoolsPanel = process.env.NODE_ENV !== "development" ? function() {
	return null;
} : require_ReactQueryDevtoolsPanel.ReactQueryDevtoolsPanel;
//#endregion
exports.ReactQueryDevtools = ReactQueryDevtools;
exports.ReactQueryDevtoolsPanel = ReactQueryDevtoolsPanel;

//# sourceMappingURL=index.cjs.map