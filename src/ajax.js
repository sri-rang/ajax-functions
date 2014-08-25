(function () {
    "use strict";

    window.ajax = {};

    window.ajax.post = function (url, data, on_complete) {
        var request,
            is_cross_domain = url.indexOf(location.hostname) === -1;

        if (is_cross_domain && window.XDomainRequest) {
            request = new XDomainRequest();
            request.onprogress = function () {};
            request.onload = function () {
                var response = JSON.parse(request.responseText);
                on_complete(response);
            };
        }
        else {
            request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState < 4) return;
                if (request.status !== 200) return;
                if (request.readyState === 4) {
                    var response = JSON.parse(request.responseText);
                    on_complete(response);
                }
            };
        }

        request.open("POST", url, true);
        if (!(data instanceof FormData)) data = JSON.stringify(data);
        request.send(data);
    }

})();
