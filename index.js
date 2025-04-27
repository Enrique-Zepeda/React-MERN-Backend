// Configuracion basica express
const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// Crear servidor express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public")); //middleware

// Lectura y parseo del body
app.use(express.json());

// Rutas
// Todo: auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
// Todo: CRUD: eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
