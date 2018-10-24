import * as React from "react";
import { Notification } from "amazeui-dingtalk";
import { DingamStyle } from "../model/common";
import ReduxStore from "../model/dataContainer";
import { ChangeNotification } from "../model/constants";
import { NotifyAction } from "../model/notificationReducer";
import { BaseComponent } from "./baseComponent";
import reduxStore from "../model/dataContainer";

interface INotificationState {
    Message?: string;
    Style: DingamStyle | string;
    Visible: boolean;
}

export interface INotificationProp {
    Style?: string | DingamStyle,
    Message?: string;
    autoDismiss?: boolean;
}

export class NotificationControl extends BaseComponent<INotificationProp, INotificationState>{
    public constructor(prop) {
        super(prop);

        this.state = {
            Message: this.props.Message,
            Style: this.props.Style || DingamStyle.Primary,
            Visible: this.props.Message != null,
        };
        this.onMessageChange = this.onMessageChange.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    public componentDidMount() {
        this.unSubscribe.push(ReduxStore().subscribe(this.onMessageChange));
    }

    public componentWillUpdate() {
        if (this.state.Visible && this.props.autoDismiss === undefined || this.props.autoDismiss) {
            setTimeout(() => {
                this.closeNotification();
            }, 3000);
        }
    }

    public render() {
        return <Notification
            title={this.state.Message}
            amStyle={this.state.Style}
            visible={this.state.Visible}
            animated={true}
            onDismiss={this.closeNotification}
        />
    }

    private closeNotification() {
        let action: NotifyAction = {
            type: ChangeNotification,
            Message: null,
            IsVissible: false,
            Style: DingamStyle.Primary,
        };

        this.setState({ Visible: false }, () => { ReduxStore().dispatch(action) });
    }

    private onMessageChange() {
        let { notification } = ReduxStore().getState();
        let { NotifyMessage, NotifyStyle, IsVissible } = notification;

        if (IsVissible && this.state.Message !== NotifyMessage) {
            this.setState({ Message: NotifyMessage || "", Style: NotifyStyle, Visible: !!NotifyMessage && IsVissible })
        }
    }
}