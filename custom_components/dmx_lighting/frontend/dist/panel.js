var Xt=Object.defineProperty;var Vt=Object.getOwnPropertyDescriptor;var h=(o,i,e,t)=>{for(var r=t>1?void 0:t?Vt(i,e):i,n=o.length-1,s;n>=0;n--)(s=o[n])&&(r=(t?s(i,e,r):s(r))||r);return t&&r&&Xt(i,e,r),r};var ce=globalThis,de=ce.ShadowRoot&&(ce.ShadyCSS===void 0||ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ne=Symbol(),et=new WeakMap,Y=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(de&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=et.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&et.set(e,i))}return i}toString(){return this.cssText}},tt=o=>new Y(typeof o=="string"?o:o+"",void 0,Ne),A=(o,...i)=>{let e=o.length===1?o[0]:i.reduce((t,r,n)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[n+1],o[0]);return new Y(e,o,Ne)},rt=(o,i)=>{if(de)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=ce.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,o.appendChild(t)}},Re=de?o=>o:o=>o instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return tt(e)})(o):o;var{is:Yt,defineProperty:Zt,getOwnPropertyDescriptor:Jt,getOwnPropertyNames:Qt,getOwnPropertySymbols:Dt,getPrototypeOf:er}=Object,pe=globalThis,it=pe.trustedTypes,tr=it?it.emptyScript:"",rr=pe.reactiveElementPolyfillSupport,Z=(o,i)=>o,J={toAttribute(o,i){switch(i){case Boolean:o=o?tr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,i){let e=o;switch(i){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ue=(o,i)=>!Yt(o,i),st={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:ue};Symbol.metadata??=Symbol("metadata"),pe.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=st){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&Zt(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:n}=Jt(this.prototype,i)??{get(){return this[e]},set(s){this[e]=s}};return{get:r,set(s){let a=r?.call(this);n?.call(this,s),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??st}static _$Ei(){if(this.hasOwnProperty(Z("elementProperties")))return;let i=er(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z("properties"))){let e=this.properties,t=[...Qt(e),...Dt(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(Re(r))}else i!==void 0&&e.push(Re(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:J).toAttribute(e,t.type);this._$Em=i,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(i,e){let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let n=t.getPropertyOptions(r),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:J;this._$Em=r;let a=s.fromAttribute(e,n.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(i,e,t,r=!1,n){if(i!==void 0){let s=this.constructor;if(r===!1&&(n=this[i]),t??=s.getPropertyOptions(i),!((t.hasChanged??ue)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(s._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:n},s){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,s??e??this[i]),n!==!0||s!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,n]of t){let{wrapped:s}=n,a=this[r];s!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[Z("elementProperties")]=new Map,R[Z("finalized")]=new Map,rr?.({ReactiveElement:R}),(pe.reactiveElementVersions??=[]).push("2.1.2");var Fe=globalThis,nt=o=>o,he=Fe.trustedTypes,ot=he?he.createPolicy("lit-html",{createHTML:o=>o}):void 0,ut="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,ht="?"+L,ir=`<${ht}>`,W=document,D=()=>W.createComment(""),ee=o=>o===null||typeof o!="object"&&typeof o!="function",je=Array.isArray,sr=o=>je(o)||typeof o?.[Symbol.iterator]=="function",Ue=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,lt=/>/g,F=RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,dt=/"/g,vt=/^(?:script|style|textarea|title)$/i,We=o=>(i,...e)=>({_$litType$:o,strings:i,values:e}),c=We(1),mt=We(2),$r=We(3),B=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),pt=new WeakMap,j=W.createTreeWalker(W,129);function ft(o,i){if(!je(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(i):i}var nr=(o,i)=>{let e=o.length-1,t=[],r,n=i===2?"<svg>":i===3?"<math>":"",s=Q;for(let a=0;a<e;a++){let l=o[a],p,d,u=-1,m=0;for(;m<l.length&&(s.lastIndex=m,d=s.exec(l),d!==null);)m=s.lastIndex,s===Q?d[1]==="!--"?s=at:d[1]!==void 0?s=lt:d[2]!==void 0?(vt.test(d[2])&&(r=RegExp("</"+d[2],"g")),s=F):d[3]!==void 0&&(s=F):s===F?d[0]===">"?(s=r??Q,u=-1):d[1]===void 0?u=-2:(u=s.lastIndex-d[2].length,p=d[1],s=d[3]===void 0?F:d[3]==='"'?dt:ct):s===dt||s===ct?s=F:s===at||s===lt?s=Q:(s=F,r=void 0);let b=s===F&&o[a+1].startsWith("/>")?" ":"";n+=s===Q?l+ir:u>=0?(t.push(p),l.slice(0,u)+ut+l.slice(u)+L+b):l+L+(u===-2?a:b)}return[ft(o,n+(o[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},te=class o{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let n=0,s=0,a=i.length-1,l=this.parts,[p,d]=nr(i,e);if(this.el=o.createElement(p,t),j.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=j.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let u of r.getAttributeNames())if(u.endsWith(ut)){let m=d[s++],b=r.getAttribute(u).split(L),_=/([.?@])?(.*)/.exec(m);l.push({type:1,index:n,name:_[2],strings:b,ctor:_[1]==="."?Le:_[1]==="?"?He:_[1]==="@"?ze:X}),r.removeAttribute(u)}else u.startsWith(L)&&(l.push({type:6,index:n}),r.removeAttribute(u));if(vt.test(r.tagName)){let u=r.textContent.split(L),m=u.length-1;if(m>0){r.textContent=he?he.emptyScript:"";for(let b=0;b<m;b++)r.append(u[b],D()),j.nextNode(),l.push({type:2,index:++n});r.append(u[m],D())}}}else if(r.nodeType===8)if(r.data===ht)l.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(L,u+1))!==-1;)l.push({type:7,index:n}),u+=L.length-1}n++}}static createElement(i,e){let t=W.createElement("template");return t.innerHTML=i,t}};function G(o,i,e=o,t){if(i===B)return i;let r=t!==void 0?e._$Co?.[t]:e._$Cl,n=ee(i)?void 0:i._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(o),r._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(i=G(o,r._$AS(o,i.values),r,t)),i}var Ie=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=(i?.creationScope??W).importNode(e,!0);j.currentNode=r;let n=j.nextNode(),s=0,a=0,l=t[0];for(;l!==void 0;){if(s===l.index){let p;l.type===2?p=new re(n,n.nextSibling,this,i):l.type===1?p=new l.ctor(n,l.name,l.strings,this,i):l.type===6&&(p=new Oe(n,this,i)),this._$AV.push(p),l=t[++a]}s!==l?.index&&(n=j.nextNode(),s++)}return j.currentNode=W,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},re=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=G(this,i,e),ee(i)?i===v||i==null||i===""?(this._$AH!==v&&this._$AR(),this._$AH=v):i!==this._$AH&&i!==B&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):sr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==v&&ee(this._$AH)?this._$AA.nextSibling.data=i:this.T(W.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=te.createElement(ft(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new Ie(r,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(i){let e=pt.get(i.strings);return e===void 0&&pt.set(i.strings,e=new te(i)),e}k(i){je(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of i)r===e.length?e.push(t=new o(this.O(D()),this.O(D()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=nt(i).nextSibling;nt(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=v}_$AI(i,e=this,t,r){let n=this.strings,s=!1;if(n===void 0)i=G(this,i,e,0),s=!ee(i)||i!==this._$AH&&i!==B,s&&(this._$AH=i);else{let a=i,l,p;for(i=n[0],l=0;l<n.length-1;l++)p=G(this,a[t+l],e,l),p===B&&(p=this._$AH[l]),s||=!ee(p)||p!==this._$AH[l],p===v?i=v:i!==v&&(i+=(p??"")+n[l+1]),this._$AH[l]=p}s&&!r&&this.j(i)}j(i){i===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Le=class extends X{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===v?void 0:i}},He=class extends X{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==v)}},ze=class extends X{constructor(i,e,t,r,n){super(i,e,t,r,n),this.type=5}_$AI(i,e=this){if((i=G(this,i,e,0)??v)===B)return;let t=this._$AH,r=i===v&&t!==v||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==v&&(t===v||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Oe=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){G(this,i)}};var or=Fe.litHtmlPolyfillSupport;or?.(te,re),(Fe.litHtmlVersions??=[]).push("3.3.3");var gt=(o,i,e)=>{let t=e?.renderBefore??i,r=t._$litPart$;if(r===void 0){let n=e?.renderBefore??null;t._$litPart$=r=new re(i.insertBefore(D(),n),n,void 0,e??{})}return r._$AI(o),r};var Be=globalThis,y=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};y._$litElement$=!0,y.finalized=!0,Be.litElementHydrateSupport?.({LitElement:y});var ar=Be.litElementPolyfillSupport;ar?.({LitElement:y});(Be.litElementVersions??=[]).push("4.2.2");var C=o=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,i)}):customElements.define(o,i)};var lr={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ue},cr=(o=lr,i,e)=>{let{kind:t,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),t==="accessor"){let{name:s}=e;return{set(a){let l=i.get.call(this);i.set.call(this,a),this.requestUpdate(s,l,o,!0,a)},init(a){return a!==void 0&&this.C(s,void 0,o,a),a}}}if(t==="setter"){let{name:s}=e;return function(a){let l=this[s];i.call(this,a),this.requestUpdate(s,l,o,!0,a)}}throw Error("Unsupported decorator location: "+t)};function g(o){return(i,e)=>typeof e=="object"?cr(o,i,e):((t,r,n)=>{let s=r.hasOwnProperty(n);return r.constructor.createProperty(n,t),s?Object.getOwnPropertyDescriptor(r,n):void 0})(o,i,e)}function f(o){return g({...o,state:!0,attribute:!1})}var bt=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],_t=["artnet-direct","sacn","kinet"],xt=["8bit","16bit","24bit","32bit"],me=["linear","quadratic","cubic","quadruple"],yt={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},dr={"8bit":1,"16bit":2,"24bit":3,"32bit":4},fe={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},ge={d:"Dimmer",r:"Red",R:"Red (unscaled)",g:"Green",G:"Green (unscaled)",b:"Blue",B:"Blue (unscaled)",w:"White",W:"White (unscaled)",c:"Cool white",C:"Cool white (unscaled)",h:"Warm white",H:"Warm white (unscaled)",t:"Color temp (0 = warm)",T:"Color temp (0 = cold)",u:"Hue",U:"Saturation",x:"X (CIE)",y:"Y (CIE)"},$t=32;function ie(o){return typeof o=="number"}function H(o){return!!o.channel_setup&&o.channel_setup.length>0}function qe(o){if(o.type==="binary")return["d"];let i=H(o)?o.channel_setup:yt[o.type];return i?Array.from(i):["d"]}function be(o,i){let e=qe(o)[i],t=o.channel_labels?.[i]||"";return e===void 0?{text:"",dummy:!1}:ie(e)?{text:t||"Fixed",dummy:!0,value:e}:{text:t||ge[e]||e,dummy:!1}}function Ke(o){if(o.type==="binary")return 1;let i=H(o)?o.channel_setup:yt[o.type];return i?i.length:1}function se(o){return dr[o.channel_size??"8bit"]??1}function T(o){let i=Ke(o),e=o.channel;return[e,e+i*se(o)-1]}function z(o){return o==="sacn"?1:0}function wt(o){return`${o.node_type}:${o.host}:${o.port??"default"}`}function ne(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function _e(o){return`hsl(${o*137.5%360}, 45%, 45%)`}function oe(o,i,e,t,r){let n=i[`dmx:${e}/${t}/${r.channel}`];if(n)return n;let s=`light.${V(r.name??"")}`;if(Object.values(i).includes(s)||o?.states?.[s])return s}function xe(o,i){o.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}function kt(o,i){return o.transition??i?.transition??0}function V(o){return o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}var Et=o=>o.callWS({type:"dmx_lighting/patch/get"});var St=(o,i)=>o.callWS({type:"dmx_lighting/patch/save",patch:i}),At=(o,i)=>o.callWS({type:"dmx_lighting/patch/export",patch:i}),Ct=(o,i)=>o.callWS({type:"dmx_lighting/patch/import",content:i});var Tt=o=>o.callWS({type:"dmx_lighting/entity_map/get"}),Mt=(o,i,e,t)=>o.connection.subscribeMessage(t,{type:"dmx_lighting/dmx/subscribe",node_key:i,universe:e}),Pt=(o,i,e,t=1)=>o.connection.subscribeMessage(()=>{},{type:"dmx_lighting/effect/preview",preview_id:i,preset:e,level:t}),Nt=(o,i,e,t)=>o.callWS({type:"dmx_lighting/effect/preview/update",preview_id:i,preset:e,...t===void 0?{}:{level:t}}),Rt=(o,i,e,t)=>o.callWS({type:"call_service",domain:i,service:e,service_data:t});var q="#fixed";function Ut(o){return qe(o).map((i,e)=>({fn:ie(i)?q:i,value:ie(i)?i:0,label:o.channel_labels?.[e]??""}))}function Ge(o,i){return o.fn===q?!Number.isInteger(o.value)||o.value<0||o.value>255?"Value must be 0\u2013255":"":fe[i]?.includes(o.fn)?"":`Not available for ${i}`}function pr(o){if(!o.length)return{channel_setup:null,channel_labels:null};let i=o.map(r=>r.fn===q?r.value:r.fn),e=o.map(r=>r.fn===q&&r.label.trim()?r.label.trim():null);for(;e.length&&e[e.length-1]===null;)e.pop();return{channel_setup:i.some(r=>ie(r))?i:i.join(""),channel_labels:e.length?e:null}}var Xe=!1;function ye(o){Xe=o.target===o.currentTarget}function $e(o){let i=Xe&&o.target===o.currentTarget;return Xe=!1,i}var we=A`
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .dialog {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    border-radius: 12px;
    padding: 20px 24px;
    width: min(440px, calc(100vw - 32px));
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
  h3 {
    margin: 0 0 16px;
    font-size: 1.15rem;
  }
  label {
    display: block;
    font-size: 0.8rem;
    color: var(--secondary-text-color, #727272);
    margin: 12px 0 4px;
  }
  input,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--secondary-background-color, #fafafa);
    color: var(--primary-text-color, #212121);
    font: inherit;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 20px;
  }
  .actions .spacer {
    flex: 1;
  }
  button {
    font: inherit;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color, #212121);
  }
  button.primary {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }
  button.danger {
    background: var(--error-color, #db4437);
    color: #fff;
  }
  .error {
    color: var(--error-color, #db4437);
    font-size: 0.85rem;
    margin-top: 8px;
  }
  a {
    color: var(--primary-color, #03a9f4);
  }
  .hint {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    margin-top: 4px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 14px;
    background: var(--secondary-background-color, #f0f0f0);
    font-size: 0.85rem;
  }
  .chip.invalid {
    background: color-mix(in srgb, var(--error-color, #db4437) 20%, transparent);
    outline: 1px solid var(--error-color, #db4437);
  }
  .chip small {
    color: var(--secondary-text-color, #727272);
  }
  .chip-x {
    padding: 0 2px;
    background: none;
    border: none;
    font-size: 0.95rem;
    line-height: 1;
    cursor: pointer;
    color: var(--secondary-text-color, #727272);
  }
  .chip-x:hover {
    color: var(--error-color, #db4437);
  }
`,k=class extends y{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this.entityId="";this.nodeTransition=null;this._count=1;this._suspended=!1;this._rows=null}disconnectedCallback(){super.disconnectedCallback(),this._stopWatching?.()}_openEntity(){this._suspended=!0,xe(this,this.entityId);let e=()=>document.querySelector("home-assistant")?.shadowRoot?.querySelector("ha-more-info-dialog"),t=()=>{this._stopWatching?.(),this._suspended=!1},r=s=>{s.detail?.dialog==="ha-more-info-dialog"&&t()};window.addEventListener("dialog-closed",r);let n=window.setInterval(()=>{let s=e();(!s||!s._entityId)&&t()},500);this._stopWatching=()=>{window.removeEventListener("dialog-closed",r),window.clearInterval(n),this._stopWatching=void 0}}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1,this._rows=H(this.device)?Ut(this.device):null)}_set(e,t){this._working={...this._working,[e]:t}}_renderEntity(){if(this.isNew)return v;if(!this.entityId)return c`<div class="entity-row muted">
        No entity yet — it is created when you Save &amp; Apply.
      </div>`;let e=this.hass?.states?.[this.entityId],t=e?.state??"unknown",r=e?.attributes?.friendly_name??"";return c`
      <div class="entity-row">
        <span class="dot ${t}" title=${t}></span>
        <span class="entity-text">
          <code>${this.entityId}</code>
          <small>${r&&r!==this.entityId?`${r} \xB7 `:""}${t}</small>
        </span>
        <button
          class="open-entity"
          title="Open the entity (controls, history, settings)"
          @click=${this._openEntity}
        >
          Open entity
        </button>
      </div>
    `}_setRows(e){this._rows=e,this._working={...this._working,...e?pr(e):{channel_setup:null,channel_labels:null}}}_setType(e){this._set("type",e),e==="binary"&&this._rows&&this._setRows(null)}_toggleCustom(e){if(!e){this._setRows(null);return}let t=Ut({...this._working,channel_setup:null,channel_labels:null});this._setRows(t)}_updateRow(e,t){let r=[...this._rows??[]];r[e]={...r[e],...t},this._setRows(r)}_addRow(e){let t=fe[this._working.type]??"",r=e||!t?{fn:q,value:0,label:""}:{fn:t[0],value:0,label:""};this._setRows([...this._rows??[],r])}_moveRow(e,t){let r=[...this._rows??[]],n=e+t;n<0||n>=r.length||([r[e],r[n]]=[r[n],r[e]],this._setRows(r))}_removeRow(e){let t=(this._rows??[]).filter((r,n)=>n!==e);this._setRows(t)}_renderChannels(){let e=this._working;if(e.type==="binary")return v;let t=this._rows,r=fe[e.type]??"";return c`
      <label class="check">
        <input
          type="checkbox"
          .checked=${!!t}
          @change=${n=>this._toggleCustom(n.target.checked)}
        />
        Custom channel layout
      </label>
      <div class="hint">
        ${t?"Light channels follow the entity; dummy channels always send their fixed value (use them for mode, strobe or macro channels).":`Uses the ${e.type} default. Turn on to reorder channels or add dummy channels such as Mode or Strobe.`}
      </div>
      ${t?c`
            <div class="channels">
              ${t.map((n,s)=>{let a=Ge(n,e.type),l=n.fn===q;return c`
                  <div class="ch-row ${a?"invalid":""}" title=${a}>
                    <span class="ch-nr">${e.channel+s*se(e)}</span>
                    <select
                      aria-label="Channel ${s+1} function"
                      @change=${p=>this._updateRow(s,{fn:p.target.value})}
                    >
                      ${[...r].map(p=>c`<option value=${p} ?selected=${n.fn===p}>
                            ${ge[p]??p}
                          </option>`)}
                      ${!l&&!r.includes(n.fn)?c`<option value=${n.fn} selected>${ge[n.fn]??n.fn}</option>`:v}
                      <option value=${q} ?selected=${l}>Dummy (fixed value)</option>
                    </select>
                    ${l?c`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${$t}
                            aria-label="Channel ${s+1} label"
                            .value=${n.label}
                            @input=${p=>this._updateRow(s,{label:p.target.value})}
                          />
                          <input
                            class="ch-value"
                            type="number"
                            min="0"
                            max="255"
                            step="1"
                            aria-label="Channel ${s+1} value"
                            .value=${String(n.value)}
                            @input=${p=>this._updateRow(s,{value:Number(p.target.value)})}
                          />
                        `:c`<span class="ch-fill">follows light</span>`}
                    <span class="ch-tools">
                      <button class="icon" title="Move up" ?disabled=${s===0}
                        @click=${()=>this._moveRow(s,-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${s===t.length-1}
                        @click=${()=>this._moveRow(s,1)}>↓</button>
                      <button class="icon" title="Remove channel" ?disabled=${t.length===1}
                        @click=${()=>this._removeRow(s)}>✕</button>
                    </span>
                    ${a?c`<span class="ch-problem">${a}</span>`:v}
                  </div>
                `})}
            </div>
            <div class="ch-add">
              ${r?c`<button @click=${()=>this._addRow(!1)}>+ Light channel</button>`:v}
              <button @click=${()=>this._addRow(!0)}>+ Dummy channel</button>
            </div>
          `:v}
    `}render(){let e=this._working,[t,r]=T(e),n=e.type==="color_temp"||e.type==="rgbww";return c`
      <div
        class="backdrop"
        style=${this._suspended?"visibility: hidden":""}
        @pointerdown=${ye}
        @click=${s=>$e(s)&&this._cancel()}
      >
        <div class="dialog" @click=${s=>s.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          ${this._renderEntity()}

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${e.name??""}
            @input=${s=>this._set("name",s.target.value)}
          />

          ${this.isNew?c`
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="512"
                  .value=${String(this._count)}
                  @input=${s=>this._count=Math.max(1,Number(s.target.value)||1)}
                />
                ${this._count>1?c`<div class="hint">
                      Adds ${this._count} fixtures back-to-back, named
                      ${e.name||"name"}_1 … ${e.name||"name"}_${this._count}
                    </div>`:v}
              `:v}

          <label>Friendly name (optional)</label>
          <input
            .value=${e.friendly_name??""}
            @input=${s=>this._set("friendly_name",s.target.value||void 0)}
          />

          <div class="row">
            <div>
              <label>Type</label>
              <select
                .value=${e.type}
                @change=${s=>this._setType(s.target.value)}
              >
                ${bt.map(s=>c`<option value=${s} ?selected=${e.type===s}>${s}</option>`)}
              </select>
            </div>
            <div>
              <label>DMX channel (1-512)</label>
              <input
                type="number"
                min="1"
                max="512"
                .value=${String(e.channel)}
                @input=${s=>this._set("channel",Number(s.target.value))}
              />
            </div>
          </div>
          <div class="hint">Occupies channels ${t}–${r}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${e.channel_size??"8bit"}
                @change=${s=>this._set("channel_size",s.target.value)}
              >
                ${xt.map(s=>c`<option value=${s} ?selected=${(e.channel_size??"8bit")===s}>${s}</option>`)}
              </select>
            </div>
            <div>
              <label>Byte order</label>
              <select
                .value=${e.byte_order??"big"}
                @change=${s=>this._set("byte_order",s.target.value)}
              >
                <option value="big" ?selected=${(e.byte_order??"big")==="big"}>big</option>
                <option value="little" ?selected=${e.byte_order==="little"}>little</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div>
              <label>Transition (s)</label>
              <input
                type="number"
                min="0"
                max="999"
                step="0.1"
                placeholder="node default (${this.nodeTransition??0})"
                .value=${e.transition==null?"":String(e.transition)}
                @input=${s=>{let a=s.target.value;this._set("transition",a===""?null:Number(a))}}
              />
              <div class="hint">
                ${e.transition==null?`Uses the node default: ${this.nodeTransition??0}s`:c`Overrides the node default (${this.nodeTransition??0}s) ·
                      <a href="#" @click=${s=>{s.preventDefault(),this._set("transition",null)}}>use default</a>`}
              </div>
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${s=>{let a=s.target.value;this._set("output_correction",a===""?null:a)}}
              >
                <option value="" ?selected=${!e.output_correction}>universe default</option>
                ${me.map(s=>c`<option value=${s} ?selected=${e.output_correction===s}>${s}</option>`)}
              </select>
            </div>
          </div>

          ${this._renderChannels()}

          ${n?c`
                <div class="row">
                  <div>
                    <label>Min temp</label>
                    <input
                      .value=${e.min_temp??"2700K"}
                      @input=${s=>this._set("min_temp",s.target.value)}
                    />
                  </div>
                  <div>
                    <label>Max temp</label>
                    <input
                      .value=${e.max_temp??"6500K"}
                      @input=${s=>this._set("max_temp",s.target.value)}
                    />
                  </div>
                </div>
              `:v}

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:v}

          <div class="actions">
            ${this.isNew?v:c`<button class="danger" @click=${this._delete}>Delete</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}let e=(this._rows??[]).findIndex(t=>Ge(t,this._working.type));if(e>=0){this.errorText=`Channel ${e+1}: ${Ge(this._rows[e],this._working.type)}`;return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};k.styles=[we,A`
      .dialog {
        width: min(540px, calc(100vw - 32px));
      }
      .entity-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 8px;
        background: var(--secondary-background-color, #f5f5f5);
      }
      .entity-row.muted {
        font-size: 0.8rem;
        color: var(--secondary-text-color, #727272);
      }
      .entity-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .entity-text code {
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .entity-text small {
        font-size: 0.75rem;
        color: var(--secondary-text-color, #727272);
      }
      .dot {
        flex: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--disabled-text-color, #9e9e9e);
      }
      .dot.on {
        background: var(--state-light-active-color, #ffc107);
      }
      .dot.unavailable {
        background: var(--error-color, #db4437);
      }
      button.open-entity {
        flex: none;
        padding: 6px 12px;
        background: none;
        border: 1px solid var(--primary-color, #03a9f4);
        color: var(--primary-color, #03a9f4);
      }
      label.check {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        font-size: 0.9rem;
        color: var(--primary-text-color, #212121);
        cursor: pointer;
      }
      label.check input {
        width: auto;
      }
      .channels {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 10px;
      }
      .ch-row {
        display: grid;
        grid-template-columns: 2.5em minmax(0, 1.3fr) minmax(0, 1fr) 4.5em auto;
        align-items: center;
        gap: 6px;
      }
      .ch-row.invalid select {
        border-color: var(--error-color, #db4437);
      }
      .ch-row select,
      .ch-row input {
        padding: 6px 8px;
      }
      .ch-nr {
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color, #727272);
        text-align: right;
      }
      .ch-fill {
        grid-column: span 2;
        font-size: 0.8rem;
        color: var(--secondary-text-color, #727272);
      }
      .ch-tools {
        display: flex;
        gap: 2px;
      }
      .ch-problem {
        grid-column: 2 / -1;
        color: var(--error-color, #db4437);
        font-size: 0.75rem;
      }
      button.icon {
        padding: 4px 8px;
        border-radius: 6px;
      }
      button.icon:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .ch-add {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }
      @media (max-width: 480px) {
        .ch-row {
          grid-template-columns: 2em minmax(0, 1fr) 4em;
        }
        .ch-row select {
          grid-column: 2 / -1;
        }
        .ch-row .ch-label {
          grid-column: 2;
        }
        .ch-fill {
          grid-column: 2 / -1;
        }
        .ch-tools {
          grid-column: 2 / -1;
        }
      }
    `],h([g({attribute:!1})],k.prototype,"device",2),h([g({type:Boolean})],k.prototype,"isNew",2),h([g()],k.prototype,"errorText",2),h([g({attribute:!1})],k.prototype,"hass",2),h([g()],k.prototype,"entityId",2),h([g({attribute:!1})],k.prototype,"nodeTransition",2),h([f()],k.prototype,"_working",2),h([f()],k.prototype,"_count",2),h([f()],k.prototype,"_suspended",2),h([f()],k.prototype,"_rows",2),k=h([C("dmx-device-dialog")],k);var N=class extends y{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_overrides(){return Object.values(this._working.universes??{}).reduce((e,t)=>e+(t.devices??[]).filter(r=>r.transition!=null).length,0)}_renderTransitionOverrides(){let e=this._overrides();return c`<div class="hint">
      Fade time for fixtures that leave their own transition blank; a fixture's own value
      (even 0) wins.
      ${e?c`<br />${e} fixture${e===1?" sets its":"s set their"} own transition.
            <a href="#" @click=${this._clearOverrides}>Make all use this default</a>`:v}
    </div>`}_clearOverrides(e){e.preventDefault();let t=Object.fromEntries(Object.entries(this._working.universes??{}).map(([r,n])=>[r,{...n,devices:(n.devices??[]).map(s=>({...s,transition:null}))}]));this._working={...this._working,universes:t}}_set(e,t){this._working={...this._working,[e]:t}}_addUniverse(){let e=Number(this._newUniverse),t=z(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<t||e>1024){this.errorText=`Universe must be a whole number between ${t} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let t={...this._working.universes};delete t[e],this._working={...this._working,universes:t}}render(){let e=this._working;return c`
      <div
        class="backdrop"
        @pointerdown=${ye}
        @click=${t=>$e(t)&&this._cancel()}
      >
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${t=>this._set("node_type",t.target.value)}
          >
            ${_t.map(t=>c`<option value=${t} ?selected=${e.node_type===t}>${t}</option>`)}
          </select>

          <label>Host (IP of the Art-Net node)</label>
          <input
            .value=${e.host??""}
            @input=${t=>this._set("host",t.target.value)}
          />

          <div class="row">
            <div>
              <label>Port (blank = protocol default)</label>
              <input
                type="number"
                min="1"
                max="65535"
                .value=${e.port!=null?String(e.port):""}
                @input=${t=>{let r=t.target.value;this._set("port",r===""?null:Number(r))}}
              />
            </div>
            <div>
              <label>Max FPS (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                .value=${String(e.max_fps??25)}
                @input=${t=>this._set("max_fps",Number(t.target.value))}
              />
            </div>
          </div>

          <div class="row">
            <div>
              <label>Default transition (s)</label>
              <input
                type="number"
                min="0"
                max="999"
                step="0.1"
                placeholder="0"
                .value=${e.transition==null?"":String(e.transition)}
                @input=${t=>{let r=t.target.value;this._set("transition",r===""?null:Number(r))}}
              />
            </div>
            <div></div>
          </div>
          ${this._renderTransitionOverrides()}

          <div class="row">
            <div>
              <label>Refresh every (s, 0 = off)</label>
              <input
                type="number"
                min="0"
                max="9999"
                .value=${String(e.refresh_every??120)}
                @input=${t=>this._set("refresh_every",Number(t.target.value))}
              />
            </div>
            <div>
              <label>Host override (optional)</label>
              <input
                .value=${e.host_override??""}
                @input=${t=>this._set("host_override",t.target.value||void 0)}
              />
            </div>
          </div>

          ${e.node_type==="sacn"?c`
                <label>sACN priority (0-200, default 100)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  .value=${String(e.priority??100)}
                  @input=${t=>this._set("priority",Number(t.target.value))}
                />
                <div class="hint">
                  Receivers merge sources by priority; higher wins. Note: sACN universes
                  start at 1, not 0.
                </div>

                <label style="display:flex;align-items:center;gap:8px;font-size:0.9rem;color:var(--primary-text-color)">
                  <input
                    type="checkbox"
                    style="width:auto"
                    .checked=${e.multicast??!1}
                    @change=${t=>this._set("multicast",t.target.checked)}
                  />
                  Multicast (standard sACN)
                </label>
                <div class="hint">
                  Sends each universe to its 239.255.x.x multicast group, which is what
                  most receivers and sACN viewer apps listen to. When enabled, Host is
                  only a display name and Port is ignored. Unchecked = unicast directly
                  to the host.
                </div>
              `:v}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(e.universes).sort((t,r)=>Number(t)-Number(r)).map(t=>{let r=e.universes[t]?.devices?.length??0,n=Number(t)<z(e.node_type);return c`
                  <span class="chip ${n?"invalid":""}"
                    title=${n?`Universe ${t} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:r?`${r} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${t}`}
                  >
                    ${t}${r?c` <small>(${r})</small>`:v}
                    ${r?v:c`<button class="chip-x" @click=${()=>this._removeUniverse(t)}>
                          ×
                        </button>`}
                  </span>
                `})}
          </div>
          <div class="row">
            <input
              type="number"
              min=${z(e.node_type)}
              max="1024"
              placeholder="Universe number (${z(e.node_type)}-1024)"
              .value=${this._newUniverse}
              @input=${t=>this._newUniverse=t.target.value}
              @keydown=${t=>t.key==="Enter"&&this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:v}

          <div class="actions">
            ${this.isNew?v:c`<button class="danger" @click=${this._delete}>Delete node</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let t=z(this._working.node_type),r=Object.keys(this._working.universes).filter(n=>Number(n)<t);if(r.length){this.errorText=`Universe ${r.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${t}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};N.styles=we,h([g({attribute:!1})],N.prototype,"node",2),h([g({type:Boolean})],N.prototype,"isNew",2),h([g()],N.prototype,"errorText",2),h([f()],N.prototype,"_working",2),h([f()],N.prototype,"_newUniverse",2),N=h([C("dmx-node-dialog")],N);var P=class extends y{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return c`
      <div
        class="backdrop"
        @pointerdown=${ye}
        @click=${e=>$e(e)&&this._cancel()}
      >
        <div class="dialog" @click=${e=>e.stopPropagation()}>
          <h3>
            ${this.mode==="add"?"Add universe":`Renumber universe ${this.current}`}
          </h3>

          <label>Universe number (${this.minUniverse}-1024)</label>
          <input
            type="number"
            min=${this.minUniverse}
            max="1024"
            .value=${this._value}
            @input=${e=>this._value=e.target.value}
            @keydown=${e=>e.key==="Enter"&&this._save()}
          />

          ${this._error?c`<div class="error">${this._error}</div>`:v}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode==="add"?"Add":"Renumber"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let t=String(e);if(t!==this.current&&this.existing.includes(t)){this._error=`Universe ${t} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:t},bubbles:!0,composed:!0}))}};P.styles=we,h([g()],P.prototype,"mode",2),h([g({type:Number})],P.prototype,"minUniverse",2),h([g()],P.prototype,"current",2),h([g({attribute:!1})],P.prototype,"existing",2),h([f()],P.prototype,"_value",2),h([f()],P.prototype,"_error",2),P=h([C("dmx-universe-dialog")],P);var U=class extends y{constructor(){super(...arguments);this.yamlText="";this.errorText="";this._text="";this._copied=!1}willUpdate(e){e.has("yamlText")&&(this._text=this.yamlText)}render(){return c`
      <div
        class="backdrop"
        @pointerdown=${ye}
        @click=${e=>$e(e)&&this._cancel()}
      >
        <div class="dialog wide" @click=${e=>e.stopPropagation()}>
          <h3>Patch as YAML</h3>
          <div class="hint">
            Backup: copy or download this. Restore/edit: paste (or load a file), then
            "Load into editor" — nothing is applied until you Save &amp; Apply.
          </div>

          <textarea
            spellcheck="false"
            .value=${this._text}
            @input=${e=>this._text=e.target.value}
          ></textarea>

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:v}

          <div class="actions">
            <button @click=${this._copy}>${this._copied?"Copied \u2713":"Copy"}</button>
            <button @click=${this._download}>Download</button>
            <button @click=${this._pickFile}>Load file…</button>
            <span class="spacer"></span>
            <button @click=${this._cancel}>Close</button>
            <button class="primary" @click=${this._import}>Load into editor</button>
          </div>
        </div>
      </div>
    `}async _copy(){try{await navigator.clipboard.writeText(this._text),this._copied=!0,setTimeout(()=>this._copied=!1,1500)}catch{this.errorText="Clipboard unavailable \u2014 select the text and copy manually"}}_download(){let e=new Blob([this._text],{type:"application/yaml"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="dmx_patch.yaml",r.click(),URL.revokeObjectURL(t)}_pickFile(){let e=document.createElement("input");e.type="file",e.accept=".yaml,.yml,.json,.txt",e.onchange=async()=>{let t=e.files?.[0];t&&(this._text=await t.text(),this.errorText="")},e.click()}_import(){this.dispatchEvent(new CustomEvent("import-patch",{detail:{content:this._text},bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}};U.styles=[we,A`
      .dialog.wide {
        width: min(680px, calc(100vw - 32px));
      }
      textarea {
        width: 100%;
        box-sizing: border-box;
        min-height: 320px;
        margin-top: 12px;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #e0e0e0);
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color, #212121);
        font-family: var(--code-font-family, 'SFMono-Regular', Menlo, Consolas, monospace);
        font-size: 0.8rem;
        line-height: 1.45;
        white-space: pre;
      }
    `],h([g()],U.prototype,"yamlText",2),h([g()],U.prototype,"errorText",2),h([f()],U.prototype,"_text",2),h([f()],U.prototype,"_copied",2),U=h([C("dmx-yaml-dialog")],U);function It(o){return{id:ne(),channel:o,name:"",type:"dimmer",transition:null,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null,channel_labels:null}}function Lt(){return{id:ne(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var M=class extends y{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await Mt(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((t,r)=>{let[n,s]=T(t);for(let a=n;a<=Math.min(s,512);a++){let l=e.get(a);e.set(a,{device:t,index:r,first:a===n,overlap:!!l})}}),e}render(){let e=this._channelMap(),t=[];for(let r=1;r<=512;r++){let n=e.get(r),s=this._values[r-1],a=this._live&&s!==void 0?s/255:0,l=this._dropTarget,p=n?be(n.device,Math.floor((r-n.device.channel)/se(n.device))):void 0,d=!!p&&H(n.device),u=l&&r>=l.first&&r<=l.last;t.push(c`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}
            ${p?.dummy?"dummy":""}
            ${u?l.valid?"drop-ok":"drop-bad":""}"
          style=${n?`--device-color: ${_e(n.index)}`:v}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${r}: ${p.text}${p.dummy?` (fixed ${p.value})`:""} \u2014 drag to move`:`Channel ${r}`}
          draggable=${n?"true":"false"}
          @click=${()=>this._cellClick(r,n?.device)}
          @dragstart=${n?m=>this._dragStart(m,r,n.device):v}
          @dragover=${m=>this._dragOver(m,r)}
          @drop=${m=>this._drop(m)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?c`<span class="heat" style="opacity: ${a}"></span>`:v}
          <span class="top">
            <span class="ch">${r}</span>
            ${p?.dummy&&!this._live?c`<span class="fixed">${p.value}</span>`:v}
          </span>
          ${n?.first?c`<span class="name">${n.device.name}</span>`:v}
          ${d&&(p.dummy||!n.first)?c`<span class="role">${p.text}</span>`:v}
          ${this._live&&s!==void 0?c`<span class="val">${s}</span>`:v}
        </div>
      `)}return c`
      <div class="toolbar">
        <label class="live-toggle">
          <input
            type="checkbox"
            .checked=${this._live}
            @change=${this._toggleLive}
          />
          Live DMX values
        </label>
      </div>
      <div class="grid">${t}</div>
    `}_dragStart(e,t,r){let[n]=T(r);this._dragInfo={device:r,offset:t-n},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",r.id)}_dragOver(e,t){let r=this._dragInfo;if(!r)return;let[n,s]=T(r.device),a=s-n+1,l=t-r.offset,p=l+a-1,d=l>=1&&p<=512&&!this._collides(r.device.id,l,p);(this._dropTarget?.first!==l||this._dropTarget?.last!==p||this._dropTarget?.valid!==d)&&(this._dropTarget={first:l,last:p,valid:d}),d&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,t,r){return(this.universe?.devices??[]).some(n=>{if(n.id===e)return!1;let[s,a]=T(n);return t<=a&&r>=s})}_drop(e){e.preventDefault();let t=this._dragInfo,r=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!t||!r?.valid)&&T(t.device)[0]!==r.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:t.device.id,channel:r.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,t){t?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0}))}};M.styles=A`
    :host {
      display: block;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }
    .live-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
      gap: 2px;
    }
    .cell {
      position: relative;
      aspect-ratio: 1;
      min-width: 0;
      border-radius: 4px;
      background: var(--secondary-background-color, #f0f0f0);
      cursor: pointer;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 4px;
      box-sizing: border-box;
      border: 1px solid transparent;
    }
    .cell:hover {
      border-color: var(--primary-color);
    }
    .cell.occupied {
      background: var(--device-color);
      color: #fff;
    }
    .cell.overlap {
      outline: 2px solid var(--error-color, #db4437);
      outline-offset: -2px;
    }
    .cell.drop-ok {
      outline: 2px dashed var(--primary-color, #03a9f4);
      outline-offset: -2px;
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 25%, transparent);
    }
    .cell.drop-bad {
      outline: 2px dashed var(--error-color, #db4437);
      outline-offset: -2px;
      cursor: not-allowed;
    }
    .cell.occupied.dummy {
      background: repeating-linear-gradient(
          -45deg,
          rgba(0, 0, 0, 0.18) 0 4px,
          transparent 4px 8px
        ),
        var(--device-color);
    }
    .role {
      position: relative;
      font-size: 0.55rem;
      line-height: 1.1;
      opacity: 0.9;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 2px;
    }
    .fixed {
      font-size: 0.6rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .heat {
      position: absolute;
      inset: 0;
      background: var(--primary-color, #03a9f4);
      pointer-events: none;
    }
    .cell.occupied .heat {
      background: #fff;
      mix-blend-mode: overlay;
    }
    .ch {
      position: relative;
      font-size: 0.6rem;
      opacity: 0.7;
      line-height: 1;
    }
    .name {
      position: relative;
      font-size: 0.62rem;
      font-weight: 600;
      line-height: 1.1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .val {
      position: relative;
      font-size: 0.65rem;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
  `,h([g({attribute:!1})],M.prototype,"hass",2),h([g({attribute:!1})],M.prototype,"universe",2),h([g()],M.prototype,"nodeKey",2),h([g({type:Number})],M.prototype,"universeNr",2),h([f()],M.prototype,"_live",2),h([f()],M.prototype,"_values",2),h([f()],M.prototype,"_dropTarget",2),M=h([C("dmx-universe-grid")],M);var E=class extends y{constructor(){super(...arguments);this.nodeIndex=0;this.errors=[];this.addUniverse="";this.entityMap={};this._filter="";this._sort="address";this._desc=!1;this._effectOut={}}updated(e){e.has("hass")&&this.hass&&!this._unsubOutput&&(this._unsubOutput=this.hass.connection.subscribeMessage(t=>this._effectOut=t.fixtures??{},{type:"dmx_lighting/effect/output/subscribe"}).catch(()=>async()=>{}))}disconnectedCallback(){super.disconnectedCallback(),this._unsubOutput?.then(e=>e()).catch(()=>{}),this._unsubOutput=void 0}_rows(){let e=[],t=this.node?.universes??{};for(let[r,n]of Object.entries(t)){let s=n.devices??[],a=s.map(l=>T(l));s.forEach((l,p)=>{let[d,u]=a[p],m=a.some(([$,Ce],I)=>I!==p&&d<=Ce&&u>=$),b=`nodes/${this.nodeIndex}/universes/${r}/devices/${p}`,_=this.errors.filter($=>$.path===b||$.path.startsWith(`${b}/`));e.push({device:l,universe:r,index:p,first:d,last:u,overlap:m,errors:_})})}return e}_visibleRows(){let e=this._filter.trim().toLowerCase(),t=this._rows().filter(s=>{if(!e)return!0;let a=s.device,l=(a.channel_labels??[]).filter(Boolean).join(" ");return[a.name,a.friendly_name??"",a.type,`light.${V(a.name)}`,l].join(" ").toLowerCase().includes(e)}),r=(s,a)=>Number(s.universe)-Number(a.universe)||s.first-a.first,n={address:r,name:(s,a)=>s.device.name.localeCompare(a.device.name)||r(s,a),type:(s,a)=>s.device.type.localeCompare(a.device.type)||r(s,a)};return t.sort(n[this._sort]),this._desc&&t.reverse(),t}_setSort(e){this._sort===e?this._desc=!this._desc:(this._sort=e,this._desc=!1)}_header(e,t){let r=this._sort===e;return c`<th
      class="sortable ${r?"active":""}"
      aria-sort=${r?this._desc?"descending":"ascending":"none"}
      @click=${()=>this._setSort(e)}
    >
      ${t}<span class="arrow">${r?this._desc?"\u25BC":"\u25B2":""}</span>
    </th>`}_layout(e){let t=Ke(e),r=[];for(let n=0;n<t;n++){let s=be(e,n);r.push(s.dummy?c`<span class="part dummy" title="Dummy channel, fixed value ${s.value}"
              >${s.text} <b>${s.value}</b></span
            >`:c`<span class="part">${s.text}</span>`)}return c`${r}${H(e)?v:c`<span class="default">default</span>`}`}_liveTile(e,t){let r=this._effectOut[t.name];if(r){let[I,De]=r,[Te,Me,Pe]=(De??[255,255,255]).map(Gt=>Math.round(Gt)),le=Math.round(I*100),Bt=(.299*Te+.587*Me+.114*Pe)/255,qt=le>=50&&Bt>.6?"#000":"#fff",Kt=this.hass?.states?.[e??""]?.attributes?.dmx_effect??"effect";return c`<div
        class="tile on fx"
        style="--tile-color: rgb(${Te}, ${Me}, ${Pe}); --tile-level: ${le}%; --tile-ink: ${qt}"
        title="Driven by ${Kt}: ${De?`RGB ${Te}, ${Me}, ${Pe} \xB7 `:""}${le}%"
      >
        <span class="fill"></span>
        <span class="pct">${le}%</span>
        <span class="fx-badge">FX</span>
      </div>`}let n=e?this.hass?.states?.[e]:void 0;if(!n)return c`<div class="tile none" title="No entity yet — Save & Apply">–</div>`;if(n.state!=="on"){let I=n.state==="off"?"off":n.state;return c`<div class="tile off ${n.state}" title=${`${e}: ${I}`}>${I}</div>`}let s=n.attributes??{},a=Array.isArray(s.rgb_color)?s.rgb_color:[255,255,255],l=typeof s.brightness=="number"?s.brightness:255,p=Math.round(l/255*100),[d,u,m]=a.map(I=>Math.round(Number(I)||0)),b=`rgb(${d}, ${u}, ${m})`,_=(.299*d+.587*u+.114*m)/255,$=p>=50&&_>.6?"#000":"#fff",Ce=[Array.isArray(s.rgb_color)?`RGB ${d}, ${u}, ${m}`:"",typeof s.color_temp_kelvin=="number"?`${s.color_temp_kelvin} K`:"",`${p}%`].filter(Boolean).join(" \xB7 ");return c`<div
      class="tile on"
      style="--tile-color: ${b}; --tile-level: ${p}%; --tile-ink: ${$}"
      title="${e} (${t.type}): ${Ce}"
    >
      <span class="fill"></span>
      <span class="pct">${p}%</span>
    </div>`}_state(e){let t=e?this.hass?.states?.[e]?.state:void 0;return t?c`<span class="state ${t}" title=${t}></span>`:c`<span class="state none" title="Not created yet — Save & Apply">–</span>`}render(){let e=this._rows(),t=this._visibleRows(),r=Object.keys(this.node?.universes??{}),n=e.reduce((s,a)=>s+(a.last-a.first+1),0);return c`
      <div class="toolbar">
        <input
          class="filter"
          type="search"
          placeholder="Filter by name, type, entity or label"
          .value=${this._filter}
          @input=${s=>this._filter=s.target.value}
        />
        <span class="summary">
          ${e.length} fixture${e.length===1?"":"s"} · ${n} channels ·
          ${r.length} universe${r.length===1?"":"s"}
        </span>
        <button
          class="add"
          ?disabled=${!this.addUniverse}
          @click=${()=>this.dispatchEvent(new CustomEvent("add-device",{detail:{},bubbles:!0,composed:!0}))}
        >
          + Add fixture${this.addUniverse?` to universe ${this.addUniverse}`:""}
        </button>
      </div>

      ${t.length?c`
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th class="swatch-col"></th>
                    ${this._header("name","Name")}
                    ${this._header("type","Type")}
                    ${this._header("address","Address")}
                    <th>Channels</th>
                    <th class="live-col">Output</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.map(s=>{let a=s.device,l=oe(this.hass,this.entityMap,this.node.host,s.universe,a),p=l??`light.${V(a.name)}`,d=s.errors.length?s.errors.map(u=>u.message).join(`
`):s.overlap?"Overlaps another fixture":"";return c`
                      <tr
                        class=${d?"invalid":""}
                        tabindex="0"
                        title=${d||`Edit ${a.name}`}
                        @click=${()=>this._edit(s)}
                        @keydown=${u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),this._edit(s))}}
                      >
                        <td class="swatch-col">
                          <span class="swatch" style="background: ${_e(s.index)}"></span>
                        </td>
                        <td>
                          <div class="name">${a.name}</div>
                          ${a.friendly_name?c`<div class="sub">${a.friendly_name}</div>`:v}
                          <div class="entity">
                            ${this._state(l)}${l?c`<button
                                  class="entity-link"
                                  title="Open ${l}"
                                  @click=${u=>{u.stopPropagation(),xe(this,l)}}
                                  @keydown=${u=>u.stopPropagation()}
                                >
                                  <code>${l}</code>
                                </button>`:c`<code>${p}</code>`}
                          </div>
                          ${d?c`<div class="problem">⚠ ${d}</div>`:v}
                        </td>
                        <td>
                          ${a.type}
                          ${a.channel_size&&a.channel_size!=="8bit"?c`<div class="sub">${a.channel_size}</div>`:v}
                          <div
                            class="sub"
                            title=${a.transition==null?"Node default transition":"Fixture overrides the node default"}
                          >
                            fade ${kt(a,this.node)}s${a.transition==null?"":c` <b>own</b>`}
                          </div>
                        </td>
                        <td class="address">
                          <span class="uni">U${s.universe}</span>
                          ${s.first===s.last?s.first:`${s.first}\u2013${s.last}`}
                        </td>
                        <td class="layout">${this._layout(a)}</td>
                        <td class="live-col">${this._liveTile(l,a)}</td>
                      </tr>
                    `})}
                </tbody>
              </table>
            </div>
          `:c`<div class="empty">
            ${e.length?"No fixtures match the filter.":"No fixtures on this node yet."}
          </div>`}
    `}_edit(e){this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:e.device,universe:e.universe},bubbles:!0,composed:!0}))}};E.styles=A`
    :host {
      display: block;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
      margin-bottom: 10px;
    }
    .filter {
      flex: 1 1 220px;
      min-width: 0;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
      font: inherit;
    }
    .summary {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    button.add {
      font: inherit;
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.add:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 8px 10px;
      vertical-align: top;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    tbody tr:last-child td {
      border-bottom: none;
    }
    th {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--secondary-text-color);
      white-space: nowrap;
      background: var(--secondary-background-color, #f5f5f5);
    }
    th.sortable {
      cursor: pointer;
      user-select: none;
    }
    th.sortable:hover,
    th.active {
      color: var(--primary-text-color);
    }
    .arrow {
      display: inline-block;
      width: 1em;
      margin-left: 2px;
      font-size: 0.65rem;
    }
    tbody tr {
      cursor: pointer;
    }
    tbody tr:hover,
    tbody tr:focus-visible {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
      outline: none;
    }
    tr.invalid td {
      background: color-mix(in srgb, var(--error-color, #db4437) 10%, transparent);
    }
    .swatch-col {
      width: 10px;
      padding-right: 0;
    }
    .swatch {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-top: 4px;
      border-radius: 3px;
    }
    .name {
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    td:nth-child(2) {
      min-width: 9em;
    }
    .entity {
      margin-top: 2px;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
    .sub {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
    .problem {
      margin-top: 2px;
      font-size: 0.78rem;
      color: var(--error-color, #db4437);
      white-space: pre-line;
    }
    .address {
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .uni {
      display: inline-block;
      margin-right: 6px;
      padding: 0 6px;
      border-radius: 10px;
      font-size: 0.75rem;
      background: var(--secondary-background-color, #f0f0f0);
      color: var(--secondary-text-color);
    }
    .layout {
      line-height: 1.9;
    }
    .part {
      display: inline-block;
      margin: 0 4px 2px 0;
      padding: 0 6px;
      border-radius: 4px;
      font-size: 0.75rem;
      line-height: 1.6;
      background: var(--secondary-background-color, #f0f0f0);
      white-space: nowrap;
    }
    .part.dummy {
      background: repeating-linear-gradient(
          -45deg,
          rgba(127, 127, 127, 0.18) 0 4px,
          transparent 4px 8px
        ),
        var(--secondary-background-color, #f0f0f0);
      outline: 1px dashed var(--divider-color, #bbb);
    }
    .part b {
      font-variant-numeric: tabular-nums;
    }
    .default {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      font-style: italic;
    }
    .entity code {
      font-size: 0.75rem;
    }
    .entity-link {
      padding: 0;
      border: none;
      background: none;
      color: var(--primary-color, #03a9f4);
      cursor: pointer;
      font: inherit;
    }
    .entity-link:hover code {
      text-decoration: underline;
    }
    .state {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 6px;
      border-radius: 50%;
      background: var(--disabled-text-color, #9e9e9e);
      vertical-align: middle;
    }
    .state.on {
      background: var(--state-light-active-color, #ffc107);
    }
    .state.unavailable {
      background: var(--error-color, #db4437);
    }
    .state.none {
      width: auto;
      height: auto;
      background: none;
      color: var(--secondary-text-color);
    }
    .live-col {
      width: 64px;
      text-align: center;
    }
    .tile {
      position: relative;
      width: 56px;
      height: 40px;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-variant-numeric: tabular-nums;
      background: #111;
      color: var(--secondary-text-color);
      border: 1px solid var(--divider-color, #e0e0e0);
      box-sizing: border-box;
    }
    .tile.on {
      /* Dim backdrop of the same colour, so low levels still show the hue. */
      background: color-mix(in srgb, var(--tile-color) 22%, #111);
      color: #fff;
    }
    .tile.fx .fill {
      transition: height 0.1s linear, background-color 0.1s linear;
    }
    .tile .fx-badge {
      position: absolute;
      top: 2px;
      right: 3px;
      font-size: 0.5rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      color: #fff;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
    }
    .tile .fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--tile-level);
      background: var(--tile-color);
      transition: height 0.3s ease, background-color 0.3s ease;
    }
    .tile .pct {
      position: relative;
      font-weight: 600;
      color: var(--tile-ink);
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.45);
    }
    .tile.unavailable {
      color: var(--error-color, #db4437);
      font-size: 0.65rem;
    }
    .tile.none {
      background: none;
      border-style: dashed;
    }
    /* Phones: each fixture becomes a card instead of a squeezed table row. */
    @media (max-width: 600px) {
      .table-wrap {
        overflow: visible;
      }
      thead {
        display: none;
      }
      table,
      tbody {
        display: block;
      }
      tbody tr {
        display: grid;
        grid-template-columns: 14px 1fr auto;
        column-gap: 8px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      tbody tr:last-child {
        border-bottom: none;
      }
      tr.invalid {
        background: color-mix(in srgb, var(--error-color, #db4437) 10%, transparent);
      }
      td {
        padding: 0;
        border: none;
        background: none !important;
      }
      td:nth-child(2) {
        min-width: 0;
      }
      td:nth-child(3) {
        grid-column: 3;
        grid-row: 1;
        text-align: right;
        color: var(--secondary-text-color);
        font-size: 0.8rem;
      }
      td.address {
        grid-column: 2;
        margin-top: 4px;
      }
      td.layout {
        grid-column: 2;
        margin-top: 2px;
      }
      td.live-col {
        grid-column: 3;
        grid-row: 2 / span 2;
        align-self: end;
        width: auto;
      }
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
  `,h([g({attribute:!1})],E.prototype,"hass",2),h([g({attribute:!1})],E.prototype,"node",2),h([g({type:Number})],E.prototype,"nodeIndex",2),h([g({attribute:!1})],E.prototype,"errors",2),h([g()],E.prototype,"addUniverse",2),h([g({attribute:!1})],E.prototype,"entityMap",2),h([f()],E.prototype,"_filter",2),h([f()],E.prototype,"_sort",2),h([f()],E.prototype,"_desc",2),h([f()],E.prototype,"_effectOut",2),E=h([C("dmx-fixture-list")],E);var ke=[{type:"chase",label:"Chase",kind:"intensity",description:"One fixture after another"},{type:"sine",label:"Wave",kind:"intensity",description:"Smooth rise and fall"},{type:"ramp_up",label:"Ramp up",kind:"intensity",description:"Fade up, then snap off"},{type:"ramp_down",label:"Ramp down",kind:"intensity",description:"Snap on, then fade down"},{type:"triangle",label:"Triangle",kind:"intensity",description:"Linear up and down"},{type:"square",label:"Pulse",kind:"intensity",description:"On / off blocks"},{type:"sparkle",label:"Sparkle",kind:"intensity",description:"Random flashes"},{type:"rainbow",label:"Rainbow",kind:"color",description:"Hue rotates through the spectrum"},{type:"color_chase",label:"Colour steps",kind:"color",description:"Steps through 2+ colours you pick"},{type:"color_wave",label:"Colour fade",kind:"color",description:"Fades smoothly through your colours"}],ae=o=>ke.find(i=>i.type===o)?.kind==="color",Ee={speed:{default:30,min:.1,max:600},size:{default:100,min:0,max:100},base:{default:0,min:0,max:100},spread:{default:360,min:0,max:3600},groups:{default:1,min:1,max:512},blocks:{default:1,min:1,max:512},wings:{default:1,min:1,max:512},duty:{default:null,min:1,max:100},crossfade:{default:0,min:0,max:100},fade_in:{default:1,min:0,max:600},fade_out:{default:1,min:0,max:600},seed:{default:0,min:0,max:2**31-1}},Se=[[255,0,0],[0,255,0],[0,0,255]],Ft=[{name:"RGB",colors:[[255,0,0],[0,255,0],[0,0,255]]},{name:"Warm",colors:[[255,60,0],[255,150,20],[255,210,120]]},{name:"Ocean",colors:[[0,40,255],[0,200,255],[0,255,170]]},{name:"Sunset",colors:[[255,40,90],[255,120,0],[150,0,255]]},{name:"Party",colors:[[255,0,160],[0,255,255],[255,230,0],[120,0,255]]},{name:"Police",colors:[[255,0,0],[0,0,255]]}],O=o=>ae(o)?"color":"intensity";function S(o,i){let e=o[i];return e??Ee[i]?.default}function Ae(o){return`light.fx_${o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}`}function jt(o){let i=o>>>0;return()=>{i=i+1831565813>>>0;let e=i;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ve(o,i){let e=[...o];if(i.shuffle){let t=jt(S(i,"seed")+1);for(let r=e.length-1;r>0;r--){let n=Math.floor(t()*(r+1));[e[r],e[n]]=[e[n],e[r]]}}return i.direction==="reverse"&&e.reverse(),e}function ur(o,i){if(o<=0)return[];let e=Math.max(1,Math.floor(S(i,"blocks"))),t=Math.max(1,Math.floor(S(i,"groups"))),r=Math.max(1,Math.floor(S(i,"wings"))),n=Math.ceil(o/e),s=Math.ceil(n/t),a=Math.ceil(s/r),l=[];for(let p=0;p<o;p++){let u=Math.floor(p/e)%s,m=Math.floor(u/a),b=u%a;m%2===1&&(b=a-1-b),l.push({position:b/a,count:a,index:b})}return l}var Wt=o=>(o%1+1)%1;function hr(o,i,e){if(e.direction==="bounce"){let t=Math.floor(o),r=o-t;o=t%2===0?r:1-r}return Wt(o-i.position*S(e,"spread")/360)}function Ht(o,i,e){if(o>=i)return 0;let t=i*e/2;return t<=0?1:o<t?o/t:o>i-t?(i-o)/t:1}function zt(...o){let i=2166136261;for(let e of o)i^=Math.floor(e)+2654435769,i=Math.imul(i,16777619);return jt(i)()}function Ye(o,i,e,t,r){let n=e.duty,s=S(e,"crossfade")/100;switch(o){case"sine":return .5-.5*Math.cos(2*Math.PI*i);case"ramp_up":return i;case"ramp_down":return 1-i;case"triangle":return 1-Math.abs(2*i-1);case"square":return Ht(i,(n??50)/100,s);case"chase":return Ht(i,n!=null?n/100:1/Math.max(1,t.count),s);case"sparkle":{let a=(n??30)/100,l=S(e,"seed"),p=r+zt(1,t.index,l),d=Math.floor(p);if(zt(2,t.index,d,l)>=a)return 0;let u=p-d;return u<.25?1-u/.25:0}default:return 0}}function vr(o){let i=Math.floor(o*6),e=o*6-i,t=1-e,[r,n,s]=[[1,e,0],[t,1,0],[0,1,e],[0,t,1],[e,0,1],[1,0,t]][(i%6+6)%6];return[Math.round(r*255),Math.round(n*255),Math.round(s*255)]}var Ot=(o,i,e)=>[0,1,2].map(t=>Math.round(o[t]+(i[t]-o[t])*e));function Ze(o,i,e){let t=e.colors?.length?e.colors:Se;if(o==="rainbow")return vr(Wt(i));if(o==="color_chase"){let p=t.length,d=i*p,u=Math.floor(d)%p,m=d-Math.floor(d),b=S(e,"crossfade")/100;return b>0&&m>1-b?Ot(t[u],t[(u+1)%p],(m-(1-b))/b):t[u]}let r=t.length<2?[t[0],[0,0,0]]:t,n=r.length,s=i*n,a=Math.floor(s)%n,l=s-Math.floor(s);return Ot(r[a],r[(a+1)%n],.5-.5*Math.cos(Math.PI*l))}function Je(o,i,e,t){let r=S(i,"size")/100,n=S(i,"base")/100;return ur(e,i).map(s=>{let a=hr(t,s,i);if(ae(o))return{level:1,rgb:Ze(o,a,i)};let l=n+r*Ye(o,a,i,s,t);return{level:Math.min(1,Math.max(0,l)),rgb:null}})}function Qe(o){return{id:crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2),name:o,type:"chase",fixtures:[],params:{speed:60,fade_in:1,fade_out:1}}}var K="group:",mr=o=>"#"+o.map(i=>i.toString(16).padStart(2,"0")).join(""),fr=o=>[1,3,5].map(i=>parseInt(o.slice(i,i+2),16)),w=class extends y{constructor(){super(...arguments);this.effects=[];this.fixtures=[];this.errors=[];this.savedNames=[];this._selectedId="";this._filter="";this._live=!1;this._liveError="";this._phase=0;this._paused=!1;this._layerWithId="";this._phaseOther=0;this._raf=0;this._lastFrame=0;this._previewId="";this._dragIndex=null;this._animate=e=>{let t=this._current();if(t&&!this._paused){let r=this._lastFrame?(e-this._lastFrame)/1e3:0;this._phase+=r*S(t.params,"speed")/60;let n=this._layerWith(t);n&&(this._phaseOther+=r*S(n.params,"speed")/60)}this._lastFrame=e,this._raf=requestAnimationFrame(this._animate)}}connectedCallback(){super.connectedCallback(),this._raf=requestAnimationFrame(this._animate)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._raf),this._stopLive()}willUpdate(e){e.has("effects")&&!this.effects.find(t=>t.id===this._selectedId)&&(this._selectedId=this.effects[0]?.id??""),e.has("savedNames")&&e.get("savedNames")!==void 0&&this._stopLive()}updated(e){e.has("_selectedId")&&this.renderRoot.querySelector(".main")?.scrollTo(0,0)}_current(){return this.effects.find(e=>e.id===this._selectedId)}_layerWith(e){let t=this.effects.find(r=>r.id===this._layerWithId);return t&&O(t.type)!==O(e.type)?t:void 0}_emit(e){this.dispatchEvent(new CustomEvent("effects-changed",{detail:{effects:e},bubbles:!0,composed:!0}))}_update(e){let t=this._current();if(!t)return;let r={...t,...e};this._emit(this.effects.map(n=>n.id===t.id?r:n)),this._schedulePreviewUpdate(r)}_setType(e){let t=this._current();if(t){if((e==="color_chase"||e==="color_wave")&&(t.params.colors?.length??0)<2){this._update({type:e,params:{...t.params,colors:Se.map(r=>[...r])}});return}this._update({type:e})}}_setParam(e,t){let r=this._current();if(!r)return;let n={...r.params,[e]:t};t==null&&delete n[e],this._update({params:n})}_add(){let e=new Set(this.effects.map(n=>n.name.toLowerCase())),t=this.effects.length+1;for(;e.has(`effect ${t}`);)t++;let r=Qe(`Effect ${t}`);this._emit([...this.effects,r]),this._select(r.id)}_duplicate(){let e=this._current();if(!e)return;let t={...structuredClone(e),id:Qe("").id,name:`${e.name} copy`};this._emit([...this.effects,t]),this._select(t.id)}_delete(){let e=this._current();!e||!confirm(`Delete the effect "${e.name}"?`)||(this._stopLive(),this._emit(this.effects.filter(t=>t.id!==e.id)))}_select(e){e!==this._selectedId&&(this._stopLive(),this._selectedId=e,this._phase=0)}_usable(){return this.fixtures.filter(e=>e.type!=="fixed")}_states(){return this.hass.states??{}}_groupMembers(e,t=0){let r=this._states()[e]?.attributes?.entity_id;return!Array.isArray(r)||t>4?[e]:r.flatMap(n=>this._groupMembers(n,t+1))}_expand(e){let t=new Map(this._usable().map(s=>[s.entityId,s.name])),r=new Set(this._usable().map(s=>s.name)),n=[];for(let s of e){let a=s.startsWith(K)?this._groupMembers(s.slice(K.length)).map(l=>t.get(l)).filter(l=>!!l):r.has(s)?[s]:[];for(let l of a)n.includes(l)||n.push(l)}return n}_groups(){let e=new Map(this._usable().map(r=>[r.entityId,r.name])),t=[];for(let[r,n]of Object.entries(this._states())){let s=r.split(".")[0];if(s!=="light"&&s!=="group"||!Array.isArray(n.attributes?.entity_id))continue;let a=this._groupMembers(r),l=[...new Set(a.map(p=>e.get(p)).filter(p=>!!p))];l.length&&t.push({entityId:r,name:n.attributes.friendly_name||r,fixtures:l,total:new Set(a).size})}return t.sort((r,n)=>r.name.localeCompare(n.name))}_groupLabel(e){let t=e.slice(K.length);return this._states()[t]?.attributes?.friendly_name||t}_expandGroup(e){let t=this._current();if(!t)return;let r=t.fixtures.indexOf(e),n=this._expand([e]).filter(a=>!t.fixtures.includes(a)),s=[...t.fixtures];s.splice(r,1,...n),this._update({fixtures:s})}_toggleFixture(e,t){let r=this._current();if(!r)return;let n=r.fixtures.filter(s=>s!==e);t&&n.push(e),this._update({fixtures:n})}_setAll(e,t){let r=this._current();if(r)if(t){let n=e.filter(s=>!r.fixtures.includes(s));this._update({fixtures:[...r.fixtures,...n]})}else this._update({fixtures:r.fixtures.filter(n=>!e.includes(n))})}_sortByAddress(){let e=this._current();if(!e)return;let t=n=>{let s=this.fixtures.find(a=>a.name===n);return s?[s.host,Number(s.universe),s.channel]:["",0,0]},r=[...e.fixtures].sort((n,s)=>{let[a,l,p]=t(n),[d,u,m]=t(s);return a.localeCompare(d)||l-u||p-m});this._update({fixtures:r})}_move(e,t){let r=this._current();if(!r||t<0||t>=r.fixtures.length||e===t)return;let n=[...r.fixtures],[s]=n.splice(e,1);n.splice(t,0,s),this._update({fixtures:n})}async _toggleLive(e){if(!e){this._stopLive();return}let t=this._current();if(t){this._liveError="",this._previewId=`${t.id}-${Date.now()}`,this._live=!0;try{this._previewStop=await Pt(this.hass,this._previewId,this._payload(t))}catch(r){this._live=!1,this._previewStop=void 0,this._liveError=r?.message??String(r)}}}_stopLive(){window.clearTimeout(this._previewTimer);let e=this._previewStop;this._previewStop=void 0,this._live=!1,e?.().catch(()=>{})}_payload(e){let{id:t,...r}=e;return r}_schedulePreviewUpdate(e){!this._live||!this._previewStop||(window.clearTimeout(this._previewTimer),this._previewTimer=window.setTimeout(async()=>{try{await Nt(this.hass,this._previewId,this._payload(e)),this._liveError=""}catch(t){this._liveError=t?.message??String(t)}},120))}_entityState(e){if(this.savedNames.includes(e.name))return this.hass.states?.[Ae(e.name)]}_runSaved(e,t,r){r.stopPropagation(),Rt(this.hass,"light",t?"turn_on":"turn_off",{entity_id:Ae(e.name)})}_errorsFor(e){let t=`effects/${e}`;return this.errors.filter(r=>r.path===t||r.path.startsWith(`${t}/`))}render(){let e=this._current();return c`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Effects</div>
          ${this.effects.map((t,r)=>{let n=this._entityState(t),s=n?.state==="on",a=ke.find(l=>l.type===t.type);return c`
              <div
                class="rail-item ${t.id===this._selectedId?"active":""}
                  ${this._errorsFor(r).length?"invalid":""}"
                role="button"
                tabindex="0"
                @click=${()=>this._select(t.id)}
                @keydown=${l=>l.key==="Enter"&&this._select(t.id)}
              >
                <span class="rail-text">
                  <span class="rail-title">${t.name||"(unnamed)"}</span>
                  <span class="rail-sub">
                    <span class="badge ${O(t.type)}">${O(t.type)==="color"?"Colour":"Intensity"}</span>
                    ${a?.label??t.type} · ${this._expand(t.fixtures).length} fixture${this._expand(t.fixtures).length===1?"":"s"}
                    ${n?v:c` · <em>not saved</em>`}
                  </span>
                </span>
                ${n?c`<button
                      class="run ${s?"on":""}"
                      title=${s?"Stop (fades out)":"Run (fades in)"}
                      aria-label=${s?`Stop ${t.name}`:`Run ${t.name}`}
                      @click=${l=>this._runSaved(t,!s,l)}
                    >${s?"\u25A0":"\u25B6"}</button>`:v}
              </div>
            `})}
          <button class="rail-add" @click=${this._add}>+ New effect</button>
        </nav>
        <main class="main">
          ${e?this._renderEditor(e):this._renderEmpty()}
        </main>
      </div>
    `}_renderEmpty(){return c`<div class="empty">
      <p>Effects run patterns across your fixtures: chases, waves, rainbows and more.</p>
      <button class="primary" @click=${this._add}>+ New effect</button>
    </div>`}_renderEditor(e){let t=this.effects.findIndex(s=>s.id===e.id),r=this._errorsFor(t),n=ae(e.type);return c`
      <div class="editor-head">
        <input
          class="name"
          aria-label="Effect name"
          .value=${e.name}
          @input=${s=>this._update({name:s.target.value})}
        />
        <span class="entity">${Ae(e.name||"effect")}</span>
        <span class="spacer"></span>
        <button @click=${this._duplicate}>Duplicate</button>
        <button class="danger" @click=${this._delete}>Delete</button>
      </div>

      ${r.length?c`<div class="errors">${r.map(s=>c`<div>⚠ ${s.message}</div>`)}</div>`:v}

      ${this._renderPreview(e)}

      <section>
        <h3>Effect</h3>
        <div class="layer-note">
          Intensity effects move brightness and keep each fixture's colour; colour effects set
          the colour. Run one of each on the same fixtures to <b>layer</b> them — e.g. a chase
          over a rainbow.
        </div>
        ${["intensity","color"].map(s=>c`
            <div class="type-group">
              <div class="type-group-label">${s==="color"?"Colour":"Intensity"}</div>
              <div class="types">
                ${ke.filter(a=>a.kind===s).map(a=>c`
                    <button
                      class="type ${e.type===a.type?"active":""}"
                      aria-pressed=${e.type===a.type}
                      @click=${()=>this._setType(a.type)}
                    >
                      ${this._typeGlyph(a.type,e.params)}
                      <span class="type-label">${a.label}</span>
                      <span class="type-desc">${a.description}</span>
                    </button>
                  `)}
              </div>
            </div>
          `)}
      </section>

      ${this._renderFixtures(e)}

      <section>
        <h3>Timing</h3>
        ${this._slider("Speed","speed",e,{min:1,max:240,step:1,unit:"BPM",hint:"Cycles per minute"})}
        <div class="row2">
          ${this._number("Fade in","fade_in",e,"s",.1)}
          ${this._number("Fade out","fade_out",e,"s",.1)}
        </div>
      </section>

      ${n?this._renderColors(e):this._renderShape(e)}

      ${this._renderFlow(e)}
    `}_renderPreview(e){let t=Ve(this._expand(e.fixtures),e.params),r=Je(e.type,e.params,t.length,this._phase),n=new Map(t.map((d,u)=>[d,r[u]])),s=this._expand(e.fixtures).filter(d=>n.has(d)),a=s.map(d=>n.get(d)),l=this._layerWith(e);if(l){let d=Ve(this._expand(l.fixtures),l.params),u=Je(l.type,l.params,d.length,this._phaseOther),m=new Map(d.map((b,_)=>[b,u[_]]));s.forEach((b,_)=>{let $=m.get(b);$&&(a[_]=O(e.type)==="intensity"?{level:a[_].level,rgb:$.rgb}:{level:$.level,rgb:a[_].rgb})})}let p=this.effects.filter(d=>d.id!==e.id&&O(d.type)!==O(e.type));return c`
      <section class="preview">
        <div class="preview-head">
          <h3>Preview</h3>
          <button class="small" @click=${()=>this._paused=!this._paused}>
            ${this._paused?"\u25B6 Play":"\u275A\u275A Pause"}
          </button>
          ${p.length?c`<label class="layer-with">
                Layer with
                <select @change=${d=>{this._layerWithId=d.target.value,this._phaseOther=0}}>
                  <option value="" ?selected=${!l}>nothing</option>
                  ${p.map(d=>c`<option value=${d.id} ?selected=${l?.id===d.id}>${d.name}</option>`)}
                </select>
              </label>`:v}
          <span class="spacer"></span>
          <label class="switch" title="Run this effect on the real fixtures while you edit">
            <input
              type="checkbox"
              .checked=${this._live}
              ?disabled=${!e.fixtures.length}
              @change=${d=>this._toggleLive(d.target.checked)}
            />
            Live on fixtures
          </label>
        </div>
        ${this._liveError?c`<div class="live-error">${this._liveError}</div>`:v}
        ${s.length?c`<div class="strip">
              ${s.map((d,u)=>{let m=a[u],b=m.rgb??[255,214,150],_=b.map($=>Math.round($*m.level));return c`<div class="cell" title=${`${d}: ${Math.round(m.level*100)}%`}>
                  <div class="lamp" style="background: rgb(${_.join(",")}); box-shadow: 0 0 ${Math.round(14*m.level)}px rgba(${b.join(",")}, ${(.8*m.level).toFixed(2)})"></div>
                  <div class="cell-name">${d}</div>
                </div>`})}
            </div>`:c`<div class="hint">Pick some fixtures below to see the effect.</div>`}
      </section>
    `}_typeGlyph(e,t){if(ae(e)){let l=Array.from({length:12},(p,d)=>{let u=Ze(e,d/11,t);return mt`<stop offset=${d/11} stop-color=${`rgb(${u.join(",")})`} />`});return c`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
        <defs><linearGradient id="g-${e}">${l}</linearGradient></defs>
        <rect x="2" y="5" width=${60} height=${12} rx="4" fill="url(#g-${e})" />
      </svg>`}let s={position:0,count:4,index:0},a=Array.from({length:65},(l,p)=>{let d=p/64*2,u=Ye(e,d%1,{...t,seed:3},s,d);return`${2+p/64*60},${19-u*16}`}).join(" ");return c`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
      <polyline points=${a} fill="none" stroke="currentColor" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" />
    </svg>`}_renderFixtures(e){let t=this._filter.trim().toLowerCase(),r=this._usable(),n=new Map;for(let d of r){if(t&&!`${d.name} ${d.type}`.toLowerCase().includes(t))continue;let u=`${d.host} \xB7 universe ${d.universe}`;n.set(u,[...n.get(u)??[],d])}let s=this._groups().filter(d=>!t||`${d.name} ${d.entityId}`.toLowerCase().includes(t)),a=this._states(),l=e.fixtures.filter(d=>d.startsWith(K)?!a[d.slice(K.length)]:!r.some(u=>u.name===d)),p=this._expand(e.fixtures).length;return c`
      <section>
        <h3>Fixtures</h3>
        <div class="fixtures">
          <div class="pick">
            <input
              class="filter"
              type="search"
              placeholder="Filter fixtures"
              .value=${this._filter}
              @input=${d=>this._filter=d.target.value}
            />
            <div class="pick-list">
              ${s.length?c`<div class="pick-group">
                    <div class="pick-head plain">Home Assistant groups</div>
                    ${s.map(d=>{let u=`${K}${d.entityId}`;return c`<label class="pick-item" title=${d.fixtures.join(", ")}>
                        <input type="checkbox" .checked=${e.fixtures.includes(u)}
                          @change=${m=>this._toggleFixture(u,m.target.checked)} />
                        <span class="pick-name"><span class="group-icon" aria-hidden="true">⧉</span>${d.name}</span>
                        <span class="pick-sub">${d.fixtures.length} fixture${d.fixtures.length===1?"":"s"}${d.total>d.fixtures.length?` of ${d.total} lights`:""}</span>
                      </label>`})}
                  </div>`:v}
              ${r.length?[...n.entries()].map(([d,u])=>{let m=u.map(_=>_.name),b=m.every(_=>e.fixtures.includes(_));return c`
                      <div class="pick-group">
                        <label class="pick-head">
                          <input type="checkbox" .checked=${b}
                            @change=${_=>this._setAll(m,_.target.checked)} />
                          ${d}
                        </label>
                        ${u.map(_=>c`<label class="pick-item">
                            <input type="checkbox" .checked=${e.fixtures.includes(_.name)}
                              @change=${$=>this._toggleFixture(_.name,$.target.checked)} />
                            <span class="pick-name">${_.name}</span>
                            <span class="pick-sub">${_.type} · ${_.channel}</span>
                          </label>`)}
                      </div>`}):c`<div class="hint">No fixtures in the patch yet.</div>`}
            </div>
          </div>
          <div class="order">
            <div class="order-head">
              <span>Order <span class="order-count">(${p} fixture${p===1?"":"s"})</span></span>
              <span class="spacer"></span>
              <button class="small" ?disabled=${e.fixtures.length<2} @click=${this._sortByAddress}>By address</button>
              <button class="small" ?disabled=${e.fixtures.length<2}
                @click=${()=>this._update({fixtures:[...e.fixtures].reverse()})}>Reverse</button>
              <button class="small" ?disabled=${!e.fixtures.length}
                @click=${()=>this._update({fixtures:[]})}>Clear</button>
            </div>
            ${e.fixtures.length?c`<ol class="order-list">
                  ${e.fixtures.map((d,u)=>c`<li
                      class=${l.includes(d)?"missing":""}
                      draggable="true"
                      @dragstart=${m=>{this._dragIndex=u,m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",d)}}
                      @dragover=${m=>m.preventDefault()}
                      @drop=${m=>{m.preventDefault(),this._dragIndex!==null&&this._move(this._dragIndex,u),this._dragIndex=null}}
                    >
                      <span class="grip" aria-hidden="true">⋮⋮</span>
                      <span class="order-nr">${u+1}</span>
                      ${d.startsWith(K)?c`<span class="order-name group" title=${this._expand([d]).join(", ")}>
                            <span class="group-icon" aria-hidden="true">⧉</span>${this._groupLabel(d)}
                            <small>${l.includes(d)?"group not found":`${this._expand([d]).length} fixtures`}</small>
                          </span>
                          <button class="small" title="Replace the group with its fixtures, to order them one by one"
                            ?disabled=${l.includes(d)} @click=${()=>this._expandGroup(d)}>Expand</button>`:c`<span class="order-name">${d}${l.includes(d)?" (not in patch)":""}</span>`}
                      <button class="icon" title="Move up" ?disabled=${u===0} @click=${()=>this._move(u,u-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${u===e.fixtures.length-1}
                        @click=${()=>this._move(u,u+1)}>↓</button>
                      <button class="icon" title="Remove" @click=${()=>this._toggleFixture(d,!1)}>✕</button>
                    </li>`)}
                </ol>`:c`<div class="hint">Tick fixtures or groups on the left. The effect flows through them in this order — drag to rearrange. A group follows its members when the effect starts and as the group changes.</div>`}
          </div>
        </div>
      </section>
    `}_renderShape(e){let t=e.type,r=t==="square"||t==="chase"||t==="sparkle",n=t==="square"||t==="chase",s=e.params.duty==null;return c`
      <section>
        <h3>Shape</h3>
        ${this._slider("Size","size",e,{min:0,max:100,step:1,unit:"%",hint:"How far the intensity moves"})}
        ${this._slider("Base","base",e,{min:0,max:100,step:1,unit:"%",hint:"Lowest intensity"})}
        ${r?c`
              ${t==="chase"||t==="sparkle"?c`<label class="check">
                    <input type="checkbox" .checked=${s}
                      @change=${a=>this._setParam("duty",a.target.checked?null:t==="sparkle"?30:25)} />
                    ${t==="chase"?"One fixture at a time":"Default sparkle amount"}
                  </label>`:v}
              ${!s||t==="square"?this._slider(t==="sparkle"?"Amount":"On time","duty",e,{min:1,max:100,step:1,unit:"%",fallback:50,hint:t==="sparkle"?"How often fixtures flash":"Share of each cycle that is on"}):v}
            `:v}
        ${n?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Fade instead of snap"}):v}
      </section>
    `}_renderColors(e){if(e.type==="rainbow")return c`<section><h3>Colours</h3>
        <div class="hint">The rainbow runs through every hue. Use Spread to set how many colours show at once.</div>
      </section>`;let t=e.params.colors?.length?e.params.colors:Se,r=s=>this._setParam("colors",s),n=(s,a)=>s.length===a.length&&s.every((l,p)=>l.every((d,u)=>d===a[p][u]));return c`
      <section>
        <h3>Colours</h3>
        <div class="hint">
          ${e.type==="color_chase"?"Each fixture steps through these colours in order. Pick 2 or more.":"Each fixture fades smoothly through these colours in order. Pick 2 or more."}
        </div>
        <div class="colors">
          ${t.map((s,a)=>c`<div class="color">
              <span class="color-nr">${a+1}</span>
              <input type="color" aria-label="Colour ${a+1}" .value=${mr(s)}
                @input=${l=>r(t.map((p,d)=>d===a?fr(l.target.value):p))} />
              <span class="color-tools">
                <button class="icon" title="Move earlier" ?disabled=${a===0}
                  @click=${()=>{let l=[...t];[l[a-1],l[a]]=[l[a],l[a-1]],r(l)}}>←</button>
                <button class="icon" title="Move later" ?disabled=${a===t.length-1}
                  @click=${()=>{let l=[...t];[l[a+1],l[a]]=[l[a],l[a+1]],r(l)}}>→</button>
                <button class="icon" title="Remove colour" ?disabled=${t.length<=2}
                  @click=${()=>r(t.filter((l,p)=>p!==a))}>✕</button>
              </span>
            </div>`)}
          ${t.length<16?c`<button class="add-color" title="Add a colour"
                @click=${()=>r([...t,[255,255,255]])}>+</button>`:v}
        </div>
        <div class="palettes">
          <span class="field-label">Palettes</span>
          ${Ft.map(s=>c`<button class="palette ${n(s.colors,t)?"active":""}"
              title=${s.name} @click=${()=>r(s.colors.map(a=>[...a]))}>
              <span class="palette-swatch" style="background: linear-gradient(90deg, ${s.colors.map(a=>`rgb(${a.join(",")})`).join(", ")})"></span>
              ${s.name}
            </button>`)}
        </div>
        ${e.type==="color_chase"?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Blend into the next colour"}):v}
      </section>
    `}_renderFlow(e){let t=e.params.direction??"forward",r=[["forward","Forward"],["reverse","Reverse"],["bounce","Bounce"]];return c`
      <section>
        <h3>Flow across fixtures</h3>
        ${this._slider("Spread","spread",e,{min:0,max:720,step:15,unit:"\xB0",hint:"0\xB0 = all together, 360\xB0 = one wave across them all"})}
        <div class="field">
          <span class="field-label">Direction</span>
          <div class="segmented" role="group" aria-label="Direction">
            ${r.map(([n,s])=>c`<button class=${t===n?"active":""} aria-pressed=${t===n}
              @click=${()=>this._setParam("direction",n==="forward"?void 0:n)}>${s}</button>`)}
          </div>
        </div>
        <div class="field">
          <span class="field-label">Shuffle</span>
          <label class="check inline">
            <input type="checkbox" .checked=${!!e.params.shuffle}
              @change=${n=>this._setParam("shuffle",n.target.checked||void 0)} />
            Random order
          </label>
          ${e.params.shuffle?c`<button class="small" @click=${()=>this._setParam("seed",(e.params.seed??0)+1)}>Reshuffle</button>`:v}
        </div>
        <div class="row3">
          ${this._stepper("Groups","groups",e,"Repeat the pattern in N parts")}
          ${this._stepper("Blocks","blocks",e,"N fixtures move together")}
          ${this._stepper("Wings","wings",e,"Mirror every other part")}
        </div>
      </section>
    `}_slider(e,t,r,n){let a=r.params[t]??Ee[t]?.default??n.fallback??n.min,l=Ee[t];return c`<div class="field">
      <span class="field-label">${e}</span>
      <input type="range" min=${n.min} max=${n.max} step=${n.step} .value=${String(Math.min(n.max,a))}
        aria-label=${e}
        @input=${p=>this._setParam(t,Number(p.target.value))} />
      <span class="num">
        <input type="number" min=${l?.min??n.min} max=${l?.max??n.max} step=${n.step===15?1:n.step}
          .value=${String(a)} aria-label="${e} value"
          @change=${p=>{let d=Number(p.target.value);Number.isNaN(d)||this._setParam(t,d)}} />
        <span class="unit">${n.unit}</span>
      </span>
      ${n.hint?c`<span class="field-hint">${n.hint}</span>`:v}
    </div>`}_number(e,t,r,n,s){return c`<label class="field compact">
      <span class="field-label">${e}</span>
      <span class="num">
        <input type="number" min="0" max="600" step=${s} .value=${String(S(r.params,t))}
          @change=${a=>this._setParam(t,Number(a.target.value))} />
        <span class="unit">${n}</span>
      </span>
    </label>`}_stepper(e,t,r,n){let s=S(r.params,t),a=l=>this._setParam(t,Math.max(1,Math.min(512,l))===1?void 0:Math.max(1,Math.min(512,l)));return c`<div class="stepper" title=${n}>
      <span class="field-label">${e}</span>
      <div class="stepper-ctl">
        <button class="icon" aria-label="Fewer ${e.toLowerCase()}" ?disabled=${s<=1} @click=${()=>a(s-1)}>−</button>
        <span class="stepper-val">${s}</span>
        <button class="icon" aria-label="More ${e.toLowerCase()}" @click=${()=>a(s+1)}>+</button>
      </div>
      <span class="field-hint">${n}</span>
    </div>`}};w.styles=A`
    :host {
      display: block;
      height: 100%;
    }
    .layout {
      display: flex;
      height: 100%;
    }
    .rail {
      width: 240px;
      flex-shrink: 0;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      padding: 12px 8px;
      box-sizing: border-box;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .rail-section {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin: 8px 8px 4px;
    }
    .rail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      padding: 8px 10px;
      cursor: pointer;
    }
    .rail-item:hover {
      background: color-mix(in srgb, var(--secondary-background-color, #f0f0f0) 60%, transparent);
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-item.invalid .rail-title {
      color: var(--error-color, #db4437);
    }
    .rail-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .rail-title {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rail-sub {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .rail-add {
      background: none;
      color: var(--primary-color);
      text-align: left;
      padding: 8px 10px;
    }
    button.run {
      flex: none;
      width: 30px;
      height: 30px;
      padding: 0;
      border-radius: 50%;
      font-size: 0.75rem;
    }
    button.run.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px 40px;
      box-sizing: border-box;
      max-width: 980px;
    }
    button {
      font: inherit;
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: var(--secondary-background-color, #f0f0f0);
      color: var(--primary-text-color);
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button.danger {
      background: none;
      color: var(--error-color, #db4437);
    }
    button.small {
      padding: 4px 10px;
      font-size: 0.8rem;
    }
    button.icon {
      padding: 2px 8px;
      background: none;
    }
    input,
    select {
      font: inherit;
      color: var(--primary-text-color);
    }
    .empty {
      padding: 48px 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .editor-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
    }
    input.name {
      font-size: 1.3rem;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      min-width: 0;
      flex: 0 1 320px;
    }
    .entity {
      font-family: var(--code-font-family, monospace);
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }
    .spacer {
      flex: 1;
    }
    .errors,
    .live-error {
      margin-top: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
      color: var(--error-color, #db4437);
      font-size: 0.85rem;
    }
    section {
      margin-top: 16px;
      padding: 14px 16px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    h3 {
      margin: 0 0 10px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .preview-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .preview-head h3 {
      margin: 0;
    }
    .switch {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .strip {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 8px;
      padding: 14px 10px;
      border-radius: 10px;
      background: #111;
    }
    .cell {
      width: 44px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .lamp {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid #333;
    }
    .cell-name {
      font-size: 0.6rem;
      color: #aaa;
      max-width: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .layer-note {
      font-size: 0.82rem;
      color: var(--secondary-text-color);
      margin: -2px 0 10px;
    }
    .type-group + .type-group {
      margin-top: 12px;
    }
    .type-group-label {
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .badge {
      display: inline-block;
      margin-right: 4px;
      padding: 0 6px;
      border-radius: 8px;
      font-size: 0.65rem;
      font-weight: 600;
      line-height: 1.5;
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    }
    .badge.color {
      background: linear-gradient(90deg, rgba(255, 60, 90, 0.35), rgba(120, 80, 255, 0.35), rgba(0, 200, 255, 0.35));
    }
    .layer-with {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
    }
    .layer-with select {
      padding: 3px 6px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
    }
    .color-nr {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .color {
      gap: 2px;
      padding: 4px 6px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .color-tools {
      display: inline-flex;
    }
    .color-tools .icon {
      padding: 2px 4px;
    }
    button.add-color {
      width: 44px;
      height: 40px;
      font-size: 1.2rem;
      border: 1px dashed var(--divider-color, #bbb);
      background: none;
    }
    .palettes {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
    }
    .palettes .field-label {
      margin-right: 6px;
    }
    button.palette {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px 4px 4px;
      font-size: 0.8rem;
      border: 2px solid transparent;
    }
    button.palette.active {
      border-color: var(--primary-color);
    }
    .palette-swatch {
      width: 36px;
      height: 18px;
      border-radius: 4px;
    }
    .types {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
      gap: 8px;
    }
    button.type {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 10px;
      text-align: left;
      border: 2px solid transparent;
      color: var(--primary-text-color);
    }
    button.type.active {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 12%, var(--card-background-color, #fff));
    }
    .glyph {
      width: 64px;
      height: 22px;
      color: var(--primary-color);
      margin-bottom: 4px;
    }
    .type-label {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .type-desc {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
    }
    .fixtures {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .filter {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
    }
    .pick-list {
      margin-top: 8px;
      max-height: 280px;
      overflow-y: auto;
    }
    .pick-group + .pick-group {
      margin-top: 8px;
    }
    .pick-head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    .pick-head.plain {
      padding-left: 2px;
    }
    .group-icon {
      margin-right: 6px;
      color: var(--primary-color);
    }
    .order-name.group small {
      margin-left: 6px;
      color: var(--secondary-text-color);
    }
    .order-count {
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .pick-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 4px 4px 18px;
      border-radius: 6px;
      cursor: pointer;
    }
    .pick-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .pick-name {
      flex: 1;
    }
    .pick-sub {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .order-head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .order-list {
      list-style: none;
      margin: 8px 0 0;
      padding: 0;
      max-height: 300px;
      overflow-y: auto;
    }
    .order-list li {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 6px;
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      margin-bottom: 4px;
      cursor: grab;
    }
    .order-list li.missing .order-name {
      color: var(--error-color, #db4437);
    }
    .grip {
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      letter-spacing: -2px;
    }
    .order-nr {
      width: 1.6em;
      text-align: right;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .order-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .field {
      display: grid;
      grid-template-columns: 110px 1fr auto;
      align-items: center;
      gap: 2px 12px;
      margin: 10px 0;
    }
    .field.compact {
      grid-template-columns: 110px auto;
    }
    .field-label {
      font-size: 0.9rem;
    }
    .field-hint {
      grid-column: 2 / -1;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    input[type='range'] {
      width: 100%;
      accent-color: var(--primary-color);
    }
    .num {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .num input {
      width: 72px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
    }
    .unit {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      min-width: 2.2em;
    }
    .row2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 16px;
    }
    .row3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 8px;
    }
    .stepper {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .stepper .field-hint {
      grid-column: auto;
    }
    .stepper-ctl {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      width: fit-content;
    }
    .stepper-val {
      min-width: 2em;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
    .segmented {
      display: inline-flex;
      grid-column: 2 / -1;
      width: fit-content;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .segmented button {
      border-radius: 0;
      background: none;
      padding: 6px 14px;
    }
    .segmented button.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      margin: 6px 0;
    }
    .check.inline {
      margin: 0;
    }
    .colors {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .color {
      display: inline-flex;
      align-items: center;
    }
    input[type='color'] {
      width: 44px;
      height: 32px;
      padding: 0;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: none;
      cursor: pointer;
    }
    @media (max-width: 760px) {
      .layout {
        flex-direction: column;
        height: auto;
      }
      .rail {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
      }
      .rail-section {
        width: 100%;
      }
      .main {
        padding: 12px;
      }
      .fixtures,
      .row2 {
        grid-template-columns: 1fr;
      }
      .row3 {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 6px;
      }
      .field {
        grid-template-columns: 1fr auto;
      }
      .field input[type='range'] {
        grid-column: 1 / -1;
        grid-row: 2;
      }
      .field-hint {
        grid-column: 1 / -1;
      }
      .segmented {
        grid-column: 1 / -1;
      }
    }
  `,h([g({attribute:!1})],w.prototype,"hass",2),h([g({attribute:!1})],w.prototype,"effects",2),h([g({attribute:!1})],w.prototype,"fixtures",2),h([g({attribute:!1})],w.prototype,"errors",2),h([g({attribute:!1})],w.prototype,"savedNames",2),h([f()],w.prototype,"_selectedId",2),h([f()],w.prototype,"_filter",2),h([f()],w.prototype,"_live",2),h([f()],w.prototype,"_liveError",2),h([f()],w.prototype,"_phase",2),h([f()],w.prototype,"_paused",2),h([f()],w.prototype,"_layerWithId",2),w=h([C("dmx-effects-view")],w);var x=class extends y{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._entityMap={};this._mode=x._loadMode();this._savedEffectNames=[];this._view=x._loadView();this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}static _loadMode(){try{return localStorage.getItem("dmx_lighting.mode")==="effects"?"effects":"patch"}catch{return"patch"}}_setMode(e){this._mode=e;try{localStorage.setItem("dmx_lighting.mode",e)}catch{}}_fixtureInfos(){return this._patch.nodes.flatMap(e=>Object.entries(e.universes??{}).flatMap(([t,r])=>(r.devices??[]).map(n=>({name:n.name,type:n.type,host:e.host,universe:t,channel:n.channel,entityId:oe(this.hass,this._entityMap,e.host,t,n)??`light.${V(n.name)}`}))))}_fixtureNames(e=this._patch){return new Set(e.nodes.flatMap(t=>Object.values(t.universes??{}).flatMap(r=>(r.devices??[]).map(n=>n.name))))}willUpdate(e){let t=e.get("_patch");if(!t||!this._patch.effects?.length)return;let r=this._fixtureNames(),n=[...this._fixtureNames(t)].filter(s=>!r.has(s));n.length&&(this._patch={...this._patch,effects:this._patch.effects.map(s=>({...s,fixtures:s.fixtures.filter(a=>!n.includes(a))}))})}_onEffectsChanged(e){this._patch={...this._patch,effects:e.detail.effects},this._dirty=!0}static _loadView(){try{return localStorage.getItem("dmx_lighting.view")==="list"?"list":"grid"}catch{return"grid"}}_setView(e){this._view=e;try{localStorage.setItem("dmx_lighting.view",e)}catch{}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await Et(this.hass);this._patch=e.patch??{nodes:[]},this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._errors=e.errors??[],this._loaded=!0,this._autoSelect(),this._refreshEntityMap()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}async _refreshEntityMap(){try{this._entityMap=(await Tt(this.hass)).entities??{}}catch{}}_autoSelect(){this._selected||this._patch.nodes.length&&this._selectNode("ui:0")}_selectNode(e){this._selected=e;let t=this._currentUniverses(),r=Object.keys(t??{}).sort((n,s)=>Number(n)-Number(s));this._selectedUniverse=r[0]??""}_currentNode(){let[e,t]=this._selected.split(":"),r=Number(t);if(e==="ui")return this._patch.nodes[r]}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[t,r]=this._selected.split(":");if(t!=="ui")return;let n=Number(r),s=[...this._patch.nodes];s[n]=e(s[n]),this._patch={...this._patch,nodes:s},this._dirty=!0}_updateUniverse(e,t){this._updateSelectedNode(r=>{let n=r.universes[e];return n?{...r,universes:{...r.universes,[e]:t(n)}}:r})}async _save(){this._saving=!0,this._errors=[];try{let e=await St(this.hass,this._patch);e.success?(this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}async _openYamlDialog(){try{let e=await At(this.hass,this._patch);this._dialog={kind:"yaml",yamlText:e.yaml,errorText:""}}catch(e){this._showToast(`Export failed: ${e}`)}}async _onImportPatch(e){if(this._dialog.kind!=="yaml")return;let{content:t}=e.detail;try{let r=await Ct(this.hass,t);this._patch=r.patch,this._dirty=!0,this._errors=r.errors,this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._showToast(r.valid?"Loaded into editor \u2014 review and Save & Apply":"Loaded with validation errors \u2014 fix them before saving")}catch(r){let n=r?.message??String(r);this._dialog={kind:"yaml",yamlText:t,errorText:n}}}_addNode(){this._dialog={kind:"node",node:Lt(),isNew:!0}}_editNode(){let e=this._currentNode();e&&(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:t,original:r}=e.detail,n=this._patch.nodes,s=n.findIndex(a=>a.id===r.id);s>=0?n[s]=t:(n.push(t),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:t}=e.detail;this._patch.nodes=this._patch.nodes.filter(r=>r.id!==t.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._dialog={kind:"universe",mode:"add",current:""}}_renumberUniverse(){this._selectedUniverse&&(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:t}=e.detail;if(this._dialog.kind!=="universe")return;let r=this._dialog.mode,n=this._dialog.current;this._updateSelectedNode(s=>{let a={...s.universes};return r==="add"?a[t]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[t]=a[n],delete a[n]),{...s,universes:a}}),this._selectedUniverse=t,this._dialog={kind:"none"}}_removeUniverse(){let e=this._currentNode();if(!e||!this._selectedUniverse)return;let t=e.universes[this._selectedUniverse]?.devices??[];if(t.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${t.length} fixture(s)?`))return;let r={...e.universes};delete r[this._selectedUniverse],this._updateSelectedNode(s=>({...s,universes:r}));let n=Object.keys(r).sort((s,a)=>Number(s)-Number(a));this._selectedUniverse=n[0]??""}_setUniverseOption(e,t){this._updateUniverse(this._selectedUniverse,r=>({...r,[e]:t}))}_onAddDevice(e){let t=this._selectedUniverse;if(!t){this._showToast("Add a universe first");return}let r=e.detail.channel??this._firstFreeChannel(t);this._dialog={kind:"device",device:It(r),isNew:!0,universeNr:t}}_firstFreeChannel(e){let t=(this._currentUniverses()?.[e]?.devices??[]).map(n=>T(n)).sort((n,s)=>n[0]-s[0]),r=1;for(let[n,s]of t){if(r<n)break;r=Math.max(r,s+1)}return Math.min(r,512)}_onEditDevice(e){this._refreshEntityMap();let t=e.detail.universe??this._selectedUniverse;this._selectedUniverse=t,this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:t}}_onSaveDevice(e){let{device:t,original:r,count:n}=e.detail;if(this._dialog.kind!=="device")return;let s=this._dialog.universeNr;r.name&&t.name!==r.name&&this._patch.effects?.length&&(this._patch={...this._patch,effects:this._patch.effects.map(l=>({...l,fixtures:l.fixtures.map(p=>p===r.name?t.name:p)}))});let a=0;this._updateUniverse(s,l=>{let p=[...l.devices],d=p.findIndex(u=>u.id===r.id);if(d>=0)p[d]=t;else if(n>1){let u=t.channel;for(let m=1;m<=n;m++){let b={...t,id:ne(),name:`${t.name}_${m}`,channel:u},[_,$]=T(b);if($>512){a=n-m+1;break}p.push(b),u=$+1}}else p.push(t);return{...l,devices:p}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:t}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,r=>({...r,devices:r.devices.filter(n=>n.id!==t.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:t,channel:r}=e.detail;this._updateUniverse(this._selectedUniverse,n=>({...n,devices:n.devices.map(s=>s.id===t?{...s,channel:r}:s)}))}render(){if(!this._loaded)return c`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),t=this._currentUniverses()??{},r=Object.keys(t).sort((s,a)=>Number(s)-Number(a)),n=t[this._selectedUniverse];return c`
      <div class="header">
        <h1>DMX Patch</h1>
        <span class="mode-toggle" role="tablist" aria-label="Section">
          <button role="tab" aria-selected=${this._mode==="patch"}
            class=${this._mode==="patch"?"active":""} @click=${()=>this._setMode("patch")}>Patch</button>
          <button role="tab" aria-selected=${this._mode==="effects"}
            class=${this._mode==="effects"?"active":""} @click=${()=>this._setMode("effects")}>Effects</button>
        </span>
        ${this._dirty?c`<span class="dirty">unsaved changes</span>`:v}
        <span class="spacer"></span>
        <button class="header-secondary" @click=${this._openYamlDialog}>YAML</button>
        <button
          class="primary"
          ?disabled=${!this._dirty||this._saving}
          @click=${this._save}
        >
          ${this._saving?"Saving\u2026":"Save & Apply"}
        </button>
      </div>

      ${this._mode==="effects"?c`<div class="layout effects-layout">
            <dmx-effects-view
              .hass=${this.hass}
              .effects=${this._patch.effects??[]}
              .fixtures=${this._fixtureInfos()}
              .errors=${this._errors}
              .savedNames=${this._savedEffectNames}
              @effects-changed=${this._onEffectsChanged}
            ></dmx-effects-view>
          </div>`:c`
      <div class="layout ${this.narrow?"narrow":""}">
        <nav class="rail">
          <div class="rail-section">Patch nodes</div>
          ${this._patch.nodes.map((s,a)=>c`
              <button
                class="rail-item ${this._selected===`ui:${a}`?"active":""}"
                @click=${()=>this._selectNode(`ui:${a}`)}
              >
                <span class="rail-title">${s.host||"(new node)"}</span>
                <span class="rail-sub">${s.node_type}</span>
              </button>
            `)}
          <button class="rail-add" @click=${this._addNode}>+ Add node</button>
        </nav>

        <main class="main">
          ${e?c`
                <div class="node-bar">
                  <h2>${e.host} <small>(${e.node_type})</small></h2>
                  <span class="view-toggle" role="group" aria-label="Fixture view">
                    <button
                      class=${this._view==="grid"?"active":""}
                      aria-pressed=${this._view==="grid"}
                      @click=${()=>this._setView("grid")}
                    >
                      Grid
                    </button>
                    <button
                      class=${this._view==="list"?"active":""}
                      aria-pressed=${this._view==="list"}
                      @click=${()=>this._setView("list")}
                    >
                      List
                    </button>
                  </span>
                  <button @click=${this._editNode}>Node settings</button>
                </div>

                <div class="universe-bar">
                  ${r.map(s=>c`
                      <button
                        class="tab ${this._selectedUniverse===s?"active":""}"
                        @click=${()=>this._selectedUniverse=s}
                      >
                        Universe ${s}
                      </button>
                    `)}
                  <button class="tab add" title="Add universe" @click=${this._addUniverse}>
                    + Add universe
                  </button>
                  ${this._selectedUniverse?c`
                        <button class="tab" @click=${this._renumberUniverse}>Renumber</button>
                        <button class="tab remove" @click=${this._removeUniverse}>
                          Remove universe
                        </button>
                      `:v}
                </div>

                ${this._view==="list"?c`
                      <dmx-fixture-list
                        .hass=${this.hass}
                        .node=${e}
                        .nodeIndex=${Number(this._selected.split(":")[1])}
                        .errors=${this._errors}
                        .addUniverse=${this._selectedUniverse}
                        .entityMap=${this._entityMap}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                      ></dmx-fixture-list>
                    `:n?c`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            @change=${s=>this._setUniverseOption("output_correction",s.target.value)}
                          >
                            ${me.map(s=>c`<option
                                  value=${s}
                                  ?selected=${(n.output_correction??"linear")===s}
                                >
                                  ${s}
                                </option>`)}
                          </select>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            .checked=${n.send_partial_universe??!0}
                            @change=${s=>this._setUniverseOption("send_partial_universe",s.target.checked)}
                          />
                          Send partial universe
                        </label>
                      </div>

                      <dmx-universe-grid
                        .hass=${this.hass}
                        .universe=${n}
                        .universeNr=${Number(this._selectedUniverse)}
                        .nodeKey=${wt(e)}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @move-device=${this._onMoveDevice}
                        @grid-error=${s=>this._showToast(s.detail)}
                      ></dmx-universe-grid>
                    `:c`<div class="empty">No universes. Add one to start placing fixtures.</div>`}
              `:c`<div class="empty">
                No nodes yet. Add a node to start patching, or load a patch with the YAML button.
              </div>`}

          ${this._errors.length?c`
                <div class="errors">
                  <strong>Validation errors</strong>
                  <ul>
                    ${this._errors.map(s=>c`<li><code>${s.path}</code>: ${s.message}</li>`)}
                  </ul>
                </div>
              `:v}
        </main>
      </div>`}

      ${this._dialog.kind==="device"?c`
            <dmx-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              .hass=${this.hass}
              .nodeTransition=${this._currentNode()?.transition??null}
              .entityId=${this._dialog.isNew?"":oe(this.hass,this._entityMap,this._currentNode()?.host??"",this._dialog.universeNr,this._dialog.device)??""}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></dmx-device-dialog>
          `:v}
      ${this._dialog.kind==="node"?c`
            <dmx-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></dmx-node-dialog>
          `:v}
      ${this._dialog.kind==="yaml"?c`
            <dmx-yaml-dialog
              .yamlText=${this._dialog.yamlText}
              .errorText=${this._dialog.errorText}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @import-patch=${this._onImportPatch}
            ></dmx-yaml-dialog>
          `:v}
      ${this._dialog.kind==="universe"?c`
            <dmx-universe-dialog
              .mode=${this._dialog.mode}
              .current=${this._dialog.current}
              .minUniverse=${z(e?.node_type??"artnet-direct")}
              .existing=${r}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></dmx-universe-dialog>
          `:v}
      ${this._toast?c`<div class="toast">${this._toast}</div>`:v}
    `}};x.styles=A`
    :host {
      /* Newer HA versions don't give custom panels a fixed height; use the viewport so
         the rail and editor scroll on their own instead of the whole page. */
      height: 100vh;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .loading,
    .empty {
      padding: 32px;
      color: var(--secondary-text-color);
    }
    .header {
      flex: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 12px;
      padding: 8px 16px;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, #fff);
    }
    .header h1 {
      white-space: nowrap;
      font-size: 1.25rem;
      font-weight: 400;
      margin: 0;
    }
    .dirty {
      font-size: 0.8rem;
      opacity: 0.85;
      font-style: italic;
    }
    .spacer {
      flex: 1;
    }
    button {
      font: inherit;
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: var(--secondary-background-color, #f0f0f0);
      color: var(--primary-text-color, #212121);
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.primary:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button.header-secondary {
      background: transparent;
      color: var(--app-header-text-color, #fff);
      border: 1px solid color-mix(in srgb, var(--app-header-text-color, #fff) 45%, transparent);
    }
    .layout {
      display: flex;
      flex: 1;
      min-height: 0;
    }
    .effects-layout {
      display: block;
      overflow-y: auto;
    }
    .mode-toggle {
      flex: none;
      display: inline-flex;
      margin-left: 12px;
      border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
      border-radius: 8px;
      overflow: hidden;
    }
    .mode-toggle button {
      border-radius: 0;
      padding: 4px 14px;
      background: none;
      color: inherit;
    }
    .mode-toggle button.active {
      background: color-mix(in srgb, currentColor 16%, transparent);
      font-weight: 600;
    }
    .layout.narrow {
      flex-direction: column;
    }
    .rail {
      width: 220px;
      flex-shrink: 0;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      padding: 12px 8px;
      box-sizing: border-box;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .narrow .rail {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-direction: row;
      flex-wrap: wrap;
    }
    .rail-section {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin: 8px 8px 4px;
    }
    .rail-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      background: none;
      border-radius: 8px;
      padding: 8px 10px;
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-title {
      font-weight: 500;
    }
    .rail-sub {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .rail-add {
      background: none;
      color: var(--primary-color);
      text-align: left;
      padding: 8px 10px;
    }
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
      box-sizing: border-box;
    }
    .node-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 16px;
      margin-bottom: 12px;
    }
    .view-toggle {
      display: inline-flex;
      margin-left: auto;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .view-toggle button {
      border-radius: 0;
      padding: 6px 14px;
      background: none;
    }
    .view-toggle button.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .node-bar h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 500;
    }
    .node-bar small {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .universe-bar {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .tab {
      border-radius: 16px;
      padding: 6px 14px;
    }
    .tab.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .tab.add {
      font-weight: 700;
    }
    .tab.remove {
      color: var(--error-color, #db4437);
      background: none;
    }
    .universe-options {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }
    .universe-options label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .universe-options select {
      font: inherit;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
    }
    .errors {
      margin-top: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
      border: 1px solid var(--error-color, #db4437);
      font-size: 0.9rem;
    }
    .errors ul {
      margin: 8px 0 0;
      padding-left: 20px;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-text-color);
      color: var(--primary-background-color);
      padding: 10px 20px;
      border-radius: 24px;
      font-size: 0.9rem;
      z-index: 20;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
  `,h([g({attribute:!1})],x.prototype,"hass",2),h([g({type:Boolean})],x.prototype,"narrow",2),h([f()],x.prototype,"_patch",2),h([f()],x.prototype,"_loaded",2),h([f()],x.prototype,"_dirty",2),h([f()],x.prototype,"_saving",2),h([f()],x.prototype,"_errors",2),h([f()],x.prototype,"_toast",2),h([f()],x.prototype,"_selected",2),h([f()],x.prototype,"_selectedUniverse",2),h([f()],x.prototype,"_dialog",2),h([f()],x.prototype,"_entityMap",2),h([f()],x.prototype,"_mode",2),h([f()],x.prototype,"_savedEffectNames",2),h([f()],x.prototype,"_view",2),x=h([C("dmx-patch-panel")],x);export{x as DmxPatchPanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
