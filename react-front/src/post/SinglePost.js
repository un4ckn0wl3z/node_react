import React, { Component } from 'react';
import { singlePost, remove, like, unlike } from './apiPost';
import { Link } from 'react-router-dom';
import defaultPostImg from '../img/default-post.jpg';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import Comment from './Comment';

class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            post: '',
            userAuth: '',
            redirectTLogin: false,
            redirectToHome: false,
            like: false,
            likes: 0,
            comments: []

        }
        this.photoUrl = `${process.env.REACT_APP_API_POST_PHOTO_URL}`;
    }

    checkLike = (likes) => {
        const userId = isAuthenticated().user ? isAuthenticated().user._id : '';
        let match = likes.indexOf(userId) !== -1;
        return match;
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
                    userAuth,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
            }
        });
    }

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({
                redirectTLogin: true
            });
            return;
        }

        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;
        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    }

    updateComments = (comments) => {
        this.setState({
            comments
        })
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
        const { like, likes } = this.state;
        return (
            <div className="card-body">
                <img className="img-thumbnail" style={{ height: "200px", width: '100%', objectFit: 'cover' }}
                    onError={i => {
                        i.target.src = `${defaultPostImg}`
                    }}
                    src={`${this.photoUrl}/${post._id}?${new Date().getTime()}`} />
                <div className="mt-2">
                    {like ? (
                        <h3 onClick={this.likeToggle}>
                            <i className="fa fa-thumbs-up text-success bg-dark" style={{ padding: '10px', borderRadius: '50%' }} />{" "}
                            {likes} Like
                        </h3>
                    ) : (
                            <h3 onClick={this.likeToggle}>
                                <i className="fa fa-thumbs-up text-warning bg-dark" style={{ padding: '10px', borderRadius: '50%' }} />{" "}
                                {likes} Like
                        </h3>
                        )

                    }
                </div>
                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName}</Link> on {new Date(post.created).toDateString()}
                </p>
                <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">Back to posts</Link>
                {isAuth && (
                    <>
                        <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-warning mr-5">Update Post</Link>
                        <button onClick={this.deleteConfirmed} className="btn btn-raised btn-sm btn-danger">Delete Post</button>
                    </>
                )}

            </div>

        );
    }

    render() {
        const { post, userAuth, redirectToHome, redirectTLogin, comments } = this.state;
        if (redirectTLogin) {
            return <Redirect to={`/signin`} />
        }
        if (redirectToHome) {
            return <Redirect to={`/`} />
        }
        const uid = userAuth ? userAuth._id : '';
        const pid = post.postedBy ? `${post.postedBy._id}` : "";
        let isAuth = false;
        if (uid === pid) {
            isAuth = true
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
                <Comment postId={post._id} comments={comments} updateComments={this.updateComments} />
            </div>
        );
    }
}

export default SinglePost;