"use client";

import React, { useEffect } from "react";

export default function SovendusLandingPage() {
  const scriptId = "sovendusLanding";
  useEffect(() => {
    if (
      ["CH", undefined].includes(document.documentElement.lang.split("-")[1])
    ) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = scriptId;
      script.src = "https://api.sovendus.com/js/landing.js";
      document.body.appendChild(script);
    }
    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, []);
  return <></>;
}
