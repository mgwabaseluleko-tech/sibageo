(function () {
  var form = document.getElementById("enquiry-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var btn = form.querySelector("button[type=submit]");
  var OK = "Thank you \u2014 your enquiry has been sent. We will be in touch soon.";

  function show(msg, kind) {
    status.textContent = msg;
    status.className = "form-status " + kind;
    try { status.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}
  }

  if (/[?&]sent=1/.test(location.search)) show(OK, "ok");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== "_next") data[k] = v; });
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending\u2026";
    show("Sending your enquiry\u2026", "info");

    var done = function () { btn.disabled = false; btn.textContent = label; };
    var fallbackSubmit = function () {
      // AJAX was blocked (extension, network, CORS): fall back to a normal form post
      show("Sending your enquiry\u2026", "info");
      HTMLFormElement.prototype.submit.call(form);
    };

    var ctrl = ("AbortController" in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);

    fetch("https://formsubmit.co/ajax/admin@sibageo.co.za", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        clearTimeout(timer);
        if (String(j.success) === "true") { form.reset(); show(OK, "ok"); done(); }
        else { show("We could not send your enquiry. Please email admin@sibageo.co.za or call 076 254 2554.", "error"); done(); }
      })
      .catch(function () { clearTimeout(timer); fallbackSubmit(); });
  });
})();
