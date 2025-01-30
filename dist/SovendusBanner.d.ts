import React from "react";
export interface SovendusBannerProps {
    trafficSourceNumber: number;
    trafficMediumNumber: number;
    orderId?: string | undefined;
    orderValue?: number | undefined;
    orderCurrency?: string | undefined;
    sessionId?: string | undefined;
    usedCouponCode?: string | undefined;
    salutation?: "Mr." | "Mrs." | "" | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    countryCode?: string | undefined;
    zipCode?: string | undefined;
    phoneNumber?: string | undefined;
    yearOfBirth?: number | undefined;
    dateOfBirth?: string | undefined;
    streetName?: string | undefined;
    streetNumber?: string | undefined;
    cityName?: string | undefined;
}
export default function SovendusBanner({ trafficSourceNumber, trafficMediumNumber, orderId, orderValue, orderCurrency, sessionId, usedCouponCode, salutation, firstName, lastName, email, phoneNumber, yearOfBirth, dateOfBirth, streetName, streetNumber, cityName, countryCode, zipCode, }: SovendusBannerProps): React.JSX.Element;
