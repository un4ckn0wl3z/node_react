import React, { Component } from 'react';
import { singlePost, update } from './apiPost';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import defaultPostImg from '../img/default-post.jpg';

class EditPost extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            body: '',
            redirectToProfile: false,
            error: "",
            fileSize: 0
        }
    }

    init = (postId) => {

        singlePost(postId)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToProfile: true
                    });
                } else {
                    this.setState({
                        id: data._id,
                        title: data.title,
                        body: data.body,
                        error: "",
                        loading: false
                    });
                }
            })
            .catch(err => {
                this.setState({
                    redirectToProfile: true
                });
            });
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);

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

    clickSubmit = event => {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({
                loading: true
            });
            const token = isAuthenticated().token;
            const postId = this.state.id;

            update(postId, token, this.postData).then(data => {
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

    editPostForm = (title, body) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Post Photo</label>
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
            <button onClick={this.clickSubmit} className="btn btn-primary btn-raised">Update Post</button>
        </form>
    )

    render() {
        const { id, title, body, redirectToProfile } = this.state;
        const photoUrl = id ? `${process.env.REACT_APP_API_POST_PHOTO_URL}/${id}?${new Date().getTime()}` : defaultPostImg;

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>
                <img onError={val => { val.target.src = `${defaultPostImg}` }} className="img-thumbnail" style={{ height: "200px", width: 'auto' }} src={photoUrl} alt={title} />

                {this.editPostForm(title, body)}
            </div>
        );
    }
}

export default EditPost;