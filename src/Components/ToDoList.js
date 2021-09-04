import React, { Component } from "react";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tdlId: 0,
      tdlName: "",
      tdlPriority: "",
      tdlFav: "",
      tdlDate: "",
      tdlProgress: 0,
      tdlList: [],
    };
  }

  tdlNameChange(value) {
    this.setState({
      tdlName: value,
    });
  }

  tdlPriorityChange(value) {
    this.setState({
      tdlPriority: value,
    });
  }

  tdlDateChange(value) {
    this.setState({
      tdlDate: value,
    });
  }

  addToDo(task, priority, date) {
    let listCopy = this.state.tdlList;
    listCopy.push({
      tdlId: listCopy.length,
      tdlName: task === "" ? "Edit task name" : task,
      tdlPriority: priority === "" ? "Low" : priority,
      tdlDate: date == null ? new Date().getDate() : date,
      tdlProgress: 0,
      tdlIsFav: false,
    });
    this.setState({ tdlList: listCopy });
  }

  deleteToDo(tdlId) {
    let listCopy = this.state.tdlList;
    let newList = [];

    for (let i = 0; i < listCopy.length; i++) {
      if (listCopy[i].tdlId !== tdlId) {
        newList.push(listCopy[i]);
      }
    }

    this.setState({ tdlList: newList });
  }

  changeFav(tdlId) {
    let listCopy = this.state.tdlList;
    for (let i = 0; i < listCopy.length; i++) {
      if (listCopy[i].tdlId == tdlId) {
        listCopy[i].tdlIsFav = listCopy[i].tdlIsFav == true ? false : true;
      }
    }

    this.setState({ tdlList: listCopy });
  }
  render() {
    return (
      <div className="my-Container">
        <div className="my-Content">
          <h2 className="logo-text">TO-DO-LIST</h2>

          <div className="tdl-add">
            <div className="tdl-add-form">
              <input
                onChange={(e) => this.tdlNameChange(e.target.value)}
                value={this.state.tdlName}
                type="text"
                placeholder="Task"
              ></input>
              <select onChange={(e) => this.tdlPriorityChange(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input
                onChange={(e) => this.tdlDateChange(e.target.value)}
                value={this.state.tdlDate}
                type="date"
              ></input>
              <button
                onClick={(e) =>
                  this.addToDo(
                    this.state.tdlName,
                    this.state.tdlPriority,
                    this.state.tdlDate
                  )
                }
                className="btn-add"
              >
                Add
              </button>
            </div>
          </div>

          <div className="tdl-section">
            <h4>Task</h4>
            <h4 className="tdl-section-hide">Due Date</h4>
            <h4 className="tdl-section-hide">Priority</h4>
            <h4 className="tdl-section-hide">Progress</h4>
            <h4 className="tdl-section-hide">Favorite</h4>
          </div>

          <div className="tdl-div">
            {this.state.tdlList.map((tdl) => (
              <div className="tdl-section tdl-item">
                <h5>{tdl.tdlName}</h5>
                <h5 className="tdl-section-hide">{tdl.tdlDate}</h5>
                <h5 className="tdl-section-hide">{tdl.tdlPriority}</h5>
                <h5 className="tdl-section-hide">{tdl.tdlProgress}%</h5>
                <h5  className="tdl-section-hide">
                  <button
                    className="btn-CRUD"
                    onClick={(e) => this.changeFav(tdl.tdlId)}
                  >
                    <img
                      src={
                        tdl.tdlIsFav == true
                          ? "https://img.icons8.com/fluency/24/000000/star.png"
                          : "https://img.icons8.com/plumpy/24/000000/star--v1.png"
                      }
                      alt="favorite icon"
                    />
                  </button>
                </h5>
                <h5>
                  <button className="btn-CRUD">
                    <img
                      src="https://img.icons8.com/color/20/000000/edit--v1.png"
                      alt="edit icon"
                    />
                  </button>
                  &nbsp;
                  <button
                    className="btn-CRUD"
                    onClick={(e) => this.deleteToDo(tdl.tdlId)}
                  >
                    <img
                      src="https://img.icons8.com/color/20/000000/delete-sign--v1.png"
                      alt="delete icon"
                    />
                  </button>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
