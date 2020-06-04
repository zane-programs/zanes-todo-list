import React from 'react';
import shortid from 'shortid';
import ToDoListItem from './ToDoListItem';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    let itemsFromLocalStorage = localStorage.getItem("toDoItems");
    let items = (itemsFromLocalStorage === null) ? [] : JSON.parse(itemsFromLocalStorage);

    this.state = {
      toDoItems: items
    };
  }

  updateItemStorage() {
    localStorage.setItem("toDoItems", JSON.stringify(this.state.toDoItems));
  }

  addToDoItem() {
    let items = this.state.toDoItems.slice();
    items.push({
      message: "",
      key: shortid.generate(),
    });
    this.setState({
      toDoItems: items
    }, () => this.updateItemStorage());
  }

  updateToDoItem(id, message) {
    let items = this.state.toDoItems.slice();
    let idIndex = items.findIndex(item => item.key === id);
    items[idIndex].message = message;
    this.setState({
      toDoItems: items
    }, () => this.updateItemStorage());
  }

  removeToDoItem(id) {
    let items = this.state.toDoItems.slice().filter(item => item.key !== id);
    this.setState({
      toDoItems: items
    }, () => this.updateItemStorage());
  }

  render() {
    const toDoItemComponents = this.state.toDoItems.map((item, index) => {
      return (
        <ToDoListItem
          toDoMessage={item.message}
          key={item.key}
          id={item.key}
          num={index + 1}
          onChange={(id, message) => this.updateToDoItem(id, message)}
          onRemoveButtonClick={id => this.removeToDoItem(id)}
        />
      );
    });

    const message = (toDoItemComponents.length > 0) ? `${toDoItemComponents.length} items in todo list` : "Your list is empty. Add an item!";

    return (
      <>
        <p>{message}</p>
        <ol>
          {toDoItemComponents}
        </ol>
        <button onClick={() => this.addToDoItem()}>Add Item</button>
      </>
    );
  }
}

export default ToDoList;