# Sovendus Voucher Network & Checkout Benefits Component for React

## Integrate Sovendus into a React Web App

1. Download the [Sovendus Component from here](https://raw.githubusercontent.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Component-for-React/main/SovendusVoucherNetworkAndCheckoutBenefits.tsx) and add the file to your React project
2. Use the component on you checkout success page and make sure to pass all the required data:
```
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