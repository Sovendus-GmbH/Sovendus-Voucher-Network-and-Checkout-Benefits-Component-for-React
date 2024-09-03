# Sovendus Voucher Network & Checkout Benefits Component for React

## Install through npmjs

Execute the following command to install it through npm:

```bash
npm install --save sovendus-voucher-network-and-checkout-benefits-react
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
