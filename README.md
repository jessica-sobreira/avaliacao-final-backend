# API de Cadastro de Usuário e Recados

Esta é uma API simples desenvolvida em Node.js usando o framework Express para gerenciar cadastros de usuários e recados. A aplicação oferece operações básicas como criar, listar, atualizar e excluir usuários e recados.

## Rotas Disponíveis

### Usuários

- **Criar Usuário:**
  - Método: `POST`
  - Rota: `/usuarios`
  - Descrição: Cria um novo usuário.
  - Exemplo de Uso:
    ```json
    {
      "nome": "Nome do Usuário",
      "senha": "SenhaSecreta"
    }
    ```

- **Listar Usuários:**
  - Método: `GET`
  - Rota: `/usuarios`
  - Descrição: Retorna a lista de todos os usuários cadastrados.

- **Obter Usuário por ID:**
  - Método: `GET`
  - Rota: `/usuarios/:id`
  - Descrição: Retorna as informações de um usuário específico.
  - Exemplo de Uso: `/usuarios/1`

- **Atualizar Usuário por ID:**
  - Método: `PUT`
  - Rota: `/usuarios/:id`
  - Descrição: Atualiza as informações de um usuário existente.
  - Exemplo de Uso: `/usuarios/1`
    ```json
    {
      "nome": "Novo Nome",
      "senha": "NovaSenha"
    }
    ```

- **Deletar Usuário por ID:**
  - Método: `DELETE`
  - Rota: `/usuarios/:id`
  - Descrição: Deleta um usuário específico.
  - Exemplo de Uso: `/usuarios/1`

### Recados

- **Criar Recado para Usuário:**
  - Método: `POST`
  - Rota: `/recados/:id`
  - Descrição: Adiciona um novo recado ao usuário especificado.
  - Exemplo de Uso: `/recados/1`
    ```json
    {
      "titulo": "Título do Recado",
      "descricao": "Conteúdo do Recado"
    }
    ```

- **Listar Recados de Usuário com Paginação:**
  - Método: `GET`
  - Rota: `/recados/:id`
  - Descrição: Retorna uma página de recados do usuário com paginação opcional.
  - Parâmetros de Consulta:
    - `page` (Número da Página, padrão: 1)
    - `limit` (Limite de Recados por Página, padrão: 5)
  - Exemplo de Uso: `/recados/1?page=2&limit=10`

- **Atualizar Recado por ID:**
  - Método: `PUT`
  - Rota: `/recados/:id/:idRecado`
  - Descrição: Atualiza as informações de um recado específico.
  - Exemplo de Uso: `/recados/1/2`
    ```json
    {
      "titulo": "Novo Título",
      "descricao": "Nova Descrição"
    }
    ```

- **Deletar Recado por ID:**
  - Método: `DELETE`
  - Rota: `/recados/:id/:idRecado`
  - Descrição: Deleta um recado específico de um usuário.
  - Exemplo de Uso: `/recados/1/2`

## Como Utilizar

1. Clone o repositório: `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `node index.js`
4. Acesse as rotas conforme documentação acima.

A API estará rodando em [http://localhost:3000](http://localhost:3000).


