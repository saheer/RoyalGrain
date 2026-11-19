"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export function Studio() {
  return (
    // Studio-യ്ക്ക് താഴെ സൈറ്റിന്റെ Footer കാണാതിരിക്കാൻ മുഴുവൻ സ്ക്രീനും മൂടുന്നു
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#fff" }}
    >
      <NextStudio config={config} />
    </div>
  );
}
