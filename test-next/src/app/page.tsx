"use client";

import type { JSX } from "react";
import { SovendusThankyouPageReact } from "sovendus-integration-react";
import {
  CountryCodes,
  SettingsType,
  Versions,
} from "sovendus-integration-types";

export default function Home(): JSX.Element {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SovendusThankyouPageReact
        settings={{
          voucherNetwork: {
            settingType: SettingsType.SIMPLE,
            simple: {
              isEnabled: true,
              trafficSourceNumber: "4704",
              trafficMediumNumber: "5",
              iframeContainerQuerySelector: undefined,
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
        customerData={{
          consumerCountry: CountryCodes.DE,
        }}
        orderData={{
          orderId: "sadsdf",
          orderValue: {
            netOrderValue: 747,
          },
          orderCurrency: "EUR",
          sessionId: "user.sessionId",
          usedCouponCode: "order.couponCode",
        }}
        onDone={(status) => {
          console.log("Sovendus thank you page integration complete", status);
        }}
      />
    </div>
  );
}
