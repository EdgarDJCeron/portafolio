const LINKS = [
  { 
    nombre: "GitHub",   
    href: "https://github.com/EdgarDJCeron",  
    icono: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  { 
    nombre: "LinkedIn", 
    href: "https://www.linkedin.com/in/edgar-ceron09/",   
    icono: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  { 
    nombre: "Twitter",  
    href: "https://x.com/Edgar_Ceron11_",  
    icono: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
];

export default function Hero() {
  return (
    <section id="hero" className="bg-[#101922] text-white">
      <div className="max-w-4xl mx-auto px-5 pt-24 pb-28 text-center">
        {/* Avatar con ring */}
        <div className="flex justify-center">
          <img
            src="/img/hero.jpeg"          
            alt="Foto del desarrollador"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-2 ring-white/15 shadow-md"
          />
        </div>

        {/* Títulos */}
        <h1 className="mt-6 text-[30px] sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05]">
          Edgar de Jesus Ceron Espinosa
        </h1>
        <h2 className="mt-3 text-[20px] sm:text-2xl font-medium text-white/80">
          Desarrollador de Automatizaciones &amp; Desarrollador Full-Stack
        </h2>
        <p className="mt-2 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
          Automatizo procesos con Python, desarrollo aplicaciones web completas Front-End, Back-End y DevOps.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#1173d4] text-white font-bold hover:bg-[#0f65bb] transition-colors"
          >
            Ver proyectos
          </a>

          <a
            href="/CV_EdgarCeron.pdf" download
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#2F3438] text-white/95 font-bold hover:bg-[#3a3f44] transition-colors"
          >
            Descargar CV
          </a>
        </div>

        {/* Redes */}
        <div className="mt-8 flex justify-center gap-6">
          {LINKS.map((l) => (
            <a key={l.nombre} href={l.href} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-[#2F3438] text-white/95 border border-white/10 group-hover:bg-[#3a3f44] transition">
                {l.icono}
              </div>
              <span className="text-white/60 text-sm font-medium">{l.nombre}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
