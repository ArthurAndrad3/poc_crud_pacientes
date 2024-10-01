# Prova de Conceito - CRUD de Pacientes

## Descrição

Este projeto é uma Prova de Conceito (PoC) para a criação de um sistema de gerenciamento de pacientes utilizando Angular 15. O sistema permite realizar operações básicas de CRUD (Criar, Ler, Atualizar e Deletar) de pacientes, além de validações nos formulários e exibição de mensagens de operação.

## Funcionalidades

- **Cadastro de Pacientes**: Formulário para inserir novos pacientes com validação de campos obrigatórios.
- **Edição de Pacientes**: Permite editar informações de pacientes existentes.
- **Listagem de Pacientes**: Exibe uma lista de pacientes cadastrados.
- **Validação de Formulários**: Verificação de campos obrigatórios e formatação correta.
- **Notificações**: Mensagens informativas sobre operações realizadas (salvo, editado, erro).

## Tecnologias Utilizadas

- **Angular 15**: Framework para construção de aplicações web.
- **PrimeNG**: Biblioteca de componentes UI para Angular.
- **TypeScript**: Linguagem de programação utilizada no desenvolvimento.

## Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Angular CLI (instalado globalmente)

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/ArthurAndrad3/poc_crud_pacientes

   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd poc_crud_pacientes
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   ng serve
   Abra o navegador e acesse http://localhost:4200.\
   ```

## Estrutura do Projeto

/src
/app
/cadastro-modal
cadastro-modal.component.ts
cadastro-modal.component.html
cadastro-modal.component.css
/notification
notification.component.ts
notification.component.html
notification.component.css
app.component.ts
app.component.css
app.component.html
app.module.ts

## Como Usar

### Creat

1. Clique no + no canto superior direito para adicionar paciente.
2. Preencha os campos obrigatórios e clique em "Salvar".
3. As notificações aparecerão na parte inferior direita da tela informando sobre o sucesso ou falha da operação.
4. A lista de pacientes será atualizada automaticamente.

### Read

1. Os pacientes ja cadastrados aparecerão em uma lista
2. Para ver mais dados dos pacientes clique no paciente fora da aba açoes

### Update

1. Clique em editar, no paciente que deseja editar
2. Preencha os campos obrigatórios e clique em "Salvar".
3. As notificações aparecerão na parte inferior direita da tela informando sobre o sucesso ou falha da operação.
4. A lista de pacientes será atualizada automaticamente.

### Delete

1. Clique em excluir, no paciente que deseja excluir
2. Selecione "OK" no balão de confirmação
3. As notificações aparecerão na parte inferior direita da tela informando sobre o sucesso ou falha da operação.
4. A lista de pacientes será atualizada automaticamente.
