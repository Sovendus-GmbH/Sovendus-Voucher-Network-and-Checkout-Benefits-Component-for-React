"use client";

import { type JSX, useEffect, useState } from "react";
import { SovendusLandingPageReact } from "sovendus-integration-react";
import { loggerInfo } from "sovendus-integration-scripts";
import { SovendusLandingPageDemoForm } from "sovendus-integration-scripts/demo";
import { getSettings } from "sovendus-integration-settings-ui/demo-style-less";
import {
  type CountryCodes,
  SettingsType,
  type SovendusAppSettings,
  Versions,
} from "sovendus-integration-types";
// import { SovendusLandingPageReact } from "../../package/sovendus-landing-page";

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
        country={"DE" as CountryCodes}
        settings={{
          voucherNetwork: {
            settingType: SettingsType.SIMPLE,
            simple: {
              isEnabled: true,
              trafficMediumNumber: "your-traffic-medium-number",
              trafficSourceNumber: "your-traffic-source-number",
            },
            cookieTracking: true,
          },
          checkoutProducts: true,
          optimize: {
            settingsType: SettingsType.SIMPLE,
            simple: {
              isEnabled: true,
              optimizeId: "your-optimize-id",
            },
          },
          version: Versions.THREE,
        }}
        onDone={(status) => {
          console.log("Sovendus landing page integration complete", status);
        }}
      />
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
