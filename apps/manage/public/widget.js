var Z=Object.defineProperty;var ee=(v,o,r)=>o in v?Z(v,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):v[o]=r;var h=(v,o,r)=>ee(v,typeof o!="symbol"?o+"":o,r);(function(){"use strict";const v="https://fonts.googleapis.com/css2?family=OpenDyslexic&display=swap";function o(t,e){if(document.getElementById(t))return;const n=document.createElement("style");n.id=t,n.textContent=e,document.head.appendChild(n)}function r(t){var e;(e=document.getElementById(t))==null||e.remove()}let B="deuteranopia";const U={deuteranopia:"0.367 0.861 -0.228 0 0  0.280 0.673  0.047 0 0 -0.012 0.043  0.969 0 0  0 0 0 1 0",protanopia:"0.152 1.053 -0.205 0 0  0.115 0.786  0.099 0 0 -0.004 -0.048 1.052 0 0  0 0 0 1 0",tritanopia:"1.256 -0.077 -0.179 0 0 -0.078 0.931 0.148 0 0  0.005 0.691  0.304 0 0  0 0 0 1 0",achromatopsia:"0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0.299 0.587  0.114 0 0  0 0 0 1 0"};function L(t){o("inculva-color-blind-filter-def","body::before { content: ''; position: fixed; width: 0; height: 0; }");let e=document.getElementById("inculva-color-blind-svg");e||(e=document.createElementNS("http://www.w3.org/2000/svg","svg"),e.id="inculva-color-blind-svg",e.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),document.body.insertBefore(e,document.body.firstChild)),e.innerHTML=`<defs><filter id="inculva-cbf"><feColorMatrix type="matrix" values="${U[t]}"/></filter></defs>`,r("inculva-color-blind"),o("inculva-color-blind","html { filter: url(#inculva-cbf) !important; }")}function D(){return B}function N(t){B=t,document.getElementById("inculva-color-blind")&&L(t)}const R={textResizing:{enable:()=>{const t=parseFloat(document.documentElement.style.fontSize||"16");document.documentElement.style.fontSize=`${t*1.15}px`},disable:()=>{document.documentElement.style.fontSize=""}},highContrast:{enable:()=>o("inculva-high-contrast",`
        body { filter: contrast(1.5) !important; }
        a { color: #ffff00 !important; }
      `),disable:()=>r("inculva-high-contrast")},dyslexiaFont:{enable:()=>{o("inculva-dyslexia-font-link",`@import url('${v}');`),o("inculva-dyslexia-font","* { font-family: 'OpenDyslexic', sans-serif !important; }")},disable:()=>{r("inculva-dyslexia-font-link"),r("inculva-dyslexia-font")}},cursorEnhancement:{enable:()=>o("inculva-cursor",`* { cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="black" stroke="white" stroke-width="2"/></svg>') 16 16, auto !important; }`),disable:()=>r("inculva-cursor")},keyboardNavigation:{enable:()=>o("inculva-keyboard-nav",":focus-visible { outline: 3px solid #0066cc !important; outline-offset: 3px !important; }"),disable:()=>r("inculva-keyboard-nav")},readingGuide:{enable:()=>{const t=document.createElement("div");t.id="inculva-reading-guide",t.style.cssText=`
        position: fixed; left: 0; right: 0; height: 32px;
        background: rgba(255, 255, 0, 0.2); pointer-events: none;
        z-index: 999998; top: 0; transition: top 0.05s;
      `,document.body.appendChild(t);const e=n=>{t.style.top=`${n.clientY-16}px`};document.addEventListener("mousemove",e),t._moveHandler=e},disable:()=>{const t=document.getElementById("inculva-reading-guide");t!=null&&t._moveHandler&&document.removeEventListener("mousemove",t._moveHandler),t==null||t.remove()}},screenReader:{enable:()=>o("inculva-screen-reader",`
        img:not([alt]) { outline: 3px solid red !important; }
        img[alt]::after { content: attr(alt); }
      `),disable:()=>r("inculva-screen-reader")},pauseAnimations:{enable:()=>o("inculva-pause-animations","*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }"),disable:()=>r("inculva-pause-animations")},textSpacing:{enable:()=>o("inculva-text-spacing",`* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
         p { margin-bottom: 2em !important; }`),disable:()=>r("inculva-text-spacing")},highlightLinks:{enable:()=>o("inculva-highlight-links","a, a:visited { text-decoration: underline !important; font-weight: bold !important; outline: 2px solid currentColor !important; outline-offset: 1px !important; }"),disable:()=>r("inculva-highlight-links")},colorBlindMode:{enable:()=>L(B),disable:()=>{var t;r("inculva-color-blind-filter-def"),r("inculva-color-blind"),(t=document.getElementById("inculva-color-blind-svg"))==null||t.remove()}},largeClickTargets:{enable:()=>o("inculva-large-targets",`a, button, input, select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [tabindex] {
          min-width: 44px !important;
          min-height: 44px !important;
        }`),disable:()=>r("inculva-large-targets")},focusHighlight:{enable:()=>o("inculva-focus-highlight",`:focus, :focus-visible {
          outline: 3px solid #ff6600 !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 6px rgba(255,102,0,0.3) !important;
          z-index: 999997 !important;
          position: relative !important;
        }`),disable:()=>r("inculva-focus-highlight")},grayscale:{enable:()=>o("inculva-grayscale","html { filter: grayscale(100%) !important; }"),disable:()=>r("inculva-grayscale")},skipNavigation:{enable:()=>{if(document.getElementById("inculva-skip-nav"))return;const t=document.createElement("a");t.id="inculva-skip-nav";const e=document.querySelector("main, [role='main'], #main, #content, .main-content");e?(e.id||(e.id="inculva-main-content"),t.href=`#${e.id}`):t.href="#",t.textContent="Skip to main content",t.style.cssText=["position:fixed","top:-100px","left:16px","z-index:9999999","background:#000","color:#fff","padding:8px 16px","border-radius:0 0 8px 8px","font-weight:bold","font-size:14px","font-family:system-ui,sans-serif","text-decoration:none","transition:top 0.15s","border:2px solid #fff"].join(";"),t.addEventListener("focus",()=>{t.style.top="0"}),t.addEventListener("blur",()=>{t.style.top="-100px"}),document.body.insertBefore(t,document.body.firstChild)},disable:()=>{var t;(t=document.getElementById("inculva-skip-nav"))==null||t.remove()}},readingMask:{enable:()=>{if(document.getElementById("inculva-reading-mask"))return;const t=document.createElement("div");t.id="inculva-reading-mask",t.style.cssText=["position:fixed","left:0","right:0","height:40px","background:rgba(255,255,0,0.25)","border-top:2px solid rgba(200,180,0,0.4)","border-bottom:2px solid rgba(200,180,0,0.4)","pointer-events:none","z-index:999998","top:0","transition:top 0.04s linear"].join(";"),document.body.appendChild(t);const e=n=>{t.style.top=`${n.clientY-20}px`};document.addEventListener("mousemove",e),t._moveHandler=e},disable:()=>{const t=document.getElementById("inculva-reading-mask");t!=null&&t._moveHandler&&document.removeEventListener("mousemove",t._moveHandler),t==null||t.remove()}},textAlign:{enable:()=>o("inculva-text-align","p, li, td, th, label, h1, h2, h3, h4, h5, h6 { text-align: left !important; }"),disable:()=>r("inculva-text-align")},saturation:{enable:()=>o("inculva-saturation","html { filter: saturate(2) !important; }"),disable:()=>r("inculva-saturation")},muteMedia:{enable:()=>{for(const e of document.querySelectorAll("audio, video"))e.muted=!0,e.paused||e.pause();o("inculva-mute-media-state","");const t=new MutationObserver(e=>{for(const n of e)for(const a of n.addedNodes)a instanceof HTMLMediaElement&&(a.muted=!0)});t.observe(document.body,{childList:!0,subtree:!0}),window.__inculvaMuteObserver=t},disable:()=>{var t;r("inculva-mute-media-state");for(const e of document.querySelectorAll("audio, video"))e.muted=!1;(t=window.__inculvaMuteObserver)==null||t.disconnect(),delete window.__inculvaMuteObserver}}},F=[{key:"textResizing",icon:"Aa"},{key:"highContrast",icon:"◑"},{key:"dyslexiaFont",icon:"𝖠"},{key:"cursorEnhancement",icon:"⊕"},{key:"keyboardNavigation",icon:"⌨"},{key:"readingGuide",icon:"▬"},{key:"screenReader",icon:"👁"},{key:"pauseAnimations",icon:"⏸"},{key:"textSpacing",icon:"↔"},{key:"highlightLinks",icon:"🔗"},{key:"colorBlindMode",icon:"🎨"},{key:"largeClickTargets",icon:"◎"},{key:"focusHighlight",icon:"⬡"},{key:"grayscale",icon:"◫"},{key:"skipNavigation",icon:"⏭"},{key:"muteMedia",icon:"🔇"},{key:"readingMask",icon:"▬"},{key:"textAlign",icon:"≡"},{key:"saturation",icon:"◈"}],I={title:"Accessibility",poweredBy:"Powered by Inculva",textResizing:"Bigger Text",highContrast:"High Contrast",dyslexiaFont:"Dyslexia Font",cursorEnhancement:"Big Cursor",keyboardNavigation:"Keyboard Nav",readingGuide:"Reading Guide",screenReader:"Screen Reader",pauseAnimations:"Pause Motion",textSpacing:"Text Spacing",highlightLinks:"Highlight Links",colorBlindMode:"Color Blind",largeClickTargets:"Large Targets",focusHighlight:"Focus Highlight",grayscale:"Grayscale",skipNavigation:"Skip to Main",muteMedia:"Mute Media",readingMask:"Reading Mask",textAlign:"Text Align",saturation:"Saturation",accessibilityStatement:"Accessibility Statement",deuteranopia:"Deuteranopia",protanopia:"Protanopia",tritanopia:"Tritanopia",achromatopsia:"Achromatopsia"},_=["deuteranopia","protanopia","tritanopia","achromatopsia"],M=new Set(["ar","he","fa","ur"]);function G(t,e,n,a){var C,S;const i=I,l=document.createElement("div");l.id="inculva-widget-panel",l.setAttribute("role","dialog"),l.setAttribute("aria-label",i.title),l.setAttribute("aria-modal","false"),M.has(e)&&l.setAttribute("dir","rtl");const u=document.createElement("div");u.className="inculva-panel-header";const f=document.createElement("span");f.setAttribute("aria-hidden","true"),f.textContent="♿",u.appendChild(f),u.appendChild(document.createTextNode(` ${i.title}`));const p=document.createElement("div");p.className="inculva-panel-body";for(const d of F){const A=t[d.key]!==!1,m=document.createElement("button");m.className="inculva-feature-btn",m.dataset.feature=d.key,m.setAttribute("aria-pressed","false"),A||(m.style.display="none");const y=document.createElement("span");y.className="inculva-feature-icon",y.setAttribute("aria-hidden","true"),y.textContent=d.icon;const k=document.createElement("span");if(k.className="inculva-feature-label",k.textContent=(C=i[d.key])!=null?C:d.key,m.appendChild(y),m.appendChild(k),p.appendChild(m),d.key==="colorBlindMode"){const b=document.createElement("div");b.className="inculva-cbm-selector",b.setAttribute("role","group"),b.setAttribute("aria-label","Color blind type");for(const c of _){const s=document.createElement("button");s.className="inculva-cbm-btn"+(c==="deuteranopia"?" active":""),s.dataset.cbmType=c,s.setAttribute("aria-pressed",c==="deuteranopia"?"true":"false"),s.textContent=(S=i[c])!=null?S:c,b.appendChild(s)}p.appendChild(b)}}const g=document.createElement("div");g.className="inculva-panel-footer";const w=a==null?i.poweredBy:a;if(w&&(g.textContent=w),n){const d=document.createElement("a");d.className="inculva-a11y-link",d.href=n,d.target="_blank",d.rel="noopener noreferrer",d.textContent=i.accessibilityStatement,g.appendChild(document.createElement("br")),g.appendChild(d)}return l.appendChild(u),l.appendChild(p),l.appendChild(g),l}function j(t,e,n,a,i,l){var w,C,S,d,A,m,y,k,b;const u=a?{...I,...a}:I;M.has(n)?t.setAttribute("dir","rtl"):t.removeAttribute("dir");const f=t.querySelector(".inculva-panel-header");if(f){f.textContent="";const c=document.createElement("span");c.setAttribute("aria-hidden","true"),c.textContent="♿",f.appendChild(c),f.appendChild(document.createTextNode(` ${(w=u.title)!=null?w:"Accessibility"}`))}t.setAttribute("aria-label",(C=u.title)!=null?C:"Accessibility");const p=t.querySelector(".inculva-panel-footer");if(p){const c=l==null?(S=u.poweredBy)!=null?S:"Powered by Inculva":l;if(p.textContent=c||"",i){let s=p.querySelector(".inculva-a11y-link");s||(s=document.createElement("a"),s.className="inculva-a11y-link",s.target="_blank",s.rel="noopener noreferrer",p.appendChild(document.createElement("br")),p.appendChild(s)),s.href=i,s.textContent=(d=u.accessibilityStatement)!=null?d:"Accessibility Statement"}else(m=(A=p.querySelector(".inculva-a11y-link"))==null?void 0:A.previousSibling)==null||m.remove(),(y=p.querySelector(".inculva-a11y-link"))==null||y.remove()}for(const c of F){const s=t.querySelector(`[data-feature="${c.key}"]`);if(!s)continue;const Q=e[c.key]!==!1;s.style.display=Q?"":"none";const $=s.querySelector(".inculva-feature-label");$&&($.textContent=(k=u[c.key])!=null?k:c.key)}const g=t.querySelector(".inculva-cbm-selector");if(g)for(const c of _){const s=g.querySelector(`[data-cbm-type="${c}"]`);s&&(s.textContent=(b=u[c])!=null?b:c)}}function V(t){const e=document.createElement("button");return e.id="inculva-widget-btn",e.setAttribute("aria-label","Open Accessibility Menu"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-haspopup","dialog"),e.style.backgroundColor=t,e.innerHTML=`
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="4.5" r="2"/>
      <path d="M12 8c-1.1 0-2 .9-2 2v4.5H7l-1.5 4h1.6l1-2.5H10v3h4v-3h1.9l1 2.5H18.5L17 14.5H14V10c0-1.1-.9-2-2-2z"/>
    </svg>
  `,e}function E(t,e){const n="20px";t.style.bottom=e.includes("bottom")?n:"auto",t.style.top=e.includes("top")?n:"auto",t.style.right=e.includes("right")?n:"auto",t.style.left=e.includes("left")?n:"auto"}function W(t,e,n){const a=e.getBoundingClientRect(),i=12;t.style.bottom="auto",t.style.top="auto",t.style.right="auto",t.style.left="auto",n.includes("bottom")?t.style.bottom=`${window.innerHeight-a.top+i}px`:t.style.top=`${a.bottom+i}px`,n.includes("right")?t.style.right="20px":t.style.left="20px"}const Y=`
  :root {
    --inculva-border-radius: 8px;
    --inculva-button-size: 52px;
    --inculva-font: inherit;
  }
  #inculva-widget-btn {
    position: fixed !important;
    z-index: 999999 !important;
    width: var(--inculva-button-size, 52px);
    height: var(--inculva-button-size, 52px);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    transition: transform 0.2s, box-shadow 0.2s;
    outline: none;
  }
  #inculva-widget-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(0,0,0,0.24);
  }
  #inculva-widget-btn:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 2px;
  }
  #inculva-widget-panel {
    position: fixed !important;
    z-index: 999999 !important;
    width: 320px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: var(--inculva-border-radius, 16px);
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    padding: 0;
    font-family: var(--inculva-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: 14px;
    display: none;
  }
  #inculva-widget-panel.open {
    display: block;
  }
  .inculva-panel-header {
    padding: 16px 20px;
    font-weight: 700;
    font-size: 16px;
    border-radius: 16px 16px 0 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .inculva-panel-body {
    padding: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .inculva-feature-btn {
    border: none;
    border-radius: 10px;
    padding: 12px 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    transition: opacity 0.15s, transform 0.15s;
    outline: none;
  }
  .inculva-feature-btn:hover {
    opacity: 0.85;
  }
  .inculva-feature-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  .inculva-feature-btn.active {
    font-weight: 700;
  }
  .inculva-feature-icon {
    font-size: 22px;
    line-height: 1;
  }
  .inculva-panel-footer {
    padding: 10px 20px;
    font-size: 11px;
    text-align: center;
    border-radius: 0 0 16px 16px;
    opacity: 0.6;
  }

  /* Themes */
  [data-inculva-theme="light"] #inculva-widget-panel {
    background: #ffffff;
    color: #111;
  }
  [data-inculva-theme="light"] .inculva-panel-header {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  [data-inculva-theme="light"] .inculva-feature-btn {
    background: #f4f4f5;
    color: #111;
  }
  [data-inculva-theme="light"] .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  [data-inculva-theme="light"] .inculva-panel-footer {
    background: #f4f4f5;
    color: #555;
  }

  [data-inculva-theme="dark"] #inculva-widget-panel {
    background: #1a1a2e;
    color: #eee;
  }
  [data-inculva-theme="dark"] .inculva-panel-header {
    background: #16213e;
    color: #fff;
    border-bottom: 1px solid #0f3460;
  }
  [data-inculva-theme="dark"] .inculva-feature-btn {
    background: #16213e;
    color: #eee;
  }
  [data-inculva-theme="dark"] .inculva-feature-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
  }
  [data-inculva-theme="dark"] .inculva-panel-footer {
    background: #16213e;
    color: #999;
  }

  /* RTL layout */
  #inculva-widget-panel[dir="rtl"] .inculva-panel-header {
    flex-direction: row-reverse;
  }
  #inculva-widget-panel[dir="rtl"] .inculva-feature-btn {
    text-align: right;
  }

  /* EAA accessibility statement link */
  .inculva-a11y-link {
    display: inline-block;
    margin-top: 4px;
    font-size: 10px;
    text-decoration: underline;
    color: inherit;
    opacity: 0.8;
  }
  .inculva-a11y-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Color blind mode sub-selector */
  .inculva-cbm-selector {
    grid-column: 1 / -1;
    display: none;
    flex-wrap: wrap;
    gap: 6px;
    padding: 4px 0 2px;
  }
  .inculva-cbm-selector.visible {
    display: flex;
  }
  .inculva-cbm-btn {
    flex: 1 1 auto;
    border: none;
    border-radius: 8px;
    padding: 6px 4px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    transition: opacity 0.15s;
  }
  .inculva-cbm-btn:hover { opacity: 0.8; }
  .inculva-cbm-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  [data-inculva-theme="light"] .inculva-cbm-btn {
    background: #e8e8ea;
    color: #111;
  }
  [data-inculva-theme="light"] .inculva-cbm-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    font-weight: 700;
  }
  [data-inculva-theme="dark"] .inculva-cbm-btn {
    background: #0f3460;
    color: #eee;
  }
  [data-inculva-theme="dark"] .inculva-cbm-btn.active {
    background: var(--inculva-primary, #0066cc);
    color: #fff;
    font-weight: 700;
  }

  /* Screen-reader-only live region */
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
`,P="inculva-widget-prefs";function K(t){try{localStorage.setItem(P,JSON.stringify(t))}catch(e){}}function J(){try{const t=localStorage.getItem(P);return t?JSON.parse(t):{}}catch(t){return{}}}const O="inculva-session-id";let T=null;function X(){try{let t=sessionStorage.getItem(O);return t||(t=crypto.randomUUID(),sessionStorage.setItem(O,t)),t}catch(t){return T||(T=crypto.randomUUID()),T}}const z={position:"bottom-right",theme:"auto",primaryColor:"#0066cc",language:"en",features:{textResizing:!0,highContrast:!0,dyslexiaFont:!0,cursorEnhancement:!0,keyboardNavigation:!0,readingGuide:!0,screenReader:!0,pauseAnimations:!0,textSpacing:!0,highlightLinks:!0,colorBlindMode:!0,largeClickTargets:!0,focusHighlight:!0,grayscale:!0,skipNavigation:!0,muteMedia:!0,readingMask:!0,textAlign:!0,saturation:!0}};class q{constructor(e){h(this,"config");h(this,"activeFeatures",new Set);h(this,"isOpen",!1);h(this,"btn");h(this,"panel");h(this,"liveRegion");h(this,"apiBase");h(this,"labels",{});var n;this.config={...z,...e,features:{...z.features,...e.features}},this.apiBase=(n=window.INCULVA_API_URL)!=null?n:"https://api.inculva.com",this.init()}init(){this.injectStyles(),this.applyTheme(),this.renderWidget(),this.restorePrefs(),this.fetchRemoteConfig()}injectStyles(){const e=document.createElement("style");e.id="inculva-styles",e.textContent=Y.replace(/var\(--inculva-primary,\s*#0066cc\)/g,`var(--inculva-primary, ${this.config.primaryColor})`),document.head.appendChild(e),document.documentElement.style.setProperty("--inculva-primary",this.config.primaryColor)}applyTheme(){const e=this.config.theme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.config.theme;document.documentElement.setAttribute("data-inculva-theme",e)}renderWidget(){this.btn=V(this.config.primaryColor),this.panel=G(this.config.features,this.config.language,this.config.accessibilityStatementUrl,this.config.whiteLabelText),this.liveRegion=document.createElement("div"),this.liveRegion.setAttribute("role","status"),this.liveRegion.setAttribute("aria-live","polite"),this.liveRegion.setAttribute("aria-atomic","true"),this.liveRegion.className="inculva-sr-only",document.body.appendChild(this.liveRegion),E(this.btn,this.config.position),E(this.panel,this.config.position),this.btn.addEventListener("click",()=>this.togglePanel()),this.panel.addEventListener("click",e=>{const n=e.target.closest("[data-cbm-type]");if(n!=null&&n.dataset.cbmType){this.selectColorBlindType(n.dataset.cbmType);return}const a=e.target.closest("[data-feature]");a!=null&&a.dataset.feature&&this.toggleFeature(a.dataset.feature)}),document.addEventListener("keydown",e=>{if(e.key==="Escape"&&this.isOpen){this.closePanel();return}e.key==="Tab"&&this.isOpen&&this.trapFocus(e)}),document.body.appendChild(this.btn),document.body.appendChild(this.panel)}togglePanel(){this.isOpen?this.closePanel():this.openPanel()}openPanel(){this.isOpen=!0,this.panel.classList.add("open"),this.btn.setAttribute("aria-expanded","true"),W(this.panel,this.btn,this.config.position),this.trackEvent("opened"),requestAnimationFrame(()=>{const e=this.panel.querySelector('button:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])');e==null||e.focus()})}closePanel(){this.isOpen=!1,this.panel.classList.remove("open"),this.btn.setAttribute("aria-expanded","false"),this.trackEvent("closed"),this.btn.focus()}trapFocus(e){const n=Array.from(this.panel.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')).filter(l=>l.offsetParent!==null);if(n.length===0)return;const a=n[0],i=n[n.length-1];e.shiftKey?document.activeElement===a&&(e.preventDefault(),i.focus()):document.activeElement===i&&(e.preventDefault(),a.focus())}announce(e){this.liveRegion.textContent="",requestAnimationFrame(()=>{this.liveRegion.textContent=e})}toggleFeature(e){var u;const n=this.activeFeatures.has(e),a=R[e];n?(a.disable(),this.activeFeatures.delete(e),this.trackEvent("feature_disabled",e)):(a.enable(),this.activeFeatures.add(e),this.trackEvent("feature_enabled",e));const i=this.panel.querySelector(`[data-feature="${e}"]`);if(i==null||i.classList.toggle("active",!n),i==null||i.setAttribute("aria-pressed",String(!n)),e==="colorBlindMode"){const f=this.panel.querySelector(".inculva-cbm-selector");f&&f.classList.toggle("visible",!n)}const l=(u=this.labels[e])!=null?u:e;this.announce(`${l} ${n?"disabled":"enabled"}`),this.saveCurrentPrefs()}selectColorBlindType(e){if(N(e),!this.activeFeatures.has("colorBlindMode")){this.toggleFeature("colorBlindMode");return}const n=this.panel.querySelector(".inculva-cbm-selector");if(n)for(const a of n.querySelectorAll("[data-cbm-type]")){const i=a.dataset.cbmType===e;a.classList.toggle("active",i),a.setAttribute("aria-pressed",String(i))}this.announce(`Color blind mode: ${e}`),this.saveCurrentPrefs()}saveCurrentPrefs(){const e={};for(const n of this.activeFeatures)e[n]=!0;e.colorBlindType=D(),K(e)}restorePrefs(){const e=J();if(typeof e.colorBlindType=="string"){N(e.colorBlindType);const n=this.panel.querySelector(".inculva-cbm-selector");if(n)for(const a of n.querySelectorAll("[data-cbm-type]")){const i=a.dataset.cbmType===e.colorBlindType;a.classList.toggle("active",i),a.setAttribute("aria-pressed",String(i))}}for(const[n,a]of Object.entries(e))a===!0&&n in R&&this.toggleFeature(n)}async fetchRemoteConfig(){var e;try{const n=await fetch(`${this.apiBase}/widget/config/${this.config.siteId}`);if(!n.ok)return;const a=await n.json(),i=(e=a.data)!=null?e:a;i.primaryColor&&(this.config.primaryColor=i.primaryColor,this.btn.style.backgroundColor=i.primaryColor,document.documentElement.style.setProperty("--inculva-primary",i.primaryColor)),i.features&&(this.config.features={...this.config.features,...i.features}),i.language&&(this.config.language=i.language),i.position&&(this.config.position=i.position,E(this.btn,this.config.position),E(this.panel,this.config.position)),i.theme&&(this.config.theme=i.theme,this.applyTheme()),i.accessibilityStatementUrl!==void 0&&(this.config.accessibilityStatementUrl=i.accessibilityStatementUrl),i.whiteLabelText!==void 0&&(this.config.whiteLabelText=i.whiteLabelText),i.borderRadius!==void 0&&(this.config.borderRadius=i.borderRadius,document.documentElement.style.setProperty("--inculva-border-radius",`${i.borderRadius}px`)),i.buttonSize!==void 0&&(this.config.buttonSize=i.buttonSize,document.documentElement.style.setProperty("--inculva-button-size",i.buttonSize==="small"?"44px":i.buttonSize==="large"?"64px":"52px")),i.fontFamily!==void 0&&i.fontFamily!=="system"&&(this.config.fontFamily=i.fontFamily,this.applyGoogleFont(i.fontFamily),document.documentElement.style.setProperty("--inculva-font",this.getFontStack(i.fontFamily))),i.labels&&(this.labels=i.labels),j(this.panel,this.config.features,this.config.language,i.labels,this.config.accessibilityStatementUrl,this.config.whiteLabelText)}catch(n){}}getFontStack(e){var a;return(a={inter:"'Inter', sans-serif",roboto:"'Roboto', sans-serif",opensans:"'Open Sans', sans-serif"}[e])!=null?a:"inherit"}applyGoogleFont(e){const a={inter:"Inter",roboto:"Roboto",opensans:"Open+Sans"}[e];if(!a)return;const i="inculva-google-font";if(document.getElementById(i))return;const l=document.createElement("link");l.id=i,l.rel="stylesheet",l.href=`https://fonts.googleapis.com/css2?family=${a}:wght@400;600;700&display=swap`,document.head.appendChild(l)}trackEvent(e,n){const a={siteId:this.config.siteId,sessionId:X(),event:e,feature:n,timestamp:new Date().toISOString()};fetch(`${this.apiBase}/widget/events`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),credentials:"omit",keepalive:!0}).catch(()=>{})}}const x=document.currentScript;function H(){var n,a,i;const t=(i=(n=x==null?void 0:x.dataset.siteId)!=null?n:x==null?void 0:x.getAttribute("data-site-id"))!=null?i:(a=window.__INCULVA_PREVIEW_CONFIG__)==null?void 0:a.siteId;if(!t){console.warn("[Inculva] Missing data-site-id attribute on script tag.");return}const e=window.__INCULVA_PREVIEW_CONFIG__;new q({...e!=null?e:{},siteId:t})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H(),window.InculvaWidget=q})();
//# sourceMappingURL=widget.iife.js.map
