import { TitleData, ContentData } from "../../../lib/typings/dataModel";
import { HandlerMap, BaseAction, reducerTemplate, RequestStatus, IBaseState } from "./baseReducer";
import { Reducer } from "redux";
import CONST = require("./constants");
import { BookModel } from "./bookModel";
import reduxStore from "./dataContainer";
import { Notify, NotifyAsync } from "./notificationReducer";
import { DingamStyle } from "./common";
import { BookMark } from "./bookMarkModel";
import { stat } from "fs";

export interface IBookState extends IBaseState {
    bookId?: string;
    contents?: ContentData[];
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
        latestCharpter: number;
    }

    export interface GetContents_Request extends BaseAction {
        chapterId: string;
        bookId: string;
    }

    export interface GetContents_Response extends BaseAction {
        contents: ContentData[];
    }
}

export let bookReducer: Reducer<IBookState, BaseAction> = (state = {}, action) => {
    return reducerTemplate<IBookState>(state, action, Book_HandlerMap);
};

function getTableOfContent_Request_Handler(state: IBookState, action: Action.GetTableOfContents_Request): IBookState {
    if (action.type === CONST.GetTableOfContents_Request) {
        let book = new BookModel();
        let bookMark = new BookMark();
        NotifyAsync(`Start to get book ${action.bookId}...`, DingamStyle.Secondary, true);
        $.when<any>(book.getTableOfContents(action.bookId), bookMark.getLatestChapter(action.bookId))
            .then(
                (table, chapterIndex) => {
                    NotifyAsync(`succes get the table of content for book ${action.bookId}`, DingamStyle.Success);
                    setTimeout(() => {
                        let newaction: Action.GetTableOfContents_Response = {
                            type: CONST.GetTableOfContents_Response,
                            status: RequestStatus.Success,
                            table: table[0],
                            bookId: action.bookId,
                            latestCharpter: chapterIndex[0].latestChapter,
                        }
                        reduxStore().dispatch(newaction);
                    }, 0);
                },
                err => NotifyAsync(`Failed to get the table of content casue: ${JSON.stringify(err)}`, DingamStyle.Alert)
            );
    }

    return { ...state, status: RequestStatus.Start };
}

function getTableOfContent_Response_Handler(state: IBookState, action: Action.GetTableOfContents_Response): IBookState {
    if (action.type === CONST.GetTableOfContents_Response) {
        return {
            ...state,
            bookId: action.bookId,
            table: action.table,
            latestCharpter: action.latestCharpter,
            status: action.status,
        }
    }

    return { ...state };
}

function getContent_Request_Handler(state: IBookState, action: Action.GetContents_Request): IBookState {
    if (action.type === CONST.GetContent_Request) {
        let book = new BookModel();
        let startIndex = state.table.findIndex(v => v.Href === action.chapterId);
        let list = state.table.slice(startIndex, startIndex + 5).map(v => v.Href);
        NotifyAsync(`Start to loading content of chapter ${action.chapterId}`, DingamStyle.Secondary);
        book.getBookContent(action.bookId, list).then(
            contents => {
                NotifyAsync(`Success get the book content of chapter ${action.type}`, DingamStyle.Success);
                setTimeout(() => {
                    let newAction: Action.GetContents_Response = {
                        type: CONST.GetContent_Response,
                        status: RequestStatus.Success,
                        contents: contents,
                    };
                    reduxStore().dispatch(newAction);
                }, 0);
            },
            err => NotifyAsync(`Failed to get content by ${err}`, DingamStyle.Alert)
        );
    }
    return { ...state, status: RequestStatus.Start };
}

function getContent_Response_Handler(state: IBookState, action: Action.GetContents_Response): IBookState {
    if (action.type === CONST.GetContent_Response)
        return { ...state, contents: action.contents, status: action.status };
    return { ...state };
}

let Book_HandlerMap: HandlerMap<IBookState> = {
    [CONST.GetTableOfContents_Request]: getTableOfContent_Request_Handler,
    [CONST.GetTableOfContents_Response]: getTableOfContent_Response_Handler,
    [CONST.GetContent_Request]: getContent_Request_Handler,
    [CONST.GetContent_Response]: getContent_Response_Handler,
};

