import type { CSSProperties } from "react";
import { SleepingDriver } from "./SleepingDriver";
import { Worker } from "./Worker";
import s from "./obra.module.css";

/*
 * Cena da obra de dia, no estilo das ilustrações da DICE: traço preto grosso, céu azul
 * da paleta deles e amarelo #f2ef1d nos destaques. Chão em y = 500.
 */

/* Sol de desenho animado: raios girando e rosto sorrindo */
function Sun() {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const r1 = 46;
    const r2 = i % 2 ? 60 : 68;
    return `M${(Math.cos(a) * r1).toFixed(1)} ${(Math.sin(a) * r1).toFixed(1)}L${(Math.cos(a) * r2).toFixed(1)} ${(Math.sin(a) * r2).toFixed(1)}`;
  }).join("");
  return (
    <g transform="translate(880 100)">
      <g className={s.sunRays}>
        <g className={s.sunRaysPulse}>
          <path className={s.ink} d={rays} strokeWidth={4} />
        </g>
      </g>
      <g className={s.sunFace}>
        <circle className={s.sunDisc} r={36} />
        <ellipse className={s.eye} cx={-11} cy={-6} rx={4} ry={5.5} />
        <ellipse className={s.eye} cx={11} cy={-6} rx={4} ry={5.5} />
        <circle className={s.pupil} cx={-10} cy={-8} r={1.6} />
        <circle className={s.pupil} cx={12} cy={-8} r={1.6} />
        <path className={s.ink} d="M-14 9Q0 22 14 9" />
      </g>
    </g>
  );
}

/* Nuvem fofa atravessando o céu */
function Cloud({ y, k, t, d }: { y: number; k: number; t: string; d: string }) {
  return (
    <g className={s.cloudRun} style={{ "--t": t, "--d": d } as CSSProperties}>
      <g transform={`translate(0 ${y}) scale(${k})`}>
        <g className={s.cloudPuff}>
          <path
            className={s.cloud}
            d="M-60 20Q-78 20 -76 4Q-74 -12 -54 -10Q-50 -34 -24 -32Q-8 -52 18 -40Q40 -50 50 -26Q76 -26 74 -2Q74 20 52 20Z"
          />
          <path className={s.inkThin} d="M-40 8Q-30 14 -20 8" />
        </g>
      </g>
    </g>
  );
}

/* Guindaste de treliça, com o carrinho levando um palete de tijolos até a laje */
function Crane() {
  const zig = Array.from({ length: 15 }, (_, i) => `${i % 2 ? 180 : 150} ${492 - i * 29}`).join(" L");
  const jibZig = Array.from({ length: 27 }, (_, i) => `${70 + i * 26} ${i % 2 ? 86 : 70}`).join(" L");
  return (
    <g>
      <path className={s.ink} d="M150 500V78M180 500V78" />
      <path className={s.inkThin} d={`M${zig}`} />
      <path className={s.ink} d="M150 78L165 14L180 78" />
      <path className={s.inkThin} d="M165 14L66 70M165 14L744 70" />

      <path className={s.ink} d="M62 70H748M62 86H748" />
      <path className={s.inkThin} d={`M${jibZig}`} />
      <rect className={s.yellowBlock} x={62} y={86} width={44} height={30} rx={3} />
      <path className={s.stripeThin} d="M70 86L80 116M84 86L94 116" />

      <rect className={s.yellowBlock} x={136} y={92} width={58} height={36} rx={4} />
      <rect className={s.window} x={170} y={98} width={18} height={14} rx={2} />

      <rect className={s.yellowBlock} x={128} y={488} width={74} height={12} rx={2} />

      {/* carrinho + cabo + palete */}
      <g className={s.trolley}>
        <rect className={s.dark} x={-12} y={86} width={24} height={10} rx={2} />
        <g transform="translate(0 96)">
          {/* pêndulo: o palete balança atrasado quando o carrinho arranca e freia */}
          <g className={s.swing}>
            <path className={`${s.inkThin} ${s.cable}`} d="M0 0V60" />
            <g className={s.load}>
              <path className={s.ink} d="M0 60V66M-6 70A6 6 0 0 0 6 70" />
              <path className={s.inkThin} d="M-4 72L-22 84M4 72L22 84" />
              <g className={s.loadSquash}>
                <rect className={s.brickBlock} x={-26} y={84} width={52} height={22} rx={2} />
                <path className={s.brickLines} d="M-26 95H26M-13 84V95M0 95V106M13 84V95" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/* Tijolos de uma fileira (w de largura), alternando a amarração */
function BrickRow({ x, y, w, odd, className, style }: { x: number; y: number; w: number; odd?: boolean; className?: string; style?: CSSProperties }) {
  const joints: string[] = [];
  for (let jx = x + (odd ? 12 : 24); jx < x + w; jx += 24) joints.push(`M${jx} ${y}V${y + 18}`);
  return (
    <g className={className} style={style}>
      <rect className={s.brickBlock} x={x} y={y} width={w} height={18} />
      <path className={s.brickLines} d={joints.join("")} />
    </g>
  );
}

/* Prédio em construção: térreo pronto, 1º andar subindo, 2º andar só na estrutura */
function Building() {
  return (
    <g>
      {/* térreo: tijolos com janelas acesas e porta */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <BrickRow key={i} x={440} y={392 + i * 18} w={320} odd={i % 2 === 1} />
      ))}
      <rect className={`${s.window} ${s.lit}`} x={468} y={414} width={54} height={44} rx={3} />
      <rect className={`${s.window} ${s.lit}`} x={678} y={414} width={54} height={44} rx={3} style={{ "--d": "-1.3s" } as CSSProperties} />
      <path className={s.inkThin} d="M495 414V458M468 436H522M705 414V458M678 436H732" />
      <rect className={s.door} x={578} y={420} width={44} height={80} rx={3} />
      <circle className={s.dark} cx={612} cy={462} r={3} />

      {/* 1º andar: fileiras subindo na baia da esquerda, parede sendo pintada na da direita */}
      {[0, 1, 2, 3, 4].map((i) => (
        <BrickRow key={i} x={450} y={364 - i * 18} w={100} odd={i % 2 === 1} className={s[`row${i}`]} />
      ))}
      <rect className={s.wallRaw} x={660} y={282} width={90} height={100} />
      <rect className={s.wallPainted} x={660} y={282} width={90} height={100} />

      {/* lajes e pilares */}
      <rect className={s.slab} x={430} y={382} width={340} height={10} />
      <rect className={s.slab} x={430} y={272} width={340} height={10} />
      {[440, 550, 650, 750].map((px) => (
        <g key={px}>
          <rect className={s.column} x={px} y={236} width={10} height={264} />
          {/* ferragem aparente esperando o próximo andar */}
          <path className={s.inkThin} d={`M${px + 2} 236V216M${px + 8} 236V220`} />
        </g>
      ))}

      {/* poeira quando o palete do guindaste pousa na laje */}
      <g transform="translate(700 270)">
        <g className={s.landDust}>
          <circle className={s.puff} cx={-34} cy={-4} r={9} />
          <circle className={s.puff} cx={-22} cy={-12} r={6} />
          <circle className={s.puff} cx={34} cy={-4} r={9} />
          <circle className={s.puff} cx={22} cy={-12} r={6} />
        </g>
      </g>

      {/* bandeirinha no último pilar */}
      <path className={s.ink} d="M755 236V184" />
      <path className={s.flag} d="M756 186L790 196L756 206Z" />
    </g>
  );
}

function SandPile() {
  return (
    <g>
      <path className={s.sandHeap} d="M236 500Q290 436 344 500Z" />
      <path className={s.inkThin} d="M262 486l6 -4M292 470l6 -4M314 488l6 -4M280 494l4 -3" />
    </g>
  );
}

function Sign() {
  return (
    <g>
      <path className={s.ink} d="M872 500V378M944 500V378" />
      <rect className={s.yellowBlock} x={856} y={346} width={104} height={46} rx={4} />
      <text className={s.signText} x={908} y={378} textAnchor="middle">
        OBRA
      </text>
      <rect className={s.dark} x={902} y={334} width={12} height={12} rx={2} />
      <circle className={s.lamp} cx={908} cy={330} r={6} />
    </g>
  );
}

function Cone({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 500)`}>
      <path className={s.cone} d="M-8 -28H8L14 0H-14Z" />
      <path className={s.stripeThin} d="M-10 -14H10" />
      <rect className={s.dark} x={-18} y={-4} width={36} height={4} rx={1} />
    </g>
  );
}

export default function ObraScene() {
  return (
    <svg className={s.scene} viewBox="0 0 1000 580" role="img" aria-labelledby="obra-title obra-desc">
      <title id="obra-title">Obra em andamento</title>
      <desc id="obra-desc">
        Ilustração animada de operários construindo um prédio: um guindaste leva tijolos até a laje, um pedreiro
        martela um prego, um pintor passa rolo na parede, um operário cava areia com a pá, outro atravessa a obra
        carregando uma caixa e outro empurra um carrinho de mão.
      </desc>

      <defs>
        {/* "Boiling line": o traço treme como desenho feito à mão, quadro a quadro */}
        {[1, 7, 13].map((seed, i) => (
          <filter key={seed} id={`obra-boil-${i}`} x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={seed} result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale={3.4} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
        {/* granulado de papel por cima de tudo */}
        <filter id="obra-grao" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={1} seed={4} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.16" />
          </feComponentTransfer>
        </filter>
      </defs>
      {/* keyframes fora do CSS Module: o url(#...) do filtro precisa ficar literal */}
      <style>{`
        .obra-boil { animation: obra-boil 0.36s steps(1, end) infinite; }
        @keyframes obra-boil {
          0% { filter: url(#obra-boil-0); }
          33.3% { filter: url(#obra-boil-1); }
          66.6% { filter: url(#obra-boil-2); }
        }
      `}</style>

      <rect className={s.sky} width={1000} height={500} />
      <rect className={s.earth} y={500} width={1000} height={80} />

      <g className="obra-boil">
      <Sun />
      <Cloud y={70} k={1} t="70s" d="-10s" />
      <Cloud y={150} k={0.7} t="95s" d="-60s" />
      <Cloud y={40} k={0.55} t="120s" d="-30s" />

      <Building />
      <Crane />
      <SandPile />
      <Sign />
      {/* motorista tirando um cochilo debaixo da placa */}
      <SleepingDriver x={888} y={500} />
      <Cone x={380} />
      <Cone x={820} />
      <Cone x={985} />

      {/* chão */}
      <path className={s.ground} d="M0 500H1000" />
      <path className={s.inkThin} d="M20 520l14 0M90 540l20 0M170 522l12 0M260 548l18 0M350 526l14 0M450 544l20 0M560 522l12 0M640 548l18 0M730 528l14 0M820 544l20 0M910 522l12 0M960 550l16 0" />

      {/* operários parados trabalhando */}
      <Worker x={470} y={272} tool="hammer" skin="#f1c27d" />
      <Worker x={628} y={382} tool="roller" delay="-0.4s" skin="#c68642" />
      <Worker x={372} y={500} tool="shovel" flip skin="#e0ac69" delay="-0.7s" />

      {/* operários atravessando a obra */}
      <g className={s.acrossRight}>
        <Worker x={0} y={506} tool="box" walk skin="#ffdbac" />
      </g>
      <g className={s.acrossLeft}>
        <Worker x={0} y={506} tool="barrow" walk flip delay="-0.2s" skin="#8d5524" />
      </g>
      </g>

      <rect width={1000} height={580} filter="url(#obra-grao)" className={s.grain} />
    </svg>
  );
}
