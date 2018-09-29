import { createStore, Store, combineReducers, ReducersMapObject, Reducer } from "redux";
import { BookMarkData, TitleData, ContantData, ICorrection } from "../../../lib/typings/dataModel";
import * as Constants from "./constants";
import { DingamStyle } from "./common";
import { stat } from "fs";

let _store: Store<IStoreState, BaseAction>;

let reduxStore = () => {
    if (!_store) {
        _store = createStore<IStoreState, BaseAction, any, any>(reducer, defaultState);
    }
    return _store;
}

export default reduxStore;

// Store State
export interface IBookMarkState {
    books?: BookMarkData[];
    bookDomain?: string;
}

export interface IBookState {
    latestCharpter?: number;
    table?: TitleData[];
    content?: ContantData[];
}

export interface ISettingsState {
    corrections?: ICorrection[];
}

export interface INotifyState {
    NotifyMessage?: string;
    NotifyStyle: string | DingamStyle;
}

export interface IStoreState {
    bookMark?: IBookMarkState,
    book?: IBookState,
    notification?: INotifyState,
    setting?: ISettingsState,

}

let defaultState: IStoreState = {
    bookMark: { books: [], bookDomain: "" },
    book: { table: [], content: [] },
    notification: { NotifyMessage: null, NotifyStyle: DingamStyle.Primary },
    setting: { corrections: Constants.CorrectionList },
};

// Action
export interface BaseAction {
    type: string;
}

export interface GetBooksAction extends BaseAction {
    bookDomain: string;
}

export interface SetBookDomainAction extends BaseAction {
    bookDomain: string;
}

export interface NotifyAction extends BaseAction {
    message?: string;
    sytle?: DingamStyle;
}


// Reducec
type HandlerMap<T> = { [actionType: string]: Reducer<T, BaseAction> };

let BookMark_HandlerMap: HandlerMap<IBookMarkState> = {
    [Constants.getBooks]: getBooks,
    [Constants.setBookDomain]: setBookDomain,
};

let Notification_HandlerMap: HandlerMap<INotifyState> = {
    [Constants.changeNotification]: changeNotification,
};

let Settings_HandlerMap:HandlerMap<ISettingsState> ={};

let Book_HandlerMap:HandlerMap<IBookState> ={};

export let bookMarkReducer: Reducer<IBookMarkState, BaseAction> = (state = { bookDomain: null, books: [] }, action) => {
    return reducerTemplate<IBookMarkState>(state, action, BookMark_HandlerMap);
};

export let bookReducer: Reducer<IBookState,BaseAction> = (state ={}, action)=>{
    return reducerTemplate<IBookState>(state, action, Book_HandlerMap);
};

export let notificationReducer: Reducer<INotifyState, BaseAction> = (state = { NotifyMessage: null, NotifyStyle: DingamStyle.Primary }, action) => {
    return reducerTemplate<INotifyState>(state, action, Notification_HandlerMap);
};

export let settingsReducer: Reducer<ISettingsState, BaseAction> = (state = { corrections: Constants.CorrectionList }, action) => {
    return reducerTemplate<ISettingsState>(state, action, Settings_HandlerMap);
};

let reducerMap: ReducersMapObject<IStoreState, BaseAction> = {
    bookMark: bookMarkReducer,
    book: bookReducer,
    notification: notificationReducer,
    setting:settingsReducer,

};

let reducer = combineReducers(reducerMap);

function reducerTemplate<T>(state: T, action: BaseAction, handlers: HandlerMap<T>): T {
    let handler = handlers[action.type];

    return handler ? handler(state, action) : state;
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

function changeNotification(state: INotifyState, action: NotifyAction) {
    if (action.type == Constants.changeNotification) {
        state.NotifyMessage = action.message;
        state.NotifyStyle = action.sytle;
    }

    return state;
}

