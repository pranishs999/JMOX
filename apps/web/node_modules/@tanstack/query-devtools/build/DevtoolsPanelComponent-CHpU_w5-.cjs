const require_utils = require("./utils-BLwigsFG.cjs");
const require_Devtools = require("./Devtools-QIchsTu4.cjs");
//#region src/DevtoolsPanelComponent.tsx
const DevtoolsPanelComponent = (props) => {
	const [localStore, setLocalStore] = require_Devtools.createLocalStorage({ prefix: "TanstackQueryDevtools" });
	const colorScheme = require_utils.getPreferredColorScheme();
	const theme = require_utils.createMemo(() => {
		const preference = props.theme || localStore.theme_preference || "system";
		if (preference !== "system") return preference;
		return colorScheme();
	});
	return require_utils.createComponent(require_Devtools.QueryDevtoolsContext.Provider, {
		value: props,
		get children() {
			return require_utils.createComponent(require_Devtools.PiPProvider, {
				disabled: true,
				localStore,
				setLocalStore,
				get children() {
					return require_utils.createComponent(require_Devtools.ThemeContext.Provider, {
						value: theme,
						get children() {
							return require_utils.createComponent(require_Devtools.ParentPanel, { get children() {
								return require_utils.createComponent(require_Devtools.ContentView, {
									localStore,
									setLocalStore,
									get onClose() {
										return props.onClose;
									},
									showPanelViewOnly: true
								});
							} });
						}
					});
				}
			});
		}
	});
};
//#endregion
exports.default = DevtoolsPanelComponent;
