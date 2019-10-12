import React, { Component } from 'react';
import { singlePost, remove } from './apiPost';
import { Link } from 'react-router-dom';
import defaultPostImg from '../img/default-post.jpg';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';

class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            post: '',
            userAuth: '',
            redirectToHome: false,

        }
        this.photoUrl = `${process.env.REACT_APP_API_POST_PHOTO_URL}`;
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        const userAuth = isAuthenticated().user;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({
                    redirectToHome: true
                });
            } else {
                this.setState({
                    post: data,
                    userAuth
                });
            }
        });
    }

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    redirectToHome: true
                });
            }
        });
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account.");
        if (answer) {
            this.deletePost();
        }
    }

    renderPost = (post, isAuth) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
        return (
            <div className="card-body">
                <img className="img-thumbnail" style={{ height: "200px", width: '100%', objectFit: 'cover' }}
                    onError={i => {
                        i.target.src = `${defaultPostImg}`
                    }}
                    src={`${this.photoUrl}/${post._id}?${new Date().getTime()}`} />

                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName}</Link> on {new Date(post.created).toDateString()}
                </p>
                <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">Back</Link>
                {isAuth && (
                    <>
                        <button className="btn btn-raised btn-sm btn-warning mr-5">Update</button>
                        <button onClick={this.deleteConfirmed} className="btn btn-raised btn-sm btn-danger">Delete</button>
                    </>
                )}

            </div>

        );
    }

    render() {
        const { post, userAuth, redirectToHome } = this.state;
        const uid = userAuth._id;
        const pid = post.postedBy ? `${post.postedBy._id}` : "";
        let isAuth = false;
        if (uid === pid) {
            isAuth = true
        }
        if (redirectToHome) {
            return <Redirect to={`/`} />
        }
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5" >{post.title}</h2>
                {!post ?
                    <div className="jumbotron text-center" >
                        <h2>Loading...</h2>
                    </div>
                    : ""}
                {this.renderPost(post, isAuth)}
            </div>
        );
    }
}

export default SinglePost;