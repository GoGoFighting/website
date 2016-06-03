(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var bg = document.getElementById('bg');
// let container = document.getElementById('container');
bg.style.height = document.documentElement.clientHeight + 'px';
window.onresize = function () {
    bg.style.height = document.documentElement.clientHeight + 'px';
    bg.style.width = document.documentElement.clientWidth + 'px';
    // if(document.documentElement.clientWidth <= 540){
    // 	bg.style.width = '540px';
    // }
    // if(document.documentElement.clientHeight <= 210){
    // 	bg.style.height = '210px';
    // }
};

},{}]},{},[1])


//# sourceMappingURL=index.js.map
