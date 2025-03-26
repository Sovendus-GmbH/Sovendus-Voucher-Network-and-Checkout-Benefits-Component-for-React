# Sovendus React Components

## Introduction

This document provides guidance on using the Sovendus React components for several Sovendus services including Voucher Network, Checkout Benefits, Checkout Products, and Optimize. The components are designed to be easily integrated into React and Next.js applications.

## Disclaimer

This component is released as open source under the GPL v3 license. We welcome bug reports and pull requests from the community. However, please note that the component is provided "as is" without any warranties or guarantees. It may not be compatible with all other libraries and could potentially cause issues with your store. We strongly recommend that you test the components thoroughly in a staging environment before deploying it to a live site. Furthermore, we do not promise future support or updates and reserve the right to discontinue support for the component at any time.

## Installation

```bash
npm install sovendus-integration-react sovendus-integration-types
# or
yarn add sovendus-integration-react sovendus-integration-types
```

## Components Overview

The package includes two main React components:

### SovendusLandingPageReact

This component is designed for handling Sovendus services on regular pages. It manages:

- Cookie-based tracking for Voucher Network (optional)
- Conversion tracking for Checkout Products
- Integration with Sovendus Optimize

> [!WARNING]
> The SovendusLandingPageReact component must be included on **all pages** of your website to ensure proper functioning of Sovendus Optimize.

### SovendusThankyouPageReact

This component is specifically for order confirmation pages and integrates:

- Sovendus Voucher Network banners
- Checkout Benefits product offers
- Conversion tracking for multiple Sovendus services including Optimize

Both components work with client-side React and Next.js applications (with the "use client" directive).

## Usage

### SovendusLandingPageReact Implementation

This component should be placed on your regular site pages to enable various tracking and integration features.

> [!INFO]
> Each functionality described below is optional and can be enabled/disabled individually.

#### Sovendus Checkout Benefits

Checkout Benefits does not require the SovendusLandingPageReact component.

#### Sovendus Voucher Network

This is only required if you opt into cookie-based tracking. You'll need to:

- Enable it in the component settings
- Notify your Sovendus Account Manager

> [!WARNING]
> This tag is required for Voucher Network Switzerland and optional for other regions.

#### Sovendus Checkout Products

Enables conversion tracking if the `sovReqToken` was saved by the landing page component.

> [!INFO]
> Enabling Checkout Products will set and get cookies from Sovendus. Ensure compliance with privacy regulations.

#### Sovendus Optimize

Handles the core Sovendus Optimize functionality which analyzes visitor behavior to optimize conversion rates by:

- Reading user behavior patterns and interactions
- Displaying targeted overlay messages to users at strategic moments
- Providing personalized experiences to reduce bounce rates and cart abandonment
- Implementing various trigger rules based on user actions

> [!WARNING]
> For Sovendus Optimize to function properly, the SovendusLandingPageReact component must be present on ALL pages of your website. The thank you page component handles the conversion tracking aspect of Optimize.

#### SovendusLandingPageReact Example

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

### SovendusThankyouPageReact Implementation

This component should be placed on your order confirmation page after a successful purchase.

> [!INFO]
> Each functionality is optional and can be enabled/disabled individually.

#### Sovendus Checkout Benefits

Displays rebated product offers, either inline or in an overlay (configured by Sovendus).

#### Sovendus Voucher Network

Displays a banner and handles conversion tracking based on the voucher code.

> [!INFO]
> Voucher Network doesn't create cookies by default. Opt-in requires configuration and approval from your Account Manager.

#### Sovendus Checkout Products & Optimize

Both handle conversion tracking and require cookie usage. For Optimize specifically, the thank you page component completes the conversion tracking process that begins with the landing page component on other pages.

#### SovendusThankyouPageReact Example

```tsx
import { SovendusThankyouPageReact } from 'sovendus-integration-react';
import type {
  CountryCodes,
  LanguageCodes,
  SovendusAppSettings,
  SovendusSalutation,
} from "sovendus-integration-types";
import {
  SettingsType,
  Versions,
} from "sovendus-integration-types";

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

## Compatibility

- React 16.8+ (requires Hooks support)
- Next.js 13+ (with "use client" directive for client components)
- TypeScript 4.5+ (recommended but not required)

## Troubleshooting

If you encounter issues with the integration:

1. Check browser console for errors
2. Verify that ids are correct and match what Sovendus provided
3. Ensure customer and order data is properly formatted
4. Confirm that your Sovendus account has been properly configured for the services you're trying to use
5. For Next.js apps, ensure the component is used with the "use client" directive
6. For Optimize, ensure the SovendusLandingPageReact component is present on all pages of your site

For persistent issues, contact your Sovendus Account Manager

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.
