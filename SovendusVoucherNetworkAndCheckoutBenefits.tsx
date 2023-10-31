import React, { useState } from "react";

// version 1.0.0

interface SovendusBannerProps {
  // sovendus data
  trafficSourceNumber: number;
  trafficMediumNumber: number;

  // order data
  orderId: string;
  orderValue: number;
  orderCurrency: string;
  sessionId: string;
  usedCouponCode: string;

  // customer data
  salutation?: "Mr." | "Mrs." | "";
  firstName?: string;
  lastName?: string;
  email?: string;
  countryCode?: string;
  zipCode?: string;
  phoneNumber?: string;
  yearOfBirth?: number;
  streetName?: string;
  streetNumber?: string;
  cityName?: string;
}

export default function SovendusBanner({
  trafficSourceNumber,
  trafficMediumNumber,
  orderId,
  orderValue,
  orderCurrency,
  sessionId,
  usedCouponCode,
  salutation,
  firstName,
  lastName,
  email,
  phoneNumber,
  yearOfBirth,
  streetName,
  streetNumber,
  cityName,
  countryCode,
  zipCode,
}: SovendusBannerProps): JSX.Element {
  const [divId, setDivId] = useState<string>();
  React.useEffect(() => {
    window.sovDivId = 1 + (window.sovDivId || 0);
    setDivId(`sovendus-container-${window.sovDivId}`);
  }, []);

  React.useEffect(() => {
    if (divId) {
      window.sovIframes = [
        {
          trafficSourceNumber: trafficSourceNumber,
          trafficMediumNumber: trafficMediumNumber,
          sessionId,
          timestamp: Math.floor(Date.now() / 1000),
          orderId,
          orderValue,
          orderCurrency,
          usedCouponCode: usedCouponCode || "",
          iframeContainerId: divId,
        },
      ];
      window.sovConsumer = {
        consumerSalutation: salutation || "",
        consumerFirstName: firstName || "",
        consumerLastName: lastName || "",
        consumerEmail: email || "",
        consumerCountry: countryCode || "",
        consumerZipcode: zipCode || "",
        consumerPhone: phoneNumber || "",
        consumerYearOfBirth: yearOfBirth || "",
        consumerStreet: streetName || "",
        consumerStreetNumber: streetNumber || "",
        consumerCity: cityName || "",
      };

      const script = document.createElement("script");
      var sovDomain = window.location.protocol + "//" + "api.sovendus.com";
      script.src = sovDomain + "/sovabo/common/js/flexibleIframe.js";
      script.async = true;

      document.body.appendChild(script);
    }
  }, [divId]);

  return <div id={divId}></div>;
}

interface SovWindow extends Window {
  sovIframes: any;
  sovConsumer: any;
  sovDivId: number;
}

declare const window: SovWindow;
