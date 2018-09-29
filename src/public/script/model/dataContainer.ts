import { createStore, combineReducers, ReducersMapObject, Reducer, Store } from "redux";
import { DingamStyle } from "./common";
import { BaseAction } from "./baseReducer";
import { IBookMarkState, bookMarkReducer } from "./bookMarkReducer";
import { INotifyState, notificationReducer } from "./notificationReducer";
import { IBookState, bookReducer } from "./bookReducer";
import { settingsReducer, ISettingsState } from "./settingsReducer";
import Constants = require("./constants");

let _store: Store<IStoreState, BaseAction>;

let reduxStore = () => {
    if (!_store) {
        _store = createStore<IStoreState, BaseAction, any, any>(reducer, defaultState);
    }
    return _store;
}

export default reduxStore;

//  State
export interface IStoreState {
    bookMark?: IBookMarkState,
    book?: IBookState,
    notification?: INotifyState,
    setting?: ISettingsState,

}

let defaultState: IStoreState = {
    bookMark: { books: [] },
    book: { table: [], content: [] },
    notification: { NotifyMessage: null, NotifyStyle: DingamStyle.Primary, IsVissible: false },
    setting: { bookDomain: "", corrections: Constants.CorrectionList },
};


// Reducec
let reducerMap: ReducersMapObject<IStoreState, BaseAction> = {
    bookMark: bookMarkReducer,
    book: bookReducer,
    notification: notificationReducer,
    setting:settingsReducer,

};

let reducer = combineReducers(reducerMap);

