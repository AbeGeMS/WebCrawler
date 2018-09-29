import { DingamStyle } from "./common";
import { BaseAction, HandlerMap, reducerTemplate } from "./baseReducer";
import { Reducer } from "redux";
import Constants = require("./constants");

export interface INotifyState {
    NotifyMessage?: string;
    NotifyStyle: string | DingamStyle;
}

export interface NotifyAction extends BaseAction {
    message?: string;
    sytle?: DingamStyle;
}

let Notification_HandlerMap: HandlerMap<INotifyState> = {
    [Constants.changeNotification]: changeNotification,
};

export let notificationReducer: Reducer<INotifyState, BaseAction> = (state = { NotifyMessage: null, NotifyStyle: DingamStyle.Primary }, action) => {
    return reducerTemplate<INotifyState>(state, action, Notification_HandlerMap);
};

function changeNotification(state: INotifyState, action: NotifyAction) {
    if (action.type == Constants.changeNotification) {
        state.NotifyMessage = action.message;
        state.NotifyStyle = action.sytle;
    }

    return state;
}

