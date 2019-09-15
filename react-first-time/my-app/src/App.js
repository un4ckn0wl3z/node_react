import React, { Component } from 'react';
import axios from 'axios';
import { Loading } from './Loading';

class App extends Component {
  constructor(props) {
    super(props);
    // state

    this.state = {
      users: [],
      loading: false
    }

    // bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded.');
  }

  getUsers() {
    this.setState({
      loading: true
    });
    axios('https://api.randomuser.me/?nat=US&results=5').then(res => {
      this.setState({
        users: [...this.state.users, ...res.data.results],
        loading: false
      });
    }).catch();
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} >
          <input type="submit" value="load users" />
        </form>
        {!loading ? users.map(user =>
          <div key={user.id.value}  >
            <h3 style={{ color: 'red' }} >{user.name.first}</h3>
            <br />
            <p>{user.email}</p>
            <hr />
          </div>) : <Loading message="Hey hey hey" />}
      </div>
    );
  }
}

export default App;
