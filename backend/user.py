from flask import request, jsonify

def profileMethods(db, accesDB, user_id):
    
    if request.method == 'GET':
        
        cur = db.cursor()
        username = accesDB.selectUser_byId(db,user_id)
        email = accesDB.selectEmail(cur, user_id)
        
        cur.close()
        return jsonify({ 'id':user_id,'username':username, 'email':email})
        
    if request.method == 'PUT':

            
        data = request.get_json()
        user = data.get('user')
        new_username = user.get('username')
        email = user.get('email')
        password = user.get('password')
        
        username = accesDB.selectUser_byId(db, user_id)
        
        cur = db.cursor()
        err = accesDB.updateUser(cur, username, new_username, email, password)
        if err :
            return jsonify({'error': 'This username / email is already use'})
        
        db.commit()
        cur.close()
        
        
        return jsonify({'Succes': True, 'message': 'update success'})