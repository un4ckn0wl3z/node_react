import React, { Component } from 'react';
import { singlePost } from './apiPost';
import { Link } from 'react-router-dom';
import defaultPostImg from '../img/default-post.jpg';

class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            post: ''
        }
        this.photoUrl = `${process.env.REACT_APP_API_POST_PHOTO_URL}`;
    }


    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data
                });
            }
        });
    }

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
        return (
            < div className="card col-md-4" >
                <div className="card-body">
                    <img className="img-thumbnail" style={{ height: "200px", width: 'auto' }}
                        onError={i => {
                            i.target.src = `${defaultPostImg}`
                        }}
                        src={`${this.photoUrl}/${post._id}?${new Date().getTime()}`}/>

                    <p className="card-text">{post.body}</p>
                    <br />
                    <p className="font-italic mark">
                        Posted by <Link to={`${posterId}`}>{posterName}</Link> on {new Date(post.created).toDateString()}
                    </p>
                    <Link to={`/`} className="btn btn-raised btn-sm btn-primary">Back</Link>
                </div>
            </div>
        );
    }

    render() {
        const { post } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5" >{post.title}</h2>
                {this.renderPost(post)}
            </div>
        );
    }
}

export default SinglePost;