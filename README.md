<h1 align="center">
  Portfólio profissional</br>
  <a href="https://najudias.vercel.app/" target="_blank">najudias.tech</a>
</h1>

<img src="public/previewport.png" alt="Project Preview">

## 💻 Tecnologias

- Next.js + TypeScript
- React Three Fiber + Rapier (física do Lanyard Card)
- CSS3 + Tailwind CSS
- Framer Motion
- Resend (envio de e-mail do formulário de contato)

---

## 📋 O que tem aqui

- Loading screen com progresso real
- Hero com lanyard interativo e horário local
- Transição de fundo escuro → claro → escuro acompanhando o scroll
- Seção de projetos com modal detalhado (stack, links, descrição)
- Polaroids em 3D na seção Sobre (com stack interativo)
- Layout responsivo trabalhado seção por seção

---

## 🛠️ Rodando localmente

```bash
git clone https://github.com/naju-dias/portfolio.git
cd portfolio
npm install
npm run dev
```

Para o formulário de contato funcionar, crie um arquivo `.env.local` na raiz com:

RESEND_API_KEY=sua_chave_aqui

Abre em `localhost:3000`.

---

## ​🧩​ Estrutura

```
src/
├── app/page.tsx                 # composição das seções + transição de fundo
├── components/
│   ├── layout/                  # Navbar, LoadingScreen
│   ├── sections/                # Hero, Projects, About, Skills, Contact, Footer
│   ├── effects/Lanyard.tsx      # Lanyard Card 3D
│   └── shared/                  # TextScramble, LocalTime, Reveal
├── hooks/                       # useBgTransition, useNavTheme
└── data/projects.ts
```

---

## 🎨​ Design

Tipografia: Tanker (headings), Geist (corpo), Instrument Serif Italic (Hero), Caveat (polaroids), Geist Mono (navbar).

Paleta: fundo escuro `#06060a` com texto roxo `#6758bf` / `#806ded` e branco `#f7f7ff`; </br>
ㅤㅤㅤ fundo claro `#dddadb` com texto roxo `#5e50b1` e preto `#2b2938`.

---

Feito com ❤️ por [Ana Julia Dias](https://www.linkedin.com/in/najudias)
