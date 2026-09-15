import { L as createComponent, V as createMemo, a as getPreferredColorScheme } from "./utils-CESniQp_.js";
import { a as PiPProvider, c as createLocalStorage, i as ThemeContext, o as QueryDevtoolsContext, r as ParentPanel, t as ContentView } from "./Devtools-B8gBVih5.js";
//#region src/DevtoolsPanelComponent.tsx
const DevtoolsPanelComponent = (props) => {
	const [localStore, setLocalStore] = createLocalStorage({ prefix: "TanstackQueryDevtools" });
	const colorScheme = getPreferredColorScheme();
	const theme = createMemo(() => {
		const preference = props.theme || localStore.theme_preference || "system";
		if (preference !== "system") return preference;
		return colorScheme();
	});
	return createComponent(QueryDevtoolsContext.Provider, {
		value: props,
		get children() {
			return createComponent(PiPProvider, {
				disabled: true,
				localStore,
				setLocalStore,
				get children() {
					return createComponent(ThemeContext.Provider, {
						value: theme,
						get children() {
							return createComponent(ParentPanel, { get children() {
								return createComponent(ContentView, {
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
export { DevtoolsPanelComponent as default };
