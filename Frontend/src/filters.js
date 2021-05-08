import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#portal");
export default function Filters({location, setLocation,selectedPortal,setSelectedPortal,selectedCategory,setSelectedCategory,modalIsOpen,onClose}){
    const [portalList,setPortalList]=useState([]);
    const [categoryList,setCategoryList]=useState([]);

    useEffect(()=>{
        async function getPortals(){
            const data = await fetch("http://localhost:5000/fyp/api/portals");
            const portals=await data.json();
            setPortalList(portals);
        }
        getPortals();
    },[])

    useEffect(()=>{
        async function getCategories(portal){
            const data = await fetch(`http://localhost:5000/fyp/api/${portal}/categories`);
            const categories=await data.json();
            setCategoryList(categories);
        }
        getCategories(selectedPortal);
    },[selectedPortal])

    function reset(){
        setLocation("");
        setSelectedCategory("");
        setSelectedPortal("");
    }

    if (!modalIsOpen) return null;
    
    return (
        <Modal className="Modal" isOpen={modalIsOpen} onRequestClose={onClose}>
            <div className="filters">
                <h1>Filters</h1>
                <div className="filters_form">
                    <input id="filters_location" value={location} type="text" name="location" placeholder="Location" onChange={e=>setLocation(e.target.value)}/>
                    <select id="filters_portal" name="Portals" value={selectedPortal} onChange={e=>setSelectedPortal(e.target.value)}>
                        <option value={null}>Select Portal</option>
                        {
                            portalList.map(portal=>{
                                return <option>{portal}</option>
                            })
                        }
                    </select>
                    <select id="filters_category" name="Categories" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
                        <option value={null}>Select Category</option>
                        {
                            categoryList.map(category=>{
                                return <option>{category}</option>
                            })
                        }
                    </select>
                    <button className="filters_button" style={{marginTop:"25px",height:"52px"}} onClick={reset} >Reset Filters</button>
                    <button className="filters_button" onClick={onClose}>
                        ✖ Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}