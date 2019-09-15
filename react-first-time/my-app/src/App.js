import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    // state

    this.state = {
      users: [],
      loading: false
    }
  }

  getUsers(){
    this.setState({
      loading: true
    });
    axios('https://api.randomuser.me/?nat=US&results=5').then(res => {
      this.setState({
        users: res.data.results,
        loading: false
      });
    }).catch();
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        { !this.state.loading ? this.state.users.map(user => 
        <div>
          <h3>{user.name.first}</h3>
          <br />
          <p>{user.email}</p>
          <hr/>
        </div>) : 'Loading....'}
      </div>
    );
  }
}

export default App;
