export function User_Component({users,id}) {
    // const user = Object.entries(users.id)
    if (users.users == undefined) {
        return  (<></>)
    }
    const fst = users.users[id]

    return(
        <div className="div_component">
            ID : {fst[0]}
            <br />
            name : {fst[1]}
            <br />
            email : {fst[2]}

        </div>
    )
}