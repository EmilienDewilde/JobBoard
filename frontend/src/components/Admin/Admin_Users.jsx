import React, { useState, useEffect } from 'react';
import { User_Component } from "./compo/User/User_Component";
import { CreateUserForm } from "./compo/User/User_Create_Form";
import { EditUserForm } from "./compo/User/User_Edit_Form";
import { DeleteUserForm } from "./compo/User/User_Delete_Form";
import { ViewUser } from "./compo/User/User_View";



export function Admin_Users({users}) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [id, setId] = useState(0);
    const str_MyId = localStorage.getItem('myId')
    let myId = parseInt(str_MyId, 10);
    var is_me = false

    
    if (!users || !users.users) {
        return <div>Loading...</div>;
    }

    if (users.users[id][0] == myId){
        is_me = true
    }else{
        is_me = false
    }
    
    const addId = () => {
        if (id < users.users.length - 1) {  
            
            setId(id + 1);

       }
    };

    const prevId = () => {
       if (id > 0) { 

            setId(id - 1);
 
       }
    };

    return (
       <div className="box_admin">
           <h2 className="sub_title_admin">User</h2>
           <User_Component users={users} id={id} />
           <div className='div_btn'>
           {id > 0 ? <button onClick={prevId} className="button_admin">prev</button> : null}
           <button onClick={() =>setShowView(true)} className="button_admin">View</button>

            { showView && <ViewUser onClose={() =>setShowView(false)} id={id} /> }

           <button onClick={() =>setShowCreateForm(true)} className="button_admin">Create</button>

           { showCreateForm && <CreateUserForm onClose={() =>setShowCreateForm(false)} /> }

           <button onClick={() =>setShowEditForm(true)} className="button_admin">Edit</button>
           
            { showEditForm && <EditUserForm onClose={() =>setShowEditForm(false)} username={users.users[id][1]} email={users.users[id][2]}/> }

           {!is_me && <button onClick={() =>setShowDeleteForm(true)} className="button_admin">Delete</button>}

           { showDeleteForm && <DeleteUserForm onClose={() =>setShowDeleteForm(false)}  username={users.users[id][1]} /> }
           {id < users.users.length - 1 ? <button onClick={addId} className="button_admin">next</button> : null}
       </div>
       </div>
    );
}
