"use strict";

var DefaultController = require( "./DefaultController" );

module.exports.setup = function( app ) {

    var models = app.get( "models" );
    var User = models.User;

    var ctrl = {};
    ctrl.index = DefaultController.index.bind( null, User );
    ctrl.get = DefaultController.get.bind( null, User );
    ctrl.create = DefaultController.create.bind( null, User );
    ctrl.update = DefaultController.update.bind( null, User );
    ctrl.destroy = DefaultController.destroy.bind( null, User );

    return ctrl;
};

