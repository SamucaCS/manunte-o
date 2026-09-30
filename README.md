# Página de manutenção

Página "em manutenção" feita com **Next.js (App Router) + React + TypeScript**.
Mostra uma cena animada em SVG de uma escola sendo construída: a escola sobe
etapa por etapa (paredes, janelas, telhado, placa e bandeira), um guindaste
levanta tijolos, uma escavadeira cava, caminhões passam na estrada e
trabalhadores martelam, pintam e carregam materiais.

As animações são feitas só com CSS (CSS Modules), sem JavaScript no navegador,
e respeitam a preferência de "movimento reduzido" do sistema.

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

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy.yml` faz o build e publica no GitHub Pages
a cada push na branch `main`. Para funcionar, em **Settings → Pages** do
repositório, selecione **Source: GitHub Actions**.

## Estrutura

```
app/
  layout.tsx            # HTML base, título e metadados
  page.tsx              # texto da página + cena
  page.module.css
  globals.css
components/
  ConstructionScene.tsx # monta a cena SVG
  scene/
    Sky.tsx             # céu, sol, nuvens e morros
    Ground.tsx          # terreno, estrada, cones, placa e palete
    Crane.tsx           # guindaste
    School.tsx          # escola em construção + andaime
    Vehicles.tsx        # caminhão, betoneira e escavadeira
    Workers.tsx         # trabalhadores
    scene.module.css    # todas as animações da cena
```
