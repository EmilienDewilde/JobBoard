import React, { useState, useEffect } from 'react';
import { CreateOfferForm } from "./compo/Offer/Offer_Create_Form";
import { EditOfferForm } from "./compo/Offer/Offer_Edit_Form";
import { DeleteOfferForm } from "./compo/Offer/Offer_Delete_Form";
import { ViewOffer } from "./compo/Offer/Offer_View";
import { Offer_Component } from "./compo/Offer/Offer_Component";
export function Admin_Offers({offers}) {

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [id, setId] = useState(0);

    if (!offers || !offers.offers) {
        return <div>Loading...</div>;
    }

    const addId = () => {
       if (id < offers.offers.length - 1) {  
           setId(id + 1);
       }
    };

    const prevId = () => {
       if (id > 0) {  
           setId(id - 1);
       }
    };
    return(
        <div className="box_admin" >
                <h2 className="sub_title_admin">Offers</h2>
                <Offer_Component offers={offers} id={id}/>
                <div className='div_btn'>
                {id > 0 ? <button onClick={prevId} className="button_admin">prev</button> : null}
                <button onClick={() =>setShowView(true)} className="button_admin">View</button>
                { showView && <ViewOffer onClose={() =>setShowView(false)} /> }
                <button onClick={() =>setShowCreateForm(true)} className="button_admin">Create</button>
                { showCreateForm && <CreateOfferForm onClose={() =>setShowCreateForm(false)} id={id}/> }
                <button onClick={() =>setShowEditForm(true)} className="button_admin">Edit</button>
                { showEditForm && <EditOfferForm onClose={() =>setShowEditForm(false)} 
                    id={offers.offers[id][0]}
                    title={offers.offers[id][1]} 
                    description={offers.offers[id][2]}
                    salary={offers.offers[id][3]}
                    company={offers.offers[id][4]}
                    location={offers.offers[id][5]} 
                /> }
                <button onClick={() =>setShowDeleteForm(true)} className="button_admin">Delete</button>
                { showDeleteForm && <DeleteOfferForm onClose={() => setShowDeleteForm(false)} id={offers.offers[id][0]} /> }
                {id < offers.offers.length - 1 ? <button onClick={addId} className="button_admin">next</button> : null}
            </div>
        </div>
    )
}