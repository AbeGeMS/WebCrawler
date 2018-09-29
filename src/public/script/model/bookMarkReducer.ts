import { BookMarkData } from "../../../lib/typings/dataModel";
import { BaseAction, reducerTemplate, HandlerMap } from "./baseReducer";
import { Reducer } from "redux";
import { DingamStyle } from "./common";
import { NotifyAction } from "./notificationReducer";
import Constants = require("./constants");
import reduxStore from "./dataContainer";

// State
export interface IBookMarkState {
    books?: BookMarkData[];
    bookDomain?: string;
}

// Reducer
export let bookMarkReducer: Reducer<IBookMarkState, BaseAction> = (state = { bookDomain: null, books: [] }, action) => {
    return reducerTemplate<IBookMarkState>(state, action, BookMark_HandlerMap);
};

// Action
export interface GetBooksAction extends BaseAction {
    bookDomain: string;
}

export interface SetBookDomainAction extends BaseAction {
    bookDomain: string;
}

function getBooks(state: IBookMarkState, action: GetBooksAction): IBookMarkState {
    if (action.type == Constants.getBooks) {
        state.books = action.bookDomain !== "fake domain" ? [] : [{
            BookId: "fake_001",
            Name: "Fake Book A",
        }, {
            BookId: "fake_002",
            Name: "Fake Book B"
        }
        ];
    }

    return state;
}

function setBookDomain(state: IBookMarkState, action: SetBookDomainAction): IBookMarkState {
    if (action.type == Constants.setBookDomain) {
        let notifySubmitting: NotifyAction = {
            type: Constants.changeNotification,
            message: `Load ${action.bookDomain} starting...`,
            sytle: DingamStyle.Secondary,
        }
        setTimeout(() => {
            reduxStore().dispatch(notifySubmitting);
        }, 0);
    }

    return state;
}

let BookMark_HandlerMap: HandlerMap<IBookMarkState> = {
    [Constants.getBooks]: getBooks,
    [Constants.setBookDomain]: setBookDomain,
};

