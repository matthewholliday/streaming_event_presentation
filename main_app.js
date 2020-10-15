var jsforce = require('jsforce');

var conn = new jsforce.Connection();

console.log("Listening for events!");

conn.login(
  'rd@goldmountaintechnologies.com',
  'hTest1459amO58O2dc2fhLzpXpaPfjjzb', 
  function(err, res) {
    if (err) { 
      return console.error(err); 
    }

    const channel = "/data/ChangeEvents";
    const replayId = -1; 

    const changeDataCaptureClient = conn.streaming.createClient([
      new jsforce.StreamingExtension.Replay(channel, replayId),
      new jsforce.StreamingExtension.AuthFailure(() => process.exit(1))
    ]);

    // Subscribe to the channel with a function to receive each message.
    const subscription = changeDataCaptureClient.subscribe(channel, data => {
      console.log('CHANGE DATA CAPTURE EVENT: ', JSON.stringify(data,null,2));
    });    

  } //END OPERATIONS
);