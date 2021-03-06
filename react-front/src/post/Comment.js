import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import defaultProfileImg from '../img/default-user.png';
import { Redirect } from 'react-router-dom';

class Comment extends Component {
    state = {
        text: '',
        error: '',
        redirectTLogin: false
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value,
            error: ''
        });
    }

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error: 'comment should not be empty and less than 150 characters long'
            });
            return false
        }
        return true;
    }

    addComment = (event) => {
        event.preventDefault();

        if (!isAuthenticated()) {
            this.setState({
                redirectTLogin: true
            });
            alert("Please sigin to comment");
            return;
        }
        if (this.isValid()) {
            const userId = isAuthenticated().user ? isAuthenticated().user._id : '';
            const postId = this.props.postId;
            const token = isAuthenticated().token ? isAuthenticated().token : '';

            comment(userId, token, postId, {
                text: this.state.text
            }).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({
                        text: ''
                    });
                    //dispatch comment
                    this.props.updateComments(data.comments);
                }
            });
        }


    }



    deleteComment = (comment) => {
        const userId = isAuthenticated().user ? isAuthenticated().user._id : '';
        const postId = this.props.postId;
        const token = isAuthenticated().token ? isAuthenticated().token : '';

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    }

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you sure you want to delete your comment.");
        if (answer) {
            this.deleteComment(comment);
        }
    }

    render() {
        const { comments } = this.props;
        const { error, redirectTLogin } = this.state;
        if (redirectTLogin) {
            return <Redirect to={`/signin`} />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Leave a comment</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : 'none' }} >{error}</div>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} className="form-control" value={this.state.text} />
                        <button className="btn btn-raised btn-success mt-2" >Post</button>
                    </div>
                </form>
                <div className="col-md-12">
                    <h3 className="text-primary" >{comments.length} Comments</h3>
                    <hr />
                    {comments.map((comment, i) => {
                        const posterId = comment.postedBy ? `/user/${comment.postedBy._id}` : "";

                        return (
                            <div key={i} >

                                <div>
                                    <Link to={`/user/${comment.postedBy._id}`}>
                                        <img
                                            style={{ borderRadius: "50%", border: '1px solid black' }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={val => { val.target.src = `${defaultProfileImg}` }}
                                            alt={comment.postedBy.name}
                                            src={`${process.env.REACT_APP_API_PHOTO_URL}/${comment.postedBy._id}?${new Date().getTime()}`} />
                                    </Link>
                                    <div>
                                        <p className="lead">{comment.text.substring(0, 50) + '...'}</p>
                                        <br />
                                        <p className="font-italic mark">
                                            Posted by <Link to={`${posterId}`}>{comment.postedBy.name}</Link> on {new Date(comment.created).toDateString()}
                                            <span>
                                                {
                                                    isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id
                                                    && (
                                                        <>
                                                            <span style={{ cursor: "pointer" }} onClick={() => {
                                                                this.deleteConfirmed(comment);
                                                            }} className="text-danger float-right mr-1">Remove</span>
                                                        </>
                                                    )
                                                }
                                            </span>
                                        </p>
                                    </div>

                                </div>

                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        );
    }
}

export default Comment;