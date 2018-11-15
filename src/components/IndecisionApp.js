import React from 'react';
import ReactDOM from 'react-dom';
import AddOptions from './AddOptions';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handlePick = () => {
        const option = this.state.options[Math.floor(Math.random() * this.state.options.length)]
        this.setState((prevState) => ({ selectedOption: option }));
    };

    handleAddOption = (option) => {
        if (!option) {
            return "Enter a valid value"
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exits"
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    };

    handleDeletOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };

    handleClose = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    componentDidMount() {
        //fetching data
        try {
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options: options }));
            }
        } catch (e) {
            //Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //saving data in local storage
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }

    render() {
        const title = "Indecision",
            subTitle = "Put your hands into the hands of a computer";

        return (
            <div>
                <Header subTitle={subTitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                    <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeletOption={this.handleDeletOption}
                />
                <AddOptions
                    handleAddOption={this.handleAddOption}
                />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }
}

export default IndecisionApp;