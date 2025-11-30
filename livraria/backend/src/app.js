const express = require("express"); 
const path = require("path");       
const app = require("./config/express");

// Inicializa a base de dados
const db = require("./database/sqlite");
db.init();

// --- NOVO: Liberar acesso público à pasta de uploads ---
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Todas as rotas da aplicação
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use("/api", routes);
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ erro: "Endpoint não encontrado" });
});

module.exports = app;