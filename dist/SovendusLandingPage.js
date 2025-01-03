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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SovendusLandingPage;
const react_1 = __importStar(require("react"));
function SovendusLandingPage() {
    const scriptId = "sovendusLanding";
    (0, react_1.useEffect)(() => {
        if (["CH", undefined].includes(document.documentElement.lang.split("-")[1])) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.id = scriptId;
            script.src = "https://api.sovendus.com/js/landing.js";
            document.body.appendChild(script);
        }
        return () => {
            var _a;
            (_a = document.getElementById(scriptId)) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, []);
    return react_1.default.createElement(react_1.default.Fragment, null);
}
