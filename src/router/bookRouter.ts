import * as express from "express";
import { BookService } from "../Service/bookService";
import { HttpAgent } from "../Service/httpUtility";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

const routerName = "bookRouter";
let router = express.Router();

router.use(bodyParser());
router.unsubscribe(cookieParser());

router.post('/book', (req, res) => {
    let bookDomain = req.body.url;
    let bookId = req.body.bookId;
    let chapterId = req.body.chapterId;
    let bookService = new BookService(bookDomain, new HttpAgent());
    bookService.getContent(bookId, chapterId)
        .then(content => res.json(content));
    console.info(
        `${routerName}.book:
        Search book ${bookId} chapter ${chapterId}`);
});

router.post('/tableOfContent', (req, res) => {
    let bookId = req.query.id;
    let bookService = new BookService("", new HttpAgent());
    bookService.getTableOfContent(bookId)
        .then(tableOfContent => res.json(tableOfContent));

    console.info(`${routerName}.tableOfContent:
    get list of book ${bookId}.`);
});

router.put("/BookDomain/:id",(req,res)=>{
    let bookid = decodeURIComponent(req.param("id").replace(/\+/g, " "));
    if(bookid){
        res.cookie("BaseDomain",bookid,{
            maxAge:86400*1000,
        });
        res.send(bookid);
    } else{
        res.status(500);
    }
});

export = router;