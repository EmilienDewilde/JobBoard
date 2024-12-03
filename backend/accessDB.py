    
from password import generate_password, check_password
import pymysql


### User TABLE ###

def getUsers(cur):
    cur.execute("select * from users")
    return cur.fetchall()

def ifUserExists(cur, username):
    if username == "":
        return False
    cur.execute(f"select username from users where username = '{username}'")
    if cur.rowcount == 0:
        return False
    return True

def isUserAdmin(cur, username):
    if username == "":
        return False
    cur.execute(f"select username,password from users where username = '{username}'")
    if cur.rowcount == 0:
        return False
    user = cur.fetchone()
    if user[0] == "Admin" and check_password("Admin", user[1]):
        return True
    return False

def selectUser_id(cur, username):
    if username == "":
        return 1
    cur.execute(f"select id from users where username = '{username}'")
    if cur.rowcount == 0:
        return 1
    user = cur.fetchone()
    return user[0]

def selectUser_byId(conn, user_id):
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT username FROM users WHERE id = %s", (user_id,))
            result = cur.fetchone()

            if result:
                return result[0]
            else:
                return None
    except pymysql.MySQLError as e:
        print(f"Erreur lors de l'exécution de la requête MySQL : {e} - {e.args}")
        return None


def selectUser(cur, username):
    if username == "":
        return 1
    
    try:
        cur.execute("SELECT username, password FROM users WHERE username = %s", (username,))
        
        if cur.rowcount == 0:
            return 1  # Aucune correspondance pour cet utilisateur
        
        user = cur.fetchone()  # Utiliser fetchone pour un seul résultat
        return user
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")
        return None  # Retourner None en cas d'erreur


def checkUser(cur, username, password):
    if username == "" and password == "":
        return False
    user = selectUser(cur, username)
    if user == 1 or user == None:
        return False
    if check_password(password, user[1]) and user[0] == username:
        return True
    return False

def updateUser(cur, username, new_username, email, password):
    if username == "" and new_username == "" and email == "" and password == "":
        return 1
    res = 1
    cur.execute(f"select id from users where username = '{username}'")
    user_id = cur.fetchone()[0]
    cur.execute(f"select password from users where id = '{user_id}'")
    hash_password = cur.fetchone()[0]
    
    if password != "":
        if not check_password( password,hash_password) :
            password = generate_password(password)
            cur.execute(f"update users set password = '{password}' where id = '{user_id}'")
            res = 0
    
    if email != cur.execute(f"select email from emails where user_id = '{user_id}'"):
        updateEmail(cur, user_id, email)
        res = 0

    
    if username != new_username:
        cur.execute(f"update users set username = '{new_username}' where id = '{user_id}'")
        res = 0
    return res

def addUser(cur, username, password):
    if username == "" or password == "":
        return 0
    password = generate_password(password)
    cur.execute(f"insert into users (username, password) values ('{username}', '{password}')")
    return cur.rowcount

def deleteUser(cur, username):
    if username == "":
        return 0
    cur.execute(f"select id from users where username = '{username}'")
    user_id = cur.fetchone()
    
    cur.execute(f"delete from emails where user_id = '{user_id}'")
    
    cur.execute(f"delete from users where username = '{username}'")
    return cur.rowcount

### Email TABLE ###

def addEmail(cur, email, user_id = None):
    if email == "" and user_id == None:
        return 0
    if user_id:
        cur.execute(f"insert into emails (email, user_id) values ('{email}', '{user_id}')")
        return cur.rowcount
    cur.execute(f"insert into emails (email) values ('{email}')")
    return cur.rowcount

def selectEmail(cur, user_id):
    if user_id == "":
        return 1
    cur.execute(f"select email from emails where user_id = '{user_id}'")
    email = cur.fetchone()
    return email[0]
    

def updateEmail(cur, user_id, new_email):
    if new_email == "" or user_id == "":
        return 0
    cur.execute(f"update emails set email = '{new_email}' where user_id = '{user_id}'")
    return cur.rowcount

def deleteEmail(cur, email):
    if email == "":
        return 0
    cur.execute(f"delete from emails where email = '{email}'")
    return cur.rowcount

def ifEmailExists(cur, email):
    if email == "":
        return False
    cur.execute(f"select email from emails where email = '{email}'")
    if cur.rowcount == 0:
        return False
    return True

def get_user_id(cur, email):
    if email == "":
        return -1
    cur.execute(f"select user_id from emails where email = '{email}'")
    user_id = cur.fetchone()
    if cur.rowcount == 0:
        return -1
    return user_id[0]


### Offer (advertisement TABLE) ### 

def getOffers(cur):
    try:
        cur.execute("select id, title, description, salary, company_id, location from advertisments")
        return cur.fetchall()
    except pymysql.MySQLError as e:
        print(f"Erreur lors de l'exécution de la requête : {e}")
        return None


def CreateOffer(cur, title, description, salary, company, location):
    if title == "" or description == "" or salary == "" or company == "" or location == "":
        return 1
    cur.execute(f"select id from companies where name = '{company}'")
    company_id = cur.fetchone()[0]
    
    cur.execute(f"insert into advertisments (title, description, salary, company_id, location) values ('{title}', '{description}', '{salary}', '{company_id}', '{location}')")
    return 0

def updateOffer(cur, offer_id, new_title, new_description, new_salary, new_company, new_location):
    if  new_title == "" and new_description == "" and new_salary == 0 and new_company == "" and new_location == "":
        return 0
        
    if new_title != "":
        cur.execute(f"update advertisments set title = '{new_title}' where id = '{offer_id}'")
    if new_description != "":
        cur.execute(f"update advertisments set description = '{new_description}' where id = '{offer_id}'")
    if new_salary != 0:
        cur.execute(f"update advertisments set salary = '{new_salary}' where id = '{offer_id}'")
    if new_company != "":
        cur.execute(f"select id from companies where name = '{new_company}'")
        new_company_id = cur.fetchone()[0]
        cur.execute(f"update advertisments set company_id = '{new_company_id}' where id = '{offer_id}'")
    
    return cur.rowcount

def deleteOffer(cur, offer_id):
    if offer_id == "":
        return 0    
    cur.execute(f"delete from advertisments where id = '{offer_id}'")
    return cur.rowcount

### Company TABLE ###

def getCompanies(cur):
    cur.execute("select * from companies")
    return cur.fetchall()

def getCompany(cur, id):
    if id == None:
        return 1
    cur.execute(f"select name from companies where id = '{id}'")
    return cur.fetchone()[0]

def ifCompanyExists(cur, name):
    if name == "":
        return False
    cur.execute(f"select name from companies where name = '{name}'")
    if cur.rowcount == 0:
        return False
    return True

def createCompany(cur, name):
    if name == "":
        return 0
    cur.execute(f"insert into companies (name) values ('{name}')")
    return cur.rowcount

def updateCompany(cur,company_id, new_name):
    if new_name == "":
        return 0
    
    cur.execute(f"update companies set name = '{new_name}' where id = '{company_id}'")
    return cur.rowcount

def deleteCompany(cur, name):
    if name == "":
        return 0
    cur.execute(f"delete from companies where name = '{name}'")
    return cur.rowcount

### Application TABLE ###

def apply(cur,advertisment_id, email, message):
    if email == "" or message == "":
        return 1
    
    if not ifEmailExists(cur, email):
        addEmail(cur, email)
        
    cur.execute(f"select id from emails where email = '{email}'")
    email_id = cur.fetchone()[0]
        # replace ' by \" to avoid SQL injection
    message = message.replace("'", "\"")
    cur.execute(f"insert into applications (advertisment_id, email_id, message) values ('{advertisment_id}', '{email_id}', '{message}')")
    
def unapply(cur, offer_title, offer_location, offer_company, username):
    if offer_title == "" or offer_location == "" or offer_company == "" or username == "":
        return 1
    cur.execute(f"select id from users where username = '{username}'")
    user_id = cur.fetchone()[0]
    
    cur.execute(f"select id from advertisments where title = '{offer_title}' and location = '{offer_location}' and company_id = '{offer_company}'")
    advertisement_id = cur.fetchone()[0]
    
    cur.execute(f"delete from applications where advertisment_id = '{advertisement_id}' and user_id = '{user_id}'")
    
def getApplications(cur, username):
    cur.execute(f"select advertisment_id from applications where user_id = '{username}'")
    return cur.fetchall()