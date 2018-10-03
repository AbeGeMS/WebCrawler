import { DingamStyle } from "./common";
import { BaseAction, HandlerMap, reducerTemplate } from "./baseReducer";
import { Reducer } from "redux";
import Constants = require("./constants");
import ReduxStore from "./dataContainer";

export function Notify(message: string, style: DingamStyle, vissible: boolean = true) {
    let newNotify: NotifyAction = {
        Message: message,
        Style: style,
        IsVissible: vissible,
        type: Constants.ChangeNotification,

    };

    ReduxStore().dispatch(newNotify);
}

export interface INotifyState {
    NotifyMessage?: string;
    NotifyStyle: string | DingamStyle;
    IsVissible: boolean;
}

export interface NotifyAction extends BaseAction {
    Message?: string;
    Style?: DingamStyle;
    IsVissible: boolean;
}

let Notification_HandlerMap: HandlerMap<INotifyState> = {
    [Constants.ChangeNotification]: changeNotification,
};

export let notificationReducer: Reducer<INotifyState, BaseAction> = (
    state = {
        NotifyMessage: null,
        NotifyStyle: DingamStyle.Primary,
        IsVissible: false
    },
     action) => {
    return reducerTemplate<INotifyState>(state, action, Notification_HandlerMap);
};

function changeNotification(state: INotifyState, action: NotifyAction) {
    if (action.type == Constants.ChangeNotification) {
        state.NotifyMessage = action.Message;
        state.NotifyStyle = action.Style;
        state.IsVissible = action.IsVissible;
    }

    return state;
}

