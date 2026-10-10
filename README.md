# Projeto Aprender Juntos

MVP acadêmico de uma aplicação web para organizar alunos, turmas, horários e registros de presença de uma iniciativa comunitária de reforço escolar.

## Escopo

- cadastro e consulta de alunos;
- organização de turmas e horários;
- registro de presença e ausência;
- consulta do histórico de presença;
- interface responsiva e acessível;
- dados fictícios para demonstração.

O projeto mantém o ODS 4 — Educação de Qualidade, Meta 4.5. Integrações com WhatsApp, pagamentos, aplicativo nativo e recursos pedagógicos avançados estão fora do MVP.

## Stack

Angular, TypeScript, Angular Forms, Angular Router, Bootstrap/CSS responsivo, Supabase e PostgreSQL.

Esta versão contém um adaptador local com dados fictícios para permitir demonstração sem credenciais. A integração com Supabase deve ser habilitada com variáveis de ambiente próprias; nenhum segredo é versionado.

## Executar localmente

```bash
npm install
npm start
```

Quality gates:

```bash
npm run build
npm test -- --watch=false
```

## Evidências da Experiência III

O histórico do Git registra a evolução do MVP. O repositório é público para permitir avaliação acadêmica. Dados usados na demonstração são fictícios.
