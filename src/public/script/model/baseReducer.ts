import { Reducer } from "redux";

// Action
export interface BaseAction {
    type: string;
}


export type HandlerMap<T> = { [actionType: string]: Reducer<T, BaseAction> };

export function reducerTemplate<T>(state: T, action: BaseAction, handlers: HandlerMap<T>): T {
    let handler = handlers[action.type];

    return handler ? handler(state, action) : state;
}

