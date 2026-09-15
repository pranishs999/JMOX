import * as React from "react";
import { QueryClient } from "@tanstack/react-query";
import { DevtoolsButtonPosition, DevtoolsErrorType, DevtoolsPosition, Theme } from "@tanstack/query-devtools";
declare namespace ReactQueryDevtools_d_exports {
  export { DevtoolsOptions, ReactQueryDevtools };
}
interface DevtoolsOptions {
  /**
   * Set this true if you want the dev tools to default to being open
   */
  initialIsOpen?: boolean;
  /**
   * The position of the TanStack logo to open and close the devtools panel.
   * 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative'
   * Defaults to 'bottom-right'.
   */
  buttonPosition?: DevtoolsButtonPosition;
  /**
   * The position of the React Query devtools panel.
   * 'top' | 'bottom' | 'left' | 'right'
   * Defaults to 'bottom'.
   */
  position?: DevtoolsPosition;
  /**
   * Custom instance of QueryClient
   */
  client?: QueryClient;
  /**
   * Use this so you can define custom errors that can be shown in the devtools.
   */
  errorTypes?: Array<DevtoolsErrorType>;
  /**
   * Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
   */
  styleNonce?: string;
  /**
   * Use this so you can attach the devtool's styles to specific element in the DOM.
   */
  shadowDOMTarget?: ShadowRoot;
  /**
   * Set this to true to hide disabled queries from the devtools panel.
   */
  hideDisabledQueries?: boolean;
  /**
   * Set this to 'light', 'dark', or 'system' to change the theme of the devtools panel.
   * Defaults to 'system'.
   */
  theme?: Theme;
}
declare function ReactQueryDevtools(props: DevtoolsOptions): React.ReactElement | null;
//#endregion
export { DevtoolsOptions, ReactQueryDevtools, ReactQueryDevtools_d_exports as t };
//# sourceMappingURL=ReactQueryDevtools.d.ts.map