# Projeto Angular com Docker

## 📌 Visão Geral
Este projeto é uma aplicação frontend desenvolvida em **Angular v17**, configurada para rodar dentro de um contêiner **Docker**. Ele utiliza **Angular Material** para uma interface de usuário moderna, além de **NgRx** para o gerenciamento eficiente de estado. Este projeto foi desenvolvido como parte de um desafio técnico proposto pela **Falconi**, integrando o processo de contratação.

## 🛠️ Tecnologias Utilizadas
- **Angular v17**
- **Angular Material v17**
- **NgRx (Store, Effects, Store Devtools)**
- **Docker**
- **pnpm** (gerenciador de pacotes)
- **Node.js 18.x**

## 🚀 Como rodar a aplicação

### 1️⃣ **Pré-requisitos**
Certifique-se de ter instalado:
- [Docker](https://www.docker.com/)

### 2️⃣ **Executar com Docker**

Para rodar a aplicação em um contêiner Docker, basta executar os seguintes comandos:

Executar os três comandos para construir a imagem e subir os contêineres:
```sh
docker-compose up --build
```

Para apenas construir a imagem Docker:
```sh
docker-compose build
```

Subir os contêineres:
```sh
docker-compose up
```

A aplicação estará disponível em `http://localhost:4200`.

### 3️⃣ **Executar sem Docker (não recomendado)**

Caso prefira rodar a aplicação localmente sem o Docker, execute:

```sh
pnpm install
pnpm start
```

## 🎯 Funcionalidades Implementadas
Todas as funcionalidades solicitadas foram implementadas:

- Criar, editar, remover e listar usuários.
- Ativar e desativar usuários.
- Buscar um usuário pelo ID.
- Filtrar usuários por perfil.

## 🤔 Explicação das Decisões Tomadas

### 🟢 **Uso do NgRx**
Usamos **NgRx** para gerenciar o estado global da aplicação, proporcionando fluxo de dados previsível e controle de ações assíncronas com **NgRx Effects**.

### 🟢 **Uso do Docker**
O **Docker** foi utilizado para garantir que a aplicação funcione da mesma forma em qualquer ambiente, sem se preocupar com configurações específicas do sistema ou dependências. Isso também facilita o processo de deploy, padronizando o ambiente de desenvolvimento e produção.

### 🟢 **Uso do pnpm ao invés de npm ou yarn**
Optamos pelo **pnpm** devido ao seu melhor gerenciamento de dependências. O **pnpm** economiza espaço em disco e acelera o processo de instalação, aproveitando o cache compartilhado entre os projetos.

### 🟢 **Componentes Standalone**
Todos os componentes do projeto foram criados como **standalone** para melhorar a modularidade e a reutilização de código. Ao usar componentes standalone, não precisamos nos preocupar com módulos adicionais, o que torna o código mais simples e facilita a integração de novos componentes no futuro.

### 🟢 **Uso do RxJS**
Escolhemos **RxJS** para lidar com fluxos assíncronos de maneira reativa e eficiente, otimizando o desempenho, especialmente em operações como busca de usuários.

### 🟢 **Busca Paginada de Usuários**
A busca de usuários foi **paginada** para otimizar o desempenho, reduzindo a quantidade de dados carregados de uma só vez. A paginação melhora a experiência do usuário ao lidar com grandes volumes de dados e também alivia a carga do servidor e da aplicação.

### 🟢 **Busca de Perfis**
A busca por perfis é **esporádica** e traz todos de uma vez, evitando chamadas repetidas ao servidor. Isso melhora o desempenho, pois novos perfis são raramente criados.

## ⚡ Possíveis Pontos de Melhoria ou Sugestões de Evolução
- **Responsividade:** Finalizar a responsividade do sistema para garantir uma experiência de usuário consistente em diferentes dispositivos.
- **Melhoria no tratamento de erros:** Implementar um sistema de mensagens de erro para informar o usuário em caso de falha em alguma operação.
- **Autenticação e Autorização:** Adicionar um sistema de login para garantir que apenas usuários autorizados possam modificar os dados.
- **Testes automatizados:** Adicionar testes unitários e de integração para garantir a estabilidade e qualidade do código à medida que a aplicação cresce.

## 🛠️ Problemas Conhecidos
- ⚠️ **Erro ao encontrar módulos do NgRx no Docker**: Se você se deparar com esse erro, pode tentar reconstruir as dependências dentro do contêiner:

```sh
docker-compose exec angular-app pnpm install
```

## 📄 Licença
Este projeto está sob a licença MIT.
