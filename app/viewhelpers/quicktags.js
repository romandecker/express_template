"use strict";

module.exports.script = function( jsfile ) {
    return '<script type="text/javascript" src="' + jsfile + '"></script>';
};

module.exports.style = function( cssfile ) {
    return '<link rel="stylesheet" href="' + cssfile + '"></link>';
};
