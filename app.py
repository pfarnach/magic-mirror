from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_url_path='/static', template_folder='./')

DEBUG = True
PORT = 8000
HOST = '0.0.0.0'

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/<path:path>')
def serve_static(path):
	return send_from_directory('static', path)

# To get the show on the road
if __name__ == '__main__':
	app.run(debug=DEBUG, port=PORT, host=HOST)

# print sys.exc_info()[0]
