import { Reducer } from "redux";

// State
export interface IBaseState {
    status?:RequestStatus;
}

// Action
export interface BaseAction {
    type: string;
    status?: RequestStatus; 
}

export enum RequestStatus{
    Start,
    Success,
    Failed,
}


export type HandlerMap<T> = { [actionType: string]: Reducer<T, BaseAction> };

export function reducerTemplate<T>(state: T, action: BaseAction, handlers: HandlerMap<T>): T {
    let handler = handlers[action.type];

    return handler ? handler(state, action) : state;
}

