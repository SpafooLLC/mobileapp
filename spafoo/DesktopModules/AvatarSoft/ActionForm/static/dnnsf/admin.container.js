; function dnnsfInitFrame(iframe, prefix, optUrl) {

    var $ = dnnsfjQuery;
    iframe = $(iframe);

    $(function () {
        $(window).bind("message", function (event) {
            iframe.attr("scrolling", "no");
            var msg;
            try { msg = JSON.parse(event.originalEvent.data); } catch (e) { return; }
            if (msg && typeof msg == "object") {
                if (msg.type == prefix + "-height") {
                    iframe.stop(true, false).animate({ height: msg.height }, 100);

                    // hide the scrollbar of current window and rely on auto-height feature
                    var w = iframe[0].contentWindow || iframe[0].window;
                    $('body', w.document).css('overflow', 'hidden').attr('scroll', 'no');

                } else if (msg.type == prefix + "-scroll") {
                    $('html, body').animate({
                        scrollTop: iframe.offset().top + msg.offset
                    }, 500);
                }
            }
        });

        var _oldOffset = 0;
        setInterval(function () {
            var offset = $(window).scrollTop() - iframe.offset().top
                + $('body').offset().top; // in admin mode, there's a margin on the body to account for the top control panels

            // only send the message if offset has changed
            if (offset == _oldOffset)
                return;
            _oldOffset = offset;
            iframe[0].contentWindow.postMessage(JSON.stringify({
                type: prefix + "-offset",
                offset: offset
            }), "*");
        }, 100);

        // fix the opacity that DNN adds in edit mode
        iframe.parents('.DnnModule:first').css('opacity', '1');

        // init open traits widget
        try {
            if (optUrl) {
                window._optw = window._optw || {
                    project: optUrl,
                    bgColor: '#FF8800',
                    color: '#ffffff',
                    position: ['bottom', 'left']
                };

                (function () {
                    var opt = document.createElement('script'); opt.type = 'text/javascript'; opt.async = true;
                    opt.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//cdn.opentraits.com/js/optwidget.min.js.gzip?v=1.3.0.042';
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(opt, s);
                })();
            }
        } catch (e) { }

    });

}
