var it=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var p=(o,t,e,i)=>{for(var s=i>1?void 0:i?st(t,e):t,n=o.length-1,r;n>=0;n--)(r=o[n])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&it(t,e,s),s};var Q=globalThis,G=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),we=new WeakMap,B=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=we.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&we.set(e,t))}return t}toString(){return this.cssText}},Ee=o=>new B(typeof o=="string"?o:o+"",void 0,le),A=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new B(e,o,le)},ke=(o,t)=>{if(G)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Q.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ce=G?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Ee(e)})(o):o;var{is:rt,defineProperty:nt,getOwnPropertyDescriptor:ot,getOwnPropertyNames:at,getOwnPropertySymbols:lt,getPrototypeOf:ct}=Object,ee=globalThis,Ae=ee.trustedTypes,dt=Ae?Ae.emptyScript:"",ht=ee.reactiveElementPolyfillSupport,W=(o,t)=>o,F={toAttribute(o,t){switch(t){case Boolean:o=o?dt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},te=(o,t)=>!rt(o,t),Se={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:te};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Se){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&nt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=ot(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let a=s?.call(this);n?.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Se}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let t=ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let e=this.properties,i=[...at(e),...lt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ce(s))}else t!==void 0&&e.push(ce(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ke(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:F;this._$Em=s;let a=r.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??te)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[W("elementProperties")]=new Map,S[W("finalized")]=new Map,ht?.({ReactiveElement:S}),(ee.reactiveElementVersions??=[]).push("2.1.2");var _e=globalThis,Ce=o=>o,ie=_e.trustedTypes,Ne=ie?ie.createPolicy("lit-html",{createHTML:o=>o}):void 0,Le="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+T,pt=`<${He}>`,M=document,K=()=>M.createComment(""),V=o=>o===null||typeof o!="object"&&typeof o!="function",ge=Array.isArray,ut=o=>ge(o)||typeof o?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,Pe=/>/g,U=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Re=/"/g,Oe=/^(?:script|style|textarea|title)$/i,be=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),c=be(1),St=be(2),Ct=be(3),L=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Me=new WeakMap,R=M.createTreeWalker(M,129);function Ie(o,t){if(!ge(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ne!==void 0?Ne.createHTML(t):t}var vt=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=q;for(let a=0;a<e;a++){let l=o[a],h,v,u=-1,g=0;for(;g<l.length&&(r.lastIndex=g,v=r.exec(l),v!==null);)g=r.lastIndex,r===q?v[1]==="!--"?r=Te:v[1]!==void 0?r=Pe:v[2]!==void 0?(Oe.test(v[2])&&(s=RegExp("</"+v[2],"g")),r=U):v[3]!==void 0&&(r=U):r===U?v[0]===">"?(r=s??q,u=-1):v[1]===void 0?u=-2:(u=r.lastIndex-v[2].length,h=v[1],r=v[3]===void 0?U:v[3]==='"'?Re:Ue):r===Re||r===Ue?r=U:r===Te||r===Pe?r=q:(r=U,s=void 0);let y=r===U&&o[a+1].startsWith("/>")?" ":"";n+=r===q?l+pt:u>=0?(i.push(h),l.slice(0,u)+Le+l.slice(u)+T+y):l+T+(u===-2?a:y)}return[Ie(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},D=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,a=t.length-1,l=this.parts,[h,v]=vt(t,e);if(this.el=o.createElement(h,i),R.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=R.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Le)){let g=v[r++],y=s.getAttribute(u).split(T),j=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:j[2],strings:y,ctor:j[1]==="."?pe:j[1]==="?"?ue:j[1]==="@"?ve:I}),s.removeAttribute(u)}else u.startsWith(T)&&(l.push({type:6,index:n}),s.removeAttribute(u));if(Oe.test(s.tagName)){let u=s.textContent.split(T),g=u.length-1;if(g>0){s.textContent=ie?ie.emptyScript:"";for(let y=0;y<g;y++)s.append(u[y],K()),R.nextNode(),l.push({type:2,index:++n});s.append(u[g],K())}}}else if(s.nodeType===8)if(s.data===He)l.push({type:2,index:n});else{let u=-1;for(;(u=s.data.indexOf(T,u+1))!==-1;)l.push({type:7,index:n}),u+=T.length-1}n++}}static createElement(t,e){let i=M.createElement("template");return i.innerHTML=t,i}};function O(o,t,e=o,i){if(t===L)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=V(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=O(o,s._$AS(o,t.values),s,i)),t}var he=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);R.currentNode=s;let n=R.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new X(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new me(n,this,t)),this._$AV.push(h),l=i[++a]}r!==l?.index&&(n=R.nextNode(),r++)}return R.currentNode=M,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},X=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),V(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(Ie(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new he(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Me.get(t.strings);return e===void 0&&Me.set(t.strings,e=new D(t)),e}k(t){ge(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(K()),this.O(K()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ce(t).nextSibling;Ce(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=O(this,t,e,0),r=!V(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{let a=t,l,h;for(t=n[0],l=0;l<n.length-1;l++)h=O(this,a[i+l],e,l),h===L&&(h=this._$AH[l]),r||=!V(h)||h!==this._$AH[l],h===d?t=d:t!==d&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}r&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},pe=class extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},ue=class extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},ve=class extends I{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??d)===L)return;let i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},me=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}};var mt=_e.litHtmlPolyfillSupport;mt?.(D,X),(_e.litHtmlVersions??=[]).push("3.3.3");var ze=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new X(t.insertBefore(K(),n),n,void 0,e??{})}return s._$AI(o),s};var fe=globalThis,f=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ze(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};f._$litElement$=!0,f.finalized=!0,fe.litElementHydrateSupport?.({LitElement:f});var _t=fe.litElementPolyfillSupport;_t?.({LitElement:f});(fe.litElementVersions??=[]).push("4.2.2");var C=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var gt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:te},bt=(o=gt,t,e)=>{let{kind:i,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),i==="accessor"){let{name:r}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,o,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,o,a),a}}}if(i==="setter"){let{name:r}=e;return function(a){let l=this[r];t.call(this,a),this.requestUpdate(r,l,o,!0,a)}}throw Error("Unsupported decorator location: "+i)};function _(o){return(t,e)=>typeof e=="object"?bt(o,t,e):((i,s,n)=>{let r=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),r?Object.getOwnPropertyDescriptor(s,n):void 0})(o,t,e)}function m(o){return _({...o,state:!0,attribute:!1})}var je=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],Be=["artnet-direct","sacn","kinet"],We=["8bit","16bit","24bit","32bit"],re=["linear","quadratic","cubic","quadruple"],Fe={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},ft={"8bit":1,"16bit":2,"24bit":3,"32bit":4},ne={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},oe={d:"Dimmer",r:"Red",R:"Red (unscaled)",g:"Green",G:"Green (unscaled)",b:"Blue",B:"Blue (unscaled)",w:"White (auto)",W:"White (auto, unscaled)",c:"Cool white",C:"Cool white (unscaled)",h:"Warm white",H:"Warm white (unscaled)",t:"Color temp (0 = warm)",T:"Color temp (0 = cold)",u:"Hue",U:"Saturation",x:"X (CIE)",y:"Y (CIE)"},qe=32;function Y(o){return typeof o=="number"}function z(o){return!!o.channel_setup&&o.channel_setup.length>0}function $e(o){if(o.type==="binary")return["d"];let t=z(o)?o.channel_setup:Fe[o.type];return t?Array.from(t):["d"]}function Ke(o,t){let e=$e(o)[t],i=o.channel_labels?.[t]||"";return e===void 0?{text:"",dummy:!1}:Y(e)?{text:i||"Fixed",dummy:!0,value:e}:{text:i||oe[e]||e,dummy:!1}}function $t(o){if(o.type==="binary")return 1;let t=z(o)?o.channel_setup:Fe[o.type];return t?t.length:1}function Z(o){return ft[o.channel_size??"8bit"]??1}function E(o){let t=$t(o),e=o.channel;return[e,e+t*Z(o)-1]}function P(o){return o==="sacn"?1:0}function Ve(o){return`${o.node_type}:${o.host}:${o.port??"default"}`}function J(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function De(o){return`hsl(${o*137.5%360}, 45%, 45%)`}var Xe=o=>o.callWS({type:"dmx_lighting/patch/get"});var Ye=(o,t)=>o.callWS({type:"dmx_lighting/patch/save",patch:t}),Ze=(o,t)=>o.callWS({type:"dmx_lighting/patch/export",patch:t}),Je=(o,t)=>o.callWS({type:"dmx_lighting/patch/import",content:t});var Qe=(o,t,e,i)=>o.connection.subscribeMessage(i,{type:"dmx_lighting/dmx/subscribe",node_key:t,universe:e});var H="#fixed";function Ge(o){return $e(o).map((t,e)=>({fn:Y(t)?H:t,value:Y(t)?t:0,label:o.channel_labels?.[e]??""}))}function ye(o,t){return o.fn===H?!Number.isInteger(o.value)||o.value<0||o.value>255?"Value must be 0\u2013255":"":ne[t]?.includes(o.fn)?"":`Not available for ${t}`}function yt(o){if(!o.length)return{channel_setup:null,channel_labels:null};let t=o.map(s=>s.fn===H?s.value:s.fn),e=o.map(s=>s.fn===H&&s.label.trim()?s.label.trim():null);for(;e.length&&e[e.length-1]===null;)e.pop();return{channel_setup:t.some(s=>Y(s))?t:t.join(""),channel_labels:e.length?e:null}}var ae=A`
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
`,x=class extends f{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._count=1;this._rows=null}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1,this._rows=z(this.device)?Ge(this.device):null)}_set(e,i){this._working={...this._working,[e]:i}}_setRows(e){this._rows=e,this._working={...this._working,...e?yt(e):{channel_setup:null,channel_labels:null}}}_setType(e){this._set("type",e),e==="binary"&&this._rows&&this._setRows(null)}_toggleCustom(e){if(!e){this._setRows(null);return}let i=Ge({...this._working,channel_setup:null,channel_labels:null});this._setRows(i)}_updateRow(e,i){let s=[...this._rows??[]];s[e]={...s[e],...i},this._setRows(s)}_addRow(e){let i=ne[this._working.type]??"",s=e||!i?{fn:H,value:0,label:""}:{fn:i[0],value:0,label:""};this._setRows([...this._rows??[],s])}_moveRow(e,i){let s=[...this._rows??[]],n=e+i;n<0||n>=s.length||([s[e],s[n]]=[s[n],s[e]],this._setRows(s))}_removeRow(e){let i=(this._rows??[]).filter((s,n)=>n!==e);this._setRows(i)}_renderChannels(){let e=this._working;if(e.type==="binary")return d;let i=this._rows,s=ne[e.type]??"";return c`
      <label class="check">
        <input
          type="checkbox"
          .checked=${!!i}
          @change=${n=>this._toggleCustom(n.target.checked)}
        />
        Custom channel layout
      </label>
      <div class="hint">
        ${i?"Light channels follow the entity; dummy channels always send their fixed value (use them for mode, strobe or macro channels).":`Uses the ${e.type} default. Turn on to reorder channels or add dummy channels such as Mode or Strobe.`}
      </div>
      ${i?c`
            <div class="channels">
              ${i.map((n,r)=>{let a=ye(n,e.type),l=n.fn===H;return c`
                  <div class="ch-row ${a?"invalid":""}" title=${a}>
                    <span class="ch-nr">${e.channel+r*Z(e)}</span>
                    <select
                      aria-label="Channel ${r+1} function"
                      @change=${h=>this._updateRow(r,{fn:h.target.value})}
                    >
                      ${[...s].map(h=>c`<option value=${h} ?selected=${n.fn===h}>
                            ${oe[h]??h}
                          </option>`)}
                      ${!l&&!s.includes(n.fn)?c`<option value=${n.fn} selected>${oe[n.fn]??n.fn}</option>`:d}
                      <option value=${H} ?selected=${l}>Dummy (fixed value)</option>
                    </select>
                    ${l?c`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${qe}
                            aria-label="Channel ${r+1} label"
                            .value=${n.label}
                            @input=${h=>this._updateRow(r,{label:h.target.value})}
                          />
                          <input
                            class="ch-value"
                            type="number"
                            min="0"
                            max="255"
                            step="1"
                            aria-label="Channel ${r+1} value"
                            .value=${String(n.value)}
                            @input=${h=>this._updateRow(r,{value:Number(h.target.value)})}
                          />
                        `:c`<span class="ch-fill">follows light</span>`}
                    <span class="ch-tools">
                      <button class="icon" title="Move up" ?disabled=${r===0}
                        @click=${()=>this._moveRow(r,-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${r===i.length-1}
                        @click=${()=>this._moveRow(r,1)}>↓</button>
                      <button class="icon" title="Remove channel" ?disabled=${i.length===1}
                        @click=${()=>this._removeRow(r)}>✕</button>
                    </span>
                    ${a?c`<span class="ch-problem">${a}</span>`:d}
                  </div>
                `})}
            </div>
            <div class="ch-add">
              ${s?c`<button @click=${()=>this._addRow(!1)}>+ Light channel</button>`:d}
              <button @click=${()=>this._addRow(!0)}>+ Dummy channel</button>
            </div>
          `:d}
    `}render(){let e=this._working,[i,s]=E(e),n=e.type==="color_temp"||e.type==="rgbww";return c`
      <div class="backdrop" @click=${this._backdropClick}>
        <div class="dialog" @click=${r=>r.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${e.name??""}
            @input=${r=>this._set("name",r.target.value)}
          />

          ${this.isNew?c`
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="512"
                  .value=${String(this._count)}
                  @input=${r=>this._count=Math.max(1,Number(r.target.value)||1)}
                />
                ${this._count>1?c`<div class="hint">
                      Adds ${this._count} fixtures back-to-back, named
                      ${e.name||"name"}_1 … ${e.name||"name"}_${this._count}
                    </div>`:d}
              `:d}

          <label>Friendly name (optional)</label>
          <input
            .value=${e.friendly_name??""}
            @input=${r=>this._set("friendly_name",r.target.value||void 0)}
          />

          <div class="row">
            <div>
              <label>Type</label>
              <select
                .value=${e.type}
                @change=${r=>this._setType(r.target.value)}
              >
                ${je.map(r=>c`<option value=${r} ?selected=${e.type===r}>${r}</option>`)}
              </select>
            </div>
            <div>
              <label>DMX channel (1-512)</label>
              <input
                type="number"
                min="1"
                max="512"
                .value=${String(e.channel)}
                @input=${r=>this._set("channel",Number(r.target.value))}
              />
            </div>
          </div>
          <div class="hint">Occupies channels ${i}–${s}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${e.channel_size??"8bit"}
                @change=${r=>this._set("channel_size",r.target.value)}
              >
                ${We.map(r=>c`<option value=${r} ?selected=${(e.channel_size??"8bit")===r}>${r}</option>`)}
              </select>
            </div>
            <div>
              <label>Byte order</label>
              <select
                .value=${e.byte_order??"big"}
                @change=${r=>this._set("byte_order",r.target.value)}
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
                .value=${String(e.transition??0)}
                @input=${r=>this._set("transition",Number(r.target.value))}
              />
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${r=>{let a=r.target.value;this._set("output_correction",a===""?null:a)}}
              >
                <option value="" ?selected=${!e.output_correction}>universe default</option>
                ${re.map(r=>c`<option value=${r} ?selected=${e.output_correction===r}>${r}</option>`)}
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
                      @input=${r=>this._set("min_temp",r.target.value)}
                    />
                  </div>
                  <div>
                    <label>Max temp</label>
                    <input
                      .value=${e.max_temp??"6500K"}
                      @input=${r=>this._set("max_temp",r.target.value)}
                    />
                  </div>
                </div>
              `:d}

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:d}

          <div class="actions">
            ${this.isNew?d:c`<button class="danger" @click=${this._delete}>Delete</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_backdropClick(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}let e=(this._rows??[]).findIndex(i=>ye(i,this._working.type));if(e>=0){this.errorText=`Channel ${e+1}: ${ye(this._rows[e],this._working.type)}`;return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};x.styles=[ae,A`
      .dialog {
        width: min(540px, calc(100vw - 32px));
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
    `],p([_({attribute:!1})],x.prototype,"device",2),p([_({type:Boolean})],x.prototype,"isNew",2),p([_()],x.prototype,"errorText",2),p([m()],x.prototype,"_working",2),p([m()],x.prototype,"_count",2),p([m()],x.prototype,"_rows",2),x=p([C("dmx-device-dialog")],x);var k=class extends f{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_set(e,i){this._working={...this._working,[e]:i}}_addUniverse(){let e=Number(this._newUniverse),i=P(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<i||e>1024){this.errorText=`Universe must be a whole number between ${i} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let i={...this._working.universes};delete i[e],this._working={...this._working,universes:i}}render(){let e=this._working;return c`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${i=>i.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${i=>this._set("node_type",i.target.value)}
          >
            ${Be.map(i=>c`<option value=${i} ?selected=${e.node_type===i}>${i}</option>`)}
          </select>

          <label>Host (IP of the Art-Net node)</label>
          <input
            .value=${e.host??""}
            @input=${i=>this._set("host",i.target.value)}
          />

          <div class="row">
            <div>
              <label>Port (blank = protocol default)</label>
              <input
                type="number"
                min="1"
                max="65535"
                .value=${e.port!=null?String(e.port):""}
                @input=${i=>{let s=i.target.value;this._set("port",s===""?null:Number(s))}}
              />
            </div>
            <div>
              <label>Max FPS (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                .value=${String(e.max_fps??25)}
                @input=${i=>this._set("max_fps",Number(i.target.value))}
              />
            </div>
          </div>

          <div class="row">
            <div>
              <label>Refresh every (s, 0 = off)</label>
              <input
                type="number"
                min="0"
                max="9999"
                .value=${String(e.refresh_every??120)}
                @input=${i=>this._set("refresh_every",Number(i.target.value))}
              />
            </div>
            <div>
              <label>Host override (optional)</label>
              <input
                .value=${e.host_override??""}
                @input=${i=>this._set("host_override",i.target.value||void 0)}
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
                  @input=${i=>this._set("priority",Number(i.target.value))}
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
                    @change=${i=>this._set("multicast",i.target.checked)}
                  />
                  Multicast (standard sACN)
                </label>
                <div class="hint">
                  Sends each universe to its 239.255.x.x multicast group, which is what
                  most receivers and sACN viewer apps listen to. When enabled, Host is
                  only a display name and Port is ignored. Unchecked = unicast directly
                  to the host.
                </div>
              `:d}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(e.universes).sort((i,s)=>Number(i)-Number(s)).map(i=>{let s=e.universes[i]?.devices?.length??0,n=Number(i)<P(e.node_type);return c`
                  <span class="chip ${n?"invalid":""}"
                    title=${n?`Universe ${i} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:s?`${s} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${i}`}
                  >
                    ${i}${s?c` <small>(${s})</small>`:d}
                    ${s?d:c`<button class="chip-x" @click=${()=>this._removeUniverse(i)}>
                          ×
                        </button>`}
                  </span>
                `})}
          </div>
          <div class="row">
            <input
              type="number"
              min=${P(e.node_type)}
              max="1024"
              placeholder="Universe number (${P(e.node_type)}-1024)"
              .value=${this._newUniverse}
              @input=${i=>this._newUniverse=i.target.value}
              @keydown=${i=>i.key==="Enter"&&this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:d}

          <div class="actions">
            ${this.isNew?d:c`<button class="danger" @click=${this._delete}>Delete node</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let i=P(this._working.node_type),s=Object.keys(this._working.universes).filter(n=>Number(n)<i);if(s.length){this.errorText=`Universe ${s.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${i}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};k.styles=ae,p([_({attribute:!1})],k.prototype,"node",2),p([_({type:Boolean})],k.prototype,"isNew",2),p([_()],k.prototype,"errorText",2),p([m()],k.prototype,"_working",2),p([m()],k.prototype,"_newUniverse",2),k=p([C("dmx-node-dialog")],k);var w=class extends f{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return c`
      <div class="backdrop" @click=${this._cancel}>
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

          ${this._error?c`<div class="error">${this._error}</div>`:d}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode==="add"?"Add":"Renumber"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let i=String(e);if(i!==this.current&&this.existing.includes(i)){this._error=`Universe ${i} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:i},bubbles:!0,composed:!0}))}};w.styles=ae,p([_()],w.prototype,"mode",2),p([_({type:Number})],w.prototype,"minUniverse",2),p([_()],w.prototype,"current",2),p([_({attribute:!1})],w.prototype,"existing",2),p([m()],w.prototype,"_value",2),p([m()],w.prototype,"_error",2),w=p([C("dmx-universe-dialog")],w);var N=class extends f{constructor(){super(...arguments);this.yamlText="";this.errorText="";this._text="";this._copied=!1}willUpdate(e){e.has("yamlText")&&(this._text=this.yamlText)}render(){return c`
      <div class="backdrop" @click=${this._cancel}>
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

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:d}

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
    `}async _copy(){try{await navigator.clipboard.writeText(this._text),this._copied=!0,setTimeout(()=>this._copied=!1,1500)}catch{this.errorText="Clipboard unavailable \u2014 select the text and copy manually"}}_download(){let e=new Blob([this._text],{type:"application/yaml"}),i=URL.createObjectURL(e),s=document.createElement("a");s.href=i,s.download="dmx_patch.yaml",s.click(),URL.revokeObjectURL(i)}_pickFile(){let e=document.createElement("input");e.type="file",e.accept=".yaml,.yml,.json,.txt",e.onchange=async()=>{let i=e.files?.[0];i&&(this._text=await i.text(),this.errorText="")},e.click()}_import(){this.dispatchEvent(new CustomEvent("import-patch",{detail:{content:this._text},bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}};N.styles=[ae,A`
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
    `],p([_()],N.prototype,"yamlText",2),p([_()],N.prototype,"errorText",2),p([m()],N.prototype,"_text",2),p([m()],N.prototype,"_copied",2),N=p([C("dmx-yaml-dialog")],N);function et(o){return{id:J(),channel:o,name:"",type:"dimmer",transition:0,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null,channel_labels:null}}function tt(){return{id:J(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var $=class extends f{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await Qe(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((i,s)=>{let[n,r]=E(i);for(let a=n;a<=Math.min(r,512);a++){let l=e.get(a);e.set(a,{device:i,index:s,first:a===n,overlap:!!l})}}),e}render(){let e=this._channelMap(),i=[];for(let s=1;s<=512;s++){let n=e.get(s),r=this._values[s-1],a=this._live&&r!==void 0?r/255:0,l=this._dropTarget,h=n?Ke(n.device,Math.floor((s-n.device.channel)/Z(n.device))):void 0,v=!!h&&z(n.device),u=l&&s>=l.first&&s<=l.last;i.push(c`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}
            ${h?.dummy?"dummy":""}
            ${u?l.valid?"drop-ok":"drop-bad":""}"
          style=${n?`--device-color: ${De(n.index)}`:d}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${s}: ${h.text}${h.dummy?` (fixed ${h.value})`:""} \u2014 drag to move`:`Channel ${s}`}
          draggable=${n?"true":"false"}
          @click=${()=>this._cellClick(s,n?.device)}
          @dragstart=${n?g=>this._dragStart(g,s,n.device):d}
          @dragover=${g=>this._dragOver(g,s)}
          @drop=${g=>this._drop(g)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?c`<span class="heat" style="opacity: ${a}"></span>`:d}
          <span class="top">
            <span class="ch">${s}</span>
            ${h?.dummy&&!this._live?c`<span class="fixed">${h.value}</span>`:d}
          </span>
          ${n?.first?c`<span class="name">${n.device.name}</span>`:d}
          ${v&&(h.dummy||!n.first)?c`<span class="role">${h.text}</span>`:d}
          ${this._live&&r!==void 0?c`<span class="val">${r}</span>`:d}
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
      <div class="grid">${i}</div>
    `}_dragStart(e,i,s){let[n]=E(s);this._dragInfo={device:s,offset:i-n},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",s.id)}_dragOver(e,i){let s=this._dragInfo;if(!s)return;let[n,r]=E(s.device),a=r-n+1,l=i-s.offset,h=l+a-1,v=l>=1&&h<=512&&!this._collides(s.device.id,l,h);(this._dropTarget?.first!==l||this._dropTarget?.last!==h||this._dropTarget?.valid!==v)&&(this._dropTarget={first:l,last:h,valid:v}),v&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,i,s){return(this.universe?.devices??[]).some(n=>{if(n.id===e)return!1;let[r,a]=E(n);return i<=a&&s>=r})}_drop(e){e.preventDefault();let i=this._dragInfo,s=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!i||!s?.valid)&&E(i.device)[0]!==s.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:i.device.id,channel:s.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,i){i?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:i},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0}))}};$.styles=A`
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
  `,p([_({attribute:!1})],$.prototype,"hass",2),p([_({attribute:!1})],$.prototype,"universe",2),p([_()],$.prototype,"nodeKey",2),p([_({type:Number})],$.prototype,"universeNr",2),p([m()],$.prototype,"_live",2),p([m()],$.prototype,"_values",2),p([m()],$.prototype,"_dropTarget",2),$=p([C("dmx-universe-grid")],$);var b=class extends f{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await Xe(this.hass);this._patch=e.patch??{nodes:[]},this._errors=e.errors??[],this._loaded=!0,this._autoSelect()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}_autoSelect(){this._selected||this._patch.nodes.length&&this._selectNode("ui:0")}_selectNode(e){this._selected=e;let i=this._currentUniverses(),s=Object.keys(i??{}).sort((n,r)=>Number(n)-Number(r));this._selectedUniverse=s[0]??""}_currentNode(){let[e,i]=this._selected.split(":"),s=Number(i);if(e==="ui")return this._patch.nodes[s]}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[i,s]=this._selected.split(":");if(i!=="ui")return;let n=Number(s),r=[...this._patch.nodes];r[n]=e(r[n]),this._patch={...this._patch,nodes:r},this._dirty=!0}_updateUniverse(e,i){this._updateSelectedNode(s=>{let n=s.universes[e];return n?{...s,universes:{...s.universes,[e]:i(n)}}:s})}async _save(){this._saving=!0,this._errors=[];try{let e=await Ye(this.hass,this._patch);e.success?(this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}async _openYamlDialog(){try{let e=await Ze(this.hass,this._patch);this._dialog={kind:"yaml",yamlText:e.yaml,errorText:""}}catch(e){this._showToast(`Export failed: ${e}`)}}async _onImportPatch(e){if(this._dialog.kind!=="yaml")return;let{content:i}=e.detail;try{let s=await Je(this.hass,i);this._patch=s.patch,this._dirty=!0,this._errors=s.errors,this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._showToast(s.valid?"Loaded into editor \u2014 review and Save & Apply":"Loaded with validation errors \u2014 fix them before saving")}catch(s){let n=s?.message??String(s);this._dialog={kind:"yaml",yamlText:i,errorText:n}}}_addNode(){this._dialog={kind:"node",node:tt(),isNew:!0}}_editNode(){let e=this._currentNode();e&&(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:i,original:s}=e.detail,n=this._patch.nodes,r=n.findIndex(a=>a.id===s.id);r>=0?n[r]=i:(n.push(i),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:i}=e.detail;this._patch.nodes=this._patch.nodes.filter(s=>s.id!==i.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._dialog={kind:"universe",mode:"add",current:""}}_renumberUniverse(){this._selectedUniverse&&(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:i}=e.detail;if(this._dialog.kind!=="universe")return;let s=this._dialog.mode,n=this._dialog.current;this._updateSelectedNode(r=>{let a={...r.universes};return s==="add"?a[i]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[i]=a[n],delete a[n]),{...r,universes:a}}),this._selectedUniverse=i,this._dialog={kind:"none"}}_removeUniverse(){let e=this._currentNode();if(!e||!this._selectedUniverse)return;let i=e.universes[this._selectedUniverse]?.devices??[];if(i.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${i.length} fixture(s)?`))return;let s={...e.universes};delete s[this._selectedUniverse],this._updateSelectedNode(r=>({...r,universes:s}));let n=Object.keys(s).sort((r,a)=>Number(r)-Number(a));this._selectedUniverse=n[0]??""}_setUniverseOption(e,i){this._updateUniverse(this._selectedUniverse,s=>({...s,[e]:i}))}_onAddDevice(e){this._dialog={kind:"device",device:et(e.detail.channel),isNew:!0,universeNr:this._selectedUniverse}}_onEditDevice(e){this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:this._selectedUniverse}}_onSaveDevice(e){let{device:i,original:s,count:n}=e.detail;if(this._dialog.kind!=="device")return;let r=this._dialog.universeNr,a=0;this._updateUniverse(r,l=>{let h=[...l.devices],v=h.findIndex(u=>u.id===s.id);if(v>=0)h[v]=i;else if(n>1){let u=i.channel;for(let g=1;g<=n;g++){let y={...i,id:J(),name:`${i.name}_${g}`,channel:u},[j,xe]=E(y);if(xe>512){a=n-g+1;break}h.push(y),u=xe+1}}else h.push(i);return{...l,devices:h}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:i}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,s=>({...s,devices:s.devices.filter(n=>n.id!==i.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:i,channel:s}=e.detail;this._updateUniverse(this._selectedUniverse,n=>({...n,devices:n.devices.map(r=>r.id===i?{...r,channel:s}:r)}))}render(){if(!this._loaded)return c`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),i=this._currentUniverses()??{},s=Object.keys(i).sort((r,a)=>Number(r)-Number(a)),n=i[this._selectedUniverse];return c`
      <div class="header">
        <h1>DMX Patch</h1>
        ${this._dirty?c`<span class="dirty">unsaved changes</span>`:d}
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

      <div class="layout ${this.narrow?"narrow":""}">
        <nav class="rail">
          <div class="rail-section">Patch nodes</div>
          ${this._patch.nodes.map((r,a)=>c`
              <button
                class="rail-item ${this._selected===`ui:${a}`?"active":""}"
                @click=${()=>this._selectNode(`ui:${a}`)}
              >
                <span class="rail-title">${r.host||"(new node)"}</span>
                <span class="rail-sub">${r.node_type}</span>
              </button>
            `)}
          <button class="rail-add" @click=${this._addNode}>+ Add node</button>
        </nav>

        <main class="main">
          ${e?c`
                <div class="node-bar">
                  <h2>${e.host} <small>(${e.node_type})</small></h2>
                  <button @click=${this._editNode}>Node settings</button>
                </div>

                <div class="universe-bar">
                  ${s.map(r=>c`
                      <button
                        class="tab ${this._selectedUniverse===r?"active":""}"
                        @click=${()=>this._selectedUniverse=r}
                      >
                        Universe ${r}
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
                      `:d}
                </div>

                ${n?c`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            @change=${r=>this._setUniverseOption("output_correction",r.target.value)}
                          >
                            ${re.map(r=>c`<option
                                  value=${r}
                                  ?selected=${(n.output_correction??"linear")===r}
                                >
                                  ${r}
                                </option>`)}
                          </select>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            .checked=${n.send_partial_universe??!0}
                            @change=${r=>this._setUniverseOption("send_partial_universe",r.target.checked)}
                          />
                          Send partial universe
                        </label>
                      </div>

                      <dmx-universe-grid
                        .hass=${this.hass}
                        .universe=${n}
                        .universeNr=${Number(this._selectedUniverse)}
                        .nodeKey=${Ve(e)}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @move-device=${this._onMoveDevice}
                        @grid-error=${r=>this._showToast(r.detail)}
                      ></dmx-universe-grid>
                    `:c`<div class="empty">No universes. Add one to start placing fixtures.</div>`}
              `:c`<div class="empty">
                No nodes yet. Add a node to start patching, or load a patch with the YAML button.
              </div>`}

          ${this._errors.length?c`
                <div class="errors">
                  <strong>Validation errors</strong>
                  <ul>
                    ${this._errors.map(r=>c`<li><code>${r.path}</code>: ${r.message}</li>`)}
                  </ul>
                </div>
              `:d}
        </main>
      </div>

      ${this._dialog.kind==="device"?c`
            <dmx-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></dmx-device-dialog>
          `:d}
      ${this._dialog.kind==="node"?c`
            <dmx-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></dmx-node-dialog>
          `:d}
      ${this._dialog.kind==="yaml"?c`
            <dmx-yaml-dialog
              .yamlText=${this._dialog.yamlText}
              .errorText=${this._dialog.errorText}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @import-patch=${this._onImportPatch}
            ></dmx-yaml-dialog>
          `:d}
      ${this._dialog.kind==="universe"?c`
            <dmx-universe-dialog
              .mode=${this._dialog.mode}
              .current=${this._dialog.current}
              .minUniverse=${P(e?.node_type??"artnet-direct")}
              .existing=${s}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></dmx-universe-dialog>
          `:d}
      ${this._toast?c`<div class="toast">${this._toast}</div>`:d}
    `}};b.styles=A`
    :host {
      display: block;
      height: 100%;
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
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, #fff);
    }
    .header h1 {
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
      height: calc(100% - 56px);
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
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
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
  `,p([_({attribute:!1})],b.prototype,"hass",2),p([_({type:Boolean})],b.prototype,"narrow",2),p([m()],b.prototype,"_patch",2),p([m()],b.prototype,"_loaded",2),p([m()],b.prototype,"_dirty",2),p([m()],b.prototype,"_saving",2),p([m()],b.prototype,"_errors",2),p([m()],b.prototype,"_toast",2),p([m()],b.prototype,"_selected",2),p([m()],b.prototype,"_selectedUniverse",2),p([m()],b.prototype,"_dialog",2),b=p([C("dmx-patch-panel")],b);export{b as DmxPatchPanel};
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
