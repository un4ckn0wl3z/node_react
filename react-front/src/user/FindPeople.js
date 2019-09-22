import React, { Component } from 'react';
import { findPeople, follow } from './apiUser';
import defaultProfileImg from '../img/default-user.png';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false,
            followMessage: ""
        }

        this.photoUrl = `${process.env.REACT_APP_API_PHOTO_URL}`;
    }

    clickFollow = (user, index) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(index, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
            //

        });
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    users: data
                });
            }
        });
    }

    renderUsers = (users) => (
        <div className="row">
            {
                users.map((user, i) =>
                    (

                        <div key={i} className="card col-md-4">
                            <img className="img-thumbnail" style={{ height: "200px", width: 'auto' }}
                                onError={i => {
                                    i.target.src = `${defaultProfileImg}`
                                }}
                                src={`${this.photoUrl}/${user._id}?${new Date().getTime()}`} alt={user.name} />
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                                <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
                                <button onClick={() => this.clickFollow(user, i)} className="btn btn-info btn-raised float-right btn-sm">Follow</button>

                            </div>
                        </div>
                    )
                )

            }
        </div>
    )

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container" >
                <h2 className="mt-5 mb-5" >Find People</h2>
                {
                    open && (
                        <div className="alert alert-success">
                            <p>{followMessage}</p>
                        </div>
                    )
                }
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;