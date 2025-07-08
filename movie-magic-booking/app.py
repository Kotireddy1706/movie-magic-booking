from flask import Flask, render_template, request, redirect, session, flash, url_for
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import boto3
import uuid

app = Flask(__name__)
app.secret_key = '9a4f90b2b6df594f2e16f6c1f3d9e0ab0cd431c0f0176a2544e740c94cb75a0e'

# ----------------------------
# AWS SNS Configuration
# ----------------------------
sns = boto3.client('sns', 'us-east-1')  # e.g., 'ap-south-1'
sns_topic_arn = 'arn:aws:sns:us-east-1:888577042471:MovieTicketNotifications'  # ✅ Fixed quote

def send_booking_email(email, movie, date, time, theatre, seat, booking_id):
    message = f"""
    🎟️ Booking Confirmed!

    Movie: {movie}
    Date: {date}
    Time: {time}
    Theatre: {theatre}
    Seat(s): {seat}
    Booking ID: {booking_id}

    Thank you for booking with Movie Magic!
    """
    sns.publish(
        TopicArn=sns_topic_arn,
        Message=message,
        Subject='Your Movie Ticket Booking Confirmation'
    )

# ----------------------------
# DATABASE SETUP
# ----------------------------
def init_db():
    conn = sqlite3.connect('movie_magic.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    mobile TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                )''')
    conn.commit()
    conn.close()

init_db()

# ----------------------------
# MOVIE DATA
# ----------------------------
movie_data = [
    {
        "title": "Kalki 2898 AD",
        "image": "images/Kalki.jpg",
        "description": "A mytho-sci-fi epic starring Prabhas & Deepika.",
        "param": "Kalki%202898%20AD"
    },
    {
        "title": "Manamey",
        "image": "images/Manamey.jpg",
        "description": "A heartwarming rom-com starring Sharwanand.",
        "param": "Manamey"
    },
    {
        "title": "Rajasab",
        "image": "images/Rajasab.jpg",
        "description": "A gripping political thriller from the South.",
        "param": "Rajasab"
    },
    {
        "title": "Kubera",
        "image": "images/Kubera.jpg",
        "description": "A dark tale of crime, money, and morality.",
        "param": "Kubera"
    }
]

# ----------------------------
# HOME ROUTE
# ----------------------------
@app.route('/')
def home():
    return render_template('index.html', movies=movie_data)

# ----------------------------
# REGISTER
# ----------------------------
@app.route('/register', methods=['POST'])
def register():
    fname = request.form['firstName']
    lname = request.form['lastName']
    mobile = request.form['mobile']
    email = request.form['email']
    password = request.form['password']
    hashed_pw = generate_password_hash(password)

    try:
        conn = sqlite3.connect('movie_magic.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (first_name, last_name, mobile, email, password) VALUES (?, ?, ?, ?, ?)",
                  (fname, lname, mobile, email, hashed_pw))
        conn.commit()
        conn.close()
        flash("Registration successful! Please log in.", "success")
    except sqlite3.IntegrityError:
        flash("Email already registered. Try logging in.", "danger")
    
    return redirect(url_for('home'))

# ----------------------------
# LOGIN
# ----------------------------
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    conn = sqlite3.connect('movie_magic.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    conn.close()

    if user and check_password_hash(user[5], password):
        session['user'] = user[1]  # First name
        flash("Login successful!", "success")
    else:
        flash("Invalid email or password.", "danger")
    
    return redirect(url_for('home'))

# ----------------------------
# LOGOUT
# ----------------------------
@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("You have been logged out.", "info")
    return redirect(url_for('home'))

# ----------------------------
# BOOKING ROUTES
# ----------------------------
@app.route('/booking')
def booking():
    movie = request.args.get('movie')
    if not movie:
        return redirect('/')
    return render_template('booking.html', movie=movie)

@app.route('/theatreselection')
def theatre_selection():
    args = request.args.to_dict()
    if not all(k in args for k in ('movie', 'date', 'time')):
        return redirect('/booking')
    return render_template('theatreselection.html', **args)

@app.route('/seatcount')
def seat_count():
    args = request.args.to_dict()
    if not all(k in args for k in ('movie', 'date', 'time', 'theatre')):
        return redirect('/theatreselection')
    return render_template('seatcount.html', **args)

@app.route('/seatselection')
def seat_selection():
    args = request.args.to_dict()
    if not all(k in args for k in ('movie', 'date', 'time', 'theatre', 'count')):
        return redirect('/seatcount')
    return render_template('seatselection.html', **args)

@app.route('/bookingsummary')
def booking_summary():
    args = request.args.to_dict()
    if not all(k in args for k in ('movie', 'date', 'time', 'theatre', 'count', 'seats')):
        return redirect('/seatselection')
    return render_template('bookingsummary.html', **args)

@app.route('/payment')
def payment():
    args = request.args.to_dict()
    if not all(k in args for k in ('movie', 'date', 'time', 'theatre', 'count', 'seats', 'price')):
        return redirect('/bookingsummary')
    return render_template('payment.html', **args)

@app.route('/finalticket')
def final_ticket():
    args = request.args.to_dict()
    required = ['movie', 'date', 'time', 'theatre', 'count', 'seats', 'price', 'email', 'mobile', 'payment']
    if not all(k in args for k in required):
        return redirect('/payment')
    
    booking_id = str(uuid.uuid4())
    try:
        send_booking_email(
            email=args['email'],
            movie=args['movie'],
            date=args['date'],
            time=args['time'],
            theatre=args['theatre'],
            seat=args['seats'],
            booking_id=booking_id
        )
        flash("Booking confirmed! Email sent.", "success")
    except Exception as e:
        flash(f"Booking confirmed but email failed: {str(e)}", "warning")

    return render_template('finalticket.html', **args, booking_id=booking_id)

# ----------------------------
# APP ENTRY POINT (with new port)
# ----------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
