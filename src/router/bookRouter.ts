import * as express from "express";
import { BookService } from "../Service/bookService";
import { HttpAgent } from "../Service/httpUtility";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { decodingStr } from "../lib/utility";

const routerName = "bookRouter";
let router = express.Router();

router.use(bodyParser());
router.unsubscribe(cookieParser());

router.post('/book', (req, res) => {
    let bookDomain = req.cookies && req.cookies.BaseDomain;
    let bookId = req.body.bookId;
    let index = req.body.index;
    let chapterId = req.body.chapterId;
    if (!bookDomain || !bookId || !chapterId) {
        res.status(500).json({
            error: `invalid parameter Domain:${bookDomain} book:${bookId} chapter:${chapterId}`
        });
    }

    bookDomain = getBookUrl(bookDomain);
    let bookService = new BookService(bookDomain, new HttpAgent());
    bookService.getContent(bookId, chapterId, index)
        .then(content => res.json(content));
    console.info(
        `POST ${routerName}.book:
        Search book ${bookId} chapter ${chapterId}`);
});

router.post('/tableOfContent', (req, res) => {
    let bookId = req.body.id;
    let bookDomain = req.cookies && req.cookies.BaseDomain;
    if (!bookId || !bookDomain) {
        res.status(500).json({
            error: `invalid parameter domain:${bookDomain} bookId:${bookId}`,
        });
    }
    bookDomain = getBookUrl(bookDomain);
    let bookService = new BookService(bookDomain, new HttpAgent());
    bookService.getTableOfContent(bookId)
        .then(tableOfContent => res.json(tableOfContent));

    console.info(`POST ${routerName}.tableOfContent:
    get list of book ${bookId}.`);
});

router.put("/BookDomain/:id", (req, res) => {
    let bookid = decodingStr(req.params["id"]);
    if (bookid) {
        res.cookie("BaseDomain", bookid, {
            maxAge: 86400 * 1000,
        });
        res.send(bookid);
    } else {
        res.status(500);
    }
});

router.get("/source/:id",(req,res)=>{
    console.error(req.params["id"]);
    let paramId= decodingStr(req.params["id"]);
    paramId = paramId.replace(/-/g,"/");
    let url:string = "";
    if (!paramId) {
        url =getBookUrl(req.cookies && req.cookies.BaseDomain);
    } else {
        url = `https://${paramId}`;
        console.error(url);
    }

    let bookService = new BookService(url, new HttpAgent());

    bookService.getSource(url).then(
        source=>res.send(source),
        err=>{
            res.status(500); 
            res.send();
        });
});

function getBookUrl(bookDomain: string): string{

    return `https://www.${bookDomain}.info`;
}

export = router;