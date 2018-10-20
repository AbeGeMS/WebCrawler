import * as React from "react";
import { Unsubscribe } from "redux";

export class BaseComponent<T,S> extends React.Component<T,S>{
    protected unSubscribe:Unsubscribe[]=[];

    public componentWillUnmount(){
        if(this.unSubscribe){
            this.unSubscribe.forEach(unSub=>unSub());
        }
    }
}