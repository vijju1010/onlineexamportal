import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuth, updateUserProfileAsync } from '../Store/user.slice';
const Profile = () => {
    const [editble, setEditble] = useState(true);
    const localUser = useSelector((state) => state.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(localUser.user);
    const [profileimg, setProfileimg] = useState(null);
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const formdata = new FormData();
    const handleUpdate = (e) => {
        dispatch(updateUserProfileAsync(user, formdata));
        setEditble(true);
    };
    const fileChangeHandler = (e) => {
        formdata.append('profileimg', e.target.files[0]);
        console.log(formdata.values(), 'formdata');
    };
    useEffect(() => {
        dispatch(checkAuth());
        // if (!isAuthenticated) {
        //     navigate('/login');
        // }
    }, [dispatch, isAuthenticated]);

    return (
        <div>
            <Navbar />
            <div class='container rounded bg-white mt-5 mb-5'>
                <div class='row'>
                    <form encType='multipart/form-data'>
                        <div class='col-md-3 border-right'>
                            <div class='d-flex flex-column align-items-center text-center p-3 py-5'>
                                <img
                                    class='rounded-circle mt-5'
                                    width='150px'
                                    alt='profile'
                                    src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                                />
                                {!editble ? (
                                    <>
                                        <i class='fa fa-edit'></i>
                                        <input
                                            type='file'
                                            name='profileimg'
                                            onChange={fileChangeHandler}
                                        />
                                    </>
                                ) : (
                                    <div></div>
                                )}
                                <span class='font-weight-bold'>
                                    {user.name}
                                </span>
                                <span class='text-black-50'>
                                    admin@mail.com.my
                                </span>
                                <span> </span>
                            </div>
                        </div>
                        <div class='col-md-5 border-right'>
                            <div class='p-3 py-5'>
                                <div class='d-flex justify-content-between align-items-center mb-3'>
                                    <h4 class='font-weight-bold'>Profile</h4>
                                </div>
                                <div class='row mt-2'>
                                    <div class='col-md-6'>
                                        <label class='labels'>Name</label>
                                        <input
                                            name='name'
                                            type='text'
                                            class='form-control'
                                            placeholder='first name'
                                            value={user.name}
                                            onChange={changeHandler}
                                            disabled={editble}
                                            // contentEditable={editble}
                                        />
                                    </div>
                                    <div class='col-md-6'>
                                        <label class='labels'>Surname</label>
                                        <input
                                            name='surname'
                                            type='text'
                                            class='form-control'
                                            value={user.surname}
                                            placeholder='surname'
                                            onChange={changeHandler}
                                            disabled={editble}
                                        />
                                    </div>
                                </div>
                                <div class='row mt-3'>
                                    <div class='col-md-12'>
                                        <label class='labels'>
                                            Mobile Number
                                        </label>
                                        <input
                                            type='text'
                                            name='mobile'
                                            class='form-control'
                                            placeholder='enter phone number'
                                            value={user.mobile}
                                            onChange={changeHandler}
                                            disabled={editble}
                                        />
                                    </div>
                                    <div class='col-md-12'>
                                        <label class='labels'>
                                            Address Line
                                        </label>
                                        <input
                                            type='text'
                                            name='address'
                                            class='form-control'
                                            placeholder='enter address line 1'
                                            value={user.address}
                                            onChange={changeHandler}
                                            disabled={editble}
                                        />
                                    </div>
                                    <div class='col-md-12'>
                                        <label class='labels'>Email ID</label>
                                        <input
                                            name='email'
                                            type='text'
                                            class='form-control'
                                            placeholder='enter email id'
                                            value={user.email}
                                            onChange={changeHandler}
                                            disabled={true}
                                        />
                                    </div>
                                    <div class='col-md-12'>
                                        <label class='labels'>Education</label>
                                        <input
                                            name='education'
                                            type='text'
                                            class='form-control'
                                            placeholder='education'
                                            value={user.education}
                                            onChange={changeHandler}
                                            disabled={editble}
                                        />
                                    </div>
                                </div>

                                {!editble ? (
                                    <div class='mt-5 text-center'>
                                        <button
                                            class='btn btn-primary profile-button'
                                            type='button'
                                            onClick={() => {
                                                setEditble(true);
                                                handleUpdate();
                                            }}>
                                            Save Profile
                                        </button>
                                    </div>
                                ) : (
                                    <div class='mt-5 text-center'>
                                        <button
                                            class='btn btn-primary profile-button'
                                            type='button'
                                            onClick={() => setEditble(false)}>
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
