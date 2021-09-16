/* eslint-disable no-prototype-builtins */
/*
  Version: 1.0.0
  Author: Homero Cavazos
  Description: This is meant for global functions used across all pages

 */

"use strict";

export const app = (() => {
  function app() {
    const _ = this;

    _.state = {
      mobile: false,
    };
    _.settings = {
      debug: false,
      lang: "en",
      // Add opt settings
    };
  } //app function

  return app;
})();

app.prototype.setOpts = function (opts) {
  let _ = this;
  if (typeof opts == "object")
    for (let key in opts) {
      if (opts.hasOwnProperty(key)) {
        _.settings[key] = opts[key];
      }
    }
  else return;
}; //setOpts

app.prototype.getObjs = function (objs) {
  return Object.keys(objs).map(function (e) {
    return objs[e];
  });
}; // getObjs

app.prototype.debounce = function (fn, time) {
  let timeout;
  return function () {
    const functionCall = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

app.prototype.isMobile = function () {
  let _ = this;
  // ONLOAD
  if (window.innerWidth < 992) {
    _.state.mobile = true;
    if (_.settings.debug === true) {
      console.log("mobile");
    }
  } else {
    _.state.mobile = false;
    if (_.settings.debug === true) {
      console.log("desktop");
    }
  }
  return _.state.mobile;
}; //isMobile

app.prototype.isIE = function () {
  // ADD IE CLASS
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");
  let trident = ua.indexOf("Trident/");
  let edge = ua.indexOf("Edge/");
  if (msie > 0) {
    // IE 10 or older
    return true;
  } else if (trident > 0) {
    // IE 11
    document.body.classList.add("ie11");
    return true;
  } else if (edge > 0) {
    // Edge
    document.body.classList.add("edge");
    return true;
  }
  // other browser
  else {
    return false;
  }
}; //isIE

// START HERE!
app.prototype.init = function (opts) {
  let _ = this;

  // This overrides default options
  _.setOpts(opts);
  _.isMobile();
}; //init
