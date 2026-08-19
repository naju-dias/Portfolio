// ----- Multiplicador global das animações do Hero -----

// Bloco de texto
export const TEXT_SPEED = 1.4;

// CTAs, LocalTime, Navbar, scroll indicador
export const CHROME_SPEED = 1.4;

export const heroTiming = {
  labelDuration: 500,

  nameDuration: 650,
  nameStagger: 70,
  nameDelay: 150,

  roleDuration: 650,
  roleStagger: 70,
  roleDelay: 380,

  descDuration: 550,
  descStagger: 45,
  descDelay: 650,

  ctasDelay: 950,
  ctasScrambleDelay: 1050,
  ctasScrambleDelay2: 1100,

  localTimeDelay: 950,

  scrollIndicatorDelay: 1500,
} as const;

// Escala só o grupo de texto
export const tt = (ms: number) => Math.round(ms * TEXT_SPEED);

// Escala CTAs, LocalTime, Navbar e scroll
export const tc = (ms: number) => Math.round(ms * CHROME_SPEED);