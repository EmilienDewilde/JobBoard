import React, { useState, useEffect } from 'react';
import { Company_Component } from "./compo/Company/Company_Component"
import { CreateCompanyForm } from "./compo/Company/Company_Create_Form";
import { EditCompanyForm } from "./compo/Company/Company_Edit_Form";
import { DeleteCompanyForm } from "./compo/Company/Company_Delete_Form";
import { ViewCompany } from "./compo/Company/Company_View";

export function Admin_Companies({companies}) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [id, setId] = useState(0);

    if (!companies || !companies.companies) {
        return <div>Loading...</div>;
    }

    const addId = () => {
         if (id < companies.companies.length - 1) {  
              setId(id + 1);
         }
     }
    
    const prevId = () => {  
        if (id > 0) {  
            setId(id - 1);
        }
    }

    return(
        <div className="box_admin">
           <h2 className="sub_title_admin">Company</h2>
           <Company_Component companies={companies} id={id} />
           <div className='div_btn'>
           {id > 0 ? <button onClick={prevId} className="button_admin">prev</button> : null}
           <button onClick={() => setShowView(true)} className="button_admin">View</button>
            { showView && <ViewCompany onClose={() =>setShowView(false)} id={id} /> }

           <button onClick={() =>setShowCreateForm(true)} className="button_admin">Create</button>

           { showCreateForm && <CreateCompanyForm onClose={() =>setShowCreateForm(false)} /> }

           <button onClick={() =>setShowEditForm(true)} className="button_admin">Edit</button>
           
            { showEditForm && <EditCompanyForm onClose={() =>setShowEditForm(false)} id={companies.companies[id][0]} name={companies.companies[id][1]} /> }

           <button onClick={() =>setShowDeleteForm(true)} className="button_admin">Delete</button>

           { showDeleteForm && <DeleteCompanyForm onClose={() =>setShowDeleteForm(false)}  name={companies.companies[id][1]} /> }
           {id < companies.companies.length - 1 ? <button onClick={addId} className="button_admin">next</button> : null}
       </div>
       </div>
    );
}