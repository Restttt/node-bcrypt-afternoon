import React, { Component } from 'react';
import Axios from 'axios';

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureURL: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureURL: e.target.value });
  }

  addTreasure() {
    const image = {
      img: this.state.treasureURL
    }
    Axios.post('/api/treasure/user', image).then(res => {
      this.setState({ treasureUrl: '' })
    }).catch(err => alert(err.response.request.response));
  };

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureURL}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
