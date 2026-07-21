"use client";
import { useState } from "react";

interface InfoPopupProps {
  title: string;
  description: string;
}

export default function InfoPopup({ title, description }: InfoPopupProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón trigger discreto */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-2 inline-flex items-center justify-center p-1 rounded-full text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors focus:outline-none"
        title="Ver justificación del cambio"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Modal flotante */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 transform transition-all text-left">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg text-xs font-bold shrink-0">
                Mejora Canvas v2.0
              </span>
              <h3 className="text-sm font-bold text-slate-800 normal-case">
                {title}
              </h3>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 mb-6 normal-case">
              {description}
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}