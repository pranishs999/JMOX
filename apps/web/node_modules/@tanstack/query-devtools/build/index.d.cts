import { Query, QueryClient, onlineManager } from "@tanstack/query-core";
//#region src/contexts/types.d.ts
type XPosition = 'left' | 'right';
type YPosition = 'top' | 'bottom';
type DevtoolsPosition = XPosition | YPosition;
type DevtoolsButtonPosition = `${YPosition}-${XPosition}` | 'relative';
type Theme = 'dark' | 'light' | 'system';
interface DevtoolsErrorType {
  /**
   * The name of the error.
   */
  name: string;
  /**
   * How the error is initialized.
   */
  initializer: (query: Query) => Error;
}
interface QueryDevtoolsProps {
  readonly client: QueryClient;
  queryFlavor: string;
  version: string;
  onlineManager: typeof onlineManager;
  buttonPosition?: DevtoolsButtonPosition;
  position?: DevtoolsPosition;
  initialIsOpen?: boolean;
  errorTypes?: Array<DevtoolsErrorType>;
  shadowDOMTarget?: ShadowRoot;
  onClose?: () => void;
  hideDisabledQueries?: boolean;
  theme?: Theme;
}
//#endregion
//#region src/TanstackQueryDevtools.d.ts
interface TanstackQueryDevtoolsConfig extends QueryDevtoolsProps {
  styleNonce?: string;
  shadowDOMTarget?: ShadowRoot;
}
declare class TanstackQueryDevtools {
  #private;
  constructor(config: TanstackQueryDevtoolsConfig);
  setButtonPosition(position: DevtoolsButtonPosition): void;
  setPosition(position: DevtoolsPosition): void;
  setInitialIsOpen(isOpen: boolean): void;
  setErrorTypes(errorTypes: Array<DevtoolsErrorType>): void;
  setClient(client: QueryClient): void;
  setTheme(theme?: Theme): void;
  mount<T extends HTMLElement>(el: T): void;
  unmount(): void;
}
//#endregion
//#region src/TanstackQueryDevtoolsPanel.d.ts
interface TanstackQueryDevtoolsPanelConfig extends QueryDevtoolsProps {
  styleNonce?: string;
  shadowDOMTarget?: ShadowRoot;
  onClose?: () => void;
}
declare class TanstackQueryDevtoolsPanel {
  #private;
  constructor(config: TanstackQueryDevtoolsPanelConfig);
  setButtonPosition(position: DevtoolsButtonPosition): void;
  setPosition(position: DevtoolsPosition): void;
  setInitialIsOpen(isOpen: boolean): void;
  setErrorTypes(errorTypes: Array<DevtoolsErrorType>): void;
  setClient(client: QueryClient): void;
  setOnClose(onClose: () => void): void;
  setTheme(theme?: Theme): void;
  mount<T extends HTMLElement>(el: T): void;
  unmount(): void;
}
//#endregion
export { type DevtoolsButtonPosition, type DevtoolsErrorType, type DevtoolsPosition, TanstackQueryDevtools, type TanstackQueryDevtoolsConfig, TanstackQueryDevtoolsPanel, type TanstackQueryDevtoolsPanelConfig, type Theme };
//# sourceMappingURL=index.d.cts.map