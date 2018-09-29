import { HandlerMap, BaseAction, reducerTemplate } from "./baseReducer";
import { Reducer } from "redux";
import Constants = require("./constants");
import { ICorrection } from "../../../lib/typings/dataModel";

let Settings_HandlerMap:HandlerMap<ISettingsState> ={};

export interface ISettingsState {
    corrections?: ICorrection[];
}

export let settingsReducer: Reducer<ISettingsState, BaseAction> = (state = { corrections: Constants.CorrectionList }, action) => {
    return reducerTemplate<ISettingsState>(state, action, Settings_HandlerMap);
};

