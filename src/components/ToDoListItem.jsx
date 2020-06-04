import React from 'react';

class ToDoListItem extends React.Component {
  render() {
    return (
      <li>
        <input
          type="text"
          defaultValue={this.props.toDoMessage}
          placeholder={`To-Do Item #${this.props.num}`}
          onChange={event => this.props.onChange(this.props.id, event.target.value)}
        />
        <button
          className="todo-item-remove"
          onClick={() => this.props.onRemoveButtonClick(this.props.id)}
        >
          X
        </button>
      </li>
    );
  }
}

export default ToDoListItem;