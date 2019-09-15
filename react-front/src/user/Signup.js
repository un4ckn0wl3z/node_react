import React, { Component } from 'react';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }

    clieckSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        }
        fetch("http://localhost:8080/auth/signup",{
            method: 'POST',
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { name, email, password } = this.state;
        return (
            <div className="container" >
                <h2 className="mt-5 mb-5" >Signup</h2>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control"  value={name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control"  value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.clieckSubmit} className="btn btn-primary btn-raised">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;
