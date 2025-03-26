// "use client";

// import type { JSX } from "react";
// import type { SovendusLandingPageReactProps as _SovendusLandingPageReactProps } from "sovendus-integration-scripts/react";
// import { SovendusLandingPageReact as _SovendusLandingPageReact } from "sovendus-integration-scripts/react";

// import { integrationType } from "./constants";

// export type SovendusLandingPageReactProps = Omit<
//   _SovendusLandingPageReactProps,
//   "integrationType"
// >;

// export function SovendusLandingPageReact(
//   props: SovendusLandingPageReactProps,
// ): JSX.Element {
//   return (
//     <_SovendusLandingPageReact {...props} integrationType={integrationType} />
//   );
// }

"use client";

import type { JSX } from "react";
import { useEffect, useMemo } from "react";
import { SovendusPage } from "sovendus-integration-scripts";
import type {
  SovendusPageConfig,
  SovendusPageData,
  SovendusPageWindow,
  SovPageStatus,
} from "sovendus-integration-types";

import { integrationType } from "./constants";

export interface SovendusLandingPageReactProps
  extends Omit<SovendusPageConfig, "integrationType"> {
  onDone?: (
    sovPageStatus: SovPageStatus,
    sovPageConfig: SovendusPageConfig,
  ) => void | Promise<void>;
}

export function SovendusLandingPageReact(
  props: SovendusLandingPageReactProps,
): JSX.Element {
  return useMemo(() => {
    return <Handler {...props} />;
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function Handler({
  onDone,
  ...sovPageConfig
}: SovendusLandingPageReactProps): JSX.Element {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (
      window.sovendusPageInitialized &&
      Date.now() - window.sovendusPageInitialized < 1000
    ) {
      // debounce for dev env
      return;
    }
    window.sovendusPageInitialized = Date.now();
    // this is done for the testing app
    window.sovPageConfig = {
      ...sovPageConfig,
      integrationType,
    };
    const _onDone = ({ sovPageStatus }: SovendusPageData): void => {
      // this is done for the testing app
      window.sovPageStatus = sovPageStatus;
      void onDone?.(sovPageStatus, window.sovPageConfig);
    };
    const sovendusPage = new SovendusPage();
    void sovendusPage.main(window.sovPageConfig, _onDone);
    return (): void => {
      if (
        window.sovendusPageInitialized &&
        Date.now() - window.sovendusPageInitialized < 1000
      ) {
        // debounce for dev env
        return;
      }
      sovendusPage.unmount();
    };
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

interface _SovendusPageWindow extends SovendusPageWindow {
  sovendusPageInitialized?: number;
}

declare let window: _SovendusPageWindow;
