import { TitleData, ContantData } from "../../../lib/typings/dataModel";
import { HandlerMap, BaseAction, reducerTemplate } from "./baseReducer";
import { Reducer } from "redux";

export interface IBookState {
    latestCharpter?: number;
    table?: TitleData[];
    content?: ContantData[];
}

let Book_HandlerMap:HandlerMap<IBookState> ={};

export let bookReducer: Reducer<IBookState,BaseAction> = (state ={}, action)=>{
    return reducerTemplate<IBookState>(state, action, Book_HandlerMap);
};


