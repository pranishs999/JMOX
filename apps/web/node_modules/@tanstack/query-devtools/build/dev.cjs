Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_utils = require("./utils-BLwigsFG.cjs");
//#region src/TanstackQueryDevtools.tsx
var TanstackQueryDevtools = class {
	#client;
	#onlineManager;
	#queryFlavor;
	#version;
	#isMounted = false;
	#styleNonce;
	#shadowDOMTarget;
	#buttonPosition;
	#position;
	#initialIsOpen;
	#errorTypes;
	#hideDisabledQueries;
	#Component;
	#theme;
	#dispose;
	constructor(config) {
		const { client, queryFlavor, version, onlineManager, buttonPosition, position, initialIsOpen, errorTypes, styleNonce, shadowDOMTarget, hideDisabledQueries, theme } = config;
		this.#client = require_utils.createSignal(client);
		this.#queryFlavor = queryFlavor;
		this.#version = version;
		this.#onlineManager = onlineManager;
		this.#styleNonce = styleNonce;
		this.#shadowDOMTarget = shadowDOMTarget;
		this.#buttonPosition = require_utils.createSignal(buttonPosition);
		this.#position = require_utils.createSignal(position);
		this.#initialIsOpen = require_utils.createSignal(initialIsOpen);
		this.#errorTypes = require_utils.createSignal(errorTypes);
		this.#hideDisabledQueries = require_utils.createSignal(hideDisabledQueries);
		this.#theme = require_utils.createSignal(theme);
	}
	setButtonPosition(position) {
		this.#buttonPosition[1](position);
	}
	setPosition(position) {
		this.#position[1](position);
	}
	setInitialIsOpen(isOpen) {
		this.#initialIsOpen[1](isOpen);
	}
	setErrorTypes(errorTypes) {
		this.#errorTypes[1](errorTypes);
	}
	setClient(client) {
		this.#client[1](client);
	}
	setTheme(theme) {
		this.#theme[1](theme);
	}
	mount(el) {
		if (this.#isMounted) throw new Error("Devtools is already mounted");
		const dispose = require_utils.render(() => {
			const _self$ = this;
			const [btnPosition] = this.#buttonPosition;
			const [pos] = this.#position;
			const [isOpen] = this.#initialIsOpen;
			const [errors] = this.#errorTypes;
			const [hideDisabledQueries] = this.#hideDisabledQueries;
			const [queryClient] = this.#client;
			const [theme] = this.#theme;
			let Devtools;
			if (this.#Component) Devtools = this.#Component;
			else {
				Devtools = require_utils.lazy(() => Promise.resolve().then(() => require("./DevtoolsComponent-ChtbiwqS.cjs")));
				this.#Component = Devtools;
			}
			require_utils.setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
			return require_utils.createComponent(Devtools, require_utils.mergeProps({
				get queryFlavor() {
					return _self$.#queryFlavor;
				},
				get version() {
					return _self$.#version;
				},
				get onlineManager() {
					return _self$.#onlineManager;
				},
				get shadowDOMTarget() {
					return _self$.#shadowDOMTarget;
				}
			}, {
				get client() {
					return queryClient();
				},
				get buttonPosition() {
					return btnPosition();
				},
				get position() {
					return pos();
				},
				get initialIsOpen() {
					return isOpen();
				},
				get errorTypes() {
					return errors();
				},
				get hideDisabledQueries() {
					return hideDisabledQueries();
				},
				get theme() {
					return theme();
				}
			}));
		}, el);
		this.#isMounted = true;
		this.#dispose = dispose;
	}
	unmount() {
		if (!this.#isMounted) throw new Error("Devtools is not mounted");
		this.#dispose?.();
		this.#isMounted = false;
	}
};
//#endregion
//#region src/TanstackQueryDevtoolsPanel.tsx
var TanstackQueryDevtoolsPanel = class {
	#client;
	#onlineManager;
	#queryFlavor;
	#version;
	#isMounted = false;
	#styleNonce;
	#shadowDOMTarget;
	#buttonPosition;
	#position;
	#initialIsOpen;
	#errorTypes;
	#hideDisabledQueries;
	#onClose;
	#Component;
	#theme;
	#dispose;
	constructor(config) {
		const { client, queryFlavor, version, onlineManager, buttonPosition, position, initialIsOpen, errorTypes, styleNonce, shadowDOMTarget, onClose, hideDisabledQueries, theme } = config;
		this.#client = require_utils.createSignal(client);
		this.#queryFlavor = queryFlavor;
		this.#version = version;
		this.#onlineManager = onlineManager;
		this.#styleNonce = styleNonce;
		this.#shadowDOMTarget = shadowDOMTarget;
		this.#buttonPosition = require_utils.createSignal(buttonPosition);
		this.#position = require_utils.createSignal(position);
		this.#initialIsOpen = require_utils.createSignal(initialIsOpen);
		this.#errorTypes = require_utils.createSignal(errorTypes);
		this.#hideDisabledQueries = require_utils.createSignal(hideDisabledQueries);
		this.#onClose = require_utils.createSignal(onClose);
		this.#theme = require_utils.createSignal(theme);
	}
	setButtonPosition(position) {
		this.#buttonPosition[1](position);
	}
	setPosition(position) {
		this.#position[1](position);
	}
	setInitialIsOpen(isOpen) {
		this.#initialIsOpen[1](isOpen);
	}
	setErrorTypes(errorTypes) {
		this.#errorTypes[1](errorTypes);
	}
	setClient(client) {
		this.#client[1](client);
	}
	setOnClose(onClose) {
		this.#onClose[1](() => onClose);
	}
	setTheme(theme) {
		this.#theme[1](theme);
	}
	mount(el) {
		if (this.#isMounted) throw new Error("Devtools is already mounted");
		const dispose = require_utils.render(() => {
			const _self$ = this;
			const [btnPosition] = this.#buttonPosition;
			const [pos] = this.#position;
			const [isOpen] = this.#initialIsOpen;
			const [errors] = this.#errorTypes;
			const [hideDisabledQueries] = this.#hideDisabledQueries;
			const [queryClient] = this.#client;
			const [onClose] = this.#onClose;
			const [theme] = this.#theme;
			let Devtools;
			if (this.#Component) Devtools = this.#Component;
			else {
				Devtools = require_utils.lazy(() => Promise.resolve().then(() => require("./DevtoolsPanelComponent-CHpU_w5-.cjs")));
				this.#Component = Devtools;
			}
			require_utils.setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
			return require_utils.createComponent(Devtools, require_utils.mergeProps({
				get queryFlavor() {
					return _self$.#queryFlavor;
				},
				get version() {
					return _self$.#version;
				},
				get onlineManager() {
					return _self$.#onlineManager;
				},
				get shadowDOMTarget() {
					return _self$.#shadowDOMTarget;
				}
			}, {
				get client() {
					return queryClient();
				},
				get buttonPosition() {
					return btnPosition();
				},
				get position() {
					return pos();
				},
				get initialIsOpen() {
					return isOpen();
				},
				get errorTypes() {
					return errors();
				},
				get hideDisabledQueries() {
					return hideDisabledQueries();
				},
				get onClose() {
					return onClose();
				},
				get theme() {
					return theme();
				}
			}));
		}, el);
		this.#isMounted = true;
		this.#dispose = dispose;
	}
	unmount() {
		if (!this.#isMounted) throw new Error("Devtools is not mounted");
		this.#dispose?.();
		this.#isMounted = false;
	}
};
//#endregion
exports.TanstackQueryDevtools = TanstackQueryDevtools;
exports.TanstackQueryDevtoolsPanel = TanstackQueryDevtoolsPanel;
