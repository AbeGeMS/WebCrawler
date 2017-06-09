/// <reference path=".././../node_modules/@types/react/index.d.ts"/>
/// <reference path=".././../node_modules/@types/react-dom/index.d.ts"/>
/// <reference path="dataProvider.ts"/>

module Abe.Client {
    interface searchPageState {
        searchValue: string;
        content: string;
    }

    export class searchPage extends React.Component<any, searchPageState>{
        public componentDidMount() {
        }
        public state = {
            searchValue: "",
            content:"",
        };
        public render() {
            let inputProp: React.HTMLProps<HTMLElement> = {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ searchValue: e.target.value }),
            };
            let btnProp: React.HTMLProps<HTMLElement> = {

                onClick: () => {
                    let provider = new Abe.Client.dataProvider();
                    provider.getbookTableOfContent(this.state.searchValue)
                        .then(c => this.setState({ content: c }));
                },
            }
            return (
                <div>
                    <span>
                        <input {...inputProp} />
                        </span>
                    <span>
                        <button {...btnProp} >Search</button>
                    </span>
                    <div>
                        {JSON.stringify(this.state.content)}
                    </div>
                </div>
                

            );
        }
    }
}
let sPageProp = { }

ReactDOM.render(<Abe.Client.searchPage {...sPageProp}/>, document.getElementById("content-root"));