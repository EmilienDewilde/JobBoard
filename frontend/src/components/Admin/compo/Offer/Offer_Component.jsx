export function Offer_Component({offers,id}) {
    if (offers == undefined || offers.offers == undefined || offers.offers.length == 0 || offers.offers[id] == undefined) {
        return  (<></>)
    }

    const fst = offers.offers[id]
    
    console.log(fst)
    return(
        <div className="div_component">
            ID : {fst[0]}
            <br />
            title : {fst[1]}
            <br />
            description : {fst[2]}
            <br />
            salary : {fst[3]}
            <br />
            company : {fst[4]}
            <br />
            location : {fst[5]}

        </div>
    )
}