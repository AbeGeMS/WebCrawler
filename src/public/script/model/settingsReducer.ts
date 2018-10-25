import { HandlerMap, BaseAction, reducerTemplate, IBaseState, RequestStatus } from "./baseReducer";
import { Reducer } from "redux";
import { ICorrection } from "../../../lib/typings/dataModel";
import { Notify, NotifyAsync } from "./notificationReducer";
import { DingamStyle } from "./common";
import { SettingsModel } from "./settingsModel";
import Constants = require("./constants");
import ReduxStore from "./dataContainer";

let Settings_HandlerMap: HandlerMap<ISettingsState> = {
    [Constants.SetBookDomain_Request]: setBookDomain_Request,
    [Constants.SetBookDomain_Response]: setBookDomain_Response,
    [Constants.SetCorrectionList]: setCorrectionList,
};

export interface ISettingsState extends IBaseState {
    corrections?: ICorrection[];
    bookDomain?: string;
}

export let settingsReducer: Reducer<ISettingsState, BaseAction> = (state = { bookDomain: null, corrections: Constants.CorrectionList }, action) => {
    return reducerTemplate<ISettingsState>(state, action, Settings_HandlerMap);
};

export interface SetBookDomainAction_Request extends BaseAction {
    bookDomain: string;
}

export interface SetBookDomainAction_Response extends BaseAction {
    message: string;
}

export interface SetCorrectionListAction extends BaseAction {
    addRule?: ICorrection[];
    deleteRuleIndex?: number;
}

function setBookDomain_Request(state: ISettingsState, action: SetBookDomainAction_Request): ISettingsState {
    if (action.type == Constants.SetBookDomain_Request) {
        let settings = new SettingsModel();
        settings.setBookDomain(action.bookDomain).then(message => {
            ReduxStore().dispatch({
                type: Constants.SetBookDomain_Response,
                message: message,
                status: RequestStatus.Success
            })
        });
        NotifyAsync(`Load ${action.bookDomain} starting...`, DingamStyle.Secondary, true);
    }

    return { ...state, status: RequestStatus.Start };
}

function setBookDomain_Response(state: ISettingsState, action: SetBookDomainAction_Response): ISettingsState {
    if (action.type == Constants.SetBookDomain_Response) {
        NotifyAsync(`BookDomain: ${action.message} was set into cookie.`, DingamStyle.Success, true);
        return { ...state, status: action.status };
    }

    return { ...state };
}

function setCorrectionList(state: ISettingsState, action: SetCorrectionListAction): ISettingsState {
    if (action.type !== Constants.SetCorrectionList) {
        return { ...state };
    }

    if (action.addRule && action.addRule.length > 0) {
        state.corrections.push(...action.addRule);
        return { ...state };
    }

    if (!!action.deleteRuleIndex && action.deleteRuleIndex > -1) {
        state.corrections.splice(action.deleteRuleIndex, 1);
        return {...state};
    }

    return { ...state };
}

