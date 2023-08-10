"use strict";

import express from "express";

const app = express();
app.use(express.json());

app.get("/", function (requisicao, resposta) {
  resposta.status(200);
  resposta.send("Bem vindo ao app!");
});


const usuarios = [];

const recados = [{
  titulo: "titulo1",
  descricao: "descricao1",
  conteudo: "conteudo1"
},
{
  titulo: "titulo2",
  descricao: "descricao2",
  conteudo: "conteudo2"
},
{
  titulo: "titulo3",
  descricao: "descricao3",
  conteudo: "conteudo3"
},
{
  titulo: "titulo4",
  descricao: "descricao4",
  conteudo: "conteudo4"
}];


let id = 0;

//Rota para criar um usuário
app.post("/usuarios", (requisicao, resposta) => {
  const nome = requisicao.body.nome;
  const senha = requisicao.body.senha;
  const usuario = { id, nome, senha, recados: [] };
  usuarios.push(usuario);
  id++;
  resposta.status(201).json({ mensagem: "Usuario criado com sucesso!", usuario: usuario });
});

//Rota para listar todos os usuários
app.get("/usuarios", (requisicao, resposta) => {
  resposta.json(usuarios);
});

//Rota para obter o usuário pelo ID
app.get("/usuarios/:id", (requisicao, resposta) => {
  const id = requisicao.params.id;
  const usuario = usuarios.find((e) => e.id === parseInt(id));

  if (!usuario) {
    return resposta.status(404).json({ error: "Usuário não encontrado" });
  }
  return resposta.status(200).json({ mensagem: "Usuário encontrado!", usuario: usuario });
});

//Rota para atualizar o usuário pelo ID
app.put("/usuarios/:id", (requisicao, resposta) => {
  const id = requisicao.params.id;
  const nome = requisicao.body.nome;
  const senha = requisicao.body.senha;
  const usuario = usuarios.find((e) => e.id === parseInt(id));

  if (!usuario) {
    return resposta.status(404).json({ error: "Usuario não encontrado" });
  }
  if (nome && senha) {
    usuario.nome = nome;
    usuario.senha = senha;
  } else if (nome && !senha) {
    usuario.nome = nome;
  } else {
    usuario.senha = senha;
  }

  return resposta.status(200).json({ mensagem: "Usuario atualizado", usuario: usuario });
});

//Rota para deletar um usuário pelo ID
app.delete("/usuarios/:id", (requisicao, resposta) => {
  const id = requisicao.params.id;
  const usuario = usuarios.findIndex((e) => e.id === parseInt(id));

  if (usuario === -1) {
    return resposta.status(404).json({ error: "Usuario não encontrado" });
  }
  usuarios.splice(usuario, 1);
  return resposta.status(200).json({ mensagem: "Usuario deletado" });
});

let idRecado = 0;

//Rota para criar um recado
app.post("/recados/:id", (requisicao, resposta) => {
  const id = requisicao.params.id;
  const titulo = requisicao.body.titulo;
  const descricao = requisicao.body.descricao;
  const recado = { id: idRecado, titulo, descricao };
  const usuario = usuarios.find((e) => e.id === parseInt(id));

  if (!usuario) {
    return resposta.status(404).json({ error: "Usuario não encotrado" });
  }
  usuario.recados.push(recado);
  idRecado++;
  return resposta.status(201).json({ mensagem: "Recado criado com sucesso!", usuario });
});

// Rota para buscar recados de um usuário com paginação
app.get("/recados/:id", (requisicao, resposta) => {
  const id = requisicao.params.id;
  const usuario = usuarios.find((usuario) => usuario.id === parseInt(id));

  if (!usuario) {
    return resposta.status(404).json({ error: "Usuario não encontrado" });
  }

  const page = parseInt(requisicao.query.page) || 1; // Página padrão 1
  const limit = parseInt(requisicao.query.limit) || 5; // Limite padrão 5 recados por página

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedeRecados = usuario.recados.slice(startIndex, endIndex);

  resposta.status(200).json({
    mensagem: "Recados encontrados",
    paginaAtual: page,
    recados: paginatedeRecados.map(recado => ({
      titulo: recado.titulo,
      descricao: recado.descricao,
      conteudo: recado.conteudo
    })),
  });
});
//Rota para editar um recado pelo ID
app.put("/recados/:id/:idRecado", (requisicao, resposta) => {
  const usuarioId = requisicao.params.id;
  const usuario = usuarios.find((usuario) => usuario.id === parseInt(usuarioId));
  if (!usuario) {
    resposta.status(404);
    resposta.send({ error: "Usuario não encontrado" });
  }

  const id = requisicao.params.idRecado;
  const titulo = requisicao.body.titulo;
  const descricao = requisicao.body.descricao;
  const recado = usuario.recados.find((recado) => recado.id === parseInt(id));

  if (!recado) {
    resposta.status(404);
    resposta.send({ error: "Recado não encontrado" });
  }

  recado.titulo = titulo || recado.titulo;
  recado.descricao = descricao || recado.descricao;

  resposta.status(200);
  resposta.send({ mensagem: "Recado alterado", recado: recado });
});

//Rota para deletar um recado pelo ID
app.delete("/recados/:id/:idRecado", (requisicao, resposta) => {
  const usuarioId = requisicao.params.id;
  const usuario = usuarios.find((usuario) => usuario.id === parseInt(usuarioId));
  if (!usuario) {
    resposta.status(404);
    resposta.send({ error: "Usuario não encontrado" });
  }
  const id = requisicao.params.idRecado;
  const recado = usuario.recados.find((recado) => recado.id === parseInt(id));

  if (!recado) {
    resposta.status(404);
    resposta.send({ error: "Recado não encontrado" });
  }

  const novosRecados = usuario.recados.filter(
    (recado) => recado.id !== parseInt(id)
  );
  usuario.recados = novosRecados;

  resposta.status(200);
  resposta.send({ mensagem: "Recado deletado", recados: novosRecados });
});


app.listen(3000, function () {
  console.log("servidor rodando na porta 3000: url http://localhost:3000")
});