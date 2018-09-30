import * as  Promise from "bluebird";
import { BookService } from "../Service/bookService";
import { BookMarkData } from "../lib/typings/dataModel";
import { RedisAgent } from "./redisUtility";
import { reject } from "bluebird";


export class CacheService {
    private _bookService: BookService;
    private _redisAgent: RedisAgent

    public constructor(bookService: BookService, redisClient: RedisAgent) {
        this._redisAgent = redisClient;
        this._bookService = bookService;
    }

    public getBookList(): Promise<BookMarkData[]> {
        try {
            return this._redisAgent.SCAN(0, 20).then(values => {
                let booksPromise = values.map<Promise<BookMarkData>>(
                    v => this._bookService.getTitle(v).then(title => {
                        return { BookId: v, Name: title };
                    },err=>{
                        return { BookId: v, Name: err };
                    })
                );
                return Promise.filter(booksPromise, item => item.Name.trim() != null);
            });
        } catch (error) {
            return reject(`CacheService.getBookList: Failed by ${error}`);
        }
    }

    public getLatestCharpter(bookId:string):Promise<number>{
        try{
            return this._redisAgent.get(bookId)
                .then(charpter => parseInt(charpter),
                err=> reject(`CacheService.getLatestCharpter: Faied by ${err}`));
        }catch(ex){
            return reject(`CacheService.getLatestCharpter: Failed by ${ex}`);
        } 
    }
}