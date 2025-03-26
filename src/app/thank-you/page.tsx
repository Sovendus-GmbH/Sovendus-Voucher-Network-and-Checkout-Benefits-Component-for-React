"use client";

import type { Dispatch, JSX, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { loggerInfo } from "sovendus-integration-scripts";
import { SovendusThankyouPageDemoForm } from "sovendus-integration-scripts/demo";
import {
  getSettings,
  initialSettings,
} from "sovendus-integration-settings-ui/demo-style-less";
import type {
  LanguageCodes,
  SovendusAppSettings,
  SovendusSalutation,
} from "sovendus-integration-types";
import type {
  SovendusConsumerData,
  SovendusConversionsData,
} from "sovendus-integration-types";
import {
  CountryCodes,
  SettingsType,
  Versions,
} from "sovendus-integration-types";

import { SovendusThankyouPageReact } from "../../package/sovendus-thankyou-page";

const defaultConfig: {
  orderData: SovendusConversionsData;
  customerData: SovendusConsumerData;
} = {
  orderData: {
    sessionId: "asdas",
    orderId: "13245",
    orderValue: {
      // netOrderValue: 1100,
      grossOrderValue: 1324,
      shippingValue: 12,
      taxPercent: 20,
      // taxValue: 15,
    },
    orderCurrency: "EUR",
    usedCouponCode: "1324",
  },
  customerData: {
    consumerSalutation: "Mr.",
    consumerFirstName: "John",
    consumerLastName: "Doe",
    consumerEmail: "John.doe@bla.bla",
    consumerCountry: CountryCodes.DE,
    consumerZipcode: "84359",
    consumerPhone: "0123456789",
    consumerYearOfBirth: "1991",
    consumerDateOfBirth: "01.01.1991",
    consumerStreetWithNumber: "1 test street",
    consumerCity: "testCity",
  },
};

export default function SovendusThankYouPageDemo(): JSX.Element {
  const [config, setConfig] = useState<{
    settings: SovendusAppSettings;
    orderData: SovendusConversionsData;
    customerData: SovendusConsumerData;
  }>(
    (): {
      settings: SovendusAppSettings;
      orderData: SovendusConversionsData;
      customerData: SovendusConsumerData;
    } => {
      if (typeof window !== "undefined") {
        const settings = getSettings();
        const storedConfig = localStorage.getItem("thankyouConfig");
        const config = storedConfig
          ? (JSON.parse(storedConfig) as {
              orderData: SovendusConversionsData;
              customerData: SovendusConsumerData;
            })
          : defaultConfig;
        return { ...config, settings: settings };
      }
      return { ...defaultConfig, settings: initialSettings };
    },
  );

  useEffect(() => {
    localStorage.setItem("thankyouConfig", JSON.stringify(config));
  }, [config]);

  return (
    <div>
      <h1>This is a thank you page</h1>
      <SovendusThankyouPageDemoForm
        config={config}
        setConfig={
          setConfig as Dispatch<
            SetStateAction<{
              orderData: SovendusConversionsData;
              customerData: SovendusConsumerData;
            }>
          >
        }
      />
      <h2>Here should be the inline integration</h2>
      <SovendusThankyouPageReact
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
        customerData={{
          consumerSalutation: order.customer.salutation as SovendusSalutation,
          consumerFirstName: order.customer.firstName,
          consumerLastName: order.customer.lastName,
          consumerEmail: order.customer.email,
          consumerPhone: order.customer.phone,
          consumerDateOfBirth: order.customer.dateOfBirth,
          consumerYearOfBirth: order.customer.yearOfBirth,
          // pass on either street and number separately
          consumerStreet: order.customer.street,
          consumerStreetNumber: order.customer.streetNumber,
          // or streetWithNumber in one field
          consumerStreetWithNumber: order.customer.streetWithNumber,
          consumerCity: order.customer.city,
          consumerZipcode: order.customer.zipcode,
          consumerLanguage: order.customer.language as LanguageCodes,
          consumerCountry: order.customer.country as CountryCodes,
        }}
        orderData={{
          orderId: order.id,
          orderValue: {
            netOrderValue: order.netTotal,
          },
          orderCurrency: order.currency,
          sessionId: user.sessionId,
          // either pass on a single coupon code
          usedCouponCode: order.couponCode,
          // or multiple coupon codes as a string array
          usedCouponCodes: order.couponCodes,
        }}
        onDone={(status) => {
          console.log("Sovendus thank you page integration complete", status);
        }}
      />
      <SovendusThankyouPageReact
        orderData={config.orderData}
        customerData={config.customerData}
        settings={config.settings}
        onDone={(sovThankyouStatus, sovThankyouConfig) => {
          loggerInfo(
            "Sovendus Thankyou Page done",
            "ThankyouPage",
            "sovThankyouStatus",
            sovThankyouStatus,
            "sovThankyouConfig",
            sovThankyouConfig,
          );
        }}
      />
    </div>
  );
}
