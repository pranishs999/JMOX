"use client";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./rolldown-runtime-VH7oDXx4.cjs");
let react = require("react");
react = require_rolldown_runtime.__toESM(react, 1);
let _tanstack_react_query = require("@tanstack/react-query");
let _tanstack_query_devtools = require("@tanstack/query-devtools");
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/ReactQueryDevtoolsPanel.tsx
function ReactQueryDevtoolsPanel(props) {
	const queryClient = (0, _tanstack_react_query.useQueryClient)(props.client);
	const ref = react.useRef(null);
	const { errorTypes, styleNonce, shadowDOMTarget, hideDisabledQueries, theme } = props;
	const [devtools] = react.useState(new _tanstack_query_devtools.TanstackQueryDevtoolsPanel({
		client: queryClient,
		queryFlavor: "React Query",
		version: "5",
		onlineManager: _tanstack_react_query.onlineManager,
		buttonPosition: "bottom-left",
		position: "bottom",
		initialIsOpen: true,
		errorTypes,
		styleNonce,
		shadowDOMTarget,
		onClose: props.onClose,
		hideDisabledQueries,
		theme
	}));
	react.useEffect(() => {
		devtools.setClient(queryClient);
	}, [queryClient, devtools]);
	react.useEffect(() => {
		devtools.setOnClose(props.onClose ?? (() => {}));
	}, [props.onClose, devtools]);
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
		style: {
			height: "500px",
			...props.style
		},
		className: "tsqd-parent-container",
		ref
	});
}
//#endregion
exports.ReactQueryDevtoolsPanel = ReactQueryDevtoolsPanel;

//# sourceMappingURL=ReactQueryDevtoolsPanel.cjs.map