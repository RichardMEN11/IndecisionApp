class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeletOption = this.handleDeletOption.bind(this);
        this.state = {
            options: []
        }
    }
    
    componentDidMount(){
        //fetching data
        try {
            const json = localStorage.getItem("options");  
            const options = JSON.parse(json);
    
            if(options){
                this.setState(() => ({options: options}));
            }
        } catch(e){
            //Do nothing
        }
       
        
    }

    componentDidUpdate(prevProps, prevState){
          //saving data in local storage
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options); 
            localStorage.setItem("options", json);
        }
    }

    handleDeleteOptions(){
        this.setState(() => ({ options: []}));
    }

    handleDeletOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
            }));
    }

    handlePick() {
        alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
    }

    handleAddOption(option){
        if(!option) {
            return "Enter a valid value"
        } else if (this.state.options.indexOf(option) > -1){
            return "This option already exits"
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option)}));
    }

    render() { 
        const title = "Indecision",
              subTitle = "Put your hands into the hands of a computer";

        return (  
            <div>
             <Header subTitle={subTitle}/>
             <Action 
             hasOptions={this.state.options.length > 0} 
             handlePick={this.handlePick}
             />
             <Options 
             options={this.state.options}
             handleDeleteOptions={this.handleDeleteOptions}
             handleDeletOption={this.handleDeletOption}
             />
             <AddOptions
             handleAddOption={this.handleAddOption}
             />
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: "Indecision",
};

const Action = (props) => {
    return (
        <div>
            <button 
            onClick={props.handlePick}
            disabled={!props.hasOptions}
            >
            What should I do?
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option to get started</p>}
         {
           props.options.map((option) => (
            <Option 
            key={option} optionText={option}
            handleDeletOption={props.handleDeletOption}
            />
            ))
         } 
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
             <p>{props.optionText}</p>
             <button
             onClick={() => {
                props.handleDeletOption(props.optionText);
             }}
             >
             remove
             </button>
        </div>
     );
}

class AddOptions extends React.Component {
    constructor(props){
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            error: undefined
        }
    }

    submitHandler(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        if(!error){
            e.target.elements.option.value = "";
        }
    }

    render() { 
        return ( 
            <div>
                { this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.submitHandler}>
                <input type="text" name="option"/>
                <button>Add option</button>
                </form>
            </div>
         );
        }
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));