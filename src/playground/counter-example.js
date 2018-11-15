class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.plusOne = this.plusOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {
            count: 0
        };
    }

    componentDidMount(){
         //fetching data
         try {
            const json = localStorage.getItem("count");  
            const number = JSON.parse(json);
            const numberAsInt = parseInt(number, 10);
            if(numberAsInt){
                this.setState(() => ({count: numberAsInt}));
            }
        } catch(e){
            //Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.count !== this.state.count){
            const json = JSON.stringify(this.state.count); 
            localStorage.setItem("count", json);
        }
    }

    plusOne(){
        this.setState((prevState) => {
            return{
                count: prevState.count + 1
            }
        });
    }

    minusOne(){
        this.setState((prevState) => {
            return{
                count: prevState.count - 1
            }
        });
    }

    reset() {
        this.setState(() => {
            return{
                count: 0
            }
        });
        this.setState
    }

    render() { 
        return ( 
            <div>
              <h1>Count: {this.state.count}</h1>
              <button onClick={this.plusOne}>+1</button>
              <button onClick={this.minusOne}>-1</button>
              <button onClick={this.reset}>Reset</button>
            </div>
         );
    }
}

ReactDOM.render(<Counter />, document.getElementById("app"));




// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
// };
// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };
// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };


// const renderCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//      );

//      ReactDOM.render(templateTwo, appRoot);
// }

// renderCounterApp();