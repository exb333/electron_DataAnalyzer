const zerorpc = require('zerorpc')
require('node-import');

var echo_mod = imports('echo')

let client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

echo_mod.echo_func(client);
