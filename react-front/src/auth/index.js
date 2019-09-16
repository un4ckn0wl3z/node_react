export const signup = user => {
    
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
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


export const signin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
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


export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
}

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
        return fetch(`${process.env.REACT_APP_API_URL}/auth/signout`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;

    }
}