"use client";

import { ExternalLink } from "lucide-react";

const R2_ANNOTATE_URL = "https://pub-0459c8bf6e9348e592f4decd8b6bab91.r2.dev/altimetrix/shared/drone-annotate.html?client=DEMO3";

export default function DroneAnnotatePage() {
  return (
    <div className="bg-dark-900 min-h-screen flex flex-col">
      {/* Mini header */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-dark-700 shrink-0">
        <a href="/" className="text-white/60 hover:text-white text-xs font-heading font-bold transition-colors">
          ← AltiMetrix
        </a>
        <a
          href={R2_ANNOTATE_URL}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-colors shadow-lg"
        >
          <ExternalLink className="w-4 h-4" /> Plein écran
        </a>
      </div>

      {/* Drone-Annotate iframe */}
      <iframe
        src={R2_ANNOTATE_URL}
        className="w-full flex-1 border-0"
        title="Drone-Annotate AltiMetrix"
        allowFullScreen
      />
    </div>
  );
}
