function preventDefault(event) {
  event.preventDefault();
  return false;
}

function fireEvent(element, type, params) {
  var event; // The custom event that will be created
  var param;

  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = type;
  }

  event.eventName = type;
  event.bubbles = false;
  if (params) {
    for (param in params) {
      if (params.hasOwnProperty(param)) {
        event[param] = params[param];
      }
    }
  }

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent('on' + event.eventType, event);
  }
}

/**
 * Creates a function which can be called from an event handler independent of
 * scope.
 *
 * @param {Object} obj the object the function will be called on
 * @param {String} func the name of the function to be called
 * @retuns {function}
 */
function createHandler(obj, func) {
  var handler;

  if (typeof func === typeof 'aaa') {
    handler = function (e) {
      if (obj[func]) {
        return obj[func](e);
      }
    };
  } else {
    handler = function () { return func(obj); };
  }
  return handler;
}

module.exports.preventDefault = preventDefault;
module.exports.fireEvent = fireEvent;
module.exports.createHandler = createHandler;