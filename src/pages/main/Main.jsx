import React from 'react';
import './main.css';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Todos from '../../components/Todos/Todos';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: "",
            isModalOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.ctrlKey && (event.key === 'b' || event.key === 'B')) {
            event.preventDefault();
            this.openModal();
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeModal();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todos !== this.state.todos) {
            console.log('Todo updated');
        }
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    addNewTask = (taskData) => {
        this.setState(prevState => ({
            todos: [...prevState.todos, taskData]
        }));
        this.closeModal();
    }

    markAllTasksCompleted = () => {
        console.log("mark all tasks completed");
        this.setState(prevState => ({
            todos: prevState.todos.map(element => ({
                ...element,
                isCompleted: true
            }))
        }));
    }

    removeTask = (index) => {
        this.setState(prevState => ({
            todos: prevState.todos.filter((_, i) => i !== index)
        }));
    }

    updateTask = (index, updatedTask) => {
        this.setState(prevState => ({
            todos: prevState.todos.map((task, i) =>
                i === index ? { ...task, ...updatedTask } : task
            )
        }));
    }

    toggleTaskCompletion = (index) => {
        this.setState(prevState => ({
            todos: prevState.todos.map((task, i) =>
                i === index ? { ...task, isCompleted: !task.isCompleted } : task
            )
        }));
    }

    render() {
        const { isModalOpen, todos } = this.state;
        return (
            <div className='main'>
                {isModalOpen && <Modal closeModal={this.closeModal} addNewTask={this.addNewTask} />}
                <div className="main-container">
                    <div className="main-header">
                        <p className='main-header-heading'>ToDo App Using Class Components</p>
                    </div>
                    <div className='main-buttons'>
                        <Button className="button add-new-btn" value="Add New Task" onClick={this.openModal} />
                        <Button className="button complete-all-tasks-btn" value="Complete All Tasks" onClick={this.markAllTasksCompleted} />
                    </div>
                    <div className='main-todos-container'>
                        {todos.map((element, index) => (
                            <Todos
                                key={index}
                                index={index}
                                task={element}
                                removeTask={this.removeTask}
                                toggleTaskCompletion={this.toggleTaskCompletion}
                                updateTask={this.updateTask} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
