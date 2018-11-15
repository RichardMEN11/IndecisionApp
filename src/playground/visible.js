class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false
        }
        this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
    }

    handleVisibilityToggle(e) {
        e.preventDefault();
        this.setState((prevState) => {
            return{
                visible: !prevState.visible
            }
        });
    }

    render() { 
        return ( 
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleVisibilityToggle}>{this.state.visible? "Show": "Hide"}</button>
                <p>{this.state.visible? "Hello World" : undefined}</p>
            </div>
         );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));