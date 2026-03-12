var It=Object.defineProperty;var Bt=(E,S,T)=>S in E?It(E,S,{enumerable:!0,configurable:!0,writable:!0,value:T}):E[S]=T;var w=(E,S,T)=>Bt(E,typeof S!="symbol"?S+"":S,T);(function(){"use strict";const E="https://cdn.inculva.com/fonts",S=[];let T=!1;function Se(){if(S.length>0)return Promise.resolve();if(T)return Promise.reject(new Error("Previous font load failed"));const e=[{url:`${E}/OpenDyslexic-Regular.woff2`,weight:"400"},{url:`${E}/OpenDyslexic-Bold.woff2`,weight:"700"}].map(({url:t,weight:i})=>new FontFace("OpenDyslexic",`url(${t})`,{weight:i,style:"normal",display:"swap"}).load().then(o=>{document.fonts.add(o),S.push(o)}).catch(o=>{throw console.error(`Failed to load dyslexia font from ${t}:`,o),T=!0,o}));return Promise.all(e).then(()=>{})}function Le(){for(const a of S)document.fonts.delete(a);S.length=0}function k(a,e){if(document.getElementById(a))return;const t=document.createElement("style");t.id=a,t.textContent=e,document.head.appendChild(t)}function j(a,e){let t=document.getElementById(a);t||(t=document.createElement("style"),t.id=a,document.head.appendChild(t)),t.textContent=e}function b(a){var e;(e=document.getElementById(a))==null||e.remove()}const N={textResizing:4,lineHeight:4,textSpacing:4,contentMagnifier:4,saturation:5,colorBlindMode:4,textAlign:3,readingGuide:3,cursorEnhancement:3,slowCursor:3,screenReader:3},ie=["deuteranopia","protanopia","tritanopia","achromatopsia"],K=new Map;function ae(){const a="inculva-html-filter",e=[...K.values()];let t=document.getElementById(a);if(e.length===0){t==null||t.remove();return}t||(t=document.createElement("style"),t.id=a,document.head.appendChild(t)),t.textContent=`body { filter: ${e.join(" ")} !important; }`}function Q(a,e){K.set(a,e),ae()}function R(a){K.delete(a),ae()}let V="deuteranopia";const Ie={deuteranopia:"0.367 0.861 -0.228 0 0  0.280 0.673  0.047 0 0 -0.012 0.043  0.969 0 0  0 0 0 1 0",protanopia:"0.152 1.053 -0.205 0 0  0.115 0.786  0.099 0 0 -0.004 -0.048 1.052 0 0  0 0 0 1 0",tritanopia:"1.256 -0.077 -0.179 0 0 -0.078 0.931 0.148 0 0  0.005 0.691  0.304 0 0  0 0 0 1 0",achromatopsia:"0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0 0 0 1 0"};function ne(a){k("inculva-color-blind-filter-def","body::before { content: ''; position: fixed; width: 0; height: 0; }");let e=document.getElementById("inculva-color-blind-svg");e||(e=document.createElementNS("http://www.w3.org/2000/svg","svg"),e.id="inculva-color-blind-svg",e.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),document.body.insertBefore(e,document.body.firstChild)),e.innerHTML=`<defs><filter id="inculva-cbf"><feColorMatrix type="matrix" values="${Ie[a]}"/></filter></defs>`}function Be(){return V}function ze(a){V=a,K.has("colorBlind")&&ne(a)}function oe(a){var t,i,n,o,r,l,s,c,d;let e=a;for(let u=0;u<4&&e&&e!==document.documentElement;u++){const m=e;if((t=m.id)!=null&&t.startsWith("inculva")||(n=(i=m.className)==null?void 0:i.includes)!=null&&n.call(i,"inculva"))return"";const p=e.getAttribute("aria-label");if(p!=null&&p.trim())return p.trim();const f=e.getAttribute("aria-labelledby");if(f){const C=(r=(o=document.getElementById(f))==null?void 0:o.textContent)==null?void 0:r.trim();if(C)return C}if(e instanceof HTMLImageElement)return((l=e.alt)==null?void 0:l.trim())||"Image with no description";if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement){const C=m.id,B=C?(c=(s=document.querySelector(`label[for="${C}"]`))==null?void 0:s.textContent)==null?void 0:c.trim():void 0;if(B)return B;if(e instanceof HTMLInputElement&&e.placeholder)return e.placeholder}const v=((d=m.innerText)!=null?d:"").trim();if(v.length>=2&&v.length<=500)return v;e=e.parentElement}return""}let I=null,W="";const X={en:"en-US",tr:"tr-TR",de:"de-DE",fr:"fr-FR",es:"es-ES",it:"it-IT",pt:"pt-BR",nl:"nl-NL",ar:"ar-SA",he:"he-IL",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",ru:"ru-RU",pl:"pl-PL",cs:"cs-CZ",da:"da-DK",fi:"fi-FI",el:"el-GR",hu:"hu-HU",ro:"ro-RO",sk:"sk-SK",sv:"sv-SE",uk:"uk-UA",bg:"bg-BG",hr:"hr-HR",lt:"lt-LT",lv:"lv-LV",et:"et-EE",sl:"sl-SI",sr:"sr-RS",no:"nb-NO",fa:"fa-IR",ur:"ur-PK",th:"th-TH",vi:"vi-VN",id:"id-ID",ms:"ms-MY",ca:"ca-ES",sq:"sq-AL",sw:"sw-TZ"};function q(a){W=a}function Ee(a){var n,o;let e=a;for(;e&&e!==document.documentElement;){const r=e.getAttribute("lang");if(r)return(n=X[r.toLowerCase().slice(0,2)])!=null?n:r;e=e.parentElement}const i=document.documentElement.lang||W||"en";return(o=X[i.toLowerCase().slice(0,2)])!=null?o:i}function re(a,e){var i,n;if(!("speechSynthesis"in window)||!a.trim())return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(a.trim().slice(0,350));t.rate=1.05,t.lang=e?Ee(e):(n=(i=X[W])!=null?i:W)!=null?n:"en-US",window.speechSynthesis.speak(t)}function le(){var e,t;"speechSynthesis"in window&&window.speechSynthesis.cancel(),I!==null&&(clearTimeout(I),I=null);const a=window;(e=a.__inculvaSrCleanup)==null||e.call(a),delete a.__inculvaSrCleanup,b("inculva-screen-reader");for(const i of document.querySelectorAll("[data-inculva-tts-hover],[data-inculva-tts-tap]"))delete i.dataset.inculvaTtsHover,delete i.dataset.inculvaTtsTap;for(const i of document.querySelectorAll("[data-inculva-sr-wrap]")){const n=i.querySelector("img");n&&((t=i.parentNode)==null||t.insertBefore(n,i)),i.remove()}for(const i of document.querySelectorAll("[data-inculva-sr]"))i.classList.remove("inculva-no-alt"),delete i.dataset.inculvaSr}const se=["","Alt hints","Read on hover","Read on tap"];let ce=1.25;const G={textResizing:{enable:(a=1)=>{var t;j("inculva-text-resize",`html { font-size: ${(t=["110%","125%","140%","155%"][a-1])!=null?t:"110%"} !important; }`)},disable:()=>b("inculva-text-resize")},dyslexiaFont:{enable:()=>{Se(),k("inculva-dyslexia-font","body * { font-family: 'OpenDyslexic', sans-serif !important; }")},disable:()=>{b("inculva-dyslexia-font"),Le()}},cursorEnhancement:{enable:(a=1)=>{var r;const e=[[32,6,3],[48,9,4],[64,12,6]],[t,i,n]=(r=e[Math.min(a,3)-1])!=null?r:e[0],o=`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 24 24"><path d="M5 2 L5 20 L9 16 L12 22.5 L15 21 L12 14.5 L18.5 14.5 Z" fill="white" stroke="black" stroke-width="1.8" stroke-linejoin="round" paint-order="stroke fill"/></svg>`;j("inculva-cursor",`body *:not([id^="inculva"]):not([class*="inculva"]) { cursor: url("data:image/svg+xml,${encodeURIComponent(o)}") ${i} ${n}, auto !important; }`)},disable:()=>b("inculva-cursor")},keyboardNavigation:{enable:()=>{k("inculva-keyboard-nav",`*:focus-visible:not([id^="inculva"]):not([class*="inculva"]) {
           outline: 3px solid var(--inculva-primary, #0066cc) !important;
           outline-offset: 3px !important;
           box-shadow: 0 0 0 6px rgba(var(--inculva-primary-rgb, 0,102,204), 0.22) !important;
           z-index: 999990 !important;
           position: relative !important;
         }`)},disable:()=>{b("inculva-keyboard-nav")}},readingGuide:{enable:(a=1)=>{var c;const e=document.getElementById("inculva-reading-guide");e!=null&&e._moveHandler&&document.removeEventListener("mousemove",e._moveHandler),e==null||e.remove();const i=(c=["50vw","75vw","100vw"][a-1])!=null?c:"50vw",n=4,o=document.createElement("div");o.id="inculva-reading-guide",o.style.cssText=["position:fixed","left:50%","-webkit-transform:translateX(-50%)","transform:translateX(-50%)",`width:${i}`,`height:${n}px`,"background:var(--inculva-primary,#0066cc)","opacity:0.9","pointer-events:none","z-index:2147483642","top:0","border-radius:2px 2px 0 0"].join(";");const r=document.createElement("span");r.style.cssText=["position:absolute","bottom:100%","left:50%","-webkit-transform:translateX(-50%)","transform:translateX(-50%)","width:0","height:0","border-left:10px solid transparent","border-right:10px solid transparent","border-bottom:11px solid var(--inculva-primary,#0066cc)","display:block","opacity:0.9"].join(";"),o.appendChild(r),document.documentElement.appendChild(o);const l=i==="100vw",s=d=>{o.style.top=`${d.clientY}px`,l||(o.style.left=`${d.clientX}px`)};o._moveHandler=s,document.addEventListener("mousemove",s)},disable:()=>{const a=document.getElementById("inculva-reading-guide");a!=null&&a._moveHandler&&document.removeEventListener("mousemove",a._moveHandler),a==null||a.remove()}},screenReader:{enable:(a=1)=>{if(le(),a===1){let e=function(i){if(i.dataset.inculvaSr||i.closest("#inculva-widget-panel,#inculva-widget-btn"))return;i.dataset.inculvaSr="1";const n=i.getAttribute("alt");if(!(n!==null&&n.trim()!=="")){i.classList.add("inculva-no-alt");return}const r=i.parentNode;if(!r)return;const l=document.createElement("span");l.className="inculva-alt-wrap",l.setAttribute("data-inculva-sr-wrap","1"),r.insertBefore(l,i),l.appendChild(i);const s=document.createElement("span");s.className="inculva-alt-badge",s.textContent=n,l.appendChild(s)};k("inculva-screen-reader",`img.inculva-no-alt { outline: 3px solid #dc2626 !important; outline-offset: 3px !important; }
           .inculva-alt-wrap { position: relative !important; display: inline-block !important; vertical-align: bottom; }
           .inculva-alt-badge {
             position: absolute; bottom: 0; left: 0; right: 0;
             background: rgba(0,0,0,0.78); color: #fff;
             font-size: 10px; line-height: 1.3; font-family: system-ui, sans-serif;
             padding: 2px 5px; pointer-events: none; z-index: 2147483640;
             overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
             border-top: 2px solid var(--inculva-primary, #0066cc);
           }`);for(const i of document.querySelectorAll("img"))e(i);const t=new MutationObserver(i=>{for(const n of i)if(!(n.target instanceof Element&&n.target.closest("#inculva-widget-panel,#inculva-widget-btn"))){for(const o of n.addedNodes)if(o instanceof HTMLImageElement)e(o);else if(o instanceof HTMLElement)for(const r of o.querySelectorAll("img"))e(r)}});t.observe(document.body,{childList:!0,subtree:!0}),window.__inculvaSrCleanup=()=>t.disconnect()}else if(a===2){k("inculva-screen-reader",`[data-inculva-tts-hover] {
             outline: 2px dashed var(--inculva-primary, #0066cc) !important;
             outline-offset: 3px !important;
           }`);let e=null;const t=n=>{const o=n.target;if(!(!o||o===e)&&!o.closest("#inculva-widget-panel,#inculva-widget-btn")){e=o,I!==null&&(clearTimeout(I),I=null);for(const r of document.querySelectorAll("[data-inculva-tts-hover]"))delete r.dataset.inculvaTtsHover;I=setTimeout(()=>{const r=oe(o);r&&(o.dataset.inculvaTtsHover="1",re(r,o))},400)}},i=()=>{I!==null&&(clearTimeout(I),I=null)};document.addEventListener("mouseover",t),document.addEventListener("mouseout",i),window.__inculvaSrCleanup=()=>{document.removeEventListener("mouseover",t),document.removeEventListener("mouseout",i)}}else{k("inculva-screen-reader",`[data-inculva-tts-tap] {
             outline: 2px solid var(--inculva-primary, #0066cc) !important;
             outline-offset: 3px !important;
           }`);let e=null;const t=i=>{const n=i.target;if(!n||n.closest("#inculva-widget-panel,#inculva-widget-btn"))return;e&&delete e.dataset.inculvaTtsTap;const o=oe(n);o&&(e=n,n.dataset.inculvaTtsTap="1",re(o,n),setTimeout(()=>{e===n&&(delete n.dataset.inculvaTtsTap,e=null)},2500))};document.addEventListener("click",t),window.__inculvaSrCleanup=()=>{document.removeEventListener("click",t)}}},disable:()=>le()},pauseAnimations:{enable:()=>k("inculva-pause-animations","body *, body *::before, body *::after { animation-play-state: paused !important; transition: none !important; }"),disable:()=>b("inculva-pause-animations")},textSpacing:{enable:(a=1)=>{var o;const e=[{lh:"1.5",ls:"0.06em",ws:"0.10em"},{lh:"1.7",ls:"0.12em",ws:"0.16em"},{lh:"1.9",ls:"0.16em",ws:"0.20em"},{lh:"2.1",ls:"0.20em",ws:"0.24em"}],{lh:t,ls:i,ws:n}=(o=e[a-1])!=null?o:e[0];j("inculva-text-spacing",`body * { line-height: ${t} !important; letter-spacing: ${i} !important; word-spacing: ${n} !important; }
         body p { margin-bottom: 2em !important; }`)},disable:()=>b("inculva-text-spacing")},highlightLinks:{enable:()=>k("inculva-highlight-links","body a, body a:visited { text-decoration: underline !important; font-weight: bold !important; outline: 2px solid currentColor !important; outline-offset: 1px !important; }"),disable:()=>b("inculva-highlight-links")},colorBlindMode:{enable:(a=1)=>{var t;const e=(t=ie[a-1])!=null?t:"deuteranopia";V=e,ne(e),Q("colorBlind","url(#inculva-cbf)")},disable:()=>{var a;R("colorBlind"),b("inculva-color-blind-filter-def"),(a=document.getElementById("inculva-color-blind-svg"))==null||a.remove(),V="deuteranopia"}},largeClickTargets:{enable:()=>k("inculva-large-targets",`a, button, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [tabindex] {
          min-width: 44px !important;
          min-height: 44px !important;
        }`),disable:()=>b("inculva-large-targets")},focusHighlight:{enable:()=>k("inculva-focus-highlight",`:focus, :focus-visible {
          outline: 3px solid #ff6600 !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 6px rgba(255,102,0,0.3) !important;
          z-index: 999997 !important;
          position: relative !important;
        }`),disable:()=>b("inculva-focus-highlight")},skipNavigation:{enable:()=>{if(document.getElementById("inculva-skip-nav"))return;const a=document.createElement("a");a.id="inculva-skip-nav";const e=document.querySelector("main, [role='main'], #main, #content, .main-content");e?(e.id||(e.id="inculva-main-content"),a.href=`#${e.id}`):a.href="#",a.textContent="Skip to main content",a.style.cssText=["position:fixed","top:-100px","left:16px","z-index:9999999","background:#000","color:#fff","padding:8px 16px","border-radius:0 0 8px 8px","font-weight:bold","font-size:14px","font-family:system-ui,sans-serif","text-decoration:none","transition:top 0.15s","border:2px solid #fff"].join(";"),a.addEventListener("focus",()=>{a.style.top="0"}),a.addEventListener("blur",()=>{a.style.top="-100px"}),document.body.insertBefore(a,document.body.firstChild)},disable:()=>{var a;(a=document.getElementById("inculva-skip-nav"))==null||a.remove()}},readingMask:{enable:()=>{if(document.getElementById("inculva-reading-mask"))return;const a=document.createElement("div");a.id="inculva-reading-mask",a.style.cssText=["position:fixed","left:0","right:0","height:80px","background:transparent","border-top:3px solid var(--inculva-primary,#0066cc)","border-bottom:3px solid var(--inculva-primary,#0066cc)","box-shadow:0 0 0 9999px rgba(0,0,0,0.65)","pointer-events:none","z-index:2147483640","top:0"].join(";"),document.documentElement.appendChild(a);const e=t=>{a.style.top=`${t.clientY-40}px`};document.addEventListener("mousemove",e),a._moveHandler=e},disable:()=>{const a=document.getElementById("inculva-reading-mask");a!=null&&a._moveHandler&&document.removeEventListener("mousemove",a._moveHandler),a==null||a.remove()}},textAlign:{enable:(a=1)=>{var i;const t=(i=["left","center","right"][a-1])!=null?i:"left";j("inculva-text-align",`p, li, td, th, label, h1, h2, h3, h4, h5, h6 { text-align: ${t} !important; }`)},disable:()=>b("inculva-text-align")},saturation:{enable:(a=1)=>{var e;a===1?(R("saturation"),Q("highContrast","contrast(1.55)"),k("inculva-high-contrast-links","body a { color: #ffff00 !important; }")):(R("highContrast"),b("inculva-high-contrast-links"),Q("saturation",`saturate(${(e=[1.4,1.8,2.4,3][a-2])!=null?e:1.4})`))},disable:()=>{R("saturation"),R("highContrast"),b("inculva-high-contrast-links")}},muteMedia:{enable:()=>{for(const e of document.querySelectorAll("audio, video"))e.muted=!0,e.paused||e.pause();k("inculva-mute-media-state","");const a=new MutationObserver(e=>{for(const t of e)for(const i of t.addedNodes)i instanceof HTMLMediaElement&&(i.muted=!0)});a.observe(document.body,{childList:!0,subtree:!0}),window.__inculvaMuteObserver=a},disable:()=>{var a;b("inculva-mute-media-state");for(const e of document.querySelectorAll("audio, video"))e.muted=!1;(a=window.__inculvaMuteObserver)==null||a.disconnect(),delete window.__inculvaMuteObserver}},blueLightFilter:{enable:()=>Q("blueLight","sepia(0.25) saturate(0.85) brightness(0.95)"),disable:()=>R("blueLight")},hideImages:{enable:()=>k("inculva-hide-images",`img, picture, [role="img"]:not(svg):not(#inculva-widget-btn svg) {
         visibility: hidden !important;
       }
       #inculva-widget-btn img, #inculva-widget-panel img { visibility: visible !important; }`),disable:()=>b("inculva-hide-images")},darkMode:{enable:()=>{Q("darkMode","invert(1) hue-rotate(180deg)"),k("inculva-dark-mode-media",'img:not([class*="inculva-"]):not([class*="inculva-"] img), video:not([class*="inculva-"]):not([class*="inculva-"] video), iframe:not([class*="inculva-"]):not([class*="inculva-"] iframe), canvas:not([class*="inculva-"]):not([class*="inculva-"] canvas) { filter: invert(1) hue-rotate(180deg) !important; }')},disable:()=>{R("darkMode"),b("inculva-dark-mode-media")}},contentMagnifier:{enable:(a=1)=>{var r;if(ce=(r=[1.15,1.25,1.35,1.5][a-1])!=null?r:1.15,document.getElementById("inculva-magnifier"))return;k("inculva-magnifier-cursor",':not([id^="inculva"]):not([class*="inculva"]) { cursor: zoom-in !important; }');const t=document.createElement("div");t.id="inculva-magnifier",t.style.cssText=["position:fixed","width:200px","height:200px","border-radius:50%","border:3px solid rgba(0,102,204,0.85)","box-shadow:0 0 0 3px rgba(255,255,255,0.85),0 8px 28px rgba(0,0,0,0.3)","pointer-events:none","z-index:2147483643","top:0","left:-9999px","background:rgba(200,220,255,0.06)"].join(";"),document.documentElement.appendChild(t);const i=new WeakSet;let n=null;const o=l=>{var c;t.style.left=`${l.clientX-100}px`,t.style.top=`${l.clientY-100}px`;const s=document.elementFromPoint(l.clientX,l.clientY);!s||s===t||(c=s.closest)!=null&&c.call(s,"#inculva-widget-panel,#inculva-widget-btn")||(n&&n!==s&&(n.style.removeProperty("transform"),n.style.removeProperty("z-index"),n.style.removeProperty("transition"),n.style.removeProperty("position")),s!==n&&(s.style.setProperty("transform",`scale(${ce})`,"important"),s.style.setProperty("z-index","99998","important"),s.style.setProperty("transition","transform 0.12s ease","important"),s.style.setProperty("position","relative","important"),i.add(s),n=s))};document.addEventListener("mousemove",o),t._moveHandler=o,t._magnifiedElements=i},disable:()=>{var e;b("inculva-magnifier-cursor");const a=document.getElementById("inculva-magnifier");if(a!=null&&a._moveHandler&&document.removeEventListener("mousemove",a._moveHandler),a!=null&&a._magnifiedElements){const t=document.querySelectorAll("[style*='scale']");for(const i of t)(e=i.style.transform)!=null&&e.startsWith("scale(")&&!i.id.startsWith("inculva")&&(i.style.removeProperty("transform"),i.style.removeProperty("z-index"),i.style.removeProperty("transition"),i.style.removeProperty("position"))}a==null||a.remove()}},lineHeight:{enable:(a=1)=>{var t;j("inculva-line-height",`body * { line-height: ${(t=[1.6,1.9,2.2,2.6][a-1])!=null?t:1.6} !important; }`)},disable:()=>b("inculva-line-height")},highlightTitles:{enable:()=>k("inculva-highlight-titles",`h1, h2, h3, h4, h5, h6 {
         outline: 2px solid currentColor !important;
         outline-offset: 3px !important;
         padding: 2px 6px !important;
       }`),disable:()=>b("inculva-highlight-titles")},slowCursor:{enable:(a=1)=>{var f;const t=(f=[.25,.15,.08][a-1])!=null?f:.25;if(window.__inculvaSlowAlpha=t,document.getElementById("inculva-slow-cursor"))return;k("inculva-slow-cursor-hide",'body *:not([id^="inculva"]):not([class*="inculva"]) { cursor: none !important; }');const i=36,n=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${i}" viewBox="0 0 24 24"><path d="M5 2 L5 20 L9 16 L12 22.5 L15 21 L12 14.5 L18.5 14.5 Z" fill="white" stroke="black" stroke-width="1.8" stroke-linejoin="round" paint-order="stroke fill"/></svg>`,o=document.createElement("div");o.id="inculva-slow-cursor",o.style.cssText=["position:fixed","pointer-events:none","z-index:2147483647","top:0","left:0",`width:${i}px`,`height:${i}px`,"will-change:left,top","transition:none"].join(";"),o.innerHTML=n,document.documentElement.appendChild(o);let r=window.innerWidth/2,l=window.innerHeight/2,s=r,c=l;const d=v=>{r=v.clientX,l=v.clientY};document.addEventListener("mousemove",d);let u=0;const m=document.getElementById("inculva-slow-cursor");function p(){var D;const v=(D=window.__inculvaSlowAlpha)!=null?D:.25,C=6*(i/24),B=3*(i/24);s+=(r-s)*v,c+=(l-c)*v,m&&(m.style.left=`${s-C}px`,m.style.top=`${c-B}px`),u=requestAnimationFrame(p)}u=requestAnimationFrame(p),window.__inculvaSlowCursorCleanup=()=>{document.removeEventListener("mousemove",d),cancelAnimationFrame(u)}},disable:()=>{var a,e;b("inculva-slow-cursor-hide"),(a=window.__inculvaSlowCursorCleanup)==null||a.call(window),delete window.__inculvaSlowCursorCleanup,delete window.__inculvaSlowAlpha,(e=document.getElementById("inculva-slow-cursor"))==null||e.remove()}},toolTips:{enable:()=>{},disable:()=>{}},sustainabilityMode:{enable:()=>{},disable:()=>{}},dictionary:{enable:()=>{},disable:()=>{}}},De="data:image/png;base64,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",Te={tr:{title:"Erişilebilirlik Menüsü",poweredBy:"Inculva tarafından desteklenir",resetAll:"Tümünü Sıfırla",profilesTitle:"Profiller",closeMenu:"Menüyü kapat",languageLabel:"Dili seç",categoryVision:"Görme",categoryReading:"Okuma",categoryMotor:"Motor",categoryCalm:"Sakin",highContrast:"Kontrast Modu",darkMode:"Karanlık Mod",blueLightFilter:"Mavi Işık Filtresi",textResizing:"Büyük Metin",textAlign:"Metin Hizalama",lineHeight:"Satır Yüksekliği",textSpacing:"Harf Aralığı",screenReader:"Ekran Okuyucu",dyslexiaFont:"Disleksi Modu",readingMask:"Okuma Maskesi",readingGuide:"Okuma Kılavuzu",contentMagnifier:"Büyüteç",highlightLinks:"Bağlantıları Vurgula",highlightTitles:"Başlıkları Vurgula",hideImages:"Görselleri Gizle",pauseAnimations:"Animasyonu Durdur",cursorEnhancement:"İmleç",colorBlindMode:"Renk Körü",grayscale:"Gri Tonlama",saturation:"Kontrast+",focusHighlight:"Odak Göstergesi",largeClickTargets:"Büyük Hedefler",slowCursor:"Yavaş İmleç",skipNavigation:"İçeriğe Atla",muteMedia:"Medyayı Sessize Al",keyboardNavigation:"Klavye Navigasyonu",accessibilityStatement:"Erişilebilirlik Beyanı",resetSettings:"Ayarları Sıfırla",switchWidgetLeft:"Widgeti sola taşı",switchWidgetRight:"Widgeti sağa taşı",deuteranopia:"Deuteranopi",protanopia:"Protanopi",tritanopia:"Tritanopi",achromatopsia:"Akromatopsi",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Büyük",profile_blind:"Görme Engelli",profile_lowVision:"Az Gören",profile_colorBlind:"Renk Körü",profile_dyslexia:"Disleksi",profile_motorImpaired:"Motor Engelli",profile_attention:"DEHB",active:"Aktif"},de:{title:"Barrierefreiheit Menü",poweredBy:"Unterstützt von Inculva",resetAll:"Alles zurücksetzen",profilesTitle:"Profile",closeMenu:"Menü schließen",languageLabel:"Sprache auswählen",categoryVision:"Sehen",categoryReading:"Lesen",categoryMotor:"Motorik",categoryCalm:"Ruhe",highContrast:"Kontrastmodus",darkMode:"Dunkelmodus",blueLightFilter:"Blaulichtfilter",textResizing:"Größere Schrift",textAlign:"Textausrichtung",lineHeight:"Zeilenhöhe",textSpacing:"Zeichenabstand",screenReader:"Bildschirmleser",dyslexiaFont:"Legasthenie-Modus",readingMask:"Lesemaske",readingGuide:"Leseführer",contentMagnifier:"Lupe",highlightLinks:"Links hervorheben",highlightTitles:"Titel hervorheben",hideImages:"Bilder ausblenden",pauseAnimations:"Animation stoppen",cursorEnhancement:"Cursor",colorBlindMode:"Farbenblindheit",grayscale:"Graustufen",saturation:"Kontrast+",focusHighlight:"Fokusanzeige",largeClickTargets:"Große Schaltflächen",slowCursor:"Langsamer Cursor",skipNavigation:"Zum Inhalt",muteMedia:"Medien stummschalten",keyboardNavigation:"Tastaturnavigation",accessibilityStatement:"Barrierefreiheitserklärung",resetSettings:"Einstellungen zurücksetzen",switchWidgetLeft:"Widget nach links",switchWidgetRight:"Widget nach rechts",deuteranopia:"Deuteranopie",protanopia:"Protanopie",tritanopia:"Tritanopie",achromatopsia:"Achromatopsie",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Groß",profile_blind:"Blind",profile_lowVision:"Sehbehindert",profile_colorBlind:"Farbenblind",profile_dyslexia:"Legasthenie",profile_motorImpaired:"Motorisch",profile_attention:"ADHS",active:"Aktiv"},fr:{title:"Menu d'accessibilité",poweredBy:"Propulsé par Inculva",resetAll:"Tout réinitialiser",profilesTitle:"Profils",closeMenu:"Fermer le menu",languageLabel:"Choisir la langue",categoryVision:"Vision",categoryReading:"Lecture",categoryMotor:"Moteur",categoryCalm:"Calme",highContrast:"Mode contraste",darkMode:"Mode sombre",blueLightFilter:"Filtre lumière bleue",textResizing:"Texte plus grand",textAlign:"Alignement du texte",lineHeight:"Hauteur de ligne",textSpacing:"Espacement du texte",screenReader:"Lecteur d'écran",dyslexiaFont:"Mode dyslexie",readingMask:"Masque de lecture",readingGuide:"Guide de lecture",contentMagnifier:"Loupe",highlightLinks:"Surligner les liens",highlightTitles:"Surligner les titres",hideImages:"Masquer les images",pauseAnimations:"Arrêter l'animation",cursorEnhancement:"Curseur",colorBlindMode:"Daltonisme",grayscale:"Niveaux de gris",saturation:"Contraste+",focusHighlight:"Indicateur de focus",largeClickTargets:"Grandes cibles",slowCursor:"Curseur lent",skipNavigation:"Aller au contenu",muteMedia:"Couper les médias",keyboardNavigation:"Navigation clavier",accessibilityStatement:"Déclaration d'accessibilité",resetSettings:"Réinitialiser les paramètres",switchWidgetLeft:"Déplacer à gauche",switchWidgetRight:"Déplacer à droite",deuteranopia:"Deutéranopie",protanopia:"Protanopie",tritanopia:"Tritanopie",achromatopsia:"Achromatopsie",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Grand",profile_blind:"Non-voyant",profile_lowVision:"Malvoyant",profile_colorBlind:"Daltonien",profile_dyslexia:"Dyslexie",profile_motorImpaired:"Moteur",profile_attention:"TDAH",active:"Actif"},es:{title:"Menú de accesibilidad",poweredBy:"Desarrollado por Inculva",resetAll:"Restablecer todo",profilesTitle:"Perfiles",closeMenu:"Cerrar menú",languageLabel:"Seleccionar idioma",categoryVision:"Visión",categoryReading:"Lectura",categoryMotor:"Motor",categoryCalm:"Calma",highContrast:"Modo contraste",darkMode:"Modo oscuro",blueLightFilter:"Filtro luz azul",textResizing:"Texto más grande",textAlign:"Alineación de texto",lineHeight:"Altura de línea",textSpacing:"Espaciado de texto",screenReader:"Lector de pantalla",dyslexiaFont:"Modo dislexia",readingMask:"Máscara de lectura",readingGuide:"Guía de lectura",contentMagnifier:"Lupa",highlightLinks:"Resaltar enlaces",highlightTitles:"Resaltar títulos",hideImages:"Ocultar imágenes",pauseAnimations:"Detener animación",cursorEnhancement:"Cursor",colorBlindMode:"Daltonismo",grayscale:"Escala de grises",saturation:"Contraste+",focusHighlight:"Indicador de foco",largeClickTargets:"Objetivos grandes",slowCursor:"Cursor lento",skipNavigation:"Ir al contenido",muteMedia:"Silenciar medios",keyboardNavigation:"Navegación por teclado",accessibilityStatement:"Declaración de accesibilidad",resetSettings:"Restablecer ajustes",switchWidgetLeft:"Mover widget a la izquierda",switchWidgetRight:"Mover widget a la derecha",deuteranopia:"Deuteranopía",protanopia:"Protanopía",tritanopia:"Tritanopía",achromatopsia:"Acromatopsia",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Grande",profile_blind:"Ciego",profile_lowVision:"Baja visión",profile_colorBlind:"Daltónico",profile_dyslexia:"Dislexia",profile_motorImpaired:"Motor",profile_attention:"TDAH",active:"Activo"},it:{title:"Menu di accessibilità",poweredBy:"Sviluppato da Inculva",resetAll:"Reimposta tutto",profilesTitle:"Profili",closeMenu:"Chiudi menu",languageLabel:"Seleziona lingua",categoryVision:"Visione",categoryReading:"Lettura",categoryMotor:"Motorio",categoryCalm:"Calma",highContrast:"Modalità contrasto",darkMode:"Modalità scura",blueLightFilter:"Filtro luce blu",textResizing:"Testo più grande",textAlign:"Allineamento testo",lineHeight:"Altezza riga",textSpacing:"Spaziatura testo",screenReader:"Lettore schermo",dyslexiaFont:"Modalità dislessia",readingMask:"Maschera lettura",readingGuide:"Guida lettura",contentMagnifier:"Lente di ingrandimento",highlightLinks:"Evidenzia link",highlightTitles:"Evidenzia titoli",hideImages:"Nascondi immagini",pauseAnimations:"Ferma animazione",cursorEnhancement:"Cursore",colorBlindMode:"Daltonismo",grayscale:"Scala di grigi",saturation:"Contrasto+",focusHighlight:"Indicatore focus",largeClickTargets:"Bersagli grandi",slowCursor:"Cursore lento",skipNavigation:"Vai al contenuto",muteMedia:"Silenzia media",keyboardNavigation:"Navigazione tastiera",accessibilityStatement:"Dichiarazione accessibilità",resetSettings:"Reimposta impostazioni",switchWidgetLeft:"Sposta widget a sinistra",switchWidgetRight:"Sposta widget a destra",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Acromatopsia",sizeSmall:"Mini",sizeMedium:"Normale",sizeLarge:"Grande",profile_blind:"Non vedente",profile_lowVision:"Ipovedente",profile_colorBlind:"Daltonico",profile_dyslexia:"Dislessia",profile_motorImpaired:"Motorio",profile_attention:"ADHD",active:"Attivo"},pt:{title:"Menu de acessibilidade",poweredBy:"Desenvolvido pela Inculva",resetAll:"Redefinir tudo",profilesTitle:"Perfis",closeMenu:"Fechar menu",languageLabel:"Selecionar idioma",categoryVision:"Visão",categoryReading:"Leitura",categoryMotor:"Motor",categoryCalm:"Calma",highContrast:"Modo contraste",darkMode:"Modo escuro",blueLightFilter:"Filtro luz azul",textResizing:"Texto maior",textAlign:"Alinhamento de texto",lineHeight:"Altura da linha",textSpacing:"Espaçamento de texto",screenReader:"Leitor de tela",dyslexiaFont:"Modo dislexia",readingMask:"Máscara de leitura",readingGuide:"Guia de leitura",contentMagnifier:"Lupa",highlightLinks:"Realçar links",highlightTitles:"Realçar títulos",hideImages:"Ocultar imagens",pauseAnimations:"Parar animação",cursorEnhancement:"Cursor",colorBlindMode:"Daltonismo",grayscale:"Escala de cinza",saturation:"Contraste+",focusHighlight:"Indicador de foco",largeClickTargets:"Alvos grandes",slowCursor:"Cursor lento",skipNavigation:"Ir para o conteúdo",muteMedia:"Silenciar mídia",keyboardNavigation:"Navegação por teclado",accessibilityStatement:"Declaração de acessibilidade",resetSettings:"Redefinir configurações",switchWidgetLeft:"Mover widget para esquerda",switchWidgetRight:"Mover widget para direita",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Acromatopsia",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Grande",profile_blind:"Cego",profile_lowVision:"Baixa visão",profile_colorBlind:"Daltônico",profile_dyslexia:"Dislexia",profile_motorImpaired:"Motor",profile_attention:"TDAH",active:"Ativo"},nl:{title:"Toegankelijkheidsmenu",poweredBy:"Ondersteund door Inculva",resetAll:"Alles resetten",profilesTitle:"Profielen",closeMenu:"Menu sluiten",languageLabel:"Taal selecteren",categoryVision:"Zicht",categoryReading:"Lezen",categoryMotor:"Motorisch",categoryCalm:"Rust",highContrast:"Contrastmodus",darkMode:"Donkere modus",blueLightFilter:"Blauwlichtfilter",textResizing:"Grotere tekst",textAlign:"Tekstuitlijning",lineHeight:"Regelhoogte",textSpacing:"Tekstafstand",screenReader:"Schermlezer",dyslexiaFont:"Dyslexiemodus",readingMask:"Leesmasker",readingGuide:"Leeswijzer",contentMagnifier:"Vergrootglas",highlightLinks:"Links markeren",highlightTitles:"Titels markeren",hideImages:"Afbeeldingen verbergen",pauseAnimations:"Animatie stoppen",cursorEnhancement:"Cursor",colorBlindMode:"Kleurenblindheid",grayscale:"Grijstinten",saturation:"Contrast+",focusHighlight:"Focusindicator",largeClickTargets:"Grote doelen",slowCursor:"Trage cursor",skipNavigation:"Naar inhoud",muteMedia:"Media dempen",keyboardNavigation:"Toetsenbordnavigatie",accessibilityStatement:"Toegankelijkheidsverklaring",resetSettings:"Instellingen resetten",switchWidgetLeft:"Widget naar links",switchWidgetRight:"Widget naar rechts",deuteranopia:"Deuteranopie",protanopia:"Protanopie",tritanopia:"Tritanopie",achromatopsia:"Achromatopsie",sizeSmall:"Mini",sizeMedium:"Normaal",sizeLarge:"Groot",profile_blind:"Blind",profile_lowVision:"Slechtziend",profile_colorBlind:"Kleurenblind",profile_dyslexia:"Dyslexie",profile_motorImpaired:"Motorisch",profile_attention:"ADHD",active:"Actief"},ar:{title:"قائمة إمكانية الوصول",poweredBy:"مدعوم من Inculva",resetAll:"إعادة تعيين الكل",profilesTitle:"الملفات الشخصية",closeMenu:"إغلاق القائمة",languageLabel:"اختر اللغة",categoryVision:"الرؤية",categoryReading:"القراءة",categoryMotor:"الحركة",categoryCalm:"الهدوء",highContrast:"وضع التباين",darkMode:"الوضع الداكن",blueLightFilter:"تصفية الضوء الأزرق",textResizing:"نص أكبر",textAlign:"محاذاة النص",lineHeight:"ارتفاع السطر",textSpacing:"تباعد النص",screenReader:"قارئ الشاشة",dyslexiaFont:"وضع عسر القراءة",readingMask:"قناع القراءة",readingGuide:"دليل القراءة",contentMagnifier:"المكبر",highlightLinks:"تمييز الروابط",highlightTitles:"تمييز العناوين",hideImages:"إخفاء الصور",pauseAnimations:"إيقاف الرسوم المتحركة",cursorEnhancement:"المؤشر",colorBlindMode:"عمى الألوان",grayscale:"تدرج الرمادي",saturation:"تباين+",focusHighlight:"مؤشر التركيز",largeClickTargets:"أهداف كبيرة",slowCursor:"مؤشر بطيء",skipNavigation:"الانتقال إلى المحتوى",muteMedia:"كتم الوسائط",keyboardNavigation:"التنقل بلوحة المفاتيح",accessibilityStatement:"بيان إمكانية الوصول",resetSettings:"إعادة تعيين الإعدادات",switchWidgetLeft:"نقل الأداة إلى اليسار",switchWidgetRight:"نقل الأداة إلى اليمين",deuteranopia:"عمى أخضر-أحمر",protanopia:"عمى أحمر-أخضر",tritanopia:"عمى أزرق-أصفر",achromatopsia:"عمى الألوان الكامل",sizeSmall:"مصغّر",sizeMedium:"عادي",sizeLarge:"كبير",profile_blind:"كفيف",profile_lowVision:"ضعف البصر",profile_colorBlind:"عمى الألوان",profile_dyslexia:"عسر القراءة",profile_motorImpaired:"إعاقة حركية",profile_attention:"فرط النشاط",active:"نشط"},he:{title:"תפריט נגישות",poweredBy:"מופעל על ידי Inculva",resetAll:"אפס הכל",profilesTitle:"פרופילים",closeMenu:"סגור תפריט",languageLabel:"בחר שפה",categoryVision:"ראייה",categoryReading:"קריאה",categoryMotor:"מוטורי",categoryCalm:"שקט",highContrast:"מצב ניגודיות",darkMode:"מצב כהה",blueLightFilter:"פילטר אור כחול",textResizing:"טקסט גדול יותר",textAlign:"יישור טקסט",lineHeight:"גובה שורה",textSpacing:"מרווח טקסט",screenReader:"קורא מסך",dyslexiaFont:"מצב דיסלקציה",readingMask:"מסיכת קריאה",readingGuide:"מדריך קריאה",contentMagnifier:"מגדלת",highlightLinks:"הדגשת קישורים",highlightTitles:"הדגשת כותרות",hideImages:"הסתרת תמונות",pauseAnimations:"עצור אנימציה",cursorEnhancement:"סמן",colorBlindMode:"עיוורון צבעים",grayscale:"גווני אפור",saturation:"ניגודיות+",focusHighlight:"מחוון מיקוד",largeClickTargets:"מטרות גדולות",slowCursor:"סמן איטי",skipNavigation:"דלג לתוכן",muteMedia:"השתקת מדיה",keyboardNavigation:"ניווט מקלדת",accessibilityStatement:"הצהרת נגישות",resetSettings:"אפס הגדרות",switchWidgetLeft:"העבר לשמאל",switchWidgetRight:"העבר לימין",deuteranopia:"דאוטרנופיה",protanopia:"פרוטנופיה",tritanopia:"טריטנופיה",achromatopsia:"אכרומטופסיה",sizeSmall:"מיני",sizeMedium:"רגיל",sizeLarge:"גדול",profile_blind:"עיוור",profile_lowVision:"לקוי ראייה",profile_colorBlind:"עיוור צבעים",profile_dyslexia:"דיסלקציה",profile_motorImpaired:"מוטורי",profile_attention:"ADHD",active:"פעיל"},fa:{title:"منوی دسترسی‌پذیری",poweredBy:"ارائه‌شده توسط Inculva",resetAll:"بازنشانی همه",profilesTitle:"پروفایل‌ها",closeMenu:"بستن منو",languageLabel:"انتخاب زبان",categoryVision:"بینایی",categoryReading:"خواندن",categoryMotor:"حرکتی",categoryCalm:"آرامش",highContrast:"حالت کنتراست",darkMode:"حالت تاریک",blueLightFilter:"فیلتر نور آبی",textResizing:"متن بزرگ‌تر",textAlign:"تراز متن",lineHeight:"ارتفاع خط",textSpacing:"فاصله متن",screenReader:"خوانندهٔ صفحه",dyslexiaFont:"حالت دیسلکسی",readingMask:"ماسک مطالعه",readingGuide:"راهنمای مطالعه",contentMagnifier:"بزرگ‌نما",highlightLinks:"برجسته‌سازی لینک‌ها",highlightTitles:"برجسته‌سازی عناوین",hideImages:"پنهان کردن تصاویر",pauseAnimations:"توقف انیمیشن",cursorEnhancement:"مکان‌نما",colorBlindMode:"کوررنگی",grayscale:"خاکستری",saturation:"کنتراست+",focusHighlight:"نشانگر فوکوس",largeClickTargets:"هدف‌های بزرگ",slowCursor:"مکان‌نمای کند",skipNavigation:"پرش به محتوا",muteMedia:"بی‌صدا کردن رسانه",keyboardNavigation:"ناوبری صفحه‌کلید",accessibilityStatement:"بیانیه دسترسی",resetSettings:"بازنشانی تنظیمات",switchWidgetLeft:"انتقال به چپ",switchWidgetRight:"انتقال به راست",deuteranopia:"دوتِرانوپی",protanopia:"پروتانوپی",tritanopia:"تریتانوپی",achromatopsia:"آکروماتوپسی",sizeSmall:"مینی",sizeMedium:"معمولی",sizeLarge:"بزرگ",profile_blind:"نابینا",profile_lowVision:"کم‌بینا",profile_colorBlind:"کوررنگ",profile_dyslexia:"دیسلکسی",profile_motorImpaired:"حرکتی",profile_attention:"ADHD",active:"فعال"},ur:{title:"قابل رسائی مینو",poweredBy:"Inculva کی جانب سے",resetAll:"سب ری سیٹ کریں",profilesTitle:"پروفائل",closeMenu:"مینو بند کریں",languageLabel:"زبان منتخب کریں",categoryVision:"بصارت",categoryReading:"پڑھنا",categoryMotor:"موٹر",categoryCalm:"سکون",highContrast:"کنٹراسٹ موڈ",darkMode:"ڈارک موڈ",blueLightFilter:"نیلی روشنی فلٹر",textResizing:"بڑا متن",textAlign:"متن کی ترتیب",lineHeight:"لائن کی اونچائی",textSpacing:"متن کا فاصلہ",screenReader:"اسکرین ریڈر",dyslexiaFont:"ڈسلیکسیا موڈ",readingMask:"پڑھنے کا ماسک",readingGuide:"پڑھنے کی رہنمائی",contentMagnifier:"میگنیفائر",highlightLinks:"لنک نمایاں کریں",highlightTitles:"عناوین نمایاں کریں",hideImages:"تصاویر چھپائیں",pauseAnimations:"اینیمیشن روکیں",cursorEnhancement:"کرسر",colorBlindMode:"رنگ کا اندھاپن",grayscale:"سرمئی",saturation:"کنٹراسٹ+",focusHighlight:"فوکس انڈیکیٹر",largeClickTargets:"بڑے ہدف",slowCursor:"سست کرسر",skipNavigation:"مواد پر جائیں",muteMedia:"میڈیا خاموش کریں",keyboardNavigation:"کی بورڈ نیویگیشن",accessibilityStatement:"رسائی کا بیان",resetSettings:"ترتیبات ری سیٹ کریں",switchWidgetLeft:"بائیں منتقل کریں",switchWidgetRight:"دائیں منتقل کریں",deuteranopia:"ڈیوٹیرانوپیا",protanopia:"پروٹانوپیا",tritanopia:"ٹریٹانوپیا",achromatopsia:"آکروماٹوپسیا",sizeSmall:"منی",sizeMedium:"معمولی",sizeLarge:"بڑا",profile_blind:"نابینا",profile_lowVision:"کم بینائی",profile_colorBlind:"رنگ اندھا",profile_dyslexia:"ڈسلیکسیا",profile_motorImpaired:"موٹر",profile_attention:"ADHD",active:"فعال"},zh:{title:"无障碍功能菜单",poweredBy:"由 Inculva 提供支持",resetAll:"全部重置",profilesTitle:"配置文件",closeMenu:"关闭菜单",languageLabel:"选择语言",categoryVision:"视觉",categoryReading:"阅读",categoryMotor:"运动",categoryCalm:"平静",highContrast:"对比度模式",darkMode:"深色模式",blueLightFilter:"蓝光过滤",textResizing:"放大文字",textAlign:"文字对齐",lineHeight:"行高",textSpacing:"文字间距",screenReader:"屏幕阅读器",dyslexiaFont:"阅读障碍模式",readingMask:"阅读遮罩",readingGuide:"阅读指南",contentMagnifier:"放大镜",highlightLinks:"突出显示链接",highlightTitles:"突出显示标题",hideImages:"隐藏图片",pauseAnimations:"停止动画",cursorEnhancement:"光标",colorBlindMode:"色盲",grayscale:"灰度",saturation:"对比度+",focusHighlight:"焦点指示器",largeClickTargets:"大目标",slowCursor:"慢速光标",skipNavigation:"跳至主要内容",muteMedia:"静音媒体",keyboardNavigation:"键盘导航",accessibilityStatement:"无障碍声明",resetSettings:"重置设置",switchWidgetLeft:"移至左侧",switchWidgetRight:"移至右侧",deuteranopia:"绿色盲",protanopia:"红色盲",tritanopia:"蓝色盲",achromatopsia:"全色盲",sizeSmall:"迷你",sizeMedium:"常规",sizeLarge:"大",profile_blind:"盲人",profile_lowVision:"低视力",profile_colorBlind:"色盲",profile_dyslexia:"阅读障碍",profile_motorImpaired:"运动障碍",profile_attention:"多动症",active:"活跃"},ja:{title:"アクセシビリティメニュー",poweredBy:"Inculva 提供",resetAll:"すべてリセット",profilesTitle:"プロファイル",closeMenu:"メニューを閉じる",languageLabel:"言語を選択",categoryVision:"視覚",categoryReading:"読書",categoryMotor:"運動",categoryCalm:"穏やか",highContrast:"コントラストモード",darkMode:"ダークモード",blueLightFilter:"ブルーライトフィルター",textResizing:"大きなテキスト",textAlign:"テキスト整列",lineHeight:"行の高さ",textSpacing:"テキスト間隔",screenReader:"スクリーンリーダー",dyslexiaFont:"難読症モード",readingMask:"読書マスク",readingGuide:"読書ガイド",contentMagnifier:"拡大鏡",highlightLinks:"リンクを強調",highlightTitles:"タイトルを強調",hideImages:"画像を非表示",pauseAnimations:"アニメーション停止",cursorEnhancement:"カーソル",colorBlindMode:"色覚異常",grayscale:"グレースケール",saturation:"コントラスト+",focusHighlight:"フォーカスインジケーター",largeClickTargets:"大きなターゲット",slowCursor:"遅いカーソル",skipNavigation:"メインコンテンツへ",muteMedia:"メディアをミュート",keyboardNavigation:"キーボードナビゲーション",accessibilityStatement:"アクセシビリティ声明",resetSettings:"設定をリセット",switchWidgetLeft:"ウィジェットを左に",switchWidgetRight:"ウィジェットを右に",deuteranopia:"緑赤色盲",protanopia:"赤緑色盲",tritanopia:"青黄色盲",achromatopsia:"全色盲",sizeSmall:"ミニ",sizeMedium:"標準",sizeLarge:"大",profile_blind:"視覚障害",profile_lowVision:"弱視",profile_colorBlind:"色覚異常",profile_dyslexia:"難読症",profile_motorImpaired:"運動障害",profile_attention:"ADHD",active:"アクティブ"},ko:{title:"접근성 메뉴",poweredBy:"Inculva 제공",resetAll:"모두 초기화",profilesTitle:"프로필",closeMenu:"메뉴 닫기",languageLabel:"언어 선택",categoryVision:"시각",categoryReading:"독서",categoryMotor:"운동",categoryCalm:"차분함",highContrast:"대비 모드",darkMode:"다크 모드",blueLightFilter:"블루라이트 필터",textResizing:"텍스트 크게",textAlign:"텍스트 정렬",lineHeight:"줄 높이",textSpacing:"텍스트 간격",screenReader:"화면 읽기",dyslexiaFont:"난독증 모드",readingMask:"독서 마스크",readingGuide:"독서 가이드",contentMagnifier:"돋보기",highlightLinks:"링크 강조",highlightTitles:"제목 강조",hideImages:"이미지 숨기기",pauseAnimations:"애니메이션 중지",cursorEnhancement:"커서",colorBlindMode:"색맹",grayscale:"회색조",saturation:"대비+",focusHighlight:"포커스 표시기",largeClickTargets:"큰 타겟",slowCursor:"느린 커서",skipNavigation:"메인 콘텐츠로",muteMedia:"미디어 음소거",keyboardNavigation:"키보드 탐색",accessibilityStatement:"접근성 선언",resetSettings:"설정 초기화",switchWidgetLeft:"위젯을 왼쪽으로",switchWidgetRight:"위젯을 오른쪽으로",deuteranopia:"제2색맹",protanopia:"제1색맹",tritanopia:"제3색맹",achromatopsia:"전색맹",sizeSmall:"미니",sizeMedium:"보통",sizeLarge:"대",profile_blind:"시각장애",profile_lowVision:"저시력",profile_colorBlind:"색맹",profile_dyslexia:"난독증",profile_motorImpaired:"운동장애",profile_attention:"ADHD",active:"활성"},ru:{title:"Меню доступности",poweredBy:"При поддержке Inculva",resetAll:"Сбросить всё",profilesTitle:"Профили",closeMenu:"Закрыть меню",languageLabel:"Выбрать язык",categoryVision:"Зрение",categoryReading:"Чтение",categoryMotor:"Моторика",categoryCalm:"Спокойствие",highContrast:"Режим контраста",darkMode:"Тёмный режим",blueLightFilter:"Фильтр синего света",textResizing:"Крупный текст",textAlign:"Выравнивание текста",lineHeight:"Межстрочный интервал",textSpacing:"Межбуквенный интервал",screenReader:"Экранный диктор",dyslexiaFont:"Режим дислексии",readingMask:"Маска чтения",readingGuide:"Линейка чтения",contentMagnifier:"Лупа",highlightLinks:"Выделить ссылки",highlightTitles:"Выделить заголовки",hideImages:"Скрыть изображения",pauseAnimations:"Остановить анимацию",cursorEnhancement:"Курсор",colorBlindMode:"Цветовая слепота",grayscale:"Оттенки серого",saturation:"Контраст+",focusHighlight:"Индикатор фокуса",largeClickTargets:"Крупные цели",slowCursor:"Медленный курсор",skipNavigation:"К основному содержимому",muteMedia:"Отключить звук",keyboardNavigation:"Клавиатурная навигация",accessibilityStatement:"Декларация доступности",resetSettings:"Сбросить настройки",switchWidgetLeft:"Переместить влево",switchWidgetRight:"Переместить вправо",deuteranopia:"Дейтеранопия",protanopia:"Протанопия",tritanopia:"Тританопия",achromatopsia:"Ахроматопсия",sizeSmall:"Мини",sizeMedium:"Обычный",sizeLarge:"Большой",profile_blind:"Слепой",profile_lowVision:"Слабовидящий",profile_colorBlind:"Цветовая слепота",profile_dyslexia:"Дислексия",profile_motorImpaired:"Двигательные нарушения",profile_attention:"СДВГ",active:"Активный"},pl:{title:"Menu dostępności",poweredBy:"Wspierane przez Inculva",resetAll:"Resetuj wszystko",profilesTitle:"Profile",closeMenu:"Zamknij menu",languageLabel:"Wybierz język",categoryVision:"Wzrok",categoryReading:"Czytanie",categoryMotor:"Motoryka",categoryCalm:"Spokój",highContrast:"Tryb kontrastu",darkMode:"Tryb ciemny",blueLightFilter:"Filtr niebieskiego światła",textResizing:"Większy tekst",textAlign:"Wyrównanie tekstu",lineHeight:"Wysokość wiersza",textSpacing:"Odstęp liter",screenReader:"Czytnik ekranu",dyslexiaFont:"Tryb dysleksji",readingMask:"Maska czytania",readingGuide:"Linia czytania",contentMagnifier:"Lupa",highlightLinks:"Podświetl linki",highlightTitles:"Podświetl nagłówki",hideImages:"Ukryj obrazy",pauseAnimations:"Zatrzymaj animację",cursorEnhancement:"Kursor",colorBlindMode:"Daltonizm",grayscale:"Odcienie szarości",saturation:"Kontrast+",focusHighlight:"Wskaźnik fokusa",largeClickTargets:"Duże cele",slowCursor:"Wolny kursor",skipNavigation:"Przejdź do treści",muteMedia:"Wycisz media",keyboardNavigation:"Nawigacja klawiaturą",accessibilityStatement:"Deklaracja dostępności",resetSettings:"Resetuj ustawienia",switchWidgetLeft:"Przesuń w lewo",switchWidgetRight:"Przesuń w prawo",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsja",sizeSmall:"Mini",sizeMedium:"Normalny",sizeLarge:"Duży",profile_blind:"Niewidomy",profile_lowVision:"Słabowidzący",profile_colorBlind:"Daltonista",profile_dyslexia:"Dysleksja",profile_motorImpaired:"Niepełnosprawność ruchowa",profile_attention:"ADHD",active:"Aktywny"},cs:{title:"Menu přístupnosti",poweredBy:"Podporováno Inculva",resetAll:"Obnovit vše",profilesTitle:"Profily",closeMenu:"Zavřít menu",languageLabel:"Vybrat jazyk",categoryVision:"Zrak",categoryReading:"Čtení",categoryMotor:"Motorika",categoryCalm:"Klid",highContrast:"Režim kontrastu",darkMode:"Tmavý režim",blueLightFilter:"Filtr modrého světla",textResizing:"Větší text",textAlign:"Zarovnání textu",lineHeight:"Výška řádku",textSpacing:"Mezery textu",screenReader:"Čtečka obrazovky",dyslexiaFont:"Režim dyslexie",readingMask:"Maska čtení",readingGuide:"Čtecí lišta",contentMagnifier:"Lupa",highlightLinks:"Zvýraznit odkazy",highlightTitles:"Zvýraznit nadpisy",hideImages:"Skrýt obrázky",pauseAnimations:"Zastavit animaci",cursorEnhancement:"Kurzor",colorBlindMode:"Barvoslepost",grayscale:"Odstíny šedé",saturation:"Kontrast+",focusHighlight:"Indikátor zaměření",largeClickTargets:"Velké cíle",slowCursor:"Pomalý kurzor",skipNavigation:"Přejít na obsah",muteMedia:"Ztlumit média",keyboardNavigation:"Navigace klávesnicí",accessibilityStatement:"Prohlášení o přístupnosti",resetSettings:"Obnovit nastavení",switchWidgetLeft:"Přesunout vlevo",switchWidgetRight:"Přesunout vpravo",deuteranopia:"Deuteranopie",protanopia:"Protanopie",tritanopia:"Tritanopie",achromatopsia:"Achromatopsie",sizeSmall:"Mini",sizeMedium:"Normální",sizeLarge:"Velký",profile_blind:"Nevidomý",profile_lowVision:"Slabozraký",profile_colorBlind:"Barvoslepý",profile_dyslexia:"Dyslexie",profile_motorImpaired:"Pohybové postižení",profile_attention:"ADHD",active:"Aktivní"},da:{title:"Tilgængelighedsmenu",poweredBy:"Drevet af Inculva",resetAll:"Nulstil alt",profilesTitle:"Profiler",closeMenu:"Luk menu",languageLabel:"Vælg sprog",categoryVision:"Syn",categoryReading:"Læsning",categoryMotor:"Motorik",categoryCalm:"Ro",highContrast:"Kontrasttilstand",darkMode:"Mørk tilstand",blueLightFilter:"Blåt lysfilter",textResizing:"Større tekst",textAlign:"Tekstjustering",lineHeight:"Linjehøjde",textSpacing:"Tekstafstand",screenReader:"Skærmlæser",dyslexiaFont:"Dysleksitilstand",readingMask:"Læsemaske",readingGuide:"Læselinje",contentMagnifier:"Forstørrelsesglas",highlightLinks:"Fremhæv links",highlightTitles:"Fremhæv titler",hideImages:"Skjul billeder",pauseAnimations:"Stop animation",cursorEnhancement:"Markør",colorBlindMode:"Farveblindhed",grayscale:"Gråtoner",saturation:"Kontrast+",focusHighlight:"Fokusindikator",largeClickTargets:"Store mål",slowCursor:"Langsom markør",skipNavigation:"Gå til indhold",muteMedia:"Slå lyd fra",keyboardNavigation:"Tastaturnavigation",accessibilityStatement:"Tilgængelhedserklæring",resetSettings:"Nulstil indstillinger",switchWidgetLeft:"Flyt til venstre",switchWidgetRight:"Flyt til højre",deuteranopia:"Deuteranopi",protanopia:"Protanopi",tritanopia:"Tritanopi",achromatopsia:"Akromatopsi",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Stor",profile_blind:"Blind",profile_lowVision:"Svagtseende",profile_colorBlind:"Farveblind",profile_dyslexia:"Dysleksi",profile_motorImpaired:"Motorisk",profile_attention:"ADHD",active:"Aktiv"},fi:{title:"Saavutettavuusvalikko",poweredBy:"Inculvan tarjoama",resetAll:"Nollaa kaikki",profilesTitle:"Profiilit",closeMenu:"Sulje valikko",languageLabel:"Valitse kieli",categoryVision:"Näkö",categoryReading:"Lukeminen",categoryMotor:"Motoriikka",categoryCalm:"Rauha",highContrast:"Kontrastitila",darkMode:"Tumma tila",blueLightFilter:"Sinivalosuodatin",textResizing:"Suurempi teksti",textAlign:"Tekstin tasaus",lineHeight:"Riviväli",textSpacing:"Kirjainväli",screenReader:"Ruudunlukija",dyslexiaFont:"Dysleksiatila",readingMask:"Lukemismaski",readingGuide:"Lukemisviiva",contentMagnifier:"Suurennuslasi",highlightLinks:"Korosta linkit",highlightTitles:"Korosta otsikot",hideImages:"Piilota kuvat",pauseAnimations:"Pysäytä animaatio",cursorEnhancement:"Kursori",colorBlindMode:"Värisokeus",grayscale:"Harmaavärit",saturation:"Kontrasti+",focusHighlight:"Kohdistusosoitin",largeClickTargets:"Suuret kohteet",slowCursor:"Hidas kursori",skipNavigation:"Siirry sisältöön",muteMedia:"Mykistä media",keyboardNavigation:"Näppäimistönavigointi",accessibilityStatement:"Saavutettavuusseloste",resetSettings:"Nollaa asetukset",switchWidgetLeft:"Siirrä vasemmalle",switchWidgetRight:"Siirrä oikealle",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsia",sizeSmall:"Mini",sizeMedium:"Normaali",sizeLarge:"Suuri",profile_blind:"Sokea",profile_lowVision:"Heikkonäköinen",profile_colorBlind:"Värisokea",profile_dyslexia:"Dysleksia",profile_motorImpaired:"Motorinen vamma",profile_attention:"ADHD",active:"Aktiivinen"},el:{title:"Μενού προσβασιμότητας",poweredBy:"Από το Inculva",resetAll:"Επαναφορά όλων",profilesTitle:"Προφίλ",closeMenu:"Κλείσιμο μενού",languageLabel:"Επιλογή γλώσσας",categoryVision:"Όραση",categoryReading:"Ανάγνωση",categoryMotor:"Κινητική",categoryCalm:"Ηρεμία",highContrast:"Λειτουργία αντίθεσης",darkMode:"Σκοτεινή λειτουργία",blueLightFilter:"Φίλτρο μπλε φωτός",textResizing:"Μεγαλύτερο κείμενο",textAlign:"Στοίχιση κειμένου",lineHeight:"Ύψος γραμμής",textSpacing:"Απόσταση κειμένου",screenReader:"Αναγνώστης οθόνης",dyslexiaFont:"Λειτουργία δυσλεξίας",readingMask:"Μάσκα ανάγνωσης",readingGuide:"Οδηγός ανάγνωσης",contentMagnifier:"Μεγεθυντής",highlightLinks:"Επισήμανση συνδέσμων",highlightTitles:"Επισήμανση τίτλων",hideImages:"Απόκρυψη εικόνων",pauseAnimations:"Διακοπή κινούμενων",cursorEnhancement:"Κέρσορας",colorBlindMode:"Αχρωματοψία",grayscale:"Κλίμακα του γκρι",saturation:"Αντίθεση+",focusHighlight:"Δείκτης εστίασης",largeClickTargets:"Μεγάλοι στόχοι",slowCursor:"Αργός κέρσορας",skipNavigation:"Μετάβαση στο περιεχόμενο",muteMedia:"Σίγαση μέσων",keyboardNavigation:"Πλοήγηση πληκτρολογίου",accessibilityStatement:"Δήλωση προσβασιμότητας",resetSettings:"Επαναφορά ρυθμίσεων",switchWidgetLeft:"Μετακίνηση αριστερά",switchWidgetRight:"Μετακίνηση δεξιά",deuteranopia:"Δευτερανωπία",protanopia:"Πρωτανωπία",tritanopia:"Τριτανωπία",achromatopsia:"Ακρωματοψία",sizeSmall:"Μίνι",sizeMedium:"Κανονικό",sizeLarge:"Μεγάλο",profile_blind:"Τυφλός",profile_lowVision:"Χαμηλή όραση",profile_colorBlind:"Αχρωμάτωψ",profile_dyslexia:"Δυσλεξία",profile_motorImpaired:"Κινητική αναπηρία",profile_attention:"ΔΕΠΥ",active:"Ενεργό"},hu:{title:"Akadálymentességi menü",poweredBy:"Az Inculva segítségével",resetAll:"Összes visszaállítása",profilesTitle:"Profilok",closeMenu:"Menü bezárása",languageLabel:"Nyelv kiválasztása",categoryVision:"Látás",categoryReading:"Olvasás",categoryMotor:"Mozgás",categoryCalm:"Nyugalom",highContrast:"Kontrasztos mód",darkMode:"Sötét mód",blueLightFilter:"Kékfény-szűrő",textResizing:"Nagyobb szöveg",textAlign:"Szövegigazítás",lineHeight:"Sormagasság",textSpacing:"Betűköz",screenReader:"Képernyőolvasó",dyslexiaFont:"Diszlexia mód",readingMask:"Olvasási maszk",readingGuide:"Olvasási sáv",contentMagnifier:"Nagyító",highlightLinks:"Hivatkozások kiemelése",highlightTitles:"Címsorok kiemelése",hideImages:"Képek elrejtése",pauseAnimations:"Animáció megállítása",cursorEnhancement:"Kurzor",colorBlindMode:"Színvakság",grayscale:"Szürkeárnyalat",saturation:"Kontraszt+",focusHighlight:"Fókuszjelző",largeClickTargets:"Nagy célterületek",slowCursor:"Lassú kurzor",skipNavigation:"Ugrás a tartalomra",muteMedia:"Média némítása",keyboardNavigation:"Billentyűzetes navigáció",accessibilityStatement:"Akadálymentességi nyilatkozat",resetSettings:"Beállítások visszaállítása",switchWidgetLeft:"Mozgatás balra",switchWidgetRight:"Mozgatás jobbra",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopszia",sizeSmall:"Mini",sizeMedium:"Normál",sizeLarge:"Nagy",profile_blind:"Vak",profile_lowVision:"Gyengénlátó",profile_colorBlind:"Színvak",profile_dyslexia:"Diszlexia",profile_motorImpaired:"Mozgáskorlátozott",profile_attention:"ADHD",active:"Aktív"},ro:{title:"Meniu de accesibilitate",poweredBy:"Susținut de Inculva",resetAll:"Resetați tot",profilesTitle:"Profiluri",closeMenu:"Închideți meniul",languageLabel:"Selectați limba",categoryVision:"Vedere",categoryReading:"Citire",categoryMotor:"Motor",categoryCalm:"Calm",highContrast:"Mod contrast",darkMode:"Mod întunecat",blueLightFilter:"Filtru lumină albastră",textResizing:"Text mai mare",textAlign:"Aliniere text",lineHeight:"Înălțime linie",textSpacing:"Spațiere text",screenReader:"Cititor de ecran",dyslexiaFont:"Mod dislexie",readingMask:"Mască citire",readingGuide:"Ghid citire",contentMagnifier:"Lupă",highlightLinks:"Evidențiați linkuri",highlightTitles:"Evidențiați titluri",hideImages:"Ascundeți imagini",pauseAnimations:"Opriți animația",cursorEnhancement:"Cursor",colorBlindMode:"Daltonism",grayscale:"Nuanțe de gri",saturation:"Contrast+",focusHighlight:"Indicator focus",largeClickTargets:"Ținte mari",slowCursor:"Cursor lent",skipNavigation:"Salt la conținut",muteMedia:"Dezactivare sunet",keyboardNavigation:"Navigare tastatură",accessibilityStatement:"Declarație de accesibilitate",resetSettings:"Resetați setările",switchWidgetLeft:"Mutați la stânga",switchWidgetRight:"Mutați la dreapta",deuteranopia:"Deuteranopie",protanopia:"Protanopie",tritanopia:"Tritanopie",achromatopsia:"Acromatopsie",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Mare",profile_blind:"Orb",profile_lowVision:"Vedere slabă",profile_colorBlind:"Daltonist",profile_dyslexia:"Dislexie",profile_motorImpaired:"Motor",profile_attention:"ADHD",active:"Activ"},sv:{title:"Tillgänglighetsmeny",poweredBy:"Drivs av Inculva",resetAll:"Återställ allt",profilesTitle:"Profiler",closeMenu:"Stäng meny",languageLabel:"Välj språk",categoryVision:"Syn",categoryReading:"Läsning",categoryMotor:"Motorik",categoryCalm:"Ro",highContrast:"Kontrastläge",darkMode:"Mörkt läge",blueLightFilter:"Blåljusfilter",textResizing:"Större text",textAlign:"Textjustering",lineHeight:"Radhöjd",textSpacing:"Teckenavstånd",screenReader:"Skärmläsare",dyslexiaFont:"Dysleximod",readingMask:"Läsmask",readingGuide:"Läslinje",contentMagnifier:"Förstoringsglas",highlightLinks:"Markera länkar",highlightTitles:"Markera rubriker",hideImages:"Dölj bilder",pauseAnimations:"Stoppa animation",cursorEnhancement:"Markör",colorBlindMode:"Färgblindhet",grayscale:"Gråskalor",saturation:"Kontrast+",focusHighlight:"Fokusindikator",largeClickTargets:"Stora mål",slowCursor:"Långsam markör",skipNavigation:"Hoppa till innehåll",muteMedia:"Tysta media",keyboardNavigation:"Tangentbordsnavigation",accessibilityStatement:"Tillgänglighetsredogörelse",resetSettings:"Återställ inställningar",switchWidgetLeft:"Flytta till vänster",switchWidgetRight:"Flytta till höger",deuteranopia:"Deuteranopi",protanopia:"Protanopi",tritanopia:"Tritanopi",achromatopsia:"Akromatopsi",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Stor",profile_blind:"Blind",profile_lowVision:"Synskadad",profile_colorBlind:"Färgblind",profile_dyslexia:"Dyslexi",profile_motorImpaired:"Motorisk",profile_attention:"ADHD",active:"Aktiv"},uk:{title:"Меню доступності",poweredBy:"На базі Inculva",resetAll:"Скинути все",profilesTitle:"Профілі",closeMenu:"Закрити меню",languageLabel:"Оберіть мову",categoryVision:"Зір",categoryReading:"Читання",categoryMotor:"Моторика",categoryCalm:"Спокій",highContrast:"Режим контрасту",darkMode:"Темний режим",blueLightFilter:"Фільтр синього світла",textResizing:"Більший текст",textAlign:"Вирівнювання тексту",lineHeight:"Висота рядка",textSpacing:"Відстань між символами",screenReader:"Читач екрану",dyslexiaFont:"Режим дислексії",readingMask:"Маска читання",readingGuide:"Лінійка читання",contentMagnifier:"Лупа",highlightLinks:"Виділити посилання",highlightTitles:"Виділити заголовки",hideImages:"Приховати зображення",pauseAnimations:"Зупинити анімацію",cursorEnhancement:"Курсор",colorBlindMode:"Кольорова сліпота",grayscale:"Відтінки сірого",saturation:"Контраст+",focusHighlight:"Індикатор фокусу",largeClickTargets:"Великі цілі",slowCursor:"Повільний курсор",skipNavigation:"До основного вмісту",muteMedia:"Вимкнути звук",keyboardNavigation:"Клавіатурна навігація",accessibilityStatement:"Декларація доступності",resetSettings:"Скинути налаштування",switchWidgetLeft:"Перемістити вліво",switchWidgetRight:"Перемістити вправо",deuteranopia:"Дейтеранопія",protanopia:"Протанопія",tritanopia:"Тританопія",achromatopsia:"Ахроматопсія",sizeSmall:"Міні",sizeMedium:"Звичайний",sizeLarge:"Великий",profile_blind:"Сліпий",profile_lowVision:"Слабозорий",profile_colorBlind:"Кольорова сліпота",profile_dyslexia:"Дислексія",profile_motorImpaired:"Моторні порушення",profile_attention:"СДУГ",active:"Активний"},sk:{title:"Menu prístupnosti",poweredBy:"Podporované Inculva",resetAll:"Obnoviť všetko",profilesTitle:"Profily",closeMenu:"Zavrieť menu",languageLabel:"Vybrať jazyk",categoryVision:"Zrak",categoryReading:"Čítanie",categoryMotor:"Motorika",categoryCalm:"Pokoj",highContrast:"Režim kontrastu",darkMode:"Tmavý režim",blueLightFilter:"Filter modrého svetla",textResizing:"Väčší text",textAlign:"Zarovnanie textu",lineHeight:"Výška riadku",textSpacing:"Rozostupy v texte",screenReader:"Čítačka obrazovky",dyslexiaFont:"Režim dyslexie",readingMask:"Maska čítania",readingGuide:"Čítacia lišta",contentMagnifier:"Lupa",highlightLinks:"Zvýrazniť odkazy",highlightTitles:"Zvýrazniť nadpisy",hideImages:"Skryť obrázky",pauseAnimations:"Zastaviť animáciu",cursorEnhancement:"Kurzor",colorBlindMode:"Daltonizmus",grayscale:"Odtiene sivej",saturation:"Kontrast+",focusHighlight:"Indikátor fokusu",largeClickTargets:"Veľké ciele",slowCursor:"Pomalý kurzor",skipNavigation:"Preskočiť na obsah",muteMedia:"Stlmiť médiá",keyboardNavigation:"Navigácia klávesnicou",accessibilityStatement:"Vyhlásenie o prístupnosti",resetSettings:"Obnoviť nastavenia",switchWidgetLeft:"Presunúť vľavo",switchWidgetRight:"Presunúť vpravo",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Achromatopsia",sizeSmall:"Mini",sizeMedium:"Normálny",sizeLarge:"Veľký",profile_blind:"Nevidiaci",profile_lowVision:"Slabozraký",profile_colorBlind:"Daltonista",profile_dyslexia:"Dyslexia",profile_motorImpaired:"Pohybové postihnutie",profile_attention:"ADHD",active:"Aktívny"},bg:{title:"Меню за достъпност",poweredBy:"Поддържа се от Inculva",resetAll:"Нулиране на всичко",profilesTitle:"Профили",closeMenu:"Затвори менюто",languageLabel:"Избор на език",categoryVision:"Зрение",categoryReading:"Четене",categoryMotor:"Моторика",categoryCalm:"Спокойствие",highContrast:"Режим на контраст",darkMode:"Тъмен режим",blueLightFilter:"Филтър за синя светлина",textResizing:"По-голям текст",textAlign:"Подравняване на текст",lineHeight:"Височина на реда",textSpacing:"Разстояние между символи",screenReader:"Четец на екран",dyslexiaFont:"Режим за дислексия",readingMask:"Маска за четене",readingGuide:"Ръководство за четене",contentMagnifier:"Лупа",highlightLinks:"Открояване на връзки",highlightTitles:"Открояване на заглавия",hideImages:"Скриване на изображения",pauseAnimations:"Спиране на анимацията",cursorEnhancement:"Курсор",colorBlindMode:"Цветна слепота",grayscale:"Нюанси на сивото",saturation:"Контраст+",focusHighlight:"Индикатор на фокуса",largeClickTargets:"Големи цели",slowCursor:"Бавен курсор",skipNavigation:"Към основното съдържание",muteMedia:"Заглушаване на медии",keyboardNavigation:"Навигация с клавиатура",accessibilityStatement:"Декларация за достъпност",resetSettings:"Нулиране на настройките",switchWidgetLeft:"Преместване вляво",switchWidgetRight:"Преместване вдясно",deuteranopia:"Дейтеранопия",protanopia:"Протанопия",tritanopia:"Тританопия",achromatopsia:"Ахроматопсия",sizeSmall:"Мини",sizeMedium:"Нормален",sizeLarge:"Голям",profile_blind:"Сляп",profile_lowVision:"Слабовиждащ",profile_colorBlind:"Цветна слепота",profile_dyslexia:"Дислексия",profile_motorImpaired:"Двигателно увреждане",profile_attention:"ADHD",active:"Активен"},hr:{title:"Izbornik pristupačnosti",poweredBy:"Podržano od Inculva",resetAll:"Resetiraj sve",profilesTitle:"Profili",closeMenu:"Zatvori izbornik",languageLabel:"Odaberi jezik",categoryVision:"Vid",categoryReading:"Čitanje",categoryMotor:"Motorika",categoryCalm:"Smirenost",highContrast:"Način kontrasta",darkMode:"Tamni način",blueLightFilter:"Filter plavog svjetla",textResizing:"Veći tekst",textAlign:"Poravnanje teksta",lineHeight:"Visina retka",textSpacing:"Razmak teksta",screenReader:"Čitač zaslona",dyslexiaFont:"Način disleksije",readingMask:"Maska čitanja",readingGuide:"Vodič čitanja",contentMagnifier:"Povećalo",highlightLinks:"Istakni veze",highlightTitles:"Istakni naslove",hideImages:"Sakrij slike",pauseAnimations:"Zaustavi animaciju",cursorEnhancement:"Kursor",colorBlindMode:"Daltonizam",grayscale:"Nijanse sive",saturation:"Kontrast+",focusHighlight:"Indikator fokusa",largeClickTargets:"Veliki ciljevi",slowCursor:"Spori kursor",skipNavigation:"Na sadržaj",muteMedia:"Utišaj medije",keyboardNavigation:"Navigacija tipkovnicom",accessibilityStatement:"Izjava o pristupačnosti",resetSettings:"Resetiraj postavke",switchWidgetLeft:"Premjesti ulijevo",switchWidgetRight:"Premjesti udesno",deuteranopia:"Deuteranopija",protanopia:"Protanopija",tritanopia:"Tritanopija",achromatopsia:"Akromatopsija",sizeSmall:"Mini",sizeMedium:"Normalan",sizeLarge:"Veliki",profile_blind:"Slijep",profile_lowVision:"Slabovidan",profile_colorBlind:"Daltonist",profile_dyslexia:"Disleksija",profile_motorImpaired:"Motoričko oštećenje",profile_attention:"ADHD",active:"Aktivan"},lt:{title:"Pritaikomumo meniu",poweredBy:"Palaikoma Inculva",resetAll:"Iš naujo nustatyti viską",profilesTitle:"Profiliai",closeMenu:"Uždaryti meniu",languageLabel:"Pasirinkti kalbą",categoryVision:"Regėjimas",categoryReading:"Skaitymas",categoryMotor:"Motorika",categoryCalm:"Ramybė",highContrast:"Kontrasto režimas",darkMode:"Tamsus režimas",blueLightFilter:"Mėlynosios šviesos filtras",textResizing:"Didesnis tekstas",textAlign:"Teksto lygiavimas",lineHeight:"Eilutės aukštis",textSpacing:"Teksto tarpas",screenReader:"Ekrano skaitytuvas",dyslexiaFont:"Disleksijos režimas",readingMask:"Skaitymo kaukė",readingGuide:"Skaitymo linija",contentMagnifier:"Didintuvas",highlightLinks:"Paryškyti nuorodas",highlightTitles:"Paryškyti antraštes",hideImages:"Slėpti vaizdus",pauseAnimations:"Sustabdyti animaciją",cursorEnhancement:"Žymeklis",colorBlindMode:"Spalvų aklumas",grayscale:"Pilkos spalvos",saturation:"Kontrastas+",focusHighlight:"Fokuso indikatorius",largeClickTargets:"Dideli taikiniai",slowCursor:"Lėtas žymeklis",skipNavigation:"Pereiti į turinį",muteMedia:"Nutildyti mediją",keyboardNavigation:"Klaviatūros navigacija",accessibilityStatement:"Prieinamumo pareiškimas",resetSettings:"Iš naujo nustatyti",switchWidgetLeft:"Perkelti į kairę",switchWidgetRight:"Perkelti į dešinę",deuteranopia:"Deuteranopija",protanopia:"Protanopija",tritanopia:"Tritanopija",achromatopsia:"Akromatopsija",sizeSmall:"Mini",sizeMedium:"Normalus",sizeLarge:"Didelis",profile_blind:"Aklas",profile_lowVision:"Silpnaregis",profile_colorBlind:"Daltonistas",profile_dyslexia:"Disleksija",profile_motorImpaired:"Motorinė negalia",profile_attention:"ADHD",active:"Aktyvus"},lv:{title:"Pieejamības izvēlne",poweredBy:"Darbina Inculva",resetAll:"Atiestatīt visu",profilesTitle:"Profili",closeMenu:"Aizvērt izvēlni",languageLabel:"Izvēlēties valodu",categoryVision:"Redze",categoryReading:"Lasīšana",categoryMotor:"Motorika",categoryCalm:"Miers",highContrast:"Kontrasta režīms",darkMode:"Tumšais režīms",blueLightFilter:"Zilās gaismas filtrs",textResizing:"Lielāks teksts",textAlign:"Teksta līdzinājums",lineHeight:"Rindas augstums",textSpacing:"Teksta atstarpe",screenReader:"Ekrāna lasītājs",dyslexiaFont:"Disleksijas režīms",readingMask:"Lasīšanas maska",readingGuide:"Lasīšanas vadotne",contentMagnifier:"Palielināmais stikls",highlightLinks:"Izcelt saites",highlightTitles:"Izcelt virsrakstus",hideImages:"Slēpt attēlus",pauseAnimations:"Apturēt animāciju",cursorEnhancement:"Kursors",colorBlindMode:"Krāsu aklums",grayscale:"Pelēktoņi",saturation:"Kontrasts+",focusHighlight:"Fokusa indikators",largeClickTargets:"Lieli mērķi",slowCursor:"Lēns kursors",skipNavigation:"Doties uz saturu",muteMedia:"Izslēgt skaņu",keyboardNavigation:"Tastatūras navigācija",accessibilityStatement:"Pieejamības paziņojums",resetSettings:"Atiestatīt iestatījumus",switchWidgetLeft:"Pārvietot pa kreisi",switchWidgetRight:"Pārvietot pa labi",deuteranopia:"Deuteranopija",protanopia:"Protanopija",tritanopia:"Tritanopija",achromatopsia:"Akromatopsija",sizeSmall:"Mini",sizeMedium:"Normāls",sizeLarge:"Liels",profile_blind:"Akls",profile_lowVision:"Vājredzīgs",profile_colorBlind:"Krāsu aklums",profile_dyslexia:"Disleksija",profile_motorImpaired:"Kustību traucējumi",profile_attention:"ADHD",active:"Aktīvs"},et:{title:"Ligipääsetavuse menüü",poweredBy:"Inculva toel",resetAll:"Lähtesta kõik",profilesTitle:"Profiilid",closeMenu:"Sulge menüü",languageLabel:"Vali keel",categoryVision:"Nägemine",categoryReading:"Lugemine",categoryMotor:"Motoorsus",categoryCalm:"Rahulikkus",highContrast:"Kontrastrežiim",darkMode:"Tume režiim",blueLightFilter:"Sinise valguse filter",textResizing:"Suurem tekst",textAlign:"Teksti joondamine",lineHeight:"Rea kõrgus",textSpacing:"Tähevahe",screenReader:"Ekraanilugeja",dyslexiaFont:"Düsleksia režiim",readingMask:"Lugemismask",readingGuide:"Lugemisrida",contentMagnifier:"Suurendusklaas",highlightLinks:"Tõsta esile lingid",highlightTitles:"Tõsta esile pealkirjad",hideImages:"Peida pildid",pauseAnimations:"Peata animatsioon",cursorEnhancement:"Kursor",colorBlindMode:"Värvipimesus",grayscale:"Halltoonid",saturation:"Kontrast+",focusHighlight:"Fookuse indikaator",largeClickTargets:"Suured sihtmärgid",slowCursor:"Aeglane kursor",skipNavigation:"Sisule",muteMedia:"Vaigista meedia",keyboardNavigation:"Klaviatuuri navigeerimine",accessibilityStatement:"Ligipääsetavuse avaldus",resetSettings:"Lähtesta seaded",switchWidgetLeft:"Liiguta vasakule",switchWidgetRight:"Liiguta paremale",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsia",sizeSmall:"Mini",sizeMedium:"Tavaline",sizeLarge:"Suur",profile_blind:"Pime",profile_lowVision:"Nõrganägelik",profile_colorBlind:"Värvipime",profile_dyslexia:"Düsleksia",profile_motorImpaired:"Motoorne puue",profile_attention:"ADHD",active:"Aktiivne"},sl:{title:"Dostopnost",poweredBy:"Poganja Inculva",resetAll:"Ponastavi vse",profilesTitle:"Profili",closeMenu:"Zapri meni",languageLabel:"Izberi jezik",categoryVision:"Vid",categoryReading:"Branje",categoryMotor:"Motorika",categoryCalm:"Mirnost",highContrast:"Kontrastni način",darkMode:"Temni način",blueLightFilter:"Filter modre svetlobe",textResizing:"Večje besedilo",textAlign:"Poravnava besedila",lineHeight:"Višina vrstice",textSpacing:"Razmak besedila",screenReader:"Bralnik zaslona",dyslexiaFont:"Način za disleksijo",readingMask:"Bralna maska",readingGuide:"Bralna linija",contentMagnifier:"Povečevalno steklo",highlightLinks:"Označi povezave",highlightTitles:"Označi naslove",hideImages:"Skrij slike",pauseAnimations:"Ustavi animacijo",cursorEnhancement:"Kazalec",colorBlindMode:"Barvna slepota",grayscale:"Sivine",saturation:"Kontrast+",focusHighlight:"Indikator fokusa",largeClickTargets:"Veliki cilji",slowCursor:"Počasen kazalec",skipNavigation:"Na vsebino",muteMedia:"Utišaj medije",keyboardNavigation:"Tipkovnična navigacija",accessibilityStatement:"Izjava o dostopnosti",resetSettings:"Ponastavi nastavitve",switchWidgetLeft:"Premakni levo",switchWidgetRight:"Premakni desno",deuteranopia:"Devteranopija",protanopia:"Protanopija",tritanopia:"Tritanopija",achromatopsia:"Akromatopsija",sizeSmall:"Mini",sizeMedium:"Normalen",sizeLarge:"Velik",profile_blind:"Slep",profile_lowVision:"Slaboviden",profile_colorBlind:"Barvno slep",profile_dyslexia:"Disleksija",profile_motorImpaired:"Gibalna oviranost",profile_attention:"ADHD",active:"Aktivno"},sr:{title:"Pristupačnost",poweredBy:"Podržava Inculva",resetAll:"Resetuj sve",profilesTitle:"Profili",closeMenu:"Zatvori meni",languageLabel:"Izaberi jezik",categoryVision:"Vid",categoryReading:"Čitanje",categoryMotor:"Motorika",categoryCalm:"Smirenost",highContrast:"Mod kontrasta",darkMode:"Tamni mod",blueLightFilter:"Filter plavog svetla",textResizing:"Veći tekst",textAlign:"Poravnanje teksta",lineHeight:"Visina reda",textSpacing:"Razmak teksta",screenReader:"Čitač ekrana",dyslexiaFont:"Mod disleksije",readingMask:"Maska čitanja",readingGuide:"Vodič čitanja",contentMagnifier:"Lupa",highlightLinks:"Istakni veze",highlightTitles:"Istakni naslove",hideImages:"Sakrij slike",pauseAnimations:"Zaustavi animaciju",cursorEnhancement:"Kursor",colorBlindMode:"Daltonizam",grayscale:"Nijanse sive",saturation:"Kontrast+",focusHighlight:"Indikator fokusa",largeClickTargets:"Veliki ciljevi",slowCursor:"Spori kursor",skipNavigation:"Na sadržaj",muteMedia:"Utišaj medije",keyboardNavigation:"Navigacija tastaturom",accessibilityStatement:"Izjava o pristupačnosti",resetSettings:"Resetuj podešavanja",switchWidgetLeft:"Premesti ulevo",switchWidgetRight:"Premesti udesno",deuteranopia:"Deuteranopija",protanopia:"Protanopija",tritanopia:"Tritanopija",achromatopsia:"Akromatopsija",sizeSmall:"Mini",sizeMedium:"Normalan",sizeLarge:"Veliki",profile_blind:"Slep",profile_lowVision:"Slabovidan",profile_colorBlind:"Daltonista",profile_dyslexia:"Disleksija",profile_motorImpaired:"Motorička nesposobnost",profile_attention:"ADHD",active:"Aktivan"},no:{title:"Tilgjengelighetsmeny",poweredBy:"Drevet av Inculva",resetAll:"Tilbakestill alt",profilesTitle:"Profiler",closeMenu:"Lukk meny",languageLabel:"Velg språk",categoryVision:"Syn",categoryReading:"Lesing",categoryMotor:"Motorikk",categoryCalm:"Ro",highContrast:"Kontrastmodus",darkMode:"Mørk modus",blueLightFilter:"Blålysfilter",textResizing:"Større tekst",textAlign:"Tekstjustering",lineHeight:"Linjehøyde",textSpacing:"Tekstmellomrom",screenReader:"Skjermleser",dyslexiaFont:"Dysleksimodus",readingMask:"Lesemasken",readingGuide:"Leselinje",contentMagnifier:"Forstørrelsesglass",highlightLinks:"Fremhev lenker",highlightTitles:"Fremhev titler",hideImages:"Skjul bilder",pauseAnimations:"Stopp animasjon",cursorEnhancement:"Markør",colorBlindMode:"Fargeblindhet",grayscale:"Gråtoner",saturation:"Kontrast+",focusHighlight:"Fokusindikator",largeClickTargets:"Store mål",slowCursor:"Langsom markør",skipNavigation:"Gå til innhold",muteMedia:"Demp media",keyboardNavigation:"Tastaturnavigasjon",accessibilityStatement:"Tilgjengelighetserklæring",resetSettings:"Tilbakestill innstillinger",switchWidgetLeft:"Flytt til venstre",switchWidgetRight:"Flytt til høyre",deuteranopia:"Deuteranopi",protanopia:"Protanopi",tritanopia:"Tritanopi",achromatopsia:"Akromatopsi",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Stor",profile_blind:"Blind",profile_lowVision:"Svaksynt",profile_colorBlind:"Fargeblind",profile_dyslexia:"Dysleksi",profile_motorImpaired:"Bevegelseshemmet",profile_attention:"ADHD",active:"Aktiv"},th:{title:"เมนูการเข้าถึง",poweredBy:"ขับเคลื่อนโดย Inculva",resetAll:"รีเซ็ตทั้งหมด",profilesTitle:"โปรไฟล์",closeMenu:"ปิดเมนู",languageLabel:"เลือกภาษา",categoryVision:"การมองเห็น",categoryReading:"การอ่าน",categoryMotor:"การเคลื่อนไหว",categoryCalm:"ความสงบ",highContrast:"โหมดคอนทราสต์",darkMode:"โหมดมืด",blueLightFilter:"ฟิลเตอร์แสงสีน้ำเงิน",textResizing:"ข้อความขนาดใหญ่",textAlign:"การจัดตำแหน่งข้อความ",lineHeight:"ความสูงบรรทัด",textSpacing:"ระยะห่างข้อความ",screenReader:"โปรแกรมอ่านหน้าจอ",dyslexiaFont:"โหมดดิสเล็กเซีย",readingMask:"มาสก์การอ่าน",readingGuide:"แนวทางการอ่าน",contentMagnifier:"แว่นขยาย",highlightLinks:"เน้นลิงก์",highlightTitles:"เน้นหัวข้อ",hideImages:"ซ่อนรูปภาพ",pauseAnimations:"หยุดแอนิเมชัน",cursorEnhancement:"เคอร์เซอร์",colorBlindMode:"ตาบอดสี",grayscale:"โทนสีเทา",saturation:"คอนทราสต์+",focusHighlight:"ตัวบ่งชี้โฟกัส",largeClickTargets:"เป้าหมายขนาดใหญ่",slowCursor:"เคอร์เซอร์ช้า",skipNavigation:"ข้ามไปยังเนื้อหา",muteMedia:"ปิดเสียงสื่อ",keyboardNavigation:"การนำทางแป้นพิมพ์",accessibilityStatement:"แถลงการณ์การเข้าถึง",resetSettings:"รีเซ็ตการตั้งค่า",switchWidgetLeft:"ย้ายไปซ้าย",switchWidgetRight:"ย้ายไปขวา",deuteranopia:"ดิวเทอราโนเปีย",protanopia:"โปรทาโนเปีย",tritanopia:"ไทรทาโนเปีย",achromatopsia:"อะโครมาทอปเซีย",sizeSmall:"มินิ",sizeMedium:"ปกติ",sizeLarge:"ใหญ่",profile_blind:"ตาบอด",profile_lowVision:"สายตาเลือนราง",profile_colorBlind:"ตาบอดสี",profile_dyslexia:"ดิสเล็กเซีย",profile_motorImpaired:"ความบกพร่องทางการเคลื่อนไหว",profile_attention:"สมาธิสั้น",active:"ใช้งานอยู่"},vi:{title:"Menu khả năng tiếp cận",poweredBy:"Được hỗ trợ bởi Inculva",resetAll:"Đặt lại tất cả",profilesTitle:"Hồ sơ",closeMenu:"Đóng menu",languageLabel:"Chọn ngôn ngữ",categoryVision:"Thị giác",categoryReading:"Đọc",categoryMotor:"Vận động",categoryCalm:"Bình tĩnh",highContrast:"Chế độ tương phản",darkMode:"Chế độ tối",blueLightFilter:"Bộ lọc ánh sáng xanh",textResizing:"Văn bản lớn hơn",textAlign:"Căn chỉnh văn bản",lineHeight:"Chiều cao dòng",textSpacing:"Khoảng cách văn bản",screenReader:"Trình đọc màn hình",dyslexiaFont:"Chế độ khó đọc",readingMask:"Mặt nạ đọc",readingGuide:"Hướng dẫn đọc",contentMagnifier:"Kính lúp",highlightLinks:"Tô sáng liên kết",highlightTitles:"Tô sáng tiêu đề",hideImages:"Ẩn hình ảnh",pauseAnimations:"Dừng hoạt ảnh",cursorEnhancement:"Con trỏ",colorBlindMode:"Mù màu",grayscale:"Thang xám",saturation:"Tương phản+",focusHighlight:"Chỉ báo tiêu điểm",largeClickTargets:"Mục tiêu lớn",slowCursor:"Con trỏ chậm",skipNavigation:"Đến nội dung",muteMedia:"Tắt tiếng phương tiện",keyboardNavigation:"Điều hướng bàn phím",accessibilityStatement:"Tuyên bố khả năng tiếp cận",resetSettings:"Đặt lại cài đặt",switchWidgetLeft:"Chuyển sang trái",switchWidgetRight:"Chuyển sang phải",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Achromatopsia",sizeSmall:"Mini",sizeMedium:"Thường",sizeLarge:"Lớn",profile_blind:"Mù",profile_lowVision:"Thị lực kém",profile_colorBlind:"Mù màu",profile_dyslexia:"Chứng khó đọc",profile_motorImpaired:"Khuyết tật vận động",profile_attention:"ADHD",active:"Hoạt động"},id:{title:"Menu aksesibilitas",poweredBy:"Didukung oleh Inculva",resetAll:"Atur ulang semua",profilesTitle:"Profil",closeMenu:"Tutup menu",languageLabel:"Pilih bahasa",categoryVision:"Penglihatan",categoryReading:"Membaca",categoryMotor:"Motorik",categoryCalm:"Tenang",highContrast:"Mode kontras",darkMode:"Mode gelap",blueLightFilter:"Filter cahaya biru",textResizing:"Teks lebih besar",textAlign:"Penyelarasan teks",lineHeight:"Tinggi baris",textSpacing:"Jarak teks",screenReader:"Pembaca layar",dyslexiaFont:"Mode disleksia",readingMask:"Masker membaca",readingGuide:"Panduan membaca",contentMagnifier:"Kaca pembesar",highlightLinks:"Sorot tautan",highlightTitles:"Sorot judul",hideImages:"Sembunyikan gambar",pauseAnimations:"Hentikan animasi",cursorEnhancement:"Kursor",colorBlindMode:"Buta warna",grayscale:"Skala abu-abu",saturation:"Kontras+",focusHighlight:"Indikator fokus",largeClickTargets:"Target besar",slowCursor:"Kursor lambat",skipNavigation:"Lewati ke konten",muteMedia:"Bisukan media",keyboardNavigation:"Navigasi keyboard",accessibilityStatement:"Pernyataan aksesibilitas",resetSettings:"Atur ulang pengaturan",switchWidgetLeft:"Pindah ke kiri",switchWidgetRight:"Pindah ke kanan",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsia",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Besar",profile_blind:"Buta",profile_lowVision:"Penglihatan lemah",profile_colorBlind:"Buta warna",profile_dyslexia:"Disleksia",profile_motorImpaired:"Gangguan motorik",profile_attention:"ADHD",active:"Aktif"},ms:{title:"Menu kebolehcapaian",poweredBy:"Dikuasakan oleh Inculva",resetAll:"Set semula semua",profilesTitle:"Profil",closeMenu:"Tutup menu",languageLabel:"Pilih bahasa",categoryVision:"Penglihatan",categoryReading:"Membaca",categoryMotor:"Motor",categoryCalm:"Tenang",highContrast:"Mod kontras",darkMode:"Mod gelap",blueLightFilter:"Penapis cahaya biru",textResizing:"Teks lebih besar",textAlign:"Penjajaran teks",lineHeight:"Ketinggian baris",textSpacing:"Jarak teks",screenReader:"Pembaca skrin",dyslexiaFont:"Mod disleksia",readingMask:"Topeng bacaan",readingGuide:"Panduan bacaan",contentMagnifier:"Kanta pembesar",highlightLinks:"Serlah pautan",highlightTitles:"Serlah tajuk",hideImages:"Sembunyikan imej",pauseAnimations:"Hentikan animasi",cursorEnhancement:"Kursor",colorBlindMode:"Buta warna",grayscale:"Skala kelabu",saturation:"Kontras+",focusHighlight:"Penunjuk fokus",largeClickTargets:"Sasaran besar",slowCursor:"Kursor perlahan",skipNavigation:"Langkau ke kandungan",muteMedia:"Redam media",keyboardNavigation:"Navigasi papan kekunci",accessibilityStatement:"Pernyataan kebolehcapaian",resetSettings:"Set semula tetapan",switchWidgetLeft:"Alihkan ke kiri",switchWidgetRight:"Alihkan ke kanan",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsia",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Besar",profile_blind:"Buta",profile_lowVision:"Penglihatan lemah",profile_colorBlind:"Buta warna",profile_dyslexia:"Disleksia",profile_motorImpaired:"Gangguan motor",profile_attention:"ADHD",active:"Aktif"},ca:{title:"Menú d'accessibilitat",poweredBy:"Impulsat per Inculva",resetAll:"Restablir tot",profilesTitle:"Perfils",closeMenu:"Tancar menú",languageLabel:"Seleccioneu l'idioma",categoryVision:"Visió",categoryReading:"Lectura",categoryMotor:"Motor",categoryCalm:"Calma",highContrast:"Mode contrast",darkMode:"Mode fosc",blueLightFilter:"Filtre de llum blava",textResizing:"Text més gran",textAlign:"Alineació del text",lineHeight:"Alçada de línia",textSpacing:"Espaiat del text",screenReader:"Lector de pantalla",dyslexiaFont:"Mode dislèxia",readingMask:"Màscara de lectura",readingGuide:"Guia de lectura",contentMagnifier:"Lupa",highlightLinks:"Ressaltar enllaços",highlightTitles:"Ressaltar títols",hideImages:"Amagar imatges",pauseAnimations:"Aturar animació",cursorEnhancement:"Cursor",colorBlindMode:"Daltonisme",grayscale:"Escala de grisos",saturation:"Contrast+",focusHighlight:"Indicador de focus",largeClickTargets:"Objectius grans",slowCursor:"Cursor lent",skipNavigation:"Anar al contingut",muteMedia:"Silenciar media",keyboardNavigation:"Navegació per teclat",accessibilityStatement:"Declaració d'accessibilitat",resetSettings:"Restablir configuració",switchWidgetLeft:"Moure a l'esquerra",switchWidgetRight:"Moure a la dreta",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Acromatòpsia",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"Gran",profile_blind:"Cec",profile_lowVision:"Baixa visió",profile_colorBlind:"Daltònic",profile_dyslexia:"Dislèxia",profile_motorImpaired:"Mobilitat reduïda",profile_attention:"TDAH",active:"Actiu"},sq:{title:"Menuja e aksesueshmërisë",poweredBy:"Mbështetur nga Inculva",resetAll:"Rivendos të gjitha",profilesTitle:"Profile",closeMenu:"Mbyll menunë",languageLabel:"Zgjidhni gjuhën",categoryVision:"Shikimi",categoryReading:"Leximi",categoryMotor:"Motori",categoryCalm:"Qetësia",highContrast:"Mënyra e kontrastit",darkMode:"Mënyra e errët",blueLightFilter:"Filtri i dritës blu",textResizing:"Tekst më i madh",textAlign:"Rreshtimi i tekstit",lineHeight:"Lartësia e rreshtit",textSpacing:"Hapësira e tekstit",screenReader:"Lexues ekrani",dyslexiaFont:"Mënyra e disleksisë",readingMask:"Maska e leximit",readingGuide:"Udhëzues leximi",contentMagnifier:"Zmadhues",highlightLinks:"Theksoni lidhjet",highlightTitles:"Theksoni titujt",hideImages:"Fshih imazhet",pauseAnimations:"Ndale animacionin",cursorEnhancement:"Kursori",colorBlindMode:"Daltonizëm",grayscale:"Shkallë gri",saturation:"Kontrast+",focusHighlight:"Tregues fokusi",largeClickTargets:"Objektiva të mëdha",slowCursor:"Kursori i ngadaltë",skipNavigation:"Kalo tek përmbajtja",muteMedia:"Heqja e tingullit",keyboardNavigation:"Navigim me tastierë",accessibilityStatement:"Deklarata e aksesueshmërisë",resetSettings:"Rivendos cilësimet",switchWidgetLeft:"Zhvendos majtas",switchWidgetRight:"Zhvendos djathtas",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsia",sizeSmall:"Mini",sizeMedium:"Normal",sizeLarge:"I madh",profile_blind:"I verbër",profile_lowVision:"Vizion i dobët",profile_colorBlind:"Daltonist",profile_dyslexia:"Disleksi",profile_motorImpaired:"Paaftësi motorike",profile_attention:"ADHD",active:"Aktiv"},sw:{title:"Menyu ya upatikanaji",poweredBy:"Inculva inasaidia",resetAll:"Weka upya yote",profilesTitle:"Maelezo",closeMenu:"Funga menyu",languageLabel:"Chagua lugha",categoryVision:"Maono",categoryReading:"Kusoma",categoryMotor:"Motor",categoryCalm:"Utulivu",highContrast:"Hali ya utofauti",darkMode:"Hali ya giza",blueLightFilter:"Kichujio cha mwanga bluu",textResizing:"Maandishi makubwa",textAlign:"Usawa wa maandishi",lineHeight:"Urefu wa mstari",textSpacing:"Nafasi ya maandishi",screenReader:"Msomaji wa skrini",dyslexiaFont:"Hali ya dyslexia",readingMask:"Kizuizi cha kusoma",readingGuide:"Mwongozo wa kusoma",contentMagnifier:"Kioo cha kukuza",highlightLinks:"Angazia viungo",highlightTitles:"Angazia vichwa",hideImages:"Ficha picha",pauseAnimations:"Simamisha mwendo",cursorEnhancement:"Kishale",colorBlindMode:"Upofu wa rangi",grayscale:"Vivuli vya kijivu",saturation:"Tofauti+",focusHighlight:"Kiashiria cha kuzingatia",largeClickTargets:"Malengo makubwa",slowCursor:"Kishale cha polepole",skipNavigation:"Ruka hadi maudhui",muteMedia:"Nyamazisha vyombo vya habari",keyboardNavigation:"Uongozaji wa kibodi",accessibilityStatement:"Tamko la upatikanaji",resetSettings:"Weka upya mipangilio",switchWidgetLeft:"Hamia kushoto",switchWidgetRight:"Hamia kulia",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Akromatopsia",sizeSmall:"Mini",sizeMedium:"Kawaida",sizeLarge:"Kubwa",profile_blind:"Kipofu",profile_lowVision:"Uoni hafifu",profile_colorBlind:"Kipofu cha rangi",profile_dyslexia:"Dyslexia",profile_motorImpaired:"Ulemavu wa magari",profile_attention:"ADHD",active:"Inatumika"}},Re="https://cdn.inculva.com/icons";function g(a,e,t,i=""){return`<img src="${`${Re}/${a}.svg`}" width="${e}" height="${t}" aria-hidden="true" ${i} alt="" style="display:block;" />`}function de(a){return`<img src="${De}" width="${a}" height="${a}" alt="" aria-hidden="true" style="display:block;border-radius:4px;">`}const ge={vision:["darkMode","blueLightFilter","colorBlindMode","saturation","highlightLinks","highlightTitles","hideImages"],reading:["textResizing","textSpacing","textAlign","lineHeight","dyslexiaFont","readingGuide","readingMask","contentMagnifier","screenReader"],motor:["keyboardNavigation","focusHighlight","largeClickTargets","cursorEnhancement","slowCursor","skipNavigation"],calm:["pauseAnimations","muteMedia"]};function Pe(a){for(const[e,t]of Object.entries(ge))if(t.includes(a))return e;return"vision"}const He=g("universal-access",50,50,'style="filter: brightness(0) invert(1);"'),Fe=g("moon",20,20),je=g("sun-bright",20,20),Ne=g("text-size",20,20),Qe=g("align-left",20,20),Ge=g("line-height",20,20),Oe=g("arrows-left-right",20,20),Je=g("waveform",20,20),Ue=g("df",20,20),Ke=g("square-poll-horizontal",20,20),Ve=g("file-dashed-line",20,20),We=g("magnifying-glass-plus",20,20),Ye=g("link-simple",20,20),Ze=g("square-dashed",20,20),Xe=g("image-slash",20,20),qe=g("circle-pause",20,20),_e=g("arrow-pointer",20,20),$e=g("computer-mouse-scrollwheel",20,20),et=g("bring-forward",20,20),tt=g("brackets-square",20,20),it=g("bullseye-pointer",20,20),at=g("forward-step",20,20),nt=g("volume-slash",20,20),ot=g("keyboard",20,20),ue=g("x",18,18,'style="filter: brightness(0) invert(1);"'),pe=g("arrows-rotate",20,20,'style="filter: brightness(0) invert(1);"'),rt=g("arrow-left",20,20,'style="filter: brightness(0) invert(1);"'),lt=g("user",15,15),he=g("chevron-down",15,15),st=g("circle-half-stroke",20,20),ct=g("eye-slash",30,30),dt=g("eye-low-vision",30,30),gt=g("bring-forward",30,30),ut=g("df",30,30),pt=g("wheelchair",30,30),ht=g("puzzle-piece",30,30),fe=[{key:"darkMode",icon:Fe},{key:"blueLightFilter",icon:je},{key:"textResizing",icon:Ne},{key:"textAlign",icon:Qe},{key:"lineHeight",icon:Ge},{key:"textSpacing",icon:Oe},{key:"screenReader",icon:Je},{key:"dyslexiaFont",icon:Ue},{key:"readingMask",icon:Ke},{key:"readingGuide",icon:Ve},{key:"contentMagnifier",icon:We},{key:"highlightLinks",icon:Ye},{key:"highlightTitles",icon:Ze},{key:"hideImages",icon:Xe},{key:"pauseAnimations",icon:qe},{key:"cursorEnhancement",icon:_e},{key:"colorBlindMode",icon:et},{key:"saturation",icon:st},{key:"focusHighlight",icon:tt},{key:"largeClickTargets",icon:it},{key:"slowCursor",icon:$e},{key:"skipNavigation",icon:at},{key:"muteMedia",icon:nt},{key:"keyboardNavigation",icon:ot}],Y=[{key:"blind",label:"Blind",icon:ct,features:["screenReader","keyboardNavigation","skipNavigation","textResizing"]},{key:"lowVision",label:"Low Vision",icon:dt,features:["textResizing","saturation","cursorEnhancement","largeClickTargets"]},{key:"dyslexia",label:"Dyslexia",icon:ut,features:["dyslexiaFont","textSpacing","readingGuide"]},{key:"colorBlind",label:"Color Blind",icon:gt,features:["colorBlindMode"]},{key:"motorImpaired",label:"Motor",icon:pt,features:["keyboardNavigation","largeClickTargets","focusHighlight"]},{key:"attention",label:"ADHD",icon:ht,features:["readingGuide","pauseAnimations","readingMask"]}],_={title:"Accessibility Menu",poweredBy:"Powered by Inculva",resetAll:"Reset All",profilesTitle:"Profiles",closeMenu:"Close accessibility menu",categoryVision:"Vision",categoryReading:"Reading",categoryMotor:"Motor",categoryCalm:"Calm",highContrast:"Contrast Mode",darkMode:"Dark Mode",blueLightFilter:"Blue Light Filter",textResizing:"Larger Text",textAlign:"Text Alignment",lineHeight:"Line Height",textSpacing:"Text Spacing",screenReader:"Screen Reader",dyslexiaFont:"Dyslexia Mode",readingMask:"Reading Mask",readingGuide:"Reading Guide",contentMagnifier:"Magnifier",highlightLinks:"Link Selection",highlightTitles:"Highlight Titles",hideImages:"Hide Images",pauseAnimations:"Stop Animation",cursorEnhancement:"Cursor",colorBlindMode:"Color Blind",grayscale:"Grayscale",saturation:"Contrast+",focusHighlight:"Focus Indicator",largeClickTargets:"Large Targets",slowCursor:"Slow Cursor",skipNavigation:"Skip to Main",muteMedia:"Mute Media",keyboardNavigation:"Keyboard Nav",accessibilityStatement:"Accessibility Statement",languageLabel:"Select language",sizeSmall:"Mini",sizeMedium:"Regular",sizeLarge:"Large",resetSettings:"Reset settings",switchWidgetLeft:"Switch widget to left",switchWidgetRight:"Switch widget to right",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Achromatopsia",profile_blind:"Blind",profile_lowVision:"Low Vision",profile_colorBlind:"Color Blind",profile_dyslexia:"Dyslexia",profile_motorImpaired:"Motor",profile_attention:"ADHD",active:"Active"};function $(a){var e;return{..._,...(e=Te[a])!=null?e:{}}}const me=["deuteranopia","protanopia","tritanopia","achromatopsia"],ve=new Set(["ar","he","fa","ur"]),O=[{code:"en",label:"English",flag:"🇬🇧",en:"English"},{code:"tr",label:"Türkçe",flag:"🇹🇷",en:"Turkish"},{code:"de",label:"Deutsch",flag:"🇩🇪",en:"German"},{code:"fr",label:"Français",flag:"🇫🇷",en:"French"},{code:"es",label:"Español",flag:"🇪🇸",en:"Spanish"},{code:"it",label:"Italiano",flag:"🇮🇹",en:"Italian"},{code:"pt",label:"Português",flag:"🇵🇹",en:"Portuguese"},{code:"nl",label:"Nederlands",flag:"🇳🇱",en:"Dutch"},{code:"ar",label:"العربية",flag:"🇸🇦",en:"Arabic"},{code:"he",label:"עברית",flag:"🇮🇱",en:"Hebrew"},{code:"zh",label:"中文",flag:"🇨🇳",en:"Chinese"},{code:"ja",label:"日本語",flag:"🇯🇵",en:"Japanese"},{code:"ko",label:"한국어",flag:"🇰🇷",en:"Korean"},{code:"ru",label:"Русский",flag:"🇷🇺",en:"Russian"},{code:"pl",label:"Polski",flag:"🇵🇱",en:"Polish"},{code:"cs",label:"Čeština",flag:"🇨🇿",en:"Czech"},{code:"da",label:"Dansk",flag:"🇩🇰",en:"Danish"},{code:"fi",label:"Suomi",flag:"🇫🇮",en:"Finnish"},{code:"el",label:"Ελληνικά",flag:"🇬🇷",en:"Greek"},{code:"hu",label:"Magyar",flag:"🇭🇺",en:"Hungarian"},{code:"ro",label:"Română",flag:"🇷🇴",en:"Romanian"},{code:"sk",label:"Slovenčina",flag:"🇸🇰",en:"Slovak"},{code:"sv",label:"Svenska",flag:"🇸🇪",en:"Swedish"},{code:"uk",label:"Українська",flag:"🇺🇦",en:"Ukrainian"},{code:"bg",label:"Български",flag:"🇧🇬",en:"Bulgarian"},{code:"hr",label:"Hrvatski",flag:"🇭🇷",en:"Croatian"},{code:"lt",label:"Lietuvių",flag:"🇱🇹",en:"Lithuanian"},{code:"lv",label:"Latviešu",flag:"🇱🇻",en:"Latvian"},{code:"et",label:"Eesti",flag:"🇪🇪",en:"Estonian"},{code:"sl",label:"Slovenščina",flag:"🇸🇮",en:"Slovenian"},{code:"sr",label:"Srpski",flag:"🇷🇸",en:"Serbian"},{code:"no",label:"Norsk",flag:"🇳🇴",en:"Norwegian"},{code:"fa",label:"فارسی",flag:"🇮🇷",en:"Persian"},{code:"ur",label:"اردو",flag:"🇵🇰",en:"Urdu"},{code:"th",label:"ภาษาไทย",flag:"🇹🇭",en:"Thai"},{code:"vi",label:"Tiếng Việt",flag:"🇻🇳",en:"Vietnamese"},{code:"id",label:"Bahasa Indonesia",flag:"🇮🇩",en:"Indonesian"},{code:"ms",label:"Bahasa Melayu",flag:"🇲🇾",en:"Malay"},{code:"ca",label:"Català",flag:"🇪🇸",en:"Catalan"},{code:"sq",label:"Shqip",flag:"🇦🇱",en:"Albanian"},{code:"sw",label:"Kiswahili",flag:"🇹🇿",en:"Swahili"}];function ft(a){var c,d,u;const e=document.createElement("div");e.className="inculva-panel-header";const t=document.createElement("div");t.className="inculva-panel-title-wrap";const i=document.createElement("span");i.className="inculva-panel-title",i.textContent=(c=a.title)!=null?c:"Accessibility Menu";const n=document.createElement("span");n.className="inculva-keyboard-shortcut",n.textContent="(Ctrl+U)",n.setAttribute("aria-label","Keyboard shortcut: Control plus U");const o=document.createElement("span");o.className="inculva-active-count",o.hidden=!0,t.appendChild(i),t.appendChild(n),t.appendChild(o);const r=document.createElement("div");r.className="inculva-header-actions";const l=document.createElement("button");l.className="inculva-header-btn",l.setAttribute("type","button"),l.setAttribute("aria-label",(d=a.resetAll)!=null?d:"Reset All"),l.dataset.inculvaAction="reset",l.innerHTML=pe;const s=document.createElement("button");return s.className="inculva-header-btn inculva-panel-close",s.setAttribute("type","button"),s.setAttribute("aria-label",(u=a.closeMenu)!=null?u:"Close accessibility menu"),s.dataset.inculvaAction="close",s.innerHTML=ue,r.appendChild(l),r.appendChild(s),e.appendChild(t),e.appendChild(r),e}function mt(a,e){var v,C,B,D,J,U;const t=document.createElement("div");t.className="inculva-controls-bar";const i=document.createElement("div");i.className="inculva-controls-row";const n=(v=O.find(x=>x.code===a))!=null?v:O[0],o=document.createElement("div");o.className="inculva-lang-dropdown";const r=document.createElement("button");r.className="inculva-lang-trigger",r.setAttribute("type","button"),r.setAttribute("aria-label",(C=e.languageLabel)!=null?C:"Select language"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-haspopup","listbox"),r.dataset.inculvaAction="lang-dropdown-toggle";const l=document.createElement("span");l.className="inculva-lang-current-flag",l.textContent=n.flag;const s=document.createElement("span");s.className="inculva-lang-current-label",s.textContent=n.label;const c=document.createElement("span");c.className="inculva-lang-chevron",c.setAttribute("aria-hidden","true"),c.innerHTML=he,r.appendChild(l),r.appendChild(s),r.appendChild(c);const d=document.createElement("div");d.className="inculva-lang-list",d.setAttribute("role","listbox"),d.setAttribute("aria-label",(B=e.languageLabel)!=null?B:"Language");const u=document.createElement("div");u.className="inculva-lang-search-wrap";const m=document.createElement("input");m.type="search",m.className="inculva-lang-search",m.placeholder="🔍 Search...",m.setAttribute("autocomplete","off"),m.setAttribute("spellcheck","false"),m.setAttribute("aria-label","Search language"),u.appendChild(m),d.appendChild(u);for(const x of O){const A=document.createElement("button");A.className="inculva-lang-option"+(x.code===a?" active":""),A.setAttribute("type","button"),A.setAttribute("role","option"),A.setAttribute("aria-selected",x.code===a?"true":"false"),A.dataset.inculvaAction="set-language",A.dataset.langCode=x.code,A.dataset.enName=x.en;const M=document.createElement("span");M.className="inculva-lang-flag",M.textContent=x.flag;const F=document.createElement("span");F.className="inculva-lang-name",F.textContent=x.label;const h=document.createElement("span");h.className="inculva-lang-en-name",h.textContent=x.en!==x.label?x.en:"",h.setAttribute("aria-hidden","true"),A.appendChild(M),A.appendChild(F),A.appendChild(h),d.appendChild(A)}o.appendChild(r),o.appendChild(d);const p=document.createElement("div");p.className="inculva-size-group";const f=[["mini",(D=e.sizeSmall)!=null?D:"Mini"],["regular",(J=e.sizeMedium)!=null?J:"Regular"],["large",(U=e.sizeLarge)!=null?U:"Large"]];for(const[x,A]of f){const M=document.createElement("button");M.className=`inculva-ctrl-btn inculva-size-btn${x==="regular"?" active":""}`,M.setAttribute("type","button"),M.setAttribute("aria-label",A),M.dataset.size=x,M.textContent=A,p.appendChild(M)}return i.appendChild(o),i.appendChild(p),t.appendChild(i),t}function vt(a){var n,o;const e=document.createElement("div");e.className="inculva-profiles-section";const t=document.createElement("button");t.className="inculva-profiles-toggle",t.setAttribute("type","button"),t.setAttribute("aria-expanded","false"),t.dataset.inculvaAction="toggle-profiles",t.innerHTML=`${lt}<span>${(n=a.profilesTitle)!=null?n:"Profiles"}</span><span class="inculva-profiles-arrow">${he}</span>`,e.appendChild(t);const i=document.createElement("div");i.className="inculva-profiles-grid",i.hidden=!0;for(const r of Y){const l=document.createElement("button");l.className="inculva-profile-card",l.setAttribute("type","button"),l.setAttribute("aria-pressed","false"),l.dataset.profile=r.key;const s=document.createElement("span");s.className="inculva-profile-card-icon",s.setAttribute("aria-hidden","true"),s.innerHTML=r.icon;const c=document.createElement("span");c.textContent=(o=a[`profile_${r.key}`])!=null?o:r.label,l.appendChild(s),l.appendChild(c),i.appendChild(l)}return e.appendChild(i),e}function bt(a,e){var i,n,o;const t=document.createElement("div");t.className="inculva-feature-grid",t.dataset.activeTab="all";for(const r of fe){const l=a[r.key]!==!1,s=Pe(r.key),c=document.createElement("button");c.className="inculva-feature-btn",c.setAttribute("type","button"),c.dataset.feature=r.key,c.dataset.category=s,c.dataset.tooltip=(i=e[r.key])!=null?i:r.key,c.setAttribute("aria-pressed","false"),l||c.classList.add("inculva-hidden");const d=document.createElement("div");d.className="inculva-feature-icon-box",d.setAttribute("aria-hidden","true"),d.innerHTML=r.icon;const u=document.createElement("span");u.className="inculva-feature-label",u.textContent=(n=e[r.key])!=null?n:r.key,c.appendChild(d),c.appendChild(u);const m=N[r.key];if(m){c.dataset.levelCount=String(m);const p=document.createElement("span");p.className="inculva-feature-levels",p.setAttribute("aria-hidden","true");for(let f=0;f<m;f++){const v=document.createElement("span");v.className="inculva-level-dot",p.appendChild(v)}c.appendChild(p)}if(t.appendChild(c),r.key==="colorBlindMode"){const p=document.createElement("div");p.className="inculva-cbm-selector",p.dataset.category="vision",p.setAttribute("role","group"),p.setAttribute("aria-label","Color blind type");for(const f of me){const v=document.createElement("button");v.setAttribute("type","button"),v.className="inculva-cbm-btn"+(f==="deuteranopia"?" active":""),v.dataset.cbmType=f,v.setAttribute("aria-pressed",f==="deuteranopia"?"true":"false"),v.textContent=(o=e[f])!=null?o:f,p.appendChild(v)}t.appendChild(p)}}return t}function yt(){const a=document.createElement("div");a.className="inculva-mini-actions";const e=document.createElement("button");e.className="inculva-mini-btn",e.setAttribute("type","button"),e.setAttribute("aria-label","Expand widget"),e.dataset.size="regular",e.innerHTML=rt;const t=document.createElement("button");t.className="inculva-mini-btn",t.setAttribute("type","button"),t.setAttribute("aria-label","Reset all"),t.dataset.inculvaAction="reset",t.innerHTML=pe;const i=document.createElement("button");return i.className="inculva-mini-btn",i.setAttribute("type","button"),i.setAttribute("aria-label","Close widget"),i.dataset.inculvaAction="close",i.innerHTML=ue,a.appendChild(e),a.appendChild(t),a.appendChild(i),a}function kt(a,e){const t=document.createElement("div");return t.className="inculva-panel-body",t.appendChild(bt(a,e)),t}function be(a,e,t){var c,d,u,m,p;const i=document.createElement("div");i.className="inculva-prefooter";const n=document.createElement("button");if(n.setAttribute("type","button"),n.className="inculva-prefooter-reset",n.dataset.inculvaAction="reset",n.setAttribute("aria-label",(c=a.resetAll)!=null?c:"Reset All"),n.textContent=(d=a.resetSettings)!=null?d:"Reset settings",i.appendChild(n),t){const f=document.createElement("a");f.className="inculva-prefooter-a11y",f.href=t,f.target="_blank",f.rel="noopener noreferrer",f.textContent=(u=a.accessibilityStatement)!=null?u:"Accessibility Statement",i.appendChild(f)}const o=document.createElement("div");o.className="inculva-prefooter-switch";const r=document.createElement("span");r.className="inculva-switch-label",r.textContent=e?(m=a.switchWidgetRight)!=null?m:"Switch widget to right":(p=a.switchWidgetLeft)!=null?p:"Switch widget to left";const l=document.createElement("button");l.setAttribute("type","button"),l.className=`inculva-switch-track${e?" active":""}`,l.dataset.inculvaAction="switch-side",l.setAttribute("role","switch"),l.setAttribute("aria-checked",String(e)),l.setAttribute("aria-label",r.textContent);const s=document.createElement("span");return s.className="inculva-switch-thumb",l.appendChild(s),o.appendChild(r),o.appendChild(l),i.appendChild(o),i}function xt(a,e){const t=document.createElement("div");t.className="inculva-panel-footer";const i=document.createElement("span");return i.className="inculva-footer-logo",i.innerHTML=de(120),t.appendChild(i),t}function At(a,e,t,i,n=!1){var l;const o=$(e),r=document.createElement("div");return r.id="inculva-widget-panel",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","false"),r.setAttribute("aria-label",(l=o.title)!=null?l:"Accessibility Menu"),r.dataset.size="regular",ve.has(e)&&r.setAttribute("dir","rtl"),r.appendChild(ft(o)),r.appendChild(vt(o)),r.appendChild(mt(e,o)),r.appendChild(kt(a,o)),r.appendChild(yt()),r.appendChild(be(o,n,t)),r.appendChild(xt()),r}function ee(a,e,t,i,n,o){var v,C,B,D,J,U,x,A,M,F;const r=i?{..._,...i}:_;ve.has(t)?a.setAttribute("dir","rtl"):a.removeAttribute("dir"),a.setAttribute("aria-label",(v=r.title)!=null?v:"Accessibility Menu");const l=a.querySelector(".inculva-panel-title");l&&(l.textContent=(C=r.title)!=null?C:"Accessibility Menu");const s=a.querySelector(".inculva-panel-close");s&&s.setAttribute("aria-label",(B=r.closeMenu)!=null?B:"Close accessibility menu");const c=O.find(h=>h.code===t);if(c){const h=a.querySelector(".inculva-lang-current-flag"),y=a.querySelector(".inculva-lang-current-label");h&&(h.textContent=c.flag),y&&(y.textContent=c.label);for(const L of a.querySelectorAll(".inculva-lang-option")){const z=L.dataset.langCode===t;L.classList.toggle("active",z),L.setAttribute("aria-selected",String(z))}}const d={mini:(D=r.sizeSmall)!=null?D:"Mini",regular:(J=r.sizeMedium)!=null?J:"Regular",large:(U=r.sizeLarge)!=null?U:"Large"};for(const[h,y]of Object.entries(d)){const L=a.querySelector(`.inculva-size-btn[data-size="${h}"]`);L&&(L.setAttribute("aria-label",y),L.textContent=y)}for(const h of fe){const y=a.querySelector(`[data-feature="${h.key}"]`);if(!y)continue;const L=e[h.key]!==!1;y.classList.toggle("inculva-hidden",!L);const z=(x=r[h.key])!=null?x:h.key,Me=y.querySelector(".inculva-feature-label");Me&&(Me.textContent=z),y.dataset.tooltip=z}const u=a.querySelector(".inculva-cbm-selector");if(u)for(const h of me){const y=u.querySelector(`[data-cbm-type="${h}"]`);y&&(y.textContent=(A=r[h])!=null?A:h)}for(const h of Y){const y=a.querySelector(`[data-profile="${h.key}"]`);if(!y)continue;const L=y.querySelectorAll("span"),z=L[L.length-1];z&&!z.classList.contains("inculva-profile-card-icon")&&(z.textContent=(M=r[`profile_${h.key}`])!=null?M:h.label)}const m=a.querySelector(".inculva-profiles-toggle > span:nth-child(2)");m&&(m.textContent=(F=r.profilesTitle)!=null?F:"Profiles");const p=a.querySelector(".inculva-prefooter");if(p){const h=a.getAttribute("data-panel-side")==="left",y=be(r,h,n);p.replaceWith(y)}const f=a.querySelector(".inculva-panel-footer");if(f){f.innerHTML="";const h=document.createElement("span");h.className="inculva-footer-logo",h.innerHTML=de(120),f.appendChild(h)}}function ye(a,e,t){var o,r;const i=a.querySelector(".inculva-switch-label"),n=a.querySelector(".inculva-switch-track");if(i){const l=e?(o=t.switchWidgetRight)!=null?o:"Switch widget to right":(r=t.switchWidgetLeft)!=null?r:"Switch widget to left";i.textContent=l}n&&(n.classList.toggle("active",e),n.setAttribute("aria-checked",String(e)))}function wt(a){const e=document.createElement("button");return e.id="inculva-widget-btn",e.setAttribute("aria-label","Open Accessibility Menu"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-haspopup","dialog"),e.style.backgroundColor=a,e.innerHTML=`${He}<span id="inculva-widget-badge" aria-hidden="true"></span>`,e}function P(a,e){const t="20px";a.style.bottom=e.includes("bottom")?t:"auto",a.style.top=e.includes("top")?t:"auto",a.style.right=e.includes("right")?t:"auto",a.style.left=e.includes("left")?t:"auto"}function Z(a,e,t){const i=e.getBoundingClientRect(),n=12,o=8;if(a.style.bottom="auto",a.style.top="auto",a.style.right="auto",a.style.left="auto",t.includes("bottom")){const r=window.innerHeight-i.top+n;a.style.bottom=`${r}px`,a.style.maxHeight=`${window.innerHeight-r-o}px`}else{const r=i.bottom+n;a.style.top=`${r}px`,a.style.maxHeight=`${window.innerHeight-r-o}px`}t.includes("right")?a.style.right="20px":a.style.left="20px"}const Ct=`
  /* ── Trigger Button ─────────────────────────────────────────────────── */
  #inculva-widget-btn {
    position: fixed !important;
    z-index: 2147483645 !important;
    width: var(--inculva-button-size, 58px);
    height: var(--inculva-button-size, 58px);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.24), 0 2px 6px rgba(0,0,0,0.14);
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
    outline: none;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  #inculva-widget-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 28px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.16);
  }
  #inculva-widget-btn:active { transform: scale(0.95); }
  #inculva-widget-btn:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 3px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.24), 0 0 0 6px rgba(255,255,255,0.3);
  }
  #inculva-widget-btn[aria-expanded="true"] { transform: scale(1.05); }

  /* Active features badge */
  #inculva-widget-badge {
    position: absolute !important;
    top: -4px;
    right: -4px;
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    display: none;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    padding: 0 3px;
    pointer-events: none;
    z-index: 1;
  }
  #inculva-widget-badge.visible { display: flex; }

  /* ── Backdrop ────────────────────────────────────────────────────────── */
  #inculva-widget-backdrop {
    position: fixed !important;
    inset: 0;
    z-index: 2147483644 !important;
    display: none;
    background: transparent;
  }
  #inculva-widget-backdrop.open { display: block; }

  /* ── Widget Panel ────────────────────────────────────────────────────── */
  #inculva-widget-panel {
    position: fixed !important;
    z-index: 2147483645 !important;
    width: 520px;
    max-height: calc(100vh - 110px);
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    box-shadow: 0 10px 48px rgba(0,0,0,0.22), 0 2px 14px rgba(0,0,0,0.12);
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif);
    font-size: 14px;
    line-height: 1.4;
    background: #f7f7f7;
    color: #1a1a2e;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px) scale(0.98);
    transition: opacity 0.2s ease, visibility 0.2s, transform 0.24s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
  }
  #inculva-widget-panel.open {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  @media (max-width: 575px) {
    #inculva-widget-panel {
      width: calc(100vw - 16px) !important;
      border-radius: 16px !important;
      left: 8px !important;
      right: 8px !important;
    }
    .inculva-controls-bar {
      padding: 8px 10px !important;
    }
    .inculva-controls-row {
      gap: 7px !important;
    }
    .inculva-lang-trigger {
      height: 38px !important;
    }
    .inculva-panel-body {
      padding: 10px 10px 0 !important;
    }
  }

  /* ── Panel Header — uses primary color as background ────────────────── */
  .inculva-panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    height: 64px;
    flex-shrink: 0;
    background: var(--inculva-header-bg, var(--inculva-primary, #0066cc));
    color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    cursor: default;
    user-select: none;
    border-radius: 18px 18px 0 0;
  }
  .inculva-panel-header-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .inculva-panel-title-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .inculva-panel-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff;
    font-family: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .inculva-active-count {
    background: rgba(255,255,255,0.25);
    color: #fff;
    border-radius: 12px;
    padding: 3px 9px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .inculva-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-left: 1px solid rgba(255,255,255,0.22);
    padding-left: 14px;
    margin-left: 6px;
  }
  .inculva-header-btn {
    width: 42px;
    height: 42px;
    border-radius: 11px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    background: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.9);
    transition: background 0.12s, color 0.12s, transform 0.1s;
    outline: none;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-header-btn:hover { background: rgba(255,255,255,0.28); color: #fff; }
  .inculva-header-btn:active { transform: scale(0.9); }
  .inculva-header-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.7); outline-offset: 1px; }

  /* ── Controls Bar Row ────────────────────────────────────────────────── */
  .inculva-controls-bar {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 10px 14px;
    flex-shrink: 0;
    background: #f7f7f7;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .inculva-controls-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── Custom Language Dropdown ────────────────────────────────────────── */
  .inculva-lang-dropdown {
    position: relative;
    flex: 1;
    min-width: 0;
  }
  .inculva-lang-trigger {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 10px;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.14);
    border-radius: 9px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 500;
    color: #374151;
    outline: none;
    transition: border-color 0.12s, box-shadow 0.12s;
    -webkit-tap-highlight-color: transparent;
    text-align: start;
  }
  .inculva-lang-trigger:hover { border-color: rgba(0,0,0,0.28); }
  .inculva-lang-trigger:focus-visible {
    border-color: var(--inculva-primary, #0066cc);
    box-shadow: 0 0 0 3px rgba(var(--inculva-primary-rgb, 0,102,204), 0.18);
  }
  .inculva-lang-dropdown.open .inculva-lang-trigger {
    border-color: var(--inculva-primary, #0066cc);
    box-shadow: 0 0 0 3px rgba(var(--inculva-primary-rgb, 0,102,204), 0.18);
  }
  .inculva-lang-globe {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    opacity: 0.55;
    color: #4b5563;
  }
  .inculva-lang-globe svg { width: 15px; height: 15px; }
  .inculva-lang-current-flag {
    font-size: 16px;
    line-height: 1;
    flex-shrink: 0;
  }
  .inculva-lang-current-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .inculva-lang-chevron {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #9ca3af;
    transition: transform 0.2s;
  }
  .inculva-lang-dropdown.open .inculva-lang-chevron { transform: rotate(180deg); }

  /* Dropdown list */
  .inculva-lang-list {
    display: none;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 12px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
    max-height: 280px;
    overflow-y: auto;
    z-index: 50;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.12) transparent;
    padding: 0 4px 4px;
  }
  .inculva-lang-list::-webkit-scrollbar { width: 4px; }
  .inculva-lang-list::-webkit-scrollbar-track { background: transparent; }
  .inculva-lang-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
  .inculva-lang-dropdown.open .inculva-lang-list { display: block; }
  .inculva-lang-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 10px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    text-align: start;
    transition: background 0.1s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-lang-option:hover { background: #f3f4f6; }
  .inculva-lang-option:focus-visible { background: #f3f4f6; outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-lang-option.active {
    background: rgba(var(--inculva-primary-rgb, 0,102,204), 0.10);
    color: var(--inculva-primary, #0066cc);
    font-weight: 600;
  }
  .inculva-lang-flag {
    font-size: 22px;
    line-height: 1;
    flex-shrink: 0;
    width: 30px;
    text-align: center;
  }
  .inculva-lang-name {
    flex: 1;
    font-size: 14px;
  }
  .inculva-lang-en-name {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 400;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Language search input */
  .inculva-lang-search-wrap {
    padding: 6px 6px 4px;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
    border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .inculva-lang-search {
    width: 100%;
    height: 34px;
    border: 1.5px solid rgba(0,0,0,0.14);
    border-radius: 8px;
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    color: #374151;
    background: #f9fafb;
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
  }
  .inculva-lang-search:focus {
    border-color: var(--inculva-primary, #0066cc);
    background: #fff;
  }
  .inculva-lang-search::-webkit-search-cancel-button { display: none; }
  .inculva-lang-option.inculva-hidden { display: none !important; }

  /* Size toggle group — full primary color pill so white text is always readable */
  .inculva-size-group {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    background: var(--inculva-primary, #0066cc);
    border-radius: 11px;
    padding: 3px;
  }
  .inculva-ctrl-btn {
    height: 34px;
    min-width: 34px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    background: transparent;
    color: rgba(255,255,255,0.72);
    transition: background 0.12s, color 0.12s, transform 0.1s;
    outline: none;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-ctrl-btn:hover {
    background: rgba(255,255,255,0.14);
    color: #fff;
  }
  .inculva-ctrl-btn:active { transform: scale(0.92); }
  .inculva-ctrl-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.7); outline-offset: 1px; }
  /* Text size buttons — wider than icon buttons */
  .inculva-size-btn { padding: 0 13px; }
  .inculva-size-btn.active {
    background: #fff;
    color: var(--inculva-primary, #0066cc);
    box-shadow: 0 1px 6px rgba(0,0,0,0.20);
    font-weight: 700;
  }

  /* ── Profile Section (accordion + card grid) ────────────────────────── */
  .inculva-profiles-section {
    margin: 10px 12px 0;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    flex-shrink: 0;
  }
  .inculva-profiles-toggle {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    background: #fff;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 600;
    color: #111;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: background 0.12s;
  }
  .inculva-profiles-toggle > span:nth-child(2) { flex: 1; }
  .inculva-profiles-toggle:hover { background: #f9fafb; }
  .inculva-profiles-toggle:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: -2px; }
  .inculva-profiles-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    color: #9ca3af;
  }
  .inculva-profiles-toggle[aria-expanded="true"] .inculva-profiles-arrow {
    transform: rotate(180deg);
  }
  .inculva-profiles-grid {
    border-top: 1px solid rgba(0,0,0,0.07);
    padding: 10px;
  }
  /* Override — grid is the display when visible (hidden attr removed by JS) */
  .inculva-profiles-grid:not([hidden]) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }
  .inculva-profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 11px 6px 9px;
    background: #fff;
    border: 1.5px solid rgba(0,0,0,0.10);
    border-radius: 13px;
    cursor: pointer;
    font-family: inherit;
    font-size: 11.5px;
    font-weight: 600;
    color: #374151;
    line-height: 1.25;
    text-align: center;
    transition: border-color 0.12s, background 0.12s, box-shadow 0.12s, transform 0.1s;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    word-break: break-word;
    hyphens: auto;
  }
  @media (min-width: 785px) {
    .inculva-profile-card:hover {
      border-color: var(--inculva-primary, #0066cc);
      background: rgba(var(--inculva-primary-rgb, 0,102,204), 0.05);
    }
  }
  .inculva-profile-card:active { transform: scale(0.95); }
  .inculva-profile-card:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-profile-card.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
    color: #fff !important;
  }
  .inculva-profile-card-icon {
    width: 50px;
    height: 50px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
  }
  .inculva-profile-card.active .inculva-profile-card-icon {
    background: #fff;
    color: #fff;
  }

  /* ── Panel Body (scrollable) ─────────────────────────────────────────── */
  .inculva-panel-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px 12px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.14) transparent;
    background: #f7f7f7;
  }
  .inculva-panel-body::-webkit-scrollbar { width: 4px; }
  .inculva-panel-body::-webkit-scrollbar-track { background: transparent; }
  .inculva-panel-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.13); border-radius: 4px; }

  /* ── Feature Grid ────────────────────────────────────────────────────── */
  .inculva-feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    margin-bottom: 12px;
  }

  /* ── Feature Button ──────────────────────────────────────────────────── */
  .inculva-feature-btn {
    border: 2px solid rgba(54,54,54,0.12);
    border-radius: var(--inculva-border-radius, 15px);
    padding: 16px 10px 13px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    font-size: 12.5px;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25;
    text-align: center;
    background: #fff;
    color: #000;
    transition: border-color 0.12s, background 0.12s, transform 0.1s, box-shadow 0.12s;
    outline: none;
    min-height: 108px;
    word-break: break-word;
    hyphens: auto;
    -webkit-tap-highlight-color: transparent;
    position: relative;
  }
  @media (min-width: 785px) {
    .inculva-feature-btn:hover {
      border-color: var(--inculva-primary, #0066cc);
      background: #fafbff;
      box-shadow: 0 2px 10px rgba(0,102,204,0.12);
      transition: all 0.1s;
    }
  }
  .inculva-feature-btn:active { transform: scale(0.96); }
  .inculva-feature-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
    color: #fff !important;
  }
  /* Active state: icon box border matches the active button border (primary color) */
  .inculva-feature-btn.active .inculva-feature-icon-box {
    background: #fff !important;
    border-color: var(--inculva-primary, #0066cc) !important;
  }

  /* Icon box — white bg, border matches the feature button border color */
  .inculva-feature-icon-box {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: #fff;
    border: 1.5px solid rgba(54,54,54,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
  }
  .inculva-feature-icon-box svg {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    display: block;
    color: #000;
  }
  .inculva-feature-icon-box svg path,
  .inculva-feature-icon-box svg rect,
  .inculva-feature-icon-box svg circle {
    stroke: #000;
  }
  .inculva-feature-icon-box svg [data-fill="1"] {
    fill: #000;
    stroke: none;
  }
  .inculva-feature-label {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.25;
    font-family: inherit;
  }

  /* ── Level Indicator (segmented bar below label) ─────────────────────── */
  .inculva-feature-levels {
    display: flex;
    gap: 3px;
    width: calc(100% - 16px);
    margin-top: 1px;
  }
  .inculva-level-dot {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(67,67,80,0.13);
    transition: background 0.15s;
  }
  [data-level="1"] .inculva-level-dot:nth-child(1),
  [data-level="2"] .inculva-level-dot:nth-child(-n+2),
  [data-level="3"] .inculva-level-dot:nth-child(-n+3),
  [data-level="4"] .inculva-level-dot:nth-child(-n+4),
  [data-level="5"] .inculva-level-dot:nth-child(-n+5) {
    background: var(--inculva-primary, #0066cc);
  }
  .inculva-feature-btn.active .inculva-level-dot {
    background: rgba(255,255,255,0.3);
  }
  .inculva-feature-btn.active[data-level="1"] .inculva-level-dot:nth-child(1),
  .inculva-feature-btn.active[data-level="2"] .inculva-level-dot:nth-child(-n+2),
  .inculva-feature-btn.active[data-level="3"] .inculva-level-dot:nth-child(-n+3),
  .inculva-feature-btn.active[data-level="4"] .inculva-level-dot:nth-child(-n+4),
  .inculva-feature-btn.active[data-level="5"] .inculva-level-dot:nth-child(-n+5) {
    background: rgba(255,255,255,0.95);
  }

  /* ── Color Blind Sub-Selector ────────────────────────────────────────── */
  .inculva-cbm-selector {
    grid-column: 1 / -1;
    display: none;
    flex-wrap: wrap;
    gap: 6px;
    padding: 2px 0 4px;
  }
  .inculva-cbm-selector.visible { display: flex; }
  .inculva-cbm-btn {
    flex: 1 1 auto;
    border: 1.5px solid rgba(0,0,0,0.1);
    border-radius: 9px;
    padding: 6px 8px;
    font-size: 11.5px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    transition: all 0.15s;
    text-align: center;
    background: #fff;
    color: #374151;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-cbm-btn:hover { opacity: 0.85; }
  .inculva-cbm-btn:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 1px; }
  .inculva-cbm-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    border-color: var(--inculva-primary, #0066cc);
    font-weight: 700;
  }

  /* ── Reset Row (legacy — kept for any external references) ──────────── */
  .inculva-reset-row { display: none; }

  /* ── Mini Mode ───────────────────────────────────────────────────────── */
  #inculva-widget-panel[data-size="mini"] {
    width: 86px !important;
    border-radius: 18px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-header,
  #inculva-widget-panel[data-size="mini"] .inculva-profiles-section,
  #inculva-widget-panel[data-size="mini"] .inculva-controls-bar,
  #inculva-widget-panel[data-size="mini"] .inculva-prefooter,
  #inculva-widget-panel[data-size="mini"] .inculva-panel-footer {
    display: none !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-panel-body {
    padding: 8px 6px 0;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-grid {
    grid-template-columns: 1fr !important;
    gap: 5px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-grid .inculva-feature-btn:not(.inculva-hidden) {
    display: flex !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn {
    min-height: 62px !important;
    padding: 7px 5px 6px !important;
    border-radius: 13px !important;
    border: 1.5px solid rgba(0,0,0,0.09) !important;
    background: #fff !important;
    gap: 3px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-icon-box {
    width: 38px !important;
    height: 38px !important;
    min-height: 0 !important;
    border-radius: 10px !important;
    border: 1.5px solid rgba(54,54,54,0.12) !important;
    background: #fff !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-icon-box svg {
    width: 20px !important;
    height: 20px !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-label { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-cbm-selector  { display: none !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-levels {
    width: calc(100% - 8px) !important;
    gap: 2px !important;
    margin-top: 0 !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-level-dot { height: 2px !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-mini-actions  { display: flex !important; }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc) !important;
    border-color: var(--inculva-primary, #0066cc) !important;
  }
  #inculva-widget-panel[data-size="mini"] .inculva-feature-btn.active .inculva-feature-icon-box {
    background: #fff !important;
    border-color: var(--inculva-primary, #0066cc) !important;
  }

  /* ── Large Mode ──────────────────────────────────────────────────────── */
  #inculva-widget-panel[data-size="large"] .inculva-feature-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-btn {
    min-height: 128px !important;
    padding: 20px 12px 16px !important;
    gap: 11px !important;
    font-size: 14px !important;
    border-width: 2px !important;
    border-radius: 17px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-icon-box {
    width: 64px !important;
    height: 64px !important;
    border-radius: 17px !important;
    border-width: 1.5px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-icon-box svg {
    width: 32px !important;
    height: 32px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-feature-label { font-size: 14px !important; }
  #inculva-widget-panel[data-size="large"] .inculva-feature-levels {
    width: calc(100% - 22px) !important;
    gap: 4px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-level-dot {
    height: 4px !important;
    border-radius: 2px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-panel-header {
    height: 72px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-panel-title {
    font-size: 18px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-panel-body {
    padding: 14px 14px 0 !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-controls-bar {
    padding: 12px 16px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-controls-row {
    gap: 12px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-lang-trigger {
    height: 40px !important;
    font-size: 15px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-ctrl-btn {
    height: 40px !important;
    font-size: 14px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-size-btn {
    padding: 0 16px !important;
  }
  /* Large mode — profiles section */
  #inculva-widget-panel[data-size="large"] .inculva-profiles-section {
    margin: 12px 14px 0 !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profiles-toggle {
    height: 48px !important;
    font-size: 15px !important;
    padding: 0 16px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profiles-grid {
    gap: 9px !important;
    padding: 12px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profile-card {
    padding: 13px 8px 11px !important;
    font-size: 12.5px !important;
    border-radius: 15px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profile-card-icon {
    width: 40px !important;
    height: 40px !important;
    border-radius: 11px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-profile-card-icon svg {
    width: 22px !important;
    height: 22px !important;
  }
  /* Large mode — prefooter */
  #inculva-widget-panel[data-size="large"] .inculva-prefooter {
    padding: 14px 16px !important;
    gap: 10px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-prefooter-reset {
    font-size: 15px !important;
    padding: 12px 20px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-prefooter-a11y {
    font-size: 14px !important;
    padding: 11px 20px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-label {
    font-size: 14px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-track {
    width: 48px !important;
    height: 26px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-thumb {
    width: 22px !important;
    height: 22px !important;
  }
  #inculva-widget-panel[data-size="large"] .inculva-switch-track.active .inculva-switch-thumb {
    transform: translateX(22px) !important;
  }

  /* Mini actions bar */
  .inculva-mini-actions {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    background: var(--inculva-primary, #0066cc);
    border-radius: 0 0 18px 18px;
    padding: 18px 14px;
    height: 160px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    flex-shrink: 0;
  }
  .inculva-mini-btn {
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
    color: #fff;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
  }
  .inculva-mini-btn:hover { opacity: 0.75; }
  .inculva-mini-btn:focus-visible { outline: 1px solid rgba(255,255,255,0.7); border-radius: 8px; }
  .inculva-mini-btn svg { width: 24px; height: 24px; }
  #inculva-widget-panel[data-size="mini"] { padding-bottom: 168px; }

  /* ── Pre-footer action bar ───────────────────────────────────────────── */
  .inculva-prefooter {
    flex-shrink: 0;
    padding: 12px 14px;
    background: #fff;
    border-top: 1px solid #ececec;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .inculva-prefooter-reset {
    width: 100%;
    padding: 10px 16px;
    background: #fff;
    color: #1a1a2e;
    border: 1.5px solid #e4e4e7;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s;
    -webkit-tap-highlight-color: transparent;
    letter-spacing: 0.01em;
  }
  .inculva-prefooter-reset:hover { background: #f7f7f7; border-color: #d1d5db; }
  .inculva-prefooter-reset:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; }
  .inculva-prefooter-a11y {
    display: block;
    width: 100%;
    padding: 9px 16px;
    background: transparent;
    color: #1a1a2e;
    border: 1.5px solid #d4d4d8;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
  }
  .inculva-prefooter-a11y:hover { background: #f4f4f5; border-color: #a1a1aa; }
  .inculva-prefooter-a11y:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; }
  .inculva-prefooter-switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
    gap: 8px;
  }
  .inculva-switch-label {
    font-size: 13px;
    font-weight: 500;
    color: #1a1a2e;
    font-family: inherit;
    flex: 1;
    user-select: none;
  }
  .inculva-switch-track {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 100px;
    background: #e4e4e7;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  .inculva-switch-track.active { background: var(--inculva-primary, #0066cc); }
  .inculva-switch-track:focus-visible { outline: 2px solid var(--inculva-primary, #0066cc); outline-offset: 2px; }
  .inculva-switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.22);
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inculva-switch-track.active .inculva-switch-thumb { transform: translateX(20px); }
  /* OFF state — show ✕ inside thumb */
  .inculva-switch-thumb::after {
    content: '✕';
    font-size: 9px;
    color: #a1a1aa;
    font-weight: 700;
    line-height: 1;
  }
  .inculva-switch-track.active .inculva-switch-thumb::after { content: ''; }

  /* ── Panel Footer — uses primary color as background ─────────────────── */
  .inculva-panel-footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 16px;
    flex-shrink: 0;
    background: var(--inculva-footer-bg, var(--inculva-primary, #0066cc));
    border-top: 1px solid rgba(0,0,0,0.12);
    min-height: 42px;
    border-radius: 0 0 18px 18px;
  }
  .inculva-footer-logo {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.8);
    font-family: inherit;
  }

  /* ── RTL Support ─────────────────────────────────────────────────────── */
  /* direction: rtl from dir="rtl" already reverses flex-direction:row flow. */
  /* We only need to fix directional properties (border-left→right, etc.)   */
  #inculva-widget-panel[dir="rtl"] .inculva-header-actions {
    border-left: none;
    border-right: 1px solid rgba(255,255,255,0.22);
    padding-left: 0;
    padding-right: 14px;
    margin-left: 0;
    margin-right: 6px;
  }
  #inculva-widget-panel[dir="rtl"] .inculva-profiles-toggle { text-align: right; }
  #inculva-widget-panel[dir="rtl"] .inculva-lang-list {
    left: 0;
    right: 0;
  }
  #inculva-widget-panel[dir="rtl"] .inculva-lang-trigger { text-align: right; }
  #inculva-widget-panel[dir="rtl"] .inculva-switch-thumb {
    transform: translateX(20px);
  }
  #inculva-widget-panel[dir="rtl"] .inculva-switch-track.active .inculva-switch-thumb {
    transform: translateX(0);
  }
  #inculva-widget-panel[dir="rtl"] .inculva-prefooter-switch { flex-direction: row-reverse; }
  #inculva-widget-panel[dir="rtl"] .inculva-lang-option { text-align: right; }

  /* ── Reduced Motion ──────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    #inculva-widget-btn,
    #inculva-widget-panel,
    .inculva-feature-btn,
    .inculva-header-btn,
    .inculva-ctrl-btn,
    .inculva-feature-icon-box,
    .inculva-profile-card {
      transition: none !important;
      animation: none !important;
    }
  }

  /* ── Hidden utility (site-owner-disabled features) ──────────────────── */
  .inculva-hidden { display: none !important; }

  /* ── Screen Reader Only ──────────────────────────────────────────────── */
  .inculva-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }

  /* ── Feature Button Tooltip ──────────────────────────────────────────── */
  #inculva-tooltip {
    position: fixed;
    z-index: 2147483646;
    background: rgba(26,26,46,0.92);
    color: #fff;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    padding: 6px 10px;
    border-radius: 8px;
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.15s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.24);
    max-width: 200px;
  }
  #inculva-tooltip.visible { opacity: 1; }
`,ke="inculva-widget-prefs";function Mt(a){try{localStorage.setItem(ke,JSON.stringify(a))}catch(e){}}function St(){try{const a=localStorage.getItem(ke);return a?JSON.parse(a):{}}catch(a){return{}}}const xe="inculva-session-id";let te=null;function Lt(){try{let a=sessionStorage.getItem(xe);return a||(a=crypto.randomUUID(),sessionStorage.setItem(xe,a)),a}catch(a){return te||(te=crypto.randomUUID()),te}}const Ae={position:"bottom-right",theme:"light",primaryColor:"#0066cc",language:"en",features:{textResizing:!0,dyslexiaFont:!0,cursorEnhancement:!0,keyboardNavigation:!0,readingGuide:!0,screenReader:!0,pauseAnimations:!0,textSpacing:!0,highlightLinks:!0,colorBlindMode:!0,largeClickTargets:!0,focusHighlight:!0,skipNavigation:!0,muteMedia:!0,readingMask:!0,textAlign:!0,saturation:!0,blueLightFilter:!0,hideImages:!0,darkMode:!0,contentMagnifier:!0,toolTips:!1,sustainabilityMode:!1,slowCursor:!0,dictionary:!1,lineHeight:!0,highlightTitles:!0}};class we{constructor(e){w(this,"config");w(this,"activeFeatures",new Set);w(this,"activeProfiles",new Set);w(this,"featureLevels",new Map);w(this,"_restoring",!1);w(this,"isOpen",!1);w(this,"btn");w(this,"badge");w(this,"panel");w(this,"backdrop");w(this,"liveRegion");w(this,"tooltip");w(this,"apiBase");w(this,"labels",{});var t;this.config={...Ae,...e,features:{...Ae.features,...e.features}},this.apiBase=(t=window.INCULVA_API_URL)!=null?t:"https://api.inculva.com",this.init()}get _labels(){return{...$(this.config.language),...this.labels}}init(){this.bootstrap()}async bootstrap(){await this.fetchRemoteConfig()&&(this.injectStyles(),this.applyTheme(),this.renderWidget(),q(this.config.language),this.applyConfigToDOM(),this.restorePrefs())}injectStyles(){const e=document.createElement("style");e.id="inculva-styles",e.textContent=Ct.replace(/var\(--inculva-primary,\s*#0066cc\)/g,`var(--inculva-primary, ${this.config.primaryColor})`),document.head.appendChild(e),document.documentElement.style.setProperty("--inculva-primary",this.config.primaryColor);const t=this.config.primaryColor.replace("#",""),i=parseInt(t.slice(0,2),16),n=parseInt(t.slice(2,4),16),o=parseInt(t.slice(4,6),16);document.documentElement.style.setProperty("--inculva-primary-rgb",`${i},${n},${o}`)}applyTheme(){const e=this.config.theme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.config.theme;document.documentElement.setAttribute("data-inculva-theme",e)}renderWidget(){this.btn=wt(this.config.primaryColor),this.badge=this.btn.querySelector("#inculva-widget-badge"),this.panel=At(this.config.features,this.config.language,this.config.accessibilityStatementUrl,this.config.whiteLabelText,this.config.position.includes("left")),this.backdrop=document.createElement("div"),this.backdrop.id="inculva-widget-backdrop",this.backdrop.addEventListener("click",()=>this.closePanel()),this.liveRegion=document.createElement("div"),this.liveRegion.setAttribute("role","status"),this.liveRegion.setAttribute("aria-live","polite"),this.liveRegion.setAttribute("aria-atomic","true"),this.liveRegion.className="inculva-sr-only",document.body.appendChild(this.liveRegion),P(this.btn,this.config.position),P(this.panel,this.config.position),this.config.position.includes("left")&&this.panel.setAttribute("data-panel-side","left"),this.btn.addEventListener("click",()=>this.togglePanel()),this.panel.addEventListener("click",e=>{const t=e.target.closest("[data-inculva-action]");if(t){const s=t.dataset.inculvaAction;if(s==="close"){this.closePanel();return}if(s==="reset"){this.resetAll();return}if(s==="toggle-profiles"){this.toggleProfiles();return}if(s==="switch-side"){this.switchSide();return}if(s==="lang-dropdown-toggle"){this._toggleLangDropdown();return}if(s==="set-language"){const c=t.dataset.langCode;c&&this._setLanguage(c);return}}const i=e.target.closest(".inculva-ctrl-btn.inculva-size-btn, .inculva-mini-btn");if(i!=null&&i.dataset.size){this.switchSize(i.dataset.size);return}const n=e.target.closest("[data-inculva-tab]");if(n!=null&&n.dataset.inculvaTab){this.switchTab(n.dataset.inculvaTab);return}const o=e.target.closest("[data-profile]");if(o!=null&&o.dataset.profile){this.activateProfile(o.dataset.profile);return}const r=e.target.closest("[data-cbm-type]");if(r!=null&&r.dataset.cbmType){this.selectColorBlindType(r.dataset.cbmType);return}const l=e.target.closest("[data-feature]");if(l!=null&&l.dataset.feature){const s=l.dataset.feature;N[s]?this.cycleFeatureLevel(s):this.toggleFeature(s)}}),document.addEventListener("keydown",e=>{var t;if(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey&&e.key==="u"){e.preventDefault(),this.togglePanel();return}if(e.key==="Escape"&&this.isOpen){const i=this.panel.querySelector(".inculva-lang-dropdown");if(i!=null&&i.classList.contains("open")){this._closeLangDropdown();return}this.closePanel();return}if(this.isOpen&&(e.key==="ArrowDown"||e.key==="ArrowUp")){const i=this.panel.querySelector(".inculva-lang-dropdown");if(i!=null&&i.classList.contains("open")){e.preventDefault();const n=Array.from(i.querySelectorAll(".inculva-lang-option")),o=document.activeElement,r=n.indexOf(o),l=e.key==="ArrowDown"?Math.min(r+1,n.length-1):Math.max(r-1,0);(t=n[l])==null||t.focus();return}}e.key==="Tab"&&this.isOpen&&this.trapFocus(e)}),this.tooltip=document.createElement("div"),this.tooltip.id="inculva-tooltip",document.documentElement.appendChild(this.tooltip),this.panel.addEventListener("input",e=>{var o,r,l,s,c;const t=e.target;if(!t.classList.contains("inculva-lang-search"))return;const i=t.value.toLowerCase().trim(),n=this.panel.querySelector(".inculva-lang-dropdown");if(n)for(const d of n.querySelectorAll(".inculva-lang-option")){if(!i){d.classList.remove("inculva-hidden");continue}const u=(l=(r=(o=d.querySelector(".inculva-lang-name"))==null?void 0:o.textContent)==null?void 0:r.toLowerCase())!=null?l:"",m=((s=d.dataset.enName)!=null?s:"").toLowerCase(),p=((c=d.dataset.langCode)!=null?c:"").toLowerCase(),f=u.includes(i)||m.includes(i)||p.startsWith(i);d.classList.toggle("inculva-hidden",!f)}}),this.panel.addEventListener("mouseover",e=>{const t=e.target.closest("[data-tooltip]");t&&this._showTooltip(t)}),this.panel.addEventListener("mouseout",e=>{e.target.closest("[data-tooltip]")&&this._hideTooltip()}),document.documentElement.appendChild(this.backdrop),document.documentElement.appendChild(this.btn),document.documentElement.appendChild(this.panel)}_showTooltip(e){const t=e.dataset.tooltip;if(!t)return;this.tooltip.textContent=t,this.tooltip.style.left="",this.tooltip.style.right="";const i=e.getBoundingClientRect(),n=this.panel.dataset.size==="mini",o=this.config.position.includes("right");if(n){const r=i.top+i.height/2;this.tooltip.style.top=`${r}px`,this.tooltip.style.transform="translateY(-50%)",o?this.tooltip.style.right=`${window.innerWidth-i.left+8}px`:this.tooltip.style.left=`${i.right+8}px`}else this.tooltip.style.left=`${i.left+i.width/2}px`,this.tooltip.style.top=`${i.top-6}px`,this.tooltip.style.transform="translate(-50%, -100%)";this.tooltip.classList.add("visible")}_hideTooltip(){this.tooltip.classList.remove("visible")}togglePanel(){this.isOpen?this.closePanel():this.openPanel()}openPanel(){this.isOpen=!0,this.panel.classList.add("open"),this.backdrop.classList.add("open"),this.btn.setAttribute("aria-expanded","true"),Z(this.panel,this.btn,this.config.position),this.trackEvent("opened"),requestAnimationFrame(()=>{const e=this.panel.querySelector('button:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])');e==null||e.focus()})}closePanel(){this._closeLangDropdown(),this.isOpen=!1,this.panel.classList.remove("open"),this.backdrop.classList.remove("open"),this.btn.setAttribute("aria-expanded","false"),this._hideTooltip(),this.trackEvent("closed"),this.btn.focus()}trapFocus(e){const t=Array.from(this.panel.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')).filter(o=>o.offsetParent!==null);if(t.length===0)return;const i=t[0],n=t[t.length-1];e.shiftKey?document.activeElement===i&&(e.preventDefault(),n.focus()):document.activeElement===n&&(e.preventDefault(),i.focus())}announce(e){this.liveRegion.textContent="",requestAnimationFrame(()=>{this.liveRegion.textContent=e})}toggleFeature(e){var l;const t=this.activeFeatures.has(e),i=G[e],n=N[e];t?(i.disable(),this.activeFeatures.delete(e),n&&this.featureLevels.delete(e),this.trackEvent("feature_disabled",e)):(i.enable(n?1:void 0),this.activeFeatures.add(e),n&&this.featureLevels.set(e,1),this.trackEvent("feature_enabled",e));const o=this.panel.querySelector(`[data-feature="${e}"]`);o&&(o.classList.toggle("active",!t),o.setAttribute("aria-pressed",String(!t)),n&&(t?delete o.dataset.level:o.dataset.level="1")),o&&this._applyFeatureLabel(e,t?0:1,o);const r=(l=this._labels[e])!=null?l:e;this.announce(`${r} ${t?"disabled":"enabled"}`),this.updateActiveBadge(),this.saveCurrentPrefs()}cycleFeatureLevel(e){var c,d,u;const t=N[e];if(!t){this.toggleFeature(e);return}const i=G[e],n=(c=this.featureLevels.get(e))!=null?c:0,o=n>=t?0:n+1;o===0?(i.disable(),this.activeFeatures.delete(e),this.featureLevels.delete(e),this.trackEvent("feature_disabled",e)):(i.enable(o),this.activeFeatures.add(e),this.featureLevels.set(e,o),this.trackEvent("feature_enabled",e));const r=this.panel.querySelector(`[data-feature="${e}"]`);r&&(r.classList.toggle("active",o>0),r.setAttribute("aria-pressed",String(o>0)),o>0?r.dataset.level=String(o):delete r.dataset.level),r&&this._applyFeatureLabel(e,o,r);const l=(d=this._labels[e])!=null?d:e,s=e==="colorBlindMode"&&o>0?`${l}: ${this._cbmTypeName(o)}`:e==="screenReader"&&o>0?`${l}: ${(u=se[o])!=null?u:"level "+String(o)}`:o>0?`${l} level ${o} of ${t}`:`${l} disabled`;this.announce(s),this.updateActiveBadge(),this.saveCurrentPrefs()}resetAll(){var t,i;for(const n of[...this.activeFeatures]){G[n].disable(),this.activeFeatures.delete(n);const r=this.panel.querySelector(`[data-feature="${n}"]`);if(r){if(r.classList.remove("active"),r.setAttribute("aria-pressed","false"),delete r.dataset.level,n==="colorBlindMode"){const l=r.querySelector(".inculva-feature-label");l&&(l.textContent=(t=this._labels.colorBlindMode)!=null?t:"Color Blind")}if(n==="screenReader"){const l=r.querySelector(".inculva-feature-label");l&&(l.textContent=(i=this._labels.screenReader)!=null?i:"Screen reader")}}}this.featureLevels.clear();for(const n of[...this.activeProfiles]){const o=this.panel.querySelector(`[data-profile="${n}"]`);o==null||o.classList.remove("active"),o==null||o.setAttribute("aria-pressed","false")}this.activeProfiles.clear();const e=this.panel.querySelector(".inculva-cbm-selector");e==null||e.classList.remove("visible"),this.updateActiveBadge(),this.saveCurrentPrefs(),this.announce("All accessibility features reset")}switchTab(e){for(const i of this.panel.querySelectorAll(".inculva-tab-btn")){const n=i.dataset.inculvaTab===e;i.classList.toggle("active",n),i.setAttribute("aria-selected",String(n))}const t=this.panel.querySelector(".inculva-feature-grid");t&&(t.dataset.activeTab=e),Z(this.panel,this.btn,this.config.position)}switchSize(e){const t=e==="xl"?"large":e;this.panel.dataset.size=t;for(const i of this.panel.querySelectorAll(".inculva-size-btn"))i.classList.toggle("active",i.dataset.size===t);Z(this.panel,this.btn,this.config.position),this.saveCurrentPrefs()}_setLanguage(e){this.config.language=e,q(e),this._closeLangDropdown(),ee(this.panel,this.config.features,e,this._labels,this.config.accessibilityStatementUrl,this.config.whiteLabelText),this.updateActiveBadge(),this.saveCurrentPrefs()}_toggleLangDropdown(){const e=this.panel.querySelector(".inculva-lang-dropdown");e&&(e.classList.contains("open")?this._closeLangDropdown():this._openLangDropdown())}_openLangDropdown(){const e=this.panel.querySelector(".inculva-lang-dropdown");if(!e)return;e.classList.add("open");const t=e.querySelector(".inculva-lang-trigger");t&&t.setAttribute("aria-expanded","true");const i=e.querySelector(".inculva-lang-search");if(i){i.value="";for(const n of e.querySelectorAll(".inculva-lang-option"))n.classList.remove("inculva-hidden")}requestAnimationFrame(()=>{i==null||i.focus();const n=e.querySelector(".inculva-lang-option.active");n==null||n.scrollIntoView({block:"nearest"})})}_closeLangDropdown(){const e=this.panel.querySelector(".inculva-lang-dropdown");if(!e)return;e.classList.remove("open");const t=e.querySelector(".inculva-lang-trigger");t&&t.setAttribute("aria-expanded","false")}switchSide(){const e=this.config.position,i=e.includes("left")?e.replace("left","right"):e.replace("right","left");this.config.position=i,P(this.btn,i),P(this.panel,i);const n=i.includes("left");n?this.panel.setAttribute("data-panel-side","left"):this.panel.removeAttribute("data-panel-side"),this.isOpen&&Z(this.panel,this.btn,i),ye(this.panel,n,this._labels),this.saveCurrentPrefs()}toggleProfiles(){const e=this.panel.querySelector(".inculva-profiles-toggle"),t=this.panel.querySelector(".inculva-profiles-grid");if(!e||!t)return;const i=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",String(!i)),t.hidden=i}activateProfile(e){const t=Y.find(o=>o.key===e);if(!t)return;const i=this.activeProfiles.has(e);if(i){for(const o of t.features)this.activeFeatures.has(o)&&this.toggleFeature(o);this.activeProfiles.delete(e)}else{for(const o of t.features)this.activeFeatures.has(o)||this.toggleFeature(o);this.activeProfiles.add(e)}const n=this.panel.querySelector(`[data-profile="${e}"]`);n==null||n.classList.toggle("active",!i),n==null||n.setAttribute("aria-pressed",String(!i)),this.announce(`Profile ${t.label} ${i?"deactivated":"activated"}`),this.saveCurrentPrefs()}updateActiveBadge(){var i;const e=this.activeFeatures.size;this.badge&&(this.badge.textContent=String(e),this.badge.classList.toggle("visible",e>0));const t=this.panel.querySelector(".inculva-active-count");if(t){const n=$(this.config.language);t.textContent=`${e} ${(i=n.active)!=null?i:"active"}`,t.hidden=e===0}for(const[n,o]of Object.entries(ge)){const r=o.filter(c=>this.activeFeatures.has(c)).length,l=this.panel.querySelector(`[data-inculva-tab="${n}"]`);if(!l)continue;const s=l.querySelector(".inculva-tab-count");s&&(s.textContent=String(r),s.hidden=r===0)}}_cbmTypeName(e){var i,n;const t=ie[e-1];return t?(n=this._labels[t])!=null?n:t.charAt(0).toUpperCase()+t.slice(1):(i=this._labels.colorBlindMode)!=null?i:"Color Blind"}_applyFeatureLabel(e,t,i){var o,r,l,s,c;const n=i.querySelector(".inculva-feature-label");n&&(e==="colorBlindMode"?n.textContent=t>0?this._cbmTypeName(t):(o=this._labels.colorBlindMode)!=null?o:"Color Blind":e==="saturation"?n.textContent=t===1?(r=this._labels.highContrast)!=null?r:"High Contrast":(l=this._labels.saturation)!=null?l:"Contrast+":e==="screenReader"&&(n.textContent=t>0?(s=se[t])!=null?s:"Screen reader":(c=this._labels.screenReader)!=null?c:"Screen reader"))}selectColorBlindType(e){ze(e);const t=this.panel.querySelector(".inculva-cbm-selector");if(t)for(const i of t.querySelectorAll("[data-cbm-type]")){const n=i.dataset.cbmType===e;i.classList.toggle("active",n),i.setAttribute("aria-pressed",String(n))}if(!this.activeFeatures.has("colorBlindMode")){this.toggleFeature("colorBlindMode");return}this.announce(`Color blind mode: ${e}`),this.saveCurrentPrefs()}saveCurrentPrefs(){var t;if(this._restoring)return;const e={};for(const i of this.activeFeatures){const n=this.featureLevels.get(i);if(e[i]=n!=null?n:!0,n!==void 0){const o=this.panel.querySelector(`[data-feature="${i}"]`),r=o==null?void 0:o.querySelector(".inculva-feature-label");r!=null&&r.textContent&&(e[`${i}Label`]=r.textContent)}}e.colorBlindType=Be(),e.widgetSize=(t=this.panel.dataset.size)!=null?t:"regular",e.widgetPosition=this.config.position,e.widgetLanguage=this.config.language,e.activeProfiles=Array.from(this.activeProfiles),Mt(e)}restorePrefs(){this._restoring=!0;const e=St(),t=e.widgetLanguage;typeof t=="string"&&O.some(o=>o.code===t)&&(this.config.language=t,q(t),ee(this.panel,this.config.features,t,this._labels,this.config.accessibilityStatementUrl,this.config.whiteLabelText));const i=e.widgetPosition;if(typeof i=="string"&&["bottom-right","bottom-left","top-right","top-left"].includes(i)){this.config.position=i,P(this.btn,this.config.position),P(this.panel,this.config.position);const o=this.config.position.includes("left");o?this.panel.setAttribute("data-panel-side","left"):this.panel.removeAttribute("data-panel-side"),ye(this.panel,o,this._labels)}typeof e.widgetSize=="string"&&["mini","regular","large"].includes(e.widgetSize)&&this.switchSize(e.widgetSize);const n=e.activeProfiles;if(Array.isArray(n)){for(const o of n)if(typeof o=="string"&&Y.find(r=>r.key===o)){this.activeProfiles.add(o);const r=this.panel.querySelector(`[data-profile="${o}"]`);r==null||r.classList.add("active"),r==null||r.setAttribute("aria-pressed","true")}}for(const[o,r]of Object.entries(e)){if(o==="colorBlindType"||o.endsWith("Label")||o==="widgetSize"||o==="widgetPosition"||o==="widgetLanguage"||o==="activeProfiles"||!(o in G))continue;const l=o,s=N[l];if(s&&typeof r=="number"&&r>=1&&r<=s){G[l].enable(r),this.activeFeatures.add(l),this.featureLevels.set(l,r);const c=this.panel.querySelector(`[data-feature="${l}"]`);if(c){c.classList.add("active"),c.setAttribute("aria-pressed","true"),c.dataset.level=String(r);const d=e[`${l}Label`];if(typeof d=="string"){const u=c.querySelector(".inculva-feature-label");u&&(u.textContent=d)}}}else(r===!0||typeof r=="number"&&r>=1)&&this.toggleFeature(l)}this.updateActiveBadge(),this._restoring=!1,this.saveCurrentPrefs()}async fetchRemoteConfig(){var e;try{const t=await fetch(`${this.apiBase}/widget/config/${this.config.siteId}`);if(t.status===404||t.status===403)return console.warn(`[Inculva] Widget disabled — ${t.status===404?"site not found":"domain not authorized"}.`),!1;if(!t.ok)return!0;const i=await t.json(),n=(e=i.data)!=null?e:i;return n.primaryColor&&(this.config.primaryColor=n.primaryColor),n.features&&(this.config.features={...this.config.features,...n.features}),n.language&&(this.config.language=n.language),n.position&&(this.config.position=n.position),n.theme&&(this.config.theme=n.theme),n.accessibilityStatementUrl!==void 0&&(this.config.accessibilityStatementUrl=n.accessibilityStatementUrl),n.whiteLabelText!==void 0&&(this.config.whiteLabelText=n.whiteLabelText),n.borderRadius!==void 0&&(this.config.borderRadius=n.borderRadius),n.buttonSize!==void 0&&(this.config.buttonSize=n.buttonSize),n.fontFamily!==void 0&&(this.config.fontFamily=n.fontFamily),n.headerBgColor!==void 0&&(this.config.headerBgColor=n.headerBgColor),n.footerBgColor!==void 0&&(this.config.footerBgColor=n.footerBgColor),n.labels&&(this.labels=n.labels),!0}catch(t){return!0}}applyConfigToDOM(){this.config.borderRadius!==void 0&&document.documentElement.style.setProperty("--inculva-border-radius",`${this.config.borderRadius}px`),this.config.buttonSize!==void 0&&document.documentElement.style.setProperty("--inculva-button-size",this.config.buttonSize==="small"?"44px":this.config.buttonSize==="large"?"64px":"52px"),this.config.fontFamily!==void 0&&this.config.fontFamily!=="system"&&document.documentElement.style.setProperty("--inculva-font",this.getFontStack(this.config.fontFamily)),this.config.headerBgColor&&document.documentElement.style.setProperty("--inculva-header-bg",this.config.headerBgColor),this.config.footerBgColor&&document.documentElement.style.setProperty("--inculva-footer-bg",this.config.footerBgColor),ee(this.panel,this.config.features,this.config.language,this._labels,this.config.accessibilityStatementUrl,this.config.whiteLabelText),this.config.position.includes("left")?this.panel.setAttribute("data-panel-side","left"):this.panel.removeAttribute("data-panel-side")}getFontStack(e){var i;return(i={inter:"'Inter', sans-serif",roboto:"'Roboto', sans-serif",opensans:"'Open Sans', sans-serif"}[e])!=null?i:"inherit"}trackEvent(e,t){const i={siteId:this.config.siteId,sessionId:Lt(),event:e,feature:t,timestamp:new Date().toISOString()};fetch(`${this.apiBase}/widget/events`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),credentials:"omit",keepalive:!0}).catch(()=>{})}}const H=document.currentScript;function Ce(){var t,i,n;const a=(n=(t=H==null?void 0:H.dataset.siteId)!=null?t:H==null?void 0:H.getAttribute("data-site-id"))!=null?n:(i=window.__INCULVA_PREVIEW_CONFIG__)==null?void 0:i.siteId;if(!a){console.warn("[Inculva] Missing data-site-id attribute on script tag.");return}const e=window.__INCULVA_PREVIEW_CONFIG__;new we({...e!=null?e:{},siteId:a})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ce):Ce(),window.InculvaWidget=we})();
//# sourceMappingURL=widget.iife.js.map
