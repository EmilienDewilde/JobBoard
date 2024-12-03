from flask import Flask, request, jsonify


# Offers methods
def offerMethods(db, accesDB, offer_id = None):
    
    # GET OFFERS
    if request.method == 'GET':
        
        cur = db.cursor()
        offers = accesDB.getOffers(cur)
        dico_offers = {}
        offer = {}
        for offer in offers:
            if offer_id == offer[0] and offer_id != None:
                offer = {'title': offer[1], 'description': offer[2], 'salary': offer[3], 'company': accesDB.getCompany(cur, offer[4])}
                return jsonify({ 'offer': offer})
            dico_offer = {'title': offer[1], 'company': accesDB.getCompany(cur, offer[4])}
            dico_offers[offer[0]] = dico_offer
        cur.close()
        return jsonify({ 'offers': dico_offers})
    
    # APPLY TO OFFER
    if request.method == 'POST':
        data = request.get_json()
        if data == None:
            return jsonify({'error': 'data is empty'})
        offer_id = data.get('offer_id')
        email = data.get('email')
        message = data.get('message')
        
        cur = db.cursor()
        accesDB.apply(cur,offer_id, email, message)
        
        db.commit()
        cur.close()
        
        return jsonify({ 'message': 'apply success'})