// src/pages/Inicio.jsx
import TopNavBar from "../components/TopNavBar";
import Hero from "../components/Hero";
import SobreMi from "../components/SobreMi";
import Habilidades from "../components/Habilidades";
import ProyectosDestacados from "../components/ProyectosDestacados";
import Trayectoria from "../components/Trayectoria";
import Contacto from "../components/Contacto";

export default function Inicio() {
  return (
    <div className="bg-[#101922]">
      <TopNavBar />
      <Hero />
      <SobreMi />
      <Habilidades />
      <ProyectosDestacados />
      <Trayectoria />
      <Contacto />
    </div>
  );
}
