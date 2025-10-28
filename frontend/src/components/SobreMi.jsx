export default function SobreMi() {
  return (
    <section id="sobre-mi" className="bg-[#101922] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Columna izquierda */}
          <div className="col-span-1 flex flex-col gap-8">
            {/* Card perfil */}
            <div className="rounded-xl border border-white/10 bg-[#0d141b] p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/img/perfil.jpeg"              
                  alt="Foto de perfil"
                  className="h-40 w-40 rounded-full object-cover border-4 border-[#1173d4]/20"
                />
                <h1 className="mt-4 text-2xl font-bold">Edgar Ceron</h1>
                <p className="text-[#1173d4] font-medium">Automation Developer</p>
              </div>
            </div>

            {/* Card datos rápidos */}
            <div className="rounded-xl border border-white/10 bg-[#0d141b] p-6 shadow-sm">
              <div className="flex flex-col gap-5">
                <Item
                  icono="calendar_today"
                  label="Años de Experiencia"
                  valor="1+ Años"
                />
                <Item
                  icono="code"
                  label="Especialidad Principal"
                  valor="Automatizaciones con Python"
                />
                <Item
                  icono="location_on"
                  label="Ubicación Actual"
                  valor="Veracruz, México"
                />
                <Item
                  icono="work"
                  label="Disponibilidad"
                  valor="Abierto a ofertas"
                />
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex flex-col h-full">
              {/* Título + subrayado */}
              <div className="mb-6">
                <h2 className="text-4xl font-black tracking-tight">Sobre Mí</h2>
                <div className="mt-2 h-1 w-20 rounded-full bg-[#1173d4]" />
              </div>

              {/* Texto */}
              <div className="space-y-4 text-gray-300">
                <p>
                  ¡Hola! Soy Edgar, Automatition Developer con Python enfocado en automatización de procesos y flujos de trabajo. Experiencia diseñando e implentando soluciones que reducen tiempos operativos y reducen tareas repetivitivas mediante Robotics Process Automation, scripts, web scraping y extracción de datos. Enfocado en generar impacto medible mediante la automatización inteligente de procesos empresariales
                </p>
                <p>
                  Por otra parte, también soy Full-Stack Developer con experiencia en el desarrollo de aplicaciones web. Dominio del cliclo de desarrollo: diseño e Implementación de interfaces fronted dinámicas, desarrollo de arquitecturas backend con APIs y gestión de bases de datos, así como la implementación de prácticas DevOps para la integración y despligue continuo.
                </p>
                <p>
                  Estudiante de último año de la carrera de Tecnologías de la Información, lo que me proporciona una visión integral que combina conocimientos técnicos con comprensión de lógica de negocios. Esta formación me permite no solo desarrollar soluciones tecnológicas, sino también entender las necesidades empresariales, analizar procesos organizacionales y alinear las soluciones técnicas con los objetivos estratégicos de la empresa.
                </p>
              </div>

              {/* Botones */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="public/CV_EdgarCeron.pdf"
                  download
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#1173d4] px-6 py-3 text-white font-bold shadow-lg shadow-[#1173d4]/30 transition-transform duration-200 hover:scale-105 active:scale-100"
                >
                  <span className="material-symbols-outlined">download</span>
                  <span>Descargar CV</span>
                </a>

                <a
                  href="#contacto"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#1173d4]/20 px-6 py-3 text-[#1173d4] font-bold transition-colors duration-200 hover:bg-[#1173d4]/30"
                >
                  <span className="material-symbols-outlined">email</span>
                  <span>Contactar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Subcomponente para filas de la card de “datos rápidos” ——— */
function Item({ icono, label, valor }) {
  return (
    <div className="flex items-start gap-4">
      <span className="material-symbols-outlined text-[#1173d4] mt-0.5">{icono}</span>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold text-white">{valor}</p>
      </div>
    </div>
  );
}
