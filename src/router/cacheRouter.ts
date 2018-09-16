import * as express from "express";
import * as path from "path";
import * as cookie from "cookie-parser";
import { BookMarkData, TitleData } from "../lib/dataModel";

const routerName = "bookRouter";
let router = express.Router();

router.get('/latestChapter', (req, res) => {
    let bookId = req.query.id;
});

router.get('/tableOfContent', (req, res) => {
    let result: TitleData[];
    res.json(result);
});

router.get("/bookMark", (req, res) => {
    let result: BookMarkData[];
    res.json(result);
});

router.delete("/bookMark/:id",(req,res)=>{
    let bookId = req.params.id;
    console.log(`Delete book ${bookId}`);
});

export = router