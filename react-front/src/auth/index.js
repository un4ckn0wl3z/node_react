export const signup = user => {
    return fetch("http://localhost:8080/auth/signup", {
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
    return fetch("http://localhost:8080/auth/signin", {
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
        return fetch("http://localhost:8080/auth/signout", {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }
}