const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});

//criacao de novos usuarios
//TODO: mudar pra hashing e alocação dinamica dps
const users =[];

const generateID = () => Math.random().toString(36).substring(2,10);

app.post("/api/register", async (req,res) => {
    const { email, password, username } = req.body;
    //holds the ID
    const id = generateID();
    //checa se as credenciais não ja existem
    const result = users.filter(
        (user) => user.email === email && user.password === password
    );

    if(result.length === 0){
        const newUser = { id, email, password, username };
        users.push(newUser);
        return res.json({
            message: "Conta criada com sucesso!!",
        });
    }
    //error handling
    res.json({
        error_message: "Usuário já existe.",
    });

    //console.log({ email, password, username, id });
});

app.post("/api/login", (req, res) =>{
    const {email, password} = req.body;

    let result = users.filter(
        (user) => user.email === email && user.password === password
    );

    if(result.length !== 1){
        return res.json({
            error_message: "Credenciais inválidas",
        });
    }

    res.json({
        message: "login efetuado",
        id: result[0].id,
    });
});

app.post("/api/create/thread", async(req, res) => {
    const {thread, useID} = req.body;
    const threadId = generateID();

    console.log({thread, userId, threadId});
});