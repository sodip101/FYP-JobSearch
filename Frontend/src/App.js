import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Results from "./results";
import Profile from "./profile";
import Nav from "./nav";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
    
    //AUTH
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const [idToken, setToken] = useState(cookies.get("token"));
    useEffect(() => {
        if (!idToken) {
            localStorage.removeItem("currentUser");
            setUser(null);
        }
    }, [idToken]);

    //SEARCH
    //Filters
    const [location, setLocation] = useState(null);
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //Results
    const [results, setResults] = useState("");
    let response;
    async function responseValidator(response){
        if (response.status === 200) {
        const searchResults = await response.json();
        setResults(searchResults);
        } else if (response.status === 404) {
            setResults(404);
        } else if (response.status === 400) {
            setResults(400);
        } else if (response.status === 500) {
            setResults(500);
        }
    }
    const searchJob = async (searchTerm, location, portal, category) => {
        if (searchTerm) {
            if(!location && !portal && !category){
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?search_q=${searchTerm}`
                );
                responseValidator(response);
            }
            if (location && !portal && !category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?search_q=${searchTerm}&location=${location}`
                );
                responseValidator(response);
            }
            if (location && portal && !category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?search_q=${searchTerm}&location=${location}&portal=${portal}`
                );
                responseValidator(response);
            }
            if (location && portal && category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?search_q=${searchTerm}&location=${location}&portal=${portal}&category=${category}`
                );
                responseValidator(response);
            }
            if (!location && portal && !category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?search_q=${searchTerm}&portal=${portal}`
                );
                responseValidator(response);
            }
            if (!location && portal && category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?search_q=${searchTerm}&portal=${portal}&category=${category}`
                );
                responseValidator(response);
            }
        }else if(!searchTerm){
            if (!location && !portal && !category) {
                setResults(400);
            }
            if (location && !portal && !category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?location=${location}`
                );
                responseValidator(response);
            }
            if (location && portal && !category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?location=${location}&portal=${portal}`
                );
                responseValidator(response);
            }
            if (location && portal && category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?location=${location}&portal=${portal}&category=${category}`
                );
                responseValidator(response);
            }
            if (!location && portal && !category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?portal=${portal}`
                );
                responseValidator(response);
            }
            if (!location && portal && category) {
                response = await fetch(
                    `http://localhost:5000/fyp/api/jobs?portal=${portal}&category=${category}`
                );
                responseValidator(response);
            }
        }
        setCurrentPage(1);
    };

    return (
        <>
            <Router>
                <Nav
                    modalIsOpen={modalIsOpen}
                    setUser={setUser}
                    setModalIsOpen={setModalIsOpen}
                    searchJob={searchJob}
                    user={user}
                    setToken={setToken}
                    location={location}
                    setLocation={(location) => setLocation(location)}
                    selectedPortal={selectedPortal}
                    setSelectedPortal={setSelectedPortal}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={(categgory) =>
                        setSelectedCategory(categgory)
                    }
                />
                <Switch>
                    <Route exact strict path="/">
                        <Results
                            user={user}
                            results={results}
                            location={location}
                            selectedPortal={selectedPortal}
                            selectedCategory={selectedCategory}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Route>
                    <Route exact path="/profile">
                        <Profile user={user} />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
