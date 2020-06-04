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
    let items = this.state.toDoItems.filter(item => item.key !== id);
    this.setState({
      toDoItems: items
    }, () => this.updateItemStorage());
  }

  clearItems() {
    this.setState({
      toDoItems: []
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

    // plural and is vs. are
    const toBeConjugation = (toDoItemComponents.length === 1) ? "is" : "are";
    const itemWordEnding = (toDoItemComponents.length === 1) ? "" : "s";
    const message = (toDoItemComponents.length > 0) ? `There ${toBeConjugation} ${toDoItemComponents.length} item${itemWordEnding} in todo list` : "Your list is empty. Add an item!";
    
    // not sure if this is best practice. this is for bottom buttons
    const bottomButtons = (toDoItemComponents.length > 0) ? (
      <>
        <button onClick={() => this.addToDoItem()}>Add Item</button>
        <button onClick={() => this.clearItems()}>Clear List</button>
      </>
    ) : null;

    return (
      <>
        <p>{message}</p>
        <button onClick={() => this.addToDoItem()}>Add Item</button>
        <ol>
          {toDoItemComponents}
        </ol>
        <div className="todo-bottom-buttons">
          {bottomButtons}
        </div>
      </>
    );
  }
}

export default ToDoList;