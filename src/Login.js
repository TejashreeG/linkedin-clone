import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { auth } from './firebase';
import { login } from './features/userSlice';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                console.log(userAuth.user);
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        photoUrl: userAuth.user.photoURL,
                    })
                );
            }).catch(error => alert(error));
    };

    const register = () => {
        if (!name) {
            return alert("Please enter a full name");
        }

        auth.createUserWithEmailAndPassword(email, password).then(
            (userAuth) => {
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: photoUrl,
                })
                    .then(() => {
                        dispatch(
                            login({
                                email: userAuth.user.email,
                                uid: userAuth.user.uid,
                                displayName: name,
                                photoUrl: photoUrl,
                            })
                        );
                    });
            }
        ).catch(error => alert(error));
    };

    return (
        <div className='login'>
            <img src="https://www.tmf-group.com/-/media/images/logos/case-study-logos/linkedin.png" alt="" />

            <form>
                <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder='Full name(required if registered)' type="text" />
                <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder='Profile picture URL(optional)' type="text" />
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email' type="email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' type="password" />
                <button type='submit' onClick={loginToApp}>Sign In</button>
            </form>

            <p>Not a member? {" "}
                <span className='login__register' onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login
