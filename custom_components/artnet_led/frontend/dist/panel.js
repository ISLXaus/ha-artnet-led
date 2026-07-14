var je=Object.defineProperty;var qe=Object.getOwnPropertyDescriptor;var h=(o,t,e,i)=>{for(var s=i>1?void 0:i?qe(t,e):t,n=o.length-1,r;n>=0;n--)(r=o[n])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&je(t,e,s),s};var F=globalThis,V=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),ve=new WeakMap,L=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ve.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ve.set(e,t))}return t}toString(){return this.cssText}},me=o=>new L(typeof o=="string"?o:o+"",void 0,ee),P=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new L(e,o,ee)},_e=(o,t)=>{if(V)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},te=V?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return me(e)})(o):o;var{is:Ye,defineProperty:Be,getOwnPropertyDescriptor:Ke,getOwnPropertyNames:We,getOwnPropertySymbols:Fe,getPrototypeOf:Ve}=Object,X=globalThis,ge=X.trustedTypes,Xe=ge?ge.emptyScript:"",Ze=X.reactiveElementPolyfillSupport,I=(o,t)=>o,z={toAttribute(o,t){switch(t){case Boolean:o=o?Xe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Z=(o,t)=>!Ye(o,t),be={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=be){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Be(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=Ke(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let a=s?.call(this);n?.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??be}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let t=Ve(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,i=[...We(e),...Fe(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(te(s))}else t!==void 0&&e.push(te(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:z).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:z;this._$Em=s;let a=r.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??Z)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[I("elementProperties")]=new Map,S[I("finalized")]=new Map,Ze?.({ReactiveElement:S}),(X.reactiveElementVersions??=[]).push("2.1.2");var le=globalThis,fe=o=>o,J=le.trustedTypes,$e=J?J.createPolicy("lit-html",{createHTML:o=>o}):void 0,Se="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Ne="?"+N,Je=`<${Ne}>`,M=document,q=()=>M.createComment(""),Y=o=>o===null||typeof o!="object"&&typeof o!="function",de=Array.isArray,Qe=o=>de(o)||typeof o?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,xe=/>/g,U=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,Ee=/"/g,Ae=/^(?:script|style|textarea|title)$/i,ce=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),d=ce(1),pt=ce(2),ut=ce(3),H=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ke=new WeakMap,T=M.createTreeWalker(M,129);function Ce(o,t){if(!de(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(t):t}var Ge=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=j;for(let a=0;a<e;a++){let l=o[a],p,u,v=-1,b=0;for(;b<l.length&&(r.lastIndex=b,u=r.exec(l),u!==null);)b=r.lastIndex,r===j?u[1]==="!--"?r=ye:u[1]!==void 0?r=xe:u[2]!==void 0?(Ae.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=U):u[3]!==void 0&&(r=U):r===U?u[0]===">"?(r=s??j,v=-1):u[1]===void 0?v=-2:(v=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?U:u[3]==='"'?Ee:we):r===Ee||r===we?r=U:r===ye||r===xe?r=j:(r=U,s=void 0);let y=r===U&&o[a+1].startsWith("/>")?" ":"";n+=r===j?l+Je:v>=0?(i.push(p),l.slice(0,v)+Se+l.slice(v)+N+y):l+N+(v===-2?a:y)}return[Ce(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},B=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,a=t.length-1,l=this.parts,[p,u]=Ge(t,e);if(this.el=o.createElement(p,i),T.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(s=T.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let v of s.getAttributeNames())if(v.endsWith(Se)){let b=u[r++],y=s.getAttribute(v).split(N),O=/([.?@])?(.*)/.exec(b);l.push({type:1,index:n,name:O[2],strings:y,ctor:O[1]==="."?re:O[1]==="?"?ne:O[1]==="@"?oe:R}),s.removeAttribute(v)}else v.startsWith(N)&&(l.push({type:6,index:n}),s.removeAttribute(v));if(Ae.test(s.tagName)){let v=s.textContent.split(N),b=v.length-1;if(b>0){s.textContent=J?J.emptyScript:"";for(let y=0;y<b;y++)s.append(v[y],q()),T.nextNode(),l.push({type:2,index:++n});s.append(v[b],q())}}}else if(s.nodeType===8)if(s.data===Ne)l.push({type:2,index:n});else{let v=-1;for(;(v=s.data.indexOf(N,v+1))!==-1;)l.push({type:7,index:n}),v+=N.length-1}n++}}static createElement(t,e){let i=M.createElement("template");return i.innerHTML=t,i}};function D(o,t,e=o,i){if(t===H)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=Y(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=D(o,s._$AS(o,t.values),s,i)),t}var se=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);T.currentNode=s;let n=T.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let p;l.type===2?p=new K(n,n.nextSibling,this,t):l.type===1?p=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(p=new ae(n,this,t)),this._$AV.push(p),l=i[++a]}r!==l?.index&&(n=T.nextNode(),r++)}return T.currentNode=M,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},K=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),Y(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==H&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&Y(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=B.createElement(Ce(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new se(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=ke.get(t.strings);return e===void 0&&ke.set(t.strings,e=new B(t)),e}k(t){de(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(q()),this.O(q()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=fe(t).nextSibling;fe(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=D(this,t,e,0),r=!Y(t)||t!==this._$AH&&t!==H,r&&(this._$AH=t);else{let a=t,l,p;for(t=n[0],l=0;l<n.length-1;l++)p=D(this,a[i+l],e,l),p===H&&(p=this._$AH[l]),r||=!Y(p)||p!==this._$AH[l],p===c?t=c:t!==c&&(t+=(p??"")+n[l+1]),this._$AH[l]=p}r&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},re=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},ne=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},oe=class extends R{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=D(this,t,e,0)??c)===H)return;let i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ae=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}};var et=le.litHtmlPolyfillSupport;et?.(B,K),(le.litHtmlVersions??=[]).push("3.3.3");var Pe=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new K(t.insertBefore(q(),n),n,void 0,e??{})}return s._$AI(o),s};var he=globalThis,f=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};f._$litElement$=!0,f.finalized=!0,he.litElementHydrateSupport?.({LitElement:f});var tt=he.litElementPolyfillSupport;tt?.({LitElement:f});(he.litElementVersions??=[]).push("4.2.2");var A=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var it={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:Z},st=(o=it,t,e)=>{let{kind:i,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),i==="accessor"){let{name:r}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,o,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,o,a),a}}}if(i==="setter"){let{name:r}=e;return function(a){let l=this[r];t.call(this,a),this.requestUpdate(r,l,o,!0,a)}}throw Error("Unsupported decorator location: "+i)};function m(o){return(t,e)=>typeof e=="object"?st(o,t,e):((i,s,n)=>{let r=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),r?Object.getOwnPropertyDescriptor(s,n):void 0})(o,t,e)}function _(o){return m({...o,state:!0,attribute:!1})}var Ue=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],Te=["artnet-direct","artnet-controller","sacn","kinet"],Me=["8bit","16bit","24bit","32bit"],G=["linear","quadratic","cubic","quadruple"],rt={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},nt={"8bit":1,"16bit":2,"24bit":3,"32bit":4};function ot(o){if(o.type==="binary"||o.type==="dimmer")return 1;let t=(o.channel_setup&&o.channel_setup.length?o.channel_setup:null)??rt[o.type];return t?t.length:1}function w(o){let t=ot(o),e=nt[o.channel_size??"8bit"]??1,i=o.channel;return[i,i+t*e-1]}function C(o){return o==="sacn"?1:0}function He(o){return o.node_type==="artnet-controller"?"artnet-controller":`${o.node_type}:${o.host}:${o.port??"default"}`}function W(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function De(o){return`hsl(${o*137.5%360}, 45%, 45%)`}var Re=o=>o.callWS({type:"artnet_led/patch/get"});var Oe=(o,t)=>o.callWS({type:"artnet_led/patch/save",patch:t});var Le=(o,t,e,i)=>o.connection.subscribeMessage(i,{type:"artnet_led/dmx/subscribe",node_key:t,universe:e});var pe=P`
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
`,E=class extends f{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._count=1}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1)}_set(e,i){this._working={...this._working,[e]:i}}render(){let e=this._working,[i,s]=w(e),n=e.type==="color_temp"||e.type==="rgbww";return d`
      <div class="backdrop" @click=${this._backdropClick}>
        <div class="dialog" @click=${r=>r.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${e.name??""}
            @input=${r=>this._set("name",r.target.value)}
          />

          ${this.isNew?d`
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="512"
                  .value=${String(this._count)}
                  @input=${r=>this._count=Math.max(1,Number(r.target.value)||1)}
                />
                ${this._count>1?d`<div class="hint">
                      Adds ${this._count} fixtures back-to-back, named
                      ${e.name||"name"}_1 … ${e.name||"name"}_${this._count}
                    </div>`:c}
              `:c}

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
                @change=${r=>this._set("type",r.target.value)}
              >
                ${Ue.map(r=>d`<option value=${r} ?selected=${e.type===r}>${r}</option>`)}
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
                ${Me.map(r=>d`<option value=${r} ?selected=${(e.channel_size??"8bit")===r}>${r}</option>`)}
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
                ${G.map(r=>d`<option value=${r} ?selected=${e.output_correction===r}>${r}</option>`)}
              </select>
            </div>
          </div>

          <label>Channel setup (optional, e.g. rgbw / dCH)</label>
          <input
            .value=${typeof e.channel_setup=="string"?e.channel_setup:""}
            placeholder="type default"
            @input=${r=>this._set("channel_setup",r.target.value||null)}
          />

          ${n?d`
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
              `:c}

          ${this.errorText?d`<div class="error">${this.errorText}</div>`:c}

          <div class="actions">
            ${this.isNew?c:d`<button class="danger" @click=${this._delete}>Delete</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_backdropClick(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};E.styles=pe,h([m({attribute:!1})],E.prototype,"device",2),h([m({type:Boolean})],E.prototype,"isNew",2),h([m()],E.prototype,"errorText",2),h([_()],E.prototype,"_working",2),h([_()],E.prototype,"_count",2),E=h([A("artnet-device-dialog")],E);var k=class extends f{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_set(e,i){this._working={...this._working,[e]:i}}_addUniverse(){let e=Number(this._newUniverse),i=C(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<i||e>1024){this.errorText=`Universe must be a whole number between ${i} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let i={...this._working.universes};delete i[e],this._working={...this._working,universes:i}}render(){let e=this._working;return d`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${i=>i.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${i=>this._set("node_type",i.target.value)}
          >
            ${Te.map(i=>d`<option value=${i} ?selected=${e.node_type===i}>${i}</option>`)}
          </select>
          ${e.node_type==="artnet-controller"?d`<div class="hint">
                Controller mode discovers nodes and accepts DMX input. Only one controller can
                exist (it binds UDP 6454).
              </div>`:c}

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

          ${e.node_type==="sacn"?d`
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
              `:c}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(e.universes).sort((i,s)=>Number(i)-Number(s)).map(i=>{let s=e.universes[i]?.devices?.length??0,n=Number(i)<C(e.node_type);return d`
                  <span class="chip ${n?"invalid":""}"
                    title=${n?`Universe ${i} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:s?`${s} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${i}`}
                  >
                    ${i}${s?d` <small>(${s})</small>`:c}
                    ${s?c:d`<button class="chip-x" @click=${()=>this._removeUniverse(i)}>
                          ×
                        </button>`}
                  </span>
                `})}
          </div>
          <div class="row">
            <input
              type="number"
              min=${C(e.node_type)}
              max="1024"
              placeholder="Universe number (${C(e.node_type)}-1024)"
              .value=${this._newUniverse}
              @input=${i=>this._newUniverse=i.target.value}
              @keydown=${i=>i.key==="Enter"&&this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText?d`<div class="error">${this.errorText}</div>`:c}

          <div class="actions">
            ${this.isNew?c:d`<button class="danger" @click=${this._delete}>Delete node</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let i=C(this._working.node_type),s=Object.keys(this._working.universes).filter(n=>Number(n)<i);if(s.length){this.errorText=`Universe ${s.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${i}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};k.styles=pe,h([m({attribute:!1})],k.prototype,"node",2),h([m({type:Boolean})],k.prototype,"isNew",2),h([m()],k.prototype,"errorText",2),h([_()],k.prototype,"_working",2),h([_()],k.prototype,"_newUniverse",2),k=h([A("artnet-node-dialog")],k);var x=class extends f{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return d`
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

          ${this._error?d`<div class="error">${this._error}</div>`:c}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode==="add"?"Add":"Renumber"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let i=String(e);if(i!==this.current&&this.existing.includes(i)){this._error=`Universe ${i} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:i},bubbles:!0,composed:!0}))}};x.styles=pe,h([m()],x.prototype,"mode",2),h([m({type:Number})],x.prototype,"minUniverse",2),h([m()],x.prototype,"current",2),h([m({attribute:!1})],x.prototype,"existing",2),h([_()],x.prototype,"_value",2),h([_()],x.prototype,"_error",2),x=h([A("artnet-universe-dialog")],x);function Ie(o){return{id:W(),channel:o,name:"",type:"dimmer",transition:0,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null}}function ze(){return{id:W(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var $=class extends f{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this.readonly=!1;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await Le(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((i,s)=>{let[n,r]=w(i);for(let a=n;a<=Math.min(r,512);a++){let l=e.get(a);e.set(a,{device:i,index:s,first:a===n,overlap:!!l})}}),e}render(){let e=this._channelMap(),i=[];for(let s=1;s<=512;s++){let n=e.get(s),r=this._values[s-1],a=this._live&&r!==void 0?r/255:0,l=this._dropTarget,p=l&&s>=l.first&&s<=l.last;i.push(d`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}
            ${p?l.valid?"drop-ok":"drop-bad":""}"
          style=${n?`--device-color: ${De(n.index)}`:c}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${s}${this.readonly?"":" \u2014 drag to move"}`:`Channel ${s}`}
          draggable=${n&&!this.readonly?"true":"false"}
          @click=${()=>this._cellClick(s,n?.device)}
          @dragstart=${n?u=>this._dragStart(u,s,n.device):c}
          @dragover=${u=>this._dragOver(u,s)}
          @drop=${u=>this._drop(u)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?d`<span class="heat" style="opacity: ${a}"></span>`:c}
          <span class="ch">${s}</span>
          ${n?.first?d`<span class="name">${n.device.name}</span>`:c}
          ${this._live&&r!==void 0?d`<span class="val">${r}</span>`:c}
        </div>
      `)}return d`
      <div class="toolbar">
        <label class="live-toggle">
          <input
            type="checkbox"
            .checked=${this._live}
            @change=${this._toggleLive}
          />
          Live DMX values
        </label>
        ${this.readonly?d`<span class="readonly-hint">YAML-configured (read-only)</span>`:c}
      </div>
      <div class="grid">${i}</div>
    `}_dragStart(e,i,s){if(this.readonly)return;let[n]=w(s);this._dragInfo={device:s,offset:i-n},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",s.id)}_dragOver(e,i){let s=this._dragInfo;if(!s)return;let[n,r]=w(s.device),a=r-n+1,l=i-s.offset,p=l+a-1,u=l>=1&&p<=512&&!this._collides(s.device.id,l,p);(this._dropTarget?.first!==l||this._dropTarget?.last!==p||this._dropTarget?.valid!==u)&&(this._dropTarget={first:l,last:p,valid:u}),u&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,i,s){return(this.universe?.devices??[]).some(n=>{if(n.id===e)return!1;let[r,a]=w(n);return i<=a&&s>=r})}_drop(e){e.preventDefault();let i=this._dragInfo,s=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!i||!s?.valid)&&w(i.device)[0]!==s.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:i.device.id,channel:s.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,i){this.readonly||(i?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:i},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0})))}};$.styles=P`
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
    .readonly-hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
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
  `,h([m({attribute:!1})],$.prototype,"hass",2),h([m({attribute:!1})],$.prototype,"universe",2),h([m()],$.prototype,"nodeKey",2),h([m({type:Number})],$.prototype,"universeNr",2),h([m({type:Boolean})],$.prototype,"readonly",2),h([_()],$.prototype,"_live",2),h([_()],$.prototype,"_values",2),h([_()],$.prototype,"_dropTarget",2),$=h([A("artnet-universe-grid")],$);var g=class extends f{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._yamlNodes=[];this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await Re(this.hass);this._patch=e.patch??{nodes:[]},this._yamlNodes=e.yaml_nodes??[],this._errors=e.errors??[],this._loaded=!0,this._autoSelect()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}_autoSelect(){this._selected||(this._patch.nodes.length?this._selectNode("ui:0"):this._yamlNodes.length&&this._selectNode("yaml:0"))}_selectNode(e){this._selected=e;let i=this._currentUniverses(),s=Object.keys(i??{}).sort((n,r)=>Number(n)-Number(r));this._selectedUniverse=s[0]??""}_currentNode(){let[e,i]=this._selected.split(":"),s=Number(i);if(e==="ui")return this._patch.nodes[s];if(e==="yaml")return this._yamlNodes[s]}_isYamlSelected(){return this._selected.startsWith("yaml:")}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[i,s]=this._selected.split(":");if(i!=="ui")return;let n=Number(s),r=[...this._patch.nodes];r[n]=e(r[n]),this._patch={...this._patch,nodes:r},this._dirty=!0}_updateUniverse(e,i){this._updateSelectedNode(s=>{let n=s.universes[e];return n?{...s,universes:{...s.universes,[e]:i(n)}}:s})}async _save(){this._saving=!0,this._errors=[];try{let e=await Oe(this.hass,this._patch);e.success?(this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}_addNode(){this._dialog={kind:"node",node:ze(),isNew:!0}}_editNode(){let e=this._currentNode();!e||this._isYamlSelected()||(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:i,original:s}=e.detail,n=this._patch.nodes,r=n.findIndex(a=>a.id===s.id);r>=0?n[r]=i:(n.push(i),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:i}=e.detail;this._patch.nodes=this._patch.nodes.filter(s=>s.id!==i.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._isYamlSelected()||(this._dialog={kind:"universe",mode:"add",current:""})}_renumberUniverse(){this._isYamlSelected()||!this._selectedUniverse||(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:i}=e.detail;if(this._dialog.kind!=="universe")return;let s=this._dialog.mode,n=this._dialog.current;this._updateSelectedNode(r=>{let a={...r.universes};return s==="add"?a[i]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[i]=a[n],delete a[n]),{...r,universes:a}}),this._selectedUniverse=i,this._dialog={kind:"none"}}_removeUniverse(){if(this._isYamlSelected())return;let e=this._currentNode();if(!e||!this._selectedUniverse)return;let i=e.universes[this._selectedUniverse]?.devices??[];if(i.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${i.length} fixture(s)?`))return;let s={...e.universes};delete s[this._selectedUniverse],this._updateSelectedNode(r=>({...r,universes:s}));let n=Object.keys(s).sort((r,a)=>Number(r)-Number(a));this._selectedUniverse=n[0]??""}_setUniverseOption(e,i){this._isYamlSelected()||this._updateUniverse(this._selectedUniverse,s=>({...s,[e]:i}))}_onAddDevice(e){this._isYamlSelected()||(this._dialog={kind:"device",device:Ie(e.detail.channel),isNew:!0,universeNr:this._selectedUniverse})}_onEditDevice(e){this._isYamlSelected()||(this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:this._selectedUniverse})}_onSaveDevice(e){let{device:i,original:s,count:n}=e.detail;if(this._dialog.kind!=="device")return;let r=this._dialog.universeNr,a=0;this._updateUniverse(r,l=>{let p=[...l.devices],u=p.findIndex(v=>v.id===s.id);if(u>=0)p[u]=i;else if(n>1){let v=i.channel;for(let b=1;b<=n;b++){let y={...i,id:W(),name:`${i.name}_${b}`,channel:v},[O,ue]=w(y);if(ue>512){a=n-b+1;break}p.push(y),v=ue+1}}else p.push(i);return{...l,devices:p}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:i}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,s=>({...s,devices:s.devices.filter(n=>n.id!==i.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:i,channel:s}=e.detail;this._updateUniverse(this._selectedUniverse,n=>({...n,devices:n.devices.map(r=>r.id===i?{...r,channel:s}:r)}))}render(){if(!this._loaded)return d`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),i=this._isYamlSelected(),s=this._currentUniverses()??{},n=Object.keys(s).sort((a,l)=>Number(a)-Number(l)),r=s[this._selectedUniverse];return d`
      <div class="header">
        <h1>DMX Patch</h1>
        ${this._dirty?d`<span class="dirty">unsaved changes</span>`:c}
        <span class="spacer"></span>
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
          ${this._patch.nodes.map((a,l)=>d`
              <button
                class="rail-item ${this._selected===`ui:${l}`?"active":""}"
                @click=${()=>this._selectNode(`ui:${l}`)}
              >
                <span class="rail-title">${a.host||"(new node)"}</span>
                <span class="rail-sub">${a.node_type}</span>
              </button>
            `)}
          <button class="rail-add" @click=${this._addNode}>+ Add node</button>

          ${this._yamlNodes.length?d`
                <div class="rail-section">YAML nodes 🔒</div>
                ${this._yamlNodes.map((a,l)=>d`
                    <button
                      class="rail-item ${this._selected===`yaml:${l}`?"active":""}"
                      @click=${()=>this._selectNode(`yaml:${l}`)}
                    >
                      <span class="rail-title">${a.host}</span>
                      <span class="rail-sub">${a.node_type} · read-only</span>
                    </button>
                  `)}
              `:c}
        </nav>

        <main class="main">
          ${e?d`
                <div class="node-bar">
                  <h2>${e.host} <small>(${e.node_type})</small></h2>
                  ${i?c:d`<button @click=${this._editNode}>Node settings</button>`}
                </div>

                <div class="universe-bar">
                  ${n.map(a=>d`
                      <button
                        class="tab ${this._selectedUniverse===a?"active":""}"
                        @click=${()=>this._selectedUniverse=a}
                      >
                        Universe ${a}
                      </button>
                    `)}
                  ${i?c:d`
                        <button class="tab add" title="Add universe" @click=${this._addUniverse}>
                          + Add universe
                        </button>
                        ${this._selectedUniverse?d`
                              <button class="tab" @click=${this._renumberUniverse}>
                                Renumber
                              </button>
                              <button class="tab remove" @click=${this._removeUniverse}>
                                Remove universe
                              </button>
                            `:c}
                      `}
                </div>

                ${r?d`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            ?disabled=${i}
                            @change=${a=>this._setUniverseOption("output_correction",a.target.value)}
                          >
                            ${G.map(a=>d`<option
                                  value=${a}
                                  ?selected=${(r.output_correction??"linear")===a}
                                >
                                  ${a}
                                </option>`)}
                          </select>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            ?disabled=${i}
                            .checked=${r.send_partial_universe??!0}
                            @change=${a=>this._setUniverseOption("send_partial_universe",a.target.checked)}
                          />
                          Send partial universe
                        </label>
                      </div>

                      <artnet-universe-grid
                        .hass=${this.hass}
                        .universe=${r}
                        .universeNr=${Number(this._selectedUniverse)}
                        .nodeKey=${He(e)}
                        ?readonly=${i}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @move-device=${this._onMoveDevice}
                        @grid-error=${a=>this._showToast(a.detail)}
                      ></artnet-universe-grid>
                    `:d`<div class="empty">No universes. Add one to start placing fixtures.</div>`}
              `:d`<div class="empty">
                No nodes yet. Add a node to start patching, or configure one in YAML.
              </div>`}

          ${this._errors.length?d`
                <div class="errors">
                  <strong>Validation errors</strong>
                  <ul>
                    ${this._errors.map(a=>d`<li><code>${a.path}</code>: ${a.message}</li>`)}
                  </ul>
                </div>
              `:c}
        </main>
      </div>

      ${this._dialog.kind==="device"?d`
            <artnet-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></artnet-device-dialog>
          `:c}
      ${this._dialog.kind==="node"?d`
            <artnet-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></artnet-node-dialog>
          `:c}
      ${this._dialog.kind==="universe"?d`
            <artnet-universe-dialog
              .mode=${this._dialog.mode}
              .current=${this._dialog.current}
              .minUniverse=${C(e?.node_type??"artnet-direct")}
              .existing=${n}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></artnet-universe-dialog>
          `:c}
      ${this._toast?d`<div class="toast">${this._toast}</div>`:c}
    `}};g.styles=P`
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
  `,h([m({attribute:!1})],g.prototype,"hass",2),h([m({type:Boolean})],g.prototype,"narrow",2),h([_()],g.prototype,"_patch",2),h([_()],g.prototype,"_yamlNodes",2),h([_()],g.prototype,"_loaded",2),h([_()],g.prototype,"_dirty",2),h([_()],g.prototype,"_saving",2),h([_()],g.prototype,"_errors",2),h([_()],g.prototype,"_toast",2),h([_()],g.prototype,"_selected",2),h([_()],g.prototype,"_selectedUniverse",2),h([_()],g.prototype,"_dialog",2),g=h([A("artnet-patch-panel")],g);export{g as ArtnetPatchPanel};
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
