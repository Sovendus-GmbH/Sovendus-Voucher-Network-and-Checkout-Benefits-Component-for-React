"use client";

import type { JSX } from "react";
import type { SovendusLandingPageReactProps as _SovendusLandingPageReactProps } from "sovendus-integration-scripts/react";
import { SovendusLandingPageReact as _SovendusLandingPageReact } from "sovendus-integration-scripts/react";

import { integrationType } from "./constants";

export type SovendusLandingPageReactProps = Omit<
  _SovendusLandingPageReactProps,
  "integrationType"
>;

export function SovendusLandingPageReact(
  props: SovendusLandingPageReactProps,
): JSX.Element {
  return (
    <_SovendusLandingPageReact {...props} integrationType={integrationType} />
  );
}
