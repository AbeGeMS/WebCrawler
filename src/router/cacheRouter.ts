import * as express from "express";
import * as path from "path";

const routerName = "bookRouter";
let router = express.Router();

router.get('/latestChapter',(req,res)=>{
    let bookId = req.query.id;
});

router.get('/tableOfContent',(req,res)=>{
});

export = router;