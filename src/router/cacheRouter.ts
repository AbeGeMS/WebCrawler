import * as express from "express";
import { TitleData } from "../lib/typings/dataModel";
import { CacheService } from "../Service/cacheService";
import { BookService } from "../Service/bookService";
import { HttpAgent } from "../Service/httpUtility";
import { RedisAgent } from "../Service/redisUtility";
import { decodingStr } from "../lib/utility";

const routerName = "bookRouter";
let router = express.Router();

router.get('/latestChapter', (req, res) => {
    let baseUrl = decodingStr(req.cookies && req.cookies.BaseDomain);
    baseUrl = `https://${baseUrl.trim()}.com/`;
    let bookId = req.query.id;
    if (!baseUrl || !bookId) {
        res.json(`cacheRouter.latestChapter: invailid parameter ${baseUrl}, ${bookId}`);
        return;
    }

    let cacheService = new CacheService(new BookService(baseUrl, new HttpAgent()), new RedisAgent());
    cacheService.getLatestCharpter(bookId).then(chapter => res.json({latestChapter:chapter}), err => res.json(err));
});

router.get('/tableOfContent', (req, res) => {
    let result: TitleData[];
    res.json(result);
});

router.get("/books", (req, res) => {
    let baseurl = decodingStr(req.cookies && req.cookies.BaseDomain);
    baseurl=`https://${baseurl.trim()}.com/`;
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

router.put("/bookMark",(req,res)=>{
    let bookId = req.body.id;
    let chapter = req.body.chapter;
    let baseurl = decodingStr(req.cookies && req.cookies.BaseDomain);
    baseurl=`https://${baseurl.trim()}.com/`;
    if (baseurl) {
        let cacheService = new CacheService(new BookService(baseurl, new HttpAgent()), new RedisAgent());
        cacheService.setBookMark(bookId,chapter);
    } else{
        res.json(`Set book ${bookId} chapter ${chapter} Failed.`);
    }
});

export = router