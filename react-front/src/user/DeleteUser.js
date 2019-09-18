import React, { Component } from 'react';
class DeleteUser extends Component {


    deleteAccount = () => {
        
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account.");
        if(answer){
            this.deleteAccount();
        }
    }

    render() {
        return (
            <button onClick={this.deleteConfirmed}  className="btn btn-raised btn-danger mr-5">Delete Profile</button>
        );
    }
}

export default DeleteUser;