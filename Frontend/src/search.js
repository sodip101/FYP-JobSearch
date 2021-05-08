import React,{useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import Filters from './filters';
import searchIcon from './assets/search.svg';

function Search({searchJob,location,setLocation,selectedPortal,setSelectedPortal,selectedCategory,setSelectedCategory}){
    const [searchText,setSearchText]=useState('');
    const [modalIsOpen, setModalIsOpen]= useState(false);

    const history=useHistory();
    const Location=useLocation();

    function routeChange(){
        if(Location.pathname!=="/"){
            history.push("/");
        }
    }
    

    const handleSearchTextChanges = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    const callSearchFunction = (e) => {
        if(e.keyCode===13){
            searchJob(searchText,location,selectedPortal,selectedCategory);
            setSearchText("");
            routeChange();
        }
        
    }

    return <>
        <div className="search">
            <div className="searchBox">
                <input type="search" value={searchText} placeholder="Enter a search term" onChange={handleSearchTextChanges} onKeyDown={callSearchFunction}/>
                <img src={searchIcon} id="search" height="25px" alt="search" style={{margin:'10px'}}/>
            </div>
            <button onClick={()=>setModalIsOpen(true)} id="filters_btn">Filters</button>
        </div>
        <Filters 
            location={location} setLocation={setLocation}
            selectedPortal={selectedPortal} setSelectedPortal={setSelectedPortal}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            modalIsOpen={modalIsOpen} onClose={()=>setModalIsOpen(false)}
        />
    </>
}

export default Search