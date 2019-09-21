import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update } from './apiUser';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            loading: false
        }
    }

    isValid = () => {
        const { name, email, password } = this.state;
        if (name.length === 0) {
            this.setState({
                error: "Name is required."
            });

            return false;
        }

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            this.setState({
                error: "A valid email is required."
            });

            return false;
        }

        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long."
            });

            return false;
        }

        return true;
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToProfile: true
                    });
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        error: ""
                    });
                }
            })
            .catch(err => {
                this.setState({
                    redirectToProfile: true
                });
            });
    }


    handleChange = (name) => (event) => {
        this.setState({
            error: ""
        });
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        this.userData.set(name, value);
        this.setState({
            [name]: value
        });
    }

    clieckSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        if (this.isValid()) {
            const token = isAuthenticated().token;
            const userId = this.props.match.params.userId;

            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    });
                } else {
                    this.setState({
                        redirectToProfile: true
                    });
                }
            });
        }

    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);

    }


    signupForm = (name, email, password) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange("phpto")} type="file" accept="image/*" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <button onClick={this.clieckSubmit} className="btn btn-primary btn-raised">Update</button>
        </form>
    )

    render() {
        const { id, name, email, password, redirectToProfile, error, loading } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5" >Edit Profile</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : 'none' }} >{error}</div>
                {loading ? 
                    <div className="jumbotron text-center" >
                        <h2>Loading...</h2>
                    </div> 
                : ""}
                {this.signupForm(name, email, password)}

            </div>
        );
    }

}

export default EditProfile;