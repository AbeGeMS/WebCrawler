/// <reference path=".././../node_modules/@types/react/index.d.ts"/>
/// <reference path=".././../node_modules/@types/react-dom/index.d.ts"/>

module Abe.Client {
    export class searchPage extends React.Component<any, any>{
        public render() {
            return (
                <div>Hey, This is Search Page by react</div>
            );
        }
    }
}
let sPageProp = { }

ReactDOM.render(<Abe.Client.searchPage {...sPageProp}/>, document.getElementById("content-root"));