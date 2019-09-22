import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultProfileImg from '../img/default-user.png';

class ProfileTabs extends Component {

    render() {
        const { following, followers } = this.props;
        return (
            <div>
                <div className="row" >
                    <div className="col-md-4">
                        <h3 className="text-primary" >Followers</h3>
                        <hr />
                        {followers.map((person, i) =>
                            (
                                <div key={i} >
                                    <div className="row">
                                        <div>
                                            <Link to={`/user/${person._id}`}>
                                                <img
                                                    className="float-left mr-2"
                                                    height="30px"
                                                    onError={val => { val.target.src = `${defaultProfileImg}` }}
                                                    alt={person.name}
                                                    src={`${process.env.REACT_APP_API_PHOTO_URL}/${person._id}?${new Date().getTime()}`} />
                                                <div>
                                                    <h3>{person.name}</h3>
                                                </div>
                                            </Link>
                                            <p style={{ clear: 'both' }}>{person.about}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="col-md-4">
                        <h3 className="text-primary" >Following</h3>
                        <hr />
                        {following.map((person, i) =>
                            (
                                <div key={i} >
                                    <div className="row">
                                        <div>
                                            <Link to={`/user/${person._id}`}>
                                                <img
                                                    className="float-left mr-2"
                                                    height="30px"
                                                    onError={val => { val.target.src = `${defaultProfileImg}` }}
                                                    alt={person.name}
                                                    src={`${process.env.REACT_APP_API_PHOTO_URL}/${person._id}?${new Date().getTime()}`} />
                                                <div>
                                                    <h3>{person.name}</h3>
                                                </div>
                                            </Link>
                                            <p style={{ clear: 'both' }}>{person.about}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary" >Posts</h3>
                        <hr/>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProfileTabs;
