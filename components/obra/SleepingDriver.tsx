import type { CSSProperties } from "react";
import s from "./obra.module.css";

type Props = {
  x: number;
  y: number;
  scale?: number;
  skin?: string;
};

/*
 * Motorista cochilando sentado no chão, encostado no poste da placa:
 * boné de caminhoneiro caído sobre os olhos, braços cruzados na barriga,
 * respiração lenta, "Zzz" subindo e bolha de nariz que cresce e estoura.
 * Coordenadas locais: quadril no chão em (0, 0), olhando para a direita.
 */
export function SleepingDriver({ x, y, scale = 0.85, skin = "#d9a066" }: Props) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} style={{ "--skin": skin } as CSSProperties}>
      {/* pernas esticadas, joelho meio dobrado */}
      <path className={s.limbBack} d="M4 -6L24 -16L42 -5" />
      <rect className={s.boot} x={38} y={-11} width={16} height={9} rx={3} />
      <path className={s.limb} d="M0 -6L22 -12L44 -3" />
      <rect className={s.boot} x={40} y={-9} width={16} height={9} rx={3} />

      {/* tronco encostado para trás, respirando */}
      <g transform="rotate(-14)">
        <g className={s.breath}>
          <rect className={s.driverShirt} x={-12} y={-48} width={25} height={44} rx={8} />
          <path className={s.inkThin} d="M-12 -12H13" />

          {/* braços cruzados na barriga */}
          <path className={s.limbBack} d="M-2 -40L14 -26L2 -20" />
          <path className={s.limb} d="M2 -40L16 -22L4 -16" />
          <circle className={s.hand} cx={4} cy={-16} r={4} />

          {/* cabeça caída para o lado, dormindo */}
          <g transform="translate(0 -48)">
            <g className={s.nod}>
              <circle className={s.skin} cx={4} cy={-15} r={16} />
              {/* olho fechado aparecendo embaixo da aba */}
              <path className={s.mouth} d="M10 -12Q13 -9 17 -12" />
              <circle className={s.nose} cx={21} cy={-7} r={3} />
              {/* boca aberta roncando */}
              <ellipse className={s.snore} cx={12} cy={-1} rx={3} ry={3.6} />
              {/* bolha de nariz */}
              <circle className={s.bubble} cx={27} cy={-5} r={6} />
              {/* boné de caminhoneiro puxado sobre os olhos */}
              <path className={s.cap} d="M-12 -18A16 16 0 0 1 20 -20L22 -15H-12Z" />
              <path className={s.cap} d="M16 -19L34 -12L30 -8L14 -14Z" />
              <circle className={s.capButton} cx={4} cy={-33} r={2.5} />
            </g>
          </g>
        </g>
      </g>

      {/* Zzz subindo, um de cada vez */}
      <text className={`${s.zzz} ${s.z1}`} x={26} y={-76}>
        z
      </text>
      <text className={`${s.zzz} ${s.z2}`} x={33} y={-88}>
        Z
      </text>
      <text className={`${s.zzz} ${s.z3}`} x={41} y={-101}>
        Z
      </text>
    </g>
  );
}
