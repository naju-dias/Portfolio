import { tailwindIcon, typescriptIcon, reactIcon, pythonIcon, nextjsIcon, jestIcon, framerlightIcon, fastapiIcon, postgresqlIcon, prismalightIcon, threejsIcon, nextauthjsIcon, neo4jIcon, nosqlIcon, threejsmodalIcon } from "../lib/icons";

export type Tech = { name: string; color: string; icon: string; modalIcon?: string };
export type Project = {
  id: number;
  title: string;
  type: string;
  description: string;
  longDescription: string;
  image: string;
  liveUrl?: string;
  codeUrl?: string;
  techs: Tech[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Meu Portfólio',
    type: 'Desenvolvimento Full-Stack & UX/UI',
    description:
      'Site pessoal desenvolvido do zero para apresentar minha trajetória como Engenheira de Software.',
    longDescription:
      'Site pessoal desenvolvido do zero para apresentar minha trajetória como Engenheira de Software, com forte foco em UX e identidade visual autoral. O destaque é o "Lanyard Card de Yugioh": um cartão 3D inspirado em cards de trading game, renderizado com física real via React Three Fiber e Rapier, que reage ao movimento do usuário como um crachá suspenso. O restante da interface acompanha esse cuidado visual, com transições de fundo controladas por scroll, tipografia customizada e microinterações em toda a navegação.',
    image: '/projects/projeto1.png',
    liveUrl: 'https://seusite.vercel.app',
    codeUrl: 'https://github.com/seugithub/portfolio',
    techs: [
      { name: 'React', color: '#61DAFB', icon: reactIcon },
      { name: 'Typescript', color: '#3178C6', icon: typescriptIcon },
      { name: 'Framer Motion', color: '#bbb7c4', icon: framerlightIcon },
      { name: 'Next.js', color: '#bbb7c4', icon: nextjsIcon },
      { name: 'Three.js', color: '#bbb7c4', icon: threejsIcon, modalIcon: threejsmodalIcon },
      { name: 'Tailwind CSS', color: '#38bdf8', icon: tailwindIcon },
]
  },
  {
    id: 2,
    title: 'Github Wrapped',
    type: 'Desenvolvimento Full Stack',
    description: 'Aplicação que gera uma retrospectiva animada do seu ano no GitHub.',
    longDescription:
      'Aplicação que gera uma retrospectiva animada do seu ano no GitHub. O sistema analisa commits, streaks de contribuição e horários de pico de atividade para gerar um perfil de desenvolvedor com identidade visual própria, apresentado através de slides animados navegáveis. Conta com uma camada de cache estratégico em PostgreSQL para mitigar o rate limit da API oficial, engine de métricas coberta por testes unitários com Jest e geração de previews dinâmicos no Edge Runtime para compartilhamento social. Também inclui um microsserviço independente em Python com FastAPI, responsável por expor estatísticas agregadas através de queries SQL diretas com operadores jsonb do PostgreSQL, sem uso de ORM.',
    image: '/projects/projeto2.png',
    liveUrl: 'https://git-wrap-huzi.vercel.app/',
    codeUrl: 'https://github.com/naju-dias/github-wrapped',
    techs: [
      { name: 'Next.js', color: '#bbb7c4', icon: nextjsIcon },
      { name: 'TypeScript', color: '#3178C6', icon: typescriptIcon },
      { name: 'Python', color: '#3776AB', icon: pythonIcon },

      { name: 'PostgreSQL', color: '#336791', icon: postgresqlIcon },
      { name: 'FastAPI', color: '#009688', icon: fastapiIcon },
      { name: 'Prisma', color: '#fff', icon: prismalightIcon },

      { name: 'NextAuth.js', color: '#fff', icon: nextauthjsIcon },
      { name: 'Framer Motion', color: '#bbb7c4', icon: framerlightIcon },
      { name: 'Jest', color: '#99425b', icon: jestIcon },
    ],
  },
  {
    id: 3,
    title: 'Análise de Dados de Rede Social',
    type: 'Banco de Dados NoSQL',
    description:
      'Estudo de caso focado no mapeamento e análise de dados do Twitter utilizando bancos de dados orientados a grafos.',
    longDescription:
      'Estudo de caso focado no mapeamento e análise de dados do Twitter utilizando bancos de dados orientados a grafos. O projeto explora conexões entre usuários, menções, hashtags e retweets para identificar padrões de comportamento, comunidades e influenciadores digitais, aplicando métricas de teoria dos grafos para extrair insights de redes complexas.',
    image: '/projects/projeto3.png',
    codeUrl: 'https://github.com/naju-dias/neo4j-twitter-graph-analysis',
    techs: [
      { name: 'NoSQL', color: '#bbb7c4', icon: nosqlIcon },
      { name: 'Neo4j', color: '#4581c3', icon: neo4jIcon },
    ],
  },
];