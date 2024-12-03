export function Company_Component({companies,id}) {
    
    if (companies.companies == undefined) {
        return  (<></>)
    }
    const fst = companies.companies[id]
    
    return(
        <div className="div_component">
            ID : {fst[0]}
            <br />
            name : {fst[1]}
        </div>
    )
}