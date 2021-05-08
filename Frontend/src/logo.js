import jobIcon from './assets/job-seeker.svg';

function Logo(){
    return (
        <>
            <a href="/">
                <div className="logo">
                    <img src={jobIcon} height="50px" alt="" />
                    <h1>JOB SEARCH</h1>
                </div>
            </a>
        </>
    );
}

export default Logo