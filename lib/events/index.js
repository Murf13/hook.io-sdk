module['exports'] = function Events (client) {
  var self = this;

  self.get = function (account, cb) {
    client.request('/' + account + '/events', { json: true }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.stream = function (account, output) {
    var stream = client.request('/' + account + '/events?s=true', { stream: true, method: 'GET' });
    stream.pipe(output);
  };

  // TODO: write events
  return self;

};