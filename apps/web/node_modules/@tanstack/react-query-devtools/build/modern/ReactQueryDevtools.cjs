"use client";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./rolldown-runtime-VH7oDXx4.cjs");
let react = require("react");
react = require_rolldown_runtime.__toESM(react, 1);
let _tanstack_react_query = require("@tanstack/react-query");
let _tanstack_query_devtools = require("@tanstack/query-devtools");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/ReactQueryDevtools.tsx
function ReactQueryDevtools(props) {
	const queryClient = (0, _tanstack_react_query.useQueryClient)(props.client);
	const ref = react.useRef(null);
	const { buttonPosition, position, initialIsOpen, errorTypes, styleNonce, shadowDOMTarget, hideDisabledQueries, theme } = props;
	const [devtools] = react.useState(new _tanstack_query_devtools.TanstackQueryDevtools({
		client: queryClient,
		queryFlavor: "React Query",
		version: "5",
		onlineManager: _tanstack_react_query.onlineManager,
		buttonPosition,
		position,
		initialIsOpen,
		errorTypes,
		styleNonce,
		shadowDOMTarget,
		hideDisabledQueries,
		theme
	}));
	react.useEffect(() => {
		devtools.setClient(queryClient);
	}, [queryClient, devtools]);
	react.useEffect(() => {
		if (buttonPosition) devtools.setButtonPosition(buttonPosition);
	}, [buttonPosition, devtools]);
	react.useEffect(() => {
		if (position) devtools.setPosition(position);
	}, [position, devtools]);
	react.useEffect(() => {
		devtools.setInitialIsOpen(initialIsOpen || false);
	}, [initialIsOpen, devtools]);
	react.useEffect(() => {
		devtools.setErrorTypes(errorTypes || []);
	}, [errorTypes, devtools]);
	react.useEffect(() => {
		devtools.setTheme(theme);
	}, [theme, devtools]);
	react.useEffect(() => {
		if (ref.current) devtools.mount(ref.current);
		return () => {
			devtools.unmount();
		};
	}, [devtools]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		dir: "ltr",
		className: "tsqd-parent-container",
		ref
	});
}
//#endregion
exports.ReactQueryDevtools = ReactQueryDevtools;

//# sourceMappingURL=ReactQueryDevtools.cjs.map