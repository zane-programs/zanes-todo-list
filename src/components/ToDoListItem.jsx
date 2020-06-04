import React from 'react';

class ToDoListItem extends React.Component {
  render() {
    return (
      <li>
        <input type="text" defaultValue={this.props.toDoMessage} placeholder={`To-Do Item #${this.props.num}`} />
        <button className="todo-item-remove">X</button>
      </li>
    );
  }
}

export default ToDoListItem;