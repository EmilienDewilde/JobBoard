from flask import request

def loginMethods( db, accesDB):
    if request.method == 'POST':
        
        data = request.get_json()
        username = data.get('username')
        pwd = data.get('password')
        
        
        cur = db.cursor()
        
        if not accesDB.checkUser(cur, username, pwd):
            return {'error': 'Invalid username or password'}
        
        
        id = accesDB.selectUser_id(cur, username)
        
        cur.close()
        
        return { 'id': id}
    
    return {'error': 'Invalid method'}


def registerMethods( db, accesDB):
    
    if request.method == 'POST':
        
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        pwd = data.get('password')
        
        cur = db.cursor()
        
        email_user_id = accesDB.get_user_id(cur, email)
        if accesDB.ifUserExists(cur, username) or ( accesDB.ifEmailExists(cur, email) and email_user_id != None):
            return {'error': 'This username / email is already use'}
        
        
        err = accesDB.addUser(cur, username, pwd)
        if not err:
            return {'error': 'can\'t create user'}
        
        user_id = accesDB.selectUser_id(cur, username)

        if email_user_id == -1:
            err = accesDB.addEmail(cur, email,user_id )
            if not err:
                return {'error': 'can\'t create user'}
        
        db.commit()
        cur.close()
        return {'id': user_id}
    return {'error': 'Invalid method'}
