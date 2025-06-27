// ==UserScript==
// @name         Weibo Archiver
// @namespace    chilfish/monkey
// @version      0.6.1
// @author       Chilfish
// @description  将你的新浪微博存档备份的油猴脚本，为号被完全夹没前绸缪 😭
// @license      MIT
// @icon         https://p.chilfish.top/weibo/icon.webp
// @homepage     https://github.com/Chilfish/Weibo-archiver
// @source       https://github.com/Chilfish/Weibo-archiver/tree/main/packages/monkey
// @supportURL   https://github.com/Chilfish/Weibo-archiver/issues
// @downloadURL  https://github.com/Chilfish/Weibo-archiver/releases/latest/download/weibo-archiver.user.js
// @updateURL    https://github.com/Chilfish/Weibo-archiver/releases/latest/download/weibo-archiver.meta.js
// @match        https://weibo.com/*
// @require      https://unpkg.com/vue@3.5.14/dist/vue.global.prod.js
// @require      https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://unpkg.com/axios@1.9.0/dist/axios.min.js
// @require      https://unpkg.com/dexie@4.0.11/dist/dexie.min.js
// @grant        GM_addStyle
// ==/UserScript==

(r=>{if(typeof GM_addStyle=="function"){GM_addStyle(r);return}const a=document.createElement("style");a.textContent=r,document.head.append(a)})(` .stats .stat{padding-block:0;padding-inline:0;width:-moz-fit-content;width:fit-content}.stat-value{font-size:1rem!important}.cell[data-v-6ba3e729]{display:flex;align-items:center;justify-content:space-between;padding:.3rem .2rem}#weibo-archiver-plugin{z-index:100;position:relative;width:100%;height:100%;font-size:13px!important}.fixed-card{position:fixed;right:1rem;top:5rem;transition:all .3s ease-in-out;z-index:1000}.fixed-card::-webkit-scrollbar{width:8px;height:8px}.fixed-card::-webkit-scrollbar-track{border-radius:8px;background-color:transparent}.fixed-card::-webkit-scrollbar-thumb{border-radius:8px;background-color:#7a797963}.fixed-card{scrollbar-width:thin!important}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:root,[data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0% 0 0)){:root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){:root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}html{-webkit-tap-highlight-color:transparent}*{scrollbar-color:color-mix(in oklch,currentColor 35%,transparent) transparent}*:hover{scrollbar-color:color-mix(in oklch,currentColor 60%,transparent) transparent}#weibo-archiver-plugin{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}@media (prefers-color-scheme: dark){#weibo-archiver-plugin{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}}[data-theme=light]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}[data-theme=cupcake]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 15.2344% .017892 200.026556;--sc: 15.787% .020249 356.29965;--ac: 15.8762% .029206 78.618794;--nc: 84.7148% .013247 313.189598;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--p: 76.172% .089459 200.026556;--s: 78.9351% .101246 356.29965;--a: 79.3811% .146032 78.618794;--n: 23.5742% .066235 313.189598;--b1: 97.7882% .00418 56.375637;--b2: 93.9822% .007638 61.449292;--b3: 91.5861% .006811 53.440502;--bc: 23.5742% .066235 313.189598;--rounded-btn: 1.9rem;--tab-border: 2px;--tab-radius: .7rem}[data-theme=dark]{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}[data-theme=emerald]{color-scheme:light;--b2: 93% 0 0;--b3: 86% 0 0;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 76.6626% .135433 153.450024;--pc: 33.3872% .040618 162.240129;--s: 61.3028% .202368 261.294233;--sc: 100% 0 0;--a: 72.7725% .149783 33.200363;--ac: 0% 0 0;--n: 35.5192% .032071 262.988584;--nc: 98.4625% .001706 247.838921;--b1: 100% 0 0;--bc: 35.5192% .032071 262.988584;--animation-btn: 0;--animation-input: 0;--btn-focus-scale: 1}[data-theme=valentine]{color-scheme:light;--b2: 88.0567% .024834 337.06289;--b3: 81.4288% .022964 337.06289;--pc: 13.7239% .030755 15.066527;--sc: 14.3942% .029258 293.189609;--ac: 14.2537% .014961 197.828857;--inc: 90.923% .043042 262.880917;--suc: 12.541% .033982 149.213788;--wac: 13.3168% .031484 58.31834;--erc: 14.614% .0414 27.33;--rounded-box: 1rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--p: 68.6197% .153774 15.066527;--s: 71.971% .14629 293.189609;--a: 71.2685% .074804 197.828857;--n: 54.6053% .143342 358.004839;--nc: 90.2701% .037202 336.955191;--b1: 94.6846% .026703 337.06289;--bc: 37.3085% .081131 4.606426;--in: 54.615% .215208 262.880917;--su: 62.7052% .169912 149.213788;--wa: 66.584% .157422 58.31834;--er: 73.07% .207 27.33;--rounded-btn: 1.9rem;--tab-radius: .7rem}[data-theme=lofi]{color-scheme:light;--inc: 15.908% .0206 205.9;--suc: 18.026% .0306 164.14;--wac: 17.674% .027 79.94;--erc: 15.732% .03 28.47;--border-btn: 1px;--tab-border: 1px;--p: 15.9066% 0 0;--pc: 100% 0 0;--s: 21.455% .001566 17.278957;--sc: 100% 0 0;--a: 26.8618% 0 0;--ac: 100% 0 0;--n: 0% 0 0;--nc: 100% 0 0;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.268% .001082 17.17934;--bc: 0% 0 0;--in: 79.54% .103 205.9;--su: 90.13% .153 164.14;--wa: 88.37% .135 79.94;--er: 78.66% .15 28.47;--rounded-box: .25rem;--rounded-btn: .125rem;--rounded-badge: .125rem;--tab-radius: .125rem;--animation-btn: 0;--animation-input: 0;--btn-focus-scale: 1}[data-theme=dracula]{color-scheme:dark;--b2: 26.8053% .020556 277.508664;--b3: 24.7877% .019009 277.508664;--pc: 15.0922% .036614 346.812432;--sc: 14.8405% .029709 301.883095;--ac: 16.6785% .024826 66.558491;--nc: 87.8891% .006515 275.524078;--inc: 17.6526% .018676 212.846491;--suc: 17.4199% .043903 148.024881;--wac: 19.1068% .026849 112.757109;--erc: 13.6441% .041266 24.430965;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 75.4611% .18307 346.812432;--s: 74.2023% .148546 301.883095;--a: 83.3927% .124132 66.558491;--n: 39.4456% .032576 275.524078;--b1: 28.8229% .022103 277.508664;--bc: 97.7477% .007913 106.545019;--in: 88.263% .09338 212.846491;--su: 87.0995% .219516 148.024881;--wa: 95.5338% .134246 112.757109;--er: 68.2204% .206328 24.430965}[data-theme=cmyk]{color-scheme:light;--b2: 93% 0 0;--b3: 86% 0 0;--bc: 20% 0 0;--pc: 14.3544% .02666 239.443325;--sc: 12.8953% .040552 359.339283;--ac: 18.8458% .037948 105.306968;--nc: 84.3557% 0 0;--inc: 13.6952% .0189 217.284104;--suc: 89.3898% .032505 321.406278;--wac: 14.2473% .031969 52.023412;--erc: 12.4027% .041677 28.717543;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 71.7722% .133298 239.443325;--s: 64.4766% .202758 359.339283;--a: 94.2289% .189741 105.306968;--n: 21.7787% 0 0;--b1: 100% 0 0;--in: 68.4759% .094499 217.284104;--su: 46.949% .162524 321.406278;--wa: 71.2364% .159843 52.023412;--er: 62.0133% .208385 28.717543}[data-theme=business]{color-scheme:dark;--b2: 22.6487% 0 0;--b3: 20.944% 0 0;--bc: 84.8707% 0 0;--pc: 88.3407% .019811 251.473931;--sc: 12.8185% .005481 229.389418;--ac: 13.4542% .033545 35.791525;--nc: 85.4882% .00265 253.041249;--inc: 12.5233% .028702 240.033697;--suc: 14.0454% .018919 156.59611;--wac: 15.4965% .023141 81.519177;--erc: 90.3221% .029356 29.674507;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 41.7036% .099057 251.473931;--s: 64.0924% .027405 229.389418;--a: 67.271% .167726 35.791525;--n: 27.441% .01325 253.041249;--b1: 24.3535% 0 0;--in: 62.6163% .143511 240.033697;--su: 70.2268% .094594 156.59611;--wa: 77.4824% .115704 81.519177;--er: 51.6105% .14678 29.674507;--rounded-box: .25rem;--rounded-btn: .125rem;--rounded-badge: .125rem}[data-theme=winter]{color-scheme:light;--pc: 91.372% .051 257.57;--sc: 88.5103% .03222 282.339433;--ac: 11.988% .038303 335.171434;--nc: 83.9233% .012704 257.651965;--inc: 17.6255% .017178 214.515264;--suc: 16.0988% .015404 197.823719;--wac: 17.8345% .009167 71.47031;--erc: 14.6185% .022037 20.076293;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 56.86% .255 257.57;--s: 42.5516% .161098 282.339433;--a: 59.9398% .191515 335.171434;--n: 19.6166% .063518 257.651965;--b1: 100% 0 0;--b2: 97.4663% .011947 259.822565;--b3: 93.2686% .016223 262.751375;--bc: 41.8869% .053885 255.824911;--in: 88.1275% .085888 214.515264;--su: 80.4941% .077019 197.823719;--wa: 89.1725% .045833 71.47031;--er: 73.0926% .110185 20.076293}.avatar{position:relative;display:inline-flex}.avatar>div{display:block;aspect-ratio:1 / 1;overflow:hidden}.avatar img{height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.avatar.placeholder>div{display:flex;align-items:center;justify-content:center}.badge{display:inline-flex;align-items:center;justify-content:center;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s;height:1.25rem;font-size:.875rem;line-height:1.25rem;width:-moz-fit-content;width:fit-content;padding-left:.563rem;padding-right:.563rem;border-radius:var(--rounded-badge, 1.9rem);border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}@media (hover:hover){.label a:hover{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}}.btn{display:inline-flex;height:3rem;min-height:3rem;flex-shrink:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;justify-content:center;border-radius:var(--rounded-btn, .5rem);border-color:transparent;border-color:oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;text-align:center;font-size:.875rem;line-height:1em;gap:.5rem;font-weight:600;text-decoration-line:none;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);border-width:var(--border-btn, 1px);transition-property:color,background-color,border-color,opacity,box-shadow,transform;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:var(--fallback-bc,oklch(var(--bc)/1));background-color:oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));--tw-bg-opacity: 1;--tw-border-opacity: 1}.btn-disabled,.btn[disabled],.btn:disabled{pointer-events:none}.btn-circle{height:3rem;width:3rem;border-radius:9999px;padding:0}:where(.btn:is(input[type=checkbox])),:where(.btn:is(input[type=radio])){width:auto;-webkit-appearance:none;-moz-appearance:none;appearance:none}.btn:is(input[type=checkbox]):after,.btn:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}.card{position:relative;display:flex;flex-direction:column;border-radius:var(--rounded-box, 1rem)}.card:focus{outline:2px solid transparent;outline-offset:2px}.card figure{display:flex;align-items:center;justify-content:center}.card.image-full{display:grid}.card.image-full:before{position:relative;content:"";z-index:10;border-radius:var(--rounded-box, 1rem);--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));opacity:.75}.card.image-full:before,.card.image-full>*{grid-column-start:1;grid-row-start:1}.card.image-full>figure img{height:100%;-o-object-fit:cover;object-fit:cover}.card.image-full>.card-body{position:relative;z-index:20;--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}.checkbox{flex-shrink:0;--chkbg: var(--fallback-bc,oklch(var(--bc)/1));--chkfg: var(--fallback-b1,oklch(var(--b1)/1));height:1.5rem;width:1.5rem;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2}@media (hover: hover){.btm-nav>*.disabled:hover,.btm-nav>*[disabled]:hover{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btn:hover{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn:hover{background-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,black);border-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,black)}}@supports not (color: oklch(0% 0 0)){.btn:hover{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}}.btn.glass:hover{--glass-opacity: 25%;--glass-border-opacity: 15%}.btn-ghost:hover{border-color:transparent}@supports (color: oklch(0% 0 0)){.btn-ghost:hover{background-color:var(--fallback-bc,oklch(var(--bc)/.2))}}.btn-outline:hover{--tw-border-opacity: 1;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-b1,oklch(var(--b1)/var(--tw-text-opacity)))}.btn-outline.btn-primary:hover{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-primary:hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}.btn-outline.btn-secondary:hover{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-secondary:hover{background-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black)}}.btn-outline.btn-accent:hover{--tw-text-opacity: 1;color:var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-accent:hover{background-color:color-mix(in oklab,var(--fallback-a,oklch(var(--a)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-a,oklch(var(--a)/1)) 90%,black)}}.btn-outline.btn-success:hover{--tw-text-opacity: 1;color:var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-success:hover{background-color:color-mix(in oklab,var(--fallback-su,oklch(var(--su)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-su,oklch(var(--su)/1)) 90%,black)}}.btn-outline.btn-info:hover{--tw-text-opacity: 1;color:var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-info:hover{background-color:color-mix(in oklab,var(--fallback-in,oklch(var(--in)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-in,oklch(var(--in)/1)) 90%,black)}}.btn-outline.btn-warning:hover{--tw-text-opacity: 1;color:var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-warning:hover{background-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black)}}.btn-outline.btn-error:hover{--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-error:hover{background-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black)}}.btn-disabled:hover,.btn[disabled]:hover,.btn:disabled:hover{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}@supports (color: color-mix(in oklab,black,black)){.btn:is(input[type=checkbox]:checked):hover,.btn:is(input[type=radio]:checked):hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}}.label{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;justify-content:space-between;padding:.5rem .25rem}.input{flex-shrink:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:3rem;padding-left:1rem;padding-right:1rem;font-size:1rem;line-height:2;line-height:1.5rem;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.input[type=number]::-webkit-inner-spin-button,.input-md[type=number]::-webkit-inner-spin-button{margin-top:-1rem;margin-bottom:-1rem;margin-inline-end:-1rem}.menu li.disabled{cursor:not-allowed;-webkit-user-select:none;-moz-user-select:none;user-select:none;color:var(--fallback-bc,oklch(var(--bc)/.3))}:where(.menu li) .badge{justify-self:end}.modal{pointer-events:none;position:fixed;top:0;right:0;bottom:0;left:0;margin:0;display:grid;height:100%;max-height:none;width:100%;max-width:none;justify-items:center;padding:0;opacity:0;overscroll-behavior:contain;z-index:999;background-color:transparent;color:inherit;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);transition-property:transform,opacity,visibility;overflow-y:hidden}:where(.modal){align-items:center}.modal-box{max-height:calc(100vh - 5em);grid-column-start:1;grid-row-start:1;width:91.666667%;max-width:32rem;--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-bottom-right-radius:var(--rounded-box, 1rem);border-bottom-left-radius:var(--rounded-box, 1rem);border-top-left-radius:var(--rounded-box, 1rem);border-top-right-radius:var(--rounded-box, 1rem);--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));padding:1.5rem;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s;box-shadow:#00000040 0 25px 50px -12px;overflow-y:auto;overscroll-behavior:contain}.modal-open,.modal:target,.modal-toggle:checked+.modal,.modal[open]{pointer-events:auto;visibility:visible;opacity:1}:root:has(:is(.modal-open,.modal:target,.modal-toggle:checked+.modal,.modal[open])){overflow:hidden;scrollbar-gutter:stable}.select{display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:3rem;min-height:3rem;padding-inline-start:1rem;padding-inline-end:2.5rem;font-size:.875rem;line-height:1.25rem;line-height:2;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-size:4px 4px,4px 4px;background-repeat:no-repeat}.select[multiple]{height:auto}.stats{display:inline-grid;border-radius:var(--rounded-box, 1rem);--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}:where(.stats){grid-auto-flow:column;overflow-x:auto}.stat{display:inline-grid;width:100%;grid-template-columns:repeat(1,1fr);-moz-column-gap:1rem;column-gap:1rem;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .1;padding:1rem 1.5rem}.stat-title{grid-column-start:1;white-space:nowrap;color:var(--fallback-bc,oklch(var(--bc)/.6))}.stat-value{grid-column-start:1;white-space:nowrap;font-size:2.25rem;line-height:2.5rem;font-weight:800}.toggle{flex-shrink:0;--tglbg: var(--fallback-b1,oklch(var(--b1)/1));--handleoffset: 1.5rem;--handleoffsetcalculator: calc(var(--handleoffset) * -1);--togglehandleborder: 0 0;height:1.5rem;width:3rem;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-badge, 1.9rem);border-width:1px;border-color:currentColor;background-color:currentColor;color:var(--fallback-bc,oklch(var(--bc)/.5));transition:background,box-shadow var(--animation-input, .2s) ease-out;box-shadow:var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset,var(--togglehandleborder)}.avatar-group :where(.avatar){overflow:hidden;border-radius:9999px;border-width:4px;--tw-border-opacity: 1;border-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-border-opacity)))}.badge-primary{--tw-border-opacity: 1;border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.badge-outline.badge-primary{--tw-text-opacity: 1;color:var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))}.btm-nav>*.disabled,.btm-nav>*[disabled]{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btm-nav>* .label{font-size:1rem;line-height:1.5rem}@media (prefers-reduced-motion: no-preference){.btn{animation:button-pop var(--animation-btn, .25s) ease-out}}.btn:active:hover,.btn:active:focus{animation:button-pop 0s ease-out;transform:scale(var(--btn-focus-scale, .97))}@supports not (color: oklch(0% 0 0)){.btn{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}.btn-primary{--btn-color: var(--fallback-p)}}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-primary.btn-active{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}.btn-outline.btn-secondary.btn-active{background-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 90%,black)}.btn-outline.btn-accent.btn-active{background-color:color-mix(in oklab,var(--fallback-a,oklch(var(--a)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-a,oklch(var(--a)/1)) 90%,black)}.btn-outline.btn-success.btn-active{background-color:color-mix(in oklab,var(--fallback-su,oklch(var(--su)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-su,oklch(var(--su)/1)) 90%,black)}.btn-outline.btn-info.btn-active{background-color:color-mix(in oklab,var(--fallback-in,oklch(var(--in)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-in,oklch(var(--in)/1)) 90%,black)}.btn-outline.btn-warning.btn-active{background-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 90%,black)}.btn-outline.btn-error.btn-active{background-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black)}}.btn:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px}.btn-primary{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)));outline-color:var(--fallback-p,oklch(var(--p)/1))}@supports (color: oklch(0% 0 0)){.btn-primary{--btn-color: var(--p)}}.btn.glass{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}.btn.glass.btn-active{--glass-opacity: 25%;--glass-border-opacity: 15%}.btn-ghost{border-width:1px;border-color:transparent;background-color:transparent;color:currentColor;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}.btn-ghost.btn-active{border-color:transparent;background-color:var(--fallback-bc,oklch(var(--bc)/.2))}.btn-outline{border-color:currentColor;background-color:transparent;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.btn-outline.btn-active{--tw-border-opacity: 1;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-b1,oklch(var(--b1)/var(--tw-text-opacity)))}.btn-outline.btn-primary{--tw-text-opacity: 1;color:var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))}.btn-outline.btn-primary.btn-active{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.btn-outline.btn-secondary{--tw-text-opacity: 1;color:var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)))}.btn-outline.btn-secondary.btn-active{--tw-text-opacity: 1;color:var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))}.btn-outline.btn-accent{--tw-text-opacity: 1;color:var(--fallback-a,oklch(var(--a)/var(--tw-text-opacity)))}.btn-outline.btn-accent.btn-active{--tw-text-opacity: 1;color:var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))}.btn-outline.btn-success{--tw-text-opacity: 1;color:var(--fallback-su,oklch(var(--su)/var(--tw-text-opacity)))}.btn-outline.btn-success.btn-active{--tw-text-opacity: 1;color:var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))}.btn-outline.btn-info{--tw-text-opacity: 1;color:var(--fallback-in,oklch(var(--in)/var(--tw-text-opacity)))}.btn-outline.btn-info.btn-active{--tw-text-opacity: 1;color:var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))}.btn-outline.btn-warning{--tw-text-opacity: 1;color:var(--fallback-wa,oklch(var(--wa)/var(--tw-text-opacity)))}.btn-outline.btn-warning.btn-active{--tw-text-opacity: 1;color:var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))}.btn-outline.btn-error{--tw-text-opacity: 1;color:var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)))}.btn-outline.btn-error.btn-active{--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))}.btn.btn-disabled,.btn[disabled],.btn:disabled{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btn:is(input[type=checkbox]:checked),.btn:is(input[type=radio]:checked){--tw-border-opacity: 1;border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.btn:is(input[type=checkbox]:checked):focus-visible,.btn:is(input[type=radio]:checked):focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}.card :where(figure:first-child){overflow:hidden;border-start-start-radius:inherit;border-start-end-radius:inherit;border-end-start-radius:unset;border-end-end-radius:unset}.card :where(figure:last-child){overflow:hidden;border-start-start-radius:unset;border-start-end-radius:unset;border-end-start-radius:inherit;border-end-end-radius:inherit}.card:focus-visible{outline:2px solid currentColor;outline-offset:2px}.card.bordered{border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}.card.compact .card-body{padding:1rem;font-size:.875rem;line-height:1.25rem}.card.image-full :where(figure){overflow:hidden;border-radius:inherit}.checkbox:focus{box-shadow:none}.checkbox:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/1))}.checkbox:disabled{border-width:0px;cursor:not-allowed;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.2}.checkbox:checked,.checkbox[aria-checked=true]{background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-color:var(--chkbg);background-image:linear-gradient(-45deg,transparent 65%,var(--chkbg) 65.99%),linear-gradient(45deg,transparent 75%,var(--chkbg) 75.99%),linear-gradient(-45deg,var(--chkbg) 40%,transparent 40.99%),linear-gradient(45deg,var(--chkbg) 30%,var(--chkfg) 30.99%,var(--chkfg) 40%,transparent 40.99%),linear-gradient(-45deg,var(--chkfg) 50%,var(--chkbg) 50.99%)}.checkbox:indeterminate{--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-image:linear-gradient(90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(-90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(0deg,var(--chkbg) 43%,var(--chkfg) 43%,var(--chkfg) 57%,var(--chkbg) 57%)}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}.input input{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));background-color:transparent}.input input:focus{outline:2px solid transparent;outline-offset:2px}.input[list]::-webkit-calendar-picker-indicator{line-height:1em}.input:focus,.input:focus-within{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.input:has(>input[disabled]),.input-disabled,.input:disabled,.input[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.input:has(>input[disabled])::-moz-placeholder,.input-disabled::-moz-placeholder,.input:disabled::-moz-placeholder,.input[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])::placeholder,.input-disabled::placeholder,.input:disabled::placeholder,.input[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])>input[disabled]{cursor:not-allowed}.input::-webkit-date-and-time-value{text-align:inherit}.join>:where(*:not(:first-child)):is(.btn){margin-inline-start:calc(var(--border-btn) * -1)}.loading{pointer-events:none;display:inline-block;aspect-ratio:1 / 1;width:1.5rem;background-color:currentColor;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")}.loading-spinner{-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform-origin='center'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='2s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dasharray' values='0,150;42,150;42,150' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3Canimate attributeName='stroke-dashoffset' values='0;-16;-59' keyTimes='0;0.475;1' dur='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")}.loading-sm{width:1.25rem}.mockup-phone .display{overflow:hidden;border-radius:40px;margin-top:-25px}.mockup-browser .mockup-browser-toolbar .input{position:relative;margin-left:auto;margin-right:auto;display:block;height:1.75rem;width:24rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));padding-left:2rem;direction:ltr}.mockup-browser .mockup-browser-toolbar .input:before{content:"";position:absolute;left:.5rem;top:50%;aspect-ratio:1 / 1;height:.75rem;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:2px;border-color:currentColor;opacity:.6}.mockup-browser .mockup-browser-toolbar .input:after{content:"";position:absolute;left:1.25rem;top:50%;height:.5rem;--tw-translate-y: 25%;--tw-rotate: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;border-color:currentColor;opacity:.6}.modal:not(dialog:not(.modal-open)),.modal::backdrop{background-color:#0006;animation:modal-pop .2s ease-out}.modal-backdrop{z-index:-1;grid-column-start:1;grid-row-start:1;display:grid;align-self:stretch;justify-self:stretch;color:transparent}.modal-open .modal-box,.modal-toggle:checked+.modal .modal-box,.modal:target .modal-box,.modal[open] .modal-box{--tw-translate-y: 0px;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes modal-pop{0%{opacity:0}}@keyframes progress-loading{50%{background-position-x:-115%}}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}.select-bordered{border-color:var(--fallback-bc,oklch(var(--bc)/.2))}.select:focus{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.select-disabled,.select:disabled,.select[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.select-disabled::-moz-placeholder,.select:disabled::-moz-placeholder,.select[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.select-disabled::placeholder,.select:disabled::placeholder,.select[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.select-multiple,.select[multiple],.select[size].select:not([size="1"]){background-image:none;padding-right:1rem}[dir=rtl] .select{background-position:calc(0% + 12px) calc(1px + 50%),calc(0% + 16px) calc(1px + 50%)}.skeleton{border-radius:var(--rounded-box, 1rem);--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)));will-change:background-position;animation:skeleton 1.8s ease-in-out infinite;background-image:linear-gradient(105deg,transparent 0%,transparent 40%,var(--fallback-b1,oklch(var(--b1)/1)) 50%,transparent 60%,transparent 100%);background-size:200% auto;background-repeat:no-repeat;background-position-x:-50%}@media (prefers-reduced-motion){.skeleton{animation-duration:15s}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}:where(.stats)>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 0;border-right-width:calc(1px * var(--tw-divide-x-reverse));border-left-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)));--tw-divide-y-reverse: 0;border-top-width:calc(0px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(0px * var(--tw-divide-y-reverse))}[dir=rtl] .stats>*:not([hidden])~*:not([hidden]){--tw-divide-x-reverse: 1}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}[dir=rtl] .toggle{--handleoffsetcalculator: calc(var(--handleoffset) * 1)}.toggle:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.toggle:hover{background-color:currentColor}.toggle:checked,.toggle[aria-checked=true]{background-image:none;--handleoffsetcalculator: var(--handleoffset);--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}[dir=rtl] .toggle:checked,[dir=rtl] .toggle[aria-checked=true]{--handleoffsetcalculator: calc(var(--handleoffset) * -1)}.toggle:indeterminate{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}[dir=rtl] .toggle:indeterminate{box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}.toggle-primary:focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}.toggle-primary:checked,.toggle-primary[aria-checked=true]{border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-border-opacity: .1;--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.toggle:disabled{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));background-color:transparent;opacity:.3;--togglehandleborder: 0 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset, var(--handleoffsetcalculator) 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset}.btn-sm{height:2rem;min-height:2rem;padding-left:.75rem;padding-right:.75rem;font-size:.875rem}.btn-square:where(.btn-sm){height:2rem;width:2rem;padding:0}.btn-circle:where(.btn-xs){height:1.5rem;width:1.5rem;border-radius:9999px;padding:0}.btn-circle:where(.btn-sm){height:2rem;width:2rem;border-radius:9999px;padding:0}.btn-circle:where(.btn-md){height:3rem;width:3rem;border-radius:9999px;padding:0}.btn-circle:where(.btn-lg){height:4rem;width:4rem;border-radius:9999px;padding:0}.avatar.online:before{content:"";position:absolute;z-index:10;display:block;border-radius:9999px;--tw-bg-opacity: 1;background-color:var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)));outline-style:solid;outline-width:2px;outline-color:var(--fallback-b1,oklch(var(--b1)/1));width:15%;height:15%;top:7%;right:7%}.avatar.offline:before{content:"";position:absolute;z-index:10;display:block;border-radius:9999px;--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)));outline-style:solid;outline-width:2px;outline-color:var(--fallback-b1,oklch(var(--b1)/1));width:15%;height:15%;top:7%;right:7%}.join.join-vertical>:where(*:not(:first-child)):is(.btn){margin-top:calc(var(--border-btn) * -1)}.join.join-horizontal>:where(*:not(:first-child)):is(.btn){margin-inline-start:calc(var(--border-btn) * -1);margin-top:0}.modal-top :where(.modal-box){width:100%;max-width:none;--tw-translate-y: -2.5rem;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-bottom-right-radius:var(--rounded-box, 1rem);border-bottom-left-radius:var(--rounded-box, 1rem);border-top-left-radius:0;border-top-right-radius:0}.modal-middle :where(.modal-box){width:91.666667%;max-width:32rem;--tw-translate-y: 0px;--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-top-left-radius:var(--rounded-box, 1rem);border-top-right-radius:var(--rounded-box, 1rem);border-bottom-right-radius:var(--rounded-box, 1rem);border-bottom-left-radius:var(--rounded-box, 1rem)}.modal-bottom :where(.modal-box){width:100%;max-width:none;--tw-translate-y: 2.5rem;--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-top-left-radius:var(--rounded-box, 1rem);border-top-right-radius:var(--rounded-box, 1rem);border-bottom-right-radius:0;border-bottom-left-radius:0}.fixed{position:fixed}.relative{position:relative}.my-2{margin-top:.5rem;margin-bottom:.5rem}.mb-2{margin-bottom:.5rem}.ml-2{margin-left:.5rem}.ml-4{margin-left:1rem}.ml-auto{margin-left:auto}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mr-auto{margin-right:auto}.mt-4{margin-top:1rem}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.h-12{height:3rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-8{height:2rem}.h-\\[1em\\]{height:1em}.h-full{height:100%}.max-h-56{max-height:14rem}.max-h-\\[80vh\\]{max-height:80vh}.w-12{width:3rem}.w-4{width:1rem}.w-5{width:1.25rem}.w-8{width:2rem}.w-96{width:24rem}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.place-items-center{place-items:center}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-xl{border-radius:.75rem}.border-2{border-width:2px}.border-base-300{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity, 1)))}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}.bg-base-100{--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity, 1)))}.bg-base-200{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity, 1)))}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-4{padding:1rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-2{padding-bottom:.5rem}.pb-4{padding-bottom:1rem}.text-center{text-align:center}.text-\\[0\\.7rem\\]{font-size:.7rem}.text-\\[0\\.8rem\\]{font-size:.8rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-base-content{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity, 1)))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.shadow-2xl{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}img{display:initial}.hover\\:bg-base-300:hover{--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity, 1)))}.disabled\\:text-red-400:disabled{--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity, 1))}.\\[\\&\\>path\\]\\:stroke-0>path{stroke-width:0} `);

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
  const _hoisted_3$7 = { class: "stat-value" };
  const _hoisted_4$4 = { class: "stat place-items-center" };
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
              vue.createElementVNode("div", _hoisted_3$7, vue.toDisplayString(vue.unref(fetchCount).posts), 1)
            ]),
            vue.createElementVNode("div", _hoisted_4$4, [
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
  const _hoisted_3$6 = ["value", "max", "disabled"];
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
          }, null, 40, _hoisted_3$6)
        ]);
      };
    }
  });
  const _hoisted_1$7 = {
    tabindex: "0",
    class: "bg-base-100 px-4 py-2 rounded-xl border-base-300 text-base-content! m-0!"
  };
  const _hoisted_2$5 = ["for"];
  const _hoisted_3$5 = {
    key: 0,
    class: "block text-[0.8rem] text-gray-500"
  };
  const _hoisted_4$3 = ["id", "onUpdate:modelValue", "disabled"];
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
                  option.remark ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$5, vue.toDisplayString(option.remark), 1)) : vue.createCommentVNode("", true)
                ], 8, _hoisted_2$5),
                vue.withDirectives(vue.createElementVNode("input", {
                  id: option.value,
                  "onUpdate:modelValue": ($event) => vue.unref(config)[option.value] = $event,
                  type: "checkbox",
                  class: "toggle toggle-primary ml-auto",
                  disabled: (_a2 = option.disabled) == null ? void 0 : _a2.call(option, vue.unref(config))
                }, null, 8, _hoisted_4$3), [
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
  const _hoisted_3$4 = {
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
          isLoading.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$4)) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$5 = { class: "flex flex-col gap-2" };
  const _hoisted_2$3 = { class: "input w-full" };
  const _hoisted_3$3 = {
    key: 0,
    class: "bg-base-100 max-h-56 flex flex-col gap-1 overflow-y-auto rounded-lg p-2"
  };
  const _hoisted_4$2 = {
    key: 0,
    class: "text-sm text-center"
  };
  const _hoisted_5$1 = { key: 1 };
  const _hoisted_6$1 = ["onClick"];
  const _hoisted_7$1 = ["href"];
  const _hoisted_8$1 = { class: "flex flex-col" };
  const _hoisted_9$1 = { class: "text-sm font-bold" };
  const _hoisted_10 = { class: "text-xs text-gray-500" };
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
          _cache[5] || (_cache[5] = vue.createElementVNode("label", { class: "" }, " 搜索用户 ", -1)),
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
          isFinish.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$3, [
            searchResult.value.length < 1 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$2, " 暂无结果，可以试试搜索用户的数字 uid ")) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$1, [
              vue.createTextVNode(" 搜索到 " + vue.toDisplayString(searchResult.value.length) + " 个结果，点击昵称以设置。 ", 1),
              _cache[3] || (_cache[3] = vue.createElementVNode("br", null, null, -1)),
              _cache[4] || (_cache[4] = vue.createTextVNode(" 若无满意结果，请尝试搜索ta的数字 uid。 "))
            ])),
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
                ], 8, _hoisted_7$1),
                vue.createElementVNode("div", _hoisted_8$1, [
                  vue.createElementVNode("div", _hoisted_9$1, " @" + vue.toDisplayString(user.name), 1),
                  vue.createElementVNode("div", _hoisted_10, " uid: " + vue.toDisplayString(user.uid) + "；粉丝：" + vue.toDisplayString(vue.unref(formatNumber)(user.followers)), 1)
                ])
              ], 8, _hoisted_6$1);
            }), 128))
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$4 = { class: "mt-4 flex flex-col gap-2" };
  const _hoisted_2$2 = ["disabled"];
  const _hoisted_3$2 = {
    key: 1,
    class: "loading loading-spinner loading-sm"
  };
  const _hoisted_4$1 = { class: "font-bold" };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "StartButton",
    setup(__props) {
      const postStore2 = usePost();
      const buttonText = vue.computed(() => {
        var _a2;
        const name = (_a2 = config.value.user) == null ? void 0 : _a2.name;
        if (!name) {
          return "未设置爬取的用户，请先在上面搜索";
        }
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
        var _a2;
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          vue.createElementVNode("button", {
            class: "btn btn-primary disabled:text-red-400",
            disabled: !((_a2 = vue.unref(config).user) == null ? void 0 : _a2.name),
            onClick: handleStartExport
          }, [
            vue.unref(fetchState).status === "idle" ? (vue.openBlock(), vue.createBlock(vue.unref(Download), {
              key: 0,
              class: "mr-2 h-5 w-5"
            })) : vue.createCommentVNode("", true),
            vue.unref(fetchState).status === "running" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$2)) : vue.createCommentVNode("", true),
            vue.createElementVNode("span", _hoisted_4$1, vue.toDisplayString(buttonText.value), 1)
          ], 8, _hoisted_2$2),
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
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_sfc_main$7, {
            src: "https://p.chilfish.top/weibo/icon.webp",
            alt: "Weibo archiver logo",
            class: "rounded-xm h-12 w-12"
          })
        ]);
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
  const __vite_import_meta_env__ = { "VITE_APP_VERSION": "0.6.1" };
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
            class: "fixed-card border-2 border-gray-200 rounded-lg shadow-2xl",
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
  div.id = "weibo-archiver-plugin";
  document.body.append(div);
  app.mount(div);
  console.log("weibo-archiver 加载成功");

})(Vue, axios, saveAs, Dexie);