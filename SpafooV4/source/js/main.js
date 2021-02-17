/*============== Include HTML ============== */
(function () {
myHTMLInclude();
function myHTMLInclude() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("w3-include-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("w3-include-html");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          a.removeAttribute("w3-include-html");
          a.innerHTML = xhttp.responseText;
          z[i].parentNode.replaceChild(a, z[i]);
          myHTMLInclude();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}
})();
/*============== End Include HTML ============== */

/*======== Animated Burgger Menu ======= */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.transformicons = factory();
  }
}(this || window, function () {
  'use strict';
  var
    tcon = {}, 
    _transformClass = 'tcon-transform',
    DEFAULT_EVENTS = {
      transform : ['click'],
      revert : ['click']
    };

  var getElementList = function (elements) {
    if (typeof elements === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(elements));
    } else if (typeof elements === 'undefined' || elements instanceof Array) {
      return elements;
    } else {
      return [elements];
    }
  };

  var getEventList = function (events) {
    if (typeof events === 'string') {
      return events.toLowerCase().split(' ');
    } else {
      return events;
    }
  };

  var setListeners = function (elements, events, remove) {
    var
      method = (remove ? 'remove' : 'add') + 'EventListener',
      elementList = getElementList(elements),
      currentElement = elementList.length,
      eventLists = {};

    for (var prop in DEFAULT_EVENTS) {
      eventLists[prop] = (events && events[prop]) ? getEventList(events[prop]) : DEFAULT_EVENTS[prop];
    }
    
    while(currentElement--) {
      for (var occasion in eventLists) {
        var currentEvent = eventLists[occasion].length;
        while(currentEvent--) {
          elementList[currentElement][method](eventLists[occasion][currentEvent], handleEvent);
        }
      }
    }
  };

  var handleEvent = function (event) {
    tcon.toggle(event.currentTarget);
  };

  tcon.add = function (elements, events) {
    setListeners(elements, events);
    return tcon;
  };

  tcon.remove = function (elements, events) {
    setListeners(elements, events, true);
    return tcon;
  };

  tcon.transform = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.add(_transformClass);
    });
    return tcon;
  };

  tcon.revert = function (elements) {
    getElementList(elements).forEach(function(element) {
      element.classList.remove(_transformClass);
    });
    return tcon;
  };
  
  tcon.toggle = function (elements) {
    getElementList(elements).forEach(function(element) {
      tcon[element.classList.contains(_transformClass) ? 'revert' : 'transform'](element);
    });
    return tcon;
  };
  return tcon;
}));
/*======== End Animated Burgger Menu ======= */









