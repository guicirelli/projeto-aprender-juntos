# Projeto Aprender Juntos

MVP acadêmico de uma aplicação web para organizar alunos, turmas, horários e registros de presença de uma iniciativa comunitária de reforço escolar.

## Escopo

- cadastrar, consultar e remover alunos;
- cadastrar, consultar e remover turmas;
- organizar dias e horários;
- registrar presença e ausência;
- consultar o resultado do registro;
- manter os dados no navegador durante a demonstração;
- apresentar uma interface responsiva e acessível.

O projeto mantém o ODS 4 — Educação de Qualidade, especialmente a Meta 4.5. Integrações com WhatsApp, pagamentos, aplicativo móvel nativo e recursos pedagógicos avançados estão fora do escopo do MVP.

## Tecnologias

- Angular;
- TypeScript;
- Angular Forms;
- Angular Router;
- CSS responsivo;
- Git e GitHub;
- GitHub Actions para build, testes e publicação.

Na Experiência Prática II, Supabase e PostgreSQL foram definidos como a solução de persistência da versão planejada. Nesta versão demonstrável, os dados são armazenados localmente no navegador para que o MVP funcione sem credenciais ou serviços externos. Nenhum segredo é versionado.

## Executar localmente

```bash
npm install
npm start
```

## Verificações de qualidade

```bash
npm run build
npm test -- --watch=false
```

## Publicação

O projeto é publicado pelo GitHub Pages:

<https://guicirelli.github.io/projeto-aprender-juntos/>

O pipeline do GitHub Actions executa os testes, gera o build e publica a aplicação após uma alteração na branch `main`.

## Evidências da Experiência III

O histórico do Git registra a evolução do MVP com commits semânticos. O repositório é público para permitir a avaliação acadêmica. Os dados cadastrados durante a demonstração são informados pelo usuário e ficam armazenados localmente no navegador.
