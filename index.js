const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),        
        username :"RaghavBhatia",
        content : "Hello There",
    },
    {
        id: uuidv4(),
        username :"JohnDoe",
        content : "Contact me for Help in Html CSS and Javascript",
    },
    {
        id:uuidv4(),
        username :"RamanPanday",
        content : "I am a Stock Market Trader",
    },
    
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let id = req.params.id; // Access the id property of req.params
 
    let post = posts.find((p) => id === p.id); // Find the post by ID

    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res)=>{
    let id  = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id );
    post.content = newContent;
    console.log(post);
    res.send("patch request working");
});

app.listen(port, ()=>{
    console.log("listening to port: 8080");
});