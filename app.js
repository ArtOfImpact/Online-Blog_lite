const express = require("express");
// Импортируем express
const Post = require("./module/post")
const Contact = require("./module/contacts")
// Шаблон постов и контактов 
const methodOverride = require('method-override')
// Мидл вар для редкотирования постов 

const createPath = require("./helpers/create-path")
const postRoutes = require("./routes/post-routes")
// Из всех сапросов использующихся для роутинга мы сделали отделный модуль 
const mongoose = require("mongoose")
const db = "mongodb+srv://admin:738733@cluster0.csusu6s.mongodb.net/?retryWrites=true&w=majority"
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("connected to DB"))
// Подключаем mongoose

const app = express();

const morgan = require('morgan');

// Константа для вызова express

app.set("view engine", "ejs");

// Подключаем формат ejs для динамически изменяемых данных в HTML

const PORT = 3000;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static("style"));
// добовляет возможность использовать файл стилей , а не писать код в html

app.use(express.urlencoded({ extended: false }));
// добовляет возможность создовать посты с помощью запроса POST

app.use(methodOverride('_method'))
// Мидл вар для редкотирования постов 


app.use(postRoutes)


app.delete("/posts/:id", (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), { title: "Error" })
        })
})
// получает id и ищет и удаляет его 

app.post("/add-post", (req, res) => {
    const { author, title, text } = req.body;
    const post = new Post({ author, title, text });
    post
        .save()
        .then((result) => res.redirect("/posts"))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), { title: "Error" })
        })
})
// добовляет пост на сервер и отоброжает страницу со всеми постами 

app.put("/edit/:id", (req, res) => {
    const { author, title, text } = req.body;
    const id = req.params.id;
    Post
        .findByIdAndUpdate(id, { author, title, text })
        .then(result => res.redirect(`/post/${id}`))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"), { title: "Error" })
        })
})
// Редоктирует пост и отоброжает его 

app.use((req, res) => {
    const title = "Error";
    res.status(404)
    res.render(createPath("error"), { title })
})
// Мидл вар который отлавливает ошибки в запросе и отображает страницу с ошибкой 

// Пример роутинга на express

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log("Port 3000")
})