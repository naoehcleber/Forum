const express = require("express");
const cors = require("cors");
const nano = require('nano')('http://localhost:5984');
const app = express();
const PORT = 4000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
    

app.get("/api", (req, res) => {
    res.json({
        message: users,
    });
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});

//criacao de novos usuarios
//TODO: mudar pra banco de dados
//const users =[];
nano.db.list(function(err, body){
    if(!err){
        if(body.includes("users") && body.includes("threadList")){
            const users = nano.use("users");
            const threadList = nano.use("threadList");
        } else{
            nano.db.create("users");
            nano.db.create("threadList");
        }
    }else{
        console.log("Erro ao acessar banco de dados: ", err);
    }
});

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

//TODO: mudar pra banco de dados
const threadList = [];

app.post("/api/create/thread", async(req, res) => {
    const {thread, useID} = req.body;
    const threadId = generateID();

    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: [],
    });

    res.json({
        message: "Thread criada com sucesso!",
        threads: threadList,
    });

});

app.get("api/all/threads", (req, res) => {
    res.json({
        threads: threadList,
    });
});

app.post("/api/thread/like", (req, res) => {
    const { threadId, userId } = req.body;
    const result = threadList.filter((thread) => thread.id === threadId);
    const threadLikes = result[0].likes;
    const authenticateReaction = threadLikes.filter((user) => user === userId);

    if(authenticateReaction.length === 0){
        threadLikes.push(userId);
        return res.json({
            message: "Post reagido!",
        });
    }

    res.json({
        error_message: "Só pode reagir uma vez fiote!",
    });
});