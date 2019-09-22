import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';


const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/users" component={Users} ></Route>
            <Route exact path="/signup" component={Signup} ></Route>
            <Route exact path="/signin" component={Signin} ></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile} ></PrivateRoute>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} ></PrivateRoute>
            <PrivateRoute exact path="/findpeople" component={FindPeople} ></PrivateRoute>
            <PrivateRoute exact path="/post/create" component={NewPost} ></PrivateRoute>

        </Switch>
    </div>
)

export default MainRouter;