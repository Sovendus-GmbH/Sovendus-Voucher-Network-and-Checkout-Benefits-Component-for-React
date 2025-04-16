"use client";

import type { JSX } from "react";
import type { SovendusThankyouPageReactProps as _SovendusThankyouPageReactProps } from "sovendus-integration-scripts/react";
import { SovendusThankyouPageReact as _SovendusThankyouPageReact } from "sovendus-integration-scripts/react";

import { integrationType } from "./constants";

export type SovendusThankyouPageReactProps = Omit<
  _SovendusThankyouPageReactProps,
  "integrationType" | "sovDebugLevel"
>;

export function SovendusThankyouPageReact(
  props: SovendusThankyouPageReactProps,
): JSX.Element {
  return (
    <_SovendusThankyouPageReact
      {...props}
      sovDebugLevel={undefined}
      integrationType={integrationType}
    />
  );
}
