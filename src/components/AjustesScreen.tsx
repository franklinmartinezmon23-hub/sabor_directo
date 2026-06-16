import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Settings, Info } from 'lucide-react';

export default function AjustesScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // Copy link of standalone view or simulate copying the raw code file
    navigator.clipboard.writeText(
      window.location.origin + '/sabor_directo_single.html'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30]">
            Panel de Integración y Ajustes
          </h2>
          <p className="text-sm text-[#545f73]">
            Descarga, configura y exporta los componentes del sistema para auditorías o pruebas inmediatas.
          </p>
        </div>
      </div>

      {/* Standalone Single File Deliverable Section (Direct Requirement!) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-pink-50 text-[#A11548] rounded-xl shrink-0">
            <Download className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0b1c30]">
              Entregable: Sabor Directo Standalone HTML
            </h3>
            <p className="text-xs text-[#545f73] mt-1 leading-relaxed">
              De acuerdo con sus directrices, hemos compilado un <span className="font-semibold text-[#0b1c30]">archivo HTML único completo</span> que contiene toda la estructura visual, Tailwind CSS, fuentes de Google, e iconos integrados con JavaScript puro para pruebas instantáneas sin dependencias externas.
            </p>
          </div>
        </div>

        {/* Deliverable Action Buttons */}
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-[#0b1c30]">Copia el enlace de pruebas locales</p>
            <p className="text-[10px] text-[#545f73] font-mono">
              /sabor_directo_single.html
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 text-xs font-bold border border-gray-200 hover:border-[#A11548] hover:text-[#A11548] bg-white rounded-lg transition-all flex items-center gap-1 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copiar enlace</span>
                </>
              )}
            </button>

            <a
              href="/sabor_directo_single.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#A11548] hover:bg-red-800 rounded-lg transition-all flex items-center gap-1 shrink-0"
            >
              <span>Abrir HTML</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Developer Guidelines for Code Customization */}
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-[#0b1c30] flex items-center gap-1.5">
          <Info className="w-5 h-5 text-blue-600" />
          <span>Guía de Ajustes para Desarrolladores</span>
        </h3>

        <div className="text-xs text-[#545f73] space-y-3 leading-relaxed">
          <p>
            Para redefinir o personalizar la meta de comandas que se requiere alcanzar en la jornada operativa:
          </p>

          <div className="bg-gray-900 text-white p-4 rounded-xl font-mono space-y-2 text-[10px]">
            <p className="text-emerald-400">// Localiza este bloque en el tag de scripts de sabor_directo_single.html:</p>
            <p className="font-bold">const estadoApp = &#123;</p>
            <p className="pl-4">pedidosTotales: 0,</p>
            <p className="pl-4">aDomicilio: 0,</p>
            <p className="pl-4">paraRecoger: 0,</p>
            <p className="pl-4 text-pink-400">objetivoDiario: 48, // &lt;-- MODIFICA ESTE NÚMERO entero para cambiar la meta diaria</p>
            <p className="pl-4">pedidosFinalizados: 0</p>
            <p>&#125;;</p>
          </div>

          <p>
            Esto permite que la barra de cumplimiento de progreso cambie el cálculo matemático y el color de fondo dinámico de manera inmediata al completarse una orden.
          </p>
        </div>
      </div>

      {/* Preferences Simulators section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-[#0b1c30] flex items-center gap-1.5">
          <Settings className="w-5 h-5 text-gray-500" />
          <span>Preferencias de la Consola Central</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="space-y-1">
            <label className="block text-[#545f73] uppercase tracking-wider">Nombre del Establecimiento</label>
            <input 
              type="text" 
              readOnly 
              value="Sabor Directo"
              className="w-full bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[#0b1c30] text-xs cursor-not-allowed outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[#545f73] uppercase tracking-wider">Estado de Terminal</label>
            <input 
              type="text" 
              readOnly 
              value="Activa y Sincronizada"
              className="w-full bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[#10B581] text-xs cursor-not-allowed outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
