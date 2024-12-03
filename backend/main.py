### Flask import ###
from flask import Flask, request, jsonify
import pymysql
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

### Library import ###
import secrets
from datetime import timedelta


### Database access import ###
import accessDB 

### routes  import ###
import advertisment
import user
import auth
import admin



jwt = JWTManager()
app = Flask(__name__)
CORS(app)
app.secret_key = secrets.token_hex(16)

jwt.secret_key = secrets.token_hex(16)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

jwt.init_app(app)

### Database Configuration ###


def create_connection():
    try:
        db = pymysql.connect(
            user="root",
            # password="root",
            host="localhost",
            port=3306,
            database="JobBoard"
        )
        print("Connexion réussie")
        return db
    except pymysql.MySQLError as e:
        print(f"Erreur lors de la connexion à MySQL : {e}")
        return None
    

#db = create_connection()
db = create_connection()
Admin = ['Admin']


### Routes ###

@app.route('/', methods = ['GET', 'POST'])
@jwt_required(optional=True)
def home():
    if request.method == 'GET':
        current_user = get_jwt_identity()  # Remplacez par l'ID de l'utilisateur actuel
        username = accessDB.selectUser_byId(db, current_user)
        if username in Admin:
            return jsonify({'is_admin':True,'is_login':True, 'message': 'Welcome Admin'})
        else:
            return jsonify({'is_admin':False, 'is_login':True, 'message': 'Welcome User'})

    if request.method == 'POST':
        current_user = get_jwt_identity()        
        if current_user != None:
            username = accessDB.selectUser_byId(db, current_user)
            return jsonify({'is_login':False, 'message': 'You logout successfully'})
        return jsonify({'error': 'Cannot logout without login'})


@app.route('/offers/<int:id>', methods = ['GET', 'POST'])
def offers(id):
    db = create_connection()
    return advertisment.offerMethods(db, accessDB, id)
    
    
@app.route('/offers', methods = ['GET', 'POST', 'PUT', 'DELETE'])
@jwt_required(optional=True)
def offersAll():
    db = create_connection()

    current_user = get_jwt_identity()
    if current_user != None:
        username = accessDB.selectUser_byId(db, current_user)
        if username in Admin:
            return admin.offerMethods(db, accessDB)
    
    if request.method == 'GET':
        return advertisment.offerMethods(db, accessDB)
    return jsonify({'error': 'Unauthorized access'})


@app.route('/users/me', methods = ['GET','PUT'])
@jwt_required()
def users():
    
    id = get_jwt_identity()
    return user.profileMethods(db, accessDB, id)
    

@app.route('/users', methods = ['GET','POST', 'PUT','DELETE'])
@jwt_required()
def adminsUser():
    db = create_connection()

    current_user = get_jwt_identity()
    username = accessDB.selectUser_byId(db, current_user)
    if username not in Admin:
        return jsonify({'error': 'Unauthorized access'})
    
    return admin.userMethods(db, accessDB)


@app.route('/companies', methods = ['GET','POST', 'PUT','DELETE'])
@jwt_required()
def adminsCompany():
    db = create_connection()

    current_user = get_jwt_identity()
    username = accessDB.selectUser_byId(db, current_user)
    if username not in Admin:
        return jsonify({'error': 'Unauthorized access'})
       
    return admin.companyMethods(db, accessDB)



@app.route('/admins', methods = ['GET'])
@jwt_required()
def admins():
    return admin.adminGetMethods(db, accessDB)


### Login and Register Routes ###


@app.route('/login', methods = [ 'GET', 'POST' ] )
def logins():
    db = create_connection()
    
    response = auth.loginMethods(db, accessDB)
    if response.get('error'):
        return jsonify({'error': response.get('error')})
    id = response.get('id')
    
    token = create_access_token(identity=id)
        
    return jsonify({
        'token': token,
        'myId':id
        
    })

    
        
@app.route('/register', methods = ['GET', 'POST'])
def registers():
    
    response = auth.registerMethods(db, accessDB)

    if response.get('error'):
        return jsonify({'error': response.get('error')})
    id = response.get('id')
    if response.get('error'):
        return jsonify({'error': response.get('error')})
   
    token = create_access_token(identity=id)
    return jsonify( token, id)
 
### JWT Configuration ###

@jwt.expired_token_loader
def expired_token_callback():
     return jsonify({
         'message': 'The token has expired'
     }), 401
@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'message': 'Signature verification failed'
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        'description': 'Request does not contain an access token'
    }), 401

if __name__ == '__main__':
    app.run(debug=True)