import * as express from "express";
import { BookMarkData, TitleData } from "../lib/typings/dataModel";
import { CacheService } from "../Service/cacheService";
import { BookService } from "../Service/bookService";
import { HttpAgent } from "../Service/httpUtility";
import { RedisAgent } from "../Service/redisUtility";
import { decodingStr } from "../lib/utility";

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
    let baseurl = decodingStr(req.cookies && req.cookies.BaseDomain);
    if (baseurl) {
        let cacheService = new CacheService(new BookService(baseurl, new HttpAgent()), new RedisAgent());
        cacheService.getBookList().then(books => res.json(books), error => res.json(error));
    } else {
        res.json("Couldn't found book Domain in cookie.");
    }
});

router.delete("/bookMark/:id", (req, res) => {
    let bookId = decodingStr(req.params.id);
    console.log(`Delete book ${bookId}`);
});

export = router