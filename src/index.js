const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const server = express();
server.use(express.json());

server.use(cors());
require("dotenv").config();

async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: "mysql-21e4f382-adalab-363a.g.aivencloud.com",
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: "defaultdb",
        port: 12849
    })
    connection.connect();
    return connection;
}

const port = process.env.PORT;
server.listen(port, () => {
    console.log("Server is running on port " + port);
});

// Endpoints

server.get("/api/projects", async (req, res) => {
    const sql =
        "SELECT * FROM project, author WHERE project.fk_author = author.id";
    //...
    res.json();
});

// añadir un nuevo proyecto a mi base de datos
server.post("/api/project", async (req, res) => {
    /*
        - conectarme a la base de datos
        - recojo la info del proyecto que me envía frontend
        - añadir la info a mi base de datos
            - crear un nuevo registro en la tabla authors con la info del autor
                - escribir la query
                - ejecutar la query con la info
            - crear un nuevo registro en la tabla projects con la info del proyecto
                - escribir la query
                - ejecutar la query con la info
        - cerrar la conexión con DB
        - enviar respuesta a frontend
    */

    const connection = await getDBConnection();
    const info = req.body;

    // añadir autor a la tabla authors
    const queryAuthor = "INSERT INTO authors (name) VALUES (?)"; // añadir las demás columnas, no solo name
    const [authorResult] = await connection.query(queryAuthor, [
        info.authorName
        // añadir los demás campos
    ])

    // añadir prouecto a la tabla proyects
    const queryProject = "INSERT INTO projects (name, slogan, fk_author) VALUES (?, ?)";
    const [projectResult] = await connection.query(queryProject, [
        info.projectName,
        info.slogan,
        authorResult.insertId // el id de la autora que acabo de crear. Relleno la relación, la clave foránea
    ])

    connection.end();

    res.json({
        success: true,
        cardUrl: ""
    });
})

// Servidor de estáticos

const staticServerPath = "./web/dist";
server.use(express.static(staticServerPath));