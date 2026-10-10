# Projeto Aprender Juntos

Este projeto é uma aplicação web criada para ajudar uma iniciativa comunitária de reforço escolar a organizar alunos, turmas, horários e presenças.

O projeto faz parte da disciplina Projeto de Software. A proposta está relacionada ao ODS 4, Educação de Qualidade, principalmente à Meta 4.5.

## O que o sistema faz

Atualmente, o sistema permite:

- cadastrar alunos;
- consultar alunos cadastrados;
- remover alunos;
- cadastrar turmas e horários;
- remover turmas;
- registrar alunos presentes ou ausentes;
- visualizar o resultado do registro;
- usar a aplicação em computador ou celular.

Quando o sistema é aberto pela primeira vez, ele começa sem alunos, turmas ou presenças. Os dados adicionados ficam salvos no navegador usado durante a demonstração.

## Tecnologias utilizadas

- Angular;
- TypeScript;
- Angular Forms;
- Angular Router;
- CSS responsivo;
- Git e GitHub;
- GitHub Actions.

Na Experiência Prática II, também foram planejados Supabase e PostgreSQL para uma versão com banco de dados remoto. Nesta versão de demonstração, preferi utilizar o armazenamento local do navegador para conseguir executar o MVP sem cadastrar chaves ou senhas de serviços externos.

## Como executar no computador

### 1. Instalar o Node.js

Caso ainda não esteja instalado, baixe o Node.js no site oficial:

<https://nodejs.org/>

Depois da instalação, abra o PowerShell ou o terminal.

### 2. Baixar o projeto

Na página do GitHub, clique em **Code**, depois em **Download ZIP**. Extraia o arquivo em uma pasta do computador.

Também é possível baixar usando o Git:

```bash
git clone https://github.com/guicirelli/projeto-aprender-juntos.git
cd projeto-aprender-juntos
```

### 3. Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

Esse comando instala os pacotes necessários para executar a aplicação.

### 4. Iniciar o sistema

Ainda dentro da pasta do projeto, execute:

```bash
npm start
```

Depois, abra o endereço mostrado no terminal. Normalmente ele é:

<http://localhost:4200/>

### 5. Usar a aplicação

1. Acesse a opção **Turmas** e cadastre uma turma.
2. Acesse **Alunos** e cadastre um aluno.
3. Entre em **Registrar presença**.
4. Escolha a turma e a data.
5. Marque cada aluno como presente ou ausente.
6. Clique em **Salvar presença**.

## Testes e build

Para executar os testes automatizados:

```bash
npm test -- --watch=false
```

Para verificar se o projeto consegue ser compilado:

```bash
npm run build
```

## Publicação online

A versão publicada pode ser acessada pelo GitHub Pages:

<https://guicirelli.github.io/projeto-aprender-juntos/>

O GitHub Actions executa os testes, cria o build e publica a aplicação quando há uma atualização na branch principal.

## Limites da versão atual

Esta versão é um MVP acadêmico. Ela ainda não possui login, banco remoto ou integração com WhatsApp. Essas funcionalidades ficaram fora do escopo inicial para manter o projeto pequeno e possível de desenvolver dentro da experiência prática.

## Revisão técnica do MVP

Antes da integração com a branch principal, a implementação foi revisada considerando a separação das telas por rotas, a reutilização dos serviços de dados e a atualização da interface após cada operação. Também foram conferidos os fluxos de cadastro, remoção, registro de presença e consulta do resultado.

Na parte de segurança, a aplicação não versiona senhas, tokens ou chaves de serviços externos. Os dados da demonstração são fictícios e ficam somente no armazenamento local do navegador. Os formulários usam validações básicas e o escopo reduzido evita incluir integrações que não foram necessárias para o MVP.
