import React from "react";
import './modal.css';
import Button from "../button/Button";

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: '',
            date: '',
            description: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { task, date, description } = this.state;
        const isCompleted = false;
        this.props.addNewTask({
            task, date, description, isCompleted
        });
        this.setState({
            task: '', date: '', description: ''
        });
    }

    render() {
        const { task, date, description } = this.state;
        return (
            <div className="modal-container">
                <div className="modal">
                    <div className="modal-header">
                        <Button value="X" onClick={this.props.closeModal} className="button close-button x" />
                    </div>
                    <form className="modal-form" method="post" onSubmit={this.handleSubmit}>
                        <input type="text"
                            placeholder="Task"
                            value={task}
                            onChange={this.handleChange}
                            name="task"
                        />
                        <input type="date"
                            placeholder="Date"
                            value={date}
                            onChange={this.handleChange}
                            name="date"
                        />
                        <textarea placeholder="Description"
                            rows={15}
                            value={description}
                            onChange={this.handleChange}
                            name="description"
                            className="description"
                        />
                        <Button type="submit" value="Add New Task" className="button add-new-btn" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Modal;
