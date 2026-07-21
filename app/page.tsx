"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import InfoPopup from "./components/InfoPopup";

export default function CanvasPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      const audioUrl = `${window.location.origin}/audios/neurovoz_pitch.mp3`;
      audioRef.current = new Audio(audioUrl);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        if (audioRef.current) audioRef.current.currentTime = 0;
      };

      audioRef.current.onerror = (e) => {
        console.error("Error crítico: No se encontró el archivo de audio.", e);
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error al reproducir el audio:", error);
          setIsPlaying(false);
        });
    }
  };

  return (
    <main className="min-h-screen bg-blue-200 text-slate-800 p-4 md:p-8 font-sans antialiased flex flex-col justify-between">

      {/* ENCABEZADO */}
      <header className="max-w-7xl w-full mx-auto mb-8 border-b-2 border-slate-300 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              UNETI · Formación Socio-Crítica IV
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-500/10">
              <svg className="w-3 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.5 2 7 4.5 7 7C7 9.5 9 12 11 14.5L7 22H10.5L13 17.5L15.5 22H19L15 14.5C17 12 19 9.5 19 7C19 4.5 16.5 2 12 2Z" />
              </svg>
              Concientización Parkinson
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            NeuroVoz <span className="text-blue-700">VE</span> <span className="text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full align-middle">v2.0</span>
          </h1>

          <p className="text-slate-700 text-sm mt-1.5 max-w-2xl font-medium">
            Modelo de Negocio e Innovación de Tecnología de Asistencia: Inteligencia Artificial Local (Edge AI) para la inclusión comunicativa de pacientes con Parkinson en Venezuela.
          </p>

          {/* BOTONES Y CONTROLES */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Link href="/canvas-v1">
              <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 text-xs font-medium transition-colors shadow-sm">
                Ver Canvas versión 1.0 (original)
              </button>
            </Link>

            {/* CONTROLES DE AUDIO */}
            <div className="items-center gap-2 bg-slate-100 p-1.5 rounded-xl inline-flex border border-slate-300 shadow-sm">
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 text-xs"
              >
                ⏮️
              </button>

              <button
                onClick={toggleAudio}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-white shadow-sm ${
                  isPlaying ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {isPlaying ? "Pausar" : "Escuchar Pitch"}
              </button>

              <button
                onClick={() => {
                  if (audioRef.current && audioRef.current.duration) {
                    audioRef.current.currentTime = audioRef.current.duration - 0.5;
                  }
                }}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 text-xs"
              >
                ⏭️
              </button>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-300 shadow-sm min-w-60">
          <p className="mb-1"><span className="font-bold">Autor:</span> Cindia López</p>
          <p className="mb-1"><span className="font-bold">Facilitadora:</span> Prof(a). Yeisa Rodríguez Estévez</p>
          <p><span className="font-bold">Propuesta de Negocio - Modelo Canvas:</span> Julio 2026</p>
        </div>
      </header>

      {/* MATRIZ PRINCIPAL DEL CANVAS (5 COLUMNAS EN DESKTOP) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">

        {/* COLUMNA 1: SOCIOS CLAVE */}
        <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm min-h-115 flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
            <span>8. Socios Clave</span>
            <InfoPopup
              title="Reducción de costos de I+D mediante convenios institucionales"
              description="Sugerencia atendida: Inquietud sobre los elevados costos de contratación para investigadores, neurólogos y desarrolladores independientes. Justificación v2.0: Se incorporaron acuerdos con la UNETI, centros de investigación neurológica y fundaciones de Párkinson para compartir infraestructura y realizar validaciones clínicas sin elevar la estructura de costos directos."
            />
          </h2>

          <ul className="space-y-4 text-xs text-slate-700">
            <li>
              <strong className="text-slate-900 block mb-0.5">Sector Universitario (UNETI):</strong>
              Desarrollo técnico de modelos de IA y validación académica.
            </li>
            <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
              <strong className="text-blue-900 block mb-0.5">[Nuevo v2.0] Centros de Neurología y Fundaciones:</strong>
              Infraestructura compartida para ensayos clínicos y acceso directo a pacientes.
            </li>
            <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
              <strong className="text-blue-900 block mb-0.5">[Nuevo v2.0] Pasarelas FinTech Locales:</strong>
              Integración para facilitar micro-pagos e inclusión financiera.
            </li>
          </ul>
        </section>

        {/* COLUMNA 2: ACTIVIDADES Y RECURSOS CLAVE */}
        <div className="flex flex-col gap-4">

          {/* ACTIVIDADES CLAVE */}
          <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
              <span>7. Actividades Clave</span>
              <InfoPopup
                title="Protocolos clínicos y adaptación a la progresión médica"
                description="Sugerencia atendida: Preguntas sobre cómo lidiar con la progresión degenerativa del habla en el tiempo y el cumplimiento bioético de las pruebas. Justificación v2.0: Se añadió la calibración de modelos adaptativos y el reentrenamiento periódico. Asimismo, la hermana de la autora participará en el pilotaje inicial asegurando consentimientos bioéticos normados."
              />
            </h2>

            <ul className="space-y-3 text-xs text-slate-700">
              <li>
                <strong className="text-slate-900 block mb-0.5">Optimización de Modelos ASR:</strong>
                Entrenamiento acústico para reconocimiento de disartria.
              </li>
              <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <strong className="text-blue-900 block mb-0.5">[Nuevo v2.0] Pruebas Clínicas Piloto y Reentrenamiento:</strong>
                Validación bioética en campo y actualización del modelo ante la progresión.
              </li>
            </ul>
          </section>

          {/* RECURSOS CLAVE */}
          <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
              <span>6. Recursos Clave</span>
              <InfoPopup
                title="Ejecución en teléfonos de gama media/baja y cifrado"
                description="Sugerencia atendida: Observaciones sobre la falta de smartphones de alta gama en los usuarios finales y el riesgo de filtración de voz/datos. Justificación v2.0: Se incorporó la cuantización de modelos para ejecutarse en procesadores limitados sin requerir internet, garantizando además cifrado local en reposo."
              />
            </h2>

            <ul className="space-y-3 text-xs text-slate-700">
              <li>
                <strong className="text-slate-900 block mb-0.5">Equipo Multidisciplinario:</strong>
                Ingeniería de software, neurología y lingüística.
              </li>
              <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <strong className="text-blue-900 block mb-0.5">[Nuevo v2.0] Modelos Ligeros y Cifrado On-Device:</strong>
                IA optimizada para smartphones Android estándar con seguridad biométrica local.
              </li>
            </ul>
          </section>
        </div>

        {/* COLUMNA 3: PROPUESTA DE VALOR */}
        <section className="bg-blue-100 p-5 rounded-xl border-2 border-blue-500 shadow-md min-h-115 flex flex-col">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-800 border-b border-blue-200 pb-2 mb-4 flex items-center justify-between">
            <span>1. Propuesta de Valor</span>
            <InfoPopup
              title="Independencia tecnológica (Offline) y accesibilidad física"
              description="Sugerencia atendida: Dudas sobre fallas de conexión a internet en Venezuela y dificultades de control táctil por temblor involuntario. Justificación v2.0: Se definió el procesamiento 100% offline (Edge AI) para garantizar el funcionamiento ininterrumpido sin consumir datos, incorporando además un filtro táctil inteligente anti-temblor."
            />
          </h2>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
              <span className="block font-bold text-blue-700 uppercase mb-1">Reconstrucción Vocal Neuronal</span>
              Decodificación de disartria preservando la identidad fonética.
            </li>
            <li className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
              <span className="block font-bold text-blue-900 uppercase mb-1">[Nuevo v2.0] Operatividad 100% Offline (Edge AI)</span>
              Garantía de uso sin depender de conectividad ni enviar datos a la nube.
            </li>
            <li className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
              <span className="block font-bold text-blue-900 uppercase mb-1">[Nuevo v2.0] Filtro Táctil Anti-Temblor</span>
              Algoritmo adaptativo que compensa micro-oscilaciones del usuario.
            </li>
          </ul>
        </section>

        {/* COLUMNA 4: RELACIÓN Y CANALES */}
        <div className="flex flex-col gap-4">

          {/* RELACIÓN CON CLIENTES */}
          <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
              <span>4. Relación Clientes</span>
              <InfoPopup
                title="Soporte híbrido y capacitación al núcleo familiar"
                description="Sugerencia atendida: Comentarios sobre la dificultad de los adultos mayores para interactuar solos con la aplicación. Justificación v2.0: Se diseñó una estrategia de inducción que involucra directamente al cuidador familiar, sumado a una interfaz adaptada con botones de alto contraste y opciones simplificadas."
              />
            </h2>

            <ul className="space-y-3 text-xs text-slate-700">
              <li>
                <strong className="text-slate-900 block mb-0.5">Asistencia Continuada:</strong>
                Canales directos de soporte y atención al usuario.
              </li>
              <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <strong className="text-blue-900 block mb-0.5">[Nuevo v2.0] Formación Híbrida para Cuidadores:</strong>
                Talleres presenciales/digitales al entorno familiar e interfaz inclusiva UX.
              </li>
            </ul>
          </section>

          {/* CANALES */}
          <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
              <span>3. Canales</span>
              <InfoPopup
                title="Prescripción clínica y transferencia P2P sin internet"
                description="Sugerencia atendida: Cuestionamientos sobre cómo llegar a usuarios que no frecuentan tiendas de aplicaciones o carecen de banda ancha. Justificación v2.0: Se añadió la distribución por recomendación médica directa en consultas y la transferencia de la APK vía Bluetooth/redes locales P2P."
              />
            </h2>

            <ul className="space-y-3 text-xs text-slate-700">
              <li>
                <strong className="text-slate-900 block mb-0.5">Plataformas Digitales:</strong>
                Descarga en tiendas de aplicaciones móviles.
              </li>
              <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <strong className="text-blue-900 block mb-0.5">[Nuevo v2.0] Red Médica y Distribución P2P:</strong>
                Prescripción en consulta neurológica y transferencia directa por APK/Bluetooth.
              </li>
            </ul>
          </section>
        </div>

        {/* COLUMNA 5: SEGMENTO DE MERCADO */}
        <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm min-h-115 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
              <span>2. Segmento Mercado</span>
              <InfoPopup
                title="Inclusión formal del sector médico e instituciones"
                description="Sugerencia atendida: Obsevación en el Padlet señalando que el médico tratante es indispensable para validar la adopción de la herramienta. Justificación v2.0: Se formalizó al sector clínico (neurólogos, terapeutas y centros de salud) como segmento B2B/B2G aliado en el proceso de seguimiento del paciente."
              />
            </h2>

            <ul className="space-y-4 text-xs text-slate-700">
              <li className="border-b border-slate-100 pb-3">
                <strong className="text-slate-900 text-xs block mb-1">Pacientes con Parkinson</strong>
                Personas con disartria moderada a severa.
              </li>
              <li className="border-b border-slate-100 pb-3">
                <strong className="text-slate-900 text-xs block mb-1">Cuidadores Directos</strong>
                Familiares y personal de apoyo diario.
              </li>
              <li className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <strong className="text-blue-900 text-xs block mb-1">[Nuevo v2.0] Sector Clínico y Terapeutas (B2B/B2G)</strong>
                Instituciones de salud y neurólogos como agentes de seguimiento y prescripción.
              </li>
            </ul>
          </div>
        </section>

      </div> {/* FIN GRID PRINCIPAL DE 5 COLUMNAS */}

      {/* SECCIÓN INFERIOR: COSTOS E INGRESOS (2 COLUMNAS) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        {/* ESTRUCTURA DE COSTES */}
        <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
            <span>9. Estructura de Costes</span>
            <InfoPopup
              title="Asignación presupuestaria para validación física en campo"
              description="Sugerencia atendida: Dudas sobre si el presupuesto contemplaba probar la app en dispositivos reales de gama baja. Justificación v2.0: Se reestructuró la partida de costos asignando recursos para adquirir teléfonos Android económicos para pruebas de estrés y cubrir la logística de talleres en comunidades."
            />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Desarrollo Core</span>
              Optimización del modelo neuronal acústico.
            </div>

            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">[Nuevo v2.0] Hardware de Prueba</span>
              Móviles de gama media-baja para testeo de rendimiento local.
            </div>

            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">[Nuevo v2.0] Logística Social</span>
              Despliegue comunitario e inducción a cuidadores.
            </div>
          </div>
        </section>

        {/* FUENTES DE INGRESO */}
        <section className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
            <span>5. Fuentes de Ingreso</span>
            <InfoPopup
              title="Esquema Freemium social y micro-suscripciones solidarias"
              description="Sugerencia atendida: Crítica sobre la capacidad de pago reducida de familias vulnerables afectadas por Parkinson. Justificación v2.0: Se adoptó el modelo Freemium asegurando funciones básicas 100% gratuitas, financiando el proyecto mediante micro-suscripciones opcionales ($3-$5/mes) y patrocinios de Responsabilidad Social Empresarial (RSE)."
            />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">[Nuevo v2.0] Modelo Freemium</span>
              Acceso básico sin costo para mitigar la vulnerabilidad social.
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Micro-Suscripción</span>
              Planes de $3–$5/mes para personalización de voz avanzada.
            </div>

            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">[Nuevo v2.0] Patrocinios RSE</span>
              Convenios B2B con clínicas y financiamiento social privado.
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl w-full mx-auto mt-auto pt-4 border-t border-slate-300 text-slate-600">
        <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Estructura Organizacional y Célula Multidisciplinaria de Trabajo
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-[11px] leading-relaxed">

            <div>
              <span className="font-bold text-slate-800 block mb-0.5">Dirección General / PM</span>
              <p className="text-slate-600">Cindia López</p>
              <p className="text-[10px] text-slate-400">Planificación Estratégica e Innovación Social</p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-0.5">Equipo Técnico de I+D</span>
              <p className="text-slate-600">Ing. Rita Hurtado</p>
              <p className="text-[10px] text-slate-400">Desarrollo mHealth & Modelado Edge AI</p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-0.5">Asesoría Científica</span>
              <p className="text-slate-600">Dr. Oswaldo Manuel López Machado</p>
              <p className="text-[10px] text-slate-400">Neuro‑Lingüística y Terapia Ocupacional</p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-0.5">Infraestructura y Redes</span>
              <p className="text-slate-600">Ing. Dan Álvarez</p>
              <p className="text-[10px] text-slate-400">Topología Offline, P2P y Transferencia Comunitaria</p>
            </div>

            <div>
              <span className="font-bold text-slate-800 block mb-0.5">Consultoría Legal</span>
              <p className="text-slate-600">Abog. Nayrin Peña</p>
              <p className="text-[10px] text-slate-400">Protección de Datos Médicos & Licenciamiento Open‑Source</p>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
            NeuroVoz VE © 2026 · Propuesta de Negocio
          </div>
        </div>
      </footer>

    </main>
  );
}