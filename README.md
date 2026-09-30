# Página de manutenção

Página "em manutenção" feita com **Next.js (App Router) + React + TypeScript**.
Visual inspirado na [DICE](https://dice.fm): preto e branco, título enorme em
caixa alta numa fonte condensada (Anton) e um único amarelo de destaque (`#f2ef1d`).

A cena animada em SVG mostra operários trabalhando de dia, com céu azul, sol e
nuvens, no traço preto grosso dos bonecos da DICE: um pedreiro martela um prego (com faíscas), um pintor passa
rolo na parede, um operário cava areia e joga com a pá, um atravessa a obra
carregando uma caixa e outro empurra um carrinho de mão. O guindaste leva um
palete de tijolos até a laje e as fileiras de tijolos sobem uma a uma.

O jeito de animar tem como referência a animação de "Irmão do Jorel": o traço
treme sozinho como desenho feito à mão quadro a quadro (efeito "boiling line",
com filtros SVG de ruído trocados a cada 0,12 s), há granulado de papel por cima,
os bonecos têm cabeças grandes, olhos brancos enormes com pupilas que olham em
volta e tons de pele variados, e o martelo deixa linhas de velocidade.

A animação segue os princípios de desenho animado: os bonecos achatam e esticam
ao andar e trabalhar, o pedreiro puxa o martelo para trás antes de bater (com um
balão "TOC!"), o cavador agacha antes de jogar a areia em arco e sua, o palete
balança como pêndulo e levanta poeira ao pousar, os tijolos caem e quicam, os
olhos piscam, o capacete quica e o sol respira.

As animações são feitas só com CSS (CSS Modules), sem JavaScript no navegador.
Elas rodam mesmo com "Mostrar animações" desligado no Windows, porque o
movimento é o conteúdo da página.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Build

```bash
npm run build
```

O projeto usa exportação estática (`output: "export"`), então o site pronto fica
na pasta `out/` e pode ser hospedado em qualquer servidor estático.

## Deploy

Publicado só na Vercel: **https://manunte-o.vercel.app** (projeto `manunte-o`, ligado a
este repositório). Cada push na `main` gera um deploy de produção.

## Estrutura

```
app/
  layout.tsx            # HTML base, título e metadados
  page.tsx              # texto da página + cena
  page.module.css
  globals.css
components/
  ConstructionScene.tsx # usada pela página; renderiza a cena da obra
  obra/
    ObraScene.tsx       # céu, guindaste, prédio, areia, placa, cones e posição dos operários
    Worker.tsx          # operário com braços e pernas articulados e as ferramentas
    obra.module.css     # traço, cores e todas as animações da cena
```
