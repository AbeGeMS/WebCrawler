import { BookMarkData } from "../../../lib/typings/dataModel";
import { BookMark } from "./bookMarkModel";
import { BaseAction, reducerTemplate, HandlerMap, IBaseState, RequestStatus } from "./baseReducer";
import { Reducer } from "redux";
import Constants = require("./constants");
import reduxStore from "./dataContainer";
import { DingamStyle } from "./common";
import { Notify, NotifyAsync } from "./notificationReducer";

// State
export interface IBookMarkState extends IBaseState {
    books?: BookMarkData[];
}

// Reducer
export let bookMarkReducer: Reducer<IBookMarkState, BaseAction> = (state = { books: [] }, action) => {
    return reducerTemplate<IBookMarkState>(state, action, BookMark_HandlerMap);
};

// Action
export interface requestGetBooksAction extends BaseAction {
}

export interface responseGetBooksAction extends BaseAction{
    books:BookMarkData[];
}

function requestGetBooks(state: IBookMarkState, action: requestGetBooksAction): IBookMarkState {
    if (action.type !== Constants.GetBooks_Request) {
        return state;
    }

    let bookMark = new BookMark();
    NotifyAsync(`Start to get books`, DingamStyle.Secondary, true);
    bookMark.getBooks().then(books => {
        reduxStore().dispatch({
            type:Constants.GetBooks_Response,
            status:RequestStatus.Success,
            books:books,
        });
        NotifyAsync(`get books success`,DingamStyle.Success,true);
    }, error => {
        NotifyAsync(`Failed to get books ${error.message}`, DingamStyle.Alert, true);
    });

    return { ...state, status: RequestStatus.Start };
}

function responseGetBooks(state: IBookMarkState, action: responseGetBooksAction): IBookMarkState {
    if (action.type === Constants.GetBooks_Response) {
        let newState = { ...state, books: action.books, status: action.status };
        return newState;

    }

    return { ...state };
}

let BookMark_HandlerMap: HandlerMap<IBookMarkState> = {
    [Constants.GetBooks_Request]: requestGetBooks,
    [Constants.GetBooks_Response]: responseGetBooks,
};

