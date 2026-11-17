/* doc-index.js -- the filter on the /docs/ document index.
 *
 * The index is generated (tools/gen_doc_index.py) and server-rendered: every
 * row is in the HTML, so a crawler reads the whole tree and a browser with
 * JavaScript off still sees all 136 documents. This file only adds the
 * narrowing -- it never decides what is readable.
 *
 * No dependencies, no build step, no framework. It filters on what the row
 * already declares about itself: the path, the title and the declared state.
 */
(function () {
  var root = document.getElementById("doc-index");
  if (!root) return;

  var input = document.getElementById("doc-index-q");
  var shown = document.getElementById("doc-index-shown");
  var groups = Array.prototype.slice.call(root.querySelectorAll(".doc-index-group"));
  var tables = Array.prototype.slice.call(root.querySelectorAll(".table-wrap"));
  var rows = Array.prototype.slice.call(root.querySelectorAll(".doc-index-table tbody tr"));

  if (!rows.length) return;

  /* Pre-compute the haystack once, so typing does not re-read the DOM. */
  var hay = rows.map(function (tr) {
    var title = tr.querySelector(".doc-index-title");
    var state = tr.querySelector(".doc-index-state");
    return ((tr.getAttribute("data-path") || "") + " " +
            (title ? title.textContent : "") + " " +
            (state ? state.textContent : "")).toLowerCase();
  });

  function apply() {
    var q = (input && input.value ? input.value : "").trim().toLowerCase();
    var visible = 0;

    for (var i = 0; i < rows.length; i++) {
      var hit = !q || hay[i].indexOf(q) !== -1;
      rows[i].classList.toggle("is-hidden", !hit);
      if (hit) visible++;
    }

    /* A group with nothing left in it is noise -- hide the heading too. */
    for (var g = 0; g < groups.length; g++) {
      var table = groups[g].nextElementSibling;
      var any = false;
      if (table) {
        var groupRows = table.querySelectorAll("tbody tr");
        for (var r = 0; r < groupRows.length; r++) {
          if (!groupRows[r].classList.contains("is-hidden")) { any = true; break; }
        }
      }
      groups[g].classList.toggle("is-empty", !any);
    }

    if (shown) shown.textContent = String(visible);
  }

  if (input) {
    input.addEventListener("input", apply);
    input.addEventListener("search", apply);
    /* Escape clears the field in some browsers and fires no input event. */
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; apply(); }
    });
  }

  apply();
})();
