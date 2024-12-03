from flask import Flask, request, jsonify


# CRUD of Users
def userMethods(db, accesDB):

    
    if request.method == 'GET':
        cur = db.cursor()
        users = accesDB.getUsers(cur)
        new_users = []
        for user in users:
            new_user = []
            new_user.append(user[0])
            new_user.append(user[1])
            new_user.append(accesDB.selectEmail(cur, user[0]))
            new_users.append(new_user)
        db.commit()
        cur.close()       
        return jsonify({ 'users': new_users})
    
    if request.method == 'POST':
        data = request.get_json()
        cur = db.cursor()
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if accesDB.ifUserExists(cur, username) or accesDB.ifEmailExists(cur, email):
            return jsonify({'error': 'username / email already exists'})
        err = accesDB.addUser(cur, username, password)
        if not err:
            return jsonify({'error': 'erreur creating an user'})
        user_id_add = accesDB.selectUser_id(cur, username)
        accesDB.addEmail(cur, email, user_id_add)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'user created'})
    
    if request.method == 'PUT':
        data = request.get_json()
        user = data.get('user')
        cur = db.cursor()
        new_username = user.get('new_username')
        username = user.get('username')
        email = user.get('email')
        password = user.get('password')
        
        
        if accesDB.ifUserExists(cur, new_username) or accesDB.ifEmailExists(cur, email):
            return jsonify({'error': 'username / email same as previous one'})
        
        accesDB.updateUser(cur, username, new_username, email, password)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'user updated'})
    
    if request.method == 'DELETE':
        data = request.get_json()
        cur = db.cursor()
        
        username = data.get('username')
        
        accesDB.deleteUser(cur, username)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'user deleted'})
    
    return jsonify({'error': 'Invalid method'})
    
    
# CRUD of Offers 
def offerMethods(db, accesDB):
    cur = db.cursor()
    
    if request.method == 'GET':
        offers = accesDB.getOffers(cur)
        new_offers = []        
        for offer in offers:
            new_offer = []
            new_offer.append(offer[0])
            new_offer.append(offer[1])
            new_offer.append(offer[2])
            new_offer.append(offer[3])
            new_offer.append(accesDB.getCompany(cur, offer[4]))
            new_offer.append(offer[5])  
            new_offers.append(new_offer)      
        
        cur.close()
        return jsonify({ 'offers': new_offers})
    
    if request.method == 'POST':
        data = request.get_json()
        
        title = data.get('title')
        description = data.get('description')
        salary = data.get('salary')
        company = data.get('company')
        location = data.get('location')
        
        err = accesDB.CreateOffer(cur, title, description, salary, company, location)
        if err:
            return jsonify({'error': 'erreur creating an offer'})
        db.commit()
        cur.close()
        return jsonify({ 'message': 'offer created'})
    
    if request.method == 'PUT':
        data = request.get_json()
        offer = data.get('offer')
        id = offer.get('id')        
        new_title = offer.get('title')
        new_description = offer.get('description')
        new_salary = offer.get('salary')
        new_company = offer.get('company')
        new_location = offer.get('location')
        
        err = accesDB.updateOffer(cur,id, new_title, new_description, new_salary, new_company, new_location)
        if not err:
            return jsonify({'error': 'erreur updating an offer'})
        
        db.commit()
        cur.close()
        return jsonify({ 'message': 'offer updated'})
    
    if request.method == 'DELETE':
        data = request.get_json()
        
        id = data.get('id')        
    
        accesDB.deleteOffer(cur,id)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'offer deleted'})
    
    return jsonify({'error': 'Invalid method'})

# CRUD of Companies
def companyMethods(db, accesDB):
    cur = db.cursor()
    
    company_id = request.args.get('id')
    if company_id != None:
        company_id = int(company_id)
    
    if request.method == 'GET':
        companies = accesDB.getCompanies(cur)
        new_companies = []
        for company in companies:
            new_company = []
            new_company.append(company[0])
            new_company.append(company[1])
            new_companies.append(new_company)
        
        cur.close()
        return jsonify({ 'companies': new_companies})
    
    
    if request.method == 'POST':
        data = request.get_json()
        
        name = data.get('name')
        if accesDB.ifCompanyExists(cur, name):
            return jsonify({'error': 'company already exists'})
        
        accesDB.createCompany(cur, name)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'company created'})
    
    if request.method == 'PUT':
        data = request.get_json()
        company = data.get('company')

        id = company.get('id')
        new_name = company.get('new_name')
        
        if accesDB.ifCompanyExists(cur, new_name):
            return jsonify({'error': 'company already exists'})
        
        accesDB.updateCompany(cur,id, new_name)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'company updated'})
    
    if request.method == 'DELETE':
        data = request.get_json()
        
        name = data.get('name')
        
        if not accesDB.ifCompanyExists(cur, name):
            return jsonify({'error': 'company does not exists'})
        accesDB.deleteCompany(cur, name)
        db.commit()
        cur.close()
        return jsonify({ 'message': 'company deleted'})
    
    return jsonify({'error': 'Invalid method'})