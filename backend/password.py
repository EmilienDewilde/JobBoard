from werkzeug.security import generate_password_hash, check_password_hash


def generate_password(password):
    return generate_password_hash(password)

def check_password(password, hash):
    return check_password_hash(hash, password)
