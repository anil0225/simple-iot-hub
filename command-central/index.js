// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = 'HostName=iothub33.azure-devices.net;SharedAccessKeyName=command;SharedAccessKey=DVnqdspnn6dL4aHqJRUe7AwGcaqMxhbEynGKCwgMgqk=';
var targetDevice = 'device1';

var client = Client.fromConnectionString(connectionString);

client.open(function (err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function () {
      var data = JSON.stringify({ text : 'foo' });
      var message = new Message(data);
      message.messageId = 'foo from cloud';
      console.log('Sending message: ' + message.getData());
      client.send(targetDevice, message, printResultFor('send'));
    }, 2000);
  }
});

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    } else {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}