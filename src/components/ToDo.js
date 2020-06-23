import React from "react";
import ToDoForm from "./ToDoForm";
import Item from "./Item";

export default class ToDo extends React.Component {
  state = {
    toDos: [],
    howManyActive: 0,
    filter: "all",
  };

  addToDo = (toDo) => {
    this.setState({
      toDos: [toDo, ...this.state.toDos],
      howManyActive: this.state.howManyActive + 1,
    });
  };

  toggleComplete = (id) => {
    this.setState({
      toDos: this.state.toDos.map((toDo) => {
        // If we find the one that we're supposed to update, we do so
        if (toDo.id == id) {
          if (toDo.complete) {
            this.setState({
              howManyActive: this.state.howManyActive + 1,
            });
          } else {
            this.setState({
              howManyActive: this.state.howManyActive - 1,
            });
          }
          return {
            ...toDo,
            complete: !toDo.complete,
          };
        } else {
          return toDo;
        }
      }),
    });
  };

  changeFilter = (newState) => {
    this.setState({
      filter: newState,
    });
  };

  delete = (id) => {
    let newArray = [];
    this.state.toDos.map((toDo) => {
      if (toDo.id != id) {
        newArray.push(toDo);
      }
    });

    console.log(JSON.stringify(newArray));

    this.setState({
      toDos: newArray,
    });
  };

  deleteCompleted = () => {
    this.setState({
      toDos: this.state.toDos.filter((toDo) => !toDo.complete),
    });
  };

  render() {
    let filteredList = [];
    if (this.state.filter === "all") {
      filteredList = this.state.toDos;
    } else if (this.state.filter === "active") {
      filteredList = this.state.toDos.filter((toDo) => !toDo.complete);
    } else {
      filteredList = this.state.toDos.filter((toDo) => toDo.complete);
    }
    return (
      <div>
        <ToDoForm onSubmit={this.addToDo}></ToDoForm>
        {filteredList.map((toDo) => (
          <Item
            key={toDo.id}
            text={toDo.text}
            complete={toDo.complete}
            toggleComplete={() => this.toggleComplete(toDo.id)}
            delete={() => this.delete(toDo.id)}
          ></Item>
        ))}
        <p>
          There are {this.state.howManyActive} number of items to be completed
        </p>

        <div>
          <button onClick={() => this.changeFilter("all")}>All</button>
          <button onClick={() => this.changeFilter("completed")}>
            Completed
          </button>
          <button onClick={() => this.changeFilter("active")}>Active</button>
        </div>

        {this.state.toDos.filter((toDo) => toDo.complete).length != 0 ? (
          <div>
            <button onClick={this.deleteCompleted}>Delete all completed</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
