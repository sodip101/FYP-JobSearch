import React from "react";
import Modal from "react-modal";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Cookies from "universal-cookie";
const cookies = new Cookies();

Modal.setAppElement("#portal");

export default function Login({ modalIsOpen, onClose, setUser }) {
    if (!modalIsOpen) return null;
    const cookieSetDate=new Date(Date.now);

    const responseGoogle = (response) => {
        console.log(response);
        const token = { token: response.tokenId };
        fetch("http://localhost:4000/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(token),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("currentUser", JSON.stringify(data));
                setUser(JSON.parse(localStorage.getItem('currentUser')));
                cookies.set("token", token.token,{expires:cookieSetDate.setDate(cookieSetDate.getDate()+1)});
                console.log(data);
                onClose();
            });
    };

    const responseFacebook = (response) => {
        console.log(response);

        const body = { accessToken: response.accessToken, userID:response.userID};
        fetch("http://localhost:4000/auth/facebook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("currentUser", JSON.stringify(data));
                setUser(JSON.parse(localStorage.getItem("currentUser")));
                cookies.set("token", body.userID, {
                    expires: cookieSetDate.setDate(cookieSetDate.getDate() + 1),
                });
                console.log(data);
                onClose();
            });
    };

    return (
        <Modal className="Modal" isOpen={modalIsOpen} onRequestClose={onClose}>
            <div className="login">
                <h1>Login</h1>
                <div className="login_form">
                    <GoogleLogin
                        className="google"
                        clientId="510700443434-kmo2bs0uqe7eh0acivbo02l4djh3s1g6.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={responseGoogle}
                        autoLoad={false}
                        
                        cookiePolicy={"single_host_origin"}
                    />

                    <FacebookLogin
                        className="facebook"
                        appId="759709598263188"
                        autoLoad={false}
                        textButton="Continue with Facebook"
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                </div>
            </div>
        </Modal>
    );
}
