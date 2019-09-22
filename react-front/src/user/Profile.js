import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import defaultProfileImg from '../img/default-user.png';
import DeleteUser from './DeleteUser';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }



    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToSignin: true
                    });
                } else {
                    this.setState({
                        user: data
                    });
                }
            })
            .catch(err => {
                this.setState({
                    redirectToSignin: true
                });
            });
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);

    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);

    }

    render() {
        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id ? `${process.env.REACT_APP_API_PHOTO_URL}/${user._id}?${new Date().getTime()}` : defaultProfileImg;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5" >Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img onError={val => { val.target.src = `${defaultProfileImg}` }} className="img-thumbnail" style={{ height: "200px", width: 'auto' }} src={photoUrl} alt={user.name} />
                    </div>
                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {
                            isAuthenticated().user && isAuthenticated().user._id === user._id
                            && (
                                <div className="d-inline-black mt-5">
                                    <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-5">Edit Profile</Link>
                                    <DeleteUser userId={user._id} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr/>
                        <p className="lead">{user.about}</p>
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;