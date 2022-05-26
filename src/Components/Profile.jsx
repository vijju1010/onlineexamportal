import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    checkAuth,
    updateUserProfileAsync,
    updateProfileImgAsync,
    updateUserPasswordAsync,
} from '../Store/user.slice';
const Profile = () => {
    const [editble, setEditble] = useState(true);
    const localUser = useSelector((state) => state.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(localUser.user);
    const [editimage, setEditimage] = useState(false);
    const [profileimg, setProfileimg] = useState(null);
    const [ch, setCh] = useState(false);
    const [passwords, setPasswords] = useState({
        currentpassword: user.password,
        newpassword: '',
        confirmpassword: '',
    });
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const changePasswordHandler = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };
    const handleChangePassword = () => {
        // e.preventDefault();
        if (
            passwords.newpassword === passwords.confirmpassword &&
            passwords.newpassword.length > 0
        ) {
            dispatch(
                updateUserPasswordAsync({
                    password: passwords.newpassword,
                })
            );
        }
    };

    // console.log(user, 'user');
    const [formdata, setFormdata] = useState({});
    const handleUpdate = (e) => {
        dispatch(updateUserProfileAsync(user));
        setEditimage(false);
    };
    const handleupdateimg = (e) => {
        dispatch(updateProfileImgAsync(formdata, user));
        setEditimage(false);
    };
    const fileChangeHandler = (e) => {
        const formdata = new FormData();
        formdata.append('file', e.target.files[0]);
        formdata.append('upload_preset', 'docs_upload_example_us_preset');
        // console.log(formdata.values(), 'formdata');
        // setFormdata(formdata);
    };
    useEffect(() => {
        dispatch(checkAuth());
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [dispatch, isAuthenticated]);

    return (
        <div>
            <Navbar />
            <div class='container rounded bg-white mt-5 mb-5'>
                <div class='row'>
                    <div class='col-md-3 border-right'>
                        <div class='d-flex flex-column align-items-center text-center p-3 py-5'>
                            <form encType='multipart/form-data'>
                                <img
                                    class='rounded-circle mt-5'
                                    width='150px'
                                    height='250px'
                                    alt='profile'
                                    src={
                                        user.profileimg != '' ||
                                        user.profileimg != null
                                            ? user.profileimg
                                            : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                                    }
                                />

                                {editimage ? (
                                    <>
                                        <input
                                            type='file'
                                            name='profileimg'
                                            onChange={fileChangeHandler}
                                        />
                                        <button
                                            class='btn btn-primary mt-3'
                                            onClick={handleupdateimg}>
                                            Upload
                                        </button>
                                    </>
                                ) : (
                                    <i
                                        class='fa fa-edit'
                                        onClick={() => {
                                            setEditimage(true);
                                        }}></i>
                                )}
                            </form>
                            <span class='font-weight-bold'>{user.name}</span>
                            <span class='text-black-50'>{user.email}</span>
                            {user.access === 'admin' ? (
                                <div className='card w-75'>
                                    <ul className='list-group list-group-flush '>
                                        <li className='list-group-item'>
                                            <Link to='/students'>Students</Link>
                                        </li>
                                        <li className='list-group-item'>
                                            <Link to='/addexams'>
                                                Add Exams
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <></>
                            )}
                            <span></span>
                        </div>
                    </div>
                    <div class='col-md-5 border-right'>
                        <div class='p-3 py-5'>
                            <form>
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
                            </form>

                            {ch ? (
                                <div class='mt-5 text-center'>
                                    <form>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <label class='labels'>
                                                    Current Password
                                                </label>
                                                <input
                                                    type='text'
                                                    name='currentpassword'
                                                    disabled={true}
                                                    class='form-control'
                                                    placeholder='current password'
                                                    value={
                                                        passwords.currentpassword
                                                    }
                                                    onChange={
                                                        changePasswordHandler
                                                    }
                                                />
                                            </div>
                                            <div class='col-md-12'>
                                                <label class='labels'>
                                                    New Password
                                                </label>
                                                <input
                                                    type='password'
                                                    name='newpassword'
                                                    class='form-control'
                                                    placeholder='new password'
                                                    value={
                                                        passwords.newpassword
                                                    }
                                                    onChange={
                                                        changePasswordHandler
                                                    }
                                                />
                                            </div>
                                            <div class='col-md-12'>
                                                <label class='labels'>
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type='password'
                                                    name='confirmpassword'
                                                    class='form-control'
                                                    placeholder='confirm password'
                                                    value={
                                                        passwords.confirmpassword
                                                    }
                                                    onChange={
                                                        changePasswordHandler
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            ) : null}
                            <div class='mt-5 text-center'>
                                <button
                                    className='btn btn-primary profile-button'
                                    type='button'
                                    onClick={() => {
                                        setCh(!ch);
                                        if (ch) {
                                            handleChangePassword();
                                            setPasswords({
                                                ...passwords,
                                                newpassword: '',
                                                confirmpassword: '',
                                            });
                                        }
                                    }}>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
