import React from "react";
export interface SovendusBannerProps {
    trafficSourceNumber: number;
    trafficMediumNumber: number;
    orderId?: string;
    orderValue?: number;
    orderCurrency?: string;
    sessionId?: string;
    usedCouponCode?: string;
    salutation?: "Mr." | "Mrs." | "";
    firstName?: string;
    lastName?: string;
    email?: string;
    countryCode?: string;
    zipCode?: string;
    phoneNumber?: string;
    yearOfBirth?: number;
    dateOfBirth?: string;
    streetName?: string;
    streetNumber?: string;
    cityName?: string;
}
export default function SovendusBanner({ trafficSourceNumber, trafficMediumNumber, orderId, orderValue, orderCurrency, sessionId, usedCouponCode, salutation, firstName, lastName, email, phoneNumber, yearOfBirth, dateOfBirth, streetName, streetNumber, cityName, countryCode, zipCode, }: SovendusBannerProps): React.JSX.Element;
