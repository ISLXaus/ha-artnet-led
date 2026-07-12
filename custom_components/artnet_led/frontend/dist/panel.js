var Ie=Object.defineProperty;var ze=Object.getOwnPropertyDescriptor;var h=(n,t,e,s)=>{for(var i=s>1?void 0:s?ze(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&Ie(t,e,i),i};var K=globalThis,W=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),he=new WeakMap,O=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=he.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&he.set(e,t))}return t}toString(){return this.cssText}},pe=n=>new O(typeof n=="string"?n:n+"",void 0,Q),N=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new O(e,n,Q)},ue=(n,t)=>{if(W)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=K.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},G=W?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return pe(e)})(n):n;var{is:je,defineProperty:qe,getOwnPropertyDescriptor:Ye,getOwnPropertyNames:Be,getOwnPropertySymbols:Ke,getPrototypeOf:We}=Object,F=globalThis,ve=F.trustedTypes,Fe=ve?ve.emptyScript:"",Ve=F.reactiveElementPolyfillSupport,R=(n,t)=>n,L={toAttribute(n,t){switch(t){case Boolean:n=n?Fe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},V=(n,t)=>!je(n,t),me={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),F.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=me){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&qe(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Ye(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let a=i?.call(this);o?.call(this,r),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??me}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=We(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Be(e),...Ke(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:L).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:L;this._$Em=i;let a=r.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??V)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[R("elementProperties")]=new Map,w[R("finalized")]=new Map,Ve?.({ReactiveElement:w}),(F.reactiveElementVersions??=[]).push("2.1.2");var ne=globalThis,_e=n=>n,X=ne.trustedTypes,fe=X?X.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ee="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,we="?"+k,Xe=`<${we}>`,P=document,z=()=>P.createComment(""),j=n=>n===null||typeof n!="object"&&typeof n!="function",ae=Array.isArray,Ze=n=>ae(n)||typeof n?.[Symbol.iterator]=="function",ee=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,be=/>/g,A=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,ye=/"/g,Se=/^(?:script|style|textarea|title)$/i,le=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),d=le(1),dt=le(2),ht=le(3),T=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),xe=new WeakMap,C=P.createTreeWalker(P,129);function ke(n,t){if(!ae(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(t):t}var Je=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=I;for(let a=0;a<e;a++){let l=n[a],p,u,v=-1,g=0;for(;g<l.length&&(r.lastIndex=g,u=r.exec(l),u!==null);)g=r.lastIndex,r===I?u[1]==="!--"?r=ge:u[1]!==void 0?r=be:u[2]!==void 0?(Se.test(u[2])&&(i=RegExp("</"+u[2],"g")),r=A):u[3]!==void 0&&(r=A):r===A?u[0]===">"?(r=i??I,v=-1):u[1]===void 0?v=-2:(v=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?A:u[3]==='"'?ye:$e):r===ye||r===$e?r=A:r===ge||r===be?r=I:(r=A,i=void 0);let y=r===A&&n[a+1].startsWith("/>")?" ":"";o+=r===I?l+Xe:v>=0?(s.push(p),l.slice(0,v)+Ee+l.slice(v)+k+y):l+k+(v===-2?a:y)}return[ke(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,a=t.length-1,l=this.parts,[p,u]=Je(t,e);if(this.el=n.createElement(p,s),C.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(i=C.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let v of i.getAttributeNames())if(v.endsWith(Ee)){let g=u[r++],y=i.getAttribute(v).split(k),H=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:H[2],strings:y,ctor:H[1]==="."?se:H[1]==="?"?ie:H[1]==="@"?re:D}),i.removeAttribute(v)}else v.startsWith(k)&&(l.push({type:6,index:o}),i.removeAttribute(v));if(Se.test(i.tagName)){let v=i.textContent.split(k),g=v.length-1;if(g>0){i.textContent=X?X.emptyScript:"";for(let y=0;y<g;y++)i.append(v[y],z()),C.nextNode(),l.push({type:2,index:++o});i.append(v[g],z())}}}else if(i.nodeType===8)if(i.data===we)l.push({type:2,index:o});else{let v=-1;for(;(v=i.data.indexOf(k,v+1))!==-1;)l.push({type:7,index:o}),v+=k.length-1}o++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}};function M(n,t,e=n,s){if(t===T)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=j(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=M(n,i._$AS(n,t.values),i,s)),t}var te=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);C.currentNode=i;let o=C.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let p;l.type===2?p=new Y(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new oe(o,this,t)),this._$AV.push(p),l=s[++a]}r!==l?.index&&(o=C.nextNode(),r++)}return C.currentNode=P,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Y=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),j(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ze(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new te(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=xe.get(t.strings);return e===void 0&&xe.set(t.strings,e=new q(t)),e}k(t){ae(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=_e(t).nextSibling;_e(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},D=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=M(this,t,e,0),r=!j(t)||t!==this._$AH&&t!==T,r&&(this._$AH=t);else{let a=t,l,p;for(t=o[0],l=0;l<o.length-1;l++)p=M(this,a[s+l],e,l),p===T&&(p=this._$AH[l]),r||=!j(p)||p!==this._$AH[l],p===c?t=c:t!==c&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}r&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},se=class extends D{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},ie=class extends D{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},re=class extends D{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??c)===T)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},oe=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}};var Qe=ne.litHtmlPolyfillSupport;Qe?.(q,Y),(ne.litHtmlVersions??=[]).push("3.3.3");var Ne=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new Y(t.insertBefore(z(),o),o,void 0,e??{})}return i._$AI(n),i};var ce=globalThis,b=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};b._$litElement$=!0,b.finalized=!0,ce.litElementHydrateSupport?.({LitElement:b});var Ge=ce.litElementPolyfillSupport;Ge?.({LitElement:b});(ce.litElementVersions??=[]).push("4.2.2");var U=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var et={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:V},tt=(n=et,t,e)=>{let{kind:s,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),s==="accessor"){let{name:r}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,n,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,n,a),a}}}if(s==="setter"){let{name:r}=e;return function(a){let l=this[r];t.call(this,a),this.requestUpdate(r,l,n,!0,a)}}throw Error("Unsupported decorator location: "+s)};function _(n){return(t,e)=>typeof e=="object"?tt(n,t,e):((s,i,o)=>{let r=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}function m(n){return _({...n,state:!0,attribute:!1})}var Ae=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],Ce=["artnet-direct","artnet-controller","sacn","kinet"],Pe=["8bit","16bit","24bit","32bit"],J=["linear","quadratic","cubic","quadruple"],st={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},it={"8bit":1,"16bit":2,"24bit":3,"32bit":4};function rt(n){if(n.type==="binary"||n.type==="dimmer")return 1;let t=(n.channel_setup&&n.channel_setup.length?n.channel_setup:null)??st[n.type];return t?t.length:1}function x(n){let t=rt(n),e=it[n.channel_size??"8bit"]??1,s=n.channel;return[s,s+t*e-1]}function Te(n){return n.node_type==="artnet-controller"?"artnet-controller":`${n.node_type}:${n.host}:${n.port??"default"}`}function B(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function Ue(n){return`hsl(${n*137.5%360}, 45%, 45%)`}var Me=n=>n.callWS({type:"artnet_led/patch/get"});var De=(n,t)=>n.callWS({type:"artnet_led/patch/save",patch:t});var He=(n,t,e,s)=>n.connection.subscribeMessage(s,{type:"artnet_led/dmx/subscribe",node_key:t,universe:e});var Oe=N`
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
`,E=class extends b{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._count=1}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1)}_set(e,s){this._working={...this._working,[e]:s}}render(){let e=this._working,[s,i]=x(e),o=e.type==="color_temp"||e.type==="rgbww";return d`
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
                ${Ae.map(r=>d`<option value=${r} ?selected=${e.type===r}>${r}</option>`)}
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
          <div class="hint">Occupies channels ${s}–${i}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${e.channel_size??"8bit"}
                @change=${r=>this._set("channel_size",r.target.value)}
              >
                ${Pe.map(r=>d`<option value=${r} ?selected=${(e.channel_size??"8bit")===r}>${r}</option>`)}
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
                ${J.map(r=>d`<option value=${r} ?selected=${e.output_correction===r}>${r}</option>`)}
              </select>
            </div>
          </div>

          <label>Channel setup (optional, e.g. rgbw / dCH)</label>
          <input
            .value=${typeof e.channel_setup=="string"?e.channel_setup:""}
            placeholder="type default"
            @input=${r=>this._set("channel_setup",r.target.value||null)}
          />

          ${o?d`
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
    `}_backdropClick(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};E.styles=Oe,h([_({attribute:!1})],E.prototype,"device",2),h([_({type:Boolean})],E.prototype,"isNew",2),h([_()],E.prototype,"errorText",2),h([m()],E.prototype,"_working",2),h([m()],E.prototype,"_count",2),E=h([U("artnet-device-dialog")],E);var S=class extends b{constructor(){super(...arguments);this.isNew=!1;this.errorText=""}willUpdate(e){e.has("node")&&(this._working={...this.node})}_set(e,s){this._working={...this._working,[e]:s}}render(){let e=this._working;return d`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${s=>s.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${s=>this._set("node_type",s.target.value)}
          >
            ${Ce.map(s=>d`<option value=${s} ?selected=${e.node_type===s}>${s}</option>`)}
          </select>
          ${e.node_type==="artnet-controller"?d`<div class="hint">
                Controller mode discovers nodes and accepts DMX input. Only one controller can
                exist (it binds UDP 6454).
              </div>`:c}

          <label>Host (IP of the Art-Net node)</label>
          <input
            .value=${e.host??""}
            @input=${s=>this._set("host",s.target.value)}
          />

          <div class="row">
            <div>
              <label>Port (blank = protocol default)</label>
              <input
                type="number"
                .value=${e.port!=null?String(e.port):""}
                @input=${s=>{let i=s.target.value;this._set("port",i===""?null:Number(i))}}
              />
            </div>
            <div>
              <label>Max FPS (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                .value=${String(e.max_fps??25)}
                @input=${s=>this._set("max_fps",Number(s.target.value))}
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
                @input=${s=>this._set("refresh_every",Number(s.target.value))}
              />
            </div>
            <div>
              <label>Host override (optional)</label>
              <input
                .value=${e.host_override??""}
                @input=${s=>this._set("host_override",s.target.value||void 0)}
              />
            </div>
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
    `}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};S.styles=Oe,h([_({attribute:!1})],S.prototype,"node",2),h([_({type:Boolean})],S.prototype,"isNew",2),h([_()],S.prototype,"errorText",2),h([m()],S.prototype,"_working",2),S=h([U("artnet-node-dialog")],S);function Re(n){return{id:B(),channel:n,name:"",type:"dimmer",transition:0,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null}}function Le(){return{id:B(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,universes:{0:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var $=class extends b{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this.readonly=!1;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await He(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((s,i)=>{let[o,r]=x(s);for(let a=o;a<=Math.min(r,512);a++){let l=e.get(a);e.set(a,{device:s,index:i,first:a===o,overlap:!!l})}}),e}render(){let e=this._channelMap(),s=[];for(let i=1;i<=512;i++){let o=e.get(i),r=this._values[i-1],a=this._live&&r!==void 0?r/255:0,l=this._dropTarget,p=l&&i>=l.first&&i<=l.last;s.push(d`
        <div
          class="cell ${o?"occupied":""} ${o?.overlap?"overlap":""}
            ${p?l.valid?"drop-ok":"drop-bad":""}"
          style=${o?`--device-color: ${Ue(o.index)}`:c}
          title=${o?`${o.device.name} (${o.device.type}) \u2014 channel ${i}${this.readonly?"":" \u2014 drag to move"}`:`Channel ${i}`}
          draggable=${o&&!this.readonly?"true":"false"}
          @click=${()=>this._cellClick(i,o?.device)}
          @dragstart=${o?u=>this._dragStart(u,i,o.device):c}
          @dragover=${u=>this._dragOver(u,i)}
          @drop=${u=>this._drop(u)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?d`<span class="heat" style="opacity: ${a}"></span>`:c}
          <span class="ch">${i}</span>
          ${o?.first?d`<span class="name">${o.device.name}</span>`:c}
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
      <div class="grid">${s}</div>
    `}_dragStart(e,s,i){if(this.readonly)return;let[o]=x(i);this._dragInfo={device:i,offset:s-o},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",i.id)}_dragOver(e,s){let i=this._dragInfo;if(!i)return;let[o,r]=x(i.device),a=r-o+1,l=s-i.offset,p=l+a-1,u=l>=1&&p<=512&&!this._collides(i.device.id,l,p);(this._dropTarget?.first!==l||this._dropTarget?.last!==p||this._dropTarget?.valid!==u)&&(this._dropTarget={first:l,last:p,valid:u}),u&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,s,i){return(this.universe?.devices??[]).some(o=>{if(o.id===e)return!1;let[r,a]=x(o);return s<=a&&i>=r})}_drop(e){e.preventDefault();let s=this._dragInfo,i=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!s||!i?.valid)&&x(s.device)[0]!==i.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:s.device.id,channel:i.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,s){this.readonly||(s?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:s},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0})))}};$.styles=N`
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
  `,h([_({attribute:!1})],$.prototype,"hass",2),h([_({attribute:!1})],$.prototype,"universe",2),h([_()],$.prototype,"nodeKey",2),h([_({type:Number})],$.prototype,"universeNr",2),h([_({type:Boolean})],$.prototype,"readonly",2),h([m()],$.prototype,"_live",2),h([m()],$.prototype,"_values",2),h([m()],$.prototype,"_dropTarget",2),$=h([U("artnet-universe-grid")],$);var f=class extends b{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._yamlNodes=[];this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await Me(this.hass);this._patch=e.patch??{nodes:[]},this._yamlNodes=e.yaml_nodes??[],this._loaded=!0,this._autoSelect()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}_autoSelect(){this._selected||(this._patch.nodes.length?this._selectNode("ui:0"):this._yamlNodes.length&&this._selectNode("yaml:0"))}_selectNode(e){this._selected=e;let s=this._currentUniverses(),i=Object.keys(s??{}).sort((o,r)=>Number(o)-Number(r));this._selectedUniverse=i[0]??""}_currentNode(){let[e,s]=this._selected.split(":"),i=Number(s);if(e==="ui")return this._patch.nodes[i];if(e==="yaml")return this._yamlNodes[i]}_isYamlSelected(){return this._selected.startsWith("yaml:")}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[s,i]=this._selected.split(":");if(s!=="ui")return;let o=Number(i),r=[...this._patch.nodes];r[o]=e(r[o]),this._patch={...this._patch,nodes:r},this._dirty=!0}_updateUniverse(e,s){this._updateSelectedNode(i=>{let o=i.universes[e];return o?{...i,universes:{...i.universes,[e]:s(o)}}:i})}async _save(){this._saving=!0,this._errors=[];try{let e=await De(this.hass,this._patch);e.success?(this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}_addNode(){this._dialog={kind:"node",node:Le(),isNew:!0}}_editNode(){let e=this._currentNode();!e||this._isYamlSelected()||(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:s,original:i}=e.detail,o=this._patch.nodes,r=o.findIndex(a=>a.id===i.id);r>=0?o[r]=s:(o.push(s),this._selectNode(`ui:${o.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:s}=e.detail;this._patch.nodes=this._patch.nodes.filter(i=>i.id!==s.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){if(this._isYamlSelected())return;let e=this._currentNode();if(!e)return;let s=prompt("Universe number (0-1024):","0");if(s===null)return;let i=String(Number(s));if(Number.isNaN(Number(s))||Number(i)<0||Number(i)>1024){this._showToast("Universe must be a number between 0 and 1024");return}if(e.universes[i]){this._showToast(`Universe ${i} already exists`);return}this._updateSelectedNode(o=>({...o,universes:{...o.universes,[i]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}})),this._selectedUniverse=i}_removeUniverse(){if(this._isYamlSelected())return;let e=this._currentNode();if(!e||!this._selectedUniverse)return;let s=e.universes[this._selectedUniverse]?.devices??[];if(s.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${s.length} fixture(s)?`))return;let i={...e.universes};delete i[this._selectedUniverse],this._updateSelectedNode(r=>({...r,universes:i}));let o=Object.keys(i).sort((r,a)=>Number(r)-Number(a));this._selectedUniverse=o[0]??""}_setUniverseOption(e,s){this._isYamlSelected()||this._updateUniverse(this._selectedUniverse,i=>({...i,[e]:s}))}_onAddDevice(e){this._isYamlSelected()||(this._dialog={kind:"device",device:Re(e.detail.channel),isNew:!0,universeNr:this._selectedUniverse})}_onEditDevice(e){this._isYamlSelected()||(this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:this._selectedUniverse})}_onSaveDevice(e){let{device:s,original:i,count:o}=e.detail;if(this._dialog.kind!=="device")return;let r=this._dialog.universeNr,a=0;this._updateUniverse(r,l=>{let p=[...l.devices],u=p.findIndex(v=>v.id===i.id);if(u>=0)p[u]=s;else if(o>1){let v=s.channel;for(let g=1;g<=o;g++){let y={...s,id:B(),name:`${s.name}_${g}`,channel:v},[H,de]=x(y);if(de>512){a=o-g+1;break}p.push(y),v=de+1}}else p.push(s);return{...l,devices:p}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:s}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,i=>({...i,devices:i.devices.filter(o=>o.id!==s.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:s,channel:i}=e.detail;this._updateUniverse(this._selectedUniverse,o=>({...o,devices:o.devices.map(r=>r.id===s?{...r,channel:i}:r)}))}render(){if(!this._loaded)return d`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),s=this._isYamlSelected(),i=this._currentUniverses()??{},o=Object.keys(i).sort((a,l)=>Number(a)-Number(l)),r=i[this._selectedUniverse];return d`
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
                  ${s?c:d`<button @click=${this._editNode}>Node settings</button>`}
                </div>

                <div class="universe-bar">
                  ${o.map(a=>d`
                      <button
                        class="tab ${this._selectedUniverse===a?"active":""}"
                        @click=${()=>this._selectedUniverse=a}
                      >
                        Universe ${a}
                      </button>
                    `)}
                  ${s?c:d`
                        <button class="tab add" @click=${this._addUniverse}>+</button>
                        ${this._selectedUniverse?d`<button class="tab remove" @click=${this._removeUniverse}>
                              Remove universe
                            </button>`:c}
                      `}
                </div>

                ${r?d`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            ?disabled=${s}
                            @change=${a=>this._setUniverseOption("output_correction",a.target.value)}
                          >
                            ${J.map(a=>d`<option
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
                            ?disabled=${s}
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
                        .nodeKey=${Te(e)}
                        ?readonly=${s}
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
              @dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></artnet-device-dialog>
          `:c}
      ${this._dialog.kind==="node"?d`
            <artnet-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></artnet-node-dialog>
          `:c}
      ${this._toast?d`<div class="toast">${this._toast}</div>`:c}
    `}};f.styles=N`
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
  `,h([_({attribute:!1})],f.prototype,"hass",2),h([_({type:Boolean})],f.prototype,"narrow",2),h([m()],f.prototype,"_patch",2),h([m()],f.prototype,"_yamlNodes",2),h([m()],f.prototype,"_loaded",2),h([m()],f.prototype,"_dirty",2),h([m()],f.prototype,"_saving",2),h([m()],f.prototype,"_errors",2),h([m()],f.prototype,"_toast",2),h([m()],f.prototype,"_selected",2),h([m()],f.prototype,"_selectedUniverse",2),h([m()],f.prototype,"_dialog",2),f=h([U("artnet-patch-panel")],f);export{f as ArtnetPatchPanel};
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
