import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

class Comment extends Component {
    state = {
        text: ''
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    addComment = (event) => {
        event.preventDefault();
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

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Leave a comment</h2>
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} className="form-control" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Comment;