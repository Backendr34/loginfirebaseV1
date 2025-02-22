from flask import Flask, render_template

app = Flask(__name__)

# Route for the login (authentication) page
@app.route('/')
def login():
    return render_template('login.html')

# Route for the home page after authentication
@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
