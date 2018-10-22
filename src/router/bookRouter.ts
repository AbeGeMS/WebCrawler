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

    bookDomain =`https://${bookDomain}.com/`;
    let bookService = new BookService(bookDomain, new HttpAgent());
    bookService.getContent(bookId, chapterId, index)
        .then(content => res.json(content));
    console.info(
        `${routerName}.book:
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
    bookDomain = `https://${bookDomain}.com/`
    let bookService = new BookService(bookDomain, new HttpAgent());
    bookService.getTableOfContent(bookId)
        .then(tableOfContent => res.json(tableOfContent));

    console.info(`${routerName}.tableOfContent:
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

export = router;