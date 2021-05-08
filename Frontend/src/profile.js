import React, { useState,useEffect} from "react";
import SavedJobs from './savedJobs';
import AppliedJobs from "./appliedJobs";
import { Redirect,BrowserRouter as Router,Route,Link,Switch } from "react-router-dom";

export default function Profile({ user }) {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loadingSaved,setLoadingSaved]=useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loadingApplied, setLoadingApplied] = useState(false);

    useEffect(() => {
        if(user){    
            setLoadingSaved(true);
            fetch(`http://localhost:4000/auth/${user.id}/saved-jobs`)
                .then((response) => response.json())
                .then((data) => setSavedJobs(data))
                .then(() => setLoadingSaved(false))
                .catch((err) => console.log(err));
        }
    }, [user]);

    
    useEffect(() => {
        if(user){
            setLoadingApplied(true);
            fetch(`http://localhost:4000/auth/${user.id}/applied-jobs`)
                .then((response) => response.json())
                .then((data) => setAppliedJobs(data))
                .then(() => setLoadingApplied(false))
                .catch((err) => console.log(err));
        }
    }, [user]);

    if(!user){
        return <Redirect to="/"/>
    }

    return (
        <>
            <Router>
                <div id="profileBanner">
                    <img id="profilePicture" src={user.picture} alt="" />
                    <h1>{user.name}</h1>
                    <div id="userStats">
                        <h3>Saved Jobs: {savedJobs.length}</h3>
                        <h3>Applied Jobs: {appliedJobs.length}</h3>
                    </div>
                    <div id="btnUserJobs">
                        <Link to='/profile/saved-jobs'><button className="btnSaveJob">Saved Jobs</button></Link>
                        <Link to='/profile/applied-jobs'><button className="btnMarkAsApplied">Applied Jobs</button></Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/profile/saved-jobs">
                        <SavedJobs loading={loadingSaved} setJobs={setSavedJobs} user={user} jobs={savedJobs} />
                    </Route>
                    <Route exact path="/profile/applied-jobs">
                        <AppliedJobs loading={loadingApplied} setJobs={setAppliedJobs} user={user} jobs={appliedJobs}/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}
