// src/components/Contacto.jsx
// Sección "Hablemos" idéntica al mockup (oscuro, centrado, CTA y redes).
// Requiere: Inter + Material Symbols en index.html, Tailwind v4 importado.

const PRIMARIO = "#1173d4"; // igual al resto del sitio

export default function Contacto() {
  return (
    <section id="contacto" className="bg-[#101922] text-white">
      <div className="max-w-[960px] mx-auto flex flex-col items-center justify-center px-6 sm:px-10 py-16">

        {/* Heading + descripción */}
        <div className="max-w-xl text-center">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
            Hablemos
          </h2>
          <p className="mt-3 text-base text-[#9dabb9]">
            Estoy disponible para nuevas oportunidades y colaboraciones. Si tienes un
            proyecto en mente o simplemente quieres saludar, no dudes en contactarme.
          </p>
        </div>

        {/* Botón principal */}
        <div className="py-8">
          <a
            href="mailto:edgar200454@gmail.com" // <-- cámbialo por tu correo
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg font-bold text-base
                       text-white transition-transform duration-200 hover:scale-105 active:scale-100"
            style={{ backgroundColor: PRIMARIO }}
          >
            <span className="material-symbols-outlined mr-3">mail</span>
            Enviar un correo
          </a>
        </div>

        {/* Meta texto */}
        <p className="text-sm text-[#9dabb9]">O encuéntrame en estas plataformas:</p>

        {/* Redes */}
        <div className="mt-5 flex items-start justify-center gap-8">
          <a
            href="https://github.com/EdgarDJCeron" target="_blank" rel="noreferrer"
            className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="rounded-full p-3 bg-[#283039] group-hover:bg-opacity-20"
                  style={{ backgroundColor: "#283039" }}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </span>
            <span className="text-sm">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/edgar-ceron09/" target="_blank" rel="noreferrer"
            className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="rounded-full p-3 bg-[#283039] group-hover:bg-opacity-20"
                  style={{ backgroundColor: "#283039" }}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </span>
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>

        {/* Footer */}
        <footer className="w-full mt-12 text-center">
          <p className="text-sm text-[#9dabb9]">
            © 2025 Edgar Ceron. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </section>
  );
}
