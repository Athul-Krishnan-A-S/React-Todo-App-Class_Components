
import React from 'react';
import './todos.css';
import Button from '../button/Button';

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task.task,
            date: props.task.date,
            description: props.task.description,
            isEditing: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.task !== this.state.task || prevState.date !== this.state.date || prevState.description !== this.state.description) {
            const { index, updateTask } = this.props;
            const { task, date, description } = this.state;
            console.log('updating');
            updateTask(index, { task, date, description });
        }
    }

    toggleCompleteStatus = () => {
        this.props.toggleTaskCompletion(this.props.index);
    }

    handleRemove = () => {
        const { index, removeTask } = this.props;
        removeTask(index);
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleEditToggle = () => {
        this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
    render() {
        const { task, date, description, isEditing } = this.state;
        return (
            <div className='todos-card'>
                <div className='todos-task-data'>
                    {isEditing ? (
                        <div className='todos-task-data'>
                            <input
                                type='text'
                                name='task'
                                value={task}
                                onChange={this.handleInputChange}
                            />
                            <input
                                type='date'
                                name='date'
                                value={date}
                                onChange={this.handleInputChange}
                            />
                            <textarea
                                name='description'
                                value={description}
                                onChange={this.handleInputChange}
                                cols={60}
                                rows={10}
                                className='description'
                            />
                        </div>
                    ) : (
                        <div className='todos-task-data' >
                            <div>{task}</div>
                            <div>{date}</div>
                            <textarea
                                disabled
                                cols={60}
                                rows={10}
                                className='todos-description'>
                                {description}
                            </textarea>
                        </div>
                    )}
                </div>
                <div className='todos-buttons'>
                    <Button
                        value={this.props.task.isCompleted ? 'Completed' : 'Mark Completed'}
                        onClick={this.toggleCompleteStatus}
                        className={this.props.task.isCompleted ? 'completeBtn button' : 'markCompleteBtn button'}
                    />
                    {isEditing ? (
                        <>
                            <Button
                                value='Save'
                                onClick={this.handleEditToggle}
                                className='button saveButton'
                            />
                            <Button
                                value='Cancel'
                                onClick={this.handleEditToggle}
                                className='button cancelButton'
                            />
                        </>
                    ) : (
                        <>
                            <Button
                                value='Edit'
                                onClick={this.handleEditToggle}
                                className='button editButton'
                            />
                            <Button
                                value='Remove'
                                onClick={this.handleRemove}
                                className='button removeButton'
                            />
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default Todos;
