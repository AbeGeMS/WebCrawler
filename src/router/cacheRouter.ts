import * as express from "express";
import * as path from "path";
import * as cookie from "cookie-parser";
import { BookMarkData, TitleData } from "../lib/typings/dataModel";
import { CacheService } from "../Service/cacheService";
import { BookService } from "../Service/bookService";
import { HttpAgent } from "../Service/httpUtility";
import { RedisAgent } from "../Service/redisUtility";

const routerName = "bookRouter";
let router = express.Router();

router.get('/latestChapter', (req, res) => {
    let bookId = req.query.id;
});

router.get('/tableOfContent', (req, res) => {
    let result: TitleData[];
    res.json(result);
});

router.get("/books", (req, res) => {
    let result: BookMarkData[];
    if(req.cookies.BaseDomain){
        let cacheService = new CacheService(new BookService(req.cookies.BaseDomain, new HttpAgent()), new RedisAgent());
        cacheService.getBookList().then(books => res.json(books), error => res.json(error));
    } else{
        res.json("Couldn't found book Domain in cookie.");
    }
});

router.delete("/bookMark/:id",(req,res)=>{
    let bookId = req.params.id;
    console.log(`Delete book ${bookId}`);
});

export = router