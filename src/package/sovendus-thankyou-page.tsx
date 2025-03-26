// "use client";

// import type { JSX } from "react";
// import type { SovendusThankyouPageReactProps as _SovendusThankyouPageReactProps } from "sovendus-integration-scripts/react";
// import { SovendusThankyouPageReact as _SovendusThankyouPageReact } from "sovendus-integration-scripts/react";

// import { integrationType } from "./constants";

// export type SovendusThankyouPageReactProps = Omit<
//   _SovendusThankyouPageReactProps,
//   "integrationType"
// >;

// export function SovendusThankyouPageReact(
//   props: SovendusThankyouPageReactProps,
// ): JSX.Element {
//   return (
//     <_SovendusThankyouPageReact {...props} integrationType={integrationType} />
//   );
// }

"use client";

import type { JSX } from "react";
import { useEffect, useMemo } from "react";
import { SovendusThankyouPage } from "sovendus-integration-scripts";
import type {
  IframeContainerQuerySelectorSettings,
  IntegrationData,
  SovendusThankYouPageConfig,
  SovendusThankyouPageData,
  SovendusThankyouWindow,
} from "sovendus-integration-types";

import { integrationType } from "./constants";

export interface SovendusThankyouPageReactProps
  extends Omit<
    SovendusThankYouPageConfig,
    "iframeContainerQuerySelector" | "integrationType" | "sovDebugLevel"
  > {
  onDone?: (
    sovThankyouStatus: IntegrationData,
    sovThankyouConfig: SovendusThankYouPageConfig,
  ) => void | Promise<void>;
}

export function SovendusThankyouPageReact({
  onDone,
  ...sovThankyouConfig
}: SovendusThankyouPageReactProps): JSX.Element {
  const containerId = "sovendus-thankyou-container";
  const containerSelector = `#${containerId}`;
  const iframeContainerQuerySelector: IframeContainerQuerySelectorSettings = {
    selector: containerSelector,
    where: "none",
  };
  const config: SovendusThankYouPageConfig = {
    ...sovThankyouConfig,
    sovDebugLevel: undefined,
    integrationType,
    iframeContainerQuerySelector,
  };
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (
      window.sovendusThankyouPageInitialized &&
      Date.now() - window.sovendusThankyouPageInitialized < 1000
    ) {
      // debounce for dev env
      return;
    }
    window.sovendusThankyouPageInitialized = Date.now();
    // used for debugging with the testing app
    window.sovThankyouConfig = config;
    const _onDone = ({ sovThankyouStatus }: SovendusThankyouPageData): void => {
      // used for debugging with the testing app
      window.sovThankyouStatus = sovThankyouStatus;
      void onDone?.(sovThankyouStatus, config);
    };

    const sovendusPage = new SovendusThankyouPage();
    void sovendusPage.main(config, _onDone);
    return (): void => {
      if (
        window.sovendusThankyouPageInitialized &&
        Date.now() - window.sovendusThankyouPageInitialized < 1000
      ) {
        // debounce for dev env
        return;
      }
      sovendusPage.unmount();
    };
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => <div id={containerId} />, []);
}
interface _SovendusThankyouWindow extends SovendusThankyouWindow {
  sovendusThankyouPageInitialized?: number;
}

declare const window: _SovendusThankyouWindow;
