"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function SovendusBanner({ trafficSourceNumber, trafficMediumNumber, orderId, orderValue, orderCurrency, sessionId, usedCouponCode, salutation, firstName, lastName, email, phoneNumber, yearOfBirth, dateOfBirth, streetName, streetNumber, cityName, countryCode, zipCode, }) {
    const [divId, setDivId] = (0, react_1.useState)();
    react_1.default.useEffect(() => {
        window.sovDivId = 1 + (window.sovDivId || 0);
        setDivId(`sovendus-container-${window.sovDivId}`);
    }, []);
    react_1.default.useEffect(() => {
        if (divId) {
            window.sovIframes = window.sovIframes || [];
            window.sovIframes.push({
                trafficSourceNumber: trafficSourceNumber,
                trafficMediumNumber: trafficMediumNumber,
                sessionId: sessionId || "",
                timestamp: Math.floor(Date.now() / 1000),
                orderId: orderId || "",
                orderValue: orderValue || "",
                orderCurrency: orderCurrency || "",
                usedCouponCode: usedCouponCode || "",
                iframeContainerId: divId,
                integrationType: "react-1.0.6",
            });
            window.sovConsumer = {
                consumerSalutation: salutation || "",
                consumerFirstName: firstName || "",
                consumerLastName: lastName || "",
                consumerEmail: email || "",
                consumerCountry: countryCode || "",
                consumerZipcode: zipCode || "",
                consumerPhone: phoneNumber || "",
                consumerYearOfBirth: yearOfBirth || "",
                consumerDateOfBirth: dateOfBirth || "",
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
    return react_1.default.createElement("div", { id: divId });
}
exports.default = SovendusBanner;
