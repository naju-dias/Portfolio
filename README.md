<h1 align="center">
  Portfólio profissional
  <a href="https://najudias.vercel.app/" target="_blank">najudias.tech</a>
</h1>

<img src="/public/previewport.png" alt="Project Preview">

## Stack

- Next.js + TypeScript
- React Three Fiber + Rapier (física da Carta Coringa)
- Framer Motion
- CSS e Tailwind CSS

## O que tem aqui

- Loading screen com progresso real
- Hero com lanyard interativo e horário local
- Transição de fundo escuro → claro → escuro acompanhando o scroll
- Seção de projetos com modal detalhado (stack, links, descrição)
- Polaroids em 3D na seção Sobre (com stack interativo)
- Layout responsivo trabalhado seção por seção, não só reescalado

## Rodando localmente

```bash
git clone https://github.com/naju-dias/portfolio.git
cd portfolio
npm install
npm run dev
```

Abre em `localhost:3000`.

## Estrutura

```
src/
├── app/page.tsx              # composição das seções + transição de fundo
├── components/
│   ├── layout/                # Navbar, LoadingScreen
│   ├── sections/               # Hero, Projects, About, Skills, Contact, Footer
│   ├── effects/Lanyard.tsx     # Lanyard Card 3D
│   └── shared/                  # TextScramble, LocalTime, Reveal
├── hooks/                        # useBgTransition, useNavTheme
└── data/projects.ts
```

## Design

Tipografia: Tanker (headings), Geist e Geist Mono (corpo), Instrument Serif Italic (Hero), Caveat (polaroids).

Paleta: roxo `#6758bf` / `#806ded` sobre fundo escuro `#06060a`, com uma seção clara `#dddadb` no meio.

---

Feito com ❤️ por Ana Julia Dias — [LinkedIn](https://www.linkedin.com/in/najudias)