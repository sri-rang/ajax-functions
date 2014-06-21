(function () {
    "use strict";

    var assert = require("assert");

    global.window = {};

    require("../target/ajax.min.js");

    var ajax = window.ajax;

    describe("ajax", function () {

        it("should exist", function () {
            assert.ok(ajax);
        });

    });

})();
