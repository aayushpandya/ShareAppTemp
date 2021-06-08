from flask import request,jsonify,Flask,Response
from flask_cors import CORS, cross_origin
import time as t
import json



import script as sp


app = Flask(__name__)
CORS(app)
def getIP(request):
  if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
    return request.environ['REMOTE_ADDR']
  else:
    return request.environ['HTTP_X_FORWARDED_FOR']

@app.route('/')
def status():
  return jsonify({"status":"running"}),200
@app.route('/print')
def print():
  return jsonify({"store":sp.printStore()}),200
@app.route('/clear')
def clear():
  sp.clear()
  return jsonify({"message":"Cleared"}),200
@app.route('/send/<name>/<code>/<valuetype>/<value>')
def send(name,code,valuetype,value):
  msg = sp.save([name,code,valuetype,value])
  #ip = getIP(request)
  #f.addIP(ip,name,0)
  return jsonify({"message":msg}),200

@app.route('/receivelist/<code>')
def receiveList(code):
  name = sp.receiveList(code)
  return jsonify({"name":name}),200

@app.route('/receive/<name>/<code>')
def receive(name,code):
  resp = sp.receive(name, code)
  return jsonify({"sender":resp[0],"value":resp[3],"type":resp[2]}),200




if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
  #app.run()