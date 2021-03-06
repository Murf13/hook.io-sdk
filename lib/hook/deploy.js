var config = require('../../config');

module['exports'] = function Deploy (pkg, cb) {

  var fs = require('fs');
  var self = this;

  //
  // scan directory for potential app, if app is found attempt to create new hook with index.js as source
  // package.json
  // mschema.js - optional - mschema of the service
  // view.html - optional - View of the service
  // presenter.js - optional - View Presenter of the service
  // read package.json for properties and use them ( if they exist )

  if (typeof pkg !== 'object') {
    return cb(new Error('No pkg option was found.'))
  }

  pkg.owner = config.user;
  self.get({ name: pkg.name, owner: config.user }, function (err, _hook) {
    if (err) {
      // could not find existing hook service with this name,
      // attempt to create new service
      _create(pkg, function (err, _service){
        if (err) {
          return cb(err);
        }
        cb(null, _service);
      });
    } else {
      _update(pkg, function (err, _service){
        if (err) {
          return cb(err);
        }
        cb(null, _service);
      });
    }
  });

  function _create (pkg, _cb) {
    self.create(pkg, function (err, _created){
      _cb(err, _created);
    });
  };

  function _update (pkg, _cb) {
    self.update(pkg, function (err, _updated){
      _cb(err, _updated);
    });
  };

  return self;

}