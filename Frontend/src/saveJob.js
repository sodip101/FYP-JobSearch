import React,{useState} from 'react';

function SaveButtons({job,user}){
    
    const [saveJobMessage,setMessage]=useState('');
    
    if(!user){
        return null;
    }
    const data={newJob:job,user};

    async function saveJob(data){
        fetch("http://localhost:4000/auth/save-job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response)=>response.json())
        .then(data=>{
            setMessage(data.message);
            setTimeout(() => setMessage(""), 3000);
        })
        .catch(err=>console.log(err));
    }

    async function markAsApplied(data){
        fetch("http://localhost:4000/auth/mark-job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response)=>response.json())
        .then(data=>{
            setMessage(data.message);
            setTimeout(() => setMessage(''), 3000);
        })
        .catch(err=>console.log(err));
    }

    return <>
        <div className='saveButtons'>
            <p style={{marginRight:'240px',marginTop:'7px',color:'#00bfa6', fontWeight:'bold'}}>{saveJobMessage}</p>
            <button className='btnSaveJob' onClick={()=>saveJob(data)}>Save Job</button>
            <button className='btnMarkAsApplied' onClick={()=>markAsApplied(data)}>Mark As Applied</button>
        </div>
    </>
}

export default SaveButtons;