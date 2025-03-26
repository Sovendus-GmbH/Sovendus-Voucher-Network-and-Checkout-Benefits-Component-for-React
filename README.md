# Sovendus React Components

This document provides guidance on using the Sovendus React components for integrating Sovendus services into your React application.

## Overview

The package includes two main React components:

- **SovendusLandingPageReact**: For handling Sovendus services on regular pages.
- **SovendusThankyouPageReact**: For integrating Sovendus Voucher Network and other services on order confirmation pages.

Both components are designed to work in both client-side React and Next.js applications with the "use client" directive.

## Disclaimer

This component is released as open source under the GPL v3 license. We welcome bug reports and pull requests from the community. However, please note that the component is provided "as is" without any warranties or guarantees. It may not be compatible with all other plugins and could potentially cause issues with your store. We strongly recommend that you test the plugin thoroughly in a staging environment before deploying it to a live site. Furthermore, we do not promise future support or updates and reserve the right to discontinue support for the component at any time.

## Installation

```bash
npm install sovendus-integration-react sovendus-integration-types
# or
yarn add sovendus-integration-react sovendus-integration-types
```

## Usage

### SovendusLandingPageReact

This component handles page tracking and Sovendus Optimize integration. It doesn't render visible content by default.

```tsx
import { SovendusLandingPageReact } from "sovendus-integration-react";
import {
  type CountryCodes,
  SettingsType,
  type SovendusAppSettings,
  Versions,
} from "sovendus-integration-types";

function MyPage() {
  return (
    <div>
      <h1>My Page Content</h1>
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
    </div>
  );
}
```

### SovendusThankyouPageReact

> [!NOTE]
> Each functionality described here is optional and can be enabled/disabled individually.

> [!NOTE]
> The SovendusThankyouPageReact component is designed to be used on the order confirmation page of your application. It should be rendered after the order has been successfully placed.

This component handles the integration of the following Sovendus Products:

#### Checkout Benefits

- Displays a list of rebated product offers, either inline or in an overlay (this is configured by Sovendus)

#### Voucher Network

> [!TIP]
> Voucher Network is not creating any cookies by default. If you want to opt in to cookie tracking, you need to enable it in the settings and let you r Sovendus account manager know, as this has to be enabled on both sides.

- Displays a banner either inline or in an overlay (this is configured by Sovendus)
- Handles the conversion tracking for the Voucher Network based on the passed on Sovendus voucher code.
- If enabled handles conversion tracking based on an url parameter from the landing page component

#### Checkout Products

> [!NOTE]
> Enabling Sovendus Checkout Products will set and get cookies from Sovendus. Make sure to comply with Sovendus' privacy policy and GDPR regulations.

- Handles the conversion tracking, ff the `sovReqToken` was saved by the Sovendus landing page component.

#### Optimize

> [!NOTE]
> Enabling Sovendus Optimize will set and get cookies from Sovendus. Make sure to comply with Sovendus' privacy policy and GDPR regulations.

- Handles the conversion tracking for Sovendus Optimize.

```tsx
import { SovendusThankyouPageReact } from 'sovendus-integration-scripts';

function OrderConfirmationPage({ order }) {
  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
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
    </div>
  );
}
```

## Props

### SovendusLandingPageReact Props

| Prop | Type | Description |
|------|------|-------------|
| country | CountryCodes | The country code for the current page |
| settings | SovendusAppSettings | Settings for Sovendus services (Optimize, etc.) |
| onDone | (status, config) => void | Callback when the integration is complete |

### SovendusThankyouPageReact Props

| Prop | Type | Description |
|------|------|-------------|
| integrationType | string | Identifier for the integration type (e.g., "PLUGIN_REACT") |
| settings | SovendusAppSettings | Settings for Sovendus services (Voucher Network, Optimize, etc.) |
| customerData | SovendusConsumerData | Customer information for the order |
| orderData | SovendusOrderData | Order information including ID, value, currency |
| iframeContainerQuerySelector | IframeContainerQuerySelectorSettings | (Optional) Custom container selector for the iframe |
| onDone | (status, config) => void | Callback when the integration is complete |

## Configuration

The components use settings objects that follow the structure defined in `sovendus-integration-types`:

### Settings Types

Settings can be configured in two ways:

1. **Simple**: A single configuration for all countries
2. **Country-based**: Different configurations per country

```typescript
// Simple settings example
{
  settingType: "simple",
  simple: {
    isEnabled: true,
    // Other service-specific properties
  }
}

// Country-based settings example
{
  settingType: "country",
  countries: {
    ids: {
      "DE": {
        // German settings
      },
      "FR": {
        // French settings
      }
    },
    fallBackEnabled: true,
    fallBackId: "default-id"
  }
}
```

## Voucher Network Configuration

To configure the Voucher Network iframe on your thank you page:

```jsx
<SovendusThankyouPageReact
  settings={{
    voucherNetwork: {
      settingType: "simple",
      simple: {
        isEnabled: true,
        trafficSourceNumber: "12345",
        trafficMediumNumber: "54321",
        iframeContainerQuerySelector: {
          selector: "#custom-container",
          where: "afterend"
        }
      }
    }
  }}
  // Other required props
/>
```

## Notes

- The components automatically handle cookies for tracking user sessions
- Country detection is performed automatically if not provided
- The thank you page component renders a div container for the Voucher Network iframe
- Both components include clean-up logic for unmounting

## Advanced Usage

For more complex scenarios or custom integrations, you can extend the vanilla handlers:

```javascript
import { SovendusThankyouPage } from 'sovendus-integration-scripts/vanilla';

class CustomThankyouPage extends SovendusThankyouPage {
  // Override methods as needed
}
```
