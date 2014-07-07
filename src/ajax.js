(function () {
    "use strict";

    window.ajax = {};

    window.ajax.post = function (url, data, on_complete) {
        var xhr;

        if (typeof XMLHttpRequest !== "undefined") xhr = new XMLHttpRequest();
        else {
            var versions = [
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) {}
            }
        }

        xhr.onreadystatechange = ensure_readiness;

        function ensure_readiness() {
            if (xhr.readyState < 4) return;
            if (xhr.status !== 200) return;
            if (xhr.readyState === 4) {
                var response = JSON.parse(xhr.responseText);
                on_complete(response);
            }
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8;");
        xhr.send(JSON.stringify(data));
    }

})();
