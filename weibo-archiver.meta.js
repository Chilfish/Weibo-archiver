// ==UserScript==
// @name         Weibo Archiver
// @namespace    chilfish/monkey
// @version      0.3.10
// @author       Chilfish
// @description  将你的新浪微博存档备份的油猴脚本，为号被完全夹没前绸缪 😭
// @license      MIT
// @icon         https://p.chilfish.top/weibo/icon.webp
// @homepage     https://github.com/Chilfish/Weibo-archiver
// @source       https://github.com/Chilfish/Weibo-archiver/tree/main/packages/monkey
// @supportURL   https://github.com/Chilfish/Weibo-archiver/issues
// @downloadURL  https://github.com/Chilfish/Weibo-archiver/raw/monkey/weibo-archiver.user.js
// @updateURL    https://github.com/Chilfish/Weibo-archiver/raw/monkey/weibo-archiver.meta.js
// @match        https://weibo.com/u/*
// @match        https://weibo.com/n/*
// @match        https://weibo.chilfish.top/*
// @require      https://unpkg.com/vue@3.4.21/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://unpkg.com/vue-demi@latest/lib/index.iife.js
// @require      https://unpkg.com/pinia@2.1.7/dist/pinia.iife.js
// @require      https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.14.3/dist/system.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.14.3/dist/extras/named-register.min.js
// @require      data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==