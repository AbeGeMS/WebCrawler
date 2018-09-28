import { createStore, Store } from "redux";
import { BookMarkData, TitleData, ContantData } from "../../../lib/typings/dataModel";
import * as Constants from "./constants";

export default () => {
    const store: Store<IStoreState, BaseAction> =
        createStore<IStoreState, BaseAction, any, any>(getBooksReducer, defaultState);
    return store;
}

// Store State
export interface IBookMarkState{
    books: BookMarkData[],
    bookDomain: string,
}

export interface IBookState{
    latestCharpter: number,
    table:TitleData[],
    content:ContantData[],
}

export interface IStoreState extends IBookMarkState, IBookState {
}

let defaultState: IStoreState = null;

// Action
export interface BaseAction {
    type: string;
}

export interface GetBooksAction extends BaseAction {
    bookDomain: string;
}
// Reduce
export let getBooksReducer: (state: IStoreState, action: GetBooksAction) => IStoreState = (state, action) => {
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