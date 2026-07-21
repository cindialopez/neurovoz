"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function CanvasPage() {
  // Estado para controlar visualmente si el audio se está reproduciendo
  const [isPlaying, setIsPlaying] = useState(false);
  // Referencia para mantener la instancia del audio a lo largo de los renderizados
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
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error al reproducir el audio:", error);
          setIsPlaying(false);
        });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      <div>
        {/* Encabezado Institucional UNETI - Estilo Reporte Clínico */}
        <header className="max-w-7xl mx-auto mb-8 border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                UNETI • Formación Socio-Crítica IV
              </span>
              
              {/* Badge con el Lazo Plata/Gris en SVG NATIVO */}
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-500/10">
                <svg className="w-3 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C9.5 2 7 4 7 7C7 9.5 9 12 11 14.5L7 22H10.5L13 17.5L15.5 22H19L15 14.5C17 12 19 9.5 19 7C19 4 16.5 2 12 2ZM12 4C14.5 4 15.5 5.5 15.5 7C15.5 8.5 14.5 10.5 12.5 13C10.5 10.5 9.5 8.5 9.5 7C9.5 5.5 10.5 4 12 4Z"/>
                </svg>
                • Concientización Párkinson
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              NeuroVoz <span className="text-blue-600">VE</span>
            </h1>
            <p className="text-slate-600 text-sm mt-1.5 max-w-2xl font-medium">
              Modelo de Negocio e Innovación de Tecnología de Asistencia: Inteligencia Artificial Local (Edge AI) para la inclusión comunicativa de pacientes con Párkinson en Venezuela.
            </p>

            {/* Controles Multimedia Dinámicos + Botón de Navegación al Canvas 2.0 */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              
              {/* Reproductor de Audio Pitch */}
              <div className="items-center gap-2 bg-slate-100 p-1.5 rounded-xl inline-flex border border-slate-200 shadow-sm">
                
                {/* Botón ⏪: Regresar al Principio */}
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                    }
                  }}
                  title="Reiniciar audio"
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .857-.912 1.42-1.683.977l-7.108-4.062a1.125 1.125 0 0 1 0-1.954l7.108-4.062A1.125 1.125 0 0 1 21 8.688v8.123ZM11.25 16.811c0 .857-.912 1.42-1.683.977l-7.108-4.062a1.125 1.125 0 0 1 0-1.954l7.108-4.062a1.125 1.125 0 0 1 1.683.977v8.123Z" />
                  </svg>
                </button>

                {/* Botón ⏯️: Play / Pausa Principal */}
                <button 
                  onClick={toggleAudio}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-offset-2 ${
                    isPlaying 
                      ? 'bg-amber-600 hover:bg-amber-500 focus-visible:outline-amber-600' 
                      : 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                      </svg>
                      Pausar
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                      </svg>
                      Escuchar Pitch
                    </>
                  )}
                </button>

                {/* Botón ⏩: Adelantar al Final */}
                <button
                  onClick={() => {
                    if (audioRef.current && audioRef.current.duration) {
                      audioRef.current.currentTime = audioRef.current.duration - 0.5;
                    }
                  }}
                  title="Saltar al final"
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.811c0 .857-.912 1.42 1.683.977l7.108-4.062a1.125 1.125 0 0 0 0-1.954L4.683 7.712A1.125 1.125 0 0 0 3 8.688v8.123ZM12.75 16.811c0 .857-.912 1.42 1.683.977l7.108-4.062a1.125 1.125 0 0 0 0-1.954l-7.108-4.062a1.125 1.125 0 0 0-1.683.977v8.123Z" />
                  </svg>
                </button>

              </div>

              {/* Botón para navegar al Canvas 2.0 */}
              <Link
                href="/" // 👈 Ajusta esta ruta según corresponda en tu proyecto
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                Ver Canvas 2.0 →
              </Link>

            </div>
          </div>

          <div className="text-left md:text-right text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-60">
            <p className="mb-1"><span className="font-bold text-slate-700">Autor:</span> Cindia López</p>
            <p className="mb-1"><span className="font-bold text-slate-700">Facilitadora:</span> Prof(a). Yeisa Rodríguez Estévez</p>
            <p><span className="font-bold text-slate-700">Propuesta de Negocio - Modelo Canvas:</span> Junio 2026</p>
          </div>
        </header>

        {/* Matriz del Business Model Canvas - Fondo Claro y Bordes Estilizados */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          
          {/* Columna 1: Socios Clave */}
          <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300 min-h-115">
            <div>
              <div className="text-xl mb-2 text-slate-400">🤝</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">8. Socios Clave</h2>
              <ul className="space-y-4 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Sector Universitario (UNETI):</strong> 
                  ¼ Núcleo de validación técnica, investigación en IA y desarrollo soberano.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Organizaciones de Salud:</strong> 
                  Fundaciones especializadas y colectivos de pacientes con Párkinson (de inicio temprano y avanzado) para validación y pruebas de experiencia de usuario (UX).
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Alianzas FinTech y Pasarelas de Pago:</strong> 
                  Integradores de pagos locales e internacionales (Pago Móvil, Binance, Zinli, PayPal y débito directo) para automatizar el procesamiento global de las micro-transacciones.
                </li>
              </ul>
            </div>
          </section>

          {/* Columna 2: Actividades y Recursos Clave */}
          <div className="flex flex-col gap-4">
            {/* Actividades Clave */}
            <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1 transition-all hover:shadow-md hover:border-slate-300">
              <div className="text-xl mb-2 text-slate-400">🛠️</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">7. Actividades Clave</h2>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Optimización Edge AI:</strong> 
                  Compresión de modelos de lenguaje para ejecución fluida 100% offline.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Calibración en Campo:</strong> 
                  Pruebas directas con pacientes para ajustar la detección lingüística.
                </li>
              </ul>
            </section>
            
            {/* Recursos Clave */}
            <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1 transition-all hover:shadow-md hover:border-slate-300">
              <div className="text-xl mb-2 text-slate-400">🧠</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">6. Recursos Clave</h2>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Tecnológicos:</strong> 
                  Código base open-source, datasets de voz atípica, frameworks móviles ligeros y almacenamiento local cifrado en el dispositivo para resguardo de perfiles acústicos.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Talento Humano y Científico:</strong> 
                  Ingenieros de software venezolanos especializados en Edge AI y entornos móviles, neuro-lingüistas y asesores metodológicos del sector salud.
                </li>
              </ul>
            </section>
          </div>

          {/* Columna 3: Propuesta de Valor (Destacada en Azul Clínico) */}
          <section className="bg-blue-50/50 p-5 rounded-xl border-2 border-blue-500/30 shadow-md flex flex-col justify-between min-h-115">
            <div>
              <div className="text-xl mb-2 text-blue-600">💡</div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-2 mb-4">1. Propuesta de Valor</h2>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                  <span className="block font-bold text-blue-700 text-xs uppercase tracking-wider mb-1">🗣️ Reconstrucción Vocal Neuronal</span>
                  Decodificación mediante modelos acústicos locales de la disartria severa, restaurando la fluidez del habla y preservando la identidad fonética del paciente.
                </li>
                <li className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                  <span className="block font-bold text-blue-700 text-xs uppercase tracking-wider mb-1">⌨️ Filtro Anti-Temblor</span>
                  Interfaz y teclado inteligente adaptativo que filtra e ignora las micro-oscilaciones táctiles involuntarias, devolviendo la autonomía motriz fina en dispositivos móviles.
                </li>
                <li className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                  <span className="block font-bold text-blue-700 text-xs uppercase tracking-wider mb-1">🔌 Soberanía Offline</span>
                  Inferencia y procesamiento local absoluto en el dispositivo (Edge Computing), garantizando el funcionamiento continuo sin dependencia de conectividad de red ni fluido eléctrico estable.
                </li>
              </ul>
            </div>
          </section>

          {/* Columna 4: Relaciones con Clientes y Canales */}
          <div className="flex flex-col gap-4">
            {/* Relaciones */}
            <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1 transition-all hover:shadow-md hover:border-slate-300">
              <div className="text-xl mb-2 text-slate-400">❤️</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">4. Relación con Clientes</h2>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Acompañamiento Híbrido y Multicanal:</strong> 
                  Capacitación y soporte técnico tanto presencial en comunidades como digital (videos tutoriales cortos, guías interactivas) para cuidadores dentro y fuera del país.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Experiencia de Usuario Asistiva (UX/UI Inclusiva):</strong> 
                  Diseño adaptado con códigos cromáticos (colores de alto contraste para guiar la atención), botones macrodimensionados y predictivos basados en palabras cortas para agilizar la comunicación.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Feedback Loops Descentralizados:</strong> 
                  Mecanismos locales para recopilar datos de experiencia de usuario que permitan optimizar los modelos de IA según las necesidades reales del entorno familiar.
                </li>
              </ul>
            </section>
            
            {/* Canales */}
            <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1 transition-all hover:shadow-md hover:border-slate-300">
              <div className="text-xl mb-2 text-slate-400">🚀</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">3. Canales</h2>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Ecosistema Médico Mixto:</strong> 
                  Alianzas estratégicas en consultas de neurología y unidades de terapia ocupacional tanto en el sistema de salud público (hospitales, IVSS) como en clínicas privadas y sociedades médicas nacionales.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">• Distribución Omnicanal y Comunitaria:</strong> 
                  Despliegue digital mediante tiendas de aplicaciones (Google Play Store) y repositorios institucionales, combinado con transferencia directa P2P (Bluetooth/APK ligera) para entornos comunitarios con baja conectividad.
                </li>
              </ul>
            </section>
          </div>

          {/* Columna 5: Segmento de Mercado */}
          <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-115">
            <div>
              <div className="text-xl mb-2 text-slate-400">👥</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">2. Segmento de Mercado</h2>
              <ul className="space-y-4 text-xs text-slate-600">
                <li className="border-b border-slate-100 pb-3">
                  <strong className="text-slate-900 text-sm block mb-1">🎯 Nicho Principal (Usuarios Finales)</strong>
                  Pacientes en Venezuela con pérdida de autonomía comunicativa (disartria de moderada a severa) y alteraciones motrices finas, abarcando tanto el Párkinson de inicio temprano (adultos en edad productiva) como el avanzado.
                </li>
                <li className="border-b border-slate-100 pb-3">
                  <strong className="text-slate-900 text-sm block mb-1">🏠 Cuidadores y Red de Apoyo (Clientes B2C)</strong>
                  Familiares directos y redes de soporte (locales o en el extranjero) encargados de la gestión del hogar, asistencia diaria y financiamiento de las herramientas de salud del paciente.
                </li>
                <li>
                  <strong className="text-slate-900 text-sm block mb-1">🩺 Sector Clínico y Prescriptores (Aliados B2B)</strong>
                  Neurólogos, terapeutas del lenguaje y terapeutas ocupacionales, pertenecientes al sector público y privado, que requieren tecnologías de apoyo validadas para complementar la rehabilitación.
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* Fila Inferior: Costos y Sostenibilidad Financiera */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Estructura de Costes */}
          <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">📊 9. Estructura de Costes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block mb-1">💻 Desarrollo</span>
                Optimización matemática del modelo acústico local para la voz y calibración del filtro táctil para mitigar el temblor motor.
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block mb-1">⚙️ Equipamiento</span>
                Inversión en dispositivos móviles Android de gama baja para rendimiento y compatibilidad.
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block mb-1">🚚 Operativos</span>
                Logística básica para el despliegue de los talleres de alfabetización tecnológica comunitaria.
              </div>
            </div>
          </section>

          {/* Fuentes de Ingreso */}
          <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">💰 5. Fuentes de Ingreso</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block mb-1">💖 Retorno Social (Freemium) </span>
                Funciones esenciales de asistencia lingüística y comunicación básica 100% gratuitas para mitigar la vulnerabilidad.
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block mb-1">⭐ Micro-Suscripción B2C</span>
                Planes solidarios ($3 a $5/mes) procesados mediante Pago Móvil, Binance, Zinli, PayPal o débito para acceso a Clonación de Voz Personalizada.
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                <span className="font-bold text-slate-900 block mb-1">🏛️ Alianzas B2B y RSE</span>
                Licenciamiento corporativo para clínicas de rehabilitación privadas y patrocinios mediante fondos de inversión social.
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PIE DE PÁGINA: Estructura Organizacional Multidisciplinaria */}
      <footer className="max-w-7xl mx-auto w-full mt-auto pt-6 border-t border-slate-200 text-slate-500">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            🧑‍💻 Estructura Organizacional y Célula Multidisciplinaria de Trabajo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-[11px] leading-relaxed">
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">🚀 Dirección General / PM</span>
              <p className="text-slate-600">Cindia López</p>
              <p className="text-[10px] text-slate-400">Planificación Estratégica e Innovación Social</p>
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">💻 Equipo Técnico de I+D</span>
              <p className="text-slate-600">Ing. Rita Hurtado</p>
              <p className="text-[10px] text-slate-400">Desarrollo mHealth & Modelado Edge AI</p>
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">🩺 Asesoría Científica</span>
              <p className="text-slate-600">Neurocirujano Dr. Oswaldo Manuel López Machado</p>
              <p className="text-[10px] text-slate-400">Neuro-Lingüística y Terapia Ocupacional</p>
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">🌐 Infraestructura y Redes</span>
              <p className="text-slate-600">Ing. Dan Álvarez</p>
              <p className="text-[10px] text-slate-400">Topología Offline, P2P y Transferencia Comunitaria</p>
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-0.5">⚖️ Consultoría Legal</span>
              <p className="text-slate-600">Abog. Nayrin Peña</p>
              <p className="text-[10px] text-slate-400">Protección de Datos Médicos & Licenciamiento Open-Source</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
            NeuroVoz VE © 2026 • Propuesta de Negocio
          </div>
        </div>
      </footer>

    </main>
  );
}