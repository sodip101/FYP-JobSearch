import React from 'react';
import Logo from './logo';
import Login from './login';
import Search from './search';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function Nav({modalIsOpen,setUser,setModalIsOpen,searchJob,user,setToken,location,setLocation,selectedPortal,setSelectedPortal,selectedCategory,setSelectedCategory}){
    let button;
    let User;
    if (user) {
        button = (
            <button
                onClick={() => {
                    cookies.remove("token");
                    localStorage.removeItem("currentUser");
                    setUser(null);
                    setToken(null);
                }}
                id="auth_btn"
            >
                Logout
            </button>
        );
        console.log(user.picture);
        if (user) {
            User = (
                <a href="/profile">
                    <img id="avatar" alt="avatar" src={user.picture} />
                </a>
            );
        }
    } else {
        button = (
            <button onClick={() => setModalIsOpen(true)} id="auth_btn">
                Login
            </button>
        );
    }

    return (
        <>
            <nav>
                <Logo />
                <Login
                    modalIsOpen={modalIsOpen}
                    setUser={setUser}
                    onClose={() => {
                        setUser(JSON.parse(localStorage.getItem("currentUser")));
                        setModalIsOpen(false);
                    }}
                />
                <Search 
                    searchJob={searchJob}
                    location={location}
                    setLocation={(location)=>setLocation(location)}
                    selectedPortal={selectedPortal}
                    setSelectedPortal={setSelectedPortal}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={(categgory)=>setSelectedCategory(categgory)} 
                />
                <div className="auth_div">
                    {User}
                    {button}
                </div>
            </nav>
        </>
    );
}