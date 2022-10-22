const express = require("express");
const router = express.Router()
const Post = require("../module/post")
const Contact = require("../module/contacts")
const createPath = require("../helpers/create-path")

const handleErrors = (res, error) => {
    console.log(error);
    res.render(createPath("error"), { title: "Error" })
}

router.get("/", (req, res) => {
    const title = "Home";
    res.render(createPath("index"), { title })
})

router.get("/contacts", (req, res) => {
    const title = "Contacts";
    Contact
        .find()
        .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
        .catch((error) => handleErrors(res, error))
})

router.get("/posts", (req, res) => {
    const title = "Posts";
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath("posts"), { title, posts }))
        .catch((error) => handleErrors(res, error))
})

router.get("/post/:id", (req, res) => {
    const title = "Post";
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath("post"), { title, post }))
        .catch((error) => handleErrors(res, error))
})

router.get("/add-post", (req, res) => {
    const title = "Add-post";
    res.render(createPath("add-post"), { title })
})

router.get("/edit/:id", (req, res) => {
    const title = "Edit Post";
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath("edit-post"), { title, post }))
        .catch((error) => handleErrors(res, error))
})

router.get("/about-us", (req, res) => {
    res.render("/contacts")
})

module.exports = router;