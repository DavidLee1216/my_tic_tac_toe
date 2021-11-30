import React from "react";
import Square from "./square";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    var matrix = [];
    for (let i = 0; i < 3; i++) {
      let arr = new Array(3).fill("");
      matrix.push(arr);
    }
    this.state = {
      status: "X",
      status_text: "Next player: X",
      status_matrix: matrix,
    };
  }
  checkWinner = (row, col, val) => {
    let maxlen = 0;
    let i = row,
      j = col;
    while (i > 0 && this.state.status_matrix[i - 1][j] === val) {
      i--;
    }
    while (i < 3 && this.state.status_matrix[i][j] === val) {
      i++;
      maxlen++;
    }
    if (maxlen >= 3) return true;
    i = row;
    j = col;
    while (j > 0 && this.state.status_matrix[i][j - 1] === val) j--;
    maxlen = 0;
    while (j < 3 && this.state.status_matrix[i][j] === val) {
      j++;
      maxlen++;
    }
    if (maxlen >= 3) return true;
    i = row;
    j = col;
    while (i > 0 && j > 0 && this.state.status_matrix[i - 1][j - 1] === val) {
      i--;
      j--;
    }
    maxlen = 0;
    while (i < 3 && j < 3 && this.state.status_matrix[i][j] === val) {
      i++;
      j++;
      maxlen++;
    }
    if (maxlen >= 3) return true;
    i = row;
    j = col;
    maxlen = 0;
    while (i > 0 && j < 2 && this.state.status_matrix[i - 1][j + 1] === val) {
      i--;
      j++;
    }
    while (i < 3 && j >= 0 && this.state.status_matrix[i][j] === val) {
      i++;
      j--;
      maxlen++;
    }
    if (maxlen >= 3) return true;
    let tie = 0;
    for (i = 0; i < 3; i++)
      for (j = 0; j < 3; j++) if (this.state.status_matrix[i][j] !== "") tie++;
    if (tie === 9) return undefined;
    return false;
  };
  squareClick = (row, col, status) => {
    if (this.state.status === "T" || this.state.status === "W") return;
    this.state.status_matrix[row][col] = status;
    let check_res = this.checkWinner(row, col, status);
    if (check_res === true) {
      this.setState({ status: "W" });
      this.setState({ status_text: "Winner: " + status });
    } else if (check_res === undefined) {
      this.setState({ status: "T" });
      this.setState({ status_text: "Tie" });
    } else if (this.state.status === "X") {
      this.setState({ status: "O" });
      this.setState({ status_text: "Next player: O" });
    } else if (this.state.status === "O") {
      this.setState({ status: "X" });
      this.setState({ status_text: "Next player: X" });
    }
  };
  reset = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) this.state.status_matrix[i][j] = "";
    }
    this.setState({ status: "X" });
    this.setState({ status_text: "Next player: X" });
  };
  render() {
    const items = this.state.status_matrix.map((elem, index) => (
      <div className="tilerow">
        {elem.map((e, i) => (
          <Square
            val={e}
            status={this.state.status}
            row={index}
            col={i}
            squareClick={this.squareClick}
          ></Square>
        ))}
      </div>
    ));
    return (
      <div>
        <div className="status">{this.state.status_text}</div>
        <div className="grid">{items}</div>
        <div>
          <button className="reset" type="button" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
