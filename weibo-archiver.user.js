// ==UserScript==
// @name         Weibo Archiver
// @namespace    chilfish/monkey
// @version      0.6.0
// @author       Chilfish
// @description  将你的新浪微博存档备份的油猴脚本，为号被完全夹没前绸缪 😭
// @license      MIT
// @icon         https://p.chilfish.top/weibo/icon.webp
// @homepage     https://github.com/Chilfish/Weibo-archiver
// @source       https://github.com/Chilfish/Weibo-archiver/tree/main/packages/monkey
// @supportURL   https://github.com/Chilfish/Weibo-archiver/issues
// @downloadURL  https://github.com/Chilfish/Weibo-archiver/raw/monkey/weibo-archiver.user.js
// @updateURL    https://github.com/Chilfish/Weibo-archiver/raw/monkey/weibo-archiver.meta.js
// @match        https://weibo.com/*
// @require      https://unpkg.com/vue@3.5.14/dist/vue.global.prod.js
// @require      https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://unpkg.com/axios@1.9.0/dist/axios.min.js
// @require      https://unpkg.com/dexie@4.0.11/dist/dexie.min.js
// @grant        GM_addStyle
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(` .stats .stat{padding-block:0;padding-inline:0;width:fit-content}.stat-value{font-size:1rem}.cell[data-v-6ba3e729]{display:flex;align-items:center;justify-content:space-between;padding:.3rem .2rem}#plugin-app{z-index:100;position:relative;width:100%;height:100%;font-size:13px!important}.fixed-card{position:fixed;right:1rem;top:5rem;transition:all .3s ease-in-out;z-index:1000}.fixed-card::-webkit-scrollbar{width:8px;height:8px}.fixed-card::-webkit-scrollbar-track{border-radius:8px;background-color:transparent}.fixed-card::-webkit-scrollbar-thumb{border-radius:8px;background-color:#7a797963}.fixed-card{scrollbar-width:thin!important}/*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-space-y-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-gray-200:oklch(92.8% .006 264.531);--color-gray-500:oklch(55.1% .027 264.364);--color-black:#000;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--font-weight-semibold:600;--font-weight-bold:700;--radius-lg:.5rem;--radius-xl:.75rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:where(#plugin-app),#plugin-app:has(input.theme-controller[value=light]:checked),[data-theme=light]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(98% 0 0);--color-base-300:oklch(95% 0 0);--color-base-content:oklch(21% .006 285.885);--color-primary:oklch(45% .24 277.023);--color-primary-content:oklch(93% .034 272.788);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}@media (prefers-color-scheme:dark){#plugin-app{color-scheme:dark;--color-base-100:oklch(25.33% .016 252.42);--color-base-200:oklch(23.26% .014 253.1);--color-base-300:oklch(21.15% .012 254.09);--color-base-content:oklch(97.807% .029 256.847);--color-primary:oklch(58% .233 277.117);--color-primary-content:oklch(96% .018 272.314);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}}#plugin-app:has(input.theme-controller[value=light]:checked),[data-theme=light]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(98% 0 0);--color-base-300:oklch(95% 0 0);--color-base-content:oklch(21% .006 285.885);--color-primary:oklch(45% .24 277.023);--color-primary-content:oklch(93% .034 272.788);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=dark]:checked),[data-theme=dark]{color-scheme:dark;--color-base-100:oklch(25.33% .016 252.42);--color-base-200:oklch(23.26% .014 253.1);--color-base-300:oklch(21.15% .012 254.09);--color-base-content:oklch(97.807% .029 256.847);--color-primary:oklch(58% .233 277.117);--color-primary-content:oklch(96% .018 272.314);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=cupcake]:checked),[data-theme=cupcake]{color-scheme:light;--color-base-100:oklch(97.788% .004 56.375);--color-base-200:oklch(93.982% .007 61.449);--color-base-300:oklch(91.586% .006 53.44);--color-base-content:oklch(23.574% .066 313.189);--color-primary:oklch(85% .138 181.071);--color-primary-content:oklch(43% .078 188.216);--color-secondary:oklch(89% .061 343.231);--color-secondary-content:oklch(45% .187 3.815);--color-accent:oklch(90% .076 70.697);--color-accent-content:oklch(47% .157 37.304);--color-neutral:oklch(27% .006 286.033);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(68% .169 237.323);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(69% .17 162.48);--color-success-content:oklch(26% .051 172.552);--color-warning:oklch(79% .184 86.047);--color-warning-content:oklch(28% .066 53.813);--color-error:oklch(64% .246 16.439);--color-error-content:oklch(27% .105 12.094);--radius-selector:1rem;--radius-field:2rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:2px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=bumblebee]:checked),[data-theme=bumblebee]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(97% 0 0);--color-base-300:oklch(92% 0 0);--color-base-content:oklch(20% 0 0);--color-primary:oklch(85% .199 91.936);--color-primary-content:oklch(42% .095 57.708);--color-secondary:oklch(75% .183 55.934);--color-secondary-content:oklch(40% .123 38.172);--color-accent:oklch(0% 0 0);--color-accent-content:oklch(100% 0 0);--color-neutral:oklch(37% .01 67.558);--color-neutral-content:oklch(92% .003 48.717);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(39% .09 240.876);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(70% .191 22.216);--color-error-content:oklch(39% .141 25.723);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=emerald]:checked),[data-theme=emerald]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(93% 0 0);--color-base-300:oklch(86% 0 0);--color-base-content:oklch(35.519% .032 262.988);--color-primary:oklch(76.662% .135 153.45);--color-primary-content:oklch(33.387% .04 162.24);--color-secondary:oklch(61.302% .202 261.294);--color-secondary-content:oklch(100% 0 0);--color-accent:oklch(72.772% .149 33.2);--color-accent-content:oklch(0% 0 0);--color-neutral:oklch(35.519% .032 262.988);--color-neutral-content:oklch(98.462% .001 247.838);--color-info:oklch(72.06% .191 231.6);--color-info-content:oklch(0% 0 0);--color-success:oklch(64.8% .15 160);--color-success-content:oklch(0% 0 0);--color-warning:oklch(84.71% .199 83.87);--color-warning-content:oklch(0% 0 0);--color-error:oklch(71.76% .221 22.18);--color-error-content:oklch(0% 0 0);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=corporate]:checked),[data-theme=corporate]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(93% 0 0);--color-base-300:oklch(86% 0 0);--color-base-content:oklch(22.389% .031 278.072);--color-primary:oklch(58% .158 241.966);--color-primary-content:oklch(100% 0 0);--color-secondary:oklch(55% .046 257.417);--color-secondary-content:oklch(100% 0 0);--color-accent:oklch(60% .118 184.704);--color-accent-content:oklch(100% 0 0);--color-neutral:oklch(0% 0 0);--color-neutral-content:oklch(100% 0 0);--color-info:oklch(60% .126 221.723);--color-info-content:oklch(100% 0 0);--color-success:oklch(62% .194 149.214);--color-success-content:oklch(100% 0 0);--color-warning:oklch(85% .199 91.936);--color-warning-content:oklch(0% 0 0);--color-error:oklch(70% .191 22.216);--color-error-content:oklch(0% 0 0);--radius-selector:.25rem;--radius-field:.25rem;--radius-box:.25rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=synthwave]:checked),[data-theme=synthwave]{color-scheme:dark;--color-base-100:oklch(15% .09 281.288);--color-base-200:oklch(20% .09 281.288);--color-base-300:oklch(25% .09 281.288);--color-base-content:oklch(78% .115 274.713);--color-primary:oklch(71% .202 349.761);--color-primary-content:oklch(28% .109 3.907);--color-secondary:oklch(82% .111 230.318);--color-secondary-content:oklch(29% .066 243.157);--color-accent:oklch(75% .183 55.934);--color-accent-content:oklch(26% .079 36.259);--color-neutral:oklch(45% .24 277.023);--color-neutral-content:oklch(87% .065 274.039);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(77% .152 181.912);--color-success-content:oklch(27% .046 192.524);--color-warning:oklch(90% .182 98.111);--color-warning-content:oklch(42% .095 57.708);--color-error:oklch(73.7% .121 32.639);--color-error-content:oklch(23.501% .096 290.329);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=retro]:checked),[data-theme=retro]{color-scheme:light;--color-base-100:oklch(91.637% .034 90.515);--color-base-200:oklch(88.272% .049 91.774);--color-base-300:oklch(84.133% .065 90.856);--color-base-content:oklch(41% .112 45.904);--color-primary:oklch(80% .114 19.571);--color-primary-content:oklch(39% .141 25.723);--color-secondary:oklch(92% .084 155.995);--color-secondary-content:oklch(44% .119 151.328);--color-accent:oklch(68% .162 75.834);--color-accent-content:oklch(41% .112 45.904);--color-neutral:oklch(44% .011 73.639);--color-neutral-content:oklch(86% .005 56.366);--color-info:oklch(58% .158 241.966);--color-info-content:oklch(96% .059 95.617);--color-success:oklch(51% .096 186.391);--color-success-content:oklch(96% .059 95.617);--color-warning:oklch(64% .222 41.116);--color-warning-content:oklch(96% .059 95.617);--color-error:oklch(70% .191 22.216);--color-error-content:oklch(40% .123 38.172);--radius-selector:.25rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=cyberpunk]:checked),[data-theme=cyberpunk]{color-scheme:light;--color-base-100:oklch(94.51% .179 104.32);--color-base-200:oklch(91.51% .179 104.32);--color-base-300:oklch(85.51% .179 104.32);--color-base-content:oklch(0% 0 0);--color-primary:oklch(74.22% .209 6.35);--color-primary-content:oklch(14.844% .041 6.35);--color-secondary:oklch(83.33% .184 204.72);--color-secondary-content:oklch(16.666% .036 204.72);--color-accent:oklch(71.86% .217 310.43);--color-accent-content:oklch(14.372% .043 310.43);--color-neutral:oklch(23.04% .065 269.31);--color-neutral-content:oklch(94.51% .179 104.32);--color-info:oklch(72.06% .191 231.6);--color-info-content:oklch(0% 0 0);--color-success:oklch(64.8% .15 160);--color-success-content:oklch(0% 0 0);--color-warning:oklch(84.71% .199 83.87);--color-warning-content:oklch(0% 0 0);--color-error:oklch(71.76% .221 22.18);--color-error-content:oklch(0% 0 0);--radius-selector:0rem;--radius-field:0rem;--radius-box:0rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=valentine]:checked),[data-theme=valentine]{color-scheme:light;--color-base-100:oklch(97% .014 343.198);--color-base-200:oklch(94% .028 342.258);--color-base-300:oklch(89% .061 343.231);--color-base-content:oklch(52% .223 3.958);--color-primary:oklch(65% .241 354.308);--color-primary-content:oklch(100% 0 0);--color-secondary:oklch(62% .265 303.9);--color-secondary-content:oklch(97% .014 308.299);--color-accent:oklch(82% .111 230.318);--color-accent-content:oklch(39% .09 240.876);--color-neutral:oklch(40% .153 2.432);--color-neutral-content:oklch(89% .061 343.231);--color-info:oklch(86% .127 207.078);--color-info-content:oklch(44% .11 240.79);--color-success:oklch(84% .143 164.978);--color-success-content:oklch(43% .095 166.913);--color-warning:oklch(75% .183 55.934);--color-warning-content:oklch(26% .079 36.259);--color-error:oklch(63% .237 25.331);--color-error-content:oklch(97% .013 17.38);--radius-selector:1rem;--radius-field:2rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=halloween]:checked),[data-theme=halloween]{color-scheme:dark;--color-base-100:oklch(21% .006 56.043);--color-base-200:oklch(14% .004 49.25);--color-base-300:oklch(0% 0 0);--color-base-content:oklch(84.955% 0 0);--color-primary:oklch(77.48% .204 60.62);--color-primary-content:oklch(19.693% .004 196.779);--color-secondary:oklch(45.98% .248 305.03);--color-secondary-content:oklch(89.196% .049 305.03);--color-accent:oklch(64.8% .223 136.073);--color-accent-content:oklch(0% 0 0);--color-neutral:oklch(24.371% .046 65.681);--color-neutral-content:oklch(84.874% .009 65.681);--color-info:oklch(54.615% .215 262.88);--color-info-content:oklch(90.923% .043 262.88);--color-success:oklch(62.705% .169 149.213);--color-success-content:oklch(12.541% .033 149.213);--color-warning:oklch(66.584% .157 58.318);--color-warning-content:oklch(13.316% .031 58.318);--color-error:oklch(65.72% .199 27.33);--color-error-content:oklch(13.144% .039 27.33);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=garden]:checked),[data-theme=garden]{color-scheme:light;--color-base-100:oklch(92.951% .002 17.197);--color-base-200:oklch(86.445% .002 17.197);--color-base-300:oklch(79.938% .001 17.197);--color-base-content:oklch(16.961% .001 17.32);--color-primary:oklch(62.45% .278 3.836);--color-primary-content:oklch(100% 0 0);--color-secondary:oklch(48.495% .11 355.095);--color-secondary-content:oklch(89.699% .022 355.095);--color-accent:oklch(56.273% .054 154.39);--color-accent-content:oklch(100% 0 0);--color-neutral:oklch(24.155% .049 89.07);--color-neutral-content:oklch(92.951% .002 17.197);--color-info:oklch(72.06% .191 231.6);--color-info-content:oklch(0% 0 0);--color-success:oklch(64.8% .15 160);--color-success-content:oklch(0% 0 0);--color-warning:oklch(84.71% .199 83.87);--color-warning-content:oklch(0% 0 0);--color-error:oklch(71.76% .221 22.18);--color-error-content:oklch(0% 0 0);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=forest]:checked),[data-theme=forest]{color-scheme:dark;--color-base-100:oklch(20.84% .008 17.911);--color-base-200:oklch(18.522% .007 17.911);--color-base-300:oklch(16.203% .007 17.911);--color-base-content:oklch(83.768% .001 17.911);--color-primary:oklch(68.628% .185 148.958);--color-primary-content:oklch(0% 0 0);--color-secondary:oklch(69.776% .135 168.327);--color-secondary-content:oklch(13.955% .027 168.327);--color-accent:oklch(70.628% .119 185.713);--color-accent-content:oklch(14.125% .023 185.713);--color-neutral:oklch(30.698% .039 171.364);--color-neutral-content:oklch(86.139% .007 171.364);--color-info:oklch(72.06% .191 231.6);--color-info-content:oklch(0% 0 0);--color-success:oklch(64.8% .15 160);--color-success-content:oklch(0% 0 0);--color-warning:oklch(84.71% .199 83.87);--color-warning-content:oklch(0% 0 0);--color-error:oklch(71.76% .221 22.18);--color-error-content:oklch(0% 0 0);--radius-selector:1rem;--radius-field:2rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=aqua]:checked),[data-theme=aqua]{color-scheme:dark;--color-base-100:oklch(37% .146 265.522);--color-base-200:oklch(28% .091 267.935);--color-base-300:oklch(22% .091 267.935);--color-base-content:oklch(90% .058 230.902);--color-primary:oklch(85.661% .144 198.645);--color-primary-content:oklch(40.124% .068 197.603);--color-secondary:oklch(60.682% .108 309.782);--color-secondary-content:oklch(96% .016 293.756);--color-accent:oklch(93.426% .102 94.555);--color-accent-content:oklch(18.685% .02 94.555);--color-neutral:oklch(27% .146 265.522);--color-neutral-content:oklch(80% .146 265.522);--color-info:oklch(54.615% .215 262.88);--color-info-content:oklch(90.923% .043 262.88);--color-success:oklch(62.705% .169 149.213);--color-success-content:oklch(12.541% .033 149.213);--color-warning:oklch(66.584% .157 58.318);--color-warning-content:oklch(27% .077 45.635);--color-error:oklch(73.95% .19 27.33);--color-error-content:oklch(14.79% .038 27.33);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=lofi]:checked),[data-theme=lofi]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(97% 0 0);--color-base-300:oklch(94% 0 0);--color-base-content:oklch(0% 0 0);--color-primary:oklch(15.906% 0 0);--color-primary-content:oklch(100% 0 0);--color-secondary:oklch(21.455% .001 17.278);--color-secondary-content:oklch(100% 0 0);--color-accent:oklch(26.861% 0 0);--color-accent-content:oklch(100% 0 0);--color-neutral:oklch(0% 0 0);--color-neutral-content:oklch(100% 0 0);--color-info:oklch(79.54% .103 205.9);--color-info-content:oklch(15.908% .02 205.9);--color-success:oklch(90.13% .153 164.14);--color-success-content:oklch(18.026% .03 164.14);--color-warning:oklch(88.37% .135 79.94);--color-warning-content:oklch(17.674% .027 79.94);--color-error:oklch(78.66% .15 28.47);--color-error-content:oklch(15.732% .03 28.47);--radius-selector:2rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=pastel]:checked),[data-theme=pastel]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(98.462% .001 247.838);--color-base-300:oklch(92.462% .001 247.838);--color-base-content:oklch(20% 0 0);--color-primary:oklch(90% .063 306.703);--color-primary-content:oklch(49% .265 301.924);--color-secondary:oklch(89% .058 10.001);--color-secondary-content:oklch(51% .222 16.935);--color-accent:oklch(90% .093 164.15);--color-accent-content:oklch(50% .118 165.612);--color-neutral:oklch(55% .046 257.417);--color-neutral-content:oklch(92% .013 255.508);--color-info:oklch(86% .127 207.078);--color-info-content:oklch(52% .105 223.128);--color-success:oklch(87% .15 154.449);--color-success-content:oklch(52% .154 150.069);--color-warning:oklch(83% .128 66.29);--color-warning-content:oklch(55% .195 38.402);--color-error:oklch(80% .114 19.571);--color-error-content:oklch(50% .213 27.518);--radius-selector:1rem;--radius-field:2rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:2px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=fantasy]:checked),[data-theme=fantasy]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(93% 0 0);--color-base-300:oklch(86% 0 0);--color-base-content:oklch(27.807% .029 256.847);--color-primary:oklch(37.45% .189 325.02);--color-primary-content:oklch(87.49% .037 325.02);--color-secondary:oklch(53.92% .162 241.36);--color-secondary-content:oklch(90.784% .032 241.36);--color-accent:oklch(75.98% .204 56.72);--color-accent-content:oklch(15.196% .04 56.72);--color-neutral:oklch(27.807% .029 256.847);--color-neutral-content:oklch(85.561% .005 256.847);--color-info:oklch(72.06% .191 231.6);--color-info-content:oklch(0% 0 0);--color-success:oklch(64.8% .15 160);--color-success-content:oklch(0% 0 0);--color-warning:oklch(84.71% .199 83.87);--color-warning-content:oklch(0% 0 0);--color-error:oklch(71.76% .221 22.18);--color-error-content:oklch(0% 0 0);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=wireframe]:checked),[data-theme=wireframe]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(97% 0 0);--color-base-300:oklch(94% 0 0);--color-base-content:oklch(20% 0 0);--color-primary:oklch(87% 0 0);--color-primary-content:oklch(26% 0 0);--color-secondary:oklch(87% 0 0);--color-secondary-content:oklch(26% 0 0);--color-accent:oklch(87% 0 0);--color-accent-content:oklch(26% 0 0);--color-neutral:oklch(87% 0 0);--color-neutral-content:oklch(26% 0 0);--color-info:oklch(44% .11 240.79);--color-info-content:oklch(90% .058 230.902);--color-success:oklch(43% .095 166.913);--color-success-content:oklch(90% .093 164.15);--color-warning:oklch(47% .137 46.201);--color-warning-content:oklch(92% .12 95.746);--color-error:oklch(44% .177 26.899);--color-error-content:oklch(88% .062 18.334);--radius-selector:0rem;--radius-field:.25rem;--radius-box:.25rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=black]:checked),[data-theme=black]{color-scheme:dark;--color-base-100:oklch(0% 0 0);--color-base-200:oklch(19% 0 0);--color-base-300:oklch(22% 0 0);--color-base-content:oklch(87.609% 0 0);--color-primary:oklch(35% 0 0);--color-primary-content:oklch(100% 0 0);--color-secondary:oklch(35% 0 0);--color-secondary-content:oklch(100% 0 0);--color-accent:oklch(35% 0 0);--color-accent-content:oklch(100% 0 0);--color-neutral:oklch(35% 0 0);--color-neutral-content:oklch(100% 0 0);--color-info:oklch(45.201% .313 264.052);--color-info-content:oklch(89.04% .062 264.052);--color-success:oklch(51.975% .176 142.495);--color-success-content:oklch(90.395% .035 142.495);--color-warning:oklch(96.798% .211 109.769);--color-warning-content:oklch(19.359% .042 109.769);--color-error:oklch(62.795% .257 29.233);--color-error-content:oklch(12.559% .051 29.233);--radius-selector:0rem;--radius-field:0rem;--radius-box:0rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=luxury]:checked),[data-theme=luxury]{color-scheme:dark;--color-base-100:oklch(14.076% .004 285.822);--color-base-200:oklch(20.219% .004 308.229);--color-base-300:oklch(23.219% .004 308.229);--color-base-content:oklch(75.687% .123 76.89);--color-primary:oklch(100% 0 0);--color-primary-content:oklch(20% 0 0);--color-secondary:oklch(27.581% .064 261.069);--color-secondary-content:oklch(85.516% .012 261.069);--color-accent:oklch(36.674% .051 338.825);--color-accent-content:oklch(87.334% .01 338.825);--color-neutral:oklch(24.27% .057 59.825);--color-neutral-content:oklch(93.203% .089 90.861);--color-info:oklch(79.061% .121 237.133);--color-info-content:oklch(15.812% .024 237.133);--color-success:oklch(78.119% .192 132.154);--color-success-content:oklch(15.623% .038 132.154);--color-warning:oklch(86.127% .136 102.891);--color-warning-content:oklch(17.225% .027 102.891);--color-error:oklch(71.753% .176 22.568);--color-error-content:oklch(14.35% .035 22.568);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=dracula]:checked),[data-theme=dracula]{color-scheme:dark;--color-base-100:oklch(28.822% .022 277.508);--color-base-200:oklch(26.805% .02 277.508);--color-base-300:oklch(24.787% .019 277.508);--color-base-content:oklch(97.747% .007 106.545);--color-primary:oklch(75.461% .183 346.812);--color-primary-content:oklch(15.092% .036 346.812);--color-secondary:oklch(74.202% .148 301.883);--color-secondary-content:oklch(14.84% .029 301.883);--color-accent:oklch(83.392% .124 66.558);--color-accent-content:oklch(16.678% .024 66.558);--color-neutral:oklch(39.445% .032 275.524);--color-neutral-content:oklch(87.889% .006 275.524);--color-info:oklch(88.263% .093 212.846);--color-info-content:oklch(17.652% .018 212.846);--color-success:oklch(87.099% .219 148.024);--color-success-content:oklch(17.419% .043 148.024);--color-warning:oklch(95.533% .134 112.757);--color-warning-content:oklch(19.106% .026 112.757);--color-error:oklch(68.22% .206 24.43);--color-error-content:oklch(13.644% .041 24.43);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=cmyk]:checked),[data-theme=cmyk]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(95% 0 0);--color-base-300:oklch(90% 0 0);--color-base-content:oklch(20% 0 0);--color-primary:oklch(71.772% .133 239.443);--color-primary-content:oklch(14.354% .026 239.443);--color-secondary:oklch(64.476% .202 359.339);--color-secondary-content:oklch(12.895% .04 359.339);--color-accent:oklch(94.228% .189 105.306);--color-accent-content:oklch(18.845% .037 105.306);--color-neutral:oklch(21.778% 0 0);--color-neutral-content:oklch(84.355% 0 0);--color-info:oklch(68.475% .094 217.284);--color-info-content:oklch(13.695% .018 217.284);--color-success:oklch(46.949% .162 321.406);--color-success-content:oklch(89.389% .032 321.406);--color-warning:oklch(71.236% .159 52.023);--color-warning-content:oklch(14.247% .031 52.023);--color-error:oklch(62.013% .208 28.717);--color-error-content:oklch(12.402% .041 28.717);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=autumn]:checked),[data-theme=autumn]{color-scheme:light;--color-base-100:oklch(95.814% 0 0);--color-base-200:oklch(89.107% 0 0);--color-base-300:oklch(82.4% 0 0);--color-base-content:oklch(19.162% 0 0);--color-primary:oklch(40.723% .161 17.53);--color-primary-content:oklch(88.144% .032 17.53);--color-secondary:oklch(61.676% .169 23.865);--color-secondary-content:oklch(12.335% .033 23.865);--color-accent:oklch(73.425% .094 60.729);--color-accent-content:oklch(14.685% .018 60.729);--color-neutral:oklch(54.367% .037 51.902);--color-neutral-content:oklch(90.873% .007 51.902);--color-info:oklch(69.224% .097 207.284);--color-info-content:oklch(13.844% .019 207.284);--color-success:oklch(60.995% .08 174.616);--color-success-content:oklch(12.199% .016 174.616);--color-warning:oklch(70.081% .164 56.844);--color-warning-content:oklch(14.016% .032 56.844);--color-error:oklch(53.07% .241 24.16);--color-error-content:oklch(90.614% .048 24.16);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=business]:checked),[data-theme=business]{color-scheme:dark;--color-base-100:oklch(24.353% 0 0);--color-base-200:oklch(22.648% 0 0);--color-base-300:oklch(20.944% 0 0);--color-base-content:oklch(84.87% 0 0);--color-primary:oklch(41.703% .099 251.473);--color-primary-content:oklch(88.34% .019 251.473);--color-secondary:oklch(64.092% .027 229.389);--color-secondary-content:oklch(12.818% .005 229.389);--color-accent:oklch(67.271% .167 35.791);--color-accent-content:oklch(13.454% .033 35.791);--color-neutral:oklch(27.441% .013 253.041);--color-neutral-content:oklch(85.488% .002 253.041);--color-info:oklch(62.616% .143 240.033);--color-info-content:oklch(12.523% .028 240.033);--color-success:oklch(70.226% .094 156.596);--color-success-content:oklch(14.045% .018 156.596);--color-warning:oklch(77.482% .115 81.519);--color-warning-content:oklch(15.496% .023 81.519);--color-error:oklch(51.61% .146 29.674);--color-error-content:oklch(90.322% .029 29.674);--radius-selector:0rem;--radius-field:.25rem;--radius-box:.25rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=acid]:checked),[data-theme=acid]{color-scheme:light;--color-base-100:oklch(98% 0 0);--color-base-200:oklch(95% 0 0);--color-base-300:oklch(91% 0 0);--color-base-content:oklch(0% 0 0);--color-primary:oklch(71.9% .357 330.759);--color-primary-content:oklch(14.38% .071 330.759);--color-secondary:oklch(73.37% .224 48.25);--color-secondary-content:oklch(14.674% .044 48.25);--color-accent:oklch(92.78% .264 122.962);--color-accent-content:oklch(18.556% .052 122.962);--color-neutral:oklch(21.31% .128 278.68);--color-neutral-content:oklch(84.262% .025 278.68);--color-info:oklch(60.72% .227 252.05);--color-info-content:oklch(12.144% .045 252.05);--color-success:oklch(85.72% .266 158.53);--color-success-content:oklch(17.144% .053 158.53);--color-warning:oklch(91.01% .212 100.5);--color-warning-content:oklch(18.202% .042 100.5);--color-error:oklch(64.84% .293 29.349);--color-error-content:oklch(12.968% .058 29.349);--radius-selector:1rem;--radius-field:1rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=lemonade]:checked),[data-theme=lemonade]{color-scheme:light;--color-base-100:oklch(98.71% .02 123.72);--color-base-200:oklch(91.8% .018 123.72);--color-base-300:oklch(84.89% .017 123.72);--color-base-content:oklch(19.742% .004 123.72);--color-primary:oklch(58.92% .199 134.6);--color-primary-content:oklch(11.784% .039 134.6);--color-secondary:oklch(77.75% .196 111.09);--color-secondary-content:oklch(15.55% .039 111.09);--color-accent:oklch(85.39% .201 100.73);--color-accent-content:oklch(17.078% .04 100.73);--color-neutral:oklch(30.98% .075 108.6);--color-neutral-content:oklch(86.196% .015 108.6);--color-info:oklch(86.19% .047 224.14);--color-info-content:oklch(17.238% .009 224.14);--color-success:oklch(86.19% .047 157.85);--color-success-content:oklch(17.238% .009 157.85);--color-warning:oklch(86.19% .047 102.15);--color-warning-content:oklch(17.238% .009 102.15);--color-error:oklch(86.19% .047 25.85);--color-error-content:oklch(17.238% .009 25.85);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=night]:checked),[data-theme=night]{color-scheme:dark;--color-base-100:oklch(20.768% .039 265.754);--color-base-200:oklch(19.314% .037 265.754);--color-base-300:oklch(17.86% .034 265.754);--color-base-content:oklch(84.153% .007 265.754);--color-primary:oklch(75.351% .138 232.661);--color-primary-content:oklch(15.07% .027 232.661);--color-secondary:oklch(68.011% .158 276.934);--color-secondary-content:oklch(13.602% .031 276.934);--color-accent:oklch(72.36% .176 350.048);--color-accent-content:oklch(14.472% .035 350.048);--color-neutral:oklch(27.949% .036 260.03);--color-neutral-content:oklch(85.589% .007 260.03);--color-info:oklch(68.455% .148 237.251);--color-info-content:oklch(0% 0 0);--color-success:oklch(78.452% .132 181.911);--color-success-content:oklch(15.69% .026 181.911);--color-warning:oklch(83.242% .139 82.95);--color-warning-content:oklch(16.648% .027 82.95);--color-error:oklch(71.785% .17 13.118);--color-error-content:oklch(14.357% .034 13.118);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=coffee]:checked),[data-theme=coffee]{color-scheme:dark;--color-base-100:oklch(24% .023 329.708);--color-base-200:oklch(21% .021 329.708);--color-base-300:oklch(16% .019 329.708);--color-base-content:oklch(72.354% .092 79.129);--color-primary:oklch(71.996% .123 62.756);--color-primary-content:oklch(14.399% .024 62.756);--color-secondary:oklch(34.465% .029 199.194);--color-secondary-content:oklch(86.893% .005 199.194);--color-accent:oklch(42.621% .074 224.389);--color-accent-content:oklch(88.524% .014 224.389);--color-neutral:oklch(16.51% .015 326.261);--color-neutral-content:oklch(83.302% .003 326.261);--color-info:oklch(79.49% .063 184.558);--color-info-content:oklch(15.898% .012 184.558);--color-success:oklch(74.722% .072 131.116);--color-success-content:oklch(14.944% .014 131.116);--color-warning:oklch(88.15% .14 87.722);--color-warning-content:oklch(17.63% .028 87.722);--color-error:oklch(77.318% .128 31.871);--color-error-content:oklch(15.463% .025 31.871);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=winter]:checked),[data-theme=winter]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(97.466% .011 259.822);--color-base-300:oklch(93.268% .016 262.751);--color-base-content:oklch(41.886% .053 255.824);--color-primary:oklch(56.86% .255 257.57);--color-primary-content:oklch(91.372% .051 257.57);--color-secondary:oklch(42.551% .161 282.339);--color-secondary-content:oklch(88.51% .032 282.339);--color-accent:oklch(59.939% .191 335.171);--color-accent-content:oklch(11.988% .038 335.171);--color-neutral:oklch(19.616% .063 257.651);--color-neutral-content:oklch(83.923% .012 257.651);--color-info:oklch(88.127% .085 214.515);--color-info-content:oklch(17.625% .017 214.515);--color-success:oklch(80.494% .077 197.823);--color-success-content:oklch(16.098% .015 197.823);--color-warning:oklch(89.172% .045 71.47);--color-warning-content:oklch(17.834% .009 71.47);--color-error:oklch(73.092% .11 20.076);--color-error-content:oklch(14.618% .022 20.076);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=dim]:checked),[data-theme=dim]{color-scheme:dark;--color-base-100:oklch(30.857% .023 264.149);--color-base-200:oklch(28.036% .019 264.182);--color-base-300:oklch(26.346% .018 262.177);--color-base-content:oklch(82.901% .031 222.959);--color-primary:oklch(86.133% .141 139.549);--color-primary-content:oklch(17.226% .028 139.549);--color-secondary:oklch(73.375% .165 35.353);--color-secondary-content:oklch(14.675% .033 35.353);--color-accent:oklch(74.229% .133 311.379);--color-accent-content:oklch(14.845% .026 311.379);--color-neutral:oklch(24.731% .02 264.094);--color-neutral-content:oklch(82.901% .031 222.959);--color-info:oklch(86.078% .142 206.182);--color-info-content:oklch(17.215% .028 206.182);--color-success:oklch(86.171% .142 166.534);--color-success-content:oklch(17.234% .028 166.534);--color-warning:oklch(86.163% .142 94.818);--color-warning-content:oklch(17.232% .028 94.818);--color-error:oklch(82.418% .099 33.756);--color-error-content:oklch(16.483% .019 33.756);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=nord]:checked),[data-theme=nord]{color-scheme:light;--color-base-100:oklch(95.127% .007 260.731);--color-base-200:oklch(93.299% .01 261.788);--color-base-300:oklch(89.925% .016 262.749);--color-base-content:oklch(32.437% .022 264.182);--color-primary:oklch(59.435% .077 254.027);--color-primary-content:oklch(11.887% .015 254.027);--color-secondary:oklch(69.651% .059 248.687);--color-secondary-content:oklch(13.93% .011 248.687);--color-accent:oklch(77.464% .062 217.469);--color-accent-content:oklch(15.492% .012 217.469);--color-neutral:oklch(45.229% .035 264.131);--color-neutral-content:oklch(89.925% .016 262.749);--color-info:oklch(69.207% .062 332.664);--color-info-content:oklch(13.841% .012 332.664);--color-success:oklch(76.827% .074 131.063);--color-success-content:oklch(15.365% .014 131.063);--color-warning:oklch(85.486% .089 84.093);--color-warning-content:oklch(17.097% .017 84.093);--color-error:oklch(60.61% .12 15.341);--color-error-content:oklch(12.122% .024 15.341);--radius-selector:1rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=sunset]:checked),[data-theme=sunset]{color-scheme:dark;--color-base-100:oklch(22% .019 237.69);--color-base-200:oklch(20% .019 237.69);--color-base-300:oklch(18% .019 237.69);--color-base-content:oklch(77.383% .043 245.096);--color-primary:oklch(74.703% .158 39.947);--color-primary-content:oklch(14.94% .031 39.947);--color-secondary:oklch(72.537% .177 2.72);--color-secondary-content:oklch(14.507% .035 2.72);--color-accent:oklch(71.294% .166 299.844);--color-accent-content:oklch(14.258% .033 299.844);--color-neutral:oklch(26% .019 237.69);--color-neutral-content:oklch(70% .019 237.69);--color-info:oklch(85.559% .085 206.015);--color-info-content:oklch(17.111% .017 206.015);--color-success:oklch(85.56% .085 144.778);--color-success-content:oklch(17.112% .017 144.778);--color-warning:oklch(85.569% .084 74.427);--color-warning-content:oklch(17.113% .016 74.427);--color-error:oklch(85.511% .078 16.886);--color-error-content:oklch(17.102% .015 16.886);--radius-selector:1rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:0;--noise:0}#plugin-app:has(input.theme-controller[value=caramellatte]:checked),[data-theme=caramellatte]{color-scheme:light;--color-base-100:oklch(98% .016 73.684);--color-base-200:oklch(95% .038 75.164);--color-base-300:oklch(90% .076 70.697);--color-base-content:oklch(40% .123 38.172);--color-primary:oklch(0% 0 0);--color-primary-content:oklch(100% 0 0);--color-secondary:oklch(22.45% .075 37.85);--color-secondary-content:oklch(90% .076 70.697);--color-accent:oklch(46.44% .111 37.85);--color-accent-content:oklch(90% .076 70.697);--color-neutral:oklch(55% .195 38.402);--color-neutral-content:oklch(98% .016 73.684);--color-info:oklch(42% .199 265.638);--color-info-content:oklch(90% .076 70.697);--color-success:oklch(43% .095 166.913);--color-success-content:oklch(90% .076 70.697);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(70% .191 22.216);--color-error-content:oklch(39% .141 25.723);--radius-selector:2rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:2px;--depth:1;--noise:1}#plugin-app:has(input.theme-controller[value=abyss]:checked),[data-theme=abyss]{color-scheme:dark;--color-base-100:oklch(20% .08 209);--color-base-200:oklch(15% .08 209);--color-base-300:oklch(10% .08 209);--color-base-content:oklch(90% .076 70.697);--color-primary:oklch(92% .2653 125);--color-primary-content:oklch(50% .2653 125);--color-secondary:oklch(83.27% .0764 298.3);--color-secondary-content:oklch(43.27% .0764 298.3);--color-accent:oklch(43% 0 0);--color-accent-content:oklch(98% 0 0);--color-neutral:oklch(30% .08 209);--color-neutral-content:oklch(90% .076 70.697);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(79% .209 151.711);--color-success-content:oklch(26% .065 152.934);--color-warning:oklch(84.8% .1962 84.62);--color-warning-content:oklch(44.8% .1962 84.62);--color-error:oklch(65% .1985 24.22);--color-error-content:oklch(27% .1985 24.22);--radius-selector:2rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}#plugin-app:has(input.theme-controller[value=silk]:checked),[data-theme=silk]{color-scheme:light;--color-base-100:oklch(97% .0035 67.78);--color-base-200:oklch(95% .0081 61.42);--color-base-300:oklch(90% .0081 61.42);--color-base-content:oklch(40% .0081 61.42);--color-primary:oklch(23.27% .0249 284.3);--color-primary-content:oklch(94.22% .2505 117.44);--color-secondary:oklch(23.27% .0249 284.3);--color-secondary-content:oklch(73.92% .2135 50.94);--color-accent:oklch(23.27% .0249 284.3);--color-accent-content:oklch(88.92% .2061 189.9);--color-neutral:oklch(20% 0 0);--color-neutral-content:oklch(80% .0081 61.42);--color-info:oklch(80.39% .1148 241.68);--color-info-content:oklch(30.39% .1148 241.68);--color-success:oklch(83.92% .0901 136.87);--color-success-content:oklch(23.92% .0901 136.87);--color-warning:oklch(83.92% .1085 80);--color-warning-content:oklch(43.92% .1085 80);--color-error:oklch(75.1% .1814 22.37);--color-error-content:oklch(35.1% .1814 22.37);--radius-selector:2rem;--radius-field:.5rem;--radius-box:1rem;--size-selector:.25rem;--size-field:.25rem;--border:2px;--depth:1;--noise:0}:root:has(.modal-open,.modal[open],.modal:target,.modal-toggle:checked,.drawer:not([class*=drawer-open])>.drawer-toggle:checked){overflow:hidden}:root,[data-theme]{background-color:var(--root-bg,var(--color-base-100));color:var(--color-base-content)}:root{scrollbar-color:currentColor #0000}@supports (color:color-mix(in lab,red,red)){:root{scrollbar-color:color-mix(in oklch,currentColor 35%,#0000)#0000}}@property --radialprogress{syntax: "<percentage>"; inherits: true; initial-value: 0%;}:where(:root:has(.modal-open,.modal[open],.modal:target,.modal-toggle:checked,.drawer:not(.drawer-open)>.drawer-toggle:checked)){scrollbar-gutter:stable;background-image:linear-gradient(var(--color-base-100),var(--color-base-100));--root-bg:var(--color-base-100)}@supports (color:color-mix(in lab,red,red)){:where(:root:has(.modal-open,.modal[open],.modal:target,.modal-toggle:checked,.drawer:not(.drawer-open)>.drawer-toggle:checked)){--root-bg:color-mix(in srgb,var(--color-base-100),oklch(0% 0 0) 40%)}}:where(.modal[open],.modal-open,.modal-toggle:checked+.modal):not(.modal-start,.modal-end){scrollbar-gutter:stable}:root{--fx-noise:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.34' numOctaves='4' stitchTiles='stitch'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='0.2'%3E%3C/rect%3E%3C/svg%3E")}.chat{--mask-chat:url("data:image/svg+xml,%3csvg width='13' height='13' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M0 11.5004C0 13.0004 2 13.0004 2 13.0004H12H13V0.00036329L12.5 0C12.5 0 11.977 2.09572 11.8581 2.50033C11.6075 3.35237 10.9149 4.22374 9 5.50036C6 7.50036 0 10.0004 0 11.5004Z'/%3e%3c/svg%3e")}}@layer components;@layer utilities{.modal{pointer-events:none;visibility:hidden;width:100%;max-width:none;height:100%;max-height:none;color:inherit;transition:translate .3s ease-out,visibility .3s allow-discrete,background-color .3s ease-out,opacity .1s ease-out;overscroll-behavior:contain;z-index:999;background-color:#0000;place-items:center;margin:0;padding:0;display:grid;position:fixed;top:0;right:0;bottom:0;left:0;overflow:hidden}.modal::backdrop{display:none}.modal.modal-open,.modal[open],.modal:target{pointer-events:auto;visibility:visible;opacity:1;background-color:#0006}:is(.modal.modal-open,.modal[open],.modal:target) .modal-box{opacity:1;translate:0;scale:1}@starting-style{.modal.modal-open,.modal[open],.modal:target{visibility:hidden;opacity:0}}:where(.btn){width:unset}.btn{cursor:pointer;text-align:center;vertical-align:middle;outline-offset:2px;webkit-user-select:none;-webkit-user-select:none;user-select:none;padding-inline:var(--btn-p);color:var(--btn-fg);--tw-prose-links:var(--btn-fg);height:var(--size);font-size:var(--fontsize,.875rem);outline-color:var(--btn-color,var(--color-base-content));background-color:var(--btn-bg);background-size:auto,calc(var(--noise)*100%);background-image:none,var(--btn-noise);border-width:var(--border);border-style:solid;border-color:var(--btn-border);text-shadow:0 .5px oklch(100% 0 0/calc(var(--depth)*.15));touch-action:manipulation;box-shadow:0 .5px 0 .5px oklch(100% 0 0/calc(var(--depth)*6%)) inset,var(--btn-shadow);--size:calc(var(--size-field,.25rem)*10);--btn-bg:var(--btn-color,var(--color-base-200));--btn-fg:var(--color-base-content);--btn-p:1rem;--btn-border:var(--btn-bg);border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));flex-wrap:nowrap;flex-shrink:0;justify-content:center;align-items:center;gap:.375rem;font-weight:600;transition-property:color,background-color,border-color,box-shadow;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);display:inline-flex}@supports (color:color-mix(in lab,red,red)){.btn{--btn-border:color-mix(in oklab,var(--btn-bg),#000 calc(var(--depth)*5%))}}.btn{--btn-shadow:0 3px 2px -2px var(--btn-bg),0 4px 3px -2px var(--btn-bg)}@supports (color:color-mix(in lab,red,red)){.btn{--btn-shadow:0 3px 2px -2px color-mix(in oklab,var(--btn-bg)calc(var(--depth)*30%),#0000),0 4px 3px -2px color-mix(in oklab,var(--btn-bg)calc(var(--depth)*30%),#0000)}}.btn{--btn-noise:var(--fx-noise)}.prose .btn{text-decoration-line:none}@media (hover:hover){.btn:hover{--btn-bg:var(--btn-color,var(--color-base-200))}@supports (color:color-mix(in lab,red,red)){.btn:hover{--btn-bg:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 7%)}}}.btn:focus-visible{isolation:isolate;outline-width:2px;outline-style:solid}.btn:active:not(.btn-active){--btn-bg:var(--btn-color,var(--color-base-200));translate:0 .5px}@supports (color:color-mix(in lab,red,red)){.btn:active:not(.btn-active){--btn-bg:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 5%)}}.btn:active:not(.btn-active){--btn-border:var(--btn-color,var(--color-base-200))}@supports (color:color-mix(in lab,red,red)){.btn:active:not(.btn-active){--btn-border:color-mix(in oklab,var(--btn-color,var(--color-base-200)),#000 7%)}}.btn:active:not(.btn-active){--btn-shadow:0 0 0 0 oklch(0% 0 0/0),0 0 0 0 oklch(0% 0 0/0)}.btn:is(:disabled,[disabled],.btn-disabled):not(.btn-link,.btn-ghost){background-color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.btn:is(:disabled,[disabled],.btn-disabled):not(.btn-link,.btn-ghost){background-color:color-mix(in oklab,var(--color-base-content)10%,transparent)}}.btn:is(:disabled,[disabled],.btn-disabled):not(.btn-link,.btn-ghost){box-shadow:none}.btn:is(:disabled,[disabled],.btn-disabled){pointer-events:none;--btn-border:#0000;--btn-noise:none;--btn-fg:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.btn:is(:disabled,[disabled],.btn-disabled){--btn-fg:color-mix(in oklch,var(--color-base-content)20%,#0000)}}@media (hover:hover){.btn:is(:disabled,[disabled],.btn-disabled):hover{pointer-events:none;background-color:var(--color-neutral)}@supports (color:color-mix(in lab,red,red)){.btn:is(:disabled,[disabled],.btn-disabled):hover{background-color:color-mix(in oklab,var(--color-neutral)20%,transparent)}}.btn:is(:disabled,[disabled],.btn-disabled):hover{--btn-border:#0000;--btn-fg:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.btn:is(:disabled,[disabled],.btn-disabled):hover{--btn-fg:color-mix(in oklch,var(--color-base-content)20%,#0000)}}}.btn:is(input[type=checkbox],input[type=radio]){-webkit-appearance:none;-moz-appearance:none;appearance:none}.btn:is(input[type=checkbox],input[type=radio]):after{content:attr(aria-label)}.btn:where(input:checked:not(.filter .btn)){--btn-color:var(--color-primary);--btn-fg:var(--color-primary-content);isolation:isolate}.loading{pointer-events:none;aspect-ratio:1;vertical-align:middle;width:calc(var(--size-selector,.25rem)*6);background-color:currentColor;display:inline-block;-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.toggle{border:var(--border)solid currentColor;color:var(--input-color);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;vertical-align:middle;webkit-user-select:none;-webkit-user-select:none;user-select:none;--radius-selector-max:calc(var(--radius-selector) + var(--radius-selector) + var(--radius-selector));border-radius:calc(var(--radius-selector) + min(var(--toggle-p),var(--radius-selector-max)) + min(var(--border),var(--radius-selector-max)));padding:var(--toggle-p);flex-shrink:0;grid-template-columns:0fr 1fr 1fr;place-content:center;display:inline-grid;position:relative;box-shadow:inset 0 1px}@supports (color:color-mix(in lab,red,red)){.toggle{box-shadow:0 1px color-mix(in oklab,currentColor calc(var(--depth)*10%),#0000) inset}}.toggle{--input-color:var(--color-base-content);transition:color .3s,grid-template-columns .2s}@supports (color:color-mix(in lab,red,red)){.toggle{--input-color:color-mix(in oklab,var(--color-base-content)50%,#0000)}}.toggle{--toggle-p:calc(var(--size)*.125);--size:calc(var(--size-selector,.25rem)*6);width:calc((var(--size)*2) - (var(--border) + var(--toggle-p))*2);height:var(--size)}.toggle>*{z-index:1;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#0000;border:none;grid-column:2/span 1;grid-row-start:1;height:100%;padding:.125rem;transition:opacity .2s,rotate .4s}.toggle>:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.toggle>:focus{outline-offset:2px;outline:2px solid #0000}}.toggle>:nth-child(2){color:var(--color-base-100);rotate:none}.toggle>:nth-child(3){color:var(--color-base-100);opacity:0;rotate:-15deg}.toggle:has(:checked)>:nth-child(2){opacity:0;rotate:15deg}.toggle:has(:checked)>:nth-child(3){opacity:1;rotate:none}.toggle:before{aspect-ratio:1;border-radius:var(--radius-selector);--tw-content:"";content:var(--tw-content);height:100%;box-shadow:0 -1px oklch(0% 0 0/calc(var(--depth)*.1)) inset,0 8px 0 -4px oklch(100% 0 0/calc(var(--depth)*.1)) inset,0 1px currentColor;background-color:currentColor;grid-row-start:1;grid-column-start:2;transition:background-color .1s,translate .2s,inset-inline-start .2s;position:relative;inset-inline-start:0;translate:0}@supports (color:color-mix(in lab,red,red)){.toggle:before{box-shadow:0 -1px oklch(0% 0 0/calc(var(--depth)*.1)) inset,0 8px 0 -4px oklch(100% 0 0/calc(var(--depth)*.1)) inset,0 1px color-mix(in oklab,currentColor calc(var(--depth)*10%),#0000)}}.toggle:before{background-size:auto,calc(var(--noise)*100%);background-image:none,var(--fx-noise)}@media (forced-colors:active){.toggle:before{outline-style:var(--tw-outline-style);outline-offset:-1px;outline-width:1px}}@media print{.toggle:before{outline-offset:-1rem;outline:.25rem solid}}.toggle:focus-visible,.toggle:has(:focus-visible){outline-offset:2px;outline:2px solid}.toggle:checked,.toggle[aria-checked=true],.toggle:has(>input:checked){background-color:var(--color-base-100);--input-color:var(--color-base-content);grid-template-columns:1fr 1fr 0fr}:is(.toggle:checked,.toggle[aria-checked=true],.toggle:has(>input:checked)):before{background-color:currentColor}@starting-style{:is(.toggle:checked,.toggle[aria-checked=true],.toggle:has(>input:checked)):before{opacity:0}}.toggle:indeterminate{grid-template-columns:.5fr 1fr .5fr}.toggle:disabled{cursor:not-allowed;opacity:.3}.toggle:disabled:before{border:var(--border)solid currentColor;background-color:#0000}.input{cursor:text;border:var(--border)solid #0000;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--color-base-100);vertical-align:middle;white-space:nowrap;width:clamp(3rem,20rem,100%);height:var(--size);border-color:var(--input-color);box-shadow:0 1px var(--input-color) inset,0 -1px oklch(100% 0 0/calc(var(--depth)*.1)) inset;border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));flex-shrink:1;align-items:center;gap:.5rem;padding-inline:.75rem;font-size:.875rem;display:inline-flex;position:relative}@supports (color:color-mix(in lab,red,red)){.input{box-shadow:0 1px color-mix(in oklab,var(--input-color)calc(var(--depth)*10%),#0000) inset,0 -1px oklch(100% 0 0/calc(var(--depth)*.1)) inset}}.input{--size:calc(var(--size-field,.25rem)*10);--input-color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.input{--input-color:color-mix(in oklab,var(--color-base-content)20%,#0000)}}.input:where(input){display:inline-flex}.input :where(input){-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#0000;border:none;width:100%;height:100%;display:inline-flex}.input :where(input):focus,.input :where(input):focus-within{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.input :where(input):focus,.input :where(input):focus-within{outline-offset:2px;outline:2px solid #0000}}.input :where(input[type=date]){display:inline-block}.input:focus,.input:focus-within{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab,red,red)){.input:focus,.input:focus-within{box-shadow:0 1px color-mix(in oklab,var(--input-color)calc(var(--depth)*10%),#0000)}}.input:focus,.input:focus-within{outline:2px solid var(--input-color);outline-offset:2px;isolation:isolate;z-index:1}.input:has(>input[disabled]),.input:is(:disabled,[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200);color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.input:has(>input[disabled]),.input:is(:disabled,[disabled]){color:color-mix(in oklab,var(--color-base-content)40%,transparent)}}:is(.input:has(>input[disabled]),.input:is(:disabled,[disabled]))::placeholder{color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){:is(.input:has(>input[disabled]),.input:is(:disabled,[disabled]))::placeholder{color:color-mix(in oklab,var(--color-base-content)20%,transparent)}}.input:has(>input[disabled]),.input:is(:disabled,[disabled]){box-shadow:none}.input:has(>input[disabled])>input[disabled]{cursor:not-allowed}.input::-webkit-date-and-time-value{text-align:inherit}.input[type=number]::-webkit-inner-spin-button{margin-block:-.75rem;margin-inline-end:-.75rem}.input::-webkit-calendar-picker-indicator{position:absolute;inset-inline-end:.75em}.select{border:var(--border)solid #0000;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--color-base-100);vertical-align:middle;width:clamp(3rem,20rem,100%);height:var(--size);text-overflow:ellipsis;box-shadow:0 1px var(--input-color) inset,0 -1px oklch(100% 0 0/calc(var(--depth)*.1)) inset;background-image:linear-gradient(45deg,#0000 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,#0000 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-repeat:no-repeat;background-size:4px 4px,4px 4px;border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));flex-shrink:1;align-items:center;gap:.375rem;padding-inline:1rem 1.75rem;font-size:.875rem;display:inline-flex;position:relative}@supports (color:color-mix(in lab,red,red)){.select{box-shadow:0 1px color-mix(in oklab,var(--input-color)calc(var(--depth)*10%),#0000) inset,0 -1px oklch(100% 0 0/calc(var(--depth)*.1)) inset}}.select{border-color:var(--input-color);--input-color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.select{--input-color:color-mix(in oklab,var(--color-base-content)20%,#0000)}}.select{--size:calc(var(--size-field,.25rem)*10)}[dir=rtl] .select{background-position:12px calc(1px + 50%),16px calc(1px + 50%)}.select select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:inherit;border-radius:inherit;border-style:none;width:calc(100% + 2.75rem);height:calc(100% - 2px);margin-inline:-1rem -1.75rem;padding-inline:1rem 1.75rem}.select select:focus,.select select:focus-within{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.select select:focus,.select select:focus-within{outline-offset:2px;outline:2px solid #0000}}.select select:not(:last-child){background-image:none;margin-inline-end:-1.375rem}.select:focus,.select:focus-within{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab,red,red)){.select:focus,.select:focus-within{box-shadow:0 1px color-mix(in oklab,var(--input-color)calc(var(--depth)*10%),#0000)}}.select:focus,.select:focus-within{outline:2px solid var(--input-color);outline-offset:2px;isolation:isolate;z-index:1}.select:has(>select[disabled]),.select:is(:disabled,[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200);color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){.select:has(>select[disabled]),.select:is(:disabled,[disabled]){color:color-mix(in oklab,var(--color-base-content)40%,transparent)}}:is(.select:has(>select[disabled]),.select:is(:disabled,[disabled]))::placeholder{color:var(--color-base-content)}@supports (color:color-mix(in lab,red,red)){:is(.select:has(>select[disabled]),.select:is(:disabled,[disabled]))::placeholder{color:color-mix(in oklab,var(--color-base-content)20%,transparent)}}.select:has(>select[disabled])>select[disabled]{cursor:not-allowed}.card{border-radius:var(--radius-box);outline-offset:2px;outline:0 solid #0000;flex-direction:column;transition:outline .2s ease-in-out;display:flex;position:relative}.card:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.card:focus{outline-offset:2px;outline:2px solid #0000}}.card:focus-visible{outline-color:currentColor}.card :where(figure:first-child){border-start-start-radius:inherit;border-start-end-radius:inherit;border-end-end-radius:unset;border-end-start-radius:unset;overflow:hidden}.card :where(figure:last-child){border-start-start-radius:unset;border-start-end-radius:unset;border-end-end-radius:inherit;border-end-start-radius:inherit;overflow:hidden}.card:where(.card-border){border:var(--border)solid var(--color-base-200)}.card:where(.card-dash){border:var(--border)dashed var(--color-base-200)}.card.image-full{display:grid}.card.image-full>*{grid-row-start:1;grid-column-start:1}.card.image-full>.card-body{color:var(--color-neutral-content);position:relative}.card.image-full :where(figure){border-radius:inherit;overflow:hidden}.card.image-full>figure img{object-fit:cover;filter:brightness(28%);height:100%}.card figure{justify-content:center;align-items:center;display:flex}.card:has(>input:is(input[type=checkbox],input[type=radio])){cursor:pointer;-webkit-user-select:none;user-select:none}.card:has(>:checked){outline:2px solid}.avatar{vertical-align:middle;display:inline-flex;position:relative}.avatar>div{aspect-ratio:1;display:block;overflow:hidden}.avatar img{object-fit:cover;width:100%;height:100%}.checkbox{border:var(--border)solid var(--input-color,var(--color-base-content))}@supports (color:color-mix(in lab,red,red)){.checkbox{border:var(--border)solid var(--input-color,color-mix(in oklab,var(--color-base-content)20%,#0000))}}.checkbox{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--radius-selector);vertical-align:middle;color:var(--color-base-content);box-shadow:0 1px oklch(0% 0 0/calc(var(--depth)*.1)) inset,0 0 #0000 inset,0 0 #0000;--size:calc(var(--size-selector,.25rem)*6);width:var(--size);height:var(--size);background-size:auto,calc(var(--noise)*100%);background-image:none,var(--fx-noise);flex-shrink:0;padding:.25rem;transition:background-color .2s,box-shadow .2s;position:relative}.checkbox:before{--tw-content:"";content:var(--tw-content);opacity:0;clip-path:polygon(20% 100%,20% 80%,50% 80%,50% 80%,70% 80%,70% 100%);width:100%;height:100%;box-shadow:0 3px oklch(100% 0 0/calc(var(--depth)*.1)) inset;background-color:currentColor;font-size:1rem;line-height:.75;transition:clip-path .3s .1s,opacity .1s .1s,rotate .3s .1s,translate .3s .1s;display:block;rotate:45deg}.checkbox:focus-visible{outline:2px solid var(--input-color,currentColor);outline-offset:2px}.checkbox:checked,.checkbox[aria-checked=true]{background-color:var(--input-color,#0000);box-shadow:0 0 #0000 inset,0 8px 0 -4px oklch(100% 0 0/calc(var(--depth)*.1)) inset,0 1px oklch(0% 0 0/calc(var(--depth)*.1))}:is(.checkbox:checked,.checkbox[aria-checked=true]):before{clip-path:polygon(20% 100%,20% 80%,50% 80%,50% 0%,70% 0%,70% 100%);opacity:1}@media (forced-colors:active){:is(.checkbox:checked,.checkbox[aria-checked=true]):before{--tw-content:"\u2714\uFE0E";clip-path:none;background-color:#0000;rotate:none}}@media print{:is(.checkbox:checked,.checkbox[aria-checked=true]):before{--tw-content:"\u2714\uFE0E";clip-path:none;background-color:#0000;rotate:none}}.checkbox:indeterminate:before{opacity:1;clip-path:polygon(20% 100%,20% 80%,50% 80%,50% 80%,80% 80%,80% 100%);translate:0 -35%;rotate:none}.checkbox:disabled{cursor:not-allowed;opacity:.2}.stats{border-radius:var(--radius-box);grid-auto-flow:column;display:inline-grid;position:relative;overflow-x:auto}.relative{position:relative}.modal-backdrop{color:#0000;z-index:-1;grid-row-start:1;grid-column-start:1;place-self:stretch stretch;display:grid}.modal-backdrop button{cursor:pointer}.modal-box{background-color:var(--color-base-100);border-top-left-radius:var(--modal-tl,var(--radius-box));border-top-right-radius:var(--modal-tr,var(--radius-box));border-bottom-left-radius:var(--modal-bl,var(--radius-box));border-bottom-right-radius:var(--modal-br,var(--radius-box));opacity:0;overscroll-behavior:contain;grid-row-start:1;grid-column-start:1;width:91.6667%;max-width:32rem;max-height:100vh;padding:1.5rem;transition:translate .3s ease-out,scale .3s ease-out,opacity .2s ease-out 50ms,box-shadow .3s ease-out;overflow-y:auto;scale:95%;box-shadow:0 25px 50px -12px #00000040}.stat-value{white-space:nowrap;grid-column-start:1;font-size:2rem;font-weight:800}.stat-title{white-space:nowrap;color:var(--color-base-content);grid-column-start:1}@supports (color:color-mix(in lab,red,red)){.stat-title{color:color-mix(in oklab,var(--color-base-content)60%,transparent)}}.stat-title{font-size:.75rem}.m-0\\!{margin:calc(var(--spacing)*0)!important}.my-2{margin-block:calc(var(--spacing)*2)}.label{white-space:nowrap;color:currentColor;align-items:center;gap:.375rem;display:inline-flex}@supports (color:color-mix(in lab,red,red)){.label{color:color-mix(in oklab,currentColor 60%,transparent)}}.label:has(input){cursor:pointer}.label:is(.input>*,.select>*){white-space:nowrap;height:calc(100% - .5rem);font-size:inherit;align-items:center;padding-inline:.75rem;display:flex}.label:is(.input>*,.select>*):first-child{border-inline-end:var(--border)solid currentColor;margin-inline:-.75rem .75rem}@supports (color:color-mix(in lab,red,red)){.label:is(.input>*,.select>*):first-child{border-inline-end:var(--border)solid color-mix(in oklab,currentColor 10%,#0000)}}.label:is(.input>*,.select>*):last-child{border-inline-start:var(--border)solid currentColor;margin-inline:.75rem -.75rem}@supports (color:color-mix(in lab,red,red)){.label:is(.input>*,.select>*):last-child{border-inline-start:var(--border)solid color-mix(in oklab,currentColor 10%,#0000)}}.mt-4{margin-top:calc(var(--spacing)*4)}.mr-1{margin-right:calc(var(--spacing)*1)}.mr-2{margin-right:calc(var(--spacing)*2)}.mr-auto{margin-right:auto}.mb-2{margin-bottom:calc(var(--spacing)*2)}.ml-2{margin-left:calc(var(--spacing)*2)}.ml-4{margin-left:calc(var(--spacing)*4)}.ml-auto{margin-left:auto}.status{aspect-ratio:1;border-radius:var(--radius-selector);background-color:var(--color-base-content);width:.5rem;height:.5rem;display:inline-block}@supports (color:color-mix(in lab,red,red)){.status{background-color:color-mix(in oklab,var(--color-base-content)20%,transparent)}}.status{vertical-align:middle;color:#0000004d;background-position:50%;background-repeat:no-repeat}@supports (color:color-mix(in lab,red,red)){.status{color:#0000004d}@supports (color:color-mix(in lab,red,red)){.status{color:color-mix(in oklab,var(--color-black)30%,transparent)}}}.status{background-image:radial-gradient(circle at 35% 30%,oklch(1 0 0/calc(var(--depth)*.5)),#0000);box-shadow:0 2px 3px -1px}@supports (color:color-mix(in lab,red,red)){.status{box-shadow:0 2px 3px -1px color-mix(in oklab,currentColor calc(var(--depth)*100%),#0000)}}.badge{border-radius:var(--radius-selector);vertical-align:middle;color:var(--badge-fg);border:var(--border)solid var(--badge-color,var(--color-base-200));width:fit-content;padding-inline:calc(.25rem*3 - var(--border));background-size:auto,calc(var(--noise)*100%);background-image:none,var(--fx-noise);background-color:var(--badge-bg);--badge-bg:var(--badge-color,var(--color-base-100));--badge-fg:var(--color-base-content);--size:calc(var(--size-selector,.25rem)*6);height:var(--size);justify-content:center;align-items:center;gap:.5rem;font-size:.875rem;display:inline-flex}.badge.badge-outline{--badge-fg:var(--badge-color);--badge-bg:#0000;background-image:none;border-color:currentColor}.badge.badge-dash{--badge-fg:var(--badge-color);--badge-bg:#0000;background-image:none;border-style:dashed;border-color:currentColor}.badge.badge-soft{color:var(--badge-color,var(--color-base-content));background-color:var(--badge-color,var(--color-base-content))}@supports (color:color-mix(in lab,red,red)){.badge.badge-soft{background-color:color-mix(in oklab,var(--badge-color,var(--color-base-content))8%,var(--color-base-100))}}.badge.badge-soft{border-color:var(--badge-color,var(--color-base-content))}@supports (color:color-mix(in lab,red,red)){.badge.badge-soft{border-color:color-mix(in oklab,var(--badge-color,var(--color-base-content))10%,var(--color-base-100))}}.badge.badge-soft{background-image:none}.stat{grid-template-columns:repeat(1,1fr);column-gap:1rem;width:100%;padding-block:1rem;padding-inline:1.5rem;display:inline-grid}.stat:not(:last-child){border-inline-end:var(--border)dashed currentColor}@supports (color:color-mix(in lab,red,red)){.stat:not(:last-child){border-inline-end:var(--border)dashed color-mix(in oklab,currentColor 10%,#0000)}}.stat:not(:last-child){border-block-end:none}.block{display:block}.flex{display:flex}.inline-block{display:inline-block}.btn-circle{width:var(--size);height:var(--size);border-radius:3.40282e38px;padding-inline:0}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-8{height:calc(var(--spacing)*8)}.h-10{height:calc(var(--spacing)*10)}.h-12{height:calc(var(--spacing)*12)}.h-\\[1em\\]{height:1em}.h-full{height:100%}.max-h-56{max-height:calc(var(--spacing)*56)}.max-h-\\[80vh\\]{max-height:80vh}.loading-sm{width:calc(var(--size-selector,.25rem)*5)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-8{width:calc(var(--spacing)*8)}.w-10{width:calc(var(--spacing)*10)}.w-12{width:calc(var(--spacing)*12)}.w-96{width:calc(var(--spacing)*96)}.w-fit{width:fit-content}.w-full{width:100%}.skeleton{border-radius:var(--radius-box);background-color:var(--color-base-300)}@media (prefers-reduced-motion:reduce){.skeleton{transition-duration:15s}}.skeleton{will-change:background-position;background-image:linear-gradient(105deg,#0000 0% 40%,var(--color-base-100)50%,#0000 60% 100%);background-position-x:-50%;background-repeat:no-repeat;background-size:200%;animation:1.8s ease-in-out infinite skeleton}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.place-items-center{place-items:center}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:calc(var(--spacing)*1)}.gap-2{gap:calc(var(--spacing)*2)}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*2)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-y-reverse)))}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-xl{border-radius:var(--radius-xl)}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-base-300{border-color:var(--color-base-300)}.border-gray-200{border-color:var(--color-gray-200)}.bg-base-100{background-color:var(--color-base-100)}.bg-base-200{background-color:var(--color-base-200)}.loading-spinner{-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")}.p-2{padding:calc(var(--spacing)*2)}.p-3{padding:calc(var(--spacing)*3)}.p-4{padding:calc(var(--spacing)*4)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-4{padding-inline:calc(var(--spacing)*4)}.py-2{padding-block:calc(var(--spacing)*2)}.pb-2{padding-bottom:calc(var(--spacing)*2)}.pb-4{padding-bottom:calc(var(--spacing)*4)}.text-center{text-align:center}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[0\\.7rem\\]{font-size:.7rem}.text-\\[0\\.8rem\\]{font-size:.8rem}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-base-content{color:var(--color-base-content)}.text-base-content\\!{color:var(--color-base-content)!important}.text-gray-500{color:var(--color-gray-500)}.text-gray-500\\!{color:var(--color-gray-500)!important}.text-primary\\!{color:var(--color-primary)!important}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.btn-ghost:not(.btn-active,:hover,:active:focus,:focus-visible){--btn-shadow:"";--btn-bg:#0000;--btn-border:#0000;--btn-noise:none}.btn-ghost:not(.btn-active,:hover,:active:focus,:focus-visible):not(:disabled,[disabled],.btn-disabled){--btn-fg:currentColor;outline-color:currentColor}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,visibility,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.btn-outline:not(.btn-active,:hover,:active:focus,:focus-visible,:disabled,[disabled],.btn-disabled,:checked){--btn-shadow:"";--btn-bg:#0000;--btn-fg:var(--btn-color);--btn-border:var(--btn-color);--btn-noise:none}@media (hover:none){.btn-outline:hover:not(.btn-active,:active,:focus-visible,:disabled,[disabled],.btn-disabled,:checked){--btn-shadow:"";--btn-bg:#0000;--btn-fg:var(--btn-color);--btn-border:var(--btn-color);--btn-noise:none}}.btn-sm{--fontsize:.75rem;--btn-p:.75rem;--size:calc(var(--size-field,.25rem)*8)}.badge-primary{--badge-color:var(--color-primary);--badge-fg:var(--color-primary-content)}.btn-primary{--btn-color:var(--color-primary);--btn-fg:var(--color-primary-content)}.toggle-primary:checked,.toggle-primary[aria-checked=true]{--input-color:var(--color-primary)}@media (hover:hover){.hover\\:bg-base-300:hover{background-color:var(--color-base-300)}}.\\[\\&\\>path\\]\\:stroke-0>path{stroke-width:0}}img{display:initial}@keyframes dropdown{0%{opacity:0}}@keyframes progress{50%{background-position-x:-115%}}@keyframes toast{0%{opacity:0;scale:.9}to{opacity:1;scale:1}}@keyframes rating{0%,40%{filter:brightness(1.05)contrast(1.05);scale:1.1}}@keyframes radio{0%{padding:5px}50%{padding:3px}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000} `);

(function (vue, axios, fileSaver, Dexie) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var _a;
  const WEIBO_BASE_URL = "https://weibo.com/ajax";
  const FETCH_PATH = {
    PROFILE: "/profile/info",
    PROFILE_DETAIL: "/profile/detail",
    FOLLOWINGS: "/friendships/friends",
    SEARCH: "/side/search",
    POSTS_ALL: "/statuses/mymblog",
    POSTS_RANGE: "/statuses/searchProfile",
    POST_LONGTEXT: "/statuses/longtext",
    POST_COMMENTS: "/statuses/buildComments",
    FAVORITES: "/favorites/all_fav"
  };
  const DEFAULT_FETCH_CONFIG = {
    restore: false,
    curPage: 1,
    isFetchAll: true,
    repostPic: true,
    hasRepost: true,
    hasComment: true,
    commentCount: 5,
    hasFollowings: true,
    hasFavorites: true,
    hasWeibo: true,
    sinceId: "",
    startAt: Date.now(),
    endAt: Date.now()
  };
  const DEFAULT_USER_CONFIG = {
    ...DEFAULT_FETCH_CONFIG,
    isMinimize: true,
    total: 0,
    fetchedCount: 0,
    theme: "winter"
  };
  const DEFAULT_PAGE_SIZE = 10;
  class WeiboError extends Error {
    constructor(message, code) {
      super(message);
      this.name = "WeiboError";
      this.cause = code;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  function createFetcher(args) {
    const _fetcher = axios.create({
      ...args,
      baseURL: WEIBO_BASE_URL
    });
    return async function fetcher(path, params) {
      return _fetcher(path, { params }).then(({ data: rawData, request }) => {
        var _a2;
        const url = ((_a2 = request.res) == null ? void 0 : _a2.responseUrl) || path;
        try {
          if (typeof rawData !== "object") {
            throw new SyntaxError("Not a JSON");
          }
          const { ok, data, ...restData } = rawData || {};
          if (ok !== 1) {
            throw new WeiboError(`成功码不为 1: ${ok}`);
          }
          if (!data && restData) {
            return {
              data: restData
            };
          }
          return rawData;
        } catch (err) {
          if (err.name === `SyntaxError`) {
            throw new WeiboError(`未获取到 JSON，Cookie 可能已过期 [${url}]`);
          }
          throw new WeiboError(`获取失败：${err.message} [${url}]`);
        }
      });
    };
  }
  class FetchService {
    constructor(cookies) {
      __publicField(this, "fetcher");
      __publicField(this, "onRawFetch", () => {
      });
      this.fetcher = this.setFetcher(cookies || "");
    }
    async userInfo(uid) {
      const { data } = await this.fetcher(
        FETCH_PATH.PROFILE,
        {
          uid
        }
      );
      await this.onRawFetch({ data, type: FETCH_PATH.PROFILE });
      return data;
    }
    async userDetail(uid) {
      const { data } = await this.fetcher(
        FETCH_PATH.PROFILE_DETAIL,
        {
          uid
        }
      );
      await this.onRawFetch({ data, type: FETCH_PATH.PROFILE_DETAIL });
      return data;
    }
    /**
     * 有可能报错提示：博主设置仅针对粉丝展示全部关注
     */
    async userFollowings(args) {
      const { data } = await this.fetcher(
        FETCH_PATH.FOLLOWINGS,
        args
      );
      await this.onRawFetch({ data, type: FETCH_PATH.FOLLOWINGS });
      return data;
    }
    async myFollowings(args) {
      const { data } = await this.fetcher(
        FETCH_PATH.FOLLOWINGS,
        args
      );
      await this.onRawFetch({ data, type: FETCH_PATH.FOLLOWINGS });
      return data;
    }
    async searchUser(keyword) {
      const { data } = await this.fetcher(
        FETCH_PATH.SEARCH,
        {
          q: keyword
        }
      );
      await this.onRawFetch({ data, type: FETCH_PATH.SEARCH });
      return data;
    }
    async longText(postMBlogId) {
      const { data } = await this.fetcher(
        FETCH_PATH.POST_LONGTEXT,
        {
          id: postMBlogId
        }
      );
      await this.onRawFetch({ data, type: FETCH_PATH.POST_LONGTEXT });
      return data;
    }
    async postsByDate(args) {
      const { data } = await this.fetcher(
        FETCH_PATH.POSTS_RANGE,
        args
      );
      await this.onRawFetch({ data, type: FETCH_PATH.POSTS_RANGE });
      return data;
    }
    async postsBySinceId(args) {
      const { data } = await this.fetcher(
        FETCH_PATH.POSTS_ALL,
        args
      );
      await this.onRawFetch({ data, type: FETCH_PATH.POSTS_ALL });
      return data;
    }
    /**
     * 关于 is_show_bulletin 和热评问题见#17
     * @see https://github.com/Chilfish/Weibo-archiver/issues/17
     */
    async comments(args) {
      const { data } = await this.fetcher(
        FETCH_PATH.POST_COMMENTS,
        args
      );
      await this.onRawFetch({ data, type: FETCH_PATH.POST_COMMENTS });
      return data;
    }
    async favorites(args) {
      const { data } = await this.fetcher(
        FETCH_PATH.FAVORITES,
        args
      );
      await this.onRawFetch({ data, type: FETCH_PATH.FAVORITES });
      return data.status;
    }
    setFetcher(cookies) {
      this.fetcher = createFetcher({
        headers: {
          Cookie: cookies || void 0
        }
      });
      return this.fetcher;
    }
  }
  class UserParser {
    static parseFromPost(rawPost) {
      const user = rawPost.user;
      if (!user || !(user == null ? void 0 : user.idstr)) {
        return void 0;
      }
      return {
        uid: user.idstr,
        name: user.screen_name,
        avatar: user.profile_image_url
      };
    }
    static parse(user) {
      return {
        uid: user.id.toString(),
        name: user.screen_name,
        avatar: user.avatar_large,
        followers: user.followers_count,
        followings: user.friends_count,
        bio: user.description,
        createdAt: "",
        birthday: ""
      };
    }
    static parseFollowing(user) {
      return {
        uid: user.idstr,
        name: user.screen_name,
        avatar: user.profile_image_url,
        bio: user.description,
        remark: user.remark || void 0,
        followings: user.friends_count,
        followers: user.followers_count,
        followBy: "",
        createdAt: user.created_at,
        location: user.location
      };
    }
  }
  class PostParser {
    static parse(rawPost) {
      var _a2;
      const mblogid = rawPost.mblogid;
      if (!mblogid) {
        console.warn("Skipping post due to missing mblogid:", rawPost);
        return void 0;
      }
      let retweeted_status;
      const hasRetweeted = "retweeted_status" in rawPost && ((_a2 = rawPost.retweeted_status) == null ? void 0 : _a2.id);
      if (hasRetweeted) {
        retweeted_status = PostParser.parseRetweet(rawPost.retweeted_status, rawPost.url_struct || []);
      }
      const meta = PostParser.parseMeta(rawPost);
      const text = PostParser.parseText(rawPost.text_raw, rawPost.url_struct || []);
      const imgs = PostParser.parseImage(rawPost);
      const card = PostParser.parseLinkCard(rawPost);
      const user = UserParser.parseFromPost(rawPost);
      const {
        reposts_count,
        comments_count,
        attitudes_count,
        is_show_bulletin
      } = rawPost;
      return {
        ...meta,
        userId: user.uid,
        mblogid,
        text,
        imgs,
        isShowBulletIn: (is_show_bulletin == null ? void 0 : is_show_bulletin.toString()) || "2",
        repostsCount: reposts_count,
        commentsCount: comments_count,
        likesCount: attitudes_count,
        card,
        retweet: retweeted_status,
        comments: []
      };
    }
    static parseRetweet(rawPost, urlStruct) {
      const mblogid = rawPost == null ? void 0 : rawPost.mblogid;
      if (!mblogid) {
        return void 0;
      }
      const meta = PostParser.parseMeta(rawPost);
      const text = PostParser.parseText(rawPost.text_raw, urlStruct);
      const imgs = PostParser.parseImage(rawPost);
      const user = UserParser.parseFromPost(rawPost);
      const { reposts_count, comments_count, attitudes_count: like_count } = rawPost;
      return {
        ...meta,
        mblogid,
        text,
        imgs,
        repostsCount: reposts_count,
        commentsCount: comments_count,
        likesCount: like_count,
        user
      };
    }
    static parseMeta(rawPost) {
      const {
        id,
        region_name,
        created_at,
        source
      } = rawPost;
      const sourceText = parseXmlText(source);
      return {
        id: id.toString(),
        regionName: region_name,
        createdAt: created_at,
        source: sourceText || source
      };
    }
    static parseText(rawText, urlStruct) {
      if (!Array.isArray(urlStruct) || urlStruct.length < 1) {
        return rawText;
      }
      const r = /http:\/\/t\.cn\/\S+/g;
      const replacedText = rawText.replace(r, (match) => {
        var _a2;
        const longUrl = urlStruct.find((url) => url.short_url === match);
        if (longUrl == null ? void 0 : longUrl.pic_infos) {
          const imgsUrl = ((_a2 = Object.values(longUrl.pic_infos)[0]) == null ? void 0 : _a2.woriginal.url) || match;
          return `[img://${imgsUrl}]`;
        }
        return (longUrl == null ? void 0 : longUrl.long_url) || match;
      });
      if (replacedText.startsWith("sinaweibo://")) {
        const url = safeUrl(replacedText);
        return (url == null ? void 0 : url.searchParams.get("url")) || replacedText;
      }
      return replacedText;
    }
    static parseImage(rawPost) {
      var _a2, _b;
      const imageUrls = [];
      const mixMediaInfo = ((_a2 = rawPost.mix_media_info) == null ? void 0 : _a2.items) || [];
      const picInfos = rawPost.pic_infos || {};
      for (const item of mixMediaInfo) {
        if (item.type === "pic") {
          const largeUrl = (_b = item.data.largest) == null ? void 0 : _b.url;
          if (largeUrl) {
            imageUrls.push(largeUrl);
          }
        }
      }
      for (const img of Object.values(picInfos)) {
        const url = img == null ? void 0 : img.largest.url;
        if (url) {
          imageUrls.push(url);
        }
      }
      return imageUrls;
    }
    static parseLinkCard(rawPost) {
      var _a2, _b;
      const rawPageInfo = rawPost.page_info;
      if (!rawPageInfo) {
        return void 0;
      }
      const link = rawPageInfo.page_url;
      const imgUrl = rawPageInfo.page_pic;
      const desc = rawPageInfo.page_desc || rawPageInfo.content1 || rawPageInfo.content2;
      let title = rawPageInfo.page_title;
      let realLink = ((_a2 = safeUrl(link)) == null ? void 0 : _a2.searchParams.get("url")) ?? link;
      if ((_b = rawPageInfo.media_info) == null ? void 0 : _b.h5_url) {
        realLink = rawPageInfo.media_info.h5_url;
      }
      if (rawPageInfo.object_type === "article") {
        title += " 的微博文章";
      }
      return {
        link: realLink,
        title,
        img: imgUrl,
        desc
      };
    }
    static parseComments(rawComment) {
      const urlStruct = rawComment.url_struct || [];
      const user = UserParser.parseFromPost(rawComment);
      const text = PostParser.parseText(rawComment.text_raw, urlStruct);
      const img = urlStruct.map((item) => {
        var _a2;
        const url = (_a2 = Object.values(item.pic_infos || {})[0]) == null ? void 0 : _a2.woriginal.url;
        return url ?? "";
      }).filter(Boolean).at(0) || "";
      const {
        id,
        total_number: comments_count,
        created_at,
        source: region_name,
        like_counts: like_count,
        floor_number
      } = rawComment;
      return {
        id: id.toString(),
        text,
        img,
        createdAt: created_at,
        regionName: region_name,
        floor: floor_number,
        commentsCount: comments_count,
        likesCount: like_count,
        user
      };
    }
  }
  class WeiboParser {
    /**
     * 将原始微博API响应解析为Post对象数组
     * @param rawData 微博API的原始JSON对象数组
     * @returns Post对象数组
     */
    static parseAll(rawData) {
      const posts = [];
      for (const rawItem of rawData) {
        try {
          const post = PostParser.parse(rawItem);
          if (post) {
            posts.push(post);
          }
        } catch (error) {
          console.error(`[parseAll], ${error}`, rawItem.mblogid);
          throw error;
        }
      }
      return posts;
    }
    /**
     * 提取所有图片链接
     */
    static parseImgs(posts) {
      const imgs = posts.map((post) => {
        var _a2, _b;
        const imageLinks = [];
        const regex = /\[img:\/\/(.*?)\]/g;
        let match;
        while ((match = regex.exec(post.text)) !== null) {
          imageLinks.push(match[1]);
        }
        return [
          post.imgs,
          (_a2 = post.retweet) == null ? void 0 : _a2.imgs,
          post.comments.map((e) => e.img),
          (_b = post.card) == null ? void 0 : _b.img,
          imageLinks
        ].filter((e) => !!e);
      }).flat().flat().sort();
      return Array.from(new Set(imgs));
    }
    static migrateFromOld(oldPost, curUid) {
      return oldPost.map((post) => {
        var _a2;
        if (post.createdAt) {
          post.curUid = curUid;
          post.id = post.id.toString();
          if (post.retweet) {
            post.retweet.id = post.retweet.id.toString();
          }
          return post;
        }
        const retweet = post.retweeted_status;
        return {
          id: post.id.toString(),
          userId: curUid,
          text: post.text,
          createdAt: post.created_at,
          imgs: post.imgs,
          mblogid: post.mblogid,
          likesCount: post.like_count,
          repostsCount: post.reposts_count,
          commentsCount: post.comments_count,
          comments: post.comments.map((item) => {
            var _a3;
            return {
              id: (_a3 = item.id) == null ? void 0 : _a3.toString(),
              text: item.text,
              createdAt: item.created_at,
              likesCount: item.like_count || 0,
              commentsCount: item.comments_count || 0,
              img: item.img,
              user: item.user,
              floor: 0,
              regionName: item.region_name
            };
          }),
          source: parseXmlText(post.source),
          regionName: post.region_name,
          isShowBulletIn: "2",
          retweet: retweet ? {
            createdAt: retweet.created_at,
            text: retweet.text,
            id: (_a2 = retweet.id) == null ? void 0 : _a2.toString(),
            mblogid: retweet.mblogid,
            likesCount: retweet.like_count,
            repostsCount: retweet.reposts_count,
            commentsCount: retweet.reposts_count,
            imgs: retweet.imgs,
            user: retweet.user,
            source: parseXmlText(retweet.source),
            regionName: retweet.region_name
          } : void 0,
          card: post.card
        };
      });
    }
  }
  function parseXmlText(xmlString) {
    const decodedContent = xmlString.replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec)).replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)));
    return decodedContent.replace(/\s+/g, " ").trim();
  }
  function safeUrl(url) {
    try {
      return new URL(url);
    } catch (error) {
      console.error({ error, url });
      return null;
    }
  }
  class Queue {
    constructor() {
      __publicField(this, "_queue");
      __publicField(this, "_head");
      this._queue = [];
      this._head = 0;
    }
    enqueue(item) {
      this._queue.push(item);
    }
    dequeue() {
      if (this._head >= this._queue.length)
        return void 0;
      const item = this._queue[this._head];
      this._head++;
      if (this._head > 100 && this._head > this._queue.length / 2) {
        this._queue = this._queue.slice(this._head);
        this._head = 0;
      }
      return item;
    }
    get length() {
      return this._queue.length - this._head;
    }
  }
  const defaultOptions = {
    concurrency: Infinity
  };
  class PQueue {
    constructor(options = {}) {
      __publicField(this, "_queue");
      __publicField(this, "_pending", 0);
      __publicField(this, "_options");
      __publicField(this, "_idleResolvers", []);
      this._queue = new Queue();
      this._options = { ...defaultOptions, ...options };
    }
    add(fn) {
      return new Promise((resolve, reject) => {
        const run = async () => {
          this._pending++;
          try {
            resolve(await fn());
          } catch (e) {
            reject(e);
          } finally {
            this._pending--;
            this._next();
            this._checkIdle();
          }
        };
        this._queue.enqueue(run);
        this._next();
      });
    }
    addAll(fns) {
      return Promise.all(fns.map((fn) => this.add(fn)));
    }
    _next() {
      while (this._pending < this._options.concurrency) {
        const task = this._queue.dequeue();
        if (!task)
          break;
        task();
      }
    }
    async onIdle() {
      if (this._isEmpty)
        return Promise.resolve();
      return new Promise((resolve) => {
        this._idleResolvers.push(resolve);
      });
    }
    clear() {
      this._queue = new Queue();
    }
    get length() {
      return this._queue.length;
    }
    get pending() {
      return this._pending;
    }
    _checkIdle() {
      if (!this._isEmpty)
        return;
      for (const resolve of this._idleResolvers)
        resolve();
      this._idleResolvers = [];
    }
    get _isEmpty() {
      return this.length === 0 && this.pending === 0;
    }
  }
  class PostService {
    constructor(userService2, fetchService2) {
      __publicField(this, "sinceId", "");
      __publicField(this, "fetchedCount", 0);
      __publicField(this, "postsTotal", 0);
      __publicField(this, "pqueue", new PQueue({ concurrency: 3 }));
      __publicField(this, "onError", (data) => data);
      this.userService = userService2;
      this.fetchService = fetchService2;
    }
    get uid() {
      return this.userService.uid;
    }
    get total() {
      return this.fetchedCount;
    }
    async getAllPosts(args) {
      const {
        isFetchAll = true,
        endAt = "2000-01-01",
        sinceId = this.sinceId,
        page = 0,
        startAt,
        commentsCount,
        onFetched,
        ...restArgs
      } = args;
      console.log(args);
      if (isFetchAll) {
        return this.getAllPostsBySinceId({
          since_id: sinceId,
          page,
          commentsCount,
          onFetched,
          ...restArgs
        });
      }
      if (!startAt) {
        throw new Error("startAt is required when isFetchAll is false");
      }
      return this.getAllPostsByDate({
        startAt,
        endAt,
        page,
        commentsCount,
        onFetched,
        ...restArgs
      });
    }
    async getAllPostsBySinceId(args) {
      let page = (args == null ? void 0 : args.page) || 1;
      while (true) {
        const posts = await this.getPostsBySinceId({
          ...args,
          page
        });
        await args.onFetched({
          posts,
          page: args.page,
          sinceId: this.sinceId,
          fetchedCount: this.fetchedCount,
          postsTotal: this.postsTotal
        });
        await new Promise((r) => setTimeout(r, 1e3));
        page++;
        if (this.fetchedCount >= this.postsTotal || posts.length === 0) {
          break;
        }
      }
    }
    async getAllPostsByDate(args) {
      var _a2, _b;
      const startAt = new Date(args.startAt);
      const endAt = new Date(args.endAt);
      startAt.setHours(0, 0, 0, 0);
      endAt.setHours(23, 59, 0, 0);
      const starttime = startAt.getTime() / 1e3;
      let endtime = endAt.getTime() / 1e3;
      let page = args.page || 1;
      let lastPostDate = /* @__PURE__ */ new Date();
      while (true) {
        const posts = await this.getPostsByDate({
          ...args,
          starttime,
          endtime,
          page,
          uid: this.uid
        });
        await ((_a2 = args.onFetched) == null ? void 0 : _a2.call(args, {
          page,
          posts,
          fetchedCount: this.fetchedCount,
          postsTotal: this.postsTotal
        }));
        await new Promise((r) => setTimeout(r, 1e3));
        page++;
        if ((_b = posts.at(-1)) == null ? void 0 : _b.createdAt)
          lastPostDate = new Date(posts.at(-1).createdAt);
        if (posts.length === 0) {
          if (this.fetchedCount >= this.postsTotal)
            break;
          page = 1;
          lastPostDate.setHours(23, 59, 0, 0);
          endtime = lastPostDate.getTime() / 1e3;
        }
      }
    }
    async getLongText(postMBlogId) {
      try {
        const data = await this.fetchService.longText(postMBlogId);
        if (!data.longTextContent) {
          return void 0;
        }
        return PostParser.parseText(data.longTextContent, data.url_struct);
      } catch (e) {
        console.error(`[get long text]: ${postMBlogId}, ${e}`);
        return void 0;
      }
    }
    async getPostsByDate(args) {
      const data = await this.fetchService.postsByDate({
        uid: this.uid,
        hasmuisc: args.hasmuisc || "1",
        haspic: args.haspic || "1",
        hastext: args.hastext || "1",
        hasvideo: args.hasvideo || "1",
        hasori: args.hasori || "1",
        hasret: args.hasret || "1",
        starttime: args.starttime,
        endtime: args.endtime,
        page: args.page || 1
      });
      await this._setLongText(data.list);
      if (data.total && !this.postsTotal) {
        this.postsTotal = data.total;
      }
      const posts = WeiboParser.parseAll(data.list);
      this.fetchedCount += posts.length;
      if (args.commentsCount) {
        await this._setComments(posts, args.commentsCount);
      }
      return posts;
    }
    async getComments(postId, isShowBulletIn = "2", count = 20) {
      const data = await this.fetchService.comments({
        uid: this.uid,
        id: postId,
        count,
        is_show_bulletin: isShowBulletIn,
        flow: "0",
        fetch_level: 0,
        is_mix: "0",
        is_reload: "1",
        locale: "zh_CN"
      });
      return data.map(PostParser.parseComments).slice(0, count);
    }
    async getFavorites() {
      let page = 1;
      const result = [];
      while (true) {
        const data = await this.fetchService.favorites({
          uid: this.uid,
          page,
          with_total: true
        });
        if (data.length < 1) {
          break;
        }
        await this._setLongText(data);
        const parsed = WeiboParser.parseAll(data);
        result.push(...parsed);
        page += 1;
      }
      return result;
    }
    async getPostsBySinceId(args) {
      const data = await this.fetchService.postsBySinceId({
        uid: this.uid,
        since_id: this.sinceId,
        page: args.page || 1,
        feature: 0,
        hasmuisc: args.hasmuisc || "1",
        haspic: args.haspic || "1",
        hastext: args.hastext || "1",
        hasvideo: args.hasvideo || "1",
        hasori: args.hasori || "1",
        hasret: args.hasret || "1"
      });
      await this._setLongText(data.list);
      if (data.since_id) {
        this.sinceId = data.since_id;
      }
      if (data.total) {
        this.postsTotal = data.total;
      }
      try {
        const posts = WeiboParser.parseAll(data.list);
        this.fetchedCount += posts.length;
        if (args.commentsCount) {
          await this._setComments(posts, args.commentsCount);
        }
        return posts;
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    async _setLongText(rawData) {
      var _a2;
      for (const post of rawData) {
        if (post.isLongText) {
          const longText = await this.getLongText(post.mblogid);
          if (longText)
            post.text_raw = longText;
        } else if ((_a2 = post.retweeted_status) == null ? void 0 : _a2.isLongText) {
          const longText = await this.getLongText(post.retweeted_status.mblogid);
          if (longText)
            post.retweeted_status.text_raw = longText;
        }
      }
    }
    async _setComments(posts, commentsCount) {
      posts.forEach((post) => {
        if (post.commentsCount < 1)
          return;
        this.pqueue.add(
          () => this.getComments(post.id, post.isShowBulletIn, commentsCount).catch(() => []).then((comments) => post.comments = comments)
        );
      });
      await this.pqueue.onIdle();
    }
  }
  class UserService {
    constructor(fetchService2, uid) {
      __publicField(this, "_uid", "");
      this.fetchService = fetchService2;
      if (uid) {
        this.uid = uid;
      }
    }
    set uid(uid) {
      if (Number.isNaN(Number(uid))) {
        throw new WeiboError("用户 uid 应为纯数字");
      }
      this._uid = uid;
    }
    get uid() {
      if (!this._uid) {
        throw new WeiboError("未设置用户的数字 uid");
      }
      return this._uid;
    }
    async getDetail(uid) {
      const [
        baseInfo,
        detailInfo
      ] = await Promise.all([
        this.fetchService.userInfo(uid || this.uid),
        this.fetchService.userDetail(uid || this.uid)
      ]);
      const userInfo = UserParser.parse(baseInfo.user);
      return {
        ...userInfo,
        createdAt: detailInfo.created_at,
        birthday: detailInfo.birthday
      };
    }
    async searchUser(keyword) {
      const data = await this.fetchService.searchUser(keyword);
      return data.users.map(UserParser.parse);
    }
    async getFollowings(uid) {
      let page = 0;
      const users = [];
      while (true) {
        const data = await this.fetchService.userFollowings({
          page,
          uid
        }).catch((err) => {
          console.error(err);
          return {
            users: [],
            next_cursor: void 0
          };
        });
        const _users = data.users.map((user) => ({
          ...UserParser.parseFollowing(user),
          followBy: uid
        }));
        users.push(..._users);
        page += 1;
        if (_users.length === 0 || !data.next_cursor) {
          break;
        }
      }
      return users;
    }
    async getMyFollowings(page) {
      const data = await this.fetchService.myFollowings({ page });
      const users = data.follows.users;
      return users.map(UserParser.parseFollowing);
    }
  }
  async function exportData(data) {
    var _a2;
    console.log("Exporting posts count:", data.weibo.length);
    if (!((_a2 = data.user) == null ? void 0 : _a2.name)) {
      console.warn("User info is not available");
      return false;
    }
    const { name: username } = data.user;
    const dataStr = JSON.stringify(data);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    fileSaver.saveAs(dataBlob, `weibo-data-${username}.json`);
    const imgsData = [data.weibo, data.favorites].flatMap(WeiboParser.parseImgs).join(",\n");
    if (imgsData.length) {
      const imgsDataBlob = new Blob([imgsData], { type: "text/csv" });
      fileSaver.saveAs(imgsDataBlob, `imgs-${username}.csv`);
    }
    return true;
  }
  function formatDate(time, fmt = "YYYY-MM-DD HH:mm:ss") {
    if (typeof time === "number" && time < 1e12)
      time *= 1e3;
    const date = new Date(time);
    if (Number.isNaN(date.getTime()))
      return "";
    const pad = (num) => num.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return fmt.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
  }
  function formatNumber(num, precision = 2) {
    const wan = 1e4;
    const yi = 1e8;
    if (num < wan)
      return `${num}`;
    else if (num < yi)
      return `${(num / wan).toFixed(precision)}万`;
    else
      return `${(num / yi).toFixed(precision)}亿`;
  }
  function $2b4dce13dd5a17fa$export$842a2cf37af977e1(amount, numerator) {
    return amount - numerator * Math.floor(amount / numerator);
  }
  const $3b62074eb05584b2$var$EPOCH = 1721426;
  function $3b62074eb05584b2$export$f297eb839006d339(era, year, month, day) {
    year = $3b62074eb05584b2$export$c36e0ecb2d4fa69d(era, year);
    let y1 = year - 1;
    let monthOffset = -2;
    if (month <= 2) monthOffset = 0;
    else if ($3b62074eb05584b2$export$553d7fa8e3805fc0(year)) monthOffset = -1;
    return $3b62074eb05584b2$var$EPOCH - 1 + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) + Math.floor((367 * month - 362) / 12 + monthOffset + day);
  }
  function $3b62074eb05584b2$export$553d7fa8e3805fc0(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  function $3b62074eb05584b2$export$c36e0ecb2d4fa69d(era, year) {
    return era === "BC" ? 1 - year : year;
  }
  function $3b62074eb05584b2$export$4475b7e617eb123c(year) {
    let era = "AD";
    if (year <= 0) {
      era = "BC";
      year = 1 - year;
    }
    return [
      era,
      year
    ];
  }
  const $3b62074eb05584b2$var$daysInMonth = {
    standard: [
      31,
      28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ],
    leapyear: [
      31,
      29,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ]
  };
  class $3b62074eb05584b2$export$80ee6245ec4f29ec {
    fromJulianDay(jd) {
      let jd0 = jd;
      let depoch = jd0 - $3b62074eb05584b2$var$EPOCH;
      let quadricent = Math.floor(depoch / 146097);
      let dqc = $2b4dce13dd5a17fa$export$842a2cf37af977e1(depoch, 146097);
      let cent = Math.floor(dqc / 36524);
      let dcent = $2b4dce13dd5a17fa$export$842a2cf37af977e1(dqc, 36524);
      let quad = Math.floor(dcent / 1461);
      let dquad = $2b4dce13dd5a17fa$export$842a2cf37af977e1(dcent, 1461);
      let yindex = Math.floor(dquad / 365);
      let extendedYear = quadricent * 400 + cent * 100 + quad * 4 + yindex + (cent !== 4 && yindex !== 4 ? 1 : 0);
      let [era, year] = $3b62074eb05584b2$export$4475b7e617eb123c(extendedYear);
      let yearDay = jd0 - $3b62074eb05584b2$export$f297eb839006d339(era, year, 1, 1);
      let leapAdj = 2;
      if (jd0 < $3b62074eb05584b2$export$f297eb839006d339(era, year, 3, 1)) leapAdj = 0;
      else if ($3b62074eb05584b2$export$553d7fa8e3805fc0(year)) leapAdj = 1;
      let month = Math.floor(((yearDay + leapAdj) * 12 + 373) / 367);
      let day = jd0 - $3b62074eb05584b2$export$f297eb839006d339(era, year, month, 1) + 1;
      return new $35ea8db9cb2ccb90$export$99faa760c7908e4f(era, year, month, day);
    }
    toJulianDay(date) {
      return $3b62074eb05584b2$export$f297eb839006d339(date.era, date.year, date.month, date.day);
    }
    getDaysInMonth(date) {
      return $3b62074eb05584b2$var$daysInMonth[$3b62074eb05584b2$export$553d7fa8e3805fc0(date.year) ? "leapyear" : "standard"][date.month - 1];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMonthsInYear(date) {
      return 12;
    }
    getDaysInYear(date) {
      return $3b62074eb05584b2$export$553d7fa8e3805fc0(date.year) ? 366 : 365;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getYearsInEra(date) {
      return 9999;
    }
    getEras() {
      return [
        "BC",
        "AD"
      ];
    }
    isInverseEra(date) {
      return date.era === "BC";
    }
    balanceDate(date) {
      if (date.year <= 0) {
        date.era = date.era === "BC" ? "AD" : "BC";
        date.year = 1 - date.year;
      }
    }
    constructor() {
      this.identifier = "gregory";
    }
  }
  function $14e0f24ef4ac5c92$export$dbc69fd56b53d5e(a, b) {
    var _a_isEqual, _b_isEqual;
    var _a_isEqual1, _ref;
    return (_ref = (_a_isEqual1 = (_a_isEqual = a.isEqual) === null || _a_isEqual === void 0 ? void 0 : _a_isEqual.call(a, b)) !== null && _a_isEqual1 !== void 0 ? _a_isEqual1 : (_b_isEqual = b.isEqual) === null || _b_isEqual === void 0 ? void 0 : _b_isEqual.call(b, a)) !== null && _ref !== void 0 ? _ref : a.identifier === b.identifier;
  }
  function $14e0f24ef4ac5c92$export$461939dd4422153(timeZone) {
    return $11d87f3f76e88657$export$1b96692a1ba042ac(Date.now(), timeZone);
  }
  function $14e0f24ef4ac5c92$export$d0bdf45af03a6ea3(timeZone) {
    return $11d87f3f76e88657$export$93522d1a439f3617($14e0f24ef4ac5c92$export$461939dd4422153(timeZone));
  }
  function $14e0f24ef4ac5c92$export$68781ddf31c0090f(a, b) {
    return a.calendar.toJulianDay(a) - b.calendar.toJulianDay(b);
  }
  function $14e0f24ef4ac5c92$export$c19a80a9721b80f6(a, b) {
    return $14e0f24ef4ac5c92$var$timeToMs(a) - $14e0f24ef4ac5c92$var$timeToMs(b);
  }
  function $14e0f24ef4ac5c92$var$timeToMs(a) {
    return a.hour * 36e5 + a.minute * 6e4 + a.second * 1e3 + a.millisecond;
  }
  let $14e0f24ef4ac5c92$var$localTimeZone = null;
  function $14e0f24ef4ac5c92$export$aa8b41735afcabd2() {
    if ($14e0f24ef4ac5c92$var$localTimeZone == null) $14e0f24ef4ac5c92$var$localTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    return $14e0f24ef4ac5c92$var$localTimeZone;
  }
  function $11d87f3f76e88657$export$bd4fb2bc8bb06fb(date) {
    date = $11d87f3f76e88657$export$b4a036af3fc0b032(date, new $3b62074eb05584b2$export$80ee6245ec4f29ec());
    let year = $3b62074eb05584b2$export$c36e0ecb2d4fa69d(date.era, date.year);
    return $11d87f3f76e88657$var$epochFromParts(year, date.month, date.day, date.hour, date.minute, date.second, date.millisecond);
  }
  function $11d87f3f76e88657$var$epochFromParts(year, month, day, hour, minute, second, millisecond) {
    let date = /* @__PURE__ */ new Date();
    date.setUTCHours(hour, minute, second, millisecond);
    date.setUTCFullYear(year, month - 1, day);
    return date.getTime();
  }
  function $11d87f3f76e88657$export$59c99f3515d3493f(ms, timeZone) {
    if (timeZone === "UTC") return 0;
    if (ms > 0 && timeZone === $14e0f24ef4ac5c92$export$aa8b41735afcabd2()) return new Date(ms).getTimezoneOffset() * -6e4;
    let { year, month, day, hour, minute, second } = $11d87f3f76e88657$var$getTimeZoneParts(ms, timeZone);
    let utc = $11d87f3f76e88657$var$epochFromParts(year, month, day, hour, minute, second, 0);
    return utc - Math.floor(ms / 1e3) * 1e3;
  }
  const $11d87f3f76e88657$var$formattersByTimeZone = /* @__PURE__ */ new Map();
  function $11d87f3f76e88657$var$getTimeZoneParts(ms, timeZone) {
    let formatter = $11d87f3f76e88657$var$formattersByTimeZone.get(timeZone);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour12: false,
        era: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      });
      $11d87f3f76e88657$var$formattersByTimeZone.set(timeZone, formatter);
    }
    let parts = formatter.formatToParts(new Date(ms));
    let namedParts = {};
    for (let part of parts) if (part.type !== "literal") namedParts[part.type] = part.value;
    return {
      // Firefox returns B instead of BC... https://bugzilla.mozilla.org/show_bug.cgi?id=1752253
      year: namedParts.era === "BC" || namedParts.era === "B" ? -namedParts.year + 1 : +namedParts.year,
      month: +namedParts.month,
      day: +namedParts.day,
      hour: namedParts.hour === "24" ? 0 : +namedParts.hour,
      minute: +namedParts.minute,
      second: +namedParts.second
    };
  }
  const $11d87f3f76e88657$var$DAYMILLIS = 864e5;
  function $11d87f3f76e88657$var$getValidWallTimes(date, timeZone, earlier, later) {
    let found = earlier === later ? [
      earlier
    ] : [
      earlier,
      later
    ];
    return found.filter((absolute) => $11d87f3f76e88657$var$isValidWallTime(date, timeZone, absolute));
  }
  function $11d87f3f76e88657$var$isValidWallTime(date, timeZone, absolute) {
    let parts = $11d87f3f76e88657$var$getTimeZoneParts(absolute, timeZone);
    return date.year === parts.year && date.month === parts.month && date.day === parts.day && date.hour === parts.hour && date.minute === parts.minute && date.second === parts.second;
  }
  function $11d87f3f76e88657$export$5107c82f94518f5c(date, timeZone, disambiguation = "compatible") {
    let dateTime = $11d87f3f76e88657$export$b21e0b124e224484(date);
    if (timeZone === "UTC") return $11d87f3f76e88657$export$bd4fb2bc8bb06fb(dateTime);
    if (timeZone === $14e0f24ef4ac5c92$export$aa8b41735afcabd2() && disambiguation === "compatible") {
      dateTime = $11d87f3f76e88657$export$b4a036af3fc0b032(dateTime, new $3b62074eb05584b2$export$80ee6245ec4f29ec());
      let date2 = /* @__PURE__ */ new Date();
      let year = $3b62074eb05584b2$export$c36e0ecb2d4fa69d(dateTime.era, dateTime.year);
      date2.setFullYear(year, dateTime.month - 1, dateTime.day);
      date2.setHours(dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
      return date2.getTime();
    }
    let ms = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(dateTime);
    let offsetBefore = $11d87f3f76e88657$export$59c99f3515d3493f(ms - $11d87f3f76e88657$var$DAYMILLIS, timeZone);
    let offsetAfter = $11d87f3f76e88657$export$59c99f3515d3493f(ms + $11d87f3f76e88657$var$DAYMILLIS, timeZone);
    let valid = $11d87f3f76e88657$var$getValidWallTimes(dateTime, timeZone, ms - offsetBefore, ms - offsetAfter);
    if (valid.length === 1) return valid[0];
    if (valid.length > 1) switch (disambiguation) {
      // 'compatible' means 'earlier' for "fall back" transitions
      case "compatible":
      case "earlier":
        return valid[0];
      case "later":
        return valid[valid.length - 1];
      case "reject":
        throw new RangeError("Multiple possible absolute times found");
    }
    switch (disambiguation) {
      case "earlier":
        return Math.min(ms - offsetBefore, ms - offsetAfter);
      // 'compatible' means 'later' for "spring forward" transitions
      case "compatible":
      case "later":
        return Math.max(ms - offsetBefore, ms - offsetAfter);
      case "reject":
        throw new RangeError("No such absolute time found");
    }
  }
  function $11d87f3f76e88657$export$e67a095c620b86fe(dateTime, timeZone, disambiguation = "compatible") {
    return new Date($11d87f3f76e88657$export$5107c82f94518f5c(dateTime, timeZone, disambiguation));
  }
  function $11d87f3f76e88657$export$1b96692a1ba042ac(ms, timeZone) {
    let offset = $11d87f3f76e88657$export$59c99f3515d3493f(ms, timeZone);
    let date = new Date(ms + offset);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    let second = date.getUTCSeconds();
    let millisecond = date.getUTCMilliseconds();
    return new $35ea8db9cb2ccb90$export$d3b7288e7994edea(year < 1 ? "BC" : "AD", year < 1 ? -year + 1 : year, month, day, timeZone, offset, hour, minute, second, millisecond);
  }
  function $11d87f3f76e88657$export$93522d1a439f3617(dateTime) {
    return new $35ea8db9cb2ccb90$export$99faa760c7908e4f(dateTime.calendar, dateTime.era, dateTime.year, dateTime.month, dateTime.day);
  }
  function $11d87f3f76e88657$export$b21e0b124e224484(date, time) {
    let hour = 0, minute = 0, second = 0, millisecond = 0;
    if ("timeZone" in date) ({ hour, minute, second, millisecond } = date);
    else if ("hour" in date && true) return date;
    return new $35ea8db9cb2ccb90$export$ca871e8dbb80966f(date.calendar, date.era, date.year, date.month, date.day, hour, minute, second, millisecond);
  }
  function $11d87f3f76e88657$export$b4a036af3fc0b032(date, calendar) {
    if ($14e0f24ef4ac5c92$export$dbc69fd56b53d5e(date.calendar, calendar)) return date;
    let calendarDate = calendar.fromJulianDay(date.calendar.toJulianDay(date));
    let copy = date.copy();
    copy.calendar = calendar;
    copy.era = calendarDate.era;
    copy.year = calendarDate.year;
    copy.month = calendarDate.month;
    copy.day = calendarDate.day;
    $735220c2d4774dd3$export$c4e2ecac49351ef2(copy);
    return copy;
  }
  function $11d87f3f76e88657$export$84c95a83c799e074(date, timeZone, disambiguation) {
    if (date instanceof $35ea8db9cb2ccb90$export$d3b7288e7994edea) {
      if (date.timeZone === timeZone) return date;
      return $11d87f3f76e88657$export$538b00033cc11c75(date, timeZone);
    }
    let ms = $11d87f3f76e88657$export$5107c82f94518f5c(date, timeZone, disambiguation);
    return $11d87f3f76e88657$export$1b96692a1ba042ac(ms, timeZone);
  }
  function $11d87f3f76e88657$export$83aac07b4c37b25(date) {
    let ms = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(date) - date.offset;
    return new Date(ms);
  }
  function $11d87f3f76e88657$export$538b00033cc11c75(date, timeZone) {
    let ms = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(date) - date.offset;
    return $11d87f3f76e88657$export$b4a036af3fc0b032($11d87f3f76e88657$export$1b96692a1ba042ac(ms, timeZone), date.calendar);
  }
  const $735220c2d4774dd3$var$ONE_HOUR = 36e5;
  function $735220c2d4774dd3$export$e16d8520af44a096(date, duration) {
    let mutableDate = date.copy();
    let days = "hour" in mutableDate ? $735220c2d4774dd3$var$addTimeFields(mutableDate, duration) : 0;
    $735220c2d4774dd3$var$addYears(mutableDate, duration.years || 0);
    if (mutableDate.calendar.balanceYearMonth) mutableDate.calendar.balanceYearMonth(mutableDate, date);
    mutableDate.month += duration.months || 0;
    $735220c2d4774dd3$var$balanceYearMonth(mutableDate);
    $735220c2d4774dd3$var$constrainMonthDay(mutableDate);
    mutableDate.day += (duration.weeks || 0) * 7;
    mutableDate.day += duration.days || 0;
    mutableDate.day += days;
    $735220c2d4774dd3$var$balanceDay(mutableDate);
    if (mutableDate.calendar.balanceDate) mutableDate.calendar.balanceDate(mutableDate);
    if (mutableDate.year < 1) {
      mutableDate.year = 1;
      mutableDate.month = 1;
      mutableDate.day = 1;
    }
    let maxYear = mutableDate.calendar.getYearsInEra(mutableDate);
    if (mutableDate.year > maxYear) {
      var _mutableDate_calendar_isInverseEra, _mutableDate_calendar;
      let isInverseEra = (_mutableDate_calendar_isInverseEra = (_mutableDate_calendar = mutableDate.calendar).isInverseEra) === null || _mutableDate_calendar_isInverseEra === void 0 ? void 0 : _mutableDate_calendar_isInverseEra.call(_mutableDate_calendar, mutableDate);
      mutableDate.year = maxYear;
      mutableDate.month = isInverseEra ? 1 : mutableDate.calendar.getMonthsInYear(mutableDate);
      mutableDate.day = isInverseEra ? 1 : mutableDate.calendar.getDaysInMonth(mutableDate);
    }
    if (mutableDate.month < 1) {
      mutableDate.month = 1;
      mutableDate.day = 1;
    }
    let maxMonth = mutableDate.calendar.getMonthsInYear(mutableDate);
    if (mutableDate.month > maxMonth) {
      mutableDate.month = maxMonth;
      mutableDate.day = mutableDate.calendar.getDaysInMonth(mutableDate);
    }
    mutableDate.day = Math.max(1, Math.min(mutableDate.calendar.getDaysInMonth(mutableDate), mutableDate.day));
    return mutableDate;
  }
  function $735220c2d4774dd3$var$addYears(date, years) {
    var _date_calendar_isInverseEra, _date_calendar;
    if ((_date_calendar_isInverseEra = (_date_calendar = date.calendar).isInverseEra) === null || _date_calendar_isInverseEra === void 0 ? void 0 : _date_calendar_isInverseEra.call(_date_calendar, date)) years = -years;
    date.year += years;
  }
  function $735220c2d4774dd3$var$balanceYearMonth(date) {
    while (date.month < 1) {
      $735220c2d4774dd3$var$addYears(date, -1);
      date.month += date.calendar.getMonthsInYear(date);
    }
    let monthsInYear = 0;
    while (date.month > (monthsInYear = date.calendar.getMonthsInYear(date))) {
      date.month -= monthsInYear;
      $735220c2d4774dd3$var$addYears(date, 1);
    }
  }
  function $735220c2d4774dd3$var$balanceDay(date) {
    while (date.day < 1) {
      date.month--;
      $735220c2d4774dd3$var$balanceYearMonth(date);
      date.day += date.calendar.getDaysInMonth(date);
    }
    while (date.day > date.calendar.getDaysInMonth(date)) {
      date.day -= date.calendar.getDaysInMonth(date);
      date.month++;
      $735220c2d4774dd3$var$balanceYearMonth(date);
    }
  }
  function $735220c2d4774dd3$var$constrainMonthDay(date) {
    date.month = Math.max(1, Math.min(date.calendar.getMonthsInYear(date), date.month));
    date.day = Math.max(1, Math.min(date.calendar.getDaysInMonth(date), date.day));
  }
  function $735220c2d4774dd3$export$c4e2ecac49351ef2(date) {
    if (date.calendar.constrainDate) date.calendar.constrainDate(date);
    date.year = Math.max(1, Math.min(date.calendar.getYearsInEra(date), date.year));
    $735220c2d4774dd3$var$constrainMonthDay(date);
  }
  function $735220c2d4774dd3$export$3e2544e88a25bff8(duration) {
    let inverseDuration = {};
    for (let key in duration) if (typeof duration[key] === "number") inverseDuration[key] = -duration[key];
    return inverseDuration;
  }
  function $735220c2d4774dd3$export$4e2d2ead65e5f7e3(date, duration) {
    return $735220c2d4774dd3$export$e16d8520af44a096(date, $735220c2d4774dd3$export$3e2544e88a25bff8(duration));
  }
  function $735220c2d4774dd3$export$adaa4cf7ef1b65be(date, fields) {
    let mutableDate = date.copy();
    if (fields.era != null) mutableDate.era = fields.era;
    if (fields.year != null) mutableDate.year = fields.year;
    if (fields.month != null) mutableDate.month = fields.month;
    if (fields.day != null) mutableDate.day = fields.day;
    $735220c2d4774dd3$export$c4e2ecac49351ef2(mutableDate);
    return mutableDate;
  }
  function $735220c2d4774dd3$export$e5d5e1c1822b6e56(value, fields) {
    let mutableValue = value.copy();
    if (fields.hour != null) mutableValue.hour = fields.hour;
    if (fields.minute != null) mutableValue.minute = fields.minute;
    if (fields.second != null) mutableValue.second = fields.second;
    if (fields.millisecond != null) mutableValue.millisecond = fields.millisecond;
    $735220c2d4774dd3$export$7555de1e070510cb(mutableValue);
    return mutableValue;
  }
  function $735220c2d4774dd3$var$balanceTime(time) {
    time.second += Math.floor(time.millisecond / 1e3);
    time.millisecond = $735220c2d4774dd3$var$nonNegativeMod(time.millisecond, 1e3);
    time.minute += Math.floor(time.second / 60);
    time.second = $735220c2d4774dd3$var$nonNegativeMod(time.second, 60);
    time.hour += Math.floor(time.minute / 60);
    time.minute = $735220c2d4774dd3$var$nonNegativeMod(time.minute, 60);
    let days = Math.floor(time.hour / 24);
    time.hour = $735220c2d4774dd3$var$nonNegativeMod(time.hour, 24);
    return days;
  }
  function $735220c2d4774dd3$export$7555de1e070510cb(time) {
    time.millisecond = Math.max(0, Math.min(time.millisecond, 1e3));
    time.second = Math.max(0, Math.min(time.second, 59));
    time.minute = Math.max(0, Math.min(time.minute, 59));
    time.hour = Math.max(0, Math.min(time.hour, 23));
  }
  function $735220c2d4774dd3$var$nonNegativeMod(a, b) {
    let result = a % b;
    if (result < 0) result += b;
    return result;
  }
  function $735220c2d4774dd3$var$addTimeFields(time, duration) {
    time.hour += duration.hours || 0;
    time.minute += duration.minutes || 0;
    time.second += duration.seconds || 0;
    time.millisecond += duration.milliseconds || 0;
    return $735220c2d4774dd3$var$balanceTime(time);
  }
  function $735220c2d4774dd3$export$d52ced6badfb9a4c(value, field, amount, options) {
    let mutable = value.copy();
    switch (field) {
      case "era": {
        let eras = value.calendar.getEras();
        let eraIndex = eras.indexOf(value.era);
        if (eraIndex < 0) throw new Error("Invalid era: " + value.era);
        eraIndex = $735220c2d4774dd3$var$cycleValue(eraIndex, amount, 0, eras.length - 1, options === null || options === void 0 ? void 0 : options.round);
        mutable.era = eras[eraIndex];
        $735220c2d4774dd3$export$c4e2ecac49351ef2(mutable);
        break;
      }
      case "year":
        var _mutable_calendar_isInverseEra, _mutable_calendar;
        if ((_mutable_calendar_isInverseEra = (_mutable_calendar = mutable.calendar).isInverseEra) === null || _mutable_calendar_isInverseEra === void 0 ? void 0 : _mutable_calendar_isInverseEra.call(_mutable_calendar, mutable)) amount = -amount;
        mutable.year = $735220c2d4774dd3$var$cycleValue(value.year, amount, -Infinity, 9999, options === null || options === void 0 ? void 0 : options.round);
        if (mutable.year === -Infinity) mutable.year = 1;
        if (mutable.calendar.balanceYearMonth) mutable.calendar.balanceYearMonth(mutable, value);
        break;
      case "month":
        mutable.month = $735220c2d4774dd3$var$cycleValue(value.month, amount, 1, value.calendar.getMonthsInYear(value), options === null || options === void 0 ? void 0 : options.round);
        break;
      case "day":
        mutable.day = $735220c2d4774dd3$var$cycleValue(value.day, amount, 1, value.calendar.getDaysInMonth(value), options === null || options === void 0 ? void 0 : options.round);
        break;
      default:
        throw new Error("Unsupported field " + field);
    }
    if (value.calendar.balanceDate) value.calendar.balanceDate(mutable);
    $735220c2d4774dd3$export$c4e2ecac49351ef2(mutable);
    return mutable;
  }
  function $735220c2d4774dd3$export$dd02b3e0007dfe28(value, field, amount, options) {
    let mutable = value.copy();
    switch (field) {
      case "hour": {
        let hours = value.hour;
        let min = 0;
        let max = 23;
        if ((options === null || options === void 0 ? void 0 : options.hourCycle) === 12) {
          let isPM = hours >= 12;
          min = isPM ? 12 : 0;
          max = isPM ? 23 : 11;
        }
        mutable.hour = $735220c2d4774dd3$var$cycleValue(hours, amount, min, max, options === null || options === void 0 ? void 0 : options.round);
        break;
      }
      case "minute":
        mutable.minute = $735220c2d4774dd3$var$cycleValue(value.minute, amount, 0, 59, options === null || options === void 0 ? void 0 : options.round);
        break;
      case "second":
        mutable.second = $735220c2d4774dd3$var$cycleValue(value.second, amount, 0, 59, options === null || options === void 0 ? void 0 : options.round);
        break;
      case "millisecond":
        mutable.millisecond = $735220c2d4774dd3$var$cycleValue(value.millisecond, amount, 0, 999, options === null || options === void 0 ? void 0 : options.round);
        break;
      default:
        throw new Error("Unsupported field " + field);
    }
    return mutable;
  }
  function $735220c2d4774dd3$var$cycleValue(value, amount, min, max, round = false) {
    if (round) {
      value += Math.sign(amount);
      if (value < min) value = max;
      let div2 = Math.abs(amount);
      if (amount > 0) value = Math.ceil(value / div2) * div2;
      else value = Math.floor(value / div2) * div2;
      if (value > max) value = min;
    } else {
      value += amount;
      if (value < min) value = max - (min - value - 1);
      else if (value > max) value = min + (value - max - 1);
    }
    return value;
  }
  function $735220c2d4774dd3$export$96b1d28349274637(dateTime, duration) {
    let ms;
    if (duration.years != null && duration.years !== 0 || duration.months != null && duration.months !== 0 || duration.weeks != null && duration.weeks !== 0 || duration.days != null && duration.days !== 0) {
      let res2 = $735220c2d4774dd3$export$e16d8520af44a096($11d87f3f76e88657$export$b21e0b124e224484(dateTime), {
        years: duration.years,
        months: duration.months,
        weeks: duration.weeks,
        days: duration.days
      });
      ms = $11d87f3f76e88657$export$5107c82f94518f5c(res2, dateTime.timeZone);
    } else
      ms = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(dateTime) - dateTime.offset;
    ms += duration.milliseconds || 0;
    ms += (duration.seconds || 0) * 1e3;
    ms += (duration.minutes || 0) * 6e4;
    ms += (duration.hours || 0) * 36e5;
    let res = $11d87f3f76e88657$export$1b96692a1ba042ac(ms, dateTime.timeZone);
    return $11d87f3f76e88657$export$b4a036af3fc0b032(res, dateTime.calendar);
  }
  function $735220c2d4774dd3$export$6814caac34ca03c7(dateTime, duration) {
    return $735220c2d4774dd3$export$96b1d28349274637(dateTime, $735220c2d4774dd3$export$3e2544e88a25bff8(duration));
  }
  function $735220c2d4774dd3$export$9a297d111fc86b79(dateTime, field, amount, options) {
    switch (field) {
      case "hour": {
        let min = 0;
        let max = 23;
        if ((options === null || options === void 0 ? void 0 : options.hourCycle) === 12) {
          let isPM = dateTime.hour >= 12;
          min = isPM ? 12 : 0;
          max = isPM ? 23 : 11;
        }
        let plainDateTime = $11d87f3f76e88657$export$b21e0b124e224484(dateTime);
        let minDate = $11d87f3f76e88657$export$b4a036af3fc0b032($735220c2d4774dd3$export$e5d5e1c1822b6e56(plainDateTime, {
          hour: min
        }), new $3b62074eb05584b2$export$80ee6245ec4f29ec());
        let minAbsolute = [
          $11d87f3f76e88657$export$5107c82f94518f5c(minDate, dateTime.timeZone, "earlier"),
          $11d87f3f76e88657$export$5107c82f94518f5c(minDate, dateTime.timeZone, "later")
        ].filter((ms2) => $11d87f3f76e88657$export$1b96692a1ba042ac(ms2, dateTime.timeZone).day === minDate.day)[0];
        let maxDate = $11d87f3f76e88657$export$b4a036af3fc0b032($735220c2d4774dd3$export$e5d5e1c1822b6e56(plainDateTime, {
          hour: max
        }), new $3b62074eb05584b2$export$80ee6245ec4f29ec());
        let maxAbsolute = [
          $11d87f3f76e88657$export$5107c82f94518f5c(maxDate, dateTime.timeZone, "earlier"),
          $11d87f3f76e88657$export$5107c82f94518f5c(maxDate, dateTime.timeZone, "later")
        ].filter((ms2) => $11d87f3f76e88657$export$1b96692a1ba042ac(ms2, dateTime.timeZone).day === maxDate.day).pop();
        let ms = $11d87f3f76e88657$export$bd4fb2bc8bb06fb(dateTime) - dateTime.offset;
        let hours = Math.floor(ms / $735220c2d4774dd3$var$ONE_HOUR);
        let remainder = ms % $735220c2d4774dd3$var$ONE_HOUR;
        ms = $735220c2d4774dd3$var$cycleValue(hours, amount, Math.floor(minAbsolute / $735220c2d4774dd3$var$ONE_HOUR), Math.floor(maxAbsolute / $735220c2d4774dd3$var$ONE_HOUR), options === null || options === void 0 ? void 0 : options.round) * $735220c2d4774dd3$var$ONE_HOUR + remainder;
        return $11d87f3f76e88657$export$b4a036af3fc0b032($11d87f3f76e88657$export$1b96692a1ba042ac(ms, dateTime.timeZone), dateTime.calendar);
      }
      case "minute":
      case "second":
      case "millisecond":
        return $735220c2d4774dd3$export$dd02b3e0007dfe28(dateTime, field, amount, options);
      case "era":
      case "year":
      case "month":
      case "day": {
        let res = $735220c2d4774dd3$export$d52ced6badfb9a4c($11d87f3f76e88657$export$b21e0b124e224484(dateTime), field, amount, options);
        let ms = $11d87f3f76e88657$export$5107c82f94518f5c(res, dateTime.timeZone);
        return $11d87f3f76e88657$export$b4a036af3fc0b032($11d87f3f76e88657$export$1b96692a1ba042ac(ms, dateTime.timeZone), dateTime.calendar);
      }
      default:
        throw new Error("Unsupported field " + field);
    }
  }
  function $735220c2d4774dd3$export$31b5430eb18be4f8(dateTime, fields, disambiguation) {
    let plainDateTime = $11d87f3f76e88657$export$b21e0b124e224484(dateTime);
    let res = $735220c2d4774dd3$export$e5d5e1c1822b6e56($735220c2d4774dd3$export$adaa4cf7ef1b65be(plainDateTime, fields), fields);
    if (res.compare(plainDateTime) === 0) return dateTime;
    let ms = $11d87f3f76e88657$export$5107c82f94518f5c(res, dateTime.timeZone, disambiguation);
    return $11d87f3f76e88657$export$b4a036af3fc0b032($11d87f3f76e88657$export$1b96692a1ba042ac(ms, dateTime.timeZone), dateTime.calendar);
  }
  const $fae977aafc393c5c$var$ABSOLUTE_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:(?:([+-]\d{2})(?::?(\d{2}))?)|Z)$/;
  function $fae977aafc393c5c$export$5adfdab05168c219(value, timeZone) {
    let m = value.match($fae977aafc393c5c$var$ABSOLUTE_RE);
    if (!m) throw new Error("Invalid ISO 8601 date time string: " + value);
    let year = $fae977aafc393c5c$var$parseNumber(m[1], -9999, 9999);
    let era = year < 1 ? "BC" : "AD";
    let date = new $35ea8db9cb2ccb90$export$d3b7288e7994edea(era, year < 1 ? -year + 1 : year, $fae977aafc393c5c$var$parseNumber(m[2], 1, 12), 1, timeZone, 0, m[4] ? $fae977aafc393c5c$var$parseNumber(m[4], 0, 23) : 0, m[5] ? $fae977aafc393c5c$var$parseNumber(m[5], 0, 59) : 0, m[6] ? $fae977aafc393c5c$var$parseNumber(m[6], 0, 59) : 0, m[7] ? $fae977aafc393c5c$var$parseNumber(m[7], 0, Infinity) * 1e3 : 0);
    date.day = $fae977aafc393c5c$var$parseNumber(m[3], 0, date.calendar.getDaysInMonth(date));
    var _m_;
    if (m[8]) date.offset = $fae977aafc393c5c$var$parseNumber(m[8], -23, 23) * 36e5 + $fae977aafc393c5c$var$parseNumber((_m_ = m[9]) !== null && _m_ !== void 0 ? _m_ : "0", 0, 59) * 6e4;
    return $11d87f3f76e88657$export$538b00033cc11c75(date, timeZone);
  }
  function $fae977aafc393c5c$var$parseNumber(value, min, max) {
    let val = Number(value);
    if (val < min || val > max) throw new RangeError(`Value out of range: ${min} <= ${val} <= ${max}`);
    return val;
  }
  function $fae977aafc393c5c$export$f59dee82248f5ad4(time) {
    return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}:${String(time.second).padStart(2, "0")}${time.millisecond ? String(time.millisecond / 1e3).slice(1) : ""}`;
  }
  function $fae977aafc393c5c$export$60dfd74aa96791bd(date) {
    let gregorianDate = $11d87f3f76e88657$export$b4a036af3fc0b032(date, new $3b62074eb05584b2$export$80ee6245ec4f29ec());
    let year;
    if (gregorianDate.era === "BC") year = gregorianDate.year === 1 ? "0000" : "-" + String(Math.abs(1 - gregorianDate.year)).padStart(6, "00");
    else year = String(gregorianDate.year).padStart(4, "0");
    return `${year}-${String(gregorianDate.month).padStart(2, "0")}-${String(gregorianDate.day).padStart(2, "0")}`;
  }
  function $fae977aafc393c5c$export$4223de14708adc63(date) {
    return `${$fae977aafc393c5c$export$60dfd74aa96791bd(date)}T${$fae977aafc393c5c$export$f59dee82248f5ad4(date)}`;
  }
  function $fae977aafc393c5c$var$offsetToString(offset) {
    let sign = Math.sign(offset) < 0 ? "-" : "+";
    offset = Math.abs(offset);
    let offsetHours = Math.floor(offset / 36e5);
    let offsetMinutes = offset % 36e5 / 6e4;
    return `${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
  }
  function $fae977aafc393c5c$export$bf79f1ebf4b18792(date) {
    return `${$fae977aafc393c5c$export$4223de14708adc63(date)}${$fae977aafc393c5c$var$offsetToString(date.offset)}[${date.timeZone}]`;
  }
  function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_private_field_init(obj, privateMap, value) {
    _check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function $35ea8db9cb2ccb90$var$shiftArgs(args) {
    let calendar = typeof args[0] === "object" ? args.shift() : new $3b62074eb05584b2$export$80ee6245ec4f29ec();
    let era;
    if (typeof args[0] === "string") era = args.shift();
    else {
      let eras = calendar.getEras();
      era = eras[eras.length - 1];
    }
    let year = args.shift();
    let month = args.shift();
    let day = args.shift();
    return [
      calendar,
      era,
      year,
      month,
      day
    ];
  }
  var $35ea8db9cb2ccb90$var$_type = /* @__PURE__ */ new WeakMap();
  class $35ea8db9cb2ccb90$export$99faa760c7908e4f {
    /** Returns a copy of this date. */
    copy() {
      if (this.era) return new $35ea8db9cb2ccb90$export$99faa760c7908e4f(this.calendar, this.era, this.year, this.month, this.day);
      else return new $35ea8db9cb2ccb90$export$99faa760c7908e4f(this.calendar, this.year, this.month, this.day);
    }
    /** Returns a new `CalendarDate` with the given duration added to it. */
    add(duration) {
      return $735220c2d4774dd3$export$e16d8520af44a096(this, duration);
    }
    /** Returns a new `CalendarDate` with the given duration subtracted from it. */
    subtract(duration) {
      return $735220c2d4774dd3$export$4e2d2ead65e5f7e3(this, duration);
    }
    /** Returns a new `CalendarDate` with the given fields set to the provided values. Other fields will be constrained accordingly. */
    set(fields) {
      return $735220c2d4774dd3$export$adaa4cf7ef1b65be(this, fields);
    }
    /**
    * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
    * When the resulting value reaches the limits of the field, it wraps around.
    */
    cycle(field, amount, options) {
      return $735220c2d4774dd3$export$d52ced6badfb9a4c(this, field, amount, options);
    }
    /** Converts the date to a native JavaScript Date object, with the time set to midnight in the given time zone. */
    toDate(timeZone) {
      return $11d87f3f76e88657$export$e67a095c620b86fe(this, timeZone);
    }
    /** Converts the date to an ISO 8601 formatted string. */
    toString() {
      return $fae977aafc393c5c$export$60dfd74aa96791bd(this);
    }
    /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
    compare(b) {
      return $14e0f24ef4ac5c92$export$68781ddf31c0090f(this, b);
    }
    constructor(...args) {
      _class_private_field_init(this, $35ea8db9cb2ccb90$var$_type, {
        writable: true,
        value: void 0
      });
      let [calendar, era, year, month, day] = $35ea8db9cb2ccb90$var$shiftArgs(args);
      this.calendar = calendar;
      this.era = era;
      this.year = year;
      this.month = month;
      this.day = day;
      $735220c2d4774dd3$export$c4e2ecac49351ef2(this);
    }
  }
  var $35ea8db9cb2ccb90$var$_type2 = /* @__PURE__ */ new WeakMap();
  class $35ea8db9cb2ccb90$export$ca871e8dbb80966f {
    /** Returns a copy of this date. */
    copy() {
      if (this.era) return new $35ea8db9cb2ccb90$export$ca871e8dbb80966f(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      else return new $35ea8db9cb2ccb90$export$ca871e8dbb80966f(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
    }
    /** Returns a new `CalendarDateTime` with the given duration added to it. */
    add(duration) {
      return $735220c2d4774dd3$export$e16d8520af44a096(this, duration);
    }
    /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
    subtract(duration) {
      return $735220c2d4774dd3$export$4e2d2ead65e5f7e3(this, duration);
    }
    /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
    set(fields) {
      return $735220c2d4774dd3$export$adaa4cf7ef1b65be($735220c2d4774dd3$export$e5d5e1c1822b6e56(this, fields), fields);
    }
    /**
    * Returns a new `CalendarDateTime` with the given field adjusted by a specified amount.
    * When the resulting value reaches the limits of the field, it wraps around.
    */
    cycle(field, amount, options) {
      switch (field) {
        case "era":
        case "year":
        case "month":
        case "day":
          return $735220c2d4774dd3$export$d52ced6badfb9a4c(this, field, amount, options);
        default:
          return $735220c2d4774dd3$export$dd02b3e0007dfe28(this, field, amount, options);
      }
    }
    /** Converts the date to a native JavaScript Date object in the given time zone. */
    toDate(timeZone, disambiguation) {
      return $11d87f3f76e88657$export$e67a095c620b86fe(this, timeZone, disambiguation);
    }
    /** Converts the date to an ISO 8601 formatted string. */
    toString() {
      return $fae977aafc393c5c$export$4223de14708adc63(this);
    }
    /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
    compare(b) {
      let res = $14e0f24ef4ac5c92$export$68781ddf31c0090f(this, b);
      if (res === 0) return $14e0f24ef4ac5c92$export$c19a80a9721b80f6(this, $11d87f3f76e88657$export$b21e0b124e224484(b));
      return res;
    }
    constructor(...args) {
      _class_private_field_init(this, $35ea8db9cb2ccb90$var$_type2, {
        writable: true,
        value: void 0
      });
      let [calendar, era, year, month, day] = $35ea8db9cb2ccb90$var$shiftArgs(args);
      this.calendar = calendar;
      this.era = era;
      this.year = year;
      this.month = month;
      this.day = day;
      this.hour = args.shift() || 0;
      this.minute = args.shift() || 0;
      this.second = args.shift() || 0;
      this.millisecond = args.shift() || 0;
      $735220c2d4774dd3$export$c4e2ecac49351ef2(this);
    }
  }
  var $35ea8db9cb2ccb90$var$_type3 = /* @__PURE__ */ new WeakMap();
  class $35ea8db9cb2ccb90$export$d3b7288e7994edea {
    /** Returns a copy of this date. */
    copy() {
      if (this.era) return new $35ea8db9cb2ccb90$export$d3b7288e7994edea(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
      else return new $35ea8db9cb2ccb90$export$d3b7288e7994edea(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
    }
    /** Returns a new `ZonedDateTime` with the given duration added to it. */
    add(duration) {
      return $735220c2d4774dd3$export$96b1d28349274637(this, duration);
    }
    /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */
    subtract(duration) {
      return $735220c2d4774dd3$export$6814caac34ca03c7(this, duration);
    }
    /** Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
    set(fields, disambiguation) {
      return $735220c2d4774dd3$export$31b5430eb18be4f8(this, fields, disambiguation);
    }
    /**
    * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
    * When the resulting value reaches the limits of the field, it wraps around.
    */
    cycle(field, amount, options) {
      return $735220c2d4774dd3$export$9a297d111fc86b79(this, field, amount, options);
    }
    /** Converts the date to a native JavaScript Date object. */
    toDate() {
      return $11d87f3f76e88657$export$83aac07b4c37b25(this);
    }
    /** Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone identifier. */
    toString() {
      return $fae977aafc393c5c$export$bf79f1ebf4b18792(this);
    }
    /** Converts the date to an ISO 8601 formatted string in UTC. */
    toAbsoluteString() {
      return this.toDate().toISOString();
    }
    /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
    compare(b) {
      return this.toDate().getTime() - $11d87f3f76e88657$export$84c95a83c799e074(b, this.timeZone).toDate().getTime();
    }
    constructor(...args) {
      _class_private_field_init(this, $35ea8db9cb2ccb90$var$_type3, {
        writable: true,
        value: void 0
      });
      let [calendar, era, year, month, day] = $35ea8db9cb2ccb90$var$shiftArgs(args);
      let timeZone = args.shift();
      let offset = args.shift();
      this.calendar = calendar;
      this.era = era;
      this.year = year;
      this.month = month;
      this.day = day;
      this.timeZone = timeZone;
      this.offset = offset;
      this.hour = args.shift() || 0;
      this.minute = args.shift() || 0;
      this.second = args.shift() || 0;
      this.millisecond = args.shift() || 0;
      $735220c2d4774dd3$export$c4e2ecac49351ef2(this);
    }
  }
  class IndexedDB extends Dexie {
    constructor() {
      super("Weibo-archiver");
      __publicField(this, "users");
      __publicField(this, "posts");
      __publicField(this, "followings");
      __publicField(this, "favorites");
      __publicField(this, "curUser");
      this.version(1).stores({
        users: "uid, createdAt",
        posts: "id, mblogid, userId, createdAt",
        followings: "uid, followBy",
        favorites: "id, mblogid, userId"
      });
    }
    get curUid() {
      var _a2;
      return ((_a2 = this.curUser) == null ? void 0 : _a2.uid) || "";
    }
    async setCurUser(userId) {
      const data = await this.users.where("uid").equals(userId).toArray();
      this.curUser = data[0];
    }
    async addUser(user) {
      await this.users.put(user);
    }
    async addPosts(posts) {
      return this.posts.bulkPut(posts);
    }
    async addFollowings(users) {
      const data = users.map((user) => {
        if (this.curUid) {
          user.followBy = this.curUid;
        }
        return user;
      });
      await this.followings.bulkPut(data);
    }
    async addFavorites(favorites) {
      return this.favorites.bulkPut(favorites);
    }
    async getFollowings() {
      return this.followingQuery.toArray();
    }
    async getAllFavorites() {
      return this.favoriteQuery.toArray();
    }
    async getFavorites(page, pageSize = DEFAULT_PAGE_SIZE) {
      return this.favoriteQuery.offset((page - 1) * pageSize).limit(pageSize).reverse().toArray();
    }
    async getAllFavoritesCount() {
      return this.favoriteQuery.count();
    }
    async getUsers() {
      return this.users.toArray();
    }
    async getAllPosts() {
      return this.postQuery.toArray();
    }
    async getPosts(page, pageSize = DEFAULT_PAGE_SIZE) {
      return this.postQuery.offset((page - 1) * pageSize).limit(pageSize).reverse().toArray();
    }
    async getPostsByIds(idArr) {
      return this.postQuery.and((post) => idArr.includes(post.id.toString())).reverse().sortBy("id");
    }
    async getPostById(id) {
      const post = await this.postQuery.and((post2) => post2.mblogid === id).toArray();
      return post.length > 0 ? post[0] : void 0;
    }
    async getPostsByDay(day = $14e0f24ef4ac5c92$export$d0bdf45af03a6ea3("Asia/Shanghai")) {
      const monthDay = `${day.month}-${day.day}`;
      return this.postQuery.and((post) => {
        const date = $fae977aafc393c5c$export$5adfdab05168c219(new Date(post.createdAt).toISOString(), "Asia/Shanghai");
        const postMonthDay = `${date.month}-${date.day}`;
        return monthDay === postMonthDay;
      }).reverse().toArray();
    }
    async getLatestPost() {
      const post = await this.postQuery.limit(1).toArray();
      return post[0];
    }
    async getAllPostsCount() {
      return this.postQuery.count();
    }
    async getAllFollowingsCount() {
      return this.followingQuery.count();
    }
    async clearDB() {
      const postsCount = await this.postQuery.delete();
      const followingsCount = await this.followingQuery.delete();
      const favoritesCount = await this.favoriteQuery.delete();
      const usersCount = await this.users.where("uid").equals(this.curUid).delete();
      return {
        postsCount,
        followingsCount,
        favoritesCount,
        usersCount
      };
    }
    get postQuery() {
      return this.posts.where("userId").equals(this.curUid);
    }
    get favoriteQuery() {
      return this.favorites.where("userId").equals(this.curUid);
    }
    get followingQuery() {
      return this.followings.where("followBy").equals(this.curUid);
    }
  }
  const idb = new IndexedDB();
  function tryOnScopeDispose(fn) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  const isClient = typeof window !== "undefined" && typeof document !== "undefined";
  typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
  const toString = Object.prototype.toString;
  const isObject = (val) => toString.call(val) === "[object Object]";
  const noop = () => {
  };
  function toRef(...args) {
    if (args.length !== 1)
      return vue.toRef(...args);
    const r = args[0];
    return typeof r === "function" ? vue.readonly(vue.customRef(() => ({ get: r, set: noop }))) : vue.ref(r);
  }
  function createFilterWrapper(filter, fn) {
    function wrapper(...args) {
      return new Promise((resolve, reject) => {
        Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
      });
    }
    return wrapper;
  }
  const bypassFilter = (invoke) => {
    return invoke();
  };
  function pausableFilter(extendFilter = bypassFilter, options = {}) {
    const {
      initialState = "active"
    } = options;
    const isActive = toRef(initialState === "active");
    function pause() {
      isActive.value = false;
    }
    function resume() {
      isActive.value = true;
    }
    const eventFilter = (...args) => {
      if (isActive.value)
        extendFilter(...args);
    };
    return { isActive: vue.readonly(isActive), pause, resume, eventFilter };
  }
  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }
  function getLifeCycleTarget(target) {
    return vue.getCurrentInstance();
  }
  function watchWithFilter(source, cb, options = {}) {
    const {
      eventFilter = bypassFilter,
      ...watchOptions
    } = options;
    return vue.watch(
      source,
      createFilterWrapper(
        eventFilter,
        cb
      ),
      watchOptions
    );
  }
  function watchPausable(source, cb, options = {}) {
    const {
      eventFilter: filter,
      initialState = "active",
      ...watchOptions
    } = options;
    const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
    const stop = watchWithFilter(
      source,
      cb,
      {
        ...watchOptions,
        eventFilter
      }
    );
    return { stop, pause, resume, isActive };
  }
  function tryOnMounted(fn, sync = true, target) {
    const instance = getLifeCycleTarget();
    if (instance)
      vue.onMounted(fn, target);
    else if (sync)
      fn();
    else
      vue.nextTick(fn);
  }
  function watchImmediate(source, cb, options) {
    return vue.watch(
      source,
      cb,
      {
        ...options,
        immediate: true
      }
    );
  }
  const defaultWindow = isClient ? window : void 0;
  function unrefElement(elRef) {
    var _a2;
    const plain = vue.toValue(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  function useEventListener(...args) {
    const cleanups = [];
    const cleanup = () => {
      cleanups.forEach((fn) => fn());
      cleanups.length = 0;
    };
    const register = (el, event, listener, options) => {
      el.addEventListener(event, listener, options);
      return () => el.removeEventListener(event, listener, options);
    };
    const firstParamTargets = vue.computed(() => {
      const test = toArray(vue.toValue(args[0])).filter((e) => e != null);
      return test.every((e) => typeof e !== "string") ? test : void 0;
    });
    const stopWatch = watchImmediate(
      () => {
        var _a2, _b;
        return [
          (_b = (_a2 = firstParamTargets.value) == null ? void 0 : _a2.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
          toArray(vue.toValue(firstParamTargets.value ? args[1] : args[0])),
          toArray(vue.unref(firstParamTargets.value ? args[2] : args[1])),
          // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
          vue.toValue(firstParamTargets.value ? args[3] : args[2])
        ];
      },
      ([raw_targets, raw_events, raw_listeners, raw_options]) => {
        cleanup();
        if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
          return;
        const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
        cleanups.push(
          ...raw_targets.flatMap(
            (el) => raw_events.flatMap(
              (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
            )
          )
        );
      },
      { flush: "post" }
    );
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(cleanup);
    return stop;
  }
  const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const globalKey = "__vueuse_ssr_handlers__";
  const handlers = /* @__PURE__ */ getHandlers();
  function getHandlers() {
    if (!(globalKey in _global))
      _global[globalKey] = _global[globalKey] || {};
    return _global[globalKey];
  }
  function getSSRHandler(key, fallback) {
    return handlers[key] || fallback;
  }
  function guessSerializerType(rawInit) {
    return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
  }
  const StorageSerializers = {
    boolean: {
      read: (v) => v === "true",
      write: (v) => String(v)
    },
    object: {
      read: (v) => JSON.parse(v),
      write: (v) => JSON.stringify(v)
    },
    number: {
      read: (v) => Number.parseFloat(v),
      write: (v) => String(v)
    },
    any: {
      read: (v) => v,
      write: (v) => String(v)
    },
    string: {
      read: (v) => v,
      write: (v) => String(v)
    },
    map: {
      read: (v) => new Map(JSON.parse(v)),
      write: (v) => JSON.stringify(Array.from(v.entries()))
    },
    set: {
      read: (v) => new Set(JSON.parse(v)),
      write: (v) => JSON.stringify(Array.from(v))
    },
    date: {
      read: (v) => new Date(v),
      write: (v) => v.toISOString()
    }
  };
  const customStorageEventName = "vueuse-storage";
  function useStorage(key, defaults2, storage, options = {}) {
    var _a2;
    const {
      flush = "pre",
      deep = true,
      listenToStorageChanges = true,
      writeDefaults = true,
      mergeDefaults = false,
      shallow,
      window: window2 = defaultWindow,
      eventFilter,
      onError = (e) => {
        console.error(e);
      },
      initOnMounted
    } = options;
    const data = (shallow ? vue.shallowRef : vue.ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
    const keyComputed = vue.computed(() => vue.toValue(key));
    if (!storage) {
      try {
        storage = getSSRHandler("getDefaultStorage", () => {
          var _a22;
          return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
        })();
      } catch (e) {
        onError(e);
      }
    }
    if (!storage)
      return data;
    const rawInit = vue.toValue(defaults2);
    const type = guessSerializerType(rawInit);
    const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
    const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
      data,
      () => write(data.value),
      { flush, deep, eventFilter }
    );
    vue.watch(keyComputed, () => update(), { flush });
    let firstMounted = false;
    const onStorageEvent = (ev) => {
      if (initOnMounted && !firstMounted) {
        return;
      }
      update(ev);
    };
    const onStorageCustomEvent = (ev) => {
      if (initOnMounted && !firstMounted) {
        return;
      }
      updateFromCustomEvent(ev);
    };
    if (window2 && listenToStorageChanges) {
      if (storage instanceof Storage)
        useEventListener(window2, "storage", onStorageEvent, { passive: true });
      else
        useEventListener(window2, customStorageEventName, onStorageCustomEvent);
    }
    if (initOnMounted) {
      tryOnMounted(() => {
        firstMounted = true;
        update();
      });
    } else {
      update();
    }
    function dispatchWriteEvent(oldValue, newValue) {
      if (window2) {
        const payload = {
          key: keyComputed.value,
          oldValue,
          newValue,
          storageArea: storage
        };
        window2.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, {
          detail: payload
        }));
      }
    }
    function write(v) {
      try {
        const oldValue = storage.getItem(keyComputed.value);
        if (v == null) {
          dispatchWriteEvent(oldValue, null);
          storage.removeItem(keyComputed.value);
        } else {
          const serialized = serializer.write(v);
          if (oldValue !== serialized) {
            storage.setItem(keyComputed.value, serialized);
            dispatchWriteEvent(oldValue, serialized);
          }
        }
      } catch (e) {
        onError(e);
      }
    }
    function read(event) {
      const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
      if (rawValue == null) {
        if (writeDefaults && rawInit != null)
          storage.setItem(keyComputed.value, serializer.write(rawInit));
        return rawInit;
      } else if (!event && mergeDefaults) {
        const value = serializer.read(rawValue);
        if (typeof mergeDefaults === "function")
          return mergeDefaults(value, rawInit);
        else if (type === "object" && !Array.isArray(value))
          return { ...rawInit, ...value };
        return value;
      } else if (typeof rawValue !== "string") {
        return rawValue;
      } else {
        return serializer.read(rawValue);
      }
    }
    function update(event) {
      if (event && event.storageArea !== storage)
        return;
      if (event && event.key == null) {
        data.value = rawInit;
        return;
      }
      if (event && event.key !== keyComputed.value)
        return;
      pauseWatch();
      try {
        if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
          data.value = read(event);
      } catch (e) {
        onError(e);
      } finally {
        if (event)
          vue.nextTick(resumeWatch);
        else
          resumeWatch();
      }
    }
    function updateFromCustomEvent(event) {
      update(event.detail);
    }
    return data;
  }
  const STORAGE_KEY = "weibo-archiver";
  const createInitialConfig = () => DEFAULT_USER_CONFIG;
  const config = useStorage(
    STORAGE_KEY,
    createInitialConfig(),
    localStorage,
    { mergeDefaults: true }
  );
  function useConfig() {
    function updateConfig2(newConfig) {
      config.value = {
        ...config.value,
        ...newConfig
      };
    }
    function toggleMinimize() {
      config.value.isMinimize = !config.value.isMinimize;
    }
    function resetConfig() {
      const { user, isMinimize } = config.value;
      config.value = { ...createInitialConfig(), user, isMinimize };
    }
    vue.watch(config, (newConfig) => {
      const { startAt, endAt } = newConfig;
      if (startAt && endAt) {
        newConfig.startAt = new Date(startAt).getTime();
        newConfig.endAt = new Date(endAt).getTime();
      }
    }, { immediate: true });
    return {
      config,
      updateConfig: updateConfig2,
      toggleMinimize,
      resetConfig
    };
  }
  const { updateConfig: updateConfig$1 } = useConfig();
  function usePost() {
    async function initializeDB() {
      var _a2;
      if (!config.value.user) {
        return;
      }
      await idb.setCurUser(((_a2 = config.value.user) == null ? void 0 : _a2.uid) || "0");
      if (!idb.curUser) {
        await idb.addUser(vue.toRaw(config.value.user));
      }
      await getFetchCount();
      console.log("DB initialized", idb.curUser, config.value);
    }
    async function getFetchCount() {
      fetchCount.value = {
        posts: await idb.getAllPostsCount(),
        favorites: await idb.getAllFavoritesCount(),
        followings: await idb.getAllFollowingsCount()
      };
    }
    async function resetState() {
      await idb.clearDB();
      fetchCount.value = {
        posts: 0,
        favorites: 0,
        followings: 0
      };
      updateConfig$1({
        curPage: 0
      });
    }
    async function addPosts(newPosts) {
      try {
        await idb.addPosts(newPosts);
        fetchCount.value.posts = await idb.getAllPostsCount();
        updateConfig$1({
          curPage: Math.ceil((fetchCount.value.posts + 1) / 20)
        });
      } catch (error) {
        console.error("Failed to add post:", error);
        throw new Error("Failed to add post to database");
      }
    }
    async function getLastPost() {
      return idb.getLatestPost();
    }
    async function getAllPosts() {
      return await idb.getAllPosts();
    }
    async function addUser(user) {
      userService.uid = user.uid;
      await idb.addUser(vue.toRaw(user));
      await idb.setCurUser(user.uid);
      await getFetchCount();
    }
    async function addFollowingUsers(followings) {
      fetchCount.value.followings = followings.length;
      await idb.addFollowings(followings);
    }
    async function addFavorites(favorites) {
      fetchCount.value.favorites = favorites.length;
      await idb.addFavorites(favorites);
    }
    async function exportAllData() {
      try {
        const { hasFavorites, hasFollowings, hasWeibo } = config.value;
        const weibo = hasWeibo ? await idb.getAllPosts() : [];
        const followings = hasFollowings ? await idb.getFollowings() : [];
        const favorites = hasFavorites ? await idb.getAllFavorites() : [];
        await exportData({
          weibo,
          favorites,
          followings,
          user: idb.curUser
        });
      } catch (error) {
        console.error("Failed to export data:", error);
        throw new Error("Failed to export data");
      }
    }
    return {
      initializeDB,
      addPosts,
      resetState,
      getAllPosts,
      getLastPost,
      addUser,
      exportAllData,
      addFollowingUsers,
      addFavorites
    };
  }
  const { updateConfig } = useConfig();
  const postStore = usePost();
  const fetchService = new FetchService();
  const userService = new UserService(fetchService, (_a = config.value.user) == null ? void 0 : _a.uid);
  const postService = new PostService(userService, fetchService);
  const fetchState = vue.reactive({
    status: "idle",
    fetchType: "weibo"
  });
  const fetchCount = vue.ref({
    posts: 0,
    followings: 0,
    favorites: 0
  });
  async function startFetch() {
    fetchState.status = "running";
    if (!config.value.restore) {
      await postStore.resetState();
    }
    const {
      isFetchAll,
      startAt,
      endAt,
      sinceId,
      curPage,
      hasRepost,
      hasComment,
      commentCount,
      repostPic,
      user,
      hasWeibo,
      hasFollowings,
      hasFavorites
    } = config.value;
    if (hasWeibo) {
      fetchState.fetchType = "weibo";
      await postService.getAllPosts({
        isFetchAll,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        sinceId,
        page: curPage,
        hasret: hasRepost ? "1" : "0",
        hasRepostPic: repostPic,
        commentsCount: hasComment ? commentCount : 0,
        async onFetched({ posts, page, sinceId: sinceId2 }) {
          const filtered = posts.filter((post) => {
            var _a2;
            if (hasRepost)
              return true;
            return !!((_a2 = post.retweet) == null ? void 0 : _a2.mblogid);
          });
          await postStore.addPosts(filtered);
          updateConfig({
            curPage: page,
            sinceId: sinceId2
          });
        }
      });
    }
    if (hasFollowings) {
      fetchState.fetchType = "followings";
      const followings = await userService.getFollowings(user.uid);
      await postStore.addFollowingUsers(followings);
    }
    if (hasFavorites) {
      fetchState.fetchType = "favorites";
      const data = await postService.getFavorites();
      await postStore.addFavorites(data);
    }
    fetchState.status = "finish";
  }
  const _hoisted_1$9 = { class: "stats rounded-xl items-center flex justify-between px-4 py-2 bg-base-100" };
  const _hoisted_2$7 = { class: "stat place-items-center" };
  const _hoisted_3$6 = { class: "stat-value" };
  const _hoisted_4$3 = { class: "stat place-items-center" };
  const _hoisted_5$3 = { class: "stat-value" };
  const _hoisted_6$3 = { class: "stat place-items-center" };
  const _hoisted_7$2 = { class: "stat-value" };
  const _hoisted_8$2 = { class: "stat place-items-center" };
  const _hoisted_9$2 = { class: "stat-value" };
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "FetchStats",
    setup(__props) {
      const postStore2 = usePost();
      const post = vue.ref();
      vue.onBeforeMount(async () => {
        post.value = await postStore2.getLastPost();
      });
      return (_ctx, _cache) => {
        var _a2;
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          _cache[4] || (_cache[4] = vue.createElementVNode("label", { class: "my-2 block" }, " 已爬取数量 ", -1)),
          vue.createElementVNode("div", _hoisted_1$9, [
            vue.createElementVNode("div", _hoisted_2$7, [
              _cache[0] || (_cache[0] = vue.createElementVNode("div", { class: "stat-title" }, " 微博 ", -1)),
              vue.createElementVNode("div", _hoisted_3$6, vue.toDisplayString(vue.unref(fetchCount).posts), 1)
            ]),
            vue.createElementVNode("div", _hoisted_4$3, [
              _cache[1] || (_cache[1] = vue.createElementVNode("div", { class: "stat-title" }, " 关注 ", -1)),
              vue.createElementVNode("div", _hoisted_5$3, vue.toDisplayString(vue.unref(fetchCount).followings), 1)
            ]),
            vue.createElementVNode("div", _hoisted_6$3, [
              _cache[2] || (_cache[2] = vue.createElementVNode("div", { class: "stat-title" }, " 收藏 ", -1)),
              vue.createElementVNode("div", _hoisted_7$2, vue.toDisplayString(vue.unref(fetchCount).favorites), 1)
            ]),
            vue.createElementVNode("div", _hoisted_8$2, [
              _cache[3] || (_cache[3] = vue.createElementVNode("div", { class: "stat-title" }, " 上次停止爬取的时间 ", -1)),
              vue.createElementVNode("div", _hoisted_9$2, vue.toDisplayString(((_a2 = post.value) == null ? void 0 : _a2.createdAt) ? vue.unref(formatDate)(post.value.createdAt, "YYYY年MM月DD日") : "暂无"), 1)
            ])
          ])
        ], 64);
      };
    }
  });
  const _hoisted_1$8 = { class: "flex items-center justify-center gap-2" };
  const _hoisted_2$6 = ["value", "max", "disabled"];
  const _hoisted_3$5 = ["value", "max", "disabled"];
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "DateRange",
    props: {
      start: { default: Date.now() },
      end: { default: Date.now() },
      disabled: { type: Boolean, default: false }
    },
    emits: ["change", "error"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const startAt = vue.ref(props.start);
      const endAt = vue.ref(props.end);
      const tomorrow = /* @__PURE__ */ new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const maxDate = toInputDate(tomorrow.getTime());
      vue.watch([startAt, endAt], ([_startAt, _endAt]) => {
        const start = new Date(_startAt).getTime() || Date.now();
        let end = new Date(_endAt).getTime() || Date.now();
        if (start > end) {
          end = start;
          endAt.value = startAt.value;
          emit("error", "结束时间不能小于开始时间");
        }
        emit("change", start, end);
      });
      function toInputDate(date) {
        return new Date(date).toISOString().split("T")[0];
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
          vue.createElementVNode("input", {
            value: toInputDate(_ctx.start),
            max: vue.unref(maxDate),
            type: "date",
            class: "input",
            disabled: _ctx.disabled,
            onChange: _cache[0] || (_cache[0] = (e) => {
              startAt.value = new Date(e.target.value).getTime();
            })
          }, null, 40, _hoisted_2$6),
          _cache[2] || (_cache[2] = vue.createElementVNode("span", null, " ~ ", -1)),
          vue.createElementVNode("input", {
            value: toInputDate(_ctx.end),
            max: vue.unref(maxDate),
            type: "date",
            class: "input",
            disabled: _ctx.disabled,
            onChange: _cache[1] || (_cache[1] = (e) => {
              endAt.value = new Date(e.target.value).getTime();
            })
          }, null, 40, _hoisted_3$5)
        ]);
      };
    }
  });
  const _hoisted_1$7 = {
    tabindex: "0",
    class: "bg-base-100 px-4 py-2 rounded-xl border-base-300 text-base-content! m-0!"
  };
  const _hoisted_2$5 = ["for"];
  const _hoisted_3$4 = {
    key: 0,
    class: "block text-[0.8rem] text-gray-500"
  };
  const _hoisted_4$2 = ["id", "onUpdate:modelValue", "disabled"];
  const _hoisted_5$2 = ["disabled"];
  const _hoisted_6$2 = ["value"];
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "Options",
    setup(__props) {
      const options = [
        {
          label: "导出全部微博",
          value: "isFetchAll",
          remark: "导出全部微博，不限制时间范围"
        },
        // {
        //   label: '使用原图',
        //   value: 'largePic',
        //   remark: '导出微博图片列表时使用原图',
        // },
        {
          label: "包含转发的微博",
          value: "hasRepost",
          remark: "导出微博时包含转发微博"
        },
        {
          label: "包含转发的图片",
          value: "repostPic",
          remark: "包含转发微博中的图片"
        },
        {
          label: "包含评论",
          value: "hasComment",
          remark: "导出微博时包含部分一级评论"
        },
        {
          label: "继续上次的记录",
          value: "restore",
          remark: "从上次终止的地方继续，不清除本地缓存"
        },
        {
          label: "导出收藏",
          value: "hasFavorites",
          remark: "导出自己收藏的微博，对其他人无效"
        },
        {
          label: "导出微博",
          value: "hasWeibo",
          remark: ""
        },
        {
          label: "导出关注列表",
          value: "hasFollowings",
          remark: ""
        }
      ];
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          _cache[5] || (_cache[5] = vue.createElementVNode("label", { class: "block mb-2" }, " 爬取设置 ", -1)),
          vue.createElementVNode("div", _hoisted_1$7, [
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(options, (option) => {
              var _a2;
              return vue.createElementVNode("div", {
                key: option.value,
                class: "flex items-center py-2"
              }, [
                vue.createElementVNode("label", {
                  for: option.value
                }, [
                  vue.createElementVNode("span", null, vue.toDisplayString(option.label), 1),
                  option.remark ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$4, vue.toDisplayString(option.remark), 1)) : vue.createCommentVNode("", true)
                ], 8, _hoisted_2$5),
                vue.withDirectives(vue.createElementVNode("input", {
                  id: option.value,
                  "onUpdate:modelValue": ($event) => vue.unref(config)[option.value] = $event,
                  type: "checkbox",
                  class: "toggle toggle-primary ml-auto",
                  disabled: (_a2 = option.disabled) == null ? void 0 : _a2.call(option, vue.unref(config))
                }, null, 8, _hoisted_4$2), [
                  [vue.vModelCheckbox, vue.unref(config)[option.value]]
                ])
              ]);
            }), 64)),
            _cache[3] || (_cache[3] = vue.createElementVNode("label", {
              for: "commentCount",
              class: "label my-2 font-semibold"
            }, " 评论获取数量 ", -1)),
            vue.withDirectives(vue.createElementVNode("select", {
              id: "commentCount",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(config).commentCount = $event),
              class: "select w-full px-4",
              disabled: !vue.unref(config).hasComment
            }, [
              _cache[2] || (_cache[2] = vue.createElementVNode("option", {
                disabled: "",
                selected: ""
              }, " 请选择 ", -1)),
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(4, (i) => {
                return vue.createElementVNode("option", {
                  key: i,
                  value: i * 5
                }, vue.toDisplayString(i * 5) + " 条 ", 9, _hoisted_6$2);
              }), 64))
            ], 8, _hoisted_5$2), [
              [vue.vModelSelect, vue.unref(config).commentCount]
            ]),
            _cache[4] || (_cache[4] = vue.createElementVNode("label", {
              for: "timeRange",
              class: "label my-2 font-semibold"
            }, " 导出的时间范围 ", -1)),
            vue.createVNode(_sfc_main$9, {
              disabled: vue.unref(config).isFetchAll,
              start: vue.unref(config).startAt,
              end: vue.unref(config).endAt,
              onChange: _cache[1] || (_cache[1] = (start, end) => {
                vue.unref(config).startAt = start;
                vue.unref(config).endAt = end;
              }),
              onError: console.log
            }, null, 8, ["disabled", "start", "end", "onError"])
          ])
        ], 64);
      };
    }
  });
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  const toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  const toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const Icon = ({ size, strokeWidth = 2, absoluteStrokeWidth, color, iconNode, name, class: classes, ...props }, { slots }) => {
    return vue.h(
      "svg",
      {
        ...defaultAttributes,
        width: size || defaultAttributes.width,
        height: size || defaultAttributes.height,
        stroke: color || defaultAttributes.stroke,
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        class: mergeClasses(
          "lucide",
          ...name ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`] : ["lucide-icon"]
        ),
        ...props
      },
      [...iconNode.map((child) => vue.h(...child)), ...slots.default ? [slots.default()] : []]
    );
  };
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const createLucideIcon = (iconName, iconNode) => (props, { slots }) => vue.h(
    Icon,
    {
      ...props,
      iconNode,
      name: iconName
    },
    slots
  );
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const ArrowUpRight = createLucideIcon("arrow-up-right", [
    ["path", { d: "M7 7h10v10", key: "1tivn9" }],
    ["path", { d: "M7 17 17 7", key: "1vkiza" }]
  ]);
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const Download = createLucideIcon("download", [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]);
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const Minimize2 = createLucideIcon("minimize-2", [
    ["path", { d: "m14 10 7-7", key: "oa77jy" }],
    ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
  ]);
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const Search = createLucideIcon("search", [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]);
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const Settings = createLucideIcon("settings", [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ]);
  /**
   * @license lucide-vue-next v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const X = createLucideIcon("x", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]);
  const _hoisted_1$6 = { class: "relative" };
  const _hoisted_2$4 = ["src", "alt"];
  const _hoisted_3$3 = {
    key: 0,
    class: "skeleton h-full w-full"
  };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "LazyImage",
    props: {
      src: {},
      alt: {},
      imgClass: {}
    },
    setup(__props) {
      const props = __props;
      const imgRef = vue.useTemplateRef("imgRef");
      const isLoading = vue.ref(true);
      vue.onMounted(() => {
        const img = imgRef.value;
        if (!img)
          return;
        img.onload = () => {
          isLoading.value = false;
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
          vue.withDirectives(vue.createElementVNode("img", {
            ref_key: "imgRef",
            ref: imgRef,
            src: _ctx.src,
            alt: _ctx.alt,
            class: vue.normalizeClass([props.imgClass, "lazy-image"])
          }, null, 10, _hoisted_2$4), [
            [vue.vShow, !isLoading.value]
          ]),
          isLoading.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$3)) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$5 = { class: "flex flex-col gap-2" };
  const _hoisted_2$3 = { class: "input w-full" };
  const _hoisted_3$2 = {
    key: 0,
    class: "bg-base-100 max-h-56 flex flex-col gap-1 overflow-y-auto rounded-lg p-2"
  };
  const _hoisted_4$1 = {
    key: 0,
    class: "text-sm text-center"
  };
  const _hoisted_5$1 = ["onClick"];
  const _hoisted_6$1 = ["href"];
  const _hoisted_7$1 = { class: "flex flex-col" };
  const _hoisted_8$1 = { class: "text-sm font-bold" };
  const _hoisted_9$1 = { class: "text-xs text-gray-500" };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "SearchUser",
    setup(__props) {
      var _a2;
      const { config: config2 } = useConfig();
      const postStore2 = usePost();
      const searchText = vue.ref(((_a2 = config2.value.user) == null ? void 0 : _a2.name) || "");
      const searchResult = vue.ref([]);
      const isFinish = vue.ref(false);
      async function searchUser() {
        isFinish.value = false;
        const isUid = /^\d+$/.test(searchText.value);
        const users = isUid ? await userService.getDetail(searchText.value).then((user) => [user]) : await userService.searchUser(searchText.value);
        console.log(users);
        searchResult.value = users;
        isFinish.value = true;
      }
      async function setUser(user) {
        searchText.value = user.name;
        searchResult.value = [];
        config2.value.user = user;
        isFinish.value = false;
        await postStore2.addUser(user);
      }
      vue.watch(searchText, (value) => {
        if (value.length === 0) {
          searchResult.value = [];
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
          _cache[3] || (_cache[3] = vue.createElementVNode("label", { class: "" }, " 搜索用户 ", -1)),
          vue.createElementVNode("label", _hoisted_2$3, [
            _cache[2] || (_cache[2] = vue.createElementVNode("span", { class: "label" }, " 当前用户 ", -1)),
            vue.withDirectives(vue.createElementVNode("input", {
              id: "wa-search-user",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchText.value = $event),
              type: "search",
              required: "",
              placeholder: "搜索昵称或数字 id",
              onKeyup: vue.withKeys(searchUser, ["enter"])
            }, null, 544), [
              [vue.vModelText, searchText.value]
            ]),
            vue.createVNode(vue.unref(Search), {
              class: "h-[1em] cursor-pointer",
              onClick: searchUser
            })
          ]),
          isFinish.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$2, [
            searchResult.value.length < 1 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, " 暂无结果，可以试试搜索用户的数字 id ")) : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(searchResult.value, (user) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: user.uid,
                class: "hover:bg-base-300 flex cursor-pointer items-center gap-2 rounded-lg p-2",
                onClick: ($event) => setUser(user)
              }, [
                vue.createElementVNode("a", {
                  href: `https://weibo.com/u/${user.uid}`,
                  target: "_blank",
                  class: "avatar",
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                  }, ["stop"]))
                }, [
                  vue.createVNode(_sfc_main$7, {
                    src: user.avatar,
                    alt: user.name,
                    class: "h-8 w-8 rounded-full"
                  }, null, 8, ["src", "alt"])
                ], 8, _hoisted_6$1),
                vue.createElementVNode("div", _hoisted_7$1, [
                  vue.createElementVNode("div", _hoisted_8$1, vue.toDisplayString(user.name), 1),
                  vue.createElementVNode("div", _hoisted_9$1, " uid: " + vue.toDisplayString(user.uid) + "；粉丝：" + vue.toDisplayString(vue.unref(formatNumber)(user.followers)), 1)
                ])
              ], 8, _hoisted_5$1);
            }), 128))
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$4 = { class: "mt-4 flex flex-col gap-2" };
  const _hoisted_2$2 = {
    key: 1,
    class: "loading loading-spinner loading-sm"
  };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "StartButton",
    setup(__props) {
      const postStore2 = usePost();
      const buttonText = vue.computed(() => {
        var _a2;
        const name = ((_a2 = config.value.user) == null ? void 0 : _a2.name) || "未设置";
        const type = config.value.isFetchAll ? "全部" : "部分";
        const statusText = fetchState.status === "idle" ? "开始" : "正在";
        if (fetchState.status === "finish") {
          return `已完成，导出中`;
        }
        return `${statusText}获取 @${name} 的${type}微博`;
      });
      async function handleStartExport() {
        if (fetchState.status === "running") {
          return;
        }
        await startFetch();
        await postStore2.exportAllData();
        fetchState.status = "idle";
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          vue.createElementVNode("button", {
            class: "btn btn-primary",
            onClick: handleStartExport
          }, [
            vue.unref(fetchState).status === "idle" ? (vue.openBlock(), vue.createBlock(vue.unref(Download), {
              key: 0,
              class: "mr-2 h-5 w-5"
            })) : vue.createCommentVNode("", true),
            vue.unref(fetchState).status === "running" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$2)) : vue.createCommentVNode("", true),
            vue.createElementVNode("span", null, vue.toDisplayString(buttonText.value), 1)
          ]),
          vue.createElementVNode("button", {
            class: "btn btn-outline",
            onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(postStore2).exportAllData())
          }, " 直接导出缓存数据 ")
        ]);
      };
    }
  });
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "Logo",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$7, {
          src: "https://p.chilfish.top/weibo/icon.webp",
          alt: "Weibo archiver logo",
          class: "rounded-xm h-10 w-10"
        });
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {};
  const _hoisted_1$3 = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none",
    class: "tabler-icon tabler-icon-brand-github-filled [&>path]:stroke-0"
  };
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _cache[0] || (_cache[0] = [
      vue.createElementVNode("path", { d: "M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" }, null, -1)
    ]));
  }
  const Github = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render]]);
  const __vite_import_meta_env__ = { "VITE_APP_VERSION": "0.6.0" };
  const _hoisted_1$2 = { class: "modal-box p-3" };
  const _hoisted_2$1 = { class: "flex items-center gap-2 pb-4" };
  const _hoisted_3$1 = { class: "bg-base-200 card my-2 rounded-lg p-2 shadow-sm" };
  const _hoisted_4 = { class: "cell" };
  const _hoisted_5 = ["value"];
  const _hoisted_6 = { class: "card bg-base-200 my-2 rounded-lg p-2 shadow-sm" };
  const _hoisted_7 = { class: "cell" };
  const _hoisted_8 = {
    key: 0,
    class: "badge badge-primary badge-soft ml-2"
  };
  const _hoisted_9 = {
    class: "btn-ghost btn-circle w-fit px-2 btn text-primary!",
    href: "https://github.com/Chilfish/Weibo-archiver",
    target: "_blank"
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "Setting",
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const {
        VITE_APP_VERSION
      } = __vite_import_meta_env__;
      const THEMES = [
        "light",
        "system",
        "cupcake",
        "dark",
        "emerald",
        "valentine",
        "lofi",
        "dracula",
        "cmyk",
        "business",
        "winter"
      ];
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", _hoisted_1$2, [
            vue.createElementVNode("h3", _hoisted_2$1, [
              vue.createElementVNode("button", {
                class: "btn-ghost btn-circle btn",
                onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
              }, [
                vue.createVNode(vue.unref(X))
              ]),
              _cache[2] || (_cache[2] = vue.createElementVNode("span", { class: "text-lg font-bold" }, " Settings ", -1))
            ]),
            _cache[6] || (_cache[6] = vue.createElementVNode("label", { class: "label text-sm font-semibold" }, " 通用 ", -1)),
            vue.createElementVNode("div", _hoisted_3$1, [
              vue.createElementVNode("div", _hoisted_4, [
                _cache[3] || (_cache[3] = vue.createElementVNode("label", null, "主题", -1)),
                vue.withDirectives(vue.createElementVNode("select", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(config).theme = $event),
                  class: "select select-bordered w-fit"
                }, [
                  (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(THEMES, (theme) => {
                    return vue.createElementVNode("option", {
                      key: theme,
                      value: theme
                    }, vue.toDisplayString(theme), 9, _hoisted_5);
                  }), 64))
                ], 512), [
                  [vue.vModelSelect, vue.unref(config).theme]
                ])
              ])
            ]),
            _cache[7] || (_cache[7] = vue.createElementVNode("label", { class: "label text-sm font-semibold" }, " 关于 ", -1)),
            vue.createElementVNode("div", _hoisted_6, [
              vue.createElementVNode("div", _hoisted_7, [
                vue.createElementVNode("div", null, [
                  _cache[4] || (_cache[4] = vue.createTextVNode(" 版本 ")),
                  vue.unref(VITE_APP_VERSION) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, " v" + vue.toDisplayString(vue.unref(VITE_APP_VERSION)), 1)) : vue.createCommentVNode("", true)
                ]),
                vue.createElementVNode("a", _hoisted_9, [
                  vue.createVNode(Github),
                  _cache[5] || (_cache[5] = vue.createTextVNode(" Github "))
                ])
              ])
            ])
          ]),
          _cache[8] || (_cache[8] = vue.createElementVNode("form", {
            method: "dialog",
            class: "modal-backdrop"
          }, [
            vue.createElementVNode("button", null, "close")
          ], -1))
        ], 64);
      };
    }
  });
  const Setting = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6ba3e729"]]);
  const _hoisted_1$1 = { class: "flex items-center pb-2" };
  const _hoisted_2 = { class: "ml-4 mr-auto flex flex-col" };
  const _hoisted_3 = {
    href: "https://weibo-archiver.chilfish.top",
    target: "_blank",
    class: "text-[0.7rem] text-gray-500!"
  };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "Header",
    setup(__props) {
      const { toggleMinimize } = useConfig();
      const settingsDialog = vue.useTemplateRef("settingsDialog");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("header", _hoisted_1$1, [
            vue.createVNode(_sfc_main$4),
            vue.createElementVNode("h2", _hoisted_2, [
              _cache[4] || (_cache[4] = vue.createElementVNode("span", { class: "text-lg font-bold" }, " Weibo archiver ", -1)),
              vue.createElementVNode("a", _hoisted_3, [
                _cache[3] || (_cache[3] = vue.createTextVNode(" 在预览网站导入数据 ")),
                vue.createVNode(vue.unref(ArrowUpRight), { class: "inline-block h-4 w-4" })
              ])
            ]),
            vue.createElementVNode("button", {
              class: "btn-sm btn-ghost btn-circle mr-1 btn",
              onClick: _cache[0] || (_cache[0] = ($event) => {
                var _a2;
                return (_a2 = settingsDialog.value) == null ? void 0 : _a2.showModal();
              })
            }, [
              vue.createVNode(vue.unref(Settings), { class: "h-4 w-4" })
            ]),
            vue.createElementVNode("button", {
              class: "btn-sm btn-ghost btn-circle btn",
              onClick: _cache[1] || (_cache[1] = //@ts-ignore
              (...args) => vue.unref(toggleMinimize) && vue.unref(toggleMinimize)(...args))
            }, [
              vue.createVNode(vue.unref(Minimize2), { class: "h-4 w-4" })
            ])
          ]),
          vue.createElementVNode("dialog", {
            ref_key: "settingsDialog",
            ref: settingsDialog,
            class: "modal"
          }, [
            vue.createVNode(Setting, {
              onClose: _cache[2] || (_cache[2] = ($event) => {
                var _a2;
                return (_a2 = settingsDialog.value) == null ? void 0 : _a2.close();
              })
            })
          ], 512)
        ], 64);
      };
    }
  });
  const _hoisted_1 = ["data-theme"];
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const { toggleMinimize } = useConfig();
      const postStore2 = usePost();
      const isLoading = vue.ref(false);
      vue.onBeforeMount(async () => {
        isLoading.value = true;
        await postStore2.initializeDB();
        isLoading.value = false;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          !isLoading.value ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "fixed-card bg-base-200 text-base-content max-h-[80vh] w-96 gap-2 overflow-x-hidden overflow-y-auto border-2 border-gray-200 rounded-lg p-4 shadow-2xl space-y-2",
            "data-theme": vue.unref(config).theme
          }, [
            vue.createVNode(_sfc_main$1),
            vue.createVNode(_sfc_main$6),
            vue.createVNode(_sfc_main$8),
            vue.createVNode(_sfc_main$a),
            vue.createVNode(_sfc_main$5)
          ], 8, _hoisted_1)), [
            [vue.vShow, !vue.unref(config).isMinimize]
          ]) : vue.createCommentVNode("", true),
          vue.withDirectives(vue.createVNode(_sfc_main$4, {
            class: "fixed-card h-12 w-12 border-2 border-gray-200 rounded-lg shadow-2xl",
            onClick: vue.unref(toggleMinimize)
          }, null, 8, ["onClick"]), [
            [vue.vShow, vue.unref(config).isMinimize]
          ])
        ], 64);
      };
    }
  });
  const app = vue.createApp(_sfc_main);
  const div = document.createElement("div");
  div.id = "plugin-app";
  document.body.append(div);
  app.mount(div);
  console.log("weibo-archiver 加载成功");

})(Vue, axios, saveAs, Dexie);