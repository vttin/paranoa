const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "minha_chave_super_secreta";

app.post("/login", (req, res) => {
const { usuario, senha } = req.body;
if (usuario === "admin" && senha === "123") {
const token = jwt.sign({user: usuario }, SECRET, { expiresIn: "1h" });
return res.json({ token });
} else {
return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
}
});

app.get("/perfil", (req, res) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ mensagem: "Token não fornecido" });
const token = authHeader.split(" ")[1];
try {
const dados = jwt.verify (token, SECRET);
res.json({ mensagem: "Acesso liberado!", dados });
} catch (err) {
res.status(403).json({ mensagem: "Token inválido ou expirado" });
}
});

app.listen(4000, () => console.log("Servidor rodando na porta 4000"));





