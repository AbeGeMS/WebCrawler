import * as express from "express";
import * as path from "path";
import * as cookie from "cookie-parser";

const routerName = "bookRouter";
let router = express.Router();

router.get('/latestChapter',(req,res)=>{
    let bookId = req.query.id;
});

router.get('/tableOfContent',(req,res)=>{
});

router.get("/bookMark",(req,res)=>{
});

export = router