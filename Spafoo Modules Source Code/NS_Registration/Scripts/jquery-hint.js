(function (a) { a.fn.hint = function (b) { if (!b) { b = "blur" } return this.each(function () { var c = a(this), d = c.attr("title"), e = a(this.form), f = a(window); if (d == "") { d = c.attr("chint") } function g() { if (this.value === d && c.hasClass(b)) { c.val("").removeClass(b) } } if (d) { c.blur(function () { if (this.value === "") { c.val(d).addClass(b) } }).focus(g).blur(); e.submit(g); f.unload(g) } }) } })(jQuery);