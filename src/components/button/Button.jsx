import React from 'react';
import './button.css';

class Button extends React.Component {
    render() {
        return (
            <button className={this.props.className} onClick={this.props.onClick}>{this.props.value}</button>
        )
    }
}
export default Button;