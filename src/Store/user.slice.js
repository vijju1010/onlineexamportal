import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    isAuthenticated: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user, 'state.user');
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setUser, setIsAuthenticated, logout } = userSlice.actions;
export default userSlice.reducer;

export const registerUserAsync = (user) => (dispatch) => {
    console.log(user, 'user');
    fetch('http://localhost:3001/registeruser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((res) => {
        console.log(res, 'res');
    });
};

export const loginAsync = (user) => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3001/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const res = await response.json();
        if (res.success) {
            dispatch(setUser(res.user));
            dispatch(setIsAuthenticated(true));
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
        } else {
            console.log(res.message);
        }
    };
};
export const checkAuth = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        console.log(token, 'token');
        if (token) {
            const response = await fetch('http://localhost:3001/checkAuth', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            const res = await response.json();
            if (res.success) {
                dispatch(setIsAuthenticated(true));
            }
        } else {
            dispatch(setIsAuthenticated(false));
        }
    };
};

export const updateUserProfileAsync = (user) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        console.log(user, 'user');
        if (token) {
            fetch('http://localhost:3001/updateUserProfile', {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (res.success) {
                        dispatch(setUser(res.user));
                        localStorage.setItem('user', JSON.stringify(res.user));
                    }
                });
        }
    };
};

export const updateProfileImgAsync = (formdata, user) => {
    console.log(formdata, 'formdata');
    console.log(user, 'user');
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
            method: 'POST',
            body: formdata,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data, 'data');
                if (token) {
                    fetch('http://localhost:3001/updateProfileImg', {
                        method: 'POST',
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user: user,
                            img: data.secure_url,
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((res) => {
                            if (res.success) {
                                dispatch(setUser(res.user));
                                localStorage.setItem(
                                    'user',
                                    JSON.stringify(res.user)
                                );
                            }
                        });
                }
            });
    };
};
