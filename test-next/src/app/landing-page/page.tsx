"use client";

import { type JSX, useEffect, useState } from "react";
import { loggerInfo } from "sovendus-integration-scripts";
import { SovendusLandingPageDemoForm } from "sovendus-integration-scripts/demo";
import { getSettings } from "sovendus-integration-settings-ui/demo-style-less";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusLandingPageReact } from "../../../../src/package";

export default function SovendusLandingPageDemo(): JSX.Element {
  const [settings, setSettings] = useState<SovendusAppSettings>();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setSettings(getSettings());
  }, []);
  return settings ? (
    <div>
      <h1 style={{ paddingBottom: "40px" }}>This is a example landing page</h1>
      <div>
        <SovendusLandingPageDemoForm />
      </div>
      <SovendusLandingPageReact
        country={undefined} // TODO add country selector in form
        settings={settings}
        onDone={(sovPageStatus, sovPageConfig) => {
          loggerInfo(
            "Sovendus Page done",
            "LandingPage",
            "sovPageStatus",
            sovPageStatus,
            "sovPageConfig",
            sovPageConfig,
          );
        }}
      />
    </div>
  ) : (
    <></>
  );
}
