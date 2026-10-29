var at=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var p=(o,i,e,t)=>{for(var r=t>1?void 0:t?lt(i,e):i,n=o.length-1,s;n>=0;n--)(s=o[n])&&(r=(t?s(i,e,r):s(r))||r);return t&&r&&at(i,e,r),r};var ee=globalThis,te=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),Ce=new WeakMap,q=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(te&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Ce.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Ce.set(e,i))}return i}toString(){return this.cssText}},Ne=o=>new q(typeof o=="string"?o:o+"",void 0,he),E=(o,...i)=>{let e=o.length===1?o[0]:i.reduce((t,r,n)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[n+1],o[0]);return new q(e,o,he)},Te=(o,i)=>{if(te)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=ee.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,o.appendChild(t)}},ue=te?o=>o:o=>o instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Ne(e)})(o):o;var{is:ct,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ht,getOwnPropertySymbols:ut,getPrototypeOf:vt}=Object,ie=globalThis,Ue=ie.trustedTypes,mt=Ue?Ue.emptyScript:"",bt=ie.reactiveElementPolyfillSupport,K=(o,i)=>o,V={toAttribute(o,i){switch(i){case Boolean:o=o?mt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,i){let e=o;switch(i){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},re=(o,i)=>!ct(o,i),Re={attribute:!0,type:String,converter:V,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),ie.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Re){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&dt(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:n}=pt(this.prototype,i)??{get(){return this[e]},set(s){this[e]=s}};return{get:r,set(s){let a=r?.call(this);n?.call(this,s),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Re}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let i=vt(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let e=this.properties,t=[...ht(e),...ut(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(ue(r))}else i!==void 0&&e.push(ue(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:V).toAttribute(e,t.type);this._$Em=i,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(i,e){let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let n=t.getPropertyOptions(r),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:V;this._$Em=r;let a=s.fromAttribute(e,n.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(i,e,t,r=!1,n){if(i!==void 0){let s=this.constructor;if(r===!1&&(n=this[i]),t??=s.getPropertyOptions(i),!((t.hasChanged??re)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(s._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:n},s){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,s??e??this[i]),n!==!0||s!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,n]of t){let{wrapped:s}=n,a=this[r];s!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[K("elementProperties")]=new Map,N[K("finalized")]=new Map,bt?.({ReactiveElement:N}),(ie.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,Pe=o=>o,se=ye.trustedTypes,Me=se?se.createPolicy("lit-html",{createHTML:o=>o}):void 0,je="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,Be="?"+U,gt=`<${Be}>`,O=document,X=()=>O.createComment(""),Y=o=>o===null||typeof o!="object"&&typeof o!="function",$e=Array.isArray,ft=o=>$e(o)||typeof o?.[Symbol.iterator]=="function",ve=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,He=/-->/g,Le=/>/g,L=RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Oe=/"/g,We=/^(?:script|style|textarea|title)$/i,xe=o=>(i,...e)=>({_$litType$:o,strings:i,values:e}),l=xe(1),Ut=xe(2),Rt=xe(3),z=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ze=new WeakMap,I=O.createTreeWalker(O,129);function qe(o,i){if(!$e(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(i):i}var _t=(o,i)=>{let e=o.length-1,t=[],r,n=i===2?"<svg>":i===3?"<math>":"",s=F;for(let a=0;a<e;a++){let c=o[a],d,u,v=-1,g=0;for(;g<c.length&&(s.lastIndex=g,u=s.exec(c),u!==null);)g=s.lastIndex,s===F?u[1]==="!--"?s=He:u[1]!==void 0?s=Le:u[2]!==void 0?(We.test(u[2])&&(r=RegExp("</"+u[2],"g")),s=L):u[3]!==void 0&&(s=L):s===L?u[0]===">"?(s=r??F,v=-1):u[1]===void 0?v=-2:(v=s.lastIndex-u[2].length,d=u[1],s=u[3]===void 0?L:u[3]==='"'?Oe:Ie):s===Oe||s===Ie?s=L:s===He||s===Le?s=F:(s=L,r=void 0);let y=s===L&&o[a+1].startsWith("/>")?" ":"";n+=s===F?c+gt:v>=0?(t.push(d),c.slice(0,v)+je+c.slice(v)+U+y):c+U+(v===-2?a:y)}return[qe(o,n+(o[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Z=class o{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let n=0,s=0,a=i.length-1,c=this.parts,[d,u]=_t(i,e);if(this.el=o.createElement(d,t),I.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(r=I.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let v of r.getAttributeNames())if(v.endsWith(je)){let g=u[s++],y=r.getAttribute(v).split(U),M=/([.?@])?(.*)/.exec(g);c.push({type:1,index:n,name:M[2],strings:y,ctor:M[1]==="."?be:M[1]==="?"?ge:M[1]==="@"?fe:W}),r.removeAttribute(v)}else v.startsWith(U)&&(c.push({type:6,index:n}),r.removeAttribute(v));if(We.test(r.tagName)){let v=r.textContent.split(U),g=v.length-1;if(g>0){r.textContent=se?se.emptyScript:"";for(let y=0;y<g;y++)r.append(v[y],X()),I.nextNode(),c.push({type:2,index:++n});r.append(v[g],X())}}}else if(r.nodeType===8)if(r.data===Be)c.push({type:2,index:n});else{let v=-1;for(;(v=r.data.indexOf(U,v+1))!==-1;)c.push({type:7,index:n}),v+=U.length-1}n++}}static createElement(i,e){let t=O.createElement("template");return t.innerHTML=i,t}};function B(o,i,e=o,t){if(i===z)return i;let r=t!==void 0?e._$Co?.[t]:e._$Cl,n=Y(i)?void 0:i._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(o),r._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(i=B(o,r._$AS(o,i.values),r,t)),i}var me=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=(i?.creationScope??O).importNode(e,!0);I.currentNode=r;let n=I.nextNode(),s=0,a=0,c=t[0];for(;c!==void 0;){if(s===c.index){let d;c.type===2?d=new J(n,n.nextSibling,this,i):c.type===1?d=new c.ctor(n,c.name,c.strings,this,i):c.type===6&&(d=new _e(n,this,i)),this._$AV.push(d),c=t[++a]}s!==c?.index&&(n=I.nextNode(),s++)}return I.currentNode=O,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},J=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=B(this,i,e),Y(i)?i===h||i==null||i===""?(this._$AH!==h&&this._$AR(),this._$AH=h):i!==this._$AH&&i!==z&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):ft(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==h&&Y(this._$AH)?this._$AA.nextSibling.data=i:this.T(O.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Z.createElement(qe(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new me(r,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(i){let e=ze.get(i.strings);return e===void 0&&ze.set(i.strings,e=new Z(i)),e}k(i){$e(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of i)r===e.length?e.push(t=new o(this.O(X()),this.O(X()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Pe(i).nextSibling;Pe(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=h}_$AI(i,e=this,t,r){let n=this.strings,s=!1;if(n===void 0)i=B(this,i,e,0),s=!Y(i)||i!==this._$AH&&i!==z,s&&(this._$AH=i);else{let a=i,c,d;for(i=n[0],c=0;c<n.length-1;c++)d=B(this,a[t+c],e,c),d===z&&(d=this._$AH[c]),s||=!Y(d)||d!==this._$AH[c],d===h?i=h:i!==h&&(i+=(d??"")+n[c+1]),this._$AH[c]=d}s&&!r&&this.j(i)}j(i){i===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},be=class extends W{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===h?void 0:i}},ge=class extends W{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==h)}},fe=class extends W{constructor(i,e,t,r,n){super(i,e,t,r,n),this.type=5}_$AI(i,e=this){if((i=B(this,i,e,0)??h)===z)return;let t=this._$AH,r=i===h&&t!==h||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==h&&(t===h||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},_e=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){B(this,i)}};var yt=ye.litHtmlPolyfillSupport;yt?.(Z,J),(ye.litHtmlVersions??=[]).push("3.3.3");var Ke=(o,i,e)=>{let t=e?.renderBefore??i,r=t._$litPart$;if(r===void 0){let n=e?.renderBefore??null;t._$litPart$=r=new J(i.insertBefore(X(),n),n,void 0,e??{})}return r._$AI(o),r};var we=globalThis,_=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};_._$litElement$=!0,_.finalized=!0,we.litElementHydrateSupport?.({LitElement:_});var $t=we.litElementPolyfillSupport;$t?.({LitElement:_});(we.litElementVersions??=[]).push("4.2.2");var k=o=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,i)}):customElements.define(o,i)};var xt={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:re},wt=(o=xt,i,e)=>{let{kind:t,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),t==="accessor"){let{name:s}=e;return{set(a){let c=i.get.call(this);i.set.call(this,a),this.requestUpdate(s,c,o,!0,a)},init(a){return a!==void 0&&this.C(s,void 0,o,a),a}}}if(t==="setter"){let{name:s}=e;return function(a){let c=this[s];i.call(this,a),this.requestUpdate(s,c,o,!0,a)}}throw Error("Unsupported decorator location: "+t)};function m(o){return(i,e)=>typeof e=="object"?wt(o,i,e):((t,r,n)=>{let s=r.hasOwnProperty(n);return r.constructor.createProperty(n,t),s?Object.getOwnPropertyDescriptor(r,n):void 0})(o,i,e)}function b(o){return m({...o,state:!0,attribute:!1})}var Ve=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],Fe=["artnet-direct","sacn","kinet"],Xe=["8bit","16bit","24bit","32bit"],oe=["linear","quadratic","cubic","quadruple"],Ye={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},Et={"8bit":1,"16bit":2,"24bit":3,"32bit":4},ae={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},le={d:"Dimmer",r:"Red",R:"Red (unscaled)",g:"Green",G:"Green (unscaled)",b:"Blue",B:"Blue (unscaled)",w:"White",W:"White (unscaled)",c:"Cool white",C:"Cool white (unscaled)",h:"Warm white",H:"Warm white (unscaled)",t:"Color temp (0 = warm)",T:"Color temp (0 = cold)",u:"Hue",U:"Saturation",x:"X (CIE)",y:"Y (CIE)"},Ze=32;function Q(o){return typeof o=="number"}function R(o){return!!o.channel_setup&&o.channel_setup.length>0}function Ee(o){if(o.type==="binary")return["d"];let i=R(o)?o.channel_setup:Ye[o.type];return i?Array.from(i):["d"]}function ce(o,i){let e=Ee(o)[i],t=o.channel_labels?.[i]||"";return e===void 0?{text:"",dummy:!1}:Q(e)?{text:t||"Fixed",dummy:!0,value:e}:{text:t||le[e]||e,dummy:!1}}function ke(o){if(o.type==="binary")return 1;let i=R(o)?o.channel_setup:Ye[o.type];return i?i.length:1}function G(o){return Et[o.channel_size??"8bit"]??1}function $(o){let i=ke(o),e=o.channel;return[e,e+i*G(o)-1]}function P(o){return o==="sacn"?1:0}function Je(o){return`${o.node_type}:${o.host}:${o.port??"default"}`}function D(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function de(o){return`hsl(${o*137.5%360}, 45%, 45%)`}function Ae(o){return o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}var Qe=o=>o.callWS({type:"dmx_lighting/patch/get"});var Ge=(o,i)=>o.callWS({type:"dmx_lighting/patch/save",patch:i}),De=(o,i)=>o.callWS({type:"dmx_lighting/patch/export",patch:i}),et=(o,i)=>o.callWS({type:"dmx_lighting/patch/import",content:i});var tt=(o,i,e,t)=>o.connection.subscribeMessage(t,{type:"dmx_lighting/dmx/subscribe",node_key:i,universe:e});var j="#fixed";function it(o){return Ee(o).map((i,e)=>({fn:Q(i)?j:i,value:Q(i)?i:0,label:o.channel_labels?.[e]??""}))}function Se(o,i){return o.fn===j?!Number.isInteger(o.value)||o.value<0||o.value>255?"Value must be 0\u2013255":"":ae[i]?.includes(o.fn)?"":`Not available for ${i}`}function kt(o){if(!o.length)return{channel_setup:null,channel_labels:null};let i=o.map(r=>r.fn===j?r.value:r.fn),e=o.map(r=>r.fn===j&&r.label.trim()?r.label.trim():null);for(;e.length&&e[e.length-1]===null;)e.pop();return{channel_setup:i.some(r=>Q(r))?i:i.join(""),channel_labels:e.length?e:null}}var pe=E`
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
`,A=class extends _{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._count=1;this._rows=null}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1,this._rows=R(this.device)?it(this.device):null)}_set(e,t){this._working={...this._working,[e]:t}}_setRows(e){this._rows=e,this._working={...this._working,...e?kt(e):{channel_setup:null,channel_labels:null}}}_setType(e){this._set("type",e),e==="binary"&&this._rows&&this._setRows(null)}_toggleCustom(e){if(!e){this._setRows(null);return}let t=it({...this._working,channel_setup:null,channel_labels:null});this._setRows(t)}_updateRow(e,t){let r=[...this._rows??[]];r[e]={...r[e],...t},this._setRows(r)}_addRow(e){let t=ae[this._working.type]??"",r=e||!t?{fn:j,value:0,label:""}:{fn:t[0],value:0,label:""};this._setRows([...this._rows??[],r])}_moveRow(e,t){let r=[...this._rows??[]],n=e+t;n<0||n>=r.length||([r[e],r[n]]=[r[n],r[e]],this._setRows(r))}_removeRow(e){let t=(this._rows??[]).filter((r,n)=>n!==e);this._setRows(t)}_renderChannels(){let e=this._working;if(e.type==="binary")return h;let t=this._rows,r=ae[e.type]??"";return l`
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
      ${t?l`
            <div class="channels">
              ${t.map((n,s)=>{let a=Se(n,e.type),c=n.fn===j;return l`
                  <div class="ch-row ${a?"invalid":""}" title=${a}>
                    <span class="ch-nr">${e.channel+s*G(e)}</span>
                    <select
                      aria-label="Channel ${s+1} function"
                      @change=${d=>this._updateRow(s,{fn:d.target.value})}
                    >
                      ${[...r].map(d=>l`<option value=${d} ?selected=${n.fn===d}>
                            ${le[d]??d}
                          </option>`)}
                      ${!c&&!r.includes(n.fn)?l`<option value=${n.fn} selected>${le[n.fn]??n.fn}</option>`:h}
                      <option value=${j} ?selected=${c}>Dummy (fixed value)</option>
                    </select>
                    ${c?l`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${Ze}
                            aria-label="Channel ${s+1} label"
                            .value=${n.label}
                            @input=${d=>this._updateRow(s,{label:d.target.value})}
                          />
                          <input
                            class="ch-value"
                            type="number"
                            min="0"
                            max="255"
                            step="1"
                            aria-label="Channel ${s+1} value"
                            .value=${String(n.value)}
                            @input=${d=>this._updateRow(s,{value:Number(d.target.value)})}
                          />
                        `:l`<span class="ch-fill">follows light</span>`}
                    <span class="ch-tools">
                      <button class="icon" title="Move up" ?disabled=${s===0}
                        @click=${()=>this._moveRow(s,-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${s===t.length-1}
                        @click=${()=>this._moveRow(s,1)}>↓</button>
                      <button class="icon" title="Remove channel" ?disabled=${t.length===1}
                        @click=${()=>this._removeRow(s)}>✕</button>
                    </span>
                    ${a?l`<span class="ch-problem">${a}</span>`:h}
                  </div>
                `})}
            </div>
            <div class="ch-add">
              ${r?l`<button @click=${()=>this._addRow(!1)}>+ Light channel</button>`:h}
              <button @click=${()=>this._addRow(!0)}>+ Dummy channel</button>
            </div>
          `:h}
    `}render(){let e=this._working,[t,r]=$(e),n=e.type==="color_temp"||e.type==="rgbww";return l`
      <div class="backdrop" @click=${this._backdropClick}>
        <div class="dialog" @click=${s=>s.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${e.name??""}
            @input=${s=>this._set("name",s.target.value)}
          />

          ${this.isNew?l`
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="512"
                  .value=${String(this._count)}
                  @input=${s=>this._count=Math.max(1,Number(s.target.value)||1)}
                />
                ${this._count>1?l`<div class="hint">
                      Adds ${this._count} fixtures back-to-back, named
                      ${e.name||"name"}_1 … ${e.name||"name"}_${this._count}
                    </div>`:h}
              `:h}

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
                ${Ve.map(s=>l`<option value=${s} ?selected=${e.type===s}>${s}</option>`)}
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
                ${Xe.map(s=>l`<option value=${s} ?selected=${(e.channel_size??"8bit")===s}>${s}</option>`)}
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
                .value=${String(e.transition??0)}
                @input=${s=>this._set("transition",Number(s.target.value))}
              />
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${s=>{let a=s.target.value;this._set("output_correction",a===""?null:a)}}
              >
                <option value="" ?selected=${!e.output_correction}>universe default</option>
                ${oe.map(s=>l`<option value=${s} ?selected=${e.output_correction===s}>${s}</option>`)}
              </select>
            </div>
          </div>

          ${this._renderChannels()}

          ${n?l`
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
              `:h}

          ${this.errorText?l`<div class="error">${this.errorText}</div>`:h}

          <div class="actions">
            ${this.isNew?h:l`<button class="danger" @click=${this._delete}>Delete</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_backdropClick(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}let e=(this._rows??[]).findIndex(t=>Se(t,this._working.type));if(e>=0){this.errorText=`Channel ${e+1}: ${Se(this._rows[e],this._working.type)}`;return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};A.styles=[pe,E`
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
    `],p([m({attribute:!1})],A.prototype,"device",2),p([m({type:Boolean})],A.prototype,"isNew",2),p([m()],A.prototype,"errorText",2),p([b()],A.prototype,"_working",2),p([b()],A.prototype,"_count",2),p([b()],A.prototype,"_rows",2),A=p([k("dmx-device-dialog")],A);var C=class extends _{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_set(e,t){this._working={...this._working,[e]:t}}_addUniverse(){let e=Number(this._newUniverse),t=P(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<t||e>1024){this.errorText=`Universe must be a whole number between ${t} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let t={...this._working.universes};delete t[e],this._working={...this._working,universes:t}}render(){let e=this._working;return l`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${t=>this._set("node_type",t.target.value)}
          >
            ${Fe.map(t=>l`<option value=${t} ?selected=${e.node_type===t}>${t}</option>`)}
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

          ${e.node_type==="sacn"?l`
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
              `:h}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(e.universes).sort((t,r)=>Number(t)-Number(r)).map(t=>{let r=e.universes[t]?.devices?.length??0,n=Number(t)<P(e.node_type);return l`
                  <span class="chip ${n?"invalid":""}"
                    title=${n?`Universe ${t} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:r?`${r} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${t}`}
                  >
                    ${t}${r?l` <small>(${r})</small>`:h}
                    ${r?h:l`<button class="chip-x" @click=${()=>this._removeUniverse(t)}>
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
              @input=${t=>this._newUniverse=t.target.value}
              @keydown=${t=>t.key==="Enter"&&this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText?l`<div class="error">${this.errorText}</div>`:h}

          <div class="actions">
            ${this.isNew?h:l`<button class="danger" @click=${this._delete}>Delete node</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let t=P(this._working.node_type),r=Object.keys(this._working.universes).filter(n=>Number(n)<t);if(r.length){this.errorText=`Universe ${r.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${t}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};C.styles=pe,p([m({attribute:!1})],C.prototype,"node",2),p([m({type:Boolean})],C.prototype,"isNew",2),p([m()],C.prototype,"errorText",2),p([b()],C.prototype,"_working",2),p([b()],C.prototype,"_newUniverse",2),C=p([k("dmx-node-dialog")],C);var S=class extends _{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return l`
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

          ${this._error?l`<div class="error">${this._error}</div>`:h}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode==="add"?"Add":"Renumber"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let t=String(e);if(t!==this.current&&this.existing.includes(t)){this._error=`Universe ${t} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:t},bubbles:!0,composed:!0}))}};S.styles=pe,p([m()],S.prototype,"mode",2),p([m({type:Number})],S.prototype,"minUniverse",2),p([m()],S.prototype,"current",2),p([m({attribute:!1})],S.prototype,"existing",2),p([b()],S.prototype,"_value",2),p([b()],S.prototype,"_error",2),S=p([k("dmx-universe-dialog")],S);var T=class extends _{constructor(){super(...arguments);this.yamlText="";this.errorText="";this._text="";this._copied=!1}willUpdate(e){e.has("yamlText")&&(this._text=this.yamlText)}render(){return l`
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

          ${this.errorText?l`<div class="error">${this.errorText}</div>`:h}

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
    `}async _copy(){try{await navigator.clipboard.writeText(this._text),this._copied=!0,setTimeout(()=>this._copied=!1,1500)}catch{this.errorText="Clipboard unavailable \u2014 select the text and copy manually"}}_download(){let e=new Blob([this._text],{type:"application/yaml"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="dmx_patch.yaml",r.click(),URL.revokeObjectURL(t)}_pickFile(){let e=document.createElement("input");e.type="file",e.accept=".yaml,.yml,.json,.txt",e.onchange=async()=>{let t=e.files?.[0];t&&(this._text=await t.text(),this.errorText="")},e.click()}_import(){this.dispatchEvent(new CustomEvent("import-patch",{detail:{content:this._text},bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}};T.styles=[pe,E`
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
    `],p([m()],T.prototype,"yamlText",2),p([m()],T.prototype,"errorText",2),p([b()],T.prototype,"_text",2),p([b()],T.prototype,"_copied",2),T=p([k("dmx-yaml-dialog")],T);function rt(o){return{id:D(),channel:o,name:"",type:"dimmer",transition:0,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null,channel_labels:null}}function st(){return{id:D(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var w=class extends _{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await tt(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((t,r)=>{let[n,s]=$(t);for(let a=n;a<=Math.min(s,512);a++){let c=e.get(a);e.set(a,{device:t,index:r,first:a===n,overlap:!!c})}}),e}render(){let e=this._channelMap(),t=[];for(let r=1;r<=512;r++){let n=e.get(r),s=this._values[r-1],a=this._live&&s!==void 0?s/255:0,c=this._dropTarget,d=n?ce(n.device,Math.floor((r-n.device.channel)/G(n.device))):void 0,u=!!d&&R(n.device),v=c&&r>=c.first&&r<=c.last;t.push(l`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}
            ${d?.dummy?"dummy":""}
            ${v?c.valid?"drop-ok":"drop-bad":""}"
          style=${n?`--device-color: ${de(n.index)}`:h}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${r}: ${d.text}${d.dummy?` (fixed ${d.value})`:""} \u2014 drag to move`:`Channel ${r}`}
          draggable=${n?"true":"false"}
          @click=${()=>this._cellClick(r,n?.device)}
          @dragstart=${n?g=>this._dragStart(g,r,n.device):h}
          @dragover=${g=>this._dragOver(g,r)}
          @drop=${g=>this._drop(g)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?l`<span class="heat" style="opacity: ${a}"></span>`:h}
          <span class="top">
            <span class="ch">${r}</span>
            ${d?.dummy&&!this._live?l`<span class="fixed">${d.value}</span>`:h}
          </span>
          ${n?.first?l`<span class="name">${n.device.name}</span>`:h}
          ${u&&(d.dummy||!n.first)?l`<span class="role">${d.text}</span>`:h}
          ${this._live&&s!==void 0?l`<span class="val">${s}</span>`:h}
        </div>
      `)}return l`
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
    `}_dragStart(e,t,r){let[n]=$(r);this._dragInfo={device:r,offset:t-n},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",r.id)}_dragOver(e,t){let r=this._dragInfo;if(!r)return;let[n,s]=$(r.device),a=s-n+1,c=t-r.offset,d=c+a-1,u=c>=1&&d<=512&&!this._collides(r.device.id,c,d);(this._dropTarget?.first!==c||this._dropTarget?.last!==d||this._dropTarget?.valid!==u)&&(this._dropTarget={first:c,last:d,valid:u}),u&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,t,r){return(this.universe?.devices??[]).some(n=>{if(n.id===e)return!1;let[s,a]=$(n);return t<=a&&r>=s})}_drop(e){e.preventDefault();let t=this._dragInfo,r=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!t||!r?.valid)&&$(t.device)[0]!==r.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:t.device.id,channel:r.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,t){t?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0}))}};w.styles=E`
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
  `,p([m({attribute:!1})],w.prototype,"hass",2),p([m({attribute:!1})],w.prototype,"universe",2),p([m()],w.prototype,"nodeKey",2),p([m({type:Number})],w.prototype,"universeNr",2),p([b()],w.prototype,"_live",2),p([b()],w.prototype,"_values",2),p([b()],w.prototype,"_dropTarget",2),w=p([k("dmx-universe-grid")],w);var x=class extends _{constructor(){super(...arguments);this.nodeIndex=0;this.errors=[];this.addUniverse="";this._filter="";this._sort="address";this._desc=!1}_rows(){let e=[],t=this.node?.universes??{};for(let[r,n]of Object.entries(t)){let s=n.devices??[],a=s.map(c=>$(c));s.forEach((c,d)=>{let[u,v]=a[d],g=a.some(([H,nt],ot)=>ot!==d&&u<=nt&&v>=H),y=`nodes/${this.nodeIndex}/universes/${r}/devices/${d}`,M=this.errors.filter(H=>H.path===y||H.path.startsWith(`${y}/`));e.push({device:c,universe:r,index:d,first:u,last:v,overlap:g,errors:M})})}return e}_visibleRows(){let e=this._filter.trim().toLowerCase(),t=this._rows().filter(s=>{if(!e)return!0;let a=s.device,c=(a.channel_labels??[]).filter(Boolean).join(" ");return[a.name,a.friendly_name??"",a.type,`light.${Ae(a.name)}`,c].join(" ").toLowerCase().includes(e)}),r=(s,a)=>Number(s.universe)-Number(a.universe)||s.first-a.first,n={address:r,name:(s,a)=>s.device.name.localeCompare(a.device.name)||r(s,a),type:(s,a)=>s.device.type.localeCompare(a.device.type)||r(s,a)};return t.sort(n[this._sort]),this._desc&&t.reverse(),t}_setSort(e){this._sort===e?this._desc=!this._desc:(this._sort=e,this._desc=!1)}_header(e,t){let r=this._sort===e;return l`<th
      class="sortable ${r?"active":""}"
      aria-sort=${r?this._desc?"descending":"ascending":"none"}
      @click=${()=>this._setSort(e)}
    >
      ${t}<span class="arrow">${r?this._desc?"\u25BC":"\u25B2":""}</span>
    </th>`}_layout(e){let t=ke(e),r=[];for(let n=0;n<t;n++){let s=ce(e,n);r.push(s.dummy?l`<span class="part dummy" title="Dummy channel, fixed value ${s.value}"
              >${s.text} <b>${s.value}</b></span
            >`:l`<span class="part">${s.text}</span>`)}return l`${r}${R(e)?h:l`<span class="default">default</span>`}`}_state(e){let t=this.hass?.states?.[e]?.state;return t?l`<span class="state ${t}" title=${t}></span>`:l`<span class="state none" title="Not created yet — Save & Apply">–</span>`}render(){let e=this._rows(),t=this._visibleRows(),r=Object.keys(this.node?.universes??{}),n=e.reduce((s,a)=>s+(a.last-a.first+1),0);return l`
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

      ${t.length?l`
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th class="swatch-col"></th>
                    ${this._header("name","Name")}
                    ${this._header("type","Type")}
                    ${this._header("address","Address")}
                    <th>Channels</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.map(s=>{let a=s.device,c=`light.${Ae(a.name)}`,d=s.errors.length?s.errors.map(u=>u.message).join(`
`):s.overlap?"Overlaps another fixture":"";return l`
                      <tr
                        class=${d?"invalid":""}
                        tabindex="0"
                        title=${d||`Edit ${a.name}`}
                        @click=${()=>this._edit(s)}
                        @keydown=${u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),this._edit(s))}}
                      >
                        <td class="swatch-col">
                          <span class="swatch" style="background: ${de(s.index)}"></span>
                        </td>
                        <td>
                          <div class="name">${a.name}</div>
                          ${a.friendly_name?l`<div class="sub">${a.friendly_name}</div>`:h}
                          <div class="entity">${this._state(c)}<code>${c}</code></div>
                          ${d?l`<div class="problem">⚠ ${d}</div>`:h}
                        </td>
                        <td>
                          ${a.type}
                          ${a.channel_size&&a.channel_size!=="8bit"?l`<div class="sub">${a.channel_size}</div>`:h}
                        </td>
                        <td class="address">
                          <span class="uni">U${s.universe}</span>
                          ${s.first===s.last?s.first:`${s.first}\u2013${s.last}`}
                        </td>
                        <td class="layout">${this._layout(a)}</td>
                      </tr>
                    `})}
                </tbody>
              </table>
            </div>
          `:l`<div class="empty">
            ${e.length?"No fixtures match the filter.":"No fixtures on this node yet."}
          </div>`}
    `}_edit(e){this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:e.device,universe:e.universe},bubbles:!0,composed:!0}))}};x.styles=E`
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
        grid-column: 2 / -1;
        margin-top: 4px;
      }
      td.layout {
        grid-column: 2 / -1;
        margin-top: 2px;
      }
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
  `,p([m({attribute:!1})],x.prototype,"hass",2),p([m({attribute:!1})],x.prototype,"node",2),p([m({type:Number})],x.prototype,"nodeIndex",2),p([m({attribute:!1})],x.prototype,"errors",2),p([m()],x.prototype,"addUniverse",2),p([b()],x.prototype,"_filter",2),p([b()],x.prototype,"_sort",2),p([b()],x.prototype,"_desc",2),x=p([k("dmx-fixture-list")],x);var f=class extends _{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._view=f._loadView();this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}static _loadView(){try{return localStorage.getItem("dmx_lighting.view")==="list"?"list":"grid"}catch{return"grid"}}_setView(e){this._view=e;try{localStorage.setItem("dmx_lighting.view",e)}catch{}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await Qe(this.hass);this._patch=e.patch??{nodes:[]},this._errors=e.errors??[],this._loaded=!0,this._autoSelect()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}_autoSelect(){this._selected||this._patch.nodes.length&&this._selectNode("ui:0")}_selectNode(e){this._selected=e;let t=this._currentUniverses(),r=Object.keys(t??{}).sort((n,s)=>Number(n)-Number(s));this._selectedUniverse=r[0]??""}_currentNode(){let[e,t]=this._selected.split(":"),r=Number(t);if(e==="ui")return this._patch.nodes[r]}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[t,r]=this._selected.split(":");if(t!=="ui")return;let n=Number(r),s=[...this._patch.nodes];s[n]=e(s[n]),this._patch={...this._patch,nodes:s},this._dirty=!0}_updateUniverse(e,t){this._updateSelectedNode(r=>{let n=r.universes[e];return n?{...r,universes:{...r.universes,[e]:t(n)}}:r})}async _save(){this._saving=!0,this._errors=[];try{let e=await Ge(this.hass,this._patch);e.success?(this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}async _openYamlDialog(){try{let e=await De(this.hass,this._patch);this._dialog={kind:"yaml",yamlText:e.yaml,errorText:""}}catch(e){this._showToast(`Export failed: ${e}`)}}async _onImportPatch(e){if(this._dialog.kind!=="yaml")return;let{content:t}=e.detail;try{let r=await et(this.hass,t);this._patch=r.patch,this._dirty=!0,this._errors=r.errors,this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._showToast(r.valid?"Loaded into editor \u2014 review and Save & Apply":"Loaded with validation errors \u2014 fix them before saving")}catch(r){let n=r?.message??String(r);this._dialog={kind:"yaml",yamlText:t,errorText:n}}}_addNode(){this._dialog={kind:"node",node:st(),isNew:!0}}_editNode(){let e=this._currentNode();e&&(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:t,original:r}=e.detail,n=this._patch.nodes,s=n.findIndex(a=>a.id===r.id);s>=0?n[s]=t:(n.push(t),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:t}=e.detail;this._patch.nodes=this._patch.nodes.filter(r=>r.id!==t.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._dialog={kind:"universe",mode:"add",current:""}}_renumberUniverse(){this._selectedUniverse&&(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:t}=e.detail;if(this._dialog.kind!=="universe")return;let r=this._dialog.mode,n=this._dialog.current;this._updateSelectedNode(s=>{let a={...s.universes};return r==="add"?a[t]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[t]=a[n],delete a[n]),{...s,universes:a}}),this._selectedUniverse=t,this._dialog={kind:"none"}}_removeUniverse(){let e=this._currentNode();if(!e||!this._selectedUniverse)return;let t=e.universes[this._selectedUniverse]?.devices??[];if(t.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${t.length} fixture(s)?`))return;let r={...e.universes};delete r[this._selectedUniverse],this._updateSelectedNode(s=>({...s,universes:r}));let n=Object.keys(r).sort((s,a)=>Number(s)-Number(a));this._selectedUniverse=n[0]??""}_setUniverseOption(e,t){this._updateUniverse(this._selectedUniverse,r=>({...r,[e]:t}))}_onAddDevice(e){let t=this._selectedUniverse;if(!t){this._showToast("Add a universe first");return}let r=e.detail.channel??this._firstFreeChannel(t);this._dialog={kind:"device",device:rt(r),isNew:!0,universeNr:t}}_firstFreeChannel(e){let t=(this._currentUniverses()?.[e]?.devices??[]).map(n=>$(n)).sort((n,s)=>n[0]-s[0]),r=1;for(let[n,s]of t){if(r<n)break;r=Math.max(r,s+1)}return Math.min(r,512)}_onEditDevice(e){let t=e.detail.universe??this._selectedUniverse;this._selectedUniverse=t,this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:t}}_onSaveDevice(e){let{device:t,original:r,count:n}=e.detail;if(this._dialog.kind!=="device")return;let s=this._dialog.universeNr,a=0;this._updateUniverse(s,c=>{let d=[...c.devices],u=d.findIndex(v=>v.id===r.id);if(u>=0)d[u]=t;else if(n>1){let v=t.channel;for(let g=1;g<=n;g++){let y={...t,id:D(),name:`${t.name}_${g}`,channel:v},[M,H]=$(y);if(H>512){a=n-g+1;break}d.push(y),v=H+1}}else d.push(t);return{...c,devices:d}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:t}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,r=>({...r,devices:r.devices.filter(n=>n.id!==t.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:t,channel:r}=e.detail;this._updateUniverse(this._selectedUniverse,n=>({...n,devices:n.devices.map(s=>s.id===t?{...s,channel:r}:s)}))}render(){if(!this._loaded)return l`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),t=this._currentUniverses()??{},r=Object.keys(t).sort((s,a)=>Number(s)-Number(a)),n=t[this._selectedUniverse];return l`
      <div class="header">
        <h1>DMX Patch</h1>
        ${this._dirty?l`<span class="dirty">unsaved changes</span>`:h}
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
          ${this._patch.nodes.map((s,a)=>l`
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
          ${e?l`
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
                  ${r.map(s=>l`
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
                  ${this._selectedUniverse?l`
                        <button class="tab" @click=${this._renumberUniverse}>Renumber</button>
                        <button class="tab remove" @click=${this._removeUniverse}>
                          Remove universe
                        </button>
                      `:h}
                </div>

                ${this._view==="list"?l`
                      <dmx-fixture-list
                        .hass=${this.hass}
                        .node=${e}
                        .nodeIndex=${Number(this._selected.split(":")[1])}
                        .errors=${this._errors}
                        .addUniverse=${this._selectedUniverse}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                      ></dmx-fixture-list>
                    `:n?l`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            @change=${s=>this._setUniverseOption("output_correction",s.target.value)}
                          >
                            ${oe.map(s=>l`<option
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
                        .nodeKey=${Je(e)}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @move-device=${this._onMoveDevice}
                        @grid-error=${s=>this._showToast(s.detail)}
                      ></dmx-universe-grid>
                    `:l`<div class="empty">No universes. Add one to start placing fixtures.</div>`}
              `:l`<div class="empty">
                No nodes yet. Add a node to start patching, or load a patch with the YAML button.
              </div>`}

          ${this._errors.length?l`
                <div class="errors">
                  <strong>Validation errors</strong>
                  <ul>
                    ${this._errors.map(s=>l`<li><code>${s.path}</code>: ${s.message}</li>`)}
                  </ul>
                </div>
              `:h}
        </main>
      </div>

      ${this._dialog.kind==="device"?l`
            <dmx-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></dmx-device-dialog>
          `:h}
      ${this._dialog.kind==="node"?l`
            <dmx-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></dmx-node-dialog>
          `:h}
      ${this._dialog.kind==="yaml"?l`
            <dmx-yaml-dialog
              .yamlText=${this._dialog.yamlText}
              .errorText=${this._dialog.errorText}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @import-patch=${this._onImportPatch}
            ></dmx-yaml-dialog>
          `:h}
      ${this._dialog.kind==="universe"?l`
            <dmx-universe-dialog
              .mode=${this._dialog.mode}
              .current=${this._dialog.current}
              .minUniverse=${P(e?.node_type??"artnet-direct")}
              .existing=${r}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></dmx-universe-dialog>
          `:h}
      ${this._toast?l`<div class="toast">${this._toast}</div>`:h}
    `}};f.styles=E`
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
  `,p([m({attribute:!1})],f.prototype,"hass",2),p([m({type:Boolean})],f.prototype,"narrow",2),p([b()],f.prototype,"_patch",2),p([b()],f.prototype,"_loaded",2),p([b()],f.prototype,"_dirty",2),p([b()],f.prototype,"_saving",2),p([b()],f.prototype,"_errors",2),p([b()],f.prototype,"_toast",2),p([b()],f.prototype,"_selected",2),p([b()],f.prototype,"_selectedUniverse",2),p([b()],f.prototype,"_dialog",2),p([b()],f.prototype,"_view",2),f=p([k("dmx-patch-panel")],f);export{f as DmxPatchPanel};
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
