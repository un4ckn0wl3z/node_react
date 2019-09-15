import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    // state

    this.state = {
      users: []
    }

  }

  componentWillMount() {
    axios('https://api.randomuser.me/?nat=US&results=5').then(res => {
      this.setState({
        users: res.data.results
      });
    }).catch();
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => <div><h3>{user.name.first}</h3></div>)}
      </div>
    );
  }
}

export default App;
