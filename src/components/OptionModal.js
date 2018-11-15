import React from 'react';
import Modal from 'react-modal';
import IndecisionApp from './IndecisionApp';

const OptionModal = (props) => (
       <Modal
       isOpen={!!props.selectedOption}
       onRequestClose ={props.handleClose}
       contentLabel = "Selected Option"
       closeTimeout={200}
       className="modal"
       >
            <h3 className="modal__title">Selected Option</h3>
            {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
            <button 
            className="button"
            onClick={props.handleClose}
            >
            Close
            </button>
       </Modal>
);

export default OptionModal;

