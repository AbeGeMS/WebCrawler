import { TitleData, ContentData } from "../../../lib/typings/dataModel";
import { HandlerMap, BaseAction, reducerTemplate } from "./baseReducer";
import { Reducer } from "redux";
import CONST = require("./constants");
import { BookModel } from "./bookModel";
import reduxStore from "./dataContainer";
import { Notify, NotifyAsync } from "./notificationReducer";
import { DingamStyle } from "./common";

export interface IBookState {
    bookId?: string;
    content?: ContentData;
    latestCharpter?: number;
    table?: TitleData[];
}
export namespace Action {
    export interface GetTableOfContents_Request extends BaseAction {
        bookId: string;
    }

    export interface GetTableOfContents_Response extends BaseAction {
        table: TitleData[];
        bookId: string;
    }

    export interface GetContents_Request extends BaseAction {
        chapterId: string;
        bookId: string;
    }

    export interface GetContents_Response extends BaseAction {
        content: ContentData;
    }
}

export let bookReducer: Reducer<IBookState, BaseAction> = (state = {}, action) => {
    return reducerTemplate<IBookState>(state, action, Book_HandlerMap);
};

function getTableOfContent_Request_Handler(state: IBookState, action: Action.GetTableOfContents_Request): IBookState {
    if (action.type === CONST.GetTableOfContents_Request) {
        let book = new BookModel();
        book.getTableOfContents(action.bookId).then(list => {
            setTimeout(() => {
                let newaction: Action.GetTableOfContents_Response = {
                    type: CONST.GetTableOfContents_Response,
                    table: list,
                    bookId: action.bookId,
                }
                reduxStore().dispatch(newaction);
            }, 0);
        }, err => Notify(`Failed to get book by ${err}`, DingamStyle.Alert));

        NotifyAsync(`Start to get book ${action.bookId}...`, DingamStyle.Secondary, true);
    }

    return state;
}

function getTableOfContent_Response_Handler(state: IBookState, action: Action.GetTableOfContents_Response): IBookState {
    if (action.type === CONST.GetTableOfContents_Response) {
        return { ...state, bookId: action.bookId, table: action.table }
    }

    return state;
}

function getContent_Request_Handler(state:IBookState,action:Action.GetContents_Request):IBookState{
    if(action.type === CONST.GetContent_Request){
        let book = new BookModel();
        book.getBookContent(action.bookId,parseInt(action.chapterId)).then(
            content=> setTimeout(() => {
                let newAction:Action.GetContents_Response={
                    type:CONST.GetContent_Response,
                    content:content,
                };
               reduxStore().dispatch(newAction); 
            }, 0),
            err=>Notify(`Failed to get content by ${err}`,DingamStyle.Alert)
        );
        NotifyAsync(`Start to loading content of chapter ${action.chapterId}`, DingamStyle.Secondary);
    }
    return state;
}

function getContent_Response_Handler(state:IBookState,action:Action.GetContents_Response):IBookState{
    if(action.type === CONST.GetContent_Response)
        return { ...state, content: action.content };
}

let Book_HandlerMap: HandlerMap<IBookState> = {
    [CONST.GetTableOfContents_Request]: getTableOfContent_Request_Handler,
    [CONST.GetTableOfContents_Response]: getTableOfContent_Response_Handler,
    [CONST.GetContent_Request]:getContent_Request_Handler,
    [CONST.GetContent_Response]:getContent_Response_Handler,
};

