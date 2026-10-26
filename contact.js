(function () {
  var form = document.getElementById("enquiry-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var btn = form.querySelector("button[type=submit]");
  var FALLBACK = "We could not send your enquiry. Please email admin@sibageo.co.za or call 076 254 2554.";

  function show(msg, kind) { status.textContent = msg; status.className = "form-status " + kind; }

  if (/[?&]sent=1/.test(location.search)) {
    show("Thank you \u2014 your enquiry has been sent. We will be in touch soon.", "ok");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.elements._honey && form.elements._honey.value) return; // bots fill the hidden field
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== "_honey" && k !== "_next") data[k] = v; });
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending\u2026";
    show("Sending your enquiry\u2026", "info");

    fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.j.success) === "true") {
          form.reset();
          show("Thank you \u2014 your enquiry has been sent. We will be in touch soon.", "ok");
        } else { throw new Error("send failed"); }
      })
      .catch(function () { show(FALLBACK, "error"); })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  });
})();
