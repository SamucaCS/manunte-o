import type { CSSProperties, ReactNode } from "react";
import s from "./obra.module.css";

export type Tool = "hammer" | "roller" | "shovel" | "box" | "barrow";

type Props = {
  x: number;
  y: number;
  tool: Tool;
  /** vira o boneco para a esquerda */
  flip?: boolean;
  scale?: number;
  /** anda sem sair do lugar (o deslocamento fica por conta de quem envolve) */
  walk?: boolean;
  /** atraso da animação, para os bonecos não baterem no mesmo ritmo */
  delay?: string;
  /** cor da pele */
  skin?: string;
};

/*
 * Operário de perfil, olhando para a direita, no traço dos bonecos da DICE:
 * contorno preto grosso, rosto branco, capacete e colete amarelos.
 * Coordenadas locais: pés em (0, 0), quadril em (0, -38), ombro em (0, -74), pescoço em (0, -82).
 * Braços e pernas giram em torno da própria origem (ombro / quadril).
 *
 * Animação de desenho animado: o corpo inteiro achata e estica a partir dos pés
 * (squash & stretch), a cabeça balança atrasada, o capacete quica e os olhos piscam.
 */
export function Worker({ x, y, tool, flip = false, scale = 0.85, walk = false, delay = "0s", skin = "#f1c27d" }: Props) {
  const vars = { "--d": delay, "--skin": skin } as CSSProperties;
  const pose = POSES[tool];

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} style={vars}>
      {/* peças que ficam paradas no chão (cavalete, balão do "TOC!"...) */}
      {pose.ground}

      {walk && (
        <g className={s.dust}>
          <circle className={s.puff} cx={-14} cy={-4} r={6} />
          <circle className={s.puff} cx={-24} cy={-7} r={4} />
        </g>
      )}

      <g className={walk ? s.walkBody : pose.bodyAnim}>
        <Leg className={walk ? s.legA : pose.legA} />
        <Leg className={walk ? s.legB : pose.legB} />

        <Arm className={pose.backArm} back>
          {pose.backTool}
        </Arm>

        {/* tronco com colete refletivo */}
        <rect className={s.vest} x={-12} y={-80} width={24} height={44} rx={7} />
        <path className={s.stripe} d="M-12 -60H12" />
        <path className={s.ink} d="M-12 -44H12" strokeWidth={2} />

        <Head bounce={walk} sweat={tool === "shovel"} />

        {pose.body}

        <Arm className={pose.frontArm}>{pose.frontTool}</Arm>
      </g>

      {/* peças que andam junto mas não quicam com o corpo (carrinho de mão) */}
      {pose.front}
    </g>
  );
}

function Leg({ className }: { className?: string }) {
  return (
    <g transform="translate(0 -38)">
      <g className={className}>
        <path className={s.limb} d="M0 0V33" />
        <rect className={s.boot} x={-5} y={31} width={15} height={7} rx={3} />
      </g>
    </g>
  );
}

function Arm({ className, back, children }: { className?: string; back?: boolean; children?: ReactNode }) {
  return (
    <g transform="translate(0 -74)">
      <g className={className}>
        <path className={back ? s.limbBack : s.limb} d="M0 0V26" />
        {children}
        <circle className={s.hand} cx={0} cy={28} r={4} />
      </g>
    </g>
  );
}

/*
 * Cabeça grande de desenho animado: olhos brancos enormes com pupilas pequenas
 * que ficam olhando em volta, nariz de bolinha e sorriso largo.
 */
function Head({ bounce, sweat }: { bounce: boolean; sweat: boolean }) {
  return (
    <g className={bounce ? s.headWalk : s.headIdle}>
      <circle className={s.skin} cx={3} cy={-100} r={18} />
      <g className={s.blink}>
        <circle className={s.eyeWhite} cx={8} cy={-100} r={6.5} />
        <circle className={s.eyeWhite} cx={19} cy={-100} r={6} />
        <g className={s.look}>
          <circle className={s.pupilDot} cx={9.5} cy={-100} r={2} />
          <circle className={s.pupilDot} cx={20.5} cy={-100} r={1.9} />
        </g>
      </g>
      <circle className={s.nose} cx={22} cy={-93} r={3.2} />
      <path className={s.mouth} d="M7 -89Q14 -81 21 -88" />
      {/* capacete quicando por inércia quando ele anda */}
      <g className={bounce ? s.helmetBounce : undefined}>
        <path className={s.helmet} d="M-16 -112A19 19 0 0 1 22 -112H28V-107H-17Z" />
        <path className={s.ink} d="M3 -130V-113" strokeWidth={2} />
      </g>
      {sweat && <path className={s.sweat} d="M-10 -106Q-15 -98 -10 -95Q-5 -98 -10 -106Z" />}
    </g>
  );
}

type Pose = {
  legA?: string;
  legB?: string;
  frontArm?: string;
  backArm?: string;
  /** animação do corpo inteiro quando ele não está andando */
  bodyAnim?: string;
  frontTool?: ReactNode;
  backTool?: ReactNode;
  body?: ReactNode;
  ground?: ReactNode;
  front?: ReactNode;
};

const sand = (dx: number, dy: number) => ({ "--dx": `${dx}px`, "--dy": `${dy}px` }) as CSSProperties;

const POSES: Record<Tool, Pose> = {
  /* Martelando: puxa bem para trás (antecipação), bate com tudo, faísca e "TOC!" */
  hammer: {
    legA: s.standA,
    legB: s.standB,
    backArm: s.holdNail,
    frontArm: s.hammerArm,
    bodyAnim: s.hammerBody,
    frontTool: (
      <>
        <path className={s.handle} d="M0 24V46" />
        <rect className={s.metal} x={-9} y={42} width={18} height={10} rx={2} />
      </>
    ),
    ground: (
      <g>
        <g className={s.jolt}>
          <rect className={s.wood} x={8} y={-36} width={58} height={8} rx={2} />
          <path className={s.ink} d="M14 -28L8 0M22 -28L28 0M52 -28L46 0M60 -28L66 0" />
          <path className={s.ink} d="M30 -36V-42" strokeWidth={2.5} />
        </g>
        {/* linhas de velocidade na descida do martelo (smear) */}
        <g transform="translate(0 -74)">
          <g className={s.speedLines}>
            <path className={s.speed} d="M0 -48A48 48 0 0 1 40 26.5M0 -56A56 56 0 0 1 46.7 31M0 -64A64 64 0 0 1 53 35.8" />
          </g>
        </g>
        <g className={s.sparks}>
          <path className={s.spark} d="M30 -46L30 -60M20 -44L10 -52M40 -44L50 -52M22 -38L10 -36M38 -38L50 -36" />
        </g>
        {/* balão de onomatopeia, como nos quadrinhos */}
        <g transform="translate(58 -96)">
          <g className={s.pow}>
            <path className={s.burst} d="M0 -26L8 -12L24 -18L18 -4L32 4L16 10L20 26L4 16L-6 30L-10 14L-28 18L-18 4L-30 -8L-12 -10L-14 -26Z" />
            <text className={s.powText} x={0} y={8} textAnchor="middle">
              TOC!
            </text>
          </g>
        </g>
      </g>
    ),
  },

  /* Pintando: o corpo acompanha o rolo, subindo e descendo */
  roller: {
    legA: s.standA,
    legB: s.standB,
    backArm: s.paintArm,
    frontArm: s.paintArm,
    bodyAnim: s.paintBody,
    frontTool: (
      <>
        <path className={s.handle} d="M0 24V64" />
        <rect className={s.paint} x={-12} y={62} width={24} height={11} rx={4} />
      </>
    ),
  },

  /* Cavando: agacha (antecipação), estica jogando a areia em arco, e sua */
  shovel: {
    legA: s.digA,
    legB: s.digB,
    backArm: s.shovelArmBack,
    frontArm: s.shovelArm,
    bodyAnim: s.shovelBody,
    frontTool: (
      <>
        <path className={s.handle} d="M0 20V78" />
        <path className={s.metal} d="M-9 76H9L7 94H-7Z" />
      </>
    ),
    body: (
      <g>
        <circle className={s.sand} cx={64} cy={-122} r={4.5} style={sand(34, -10)} />
        <circle className={s.sand} cx={60} cy={-118} r={3.5} style={sand(52, 18)} />
        <circle className={s.sand} cx={68} cy={-116} r={4} style={sand(22, 34)} />
        <circle className={s.sand} cx={58} cy={-124} r={3} style={sand(44, -22)} />
        <circle className={s.sand} cx={66} cy={-126} r={2.5} style={sand(60, 2)} />
      </g>
    ),
  },

  /* Carregando uma caixa: a caixa sacode atrasada a cada passo */
  box: {
    frontArm: s.carryArm,
    backArm: s.carryArm,
    body: (
      <g className={s.boxLag}>
        <rect className={s.crate} x={10} y={-82} width={34} height={30} rx={3} />
        <path className={s.tape} d="M27 -82V-52M10 -67H44" />
      </g>
    ),
  },

  /* Empurrando o carrinho de mão: a areia pula a cada buraco */
  barrow: {
    frontArm: s.pushArm,
    backArm: s.pushArm,
    front: (
      <g>
        <path className={s.handle} d="M22 -56L60 -40" />
        <g className={s.sandJiggle}>
          <path className={s.sandHeap} d="M54 -52Q78 -72 104 -52Z" />
        </g>
        <path className={s.tray} d="M50 -52H108L98 -24H60Z" />
        <path className={s.ink} d="M62 -24L58 -2" />
        <g transform="translate(98 -12)">
          <g className={s.wheel}>
            <circle className={s.tire} r={12} />
            <path className={s.inkWhite} d="M-12 0H12M0 -12V12" />
          </g>
        </g>
      </g>
    ),
  },
};
