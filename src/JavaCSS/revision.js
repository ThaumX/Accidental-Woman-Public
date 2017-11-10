(function () {
  version.extensions['revisionMacros'] = {
    major: 1,
    minor: 2,
    revision: 0
  };

  function tagcontents(b, starttags, desttags, endtags, k) {
    function tagfound(i, e) {
      for (var j = 0; j < e.length; j++) {
        if (a.indexOf(e[j], i) == i) {
          return e[j];
        }
      }
    }
    var a = b.source.slice(k);
    var l = 0;
    var c = "";
    var tg;
    for (var i = 0; i < a.length; i++) {
      if (tg = tagfound(i, starttags)) {
        l++;
      }
      else if ((tg = tagfound(i, desttags)) && l == 0) {
        b.nextMatch = k + i + tg.length;
        return [c, tg];
      }
      else if (tg = tagfound(i, endtags)) {
        l--;
        if (l < 0) {
          return null;
        }
      }
      c += a.charAt(i);
    }
    return null;
  }
  macros['cycle'] = macros['insertion'] = macros['removal'] = macros['revision'] = macros['span'] = {
    handler: function (g, e, f, b) {
      var begintags = ["<<revision", "<<cycle", "<<insertion", "<<removal", "<<span"];
      var becomes = ["<<becomes>>", "<<gains>>"];
      var endtags = ["<<endrevision>>", "<<endcycle>>", "<<endinsertion>>", "<<endremoval>>", "<<endspan>>"];
      var name = f[0].replace(" ", "_");
      var k = b.source.indexOf('>>', b.matchStart) + 2;
      var c, vsns, vsn, i, cn, vtype;
      vsns = [];
      c = tagcontents(b, begintags, becomes.concat(endtags), endtags, k);
      if (c && endtags.indexOf(c[1]) == -1) {
        while (c) {
          vsns.push(c);
          c = tagcontents(b, begintags, becomes, endtags, b.nextMatch);
        }
        c = tagcontents(b, begintags, ["<<end" + e + ">>"], endtags, b.nextMatch);
      }
      if (!c) {
        throwError(g, "can't find matching end" + e);
        return;
      }
      vsns.push(c);
      i = 0;
      cn = 0;
      var m = insertElement(g, "span", null, e + " " + name);
      if (vsns.length > 0) {
        var h = insertElement(m, "span", null, "revision-span initial");
      }
      else {
        var h = m;
      }
      if (e == "insertion") {
        h.style.display = "none";
      }
      h.setAttribute("data-enabled", (e != "insertion") + "");
      vsn = vsns.shift();
      h.tweecode = vsn[0];
      while (vsns.length > 0) {
        i += 1;
        vtype = vsn[1].slice(2, -2);
        vsn = vsns.shift();
        h = insertElement(m, "span", null, "revision-span " + vtype);
        h.tweecode = vsn[0];
        h.setAttribute("data-enabled", "false");
        h.style.display = "none";
      }
      h = m.firstChild;
      new Wikifier(h, h.tweecode);
    }
  };
  var de = "data-enabled";

  function revise(rt, rname) {
    var rall, r, rc, rcl, ind, ind2, curr, next, ins, rmv, cyc, rev, rnd;
    rev = (rt == "revert");
    rnd = (rt.indexOf("random") > -1);
    var rsp = "revision-span";

    function showVer(n) {
      n.innerHTML = "";
      new Wikifier(n, n.tweecode);
      n.setAttribute(de, "true");
      n.style.display = "inline";
      n.classList.remove(rsp + "-out");
      n.classList.add(rsp + "-in");
      if (n.timeout) clearTimeout(n.timeout);
      n.timeout = setTimeout(function () {
        n.classList.remove(rsp + "-in");
      }, 1);
    }

    function hideVer(n) {
      n.setAttribute(de, "false");
      n.classList.remove(rsp + "-in");
      n.classList.add(rsp + "-out");
      if (n.timeout) clearTimeout(n.timeout);
      n.timeout = setTimeout(function () {
        if (n.getAttribute(de) == "false") {
          n.classList.remove(rsp + "-out");
          n.style.display = "none";
          n.innerHTML = "";
        }
      }, 50);
    }

    function doToGainerSpans(n, fn) {
      for (var k = n - 1; k >= 0; k--) {
        if (rc[k + 1].classList.contains("gains")) {
          fn(rc[k]);
        }
        else break;
      }
    }
    rall = document.getElementsByClassName(rname);
    for (var i = 0; i < rall.length; i++) {
      r = rall[i];
      rc = r.childNodes;
      ins = r.classList.contains("insertion");
      rmv = r.classList.contains("removal");
      cyc = r.classList.contains("cycle");
      rcl = rc.length - 1;
      ind = -1;
      for (var k = 0; k <= rcl; k++) {
        if (rc[k].getAttribute(de) == "true") {
          ind = k;
        }
      }
      if (ind == -1) {
        if (ins) {
          ind = -1;
          curr = null;
        }
        else if (rmv) {
          ind = rcl + 1;
          curr = null;
        }
      }
      else {
        if (rev) {
          ind -= 1;
        }
        curr = (ind >= 0 ? rc[ind] : (cyc ? rc[rcl] : null));
      }
      ind2 = ind;
      if (rnd) {
        ind2 = (ind + (Math.floor(Math.random() * rcl))) % rcl;
      }
      next = (ind2 < rcl ? rc[ind2 + 1] : (cyc ? rc[0] : null));
      var docurr = (rev ? showVer : hideVer);
      var donext = (rev ? hideVer : showVer);
      if (curr) {
        if (!(next && next.classList.contains("gains")) || rnd) {
          docurr(curr);
          doToGainerSpans(ind, docurr);
        }
      }
      if (next) {
        donext(next);
        if (rnd) {
          doToGainerSpans(ind2 + 1, donext);
        }
      }
    }
  }

  macros['revert'] = macros['revise'] = macros['randomise'] = macros['randomize'] = {
    handler: function (a, b, c) {
      var l, rev, rname;

      function disableLink(l) {
        l.style.display = "none";
      }

      function enableLink(l) {
        l.style.display = "inline";
      }

      function updateLink(l) {
        if (l.className.indexOf("random") > -1) {
          enableLink(l);
          return;
        }
        var rall = document.getElementsByClassName(rname);
        var cannext, canprev;
        for (var i = 0; i < rall.length; i++) {
          var r = rall[i];
          if (r.classList.contains("cycle")) {
            cannext = canprev = true;
          }
          else {
            var rc = r.childNodes;
            var rcl = rc.length;
            var ins = r.classList.contains("insertion");
            var rmv = r.classList.contains("removal");
            var rnd = rname.indexOf("random") > -1;
            var ind = -1;
            for (var k = 0; k < rc.length; k++) {
              if (rc[k].getAttribute(de) == "true") {
                ind = k;
              }
            }
            if (ind == -1 && (ins || rmv)) {
              (ins ? cannext = true : canprev = true);
            }
            if (ind > (ins ? -1 : 0)) {
              canprev = true;
            }
            if (ind > -1 && ind < (rmv ? rcl : rcl - 1)) {
              cannext = true;
            }
          }
        }
        var can = (l.classList.contains("revert") ? canprev : cannext);
        (can ? enableLink : disableLink)(l);
      }
      function toggleText(w) {
          w.classList.toggle(rl + "Enabled");
          w.classList.toggle(rl + "Disabled");
          w.style.display = ((w.style.display == "none") ? "inline" : "none");
      }
      var rl = "reviseLink";
      if (c.length < 2) {
        throwError(a, b + ' macro needs 2 parameters');
        return;
      }
      rname = c.shift().replace(" ", "_");
      l = Wikifier.createInternalLink(a, null);
      l.className = "internalLink " + rl + " " + rl + "_" + rname + " " + b;
      var v = "";
      var end = false;
      var out = false;
      if(c.length>1 && c[0][0] == "$") {
        v = c[0].slice(1);
        c.shift();
      }
      switch(c[c.length - 1]) {
        case "end":
          end = true;
          c.pop();
          break;
        case "out":
          out = true;
          c.pop();
          break;
      }
      var h = state.history[0].variables;
      for(var i = 0; i < c.length; i++) {
        var on = (i == Math.max(c.indexOf(h[v]), 0));
        var d = insertElement(null, "span", null, rl + ((on) ? "En" : "Dis") + "abled");
        if(on) {
          h[v] = c[i];
          l.setAttribute("data-cycle", i);
        } else {
          d.style.display="none";
        }
        insertText(d, c[i]);
        l.appendChild(d);
      }
      l.onclick = function () {
        revise(b, rname);
        var t = this.childNodes;
        var u = this.getAttribute("data-cycle") - 0;
        var m = t.length;
        if((end || out) && u == m - (end ? 2 : 1)) {
          if (end) {
            var n = this.removeChild(t[u + 1]);
            n.className = rl + "End";
            n.style.display = "inline";
            this.parentNode.replaceChild(n, this);
          } else {
            this.parentNode.removeChild(this);
            return;
          }
        } else {
          toggleText(t[u]);
          u = (u + 1) % m;
          if(v) {
            h[v] = c[u];
          }
          toggleText(t[u]);
          this.setAttribute("data-cycle", u);
        }
        var lall = document.getElementsByClassName(rl + "_" + rname);
        for (var i = 0; i < lall.length; i++) {
          updateLink(lall[i]);
        }
      };
      disableLink(l);
      setTimeout(function () {
        updateLink(l);
      }, 1);
    }
  };
  macros['hoverrevise'] = {
    handler: function (a, b, c, d) {
      var endtags = ["<<end" + b + ">>"];
      var t = tagcontents(d, ["<<" + b + ">>"], endtags, endtags, d.source.indexOf('>>', d.matchStart) + 2);
      if (t) {
        var rname = c[0].replace(" ", "_");
        var h = insertElement(a, "span", null, "hoverrevise hoverrevise_" + rname);
        new Wikifier(h, t[0]);
        h.onmouseover = function () {
          revise("revise", rname);
        };
        h.onmouseout = function () {
          revise("revert", rname);
        };
      }
    }
  };
  macros['becomes'] = macros['gains'] = macros['endrevision'] = macros['endinsertion'] = macros['endremoval'] = macros[
    'endcycle'] = macros['endhoverrevise'] = {
    handler: function () {}
  };

}());