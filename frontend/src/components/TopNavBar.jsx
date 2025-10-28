export default function TopNavBar() {
    const link = "text-white text-sm font-medium leading-normal hover:text-[#1173d4] transition-colors";

    function go(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <header className="w-full bg-[#101922] border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
                {/* Logo + Nombre */}
                <button onClick={() => go("hero")} className="flex items-center gap-3 group">
                    <span className="size-6 rounded-full grid place-items-center text-[#1173d4]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-heart-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-.536 .53m-7.91 5.96l-6.554 -6.489a5 5 0 1 1 7.5 -6.567a5 5 0 1 1 7.5 6.572" /><path d="M20 21l2 -2l-2 -2" /><path d="M17 17l-2 2l2 2" /></svg>
                    </span>
                    <h2 className="text-white text-lg font-bold tracking-tight">
                        Edgar de Jesus Ceron Espinosa
                    </h2>
                </button>

                {/* Links + CTA */}
                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => go("proyectos")} className={link}>Proyectos</button>
                    <button onClick={() => go("sobre-mi")} className={link}>Sobre mí</button>
                    <button onClick={() => go("trayectoria")} className={link}>Trayectoria</button>

                    <a
                        href="#contacto"
                        className="
    inline-flex items-center justify-center
    h-10 px-4 rounded-lg
    bg-[#1173d4] text-white text-sm font-semibold
    shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)]
    hover:bg-[#0f65bb] active:translate-y-px
    transition-colors duration-150
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1173d4]/40
  "
                    >
                        Contáctame
                    </a>

                </div>
            </div>
        </header>
    );
}
