import { BookMarkData } from "../../../lib/typings/dataModel";
import { BookMark } from "./bookMarkModel";
import { BaseAction, reducerTemplate, HandlerMap } from "./baseReducer";
import { Reducer } from "redux";
import Constants = require("./constants");
import reduxStore from "./dataContainer";
import { DingamStyle } from "./common";
import { Notify, NotifyAsync } from "./notificationReducer";

// State
export interface IBookMarkState {
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
    bookMark.getBooks().then(books => {
        reduxStore().dispatch({
            type:Constants.GetBooks_Response,
            books:books,
        });
        Notify(`get books success`,DingamStyle.Success,true);
    }, error => {
        Notify(`Failed to get books ${error.message}`, DingamStyle.Alert, true);
    });

    NotifyAsync(`Start to get books`, DingamStyle.Secondary, true);

    return state;
}

function responseGetBooks(state: IBookMarkState, action: responseGetBooksAction): IBookMarkState {
    if (action.type === Constants.GetBooks_Response) {
        let newState = { ...state, books: action.books };
        return  newState;
        
    }
    return state;
}

let BookMark_HandlerMap: HandlerMap<IBookMarkState> = {
    [Constants.GetBooks_Request]: requestGetBooks,
    [Constants.GetBooks_Response]: responseGetBooks,
};

