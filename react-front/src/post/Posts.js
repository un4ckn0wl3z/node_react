import React, { Component } from 'react';
import { list } from './apiPost';
// import defaultProfileImg from '../img/default-user.png';
import { Link } from 'react-router-dom';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }

        this.photoUrl = `${process.env.REACT_APP_API_PHOTO_URL}`;
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    posts: data
                });
            }
        });
    }

    renderPosts = (posts) => (
        <div className="row">
            {
                posts.map((post, i) =>
                    (

                        <div key={i} className="card col-md-4">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm btn-primary">Read more</Link>
                            </div>
                        </div>
                    )
                )

            }
        </div>
    )

    render() {
        const { posts } = this.state;
        return (
            <div className="container" >
                <h2 className="mt-5 mb-5" >Recent Posts</h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;