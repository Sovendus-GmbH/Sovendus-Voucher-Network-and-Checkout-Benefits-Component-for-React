# Sovendus Voucher Network & Checkout Benefits Component for React

## Disclaimer

This component is released as open source under the GPL v3 license. We welcome bug reports and pull requests from the community. However, please note that the component is provided "as is" without any warranties or guarantees. It may not be compatible with all other plugins and could potentially cause issues with your store. We strongly recommend that you test the plugin thoroughly in a staging environment before deploying it to a live site. Furthermore, we do not promise future support or updates and reserve the right to discontinue support for the component at any time.

## Installation

Install the package using your favorite package manager:

```bash
npm install --save sovendus-voucher-network-and-checkout-benefits-react
```

or

```bash
yarn add sovendus-voucher-network-and-checkout-benefits-react
```

## Use the component in your React App

Use the component on you checkout success / thank you page and make sure to pass all the required data:

[Click here for detailed information on the parameters and which ones are required.](https://developer-hub.sovendus.com/Voucher-Network-Checkout-Benefits/Parameter)

```tsx
<SovendusBanner
  trafficSourceNumber={YOUR_TRAFFIC_SOURCE_NUMBER} // replace with your trafficSourceNumber
  trafficMediumNumber={YOUR_TRAFFIC_MEDIUM_NUMBER} // replace with your trafficMediumNumber
  orderId={"order-123"}
  orderValue={12.4}
  orderCurrency={"EUR"}
  sessionId={"Session32323"}
  usedCouponCode={"TestVoucherCode"}
  salutation={"Mr."}
  firstName={"Test"}
  lastName={"Tester"}
  email={"test@sovendus.com"}
  phoneNumber={"+49123456789"}
  yearOfBirth={1991}
  dateOfBirth={"01.12.2020"}
  streetName={"Streetname"}
  streetNumber={"12"}
  cityName={"Reisbach"}
  countryCode={"DE"}
  zipCode={"94419"}
/>
```

## Additional steps for Switzerland

For Switzerland it is also required to add the following component on the home page / page where users will land coming from the Sovendus Voucher Network

```tsx
<SovendusLandingPage />
```
