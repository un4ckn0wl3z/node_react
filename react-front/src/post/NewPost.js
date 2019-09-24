import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { create } from './apiPost';
import { Redirect } from 'react-router-dom';
// import defaultProfileImg from '../img/default-user.png';

class NewPost extends Component {

    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        }
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;

        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb."
            });

            return false;
        }

        if (title.length === 0 || body.length === 0) {
            this.setState({
                error: "All fields are required."
            });

            return false;
        }

        return true;
    }


    handleChange = (name) => (event) => {
        this.setState({
            error: ""
        });

        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        this.postData.set(name, value);
        this.setState({
            [name]: value
        });

        if (name === 'photo') {
            let fileSize = undefined
           try {
               fileSize = event.target.files[0].size;
           } catch (error) {
               
           }
            this.setState({
                fileSize
            });
        }
    }

    clickSubmit = event => {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({
                loading: true
            });
            const token = isAuthenticated().token;
            const userId = isAuthenticated().user._id;

            create(userId, token, this.postData).then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    });
                } else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }

    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({
            user: isAuthenticated().user
        });
    }


    newPostForm = (title, body) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")} type="text" className="form-control" value={title} />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-primary btn-raised">Create Post</button>
        </form>
    )

    render() {
        const {
            title,
            body,
            photo,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />
        }

        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5" >Create a new post</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : 'none' }} >{error}</div>
                {loading ?
                    <div className="jumbotron text-center" >
                        <h2>Loading...</h2>
                    </div>
                    : ""}
                {this.newPostForm(title, body)}

            </div>
        );
    }

}

export default NewPost;