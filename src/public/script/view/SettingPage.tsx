import React = require("react");
import { BaseComponent } from "./baseComponent";
import Constants = require("../model/constants");
import { Button } from "amazeui-dingtalk";

interface ISettingProp{

}

interface ISettingState{
    Content:string;
    Corrected:boolean;
}

export class SettingPage extends BaseComponent<ISettingProp, ISettingState>{
    public constructor(prop) {
        super(prop);
        this.OnContentChange = this.OnContentChange.bind(this);
        this.ChangeContent = this.ChangeContent.bind(this);
    }

    public render() {
        if (this.state && this.state.Corrected) {
            return <div>{this.state.Content}</div>
        } else{
            return (<div>
                <textarea onChange={this.OnContentChange}></textarea>
                <Button onClick={this.ChangeContent}>Change</Button>
                </div>);
        }
    }

    private OnContentChange(e:any){
        this.setState({ Content: e.target.value });
    }
    private ChangeContent(){
        let result = this.state.Content;
        result = Constants.CorrectionList.reduce(
            (pre, curr) => 
            pre.replace(new RegExp(curr.pattern, "gm"), curr.value), result);
        this.setState({Content:result, Corrected:true});
    }
}