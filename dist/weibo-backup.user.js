// ==UserScript==
// @name         weibo-backup
// @namespace    chilfish/monkey
// @version      0.0.1
// @author       Chilfish
// @description  weibo-backup
// @license      MIT
// @icon         https://vitejs.dev/logo.svg
// @match        https://weibo.com/u/*
// @match        https://weibo.com/n/*
// @require      https://unpkg.com/vue@3.3.4/dist/vue.global.prod.js
// ==/UserScript==

(r=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=r,document.head.append(e)})(` @charset "UTF-8";:root{--el-color-white:#ffffff;--el-color-black:#000000;--el-color-primary-rgb:64,158,255;--el-color-success-rgb:103,194,58;--el-color-warning-rgb:230,162,60;--el-color-danger-rgb:245,108,108;--el-color-error-rgb:245,108,108;--el-color-info-rgb:144,147,153;--el-font-size-extra-large:20px;--el-font-size-large:18px;--el-font-size-medium:16px;--el-font-size-base:14px;--el-font-size-small:13px;--el-font-size-extra-small:12px;--el-font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\u5FAE\u8F6F\u96C5\u9ED1",Arial,sans-serif;--el-font-weight-primary:500;--el-font-line-height-primary:24px;--el-index-normal:1;--el-index-top:1000;--el-index-popper:2000;--el-border-radius-base:4px;--el-border-radius-small:2px;--el-border-radius-round:20px;--el-border-radius-circle:100%;--el-transition-duration:.3s;--el-transition-duration-fast:.2s;--el-transition-function-ease-in-out-bezier:cubic-bezier(.645, .045, .355, 1);--el-transition-function-fast-bezier:cubic-bezier(.23, 1, .32, 1);--el-transition-all:all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);--el-transition-fade:opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-md-fade:transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-fade-linear:opacity var(--el-transition-duration-fast) linear;--el-transition-border:border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-box-shadow:box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-color:color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-component-size-large:40px;--el-component-size:32px;--el-component-size-small:24px}:root{color-scheme:light;--el-color-white:#ffffff;--el-color-black:#000000;--el-color-primary:#409eff;--el-color-primary-light-3:#79bbff;--el-color-primary-light-5:#a0cfff;--el-color-primary-light-7:#c6e2ff;--el-color-primary-light-8:#d9ecff;--el-color-primary-light-9:#ecf5ff;--el-color-primary-dark-2:#337ecc;--el-color-success:#67c23a;--el-color-success-light-3:#95d475;--el-color-success-light-5:#b3e19d;--el-color-success-light-7:#d1edc4;--el-color-success-light-8:#e1f3d8;--el-color-success-light-9:#f0f9eb;--el-color-success-dark-2:#529b2e;--el-color-warning:#e6a23c;--el-color-warning-light-3:#eebe77;--el-color-warning-light-5:#f3d19e;--el-color-warning-light-7:#f8e3c5;--el-color-warning-light-8:#faecd8;--el-color-warning-light-9:#fdf6ec;--el-color-warning-dark-2:#b88230;--el-color-danger:#f56c6c;--el-color-danger-light-3:#f89898;--el-color-danger-light-5:#fab6b6;--el-color-danger-light-7:#fcd3d3;--el-color-danger-light-8:#fde2e2;--el-color-danger-light-9:#fef0f0;--el-color-danger-dark-2:#c45656;--el-color-error:#f56c6c;--el-color-error-light-3:#f89898;--el-color-error-light-5:#fab6b6;--el-color-error-light-7:#fcd3d3;--el-color-error-light-8:#fde2e2;--el-color-error-light-9:#fef0f0;--el-color-error-dark-2:#c45656;--el-color-info:#909399;--el-color-info-light-3:#b1b3b8;--el-color-info-light-5:#c8c9cc;--el-color-info-light-7:#dedfe0;--el-color-info-light-8:#e9e9eb;--el-color-info-light-9:#f4f4f5;--el-color-info-dark-2:#73767a;--el-bg-color:#ffffff;--el-bg-color-page:#f2f3f5;--el-bg-color-overlay:#ffffff;--el-text-color-primary:#303133;--el-text-color-regular:#606266;--el-text-color-secondary:#909399;--el-text-color-placeholder:#a8abb2;--el-text-color-disabled:#c0c4cc;--el-border-color:#dcdfe6;--el-border-color-light:#e4e7ed;--el-border-color-lighter:#ebeef5;--el-border-color-extra-light:#f2f6fc;--el-border-color-dark:#d4d7de;--el-border-color-darker:#cdd0d6;--el-fill-color:#f0f2f5;--el-fill-color-light:#f5f7fa;--el-fill-color-lighter:#fafafa;--el-fill-color-extra-light:#fafcff;--el-fill-color-dark:#ebedf0;--el-fill-color-darker:#e6e8eb;--el-fill-color-blank:#ffffff;--el-box-shadow:0px 12px 32px 4px rgba(0, 0, 0, .04),0px 8px 20px rgba(0, 0, 0, .08);--el-box-shadow-light:0px 0px 12px rgba(0, 0, 0, .12);--el-box-shadow-lighter:0px 0px 6px rgba(0, 0, 0, .12);--el-box-shadow-dark:0px 16px 48px 16px rgba(0, 0, 0, .08),0px 12px 32px rgba(0, 0, 0, .12),0px 8px 16px -8px rgba(0, 0, 0, .16);--el-disabled-bg-color:var(--el-fill-color-light);--el-disabled-text-color:var(--el-text-color-placeholder);--el-disabled-border-color:var(--el-border-color-light);--el-overlay-color:rgba(0, 0, 0, .8);--el-overlay-color-light:rgba(0, 0, 0, .7);--el-overlay-color-lighter:rgba(0, 0, 0, .5);--el-mask-color:rgba(255, 255, 255, .9);--el-mask-color-extra-light:rgba(255, 255, 255, .3);--el-border-width:1px;--el-border-style:solid;--el-border-color-hover:var(--el-text-color-disabled);--el-border:var(--el-border-width) var(--el-border-style) var(--el-border-color);--el-svg-monochrome-grey:var(--el-border-color)}.el-icon-loading{-webkit-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}.el-icon--right{margin-left:5px}.el-icon--left{margin-right:5px}@-webkit-keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.el-icon{--color:inherit;height:1em;width:1em;line-height:1em;display:inline-flex;justify-content:center;align-items:center;position:relative;fill:currentColor;color:var(--color);font-size:inherit}.el-icon.is-loading{-webkit-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}.el-icon svg{height:1em;width:1em}.el-date-table{font-size:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-date-table.is-week-mode .el-date-table__row:hover .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-date-table.is-week-mode .el-date-table__row:hover td.available:hover{color:var(--el-datepicker-text-color)}.el-date-table.is-week-mode .el-date-table__row:hover td:first-child .el-date-table-cell{margin-left:5px;border-top-left-radius:15px;border-bottom-left-radius:15px}.el-date-table.is-week-mode .el-date-table__row:hover td:last-child .el-date-table-cell{margin-right:5px;border-top-right-radius:15px;border-bottom-right-radius:15px}.el-date-table.is-week-mode .el-date-table__row.current .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-date-table td{width:32px;height:30px;padding:4px 0;box-sizing:border-box;text-align:center;cursor:pointer;position:relative}.el-date-table td .el-date-table-cell{height:30px;padding:3px 0;box-sizing:border-box}.el-date-table td .el-date-table-cell .el-date-table-cell__text{width:24px;height:24px;display:block;margin:0 auto;line-height:24px;position:absolute;left:50%;transform:translate(-50%);border-radius:50%}.el-date-table td.next-month,.el-date-table td.prev-month{color:var(--el-datepicker-off-text-color)}.el-date-table td.today{position:relative}.el-date-table td.today .el-date-table-cell__text{color:var(--el-color-primary);font-weight:700}.el-date-table td.today.end-date .el-date-table-cell__text,.el-date-table td.today.start-date .el-date-table-cell__text{color:#fff}.el-date-table td.available:hover{color:var(--el-datepicker-hover-text-color)}.el-date-table td.in-range .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-date-table td.in-range .el-date-table-cell:hover{background-color:var(--el-datepicker-inrange-hover-bg-color)}.el-date-table td.current:not(.disabled) .el-date-table-cell__text{color:#fff;background-color:var(--el-datepicker-active-color)}.el-date-table td.current:not(.disabled):focus-visible .el-date-table-cell__text{outline:2px solid var(--el-datepicker-active-color);outline-offset:1px}.el-date-table td.end-date .el-date-table-cell,.el-date-table td.start-date .el-date-table-cell{color:#fff}.el-date-table td.end-date .el-date-table-cell__text,.el-date-table td.start-date .el-date-table-cell__text{background-color:var(--el-datepicker-active-color)}.el-date-table td.start-date .el-date-table-cell{margin-left:5px;border-top-left-radius:15px;border-bottom-left-radius:15px}.el-date-table td.end-date .el-date-table-cell{margin-right:5px;border-top-right-radius:15px;border-bottom-right-radius:15px}.el-date-table td.disabled .el-date-table-cell{background-color:var(--el-fill-color-light);opacity:1;cursor:not-allowed;color:var(--el-text-color-placeholder)}.el-date-table td.selected .el-date-table-cell{margin-left:5px;margin-right:5px;background-color:var(--el-datepicker-inrange-bg-color);border-radius:15px}.el-date-table td.selected .el-date-table-cell:hover{background-color:var(--el-datepicker-inrange-hover-bg-color)}.el-date-table td.selected .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);color:#fff;border-radius:15px}.el-date-table td.week{font-size:80%;color:var(--el-datepicker-header-text-color)}.el-date-table td:focus{outline:0}.el-date-table th{padding:5px;color:var(--el-datepicker-header-text-color);font-weight:400;border-bottom:solid 1px var(--el-border-color-lighter)}.el-month-table{font-size:12px;margin:-1px;border-collapse:collapse}.el-month-table td{text-align:center;padding:8px 0;cursor:pointer}.el-month-table td div{height:48px;padding:6px 0;box-sizing:border-box}.el-month-table td.today .cell{color:var(--el-color-primary);font-weight:700}.el-month-table td.today.end-date .cell,.el-month-table td.today.start-date .cell{color:#fff}.el-month-table td.disabled .cell{background-color:var(--el-fill-color-light);cursor:not-allowed;color:var(--el-text-color-placeholder)}.el-month-table td.disabled .cell:hover{color:var(--el-text-color-placeholder)}.el-month-table td .cell{width:60px;height:36px;display:block;line-height:36px;color:var(--el-datepicker-text-color);margin:0 auto;border-radius:18px}.el-month-table td .cell:hover{color:var(--el-datepicker-hover-text-color)}.el-month-table td.in-range div{background-color:var(--el-datepicker-inrange-bg-color)}.el-month-table td.in-range div:hover{background-color:var(--el-datepicker-inrange-hover-bg-color)}.el-month-table td.end-date div,.el-month-table td.start-date div{color:#fff}.el-month-table td.end-date .cell,.el-month-table td.start-date .cell{color:#fff;background-color:var(--el-datepicker-active-color)}.el-month-table td.start-date div{border-top-left-radius:24px;border-bottom-left-radius:24px}.el-month-table td.end-date div{border-top-right-radius:24px;border-bottom-right-radius:24px}.el-month-table td.current:not(.disabled) .cell{color:var(--el-datepicker-active-color)}.el-month-table td:focus-visible{outline:0}.el-month-table td:focus-visible .cell{outline:2px solid var(--el-datepicker-active-color)}.el-year-table{font-size:12px;margin:-1px;border-collapse:collapse}.el-year-table .el-icon{color:var(--el-datepicker-icon-color)}.el-year-table td{text-align:center;padding:20px 3px;cursor:pointer}.el-year-table td.today .cell{color:var(--el-color-primary);font-weight:700}.el-year-table td.disabled .cell{background-color:var(--el-fill-color-light);cursor:not-allowed;color:var(--el-text-color-placeholder)}.el-year-table td.disabled .cell:hover{color:var(--el-text-color-placeholder)}.el-year-table td .cell{width:48px;height:36px;display:block;line-height:36px;color:var(--el-datepicker-text-color);border-radius:18px;margin:0 auto}.el-year-table td .cell:hover{color:var(--el-datepicker-hover-text-color)}.el-year-table td.current:not(.disabled) .cell{color:var(--el-datepicker-active-color)}.el-year-table td:focus-visible{outline:0}.el-year-table td:focus-visible .cell{outline:2px solid var(--el-datepicker-active-color)}.el-time-spinner.has-seconds .el-time-spinner__wrapper{width:33.3%}.el-time-spinner__wrapper{max-height:192px;overflow:auto;display:inline-block;width:50%;vertical-align:top;position:relative}.el-time-spinner__wrapper.el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default){padding-bottom:15px}.el-time-spinner__wrapper.is-arrow{box-sizing:border-box;text-align:center;overflow:hidden}.el-time-spinner__wrapper.is-arrow .el-time-spinner__list{transform:translateY(-32px)}.el-time-spinner__wrapper.is-arrow .el-time-spinner__item:hover:not(.is-disabled):not(.is-active){background:var(--el-fill-color-light);cursor:default}.el-time-spinner__arrow{font-size:12px;color:var(--el-text-color-secondary);position:absolute;left:0;width:100%;z-index:var(--el-index-normal);text-align:center;height:30px;line-height:30px;cursor:pointer}.el-time-spinner__arrow:hover{color:var(--el-color-primary)}.el-time-spinner__arrow.arrow-up{top:10px}.el-time-spinner__arrow.arrow-down{bottom:10px}.el-time-spinner__input.el-input{width:70%}.el-time-spinner__input.el-input .el-input__inner{padding:0;text-align:center}.el-time-spinner__list{padding:0;margin:0;list-style:none;text-align:center}.el-time-spinner__list:after,.el-time-spinner__list:before{content:"";display:block;width:100%;height:80px}.el-time-spinner__item{height:32px;line-height:32px;font-size:12px;color:var(--el-text-color-regular)}.el-time-spinner__item:hover:not(.is-disabled):not(.is-active){background:var(--el-fill-color-light);cursor:pointer}.el-time-spinner__item.is-active:not(.is-disabled){color:var(--el-text-color-primary);font-weight:700}.el-time-spinner__item.is-disabled{color:var(--el-text-color-placeholder);cursor:not-allowed}.fade-in-linear-enter-active,.fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.fade-in-linear-enter-from,.fade-in-linear-leave-to{opacity:0}.el-fade-in-linear-enter-active,.el-fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.el-fade-in-linear-enter-from,.el-fade-in-linear-leave-to{opacity:0}.el-fade-in-enter-active,.el-fade-in-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-fade-in-enter-from,.el-fade-in-leave-active{opacity:0}.el-zoom-in-center-enter-active,.el-zoom-in-center-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter-from,.el-zoom-in-center-leave-active{opacity:0;transform:scaleX(0)}.el-zoom-in-top-enter-active,.el-zoom-in-top-leave-active{opacity:1;transform:scaleY(1);transition:var(--el-transition-md-fade);transform-origin:center top}.el-zoom-in-top-enter-active[data-popper-placement^=top],.el-zoom-in-top-leave-active[data-popper-placement^=top]{transform-origin:center bottom}.el-zoom-in-top-enter-from,.el-zoom-in-top-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-bottom-enter-active,.el-zoom-in-bottom-leave-active{opacity:1;transform:scaleY(1);transition:var(--el-transition-md-fade);transform-origin:center bottom}.el-zoom-in-bottom-enter-from,.el-zoom-in-bottom-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{opacity:1;transform:scale(1);transition:var(--el-transition-md-fade);transform-origin:top left}.el-zoom-in-left-enter-from,.el-zoom-in-left-leave-active{opacity:0;transform:scale(.45)}.collapse-transition{transition:var(--el-transition-duration) height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.el-collapse-transition-enter-active,.el-collapse-transition-leave-active{transition:var(--el-transition-duration) max-height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.horizontal-collapse-transition{transition:var(--el-transition-duration) width ease-in-out,var(--el-transition-duration) padding-left ease-in-out,var(--el-transition-duration) padding-right ease-in-out}.el-list-enter-active,.el-list-leave-active{transition:all 1s}.el-list-enter-from,.el-list-leave-to{opacity:0;transform:translateY(-30px)}.el-list-leave-active{position:absolute!important}.el-opacity-transition{transition:opacity var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-picker__popper{--el-datepicker-border-color:var(--el-disabled-border-color)}.el-picker__popper.el-popper{background:var(--el-bg-color-overlay);border:1px solid var(--el-datepicker-border-color);box-shadow:var(--el-box-shadow-light)}.el-picker__popper.el-popper .el-popper__arrow:before{border:1px solid var(--el-datepicker-border-color)}.el-picker__popper.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-top-color:transparent;border-left-color:transparent}.el-picker__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-picker__popper.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-left-color:transparent;border-bottom-color:transparent}.el-picker__popper.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-date-editor{--el-date-editor-width:220px;--el-date-editor-monthrange-width:300px;--el-date-editor-daterange-width:350px;--el-date-editor-datetimerange-width:400px;--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;position:relative;text-align:left}.el-date-editor.el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset}.el-date-editor.el-input__wrapper:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-date-editor.el-input,.el-date-editor.el-input__wrapper{width:var(--el-date-editor-width);height:var(--el-input-height,var(--el-component-size))}.el-date-editor--monthrange{--el-date-editor-width:var(--el-date-editor-monthrange-width)}.el-date-editor--daterange,.el-date-editor--timerange{--el-date-editor-width:var(--el-date-editor-daterange-width)}.el-date-editor--datetimerange{--el-date-editor-width:var(--el-date-editor-datetimerange-width)}.el-date-editor--dates .el-input__wrapper{text-overflow:ellipsis;white-space:nowrap}.el-date-editor .close-icon,.el-date-editor .clear-icon{cursor:pointer}.el-date-editor .clear-icon:hover{color:var(--el-text-color-secondary)}.el-date-editor .el-range__icon{height:inherit;font-size:14px;color:var(--el-text-color-placeholder);float:left}.el-date-editor .el-range__icon svg{vertical-align:middle}.el-date-editor .el-range-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;outline:0;display:inline-block;height:30px;line-height:30px;margin:0;padding:0;width:39%;text-align:center;font-size:var(--el-font-size-base);color:var(--el-text-color-regular);background-color:transparent}.el-date-editor .el-range-input::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-date-editor .el-range-input:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-date-editor .el-range-input::placeholder{color:var(--el-text-color-placeholder)}.el-date-editor .el-range-separator{flex:1;display:inline-flex;justify-content:center;align-items:center;height:100%;padding:0 5px;margin:0;font-size:14px;word-break:keep-all;color:var(--el-text-color-primary)}.el-date-editor .el-range__close-icon{font-size:14px;color:var(--el-text-color-placeholder);height:inherit;width:unset;cursor:pointer}.el-date-editor .el-range__close-icon:hover{color:var(--el-text-color-secondary)}.el-date-editor .el-range__close-icon svg{vertical-align:middle}.el-date-editor .el-range__close-icon--hidden{opacity:0;visibility:hidden}.el-range-editor.el-input__wrapper{display:inline-flex;align-items:center;padding:0 10px}.el-range-editor.is-active,.el-range-editor.is-active:hover{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-range-editor--large{line-height:var(--el-component-size-large)}.el-range-editor--large.el-input__wrapper{height:var(--el-component-size-large)}.el-range-editor--large .el-range-separator{line-height:40px;font-size:14px}.el-range-editor--large .el-range-input{height:38px;line-height:38px;font-size:14px}.el-range-editor--small{line-height:var(--el-component-size-small)}.el-range-editor--small.el-input__wrapper{height:var(--el-component-size-small)}.el-range-editor--small .el-range-separator{line-height:24px;font-size:12px}.el-range-editor--small .el-range-input{height:22px;line-height:22px;font-size:12px}.el-range-editor.is-disabled{background-color:var(--el-disabled-bg-color);border-color:var(--el-disabled-border-color);color:var(--el-disabled-text-color);cursor:not-allowed}.el-range-editor.is-disabled:focus,.el-range-editor.is-disabled:hover{border-color:var(--el-disabled-border-color)}.el-range-editor.is-disabled input{background-color:var(--el-disabled-bg-color);color:var(--el-disabled-text-color);cursor:not-allowed}.el-range-editor.is-disabled input::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-range-editor.is-disabled input:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-range-editor.is-disabled input::placeholder{color:var(--el-text-color-placeholder)}.el-range-editor.is-disabled .el-range-separator{color:var(--el-disabled-text-color)}.el-picker-panel{color:var(--el-text-color-regular);background:var(--el-bg-color-overlay);border-radius:var(--el-border-radius-base);line-height:30px}.el-picker-panel .el-time-panel{margin:5px 0;border:solid 1px var(--el-datepicker-border-color);background-color:var(--el-bg-color-overlay);box-shadow:var(--el-box-shadow-light)}.el-picker-panel__body-wrapper:after,.el-picker-panel__body:after{content:"";display:table;clear:both}.el-picker-panel__content{position:relative;margin:15px}.el-picker-panel__footer{border-top:1px solid var(--el-datepicker-inner-border-color);padding:4px 12px;text-align:right;background-color:var(--el-bg-color-overlay);position:relative;font-size:0}.el-picker-panel__shortcut{display:block;width:100%;border:0;background-color:transparent;line-height:28px;font-size:14px;color:var(--el-datepicker-text-color);padding-left:12px;text-align:left;outline:0;cursor:pointer}.el-picker-panel__shortcut:hover{color:var(--el-datepicker-hover-text-color)}.el-picker-panel__shortcut.active{background-color:#e6f1fe;color:var(--el-datepicker-active-color)}.el-picker-panel__btn{border:1px solid var(--el-fill-color-darker);color:var(--el-text-color-primary);line-height:24px;border-radius:2px;padding:0 20px;cursor:pointer;background-color:transparent;outline:0;font-size:12px}.el-picker-panel__btn[disabled]{color:var(--el-text-color-disabled);cursor:not-allowed}.el-picker-panel__icon-btn{font-size:12px;color:var(--el-datepicker-icon-color);border:0;background:0 0;cursor:pointer;outline:0;margin-top:8px}.el-picker-panel__icon-btn:hover{color:var(--el-datepicker-hover-text-color)}.el-picker-panel__icon-btn:focus-visible{color:var(--el-datepicker-hover-text-color)}.el-picker-panel__icon-btn.is-disabled{color:var(--el-text-color-disabled)}.el-picker-panel__icon-btn.is-disabled:hover{cursor:not-allowed}.el-picker-panel__icon-btn .el-icon{cursor:pointer;font-size:inherit}.el-picker-panel__link-btn{vertical-align:middle}.el-picker-panel [slot=sidebar],.el-picker-panel__sidebar{position:absolute;top:0;bottom:0;width:110px;border-right:1px solid var(--el-datepicker-inner-border-color);box-sizing:border-box;padding-top:6px;background-color:var(--el-bg-color-overlay);overflow:auto}.el-picker-panel [slot=sidebar]+.el-picker-panel__body,.el-picker-panel__sidebar+.el-picker-panel__body{margin-left:110px}.el-date-picker{--el-datepicker-text-color:var(--el-text-color-regular);--el-datepicker-off-text-color:var(--el-text-color-placeholder);--el-datepicker-header-text-color:var(--el-text-color-regular);--el-datepicker-icon-color:var(--el-text-color-primary);--el-datepicker-border-color:var(--el-disabled-border-color);--el-datepicker-inner-border-color:var(--el-border-color-light);--el-datepicker-inrange-bg-color:var(--el-border-color-extra-light);--el-datepicker-inrange-hover-bg-color:var(--el-border-color-extra-light);--el-datepicker-active-color:var(--el-color-primary);--el-datepicker-hover-text-color:var(--el-color-primary)}.el-date-picker{width:322px}.el-date-picker.has-sidebar.has-time{width:434px}.el-date-picker.has-sidebar{width:438px}.el-date-picker.has-time .el-picker-panel__body-wrapper{position:relative}.el-date-picker .el-picker-panel__content{width:292px}.el-date-picker table{table-layout:fixed;width:100%}.el-date-picker__editor-wrap{position:relative;display:table-cell;padding:0 5px}.el-date-picker__time-header{position:relative;border-bottom:1px solid var(--el-datepicker-inner-border-color);font-size:12px;padding:8px 5px 5px;display:table;width:100%;box-sizing:border-box}.el-date-picker__header{margin:12px;text-align:center}.el-date-picker__header--bordered{margin-bottom:0;padding-bottom:12px;border-bottom:solid 1px var(--el-border-color-lighter)}.el-date-picker__header--bordered+.el-picker-panel__content{margin-top:0}.el-date-picker__header-label{font-size:16px;font-weight:500;padding:0 5px;line-height:22px;text-align:center;cursor:pointer;color:var(--el-text-color-regular)}.el-date-picker__header-label:hover{color:var(--el-datepicker-hover-text-color)}.el-date-picker__header-label:focus-visible{outline:0;color:var(--el-datepicker-hover-text-color)}.el-date-picker__header-label.active{color:var(--el-datepicker-active-color)}.el-date-picker__prev-btn{float:left}.el-date-picker__next-btn{float:right}.el-date-picker__time-wrap{padding:10px;text-align:center}.el-date-picker__time-label{float:left;cursor:pointer;line-height:30px;margin-left:10px}.el-date-picker .el-time-panel{position:absolute}.el-date-range-picker{--el-datepicker-text-color:var(--el-text-color-regular);--el-datepicker-off-text-color:var(--el-text-color-placeholder);--el-datepicker-header-text-color:var(--el-text-color-regular);--el-datepicker-icon-color:var(--el-text-color-primary);--el-datepicker-border-color:var(--el-disabled-border-color);--el-datepicker-inner-border-color:var(--el-border-color-light);--el-datepicker-inrange-bg-color:var(--el-border-color-extra-light);--el-datepicker-inrange-hover-bg-color:var(--el-border-color-extra-light);--el-datepicker-active-color:var(--el-color-primary);--el-datepicker-hover-text-color:var(--el-color-primary)}.el-date-range-picker{width:646px}.el-date-range-picker.has-sidebar{width:756px}.el-date-range-picker.has-time .el-picker-panel__body-wrapper{position:relative}.el-date-range-picker table{table-layout:fixed;width:100%}.el-date-range-picker .el-picker-panel__body{min-width:513px}.el-date-range-picker .el-picker-panel__content{margin:0}.el-date-range-picker__header{position:relative;text-align:center;height:28px}.el-date-range-picker__header [class*=arrow-left]{float:left}.el-date-range-picker__header [class*=arrow-right]{float:right}.el-date-range-picker__header div{font-size:16px;font-weight:500;margin-right:50px}.el-date-range-picker__content{float:left;width:50%;box-sizing:border-box;margin:0;padding:16px}.el-date-range-picker__content.is-left{border-right:1px solid var(--el-datepicker-inner-border-color)}.el-date-range-picker__content .el-date-range-picker__header div{margin-left:50px;margin-right:50px}.el-date-range-picker__editors-wrap{box-sizing:border-box;display:table-cell}.el-date-range-picker__editors-wrap.is-right{text-align:right}.el-date-range-picker__time-header{position:relative;border-bottom:1px solid var(--el-datepicker-inner-border-color);font-size:12px;padding:8px 5px 5px;display:table;width:100%;box-sizing:border-box}.el-date-range-picker__time-header>.el-icon-arrow-right{font-size:20px;vertical-align:middle;display:table-cell;color:var(--el-datepicker-icon-color)}.el-date-range-picker__time-picker-wrap{position:relative;display:table-cell;padding:0 5px}.el-date-range-picker__time-picker-wrap .el-picker-panel{position:absolute;top:13px;right:0;z-index:1;background:#fff}.el-date-range-picker__time-picker-wrap .el-time-panel{position:absolute}.el-time-range-picker{width:354px;overflow:visible}.el-time-range-picker__content{position:relative;text-align:center;padding:10px;z-index:1}.el-time-range-picker__cell{box-sizing:border-box;margin:0;padding:4px 7px 7px;width:50%;display:inline-block}.el-time-range-picker__header{margin-bottom:5px;text-align:center;font-size:14px}.el-time-range-picker__body{border-radius:2px;border:1px solid var(--el-datepicker-border-color)}.el-time-panel{border-radius:2px;position:relative;width:180px;left:0;z-index:var(--el-index-top);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;box-sizing:content-box}.el-time-panel__content{font-size:0;position:relative;overflow:hidden}.el-time-panel__content:after,.el-time-panel__content:before{content:"";top:50%;position:absolute;margin-top:-16px;height:32px;z-index:-1;left:0;right:0;box-sizing:border-box;padding-top:6px;text-align:left}.el-time-panel__content:after{left:50%;margin-left:12%;margin-right:12%}.el-time-panel__content:before{padding-left:50%;margin-right:12%;margin-left:12%;border-top:1px solid var(--el-border-color-light);border-bottom:1px solid var(--el-border-color-light)}.el-time-panel__content.has-seconds:after{left:66.6666666667%}.el-time-panel__content.has-seconds:before{padding-left:33.3333333333%}.el-time-panel__footer{border-top:1px solid var(--el-timepicker-inner-border-color,var(--el-border-color-light));padding:4px;height:36px;line-height:25px;text-align:right;box-sizing:border-box}.el-time-panel__btn{border:none;line-height:28px;padding:0 5px;margin:0 5px;cursor:pointer;background-color:transparent;outline:0;font-size:12px;color:var(--el-text-color-primary)}.el-time-panel__btn.confirm{font-weight:800;color:var(--el-timepicker-active-color,var(--el-color-primary))}.el-textarea{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%}.el-textarea{position:relative;display:inline-block;width:100%;vertical-align:bottom;font-size:var(--el-font-size-base)}.el-textarea__inner{position:relative;display:block;resize:vertical;padding:5px 11px;line-height:1.5;box-sizing:border-box;width:100%;font-size:inherit;font-family:inherit;color:var(--el-input-text-color,var(--el-text-color-regular));background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;-webkit-appearance:none;box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));transition:var(--el-transition-box-shadow);border:none}.el-textarea__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:-ms-input-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-textarea__inner:focus{outline:0;box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-textarea .el-input__count{color:var(--el-color-info);background:var(--el-fill-color-blank);position:absolute;font-size:12px;line-height:14px;bottom:5px;right:10px}.el-textarea.is-disabled .el-textarea__inner{box-shadow:0 0 0 1px var(--el-disabled-border-color) inset;background-color:var(--el-disabled-bg-color);color:var(--el-disabled-text-color);cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-exceed .el-textarea__inner{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-textarea.is-exceed .el-input__count{color:var(--el-color-danger)}.el-input{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%}.el-input{--el-input-height:var(--el-component-size);position:relative;font-size:var(--el-font-size-base);display:inline-flex;width:var(--el-input-width);line-height:var(--el-input-height);box-sizing:border-box;vertical-align:middle}.el-input::-webkit-scrollbar{z-index:11;width:6px}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{border-radius:5px;width:6px;background:var(--el-text-color-disabled)}.el-input::-webkit-scrollbar-corner{background:var(--el-fill-color-blank)}.el-input::-webkit-scrollbar-track{background:var(--el-fill-color-blank)}.el-input::-webkit-scrollbar-track-piece{background:var(--el-fill-color-blank);width:6px}.el-input .el-input__clear,.el-input .el-input__password{color:var(--el-input-icon-color);font-size:14px;cursor:pointer}.el-input .el-input__clear:hover,.el-input .el-input__password:hover{color:var(--el-input-clear-hover-color)}.el-input .el-input__count{height:100%;display:inline-flex;align-items:center;color:var(--el-color-info);font-size:12px}.el-input .el-input__count .el-input__count-inner{background:var(--el-fill-color-blank);line-height:initial;display:inline-block;padding-left:8px}.el-input__wrapper{display:inline-flex;flex-grow:1;align-items:center;justify-content:center;padding:1px 11px;background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));cursor:text;transition:var(--el-transition-box-shadow);transform:translateZ(0);box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset}.el-input__wrapper:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-input__wrapper.is-focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 32px) - 2px);width:100%;flex-grow:1;-webkit-appearance:none;color:var(--el-input-text-color,var(--el-text-color-regular));font-size:inherit;height:var(--el-input-inner-height);line-height:var(--el-input-inner-height);padding:0;outline:0;border:none;background:0 0;box-sizing:border-box}.el-input__inner:focus{outline:0}.el-input__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner:-ms-input-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner[type=password]::-ms-reveal{display:none}.el-input__prefix{display:inline-flex;white-space:nowrap;flex-shrink:0;flex-wrap:nowrap;height:100%;text-align:center;color:var(--el-input-icon-color,var(--el-text-color-placeholder));transition:all var(--el-transition-duration);pointer-events:none}.el-input__prefix-inner{pointer-events:all;display:inline-flex;align-items:center;justify-content:center}.el-input__prefix-inner>:last-child{margin-right:8px}.el-input__prefix-inner>:first-child,.el-input__prefix-inner>:first-child.el-input__icon{margin-left:0}.el-input__suffix{display:inline-flex;white-space:nowrap;flex-shrink:0;flex-wrap:nowrap;height:100%;text-align:center;color:var(--el-input-icon-color,var(--el-text-color-placeholder));transition:all var(--el-transition-duration);pointer-events:none}.el-input__suffix-inner{pointer-events:all;display:inline-flex;align-items:center;justify-content:center}.el-input__suffix-inner>:first-child{margin-left:8px}.el-input .el-input__icon{height:inherit;line-height:inherit;display:flex;justify-content:center;align-items:center;transition:all var(--el-transition-duration);margin-left:8px}.el-input__validateIcon{pointer-events:none}.el-input.is-active .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-focus-color,) inset}.el-input.is-disabled{cursor:not-allowed}.el-input.is-disabled .el-input__wrapper{background-color:var(--el-disabled-bg-color);box-shadow:0 0 0 1px var(--el-disabled-border-color) inset}.el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color);-webkit-text-fill-color:var(--el-disabled-text-color);cursor:not-allowed}.el-input.is-disabled .el-input__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner::placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input.is-exceed .el-input__wrapper{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-input.is-exceed .el-input__suffix .el-input__count{color:var(--el-color-danger)}.el-input--large{--el-input-height:var(--el-component-size-large);font-size:14px}.el-input--large .el-input__wrapper{padding:1px 15px}.el-input--large .el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 40px) - 2px)}.el-input--small{--el-input-height:var(--el-component-size-small);font-size:12px}.el-input--small .el-input__wrapper{padding:1px 7px}.el-input--small .el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 24px) - 2px)}.el-input-group{display:inline-flex;width:100%;align-items:stretch}.el-input-group__append,.el-input-group__prepend{background-color:var(--el-fill-color-light);color:var(--el-color-info);position:relative;display:inline-flex;align-items:center;justify-content:center;min-height:100%;border-radius:var(--el-input-border-radius);padding:0 20px;white-space:nowrap}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:0}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:0 -20px}.el-input-group__append button.el-button,.el-input-group__append button.el-button:hover,.el-input-group__append div.el-select .el-input__wrapper,.el-input-group__append div.el-select:hover .el-input__wrapper,.el-input-group__prepend button.el-button,.el-input-group__prepend button.el-button:hover,.el-input-group__prepend div.el-select .el-input__wrapper,.el-input-group__prepend div.el-select:hover .el-input__wrapper{border-color:transparent;background-color:transparent;color:inherit}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group__append{border-left:0;border-top-left-radius:0;border-bottom-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-group--prepend>.el-input__wrapper{border-top-left-radius:0;border-bottom-left-radius:0}.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__inner{box-shadow:none!important}.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__wrapper{border-top-right-radius:0;border-bottom-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__inner{box-shadow:none!important}.el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__wrapper{box-shadow:1px 0 0 0 var(--el-input-focus-border-color) inset,1px 0 0 0 var(--el-input-focus-border-color),0 1px 0 0 var(--el-input-focus-border-color) inset,0 -1px 0 0 var(--el-input-focus-border-color) inset!important;z-index:2}.el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__wrapper:focus{outline:0;z-index:2;box-shadow:1px 0 0 0 var(--el-input-focus-border-color) inset,1px 0 0 0 var(--el-input-focus-border-color),0 1px 0 0 var(--el-input-focus-border-color) inset,0 -1px 0 0 var(--el-input-focus-border-color) inset!important}.el-input-group--prepend .el-input-group__prepend .el-select:hover .el-input__inner{box-shadow:none!important}.el-input-group--prepend .el-input-group__prepend .el-select:hover .el-input__wrapper{z-index:1;box-shadow:1px 0 0 0 var(--el-input-hover-border-color) inset,1px 0 0 0 var(--el-input-hover-border-color),0 1px 0 0 var(--el-input-hover-border-color) inset,0 -1px 0 0 var(--el-input-hover-border-color) inset!important}.el-input-group--append>.el-input__wrapper{border-top-right-radius:0;border-bottom-right-radius:0}.el-input-group--append .el-input-group__append .el-select .el-input .el-input__inner{box-shadow:none!important}.el-input-group--append .el-input-group__append .el-select .el-input .el-input__wrapper{border-top-left-radius:0;border-bottom-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-group--append .el-input-group__append .el-select .el-input.is-focus .el-input__inner{box-shadow:none!important}.el-input-group--append .el-input-group__append .el-select .el-input.is-focus .el-input__wrapper{z-index:2;box-shadow:-1px 0 0 0 var(--el-input-focus-border-color),-1px 0 0 0 var(--el-input-focus-border-color) inset,0 1px 0 0 var(--el-input-focus-border-color) inset,0 -1px 0 0 var(--el-input-focus-border-color) inset!important}.el-input-group--append .el-input-group__append .el-select:hover .el-input__inner{box-shadow:none!important}.el-input-group--append .el-input-group__append .el-select:hover .el-input__wrapper{z-index:1;box-shadow:-1px 0 0 0 var(--el-input-hover-border-color),-1px 0 0 0 var(--el-input-hover-border-color) inset,0 1px 0 0 var(--el-input-hover-border-color) inset,0 -1px 0 0 var(--el-input-hover-border-color) inset!important}.el-scrollbar{--el-scrollbar-opacity:.3;--el-scrollbar-bg-color:var(--el-text-color-secondary);--el-scrollbar-hover-opacity:.5;--el-scrollbar-hover-bg-color:var(--el-text-color-secondary)}.el-scrollbar{overflow:hidden;position:relative;height:100%}.el-scrollbar__wrap{overflow:auto;height:100%}.el-scrollbar__wrap--hidden-default{scrollbar-width:none}.el-scrollbar__wrap--hidden-default::-webkit-scrollbar{display:none}.el-scrollbar__thumb{position:relative;display:block;width:0;height:0;cursor:pointer;border-radius:inherit;background-color:var(--el-scrollbar-bg-color,var(--el-text-color-secondary));transition:var(--el-transition-duration) background-color;opacity:var(--el-scrollbar-opacity,.3)}.el-scrollbar__thumb:hover{background-color:var(--el-scrollbar-hover-bg-color,var(--el-text-color-secondary));opacity:var(--el-scrollbar-hover-opacity,.5)}.el-scrollbar__bar{position:absolute;right:2px;bottom:2px;z-index:1;border-radius:4px}.el-scrollbar__bar.is-vertical{width:6px;top:2px}.el-scrollbar__bar.is-vertical>div{width:100%}.el-scrollbar__bar.is-horizontal{height:6px;left:2px}.el-scrollbar__bar.is-horizontal>div{height:100%}.el-scrollbar-fade-enter-active{transition:opacity .34s ease-out}.el-scrollbar-fade-leave-active{transition:opacity .12s ease-out}.el-scrollbar-fade-enter-from,.el-scrollbar-fade-leave-active{opacity:0}.el-popper{--el-popper-border-radius:var(--el-popover-border-radius, 4px)}.el-popper{position:absolute;border-radius:var(--el-popper-border-radius);padding:5px 11px;z-index:2000;font-size:12px;line-height:20px;min-width:10px;word-wrap:break-word;visibility:visible}.el-popper.is-dark{color:var(--el-bg-color);background:var(--el-text-color-primary);border:1px solid var(--el-text-color-primary)}.el-popper.is-dark .el-popper__arrow:before{border:1px solid var(--el-text-color-primary);background:var(--el-text-color-primary);right:0}.el-popper.is-light{background:var(--el-bg-color-overlay);border:1px solid var(--el-border-color-light)}.el-popper.is-light .el-popper__arrow:before{border:1px solid var(--el-border-color-light);background:var(--el-bg-color-overlay);right:0}.el-popper.is-pure{padding:0}.el-popper__arrow{position:absolute;width:10px;height:10px;z-index:-1}.el-popper__arrow:before{position:absolute;width:10px;height:10px;z-index:-1;content:" ";transform:rotate(45deg);background:var(--el-text-color-primary);box-sizing:border-box}.el-popper[data-popper-placement^=top]>.el-popper__arrow{bottom:-5px}.el-popper[data-popper-placement^=top]>.el-popper__arrow:before{border-bottom-right-radius:2px}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow{top:-5px}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow:before{border-top-left-radius:2px}.el-popper[data-popper-placement^=left]>.el-popper__arrow{right:-5px}.el-popper[data-popper-placement^=left]>.el-popper__arrow:before{border-top-right-radius:2px}.el-popper[data-popper-placement^=right]>.el-popper__arrow{left:-5px}.el-popper[data-popper-placement^=right]>.el-popper__arrow:before{border-bottom-left-radius:2px}.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-top-color:transparent!important;border-left-color:transparent!important}.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent!important;border-right-color:transparent!important}.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-left-color:transparent!important;border-bottom-color:transparent!important}.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent!important;border-top-color:transparent!important}.el-button{--el-button-font-weight:var(--el-font-weight-primary);--el-button-border-color:var(--el-border-color);--el-button-bg-color:var(--el-fill-color-blank);--el-button-text-color:var(--el-text-color-regular);--el-button-disabled-text-color:var(--el-disabled-text-color);--el-button-disabled-bg-color:var(--el-fill-color-blank);--el-button-disabled-border-color:var(--el-border-color-light);--el-button-divide-border-color:rgba(255, 255, 255, .5);--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-color-primary-light-9);--el-button-hover-border-color:var(--el-color-primary-light-7);--el-button-active-text-color:var(--el-button-hover-text-color);--el-button-active-border-color:var(--el-color-primary);--el-button-active-bg-color:var(--el-button-hover-bg-color);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-hover-link-text-color:var(--el-color-info);--el-button-active-color:var(--el-text-color-primary)}.el-button{display:inline-flex;justify-content:center;align-items:center;line-height:1;height:32px;white-space:nowrap;cursor:pointer;color:var(--el-button-text-color);text-align:center;box-sizing:border-box;outline:0;transition:.1s;font-weight:var(--el-button-font-weight);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-webkit-appearance:none;background-color:var(--el-button-bg-color);border:var(--el-border);border-color:var(--el-button-border-color);padding:8px 15px;font-size:var(--el-font-size-base);border-radius:var(--el-border-radius-base)}.el-button:focus,.el-button:hover{color:var(--el-button-hover-text-color);border-color:var(--el-button-hover-border-color);background-color:var(--el-button-hover-bg-color);outline:0}.el-button:active{color:var(--el-button-active-text-color);border-color:var(--el-button-active-border-color);background-color:var(--el-button-active-bg-color);outline:0}.el-button:focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px}.el-button>span{display:inline-flex;align-items:center}.el-button+.el-button{margin-left:12px}.el-button.is-round{padding:8px 15px}.el-button::-moz-focus-inner{border:0}.el-button [class*=el-icon]+span{margin-left:6px}.el-button [class*=el-icon] svg{vertical-align:bottom}.el-button.is-plain{--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-fill-color-blank);--el-button-hover-border-color:var(--el-color-primary)}.el-button.is-active{color:var(--el-button-active-text-color);border-color:var(--el-button-active-border-color);background-color:var(--el-button-active-bg-color);outline:0}.el-button.is-disabled,.el-button.is-disabled:focus,.el-button.is-disabled:hover{color:var(--el-button-disabled-text-color);cursor:not-allowed;background-image:none;background-color:var(--el-button-disabled-bg-color);border-color:var(--el-button-disabled-border-color)}.el-button.is-loading{position:relative;pointer-events:none}.el-button.is-loading:before{z-index:1;pointer-events:none;content:"";position:absolute;left:-1px;top:-1px;right:-1px;bottom:-1px;border-radius:inherit;background-color:var(--el-mask-color-extra-light)}.el-button.is-round{border-radius:var(--el-border-radius-round)}.el-button.is-circle{border-radius:50%;padding:8px}.el-button.is-text{color:var(--el-button-text-color);border:0 solid transparent;background-color:transparent}.el-button.is-text.is-disabled{color:var(--el-button-disabled-text-color);background-color:transparent!important}.el-button.is-text:not(.is-disabled):focus,.el-button.is-text:not(.is-disabled):hover{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled):focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px}.el-button.is-text:not(.is-disabled):active{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled).is-has-bg:focus,.el-button.is-text:not(.is-disabled).is-has-bg:hover{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg:active{background-color:var(--el-fill-color-dark)}.el-button__text--expand{letter-spacing:.3em;margin-right:-.3em}.el-button.is-link{border-color:transparent;color:var(--el-button-text-color);background:0 0;padding:2px;height:auto}.el-button.is-link:focus,.el-button.is-link:hover{color:var(--el-button-hover-link-text-color)}.el-button.is-link.is-disabled{color:var(--el-button-disabled-text-color);background-color:transparent!important;border-color:transparent!important}.el-button.is-link:not(.is-disabled):focus,.el-button.is-link:not(.is-disabled):hover{border-color:transparent;background-color:transparent}.el-button.is-link:not(.is-disabled):active{color:var(--el-button-active-color);border-color:transparent;background-color:transparent}.el-button--text{border-color:transparent;background:0 0;color:var(--el-color-primary);padding-left:0;padding-right:0}.el-button--text.is-disabled{color:var(--el-button-disabled-text-color);background-color:transparent!important;border-color:transparent!important}.el-button--text:not(.is-disabled):focus,.el-button--text:not(.is-disabled):hover{color:var(--el-color-primary-light-3);border-color:transparent;background-color:transparent}.el-button--text:not(.is-disabled):active{color:var(--el-color-primary-dark-2);border-color:transparent;background-color:transparent}.el-button__link--expand{letter-spacing:.3em;margin-right:-.3em}.el-button--primary{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-primary);--el-button-border-color:var(--el-color-primary);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-active-color:var(--el-color-primary-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-primary-light-5);--el-button-hover-bg-color:var(--el-color-primary-light-3);--el-button-hover-border-color:var(--el-color-primary-light-3);--el-button-active-bg-color:var(--el-color-primary-dark-2);--el-button-active-border-color:var(--el-color-primary-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-primary-light-5);--el-button-disabled-border-color:var(--el-color-primary-light-5)}.el-button--primary.is-link,.el-button--primary.is-plain,.el-button--primary.is-text{--el-button-text-color:var(--el-color-primary);--el-button-bg-color:var(--el-color-primary-light-9);--el-button-border-color:var(--el-color-primary-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-primary);--el-button-hover-border-color:var(--el-color-primary);--el-button-active-text-color:var(--el-color-white)}.el-button--primary.is-link.is-disabled,.el-button--primary.is-link.is-disabled:active,.el-button--primary.is-link.is-disabled:focus,.el-button--primary.is-link.is-disabled:hover,.el-button--primary.is-plain.is-disabled,.el-button--primary.is-plain.is-disabled:active,.el-button--primary.is-plain.is-disabled:focus,.el-button--primary.is-plain.is-disabled:hover,.el-button--primary.is-text.is-disabled,.el-button--primary.is-text.is-disabled:active,.el-button--primary.is-text.is-disabled:focus,.el-button--primary.is-text.is-disabled:hover{color:var(--el-color-primary-light-5);background-color:var(--el-color-primary-light-9);border-color:var(--el-color-primary-light-8)}.el-button--success{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-success);--el-button-border-color:var(--el-color-success);--el-button-outline-color:var(--el-color-success-light-5);--el-button-active-color:var(--el-color-success-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-success-light-5);--el-button-hover-bg-color:var(--el-color-success-light-3);--el-button-hover-border-color:var(--el-color-success-light-3);--el-button-active-bg-color:var(--el-color-success-dark-2);--el-button-active-border-color:var(--el-color-success-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-success-light-5);--el-button-disabled-border-color:var(--el-color-success-light-5)}.el-button--success.is-link,.el-button--success.is-plain,.el-button--success.is-text{--el-button-text-color:var(--el-color-success);--el-button-bg-color:var(--el-color-success-light-9);--el-button-border-color:var(--el-color-success-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-success);--el-button-hover-border-color:var(--el-color-success);--el-button-active-text-color:var(--el-color-white)}.el-button--success.is-link.is-disabled,.el-button--success.is-link.is-disabled:active,.el-button--success.is-link.is-disabled:focus,.el-button--success.is-link.is-disabled:hover,.el-button--success.is-plain.is-disabled,.el-button--success.is-plain.is-disabled:active,.el-button--success.is-plain.is-disabled:focus,.el-button--success.is-plain.is-disabled:hover,.el-button--success.is-text.is-disabled,.el-button--success.is-text.is-disabled:active,.el-button--success.is-text.is-disabled:focus,.el-button--success.is-text.is-disabled:hover{color:var(--el-color-success-light-5);background-color:var(--el-color-success-light-9);border-color:var(--el-color-success-light-8)}.el-button--warning{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-warning);--el-button-border-color:var(--el-color-warning);--el-button-outline-color:var(--el-color-warning-light-5);--el-button-active-color:var(--el-color-warning-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-warning-light-5);--el-button-hover-bg-color:var(--el-color-warning-light-3);--el-button-hover-border-color:var(--el-color-warning-light-3);--el-button-active-bg-color:var(--el-color-warning-dark-2);--el-button-active-border-color:var(--el-color-warning-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-warning-light-5);--el-button-disabled-border-color:var(--el-color-warning-light-5)}.el-button--warning.is-link,.el-button--warning.is-plain,.el-button--warning.is-text{--el-button-text-color:var(--el-color-warning);--el-button-bg-color:var(--el-color-warning-light-9);--el-button-border-color:var(--el-color-warning-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-warning);--el-button-hover-border-color:var(--el-color-warning);--el-button-active-text-color:var(--el-color-white)}.el-button--warning.is-link.is-disabled,.el-button--warning.is-link.is-disabled:active,.el-button--warning.is-link.is-disabled:focus,.el-button--warning.is-link.is-disabled:hover,.el-button--warning.is-plain.is-disabled,.el-button--warning.is-plain.is-disabled:active,.el-button--warning.is-plain.is-disabled:focus,.el-button--warning.is-plain.is-disabled:hover,.el-button--warning.is-text.is-disabled,.el-button--warning.is-text.is-disabled:active,.el-button--warning.is-text.is-disabled:focus,.el-button--warning.is-text.is-disabled:hover{color:var(--el-color-warning-light-5);background-color:var(--el-color-warning-light-9);border-color:var(--el-color-warning-light-8)}.el-button--danger{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-danger);--el-button-border-color:var(--el-color-danger);--el-button-outline-color:var(--el-color-danger-light-5);--el-button-active-color:var(--el-color-danger-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-danger-light-5);--el-button-hover-bg-color:var(--el-color-danger-light-3);--el-button-hover-border-color:var(--el-color-danger-light-3);--el-button-active-bg-color:var(--el-color-danger-dark-2);--el-button-active-border-color:var(--el-color-danger-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-danger-light-5);--el-button-disabled-border-color:var(--el-color-danger-light-5)}.el-button--danger.is-link,.el-button--danger.is-plain,.el-button--danger.is-text{--el-button-text-color:var(--el-color-danger);--el-button-bg-color:var(--el-color-danger-light-9);--el-button-border-color:var(--el-color-danger-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-danger);--el-button-hover-border-color:var(--el-color-danger);--el-button-active-text-color:var(--el-color-white)}.el-button--danger.is-link.is-disabled,.el-button--danger.is-link.is-disabled:active,.el-button--danger.is-link.is-disabled:focus,.el-button--danger.is-link.is-disabled:hover,.el-button--danger.is-plain.is-disabled,.el-button--danger.is-plain.is-disabled:active,.el-button--danger.is-plain.is-disabled:focus,.el-button--danger.is-plain.is-disabled:hover,.el-button--danger.is-text.is-disabled,.el-button--danger.is-text.is-disabled:active,.el-button--danger.is-text.is-disabled:focus,.el-button--danger.is-text.is-disabled:hover{color:var(--el-color-danger-light-5);background-color:var(--el-color-danger-light-9);border-color:var(--el-color-danger-light-8)}.el-button--info{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-info);--el-button-border-color:var(--el-color-info);--el-button-outline-color:var(--el-color-info-light-5);--el-button-active-color:var(--el-color-info-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-info-light-5);--el-button-hover-bg-color:var(--el-color-info-light-3);--el-button-hover-border-color:var(--el-color-info-light-3);--el-button-active-bg-color:var(--el-color-info-dark-2);--el-button-active-border-color:var(--el-color-info-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-info-light-5);--el-button-disabled-border-color:var(--el-color-info-light-5)}.el-button--info.is-link,.el-button--info.is-plain,.el-button--info.is-text{--el-button-text-color:var(--el-color-info);--el-button-bg-color:var(--el-color-info-light-9);--el-button-border-color:var(--el-color-info-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-info);--el-button-hover-border-color:var(--el-color-info);--el-button-active-text-color:var(--el-color-white)}.el-button--info.is-link.is-disabled,.el-button--info.is-link.is-disabled:active,.el-button--info.is-link.is-disabled:focus,.el-button--info.is-link.is-disabled:hover,.el-button--info.is-plain.is-disabled,.el-button--info.is-plain.is-disabled:active,.el-button--info.is-plain.is-disabled:focus,.el-button--info.is-plain.is-disabled:hover,.el-button--info.is-text.is-disabled,.el-button--info.is-text.is-disabled:active,.el-button--info.is-text.is-disabled:focus,.el-button--info.is-text.is-disabled:hover{color:var(--el-color-info-light-5);background-color:var(--el-color-info-light-9);border-color:var(--el-color-info-light-8)}.el-button--large{--el-button-size:40px;height:var(--el-button-size);padding:12px 19px;font-size:var(--el-font-size-base);border-radius:var(--el-border-radius-base)}.el-button--large [class*=el-icon]+span{margin-left:8px}.el-button--large.is-round{padding:12px 19px}.el-button--large.is-circle{width:var(--el-button-size);padding:12px}.el-button--small{--el-button-size:24px;height:var(--el-button-size);padding:5px 11px;font-size:12px;border-radius:calc(var(--el-border-radius-base) - 1px)}.el-button--small [class*=el-icon]+span{margin-left:4px}.el-button--small.is-round{padding:5px 11px}.el-button--small.is-circle{width:var(--el-button-size);padding:5px}.el-image__error,.el-image__inner,.el-image__placeholder,.el-image__wrapper{width:100%;height:100%}.el-image{position:relative;display:inline-block;overflow:hidden}.el-image__inner{vertical-align:top;opacity:1}.el-image__inner.is-loading{opacity:0}.el-image__wrapper{position:absolute;top:0;left:0}.el-image__placeholder{background:var(--el-fill-color-light)}.el-image__error{display:flex;justify-content:center;align-items:center;font-size:14px;background:var(--el-fill-color-light);color:var(--el-text-color-placeholder);vertical-align:middle}.el-image__preview{cursor:pointer}.el-image-viewer__wrapper{position:fixed;top:0;right:0;bottom:0;left:0}.el-image-viewer__btn{position:absolute;z-index:1;display:flex;align-items:center;justify-content:center;border-radius:50%;opacity:.8;cursor:pointer;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-image-viewer__btn .el-icon{font-size:inherit;cursor:pointer}.el-image-viewer__close{top:40px;right:40px;width:40px;height:40px;font-size:40px}.el-image-viewer__canvas{position:static;width:100%;height:100%;display:flex;justify-content:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-image-viewer__actions{left:50%;bottom:30px;transform:translate(-50%);width:282px;height:44px;padding:0 23px;background-color:var(--el-text-color-regular);border-color:#fff;border-radius:22px}.el-image-viewer__actions__inner{width:100%;height:100%;text-align:justify;cursor:default;font-size:23px;color:#fff;display:flex;align-items:center;justify-content:space-around}.el-image-viewer__prev{top:50%;transform:translateY(-50%);left:40px;width:44px;height:44px;font-size:24px;color:#fff;background-color:var(--el-text-color-regular);border-color:#fff}.el-image-viewer__next{top:50%;transform:translateY(-50%);right:40px;text-indent:2px;width:44px;height:44px;font-size:24px;color:#fff;background-color:var(--el-text-color-regular);border-color:#fff}.el-image-viewer__close{width:44px;height:44px;font-size:24px;color:#fff;background-color:var(--el-text-color-regular);border-color:#fff}.el-image-viewer__mask{position:absolute;width:100%;height:100%;top:0;left:0;opacity:.5;background:#000}.viewer-fade-enter-active{-webkit-animation:viewer-fade-in var(--el-transition-duration);animation:viewer-fade-in var(--el-transition-duration)}.viewer-fade-leave-active{-webkit-animation:viewer-fade-out var(--el-transition-duration);animation:viewer-fade-out var(--el-transition-duration)}@-webkit-keyframes viewer-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@keyframes viewer-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@-webkit-keyframes viewer-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}@keyframes viewer-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}.el-link{--el-link-font-size:var(--el-font-size-base);--el-link-font-weight:var(--el-font-weight-primary);--el-link-text-color:var(--el-text-color-regular);--el-link-hover-text-color:var(--el-color-primary);--el-link-disabled-text-color:var(--el-text-color-placeholder)}.el-link{display:inline-flex;flex-direction:row;align-items:center;justify-content:center;vertical-align:middle;position:relative;text-decoration:none;outline:0;cursor:pointer;padding:0;font-size:var(--el-link-font-size);font-weight:var(--el-link-font-weight);color:var(--el-link-text-color)}.el-link:hover{color:var(--el-link-hover-text-color)}.el-link.is-underline:hover:after{content:"";position:absolute;left:0;right:0;height:0;bottom:0;border-bottom:1px solid var(--el-link-hover-text-color)}.el-link.is-disabled{color:var(--el-link-disabled-text-color);cursor:not-allowed}.el-link [class*=el-icon-]+span{margin-left:5px}.el-link.el-link--default:after{border-color:var(--el-link-hover-text-color)}.el-link__inner{display:inline-flex;justify-content:center;align-items:center}.el-link.el-link--primary{--el-link-text-color:var(--el-color-primary);--el-link-hover-text-color:var(--el-color-primary-light-3);--el-link-disabled-text-color:var(--el-color-primary-light-5)}.el-link.el-link--primary:after{border-color:var(--el-link-text-color)}.el-link.el-link--primary.is-underline:hover:after{border-color:var(--el-link-text-color)}.el-link.el-link--success{--el-link-text-color:var(--el-color-success);--el-link-hover-text-color:var(--el-color-success-light-3);--el-link-disabled-text-color:var(--el-color-success-light-5)}.el-link.el-link--success:after{border-color:var(--el-link-text-color)}.el-link.el-link--success.is-underline:hover:after{border-color:var(--el-link-text-color)}.el-link.el-link--warning{--el-link-text-color:var(--el-color-warning);--el-link-hover-text-color:var(--el-color-warning-light-3);--el-link-disabled-text-color:var(--el-color-warning-light-5)}.el-link.el-link--warning:after{border-color:var(--el-link-text-color)}.el-link.el-link--warning.is-underline:hover:after{border-color:var(--el-link-text-color)}.el-link.el-link--danger{--el-link-text-color:var(--el-color-danger);--el-link-hover-text-color:var(--el-color-danger-light-3);--el-link-disabled-text-color:var(--el-color-danger-light-5)}.el-link.el-link--danger:after{border-color:var(--el-link-text-color)}.el-link.el-link--danger.is-underline:hover:after{border-color:var(--el-link-text-color)}.el-link.el-link--error{--el-link-text-color:var(--el-color-error);--el-link-hover-text-color:var(--el-color-error-light-3);--el-link-disabled-text-color:var(--el-color-error-light-5)}.el-link.el-link--error:after{border-color:var(--el-link-text-color)}.el-link.el-link--error.is-underline:hover:after{border-color:var(--el-link-text-color)}.el-link.el-link--info{--el-link-text-color:var(--el-color-info);--el-link-hover-text-color:var(--el-color-info-light-3);--el-link-disabled-text-color:var(--el-color-info-light-5)}.el-link.el-link--info:after{border-color:var(--el-link-text-color)}.el-link.el-link--info.is-underline:hover:after{border-color:var(--el-link-text-color)}.el-avatar{--el-avatar-text-color:var(--el-color-white);--el-avatar-bg-color:var(--el-text-color-disabled);--el-avatar-text-size:14px;--el-avatar-icon-size:18px;--el-avatar-border-radius:var(--el-border-radius-base);--el-avatar-size-large:56px;--el-avatar-size-small:24px;--el-avatar-size:40px;display:inline-flex;justify-content:center;align-items:center;box-sizing:border-box;text-align:center;overflow:hidden;color:var(--el-avatar-text-color);background:var(--el-avatar-bg-color);width:var(--el-avatar-size);height:var(--el-avatar-size);font-size:var(--el-avatar-text-size)}.el-avatar>img{display:block;width:100%;height:100%}.el-avatar--circle{border-radius:50%}.el-avatar--square{border-radius:var(--el-avatar-border-radius)}.el-avatar--icon{font-size:var(--el-avatar-icon-size)}.el-avatar--small{--el-avatar-size:24px}.el-avatar--large{--el-avatar-size:56px}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.i-tabler-heart{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1.2em;height:1.2em}.i-tabler-message{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1.2em;height:1.2em}.i-tabler-share-3{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 4v4C6.425 9.028 3.98 14.788 3 20c-.037.206 5.384-5.962 10-6v4l8-7l-8-7z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1.2em;height:1.2em}.fixed{position:fixed}.right-4{right:1rem}.top-20{top:5rem}.grid{display:grid}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.m-auto{margin:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.mr-auto{margin-right:auto}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.hidden{display:none}.h-xs{height:20rem}.h2{height:.5rem}.max-h-52{max-height:13rem}.max-w-48{max-width:12rem}.w-fit{width:fit-content}.w-full{width:100%}.w-md{width:28rem}.w-xs{width:20rem}.flex{display:flex}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;user-select:none}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-start\\!{justify-content:flex-start!important}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-4{gap:1rem}.whitespace-pre-wrap{white-space:pre-wrap}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-2{border-radius:.5rem}.bg-light{--un-bg-opacity:1;background-color:rgba(246,246,246,var(--un-bg-opacity))}.bg-light-700{--un-bg-opacity:1;background-color:rgba(233,236,239,var(--un-bg-opacity))}.bg-white{--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity))}.p-20{padding:5rem}.p-3{padding:.75rem}.p-4{padding:1rem}.px-4{padding-left:1rem;padding-right:1rem}.px-8{padding-left:2rem;padding-right:2rem}.py-8{padding-top:2rem;padding-bottom:2rem}.text-center{text-align:center}.text-2{font-size:.5rem}.text-2\\!{font-size:.5rem!important}.text-3\\!{font-size:.75rem!important}.text-4{font-size:1rem}.text-5{font-size:1.25rem}.font-bold{font-weight:700}.font-bold\\!{font-weight:700!important}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}.text-black{--un-text-opacity:1;color:rgba(0,0,0,var(--un-text-opacity))}.text-gray{--un-text-opacity:1;color:rgba(156,163,175,var(--un-text-opacity))}.text-gray-400\\!{--un-text-opacity:1 !important;color:rgba(156,163,175,var(--un-text-opacity))!important}.hover\\:text-gray-600\\!:hover{--un-text-opacity:1 !important;color:rgba(75,85,99,var(--un-text-opacity))!important}.hover\\:text-teal-700\\!:hover{--un-text-opacity:1 !important;color:rgba(15,118,110,var(--un-text-opacity))!important}.underline{text-decoration-line:underline}@media (min-width: 640px){.sm\\:inline{display:inline}.sm\\:max-w-55rem{max-width:55rem}.sm\\:justify-center{justify-content:center}.sm\\:gap-3{gap:.75rem}.sm\\:gap-30{gap:7.5rem}}#plugin-app{position:absolute;top:0;right:0;z-index:9999}.btns button{display:inline-block;cursor:pointer;border-radius:.25rem;--un-bg-opacity:1;background-color:rgba(13,148,136,var(--un-bg-opacity));padding:.25rem 1rem;--un-text-opacity:1;color:rgba(255,255,255,var(--un-text-opacity))}.btns button:disabled{cursor:default;cursor:not-allowed;--un-bg-opacity:1;background-color:rgba(75,85,99,var(--un-bg-opacity));opacity:.5}.btns button:hover{--un-bg-opacity:1;background-color:rgba(15,118,110,var(--un-bg-opacity))}.icons>span{display:inline-flex;cursor:pointer;align-items:center;--un-text-opacity:1;color:rgba(156,163,175,var(--un-text-opacity))}.icons>span:hover{--un-text-opacity:1;color:rgba(15,118,110,var(--un-text-opacity))}.icons .icon{margin-left:.5rem;margin-right:.5rem}body{position:relative}.el-popper{--uno: z-9999!}span.icon{max-width:1rem;max-height:1rem;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center}.el-link:hover,a:hover{text-decoration:none}#preview a{--un-text-opacity:1;color:rgba(13,148,136,var(--un-text-opacity))}#preview a:hover{--un-text-opacity:1;color:rgba(15,118,110,var(--un-text-opacity))}#preview p{--un-text-opacity:1;color:rgba(0,0,0,var(--un-text-opacity))} `);

(function (vue) {
  'use strict';

  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_main_001 = __commonJS({
    "main-ed3c875a.js"(exports, module) {
      var isVue2 = false;
      /*!
       * pinia v2.1.6
       * (c) 2023 Eduardo San Martin Morote
       * @license MIT
       */
      let activePinia;
      const setActivePinia = (pinia) => activePinia = pinia;
      const piniaSymbol = (
        /* istanbul ignore next */
        Symbol()
      );
      function isPlainObject(o) {
        return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
      }
      var MutationType;
      (function(MutationType2) {
        MutationType2["direct"] = "direct";
        MutationType2["patchObject"] = "patch object";
        MutationType2["patchFunction"] = "patch function";
      })(MutationType || (MutationType = {}));
      function createPinia() {
        const scope = vue.effectScope(true);
        const state = scope.run(() => vue.ref({}));
        let _p = [];
        let toBeInstalled = [];
        const pinia = vue.markRaw({
          install(app2) {
            setActivePinia(pinia);
            {
              pinia._a = app2;
              app2.provide(piniaSymbol, pinia);
              app2.config.globalProperties.$pinia = pinia;
              toBeInstalled.forEach((plugin) => _p.push(plugin));
              toBeInstalled = [];
            }
          },
          use(plugin) {
            if (!this._a && !isVue2) {
              toBeInstalled.push(plugin);
            } else {
              _p.push(plugin);
            }
            return this;
          },
          _p,
          // it's actually undefined here
          // @ts-expect-error
          _a: null,
          _e: scope,
          _s: /* @__PURE__ */ new Map(),
          state
        });
        return pinia;
      }
      const noop$2 = () => {
      };
      function addSubscription(subscriptions, callback, detached, onCleanup = noop$2) {
        subscriptions.push(callback);
        const removeSubscription = () => {
          const idx = subscriptions.indexOf(callback);
          if (idx > -1) {
            subscriptions.splice(idx, 1);
            onCleanup();
          }
        };
        if (!detached && vue.getCurrentScope()) {
          vue.onScopeDispose(removeSubscription);
        }
        return removeSubscription;
      }
      function triggerSubscriptions(subscriptions, ...args) {
        subscriptions.slice().forEach((callback) => {
          callback(...args);
        });
      }
      const fallbackRunWithContext = (fn2) => fn2();
      function mergeReactiveObjects(target, patchToApply) {
        if (target instanceof Map && patchToApply instanceof Map) {
          patchToApply.forEach((value, key) => target.set(key, value));
        }
        if (target instanceof Set && patchToApply instanceof Set) {
          patchToApply.forEach(target.add, target);
        }
        for (const key in patchToApply) {
          if (!patchToApply.hasOwnProperty(key))
            continue;
          const subPatch = patchToApply[key];
          const targetValue = target[key];
          if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
            target[key] = mergeReactiveObjects(targetValue, subPatch);
          } else {
            target[key] = subPatch;
          }
        }
        return target;
      }
      const skipHydrateSymbol = (
        /* istanbul ignore next */
        Symbol()
      );
      function shouldHydrate(obj) {
        return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
      }
      const { assign } = Object;
      function isComputed(o) {
        return !!(vue.isRef(o) && o.effect);
      }
      function createOptionsStore(id, options, pinia, hot) {
        const { state, actions, getters } = options;
        const initialState = pinia.state.value[id];
        let store;
        function setup() {
          if (!initialState && true) {
            {
              pinia.state.value[id] = state ? state() : {};
            }
          }
          const localState = vue.toRefs(pinia.state.value[id]);
          return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
            computedGetters[name] = vue.markRaw(vue.computed(() => {
              setActivePinia(pinia);
              const store2 = pinia._s.get(id);
              return getters[name].call(store2, store2);
            }));
            return computedGetters;
          }, {}));
        }
        store = createSetupStore(id, setup, options, pinia, hot, true);
        return store;
      }
      function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
        let scope;
        const optionsForPlugin = assign({ actions: {} }, options);
        const $subscribeOptions = {
          deep: true
          // flush: 'post',
        };
        let isListening;
        let isSyncListening;
        let subscriptions = [];
        let actionSubscriptions = [];
        let debuggerEvents;
        const initialState = pinia.state.value[$id];
        if (!isOptionsStore && !initialState && true) {
          {
            pinia.state.value[$id] = {};
          }
        }
        vue.ref({});
        let activeListener;
        function $patch(partialStateOrMutator) {
          let subscriptionMutation;
          isListening = isSyncListening = false;
          if (typeof partialStateOrMutator === "function") {
            partialStateOrMutator(pinia.state.value[$id]);
            subscriptionMutation = {
              type: MutationType.patchFunction,
              storeId: $id,
              events: debuggerEvents
            };
          } else {
            mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
            subscriptionMutation = {
              type: MutationType.patchObject,
              payload: partialStateOrMutator,
              storeId: $id,
              events: debuggerEvents
            };
          }
          const myListenerId = activeListener = Symbol();
          vue.nextTick().then(() => {
            if (activeListener === myListenerId) {
              isListening = true;
            }
          });
          isSyncListening = true;
          triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
        }
        const $reset = isOptionsStore ? function $reset2() {
          const { state } = options;
          const newState = state ? state() : {};
          this.$patch(($state) => {
            assign($state, newState);
          });
        } : (
          /* istanbul ignore next */
          noop$2
        );
        function $dispose() {
          scope.stop();
          subscriptions = [];
          actionSubscriptions = [];
          pinia._s.delete($id);
        }
        function wrapAction(name, action) {
          return function() {
            setActivePinia(pinia);
            const args = Array.from(arguments);
            const afterCallbackList = [];
            const onErrorCallbackList = [];
            function after(callback) {
              afterCallbackList.push(callback);
            }
            function onError(callback) {
              onErrorCallbackList.push(callback);
            }
            triggerSubscriptions(actionSubscriptions, {
              args,
              name,
              store,
              after,
              onError
            });
            let ret;
            try {
              ret = action.apply(this && this.$id === $id ? this : store, args);
            } catch (error) {
              triggerSubscriptions(onErrorCallbackList, error);
              throw error;
            }
            if (ret instanceof Promise) {
              return ret.then((value) => {
                triggerSubscriptions(afterCallbackList, value);
                return value;
              }).catch((error) => {
                triggerSubscriptions(onErrorCallbackList, error);
                return Promise.reject(error);
              });
            }
            triggerSubscriptions(afterCallbackList, ret);
            return ret;
          };
        }
        const partialStore = {
          _p: pinia,
          // _s: scope,
          $id,
          $onAction: addSubscription.bind(null, actionSubscriptions),
          $patch,
          $reset,
          $subscribe(callback, options2 = {}) {
            const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
            const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
              if (options2.flush === "sync" ? isSyncListening : isListening) {
                callback({
                  storeId: $id,
                  type: MutationType.direct,
                  events: debuggerEvents
                }, state);
              }
            }, assign({}, $subscribeOptions, options2)));
            return removeSubscription;
          },
          $dispose
        };
        const store = vue.reactive(partialStore);
        pinia._s.set($id, store);
        const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
        const setupStore = pinia._e.run(() => {
          scope = vue.effectScope();
          return runWithContext(() => scope.run(setup));
        });
        for (const key in setupStore) {
          const prop = setupStore[key];
          if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
            if (!isOptionsStore) {
              if (initialState && shouldHydrate(prop)) {
                if (vue.isRef(prop)) {
                  prop.value = initialState[key];
                } else {
                  mergeReactiveObjects(prop, initialState[key]);
                }
              }
              {
                pinia.state.value[$id][key] = prop;
              }
            }
          } else if (typeof prop === "function") {
            const actionValue = wrapAction(key, prop);
            {
              setupStore[key] = actionValue;
            }
            optionsForPlugin.actions[key] = prop;
          } else
            ;
        }
        {
          assign(store, setupStore);
          assign(vue.toRaw(store), setupStore);
        }
        Object.defineProperty(store, "$state", {
          get: () => pinia.state.value[$id],
          set: (state) => {
            $patch(($state) => {
              assign($state, state);
            });
          }
        });
        pinia._p.forEach((extender) => {
          {
            assign(store, scope.run(() => extender({
              store,
              app: pinia._a,
              pinia,
              options: optionsForPlugin
            })));
          }
        });
        if (initialState && isOptionsStore && options.hydrate) {
          options.hydrate(store.$state, initialState);
        }
        isListening = true;
        isSyncListening = true;
        return store;
      }
      function defineStore(idOrOptions, setup, setupOptions) {
        let id;
        let options;
        const isSetupStore = typeof setup === "function";
        if (typeof idOrOptions === "string") {
          id = idOrOptions;
          options = isSetupStore ? setupOptions : setup;
        } else {
          options = idOrOptions;
          id = idOrOptions.id;
        }
        function useStore(pinia, hot) {
          const hasContext = vue.hasInjectionContext();
          pinia = // in test mode, ignore the argument provided as we can always retrieve a
          // pinia instance with getActivePinia()
          pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
          if (pinia)
            setActivePinia(pinia);
          pinia = activePinia;
          if (!pinia._s.has(id)) {
            if (isSetupStore) {
              createSetupStore(id, setup, options, pinia);
            } else {
              createOptionsStore(id, options, pinia);
            }
          }
          const store = pinia._s.get(id);
          return store;
        }
        useStore.$id = id;
        return useStore;
      }
      const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
        const handleEvent = (event) => {
          const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
          if (checkForDefaultPrevented === false || !shouldPrevent) {
            return oursHandler == null ? void 0 : oursHandler(event);
          }
        };
        return handleEvent;
      };
      var _a;
      const isClient$1 = typeof window !== "undefined";
      const isString$1 = (val) => typeof val === "string";
      const noop$1 = () => {
      };
      const isIOS = isClient$1 && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
      function resolveUnref(r) {
        return typeof r === "function" ? r() : vue.unref(r);
      }
      function createFilterWrapper(filter, fn2) {
        function wrapper(...args) {
          return new Promise((resolve, reject) => {
            Promise.resolve(filter(() => fn2.apply(this, args), { fn: fn2, thisArg: this, args })).then(resolve).catch(reject);
          });
        }
        return wrapper;
      }
      function throttleFilter(ms, trailing = true, leading = true, rejectOnCancel = false) {
        let lastExec = 0;
        let timer;
        let isLeading = true;
        let lastRejector = noop$1;
        let lastValue;
        const clear = () => {
          if (timer) {
            clearTimeout(timer);
            timer = void 0;
            lastRejector();
            lastRejector = noop$1;
          }
        };
        const filter = (_invoke) => {
          const duration = resolveUnref(ms);
          const elapsed = Date.now() - lastExec;
          const invoke = () => {
            return lastValue = _invoke();
          };
          clear();
          if (duration <= 0) {
            lastExec = Date.now();
            return invoke();
          }
          if (elapsed > duration && (leading || !isLeading)) {
            lastExec = Date.now();
            invoke();
          } else if (trailing) {
            lastValue = new Promise((resolve, reject) => {
              lastRejector = rejectOnCancel ? reject : resolve;
              timer = setTimeout(() => {
                lastExec = Date.now();
                isLeading = true;
                resolve(invoke());
                clear();
              }, Math.max(0, duration - elapsed));
            });
          }
          if (!leading && !timer)
            timer = setTimeout(() => isLeading = true, duration);
          isLeading = false;
          return lastValue;
        };
        return filter;
      }
      function identity(arg) {
        return arg;
      }
      function tryOnScopeDispose$1(fn2) {
        if (vue.getCurrentScope()) {
          vue.onScopeDispose(fn2);
          return true;
        }
        return false;
      }
      function useThrottleFn(fn2, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
        return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn2);
      }
      function tryOnMounted(fn2, sync = true) {
        if (vue.getCurrentInstance())
          vue.onMounted(fn2);
        else if (sync)
          fn2();
        else
          vue.nextTick(fn2);
      }
      function useTimeoutFn$1(cb, interval, options = {}) {
        const {
          immediate = true
        } = options;
        const isPending = vue.ref(false);
        let timer = null;
        function clear() {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
        function stop() {
          isPending.value = false;
          clear();
        }
        function start(...args) {
          clear();
          isPending.value = true;
          timer = setTimeout(() => {
            isPending.value = false;
            timer = null;
            cb(...args);
          }, resolveUnref(interval));
        }
        if (immediate) {
          isPending.value = true;
          if (isClient$1)
            start();
        }
        tryOnScopeDispose$1(stop);
        return {
          isPending: vue.readonly(isPending),
          start,
          stop
        };
      }
      function unrefElement(elRef) {
        var _a2;
        const plain = resolveUnref(elRef);
        return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
      }
      const defaultWindow$1 = isClient$1 ? window : void 0;
      function useEventListener(...args) {
        let target;
        let events;
        let listeners;
        let options;
        if (isString$1(args[0]) || Array.isArray(args[0])) {
          [events, listeners, options] = args;
          target = defaultWindow$1;
        } else {
          [target, events, listeners, options] = args;
        }
        if (!target)
          return noop$1;
        if (!Array.isArray(events))
          events = [events];
        if (!Array.isArray(listeners))
          listeners = [listeners];
        const cleanups = [];
        const cleanup = () => {
          cleanups.forEach((fn2) => fn2());
          cleanups.length = 0;
        };
        const register = (el, event, listener, options2) => {
          el.addEventListener(event, listener, options2);
          return () => el.removeEventListener(event, listener, options2);
        };
        const stopWatch = vue.watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
          cleanup();
          if (!el)
            return;
          cleanups.push(...events.flatMap((event) => {
            return listeners.map((listener) => register(el, event, listener, options2));
          }));
        }, { immediate: true, flush: "post" });
        const stop = () => {
          stopWatch();
          cleanup();
        };
        tryOnScopeDispose$1(stop);
        return stop;
      }
      let _iOSWorkaround = false;
      function onClickOutside(target, handler, options = {}) {
        const { window: window2 = defaultWindow$1, ignore = [], capture = true, detectIframe = false } = options;
        if (!window2)
          return;
        if (isIOS && !_iOSWorkaround) {
          _iOSWorkaround = true;
          Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop$1));
        }
        let shouldListen = true;
        const shouldIgnore = (event) => {
          return ignore.some((target2) => {
            if (typeof target2 === "string") {
              return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
            } else {
              const el = unrefElement(target2);
              return el && (event.target === el || event.composedPath().includes(el));
            }
          });
        };
        const listener = (event) => {
          const el = unrefElement(target);
          if (!el || el === event.target || event.composedPath().includes(el))
            return;
          if (event.detail === 0)
            shouldListen = !shouldIgnore(event);
          if (!shouldListen) {
            shouldListen = true;
            return;
          }
          handler(event);
        };
        const cleanup = [
          useEventListener(window2, "click", listener, { passive: true, capture }),
          useEventListener(window2, "pointerdown", (e) => {
            const el = unrefElement(target);
            if (el)
              shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e);
          }, { passive: true }),
          detectIframe && useEventListener(window2, "blur", (event) => {
            var _a2;
            const el = unrefElement(target);
            if (((_a2 = window2.document.activeElement) == null ? void 0 : _a2.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
              handler(event);
          })
        ].filter(Boolean);
        const stop = () => cleanup.forEach((fn2) => fn2());
        return stop;
      }
      function useSupported(callback, sync = false) {
        const isSupported = vue.ref();
        const update = () => isSupported.value = Boolean(callback());
        update();
        tryOnMounted(update, sync);
        return isSupported;
      }
      const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      const globalKey = "__vueuse_ssr_handlers__";
      _global[globalKey] = _global[globalKey] || {};
      var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
      var __hasOwnProp$g = Object.prototype.hasOwnProperty;
      var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
      var __objRest$2 = (source, exclude) => {
        var target = {};
        for (var prop in source)
          if (__hasOwnProp$g.call(source, prop) && exclude.indexOf(prop) < 0)
            target[prop] = source[prop];
        if (source != null && __getOwnPropSymbols$g)
          for (var prop of __getOwnPropSymbols$g(source)) {
            if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source, prop))
              target[prop] = source[prop];
          }
        return target;
      };
      function useResizeObserver(target, callback, options = {}) {
        const _a2 = options, { window: window2 = defaultWindow$1 } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
        let observer;
        const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
        const cleanup = () => {
          if (observer) {
            observer.disconnect();
            observer = void 0;
          }
        };
        const stopWatch = vue.watch(() => unrefElement(target), (el) => {
          cleanup();
          if (isSupported.value && window2 && el) {
            observer = new ResizeObserver(callback);
            observer.observe(el, observerOptions);
          }
        }, { immediate: true, flush: "post" });
        const stop = () => {
          cleanup();
          stopWatch();
        };
        tryOnScopeDispose$1(stop);
        return {
          isSupported,
          stop
        };
      }
      var SwipeDirection;
      (function(SwipeDirection2) {
        SwipeDirection2["UP"] = "UP";
        SwipeDirection2["RIGHT"] = "RIGHT";
        SwipeDirection2["DOWN"] = "DOWN";
        SwipeDirection2["LEFT"] = "LEFT";
        SwipeDirection2["NONE"] = "NONE";
      })(SwipeDirection || (SwipeDirection = {}));
      var __defProp = Object.defineProperty;
      var __getOwnPropSymbols = Object.getOwnPropertySymbols;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __propIsEnum = Object.prototype.propertyIsEnumerable;
      var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      var __spreadValues = (a, b) => {
        for (var prop in b || (b = {}))
          if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        if (__getOwnPropSymbols)
          for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop))
              __defNormalProp(a, prop, b[prop]);
          }
        return a;
      };
      const _TransitionPresets = {
        easeInSine: [0.12, 0, 0.39, 0],
        easeOutSine: [0.61, 1, 0.88, 1],
        easeInOutSine: [0.37, 0, 0.63, 1],
        easeInQuad: [0.11, 0, 0.5, 0],
        easeOutQuad: [0.5, 1, 0.89, 1],
        easeInOutQuad: [0.45, 0, 0.55, 1],
        easeInCubic: [0.32, 0, 0.67, 0],
        easeOutCubic: [0.33, 1, 0.68, 1],
        easeInOutCubic: [0.65, 0, 0.35, 1],
        easeInQuart: [0.5, 0, 0.75, 0],
        easeOutQuart: [0.25, 1, 0.5, 1],
        easeInOutQuart: [0.76, 0, 0.24, 1],
        easeInQuint: [0.64, 0, 0.78, 0],
        easeOutQuint: [0.22, 1, 0.36, 1],
        easeInOutQuint: [0.83, 0, 0.17, 1],
        easeInExpo: [0.7, 0, 0.84, 0],
        easeOutExpo: [0.16, 1, 0.3, 1],
        easeInOutExpo: [0.87, 0, 0.13, 1],
        easeInCirc: [0.55, 0, 1, 0.45],
        easeOutCirc: [0, 0.55, 0.45, 1],
        easeInOutCirc: [0.85, 0, 0.15, 1],
        easeInBack: [0.36, 0, 0.66, -0.56],
        easeOutBack: [0.34, 1.56, 0.64, 1],
        easeInOutBack: [0.68, -0.6, 0.32, 1.6]
      };
      __spreadValues({
        linear: identity
      }, _TransitionPresets);
      const isFirefox = () => isClient$1 && /firefox/i.test(window.navigator.userAgent);
      const isInContainer = (el, container) => {
        if (!isClient$1 || !el || !container)
          return false;
        const elRect = el.getBoundingClientRect();
        let containerRect;
        if (container instanceof Element) {
          containerRect = container.getBoundingClientRect();
        } else {
          containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0
          };
        }
        return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
      };
      const NOOP = () => {
      };
      const hasOwnProperty$9 = Object.prototype.hasOwnProperty;
      const hasOwn = (val, key) => hasOwnProperty$9.call(val, key);
      const isArray$2 = Array.isArray;
      const isDate = (val) => toTypeString(val) === "[object Date]";
      const isFunction$1 = (val) => typeof val === "function";
      const isString = (val) => typeof val === "string";
      const isObject$1 = (val) => val !== null && typeof val === "object";
      const objectToString$1 = Object.prototype.toString;
      const toTypeString = (value) => objectToString$1.call(value);
      const cacheStringFunction = (fn2) => {
        const cache = /* @__PURE__ */ Object.create(null);
        return (str) => {
          const hit = cache[str];
          return hit || (cache[str] = fn2(str));
        };
      };
      const camelizeRE = /-(\w)/g;
      const camelize = cacheStringFunction((str) => {
        return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
      });
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      const freeGlobal$1 = freeGlobal;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal$1 || freeSelf || Function("return this")();
      const root$1 = root;
      var Symbol$1 = root$1.Symbol;
      const Symbol$2 = Symbol$1;
      var objectProto$b = Object.prototype;
      var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
      var nativeObjectToString$1 = objectProto$b.toString;
      var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
          value[symToStringTag$1] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString$1.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag$1] = tag;
          } else {
            delete value[symToStringTag$1];
          }
        }
        return result;
      }
      var objectProto$a = Object.prototype;
      var nativeObjectToString = objectProto$a.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var symbolTag$1 = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      var isArray = Array.isArray;
      const isArray$1 = isArray;
      var INFINITY$1 = 1 / 0;
      var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray$1(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
      }
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var coreJsData = root$1["__core-js_shared__"];
      const coreJsData$1 = coreJsData;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var funcProto$1 = Function.prototype;
      var funcToString$1 = funcProto$1.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString$1.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto = Function.prototype, objectProto$9 = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      var WeakMap = getNative(root$1, "WeakMap");
      const WeakMap$1 = WeakMap;
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      var objectProto$8 = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
        return value === proto;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      var argsTag$2 = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag$2;
      }
      var objectProto$7 = Object.prototype;
      var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
      var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
      };
      const isArguments$1 = isArguments;
      function stubFalse() {
        return false;
      }
      var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      const isBuffer$1 = isBuffer;
      var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
      var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal$1.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      const nodeUtil$1 = nodeUtil;
      var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      const isTypedArray$1 = isTypedArray;
      var objectProto$6 = Object.prototype;
      var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      const nativeKeys$1 = nativeKeys;
      var objectProto$5 = Object.prototype;
      var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys$1(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$4.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray$1(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      var nativeCreate = getNative(Object, "create");
      const nativeCreate$1 = nativeCreate;
      function hashClear() {
        this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate$1) {
          var result = data[key];
          return result === HASH_UNDEFINED$2 ? void 0 : result;
        }
        return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
      }
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
      }
      var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
        return this;
      }
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      var Map$1 = getNative(root$1, "Map");
      const Map$2 = Map$1;
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map$2 || ListCache)(),
          "string": new Hash()
        };
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      var FUNC_ERROR_TEXT$2 = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT$2);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result.cache;
        return result;
      }
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      const stringToPath$1 = stringToPath;
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function castPath(value, object) {
        if (isArray$1(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath$1(toString(value));
      }
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : void 0;
      function isFlattenable(value) {
        return isArray$1(value) || isArguments$1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result || (result = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }
        return result;
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      var LARGE_ARRAY_SIZE = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function stubArray() {
        return [];
      }
      var objectProto$2 = Object.prototype;
      var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      const getSymbols$1 = getSymbols;
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols$1);
      }
      var DataView = getNative(root$1, "DataView");
      const DataView$1 = DataView;
      var Promise$1 = getNative(root$1, "Promise");
      const Promise$2 = Promise$1;
      var Set$1 = getNative(root$1, "Set");
      const Set$2 = Set$1;
      var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
      var dataViewTag$1 = "[object DataView]";
      var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
      var getTag = baseGetTag;
      if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1 || Map$2 && getTag(new Map$2()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
        getTag = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag$1;
              case mapCtorString:
                return mapTag$1;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag$1;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      const getTag$1 = getTag;
      var Uint8Array2 = root$1.Uint8Array;
      const Uint8Array$1 = Uint8Array2;
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      function SetCache(values) {
        var index = -1, length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
      var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
      var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      var COMPARE_PARTIAL_FLAG$1 = 1;
      var objectProto$1 = Object.prototype;
      var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      var COMPARE_PARTIAL_FLAG = 1;
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer$1(object)) {
          if (!isBuffer$1(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      var now = function() {
        return root$1.Date.now();
      };
      const now$1 = now;
      var FUNC_ERROR_TEXT$1 = "Expected a function";
      var nativeMax = Math.max, nativeMin = Math.min;
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT$1);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now$1();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now$1());
        }
        function debounced() {
          var time = now$1(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
        while (++index < length) {
          var pair = pairs[index];
          result[pair[0]] = pair[1];
        }
        return result;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isNil(value) {
        return value == null;
      }
      function isUndefined$1(value) {
        return value === void 0;
      }
      var FUNC_ERROR_TEXT = "Expected a function";
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      const isUndefined = (val) => val === void 0;
      const isBoolean = (val) => typeof val === "boolean";
      const isNumber = (val) => typeof val === "number";
      const isEmpty = (val) => !val && val !== 0 || isArray$2(val) && val.length === 0 || isObject$1(val) && !Object.keys(val).length;
      const isElement = (e) => {
        if (typeof Element === "undefined")
          return false;
        return e instanceof Element;
      };
      const isStringNumber = (val) => {
        if (!isString(val)) {
          return false;
        }
        return !Number.isNaN(Number(val));
      };
      const keysOf = (arr) => Object.keys(arr);
      class ElementPlusError extends Error {
        constructor(m) {
          super(m);
          this.name = "ElementPlusError";
        }
      }
      function throwError(scope, m) {
        throw new ElementPlusError(`[${scope}] ${m}`);
      }
      function debugWarn(scope, message2) {
      }
      const hasClass = (el, cls) => {
        if (!el || !cls)
          return false;
        if (cls.includes(" "))
          throw new Error("className should not contain space.");
        return el.classList.contains(cls);
      };
      const getStyle = (element, styleName) => {
        var _a2;
        if (!isClient$1 || !element || !styleName)
          return "";
        let key = camelize(styleName);
        if (key === "float")
          key = "cssFloat";
        try {
          const style = element.style[key];
          if (style)
            return style;
          const computed2 = (_a2 = document.defaultView) == null ? void 0 : _a2.getComputedStyle(element, "");
          return computed2 ? computed2[key] : "";
        } catch (e) {
          return element.style[key];
        }
      };
      function addUnit(value, defaultUnit = "px") {
        if (!value)
          return "";
        if (isNumber(value) || isStringNumber(value)) {
          return `${value}${defaultUnit}`;
        } else if (isString(value)) {
          return value;
        }
      }
      const isScroll = (el, isVertical) => {
        if (!isClient$1)
          return false;
        const key = {
          undefined: "overflow",
          true: "overflow-y",
          false: "overflow-x"
        }[String(isVertical)];
        const overflow = getStyle(el, key);
        return ["scroll", "auto", "overlay"].some((s) => overflow.includes(s));
      };
      const getScrollContainer = (el, isVertical) => {
        if (!isClient$1)
          return;
        let parent = el;
        while (parent) {
          if ([window, document, document.documentElement].includes(parent))
            return window;
          if (isScroll(parent, isVertical))
            return parent;
          parent = parent.parentNode;
        }
        return parent;
      };
      /*! Element Plus Icons Vue v2.1.0 */
      var export_helper_default = (sfc, props) => {
        let target = sfc.__vccOpts || sfc;
        for (let [key, val] of props)
          target[key] = val;
        return target;
      };
      var arrow_down_vue_vue_type_script_lang_default = {
        name: "ArrowDown"
      };
      var _hoisted_16 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_26 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_36 = [
        _hoisted_26
      ];
      function _sfc_render6(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_16, _hoisted_36);
      }
      var arrow_down_default = /* @__PURE__ */ export_helper_default(arrow_down_vue_vue_type_script_lang_default, [["render", _sfc_render6], ["__file", "arrow-down.vue"]]);
      var arrow_left_vue_vue_type_script_lang_default = {
        name: "ArrowLeft"
      };
      var _hoisted_18 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_28 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_38 = [
        _hoisted_28
      ];
      function _sfc_render8(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_18, _hoisted_38);
      }
      var arrow_left_default = /* @__PURE__ */ export_helper_default(arrow_left_vue_vue_type_script_lang_default, [["render", _sfc_render8], ["__file", "arrow-left.vue"]]);
      var arrow_right_vue_vue_type_script_lang_default = {
        name: "ArrowRight"
      };
      var _hoisted_110 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_210 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_310 = [
        _hoisted_210
      ];
      function _sfc_render10(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_110, _hoisted_310);
      }
      var arrow_right_default = /* @__PURE__ */ export_helper_default(arrow_right_vue_vue_type_script_lang_default, [["render", _sfc_render10], ["__file", "arrow-right.vue"]]);
      var arrow_up_vue_vue_type_script_lang_default = {
        name: "ArrowUp"
      };
      var _hoisted_112 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_212 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_312 = [
        _hoisted_212
      ];
      function _sfc_render12(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_112, _hoisted_312);
      }
      var arrow_up_default = /* @__PURE__ */ export_helper_default(arrow_up_vue_vue_type_script_lang_default, [["render", _sfc_render12], ["__file", "arrow-up.vue"]]);
      var calendar_vue_vue_type_script_lang_default = {
        name: "Calendar"
      };
      var _hoisted_129 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_229 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_328 = [
        _hoisted_229
      ];
      function _sfc_render29(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_129, _hoisted_328);
      }
      var calendar_default = /* @__PURE__ */ export_helper_default(calendar_vue_vue_type_script_lang_default, [["render", _sfc_render29], ["__file", "calendar.vue"]]);
      var circle_check_vue_vue_type_script_lang_default = {
        name: "CircleCheck"
      };
      var _hoisted_149 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_249 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_348 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_415 = [
        _hoisted_249,
        _hoisted_348
      ];
      function _sfc_render49(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_149, _hoisted_415);
      }
      var circle_check_default = /* @__PURE__ */ export_helper_default(circle_check_vue_vue_type_script_lang_default, [["render", _sfc_render49], ["__file", "circle-check.vue"]]);
      var circle_close_filled_vue_vue_type_script_lang_default = {
        name: "CircleCloseFilled"
      };
      var _hoisted_150 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_250 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_349 = [
        _hoisted_250
      ];
      function _sfc_render50(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_150, _hoisted_349);
      }
      var circle_close_filled_default = /* @__PURE__ */ export_helper_default(circle_close_filled_vue_vue_type_script_lang_default, [["render", _sfc_render50], ["__file", "circle-close-filled.vue"]]);
      var circle_close_vue_vue_type_script_lang_default = {
        name: "CircleClose"
      };
      var _hoisted_151 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_251 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_350 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_416 = [
        _hoisted_251,
        _hoisted_350
      ];
      function _sfc_render51(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_151, _hoisted_416);
      }
      var circle_close_default = /* @__PURE__ */ export_helper_default(circle_close_vue_vue_type_script_lang_default, [["render", _sfc_render51], ["__file", "circle-close.vue"]]);
      var clock_vue_vue_type_script_lang_default = {
        name: "Clock"
      };
      var _hoisted_154 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_254 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_353 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_418 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_56 = [
        _hoisted_254,
        _hoisted_353,
        _hoisted_418
      ];
      function _sfc_render54(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_154, _hoisted_56);
      }
      var clock_default = /* @__PURE__ */ export_helper_default(clock_vue_vue_type_script_lang_default, [["render", _sfc_render54], ["__file", "clock.vue"]]);
      var close_vue_vue_type_script_lang_default = {
        name: "Close"
      };
      var _hoisted_156 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_256 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_355 = [
        _hoisted_256
      ];
      function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_156, _hoisted_355);
      }
      var close_default = /* @__PURE__ */ export_helper_default(close_vue_vue_type_script_lang_default, [["render", _sfc_render56], ["__file", "close.vue"]]);
      var d_arrow_left_vue_vue_type_script_lang_default = {
        name: "DArrowLeft"
      };
      var _hoisted_172 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_272 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_371 = [
        _hoisted_272
      ];
      function _sfc_render72(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_172, _hoisted_371);
      }
      var d_arrow_left_default = /* @__PURE__ */ export_helper_default(d_arrow_left_vue_vue_type_script_lang_default, [["render", _sfc_render72], ["__file", "d-arrow-left.vue"]]);
      var d_arrow_right_vue_vue_type_script_lang_default = {
        name: "DArrowRight"
      };
      var _hoisted_173 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_273 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_372 = [
        _hoisted_273
      ];
      function _sfc_render73(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_173, _hoisted_372);
      }
      var d_arrow_right_default = /* @__PURE__ */ export_helper_default(d_arrow_right_vue_vue_type_script_lang_default, [["render", _sfc_render73], ["__file", "d-arrow-right.vue"]]);
      var full_screen_vue_vue_type_script_lang_default = {
        name: "FullScreen"
      };
      var _hoisted_1118 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2118 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3117 = [
        _hoisted_2118
      ];
      function _sfc_render118(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1118, _hoisted_3117);
      }
      var full_screen_default = /* @__PURE__ */ export_helper_default(full_screen_vue_vue_type_script_lang_default, [["render", _sfc_render118], ["__file", "full-screen.vue"]]);
      var hide_vue_vue_type_script_lang_default = {
        name: "Hide"
      };
      var _hoisted_1133 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2133 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3132 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_438 = [
        _hoisted_2133,
        _hoisted_3132
      ];
      function _sfc_render133(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1133, _hoisted_438);
      }
      var hide_default = /* @__PURE__ */ export_helper_default(hide_vue_vue_type_script_lang_default, [["render", _sfc_render133], ["__file", "hide.vue"]]);
      var info_filled_vue_vue_type_script_lang_default = {
        name: "InfoFilled"
      };
      var _hoisted_1143 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2143 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3142 = [
        _hoisted_2143
      ];
      function _sfc_render143(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1143, _hoisted_3142);
      }
      var info_filled_default = /* @__PURE__ */ export_helper_default(info_filled_vue_vue_type_script_lang_default, [["render", _sfc_render143], ["__file", "info-filled.vue"]]);
      var loading_vue_vue_type_script_lang_default = {
        name: "Loading"
      };
      var _hoisted_1150 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2150 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3149 = [
        _hoisted_2150
      ];
      function _sfc_render150(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1150, _hoisted_3149);
      }
      var loading_default = /* @__PURE__ */ export_helper_default(loading_vue_vue_type_script_lang_default, [["render", _sfc_render150], ["__file", "loading.vue"]]);
      var refresh_left_vue_vue_type_script_lang_default = {
        name: "RefreshLeft"
      };
      var _hoisted_1215 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2215 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3214 = [
        _hoisted_2215
      ];
      function _sfc_render215(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1215, _hoisted_3214);
      }
      var refresh_left_default = /* @__PURE__ */ export_helper_default(refresh_left_vue_vue_type_script_lang_default, [["render", _sfc_render215], ["__file", "refresh-left.vue"]]);
      var refresh_right_vue_vue_type_script_lang_default = {
        name: "RefreshRight"
      };
      var _hoisted_1216 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2216 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3215 = [
        _hoisted_2216
      ];
      function _sfc_render216(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1216, _hoisted_3215);
      }
      var refresh_right_default = /* @__PURE__ */ export_helper_default(refresh_right_vue_vue_type_script_lang_default, [["render", _sfc_render216], ["__file", "refresh-right.vue"]]);
      var scale_to_original_vue_vue_type_script_lang_default = {
        name: "ScaleToOriginal"
      };
      var _hoisted_1222 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2222 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zM512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412zM512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3221 = [
        _hoisted_2222
      ];
      function _sfc_render222(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1222, _hoisted_3221);
      }
      var scale_to_original_default = /* @__PURE__ */ export_helper_default(scale_to_original_vue_vue_type_script_lang_default, [["render", _sfc_render222], ["__file", "scale-to-original.vue"]]);
      var success_filled_vue_vue_type_script_lang_default = {
        name: "SuccessFilled"
      };
      var _hoisted_1249 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2249 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3248 = [
        _hoisted_2249
      ];
      function _sfc_render249(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1249, _hoisted_3248);
      }
      var success_filled_default = /* @__PURE__ */ export_helper_default(success_filled_vue_vue_type_script_lang_default, [["render", _sfc_render249], ["__file", "success-filled.vue"]]);
      var view_vue_vue_type_script_lang_default = {
        name: "View"
      };
      var _hoisted_1283 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2283 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3282 = [
        _hoisted_2283
      ];
      function _sfc_render283(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1283, _hoisted_3282);
      }
      var view_default = /* @__PURE__ */ export_helper_default(view_vue_vue_type_script_lang_default, [["render", _sfc_render283], ["__file", "view.vue"]]);
      var warning_filled_vue_vue_type_script_lang_default = {
        name: "WarningFilled"
      };
      var _hoisted_1287 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2287 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3286 = [
        _hoisted_2287
      ];
      function _sfc_render287(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1287, _hoisted_3286);
      }
      var warning_filled_default = /* @__PURE__ */ export_helper_default(warning_filled_vue_vue_type_script_lang_default, [["render", _sfc_render287], ["__file", "warning-filled.vue"]]);
      var zoom_in_vue_vue_type_script_lang_default = {
        name: "ZoomIn"
      };
      var _hoisted_1292 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2292 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3291 = [
        _hoisted_2292
      ];
      function _sfc_render292(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1292, _hoisted_3291);
      }
      var zoom_in_default = /* @__PURE__ */ export_helper_default(zoom_in_vue_vue_type_script_lang_default, [["render", _sfc_render292], ["__file", "zoom-in.vue"]]);
      var zoom_out_vue_vue_type_script_lang_default = {
        name: "ZoomOut"
      };
      var _hoisted_1293 = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, _hoisted_2293 = /* @__PURE__ */ vue.createElementVNode(
        "path",
        {
          fill: "currentColor",
          d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"
        },
        null,
        -1
        /* HOISTED */
      ), _hoisted_3292 = [
        _hoisted_2293
      ];
      function _sfc_render293(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1293, _hoisted_3292);
      }
      var zoom_out_default = /* @__PURE__ */ export_helper_default(zoom_out_vue_vue_type_script_lang_default, [["render", _sfc_render293], ["__file", "zoom-out.vue"]]);
      const epPropKey = "__epPropKey";
      const definePropType = (val) => val;
      const isEpProp = (val) => isObject$1(val) && !!val[epPropKey];
      const buildProp = (prop, key) => {
        if (!isObject$1(prop) || isEpProp(prop))
          return prop;
        const { values, required, default: defaultValue, type, validator } = prop;
        const _validator = values || validator ? (val) => {
          let valid = false;
          let allowedValues = [];
          if (values) {
            allowedValues = Array.from(values);
            if (hasOwn(prop, "default")) {
              allowedValues.push(defaultValue);
            }
            valid || (valid = allowedValues.includes(val));
          }
          if (validator)
            valid || (valid = validator(val));
          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
            vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
          }
          return valid;
        } : void 0;
        const epProp = {
          type,
          required: !!required,
          validator: _validator,
          [epPropKey]: true
        };
        if (hasOwn(prop, "default"))
          epProp.default = defaultValue;
        return epProp;
      };
      const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
        key,
        buildProp(option, key)
      ]));
      const iconPropType = definePropType([
        String,
        Object,
        Function
      ]);
      const TypeComponents = {
        Close: close_default,
        SuccessFilled: success_filled_default,
        InfoFilled: info_filled_default,
        WarningFilled: warning_filled_default,
        CircleCloseFilled: circle_close_filled_default
      };
      const TypeComponentsMap = {
        success: success_filled_default,
        warning: warning_filled_default,
        error: circle_close_filled_default,
        info: info_filled_default
      };
      const ValidateComponentsMap = {
        validating: loading_default,
        success: circle_check_default,
        error: circle_close_default
      };
      const withInstall = (main2, extra) => {
        main2.install = (app2) => {
          for (const comp of [main2, ...Object.values(extra != null ? extra : {})]) {
            app2.component(comp.name, comp);
          }
        };
        if (extra) {
          for (const [key, comp] of Object.entries(extra)) {
            main2[key] = comp;
          }
        }
        return main2;
      };
      const withInstallFunction = (fn2, name) => {
        fn2.install = (app2) => {
          fn2._context = app2._context;
          app2.config.globalProperties[name] = fn2;
        };
        return fn2;
      };
      const withNoopInstall = (component) => {
        component.install = NOOP;
        return component;
      };
      const EVENT_CODE = {
        tab: "Tab",
        enter: "Enter",
        space: "Space",
        left: "ArrowLeft",
        up: "ArrowUp",
        right: "ArrowRight",
        down: "ArrowDown",
        esc: "Escape",
        delete: "Delete",
        backspace: "Backspace",
        numpadEnter: "NumpadEnter",
        pageUp: "PageUp",
        pageDown: "PageDown",
        home: "Home",
        end: "End"
      };
      const datePickTypes = [
        "year",
        "month",
        "date",
        "dates",
        "week",
        "datetime",
        "datetimerange",
        "daterange",
        "monthrange"
      ];
      const UPDATE_MODEL_EVENT = "update:modelValue";
      const componentSizes = ["", "default", "small", "large"];
      const castArray = (arr) => {
        if (!arr && arr !== 0)
          return [];
        return Array.isArray(arr) ? arr : [arr];
      };
      const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
      const mutable = (val) => val;
      const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
      const LISTENER_PREFIX = /^on[A-Z]/;
      const useAttrs = (params = {}) => {
        const { excludeListeners = false, excludeKeys } = params;
        const allExcludeKeys = vue.computed(() => {
          return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
        });
        const instance = vue.getCurrentInstance();
        if (!instance) {
          return vue.computed(() => ({}));
        }
        return vue.computed(() => {
          var _a2;
          return fromPairs(Object.entries((_a2 = instance.proxy) == null ? void 0 : _a2.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))));
        });
      };
      const useDeprecated = ({ from, replacement, scope, version, ref: ref2, type = "API" }, condition) => {
        vue.watch(() => vue.unref(condition), (val) => {
        }, {
          immediate: true
        });
      };
      var English = {
        name: "en",
        el: {
          colorpicker: {
            confirm: "OK",
            clear: "Clear",
            defaultLabel: "color picker",
            description: "current color is {color}. press enter to select a new color."
          },
          datepicker: {
            now: "Now",
            today: "Today",
            cancel: "Cancel",
            clear: "Clear",
            confirm: "OK",
            dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
            monthTablePrompt: "Use the arrow keys and enter to select the month",
            yearTablePrompt: "Use the arrow keys and enter to select the year",
            selectedDate: "Selected date",
            selectDate: "Select date",
            selectTime: "Select time",
            startDate: "Start Date",
            startTime: "Start Time",
            endDate: "End Date",
            endTime: "End Time",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            prevMonth: "Previous Month",
            nextMonth: "Next Month",
            year: "",
            month1: "January",
            month2: "February",
            month3: "March",
            month4: "April",
            month5: "May",
            month6: "June",
            month7: "July",
            month8: "August",
            month9: "September",
            month10: "October",
            month11: "November",
            month12: "December",
            week: "week",
            weeks: {
              sun: "Sun",
              mon: "Mon",
              tue: "Tue",
              wed: "Wed",
              thu: "Thu",
              fri: "Fri",
              sat: "Sat"
            },
            weeksFull: {
              sun: "Sunday",
              mon: "Monday",
              tue: "Tuesday",
              wed: "Wednesday",
              thu: "Thursday",
              fri: "Friday",
              sat: "Saturday"
            },
            months: {
              jan: "Jan",
              feb: "Feb",
              mar: "Mar",
              apr: "Apr",
              may: "May",
              jun: "Jun",
              jul: "Jul",
              aug: "Aug",
              sep: "Sep",
              oct: "Oct",
              nov: "Nov",
              dec: "Dec"
            }
          },
          inputNumber: {
            decrease: "decrease number",
            increase: "increase number"
          },
          select: {
            loading: "Loading",
            noMatch: "No matching data",
            noData: "No data",
            placeholder: "Select"
          },
          dropdown: {
            toggleDropdown: "Toggle Dropdown"
          },
          cascader: {
            noMatch: "No matching data",
            loading: "Loading",
            placeholder: "Select",
            noData: "No data"
          },
          pagination: {
            goto: "Go to",
            pagesize: "/page",
            total: "Total {total}",
            pageClassifier: "",
            page: "Page",
            prev: "Go to previous page",
            next: "Go to next page",
            currentPage: "page {pager}",
            prevPages: "Previous {pager} pages",
            nextPages: "Next {pager} pages",
            deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
          },
          dialog: {
            close: "Close this dialog"
          },
          drawer: {
            close: "Close this dialog"
          },
          messagebox: {
            title: "Message",
            confirm: "OK",
            cancel: "Cancel",
            error: "Illegal input",
            close: "Close this dialog"
          },
          upload: {
            deleteTip: "press delete to remove",
            delete: "Delete",
            preview: "Preview",
            continue: "Continue"
          },
          slider: {
            defaultLabel: "slider between {min} and {max}",
            defaultRangeStartLabel: "pick start value",
            defaultRangeEndLabel: "pick end value"
          },
          table: {
            emptyText: "No Data",
            confirmFilter: "Confirm",
            resetFilter: "Reset",
            clearFilter: "All",
            sumText: "Sum"
          },
          tree: {
            emptyText: "No Data"
          },
          transfer: {
            noMatch: "No matching data",
            noData: "No data",
            titles: ["List 1", "List 2"],
            filterPlaceholder: "Enter keyword",
            noCheckedFormat: "{total} items",
            hasCheckedFormat: "{checked}/{total} checked"
          },
          image: {
            error: "FAILED"
          },
          pageHeader: {
            title: "Back"
          },
          popconfirm: {
            confirmButtonText: "Yes",
            cancelButtonText: "No"
          }
        }
      };
      const buildTranslator = (locale) => (path, option) => translate(path, option, vue.unref(locale));
      const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
        var _a2;
        return `${(_a2 = option == null ? void 0 : option[key]) != null ? _a2 : `{${key}}`}`;
      });
      const buildLocaleContext = (locale) => {
        const lang = vue.computed(() => vue.unref(locale).name);
        const localeRef = vue.isRef(locale) ? locale : vue.ref(locale);
        return {
          lang,
          locale: localeRef,
          t: buildTranslator(locale)
        };
      };
      const localeContextKey = Symbol("localeContextKey");
      const useLocale = (localeOverrides) => {
        const locale = localeOverrides || vue.inject(localeContextKey, vue.ref());
        return buildLocaleContext(vue.computed(() => locale.value || English));
      };
      const defaultNamespace = "el";
      const statePrefix = "is-";
      const _bem = (namespace, block, blockSuffix, element, modifier) => {
        let cls = `${namespace}-${block}`;
        if (blockSuffix) {
          cls += `-${blockSuffix}`;
        }
        if (element) {
          cls += `__${element}`;
        }
        if (modifier) {
          cls += `--${modifier}`;
        }
        return cls;
      };
      const namespaceContextKey = Symbol("namespaceContextKey");
      const useGetDerivedNamespace = (namespaceOverrides) => {
        const derivedNamespace = namespaceOverrides || (vue.getCurrentInstance() ? vue.inject(namespaceContextKey, vue.ref(defaultNamespace)) : vue.ref(defaultNamespace));
        const namespace = vue.computed(() => {
          return vue.unref(derivedNamespace) || defaultNamespace;
        });
        return namespace;
      };
      const useNamespace = (block, namespaceOverrides) => {
        const namespace = useGetDerivedNamespace(namespaceOverrides);
        const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
        const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
        const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
        const be2 = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
        const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
        const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
        const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
        const is = (name, ...args) => {
          const state = args.length >= 1 ? args[0] : true;
          return name && state ? `${statePrefix}${name}` : "";
        };
        const cssVar = (object) => {
          const styles = {};
          for (const key in object) {
            if (object[key]) {
              styles[`--${namespace.value}-${key}`] = object[key];
            }
          }
          return styles;
        };
        const cssVarBlock = (object) => {
          const styles = {};
          for (const key in object) {
            if (object[key]) {
              styles[`--${namespace.value}-${block}-${key}`] = object[key];
            }
          }
          return styles;
        };
        const cssVarName = (name) => `--${namespace.value}-${name}`;
        const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
        return {
          namespace,
          b,
          e,
          m,
          be: be2,
          em,
          bm,
          bem,
          is,
          cssVar,
          cssVarName,
          cssVarBlock,
          cssVarBlockName
        };
      };
      const _prop = buildProp({
        type: definePropType(Boolean),
        default: null
      });
      const _event = buildProp({
        type: definePropType(Function)
      });
      const createModelToggleComposable = (name) => {
        const updateEventKey = `update:${name}`;
        const updateEventKeyRaw = `onUpdate:${name}`;
        const useModelToggleEmits2 = [updateEventKey];
        const useModelToggleProps2 = {
          [name]: _prop,
          [updateEventKeyRaw]: _event
        };
        const useModelToggle2 = ({
          indicator,
          toggleReason,
          shouldHideWhenRouteChanges,
          shouldProceed,
          onShow,
          onHide
        }) => {
          const instance = vue.getCurrentInstance();
          const { emit } = instance;
          const props = instance.props;
          const hasUpdateHandler = vue.computed(() => isFunction$1(props[updateEventKeyRaw]));
          const isModelBindingAbsent = vue.computed(() => props[name] === null);
          const doShow = (event) => {
            if (indicator.value === true) {
              return;
            }
            indicator.value = true;
            if (toggleReason) {
              toggleReason.value = event;
            }
            if (isFunction$1(onShow)) {
              onShow(event);
            }
          };
          const doHide = (event) => {
            if (indicator.value === false) {
              return;
            }
            indicator.value = false;
            if (toggleReason) {
              toggleReason.value = event;
            }
            if (isFunction$1(onHide)) {
              onHide(event);
            }
          };
          const show = (event) => {
            if (props.disabled === true || isFunction$1(shouldProceed) && !shouldProceed())
              return;
            const shouldEmit = hasUpdateHandler.value && isClient$1;
            if (shouldEmit) {
              emit(updateEventKey, true);
            }
            if (isModelBindingAbsent.value || !shouldEmit) {
              doShow(event);
            }
          };
          const hide = (event) => {
            if (props.disabled === true || !isClient$1)
              return;
            const shouldEmit = hasUpdateHandler.value && isClient$1;
            if (shouldEmit) {
              emit(updateEventKey, false);
            }
            if (isModelBindingAbsent.value || !shouldEmit) {
              doHide(event);
            }
          };
          const onChange = (val) => {
            if (!isBoolean(val))
              return;
            if (props.disabled && val) {
              if (hasUpdateHandler.value) {
                emit(updateEventKey, false);
              }
            } else if (indicator.value !== val) {
              if (val) {
                doShow();
              } else {
                doHide();
              }
            }
          };
          const toggle = () => {
            if (indicator.value) {
              hide();
            } else {
              show();
            }
          };
          vue.watch(() => props[name], onChange);
          if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) {
            vue.watch(() => ({
              ...instance.proxy.$route
            }), () => {
              if (shouldHideWhenRouteChanges.value && indicator.value) {
                hide();
              }
            });
          }
          vue.onMounted(() => {
            onChange(props[name]);
          });
          return {
            hide,
            show,
            toggle,
            hasUpdateHandler
          };
        };
        return {
          useModelToggle: useModelToggle2,
          useModelToggleProps: useModelToggleProps2,
          useModelToggleEmits: useModelToggleEmits2
        };
      };
      const useProp = (name) => {
        const vm = vue.getCurrentInstance();
        return vue.computed(() => {
          var _a2, _b;
          return (_b = (_a2 = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a2.$props) == null ? void 0 : _b[name];
        });
      };
      var E = "top", R = "bottom", W = "right", P = "left", me = "auto", G = [E, R, W, P], U = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(t, e) {
        return t.concat([e + "-" + U, e + "-" + J]);
      }, []), Ee = [].concat(G, [me]).reduce(function(t, e) {
        return t.concat([e, e + "-" + U, e + "-" + J]);
      }, []), Ge = "beforeRead", Je = "read", Ke = "afterRead", Qe = "beforeMain", Ze = "main", et = "afterMain", tt = "beforeWrite", nt = "write", rt = "afterWrite", ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt];
      function C(t) {
        return t ? (t.nodeName || "").toLowerCase() : null;
      }
      function H(t) {
        if (t == null)
          return window;
        if (t.toString() !== "[object Window]") {
          var e = t.ownerDocument;
          return e && e.defaultView || window;
        }
        return t;
      }
      function Q(t) {
        var e = H(t).Element;
        return t instanceof e || t instanceof Element;
      }
      function B(t) {
        var e = H(t).HTMLElement;
        return t instanceof e || t instanceof HTMLElement;
      }
      function Pe(t) {
        if (typeof ShadowRoot == "undefined")
          return false;
        var e = H(t).ShadowRoot;
        return t instanceof e || t instanceof ShadowRoot;
      }
      function Mt(t) {
        var e = t.state;
        Object.keys(e.elements).forEach(function(n) {
          var r = e.styles[n] || {}, o = e.attributes[n] || {}, i = e.elements[n];
          !B(i) || !C(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
            var s = o[a];
            s === false ? i.removeAttribute(a) : i.setAttribute(a, s === true ? "" : s);
          }));
        });
      }
      function Rt(t) {
        var e = t.state, n = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
        return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
          Object.keys(e.elements).forEach(function(r) {
            var o = e.elements[r], i = e.attributes[r] || {}, a = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), s = a.reduce(function(f, c) {
              return f[c] = "", f;
            }, {});
            !B(o) || !C(o) || (Object.assign(o.style, s), Object.keys(i).forEach(function(f) {
              o.removeAttribute(f);
            }));
          });
        };
      }
      var Ae = { name: "applyStyles", enabled: true, phase: "write", fn: Mt, effect: Rt, requires: ["computeStyles"] };
      function q(t) {
        return t.split("-")[0];
      }
      var X = Math.max, ve = Math.min, Z = Math.round;
      function ee(t, e) {
        e === void 0 && (e = false);
        var n = t.getBoundingClientRect(), r = 1, o = 1;
        if (B(t) && e) {
          var i = t.offsetHeight, a = t.offsetWidth;
          a > 0 && (r = Z(n.width) / a || 1), i > 0 && (o = Z(n.height) / i || 1);
        }
        return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
      }
      function ke(t) {
        var e = ee(t), n = t.offsetWidth, r = t.offsetHeight;
        return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), { x: t.offsetLeft, y: t.offsetTop, width: n, height: r };
      }
      function it(t, e) {
        var n = e.getRootNode && e.getRootNode();
        if (t.contains(e))
          return true;
        if (n && Pe(n)) {
          var r = e;
          do {
            if (r && t.isSameNode(r))
              return true;
            r = r.parentNode || r.host;
          } while (r);
        }
        return false;
      }
      function N(t) {
        return H(t).getComputedStyle(t);
      }
      function Wt(t) {
        return ["table", "td", "th"].indexOf(C(t)) >= 0;
      }
      function I(t) {
        return ((Q(t) ? t.ownerDocument : t.document) || window.document).documentElement;
      }
      function ge(t) {
        return C(t) === "html" ? t : t.assignedSlot || t.parentNode || (Pe(t) ? t.host : null) || I(t);
      }
      function at(t) {
        return !B(t) || N(t).position === "fixed" ? null : t.offsetParent;
      }
      function Bt(t) {
        var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
        if (n && B(t)) {
          var r = N(t);
          if (r.position === "fixed")
            return null;
        }
        var o = ge(t);
        for (Pe(o) && (o = o.host); B(o) && ["html", "body"].indexOf(C(o)) < 0; ) {
          var i = N(o);
          if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
            return o;
          o = o.parentNode;
        }
        return null;
      }
      function se(t) {
        for (var e = H(t), n = at(t); n && Wt(n) && N(n).position === "static"; )
          n = at(n);
        return n && (C(n) === "html" || C(n) === "body" && N(n).position === "static") ? e : n || Bt(t) || e;
      }
      function Le(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
      }
      function fe(t, e, n) {
        return X(t, ve(e, n));
      }
      function St(t, e, n) {
        var r = fe(t, e, n);
        return r > n ? n : r;
      }
      function st() {
        return { top: 0, right: 0, bottom: 0, left: 0 };
      }
      function ft(t) {
        return Object.assign({}, st(), t);
      }
      function ct(t, e) {
        return e.reduce(function(n, r) {
          return n[r] = t, n;
        }, {});
      }
      var Tt = function(t, e) {
        return t = typeof t == "function" ? t(Object.assign({}, e.rects, { placement: e.placement })) : t, ft(typeof t != "number" ? t : ct(t, G));
      };
      function Ht(t) {
        var e, n = t.state, r = t.name, o = t.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, s = q(n.placement), f = Le(s), c = [P, W].indexOf(s) >= 0, u = c ? "height" : "width";
        if (!(!i || !a)) {
          var m = Tt(o.padding, n), v = ke(i), l = f === "y" ? E : P, h = f === "y" ? R : W, p = n.rects.reference[u] + n.rects.reference[f] - a[f] - n.rects.popper[u], g = a[f] - n.rects.reference[f], x = se(i), y = x ? f === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, $ = p / 2 - g / 2, d = m[l], b = y - v[u] - m[h], w = y / 2 - v[u] / 2 + $, O = fe(d, w, b), j = f;
          n.modifiersData[r] = (e = {}, e[j] = O, e.centerOffset = O - w, e);
        }
      }
      function Ct(t) {
        var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
        o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || !it(e.elements.popper, o) || (e.elements.arrow = o));
      }
      var pt = { name: "arrow", enabled: true, phase: "main", fn: Ht, effect: Ct, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
      function te(t) {
        return t.split("-")[1];
      }
      var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function Vt(t) {
        var e = t.x, n = t.y, r = window, o = r.devicePixelRatio || 1;
        return { x: Z(e * o) / o || 0, y: Z(n * o) / o || 0 };
      }
      function ut(t) {
        var e, n = t.popper, r = t.popperRect, o = t.placement, i = t.variation, a = t.offsets, s = t.position, f = t.gpuAcceleration, c = t.adaptive, u = t.roundOffsets, m = t.isFixed, v = a.x, l = v === void 0 ? 0 : v, h = a.y, p = h === void 0 ? 0 : h, g = typeof u == "function" ? u({ x: l, y: p }) : { x: l, y: p };
        l = g.x, p = g.y;
        var x = a.hasOwnProperty("x"), y = a.hasOwnProperty("y"), $ = P, d = E, b = window;
        if (c) {
          var w = se(n), O = "clientHeight", j = "clientWidth";
          if (w === H(n) && (w = I(n), N(w).position !== "static" && s === "absolute" && (O = "scrollHeight", j = "scrollWidth")), w = w, o === E || (o === P || o === W) && i === J) {
            d = R;
            var A = m && w === b && b.visualViewport ? b.visualViewport.height : w[O];
            p -= A - r.height, p *= f ? 1 : -1;
          }
          if (o === P || (o === E || o === R) && i === J) {
            $ = W;
            var k = m && w === b && b.visualViewport ? b.visualViewport.width : w[j];
            l -= k - r.width, l *= f ? 1 : -1;
          }
        }
        var D = Object.assign({ position: s }, c && qt), S = u === true ? Vt({ x: l, y: p }) : { x: l, y: p };
        if (l = S.x, p = S.y, f) {
          var L;
          return Object.assign({}, D, (L = {}, L[d] = y ? "0" : "", L[$] = x ? "0" : "", L.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + l + "px, " + p + "px)" : "translate3d(" + l + "px, " + p + "px, 0)", L));
        }
        return Object.assign({}, D, (e = {}, e[d] = y ? p + "px" : "", e[$] = x ? l + "px" : "", e.transform = "", e));
      }
      function Nt(t) {
        var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? true : r, i = n.adaptive, a = i === void 0 ? true : i, s = n.roundOffsets, f = s === void 0 ? true : s, c = { placement: q(e.placement), variation: te(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: o, isFixed: e.options.strategy === "fixed" };
        e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, ut(Object.assign({}, c, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: a, roundOffsets: f })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ut(Object.assign({}, c, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: f })))), e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement });
      }
      var Me = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: Nt, data: {} }, ye = { passive: true };
      function It(t) {
        var e = t.state, n = t.instance, r = t.options, o = r.scroll, i = o === void 0 ? true : o, a = r.resize, s = a === void 0 ? true : a, f = H(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
        return i && c.forEach(function(u) {
          u.addEventListener("scroll", n.update, ye);
        }), s && f.addEventListener("resize", n.update, ye), function() {
          i && c.forEach(function(u) {
            u.removeEventListener("scroll", n.update, ye);
          }), s && f.removeEventListener("resize", n.update, ye);
        };
      }
      var Re = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
      }, effect: It, data: {} }, _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function be(t) {
        return t.replace(/left|right|bottom|top/g, function(e) {
          return _t[e];
        });
      }
      var zt = { start: "end", end: "start" };
      function lt(t) {
        return t.replace(/start|end/g, function(e) {
          return zt[e];
        });
      }
      function We(t) {
        var e = H(t), n = e.pageXOffset, r = e.pageYOffset;
        return { scrollLeft: n, scrollTop: r };
      }
      function Be(t) {
        return ee(I(t)).left + We(t).scrollLeft;
      }
      function Ft(t) {
        var e = H(t), n = I(t), r = e.visualViewport, o = n.clientWidth, i = n.clientHeight, a = 0, s = 0;
        return r && (o = r.width, i = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, s = r.offsetTop)), { width: o, height: i, x: a + Be(t), y: s };
      }
      function Ut(t) {
        var e, n = I(t), r = We(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i = X(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = X(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -r.scrollLeft + Be(t), f = -r.scrollTop;
        return N(o || n).direction === "rtl" && (s += X(n.clientWidth, o ? o.clientWidth : 0) - i), { width: i, height: a, x: s, y: f };
      }
      function Se(t) {
        var e = N(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r);
      }
      function dt(t) {
        return ["html", "body", "#document"].indexOf(C(t)) >= 0 ? t.ownerDocument.body : B(t) && Se(t) ? t : dt(ge(t));
      }
      function ce(t, e) {
        var n;
        e === void 0 && (e = []);
        var r = dt(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), i = H(r), a = o ? [i].concat(i.visualViewport || [], Se(r) ? r : []) : r, s = e.concat(a);
        return o ? s : s.concat(ce(ge(a)));
      }
      function Te(t) {
        return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
      }
      function Xt(t) {
        var e = ee(t);
        return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
      }
      function ht(t, e) {
        return e === je ? Te(Ft(t)) : Q(e) ? Xt(e) : Te(Ut(I(t)));
      }
      function Yt(t) {
        var e = ce(ge(t)), n = ["absolute", "fixed"].indexOf(N(t).position) >= 0, r = n && B(t) ? se(t) : t;
        return Q(r) ? e.filter(function(o) {
          return Q(o) && it(o, r) && C(o) !== "body";
        }) : [];
      }
      function Gt(t, e, n) {
        var r = e === "clippingParents" ? Yt(t) : [].concat(e), o = [].concat(r, [n]), i = o[0], a = o.reduce(function(s, f) {
          var c = ht(t, f);
          return s.top = X(c.top, s.top), s.right = ve(c.right, s.right), s.bottom = ve(c.bottom, s.bottom), s.left = X(c.left, s.left), s;
        }, ht(t, i));
        return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
      }
      function mt(t) {
        var e = t.reference, n = t.element, r = t.placement, o = r ? q(r) : null, i = r ? te(r) : null, a = e.x + e.width / 2 - n.width / 2, s = e.y + e.height / 2 - n.height / 2, f;
        switch (o) {
          case E:
            f = { x: a, y: e.y - n.height };
            break;
          case R:
            f = { x: a, y: e.y + e.height };
            break;
          case W:
            f = { x: e.x + e.width, y: s };
            break;
          case P:
            f = { x: e.x - n.width, y: s };
            break;
          default:
            f = { x: e.x, y: e.y };
        }
        var c = o ? Le(o) : null;
        if (c != null) {
          var u = c === "y" ? "height" : "width";
          switch (i) {
            case U:
              f[c] = f[c] - (e[u] / 2 - n[u] / 2);
              break;
            case J:
              f[c] = f[c] + (e[u] / 2 - n[u] / 2);
              break;
          }
        }
        return f;
      }
      function ne(t, e) {
        e === void 0 && (e = {});
        var n = e, r = n.placement, o = r === void 0 ? t.placement : r, i = n.boundary, a = i === void 0 ? Xe : i, s = n.rootBoundary, f = s === void 0 ? je : s, c = n.elementContext, u = c === void 0 ? K : c, m = n.altBoundary, v = m === void 0 ? false : m, l = n.padding, h = l === void 0 ? 0 : l, p = ft(typeof h != "number" ? h : ct(h, G)), g = u === K ? Ye : K, x = t.rects.popper, y = t.elements[v ? g : u], $ = Gt(Q(y) ? y : y.contextElement || I(t.elements.popper), a, f), d = ee(t.elements.reference), b = mt({ reference: d, element: x, strategy: "absolute", placement: o }), w = Te(Object.assign({}, x, b)), O = u === K ? w : d, j = { top: $.top - O.top + p.top, bottom: O.bottom - $.bottom + p.bottom, left: $.left - O.left + p.left, right: O.right - $.right + p.right }, A = t.modifiersData.offset;
        if (u === K && A) {
          var k = A[o];
          Object.keys(j).forEach(function(D) {
            var S = [W, R].indexOf(D) >= 0 ? 1 : -1, L = [E, R].indexOf(D) >= 0 ? "y" : "x";
            j[D] += k[L] * S;
          });
        }
        return j;
      }
      function Jt(t, e) {
        e === void 0 && (e = {});
        var n = e, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, s = n.flipVariations, f = n.allowedAutoPlacements, c = f === void 0 ? Ee : f, u = te(r), m = u ? s ? De : De.filter(function(h) {
          return te(h) === u;
        }) : G, v = m.filter(function(h) {
          return c.indexOf(h) >= 0;
        });
        v.length === 0 && (v = m);
        var l = v.reduce(function(h, p) {
          return h[p] = ne(t, { placement: p, boundary: o, rootBoundary: i, padding: a })[q(p)], h;
        }, {});
        return Object.keys(l).sort(function(h, p) {
          return l[h] - l[p];
        });
      }
      function Kt(t) {
        if (q(t) === me)
          return [];
        var e = be(t);
        return [lt(t), e, lt(e)];
      }
      function Qt(t) {
        var e = t.state, n = t.options, r = t.name;
        if (!e.modifiersData[r]._skip) {
          for (var o = n.mainAxis, i = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? true : a, f = n.fallbackPlacements, c = n.padding, u = n.boundary, m = n.rootBoundary, v = n.altBoundary, l = n.flipVariations, h = l === void 0 ? true : l, p = n.allowedAutoPlacements, g = e.options.placement, x = q(g), y = x === g, $ = f || (y || !h ? [be(g)] : Kt(g)), d = [g].concat($).reduce(function(z, V) {
            return z.concat(q(V) === me ? Jt(e, { placement: V, boundary: u, rootBoundary: m, padding: c, flipVariations: h, allowedAutoPlacements: p }) : V);
          }, []), b = e.rects.reference, w = e.rects.popper, O = /* @__PURE__ */ new Map(), j = true, A = d[0], k = 0; k < d.length; k++) {
            var D = d[k], S = q(D), L = te(D) === U, re = [E, R].indexOf(S) >= 0, oe = re ? "width" : "height", M = ne(e, { placement: D, boundary: u, rootBoundary: m, altBoundary: v, padding: c }), T = re ? L ? W : P : L ? R : E;
            b[oe] > w[oe] && (T = be(T));
            var pe = be(T), _ = [];
            if (i && _.push(M[S] <= 0), s && _.push(M[T] <= 0, M[pe] <= 0), _.every(function(z) {
              return z;
            })) {
              A = D, j = false;
              break;
            }
            O.set(D, _);
          }
          if (j)
            for (var ue = h ? 3 : 1, xe = function(z) {
              var V = d.find(function(de) {
                var ae = O.get(de);
                if (ae)
                  return ae.slice(0, z).every(function(Y) {
                    return Y;
                  });
              });
              if (V)
                return A = V, "break";
            }, ie = ue; ie > 0; ie--) {
              var le = xe(ie);
              if (le === "break")
                break;
            }
          e.placement !== A && (e.modifiersData[r]._skip = true, e.placement = A, e.reset = true);
        }
      }
      var vt = { name: "flip", enabled: true, phase: "main", fn: Qt, requiresIfExists: ["offset"], data: { _skip: false } };
      function gt(t, e, n) {
        return n === void 0 && (n = { x: 0, y: 0 }), { top: t.top - e.height - n.y, right: t.right - e.width + n.x, bottom: t.bottom - e.height + n.y, left: t.left - e.width - n.x };
      }
      function yt(t) {
        return [E, W, R, P].some(function(e) {
          return t[e] >= 0;
        });
      }
      function Zt(t) {
        var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, i = e.modifiersData.preventOverflow, a = ne(e, { elementContext: "reference" }), s = ne(e, { altBoundary: true }), f = gt(a, r), c = gt(s, o, i), u = yt(f), m = yt(c);
        e.modifiersData[n] = { referenceClippingOffsets: f, popperEscapeOffsets: c, isReferenceHidden: u, hasPopperEscaped: m }, e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-reference-hidden": u, "data-popper-escaped": m });
      }
      var bt = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
      function en(t, e, n) {
        var r = q(t), o = [P, E].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, e, { placement: t })) : n, a = i[0], s = i[1];
        return a = a || 0, s = (s || 0) * o, [P, W].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s };
      }
      function tn(t) {
        var e = t.state, n = t.options, r = t.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Ee.reduce(function(u, m) {
          return u[m] = en(m, e.rects, i), u;
        }, {}), s = a[e.placement], f = s.x, c = s.y;
        e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += f, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = a;
      }
      var wt = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: tn };
      function nn(t) {
        var e = t.state, n = t.name;
        e.modifiersData[n] = mt({ reference: e.rects.reference, element: e.rects.popper, strategy: "absolute", placement: e.placement });
      }
      var He = { name: "popperOffsets", enabled: true, phase: "read", fn: nn, data: {} };
      function rn(t) {
        return t === "x" ? "y" : "x";
      }
      function on(t) {
        var e = t.state, n = t.options, r = t.name, o = n.mainAxis, i = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? false : a, f = n.boundary, c = n.rootBoundary, u = n.altBoundary, m = n.padding, v = n.tether, l = v === void 0 ? true : v, h = n.tetherOffset, p = h === void 0 ? 0 : h, g = ne(e, { boundary: f, rootBoundary: c, padding: m, altBoundary: u }), x = q(e.placement), y = te(e.placement), $ = !y, d = Le(x), b = rn(d), w = e.modifiersData.popperOffsets, O = e.rects.reference, j = e.rects.popper, A = typeof p == "function" ? p(Object.assign({}, e.rects, { placement: e.placement })) : p, k = typeof A == "number" ? { mainAxis: A, altAxis: A } : Object.assign({ mainAxis: 0, altAxis: 0 }, A), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, S = { x: 0, y: 0 };
        if (w) {
          if (i) {
            var L, re = d === "y" ? E : P, oe = d === "y" ? R : W, M = d === "y" ? "height" : "width", T = w[d], pe = T + g[re], _ = T - g[oe], ue = l ? -j[M] / 2 : 0, xe = y === U ? O[M] : j[M], ie = y === U ? -j[M] : -O[M], le = e.elements.arrow, z = l && le ? ke(le) : { width: 0, height: 0 }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : st(), de = V[re], ae = V[oe], Y = fe(0, O[M], z[M]), jt = $ ? O[M] / 2 - ue - Y - de - k.mainAxis : xe - Y - de - k.mainAxis, Dt = $ ? -O[M] / 2 + ue + Y + ae + k.mainAxis : ie + Y + ae + k.mainAxis, Oe = e.elements.arrow && se(e.elements.arrow), Et = Oe ? d === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0, Ce = (L = D == null ? void 0 : D[d]) != null ? L : 0, Pt = T + jt - Ce - Et, At = T + Dt - Ce, qe = fe(l ? ve(pe, Pt) : pe, T, l ? X(_, At) : _);
            w[d] = qe, S[d] = qe - T;
          }
          if (s) {
            var Ve, kt = d === "x" ? E : P, Lt = d === "x" ? R : W, F = w[b], he = b === "y" ? "height" : "width", Ne = F + g[kt], Ie = F - g[Lt], $e = [E, P].indexOf(x) !== -1, _e = (Ve = D == null ? void 0 : D[b]) != null ? Ve : 0, ze = $e ? Ne : F - O[he] - j[he] - _e + k.altAxis, Fe = $e ? F + O[he] + j[he] - _e - k.altAxis : Ie, Ue = l && $e ? St(ze, F, Fe) : fe(l ? ze : Ne, F, l ? Fe : Ie);
            w[b] = Ue, S[b] = Ue - F;
          }
          e.modifiersData[r] = S;
        }
      }
      var xt = { name: "preventOverflow", enabled: true, phase: "main", fn: on, requiresIfExists: ["offset"] };
      function an(t) {
        return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
      }
      function sn(t) {
        return t === H(t) || !B(t) ? We(t) : an(t);
      }
      function fn(t) {
        var e = t.getBoundingClientRect(), n = Z(e.width) / t.offsetWidth || 1, r = Z(e.height) / t.offsetHeight || 1;
        return n !== 1 || r !== 1;
      }
      function cn(t, e, n) {
        n === void 0 && (n = false);
        var r = B(e), o = B(e) && fn(e), i = I(e), a = ee(t, o), s = { scrollLeft: 0, scrollTop: 0 }, f = { x: 0, y: 0 };
        return (r || !r && !n) && ((C(e) !== "body" || Se(i)) && (s = sn(e)), B(e) ? (f = ee(e, true), f.x += e.clientLeft, f.y += e.clientTop) : i && (f.x = Be(i))), { x: a.left + s.scrollLeft - f.x, y: a.top + s.scrollTop - f.y, width: a.width, height: a.height };
      }
      function pn(t) {
        var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
        t.forEach(function(i) {
          e.set(i.name, i);
        });
        function o(i) {
          n.add(i.name);
          var a = [].concat(i.requires || [], i.requiresIfExists || []);
          a.forEach(function(s) {
            if (!n.has(s)) {
              var f = e.get(s);
              f && o(f);
            }
          }), r.push(i);
        }
        return t.forEach(function(i) {
          n.has(i.name) || o(i);
        }), r;
      }
      function un(t) {
        var e = pn(t);
        return ot.reduce(function(n, r) {
          return n.concat(e.filter(function(o) {
            return o.phase === r;
          }));
        }, []);
      }
      function ln(t) {
        var e;
        return function() {
          return e || (e = new Promise(function(n) {
            Promise.resolve().then(function() {
              e = void 0, n(t());
            });
          })), e;
        };
      }
      function dn(t) {
        var e = t.reduce(function(n, r) {
          var o = n[r.name];
          return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
        }, {});
        return Object.keys(e).map(function(n) {
          return e[n];
        });
      }
      var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function $t() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        return !e.some(function(r) {
          return !(r && typeof r.getBoundingClientRect == "function");
        });
      }
      function we(t) {
        t === void 0 && (t = {});
        var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, i = o === void 0 ? Ot : o;
        return function(a, s, f) {
          f === void 0 && (f = i);
          var c = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, i), modifiersData: {}, elements: { reference: a, popper: s }, attributes: {}, styles: {} }, u = [], m = false, v = { state: c, setOptions: function(p) {
            var g = typeof p == "function" ? p(c.options) : p;
            h(), c.options = Object.assign({}, i, c.options, g), c.scrollParents = { reference: Q(a) ? ce(a) : a.contextElement ? ce(a.contextElement) : [], popper: ce(s) };
            var x = un(dn([].concat(r, c.options.modifiers)));
            return c.orderedModifiers = x.filter(function(y) {
              return y.enabled;
            }), l(), v.update();
          }, forceUpdate: function() {
            if (!m) {
              var p = c.elements, g = p.reference, x = p.popper;
              if ($t(g, x)) {
                c.rects = { reference: cn(g, se(x), c.options.strategy === "fixed"), popper: ke(x) }, c.reset = false, c.placement = c.options.placement, c.orderedModifiers.forEach(function(j) {
                  return c.modifiersData[j.name] = Object.assign({}, j.data);
                });
                for (var y = 0; y < c.orderedModifiers.length; y++) {
                  if (c.reset === true) {
                    c.reset = false, y = -1;
                    continue;
                  }
                  var $ = c.orderedModifiers[y], d = $.fn, b = $.options, w = b === void 0 ? {} : b, O = $.name;
                  typeof d == "function" && (c = d({ state: c, options: w, name: O, instance: v }) || c);
                }
              }
            }
          }, update: ln(function() {
            return new Promise(function(p) {
              v.forceUpdate(), p(c);
            });
          }), destroy: function() {
            h(), m = true;
          } };
          if (!$t(a, s))
            return v;
          v.setOptions(f).then(function(p) {
            !m && f.onFirstUpdate && f.onFirstUpdate(p);
          });
          function l() {
            c.orderedModifiers.forEach(function(p) {
              var g = p.name, x = p.options, y = x === void 0 ? {} : x, $ = p.effect;
              if (typeof $ == "function") {
                var d = $({ state: c, name: g, instance: v, options: y }), b = function() {
                };
                u.push(d || b);
              }
            });
          }
          function h() {
            u.forEach(function(p) {
              return p();
            }), u = [];
          }
          return v;
        };
      }
      we();
      var mn = [Re, He, Me, Ae];
      we({ defaultModifiers: mn });
      var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt], yn = we({ defaultModifiers: gn });
      const usePopper = (referenceElementRef, popperElementRef, opts = {}) => {
        const stateUpdater = {
          name: "updateState",
          enabled: true,
          phase: "write",
          fn: ({ state }) => {
            const derivedState = deriveState(state);
            Object.assign(states.value, derivedState);
          },
          requires: ["computeStyles"]
        };
        const options = vue.computed(() => {
          const { onFirstUpdate, placement, strategy, modifiers } = vue.unref(opts);
          return {
            onFirstUpdate,
            placement: placement || "bottom",
            strategy: strategy || "absolute",
            modifiers: [
              ...modifiers || [],
              stateUpdater,
              { name: "applyStyles", enabled: false }
            ]
          };
        });
        const instanceRef = vue.shallowRef();
        const states = vue.ref({
          styles: {
            popper: {
              position: vue.unref(options).strategy,
              left: "0",
              top: "0"
            },
            arrow: {
              position: "absolute"
            }
          },
          attributes: {}
        });
        const destroy = () => {
          if (!instanceRef.value)
            return;
          instanceRef.value.destroy();
          instanceRef.value = void 0;
        };
        vue.watch(options, (newOptions) => {
          const instance = vue.unref(instanceRef);
          if (instance) {
            instance.setOptions(newOptions);
          }
        }, {
          deep: true
        });
        vue.watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
          destroy();
          if (!referenceElement || !popperElement)
            return;
          instanceRef.value = yn(referenceElement, popperElement, vue.unref(options));
        });
        vue.onBeforeUnmount(() => {
          destroy();
        });
        return {
          state: vue.computed(() => {
            var _a2;
            return { ...((_a2 = vue.unref(instanceRef)) == null ? void 0 : _a2.state) || {} };
          }),
          styles: vue.computed(() => vue.unref(states).styles),
          attributes: vue.computed(() => vue.unref(states).attributes),
          update: () => {
            var _a2;
            return (_a2 = vue.unref(instanceRef)) == null ? void 0 : _a2.update();
          },
          forceUpdate: () => {
            var _a2;
            return (_a2 = vue.unref(instanceRef)) == null ? void 0 : _a2.forceUpdate();
          },
          instanceRef: vue.computed(() => vue.unref(instanceRef))
        };
      };
      function deriveState(state) {
        const elements = Object.keys(state.elements);
        const styles = fromPairs(elements.map((element) => [element, state.styles[element] || {}]));
        const attributes = fromPairs(elements.map((element) => [element, state.attributes[element]]));
        return {
          styles,
          attributes
        };
      }
      function useTimeout() {
        let timeoutHandle;
        const registerTimeout = (fn2, delay) => {
          cancelTimeout();
          timeoutHandle = window.setTimeout(fn2, delay);
        };
        const cancelTimeout = () => window.clearTimeout(timeoutHandle);
        tryOnScopeDispose$1(() => cancelTimeout());
        return {
          registerTimeout,
          cancelTimeout
        };
      }
      const defaultIdInjection = {
        prefix: Math.floor(Math.random() * 1e4),
        current: 0
      };
      const ID_INJECTION_KEY = Symbol("elIdInjection");
      const useIdInjection = () => {
        return vue.getCurrentInstance() ? vue.inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
      };
      const useId = (deterministicId) => {
        const idInjection = useIdInjection();
        const namespace = useGetDerivedNamespace();
        const idRef = vue.computed(() => vue.unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
        return idRef;
      };
      let registeredEscapeHandlers = [];
      const cachedHandler = (e) => {
        const event = e;
        if (event.key === EVENT_CODE.esc) {
          registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
        }
      };
      const useEscapeKeydown = (handler) => {
        vue.onMounted(() => {
          if (registeredEscapeHandlers.length === 0) {
            document.addEventListener("keydown", cachedHandler);
          }
          if (isClient$1)
            registeredEscapeHandlers.push(handler);
        });
        vue.onBeforeUnmount(() => {
          registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
          if (registeredEscapeHandlers.length === 0) {
            if (isClient$1)
              document.removeEventListener("keydown", cachedHandler);
          }
        });
      };
      let cachedContainer;
      const usePopperContainerId = () => {
        const namespace = useGetDerivedNamespace();
        const idInjection = useIdInjection();
        const id = vue.computed(() => {
          return `${namespace.value}-popper-container-${idInjection.prefix}`;
        });
        const selector = vue.computed(() => `#${id.value}`);
        return {
          id,
          selector
        };
      };
      const createContainer = (id) => {
        const container = document.createElement("div");
        container.id = id;
        document.body.appendChild(container);
        return container;
      };
      const usePopperContainer = () => {
        const { id, selector } = usePopperContainerId();
        vue.onBeforeMount(() => {
          if (!isClient$1)
            return;
          if (!cachedContainer && !document.body.querySelector(selector.value)) {
            cachedContainer = createContainer(id.value);
          }
        });
        return {
          id,
          selector
        };
      };
      const useDelayedToggleProps = buildProps({
        showAfter: {
          type: Number,
          default: 0
        },
        hideAfter: {
          type: Number,
          default: 200
        },
        autoClose: {
          type: Number,
          default: 0
        }
      });
      const useDelayedToggle = ({
        showAfter,
        hideAfter,
        autoClose,
        open,
        close
      }) => {
        const { registerTimeout } = useTimeout();
        const {
          registerTimeout: registerTimeoutForAutoClose,
          cancelTimeout: cancelTimeoutForAutoClose
        } = useTimeout();
        const onOpen = (event) => {
          registerTimeout(() => {
            open(event);
            const _autoClose = vue.unref(autoClose);
            if (isNumber(_autoClose) && _autoClose > 0) {
              registerTimeoutForAutoClose(() => {
                close(event);
              }, _autoClose);
            }
          }, vue.unref(showAfter));
        };
        const onClose = (event) => {
          cancelTimeoutForAutoClose();
          registerTimeout(() => {
            close(event);
          }, vue.unref(hideAfter));
        };
        return {
          onOpen,
          onClose
        };
      };
      const FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef");
      const useForwardRef = (forwardRef) => {
        const setForwardRef = (el) => {
          forwardRef.value = el;
        };
        vue.provide(FORWARD_REF_INJECTION_KEY, {
          setForwardRef
        });
      };
      const useForwardRefDirective = (setForwardRef) => {
        return {
          mounted(el) {
            setForwardRef(el);
          },
          updated(el) {
            setForwardRef(el);
          },
          unmounted() {
            setForwardRef(null);
          }
        };
      };
      const zIndex = vue.ref(0);
      const defaultInitialZIndex = 2e3;
      const zIndexContextKey = Symbol("zIndexContextKey");
      const useZIndex = (zIndexOverrides) => {
        const zIndexInjection = zIndexOverrides || (vue.getCurrentInstance() ? vue.inject(zIndexContextKey, void 0) : void 0);
        const initialZIndex = vue.computed(() => {
          const zIndexFromInjection = vue.unref(zIndexInjection);
          return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
        });
        const currentZIndex = vue.computed(() => initialZIndex.value + zIndex.value);
        const nextZIndex = () => {
          zIndex.value++;
          return currentZIndex.value;
        };
        return {
          initialZIndex,
          currentZIndex,
          nextZIndex
        };
      };
      function useCursor(input) {
        const selectionRef = vue.ref();
        function recordCursor() {
          if (input.value == void 0)
            return;
          const { selectionStart, selectionEnd, value } = input.value;
          if (selectionStart == null || selectionEnd == null)
            return;
          const beforeTxt = value.slice(0, Math.max(0, selectionStart));
          const afterTxt = value.slice(Math.max(0, selectionEnd));
          selectionRef.value = {
            selectionStart,
            selectionEnd,
            value,
            beforeTxt,
            afterTxt
          };
        }
        function setCursor() {
          if (input.value == void 0 || selectionRef.value == void 0)
            return;
          const { value } = input.value;
          const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;
          if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
            return;
          let startPos = value.length;
          if (value.endsWith(afterTxt)) {
            startPos = value.length - afterTxt.length;
          } else if (value.startsWith(beforeTxt)) {
            startPos = beforeTxt.length;
          } else {
            const beforeLastChar = beforeTxt[selectionStart - 1];
            const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
            if (newIndex !== -1) {
              startPos = newIndex + 1;
            }
          }
          input.value.setSelectionRange(startPos, startPos);
        }
        return [recordCursor, setCursor];
      }
      const useSizeProp = buildProp({
        type: String,
        values: componentSizes,
        required: false
      });
      const SIZE_INJECTION_KEY = Symbol("size");
      const useGlobalSize = () => {
        const injectedSize = vue.inject(SIZE_INJECTION_KEY, {});
        return vue.computed(() => {
          return vue.unref(injectedSize.size) || "";
        });
      };
      function useFocusController(target, { afterFocus, afterBlur } = {}) {
        const instance = vue.getCurrentInstance();
        const { emit } = instance;
        const wrapperRef = vue.shallowRef();
        const isFocused = vue.ref(false);
        const handleFocus = (event) => {
          if (isFocused.value)
            return;
          isFocused.value = true;
          emit("focus", event);
          afterFocus == null ? void 0 : afterFocus();
        };
        const handleBlur = (event) => {
          var _a2;
          if (event.relatedTarget && ((_a2 = wrapperRef.value) == null ? void 0 : _a2.contains(event.relatedTarget)))
            return;
          isFocused.value = false;
          emit("blur", event);
          afterBlur == null ? void 0 : afterBlur();
        };
        const handleClick = () => {
          var _a2;
          (_a2 = target.value) == null ? void 0 : _a2.focus();
        };
        vue.watch(wrapperRef, (el) => {
          if (el) {
            el.setAttribute("tabindex", "-1");
          }
        });
        useEventListener(wrapperRef, "click", handleClick);
        return {
          wrapperRef,
          isFocused,
          handleFocus,
          handleBlur
        };
      }
      const configProviderContextKey = Symbol();
      const globalConfig = vue.ref();
      function useGlobalConfig(key, defaultValue = void 0) {
        const config = vue.getCurrentInstance() ? vue.inject(configProviderContextKey, globalConfig) : globalConfig;
        if (key) {
          return vue.computed(() => {
            var _a2, _b;
            return (_b = (_a2 = config.value) == null ? void 0 : _a2[key]) != null ? _b : defaultValue;
          });
        } else {
          return config;
        }
      }
      function useGlobalComponentSettings(block, sizeFallback) {
        const config = useGlobalConfig();
        const ns = useNamespace(block, vue.computed(() => {
          var _a2;
          return ((_a2 = config.value) == null ? void 0 : _a2.namespace) || defaultNamespace;
        }));
        const locale = useLocale(vue.computed(() => {
          var _a2;
          return (_a2 = config.value) == null ? void 0 : _a2.locale;
        }));
        const zIndex2 = useZIndex(vue.computed(() => {
          var _a2;
          return ((_a2 = config.value) == null ? void 0 : _a2.zIndex) || defaultInitialZIndex;
        }));
        const size = vue.computed(() => {
          var _a2;
          return vue.unref(sizeFallback) || ((_a2 = config.value) == null ? void 0 : _a2.size) || "";
        });
        provideGlobalConfig(vue.computed(() => vue.unref(config) || {}));
        return {
          ns,
          locale,
          zIndex: zIndex2,
          size
        };
      }
      const provideGlobalConfig = (config, app2, global2 = false) => {
        var _a2;
        const inSetup = !!vue.getCurrentInstance();
        const oldConfig = inSetup ? useGlobalConfig() : void 0;
        const provideFn = (_a2 = app2 == null ? void 0 : app2.provide) != null ? _a2 : inSetup ? vue.provide : void 0;
        if (!provideFn) {
          return;
        }
        const context = vue.computed(() => {
          const cfg = vue.unref(config);
          if (!(oldConfig == null ? void 0 : oldConfig.value))
            return cfg;
          return mergeConfig(oldConfig.value, cfg);
        });
        provideFn(configProviderContextKey, context);
        provideFn(localeContextKey, vue.computed(() => context.value.locale));
        provideFn(namespaceContextKey, vue.computed(() => context.value.namespace));
        provideFn(zIndexContextKey, vue.computed(() => context.value.zIndex));
        provideFn(SIZE_INJECTION_KEY, {
          size: vue.computed(() => context.value.size || "")
        });
        if (global2 || !globalConfig.value) {
          globalConfig.value = context.value;
        }
        return context;
      };
      const mergeConfig = (a, b) => {
        var _a2;
        const keys2 = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
        const obj = {};
        for (const key of keys2) {
          obj[key] = (_a2 = b[key]) != null ? _a2 : a[key];
        }
        return obj;
      };
      const configProviderProps = buildProps({
        a11y: {
          type: Boolean,
          default: true
        },
        locale: {
          type: definePropType(Object)
        },
        size: useSizeProp,
        button: {
          type: definePropType(Object)
        },
        experimentalFeatures: {
          type: definePropType(Object)
        },
        keyboardNavigation: {
          type: Boolean,
          default: true
        },
        message: {
          type: definePropType(Object)
        },
        zIndex: Number,
        namespace: {
          type: String,
          default: "el"
        }
      });
      const messageConfig = {};
      const ConfigProvider = vue.defineComponent({
        name: "ElConfigProvider",
        props: configProviderProps,
        setup(props, { slots }) {
          vue.watch(() => props.message, (val) => {
            Object.assign(messageConfig, val != null ? val : {});
          }, { immediate: true, deep: true });
          const config = provideGlobalConfig(props);
          return () => vue.renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
        }
      });
      const ElConfigProvider = withInstall(ConfigProvider);
      var _export_sfc = (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props) {
          target[key] = val;
        }
        return target;
      };
      const iconProps = buildProps({
        size: {
          type: definePropType([Number, String])
        },
        color: {
          type: String
        }
      });
      const __default__$j = vue.defineComponent({
        name: "ElIcon",
        inheritAttrs: false
      });
      const _sfc_main$C = /* @__PURE__ */ vue.defineComponent({
        ...__default__$j,
        props: iconProps,
        setup(__props) {
          const props = __props;
          const ns = useNamespace("icon");
          const style = vue.computed(() => {
            const { size, color } = props;
            if (!size && !color)
              return {};
            return {
              fontSize: isUndefined(size) ? void 0 : addUnit(size),
              "--color": color
            };
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
              class: vue.unref(ns).b(),
              style: vue.unref(style)
            }, _ctx.$attrs), [
              vue.renderSlot(_ctx.$slots, "default")
            ], 16);
          };
        }
      });
      var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
      const ElIcon = withInstall(Icon);
      const formContextKey = Symbol("formContextKey");
      const formItemContextKey = Symbol("formItemContextKey");
      const useFormSize = (fallback, ignore = {}) => {
        const emptyRef = vue.ref(void 0);
        const size = ignore.prop ? emptyRef : useProp("size");
        const globalConfig2 = ignore.global ? emptyRef : useGlobalSize();
        const form = ignore.form ? { size: void 0 } : vue.inject(formContextKey, void 0);
        const formItem = ignore.formItem ? { size: void 0 } : vue.inject(formItemContextKey, void 0);
        return vue.computed(() => size.value || vue.unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || "");
      };
      const useFormDisabled = (fallback) => {
        const disabled = useProp("disabled");
        const form = vue.inject(formContextKey, void 0);
        return vue.computed(() => disabled.value || vue.unref(fallback) || (form == null ? void 0 : form.disabled) || false);
      };
      const useFormItem = () => {
        const form = vue.inject(formContextKey, void 0);
        const formItem = vue.inject(formItemContextKey, void 0);
        return {
          form,
          formItem
        };
      };
      const useFormItemInputId = (props, {
        formItemContext,
        disableIdGeneration,
        disableIdManagement
      }) => {
        if (!disableIdGeneration) {
          disableIdGeneration = vue.ref(false);
        }
        if (!disableIdManagement) {
          disableIdManagement = vue.ref(false);
        }
        const inputId = vue.ref();
        let idUnwatch = void 0;
        const isLabeledByFormItem = vue.computed(() => {
          var _a2;
          return !!(!props.label && formItemContext && formItemContext.inputIds && ((_a2 = formItemContext.inputIds) == null ? void 0 : _a2.length) <= 1);
        });
        vue.onMounted(() => {
          idUnwatch = vue.watch([vue.toRef(props, "id"), disableIdGeneration], ([id, disableIdGeneration2]) => {
            const newId = id != null ? id : !disableIdGeneration2 ? useId().value : void 0;
            if (newId !== inputId.value) {
              if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
                inputId.value && formItemContext.removeInputId(inputId.value);
                if (!(disableIdManagement == null ? void 0 : disableIdManagement.value) && !disableIdGeneration2 && newId) {
                  formItemContext.addInputId(newId);
                }
              }
              inputId.value = newId;
            }
          }, { immediate: true });
        });
        vue.onUnmounted(() => {
          idUnwatch && idUnwatch();
          if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
            inputId.value && formItemContext.removeInputId(inputId.value);
          }
        });
        return {
          isLabeledByFormItem,
          inputId
        };
      };
      let hiddenTextarea = void 0;
      const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  ${isFirefox() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
      const CONTEXT_STYLE = [
        "letter-spacing",
        "line-height",
        "padding-top",
        "padding-bottom",
        "font-family",
        "font-weight",
        "font-size",
        "text-rendering",
        "text-transform",
        "width",
        "text-indent",
        "padding-left",
        "padding-right",
        "border-width",
        "box-sizing"
      ];
      function calculateNodeStyling(targetElement) {
        const style = window.getComputedStyle(targetElement);
        const boxSizing = style.getPropertyValue("box-sizing");
        const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
        const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
        const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
        return { contextStyle, paddingSize, borderSize, boxSizing };
      }
      function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
        var _a2;
        if (!hiddenTextarea) {
          hiddenTextarea = document.createElement("textarea");
          document.body.appendChild(hiddenTextarea);
        }
        const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
        hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
        hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
        let height = hiddenTextarea.scrollHeight;
        const result = {};
        if (boxSizing === "border-box") {
          height = height + borderSize;
        } else if (boxSizing === "content-box") {
          height = height - paddingSize;
        }
        hiddenTextarea.value = "";
        const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
        if (isNumber(minRows)) {
          let minHeight = singleRowHeight * minRows;
          if (boxSizing === "border-box") {
            minHeight = minHeight + paddingSize + borderSize;
          }
          height = Math.max(minHeight, height);
          result.minHeight = `${minHeight}px`;
        }
        if (isNumber(maxRows)) {
          let maxHeight = singleRowHeight * maxRows;
          if (boxSizing === "border-box") {
            maxHeight = maxHeight + paddingSize + borderSize;
          }
          height = Math.min(maxHeight, height);
        }
        result.height = `${height}px`;
        (_a2 = hiddenTextarea.parentNode) == null ? void 0 : _a2.removeChild(hiddenTextarea);
        hiddenTextarea = void 0;
        return result;
      }
      const inputProps = buildProps({
        id: {
          type: String,
          default: void 0
        },
        size: useSizeProp,
        disabled: Boolean,
        modelValue: {
          type: definePropType([
            String,
            Number,
            Object
          ]),
          default: ""
        },
        type: {
          type: String,
          default: "text"
        },
        resize: {
          type: String,
          values: ["none", "both", "horizontal", "vertical"]
        },
        autosize: {
          type: definePropType([Boolean, Object]),
          default: false
        },
        autocomplete: {
          type: String,
          default: "off"
        },
        formatter: {
          type: Function
        },
        parser: {
          type: Function
        },
        placeholder: {
          type: String
        },
        form: {
          type: String
        },
        readonly: {
          type: Boolean,
          default: false
        },
        clearable: {
          type: Boolean,
          default: false
        },
        showPassword: {
          type: Boolean,
          default: false
        },
        showWordLimit: {
          type: Boolean,
          default: false
        },
        suffixIcon: {
          type: iconPropType
        },
        prefixIcon: {
          type: iconPropType
        },
        containerRole: {
          type: String,
          default: void 0
        },
        label: {
          type: String,
          default: void 0
        },
        tabindex: {
          type: [String, Number],
          default: 0
        },
        validateEvent: {
          type: Boolean,
          default: true
        },
        inputStyle: {
          type: definePropType([Object, Array, String]),
          default: () => mutable({})
        }
      });
      const inputEmits = {
        [UPDATE_MODEL_EVENT]: (value) => isString(value),
        input: (value) => isString(value),
        change: (value) => isString(value),
        focus: (evt) => evt instanceof FocusEvent,
        blur: (evt) => evt instanceof FocusEvent,
        clear: () => true,
        mouseleave: (evt) => evt instanceof MouseEvent,
        mouseenter: (evt) => evt instanceof MouseEvent,
        keydown: (evt) => evt instanceof Event,
        compositionstart: (evt) => evt instanceof CompositionEvent,
        compositionupdate: (evt) => evt instanceof CompositionEvent,
        compositionend: (evt) => evt instanceof CompositionEvent
      };
      const _hoisted_1$n = ["role"];
      const _hoisted_2$j = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form"];
      const _hoisted_3$c = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form"];
      const __default__$i = vue.defineComponent({
        name: "ElInput",
        inheritAttrs: false
      });
      const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
        ...__default__$i,
        props: inputProps,
        emits: inputEmits,
        setup(__props, { expose, emit }) {
          const props = __props;
          const rawAttrs = vue.useAttrs();
          const slots = vue.useSlots();
          const containerAttrs = vue.computed(() => {
            const comboBoxAttrs = {};
            if (props.containerRole === "combobox") {
              comboBoxAttrs["aria-haspopup"] = rawAttrs["aria-haspopup"];
              comboBoxAttrs["aria-owns"] = rawAttrs["aria-owns"];
              comboBoxAttrs["aria-expanded"] = rawAttrs["aria-expanded"];
            }
            return comboBoxAttrs;
          });
          const containerKls = vue.computed(() => [
            props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
            nsInput.m(inputSize.value),
            nsInput.is("disabled", inputDisabled.value),
            nsInput.is("exceed", inputExceed.value),
            {
              [nsInput.b("group")]: slots.prepend || slots.append,
              [nsInput.bm("group", "append")]: slots.append,
              [nsInput.bm("group", "prepend")]: slots.prepend,
              [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
              [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
              [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value
            },
            rawAttrs.class
          ]);
          const wrapperKls = vue.computed(() => [
            nsInput.e("wrapper"),
            nsInput.is("focus", isFocused.value)
          ]);
          const attrs = useAttrs({
            excludeKeys: vue.computed(() => {
              return Object.keys(containerAttrs.value);
            })
          });
          const { form, formItem } = useFormItem();
          const { inputId } = useFormItemInputId(props, {
            formItemContext: formItem
          });
          const inputSize = useFormSize();
          const inputDisabled = useFormDisabled();
          const nsInput = useNamespace("input");
          const nsTextarea = useNamespace("textarea");
          const input = vue.shallowRef();
          const textarea = vue.shallowRef();
          const hovering = vue.ref(false);
          const isComposing = vue.ref(false);
          const passwordVisible = vue.ref(false);
          const countStyle = vue.ref();
          const textareaCalcStyle = vue.shallowRef(props.inputStyle);
          const _ref = vue.computed(() => input.value || textarea.value);
          const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
            afterBlur() {
              var _a2;
              if (props.validateEvent) {
                (_a2 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a2.call(formItem, "blur").catch((err) => debugWarn());
              }
            }
          });
          const needStatusIcon = vue.computed(() => {
            var _a2;
            return (_a2 = form == null ? void 0 : form.statusIcon) != null ? _a2 : false;
          });
          const validateState = vue.computed(() => (formItem == null ? void 0 : formItem.validateState) || "");
          const validateIcon = vue.computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
          const passwordIcon = vue.computed(() => passwordVisible.value ? view_default : hide_default);
          const containerStyle = vue.computed(() => [
            rawAttrs.style,
            props.inputStyle
          ]);
          const textareaStyle = vue.computed(() => [
            props.inputStyle,
            textareaCalcStyle.value,
            { resize: props.resize }
          ]);
          const nativeInputValue = vue.computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
          const showClear = vue.computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
          const showPwdVisible = vue.computed(() => props.showPassword && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (!!nativeInputValue.value || isFocused.value));
          const isWordLimitVisible = vue.computed(() => props.showWordLimit && !!attrs.value.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
          const textLength = vue.computed(() => nativeInputValue.value.length);
          const inputExceed = vue.computed(() => !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength));
          const suffixVisible = vue.computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
          const [recordCursor, setCursor] = useCursor(input);
          useResizeObserver(textarea, (entries) => {
            onceInitSizeTextarea();
            if (!isWordLimitVisible.value || props.resize !== "both")
              return;
            const entry = entries[0];
            const { width } = entry.contentRect;
            countStyle.value = {
              right: `calc(100% - ${width + 15 + 6}px)`
            };
          });
          const resizeTextarea = () => {
            const { type, autosize } = props;
            if (!isClient$1 || type !== "textarea" || !textarea.value)
              return;
            if (autosize) {
              const minRows = isObject$1(autosize) ? autosize.minRows : void 0;
              const maxRows = isObject$1(autosize) ? autosize.maxRows : void 0;
              const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
              textareaCalcStyle.value = {
                overflowY: "hidden",
                ...textareaStyle2
              };
              vue.nextTick(() => {
                textarea.value.offsetHeight;
                textareaCalcStyle.value = textareaStyle2;
              });
            } else {
              textareaCalcStyle.value = {
                minHeight: calcTextareaHeight(textarea.value).minHeight
              };
            }
          };
          const createOnceInitResize = (resizeTextarea2) => {
            let isInit = false;
            return () => {
              var _a2;
              if (isInit || !props.autosize)
                return;
              const isElHidden = ((_a2 = textarea.value) == null ? void 0 : _a2.offsetParent) === null;
              if (!isElHidden) {
                resizeTextarea2();
                isInit = true;
              }
            };
          };
          const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
          const setNativeInputValue = () => {
            const input2 = _ref.value;
            const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
            if (!input2 || input2.value === formatterValue)
              return;
            input2.value = formatterValue;
          };
          const handleInput = async (event) => {
            recordCursor();
            let { value } = event.target;
            if (props.formatter) {
              value = props.parser ? props.parser(value) : value;
            }
            if (isComposing.value)
              return;
            if (value === nativeInputValue.value) {
              setNativeInputValue();
              return;
            }
            emit(UPDATE_MODEL_EVENT, value);
            emit("input", value);
            await vue.nextTick();
            setNativeInputValue();
            setCursor();
          };
          const handleChange = (event) => {
            emit("change", event.target.value);
          };
          const handleCompositionStart = (event) => {
            emit("compositionstart", event);
            isComposing.value = true;
          };
          const handleCompositionUpdate = (event) => {
            var _a2;
            emit("compositionupdate", event);
            const text = (_a2 = event.target) == null ? void 0 : _a2.value;
            const lastCharacter = text[text.length - 1] || "";
            isComposing.value = !isKorean(lastCharacter);
          };
          const handleCompositionEnd = (event) => {
            emit("compositionend", event);
            if (isComposing.value) {
              isComposing.value = false;
              handleInput(event);
            }
          };
          const handlePasswordVisible = () => {
            passwordVisible.value = !passwordVisible.value;
            focus();
          };
          const focus = async () => {
            var _a2;
            await vue.nextTick();
            (_a2 = _ref.value) == null ? void 0 : _a2.focus();
          };
          const blur = () => {
            var _a2;
            return (_a2 = _ref.value) == null ? void 0 : _a2.blur();
          };
          const handleMouseLeave = (evt) => {
            hovering.value = false;
            emit("mouseleave", evt);
          };
          const handleMouseEnter = (evt) => {
            hovering.value = true;
            emit("mouseenter", evt);
          };
          const handleKeydown = (evt) => {
            emit("keydown", evt);
          };
          const select = () => {
            var _a2;
            (_a2 = _ref.value) == null ? void 0 : _a2.select();
          };
          const clear = () => {
            emit(UPDATE_MODEL_EVENT, "");
            emit("change", "");
            emit("clear");
            emit("input", "");
          };
          vue.watch(() => props.modelValue, () => {
            var _a2;
            vue.nextTick(() => resizeTextarea());
            if (props.validateEvent) {
              (_a2 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a2.call(formItem, "change").catch((err) => debugWarn());
            }
          });
          vue.watch(nativeInputValue, () => setNativeInputValue());
          vue.watch(() => props.type, async () => {
            await vue.nextTick();
            setNativeInputValue();
            resizeTextarea();
          });
          vue.onMounted(() => {
            if (!props.formatter && props.parser)
              ;
            setNativeInputValue();
            vue.nextTick(resizeTextarea);
          });
          expose({
            input,
            textarea,
            ref: _ref,
            textareaStyle,
            autosize: vue.toRef(props, "autosize"),
            focus,
            blur,
            select,
            clear,
            resizeTextarea
          });
          return (_ctx, _cache) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps(vue.unref(containerAttrs), {
              class: vue.unref(containerKls),
              style: vue.unref(containerStyle),
              role: _ctx.containerRole,
              onMouseenter: handleMouseEnter,
              onMouseleave: handleMouseLeave
            }), [
              vue.createCommentVNode(" input "),
              _ctx.type !== "textarea" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                vue.createCommentVNode(" prepend slot "),
                _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(nsInput).be("group", "prepend"))
                }, [
                  vue.renderSlot(_ctx.$slots, "prepend")
                ], 2)) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", {
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  class: vue.normalizeClass(vue.unref(wrapperKls))
                }, [
                  vue.createCommentVNode(" prefix slot "),
                  _ctx.$slots.prefix || _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("span", {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(nsInput).e("prefix"))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(nsInput).e("prefix-inner"))
                    }, [
                      vue.renderSlot(_ctx.$slots, "prefix"),
                      _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                        key: 0,
                        class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prefixIcon)))
                        ]),
                        _: 1
                      }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                    ], 2)
                  ], 2)) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("input", vue.mergeProps({
                    id: vue.unref(inputId),
                    ref_key: "input",
                    ref: input,
                    class: vue.unref(nsInput).e("inner")
                  }, vue.unref(attrs), {
                    type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
                    disabled: vue.unref(inputDisabled),
                    formatter: _ctx.formatter,
                    parser: _ctx.parser,
                    readonly: _ctx.readonly,
                    autocomplete: _ctx.autocomplete,
                    tabindex: _ctx.tabindex,
                    "aria-label": _ctx.label,
                    placeholder: _ctx.placeholder,
                    style: _ctx.inputStyle,
                    form: props.form,
                    onCompositionstart: handleCompositionStart,
                    onCompositionupdate: handleCompositionUpdate,
                    onCompositionend: handleCompositionEnd,
                    onInput: handleInput,
                    onFocus: _cache[0] || (_cache[0] = (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
                    onBlur: _cache[1] || (_cache[1] = (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args)),
                    onChange: handleChange,
                    onKeydown: handleKeydown
                  }), null, 16, _hoisted_2$j),
                  vue.createCommentVNode(" suffix slot "),
                  vue.unref(suffixVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                    key: 1,
                    class: vue.normalizeClass(vue.unref(nsInput).e("suffix"))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(nsInput).e("suffix-inner"))
                    }, [
                      !vue.unref(showClear) || !vue.unref(showPwdVisible) || !vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        vue.renderSlot(_ctx.$slots, "suffix"),
                        _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                          key: 0,
                          class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                        }, {
                          default: vue.withCtx(() => [
                            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.suffixIcon)))
                          ]),
                          _: 1
                        }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                      ], 64)) : vue.createCommentVNode("v-if", true),
                      vue.unref(showClear) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                        key: 1,
                        class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("clear")]),
                        onMousedown: vue.withModifiers(vue.unref(NOOP), ["prevent"]),
                        onClick: clear
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(circle_close_default))
                        ]),
                        _: 1
                      }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(showPwdVisible) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                        key: 2,
                        class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("password")]),
                        onClick: handlePasswordVisible
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(passwordIcon))))
                        ]),
                        _: 1
                      }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                        key: 3,
                        class: vue.normalizeClass(vue.unref(nsInput).e("count"))
                      }, [
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(vue.unref(nsInput).e("count-inner"))
                        }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(vue.unref(attrs).maxlength), 3)
                      ], 2)) : vue.createCommentVNode("v-if", true),
                      vue.unref(validateState) && vue.unref(validateIcon) && vue.unref(needStatusIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                        key: 4,
                        class: vue.normalizeClass([
                          vue.unref(nsInput).e("icon"),
                          vue.unref(nsInput).e("validateIcon"),
                          vue.unref(nsInput).is("loading", vue.unref(validateState) === "validating")
                        ])
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(validateIcon))))
                        ]),
                        _: 1
                      }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                    ], 2)
                  ], 2)) : vue.createCommentVNode("v-if", true)
                ], 2),
                vue.createCommentVNode(" append slot "),
                _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: vue.normalizeClass(vue.unref(nsInput).be("group", "append"))
                }, [
                  vue.renderSlot(_ctx.$slots, "append")
                ], 2)) : vue.createCommentVNode("v-if", true)
              ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.createCommentVNode(" textarea "),
                vue.createElementVNode("textarea", vue.mergeProps({
                  id: vue.unref(inputId),
                  ref_key: "textarea",
                  ref: textarea,
                  class: vue.unref(nsTextarea).e("inner")
                }, vue.unref(attrs), {
                  tabindex: _ctx.tabindex,
                  disabled: vue.unref(inputDisabled),
                  readonly: _ctx.readonly,
                  autocomplete: _ctx.autocomplete,
                  style: vue.unref(textareaStyle),
                  "aria-label": _ctx.label,
                  placeholder: _ctx.placeholder,
                  form: props.form,
                  onCompositionstart: handleCompositionStart,
                  onCompositionupdate: handleCompositionUpdate,
                  onCompositionend: handleCompositionEnd,
                  onInput: handleInput,
                  onFocus: _cache[2] || (_cache[2] = (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
                  onBlur: _cache[3] || (_cache[3] = (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args)),
                  onChange: handleChange,
                  onKeydown: handleKeydown
                }), null, 16, _hoisted_3$c),
                vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  style: vue.normalizeStyle(countStyle.value),
                  class: vue.normalizeClass(vue.unref(nsInput).e("count"))
                }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(vue.unref(attrs).maxlength), 7)) : vue.createCommentVNode("v-if", true)
              ], 64))
            ], 16, _hoisted_1$n)), [
              [vue.vShow, _ctx.type !== "hidden"]
            ]);
          };
        }
      });
      var Input = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
      const ElInput = withInstall(Input);
      const GAP = 4;
      const BAR_MAP = {
        vertical: {
          offset: "offsetHeight",
          scroll: "scrollTop",
          scrollSize: "scrollHeight",
          size: "height",
          key: "vertical",
          axis: "Y",
          client: "clientY",
          direction: "top"
        },
        horizontal: {
          offset: "offsetWidth",
          scroll: "scrollLeft",
          scrollSize: "scrollWidth",
          size: "width",
          key: "horizontal",
          axis: "X",
          client: "clientX",
          direction: "left"
        }
      };
      const renderThumbStyle = ({
        move,
        size,
        bar
      }) => ({
        [bar.size]: size,
        transform: `translate${bar.axis}(${move}%)`
      });
      const scrollbarContextKey = Symbol("scrollbarContextKey");
      const thumbProps = buildProps({
        vertical: Boolean,
        size: String,
        move: Number,
        ratio: {
          type: Number,
          required: true
        },
        always: Boolean
      });
      const COMPONENT_NAME$1 = "Thumb";
      const _sfc_main$A = /* @__PURE__ */ vue.defineComponent({
        __name: "thumb",
        props: thumbProps,
        setup(__props) {
          const props = __props;
          const scrollbar = vue.inject(scrollbarContextKey);
          const ns = useNamespace("scrollbar");
          if (!scrollbar)
            throwError(COMPONENT_NAME$1, "can not inject scrollbar context");
          const instance = vue.ref();
          const thumb = vue.ref();
          const thumbState = vue.ref({});
          const visible = vue.ref(false);
          let cursorDown = false;
          let cursorLeave = false;
          let originalOnSelectStart = isClient$1 ? document.onselectstart : null;
          const bar = vue.computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
          const thumbStyle = vue.computed(() => renderThumbStyle({
            size: props.size,
            move: props.move,
            bar: bar.value
          }));
          const offsetRatio = vue.computed(() => instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]);
          const clickThumbHandler = (e) => {
            var _a2;
            e.stopPropagation();
            if (e.ctrlKey || [1, 2].includes(e.button))
              return;
            (_a2 = window.getSelection()) == null ? void 0 : _a2.removeAllRanges();
            startDrag(e);
            const el = e.currentTarget;
            if (!el)
              return;
            thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
          };
          const clickTrackHandler = (e) => {
            if (!thumb.value || !instance.value || !scrollbar.wrapElement)
              return;
            const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
            const thumbHalf = thumb.value[bar.value.offset] / 2;
            const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance.value[bar.value.offset];
            scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
          };
          const startDrag = (e) => {
            e.stopImmediatePropagation();
            cursorDown = true;
            document.addEventListener("mousemove", mouseMoveDocumentHandler);
            document.addEventListener("mouseup", mouseUpDocumentHandler);
            originalOnSelectStart = document.onselectstart;
            document.onselectstart = () => false;
          };
          const mouseMoveDocumentHandler = (e) => {
            if (!instance.value || !thumb.value)
              return;
            if (cursorDown === false)
              return;
            const prevPage = thumbState.value[bar.value.axis];
            if (!prevPage)
              return;
            const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
            const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
            const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
            scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
          };
          const mouseUpDocumentHandler = () => {
            cursorDown = false;
            thumbState.value[bar.value.axis] = 0;
            document.removeEventListener("mousemove", mouseMoveDocumentHandler);
            document.removeEventListener("mouseup", mouseUpDocumentHandler);
            restoreOnselectstart();
            if (cursorLeave)
              visible.value = false;
          };
          const mouseMoveScrollbarHandler = () => {
            cursorLeave = false;
            visible.value = !!props.size;
          };
          const mouseLeaveScrollbarHandler = () => {
            cursorLeave = true;
            visible.value = cursorDown;
          };
          vue.onBeforeUnmount(() => {
            restoreOnselectstart();
            document.removeEventListener("mouseup", mouseUpDocumentHandler);
          });
          const restoreOnselectstart = () => {
            if (document.onselectstart !== originalOnSelectStart)
              document.onselectstart = originalOnSelectStart;
          };
          useEventListener(vue.toRef(scrollbar, "scrollbarElement"), "mousemove", mouseMoveScrollbarHandler);
          useEventListener(vue.toRef(scrollbar, "scrollbarElement"), "mouseleave", mouseLeaveScrollbarHandler);
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.Transition, {
              name: vue.unref(ns).b("fade"),
              persisted: ""
            }, {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createElementVNode("div", {
                  ref_key: "instance",
                  ref: instance,
                  class: vue.normalizeClass([vue.unref(ns).e("bar"), vue.unref(ns).is(vue.unref(bar).key)]),
                  onMousedown: clickTrackHandler
                }, [
                  vue.createElementVNode("div", {
                    ref_key: "thumb",
                    ref: thumb,
                    class: vue.normalizeClass(vue.unref(ns).e("thumb")),
                    style: vue.normalizeStyle(vue.unref(thumbStyle)),
                    onMousedown: clickThumbHandler
                  }, null, 38)
                ], 34), [
                  [vue.vShow, _ctx.always || visible.value]
                ])
              ]),
              _: 1
            }, 8, ["name"]);
          };
        }
      });
      var Thumb = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
      const barProps = buildProps({
        always: {
          type: Boolean,
          default: true
        },
        width: String,
        height: String,
        ratioX: {
          type: Number,
          default: 1
        },
        ratioY: {
          type: Number,
          default: 1
        }
      });
      const _sfc_main$z = /* @__PURE__ */ vue.defineComponent({
        __name: "bar",
        props: barProps,
        setup(__props, { expose }) {
          const props = __props;
          const moveX = vue.ref(0);
          const moveY = vue.ref(0);
          const handleScroll = (wrap) => {
            if (wrap) {
              const offsetHeight = wrap.offsetHeight - GAP;
              const offsetWidth = wrap.offsetWidth - GAP;
              moveY.value = wrap.scrollTop * 100 / offsetHeight * props.ratioY;
              moveX.value = wrap.scrollLeft * 100 / offsetWidth * props.ratioX;
            }
          };
          expose({
            handleScroll
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
              vue.createVNode(Thumb, {
                move: moveX.value,
                ratio: _ctx.ratioX,
                size: _ctx.width,
                always: _ctx.always
              }, null, 8, ["move", "ratio", "size", "always"]),
              vue.createVNode(Thumb, {
                move: moveY.value,
                ratio: _ctx.ratioY,
                size: _ctx.height,
                vertical: "",
                always: _ctx.always
              }, null, 8, ["move", "ratio", "size", "always"])
            ], 64);
          };
        }
      });
      var Bar = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
      const scrollbarProps = buildProps({
        height: {
          type: [String, Number],
          default: ""
        },
        maxHeight: {
          type: [String, Number],
          default: ""
        },
        native: {
          type: Boolean,
          default: false
        },
        wrapStyle: {
          type: definePropType([String, Object, Array]),
          default: ""
        },
        wrapClass: {
          type: [String, Array],
          default: ""
        },
        viewClass: {
          type: [String, Array],
          default: ""
        },
        viewStyle: {
          type: [String, Array, Object],
          default: ""
        },
        noresize: Boolean,
        tag: {
          type: String,
          default: "div"
        },
        always: Boolean,
        minSize: {
          type: Number,
          default: 20
        }
      });
      const scrollbarEmits = {
        scroll: ({
          scrollTop,
          scrollLeft
        }) => [scrollTop, scrollLeft].every(isNumber)
      };
      const COMPONENT_NAME = "ElScrollbar";
      const __default__$h = vue.defineComponent({
        name: COMPONENT_NAME
      });
      const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
        ...__default__$h,
        props: scrollbarProps,
        emits: scrollbarEmits,
        setup(__props, { expose, emit }) {
          const props = __props;
          const ns = useNamespace("scrollbar");
          let stopResizeObserver = void 0;
          let stopResizeListener = void 0;
          const scrollbarRef = vue.ref();
          const wrapRef = vue.ref();
          const resizeRef = vue.ref();
          const sizeWidth = vue.ref("0");
          const sizeHeight = vue.ref("0");
          const barRef = vue.ref();
          const ratioY = vue.ref(1);
          const ratioX = vue.ref(1);
          const style = vue.computed(() => {
            const style2 = {};
            if (props.height)
              style2.height = addUnit(props.height);
            if (props.maxHeight)
              style2.maxHeight = addUnit(props.maxHeight);
            return [props.wrapStyle, style2];
          });
          const wrapKls = vue.computed(() => {
            return [
              props.wrapClass,
              ns.e("wrap"),
              { [ns.em("wrap", "hidden-default")]: !props.native }
            ];
          });
          const resizeKls = vue.computed(() => {
            return [ns.e("view"), props.viewClass];
          });
          const handleScroll = () => {
            var _a2;
            if (wrapRef.value) {
              (_a2 = barRef.value) == null ? void 0 : _a2.handleScroll(wrapRef.value);
              emit("scroll", {
                scrollTop: wrapRef.value.scrollTop,
                scrollLeft: wrapRef.value.scrollLeft
              });
            }
          };
          function scrollTo(arg1, arg2) {
            if (isObject$1(arg1)) {
              wrapRef.value.scrollTo(arg1);
            } else if (isNumber(arg1) && isNumber(arg2)) {
              wrapRef.value.scrollTo(arg1, arg2);
            }
          }
          const setScrollTop = (value) => {
            if (!isNumber(value)) {
              return;
            }
            wrapRef.value.scrollTop = value;
          };
          const setScrollLeft = (value) => {
            if (!isNumber(value)) {
              return;
            }
            wrapRef.value.scrollLeft = value;
          };
          const update = () => {
            if (!wrapRef.value)
              return;
            const offsetHeight = wrapRef.value.offsetHeight - GAP;
            const offsetWidth = wrapRef.value.offsetWidth - GAP;
            const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight;
            const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth;
            const height = Math.max(originalHeight, props.minSize);
            const width = Math.max(originalWidth, props.minSize);
            ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
            ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
            sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
            sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
          };
          vue.watch(() => props.noresize, (noresize) => {
            if (noresize) {
              stopResizeObserver == null ? void 0 : stopResizeObserver();
              stopResizeListener == null ? void 0 : stopResizeListener();
            } else {
              ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
              stopResizeListener = useEventListener("resize", update);
            }
          }, { immediate: true });
          vue.watch(() => [props.maxHeight, props.height], () => {
            if (!props.native)
              vue.nextTick(() => {
                var _a2;
                update();
                if (wrapRef.value) {
                  (_a2 = barRef.value) == null ? void 0 : _a2.handleScroll(wrapRef.value);
                }
              });
          });
          vue.provide(scrollbarContextKey, vue.reactive({
            scrollbarElement: scrollbarRef,
            wrapElement: wrapRef
          }));
          vue.onMounted(() => {
            if (!props.native)
              vue.nextTick(() => {
                update();
              });
          });
          vue.onUpdated(() => update());
          expose({
            wrapRef,
            update,
            scrollTo,
            setScrollTop,
            setScrollLeft,
            handleScroll
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              ref_key: "scrollbarRef",
              ref: scrollbarRef,
              class: vue.normalizeClass(vue.unref(ns).b())
            }, [
              vue.createElementVNode("div", {
                ref_key: "wrapRef",
                ref: wrapRef,
                class: vue.normalizeClass(vue.unref(wrapKls)),
                style: vue.normalizeStyle(vue.unref(style)),
                onScroll: handleScroll
              }, [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
                  ref_key: "resizeRef",
                  ref: resizeRef,
                  class: vue.normalizeClass(vue.unref(resizeKls)),
                  style: vue.normalizeStyle(_ctx.viewStyle)
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["class", "style"]))
              ], 38),
              !_ctx.native ? (vue.openBlock(), vue.createBlock(Bar, {
                key: 0,
                ref_key: "barRef",
                ref: barRef,
                height: sizeHeight.value,
                width: sizeWidth.value,
                always: _ctx.always,
                "ratio-x": ratioX.value,
                "ratio-y": ratioY.value
              }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"])) : vue.createCommentVNode("v-if", true)
            ], 2);
          };
        }
      });
      var Scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
      const ElScrollbar = withInstall(Scrollbar);
      const POPPER_INJECTION_KEY = Symbol("popper");
      const POPPER_CONTENT_INJECTION_KEY = Symbol("popperContent");
      const roleTypes = [
        "dialog",
        "grid",
        "group",
        "listbox",
        "menu",
        "navigation",
        "tooltip",
        "tree"
      ];
      const popperProps = buildProps({
        role: {
          type: String,
          values: roleTypes,
          default: "tooltip"
        }
      });
      const __default__$g = vue.defineComponent({
        name: "ElPopper",
        inheritAttrs: false
      });
      const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
        ...__default__$g,
        props: popperProps,
        setup(__props, { expose }) {
          const props = __props;
          const triggerRef = vue.ref();
          const popperInstanceRef = vue.ref();
          const contentRef = vue.ref();
          const referenceRef = vue.ref();
          const role = vue.computed(() => props.role);
          const popperProvides = {
            triggerRef,
            popperInstanceRef,
            contentRef,
            referenceRef,
            role
          };
          expose(popperProvides);
          vue.provide(POPPER_INJECTION_KEY, popperProvides);
          return (_ctx, _cache) => {
            return vue.renderSlot(_ctx.$slots, "default");
          };
        }
      });
      var Popper = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
      const popperArrowProps = buildProps({
        arrowOffset: {
          type: Number,
          default: 5
        }
      });
      const __default__$f = vue.defineComponent({
        name: "ElPopperArrow",
        inheritAttrs: false
      });
      const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
        ...__default__$f,
        props: popperArrowProps,
        setup(__props, { expose }) {
          const props = __props;
          const ns = useNamespace("popper");
          const { arrowOffset, arrowRef, arrowStyle } = vue.inject(POPPER_CONTENT_INJECTION_KEY, void 0);
          vue.watch(() => props.arrowOffset, (val) => {
            arrowOffset.value = val;
          });
          vue.onBeforeUnmount(() => {
            arrowRef.value = void 0;
          });
          expose({
            arrowRef
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("span", {
              ref_key: "arrowRef",
              ref: arrowRef,
              class: vue.normalizeClass(vue.unref(ns).e("arrow")),
              style: vue.normalizeStyle(vue.unref(arrowStyle)),
              "data-popper-arrow": ""
            }, null, 6);
          };
        }
      });
      var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
      const NAME = "ElOnlyChild";
      const OnlyChild = vue.defineComponent({
        name: NAME,
        setup(_, {
          slots,
          attrs
        }) {
          var _a2;
          const forwardRefInjection = vue.inject(FORWARD_REF_INJECTION_KEY);
          const forwardRefDirective = useForwardRefDirective((_a2 = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a2 : NOOP);
          return () => {
            var _a22;
            const defaultSlot = (_a22 = slots.default) == null ? void 0 : _a22.call(slots, attrs);
            if (!defaultSlot)
              return null;
            if (defaultSlot.length > 1) {
              return null;
            }
            const firstLegitNode = findFirstLegitChild(defaultSlot);
            if (!firstLegitNode) {
              return null;
            }
            return vue.withDirectives(vue.cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
          };
        }
      });
      function findFirstLegitChild(node) {
        if (!node)
          return null;
        const children = node;
        for (const child of children) {
          if (isObject$1(child)) {
            switch (child.type) {
              case vue.Comment:
                continue;
              case vue.Text:
              case "svg":
                return wrapTextContent(child);
              case vue.Fragment:
                return findFirstLegitChild(child.children);
              default:
                return child;
            }
          }
          return wrapTextContent(child);
        }
        return null;
      }
      function wrapTextContent(s) {
        const ns = useNamespace("only-child");
        return vue.createVNode("span", {
          "class": ns.e("content")
        }, [s]);
      }
      const popperTriggerProps = buildProps({
        virtualRef: {
          type: definePropType(Object)
        },
        virtualTriggering: Boolean,
        onMouseenter: {
          type: definePropType(Function)
        },
        onMouseleave: {
          type: definePropType(Function)
        },
        onClick: {
          type: definePropType(Function)
        },
        onKeydown: {
          type: definePropType(Function)
        },
        onFocus: {
          type: definePropType(Function)
        },
        onBlur: {
          type: definePropType(Function)
        },
        onContextmenu: {
          type: definePropType(Function)
        },
        id: String,
        open: Boolean
      });
      const __default__$e = vue.defineComponent({
        name: "ElPopperTrigger",
        inheritAttrs: false
      });
      const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
        ...__default__$e,
        props: popperTriggerProps,
        setup(__props, { expose }) {
          const props = __props;
          const { role, triggerRef } = vue.inject(POPPER_INJECTION_KEY, void 0);
          useForwardRef(triggerRef);
          const ariaControls = vue.computed(() => {
            return ariaHaspopup.value ? props.id : void 0;
          });
          const ariaDescribedby = vue.computed(() => {
            if (role && role.value === "tooltip") {
              return props.open && props.id ? props.id : void 0;
            }
            return void 0;
          });
          const ariaHaspopup = vue.computed(() => {
            if (role && role.value !== "tooltip") {
              return role.value;
            }
            return void 0;
          });
          const ariaExpanded = vue.computed(() => {
            return ariaHaspopup.value ? `${props.open}` : void 0;
          });
          let virtualTriggerAriaStopWatch = void 0;
          vue.onMounted(() => {
            vue.watch(() => props.virtualRef, (virtualEl) => {
              if (virtualEl) {
                triggerRef.value = unrefElement(virtualEl);
              }
            }, {
              immediate: true
            });
            vue.watch(triggerRef, (el, prevEl) => {
              virtualTriggerAriaStopWatch == null ? void 0 : virtualTriggerAriaStopWatch();
              virtualTriggerAriaStopWatch = void 0;
              if (isElement(el)) {
                [
                  "onMouseenter",
                  "onMouseleave",
                  "onClick",
                  "onKeydown",
                  "onFocus",
                  "onBlur",
                  "onContextmenu"
                ].forEach((eventName) => {
                  var _a2;
                  const handler = props[eventName];
                  if (handler) {
                    el.addEventListener(eventName.slice(2).toLowerCase(), handler);
                    (_a2 = prevEl == null ? void 0 : prevEl.removeEventListener) == null ? void 0 : _a2.call(prevEl, eventName.slice(2).toLowerCase(), handler);
                  }
                });
                virtualTriggerAriaStopWatch = vue.watch([ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded], (watches) => {
                  [
                    "aria-controls",
                    "aria-describedby",
                    "aria-haspopup",
                    "aria-expanded"
                  ].forEach((key, idx) => {
                    isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
                  });
                }, { immediate: true });
              }
              if (isElement(prevEl)) {
                [
                  "aria-controls",
                  "aria-describedby",
                  "aria-haspopup",
                  "aria-expanded"
                ].forEach((key) => prevEl.removeAttribute(key));
              }
            }, {
              immediate: true
            });
          });
          vue.onBeforeUnmount(() => {
            virtualTriggerAriaStopWatch == null ? void 0 : virtualTriggerAriaStopWatch();
            virtualTriggerAriaStopWatch = void 0;
          });
          expose({
            triggerRef
          });
          return (_ctx, _cache) => {
            return !_ctx.virtualTriggering ? (vue.openBlock(), vue.createBlock(vue.unref(OnlyChild), vue.mergeProps({ key: 0 }, _ctx.$attrs, {
              "aria-controls": vue.unref(ariaControls),
              "aria-describedby": vue.unref(ariaDescribedby),
              "aria-expanded": vue.unref(ariaExpanded),
              "aria-haspopup": vue.unref(ariaHaspopup)
            }), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"])) : vue.createCommentVNode("v-if", true);
          };
        }
      });
      var ElPopperTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]);
      const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
      const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
      const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
      const FOCUS_AFTER_TRAPPED_OPTS = {
        cancelable: true,
        bubbles: false
      };
      const FOCUSOUT_PREVENTED_OPTS = {
        cancelable: true,
        bubbles: false
      };
      const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
      const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
      const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
      const focusReason = vue.ref();
      const lastUserFocusTimestamp = vue.ref(0);
      const lastAutomatedFocusTimestamp = vue.ref(0);
      let focusReasonUserCount = 0;
      const obtainAllFocusableElements = (element) => {
        const nodes = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
          acceptNode: (node) => {
            const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
            if (node.disabled || node.hidden || isHiddenInput)
              return NodeFilter.FILTER_SKIP;
            return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        });
        while (walker.nextNode())
          nodes.push(walker.currentNode);
        return nodes;
      };
      const getVisibleElement = (elements, container) => {
        for (const element of elements) {
          if (!isHidden(element, container))
            return element;
        }
      };
      const isHidden = (element, container) => {
        if (getComputedStyle(element).visibility === "hidden")
          return true;
        while (element) {
          if (container && element === container)
            return false;
          if (getComputedStyle(element).display === "none")
            return true;
          element = element.parentElement;
        }
        return false;
      };
      const getEdges = (container) => {
        const focusable = obtainAllFocusableElements(container);
        const first = getVisibleElement(focusable, container);
        const last = getVisibleElement(focusable.reverse(), container);
        return [first, last];
      };
      const isSelectable = (element) => {
        return element instanceof HTMLInputElement && "select" in element;
      };
      const tryFocus = (element, shouldSelect) => {
        if (element && element.focus) {
          const prevFocusedElement = document.activeElement;
          element.focus({ preventScroll: true });
          lastAutomatedFocusTimestamp.value = window.performance.now();
          if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
            element.select();
          }
        }
      };
      function removeFromStack(list, item) {
        const copy = [...list];
        const idx = list.indexOf(item);
        if (idx !== -1) {
          copy.splice(idx, 1);
        }
        return copy;
      }
      const createFocusableStack = () => {
        let stack = [];
        const push = (layer) => {
          const currentLayer = stack[0];
          if (currentLayer && layer !== currentLayer) {
            currentLayer.pause();
          }
          stack = removeFromStack(stack, layer);
          stack.unshift(layer);
        };
        const remove = (layer) => {
          var _a2, _b;
          stack = removeFromStack(stack, layer);
          (_b = (_a2 = stack[0]) == null ? void 0 : _a2.resume) == null ? void 0 : _b.call(_a2);
        };
        return {
          push,
          remove
        };
      };
      const focusFirstDescendant = (elements, shouldSelect = false) => {
        const prevFocusedElement = document.activeElement;
        for (const element of elements) {
          tryFocus(element, shouldSelect);
          if (document.activeElement !== prevFocusedElement)
            return;
        }
      };
      const focusableStack = createFocusableStack();
      const isFocusCausedByUserEvent = () => {
        return lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value;
      };
      const notifyFocusReasonPointer = () => {
        focusReason.value = "pointer";
        lastUserFocusTimestamp.value = window.performance.now();
      };
      const notifyFocusReasonKeydown = () => {
        focusReason.value = "keyboard";
        lastUserFocusTimestamp.value = window.performance.now();
      };
      const useFocusReason = () => {
        vue.onMounted(() => {
          if (focusReasonUserCount === 0) {
            document.addEventListener("mousedown", notifyFocusReasonPointer);
            document.addEventListener("touchstart", notifyFocusReasonPointer);
            document.addEventListener("keydown", notifyFocusReasonKeydown);
          }
          focusReasonUserCount++;
        });
        vue.onBeforeUnmount(() => {
          focusReasonUserCount--;
          if (focusReasonUserCount <= 0) {
            document.removeEventListener("mousedown", notifyFocusReasonPointer);
            document.removeEventListener("touchstart", notifyFocusReasonPointer);
            document.removeEventListener("keydown", notifyFocusReasonKeydown);
          }
        });
        return {
          focusReason,
          lastUserFocusTimestamp,
          lastAutomatedFocusTimestamp
        };
      };
      const createFocusOutPreventedEvent = (detail) => {
        return new CustomEvent(FOCUSOUT_PREVENTED, {
          ...FOCUSOUT_PREVENTED_OPTS,
          detail
        });
      };
      const _sfc_main$u = vue.defineComponent({
        name: "ElFocusTrap",
        inheritAttrs: false,
        props: {
          loop: Boolean,
          trapped: Boolean,
          focusTrapEl: Object,
          focusStartEl: {
            type: [Object, String],
            default: "first"
          }
        },
        emits: [
          ON_TRAP_FOCUS_EVT,
          ON_RELEASE_FOCUS_EVT,
          "focusin",
          "focusout",
          "focusout-prevented",
          "release-requested"
        ],
        setup(props, { emit }) {
          const forwardRef = vue.ref();
          let lastFocusBeforeTrapped;
          let lastFocusAfterTrapped;
          const { focusReason: focusReason2 } = useFocusReason();
          useEscapeKeydown((event) => {
            if (props.trapped && !focusLayer.paused) {
              emit("release-requested", event);
            }
          });
          const focusLayer = {
            paused: false,
            pause() {
              this.paused = true;
            },
            resume() {
              this.paused = false;
            }
          };
          const onKeydown = (e) => {
            if (!props.loop && !props.trapped)
              return;
            if (focusLayer.paused)
              return;
            const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
            const { loop } = props;
            const isTabbing = key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
            const currentFocusingEl = document.activeElement;
            if (isTabbing && currentFocusingEl) {
              const container = currentTarget;
              const [first, last] = getEdges(container);
              const isTabbable = first && last;
              if (!isTabbable) {
                if (currentFocusingEl === container) {
                  const focusoutPreventedEvent = createFocusOutPreventedEvent({
                    focusReason: focusReason2.value
                  });
                  emit("focusout-prevented", focusoutPreventedEvent);
                  if (!focusoutPreventedEvent.defaultPrevented) {
                    e.preventDefault();
                  }
                }
              } else {
                if (!shiftKey && currentFocusingEl === last) {
                  const focusoutPreventedEvent = createFocusOutPreventedEvent({
                    focusReason: focusReason2.value
                  });
                  emit("focusout-prevented", focusoutPreventedEvent);
                  if (!focusoutPreventedEvent.defaultPrevented) {
                    e.preventDefault();
                    if (loop)
                      tryFocus(first, true);
                  }
                } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
                  const focusoutPreventedEvent = createFocusOutPreventedEvent({
                    focusReason: focusReason2.value
                  });
                  emit("focusout-prevented", focusoutPreventedEvent);
                  if (!focusoutPreventedEvent.defaultPrevented) {
                    e.preventDefault();
                    if (loop)
                      tryFocus(last, true);
                  }
                }
              }
            }
          };
          vue.provide(FOCUS_TRAP_INJECTION_KEY, {
            focusTrapRef: forwardRef,
            onKeydown
          });
          vue.watch(() => props.focusTrapEl, (focusTrapEl) => {
            if (focusTrapEl) {
              forwardRef.value = focusTrapEl;
            }
          }, { immediate: true });
          vue.watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
            if (forwardRef2) {
              forwardRef2.addEventListener("keydown", onKeydown);
              forwardRef2.addEventListener("focusin", onFocusIn);
              forwardRef2.addEventListener("focusout", onFocusOut);
            }
            if (oldForwardRef) {
              oldForwardRef.removeEventListener("keydown", onKeydown);
              oldForwardRef.removeEventListener("focusin", onFocusIn);
              oldForwardRef.removeEventListener("focusout", onFocusOut);
            }
          });
          const trapOnFocus = (e) => {
            emit(ON_TRAP_FOCUS_EVT, e);
          };
          const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
          const onFocusIn = (e) => {
            const trapContainer = vue.unref(forwardRef);
            if (!trapContainer)
              return;
            const target = e.target;
            const relatedTarget = e.relatedTarget;
            const isFocusedInTrap = target && trapContainer.contains(target);
            if (!props.trapped) {
              const isPrevFocusedInTrap = relatedTarget && trapContainer.contains(relatedTarget);
              if (!isPrevFocusedInTrap) {
                lastFocusBeforeTrapped = relatedTarget;
              }
            }
            if (isFocusedInTrap)
              emit("focusin", e);
            if (focusLayer.paused)
              return;
            if (props.trapped) {
              if (isFocusedInTrap) {
                lastFocusAfterTrapped = target;
              } else {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }
          };
          const onFocusOut = (e) => {
            const trapContainer = vue.unref(forwardRef);
            if (focusLayer.paused || !trapContainer)
              return;
            if (props.trapped) {
              const relatedTarget = e.relatedTarget;
              if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
                setTimeout(() => {
                  if (!focusLayer.paused && props.trapped) {
                    const focusoutPreventedEvent = createFocusOutPreventedEvent({
                      focusReason: focusReason2.value
                    });
                    emit("focusout-prevented", focusoutPreventedEvent);
                    if (!focusoutPreventedEvent.defaultPrevented) {
                      tryFocus(lastFocusAfterTrapped, true);
                    }
                  }
                }, 0);
              }
            } else {
              const target = e.target;
              const isFocusedInTrap = target && trapContainer.contains(target);
              if (!isFocusedInTrap)
                emit("focusout", e);
            }
          };
          async function startTrap() {
            await vue.nextTick();
            const trapContainer = vue.unref(forwardRef);
            if (trapContainer) {
              focusableStack.push(focusLayer);
              const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
              lastFocusBeforeTrapped = prevFocusedElement;
              const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
              if (!isPrevFocusContained) {
                const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
                trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
                trapContainer.dispatchEvent(focusEvent);
                if (!focusEvent.defaultPrevented) {
                  vue.nextTick(() => {
                    let focusStartEl = props.focusStartEl;
                    if (!isString(focusStartEl)) {
                      tryFocus(focusStartEl);
                      if (document.activeElement !== focusStartEl) {
                        focusStartEl = "first";
                      }
                    }
                    if (focusStartEl === "first") {
                      focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
                    }
                    if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                      tryFocus(trapContainer);
                    }
                  });
                }
              }
            }
          }
          function stopTrap() {
            const trapContainer = vue.unref(forwardRef);
            if (trapContainer) {
              trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
              const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
                ...FOCUS_AFTER_TRAPPED_OPTS,
                detail: {
                  focusReason: focusReason2.value
                }
              });
              trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
              trapContainer.dispatchEvent(releasedEvent);
              if (!releasedEvent.defaultPrevented && (focusReason2.value == "keyboard" || !isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) {
                tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body);
              }
              trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
              focusableStack.remove(focusLayer);
            }
          }
          vue.onMounted(() => {
            if (props.trapped) {
              startTrap();
            }
            vue.watch(() => props.trapped, (trapped) => {
              if (trapped) {
                startTrap();
              } else {
                stopTrap();
              }
            });
          });
          vue.onBeforeUnmount(() => {
            if (props.trapped) {
              stopTrap();
            }
          });
          return {
            onKeydown
          };
        }
      });
      function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return vue.renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
      }
      var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
      const POSITIONING_STRATEGIES = ["fixed", "absolute"];
      const popperCoreConfigProps = buildProps({
        boundariesPadding: {
          type: Number,
          default: 0
        },
        fallbackPlacements: {
          type: definePropType(Array),
          default: void 0
        },
        gpuAcceleration: {
          type: Boolean,
          default: true
        },
        offset: {
          type: Number,
          default: 12
        },
        placement: {
          type: String,
          values: Ee,
          default: "bottom"
        },
        popperOptions: {
          type: definePropType(Object),
          default: () => ({})
        },
        strategy: {
          type: String,
          values: POSITIONING_STRATEGIES,
          default: "absolute"
        }
      });
      const popperContentProps = buildProps({
        ...popperCoreConfigProps,
        id: String,
        style: {
          type: definePropType([String, Array, Object])
        },
        className: {
          type: definePropType([String, Array, Object])
        },
        effect: {
          type: String,
          default: "dark"
        },
        visible: Boolean,
        enterable: {
          type: Boolean,
          default: true
        },
        pure: Boolean,
        focusOnShow: {
          type: Boolean,
          default: false
        },
        trapping: {
          type: Boolean,
          default: false
        },
        popperClass: {
          type: definePropType([String, Array, Object])
        },
        popperStyle: {
          type: definePropType([String, Array, Object])
        },
        referenceEl: {
          type: definePropType(Object)
        },
        triggerTargetEl: {
          type: definePropType(Object)
        },
        stopPopperMouseEvent: {
          type: Boolean,
          default: true
        },
        ariaLabel: {
          type: String,
          default: void 0
        },
        virtualTriggering: Boolean,
        zIndex: Number
      });
      const popperContentEmits = {
        mouseenter: (evt) => evt instanceof MouseEvent,
        mouseleave: (evt) => evt instanceof MouseEvent,
        focus: () => true,
        blur: () => true,
        close: () => true
      };
      const buildPopperOptions = (props, modifiers = []) => {
        const { placement, strategy, popperOptions } = props;
        const options = {
          placement,
          strategy,
          ...popperOptions,
          modifiers: [...genModifiers(props), ...modifiers]
        };
        deriveExtraModifiers(options, popperOptions == null ? void 0 : popperOptions.modifiers);
        return options;
      };
      const unwrapMeasurableEl = ($el) => {
        if (!isClient$1)
          return;
        return unrefElement($el);
      };
      function genModifiers(options) {
        const { offset, gpuAcceleration, fallbackPlacements } = options;
        return [
          {
            name: "offset",
            options: {
              offset: [0, offset != null ? offset : 12]
            }
          },
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: 2,
                bottom: 2,
                left: 5,
                right: 5
              }
            }
          },
          {
            name: "flip",
            options: {
              padding: 5,
              fallbackPlacements
            }
          },
          {
            name: "computeStyles",
            options: {
              gpuAcceleration
            }
          }
        ];
      }
      function deriveExtraModifiers(options, modifiers) {
        if (modifiers) {
          options.modifiers = [...options.modifiers, ...modifiers != null ? modifiers : []];
        }
      }
      const DEFAULT_ARROW_OFFSET = 0;
      const usePopperContent = (props) => {
        const { popperInstanceRef, contentRef, triggerRef, role } = vue.inject(POPPER_INJECTION_KEY, void 0);
        const arrowRef = vue.ref();
        const arrowOffset = vue.ref();
        const eventListenerModifier = vue.computed(() => {
          return {
            name: "eventListeners",
            enabled: !!props.visible
          };
        });
        const arrowModifier = vue.computed(() => {
          var _a2;
          const arrowEl = vue.unref(arrowRef);
          const offset = (_a2 = vue.unref(arrowOffset)) != null ? _a2 : DEFAULT_ARROW_OFFSET;
          return {
            name: "arrow",
            enabled: !isUndefined$1(arrowEl),
            options: {
              element: arrowEl,
              padding: offset
            }
          };
        });
        const options = vue.computed(() => {
          return {
            onFirstUpdate: () => {
              update();
            },
            ...buildPopperOptions(props, [
              vue.unref(arrowModifier),
              vue.unref(eventListenerModifier)
            ])
          };
        });
        const computedReference = vue.computed(() => unwrapMeasurableEl(props.referenceEl) || vue.unref(triggerRef));
        const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(computedReference, contentRef, options);
        vue.watch(instanceRef, (instance) => popperInstanceRef.value = instance);
        vue.onMounted(() => {
          vue.watch(() => {
            var _a2;
            return (_a2 = vue.unref(computedReference)) == null ? void 0 : _a2.getBoundingClientRect();
          }, () => {
            update();
          });
        });
        return {
          attributes,
          arrowRef,
          contentRef,
          instanceRef,
          state,
          styles,
          role,
          forceUpdate,
          update
        };
      };
      const usePopperContentDOM = (props, {
        attributes,
        styles,
        role
      }) => {
        const { nextZIndex } = useZIndex();
        const ns = useNamespace("popper");
        const contentAttrs = vue.computed(() => vue.unref(attributes).popper);
        const contentZIndex = vue.ref(props.zIndex || nextZIndex());
        const contentClass = vue.computed(() => [
          ns.b(),
          ns.is("pure", props.pure),
          ns.is(props.effect),
          props.popperClass
        ]);
        const contentStyle = vue.computed(() => {
          return [
            { zIndex: vue.unref(contentZIndex) },
            vue.unref(styles).popper,
            props.popperStyle || {}
          ];
        });
        const ariaModal = vue.computed(() => role.value === "dialog" ? "false" : void 0);
        const arrowStyle = vue.computed(() => vue.unref(styles).arrow || {});
        const updateZIndex = () => {
          contentZIndex.value = props.zIndex || nextZIndex();
        };
        return {
          ariaModal,
          arrowStyle,
          contentAttrs,
          contentClass,
          contentStyle,
          contentZIndex,
          updateZIndex
        };
      };
      const usePopperContentFocusTrap = (props, emit) => {
        const trapped = vue.ref(false);
        const focusStartRef = vue.ref();
        const onFocusAfterTrapped = () => {
          emit("focus");
        };
        const onFocusAfterReleased = (event) => {
          var _a2;
          if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) !== "pointer") {
            focusStartRef.value = "first";
            emit("blur");
          }
        };
        const onFocusInTrap = (event) => {
          if (props.visible && !trapped.value) {
            if (event.target) {
              focusStartRef.value = event.target;
            }
            trapped.value = true;
          }
        };
        const onFocusoutPrevented = (event) => {
          if (!props.trapping) {
            if (event.detail.focusReason === "pointer") {
              event.preventDefault();
            }
            trapped.value = false;
          }
        };
        const onReleaseRequested = () => {
          trapped.value = false;
          emit("close");
        };
        return {
          focusStartRef,
          trapped,
          onFocusAfterReleased,
          onFocusAfterTrapped,
          onFocusInTrap,
          onFocusoutPrevented,
          onReleaseRequested
        };
      };
      const __default__$d = vue.defineComponent({
        name: "ElPopperContent"
      });
      const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
        ...__default__$d,
        props: popperContentProps,
        emits: popperContentEmits,
        setup(__props, { expose, emit }) {
          const props = __props;
          const {
            focusStartRef,
            trapped,
            onFocusAfterReleased,
            onFocusAfterTrapped,
            onFocusInTrap,
            onFocusoutPrevented,
            onReleaseRequested
          } = usePopperContentFocusTrap(props, emit);
          const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props);
          const {
            ariaModal,
            arrowStyle,
            contentAttrs,
            contentClass,
            contentStyle,
            updateZIndex
          } = usePopperContentDOM(props, {
            styles,
            attributes,
            role
          });
          const formItemContext = vue.inject(formItemContextKey, void 0);
          const arrowOffset = vue.ref();
          vue.provide(POPPER_CONTENT_INJECTION_KEY, {
            arrowStyle,
            arrowRef,
            arrowOffset
          });
          if (formItemContext && (formItemContext.addInputId || formItemContext.removeInputId)) {
            vue.provide(formItemContextKey, {
              ...formItemContext,
              addInputId: NOOP,
              removeInputId: NOOP
            });
          }
          let triggerTargetAriaStopWatch = void 0;
          const updatePopper = (shouldUpdateZIndex = true) => {
            update();
            shouldUpdateZIndex && updateZIndex();
          };
          const togglePopperAlive = () => {
            updatePopper(false);
            if (props.visible && props.focusOnShow) {
              trapped.value = true;
            } else if (props.visible === false) {
              trapped.value = false;
            }
          };
          vue.onMounted(() => {
            vue.watch(() => props.triggerTargetEl, (triggerTargetEl, prevTriggerTargetEl) => {
              triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
              triggerTargetAriaStopWatch = void 0;
              const el = vue.unref(triggerTargetEl || contentRef.value);
              const prevEl = vue.unref(prevTriggerTargetEl || contentRef.value);
              if (isElement(el)) {
                triggerTargetAriaStopWatch = vue.watch([role, () => props.ariaLabel, ariaModal, () => props.id], (watches) => {
                  ["role", "aria-label", "aria-modal", "id"].forEach((key, idx) => {
                    isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
                  });
                }, { immediate: true });
              }
              if (prevEl !== el && isElement(prevEl)) {
                ["role", "aria-label", "aria-modal", "id"].forEach((key) => {
                  prevEl.removeAttribute(key);
                });
              }
            }, { immediate: true });
            vue.watch(() => props.visible, togglePopperAlive, { immediate: true });
          });
          vue.onBeforeUnmount(() => {
            triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
            triggerTargetAriaStopWatch = void 0;
          });
          expose({
            popperContentRef: contentRef,
            popperInstanceRef: instanceRef,
            updatePopper,
            contentStyle
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              ref_key: "contentRef",
              ref: contentRef
            }, vue.unref(contentAttrs), {
              style: vue.unref(contentStyle),
              class: vue.unref(contentClass),
              tabindex: "-1",
              onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
              onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
            }), [
              vue.createVNode(vue.unref(ElFocusTrap), {
                trapped: vue.unref(trapped),
                "trap-on-focus-in": true,
                "focus-trap-el": vue.unref(contentRef),
                "focus-start-el": vue.unref(focusStartRef),
                onFocusAfterTrapped: vue.unref(onFocusAfterTrapped),
                onFocusAfterReleased: vue.unref(onFocusAfterReleased),
                onFocusin: vue.unref(onFocusInTrap),
                onFocusoutPrevented: vue.unref(onFocusoutPrevented),
                onReleaseRequested: vue.unref(onReleaseRequested)
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
            ], 16);
          };
        }
      });
      var ElPopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
      const ElPopper = withInstall(Popper);
      const TOOLTIP_INJECTION_KEY = Symbol("elTooltip");
      const useTooltipContentProps = buildProps({
        ...useDelayedToggleProps,
        ...popperContentProps,
        appendTo: {
          type: definePropType([String, Object])
        },
        content: {
          type: String,
          default: ""
        },
        rawContent: {
          type: Boolean,
          default: false
        },
        persistent: Boolean,
        ariaLabel: String,
        visible: {
          type: definePropType(Boolean),
          default: null
        },
        transition: String,
        teleported: {
          type: Boolean,
          default: true
        },
        disabled: Boolean
      });
      const useTooltipTriggerProps = buildProps({
        ...popperTriggerProps,
        disabled: Boolean,
        trigger: {
          type: definePropType([String, Array]),
          default: "hover"
        },
        triggerKeys: {
          type: definePropType(Array),
          default: () => [EVENT_CODE.enter, EVENT_CODE.space]
        }
      });
      const {
        useModelToggleProps: useTooltipModelToggleProps,
        useModelToggleEmits: useTooltipModelToggleEmits,
        useModelToggle: useTooltipModelToggle
      } = createModelToggleComposable("visible");
      const useTooltipProps = buildProps({
        ...popperProps,
        ...useTooltipModelToggleProps,
        ...useTooltipContentProps,
        ...useTooltipTriggerProps,
        ...popperArrowProps,
        showArrow: {
          type: Boolean,
          default: true
        }
      });
      const tooltipEmits = [
        ...useTooltipModelToggleEmits,
        "before-show",
        "before-hide",
        "show",
        "hide",
        "open",
        "close"
      ];
      const isTriggerType = (trigger, type) => {
        if (isArray$2(trigger)) {
          return trigger.includes(type);
        }
        return trigger === type;
      };
      const whenTrigger = (trigger, type, handler) => {
        return (e) => {
          isTriggerType(vue.unref(trigger), type) && handler(e);
        };
      };
      const __default__$c = vue.defineComponent({
        name: "ElTooltipTrigger"
      });
      const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
        ...__default__$c,
        props: useTooltipTriggerProps,
        setup(__props, { expose }) {
          const props = __props;
          const ns = useNamespace("tooltip");
          const { controlled, id, open, onOpen, onClose, onToggle } = vue.inject(TOOLTIP_INJECTION_KEY, void 0);
          const triggerRef = vue.ref(null);
          const stopWhenControlledOrDisabled = () => {
            if (vue.unref(controlled) || props.disabled) {
              return true;
            }
          };
          const trigger = vue.toRef(props, "trigger");
          const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", onOpen));
          const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", onClose));
          const onClick = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "click", (e) => {
            if (e.button === 0) {
              onToggle(e);
            }
          }));
          const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onOpen));
          const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onClose));
          const onContextMenu = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "contextmenu", (e) => {
            e.preventDefault();
            onToggle(e);
          }));
          const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e) => {
            const { code } = e;
            if (props.triggerKeys.includes(code)) {
              e.preventDefault();
              onToggle(e);
            }
          });
          expose({
            triggerRef
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(ElPopperTrigger), {
              id: vue.unref(id),
              "virtual-ref": _ctx.virtualRef,
              open: vue.unref(open),
              "virtual-triggering": _ctx.virtualTriggering,
              class: vue.normalizeClass(vue.unref(ns).e("trigger")),
              onBlur: vue.unref(onBlur),
              onClick: vue.unref(onClick),
              onContextmenu: vue.unref(onContextMenu),
              onFocus: vue.unref(onFocus),
              onMouseenter: vue.unref(onMouseenter),
              onMouseleave: vue.unref(onMouseleave),
              onKeydown: vue.unref(onKeydown)
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
          };
        }
      });
      var ElTooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
      const __default__$b = vue.defineComponent({
        name: "ElTooltipContent",
        inheritAttrs: false
      });
      const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
        ...__default__$b,
        props: useTooltipContentProps,
        setup(__props, { expose }) {
          const props = __props;
          const { selector } = usePopperContainerId();
          const ns = useNamespace("tooltip");
          const contentRef = vue.ref(null);
          const destroyed = vue.ref(false);
          const {
            controlled,
            id,
            open,
            trigger,
            onClose,
            onOpen,
            onShow,
            onHide,
            onBeforeShow,
            onBeforeHide
          } = vue.inject(TOOLTIP_INJECTION_KEY, void 0);
          const transitionClass = vue.computed(() => {
            return props.transition || `${ns.namespace.value}-fade-in-linear`;
          });
          const persistentRef = vue.computed(() => {
            return props.persistent;
          });
          vue.onBeforeUnmount(() => {
            destroyed.value = true;
          });
          const shouldRender = vue.computed(() => {
            return vue.unref(persistentRef) ? true : vue.unref(open);
          });
          const shouldShow = vue.computed(() => {
            return props.disabled ? false : vue.unref(open);
          });
          const appendTo = vue.computed(() => {
            return props.appendTo || selector.value;
          });
          const contentStyle = vue.computed(() => {
            var _a2;
            return (_a2 = props.style) != null ? _a2 : {};
          });
          const ariaHidden = vue.computed(() => !vue.unref(open));
          const onTransitionLeave = () => {
            onHide();
          };
          const stopWhenControlled = () => {
            if (vue.unref(controlled))
              return true;
          };
          const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
            if (props.enterable && vue.unref(trigger) === "hover") {
              onOpen();
            }
          });
          const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
            if (vue.unref(trigger) === "hover") {
              onClose();
            }
          });
          const onBeforeEnter = () => {
            var _a2, _b;
            (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
            onBeforeShow == null ? void 0 : onBeforeShow();
          };
          const onBeforeLeave = () => {
            onBeforeHide == null ? void 0 : onBeforeHide();
          };
          const onAfterShow = () => {
            onShow();
            stopHandle = onClickOutside(vue.computed(() => {
              var _a2;
              return (_a2 = contentRef.value) == null ? void 0 : _a2.popperContentRef;
            }), () => {
              if (vue.unref(controlled))
                return;
              const $trigger = vue.unref(trigger);
              if ($trigger !== "hover") {
                onClose();
              }
            });
          };
          const onBlur = () => {
            if (!props.virtualTriggering) {
              onClose();
            }
          };
          let stopHandle;
          vue.watch(() => vue.unref(open), (val) => {
            if (!val) {
              stopHandle == null ? void 0 : stopHandle();
            }
          }, {
            flush: "post"
          });
          vue.watch(() => props.content, () => {
            var _a2, _b;
            (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
          });
          expose({
            contentRef
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.Teleport, {
              disabled: !_ctx.teleported,
              to: vue.unref(appendTo)
            }, [
              vue.createVNode(vue.Transition, {
                name: vue.unref(transitionClass),
                onAfterLeave: onTransitionLeave,
                onBeforeEnter,
                onAfterEnter: onAfterShow,
                onBeforeLeave
              }, {
                default: vue.withCtx(() => [
                  vue.unref(shouldRender) ? vue.withDirectives((vue.openBlock(), vue.createBlock(vue.unref(ElPopperContent), vue.mergeProps({
                    key: 0,
                    id: vue.unref(id),
                    ref_key: "contentRef",
                    ref: contentRef
                  }, _ctx.$attrs, {
                    "aria-label": _ctx.ariaLabel,
                    "aria-hidden": vue.unref(ariaHidden),
                    "boundaries-padding": _ctx.boundariesPadding,
                    "fallback-placements": _ctx.fallbackPlacements,
                    "gpu-acceleration": _ctx.gpuAcceleration,
                    offset: _ctx.offset,
                    placement: _ctx.placement,
                    "popper-options": _ctx.popperOptions,
                    strategy: _ctx.strategy,
                    effect: _ctx.effect,
                    enterable: _ctx.enterable,
                    pure: _ctx.pure,
                    "popper-class": _ctx.popperClass,
                    "popper-style": [_ctx.popperStyle, vue.unref(contentStyle)],
                    "reference-el": _ctx.referenceEl,
                    "trigger-target-el": _ctx.triggerTargetEl,
                    visible: vue.unref(shouldShow),
                    "z-index": _ctx.zIndex,
                    onMouseenter: vue.unref(onContentEnter),
                    onMouseleave: vue.unref(onContentLeave),
                    onBlur,
                    onClose: vue.unref(onClose)
                  }), {
                    default: vue.withCtx(() => [
                      !destroyed.value ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("v-if", true)
                    ]),
                    _: 3
                  }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
                    [vue.vShow, vue.unref(shouldShow)]
                  ]) : vue.createCommentVNode("v-if", true)
                ]),
                _: 3
              }, 8, ["name"])
            ], 8, ["disabled", "to"]);
          };
        }
      });
      var ElTooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
      const _hoisted_1$m = ["innerHTML"];
      const _hoisted_2$i = { key: 1 };
      const __default__$a = vue.defineComponent({
        name: "ElTooltip"
      });
      const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
        ...__default__$a,
        props: useTooltipProps,
        emits: tooltipEmits,
        setup(__props, { expose, emit }) {
          const props = __props;
          usePopperContainer();
          const id = useId();
          const popperRef = vue.ref();
          const contentRef = vue.ref();
          const updatePopper = () => {
            var _a2;
            const popperComponent = vue.unref(popperRef);
            if (popperComponent) {
              (_a2 = popperComponent.popperInstanceRef) == null ? void 0 : _a2.update();
            }
          };
          const open = vue.ref(false);
          const toggleReason = vue.ref();
          const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
            indicator: open,
            toggleReason
          });
          const { onOpen, onClose } = useDelayedToggle({
            showAfter: vue.toRef(props, "showAfter"),
            hideAfter: vue.toRef(props, "hideAfter"),
            autoClose: vue.toRef(props, "autoClose"),
            open: show,
            close: hide
          });
          const controlled = vue.computed(() => isBoolean(props.visible) && !hasUpdateHandler.value);
          vue.provide(TOOLTIP_INJECTION_KEY, {
            controlled,
            id,
            open: vue.readonly(open),
            trigger: vue.toRef(props, "trigger"),
            onOpen: (event) => {
              onOpen(event);
            },
            onClose: (event) => {
              onClose(event);
            },
            onToggle: (event) => {
              if (vue.unref(open)) {
                onClose(event);
              } else {
                onOpen(event);
              }
            },
            onShow: () => {
              emit("show", toggleReason.value);
            },
            onHide: () => {
              emit("hide", toggleReason.value);
            },
            onBeforeShow: () => {
              emit("before-show", toggleReason.value);
            },
            onBeforeHide: () => {
              emit("before-hide", toggleReason.value);
            },
            updatePopper
          });
          vue.watch(() => props.disabled, (disabled) => {
            if (disabled && open.value) {
              open.value = false;
            }
          });
          const isFocusInsideContent = (event) => {
            var _a2, _b;
            const popperContent = (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.contentRef) == null ? void 0 : _b.popperContentRef;
            const activeElement = (event == null ? void 0 : event.relatedTarget) || document.activeElement;
            return popperContent && popperContent.contains(activeElement);
          };
          vue.onDeactivated(() => open.value && hide());
          expose({
            popperRef,
            contentRef,
            isFocusInsideContent,
            updatePopper,
            onOpen,
            onClose,
            hide
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(ElPopper), {
              ref_key: "popperRef",
              ref: popperRef,
              role: _ctx.role
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(ElTooltipTrigger, {
                  disabled: _ctx.disabled,
                  trigger: _ctx.trigger,
                  "trigger-keys": _ctx.triggerKeys,
                  "virtual-ref": _ctx.virtualRef,
                  "virtual-triggering": _ctx.virtualTriggering
                }, {
                  default: vue.withCtx(() => [
                    _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 3
                }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
                vue.createVNode(ElTooltipContent, {
                  ref_key: "contentRef",
                  ref: contentRef,
                  "aria-label": _ctx.ariaLabel,
                  "boundaries-padding": _ctx.boundariesPadding,
                  content: _ctx.content,
                  disabled: _ctx.disabled,
                  effect: _ctx.effect,
                  enterable: _ctx.enterable,
                  "fallback-placements": _ctx.fallbackPlacements,
                  "hide-after": _ctx.hideAfter,
                  "gpu-acceleration": _ctx.gpuAcceleration,
                  offset: _ctx.offset,
                  persistent: _ctx.persistent,
                  "popper-class": _ctx.popperClass,
                  "popper-style": _ctx.popperStyle,
                  placement: _ctx.placement,
                  "popper-options": _ctx.popperOptions,
                  pure: _ctx.pure,
                  "raw-content": _ctx.rawContent,
                  "reference-el": _ctx.referenceEl,
                  "trigger-target-el": _ctx.triggerTargetEl,
                  "show-after": _ctx.showAfter,
                  strategy: _ctx.strategy,
                  teleported: _ctx.teleported,
                  transition: _ctx.transition,
                  "virtual-triggering": _ctx.virtualTriggering,
                  "z-index": _ctx.zIndex,
                  "append-to": _ctx.appendTo
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "content", {}, () => [
                      _ctx.rawContent ? (vue.openBlock(), vue.createElementBlock("span", {
                        key: 0,
                        innerHTML: _ctx.content
                      }, null, 8, _hoisted_1$m)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$i, vue.toDisplayString(_ctx.content), 1))
                    ]),
                    _ctx.showArrow ? (vue.openBlock(), vue.createBlock(vue.unref(ElPopperArrow), {
                      key: 0,
                      "arrow-offset": _ctx.arrowOffset
                    }, null, 8, ["arrow-offset"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 3
                }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
              ]),
              _: 3
            }, 8, ["role"]);
          };
        }
      });
      var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
      const ElTooltip = withInstall(Tooltip);
      const avatarProps = buildProps({
        size: {
          type: [Number, String],
          values: componentSizes,
          default: "",
          validator: (val) => isNumber(val)
        },
        shape: {
          type: String,
          values: ["circle", "square"],
          default: "circle"
        },
        icon: {
          type: iconPropType
        },
        src: {
          type: String,
          default: ""
        },
        alt: String,
        srcSet: String,
        fit: {
          type: definePropType(String),
          default: "cover"
        }
      });
      const avatarEmits = {
        error: (evt) => evt instanceof Event
      };
      const _hoisted_1$l = ["src", "alt", "srcset"];
      const __default__$9 = vue.defineComponent({
        name: "ElAvatar"
      });
      const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
        ...__default__$9,
        props: avatarProps,
        emits: avatarEmits,
        setup(__props, { emit }) {
          const props = __props;
          const ns = useNamespace("avatar");
          const hasLoadError = vue.ref(false);
          const avatarClass = vue.computed(() => {
            const { size, icon, shape } = props;
            const classList = [ns.b()];
            if (isString(size))
              classList.push(ns.m(size));
            if (icon)
              classList.push(ns.m("icon"));
            if (shape)
              classList.push(ns.m(shape));
            return classList;
          });
          const sizeStyle = vue.computed(() => {
            const { size } = props;
            return isNumber(size) ? ns.cssVarBlock({
              size: addUnit(size) || ""
            }) : void 0;
          });
          const fitStyle = vue.computed(() => ({
            objectFit: props.fit
          }));
          vue.watch(() => props.src, () => hasLoadError.value = false);
          function handleError(e) {
            hasLoadError.value = true;
            emit("error", e);
          }
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("span", {
              class: vue.normalizeClass(vue.unref(avatarClass)),
              style: vue.normalizeStyle(vue.unref(sizeStyle))
            }, [
              (_ctx.src || _ctx.srcSet) && !hasLoadError.value ? (vue.openBlock(), vue.createElementBlock("img", {
                key: 0,
                src: _ctx.src,
                alt: _ctx.alt,
                srcset: _ctx.srcSet,
                style: vue.normalizeStyle(vue.unref(fitStyle)),
                onError: handleError
              }, null, 44, _hoisted_1$l)) : _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 1 }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon)))
                ]),
                _: 1
              })) : vue.renderSlot(_ctx.$slots, "default", { key: 2 })
            ], 6);
          };
        }
      });
      var Avatar = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/avatar/src/avatar.vue"]]);
      const ElAvatar = withInstall(Avatar);
      const badgeProps = buildProps({
        value: {
          type: [String, Number],
          default: ""
        },
        max: {
          type: Number,
          default: 99
        },
        isDot: Boolean,
        hidden: Boolean,
        type: {
          type: String,
          values: ["primary", "success", "warning", "info", "danger"],
          default: "danger"
        }
      });
      const _hoisted_1$k = ["textContent"];
      const __default__$8 = vue.defineComponent({
        name: "ElBadge"
      });
      const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
        ...__default__$8,
        props: badgeProps,
        setup(__props, { expose }) {
          const props = __props;
          const ns = useNamespace("badge");
          const content = vue.computed(() => {
            if (props.isDot)
              return "";
            if (isNumber(props.value) && isNumber(props.max)) {
              return props.max < props.value ? `${props.max}+` : `${props.value}`;
            }
            return `${props.value}`;
          });
          expose({
            content
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(vue.unref(ns).b())
            }, [
              vue.renderSlot(_ctx.$slots, "default"),
              vue.createVNode(vue.Transition, {
                name: `${vue.unref(ns).namespace.value}-zoom-in-center`,
                persisted: ""
              }, {
                default: vue.withCtx(() => [
                  vue.withDirectives(vue.createElementVNode("sup", {
                    class: vue.normalizeClass([
                      vue.unref(ns).e("content"),
                      vue.unref(ns).em("content", _ctx.type),
                      vue.unref(ns).is("fixed", !!_ctx.$slots.default),
                      vue.unref(ns).is("dot", _ctx.isDot)
                    ]),
                    textContent: vue.toDisplayString(vue.unref(content))
                  }, null, 10, _hoisted_1$k), [
                    [vue.vShow, !_ctx.hidden && (vue.unref(content) || _ctx.isDot)]
                  ])
                ]),
                _: 1
              }, 8, ["name"])
            ], 2);
          };
        }
      });
      var Badge = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
      const ElBadge = withInstall(Badge);
      const buttonGroupContextKey = Symbol("buttonGroupContextKey");
      const useButton = (props, emit) => {
        useDeprecated({
          from: "type.text",
          replacement: "link",
          version: "3.0.0",
          scope: "props",
          ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
        }, vue.computed(() => props.type === "text"));
        const buttonGroupContext = vue.inject(buttonGroupContextKey, void 0);
        const globalConfig2 = useGlobalConfig("button");
        const { form } = useFormItem();
        const _size = useFormSize(vue.computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
        const _disabled = useFormDisabled();
        const _ref = vue.ref();
        const slots = vue.useSlots();
        const _type = vue.computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
        const autoInsertSpace = vue.computed(() => {
          var _a2, _b, _c;
          return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.autoInsertSpace) != null ? _c : false;
        });
        const _props = vue.computed(() => {
          if (props.tag === "button") {
            return {
              ariaDisabled: _disabled.value || props.loading,
              disabled: _disabled.value || props.loading,
              autofocus: props.autofocus,
              type: props.nativeType
            };
          }
          return {};
        });
        const shouldAddSpace = vue.computed(() => {
          var _a2;
          const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
          if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
            const slot = defaultSlot[0];
            if ((slot == null ? void 0 : slot.type) === vue.Text) {
              const text = slot.children;
              return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
            }
          }
          return false;
        });
        const handleClick = (evt) => {
          if (props.nativeType === "reset") {
            form == null ? void 0 : form.resetFields();
          }
          emit("click", evt);
        };
        return {
          _disabled,
          _size,
          _type,
          _ref,
          _props,
          shouldAddSpace,
          handleClick
        };
      };
      const buttonTypes = [
        "default",
        "primary",
        "success",
        "warning",
        "info",
        "danger",
        "text",
        ""
      ];
      const buttonNativeTypes = ["button", "submit", "reset"];
      const buttonProps = buildProps({
        size: useSizeProp,
        disabled: Boolean,
        type: {
          type: String,
          values: buttonTypes,
          default: ""
        },
        icon: {
          type: iconPropType
        },
        nativeType: {
          type: String,
          values: buttonNativeTypes,
          default: "button"
        },
        loading: Boolean,
        loadingIcon: {
          type: iconPropType,
          default: () => loading_default
        },
        plain: Boolean,
        text: Boolean,
        link: Boolean,
        bg: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean,
        color: String,
        dark: Boolean,
        autoInsertSpace: {
          type: Boolean,
          default: void 0
        },
        tag: {
          type: definePropType([String, Object]),
          default: "button"
        }
      });
      const buttonEmits = {
        click: (evt) => evt instanceof MouseEvent
      };
      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = "100%";
        }
        var isPercent = isPercentage(n);
        n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
        if (isPercent) {
          n = parseInt(String(n * max), 10) / 100;
        }
        if (Math.abs(n - max) < 1e-6) {
          return 1;
        }
        if (max === 360) {
          n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
        } else {
          n = n % max / parseFloat(String(max));
        }
        return n;
      }
      function clamp01(val) {
        return Math.min(1, Math.max(0, val));
      }
      function isOnePointZero(n) {
        return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
      }
      function isPercentage(n) {
        return typeof n === "string" && n.indexOf("%") !== -1;
      }
      function boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }
        return a;
      }
      function convertToPercentage(n) {
        if (n <= 1) {
          return "".concat(Number(n) * 100, "%");
        }
        return n;
      }
      function pad2(c) {
        return c.length === 1 ? "0" + c : String(c);
      }
      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      }
      function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;
        if (max === min) {
          s = 0;
          h = 0;
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return { h, s, l };
      }
      function hue2rgb(p, q2, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1 / 6) {
          return p + (q2 - p) * (6 * t);
        }
        if (t < 1 / 2) {
          return q2;
        }
        if (t < 2 / 3) {
          return p + (q2 - p) * (2 / 3 - t) * 6;
        }
        return p;
      }
      function hslToRgb(h, s, l) {
        var r;
        var g;
        var b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);
        if (s === 0) {
          g = l;
          b = l;
          r = l;
        } else {
          var q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q2;
          r = hue2rgb(p, q2, h + 1 / 3);
          g = hue2rgb(p, q2, h);
          b = hue2rgb(p, q2, h - 1 / 3);
        }
        return { r: r * 255, g: g * 255, b: b * 255 };
      }
      function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var v = max;
        var d = max - min;
        var s = max === 0 ? 0 : d / max;
        if (max === min) {
          h = 0;
        } else {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return { h, s, v };
      }
      function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q2 = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var mod = i % 6;
        var r = [v, q2, p, p, t, v][mod];
        var g = [t, v, v, q2, p, p][mod];
        var b = [p, p, t, v, v, q2][mod];
        return { r: r * 255, g: g * 255, b: b * 255 };
      }
      function rgbToHex(r, g, b, allow3Char) {
        var hex = [
          pad2(Math.round(r).toString(16)),
          pad2(Math.round(g).toString(16)),
          pad2(Math.round(b).toString(16))
        ];
        if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join("");
      }
      function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [
          pad2(Math.round(r).toString(16)),
          pad2(Math.round(g).toString(16)),
          pad2(Math.round(b).toString(16)),
          pad2(convertDecimalToHex(a))
        ];
        if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }
        return hex.join("");
      }
      function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
      }
      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }
      function parseIntFromHex(val) {
        return parseInt(val, 16);
      }
      function numberInputToObject(color) {
        return {
          r: color >> 16,
          g: (color & 65280) >> 8,
          b: color & 255
        };
      }
      var names = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        goldenrod: "#daa520",
        gold: "#ffd700",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavenderblush: "#fff0f5",
        lavender: "#e6e6fa",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      function inputToRGB(color) {
        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;
        if (typeof color === "string") {
          color = stringInputToObject(color);
        }
        if (typeof color === "object") {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
          }
          if (Object.prototype.hasOwnProperty.call(color, "a")) {
            a = color.a;
          }
        }
        a = boundAlpha(a);
        return {
          ok,
          format: color.format || format,
          r: Math.min(255, Math.max(rgb.r, 0)),
          g: Math.min(255, Math.max(rgb.g, 0)),
          b: Math.min(255, Math.max(rgb.b, 0)),
          a
        };
      }
      var CSS_INTEGER = "[-\\+]?\\d+%?";
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
      var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
      var matchers = {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
      function stringInputToObject(color) {
        color = color.trim().toLowerCase();
        if (color.length === 0) {
          return false;
        }
        var named = false;
        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color === "transparent") {
          return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }
        var match = matchers.rgb.exec(color);
        if (match) {
          return { r: match[1], g: match[2], b: match[3] };
        }
        match = matchers.rgba.exec(color);
        if (match) {
          return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        match = matchers.hsl.exec(color);
        if (match) {
          return { h: match[1], s: match[2], l: match[3] };
        }
        match = matchers.hsla.exec(color);
        if (match) {
          return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        match = matchers.hsv.exec(color);
        if (match) {
          return { h: match[1], s: match[2], v: match[3] };
        }
        match = matchers.hsva.exec(color);
        if (match) {
          return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        match = matchers.hex8.exec(color);
        if (match) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
          };
        }
        match = matchers.hex6.exec(color);
        if (match) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
          };
        }
        match = matchers.hex4.exec(color);
        if (match) {
          return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? "name" : "hex8"
          };
        }
        match = matchers.hex3.exec(color);
        if (match) {
          return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? "name" : "hex"
          };
        }
        return false;
      }
      function isValidCSSUnit(color) {
        return Boolean(matchers.CSS_UNIT.exec(String(color)));
      }
      var TinyColor = (
        /** @class */
        function() {
          function TinyColor2(color, opts) {
            if (color === void 0) {
              color = "";
            }
            if (opts === void 0) {
              opts = {};
            }
            var _a2;
            if (color instanceof TinyColor2) {
              return color;
            }
            if (typeof color === "number") {
              color = numberInputToObject(color);
            }
            this.originalInput = color;
            var rgb = inputToRGB(color);
            this.originalInput = color;
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
            this.a = rgb.a;
            this.roundA = Math.round(100 * this.a) / 100;
            this.format = (_a2 = opts.format) !== null && _a2 !== void 0 ? _a2 : rgb.format;
            this.gradientType = opts.gradientType;
            if (this.r < 1) {
              this.r = Math.round(this.r);
            }
            if (this.g < 1) {
              this.g = Math.round(this.g);
            }
            if (this.b < 1) {
              this.b = Math.round(this.b);
            }
            this.isValid = rgb.ok;
          }
          TinyColor2.prototype.isDark = function() {
            return this.getBrightness() < 128;
          };
          TinyColor2.prototype.isLight = function() {
            return !this.isDark();
          };
          TinyColor2.prototype.getBrightness = function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
          };
          TinyColor2.prototype.getLuminance = function() {
            var rgb = this.toRgb();
            var R2;
            var G2;
            var B2;
            var RsRGB = rgb.r / 255;
            var GsRGB = rgb.g / 255;
            var BsRGB = rgb.b / 255;
            if (RsRGB <= 0.03928) {
              R2 = RsRGB / 12.92;
            } else {
              R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
            }
            if (GsRGB <= 0.03928) {
              G2 = GsRGB / 12.92;
            } else {
              G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
            }
            if (BsRGB <= 0.03928) {
              B2 = BsRGB / 12.92;
            } else {
              B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
            }
            return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
          };
          TinyColor2.prototype.getAlpha = function() {
            return this.a;
          };
          TinyColor2.prototype.setAlpha = function(alpha) {
            this.a = boundAlpha(alpha);
            this.roundA = Math.round(100 * this.a) / 100;
            return this;
          };
          TinyColor2.prototype.isMonochrome = function() {
            var s = this.toHsl().s;
            return s === 0;
          };
          TinyColor2.prototype.toHsv = function() {
            var hsv = rgbToHsv(this.r, this.g, this.b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
          };
          TinyColor2.prototype.toHsvString = function() {
            var hsv = rgbToHsv(this.r, this.g, this.b);
            var h = Math.round(hsv.h * 360);
            var s = Math.round(hsv.s * 100);
            var v = Math.round(hsv.v * 100);
            return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
          };
          TinyColor2.prototype.toHsl = function() {
            var hsl = rgbToHsl(this.r, this.g, this.b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
          };
          TinyColor2.prototype.toHslString = function() {
            var hsl = rgbToHsl(this.r, this.g, this.b);
            var h = Math.round(hsl.h * 360);
            var s = Math.round(hsl.s * 100);
            var l = Math.round(hsl.l * 100);
            return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
          };
          TinyColor2.prototype.toHex = function(allow3Char) {
            if (allow3Char === void 0) {
              allow3Char = false;
            }
            return rgbToHex(this.r, this.g, this.b, allow3Char);
          };
          TinyColor2.prototype.toHexString = function(allow3Char) {
            if (allow3Char === void 0) {
              allow3Char = false;
            }
            return "#" + this.toHex(allow3Char);
          };
          TinyColor2.prototype.toHex8 = function(allow4Char) {
            if (allow4Char === void 0) {
              allow4Char = false;
            }
            return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
          };
          TinyColor2.prototype.toHex8String = function(allow4Char) {
            if (allow4Char === void 0) {
              allow4Char = false;
            }
            return "#" + this.toHex8(allow4Char);
          };
          TinyColor2.prototype.toHexShortString = function(allowShortChar) {
            if (allowShortChar === void 0) {
              allowShortChar = false;
            }
            return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
          };
          TinyColor2.prototype.toRgb = function() {
            return {
              r: Math.round(this.r),
              g: Math.round(this.g),
              b: Math.round(this.b),
              a: this.a
            };
          };
          TinyColor2.prototype.toRgbString = function() {
            var r = Math.round(this.r);
            var g = Math.round(this.g);
            var b = Math.round(this.b);
            return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
          };
          TinyColor2.prototype.toPercentageRgb = function() {
            var fmt = function(x) {
              return "".concat(Math.round(bound01(x, 255) * 100), "%");
            };
            return {
              r: fmt(this.r),
              g: fmt(this.g),
              b: fmt(this.b),
              a: this.a
            };
          };
          TinyColor2.prototype.toPercentageRgbString = function() {
            var rnd = function(x) {
              return Math.round(bound01(x, 255) * 100);
            };
            return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
          };
          TinyColor2.prototype.toName = function() {
            if (this.a === 0) {
              return "transparent";
            }
            if (this.a < 1) {
              return false;
            }
            var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
            for (var _i = 0, _a2 = Object.entries(names); _i < _a2.length; _i++) {
              var _b = _a2[_i], key = _b[0], value = _b[1];
              if (hex === value) {
                return key;
              }
            }
            return false;
          };
          TinyColor2.prototype.toString = function(format) {
            var formatSet = Boolean(format);
            format = format !== null && format !== void 0 ? format : this.format;
            var formattedString = false;
            var hasAlpha = this.a < 1 && this.a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
            if (needsAlphaFormat) {
              if (format === "name" && this.a === 0) {
                return this.toName();
              }
              return this.toRgbString();
            }
            if (format === "rgb") {
              formattedString = this.toRgbString();
            }
            if (format === "prgb") {
              formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
              formattedString = this.toHexString();
            }
            if (format === "hex3") {
              formattedString = this.toHexString(true);
            }
            if (format === "hex4") {
              formattedString = this.toHex8String(true);
            }
            if (format === "hex8") {
              formattedString = this.toHex8String();
            }
            if (format === "name") {
              formattedString = this.toName();
            }
            if (format === "hsl") {
              formattedString = this.toHslString();
            }
            if (format === "hsv") {
              formattedString = this.toHsvString();
            }
            return formattedString || this.toHexString();
          };
          TinyColor2.prototype.toNumber = function() {
            return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
          };
          TinyColor2.prototype.clone = function() {
            return new TinyColor2(this.toString());
          };
          TinyColor2.prototype.lighten = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            var hsl = this.toHsl();
            hsl.l += amount / 100;
            hsl.l = clamp01(hsl.l);
            return new TinyColor2(hsl);
          };
          TinyColor2.prototype.brighten = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            var rgb = this.toRgb();
            rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
            rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
            rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
            return new TinyColor2(rgb);
          };
          TinyColor2.prototype.darken = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            var hsl = this.toHsl();
            hsl.l -= amount / 100;
            hsl.l = clamp01(hsl.l);
            return new TinyColor2(hsl);
          };
          TinyColor2.prototype.tint = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            return this.mix("white", amount);
          };
          TinyColor2.prototype.shade = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            return this.mix("black", amount);
          };
          TinyColor2.prototype.desaturate = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            var hsl = this.toHsl();
            hsl.s -= amount / 100;
            hsl.s = clamp01(hsl.s);
            return new TinyColor2(hsl);
          };
          TinyColor2.prototype.saturate = function(amount) {
            if (amount === void 0) {
              amount = 10;
            }
            var hsl = this.toHsl();
            hsl.s += amount / 100;
            hsl.s = clamp01(hsl.s);
            return new TinyColor2(hsl);
          };
          TinyColor2.prototype.greyscale = function() {
            return this.desaturate(100);
          };
          TinyColor2.prototype.spin = function(amount) {
            var hsl = this.toHsl();
            var hue = (hsl.h + amount) % 360;
            hsl.h = hue < 0 ? 360 + hue : hue;
            return new TinyColor2(hsl);
          };
          TinyColor2.prototype.mix = function(color, amount) {
            if (amount === void 0) {
              amount = 50;
            }
            var rgb1 = this.toRgb();
            var rgb2 = new TinyColor2(color).toRgb();
            var p = amount / 100;
            var rgba = {
              r: (rgb2.r - rgb1.r) * p + rgb1.r,
              g: (rgb2.g - rgb1.g) * p + rgb1.g,
              b: (rgb2.b - rgb1.b) * p + rgb1.b,
              a: (rgb2.a - rgb1.a) * p + rgb1.a
            };
            return new TinyColor2(rgba);
          };
          TinyColor2.prototype.analogous = function(results, slices) {
            if (results === void 0) {
              results = 6;
            }
            if (slices === void 0) {
              slices = 30;
            }
            var hsl = this.toHsl();
            var part = 360 / slices;
            var ret = [this];
            for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
              hsl.h = (hsl.h + part) % 360;
              ret.push(new TinyColor2(hsl));
            }
            return ret;
          };
          TinyColor2.prototype.complement = function() {
            var hsl = this.toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return new TinyColor2(hsl);
          };
          TinyColor2.prototype.monochromatic = function(results) {
            if (results === void 0) {
              results = 6;
            }
            var hsv = this.toHsv();
            var h = hsv.h;
            var s = hsv.s;
            var v = hsv.v;
            var res = [];
            var modification = 1 / results;
            while (results--) {
              res.push(new TinyColor2({ h, s, v }));
              v = (v + modification) % 1;
            }
            return res;
          };
          TinyColor2.prototype.splitcomplement = function() {
            var hsl = this.toHsl();
            var h = hsl.h;
            return [
              this,
              new TinyColor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
              new TinyColor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
            ];
          };
          TinyColor2.prototype.onBackground = function(background) {
            var fg = this.toRgb();
            var bg = new TinyColor2(background).toRgb();
            var alpha = fg.a + bg.a * (1 - fg.a);
            return new TinyColor2({
              r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
              g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
              b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
              a: alpha
            });
          };
          TinyColor2.prototype.triad = function() {
            return this.polyad(3);
          };
          TinyColor2.prototype.tetrad = function() {
            return this.polyad(4);
          };
          TinyColor2.prototype.polyad = function(n) {
            var hsl = this.toHsl();
            var h = hsl.h;
            var result = [this];
            var increment = 360 / n;
            for (var i = 1; i < n; i++) {
              result.push(new TinyColor2({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
            }
            return result;
          };
          TinyColor2.prototype.equals = function(color) {
            return this.toRgbString() === new TinyColor2(color).toRgbString();
          };
          return TinyColor2;
        }()
      );
      function darken(color, amount = 20) {
        return color.mix("#141414", amount).toString();
      }
      function useButtonCustomStyle(props) {
        const _disabled = useFormDisabled();
        const ns = useNamespace("button");
        return vue.computed(() => {
          let styles = {};
          const buttonColor = props.color;
          if (buttonColor) {
            const color = new TinyColor(buttonColor);
            const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
            if (props.plain) {
              styles = ns.cssVarBlock({
                "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
                "text-color": buttonColor,
                "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
                "hover-text-color": `var(${ns.cssVarName("color-white")})`,
                "hover-bg-color": buttonColor,
                "hover-border-color": buttonColor,
                "active-bg-color": activeBgColor,
                "active-text-color": `var(${ns.cssVarName("color-white")})`,
                "active-border-color": activeBgColor
              });
              if (_disabled.value) {
                styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
                styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
                styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
              }
            } else {
              const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
              const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
              styles = ns.cssVarBlock({
                "bg-color": buttonColor,
                "text-color": textColor,
                "border-color": buttonColor,
                "hover-bg-color": hoverBgColor,
                "hover-text-color": textColor,
                "hover-border-color": hoverBgColor,
                "active-bg-color": activeBgColor,
                "active-border-color": activeBgColor
              });
              if (_disabled.value) {
                const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
                styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
                styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
                styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
              }
            }
          }
          return styles;
        });
      }
      const __default__$7 = vue.defineComponent({
        name: "ElButton"
      });
      const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
        ...__default__$7,
        props: buttonProps,
        emits: buttonEmits,
        setup(__props, { expose, emit }) {
          const props = __props;
          const buttonStyle = useButtonCustomStyle(props);
          const ns = useNamespace("button");
          const { _ref, _size, _type, _disabled, _props, shouldAddSpace, handleClick } = useButton(props, emit);
          expose({
            ref: _ref,
            size: _size,
            type: _type,
            disabled: _disabled,
            shouldAddSpace
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps({
              ref_key: "_ref",
              ref: _ref
            }, vue.unref(_props), {
              class: [
                vue.unref(ns).b(),
                vue.unref(ns).m(vue.unref(_type)),
                vue.unref(ns).m(vue.unref(_size)),
                vue.unref(ns).is("disabled", vue.unref(_disabled)),
                vue.unref(ns).is("loading", _ctx.loading),
                vue.unref(ns).is("plain", _ctx.plain),
                vue.unref(ns).is("round", _ctx.round),
                vue.unref(ns).is("circle", _ctx.circle),
                vue.unref(ns).is("text", _ctx.text),
                vue.unref(ns).is("link", _ctx.link),
                vue.unref(ns).is("has-bg", _ctx.bg)
              ],
              style: vue.unref(buttonStyle),
              onClick: vue.unref(handleClick)
            }), {
              default: vue.withCtx(() => [
                _ctx.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }) : (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 1,
                    class: vue.normalizeClass(vue.unref(ns).is("loading"))
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.loadingIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"]))
                ], 64)) : _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 1 }, {
                  default: vue.withCtx(() => [
                    _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon), { key: 0 })) : vue.renderSlot(_ctx.$slots, "icon", { key: 1 })
                  ]),
                  _: 3
                })) : vue.createCommentVNode("v-if", true),
                _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 2,
                  class: vue.normalizeClass({ [vue.unref(ns).em("text", "expand")]: vue.unref(shouldAddSpace) })
                }, [
                  vue.renderSlot(_ctx.$slots, "default")
                ], 2)) : vue.createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 16, ["class", "style", "onClick"]);
          };
        }
      });
      var Button = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
      const buttonGroupProps = {
        size: buttonProps.size,
        type: buttonProps.type
      };
      const __default__$6 = vue.defineComponent({
        name: "ElButtonGroup"
      });
      const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
        ...__default__$6,
        props: buttonGroupProps,
        setup(__props) {
          const props = __props;
          vue.provide(buttonGroupContextKey, vue.reactive({
            size: vue.toRef(props, "size"),
            type: vue.toRef(props, "type")
          }));
          const ns = useNamespace("button");
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(`${vue.unref(ns).b("group")}`)
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 2);
          };
        }
      });
      var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
      const ElButton = withInstall(Button, {
        ButtonGroup
      });
      withNoopInstall(ButtonGroup);
      var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
      }
      var dayjs_min = { exports: {} };
      (function(module2, exports2) {
        !function(t, e) {
          module2.exports = e();
        }(commonjsGlobal, function() {
          var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
            var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
            return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
          } }, m = function(t2, e2, n2) {
            var r2 = String(t2);
            return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
          }, v = { s: m, z: function(t2) {
            var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
            return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
          }, m: function t2(e2, n2) {
            if (e2.date() < n2.date())
              return -t2(n2, e2);
            var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
            return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
          }, a: function(t2) {
            return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
          }, p: function(t2) {
            return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
          }, u: function(t2) {
            return void 0 === t2;
          } }, g = "en", D = {};
          D[g] = M;
          var p = function(t2) {
            return t2 instanceof b;
          }, S = function t2(e2, n2, r2) {
            var i2;
            if (!e2)
              return g;
            if ("string" == typeof e2) {
              var s2 = e2.toLowerCase();
              D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
              var u2 = e2.split("-");
              if (!i2 && u2.length > 1)
                return t2(u2[0]);
            } else {
              var a2 = e2.name;
              D[a2] = e2, i2 = a2;
            }
            return !r2 && i2 && (g = i2), i2 || !r2 && g;
          }, w = function(t2, e2) {
            if (p(t2))
              return t2.clone();
            var n2 = "object" == typeof e2 ? e2 : {};
            return n2.date = t2, n2.args = arguments, new b(n2);
          }, O = v;
          O.l = S, O.i = p, O.w = function(t2, e2) {
            return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
          };
          var b = function() {
            function M2(t2) {
              this.$L = S(t2.locale, null, true), this.parse(t2);
            }
            var m2 = M2.prototype;
            return m2.parse = function(t2) {
              this.$d = function(t3) {
                var e2 = t3.date, n2 = t3.utc;
                if (null === e2)
                  return /* @__PURE__ */ new Date(NaN);
                if (O.u(e2))
                  return /* @__PURE__ */ new Date();
                if (e2 instanceof Date)
                  return new Date(e2);
                if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                  var r2 = e2.match($);
                  if (r2) {
                    var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                    return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                  }
                }
                return new Date(e2);
              }(t2), this.$x = t2.x || {}, this.init();
            }, m2.init = function() {
              var t2 = this.$d;
              this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
            }, m2.$utils = function() {
              return O;
            }, m2.isValid = function() {
              return !(this.$d.toString() === l);
            }, m2.isSame = function(t2, e2) {
              var n2 = w(t2);
              return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
            }, m2.isAfter = function(t2, e2) {
              return w(t2) < this.startOf(e2);
            }, m2.isBefore = function(t2, e2) {
              return this.endOf(e2) < w(t2);
            }, m2.$g = function(t2, e2, n2) {
              return O.u(t2) ? this[e2] : this.set(n2, t2);
            }, m2.unix = function() {
              return Math.floor(this.valueOf() / 1e3);
            }, m2.valueOf = function() {
              return this.$d.getTime();
            }, m2.startOf = function(t2, e2) {
              var n2 = this, r2 = !!O.u(e2) || e2, f2 = O.p(t2), l2 = function(t3, e3) {
                var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
                return r2 ? i2 : i2.endOf(a);
              }, $2 = function(t3, e3) {
                return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
              }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
              switch (f2) {
                case h:
                  return r2 ? l2(1, 0) : l2(31, 11);
                case c:
                  return r2 ? l2(1, M3) : l2(0, M3 + 1);
                case o:
                  var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                  return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
                case a:
                case d:
                  return $2(v2 + "Hours", 0);
                case u:
                  return $2(v2 + "Minutes", 1);
                case s:
                  return $2(v2 + "Seconds", 2);
                case i:
                  return $2(v2 + "Milliseconds", 3);
                default:
                  return this.clone();
              }
            }, m2.endOf = function(t2) {
              return this.startOf(t2, false);
            }, m2.$set = function(t2, e2) {
              var n2, o2 = O.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
              if (o2 === c || o2 === h) {
                var y2 = this.clone().set(d, 1);
                y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
              } else
                l2 && this.$d[l2]($2);
              return this.init(), this;
            }, m2.set = function(t2, e2) {
              return this.clone().$set(t2, e2);
            }, m2.get = function(t2) {
              return this[O.p(t2)]();
            }, m2.add = function(r2, f2) {
              var d2, l2 = this;
              r2 = Number(r2);
              var $2 = O.p(f2), y2 = function(t2) {
                var e2 = w(l2);
                return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
              };
              if ($2 === c)
                return this.set(c, this.$M + r2);
              if ($2 === h)
                return this.set(h, this.$y + r2);
              if ($2 === a)
                return y2(1);
              if ($2 === o)
                return y2(7);
              var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
              return O.w(m3, this);
            }, m2.subtract = function(t2, e2) {
              return this.add(-1 * t2, e2);
            }, m2.format = function(t2) {
              var e2 = this, n2 = this.$locale();
              if (!this.isValid())
                return n2.invalidDate || l;
              var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
                return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
              }, d2 = function(t3) {
                return O.s(s2 % 12 || 12, t3, "0");
              }, $2 = f2 || function(t3, e3, n3) {
                var r3 = t3 < 12 ? "AM" : "PM";
                return n3 ? r3.toLowerCase() : r3;
              };
              return r2.replace(y, function(t3, r3) {
                return r3 || function(t4) {
                  switch (t4) {
                    case "YY":
                      return String(e2.$y).slice(-2);
                    case "YYYY":
                      return O.s(e2.$y, 4, "0");
                    case "M":
                      return a2 + 1;
                    case "MM":
                      return O.s(a2 + 1, 2, "0");
                    case "MMM":
                      return h2(n2.monthsShort, a2, c2, 3);
                    case "MMMM":
                      return h2(c2, a2);
                    case "D":
                      return e2.$D;
                    case "DD":
                      return O.s(e2.$D, 2, "0");
                    case "d":
                      return String(e2.$W);
                    case "dd":
                      return h2(n2.weekdaysMin, e2.$W, o2, 2);
                    case "ddd":
                      return h2(n2.weekdaysShort, e2.$W, o2, 3);
                    case "dddd":
                      return o2[e2.$W];
                    case "H":
                      return String(s2);
                    case "HH":
                      return O.s(s2, 2, "0");
                    case "h":
                      return d2(1);
                    case "hh":
                      return d2(2);
                    case "a":
                      return $2(s2, u2, true);
                    case "A":
                      return $2(s2, u2, false);
                    case "m":
                      return String(u2);
                    case "mm":
                      return O.s(u2, 2, "0");
                    case "s":
                      return String(e2.$s);
                    case "ss":
                      return O.s(e2.$s, 2, "0");
                    case "SSS":
                      return O.s(e2.$ms, 3, "0");
                    case "Z":
                      return i2;
                  }
                  return null;
                }(t3) || i2.replace(":", "");
              });
            }, m2.utcOffset = function() {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, m2.diff = function(r2, d2, l2) {
              var $2, y2 = this, M3 = O.p(d2), m3 = w(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
                return O.m(y2, m3);
              };
              switch (M3) {
                case h:
                  $2 = D2() / 12;
                  break;
                case c:
                  $2 = D2();
                  break;
                case f:
                  $2 = D2() / 3;
                  break;
                case o:
                  $2 = (g2 - v2) / 6048e5;
                  break;
                case a:
                  $2 = (g2 - v2) / 864e5;
                  break;
                case u:
                  $2 = g2 / n;
                  break;
                case s:
                  $2 = g2 / e;
                  break;
                case i:
                  $2 = g2 / t;
                  break;
                default:
                  $2 = g2;
              }
              return l2 ? $2 : O.a($2);
            }, m2.daysInMonth = function() {
              return this.endOf(c).$D;
            }, m2.$locale = function() {
              return D[this.$L];
            }, m2.locale = function(t2, e2) {
              if (!t2)
                return this.$L;
              var n2 = this.clone(), r2 = S(t2, e2, true);
              return r2 && (n2.$L = r2), n2;
            }, m2.clone = function() {
              return O.w(this.$d, this);
            }, m2.toDate = function() {
              return new Date(this.valueOf());
            }, m2.toJSON = function() {
              return this.isValid() ? this.toISOString() : null;
            }, m2.toISOString = function() {
              return this.$d.toISOString();
            }, m2.toString = function() {
              return this.$d.toUTCString();
            }, M2;
          }(), _ = b.prototype;
          return w.prototype = _, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
            _[t2[1]] = function(e2) {
              return this.$g(e2, t2[0], t2[1]);
            };
          }), w.extend = function(t2, e2) {
            return t2.$i || (t2(e2, b, w), t2.$i = true), w;
          }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
            return w(1e3 * t2);
          }, w.en = D[g], w.Ls = D, w.p = {}, w;
        });
      })(dayjs_min);
      var dayjs_minExports = dayjs_min.exports;
      const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
      var customParseFormat$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, t) {
          module2.exports = t();
        }(commonjsGlobal, function() {
          var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d\d/, r = /\d\d?/, i = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e2) {
            return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
          };
          var a = function(e2) {
            return function(t2) {
              this[e2] = +t2;
            };
          }, f = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
            (this.zone || (this.zone = {})).offset = function(e3) {
              if (!e3)
                return 0;
              if ("Z" === e3)
                return 0;
              var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
              return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
            }(e2);
          }], h = function(e2) {
            var t2 = o[e2];
            return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
          }, u = function(e2, t2) {
            var n2, r2 = o.meridiem;
            if (r2) {
              for (var i2 = 1; i2 <= 24; i2 += 1)
                if (e2.indexOf(r2(i2, 0, t2)) > -1) {
                  n2 = i2 > 12;
                  break;
                }
            } else
              n2 = e2 === (t2 ? "pm" : "PM");
            return n2;
          }, d = { A: [i, function(e2) {
            this.afternoon = u(e2, false);
          }], a: [i, function(e2) {
            this.afternoon = u(e2, true);
          }], S: [/\d/, function(e2) {
            this.milliseconds = 100 * +e2;
          }], SS: [n, function(e2) {
            this.milliseconds = 10 * +e2;
          }], SSS: [/\d{3}/, function(e2) {
            this.milliseconds = +e2;
          }], s: [r, a("seconds")], ss: [r, a("seconds")], m: [r, a("minutes")], mm: [r, a("minutes")], H: [r, a("hours")], h: [r, a("hours")], HH: [r, a("hours")], hh: [r, a("hours")], D: [r, a("day")], DD: [n, a("day")], Do: [i, function(e2) {
            var t2 = o.ordinal, n2 = e2.match(/\d+/);
            if (this.day = n2[0], t2)
              for (var r2 = 1; r2 <= 31; r2 += 1)
                t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
          }], M: [r, a("month")], MM: [n, a("month")], MMM: [i, function(e2) {
            var t2 = h("months"), n2 = (h("monthsShort") || t2.map(function(e3) {
              return e3.slice(0, 3);
            })).indexOf(e2) + 1;
            if (n2 < 1)
              throw new Error();
            this.month = n2 % 12 || n2;
          }], MMMM: [i, function(e2) {
            var t2 = h("months").indexOf(e2) + 1;
            if (t2 < 1)
              throw new Error();
            this.month = t2 % 12 || t2;
          }], Y: [/[+-]?\d+/, a("year")], YY: [n, function(e2) {
            this.year = s(e2);
          }], YYYY: [/\d{4}/, a("year")], Z: f, ZZ: f };
          function c(n2) {
            var r2, i2;
            r2 = n2, i2 = o && o.formats;
            for (var s2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t2, n3, r3) {
              var o2 = r3 && r3.toUpperCase();
              return n3 || i2[r3] || e[r3] || i2[o2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t3, n4) {
                return t3 || n4.slice(1);
              });
            })).match(t), a2 = s2.length, f2 = 0; f2 < a2; f2 += 1) {
              var h2 = s2[f2], u2 = d[h2], c2 = u2 && u2[0], l = u2 && u2[1];
              s2[f2] = l ? { regex: c2, parser: l } : h2.replace(/^\[|\]$/g, "");
            }
            return function(e2) {
              for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
                var i3 = s2[n3];
                if ("string" == typeof i3)
                  r3 += i3.length;
                else {
                  var o2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = o2.exec(h3)[0];
                  f3.call(t2, u3), e2 = e2.replace(u3, "");
                }
              }
              return function(e3) {
                var t3 = e3.afternoon;
                if (void 0 !== t3) {
                  var n4 = e3.hours;
                  t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
                }
              }(t2), t2;
            };
          }
          return function(e2, t2, n2) {
            n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (s = e2.parseTwoDigitYear);
            var r2 = t2.prototype, i2 = r2.parse;
            r2.parse = function(e3) {
              var t3 = e3.date, r3 = e3.utc, s2 = e3.args;
              this.$u = r3;
              var a2 = s2[1];
              if ("string" == typeof a2) {
                var f2 = true === s2[2], h2 = true === s2[3], u2 = f2 || h2, d2 = s2[2];
                h2 && (d2 = s2[2]), o = this.$locale(), !f2 && d2 && (o = n2.Ls[d2]), this.$d = function(e4, t4, n3) {
                  try {
                    if (["x", "X"].indexOf(t4) > -1)
                      return new Date(("X" === t4 ? 1e3 : 1) * e4);
                    var r4 = c(t4)(e4), i3 = r4.year, o2 = r4.month, s3 = r4.day, a3 = r4.hours, f3 = r4.minutes, h3 = r4.seconds, u3 = r4.milliseconds, d3 = r4.zone, l2 = /* @__PURE__ */ new Date(), m2 = s3 || (i3 || o2 ? 1 : l2.getDate()), M2 = i3 || l2.getFullYear(), Y = 0;
                    i3 && !o2 || (Y = o2 > 0 ? o2 - 1 : l2.getMonth());
                    var p = a3 || 0, v = f3 || 0, D = h3 || 0, g = u3 || 0;
                    return d3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g + 60 * d3.offset * 1e3)) : n3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g)) : new Date(M2, Y, m2, p, v, D, g);
                  } catch (e5) {
                    return /* @__PURE__ */ new Date("");
                  }
                }(t3, a2, r3), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
              } else if (a2 instanceof Array)
                for (var l = a2.length, m = 1; m <= l; m += 1) {
                  s2[1] = a2[m - 1];
                  var M = n2.apply(this, s2);
                  if (M.isValid()) {
                    this.$d = M.$d, this.$L = M.$L, this.init();
                    break;
                  }
                  m === l && (this.$d = /* @__PURE__ */ new Date(""));
                }
              else
                i2.call(this, e3);
            };
          };
        });
      })(customParseFormat$1);
      var customParseFormatExports = customParseFormat$1.exports;
      const customParseFormat = /* @__PURE__ */ getDefaultExportFromCjs(customParseFormatExports);
      const timeUnits = ["hours", "minutes", "seconds"];
      const DEFAULT_FORMATS_TIME = "HH:mm:ss";
      const DEFAULT_FORMATS_DATE = "YYYY-MM-DD";
      const DEFAULT_FORMATS_DATEPICKER = {
        date: DEFAULT_FORMATS_DATE,
        dates: DEFAULT_FORMATS_DATE,
        week: "gggg[w]ww",
        year: "YYYY",
        month: "YYYY-MM",
        datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
        monthrange: "YYYY-MM",
        daterange: DEFAULT_FORMATS_DATE,
        datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`
      };
      const buildTimeList = (value, bound) => {
        return [
          value > 0 ? value - 1 : void 0,
          value,
          value < bound ? value + 1 : void 0
        ];
      };
      const rangeArr = (n) => Array.from(Array.from({ length: n }).keys());
      const extractDateFormat = (format) => {
        return format.replace(/\W?m{1,2}|\W?ZZ/g, "").replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "").trim();
      };
      const extractTimeFormat = (format) => {
        return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, "").trim();
      };
      const dateEquals = function(a, b) {
        const aIsDate = isDate(a);
        const bIsDate = isDate(b);
        if (aIsDate && bIsDate) {
          return a.getTime() === b.getTime();
        }
        if (!aIsDate && !bIsDate) {
          return a === b;
        }
        return false;
      };
      const valueEquals = function(a, b) {
        const aIsArray = isArray$2(a);
        const bIsArray = isArray$2(b);
        if (aIsArray && bIsArray) {
          if (a.length !== b.length) {
            return false;
          }
          return a.every((item, index) => dateEquals(item, b[index]));
        }
        if (!aIsArray && !bIsArray) {
          return dateEquals(a, b);
        }
        return false;
      };
      const parseDate = function(date2, format, lang) {
        const day = isEmpty(format) || format === "x" ? dayjs(date2).locale(lang) : dayjs(date2, format).locale(lang);
        return day.isValid() ? day : void 0;
      };
      const formatter = function(date2, format, lang) {
        if (isEmpty(format))
          return date2;
        if (format === "x")
          return +date2;
        return dayjs(date2).locale(lang).format(format);
      };
      const makeList = (total, method) => {
        var _a2;
        const arr = [];
        const disabledArr = method == null ? void 0 : method();
        for (let i = 0; i < total; i++) {
          arr.push((_a2 = disabledArr == null ? void 0 : disabledArr.includes(i)) != null ? _a2 : false);
        }
        return arr;
      };
      const disabledTimeListsProps = buildProps({
        disabledHours: {
          type: definePropType(Function)
        },
        disabledMinutes: {
          type: definePropType(Function)
        },
        disabledSeconds: {
          type: definePropType(Function)
        }
      });
      const timePanelSharedProps = buildProps({
        visible: Boolean,
        actualVisible: {
          type: Boolean,
          default: void 0
        },
        format: {
          type: String,
          default: ""
        }
      });
      const timePickerDefaultProps = buildProps({
        id: {
          type: definePropType([Array, String])
        },
        name: {
          type: definePropType([Array, String]),
          default: ""
        },
        popperClass: {
          type: String,
          default: ""
        },
        format: String,
        valueFormat: String,
        type: {
          type: String,
          default: ""
        },
        clearable: {
          type: Boolean,
          default: true
        },
        clearIcon: {
          type: definePropType([String, Object]),
          default: circle_close_default
        },
        editable: {
          type: Boolean,
          default: true
        },
        prefixIcon: {
          type: definePropType([String, Object]),
          default: ""
        },
        size: useSizeProp,
        readonly: {
          type: Boolean,
          default: false
        },
        disabled: {
          type: Boolean,
          default: false
        },
        placeholder: {
          type: String,
          default: ""
        },
        popperOptions: {
          type: definePropType(Object),
          default: () => ({})
        },
        modelValue: {
          type: definePropType([Date, Array, String, Number]),
          default: ""
        },
        rangeSeparator: {
          type: String,
          default: "-"
        },
        startPlaceholder: String,
        endPlaceholder: String,
        defaultValue: {
          type: definePropType([Date, Array])
        },
        defaultTime: {
          type: definePropType([Date, Array])
        },
        isRange: {
          type: Boolean,
          default: false
        },
        ...disabledTimeListsProps,
        disabledDate: {
          type: Function
        },
        cellClassName: {
          type: Function
        },
        shortcuts: {
          type: Array,
          default: () => []
        },
        arrowControl: {
          type: Boolean,
          default: false
        },
        label: {
          type: String,
          default: void 0
        },
        tabindex: {
          type: definePropType([String, Number]),
          default: 0
        },
        validateEvent: {
          type: Boolean,
          default: true
        },
        unlinkPanels: Boolean
      });
      const _hoisted_1$j = ["id", "name", "placeholder", "value", "disabled", "readonly"];
      const _hoisted_2$h = ["id", "name", "placeholder", "value", "disabled", "readonly"];
      const __default__$5 = vue.defineComponent({
        name: "Picker"
      });
      const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
        ...__default__$5,
        props: timePickerDefaultProps,
        emits: [
          "update:modelValue",
          "change",
          "focus",
          "blur",
          "calendar-change",
          "panel-change",
          "visible-change",
          "keydown"
        ],
        setup(__props, { expose, emit }) {
          const props = __props;
          const attrs = vue.useAttrs();
          const { lang } = useLocale();
          const nsDate = useNamespace("date");
          const nsInput = useNamespace("input");
          const nsRange = useNamespace("range");
          const { form, formItem } = useFormItem();
          const elPopperOptions = vue.inject("ElPopperOptions", {});
          const refPopper = vue.ref();
          const inputRef = vue.ref();
          const pickerVisible = vue.ref(false);
          const pickerActualVisible = vue.ref(false);
          const valueOnOpen = vue.ref(null);
          let hasJustTabExitedInput = false;
          let ignoreFocusEvent = false;
          const rangeInputKls = vue.computed(() => [
            nsDate.b("editor"),
            nsDate.bm("editor", props.type),
            nsInput.e("wrapper"),
            nsDate.is("disabled", pickerDisabled.value),
            nsDate.is("active", pickerVisible.value),
            nsRange.b("editor"),
            pickerSize ? nsRange.bm("editor", pickerSize.value) : "",
            attrs.class
          ]);
          const clearIconKls = vue.computed(() => [
            nsInput.e("icon"),
            nsRange.e("close-icon"),
            !showClose.value ? nsRange.e("close-icon--hidden") : ""
          ]);
          vue.watch(pickerVisible, (val) => {
            if (!val) {
              userInput.value = null;
              vue.nextTick(() => {
                emitChange(props.modelValue);
              });
            } else {
              vue.nextTick(() => {
                if (val) {
                  valueOnOpen.value = props.modelValue;
                }
              });
            }
          });
          const emitChange = (val, isClear) => {
            if (isClear || !valueEquals(val, valueOnOpen.value)) {
              emit("change", val);
              props.validateEvent && (formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn()));
            }
          };
          const emitInput = (input) => {
            if (!valueEquals(props.modelValue, input)) {
              let formatted;
              if (isArray$2(input)) {
                formatted = input.map((item) => formatter(item, props.valueFormat, lang.value));
              } else if (input) {
                formatted = formatter(input, props.valueFormat, lang.value);
              }
              emit("update:modelValue", input ? formatted : input, lang.value);
            }
          };
          const emitKeydown = (e) => {
            emit("keydown", e);
          };
          const refInput = vue.computed(() => {
            if (inputRef.value) {
              const _r = isRangeInput.value ? inputRef.value : inputRef.value.$el;
              return Array.from(_r.querySelectorAll("input"));
            }
            return [];
          });
          const setSelectionRange = (start, end, pos) => {
            const _inputs = refInput.value;
            if (!_inputs.length)
              return;
            if (!pos || pos === "min") {
              _inputs[0].setSelectionRange(start, end);
              _inputs[0].focus();
            } else if (pos === "max") {
              _inputs[1].setSelectionRange(start, end);
              _inputs[1].focus();
            }
          };
          const focusOnInputBox = () => {
            focus(true, true);
            vue.nextTick(() => {
              ignoreFocusEvent = false;
            });
          };
          const onPick = (date2 = "", visible = false) => {
            if (!visible) {
              ignoreFocusEvent = true;
            }
            pickerVisible.value = visible;
            let result;
            if (isArray$2(date2)) {
              result = date2.map((_) => _.toDate());
            } else {
              result = date2 ? date2.toDate() : date2;
            }
            userInput.value = null;
            emitInput(result);
          };
          const onBeforeShow = () => {
            pickerActualVisible.value = true;
          };
          const onShow = () => {
            emit("visible-change", true);
          };
          const onKeydownPopperContent = (event) => {
            if ((event == null ? void 0 : event.key) === EVENT_CODE.esc) {
              focus(true, true);
            }
          };
          const onHide = () => {
            pickerActualVisible.value = false;
            pickerVisible.value = false;
            ignoreFocusEvent = false;
            emit("visible-change", false);
          };
          const handleOpen = () => {
            pickerVisible.value = true;
          };
          const handleClose = () => {
            pickerVisible.value = false;
          };
          const focus = (focusStartInput = true, isIgnoreFocusEvent = false) => {
            ignoreFocusEvent = isIgnoreFocusEvent;
            const [leftInput, rightInput] = vue.unref(refInput);
            let input = leftInput;
            if (!focusStartInput && isRangeInput.value) {
              input = rightInput;
            }
            if (input) {
              input.focus();
            }
          };
          const handleFocusInput = (e) => {
            if (props.readonly || pickerDisabled.value || pickerVisible.value || ignoreFocusEvent) {
              return;
            }
            pickerVisible.value = true;
            emit("focus", e);
          };
          let currentHandleBlurDeferCallback = void 0;
          const handleBlurInput = (e) => {
            const handleBlurDefer = async () => {
              setTimeout(() => {
                var _a2;
                if (currentHandleBlurDeferCallback === handleBlurDefer) {
                  if (!(((_a2 = refPopper.value) == null ? void 0 : _a2.isFocusInsideContent()) && !hasJustTabExitedInput) && refInput.value.filter((input) => {
                    return input.contains(document.activeElement);
                  }).length === 0) {
                    handleChange();
                    pickerVisible.value = false;
                    emit("blur", e);
                    props.validateEvent && (formItem == null ? void 0 : formItem.validate("blur").catch((err) => debugWarn()));
                  }
                  hasJustTabExitedInput = false;
                }
              }, 0);
            };
            currentHandleBlurDeferCallback = handleBlurDefer;
            handleBlurDefer();
          };
          const pickerDisabled = vue.computed(() => {
            return props.disabled || (form == null ? void 0 : form.disabled);
          });
          const parsedValue2 = vue.computed(() => {
            let dayOrDays;
            if (valueIsEmpty.value) {
              if (pickerOptions.value.getDefaultValue) {
                dayOrDays = pickerOptions.value.getDefaultValue();
              }
            } else {
              if (isArray$2(props.modelValue)) {
                dayOrDays = props.modelValue.map((d) => parseDate(d, props.valueFormat, lang.value));
              } else {
                dayOrDays = parseDate(props.modelValue, props.valueFormat, lang.value);
              }
            }
            if (pickerOptions.value.getRangeAvailableTime) {
              const availableResult = pickerOptions.value.getRangeAvailableTime(dayOrDays);
              if (!isEqual(availableResult, dayOrDays)) {
                dayOrDays = availableResult;
                emitInput(isArray$2(dayOrDays) ? dayOrDays.map((_) => _.toDate()) : dayOrDays.toDate());
              }
            }
            if (isArray$2(dayOrDays) && dayOrDays.some((day) => !day)) {
              dayOrDays = [];
            }
            return dayOrDays;
          });
          const displayValue = vue.computed(() => {
            if (!pickerOptions.value.panelReady)
              return "";
            const formattedValue = formatDayjsToString(parsedValue2.value);
            if (isArray$2(userInput.value)) {
              return [
                userInput.value[0] || formattedValue && formattedValue[0] || "",
                userInput.value[1] || formattedValue && formattedValue[1] || ""
              ];
            } else if (userInput.value !== null) {
              return userInput.value;
            }
            if (!isTimePicker.value && valueIsEmpty.value)
              return "";
            if (!pickerVisible.value && valueIsEmpty.value)
              return "";
            if (formattedValue) {
              return isDatesPicker.value ? formattedValue.join(", ") : formattedValue;
            }
            return "";
          });
          const isTimeLikePicker = vue.computed(() => props.type.includes("time"));
          const isTimePicker = vue.computed(() => props.type.startsWith("time"));
          const isDatesPicker = vue.computed(() => props.type === "dates");
          const triggerIcon = vue.computed(() => props.prefixIcon || (isTimeLikePicker.value ? clock_default : calendar_default));
          const showClose = vue.ref(false);
          const onClearIconClick = (event) => {
            if (props.readonly || pickerDisabled.value)
              return;
            if (showClose.value) {
              event.stopPropagation();
              focusOnInputBox();
              emitInput(null);
              emitChange(null, true);
              showClose.value = false;
              pickerVisible.value = false;
              pickerOptions.value.handleClear && pickerOptions.value.handleClear();
            }
          };
          const valueIsEmpty = vue.computed(() => {
            const { modelValue } = props;
            return !modelValue || isArray$2(modelValue) && !modelValue.filter(Boolean).length;
          });
          const onMouseDownInput = async (event) => {
            var _a2;
            if (props.readonly || pickerDisabled.value)
              return;
            if (((_a2 = event.target) == null ? void 0 : _a2.tagName) !== "INPUT" || refInput.value.includes(document.activeElement)) {
              pickerVisible.value = true;
            }
          };
          const onMouseEnter = () => {
            if (props.readonly || pickerDisabled.value)
              return;
            if (!valueIsEmpty.value && props.clearable) {
              showClose.value = true;
            }
          };
          const onMouseLeave = () => {
            showClose.value = false;
          };
          const onTouchStartInput = (event) => {
            var _a2;
            if (props.readonly || pickerDisabled.value)
              return;
            if (((_a2 = event.touches[0].target) == null ? void 0 : _a2.tagName) !== "INPUT" || refInput.value.includes(document.activeElement)) {
              pickerVisible.value = true;
            }
          };
          const isRangeInput = vue.computed(() => {
            return props.type.includes("range");
          });
          const pickerSize = useFormSize();
          const popperEl = vue.computed(() => {
            var _a2, _b;
            return (_b = (_a2 = vue.unref(refPopper)) == null ? void 0 : _a2.popperRef) == null ? void 0 : _b.contentRef;
          });
          const actualInputRef = vue.computed(() => {
            var _a2;
            if (vue.unref(isRangeInput)) {
              return vue.unref(inputRef);
            }
            return (_a2 = vue.unref(inputRef)) == null ? void 0 : _a2.$el;
          });
          onClickOutside(actualInputRef, (e) => {
            const unrefedPopperEl = vue.unref(popperEl);
            const inputEl = vue.unref(actualInputRef);
            if (unrefedPopperEl && (e.target === unrefedPopperEl || e.composedPath().includes(unrefedPopperEl)) || e.target === inputEl || e.composedPath().includes(inputEl))
              return;
            pickerVisible.value = false;
          });
          const userInput = vue.ref(null);
          const handleChange = () => {
            if (userInput.value) {
              const value = parseUserInputToDayjs(displayValue.value);
              if (value) {
                if (isValidValue(value)) {
                  emitInput(isArray$2(value) ? value.map((_) => _.toDate()) : value.toDate());
                  userInput.value = null;
                }
              }
            }
            if (userInput.value === "") {
              emitInput(null);
              emitChange(null);
              userInput.value = null;
            }
          };
          const parseUserInputToDayjs = (value) => {
            if (!value)
              return null;
            return pickerOptions.value.parseUserInput(value);
          };
          const formatDayjsToString = (value) => {
            if (!value)
              return null;
            return pickerOptions.value.formatToString(value);
          };
          const isValidValue = (value) => {
            return pickerOptions.value.isValidValue(value);
          };
          const handleKeydownInput = async (event) => {
            if (props.readonly || pickerDisabled.value)
              return;
            const { code } = event;
            emitKeydown(event);
            if (code === EVENT_CODE.esc) {
              if (pickerVisible.value === true) {
                pickerVisible.value = false;
                event.preventDefault();
                event.stopPropagation();
              }
              return;
            }
            if (code === EVENT_CODE.down) {
              if (pickerOptions.value.handleFocusPicker) {
                event.preventDefault();
                event.stopPropagation();
              }
              if (pickerVisible.value === false) {
                pickerVisible.value = true;
                await vue.nextTick();
              }
              if (pickerOptions.value.handleFocusPicker) {
                pickerOptions.value.handleFocusPicker();
                return;
              }
            }
            if (code === EVENT_CODE.tab) {
              hasJustTabExitedInput = true;
              return;
            }
            if (code === EVENT_CODE.enter || code === EVENT_CODE.numpadEnter) {
              if (userInput.value === null || userInput.value === "" || isValidValue(parseUserInputToDayjs(displayValue.value))) {
                handleChange();
                pickerVisible.value = false;
              }
              event.stopPropagation();
              return;
            }
            if (userInput.value) {
              event.stopPropagation();
              return;
            }
            if (pickerOptions.value.handleKeydownInput) {
              pickerOptions.value.handleKeydownInput(event);
            }
          };
          const onUserInput = (e) => {
            userInput.value = e;
            if (!pickerVisible.value) {
              pickerVisible.value = true;
            }
          };
          const handleStartInput = (event) => {
            const target = event.target;
            if (userInput.value) {
              userInput.value = [target.value, userInput.value[1]];
            } else {
              userInput.value = [target.value, null];
            }
          };
          const handleEndInput = (event) => {
            const target = event.target;
            if (userInput.value) {
              userInput.value = [userInput.value[0], target.value];
            } else {
              userInput.value = [null, target.value];
            }
          };
          const handleStartChange = () => {
            var _a2;
            const values = userInput.value;
            const value = parseUserInputToDayjs(values && values[0]);
            const parsedVal = vue.unref(parsedValue2);
            if (value && value.isValid()) {
              userInput.value = [
                formatDayjsToString(value),
                ((_a2 = displayValue.value) == null ? void 0 : _a2[1]) || null
              ];
              const newValue = [value, parsedVal && (parsedVal[1] || null)];
              if (isValidValue(newValue)) {
                emitInput(newValue);
                userInput.value = null;
              }
            }
          };
          const handleEndChange = () => {
            var _a2;
            const values = vue.unref(userInput);
            const value = parseUserInputToDayjs(values && values[1]);
            const parsedVal = vue.unref(parsedValue2);
            if (value && value.isValid()) {
              userInput.value = [
                ((_a2 = vue.unref(displayValue)) == null ? void 0 : _a2[0]) || null,
                formatDayjsToString(value)
              ];
              const newValue = [parsedVal && parsedVal[0], value];
              if (isValidValue(newValue)) {
                emitInput(newValue);
                userInput.value = null;
              }
            }
          };
          const pickerOptions = vue.ref({});
          const onSetPickerOption = (e) => {
            pickerOptions.value[e[0]] = e[1];
            pickerOptions.value.panelReady = true;
          };
          const onCalendarChange = (e) => {
            emit("calendar-change", e);
          };
          const onPanelChange = (value, mode, view) => {
            emit("panel-change", value, mode, view);
          };
          vue.provide("EP_PICKER_BASE", {
            props
          });
          expose({
            focus,
            handleFocusInput,
            handleBlurInput,
            handleOpen,
            handleClose,
            onPick
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(ElTooltip), vue.mergeProps({
              ref_key: "refPopper",
              ref: refPopper,
              visible: pickerVisible.value,
              effect: "light",
              pure: "",
              trigger: "click"
            }, _ctx.$attrs, {
              role: "dialog",
              teleported: "",
              transition: `${vue.unref(nsDate).namespace.value}-zoom-in-top`,
              "popper-class": [`${vue.unref(nsDate).namespace.value}-picker__popper`, _ctx.popperClass],
              "popper-options": vue.unref(elPopperOptions),
              "fallback-placements": ["bottom", "top", "right", "left"],
              "gpu-acceleration": false,
              "stop-popper-mouse-event": false,
              "hide-after": 0,
              persistent: "",
              onBeforeShow,
              onShow,
              onHide
            }), {
              default: vue.withCtx(() => [
                !vue.unref(isRangeInput) ? (vue.openBlock(), vue.createBlock(vue.unref(ElInput), {
                  key: 0,
                  id: _ctx.id,
                  ref_key: "inputRef",
                  ref: inputRef,
                  "container-role": "combobox",
                  "model-value": vue.unref(displayValue),
                  name: _ctx.name,
                  size: vue.unref(pickerSize),
                  disabled: vue.unref(pickerDisabled),
                  placeholder: _ctx.placeholder,
                  class: vue.normalizeClass([vue.unref(nsDate).b("editor"), vue.unref(nsDate).bm("editor", _ctx.type), _ctx.$attrs.class]),
                  style: vue.normalizeStyle(_ctx.$attrs.style),
                  readonly: !_ctx.editable || _ctx.readonly || vue.unref(isDatesPicker) || _ctx.type === "week",
                  label: _ctx.label,
                  tabindex: _ctx.tabindex,
                  "validate-event": false,
                  onInput: onUserInput,
                  onFocus: handleFocusInput,
                  onBlur: handleBlurInput,
                  onKeydown: handleKeydownInput,
                  onChange: handleChange,
                  onMousedown: onMouseDownInput,
                  onMouseenter: onMouseEnter,
                  onMouseleave: onMouseLeave,
                  onTouchstart: onTouchStartInput,
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                  }, ["stop"]))
                }, {
                  prefix: vue.withCtx(() => [
                    vue.unref(triggerIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                      key: 0,
                      class: vue.normalizeClass(vue.unref(nsInput).e("icon")),
                      onMousedown: vue.withModifiers(onMouseDownInput, ["prevent"]),
                      onTouchstart: onTouchStartInput
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(triggerIcon))))
                      ]),
                      _: 1
                    }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  suffix: vue.withCtx(() => [
                    showClose.value && _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                      key: 0,
                      class: vue.normalizeClass(`${vue.unref(nsInput).e("icon")} clear-icon`),
                      onClick: vue.withModifiers(onClearIconClick, ["stop"])
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.clearIcon)))
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 1
                }, 8, ["id", "model-value", "name", "size", "disabled", "placeholder", "class", "style", "readonly", "label", "tabindex", "onKeydown"])) : (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  ref_key: "inputRef",
                  ref: inputRef,
                  class: vue.normalizeClass(vue.unref(rangeInputKls)),
                  style: vue.normalizeStyle(_ctx.$attrs.style),
                  onClick: handleFocusInput,
                  onMouseenter: onMouseEnter,
                  onMouseleave: onMouseLeave,
                  onTouchstart: onTouchStartInput,
                  onKeydown: handleKeydownInput
                }, [
                  vue.unref(triggerIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 0,
                    class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsRange).e("icon")]),
                    onMousedown: vue.withModifiers(onMouseDownInput, ["prevent"]),
                    onTouchstart: onTouchStartInput
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(triggerIcon))))
                    ]),
                    _: 1
                  }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("input", {
                    id: _ctx.id && _ctx.id[0],
                    autocomplete: "off",
                    name: _ctx.name && _ctx.name[0],
                    placeholder: _ctx.startPlaceholder,
                    value: vue.unref(displayValue) && vue.unref(displayValue)[0],
                    disabled: vue.unref(pickerDisabled),
                    readonly: !_ctx.editable || _ctx.readonly,
                    class: vue.normalizeClass(vue.unref(nsRange).b("input")),
                    onMousedown: onMouseDownInput,
                    onInput: handleStartInput,
                    onChange: handleStartChange,
                    onFocus: handleFocusInput,
                    onBlur: handleBlurInput
                  }, null, 42, _hoisted_1$j),
                  vue.renderSlot(_ctx.$slots, "range-separator", {}, () => [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(nsRange).b("separator"))
                    }, vue.toDisplayString(_ctx.rangeSeparator), 3)
                  ]),
                  vue.createElementVNode("input", {
                    id: _ctx.id && _ctx.id[1],
                    autocomplete: "off",
                    name: _ctx.name && _ctx.name[1],
                    placeholder: _ctx.endPlaceholder,
                    value: vue.unref(displayValue) && vue.unref(displayValue)[1],
                    disabled: vue.unref(pickerDisabled),
                    readonly: !_ctx.editable || _ctx.readonly,
                    class: vue.normalizeClass(vue.unref(nsRange).b("input")),
                    onMousedown: onMouseDownInput,
                    onFocus: handleFocusInput,
                    onBlur: handleBlurInput,
                    onInput: handleEndInput,
                    onChange: handleEndChange
                  }, null, 42, _hoisted_2$h),
                  _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 1,
                    class: vue.normalizeClass(vue.unref(clearIconKls)),
                    onClick: onClearIconClick
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.clearIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 38))
              ]),
              content: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default", {
                  visible: pickerVisible.value,
                  actualVisible: pickerActualVisible.value,
                  parsedValue: vue.unref(parsedValue2),
                  format: _ctx.format,
                  unlinkPanels: _ctx.unlinkPanels,
                  type: _ctx.type,
                  defaultValue: _ctx.defaultValue,
                  onPick,
                  onSelectRange: setSelectionRange,
                  onSetPickerOption,
                  onCalendarChange,
                  onPanelChange,
                  onKeydown: onKeydownPopperContent,
                  onMousedown: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                  }, ["stop"]))
                })
              ]),
              _: 3
            }, 16, ["visible", "transition", "popper-class", "popper-options"]);
          };
        }
      });
      var CommonPicker = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/common/picker.vue"]]);
      const panelTimePickerProps = buildProps({
        ...timePanelSharedProps,
        datetimeRole: String,
        parsedValue: {
          type: definePropType(Object)
        }
      });
      const useTimePanel = ({
        getAvailableHours,
        getAvailableMinutes,
        getAvailableSeconds
      }) => {
        const getAvailableTime = (date2, role, first, compareDate) => {
          const availableTimeGetters = {
            hour: getAvailableHours,
            minute: getAvailableMinutes,
            second: getAvailableSeconds
          };
          let result = date2;
          ["hour", "minute", "second"].forEach((type) => {
            if (availableTimeGetters[type]) {
              let availableTimeSlots;
              const method = availableTimeGetters[type];
              switch (type) {
                case "minute": {
                  availableTimeSlots = method(result.hour(), role, compareDate);
                  break;
                }
                case "second": {
                  availableTimeSlots = method(result.hour(), result.minute(), role, compareDate);
                  break;
                }
                default: {
                  availableTimeSlots = method(role, compareDate);
                  break;
                }
              }
              if ((availableTimeSlots == null ? void 0 : availableTimeSlots.length) && !availableTimeSlots.includes(result[type]())) {
                const pos = first ? 0 : availableTimeSlots.length - 1;
                result = result[type](availableTimeSlots[pos]);
              }
            }
          });
          return result;
        };
        const timePickerOptions = {};
        const onSetOption = ([key, val]) => {
          timePickerOptions[key] = val;
        };
        return {
          timePickerOptions,
          getAvailableTime,
          onSetOption
        };
      };
      const makeAvailableArr = (disabledList) => {
        const trueOrNumber = (isDisabled, index) => isDisabled || index;
        const getNumber = (predicate) => predicate !== true;
        return disabledList.map(trueOrNumber).filter(getNumber);
      };
      const getTimeLists = (disabledHours, disabledMinutes, disabledSeconds) => {
        const getHoursList = (role, compare) => {
          return makeList(24, disabledHours && (() => disabledHours == null ? void 0 : disabledHours(role, compare)));
        };
        const getMinutesList = (hour, role, compare) => {
          return makeList(60, disabledMinutes && (() => disabledMinutes == null ? void 0 : disabledMinutes(hour, role, compare)));
        };
        const getSecondsList = (hour, minute, role, compare) => {
          return makeList(60, disabledSeconds && (() => disabledSeconds == null ? void 0 : disabledSeconds(hour, minute, role, compare)));
        };
        return {
          getHoursList,
          getMinutesList,
          getSecondsList
        };
      };
      const buildAvailableTimeSlotGetter = (disabledHours, disabledMinutes, disabledSeconds) => {
        const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(disabledHours, disabledMinutes, disabledSeconds);
        const getAvailableHours = (role, compare) => {
          return makeAvailableArr(getHoursList(role, compare));
        };
        const getAvailableMinutes = (hour, role, compare) => {
          return makeAvailableArr(getMinutesList(hour, role, compare));
        };
        const getAvailableSeconds = (hour, minute, role, compare) => {
          return makeAvailableArr(getSecondsList(hour, minute, role, compare));
        };
        return {
          getAvailableHours,
          getAvailableMinutes,
          getAvailableSeconds
        };
      };
      const useOldValue = (props) => {
        const oldValue = vue.ref(props.parsedValue);
        vue.watch(() => props.visible, (val) => {
          if (!val) {
            oldValue.value = props.parsedValue;
          }
        });
        return oldValue;
      };
      const nodeList = /* @__PURE__ */ new Map();
      let startClick;
      if (isClient$1) {
        document.addEventListener("mousedown", (e) => startClick = e);
        document.addEventListener("mouseup", (e) => {
          for (const handlers of nodeList.values()) {
            for (const { documentHandler } of handlers) {
              documentHandler(e, startClick);
            }
          }
        });
      }
      function createDocumentHandler(el, binding) {
        let excludes = [];
        if (Array.isArray(binding.arg)) {
          excludes = binding.arg;
        } else if (isElement(binding.arg)) {
          excludes.push(binding.arg);
        }
        return function(mouseup, mousedown) {
          const popperRef = binding.instance.popperRef;
          const mouseUpTarget = mouseup.target;
          const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
          const isBound = !binding || !binding.instance;
          const isTargetExists = !mouseUpTarget || !mouseDownTarget;
          const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
          const isSelf = el === mouseUpTarget;
          const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
          const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
          if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
            return;
          }
          binding.value(mouseup, mousedown);
        };
      }
      const ClickOutside = {
        beforeMount(el, binding) {
          if (!nodeList.has(el)) {
            nodeList.set(el, []);
          }
          nodeList.get(el).push({
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value
          });
        },
        updated(el, binding) {
          if (!nodeList.has(el)) {
            nodeList.set(el, []);
          }
          const handlers = nodeList.get(el);
          const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
          const newHandler = {
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value
          };
          if (oldHandlerIndex >= 0) {
            handlers.splice(oldHandlerIndex, 1, newHandler);
          } else {
            handlers.push(newHandler);
          }
        },
        unmounted(el) {
          nodeList.delete(el);
        }
      };
      const REPEAT_INTERVAL = 100;
      const REPEAT_DELAY = 600;
      const vRepeatClick = {
        beforeMount(el, binding) {
          const value = binding.value;
          const { interval = REPEAT_INTERVAL, delay = REPEAT_DELAY } = isFunction$1(value) ? {} : value;
          let intervalId;
          let delayId;
          const handler = () => isFunction$1(value) ? value() : value.handler();
          const clear = () => {
            if (delayId) {
              clearTimeout(delayId);
              delayId = void 0;
            }
            if (intervalId) {
              clearInterval(intervalId);
              intervalId = void 0;
            }
          };
          el.addEventListener("mousedown", (evt) => {
            if (evt.button !== 0)
              return;
            clear();
            handler();
            document.addEventListener("mouseup", () => clear(), {
              once: true
            });
            delayId = setTimeout(() => {
              intervalId = setInterval(() => {
                handler();
              }, interval);
            }, delay);
          });
        }
      };
      const basicTimeSpinnerProps = buildProps({
        role: {
          type: String,
          required: true
        },
        spinnerDate: {
          type: definePropType(Object),
          required: true
        },
        showSeconds: {
          type: Boolean,
          default: true
        },
        arrowControl: Boolean,
        amPmMode: {
          type: definePropType(String),
          default: ""
        },
        ...disabledTimeListsProps
      });
      const _hoisted_1$i = ["onClick"];
      const _hoisted_2$g = ["onMouseenter"];
      const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
        __name: "basic-time-spinner",
        props: basicTimeSpinnerProps,
        emits: ["change", "select-range", "set-option"],
        setup(__props, { emit }) {
          const props = __props;
          const ns = useNamespace("time");
          const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(props.disabledHours, props.disabledMinutes, props.disabledSeconds);
          let isScrolling = false;
          const currentScrollbar = vue.ref();
          const listHoursRef = vue.ref();
          const listMinutesRef = vue.ref();
          const listSecondsRef = vue.ref();
          const listRefsMap = {
            hours: listHoursRef,
            minutes: listMinutesRef,
            seconds: listSecondsRef
          };
          const spinnerItems = vue.computed(() => {
            return props.showSeconds ? timeUnits : timeUnits.slice(0, 2);
          });
          const timePartials = vue.computed(() => {
            const { spinnerDate } = props;
            const hours = spinnerDate.hour();
            const minutes = spinnerDate.minute();
            const seconds = spinnerDate.second();
            return { hours, minutes, seconds };
          });
          const timeList = vue.computed(() => {
            const { hours, minutes } = vue.unref(timePartials);
            return {
              hours: getHoursList(props.role),
              minutes: getMinutesList(hours, props.role),
              seconds: getSecondsList(hours, minutes, props.role)
            };
          });
          const arrowControlTimeList = vue.computed(() => {
            const { hours, minutes, seconds } = vue.unref(timePartials);
            return {
              hours: buildTimeList(hours, 23),
              minutes: buildTimeList(minutes, 59),
              seconds: buildTimeList(seconds, 59)
            };
          });
          const debouncedResetScroll = debounce((type) => {
            isScrolling = false;
            adjustCurrentSpinner(type);
          }, 200);
          const getAmPmFlag = (hour) => {
            const shouldShowAmPm = !!props.amPmMode;
            if (!shouldShowAmPm)
              return "";
            const isCapital = props.amPmMode === "A";
            let content = hour < 12 ? " am" : " pm";
            if (isCapital)
              content = content.toUpperCase();
            return content;
          };
          const emitSelectRange = (type) => {
            let range;
            switch (type) {
              case "hours":
                range = [0, 2];
                break;
              case "minutes":
                range = [3, 5];
                break;
              case "seconds":
                range = [6, 8];
                break;
            }
            const [left, right] = range;
            emit("select-range", left, right);
            currentScrollbar.value = type;
          };
          const adjustCurrentSpinner = (type) => {
            adjustSpinner(type, vue.unref(timePartials)[type]);
          };
          const adjustSpinners = () => {
            adjustCurrentSpinner("hours");
            adjustCurrentSpinner("minutes");
            adjustCurrentSpinner("seconds");
          };
          const getScrollbarElement = (el) => el.querySelector(`.${ns.namespace.value}-scrollbar__wrap`);
          const adjustSpinner = (type, value) => {
            if (props.arrowControl)
              return;
            const scrollbar = vue.unref(listRefsMap[type]);
            if (scrollbar && scrollbar.$el) {
              getScrollbarElement(scrollbar.$el).scrollTop = Math.max(0, value * typeItemHeight(type));
            }
          };
          const typeItemHeight = (type) => {
            const scrollbar = vue.unref(listRefsMap[type]);
            const listItem = scrollbar == null ? void 0 : scrollbar.$el.querySelector("li");
            if (listItem) {
              return Number.parseFloat(getStyle(listItem, "height")) || 0;
            }
            return 0;
          };
          const onIncrement = () => {
            scrollDown(1);
          };
          const onDecrement = () => {
            scrollDown(-1);
          };
          const scrollDown = (step) => {
            if (!currentScrollbar.value) {
              emitSelectRange("hours");
            }
            const label = currentScrollbar.value;
            const now2 = vue.unref(timePartials)[label];
            const total = currentScrollbar.value === "hours" ? 24 : 60;
            const next = findNextUnDisabled(label, now2, step, total);
            modifyDateField(label, next);
            adjustSpinner(label, next);
            vue.nextTick(() => emitSelectRange(label));
          };
          const findNextUnDisabled = (type, now2, step, total) => {
            let next = (now2 + step + total) % total;
            const list = vue.unref(timeList)[type];
            while (list[next] && next !== now2) {
              next = (next + step + total) % total;
            }
            return next;
          };
          const modifyDateField = (type, value) => {
            const list = vue.unref(timeList)[type];
            const isDisabled = list[value];
            if (isDisabled)
              return;
            const { hours, minutes, seconds } = vue.unref(timePartials);
            let changeTo;
            switch (type) {
              case "hours":
                changeTo = props.spinnerDate.hour(value).minute(minutes).second(seconds);
                break;
              case "minutes":
                changeTo = props.spinnerDate.hour(hours).minute(value).second(seconds);
                break;
              case "seconds":
                changeTo = props.spinnerDate.hour(hours).minute(minutes).second(value);
                break;
            }
            emit("change", changeTo);
          };
          const handleClick = (type, { value, disabled }) => {
            if (!disabled) {
              modifyDateField(type, value);
              emitSelectRange(type);
              adjustSpinner(type, value);
            }
          };
          const handleScroll = (type) => {
            isScrolling = true;
            debouncedResetScroll(type);
            const value = Math.min(Math.round((getScrollbarElement(vue.unref(listRefsMap[type]).$el).scrollTop - (scrollBarHeight(type) * 0.5 - 10) / typeItemHeight(type) + 3) / typeItemHeight(type)), type === "hours" ? 23 : 59);
            modifyDateField(type, value);
          };
          const scrollBarHeight = (type) => {
            return vue.unref(listRefsMap[type]).$el.offsetHeight;
          };
          const bindScrollEvent = () => {
            const bindFunction = (type) => {
              const scrollbar = vue.unref(listRefsMap[type]);
              if (scrollbar && scrollbar.$el) {
                getScrollbarElement(scrollbar.$el).onscroll = () => {
                  handleScroll(type);
                };
              }
            };
            bindFunction("hours");
            bindFunction("minutes");
            bindFunction("seconds");
          };
          vue.onMounted(() => {
            vue.nextTick(() => {
              !props.arrowControl && bindScrollEvent();
              adjustSpinners();
              if (props.role === "start")
                emitSelectRange("hours");
            });
          });
          const setRef = (scrollbar, type) => {
            listRefsMap[type].value = scrollbar;
          };
          emit("set-option", [`${props.role}_scrollDown`, scrollDown]);
          emit("set-option", [`${props.role}_emitSelectRange`, emitSelectRange]);
          vue.watch(() => props.spinnerDate, () => {
            if (isScrolling)
              return;
            adjustSpinners();
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass([vue.unref(ns).b("spinner"), { "has-seconds": _ctx.showSeconds }])
            }, [
              !_ctx.arrowControl ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(vue.unref(spinnerItems), (item) => {
                return vue.openBlock(), vue.createBlock(vue.unref(ElScrollbar), {
                  key: item,
                  ref_for: true,
                  ref: (scrollbar) => setRef(scrollbar, item),
                  class: vue.normalizeClass(vue.unref(ns).be("spinner", "wrapper")),
                  "wrap-style": "max-height: inherit;",
                  "view-class": vue.unref(ns).be("spinner", "list"),
                  noresize: "",
                  tag: "ul",
                  onMouseenter: ($event) => emitSelectRange(item),
                  onMousemove: ($event) => adjustCurrentSpinner(item)
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(timeList)[item], (disabled, key) => {
                      return vue.openBlock(), vue.createElementBlock("li", {
                        key,
                        class: vue.normalizeClass([
                          vue.unref(ns).be("spinner", "item"),
                          vue.unref(ns).is("active", key === vue.unref(timePartials)[item]),
                          vue.unref(ns).is("disabled", disabled)
                        ]),
                        onClick: ($event) => handleClick(item, { value: key, disabled })
                      }, [
                        item === "hours" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode(vue.toDisplayString(("0" + (_ctx.amPmMode ? key % 12 || 12 : key)).slice(-2)) + vue.toDisplayString(getAmPmFlag(key)), 1)
                        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                          vue.createTextVNode(vue.toDisplayString(("0" + key).slice(-2)), 1)
                        ], 64))
                      ], 10, _hoisted_1$i);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["class", "view-class", "onMouseenter", "onMousemove"]);
              }), 128)) : vue.createCommentVNode("v-if", true),
              _ctx.arrowControl ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(vue.unref(spinnerItems), (item) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: item,
                  class: vue.normalizeClass([vue.unref(ns).be("spinner", "wrapper"), vue.unref(ns).is("arrow")]),
                  onMouseenter: ($event) => emitSelectRange(item)
                }, [
                  vue.withDirectives((vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    class: vue.normalizeClass(["arrow-up", vue.unref(ns).be("spinner", "arrow")])
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(arrow_up_default))
                    ]),
                    _: 1
                  }, 8, ["class"])), [
                    [vue.unref(vRepeatClick), onDecrement]
                  ]),
                  vue.withDirectives((vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    class: vue.normalizeClass(["arrow-down", vue.unref(ns).be("spinner", "arrow")])
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(arrow_down_default))
                    ]),
                    _: 1
                  }, 8, ["class"])), [
                    [vue.unref(vRepeatClick), onIncrement]
                  ]),
                  vue.createElementVNode("ul", {
                    class: vue.normalizeClass(vue.unref(ns).be("spinner", "list"))
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(arrowControlTimeList)[item], (time, key) => {
                      return vue.openBlock(), vue.createElementBlock("li", {
                        key,
                        class: vue.normalizeClass([
                          vue.unref(ns).be("spinner", "item"),
                          vue.unref(ns).is("active", time === vue.unref(timePartials)[item]),
                          vue.unref(ns).is("disabled", vue.unref(timeList)[item][time])
                        ])
                      }, [
                        typeof time === "number" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          item === "hours" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                            vue.createTextVNode(vue.toDisplayString(("0" + (_ctx.amPmMode ? time % 12 || 12 : time)).slice(-2)) + vue.toDisplayString(getAmPmFlag(time)), 1)
                          ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                            vue.createTextVNode(vue.toDisplayString(("0" + time).slice(-2)), 1)
                          ], 64))
                        ], 64)) : vue.createCommentVNode("v-if", true)
                      ], 2);
                    }), 128))
                  ], 2)
                ], 42, _hoisted_2$g);
              }), 128)) : vue.createCommentVNode("v-if", true)
            ], 2);
          };
        }
      });
      var TimeSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/basic-time-spinner.vue"]]);
      const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
        __name: "panel-time-pick",
        props: panelTimePickerProps,
        emits: ["pick", "select-range", "set-picker-option"],
        setup(__props, { emit }) {
          const props = __props;
          const pickerBase = vue.inject("EP_PICKER_BASE");
          const {
            arrowControl,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            defaultValue
          } = pickerBase.props;
          const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = buildAvailableTimeSlotGetter(disabledHours, disabledMinutes, disabledSeconds);
          const ns = useNamespace("time");
          const { t, lang } = useLocale();
          const selectionRange = vue.ref([0, 2]);
          const oldValue = useOldValue(props);
          const transitionName = vue.computed(() => {
            return isUndefined(props.actualVisible) ? `${ns.namespace.value}-zoom-in-top` : "";
          });
          const showSeconds = vue.computed(() => {
            return props.format.includes("ss");
          });
          const amPmMode = vue.computed(() => {
            if (props.format.includes("A"))
              return "A";
            if (props.format.includes("a"))
              return "a";
            return "";
          });
          const isValidValue = (_date) => {
            const parsedDate = dayjs(_date).locale(lang.value);
            const result = getRangeAvailableTime(parsedDate);
            return parsedDate.isSame(result);
          };
          const handleCancel = () => {
            emit("pick", oldValue.value, false);
          };
          const handleConfirm = (visible = false, first = false) => {
            if (first)
              return;
            emit("pick", props.parsedValue, visible);
          };
          const handleChange = (_date) => {
            if (!props.visible) {
              return;
            }
            const result = getRangeAvailableTime(_date).millisecond(0);
            emit("pick", result, true);
          };
          const setSelectionRange = (start, end) => {
            emit("select-range", start, end);
            selectionRange.value = [start, end];
          };
          const changeSelectionRange = (step) => {
            const list = [0, 3].concat(showSeconds.value ? [6] : []);
            const mapping = ["hours", "minutes"].concat(showSeconds.value ? ["seconds"] : []);
            const index = list.indexOf(selectionRange.value[0]);
            const next = (index + step + list.length) % list.length;
            timePickerOptions["start_emitSelectRange"](mapping[next]);
          };
          const handleKeydown = (event) => {
            const code = event.code;
            const { left, right, up, down } = EVENT_CODE;
            if ([left, right].includes(code)) {
              const step = code === left ? -1 : 1;
              changeSelectionRange(step);
              event.preventDefault();
              return;
            }
            if ([up, down].includes(code)) {
              const step = code === up ? -1 : 1;
              timePickerOptions["start_scrollDown"](step);
              event.preventDefault();
              return;
            }
          };
          const { timePickerOptions, onSetOption, getAvailableTime } = useTimePanel({
            getAvailableHours,
            getAvailableMinutes,
            getAvailableSeconds
          });
          const getRangeAvailableTime = (date2) => {
            return getAvailableTime(date2, props.datetimeRole || "", true);
          };
          const parseUserInput = (value) => {
            if (!value)
              return null;
            return dayjs(value, props.format).locale(lang.value);
          };
          const formatToString = (value) => {
            if (!value)
              return null;
            return value.format(props.format);
          };
          const getDefaultValue2 = () => {
            return dayjs(defaultValue).locale(lang.value);
          };
          emit("set-picker-option", ["isValidValue", isValidValue]);
          emit("set-picker-option", ["formatToString", formatToString]);
          emit("set-picker-option", ["parseUserInput", parseUserInput]);
          emit("set-picker-option", ["handleKeydownInput", handleKeydown]);
          emit("set-picker-option", ["getRangeAvailableTime", getRangeAvailableTime]);
          emit("set-picker-option", ["getDefaultValue", getDefaultValue2]);
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.Transition, { name: vue.unref(transitionName) }, {
              default: vue.withCtx(() => [
                _ctx.actualVisible || _ctx.visible ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).b("panel"))
                }, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass([vue.unref(ns).be("panel", "content"), { "has-seconds": vue.unref(showSeconds) }])
                  }, [
                    vue.createVNode(TimeSpinner, {
                      ref: "spinner",
                      role: _ctx.datetimeRole || "start",
                      "arrow-control": vue.unref(arrowControl),
                      "show-seconds": vue.unref(showSeconds),
                      "am-pm-mode": vue.unref(amPmMode),
                      "spinner-date": _ctx.parsedValue,
                      "disabled-hours": vue.unref(disabledHours),
                      "disabled-minutes": vue.unref(disabledMinutes),
                      "disabled-seconds": vue.unref(disabledSeconds),
                      onChange: handleChange,
                      onSetOption: vue.unref(onSetOption),
                      onSelectRange: setSelectionRange
                    }, null, 8, ["role", "arrow-control", "show-seconds", "am-pm-mode", "spinner-date", "disabled-hours", "disabled-minutes", "disabled-seconds", "onSetOption"])
                  ], 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(vue.unref(ns).be("panel", "footer"))
                  }, [
                    vue.createElementVNode("button", {
                      type: "button",
                      class: vue.normalizeClass([vue.unref(ns).be("panel", "btn"), "cancel"]),
                      onClick: handleCancel
                    }, vue.toDisplayString(vue.unref(t)("el.datepicker.cancel")), 3),
                    vue.createElementVNode("button", {
                      type: "button",
                      class: vue.normalizeClass([vue.unref(ns).be("panel", "btn"), "confirm"]),
                      onClick: _cache[0] || (_cache[0] = ($event) => handleConfirm())
                    }, vue.toDisplayString(vue.unref(t)("el.datepicker.confirm")), 3)
                  ], 2)
                ], 2)) : vue.createCommentVNode("v-if", true)
              ]),
              _: 1
            }, 8, ["name"]);
          };
        }
      });
      var TimePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/panel-time-pick.vue"]]);
      var localeData$1 = { exports: {} };
      (function(module2, exports2) {
        !function(n, e) {
          module2.exports = e();
        }(commonjsGlobal, function() {
          return function(n, e, t) {
            var r = e.prototype, o = function(n2) {
              return n2 && (n2.indexOf ? n2 : n2.s);
            }, u = function(n2, e2, t2, r2, u2) {
              var i2 = n2.name ? n2 : n2.$locale(), a2 = o(i2[e2]), s2 = o(i2[t2]), f = a2 || s2.map(function(n3) {
                return n3.slice(0, r2);
              });
              if (!u2)
                return f;
              var d = i2.weekStart;
              return f.map(function(n3, e3) {
                return f[(e3 + (d || 0)) % 7];
              });
            }, i = function() {
              return t.Ls[t.locale()];
            }, a = function(n2, e2) {
              return n2.formats[e2] || function(n3) {
                return n3.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n4, e3, t2) {
                  return e3 || t2.slice(1);
                });
              }(n2.formats[e2.toUpperCase()]);
            }, s = function() {
              var n2 = this;
              return { months: function(e2) {
                return e2 ? e2.format("MMMM") : u(n2, "months");
              }, monthsShort: function(e2) {
                return e2 ? e2.format("MMM") : u(n2, "monthsShort", "months", 3);
              }, firstDayOfWeek: function() {
                return n2.$locale().weekStart || 0;
              }, weekdays: function(e2) {
                return e2 ? e2.format("dddd") : u(n2, "weekdays");
              }, weekdaysMin: function(e2) {
                return e2 ? e2.format("dd") : u(n2, "weekdaysMin", "weekdays", 2);
              }, weekdaysShort: function(e2) {
                return e2 ? e2.format("ddd") : u(n2, "weekdaysShort", "weekdays", 3);
              }, longDateFormat: function(e2) {
                return a(n2.$locale(), e2);
              }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
            };
            r.localeData = function() {
              return s.bind(this)();
            }, t.localeData = function() {
              var n2 = i();
              return { firstDayOfWeek: function() {
                return n2.weekStart || 0;
              }, weekdays: function() {
                return t.weekdays();
              }, weekdaysShort: function() {
                return t.weekdaysShort();
              }, weekdaysMin: function() {
                return t.weekdaysMin();
              }, months: function() {
                return t.months();
              }, monthsShort: function() {
                return t.monthsShort();
              }, longDateFormat: function(e2) {
                return a(n2, e2);
              }, meridiem: n2.meridiem, ordinal: n2.ordinal };
            }, t.months = function() {
              return u(i(), "months");
            }, t.monthsShort = function() {
              return u(i(), "monthsShort", "months", 3);
            }, t.weekdays = function(n2) {
              return u(i(), "weekdays", null, null, n2);
            }, t.weekdaysShort = function(n2) {
              return u(i(), "weekdaysShort", "weekdays", 3, n2);
            }, t.weekdaysMin = function(n2) {
              return u(i(), "weekdaysMin", "weekdays", 2, n2);
            };
          };
        });
      })(localeData$1);
      var localeDataExports = localeData$1.exports;
      const localeData = /* @__PURE__ */ getDefaultExportFromCjs(localeDataExports);
      var advancedFormat$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, t) {
          module2.exports = t();
        }(commonjsGlobal, function() {
          return function(e, t) {
            var r = t.prototype, n = r.format;
            r.format = function(e2) {
              var t2 = this, r2 = this.$locale();
              if (!this.isValid())
                return n.bind(this)(e2);
              var s = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e3) {
                switch (e3) {
                  case "Q":
                    return Math.ceil((t2.$M + 1) / 3);
                  case "Do":
                    return r2.ordinal(t2.$D);
                  case "gggg":
                    return t2.weekYear();
                  case "GGGG":
                    return t2.isoWeekYear();
                  case "wo":
                    return r2.ordinal(t2.week(), "W");
                  case "w":
                  case "ww":
                    return s.s(t2.week(), "w" === e3 ? 1 : 2, "0");
                  case "W":
                  case "WW":
                    return s.s(t2.isoWeek(), "W" === e3 ? 1 : 2, "0");
                  case "k":
                  case "kk":
                    return s.s(String(0 === t2.$H ? 24 : t2.$H), "k" === e3 ? 1 : 2, "0");
                  case "X":
                    return Math.floor(t2.$d.getTime() / 1e3);
                  case "x":
                    return t2.$d.getTime();
                  case "z":
                    return "[" + t2.offsetName() + "]";
                  case "zzz":
                    return "[" + t2.offsetName("long") + "]";
                  default:
                    return e3;
                }
              });
              return n.bind(this)(a);
            };
          };
        });
      })(advancedFormat$1);
      var advancedFormatExports = advancedFormat$1.exports;
      const advancedFormat = /* @__PURE__ */ getDefaultExportFromCjs(advancedFormatExports);
      var weekOfYear$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, t) {
          module2.exports = t();
        }(commonjsGlobal, function() {
          var e = "week", t = "year";
          return function(i, n, r) {
            var f = n.prototype;
            f.week = function(i2) {
              if (void 0 === i2 && (i2 = null), null !== i2)
                return this.add(7 * (i2 - this.week()), "day");
              var n2 = this.$locale().yearStart || 1;
              if (11 === this.month() && this.date() > 25) {
                var f2 = r(this).startOf(t).add(1, t).date(n2), s = r(this).endOf(e);
                if (f2.isBefore(s))
                  return 1;
              }
              var a = r(this).startOf(t).date(n2).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, true);
              return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
            }, f.weeks = function(e2) {
              return void 0 === e2 && (e2 = null), this.week(e2);
            };
          };
        });
      })(weekOfYear$1);
      var weekOfYearExports = weekOfYear$1.exports;
      const weekOfYear = /* @__PURE__ */ getDefaultExportFromCjs(weekOfYearExports);
      var weekYear$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, t) {
          module2.exports = t();
        }(commonjsGlobal, function() {
          return function(e, t) {
            t.prototype.weekYear = function() {
              var e2 = this.month(), t2 = this.week(), n = this.year();
              return 1 === t2 && 11 === e2 ? n + 1 : 0 === e2 && t2 >= 52 ? n - 1 : n;
            };
          };
        });
      })(weekYear$1);
      var weekYearExports = weekYear$1.exports;
      const weekYear = /* @__PURE__ */ getDefaultExportFromCjs(weekYearExports);
      var dayOfYear$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, t) {
          module2.exports = t();
        }(commonjsGlobal, function() {
          return function(e, t, n) {
            t.prototype.dayOfYear = function(e2) {
              var t2 = Math.round((n(this).startOf("day") - n(this).startOf("year")) / 864e5) + 1;
              return null == e2 ? t2 : this.add(e2 - t2, "day");
            };
          };
        });
      })(dayOfYear$1);
      var dayOfYearExports = dayOfYear$1.exports;
      const dayOfYear = /* @__PURE__ */ getDefaultExportFromCjs(dayOfYearExports);
      var isSameOrAfter$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, t) {
          module2.exports = t();
        }(commonjsGlobal, function() {
          return function(e, t) {
            t.prototype.isSameOrAfter = function(e2, t2) {
              return this.isSame(e2, t2) || this.isAfter(e2, t2);
            };
          };
        });
      })(isSameOrAfter$1);
      var isSameOrAfterExports = isSameOrAfter$1.exports;
      const isSameOrAfter = /* @__PURE__ */ getDefaultExportFromCjs(isSameOrAfterExports);
      var isSameOrBefore$1 = { exports: {} };
      (function(module2, exports2) {
        !function(e, i) {
          module2.exports = i();
        }(commonjsGlobal, function() {
          return function(e, i) {
            i.prototype.isSameOrBefore = function(e2, i2) {
              return this.isSame(e2, i2) || this.isBefore(e2, i2);
            };
          };
        });
      })(isSameOrBefore$1);
      var isSameOrBeforeExports = isSameOrBefore$1.exports;
      const isSameOrBefore = /* @__PURE__ */ getDefaultExportFromCjs(isSameOrBeforeExports);
      const ROOT_PICKER_INJECTION_KEY = Symbol();
      const datePickerProps = buildProps({
        ...timePickerDefaultProps,
        type: {
          type: definePropType(String),
          default: "date"
        }
      });
      const selectionModes = ["date", "dates", "year", "month", "week", "range"];
      const datePickerSharedProps = buildProps({
        disabledDate: {
          type: definePropType(Function)
        },
        date: {
          type: definePropType(Object),
          required: true
        },
        minDate: {
          type: definePropType(Object)
        },
        maxDate: {
          type: definePropType(Object)
        },
        parsedValue: {
          type: definePropType([Object, Array])
        },
        rangeState: {
          type: definePropType(Object),
          default: () => ({
            endDate: null,
            selecting: false
          })
        }
      });
      const panelSharedProps = buildProps({
        type: {
          type: definePropType(String),
          required: true,
          values: datePickTypes
        }
      });
      const panelRangeSharedProps = buildProps({
        unlinkPanels: Boolean,
        parsedValue: {
          type: definePropType(Array)
        }
      });
      const selectionModeWithDefault = (mode) => {
        return {
          type: String,
          values: selectionModes,
          default: mode
        };
      };
      const panelDatePickProps = buildProps({
        ...panelSharedProps,
        parsedValue: {
          type: definePropType([Object, Array])
        },
        visible: {
          type: Boolean
        },
        format: {
          type: String,
          default: ""
        }
      });
      const basicDateTableProps = buildProps({
        ...datePickerSharedProps,
        cellClassName: {
          type: definePropType(Function)
        },
        showWeekNumber: Boolean,
        selectionMode: selectionModeWithDefault("date")
      });
      const isValidRange = (range) => {
        if (!isArray$2(range))
          return false;
        const [left, right] = range;
        return dayjs.isDayjs(left) && dayjs.isDayjs(right) && left.isSameOrBefore(right);
      };
      const getDefaultValue = (defaultValue, { lang, unit: unit2, unlinkPanels }) => {
        let start;
        if (isArray$2(defaultValue)) {
          let [left, right] = defaultValue.map((d) => dayjs(d).locale(lang));
          if (!unlinkPanels) {
            right = left.add(1, unit2);
          }
          return [left, right];
        } else if (defaultValue) {
          start = dayjs(defaultValue);
        } else {
          start = dayjs();
        }
        start = start.locale(lang);
        return [start, start.add(1, unit2)];
      };
      const buildPickerTable = (dimension, rows, {
        columnIndexOffset,
        startDate,
        nextEndDate,
        now: now2,
        unit: unit2,
        relativeDateGetter,
        setCellMetadata,
        setRowMetadata
      }) => {
        for (let rowIndex = 0; rowIndex < dimension.row; rowIndex++) {
          const row = rows[rowIndex];
          for (let columnIndex = 0; columnIndex < dimension.column; columnIndex++) {
            let cell = row[columnIndex + columnIndexOffset];
            if (!cell) {
              cell = {
                row: rowIndex,
                column: columnIndex,
                type: "normal",
                inRange: false,
                start: false,
                end: false
              };
            }
            const index = rowIndex * dimension.column + columnIndex;
            const nextStartDate = relativeDateGetter(index);
            cell.dayjs = nextStartDate;
            cell.date = nextStartDate.toDate();
            cell.timestamp = nextStartDate.valueOf();
            cell.type = "normal";
            cell.inRange = !!(startDate && nextStartDate.isSameOrAfter(startDate, unit2) && nextEndDate && nextStartDate.isSameOrBefore(nextEndDate, unit2)) || !!(startDate && nextStartDate.isSameOrBefore(startDate, unit2) && nextEndDate && nextStartDate.isSameOrAfter(nextEndDate, unit2));
            if (startDate == null ? void 0 : startDate.isSameOrAfter(nextEndDate)) {
              cell.start = !!nextEndDate && nextStartDate.isSame(nextEndDate, unit2);
              cell.end = startDate && nextStartDate.isSame(startDate, unit2);
            } else {
              cell.start = !!startDate && nextStartDate.isSame(startDate, unit2);
              cell.end = !!nextEndDate && nextStartDate.isSame(nextEndDate, unit2);
            }
            const isToday = nextStartDate.isSame(now2, unit2);
            if (isToday) {
              cell.type = "today";
            }
            setCellMetadata == null ? void 0 : setCellMetadata(cell, { rowIndex, columnIndex });
            row[columnIndex + columnIndexOffset] = cell;
          }
          setRowMetadata == null ? void 0 : setRowMetadata(row);
        }
      };
      const basicCellProps = buildProps({
        cell: {
          type: definePropType(Object)
        }
      });
      var ElDatePickerCell = vue.defineComponent({
        name: "ElDatePickerCell",
        props: basicCellProps,
        setup(props) {
          const ns = useNamespace("date-table-cell");
          const {
            slots
          } = vue.inject(ROOT_PICKER_INJECTION_KEY);
          return () => {
            const {
              cell
            } = props;
            if (slots.default) {
              const list = slots.default(cell).filter((item) => {
                return item.patchFlag !== -2 && item.type.toString() !== "Symbol(Comment)";
              });
              if (list.length) {
                return list;
              }
            }
            return vue.createVNode("div", {
              "class": ns.b()
            }, [vue.createVNode("span", {
              "class": ns.e("text")
            }, [cell == null ? void 0 : cell.text])]);
          };
        }
      });
      const _hoisted_1$h = ["aria-label", "onMousedown"];
      const _hoisted_2$f = {
        key: 0,
        scope: "col"
      };
      const _hoisted_3$b = ["aria-label"];
      const _hoisted_4$6 = ["aria-current", "aria-selected", "tabindex"];
      const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
        __name: "basic-date-table",
        props: basicDateTableProps,
        emits: ["changerange", "pick", "select"],
        setup(__props, { expose, emit }) {
          const props = __props;
          const ns = useNamespace("date-table");
          const { t, lang } = useLocale();
          const tbodyRef = vue.ref();
          const currentCellRef = vue.ref();
          const lastRow = vue.ref();
          const lastColumn = vue.ref();
          const tableRows = vue.ref([[], [], [], [], [], []]);
          let focusWithClick = false;
          const firstDayOfWeek = props.date.$locale().weekStart || 7;
          const WEEKS_CONSTANT = props.date.locale("en").localeData().weekdaysShort().map((_) => _.toLowerCase());
          const offsetDay = vue.computed(() => {
            return firstDayOfWeek > 3 ? 7 - firstDayOfWeek : -firstDayOfWeek;
          });
          const startDate = vue.computed(() => {
            const startDayOfMonth = props.date.startOf("month");
            return startDayOfMonth.subtract(startDayOfMonth.day() || 7, "day");
          });
          const WEEKS = vue.computed(() => {
            return WEEKS_CONSTANT.concat(WEEKS_CONSTANT).slice(firstDayOfWeek, firstDayOfWeek + 7);
          });
          const hasCurrent = vue.computed(() => {
            return flatten(rows.value).some((row) => {
              return row.isCurrent;
            });
          });
          const days = vue.computed(() => {
            const startOfMonth = props.date.startOf("month");
            const startOfMonthDay = startOfMonth.day() || 7;
            const dateCountOfMonth = startOfMonth.daysInMonth();
            const dateCountOfLastMonth = startOfMonth.subtract(1, "month").daysInMonth();
            return {
              startOfMonthDay,
              dateCountOfMonth,
              dateCountOfLastMonth
            };
          });
          const selectedDate = vue.computed(() => {
            return props.selectionMode === "dates" ? castArray(props.parsedValue) : [];
          });
          const setDateText = (cell, {
            count,
            rowIndex,
            columnIndex
          }) => {
            const { startOfMonthDay, dateCountOfMonth, dateCountOfLastMonth } = vue.unref(days);
            const offset = vue.unref(offsetDay);
            if (rowIndex >= 0 && rowIndex <= 1) {
              const numberOfDaysFromPreviousMonth = startOfMonthDay + offset < 0 ? 7 + startOfMonthDay + offset : startOfMonthDay + offset;
              if (columnIndex + rowIndex * 7 >= numberOfDaysFromPreviousMonth) {
                cell.text = count;
                return true;
              } else {
                cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - columnIndex % 7) + 1 + rowIndex * 7;
                cell.type = "prev-month";
              }
            } else {
              if (count <= dateCountOfMonth) {
                cell.text = count;
              } else {
                cell.text = count - dateCountOfMonth;
                cell.type = "next-month";
              }
              return true;
            }
            return false;
          };
          const setCellMetadata = (cell, {
            columnIndex,
            rowIndex
          }, count) => {
            const { disabledDate: disabledDate2, cellClassName } = props;
            const _selectedDate = vue.unref(selectedDate);
            const shouldIncrement = setDateText(cell, { count, rowIndex, columnIndex });
            const cellDate = cell.dayjs.toDate();
            cell.selected = _selectedDate.find((d) => d.valueOf() === cell.dayjs.valueOf());
            cell.isSelected = !!cell.selected;
            cell.isCurrent = isCurrent(cell);
            cell.disabled = disabledDate2 == null ? void 0 : disabledDate2(cellDate);
            cell.customClass = cellClassName == null ? void 0 : cellClassName(cellDate);
            return shouldIncrement;
          };
          const setRowMetadata = (row) => {
            if (props.selectionMode === "week") {
              const [start, end] = props.showWeekNumber ? [1, 7] : [0, 6];
              const isActive = isWeekActive(row[start + 1]);
              row[start].inRange = isActive;
              row[start].start = isActive;
              row[end].inRange = isActive;
              row[end].end = isActive;
            }
          };
          const rows = vue.computed(() => {
            const { minDate, maxDate, rangeState, showWeekNumber } = props;
            const offset = offsetDay.value;
            const rows_ = tableRows.value;
            const dateUnit = "day";
            let count = 1;
            if (showWeekNumber) {
              for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
                if (!rows_[rowIndex][0]) {
                  rows_[rowIndex][0] = {
                    type: "week",
                    text: startDate.value.add(rowIndex * 7 + 1, dateUnit).week()
                  };
                }
              }
            }
            buildPickerTable({ row: 6, column: 7 }, rows_, {
              startDate: minDate,
              columnIndexOffset: showWeekNumber ? 1 : 0,
              nextEndDate: rangeState.endDate || maxDate || rangeState.selecting && minDate || null,
              now: dayjs().locale(vue.unref(lang)).startOf(dateUnit),
              unit: dateUnit,
              relativeDateGetter: (idx) => startDate.value.add(idx - offset, dateUnit),
              setCellMetadata: (...args) => {
                if (setCellMetadata(...args, count)) {
                  count += 1;
                }
              },
              setRowMetadata
            });
            return rows_;
          });
          vue.watch(() => props.date, async () => {
            var _a2, _b;
            if ((_a2 = tbodyRef.value) == null ? void 0 : _a2.contains(document.activeElement)) {
              await vue.nextTick();
              (_b = currentCellRef.value) == null ? void 0 : _b.focus();
            }
          });
          const focus = async () => {
            var _a2;
            (_a2 = currentCellRef.value) == null ? void 0 : _a2.focus();
          };
          const isNormalDay = (type = "") => {
            return ["normal", "today"].includes(type);
          };
          const isCurrent = (cell) => {
            return props.selectionMode === "date" && isNormalDay(cell.type) && cellMatchesDate(cell, props.parsedValue);
          };
          const cellMatchesDate = (cell, date2) => {
            if (!date2)
              return false;
            return dayjs(date2).locale(lang.value).isSame(props.date.date(Number(cell.text)), "day");
          };
          const getCellClasses = (cell) => {
            const classes = [];
            if (isNormalDay(cell.type) && !cell.disabled) {
              classes.push("available");
              if (cell.type === "today") {
                classes.push("today");
              }
            } else {
              classes.push(cell.type);
            }
            if (isCurrent(cell)) {
              classes.push("current");
            }
            if (cell.inRange && (isNormalDay(cell.type) || props.selectionMode === "week")) {
              classes.push("in-range");
              if (cell.start) {
                classes.push("start-date");
              }
              if (cell.end) {
                classes.push("end-date");
              }
            }
            if (cell.disabled) {
              classes.push("disabled");
            }
            if (cell.selected) {
              classes.push("selected");
            }
            if (cell.customClass) {
              classes.push(cell.customClass);
            }
            return classes.join(" ");
          };
          const getDateOfCell = (row, column) => {
            const offsetFromStart = row * 7 + (column - (props.showWeekNumber ? 1 : 0)) - offsetDay.value;
            return startDate.value.add(offsetFromStart, "day");
          };
          const handleMouseMove = (event) => {
            var _a2;
            if (!props.rangeState.selecting)
              return;
            let target = event.target;
            if (target.tagName === "SPAN") {
              target = (_a2 = target.parentNode) == null ? void 0 : _a2.parentNode;
            }
            if (target.tagName === "DIV") {
              target = target.parentNode;
            }
            if (target.tagName !== "TD")
              return;
            const row = target.parentNode.rowIndex - 1;
            const column = target.cellIndex;
            if (rows.value[row][column].disabled)
              return;
            if (row !== lastRow.value || column !== lastColumn.value) {
              lastRow.value = row;
              lastColumn.value = column;
              emit("changerange", {
                selecting: true,
                endDate: getDateOfCell(row, column)
              });
            }
          };
          const isSelectedCell = (cell) => {
            return !hasCurrent.value && (cell == null ? void 0 : cell.text) === 1 && cell.type === "normal" || cell.isCurrent;
          };
          const handleFocus = (event) => {
            if (focusWithClick || hasCurrent.value || props.selectionMode !== "date")
              return;
            handlePickDate(event, true);
          };
          const handleMouseDown = (event) => {
            const target = event.target.closest("td");
            if (!target)
              return;
            focusWithClick = true;
          };
          const handleMouseUp = (event) => {
            const target = event.target.closest("td");
            if (!target)
              return;
            focusWithClick = false;
          };
          const handlePickDate = (event, isKeyboardMovement = false) => {
            const target = event.target.closest("td");
            if (!target)
              return;
            const row = target.parentNode.rowIndex - 1;
            const column = target.cellIndex;
            const cell = rows.value[row][column];
            if (cell.disabled || cell.type === "week")
              return;
            const newDate = getDateOfCell(row, column);
            if (props.selectionMode === "range") {
              if (!props.rangeState.selecting || !props.minDate) {
                emit("pick", { minDate: newDate, maxDate: null });
                emit("select", true);
              } else {
                if (newDate >= props.minDate) {
                  emit("pick", { minDate: props.minDate, maxDate: newDate });
                } else {
                  emit("pick", { minDate: newDate, maxDate: props.minDate });
                }
                emit("select", false);
              }
            } else if (props.selectionMode === "date") {
              emit("pick", newDate, isKeyboardMovement);
            } else if (props.selectionMode === "week") {
              const weekNumber = newDate.week();
              const value = `${newDate.year()}w${weekNumber}`;
              emit("pick", {
                year: newDate.year(),
                week: weekNumber,
                value,
                date: newDate.startOf("week")
              });
            } else if (props.selectionMode === "dates") {
              const newValue = cell.selected ? castArray(props.parsedValue).filter((d) => (d == null ? void 0 : d.valueOf()) !== newDate.valueOf()) : castArray(props.parsedValue).concat([newDate]);
              emit("pick", newValue);
            }
          };
          const isWeekActive = (cell) => {
            if (props.selectionMode !== "week")
              return false;
            let newDate = props.date.startOf("day");
            if (cell.type === "prev-month") {
              newDate = newDate.subtract(1, "month");
            }
            if (cell.type === "next-month") {
              newDate = newDate.add(1, "month");
            }
            newDate = newDate.date(Number.parseInt(cell.text, 10));
            if (props.parsedValue && !Array.isArray(props.parsedValue)) {
              const dayOffset = (props.parsedValue.day() - firstDayOfWeek + 7) % 7 - 1;
              const weekDate = props.parsedValue.subtract(dayOffset, "day");
              return weekDate.isSame(newDate, "day");
            }
            return false;
          };
          expose({
            focus
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("table", {
              role: "grid",
              "aria-label": vue.unref(t)("el.datepicker.dateTablePrompt"),
              cellspacing: "0",
              cellpadding: "0",
              class: vue.normalizeClass([vue.unref(ns).b(), { "is-week-mode": _ctx.selectionMode === "week" }]),
              onClick: handlePickDate,
              onMousemove: handleMouseMove,
              onMousedown: vue.withModifiers(handleMouseDown, ["prevent"]),
              onMouseup: handleMouseUp
            }, [
              vue.createElementVNode("tbody", {
                ref_key: "tbodyRef",
                ref: tbodyRef
              }, [
                vue.createElementVNode("tr", null, [
                  _ctx.showWeekNumber ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_2$f, vue.toDisplayString(vue.unref(t)("el.datepicker.week")), 1)) : vue.createCommentVNode("v-if", true),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(WEEKS), (week, key) => {
                    return vue.openBlock(), vue.createElementBlock("th", {
                      key,
                      scope: "col",
                      "aria-label": vue.unref(t)("el.datepicker.weeksFull." + week)
                    }, vue.toDisplayString(vue.unref(t)("el.datepicker.weeks." + week)), 9, _hoisted_3$b);
                  }), 128))
                ]),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(rows), (row, rowKey) => {
                  return vue.openBlock(), vue.createElementBlock("tr", {
                    key: rowKey,
                    class: vue.normalizeClass([vue.unref(ns).e("row"), { current: isWeekActive(row[1]) }])
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(row, (cell, columnKey) => {
                      return vue.openBlock(), vue.createElementBlock("td", {
                        key: `${rowKey}.${columnKey}`,
                        ref_for: true,
                        ref: (el) => isSelectedCell(cell) && (currentCellRef.value = el),
                        class: vue.normalizeClass(getCellClasses(cell)),
                        "aria-current": cell.isCurrent ? "date" : void 0,
                        "aria-selected": cell.isCurrent,
                        tabindex: isSelectedCell(cell) ? 0 : -1,
                        onFocus: handleFocus
                      }, [
                        vue.createVNode(vue.unref(ElDatePickerCell), { cell }, null, 8, ["cell"])
                      ], 42, _hoisted_4$6);
                    }), 128))
                  ], 2);
                }), 128))
              ], 512)
            ], 42, _hoisted_1$h);
          };
        }
      });
      var DateTable = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-date-table.vue"]]);
      const basicMonthTableProps = buildProps({
        ...datePickerSharedProps,
        selectionMode: selectionModeWithDefault("month")
      });
      const _hoisted_1$g = ["aria-label"];
      const _hoisted_2$e = ["aria-selected", "aria-label", "tabindex", "onKeydown"];
      const _hoisted_3$a = { class: "cell" };
      const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
        __name: "basic-month-table",
        props: basicMonthTableProps,
        emits: ["changerange", "pick", "select"],
        setup(__props, { expose, emit }) {
          const props = __props;
          const datesInMonth = (year, month, lang2) => {
            const firstDay = dayjs().locale(lang2).startOf("month").month(month).year(year);
            const numOfDays = firstDay.daysInMonth();
            return rangeArr(numOfDays).map((n) => firstDay.add(n, "day").toDate());
          };
          const ns = useNamespace("month-table");
          const { t, lang } = useLocale();
          const tbodyRef = vue.ref();
          const currentCellRef = vue.ref();
          const months = vue.ref(props.date.locale("en").localeData().monthsShort().map((_) => _.toLowerCase()));
          const tableRows = vue.ref([
            [],
            [],
            []
          ]);
          const lastRow = vue.ref();
          const lastColumn = vue.ref();
          const rows = vue.computed(() => {
            var _a2, _b;
            const rows2 = tableRows.value;
            const now2 = dayjs().locale(lang.value).startOf("month");
            for (let i = 0; i < 3; i++) {
              const row = rows2[i];
              for (let j = 0; j < 4; j++) {
                const cell = row[j] || (row[j] = {
                  row: i,
                  column: j,
                  type: "normal",
                  inRange: false,
                  start: false,
                  end: false,
                  text: -1,
                  disabled: false
                });
                cell.type = "normal";
                const index = i * 4 + j;
                const calTime = props.date.startOf("year").month(index);
                const calEndDate = props.rangeState.endDate || props.maxDate || props.rangeState.selecting && props.minDate || null;
                cell.inRange = !!(props.minDate && calTime.isSameOrAfter(props.minDate, "month") && calEndDate && calTime.isSameOrBefore(calEndDate, "month")) || !!(props.minDate && calTime.isSameOrBefore(props.minDate, "month") && calEndDate && calTime.isSameOrAfter(calEndDate, "month"));
                if ((_a2 = props.minDate) == null ? void 0 : _a2.isSameOrAfter(calEndDate)) {
                  cell.start = !!(calEndDate && calTime.isSame(calEndDate, "month"));
                  cell.end = props.minDate && calTime.isSame(props.minDate, "month");
                } else {
                  cell.start = !!(props.minDate && calTime.isSame(props.minDate, "month"));
                  cell.end = !!(calEndDate && calTime.isSame(calEndDate, "month"));
                }
                const isToday = now2.isSame(calTime);
                if (isToday) {
                  cell.type = "today";
                }
                cell.text = index;
                cell.disabled = ((_b = props.disabledDate) == null ? void 0 : _b.call(props, calTime.toDate())) || false;
              }
            }
            return rows2;
          });
          const focus = () => {
            var _a2;
            (_a2 = currentCellRef.value) == null ? void 0 : _a2.focus();
          };
          const getCellStyle = (cell) => {
            const style = {};
            const year = props.date.year();
            const today = /* @__PURE__ */ new Date();
            const month = cell.text;
            style.disabled = props.disabledDate ? datesInMonth(year, month, lang.value).every(props.disabledDate) : false;
            style.current = castArray(props.parsedValue).findIndex((date2) => dayjs.isDayjs(date2) && date2.year() === year && date2.month() === month) >= 0;
            style.today = today.getFullYear() === year && today.getMonth() === month;
            if (cell.inRange) {
              style["in-range"] = true;
              if (cell.start) {
                style["start-date"] = true;
              }
              if (cell.end) {
                style["end-date"] = true;
              }
            }
            return style;
          };
          const isSelectedCell = (cell) => {
            const year = props.date.year();
            const month = cell.text;
            return castArray(props.date).findIndex((date2) => date2.year() === year && date2.month() === month) >= 0;
          };
          const handleMouseMove = (event) => {
            var _a2;
            if (!props.rangeState.selecting)
              return;
            let target = event.target;
            if (target.tagName === "A") {
              target = (_a2 = target.parentNode) == null ? void 0 : _a2.parentNode;
            }
            if (target.tagName === "DIV") {
              target = target.parentNode;
            }
            if (target.tagName !== "TD")
              return;
            const row = target.parentNode.rowIndex;
            const column = target.cellIndex;
            if (rows.value[row][column].disabled)
              return;
            if (row !== lastRow.value || column !== lastColumn.value) {
              lastRow.value = row;
              lastColumn.value = column;
              emit("changerange", {
                selecting: true,
                endDate: props.date.startOf("year").month(row * 4 + column)
              });
            }
          };
          const handleMonthTableClick = (event) => {
            var _a2;
            const target = (_a2 = event.target) == null ? void 0 : _a2.closest("td");
            if ((target == null ? void 0 : target.tagName) !== "TD")
              return;
            if (hasClass(target, "disabled"))
              return;
            const column = target.cellIndex;
            const row = target.parentNode.rowIndex;
            const month = row * 4 + column;
            const newDate = props.date.startOf("year").month(month);
            if (props.selectionMode === "range") {
              if (!props.rangeState.selecting) {
                emit("pick", { minDate: newDate, maxDate: null });
                emit("select", true);
              } else {
                if (props.minDate && newDate >= props.minDate) {
                  emit("pick", { minDate: props.minDate, maxDate: newDate });
                } else {
                  emit("pick", { minDate: newDate, maxDate: props.minDate });
                }
                emit("select", false);
              }
            } else {
              emit("pick", month);
            }
          };
          vue.watch(() => props.date, async () => {
            var _a2, _b;
            if ((_a2 = tbodyRef.value) == null ? void 0 : _a2.contains(document.activeElement)) {
              await vue.nextTick();
              (_b = currentCellRef.value) == null ? void 0 : _b.focus();
            }
          });
          expose({
            focus
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("table", {
              role: "grid",
              "aria-label": vue.unref(t)("el.datepicker.monthTablePrompt"),
              class: vue.normalizeClass(vue.unref(ns).b()),
              onClick: handleMonthTableClick,
              onMousemove: handleMouseMove
            }, [
              vue.createElementVNode("tbody", {
                ref_key: "tbodyRef",
                ref: tbodyRef
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(rows), (row, key) => {
                  return vue.openBlock(), vue.createElementBlock("tr", { key }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(row, (cell, key_) => {
                      return vue.openBlock(), vue.createElementBlock("td", {
                        key: key_,
                        ref_for: true,
                        ref: (el) => isSelectedCell(cell) && (currentCellRef.value = el),
                        class: vue.normalizeClass(getCellStyle(cell)),
                        "aria-selected": `${isSelectedCell(cell)}`,
                        "aria-label": vue.unref(t)(`el.datepicker.month${+cell.text + 1}`),
                        tabindex: isSelectedCell(cell) ? 0 : -1,
                        onKeydown: [
                          vue.withKeys(vue.withModifiers(handleMonthTableClick, ["prevent", "stop"]), ["space"]),
                          vue.withKeys(vue.withModifiers(handleMonthTableClick, ["prevent", "stop"]), ["enter"])
                        ]
                      }, [
                        vue.createElementVNode("div", null, [
                          vue.createElementVNode("span", _hoisted_3$a, vue.toDisplayString(vue.unref(t)("el.datepicker.months." + months.value[cell.text])), 1)
                        ])
                      ], 42, _hoisted_2$e);
                    }), 128))
                  ]);
                }), 128))
              ], 512)
            ], 42, _hoisted_1$g);
          };
        }
      });
      var MonthTable = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-month-table.vue"]]);
      const { date, disabledDate, parsedValue } = datePickerSharedProps;
      const basicYearTableProps = buildProps({
        date,
        disabledDate,
        parsedValue
      });
      const _hoisted_1$f = ["aria-label"];
      const _hoisted_2$d = ["aria-selected", "tabindex", "onKeydown"];
      const _hoisted_3$9 = { class: "cell" };
      const _hoisted_4$5 = { key: 1 };
      const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
        __name: "basic-year-table",
        props: basicYearTableProps,
        emits: ["pick"],
        setup(__props, { expose, emit }) {
          const props = __props;
          const datesInYear = (year, lang2) => {
            const firstDay = dayjs(String(year)).locale(lang2).startOf("year");
            const lastDay = firstDay.endOf("year");
            const numOfDays = lastDay.dayOfYear();
            return rangeArr(numOfDays).map((n) => firstDay.add(n, "day").toDate());
          };
          const ns = useNamespace("year-table");
          const { t, lang } = useLocale();
          const tbodyRef = vue.ref();
          const currentCellRef = vue.ref();
          const startYear = vue.computed(() => {
            return Math.floor(props.date.year() / 10) * 10;
          });
          const focus = () => {
            var _a2;
            (_a2 = currentCellRef.value) == null ? void 0 : _a2.focus();
          };
          const getCellKls = (year) => {
            const kls = {};
            const today = dayjs().locale(lang.value);
            kls.disabled = props.disabledDate ? datesInYear(year, lang.value).every(props.disabledDate) : false;
            kls.current = castArray(props.parsedValue).findIndex((d) => d.year() === year) >= 0;
            kls.today = today.year() === year;
            return kls;
          };
          const isSelectedCell = (year) => {
            return year === startYear.value && props.date.year() < startYear.value && props.date.year() > startYear.value + 9 || castArray(props.date).findIndex((date2) => date2.year() === year) >= 0;
          };
          const handleYearTableClick = (event) => {
            const clickTarget = event.target;
            const target = clickTarget.closest("td");
            if (target && target.textContent) {
              if (hasClass(target, "disabled"))
                return;
              const year = target.textContent || target.innerText;
              emit("pick", Number(year));
            }
          };
          vue.watch(() => props.date, async () => {
            var _a2, _b;
            if ((_a2 = tbodyRef.value) == null ? void 0 : _a2.contains(document.activeElement)) {
              await vue.nextTick();
              (_b = currentCellRef.value) == null ? void 0 : _b.focus();
            }
          });
          expose({
            focus
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("table", {
              role: "grid",
              "aria-label": vue.unref(t)("el.datepicker.yearTablePrompt"),
              class: vue.normalizeClass(vue.unref(ns).b()),
              onClick: handleYearTableClick
            }, [
              vue.createElementVNode("tbody", {
                ref_key: "tbodyRef",
                ref: tbodyRef
              }, [
                (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(3, (_, i) => {
                  return vue.createElementVNode("tr", { key: i }, [
                    (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(4, (__, j) => {
                      return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                        key: i + "_" + j
                      }, [
                        i * 4 + j < 10 ? (vue.openBlock(), vue.createElementBlock("td", {
                          key: 0,
                          ref_for: true,
                          ref: (el) => isSelectedCell(vue.unref(startYear) + i * 4 + j) && (currentCellRef.value = el),
                          class: vue.normalizeClass(["available", getCellKls(vue.unref(startYear) + i * 4 + j)]),
                          "aria-selected": `${isSelectedCell(vue.unref(startYear) + i * 4 + j)}`,
                          tabindex: isSelectedCell(vue.unref(startYear) + i * 4 + j) ? 0 : -1,
                          onKeydown: [
                            vue.withKeys(vue.withModifiers(handleYearTableClick, ["prevent", "stop"]), ["space"]),
                            vue.withKeys(vue.withModifiers(handleYearTableClick, ["prevent", "stop"]), ["enter"])
                          ]
                        }, [
                          vue.createElementVNode("span", _hoisted_3$9, vue.toDisplayString(vue.unref(startYear) + i * 4 + j), 1)
                        ], 42, _hoisted_2$d)) : (vue.openBlock(), vue.createElementBlock("td", _hoisted_4$5))
                      ], 64);
                    }), 64))
                  ]);
                }), 64))
              ], 512)
            ], 10, _hoisted_1$f);
          };
        }
      });
      var YearTable = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-year-table.vue"]]);
      const _hoisted_1$e = ["onClick"];
      const _hoisted_2$c = ["aria-label"];
      const _hoisted_3$8 = ["aria-label"];
      const _hoisted_4$4 = ["aria-label"];
      const _hoisted_5$3 = ["aria-label"];
      const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
        __name: "panel-date-pick",
        props: panelDatePickProps,
        emits: ["pick", "set-picker-option", "panel-change"],
        setup(__props, { emit: contextEmit }) {
          const props = __props;
          const timeWithinRange = (_, __, ___) => true;
          const ppNs = useNamespace("picker-panel");
          const dpNs = useNamespace("date-picker");
          const attrs = vue.useAttrs();
          const slots = vue.useSlots();
          const { t, lang } = useLocale();
          const pickerBase = vue.inject("EP_PICKER_BASE");
          const popper = vue.inject(TOOLTIP_INJECTION_KEY);
          const { shortcuts: shortcuts2, disabledDate: disabledDate2, cellClassName, defaultTime, arrowControl } = pickerBase.props;
          const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
          const currentViewRef = vue.ref();
          const innerDate = vue.ref(dayjs().locale(lang.value));
          const isChangeToNow = vue.ref(false);
          const defaultTimeD = vue.computed(() => {
            return dayjs(defaultTime).locale(lang.value);
          });
          const month = vue.computed(() => {
            return innerDate.value.month();
          });
          const year = vue.computed(() => {
            return innerDate.value.year();
          });
          const selectableRange = vue.ref([]);
          const userInputDate = vue.ref(null);
          const userInputTime = vue.ref(null);
          const checkDateWithinRange = (date2) => {
            return selectableRange.value.length > 0 ? timeWithinRange(date2, selectableRange.value, props.format || "HH:mm:ss") : true;
          };
          const formatEmit = (emitDayjs) => {
            if (defaultTime && !visibleTime.value && !isChangeToNow.value) {
              return defaultTimeD.value.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
            }
            if (showTime.value)
              return emitDayjs.millisecond(0);
            return emitDayjs.startOf("day");
          };
          const emit = (value, ...args) => {
            if (!value) {
              contextEmit("pick", value, ...args);
            } else if (isArray$2(value)) {
              const dates = value.map(formatEmit);
              contextEmit("pick", dates, ...args);
            } else {
              contextEmit("pick", formatEmit(value), ...args);
            }
            userInputDate.value = null;
            userInputTime.value = null;
            isChangeToNow.value = false;
          };
          const handleDatePick = (value, keepOpen) => {
            if (selectionMode.value === "date") {
              value = value;
              let newDate = props.parsedValue ? props.parsedValue.year(value.year()).month(value.month()).date(value.date()) : value;
              if (!checkDateWithinRange(newDate)) {
                newDate = selectableRange.value[0][0].year(value.year()).month(value.month()).date(value.date());
              }
              innerDate.value = newDate;
              emit(newDate, showTime.value || keepOpen);
            } else if (selectionMode.value === "week") {
              emit(value.date);
            } else if (selectionMode.value === "dates") {
              emit(value, true);
            }
          };
          const moveByMonth = (forward) => {
            const action = forward ? "add" : "subtract";
            innerDate.value = innerDate.value[action](1, "month");
            handlePanelChange("month");
          };
          const moveByYear = (forward) => {
            const currentDate = innerDate.value;
            const action = forward ? "add" : "subtract";
            innerDate.value = currentView.value === "year" ? currentDate[action](10, "year") : currentDate[action](1, "year");
            handlePanelChange("year");
          };
          const currentView = vue.ref("date");
          const yearLabel = vue.computed(() => {
            const yearTranslation = t("el.datepicker.year");
            if (currentView.value === "year") {
              const startYear = Math.floor(year.value / 10) * 10;
              if (yearTranslation) {
                return `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}`;
              }
              return `${startYear} - ${startYear + 9}`;
            }
            return `${year.value} ${yearTranslation}`;
          });
          const handleShortcutClick = (shortcut) => {
            const shortcutValue = isFunction$1(shortcut.value) ? shortcut.value() : shortcut.value;
            if (shortcutValue) {
              emit(dayjs(shortcutValue).locale(lang.value));
              return;
            }
            if (shortcut.onClick) {
              shortcut.onClick({
                attrs,
                slots,
                emit: contextEmit
              });
            }
          };
          const selectionMode = vue.computed(() => {
            const { type } = props;
            if (["week", "month", "year", "dates"].includes(type))
              return type;
            return "date";
          });
          const keyboardMode = vue.computed(() => {
            return selectionMode.value === "date" ? currentView.value : selectionMode.value;
          });
          const hasShortcuts = vue.computed(() => !!shortcuts2.length);
          const handleMonthPick = async (month2) => {
            innerDate.value = innerDate.value.startOf("month").month(month2);
            if (selectionMode.value === "month") {
              emit(innerDate.value, false);
            } else {
              currentView.value = "date";
              if (["month", "year", "date", "week"].includes(selectionMode.value)) {
                emit(innerDate.value, true);
                await vue.nextTick();
                handleFocusPicker();
              }
            }
            handlePanelChange("month");
          };
          const handleYearPick = async (year2) => {
            if (selectionMode.value === "year") {
              innerDate.value = innerDate.value.startOf("year").year(year2);
              emit(innerDate.value, false);
            } else {
              innerDate.value = innerDate.value.year(year2);
              currentView.value = "month";
              if (["month", "year", "date", "week"].includes(selectionMode.value)) {
                emit(innerDate.value, true);
                await vue.nextTick();
                handleFocusPicker();
              }
            }
            handlePanelChange("year");
          };
          const showPicker = async (view) => {
            currentView.value = view;
            await vue.nextTick();
            handleFocusPicker();
          };
          const showTime = vue.computed(() => props.type === "datetime" || props.type === "datetimerange");
          const footerVisible = vue.computed(() => {
            return showTime.value || selectionMode.value === "dates";
          });
          const disabledConfirm = vue.computed(() => {
            if (!disabledDate2)
              return false;
            if (!props.parsedValue)
              return true;
            if (isArray$2(props.parsedValue)) {
              return disabledDate2(props.parsedValue[0].toDate());
            }
            return disabledDate2(props.parsedValue.toDate());
          });
          const onConfirm = () => {
            if (selectionMode.value === "dates") {
              emit(props.parsedValue);
            } else {
              let result = props.parsedValue;
              if (!result) {
                const defaultTimeD2 = dayjs(defaultTime).locale(lang.value);
                const defaultValueD = getDefaultValue2();
                result = defaultTimeD2.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date());
              }
              innerDate.value = result;
              emit(result);
            }
          };
          const disabledNow = vue.computed(() => {
            if (!disabledDate2)
              return false;
            return disabledDate2(dayjs().locale(lang.value).toDate());
          });
          const changeToNow = () => {
            const now2 = dayjs().locale(lang.value);
            const nowDate = now2.toDate();
            isChangeToNow.value = true;
            if ((!disabledDate2 || !disabledDate2(nowDate)) && checkDateWithinRange(nowDate)) {
              innerDate.value = dayjs().locale(lang.value);
              emit(innerDate.value);
            }
          };
          const timeFormat = vue.computed(() => {
            return extractTimeFormat(props.format);
          });
          const dateFormat = vue.computed(() => {
            return extractDateFormat(props.format);
          });
          const visibleTime = vue.computed(() => {
            if (userInputTime.value)
              return userInputTime.value;
            if (!props.parsedValue && !defaultValue.value)
              return;
            return (props.parsedValue || innerDate.value).format(timeFormat.value);
          });
          const visibleDate = vue.computed(() => {
            if (userInputDate.value)
              return userInputDate.value;
            if (!props.parsedValue && !defaultValue.value)
              return;
            return (props.parsedValue || innerDate.value).format(dateFormat.value);
          });
          const timePickerVisible = vue.ref(false);
          const onTimePickerInputFocus = () => {
            timePickerVisible.value = true;
          };
          const handleTimePickClose = () => {
            timePickerVisible.value = false;
          };
          const getUnits = (date2) => {
            return {
              hour: date2.hour(),
              minute: date2.minute(),
              second: date2.second(),
              year: date2.year(),
              month: date2.month(),
              date: date2.date()
            };
          };
          const handleTimePick = (value, visible, first) => {
            const { hour, minute, second } = getUnits(value);
            const newDate = props.parsedValue ? props.parsedValue.hour(hour).minute(minute).second(second) : value;
            innerDate.value = newDate;
            emit(innerDate.value, true);
            if (!first) {
              timePickerVisible.value = visible;
            }
          };
          const handleVisibleTimeChange = (value) => {
            const newDate = dayjs(value, timeFormat.value).locale(lang.value);
            if (newDate.isValid() && checkDateWithinRange(newDate)) {
              const { year: year2, month: month2, date: date2 } = getUnits(innerDate.value);
              innerDate.value = newDate.year(year2).month(month2).date(date2);
              userInputTime.value = null;
              timePickerVisible.value = false;
              emit(innerDate.value, true);
            }
          };
          const handleVisibleDateChange = (value) => {
            const newDate = dayjs(value, dateFormat.value).locale(lang.value);
            if (newDate.isValid()) {
              if (disabledDate2 && disabledDate2(newDate.toDate())) {
                return;
              }
              const { hour, minute, second } = getUnits(innerDate.value);
              innerDate.value = newDate.hour(hour).minute(minute).second(second);
              userInputDate.value = null;
              emit(innerDate.value, true);
            }
          };
          const isValidValue = (date2) => {
            return dayjs.isDayjs(date2) && date2.isValid() && (disabledDate2 ? !disabledDate2(date2.toDate()) : true);
          };
          const formatToString = (value) => {
            if (selectionMode.value === "dates") {
              return value.map((_) => _.format(props.format));
            }
            return value.format(props.format);
          };
          const parseUserInput = (value) => {
            return dayjs(value, props.format).locale(lang.value);
          };
          const getDefaultValue2 = () => {
            const parseDate2 = dayjs(defaultValue.value).locale(lang.value);
            if (!defaultValue.value) {
              const defaultTimeDValue = defaultTimeD.value;
              return dayjs().hour(defaultTimeDValue.hour()).minute(defaultTimeDValue.minute()).second(defaultTimeDValue.second()).locale(lang.value);
            }
            return parseDate2;
          };
          const handleFocusPicker = async () => {
            var _a2;
            if (["week", "month", "year", "date"].includes(selectionMode.value)) {
              (_a2 = currentViewRef.value) == null ? void 0 : _a2.focus();
              if (selectionMode.value === "week") {
                handleKeyControl(EVENT_CODE.down);
              }
            }
          };
          const handleKeydownTable = (event) => {
            const { code } = event;
            const validCode = [
              EVENT_CODE.up,
              EVENT_CODE.down,
              EVENT_CODE.left,
              EVENT_CODE.right,
              EVENT_CODE.home,
              EVENT_CODE.end,
              EVENT_CODE.pageUp,
              EVENT_CODE.pageDown
            ];
            if (validCode.includes(code)) {
              handleKeyControl(code);
              event.stopPropagation();
              event.preventDefault();
            }
            if ([EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.numpadEnter].includes(code) && userInputDate.value === null && userInputTime.value === null) {
              event.preventDefault();
              emit(innerDate.value, false);
            }
          };
          const handleKeyControl = (code) => {
            var _a2;
            const { up, down, left, right, home, end, pageUp, pageDown } = EVENT_CODE;
            const mapping = {
              year: {
                [up]: -4,
                [down]: 4,
                [left]: -1,
                [right]: 1,
                offset: (date2, step) => date2.setFullYear(date2.getFullYear() + step)
              },
              month: {
                [up]: -4,
                [down]: 4,
                [left]: -1,
                [right]: 1,
                offset: (date2, step) => date2.setMonth(date2.getMonth() + step)
              },
              week: {
                [up]: -1,
                [down]: 1,
                [left]: -1,
                [right]: 1,
                offset: (date2, step) => date2.setDate(date2.getDate() + step * 7)
              },
              date: {
                [up]: -7,
                [down]: 7,
                [left]: -1,
                [right]: 1,
                [home]: (date2) => -date2.getDay(),
                [end]: (date2) => -date2.getDay() + 6,
                [pageUp]: (date2) => -new Date(date2.getFullYear(), date2.getMonth(), 0).getDate(),
                [pageDown]: (date2) => new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate(),
                offset: (date2, step) => date2.setDate(date2.getDate() + step)
              }
            };
            const newDate = innerDate.value.toDate();
            while (Math.abs(innerDate.value.diff(newDate, "year", true)) < 1) {
              const map = mapping[keyboardMode.value];
              if (!map)
                return;
              map.offset(newDate, isFunction$1(map[code]) ? map[code](newDate) : (_a2 = map[code]) != null ? _a2 : 0);
              if (disabledDate2 && disabledDate2(newDate)) {
                break;
              }
              const result = dayjs(newDate).locale(lang.value);
              innerDate.value = result;
              contextEmit("pick", result, true);
              break;
            }
          };
          const handlePanelChange = (mode) => {
            contextEmit("panel-change", innerDate.value.toDate(), mode, currentView.value);
          };
          vue.watch(() => selectionMode.value, (val) => {
            if (["month", "year"].includes(val)) {
              currentView.value = val;
              return;
            }
            currentView.value = "date";
          }, { immediate: true });
          vue.watch(() => currentView.value, () => {
            popper == null ? void 0 : popper.updatePopper();
          });
          vue.watch(() => defaultValue.value, (val) => {
            if (val) {
              innerDate.value = getDefaultValue2();
            }
          }, { immediate: true });
          vue.watch(() => props.parsedValue, (val) => {
            if (val) {
              if (selectionMode.value === "dates")
                return;
              if (Array.isArray(val))
                return;
              innerDate.value = val;
            } else {
              innerDate.value = getDefaultValue2();
            }
          }, { immediate: true });
          contextEmit("set-picker-option", ["isValidValue", isValidValue]);
          contextEmit("set-picker-option", ["formatToString", formatToString]);
          contextEmit("set-picker-option", ["parseUserInput", parseUserInput]);
          contextEmit("set-picker-option", ["handleFocusPicker", handleFocusPicker]);
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass([
                vue.unref(ppNs).b(),
                vue.unref(dpNs).b(),
                {
                  "has-sidebar": _ctx.$slots.sidebar || vue.unref(hasShortcuts),
                  "has-time": vue.unref(showTime)
                }
              ])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
              }, [
                vue.renderSlot(_ctx.$slots, "sidebar", {
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                }),
                vue.unref(hasShortcuts) ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(shortcuts2), (shortcut, key) => {
                    return vue.openBlock(), vue.createElementBlock("button", {
                      key,
                      type: "button",
                      class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                      onClick: ($event) => handleShortcutClick(shortcut)
                    }, vue.toDisplayString(shortcut.text), 11, _hoisted_1$e);
                  }), 128))
                ], 2)) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(vue.unref(ppNs).e("body"))
                }, [
                  vue.unref(showTime) ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(dpNs).e("time-header"))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(dpNs).e("editor-wrap"))
                    }, [
                      vue.createVNode(vue.unref(ElInput), {
                        placeholder: vue.unref(t)("el.datepicker.selectDate"),
                        "model-value": vue.unref(visibleDate),
                        size: "small",
                        "validate-event": false,
                        onInput: _cache[0] || (_cache[0] = (val) => userInputDate.value = val),
                        onChange: handleVisibleDateChange
                      }, null, 8, ["placeholder", "model-value"])
                    ], 2),
                    vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
                      class: vue.normalizeClass(vue.unref(dpNs).e("editor-wrap"))
                    }, [
                      vue.createVNode(vue.unref(ElInput), {
                        placeholder: vue.unref(t)("el.datepicker.selectTime"),
                        "model-value": vue.unref(visibleTime),
                        size: "small",
                        "validate-event": false,
                        onFocus: onTimePickerInputFocus,
                        onInput: _cache[1] || (_cache[1] = (val) => userInputTime.value = val),
                        onChange: handleVisibleTimeChange
                      }, null, 8, ["placeholder", "model-value"]),
                      vue.createVNode(vue.unref(TimePickPanel), {
                        visible: timePickerVisible.value,
                        format: vue.unref(timeFormat),
                        "time-arrow-control": vue.unref(arrowControl),
                        "parsed-value": innerDate.value,
                        onPick: handleTimePick
                      }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
                    ], 2)), [
                      [vue.unref(ClickOutside), handleTimePickClose]
                    ])
                  ], 2)) : vue.createCommentVNode("v-if", true),
                  vue.withDirectives(vue.createElementVNode("div", {
                    class: vue.normalizeClass([
                      vue.unref(dpNs).e("header"),
                      (currentView.value === "year" || currentView.value === "month") && vue.unref(dpNs).e("header--bordered")
                    ])
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(dpNs).e("prev-btn"))
                    }, [
                      vue.createElementVNode("button", {
                        type: "button",
                        "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                        class: vue.normalizeClass(["d-arrow-left", vue.unref(ppNs).e("icon-btn")]),
                        onClick: _cache[2] || (_cache[2] = ($event) => moveByYear(false))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_2$c),
                      vue.withDirectives(vue.createElementVNode("button", {
                        type: "button",
                        "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-left"]),
                        onClick: _cache[3] || (_cache[3] = ($event) => moveByMonth(false))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_3$8), [
                        [vue.vShow, currentView.value === "date"]
                      ])
                    ], 2),
                    vue.createElementVNode("span", {
                      role: "button",
                      class: vue.normalizeClass(vue.unref(dpNs).e("header-label")),
                      "aria-live": "polite",
                      tabindex: "0",
                      onKeydown: _cache[4] || (_cache[4] = vue.withKeys(($event) => showPicker("year"), ["enter"])),
                      onClick: _cache[5] || (_cache[5] = ($event) => showPicker("year"))
                    }, vue.toDisplayString(vue.unref(yearLabel)), 35),
                    vue.withDirectives(vue.createElementVNode("span", {
                      role: "button",
                      "aria-live": "polite",
                      tabindex: "0",
                      class: vue.normalizeClass([
                        vue.unref(dpNs).e("header-label"),
                        { active: currentView.value === "month" }
                      ]),
                      onKeydown: _cache[6] || (_cache[6] = vue.withKeys(($event) => showPicker("month"), ["enter"])),
                      onClick: _cache[7] || (_cache[7] = ($event) => showPicker("month"))
                    }, vue.toDisplayString(vue.unref(t)(`el.datepicker.month${vue.unref(month) + 1}`)), 35), [
                      [vue.vShow, currentView.value === "date"]
                    ]),
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(dpNs).e("next-btn"))
                    }, [
                      vue.withDirectives(vue.createElementVNode("button", {
                        type: "button",
                        "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-right"]),
                        onClick: _cache[8] || (_cache[8] = ($event) => moveByMonth(true))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_4$4), [
                        [vue.vShow, currentView.value === "date"]
                      ]),
                      vue.createElementVNode("button", {
                        type: "button",
                        "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                        onClick: _cache[9] || (_cache[9] = ($event) => moveByYear(true))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_5$3)
                    ], 2)
                  ], 2), [
                    [vue.vShow, currentView.value !== "time"]
                  ]),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(vue.unref(ppNs).e("content")),
                    onKeydown: handleKeydownTable
                  }, [
                    currentView.value === "date" ? (vue.openBlock(), vue.createBlock(DateTable, {
                      key: 0,
                      ref_key: "currentViewRef",
                      ref: currentViewRef,
                      "selection-mode": vue.unref(selectionMode),
                      date: innerDate.value,
                      "parsed-value": _ctx.parsedValue,
                      "disabled-date": vue.unref(disabledDate2),
                      "cell-class-name": vue.unref(cellClassName),
                      onPick: handleDatePick
                    }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "cell-class-name"])) : vue.createCommentVNode("v-if", true),
                    currentView.value === "year" ? (vue.openBlock(), vue.createBlock(YearTable, {
                      key: 1,
                      ref_key: "currentViewRef",
                      ref: currentViewRef,
                      date: innerDate.value,
                      "disabled-date": vue.unref(disabledDate2),
                      "parsed-value": _ctx.parsedValue,
                      onPick: handleYearPick
                    }, null, 8, ["date", "disabled-date", "parsed-value"])) : vue.createCommentVNode("v-if", true),
                    currentView.value === "month" ? (vue.openBlock(), vue.createBlock(MonthTable, {
                      key: 2,
                      ref_key: "currentViewRef",
                      ref: currentViewRef,
                      date: innerDate.value,
                      "parsed-value": _ctx.parsedValue,
                      "disabled-date": vue.unref(disabledDate2),
                      onPick: handleMonthPick
                    }, null, 8, ["date", "parsed-value", "disabled-date"])) : vue.createCommentVNode("v-if", true)
                  ], 34)
                ], 2)
              ], 2),
              vue.withDirectives(vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ppNs).e("footer"))
              }, [
                vue.withDirectives(vue.createVNode(vue.unref(ElButton), {
                  text: "",
                  size: "small",
                  class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                  disabled: vue.unref(disabledNow),
                  onClick: changeToNow
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.now")), 1)
                  ]),
                  _: 1
                }, 8, ["class", "disabled"]), [
                  [vue.vShow, vue.unref(selectionMode) !== "dates"]
                ]),
                vue.createVNode(vue.unref(ElButton), {
                  plain: "",
                  size: "small",
                  class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                  disabled: vue.unref(disabledConfirm),
                  onClick: onConfirm
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ], 2), [
                [vue.vShow, vue.unref(footerVisible) && currentView.value === "date"]
              ])
            ], 2);
          };
        }
      });
      var DatePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-date-pick.vue"]]);
      const panelDateRangeProps = buildProps({
        ...panelSharedProps,
        ...panelRangeSharedProps
      });
      const useShortcut = (lang) => {
        const { emit } = vue.getCurrentInstance();
        const attrs = vue.useAttrs();
        const slots = vue.useSlots();
        const handleShortcutClick = (shortcut) => {
          const shortcutValues = isFunction$1(shortcut.value) ? shortcut.value() : shortcut.value;
          if (shortcutValues) {
            emit("pick", [
              dayjs(shortcutValues[0]).locale(lang.value),
              dayjs(shortcutValues[1]).locale(lang.value)
            ]);
            return;
          }
          if (shortcut.onClick) {
            shortcut.onClick({
              attrs,
              slots,
              emit
            });
          }
        };
        return handleShortcutClick;
      };
      const useRangePicker = (props, {
        defaultValue,
        leftDate,
        rightDate,
        unit: unit2,
        onParsedValueChanged
      }) => {
        const { emit } = vue.getCurrentInstance();
        const { pickerNs } = vue.inject(ROOT_PICKER_INJECTION_KEY);
        const drpNs = useNamespace("date-range-picker");
        const { t, lang } = useLocale();
        const handleShortcutClick = useShortcut(lang);
        const minDate = vue.ref();
        const maxDate = vue.ref();
        const rangeState = vue.ref({
          endDate: null,
          selecting: false
        });
        const handleChangeRange = (val) => {
          rangeState.value = val;
        };
        const handleRangeConfirm = (visible = false) => {
          const _minDate = vue.unref(minDate);
          const _maxDate = vue.unref(maxDate);
          if (isValidRange([_minDate, _maxDate])) {
            emit("pick", [_minDate, _maxDate], visible);
          }
        };
        const onSelect = (selecting) => {
          rangeState.value.selecting = selecting;
          if (!selecting) {
            rangeState.value.endDate = null;
          }
        };
        const restoreDefault = () => {
          const [start, end] = getDefaultValue(vue.unref(defaultValue), {
            lang: vue.unref(lang),
            unit: unit2,
            unlinkPanels: props.unlinkPanels
          });
          minDate.value = void 0;
          maxDate.value = void 0;
          leftDate.value = start;
          rightDate.value = end;
        };
        vue.watch(defaultValue, (val) => {
          if (val) {
            restoreDefault();
          }
        }, { immediate: true });
        vue.watch(() => props.parsedValue, (parsedValue2) => {
          if (isArray$2(parsedValue2) && parsedValue2.length === 2) {
            const [start, end] = parsedValue2;
            minDate.value = start;
            leftDate.value = start;
            maxDate.value = end;
            onParsedValueChanged(vue.unref(minDate), vue.unref(maxDate));
          } else {
            restoreDefault();
          }
        }, { immediate: true });
        return {
          minDate,
          maxDate,
          rangeState,
          lang,
          ppNs: pickerNs,
          drpNs,
          handleChangeRange,
          handleRangeConfirm,
          handleShortcutClick,
          onSelect,
          t
        };
      };
      const _hoisted_1$d = ["onClick"];
      const _hoisted_2$b = ["disabled"];
      const _hoisted_3$7 = ["disabled"];
      const _hoisted_4$3 = ["disabled"];
      const _hoisted_5$2 = ["disabled"];
      const unit$1 = "month";
      const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
        __name: "panel-date-range",
        props: panelDateRangeProps,
        emits: [
          "pick",
          "set-picker-option",
          "calendar-change",
          "panel-change"
        ],
        setup(__props, { emit }) {
          const props = __props;
          const pickerBase = vue.inject("EP_PICKER_BASE");
          const {
            disabledDate: disabledDate2,
            cellClassName,
            format,
            defaultTime,
            arrowControl,
            clearable
          } = pickerBase.props;
          const shortcuts2 = vue.toRef(pickerBase.props, "shortcuts");
          const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
          const { lang } = useLocale();
          const leftDate = vue.ref(dayjs().locale(lang.value));
          const rightDate = vue.ref(dayjs().locale(lang.value).add(1, unit$1));
          const {
            minDate,
            maxDate,
            rangeState,
            ppNs,
            drpNs,
            handleChangeRange,
            handleRangeConfirm,
            handleShortcutClick,
            onSelect,
            t
          } = useRangePicker(props, {
            defaultValue,
            leftDate,
            rightDate,
            unit: unit$1,
            onParsedValueChanged
          });
          const dateUserInput = vue.ref({
            min: null,
            max: null
          });
          const timeUserInput = vue.ref({
            min: null,
            max: null
          });
          const leftLabel = vue.computed(() => {
            return `${leftDate.value.year()} ${t("el.datepicker.year")} ${t(`el.datepicker.month${leftDate.value.month() + 1}`)}`;
          });
          const rightLabel = vue.computed(() => {
            return `${rightDate.value.year()} ${t("el.datepicker.year")} ${t(`el.datepicker.month${rightDate.value.month() + 1}`)}`;
          });
          const leftYear = vue.computed(() => {
            return leftDate.value.year();
          });
          const leftMonth = vue.computed(() => {
            return leftDate.value.month();
          });
          const rightYear = vue.computed(() => {
            return rightDate.value.year();
          });
          const rightMonth = vue.computed(() => {
            return rightDate.value.month();
          });
          const hasShortcuts = vue.computed(() => !!shortcuts2.value.length);
          const minVisibleDate = vue.computed(() => {
            if (dateUserInput.value.min !== null)
              return dateUserInput.value.min;
            if (minDate.value)
              return minDate.value.format(dateFormat.value);
            return "";
          });
          const maxVisibleDate = vue.computed(() => {
            if (dateUserInput.value.max !== null)
              return dateUserInput.value.max;
            if (maxDate.value || minDate.value)
              return (maxDate.value || minDate.value).format(dateFormat.value);
            return "";
          });
          const minVisibleTime = vue.computed(() => {
            if (timeUserInput.value.min !== null)
              return timeUserInput.value.min;
            if (minDate.value)
              return minDate.value.format(timeFormat.value);
            return "";
          });
          const maxVisibleTime = vue.computed(() => {
            if (timeUserInput.value.max !== null)
              return timeUserInput.value.max;
            if (maxDate.value || minDate.value)
              return (maxDate.value || minDate.value).format(timeFormat.value);
            return "";
          });
          const timeFormat = vue.computed(() => {
            return extractTimeFormat(format);
          });
          const dateFormat = vue.computed(() => {
            return extractDateFormat(format);
          });
          const leftPrevYear = () => {
            leftDate.value = leftDate.value.subtract(1, "year");
            if (!props.unlinkPanels) {
              rightDate.value = leftDate.value.add(1, "month");
            }
            handlePanelChange("year");
          };
          const leftPrevMonth = () => {
            leftDate.value = leftDate.value.subtract(1, "month");
            if (!props.unlinkPanels) {
              rightDate.value = leftDate.value.add(1, "month");
            }
            handlePanelChange("month");
          };
          const rightNextYear = () => {
            if (!props.unlinkPanels) {
              leftDate.value = leftDate.value.add(1, "year");
              rightDate.value = leftDate.value.add(1, "month");
            } else {
              rightDate.value = rightDate.value.add(1, "year");
            }
            handlePanelChange("year");
          };
          const rightNextMonth = () => {
            if (!props.unlinkPanels) {
              leftDate.value = leftDate.value.add(1, "month");
              rightDate.value = leftDate.value.add(1, "month");
            } else {
              rightDate.value = rightDate.value.add(1, "month");
            }
            handlePanelChange("month");
          };
          const leftNextYear = () => {
            leftDate.value = leftDate.value.add(1, "year");
            handlePanelChange("year");
          };
          const leftNextMonth = () => {
            leftDate.value = leftDate.value.add(1, "month");
            handlePanelChange("month");
          };
          const rightPrevYear = () => {
            rightDate.value = rightDate.value.subtract(1, "year");
            handlePanelChange("year");
          };
          const rightPrevMonth = () => {
            rightDate.value = rightDate.value.subtract(1, "month");
            handlePanelChange("month");
          };
          const handlePanelChange = (mode) => {
            emit("panel-change", [leftDate.value.toDate(), rightDate.value.toDate()], mode);
          };
          const enableMonthArrow = vue.computed(() => {
            const nextMonth = (leftMonth.value + 1) % 12;
            const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
            return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
          });
          const enableYearArrow = vue.computed(() => {
            return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
          });
          const btnDisabled = vue.computed(() => {
            return !(minDate.value && maxDate.value && !rangeState.value.selecting && isValidRange([minDate.value, maxDate.value]));
          });
          const showTime = vue.computed(() => props.type === "datetime" || props.type === "datetimerange");
          const formatEmit = (emitDayjs, index) => {
            if (!emitDayjs)
              return;
            if (defaultTime) {
              const defaultTimeD = dayjs(defaultTime[index] || defaultTime).locale(lang.value);
              return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
            }
            return emitDayjs;
          };
          const handleRangePick = (val, close = true) => {
            const min_ = val.minDate;
            const max_ = val.maxDate;
            const minDate_ = formatEmit(min_, 0);
            const maxDate_ = formatEmit(max_, 1);
            if (maxDate.value === maxDate_ && minDate.value === minDate_) {
              return;
            }
            emit("calendar-change", [min_.toDate(), max_ && max_.toDate()]);
            maxDate.value = maxDate_;
            minDate.value = minDate_;
            if (!close || showTime.value)
              return;
            handleRangeConfirm();
          };
          const minTimePickerVisible = vue.ref(false);
          const maxTimePickerVisible = vue.ref(false);
          const handleMinTimeClose = () => {
            minTimePickerVisible.value = false;
          };
          const handleMaxTimeClose = () => {
            maxTimePickerVisible.value = false;
          };
          const handleDateInput = (value, type) => {
            dateUserInput.value[type] = value;
            const parsedValueD = dayjs(value, dateFormat.value).locale(lang.value);
            if (parsedValueD.isValid()) {
              if (disabledDate2 && disabledDate2(parsedValueD.toDate())) {
                return;
              }
              if (type === "min") {
                leftDate.value = parsedValueD;
                minDate.value = (minDate.value || leftDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
                if (!props.unlinkPanels && (!maxDate.value || maxDate.value.isBefore(minDate.value))) {
                  rightDate.value = parsedValueD.add(1, "month");
                  maxDate.value = minDate.value.add(1, "month");
                }
              } else {
                rightDate.value = parsedValueD;
                maxDate.value = (maxDate.value || rightDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
                if (!props.unlinkPanels && (!minDate.value || minDate.value.isAfter(maxDate.value))) {
                  leftDate.value = parsedValueD.subtract(1, "month");
                  minDate.value = maxDate.value.subtract(1, "month");
                }
              }
            }
          };
          const handleDateChange = (_, type) => {
            dateUserInput.value[type] = null;
          };
          const handleTimeInput = (value, type) => {
            timeUserInput.value[type] = value;
            const parsedValueD = dayjs(value, timeFormat.value).locale(lang.value);
            if (parsedValueD.isValid()) {
              if (type === "min") {
                minTimePickerVisible.value = true;
                minDate.value = (minDate.value || leftDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
                if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
                  maxDate.value = minDate.value;
                }
              } else {
                maxTimePickerVisible.value = true;
                maxDate.value = (maxDate.value || rightDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
                rightDate.value = maxDate.value;
                if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
                  minDate.value = maxDate.value;
                }
              }
            }
          };
          const handleTimeChange = (value, type) => {
            timeUserInput.value[type] = null;
            if (type === "min") {
              leftDate.value = minDate.value;
              minTimePickerVisible.value = false;
            } else {
              rightDate.value = maxDate.value;
              maxTimePickerVisible.value = false;
            }
          };
          const handleMinTimePick = (value, visible, first) => {
            if (timeUserInput.value.min)
              return;
            if (value) {
              leftDate.value = value;
              minDate.value = (minDate.value || leftDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
            }
            if (!first) {
              minTimePickerVisible.value = visible;
            }
            if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
              maxDate.value = minDate.value;
              rightDate.value = value;
            }
          };
          const handleMaxTimePick = (value, visible, first) => {
            if (timeUserInput.value.max)
              return;
            if (value) {
              rightDate.value = value;
              maxDate.value = (maxDate.value || rightDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
            }
            if (!first) {
              maxTimePickerVisible.value = visible;
            }
            if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
              minDate.value = maxDate.value;
            }
          };
          const handleClear = () => {
            leftDate.value = getDefaultValue(vue.unref(defaultValue), {
              lang: vue.unref(lang),
              unit: "month",
              unlinkPanels: props.unlinkPanels
            })[0];
            rightDate.value = leftDate.value.add(1, "month");
            emit("pick", null);
          };
          const formatToString = (value) => {
            return isArray$2(value) ? value.map((_) => _.format(format)) : value.format(format);
          };
          const parseUserInput = (value) => {
            return isArray$2(value) ? value.map((_) => dayjs(_, format).locale(lang.value)) : dayjs(value, format).locale(lang.value);
          };
          function onParsedValueChanged(minDate2, maxDate2) {
            if (props.unlinkPanels && maxDate2) {
              const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
              const minDateMonth = (minDate2 == null ? void 0 : minDate2.month()) || 0;
              const maxDateYear = maxDate2.year();
              const maxDateMonth = maxDate2.month();
              rightDate.value = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? maxDate2.add(1, unit$1) : maxDate2;
            } else {
              rightDate.value = leftDate.value.add(1, unit$1);
              if (maxDate2) {
                rightDate.value = rightDate.value.hour(maxDate2.hour()).minute(maxDate2.minute()).second(maxDate2.second());
              }
            }
          }
          emit("set-picker-option", ["isValidValue", isValidRange]);
          emit("set-picker-option", ["parseUserInput", parseUserInput]);
          emit("set-picker-option", ["formatToString", formatToString]);
          emit("set-picker-option", ["handleClear", handleClear]);
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass([
                vue.unref(ppNs).b(),
                vue.unref(drpNs).b(),
                {
                  "has-sidebar": _ctx.$slots.sidebar || vue.unref(hasShortcuts),
                  "has-time": vue.unref(showTime)
                }
              ])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
              }, [
                vue.renderSlot(_ctx.$slots, "sidebar", {
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                }),
                vue.unref(hasShortcuts) ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(shortcuts2), (shortcut, key) => {
                    return vue.openBlock(), vue.createElementBlock("button", {
                      key,
                      type: "button",
                      class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                      onClick: ($event) => vue.unref(handleShortcutClick)(shortcut)
                    }, vue.toDisplayString(shortcut.text), 11, _hoisted_1$d);
                  }), 128))
                ], 2)) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(vue.unref(ppNs).e("body"))
                }, [
                  vue.unref(showTime) ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(drpNs).e("time-header"))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(drpNs).e("editors-wrap"))
                    }, [
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                      }, [
                        vue.createVNode(vue.unref(ElInput), {
                          size: "small",
                          disabled: vue.unref(rangeState).selecting,
                          placeholder: vue.unref(t)("el.datepicker.startDate"),
                          class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                          "model-value": vue.unref(minVisibleDate),
                          "validate-event": false,
                          onInput: _cache[0] || (_cache[0] = (val) => handleDateInput(val, "min")),
                          onChange: _cache[1] || (_cache[1] = (val) => handleDateChange(val, "min"))
                        }, null, 8, ["disabled", "placeholder", "class", "model-value"])
                      ], 2),
                      vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
                        class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                      }, [
                        vue.createVNode(vue.unref(ElInput), {
                          size: "small",
                          class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                          disabled: vue.unref(rangeState).selecting,
                          placeholder: vue.unref(t)("el.datepicker.startTime"),
                          "model-value": vue.unref(minVisibleTime),
                          "validate-event": false,
                          onFocus: _cache[2] || (_cache[2] = ($event) => minTimePickerVisible.value = true),
                          onInput: _cache[3] || (_cache[3] = (val) => handleTimeInput(val, "min")),
                          onChange: _cache[4] || (_cache[4] = (val) => handleTimeChange(val, "min"))
                        }, null, 8, ["class", "disabled", "placeholder", "model-value"]),
                        vue.createVNode(vue.unref(TimePickPanel), {
                          visible: minTimePickerVisible.value,
                          format: vue.unref(timeFormat),
                          "datetime-role": "start",
                          "time-arrow-control": vue.unref(arrowControl),
                          "parsed-value": leftDate.value,
                          onPick: handleMinTimePick
                        }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
                      ], 2)), [
                        [vue.unref(ClickOutside), handleMinTimeClose]
                      ])
                    ], 2),
                    vue.createElementVNode("span", null, [
                      vue.createVNode(vue.unref(ElIcon), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(arrow_right_default))
                        ]),
                        _: 1
                      })
                    ]),
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass([vue.unref(drpNs).e("editors-wrap"), "is-right"])
                    }, [
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                      }, [
                        vue.createVNode(vue.unref(ElInput), {
                          size: "small",
                          class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                          disabled: vue.unref(rangeState).selecting,
                          placeholder: vue.unref(t)("el.datepicker.endDate"),
                          "model-value": vue.unref(maxVisibleDate),
                          readonly: !vue.unref(minDate),
                          "validate-event": false,
                          onInput: _cache[5] || (_cache[5] = (val) => handleDateInput(val, "max")),
                          onChange: _cache[6] || (_cache[6] = (val) => handleDateChange(val, "max"))
                        }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"])
                      ], 2),
                      vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
                        class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                      }, [
                        vue.createVNode(vue.unref(ElInput), {
                          size: "small",
                          class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                          disabled: vue.unref(rangeState).selecting,
                          placeholder: vue.unref(t)("el.datepicker.endTime"),
                          "model-value": vue.unref(maxVisibleTime),
                          readonly: !vue.unref(minDate),
                          "validate-event": false,
                          onFocus: _cache[7] || (_cache[7] = ($event) => vue.unref(minDate) && (maxTimePickerVisible.value = true)),
                          onInput: _cache[8] || (_cache[8] = (val) => handleTimeInput(val, "max")),
                          onChange: _cache[9] || (_cache[9] = (val) => handleTimeChange(val, "max"))
                        }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"]),
                        vue.createVNode(vue.unref(TimePickPanel), {
                          "datetime-role": "end",
                          visible: maxTimePickerVisible.value,
                          format: vue.unref(timeFormat),
                          "time-arrow-control": vue.unref(arrowControl),
                          "parsed-value": rightDate.value,
                          onPick: handleMaxTimePick
                        }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
                      ], 2)), [
                        [vue.unref(ClickOutside), handleMaxTimeClose]
                      ])
                    ], 2)
                  ], 2)) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-left"])
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(drpNs).e("header"))
                    }, [
                      vue.createElementVNode("button", {
                        type: "button",
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-left"]),
                        onClick: leftPrevYear
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("button", {
                        type: "button",
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-left"]),
                        onClick: leftPrevMonth
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 0,
                        type: "button",
                        disabled: !vue.unref(enableYearArrow),
                        class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-right"]),
                        onClick: leftNextYear
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_2$b)) : vue.createCommentVNode("v-if", true),
                      _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 1,
                        type: "button",
                        disabled: !vue.unref(enableMonthArrow),
                        class: vue.normalizeClass([[
                          vue.unref(ppNs).e("icon-btn"),
                          { "is-disabled": !vue.unref(enableMonthArrow) }
                        ], "arrow-right"]),
                        onClick: leftNextMonth
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_3$7)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(leftLabel)), 1)
                    ], 2),
                    vue.createVNode(DateTable, {
                      "selection-mode": "range",
                      date: leftDate.value,
                      "min-date": vue.unref(minDate),
                      "max-date": vue.unref(maxDate),
                      "range-state": vue.unref(rangeState),
                      "disabled-date": vue.unref(disabledDate2),
                      "cell-class-name": vue.unref(cellClassName),
                      onChangerange: vue.unref(handleChangeRange),
                      onPick: handleRangePick,
                      onSelect: vue.unref(onSelect)
                    }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
                  ], 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-right"])
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(drpNs).e("header"))
                    }, [
                      _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 0,
                        type: "button",
                        disabled: !vue.unref(enableYearArrow),
                        class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-left"]),
                        onClick: rightPrevYear
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_4$3)) : vue.createCommentVNode("v-if", true),
                      _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 1,
                        type: "button",
                        disabled: !vue.unref(enableMonthArrow),
                        class: vue.normalizeClass([[
                          vue.unref(ppNs).e("icon-btn"),
                          { "is-disabled": !vue.unref(enableMonthArrow) }
                        ], "arrow-left"]),
                        onClick: rightPrevMonth
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_5$2)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("button", {
                        type: "button",
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                        onClick: rightNextYear
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("button", {
                        type: "button",
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-right"]),
                        onClick: rightNextMonth
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(rightLabel)), 1)
                    ], 2),
                    vue.createVNode(DateTable, {
                      "selection-mode": "range",
                      date: rightDate.value,
                      "min-date": vue.unref(minDate),
                      "max-date": vue.unref(maxDate),
                      "range-state": vue.unref(rangeState),
                      "disabled-date": vue.unref(disabledDate2),
                      "cell-class-name": vue.unref(cellClassName),
                      onChangerange: vue.unref(handleChangeRange),
                      onPick: handleRangePick,
                      onSelect: vue.unref(onSelect)
                    }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
                  ], 2)
                ], 2)
              ], 2),
              vue.unref(showTime) ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: vue.normalizeClass(vue.unref(ppNs).e("footer"))
              }, [
                vue.unref(clearable) ? (vue.openBlock(), vue.createBlock(vue.unref(ElButton), {
                  key: 0,
                  text: "",
                  size: "small",
                  class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                  onClick: handleClear
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.clear")), 1)
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(vue.unref(ElButton), {
                  plain: "",
                  size: "small",
                  class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                  disabled: vue.unref(btnDisabled),
                  onClick: _cache[10] || (_cache[10] = ($event) => vue.unref(handleRangeConfirm)(false))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], 2);
          };
        }
      });
      var DateRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-date-range.vue"]]);
      const panelMonthRangeProps = buildProps({
        ...panelRangeSharedProps
      });
      const panelMonthRangeEmits = ["pick", "set-picker-option"];
      const useMonthRangeHeader = ({
        unlinkPanels,
        leftDate,
        rightDate
      }) => {
        const { t } = useLocale();
        const leftPrevYear = () => {
          leftDate.value = leftDate.value.subtract(1, "year");
          if (!unlinkPanels.value) {
            rightDate.value = rightDate.value.subtract(1, "year");
          }
        };
        const rightNextYear = () => {
          if (!unlinkPanels.value) {
            leftDate.value = leftDate.value.add(1, "year");
          }
          rightDate.value = rightDate.value.add(1, "year");
        };
        const leftNextYear = () => {
          leftDate.value = leftDate.value.add(1, "year");
        };
        const rightPrevYear = () => {
          rightDate.value = rightDate.value.subtract(1, "year");
        };
        const leftLabel = vue.computed(() => {
          return `${leftDate.value.year()} ${t("el.datepicker.year")}`;
        });
        const rightLabel = vue.computed(() => {
          return `${rightDate.value.year()} ${t("el.datepicker.year")}`;
        });
        const leftYear = vue.computed(() => {
          return leftDate.value.year();
        });
        const rightYear = vue.computed(() => {
          return rightDate.value.year() === leftDate.value.year() ? leftDate.value.year() + 1 : rightDate.value.year();
        });
        return {
          leftPrevYear,
          rightNextYear,
          leftNextYear,
          rightPrevYear,
          leftLabel,
          rightLabel,
          leftYear,
          rightYear
        };
      };
      const _hoisted_1$c = ["onClick"];
      const _hoisted_2$a = ["disabled"];
      const _hoisted_3$6 = ["disabled"];
      const unit = "year";
      const __default__$4 = vue.defineComponent({
        name: "DatePickerMonthRange"
      });
      const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
        ...__default__$4,
        props: panelMonthRangeProps,
        emits: panelMonthRangeEmits,
        setup(__props, { emit }) {
          const props = __props;
          const { lang } = useLocale();
          const pickerBase = vue.inject("EP_PICKER_BASE");
          const { shortcuts: shortcuts2, disabledDate: disabledDate2, format } = pickerBase.props;
          const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
          const leftDate = vue.ref(dayjs().locale(lang.value));
          const rightDate = vue.ref(dayjs().locale(lang.value).add(1, unit));
          const {
            minDate,
            maxDate,
            rangeState,
            ppNs,
            drpNs,
            handleChangeRange,
            handleRangeConfirm,
            handleShortcutClick,
            onSelect
          } = useRangePicker(props, {
            defaultValue,
            leftDate,
            rightDate,
            unit,
            onParsedValueChanged
          });
          const hasShortcuts = vue.computed(() => !!shortcuts2.length);
          const {
            leftPrevYear,
            rightNextYear,
            leftNextYear,
            rightPrevYear,
            leftLabel,
            rightLabel,
            leftYear,
            rightYear
          } = useMonthRangeHeader({
            unlinkPanels: vue.toRef(props, "unlinkPanels"),
            leftDate,
            rightDate
          });
          const enableYearArrow = vue.computed(() => {
            return props.unlinkPanels && rightYear.value > leftYear.value + 1;
          });
          const handleRangePick = (val, close = true) => {
            const minDate_ = val.minDate;
            const maxDate_ = val.maxDate;
            if (maxDate.value === maxDate_ && minDate.value === minDate_) {
              return;
            }
            maxDate.value = maxDate_;
            minDate.value = minDate_;
            if (!close)
              return;
            handleRangeConfirm();
          };
          const formatToString = (days) => {
            return days.map((day) => day.format(format));
          };
          function onParsedValueChanged(minDate2, maxDate2) {
            if (props.unlinkPanels && maxDate2) {
              const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
              const maxDateYear = maxDate2.year();
              rightDate.value = minDateYear === maxDateYear ? maxDate2.add(1, unit) : maxDate2;
            } else {
              rightDate.value = leftDate.value.add(1, unit);
            }
          }
          emit("set-picker-option", ["formatToString", formatToString]);
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass([
                vue.unref(ppNs).b(),
                vue.unref(drpNs).b(),
                {
                  "has-sidebar": Boolean(_ctx.$slots.sidebar) || vue.unref(hasShortcuts)
                }
              ])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
              }, [
                vue.renderSlot(_ctx.$slots, "sidebar", {
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                }),
                vue.unref(hasShortcuts) ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(shortcuts2), (shortcut, key) => {
                    return vue.openBlock(), vue.createElementBlock("button", {
                      key,
                      type: "button",
                      class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                      onClick: ($event) => vue.unref(handleShortcutClick)(shortcut)
                    }, vue.toDisplayString(shortcut.text), 11, _hoisted_1$c);
                  }), 128))
                ], 2)) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(vue.unref(ppNs).e("body"))
                }, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-left"])
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(drpNs).e("header"))
                    }, [
                      vue.createElementVNode("button", {
                        type: "button",
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-left"]),
                        onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(leftPrevYear) && vue.unref(leftPrevYear)(...args))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 0,
                        type: "button",
                        disabled: !vue.unref(enableYearArrow),
                        class: vue.normalizeClass([[
                          vue.unref(ppNs).e("icon-btn"),
                          { [vue.unref(ppNs).is("disabled")]: !vue.unref(enableYearArrow) }
                        ], "d-arrow-right"]),
                        onClick: _cache[1] || (_cache[1] = (...args) => vue.unref(leftNextYear) && vue.unref(leftNextYear)(...args))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_2$a)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(leftLabel)), 1)
                    ], 2),
                    vue.createVNode(MonthTable, {
                      "selection-mode": "range",
                      date: leftDate.value,
                      "min-date": vue.unref(minDate),
                      "max-date": vue.unref(maxDate),
                      "range-state": vue.unref(rangeState),
                      "disabled-date": vue.unref(disabledDate2),
                      onChangerange: vue.unref(handleChangeRange),
                      onPick: handleRangePick,
                      onSelect: vue.unref(onSelect)
                    }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
                  ], 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-right"])
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(drpNs).e("header"))
                    }, [
                      _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 0,
                        type: "button",
                        disabled: !vue.unref(enableYearArrow),
                        class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-left"]),
                        onClick: _cache[2] || (_cache[2] = (...args) => vue.unref(rightPrevYear) && vue.unref(rightPrevYear)(...args))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 10, _hoisted_3$6)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("button", {
                        type: "button",
                        class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                        onClick: _cache[3] || (_cache[3] = (...args) => vue.unref(rightNextYear) && vue.unref(rightNextYear)(...args))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(d_arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(rightLabel)), 1)
                    ], 2),
                    vue.createVNode(MonthTable, {
                      "selection-mode": "range",
                      date: rightDate.value,
                      "min-date": vue.unref(minDate),
                      "max-date": vue.unref(maxDate),
                      "range-state": vue.unref(rangeState),
                      "disabled-date": vue.unref(disabledDate2),
                      onChangerange: vue.unref(handleChangeRange),
                      onPick: handleRangePick,
                      onSelect: vue.unref(onSelect)
                    }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
                  ], 2)
                ], 2)
              ], 2)
            ], 2);
          };
        }
      });
      var MonthRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-month-range.vue"]]);
      const getPanel = function(type) {
        switch (type) {
          case "daterange":
          case "datetimerange": {
            return DateRangePickPanel;
          }
          case "monthrange": {
            return MonthRangePickPanel;
          }
          default: {
            return DatePickPanel;
          }
        }
      };
      dayjs.extend(localeData);
      dayjs.extend(advancedFormat);
      dayjs.extend(customParseFormat);
      dayjs.extend(weekOfYear);
      dayjs.extend(weekYear);
      dayjs.extend(dayOfYear);
      dayjs.extend(isSameOrAfter);
      dayjs.extend(isSameOrBefore);
      var DatePicker = vue.defineComponent({
        name: "ElDatePicker",
        install: null,
        props: datePickerProps,
        emits: ["update:modelValue"],
        setup(props, {
          expose,
          emit,
          slots
        }) {
          const ns = useNamespace("picker-panel");
          vue.provide("ElPopperOptions", vue.reactive(vue.toRef(props, "popperOptions")));
          vue.provide(ROOT_PICKER_INJECTION_KEY, {
            slots,
            pickerNs: ns
          });
          const commonPicker = vue.ref();
          const refProps = {
            focus: (focusStartInput = true) => {
              var _a2;
              (_a2 = commonPicker.value) == null ? void 0 : _a2.focus(focusStartInput);
            },
            handleOpen: () => {
              var _a2;
              (_a2 = commonPicker.value) == null ? void 0 : _a2.handleOpen();
            },
            handleClose: () => {
              var _a2;
              (_a2 = commonPicker.value) == null ? void 0 : _a2.handleClose();
            }
          };
          expose(refProps);
          const onModelValueUpdated = (val) => {
            emit("update:modelValue", val);
          };
          return () => {
            var _a2;
            const format = (_a2 = props.format) != null ? _a2 : DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE;
            const Component = getPanel(props.type);
            return vue.createVNode(CommonPicker, vue.mergeProps(props, {
              "format": format,
              "type": props.type,
              "ref": commonPicker,
              "onUpdate:modelValue": onModelValueUpdated
            }), {
              default: (scopedProps) => vue.createVNode(Component, scopedProps, null),
              "range-separator": slots["range-separator"]
            });
          };
        }
      });
      const _DatePicker = DatePicker;
      _DatePicker.install = (app2) => {
        app2.component(_DatePicker.name, _DatePicker);
      };
      const ElDatePicker = _DatePicker;
      const imageViewerProps = buildProps({
        urlList: {
          type: definePropType(Array),
          default: () => mutable([])
        },
        zIndex: {
          type: Number
        },
        initialIndex: {
          type: Number,
          default: 0
        },
        infinite: {
          type: Boolean,
          default: true
        },
        hideOnClickModal: Boolean,
        teleported: Boolean,
        closeOnPressEscape: {
          type: Boolean,
          default: true
        },
        zoomRate: {
          type: Number,
          default: 1.2
        }
      });
      const imageViewerEmits = {
        close: () => true,
        switch: (index) => isNumber(index)
      };
      const _hoisted_1$b = ["src"];
      const __default__$3 = vue.defineComponent({
        name: "ElImageViewer"
      });
      const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
        ...__default__$3,
        props: imageViewerProps,
        emits: imageViewerEmits,
        setup(__props, { expose, emit }) {
          const props = __props;
          const modes = {
            CONTAIN: {
              name: "contain",
              icon: vue.markRaw(full_screen_default)
            },
            ORIGINAL: {
              name: "original",
              icon: vue.markRaw(scale_to_original_default)
            }
          };
          const { t } = useLocale();
          const ns = useNamespace("image-viewer");
          const { nextZIndex } = useZIndex();
          const wrapper = vue.ref();
          const imgRefs = vue.ref([]);
          const scopeEventListener = vue.effectScope();
          const loading = vue.ref(true);
          const activeIndex = vue.ref(props.initialIndex);
          const mode = vue.shallowRef(modes.CONTAIN);
          const transform = vue.ref({
            scale: 1,
            deg: 0,
            offsetX: 0,
            offsetY: 0,
            enableTransition: false
          });
          const isSingle = vue.computed(() => {
            const { urlList } = props;
            return urlList.length <= 1;
          });
          const isFirst = vue.computed(() => {
            return activeIndex.value === 0;
          });
          const isLast = vue.computed(() => {
            return activeIndex.value === props.urlList.length - 1;
          });
          const currentImg = vue.computed(() => {
            return props.urlList[activeIndex.value];
          });
          const arrowPrevKls = vue.computed(() => [
            ns.e("btn"),
            ns.e("prev"),
            ns.is("disabled", !props.infinite && isFirst.value)
          ]);
          const arrowNextKls = vue.computed(() => [
            ns.e("btn"),
            ns.e("next"),
            ns.is("disabled", !props.infinite && isLast.value)
          ]);
          const imgStyle = vue.computed(() => {
            const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
            let translateX = offsetX / scale;
            let translateY = offsetY / scale;
            switch (deg % 360) {
              case 90:
              case -270:
                [translateX, translateY] = [translateY, -translateX];
                break;
              case 180:
              case -180:
                [translateX, translateY] = [-translateX, -translateY];
                break;
              case 270:
              case -90:
                [translateX, translateY] = [-translateY, translateX];
                break;
            }
            const style = {
              transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
              transition: enableTransition ? "transform .3s" : ""
            };
            if (mode.value.name === modes.CONTAIN.name) {
              style.maxWidth = style.maxHeight = "100%";
            }
            return style;
          });
          const computedZIndex = vue.computed(() => {
            return isNumber(props.zIndex) ? props.zIndex : nextZIndex();
          });
          function hide() {
            unregisterEventListener();
            emit("close");
          }
          function registerEventListener() {
            const keydownHandler = throttle((e) => {
              switch (e.code) {
                case EVENT_CODE.esc:
                  props.closeOnPressEscape && hide();
                  break;
                case EVENT_CODE.space:
                  toggleMode();
                  break;
                case EVENT_CODE.left:
                  prev();
                  break;
                case EVENT_CODE.up:
                  handleActions("zoomIn");
                  break;
                case EVENT_CODE.right:
                  next();
                  break;
                case EVENT_CODE.down:
                  handleActions("zoomOut");
                  break;
              }
            });
            const mousewheelHandler = throttle((e) => {
              const delta = e.deltaY || e.deltaX;
              handleActions(delta < 0 ? "zoomIn" : "zoomOut", {
                zoomRate: props.zoomRate,
                enableTransition: false
              });
            });
            scopeEventListener.run(() => {
              useEventListener(document, "keydown", keydownHandler);
              useEventListener(document, "wheel", mousewheelHandler);
            });
          }
          function unregisterEventListener() {
            scopeEventListener.stop();
          }
          function handleImgLoad() {
            loading.value = false;
          }
          function handleImgError(e) {
            loading.value = false;
            e.target.alt = t("el.image.error");
          }
          function handleMouseDown(e) {
            if (loading.value || e.button !== 0 || !wrapper.value)
              return;
            transform.value.enableTransition = false;
            const { offsetX, offsetY } = transform.value;
            const startX = e.pageX;
            const startY = e.pageY;
            const dragHandler = throttle((ev) => {
              transform.value = {
                ...transform.value,
                offsetX: offsetX + ev.pageX - startX,
                offsetY: offsetY + ev.pageY - startY
              };
            });
            const removeMousemove = useEventListener(document, "mousemove", dragHandler);
            useEventListener(document, "mouseup", () => {
              removeMousemove();
            });
            e.preventDefault();
          }
          function reset() {
            transform.value = {
              scale: 1,
              deg: 0,
              offsetX: 0,
              offsetY: 0,
              enableTransition: false
            };
          }
          function toggleMode() {
            if (loading.value)
              return;
            const modeNames = keysOf(modes);
            const modeValues = Object.values(modes);
            const currentMode = mode.value.name;
            const index = modeValues.findIndex((i) => i.name === currentMode);
            const nextIndex = (index + 1) % modeNames.length;
            mode.value = modes[modeNames[nextIndex]];
            reset();
          }
          function setActiveItem(index) {
            const len = props.urlList.length;
            activeIndex.value = (index + len) % len;
          }
          function prev() {
            if (isFirst.value && !props.infinite)
              return;
            setActiveItem(activeIndex.value - 1);
          }
          function next() {
            if (isLast.value && !props.infinite)
              return;
            setActiveItem(activeIndex.value + 1);
          }
          function handleActions(action, options = {}) {
            if (loading.value)
              return;
            const { zoomRate, rotateDeg, enableTransition } = {
              zoomRate: props.zoomRate,
              rotateDeg: 90,
              enableTransition: true,
              ...options
            };
            switch (action) {
              case "zoomOut":
                if (transform.value.scale > 0.2) {
                  transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
                }
                break;
              case "zoomIn":
                if (transform.value.scale < 7) {
                  transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
                }
                break;
              case "clockwise":
                transform.value.deg += rotateDeg;
                break;
              case "anticlockwise":
                transform.value.deg -= rotateDeg;
                break;
            }
            transform.value.enableTransition = enableTransition;
          }
          vue.watch(currentImg, () => {
            vue.nextTick(() => {
              const $img = imgRefs.value[0];
              if (!($img == null ? void 0 : $img.complete)) {
                loading.value = true;
              }
            });
          });
          vue.watch(activeIndex, (val) => {
            reset();
            emit("switch", val);
          });
          vue.onMounted(() => {
            var _a2, _b;
            registerEventListener();
            (_b = (_a2 = wrapper.value) == null ? void 0 : _a2.focus) == null ? void 0 : _b.call(_a2);
          });
          expose({
            setActiveItem
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.Teleport, {
              to: "body",
              disabled: !_ctx.teleported
            }, [
              vue.createVNode(vue.Transition, {
                name: "viewer-fade",
                appear: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", {
                    ref_key: "wrapper",
                    ref: wrapper,
                    tabindex: -1,
                    class: vue.normalizeClass(vue.unref(ns).e("wrapper")),
                    style: vue.normalizeStyle({ zIndex: vue.unref(computedZIndex) })
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(ns).e("mask")),
                      onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.hideOnClickModal && hide(), ["self"]))
                    }, null, 2),
                    vue.createCommentVNode(" CLOSE "),
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass([vue.unref(ns).e("btn"), vue.unref(ns).e("close")]),
                      onClick: hide
                    }, [
                      vue.createVNode(vue.unref(ElIcon), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(close_default))
                        ]),
                        _: 1
                      })
                    ], 2),
                    vue.createCommentVNode(" ARROW "),
                    !vue.unref(isSingle) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(vue.unref(arrowPrevKls)),
                        onClick: prev
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(vue.unref(arrowNextKls)),
                        onClick: next
                      }, [
                        vue.createVNode(vue.unref(ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 2)
                    ], 64)) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" ACTIONS "),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass([vue.unref(ns).e("btn"), vue.unref(ns).e("actions")])
                    }, [
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(vue.unref(ns).e("actions__inner"))
                      }, [
                        vue.createVNode(vue.unref(ElIcon), {
                          onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(zoom_out_default))
                          ]),
                          _: 1
                        }),
                        vue.createVNode(vue.unref(ElIcon), {
                          onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(zoom_in_default))
                          ]),
                          _: 1
                        }),
                        vue.createElementVNode("i", {
                          class: vue.normalizeClass(vue.unref(ns).e("actions__divider"))
                        }, null, 2),
                        vue.createVNode(vue.unref(ElIcon), { onClick: toggleMode }, {
                          default: vue.withCtx(() => [
                            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(mode).icon)))
                          ]),
                          _: 1
                        }),
                        vue.createElementVNode("i", {
                          class: vue.normalizeClass(vue.unref(ns).e("actions__divider"))
                        }, null, 2),
                        vue.createVNode(vue.unref(ElIcon), {
                          onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(refresh_left_default))
                          ]),
                          _: 1
                        }),
                        vue.createVNode(vue.unref(ElIcon), {
                          onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(refresh_right_default))
                          ]),
                          _: 1
                        })
                      ], 2)
                    ], 2),
                    vue.createCommentVNode(" CANVAS "),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(ns).e("canvas"))
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.urlList, (url, i) => {
                        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("img", {
                          ref_for: true,
                          ref: (el) => imgRefs.value[i] = el,
                          key: url,
                          src: url,
                          style: vue.normalizeStyle(vue.unref(imgStyle)),
                          class: vue.normalizeClass(vue.unref(ns).e("img")),
                          onLoad: handleImgLoad,
                          onError: handleImgError,
                          onMousedown: handleMouseDown
                        }, null, 46, _hoisted_1$b)), [
                          [vue.vShow, i === activeIndex.value]
                        ]);
                      }), 128))
                    ], 2),
                    vue.renderSlot(_ctx.$slots, "default")
                  ], 6)
                ]),
                _: 3
              })
            ], 8, ["disabled"]);
          };
        }
      });
      var ImageViewer = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);
      const ElImageViewer = withInstall(ImageViewer);
      const imageProps = buildProps({
        hideOnClickModal: Boolean,
        src: {
          type: String,
          default: ""
        },
        fit: {
          type: String,
          values: ["", "contain", "cover", "fill", "none", "scale-down"],
          default: ""
        },
        loading: {
          type: String,
          values: ["eager", "lazy"]
        },
        lazy: Boolean,
        scrollContainer: {
          type: definePropType([String, Object])
        },
        previewSrcList: {
          type: definePropType(Array),
          default: () => mutable([])
        },
        previewTeleported: Boolean,
        zIndex: {
          type: Number
        },
        initialIndex: {
          type: Number,
          default: 0
        },
        infinite: {
          type: Boolean,
          default: true
        },
        closeOnPressEscape: {
          type: Boolean,
          default: true
        },
        zoomRate: {
          type: Number,
          default: 1.2
        }
      });
      const imageEmits = {
        load: (evt) => evt instanceof Event,
        error: (evt) => evt instanceof Event,
        switch: (val) => isNumber(val),
        close: () => true,
        show: () => true
      };
      const _hoisted_1$a = ["src", "loading"];
      const _hoisted_2$9 = { key: 0 };
      const __default__$2 = vue.defineComponent({
        name: "ElImage",
        inheritAttrs: false
      });
      const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
        ...__default__$2,
        props: imageProps,
        emits: imageEmits,
        setup(__props, { emit }) {
          const props = __props;
          let prevOverflow = "";
          const { t } = useLocale();
          const ns = useNamespace("image");
          const rawAttrs = vue.useAttrs();
          const attrs = useAttrs();
          const imageSrc = vue.ref();
          const hasLoadError = vue.ref(false);
          const isLoading = vue.ref(true);
          const showViewer = vue.ref(false);
          const container = vue.ref();
          const _scrollContainer = vue.ref();
          const supportLoading = isClient$1 && "loading" in HTMLImageElement.prototype;
          let stopScrollListener;
          let stopWheelListener;
          const imageKls = vue.computed(() => [
            ns.e("inner"),
            preview2.value && ns.e("preview"),
            isLoading.value && ns.is("loading")
          ]);
          const containerStyle = vue.computed(() => rawAttrs.style);
          const imageStyle = vue.computed(() => {
            const { fit } = props;
            if (isClient$1 && fit) {
              return { objectFit: fit };
            }
            return {};
          });
          const preview2 = vue.computed(() => {
            const { previewSrcList } = props;
            return Array.isArray(previewSrcList) && previewSrcList.length > 0;
          });
          const imageIndex = vue.computed(() => {
            const { previewSrcList, initialIndex } = props;
            let previewIndex = initialIndex;
            if (initialIndex > previewSrcList.length - 1) {
              previewIndex = 0;
            }
            return previewIndex;
          });
          const isManual = vue.computed(() => {
            if (props.loading === "eager")
              return false;
            return !supportLoading && props.loading === "lazy" || props.lazy;
          });
          const loadImage = () => {
            if (!isClient$1)
              return;
            isLoading.value = true;
            hasLoadError.value = false;
            imageSrc.value = props.src;
          };
          function handleLoad(event) {
            isLoading.value = false;
            hasLoadError.value = false;
            emit("load", event);
          }
          function handleError(event) {
            isLoading.value = false;
            hasLoadError.value = true;
            emit("error", event);
          }
          function handleLazyLoad() {
            if (isInContainer(container.value, _scrollContainer.value)) {
              loadImage();
              removeLazyLoadListener();
            }
          }
          const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true);
          async function addLazyLoadListener() {
            var _a2;
            if (!isClient$1)
              return;
            await vue.nextTick();
            const { scrollContainer } = props;
            if (isElement(scrollContainer)) {
              _scrollContainer.value = scrollContainer;
            } else if (isString(scrollContainer) && scrollContainer !== "") {
              _scrollContainer.value = (_a2 = document.querySelector(scrollContainer)) != null ? _a2 : void 0;
            } else if (container.value) {
              _scrollContainer.value = getScrollContainer(container.value);
            }
            if (_scrollContainer.value) {
              stopScrollListener = useEventListener(_scrollContainer, "scroll", lazyLoadHandler);
              setTimeout(() => handleLazyLoad(), 100);
            }
          }
          function removeLazyLoadListener() {
            if (!isClient$1 || !_scrollContainer.value || !lazyLoadHandler)
              return;
            stopScrollListener == null ? void 0 : stopScrollListener();
            _scrollContainer.value = void 0;
          }
          function wheelHandler(e) {
            if (!e.ctrlKey)
              return;
            if (e.deltaY < 0) {
              e.preventDefault();
              return false;
            } else if (e.deltaY > 0) {
              e.preventDefault();
              return false;
            }
          }
          function clickHandler() {
            if (!preview2.value)
              return;
            stopWheelListener = useEventListener("wheel", wheelHandler, {
              passive: false
            });
            prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            showViewer.value = true;
            emit("show");
          }
          function closeViewer() {
            stopWheelListener == null ? void 0 : stopWheelListener();
            document.body.style.overflow = prevOverflow;
            showViewer.value = false;
            emit("close");
          }
          function switchViewer(val) {
            emit("switch", val);
          }
          vue.watch(() => props.src, () => {
            if (isManual.value) {
              isLoading.value = true;
              hasLoadError.value = false;
              removeLazyLoadListener();
              addLazyLoadListener();
            } else {
              loadImage();
            }
          });
          vue.onMounted(() => {
            if (isManual.value) {
              addLazyLoadListener();
            } else {
              loadImage();
            }
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              ref_key: "container",
              ref: container,
              class: vue.normalizeClass([vue.unref(ns).b(), _ctx.$attrs.class]),
              style: vue.normalizeStyle(vue.unref(containerStyle))
            }, [
              hasLoadError.value ? vue.renderSlot(_ctx.$slots, "error", { key: 0 }, () => [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(vue.unref(ns).e("error"))
                }, vue.toDisplayString(vue.unref(t)("el.image.error")), 3)
              ]) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                imageSrc.value !== void 0 ? (vue.openBlock(), vue.createElementBlock("img", vue.mergeProps({ key: 0 }, vue.unref(attrs), {
                  src: imageSrc.value,
                  loading: _ctx.loading,
                  style: vue.unref(imageStyle),
                  class: vue.unref(imageKls),
                  onClick: clickHandler,
                  onLoad: handleLoad,
                  onError: handleError
                }), null, 16, _hoisted_1$a)) : vue.createCommentVNode("v-if", true),
                isLoading.value ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: vue.normalizeClass(vue.unref(ns).e("wrapper"))
                }, [
                  vue.renderSlot(_ctx.$slots, "placeholder", {}, () => [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(vue.unref(ns).e("placeholder"))
                    }, null, 2)
                  ])
                ], 2)) : vue.createCommentVNode("v-if", true)
              ], 64)),
              vue.unref(preview2) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                showViewer.value ? (vue.openBlock(), vue.createBlock(vue.unref(ElImageViewer), {
                  key: 0,
                  "z-index": _ctx.zIndex,
                  "initial-index": vue.unref(imageIndex),
                  infinite: _ctx.infinite,
                  "zoom-rate": _ctx.zoomRate,
                  "url-list": _ctx.previewSrcList,
                  "hide-on-click-modal": _ctx.hideOnClickModal,
                  teleported: _ctx.previewTeleported,
                  "close-on-press-escape": _ctx.closeOnPressEscape,
                  onClose: closeViewer,
                  onSwitch: switchViewer
                }, {
                  default: vue.withCtx(() => [
                    _ctx.$slots.viewer ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$9, [
                      vue.renderSlot(_ctx.$slots, "viewer")
                    ])) : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 3
                }, 8, ["z-index", "initial-index", "infinite", "zoom-rate", "url-list", "hide-on-click-modal", "teleported", "close-on-press-escape"])) : vue.createCommentVNode("v-if", true)
              ], 64)) : vue.createCommentVNode("v-if", true)
            ], 6);
          };
        }
      });
      var Image = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]);
      const ElImage = withInstall(Image);
      const linkProps = buildProps({
        type: {
          type: String,
          values: ["primary", "success", "warning", "info", "danger", "default"],
          default: "default"
        },
        underline: {
          type: Boolean,
          default: true
        },
        disabled: { type: Boolean, default: false },
        href: { type: String, default: "" },
        icon: {
          type: iconPropType
        }
      });
      const linkEmits = {
        click: (evt) => evt instanceof MouseEvent
      };
      const _hoisted_1$9 = ["href"];
      const __default__$1 = vue.defineComponent({
        name: "ElLink"
      });
      const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
        ...__default__$1,
        props: linkProps,
        emits: linkEmits,
        setup(__props, { emit }) {
          const props = __props;
          const ns = useNamespace("link");
          const linkKls = vue.computed(() => [
            ns.b(),
            ns.m(props.type),
            ns.is("disabled", props.disabled),
            ns.is("underline", props.underline && !props.disabled)
          ]);
          function handleClick(event) {
            if (!props.disabled)
              emit("click", event);
          }
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("a", {
              class: vue.normalizeClass(vue.unref(linkKls)),
              href: _ctx.disabled || !_ctx.href ? void 0 : _ctx.href,
              onClick: handleClick
            }, [
              _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 0 }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon)))
                ]),
                _: 1
              })) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: vue.normalizeClass(vue.unref(ns).e("inner"))
              }, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 2)) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.icon ? vue.renderSlot(_ctx.$slots, "icon", { key: 2 }) : vue.createCommentVNode("v-if", true)
            ], 10, _hoisted_1$9);
          };
        }
      });
      var Link = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]);
      const ElLink = withInstall(Link);
      const messageTypes = ["success", "info", "warning", "error"];
      const messageDefaults = mutable({
        customClass: "",
        center: false,
        dangerouslyUseHTMLString: false,
        duration: 3e3,
        icon: void 0,
        id: "",
        message: "",
        onClose: void 0,
        showClose: false,
        type: "info",
        offset: 16,
        zIndex: 0,
        grouping: false,
        repeatNum: 1,
        appendTo: isClient$1 ? document.body : void 0
      });
      const messageProps = buildProps({
        customClass: {
          type: String,
          default: messageDefaults.customClass
        },
        center: {
          type: Boolean,
          default: messageDefaults.center
        },
        dangerouslyUseHTMLString: {
          type: Boolean,
          default: messageDefaults.dangerouslyUseHTMLString
        },
        duration: {
          type: Number,
          default: messageDefaults.duration
        },
        icon: {
          type: iconPropType,
          default: messageDefaults.icon
        },
        id: {
          type: String,
          default: messageDefaults.id
        },
        message: {
          type: definePropType([
            String,
            Object,
            Function
          ]),
          default: messageDefaults.message
        },
        onClose: {
          type: definePropType(Function),
          required: false
        },
        showClose: {
          type: Boolean,
          default: messageDefaults.showClose
        },
        type: {
          type: String,
          values: messageTypes,
          default: messageDefaults.type
        },
        offset: {
          type: Number,
          default: messageDefaults.offset
        },
        zIndex: {
          type: Number,
          default: messageDefaults.zIndex
        },
        grouping: {
          type: Boolean,
          default: messageDefaults.grouping
        },
        repeatNum: {
          type: Number,
          default: messageDefaults.repeatNum
        }
      });
      const messageEmits = {
        destroy: () => true
      };
      const instances = vue.shallowReactive([]);
      const getInstance = (id) => {
        const idx = instances.findIndex((instance) => instance.id === id);
        const current = instances[idx];
        let prev;
        if (idx > 0) {
          prev = instances[idx - 1];
        }
        return { current, prev };
      };
      const getLastOffset = (id) => {
        const { prev } = getInstance(id);
        if (!prev)
          return 0;
        return prev.vm.exposed.bottom.value;
      };
      const getOffsetOrSpace = (id, offset) => {
        const idx = instances.findIndex((instance) => instance.id === id);
        return idx > 0 ? 20 : offset;
      };
      const _hoisted_1$8 = ["id"];
      const _hoisted_2$8 = ["innerHTML"];
      const __default__ = vue.defineComponent({
        name: "ElMessage"
      });
      const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
        ...__default__,
        props: messageProps,
        emits: messageEmits,
        setup(__props, { expose }) {
          const props = __props;
          const { Close } = TypeComponents;
          const { ns, zIndex: zIndex2 } = useGlobalComponentSettings("message");
          const { currentZIndex, nextZIndex } = zIndex2;
          const messageRef = vue.ref();
          const visible = vue.ref(false);
          const height = vue.ref(0);
          let stopTimer = void 0;
          const badgeType = vue.computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
          const typeClass = vue.computed(() => {
            const type = props.type;
            return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
          });
          const iconComponent = vue.computed(() => props.icon || TypeComponentsMap[props.type] || "");
          const lastOffset = vue.computed(() => getLastOffset(props.id));
          const offset = vue.computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);
          const bottom = vue.computed(() => height.value + offset.value);
          const customStyle = vue.computed(() => ({
            top: `${offset.value}px`,
            zIndex: currentZIndex.value
          }));
          function startTimer() {
            if (props.duration === 0)
              return;
            ({ stop: stopTimer } = useTimeoutFn$1(() => {
              close();
            }, props.duration));
          }
          function clearTimer() {
            stopTimer == null ? void 0 : stopTimer();
          }
          function close() {
            visible.value = false;
          }
          function keydown({ code }) {
            if (code === EVENT_CODE.esc) {
              close();
            }
          }
          vue.onMounted(() => {
            startTimer();
            nextZIndex();
            visible.value = true;
          });
          vue.watch(() => props.repeatNum, () => {
            clearTimer();
            startTimer();
          });
          useEventListener(document, "keydown", keydown);
          useResizeObserver(messageRef, () => {
            height.value = messageRef.value.getBoundingClientRect().height;
          });
          expose({
            visible,
            bottom,
            close
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.Transition, {
              name: vue.unref(ns).b("fade"),
              onBeforeLeave: _ctx.onClose,
              onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destroy")),
              persisted: ""
            }, {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createElementVNode("div", {
                  id: _ctx.id,
                  ref_key: "messageRef",
                  ref: messageRef,
                  class: vue.normalizeClass([
                    vue.unref(ns).b(),
                    { [vue.unref(ns).m(_ctx.type)]: _ctx.type && !_ctx.icon },
                    vue.unref(ns).is("center", _ctx.center),
                    vue.unref(ns).is("closable", _ctx.showClose),
                    _ctx.customClass
                  ]),
                  style: vue.normalizeStyle(vue.unref(customStyle)),
                  role: "alert",
                  onMouseenter: clearTimer,
                  onMouseleave: startTimer
                }, [
                  _ctx.repeatNum > 1 ? (vue.openBlock(), vue.createBlock(vue.unref(ElBadge), {
                    key: 0,
                    value: _ctx.repeatNum,
                    type: vue.unref(badgeType),
                    class: vue.normalizeClass(vue.unref(ns).e("badge"))
                  }, null, 8, ["value", "type", "class"])) : vue.createCommentVNode("v-if", true),
                  vue.unref(iconComponent) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 1,
                    class: vue.normalizeClass([vue.unref(ns).e("icon"), vue.unref(typeClass)])
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(iconComponent))))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", {
                      key: 0,
                      class: vue.normalizeClass(vue.unref(ns).e("content"))
                    }, vue.toDisplayString(_ctx.message), 3)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                      vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                      vue.createElementVNode("p", {
                        class: vue.normalizeClass(vue.unref(ns).e("content")),
                        innerHTML: _ctx.message
                      }, null, 10, _hoisted_2$8)
                    ], 2112))
                  ]),
                  _ctx.showClose ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 2,
                    class: vue.normalizeClass(vue.unref(ns).e("closeBtn")),
                    onClick: vue.withModifiers(close, ["stop"])
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(Close))
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
                ], 46, _hoisted_1$8), [
                  [vue.vShow, visible.value]
                ])
              ]),
              _: 3
            }, 8, ["name", "onBeforeLeave"]);
          };
        }
      });
      var MessageConstructor = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
      let seed = 1;
      const normalizeOptions = (params) => {
        const options = !params || isString(params) || vue.isVNode(params) || isFunction$1(params) ? { message: params } : params;
        const normalized = {
          ...messageDefaults,
          ...options
        };
        if (!normalized.appendTo) {
          normalized.appendTo = document.body;
        } else if (isString(normalized.appendTo)) {
          let appendTo = document.querySelector(normalized.appendTo);
          if (!isElement(appendTo)) {
            appendTo = document.body;
          }
          normalized.appendTo = appendTo;
        }
        return normalized;
      };
      const closeMessage = (instance) => {
        const idx = instances.indexOf(instance);
        if (idx === -1)
          return;
        instances.splice(idx, 1);
        const { handler } = instance;
        handler.close();
      };
      const createMessage = ({ appendTo, ...options }, context) => {
        const id = `message_${seed++}`;
        const userOnClose = options.onClose;
        const container = document.createElement("div");
        const props = {
          ...options,
          id,
          onClose: () => {
            userOnClose == null ? void 0 : userOnClose();
            closeMessage(instance);
          },
          onDestroy: () => {
            vue.render(null, container);
          }
        };
        const vnode = vue.createVNode(MessageConstructor, props, isFunction$1(props.message) || vue.isVNode(props.message) ? {
          default: isFunction$1(props.message) ? props.message : () => props.message
        } : null);
        vnode.appContext = context || message._context;
        vue.render(vnode, container);
        appendTo.appendChild(container.firstElementChild);
        const vm = vnode.component;
        const handler = {
          close: () => {
            vm.exposed.visible.value = false;
          }
        };
        const instance = {
          id,
          vnode,
          vm,
          handler,
          props: vnode.component.props
        };
        return instance;
      };
      const message = (options = {}, context) => {
        if (!isClient$1)
          return { close: () => void 0 };
        if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
          return { close: () => void 0 };
        }
        const normalized = normalizeOptions(options);
        if (normalized.grouping && instances.length) {
          const instance2 = instances.find(({ vnode: vm }) => {
            var _a2;
            return ((_a2 = vm.props) == null ? void 0 : _a2.message) === normalized.message;
          });
          if (instance2) {
            instance2.props.repeatNum += 1;
            instance2.props.type = normalized.type;
            return instance2.handler;
          }
        }
        const instance = createMessage(normalized, context);
        instances.push(instance);
        return instance.handler;
      };
      messageTypes.forEach((type) => {
        message[type] = (options = {}, appContext) => {
          const normalized = normalizeOptions(options);
          return message({ ...normalized, type }, appContext);
        };
      });
      function closeAll(type) {
        for (const instance of instances) {
          if (!type || type === instance.props.type) {
            instance.handler.close();
          }
        }
      }
      message.closeAll = closeAll;
      message._context = null;
      const ElMessage = withInstallFunction(message, "$message");
      const useUserStore = defineStore("user", () => {
        const uid = vue.ref("");
        const name = vue.ref("");
        function set(id, n) {
          id && (uid.value = id);
          n && (name.value = n);
        }
        return {
          name,
          uid,
          set
        };
      });
      const shortcuts = [
        {
          text: "最近一周",
          value: () => {
            const end = /* @__PURE__ */ new Date();
            const start = /* @__PURE__ */ new Date();
            start.setTime(start.getTime() - 3600 * 1e3 * 24 * 7);
            return [start, end];
          }
        },
        {
          text: "最近一个月",
          value: () => {
            const end = /* @__PURE__ */ new Date();
            const start = /* @__PURE__ */ new Date();
            start.setTime(start.getTime() - 3600 * 1e3 * 24 * 30);
            return [start, end];
          }
        },
        {
          text: "最近三个月",
          value: () => {
            const end = /* @__PURE__ */ new Date();
            const start = /* @__PURE__ */ new Date();
            start.setTime(start.getTime() - 3600 * 1e3 * 24 * 90);
            return [start, end];
          }
        }
      ];
      const _hoisted_1$7 = { class: "icons my-1 flex select-none justify-between px-4 sm:justify-center sm:gap-30" };
      const _hoisted_2$7 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon i-tabler-share-3" }, null, -1);
      const _hoisted_3$5 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon i-tabler-message" }, null, -1);
      const _hoisted_4$2 = /* @__PURE__ */ vue.createElementVNode("span", { class: "icon i-tabler-heart" }, null, -1);
      const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
        __name: "Action",
        props: {
          post: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
              vue.createElementVNode("span", null, [
                _hoisted_2$7,
                vue.createElementVNode("span", null, vue.toDisplayString(_ctx.post.reposts_count), 1)
              ]),
              vue.createElementVNode("span", null, [
                _hoisted_3$5,
                vue.createElementVNode("span", null, vue.toDisplayString(_ctx.post.comments_count), 1)
              ]),
              vue.createElementVNode("span", null, [
                _hoisted_4$2,
                vue.createElementVNode("span", null, vue.toDisplayString(_ctx.post.attitudes_count), 1)
              ])
            ]);
          };
        }
      });
      const _hoisted_1$6 = { class: "grid grid-cols-3 mt-2 w-fit items-start justify-start gap-1" };
      const _hoisted_2$6 = /* @__PURE__ */ vue.createElementVNode("div", { class: "p-20 text-center font-bold" }, " Loading ", -1);
      const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
        __name: "Gallery",
        props: {
          imgs: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            const _component_el_image = ElImage;
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.imgs, (img) => {
                return vue.openBlock(), vue.createBlock(_component_el_image, {
                  key: img,
                  src: img,
                  lazy: true,
                  "hide-on-click-modal": true,
                  "preview-src-list": _ctx.imgs,
                  fit: "cover",
                  class: "h-xs max-h-52 max-w-48 w-xs cursor-pointer rounded"
                }, {
                  placeholder: vue.withCtx(() => [
                    _hoisted_2$6
                  ]),
                  _: 2
                }, 1032, ["src", "preview-src-list"]);
              }), 128))
            ]);
          };
        }
      });
      function tryOnScopeDispose(fn2) {
        if (vue.getCurrentScope()) {
          vue.onScopeDispose(fn2);
          return true;
        }
        return false;
      }
      function createEventHook() {
        const fns = /* @__PURE__ */ new Set();
        const off = (fn2) => {
          fns.delete(fn2);
        };
        const on2 = (fn2) => {
          fns.add(fn2);
          const offFn = () => off(fn2);
          tryOnScopeDispose(offFn);
          return {
            off: offFn
          };
        };
        const trigger = (param) => {
          return Promise.all(Array.from(fns).map((fn2) => fn2(param)));
        };
        return {
          on: on2,
          off,
          trigger
        };
      }
      function toValue(r) {
        return typeof r === "function" ? r() : vue.unref(r);
      }
      const isClient = typeof window !== "undefined";
      const noop = () => {
      };
      function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
        return new Promise((resolve, reject) => {
          if (throwOnTimeout)
            setTimeout(() => reject(reason), ms);
          else
            setTimeout(resolve, ms);
        });
      }
      function containsProp(obj, ...props) {
        return props.some((k) => k in obj);
      }
      function toRef(...args) {
        if (args.length !== 1)
          return vue.toRef(...args);
        const r = args[0];
        return typeof r === "function" ? vue.readonly(vue.customRef(() => ({ get: r, set: noop }))) : vue.ref(r);
      }
      function createUntil(r, isNot = false) {
        function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
          let stop = null;
          const watcher = new Promise((resolve) => {
            stop = vue.watch(
              r,
              (v) => {
                if (condition(v) !== isNot) {
                  stop == null ? void 0 : stop();
                  resolve(v);
                }
              },
              {
                flush,
                deep,
                immediate: true
              }
            );
          });
          const promises = [watcher];
          if (timeout != null) {
            promises.push(
              promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => stop == null ? void 0 : stop())
            );
          }
          return Promise.race(promises);
        }
        function toBe(value, options) {
          if (!vue.isRef(value))
            return toMatch((v) => v === value, options);
          const { flush = "sync", deep = false, timeout, throwOnTimeout } = options != null ? options : {};
          let stop = null;
          const watcher = new Promise((resolve) => {
            stop = vue.watch(
              [r, value],
              ([v1, v2]) => {
                if (isNot !== (v1 === v2)) {
                  stop == null ? void 0 : stop();
                  resolve(v1);
                }
              },
              {
                flush,
                deep,
                immediate: true
              }
            );
          });
          const promises = [watcher];
          if (timeout != null) {
            promises.push(
              promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => {
                stop == null ? void 0 : stop();
                return toValue(r);
              })
            );
          }
          return Promise.race(promises);
        }
        function toBeTruthy(options) {
          return toMatch((v) => Boolean(v), options);
        }
        function toBeNull(options) {
          return toBe(null, options);
        }
        function toBeUndefined(options) {
          return toBe(void 0, options);
        }
        function toBeNaN(options) {
          return toMatch(Number.isNaN, options);
        }
        function toContains(value, options) {
          return toMatch((v) => {
            const array = Array.from(v);
            return array.includes(value) || array.includes(toValue(value));
          }, options);
        }
        function changed(options) {
          return changedTimes(1, options);
        }
        function changedTimes(n = 1, options) {
          let count = -1;
          return toMatch(() => {
            count += 1;
            return count >= n;
          }, options);
        }
        if (Array.isArray(toValue(r))) {
          const instance = {
            toMatch,
            toContains,
            changed,
            changedTimes,
            get not() {
              return createUntil(r, !isNot);
            }
          };
          return instance;
        } else {
          const instance = {
            toMatch,
            toBe,
            toBeTruthy,
            toBeNull,
            toBeNaN,
            toBeUndefined,
            changed,
            changedTimes,
            get not() {
              return createUntil(r, !isNot);
            }
          };
          return instance;
        }
      }
      function until(r) {
        return createUntil(r);
      }
      const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
      const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
      function defaultMeridiem(hours, minutes, isLowercase, hasPeriod) {
        let m = hours < 12 ? "AM" : "PM";
        if (hasPeriod)
          m = m.split("").reduce((acc, curr) => acc += `${curr}.`, "");
        return isLowercase ? m.toLowerCase() : m;
      }
      function formatDate(date2, formatStr, options = {}) {
        var _a2;
        const years = date2.getFullYear();
        const month = date2.getMonth();
        const days = date2.getDate();
        const hours = date2.getHours();
        const minutes = date2.getMinutes();
        const seconds = date2.getSeconds();
        const milliseconds = date2.getMilliseconds();
        const day = date2.getDay();
        const meridiem = (_a2 = options.customMeridiem) != null ? _a2 : defaultMeridiem;
        const matches = {
          YY: () => String(years).slice(-2),
          YYYY: () => years,
          M: () => month + 1,
          MM: () => `${month + 1}`.padStart(2, "0"),
          MMM: () => date2.toLocaleDateString(options.locales, { month: "short" }),
          MMMM: () => date2.toLocaleDateString(options.locales, { month: "long" }),
          D: () => String(days),
          DD: () => `${days}`.padStart(2, "0"),
          H: () => String(hours),
          HH: () => `${hours}`.padStart(2, "0"),
          h: () => `${hours % 12 || 12}`.padStart(1, "0"),
          hh: () => `${hours % 12 || 12}`.padStart(2, "0"),
          m: () => String(minutes),
          mm: () => `${minutes}`.padStart(2, "0"),
          s: () => String(seconds),
          ss: () => `${seconds}`.padStart(2, "0"),
          SSS: () => `${milliseconds}`.padStart(3, "0"),
          d: () => day,
          dd: () => date2.toLocaleDateString(options.locales, { weekday: "narrow" }),
          ddd: () => date2.toLocaleDateString(options.locales, { weekday: "short" }),
          dddd: () => date2.toLocaleDateString(options.locales, { weekday: "long" }),
          A: () => meridiem(hours, minutes),
          AA: () => meridiem(hours, minutes, false, true),
          a: () => meridiem(hours, minutes, true),
          aa: () => meridiem(hours, minutes, true, true)
        };
        return formatStr.replace(REGEX_FORMAT, (match, $1) => {
          var _a22, _b;
          return (_b = $1 != null ? $1 : (_a22 = matches[match]) == null ? void 0 : _a22.call(matches)) != null ? _b : match;
        });
      }
      function normalizeDate(date2) {
        if (date2 === null)
          return new Date(Number.NaN);
        if (date2 === void 0)
          return /* @__PURE__ */ new Date();
        if (date2 instanceof Date)
          return new Date(date2);
        if (typeof date2 === "string" && !/Z$/i.test(date2)) {
          const d = date2.match(REGEX_PARSE);
          if (d) {
            const m = d[2] - 1 || 0;
            const ms = (d[7] || "0").substring(0, 3);
            return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
          }
        }
        return new Date(date2);
      }
      function useDateFormat(date2, formatStr = "HH:mm:ss", options = {}) {
        return vue.computed(() => formatDate(normalizeDate(toValue(date2)), toValue(formatStr), options));
      }
      function useTimeoutFn(cb, interval, options = {}) {
        const {
          immediate = true
        } = options;
        const isPending = vue.ref(false);
        let timer = null;
        function clear() {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
        function stop() {
          isPending.value = false;
          clear();
        }
        function start(...args) {
          clear();
          isPending.value = true;
          timer = setTimeout(() => {
            isPending.value = false;
            timer = null;
            cb(...args);
          }, toValue(interval));
        }
        if (immediate) {
          isPending.value = true;
          if (isClient)
            start();
        }
        tryOnScopeDispose(stop);
        return {
          isPending: vue.readonly(isPending),
          start,
          stop
        };
      }
      const defaultWindow = isClient ? window : void 0;
      var __defProp$e = Object.defineProperty;
      var __defProps$5 = Object.defineProperties;
      var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
      var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
      var __hasOwnProp$f = Object.prototype.hasOwnProperty;
      var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
      var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      var __spreadValues$e = (a, b) => {
        for (var prop in b || (b = {}))
          if (__hasOwnProp$f.call(b, prop))
            __defNormalProp$e(a, prop, b[prop]);
        if (__getOwnPropSymbols$f)
          for (var prop of __getOwnPropSymbols$f(b)) {
            if (__propIsEnum$f.call(b, prop))
              __defNormalProp$e(a, prop, b[prop]);
          }
        return a;
      };
      var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
      const payloadMapping = {
        json: "application/json",
        text: "text/plain"
      };
      function isFetchOptions(obj) {
        return obj && containsProp(obj, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError", "fetch");
      }
      function isAbsoluteURL(url) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
      }
      function headersToObject(headers) {
        if (typeof Headers !== "undefined" && headers instanceof Headers)
          return Object.fromEntries([...headers.entries()]);
        return headers;
      }
      function combineCallbacks(combination, ...callbacks) {
        if (combination === "overwrite") {
          return async (ctx) => {
            const callback = callbacks[callbacks.length - 1];
            if (callback)
              return __spreadValues$e(__spreadValues$e({}, ctx), await callback(ctx));
            return ctx;
          };
        } else {
          return async (ctx) => {
            for (const callback of callbacks) {
              if (callback)
                ctx = __spreadValues$e(__spreadValues$e({}, ctx), await callback(ctx));
            }
            return ctx;
          };
        }
      }
      function createFetch(config = {}) {
        const _combination = config.combination || "chain";
        const _options = config.options || {};
        const _fetchOptions = config.fetchOptions || {};
        function useFactoryFetch(url, ...args) {
          const computedUrl = vue.computed(() => {
            const baseUrl = toValue(config.baseUrl);
            const targetUrl = toValue(url);
            return baseUrl && !isAbsoluteURL(targetUrl) ? joinPaths(baseUrl, targetUrl) : targetUrl;
          });
          let options = _options;
          let fetchOptions = _fetchOptions;
          if (args.length > 0) {
            if (isFetchOptions(args[0])) {
              options = __spreadProps$5(__spreadValues$e(__spreadValues$e({}, options), args[0]), {
                beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
                afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
                onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError)
              });
            } else {
              fetchOptions = __spreadProps$5(__spreadValues$e(__spreadValues$e({}, fetchOptions), args[0]), {
                headers: __spreadValues$e(__spreadValues$e({}, headersToObject(fetchOptions.headers) || {}), headersToObject(args[0].headers) || {})
              });
            }
          }
          if (args.length > 1 && isFetchOptions(args[1])) {
            options = __spreadProps$5(__spreadValues$e(__spreadValues$e({}, options), args[1]), {
              beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
              afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
              onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError)
            });
          }
          return useFetch(computedUrl, fetchOptions, options);
        }
        return useFactoryFetch;
      }
      function useFetch(url, ...args) {
        var _a2;
        const supportsAbort = typeof AbortController === "function";
        let fetchOptions = {};
        let options = { immediate: true, refetch: false, timeout: 0 };
        const config = {
          method: "GET",
          type: "text",
          payload: void 0
        };
        if (args.length > 0) {
          if (isFetchOptions(args[0]))
            options = __spreadValues$e(__spreadValues$e({}, options), args[0]);
          else
            fetchOptions = args[0];
        }
        if (args.length > 1) {
          if (isFetchOptions(args[1]))
            options = __spreadValues$e(__spreadValues$e({}, options), args[1]);
        }
        const {
          fetch = (_a2 = defaultWindow) == null ? void 0 : _a2.fetch,
          initialData,
          timeout
        } = options;
        const responseEvent = createEventHook();
        const errorEvent = createEventHook();
        const finallyEvent = createEventHook();
        const isFinished = vue.ref(false);
        const isFetching = vue.ref(false);
        const aborted = vue.ref(false);
        const statusCode = vue.ref(null);
        const response = vue.shallowRef(null);
        const error = vue.shallowRef(null);
        const data = vue.shallowRef(initialData || null);
        const canAbort = vue.computed(() => supportsAbort && isFetching.value);
        let controller;
        let timer;
        const abort = () => {
          if (supportsAbort) {
            controller == null ? void 0 : controller.abort();
            controller = new AbortController();
            controller.signal.onabort = () => aborted.value = true;
            fetchOptions = __spreadProps$5(__spreadValues$e({}, fetchOptions), {
              signal: controller.signal
            });
          }
        };
        const loading = (isLoading) => {
          isFetching.value = isLoading;
          isFinished.value = !isLoading;
        };
        if (timeout)
          timer = useTimeoutFn(abort, timeout, { immediate: false });
        const execute = async (throwOnFailed = false) => {
          var _a22;
          abort();
          loading(true);
          error.value = null;
          statusCode.value = null;
          aborted.value = false;
          const defaultFetchOptions = {
            method: config.method,
            headers: {}
          };
          if (config.payload) {
            const headers = headersToObject(defaultFetchOptions.headers);
            const payload = toValue(config.payload);
            if (!config.payloadType && payload && Object.getPrototypeOf(payload) === Object.prototype && !(payload instanceof FormData))
              config.payloadType = "json";
            if (config.payloadType)
              headers["Content-Type"] = (_a22 = payloadMapping[config.payloadType]) != null ? _a22 : config.payloadType;
            defaultFetchOptions.body = config.payloadType === "json" ? JSON.stringify(payload) : payload;
          }
          let isCanceled = false;
          const context = {
            url: toValue(url),
            options: __spreadValues$e(__spreadValues$e({}, defaultFetchOptions), fetchOptions),
            cancel: () => {
              isCanceled = true;
            }
          };
          if (options.beforeFetch)
            Object.assign(context, await options.beforeFetch(context));
          if (isCanceled || !fetch) {
            loading(false);
            return Promise.resolve(null);
          }
          let responseData = null;
          if (timer)
            timer.start();
          return new Promise((resolve, reject) => {
            var _a3;
            fetch(
              context.url,
              __spreadProps$5(__spreadValues$e(__spreadValues$e({}, defaultFetchOptions), context.options), {
                headers: __spreadValues$e(__spreadValues$e({}, headersToObject(defaultFetchOptions.headers)), headersToObject((_a3 = context.options) == null ? void 0 : _a3.headers))
              })
            ).then(async (fetchResponse) => {
              response.value = fetchResponse;
              statusCode.value = fetchResponse.status;
              responseData = await fetchResponse[config.type]();
              if (!fetchResponse.ok) {
                data.value = initialData || null;
                throw new Error(fetchResponse.statusText);
              }
              if (options.afterFetch)
                ({ data: responseData } = await options.afterFetch({ data: responseData, response: fetchResponse }));
              data.value = responseData;
              responseEvent.trigger(fetchResponse);
              return resolve(fetchResponse);
            }).catch(async (fetchError) => {
              let errorData = fetchError.message || fetchError.name;
              if (options.onFetchError)
                ({ error: errorData } = await options.onFetchError({ data: responseData, error: fetchError, response: response.value }));
              error.value = errorData;
              errorEvent.trigger(fetchError);
              if (throwOnFailed)
                return reject(fetchError);
              return resolve(null);
            }).finally(() => {
              loading(false);
              if (timer)
                timer.stop();
              finallyEvent.trigger(null);
            });
          });
        };
        const refetch = toRef(options.refetch);
        vue.watch(
          [
            refetch,
            toRef(url)
          ],
          ([refetch2]) => refetch2 && execute(),
          { deep: true }
        );
        const shell = {
          isFinished,
          statusCode,
          response,
          error,
          data,
          isFetching,
          canAbort,
          aborted,
          abort,
          execute,
          onFetchResponse: responseEvent.on,
          onFetchError: errorEvent.on,
          onFetchFinally: finallyEvent.on,
          // method
          get: setMethod("GET"),
          put: setMethod("PUT"),
          post: setMethod("POST"),
          delete: setMethod("DELETE"),
          patch: setMethod("PATCH"),
          head: setMethod("HEAD"),
          options: setMethod("OPTIONS"),
          // type
          json: setType("json"),
          text: setType("text"),
          blob: setType("blob"),
          arrayBuffer: setType("arrayBuffer"),
          formData: setType("formData")
        };
        function setMethod(method) {
          return (payload, payloadType) => {
            if (!isFetching.value) {
              config.method = method;
              config.payload = payload;
              config.payloadType = payloadType;
              if (vue.isRef(config.payload)) {
                vue.watch(
                  [
                    refetch,
                    toRef(config.payload)
                  ],
                  ([refetch2]) => refetch2 && execute(),
                  { deep: true }
                );
              }
              return __spreadProps$5(__spreadValues$e({}, shell), {
                then(onFulfilled, onRejected) {
                  return waitUntilFinished().then(onFulfilled, onRejected);
                }
              });
            }
            return void 0;
          };
        }
        function waitUntilFinished() {
          return new Promise((resolve, reject) => {
            until(isFinished).toBe(true).then(() => resolve(shell)).catch((error2) => reject(error2));
          });
        }
        function setType(type) {
          return () => {
            if (!isFetching.value) {
              config.type = type;
              return __spreadProps$5(__spreadValues$e({}, shell), {
                then(onFulfilled, onRejected) {
                  return waitUntilFinished().then(onFulfilled, onRejected);
                }
              });
            }
            return void 0;
          };
        }
        if (options.immediate)
          Promise.resolve().then(() => execute());
        return __spreadProps$5(__spreadValues$e({}, shell), {
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        });
      }
      function joinPaths(start, end) {
        if (!start.endsWith("/") && !end.startsWith("/"))
          return `${start}/${end}`;
        return `${start}${end}`;
      }
      const _hoisted_1$5 = { class: "flex flex-wrap items-center justify-end gap-1 text-2 text-gray sm:gap-3" };
      const _hoisted_2$5 = {
        key: 0,
        class: "hidden sm:inline"
      };
      const _hoisted_3$4 = ["innerHTML"];
      const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
        __name: "Meta",
        props: {
          post: {}
        },
        setup(__props) {
          const props = __props;
          const date2 = useDateFormat(props.post.created_at, "YY-MM-DD HH:mm dddd");
          const detailUrl = `https://weibo.com/${useUserStore().uid}/${props.post.mblogid}`;
          return (_ctx, _cache) => {
            const _component_el_link = ElLink;
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
              _ctx.post.source.length ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$5, [
                vue.createTextVNode(" 来自 "),
                vue.createElementVNode("span", {
                  innerHTML: _ctx.post.source
                }, null, 8, _hoisted_3$4)
              ])) : vue.createCommentVNode("", true),
              vue.createElementVNode("span", null, vue.toDisplayString(_ctx.post.region_name), 1),
              vue.createVNode(_component_el_link, {
                underline: false,
                href: detailUrl,
                target: "_blank",
                class: "text-2! text-gray-400! hover:text-gray-600!"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(vue.unref(date2)), 1)
                ]),
                _: 1
              })
            ]);
          };
        }
      });
      const _hoisted_1$4 = ["href"];
      const _hoisted_2$4 = { class: "text-3! font-bold! hover:text-teal-700!" };
      const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
        __name: "Profile",
        props: {
          user: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            const _component_el_avatar = ElAvatar;
            return vue.openBlock(), vue.createElementBlock("a", {
              class: "my-1 mr-auto flex items-center gap-2",
              href: `https://weibo.com/u/${_ctx.user.id}`,
              target: "_blank"
            }, [
              vue.createVNode(_component_el_avatar, {
                size: 30,
                src: _ctx.user.profile_image_url
              }, null, 8, ["src"]),
              vue.createElementVNode("span", _hoisted_2$4, vue.toDisplayString(_ctx.user.screen_name), 1)
            ], 8, _hoisted_1$4);
          };
        }
      });
      const usePostStore = defineStore("post", () => {
        const posts = vue.ref([]);
        const curPage = vue.ref(1);
        const viewedPage = vue.ref(1);
        const total = vue.ref(0);
        const pages = vue.computed(() => {
          return Math.ceil(total.value / 20);
        });
        function setPage(val) {
          viewedPage.value = Math.max(val, viewedPage.value);
          curPage.value = val;
        }
        function setTotal(num) {
          total.value = num;
        }
        function add(newPosts) {
          posts.value = [...posts.value, ...newPosts];
        }
        function get2(page) {
          let p = page;
          if (!p)
            p = curPage.value;
          return posts.value.slice((p - 1) * 20, p * 20);
        }
        return {
          posts,
          total,
          pages,
          curPage,
          viewedPage,
          setPage,
          add,
          setTotal,
          get: get2
        };
      });
      const weiFetch = createFetch({
        baseUrl: "https://weibo.com/ajax",
        combination: "overwrite",
        options: {
          onFetchError(ctx) {
            var _a2;
            ElMessage.error(((_a2 = ctx.error) == null ? void 0 : _a2.message) || "Fetch Error");
            return ctx;
          }
        }
      });
      async function fetchUser(id, name) {
        var _a2;
        const { data } = await weiFetch(`/user/popcard/get?screen_name=${name}&id=${id}`).json();
        const { idstr, screen_name } = ((_a2 = data.value) == null ? void 0 : _a2.data) || {};
        useUserStore().set(idstr, screen_name);
      }
      const since_id = vue.ref("");
      async function fetchPosts(page) {
        var _a2;
        if (page === 0)
          return null;
        if (page === 1)
          since_id.value = "";
        const { data } = await weiFetch(`/statuses/mymblog?uid=${useUserStore().uid}&feature=0&page=${page}&since_id=${since_id.value}`).json();
        const res = (_a2 = data.value) == null ? void 0 : _a2.data;
        if (res)
          since_id.value = res.since_id;
        else
          return null;
        const posts = filterPosts(res.list).filter((post) => post.user.id === useUserStore().uid);
        usePostStore().add(posts);
        return {
          ...res,
          list: posts
        };
      }
      async function fetchLongText(post) {
        var _a2;
        const text = vue.ref(post.text);
        if (post.isLongText) {
          const { data } = await weiFetch(`/statuses/longtext?id=${post.mblogid}`).json();
          text.value = ((_a2 = data.value) == null ? void 0 : _a2.data.longTextContent) || post.text;
        }
        return parseText(text.value);
      }
      const _hoisted_1$3 = { class: "flex flex-col gap-2 rounded-2 bg-white p-3" };
      const _hoisted_2$3 = { class: "flex justify-between" };
      const _hoisted_3$3 = ["innerHTML"];
      const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
        __name: "Item",
        props: {
          post: {}
        },
        async setup(__props) {
          let __temp, __restore;
          const props = __props;
          const text = ([__temp, __restore] = vue.withAsyncContext(() => fetchLongText(props.post)), __temp = await __temp, __restore(), __temp);
          return (_ctx, _cache) => {
            const _component_profile = _sfc_main$5;
            const _component_post_meta = _sfc_main$6;
            const _component_gallery = _sfc_main$7;
            const _component_post_action = _sfc_main$8;
            return vue.openBlock(), vue.createElementBlock("article", _hoisted_1$3, [
              vue.createElementVNode("div", _hoisted_2$3, [
                vue.createVNode(_component_profile, {
                  user: _ctx.post.user
                }, null, 8, ["user"]),
                vue.createVNode(_component_post_meta, { post: _ctx.post }, null, 8, ["post"])
              ]),
              vue.createElementVNode("main", null, [
                vue.createElementVNode("p", {
                  class: "whitespace-pre-wrap break-all text-4 text-black",
                  innerHTML: vue.unref(text)
                }, null, 8, _hoisted_3$3),
                vue.createVNode(_component_gallery, {
                  imgs: _ctx.post.imgs
                }, null, 8, ["imgs"]),
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              vue.createVNode(_component_post_action, {
                class: "justify-start!",
                post: _ctx.post
              }, null, 8, ["post"])
            ]);
          };
        }
      });
      const _hoisted_1$2 = { class: "mt-4 flex flex-col gap-2 rounded-2 bg-light p-3" };
      const _hoisted_2$2 = ["innerHTML"];
      const _hoisted_3$2 = { class: "flex justify-between text-gray" };
      const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
        __name: "Retweeted",
        props: {
          post: {}
        },
        async setup(__props) {
          let __temp, __restore;
          const props = __props;
          const text = ([__temp, __restore] = vue.withAsyncContext(() => fetchLongText(props.post)), __temp = await __temp, __restore(), __temp);
          return (_ctx, _cache) => {
            const _component_profile = _sfc_main$5;
            const _component_gallery = _sfc_main$7;
            const _component_post_meta = _sfc_main$6;
            return vue.openBlock(), vue.createElementBlock("article", _hoisted_1$2, [
              vue.createVNode(_component_profile, {
                user: _ctx.post.user
              }, null, 8, ["user"]),
              vue.createElementVNode("main", null, [
                vue.createElementVNode("p", {
                  class: "whitespace-pre-wrap break-all text-4 text-black",
                  innerHTML: vue.unref(text)
                }, null, 8, _hoisted_2$2),
                vue.createVNode(_component_gallery, {
                  imgs: _ctx.post.imgs
                }, null, 8, ["imgs"])
              ]),
              vue.createElementVNode("div", _hoisted_3$2, [
                vue.createVNode(_component_post_meta, { post: _ctx.post }, null, 8, ["post"])
              ])
            ]);
          };
        }
      });
      const _hoisted_1$1 = { class: "w-full flex flex-col items-center justify-center bg-light-700 py-8" };
      const _hoisted_2$1 = { class: "m-auto flex flex-col gap-4 rounded px-8 sm:max-w-55rem" };
      const _hoisted_3$1 = { class: "btns mt-4 flex select-none items-center gap-4" };
      const _hoisted_4$1 = ["disabled"];
      const _hoisted_5$1 = ["disabled"];
      const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
        __name: "List",
        setup(__props) {
          const postStore = usePostStore();
          const curPage = vue.ref(postStore.curPage);
          const posts = vue.computed(() => postStore.get());
          const isFinished = vue.ref(true);
          vue.watch(curPage, async (newPage, _) => {
            isFinished.value = false;
            if (newPage > postStore.viewedPage)
              await fetchPosts(curPage.value);
            postStore.setPage(newPage);
            preview();
            isFinished.value = true;
          });
          return (_ctx, _cache) => {
            const _component_post_retweeted = _sfc_main$3;
            const _component_post_item = _sfc_main$4;
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
              vue.createElementVNode("div", _hoisted_2$1, [
                (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(posts), (item) => {
                      return vue.openBlock(), vue.createBlock(_component_post_item, {
                        key: item.id,
                        post: item
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                            default: vue.withCtx(() => [
                              item.retweeted_status ? (vue.openBlock(), vue.createBlock(_component_post_retweeted, {
                                key: 0,
                                post: item.retweeted_status
                              }, null, 8, ["post"])) : vue.createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1032, ["post"]);
                    }), 128))
                  ]),
                  _: 1
                }))
              ]),
              vue.createElementVNode("div", _hoisted_3$1, [
                vue.createElementVNode("button", {
                  disabled: vue.unref(curPage) === 1 || !vue.unref(isFinished),
                  onClick: _cache[0] || (_cache[0] = ($event) => curPage.value--)
                }, " 上一页 ", 8, _hoisted_4$1),
                vue.createElementVNode("button", {
                  disabled: vue.unref(curPage) === vue.unref(postStore).pages || !vue.unref(isFinished),
                  onClick: _cache[1] || (_cache[1] = ($event) => curPage.value++)
                }, " 下一页 ", 8, _hoisted_5$1),
                vue.createElementVNode("span", null, "第 " + vue.toDisplayString(vue.unref(curPage)) + " 页, 共 " + vue.toDisplayString(vue.unref(postStore).pages) + " 页, " + vue.toDisplayString(vue.unref(postStore).total) + " 条", 1)
              ])
            ]);
          };
        }
      });
      const weibo = "https://weibo.com";
      const link = (text, url = weibo) => `<a href="${url}" target="_blank">${text}</a>`;
      function parseText(text) {
        const url = `${weibo}/n/`;
        const reg = /@([^:，\s]+)/g;
        return text.replace(reg, (_, user) => link(`@${user}`, url + user));
      }
      function parseImg(pic_ids, img_infos) {
        if (!pic_ids || !img_infos)
          return [];
        return pic_ids.map((id) => img_infos[id].largest.url);
      }
      function filterPosts(posts) {
        var _a2;
        if (!posts || !posts.length || !((_a2 = posts[0]) == null ? void 0 : _a2.id))
          return [];
        return posts.map((post) => ({
          id: post.id,
          text: post.text_raw,
          imgs: parseImg(post.pic_ids, post.pic_infos),
          reposts_count: post.reposts_count,
          comments_count: post.comments_count,
          attitudes_count: post.attitudes_count,
          created_at: post.created_at,
          user: {
            id: post.user.idstr,
            screen_name: post.user.screen_name,
            profile_image_url: post.user.profile_image_url
          },
          source: post.source,
          region_name: post.region_name,
          isLongText: post.isLongText,
          mblogid: post.mblogid,
          retweeted_status: filterPosts([post.retweeted_status])[0]
        }));
      }
      function preview() {
        const container = document.createElement("div");
        const vnode = vue.createVNode(_sfc_main$2);
        vue.render(vnode, container);
        const app2 = document.querySelector("#app") || document.querySelector("#preview");
        app2.id = "preview";
        app2.innerHTML = "";
        app2.appendChild(container);
      }
      const _hoisted_1 = { class: "fixed right-4 top-20 w-md flex flex-col select-none justify-center gap-4 rounded-2 bg-white p-4 text-black" };
      const _hoisted_2 = { class: "text-5 font-bold" };
      const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("p", null, "请选择要存档的范围，默认为从头到尾", -1);
      const _hoisted_4 = { class: "btns flex gap-4" };
      const _hoisted_5 = ["disabled"];
      const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
        __name: "Ctrl",
        async setup(__props) {
          var _a2, _b;
          let __temp, __restore;
          const id = ((_a2 = document.URL.match(/\/(\d+)/)) == null ? void 0 : _a2[1]) || "";
          const name = ((_b = document.URL.match(/\/n\/(.+)/)) == null ? void 0 : _b[1]) || "";
          [__temp, __restore] = vue.withAsyncContext(() => fetchUser(id, name)), await __temp, __restore();
          const dateRange = vue.ref([]);
          const postStore = usePostStore();
          const isFinish = vue.ref(false);
          async function start() {
            var _a3;
            if (((_a3 = dateRange.value) == null ? void 0 : _a3.length) === 0 || !dateRange.value) {
              const meta = await fetchPosts(postStore.curPage);
              postStore.setTotal((meta == null ? void 0 : meta.total) || 0);
              isFinish.value = true;
            }
          }
          return (_ctx, _cache) => {
            const _component_el_date_picker = ElDatePicker;
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
              vue.createElementVNode("h2", _hoisted_2, " Weibo archiver, user: " + vue.toDisplayString(("useUserStore" in _ctx ? _ctx.useUserStore : vue.unref(useUserStore))().name), 1),
              _hoisted_3,
              vue.createVNode(_component_el_date_picker, {
                modelValue: vue.unref(dateRange),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(dateRange) ? dateRange.value = $event : null),
                "unlink-panels": "",
                type: "daterange",
                "start-placeholder": "开始日期",
                "end-placeholder": "结束日期",
                "range-separator": "到",
                shortcuts: vue.unref(shortcuts)
              }, null, 8, ["modelValue", "shortcuts"]),
              vue.createElementVNode("div", _hoisted_4, [
                vue.createElementVNode("button", { onClick: start }, " 开始 "),
                vue.createElementVNode("button", {
                  disabled: !vue.unref(isFinish),
                  onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(preview)())
                }, " 预览 ", 8, _hoisted_5)
              ])
            ]);
          };
        }
      });
      /*! Element Plus v2.3.9 */
      var zhCn = {
        name: "zh-cn",
        el: {
          colorpicker: {
            confirm: "确定",
            clear: "清空"
          },
          datepicker: {
            now: "此刻",
            today: "今天",
            cancel: "取消",
            clear: "清空",
            confirm: "确定",
            selectDate: "选择日期",
            selectTime: "选择时间",
            startDate: "开始日期",
            startTime: "开始时间",
            endDate: "结束日期",
            endTime: "结束时间",
            prevYear: "前一年",
            nextYear: "后一年",
            prevMonth: "上个月",
            nextMonth: "下个月",
            year: "年",
            month1: "1 月",
            month2: "2 月",
            month3: "3 月",
            month4: "4 月",
            month5: "5 月",
            month6: "6 月",
            month7: "7 月",
            month8: "8 月",
            month9: "9 月",
            month10: "10 月",
            month11: "11 月",
            month12: "12 月",
            weeks: {
              sun: "日",
              mon: "一",
              tue: "二",
              wed: "三",
              thu: "四",
              fri: "五",
              sat: "六"
            },
            months: {
              jan: "一月",
              feb: "二月",
              mar: "三月",
              apr: "四月",
              may: "五月",
              jun: "六月",
              jul: "七月",
              aug: "八月",
              sep: "九月",
              oct: "十月",
              nov: "十一月",
              dec: "十二月"
            }
          },
          select: {
            loading: "加载中",
            noMatch: "无匹配数据",
            noData: "无数据",
            placeholder: "请选择"
          },
          cascader: {
            noMatch: "无匹配数据",
            loading: "加载中",
            placeholder: "请选择",
            noData: "暂无数据"
          },
          pagination: {
            goto: "前往",
            pagesize: "条/页",
            total: "共 {total} 条",
            pageClassifier: "页",
            page: "页",
            prev: "上一页",
            next: "下一页",
            currentPage: "第 {pager} 页",
            prevPages: "向前 {pager} 页",
            nextPages: "向后 {pager} 页",
            deprecationWarning: "你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档"
          },
          messagebox: {
            title: "提示",
            confirm: "确定",
            cancel: "取消",
            error: "输入的数据不合法!"
          },
          upload: {
            deleteTip: "按 delete 键可删除",
            delete: "删除",
            preview: "查看图片",
            continue: "继续上传"
          },
          table: {
            emptyText: "暂无数据",
            confirmFilter: "筛选",
            resetFilter: "重置",
            clearFilter: "全部",
            sumText: "合计"
          },
          tree: {
            emptyText: "暂无数据"
          },
          transfer: {
            noMatch: "无匹配数据",
            noData: "无数据",
            titles: ["列表 1", "列表 2"],
            filterPlaceholder: "请输入搜索内容",
            noCheckedFormat: "共 {total} 项",
            hasCheckedFormat: "已选 {checked}/{total} 项"
          },
          image: {
            error: "加载失败"
          },
          pageHeader: {
            title: "返回"
          },
          popconfirm: {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        }
      };
      const _sfc_main = {
        __name: "App",
        setup(__props) {
          return (_ctx, _cache) => {
            const _component_Ctrl = _sfc_main$1;
            const _component_el_config_provider = ElConfigProvider;
            return vue.openBlock(), vue.createBlock(_component_el_config_provider, { locale: vue.unref(zhCn) }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_Ctrl, { class: "font-sans" })
                  ]),
                  _: 1
                }))
              ]),
              _: 1
            }, 8, ["locale"]);
          };
        }
      };
      const app = vue.createApp(_sfc_main);
      app.use(createPinia()).mount(
        (() => {
          const div = document.createElement("div");
          div.id = "plugin-app";
          document.body.append(div);
          return div;
        })()
      );
    }
  });
  require_main_001();

})(Vue);
