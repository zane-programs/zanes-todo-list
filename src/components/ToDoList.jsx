import React from 'react';
import shortid from 'shortid';
import ToDoListItem from './ToDoListItem';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: [
        {
          message: "Wash the dishes",
          key: shortid.generate(),
        },
        {
          message: "Feed the cats",
          key: shortid.generate(),
        },
        {
          message: "And another one",
          key: shortid.generate(),
        }
      ]
    };
  }

  addToDoItem() {
    let items = this.state.toDoItems.slice();
    items.push({
      message: "",
      key: shortid.generate(),
    });
    this.setState({
      toDoItems: items
    });
  }

  render() {
    const toDoItemComponents = this.state.toDoItems.map((item, index) => {
      return (
        <ToDoListItem
          toDoMessage={item.message}
          key={item.key}
          num={index + 1}
        />
      );
    });

    return (
      <>
        <ul>
          {toDoItemComponents}
        </ul>
        <button onClick={() => this.addToDoItem()}>Add Item</button>
      </>
    );
  }
}

export default ToDoList;