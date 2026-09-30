import Crane from "./scene/Crane";
import Ground, { BrickPallet, SiteSign } from "./scene/Ground";
import School from "./scene/School";
import Sky from "./scene/Sky";
import { DumpTruck, Excavator, MixerTruck } from "./scene/Vehicles";
import Workers, { ScaffoldWorkers } from "./scene/Workers";
import styles from "./scene/scene.module.css";

export default function ConstructionScene() {
  return (
    <svg
      className={styles.scene}
      viewBox="0 0 1000 580"
      role="img"
      aria-labelledby="scene-title scene-desc"
    >
      <title id="scene-title">Obra em andamento</title>
      <desc id="scene-desc">
        Ilustração animada de uma escola sendo construída: um guindaste levanta tijolos, uma escavadeira
        cava a terra, caminhões passam pela estrada e trabalhadores martelam, pintam e carregam materiais.
      </desc>

      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.65" stopColor="#bae6fd" />
          <stop offset="1" stopColor="#fef3c7" />
        </linearGradient>
        <pattern id="scene-brick" width={20} height={10} patternUnits="userSpaceOnUse">
          <rect width={20} height={10} fill="#c2410c" />
          <path d="M0 0.5H20M0 5.5H20M10 0.5V5.5M0.5 5.5V10M19.5 5.5V10" stroke="#fed7aa" strokeOpacity={0.55} />
        </pattern>
      </defs>

      <Sky />
      <Crane />
      <Ground />
      <Excavator />
      <School />
      <BrickPallet />
      <SiteSign className={styles.signText} lampClassName={styles.blink} />
      <ScaffoldWorkers />
      <Workers />
      <DumpTruck />
      <MixerTruck />
    </svg>
  );
}
