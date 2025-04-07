"use client";

import type { JSX } from "react";

export function IntegrationTester(): null {
  // TODO
  return null;
}

export function ClearTesterStorageButton(): JSX.Element {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("sov_settings");
        window.location.reload();
      }}
      style={{ padding: "5px", background: "red", color: "white" }}
    >
      clear tester storage
    </button>
  );
}
