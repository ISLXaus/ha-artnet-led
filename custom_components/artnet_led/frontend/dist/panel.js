var Le=Object.defineProperty;var ze=Object.getOwnPropertyDescriptor;var h=(o,e,t,s)=>{for(var i=s>1?void 0:s?ze(e,t):e,n=o.length-1,r;n>=0;n--)(r=o[n])&&(i=(s?r(e,t,i):r(i))||i);return s&&i&&Le(e,t,i),i};var Y=globalThis,B=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),de=new WeakMap,H=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(B&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=de.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&de.set(t,e))}return e}toString(){return this.cssText}},he=o=>new H(typeof o=="string"?o:o+"",void 0,J),k=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new H(t,o,J)},pe=(o,e)=>{if(B)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=Y.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},Q=B?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return he(t)})(o):o;var{is:Ie,defineProperty:je,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Ye,getOwnPropertySymbols:Be,getPrototypeOf:Ke}=Object,K=globalThis,ue=K.trustedTypes,We=ue?ue.emptyScript:"",Fe=K.reactiveElementPolyfillSupport,D=(o,e)=>o,O={toAttribute(o,e){switch(e){case Boolean:o=o?We:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},W=(o,e)=>!Ie(o,e),ve={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ve){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&je(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:n}=qe(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){let a=i?.call(this);n?.call(this,r),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ve}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let e=Ke(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let t=this.properties,s=[...Ye(t),...Be(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(Q(i))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:O).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:O;this._$Em=i;let a=r.fromAttribute(t,n.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,n){if(e!==void 0){let r=this.constructor;if(i===!1&&(n=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??W)(n,t)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:r}=n,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,n,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[D("elementProperties")]=new Map,y[D("finalized")]=new Map,Fe?.({ReactiveElement:y}),(K.reactiveElementVersions??=[]).push("2.1.2");var oe=globalThis,me=o=>o,F=oe.trustedTypes,_e=F?F.createPolicy("lit-html",{createHTML:o=>o}):void 0,xe="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+S,Ve=`<${Ee}>`,C=document,L=()=>C.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",ne=Array.isArray,Xe=o=>ne(o)||typeof o?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ge=/>/g,N=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,$e=/"/g,we=/^(?:script|style|textarea|title)$/i,ae=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),d=ae(1),ct=ae(2),dt=ae(3),P=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ye=new WeakMap,A=C.createTreeWalker(C,129);function Se(o,e){if(!ne(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(e):e}var Ze=(o,e)=>{let t=o.length-1,s=[],i,n=e===2?"<svg>":e===3?"<math>":"",r=R;for(let a=0;a<t;a++){let l=o[a],u,f,p=-1,$=0;for(;$<l.length&&(r.lastIndex=$,f=r.exec(l),f!==null);)$=r.lastIndex,r===R?f[1]==="!--"?r=fe:f[1]!==void 0?r=ge:f[2]!==void 0?(we.test(f[2])&&(i=RegExp("</"+f[2],"g")),r=N):f[3]!==void 0&&(r=N):r===N?f[0]===">"?(r=i??R,p=-1):f[1]===void 0?p=-2:(p=r.lastIndex-f[2].length,u=f[1],r=f[3]===void 0?N:f[3]==='"'?$e:be):r===$e||r===be?r=N:r===fe||r===ge?r=R:(r=N,i=void 0);let w=r===N&&o[a+1].startsWith("/>")?" ":"";n+=r===R?l+Ve:p>=0?(s.push(u),l.slice(0,p)+xe+l.slice(p)+S+w):l+S+(p===-2?a:w)}return[Se(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},I=class o{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,r=0,a=e.length-1,l=this.parts,[u,f]=Ze(e,t);if(this.el=o.createElement(u,s),A.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=A.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(xe)){let $=f[r++],w=i.getAttribute(p).split(S),q=/([.?@])?(.*)/.exec($);l.push({type:1,index:n,name:q[2],strings:w,ctor:q[1]==="."?te:q[1]==="?"?se:q[1]==="@"?ie:M}),i.removeAttribute(p)}else p.startsWith(S)&&(l.push({type:6,index:n}),i.removeAttribute(p));if(we.test(i.tagName)){let p=i.textContent.split(S),$=p.length-1;if($>0){i.textContent=F?F.emptyScript:"";for(let w=0;w<$;w++)i.append(p[w],L()),A.nextNode(),l.push({type:2,index:++n});i.append(p[$],L())}}}else if(i.nodeType===8)if(i.data===Ee)l.push({type:2,index:n});else{let p=-1;for(;(p=i.data.indexOf(S,p+1))!==-1;)l.push({type:7,index:n}),p+=S.length-1}n++}}static createElement(e,t){let s=C.createElement("template");return s.innerHTML=e,s}};function U(o,e,t=o,s){if(e===P)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,n=z(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=U(o,i._$AS(o,e.values),i,s)),e}var ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??C).importNode(t,!0);A.currentNode=i;let n=A.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let u;l.type===2?u=new j(n,n.nextSibling,this,e):l.type===1?u=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(u=new re(n,this,e)),this._$AV.push(u),l=s[++a]}r!==l?.index&&(n=A.nextNode(),r++)}return A.currentNode=C,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},j=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),z(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==P&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Xe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=I.createElement(Se(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let n=new ee(i,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new I(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let n of e)i===t.length?t.push(s=new o(this.O(L()),this.O(L()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=me(e).nextSibling;me(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,i){let n=this.strings,r=!1;if(n===void 0)e=U(this,e,t,0),r=!z(e)||e!==this._$AH&&e!==P,r&&(this._$AH=e);else{let a=e,l,u;for(e=n[0],l=0;l<n.length-1;l++)u=U(this,a[s+l],t,l),u===P&&(u=this._$AH[l]),r||=!z(u)||u!==this._$AH[l],u===c?e=c:e!==c&&(e+=(u??"")+n[l+1]),this._$AH[l]=u}r&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},te=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},se=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},ie=class extends M{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??c)===P)return;let s=this._$AH,i=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},re=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var Je=oe.litHtmlPolyfillSupport;Je?.(I,j),(oe.litHtmlVersions??=[]).push("3.3.3");var ke=(o,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let n=t?.renderBefore??null;s._$litPart$=i=new j(e.insertBefore(L(),n),n,void 0,t??{})}return i._$AI(o),i};var le=globalThis,g=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ke(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};g._$litElement$=!0,g.finalized=!0,le.litElementHydrateSupport?.({LitElement:g});var Qe=le.litElementPolyfillSupport;Qe?.({LitElement:g});(le.litElementVersions??=[]).push("4.2.2");var T=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};var Ge={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:W},et=(o=Ge,e,t)=>{let{kind:s,metadata:i}=t,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(t.name,o),s==="accessor"){let{name:r}=t;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,l,o,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,o,a),a}}}if(s==="setter"){let{name:r}=t;return function(a){let l=this[r];e.call(this,a),this.requestUpdate(r,l,o,!0,a)}}throw Error("Unsupported decorator location: "+s)};function v(o){return(e,t)=>typeof t=="object"?et(o,e,t):((s,i,n)=>{let r=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(i,n):void 0})(o,e,t)}function m(o){return v({...o,state:!0,attribute:!1})}var Ne=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],Ae=["artnet-direct","artnet-controller","sacn","kinet"],Ce=["8bit","16bit","24bit","32bit"],X=["linear","quadratic","cubic","quadruple"],tt={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},st={"8bit":1,"16bit":2,"24bit":3,"32bit":4};function it(o){if(o.type==="binary"||o.type==="dimmer")return 1;let e=(o.channel_setup&&o.channel_setup.length?o.channel_setup:null)??tt[o.type];return e?e.length:1}function Z(o){let e=it(o),t=st[o.channel_size??"8bit"]??1,s=o.channel;return[s,s+e*t-1]}function Pe(o){return o.node_type==="artnet-controller"?"artnet-controller":`${o.node_type}:${o.host}:${o.port??"default"}`}function ce(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function Te(o){return`hsl(${o*137.5%360}, 45%, 45%)`}var Ue=o=>o.callWS({type:"artnet_led/patch/get"});var Me=(o,e)=>o.callWS({type:"artnet_led/patch/save",patch:e});var He=(o,e,t,s)=>o.connection.subscribeMessage(s,{type:"artnet_led/dmx/subscribe",node_key:e,universe:t});var De=k`
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
`,x=class extends g{constructor(){super(...arguments);this.isNew=!1;this.errorText=""}willUpdate(t){t.has("device")&&(this._working={...this.device})}_set(t,s){this._working={...this._working,[t]:s}}render(){let t=this._working,[s,i]=Z(t),n=t.type==="color_temp"||t.type==="rgbww";return d`
      <div class="backdrop" @click=${this._backdropClick}>
        <div class="dialog" @click=${r=>r.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${t.name??""}
            @input=${r=>this._set("name",r.target.value)}
          />

          <label>Friendly name (optional)</label>
          <input
            .value=${t.friendly_name??""}
            @input=${r=>this._set("friendly_name",r.target.value||void 0)}
          />

          <div class="row">
            <div>
              <label>Type</label>
              <select
                .value=${t.type}
                @change=${r=>this._set("type",r.target.value)}
              >
                ${Ne.map(r=>d`<option value=${r} ?selected=${t.type===r}>${r}</option>`)}
              </select>
            </div>
            <div>
              <label>DMX channel (1-512)</label>
              <input
                type="number"
                min="1"
                max="512"
                .value=${String(t.channel)}
                @input=${r=>this._set("channel",Number(r.target.value))}
              />
            </div>
          </div>
          <div class="hint">Occupies channels ${s}–${i}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${t.channel_size??"8bit"}
                @change=${r=>this._set("channel_size",r.target.value)}
              >
                ${Ce.map(r=>d`<option value=${r} ?selected=${(t.channel_size??"8bit")===r}>${r}</option>`)}
              </select>
            </div>
            <div>
              <label>Byte order</label>
              <select
                .value=${t.byte_order??"big"}
                @change=${r=>this._set("byte_order",r.target.value)}
              >
                <option value="big" ?selected=${(t.byte_order??"big")==="big"}>big</option>
                <option value="little" ?selected=${t.byte_order==="little"}>little</option>
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
                .value=${String(t.transition??0)}
                @input=${r=>this._set("transition",Number(r.target.value))}
              />
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${r=>{let a=r.target.value;this._set("output_correction",a===""?null:a)}}
              >
                <option value="" ?selected=${!t.output_correction}>universe default</option>
                ${X.map(r=>d`<option value=${r} ?selected=${t.output_correction===r}>${r}</option>`)}
              </select>
            </div>
          </div>

          <label>Channel setup (optional, e.g. rgbw / dCH)</label>
          <input
            .value=${typeof t.channel_setup=="string"?t.channel_setup:""}
            placeholder="type default"
            @input=${r=>this._set("channel_setup",r.target.value||null)}
          />

          ${n?d`
                <div class="row">
                  <div>
                    <label>Min temp</label>
                    <input
                      .value=${t.min_temp??"2700K"}
                      @input=${r=>this._set("min_temp",r.target.value)}
                    />
                  </div>
                  <div>
                    <label>Max temp</label>
                    <input
                      .value=${t.max_temp??"6500K"}
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
    `}_backdropClick(){this._cancel()}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};x.styles=De,h([v({attribute:!1})],x.prototype,"device",2),h([v({type:Boolean})],x.prototype,"isNew",2),h([v()],x.prototype,"errorText",2),h([m()],x.prototype,"_working",2),x=h([T("artnet-device-dialog")],x);var E=class extends g{constructor(){super(...arguments);this.isNew=!1;this.errorText=""}willUpdate(t){t.has("node")&&(this._working={...this.node})}_set(t,s){this._working={...this._working,[t]:s}}render(){let t=this._working;return d`
      <div class="backdrop" @click=${this._cancel}>
        <div class="dialog" @click=${s=>s.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${s=>this._set("node_type",s.target.value)}
          >
            ${Ae.map(s=>d`<option value=${s} ?selected=${t.node_type===s}>${s}</option>`)}
          </select>
          ${t.node_type==="artnet-controller"?d`<div class="hint">
                Controller mode discovers nodes and accepts DMX input. Only one controller can
                exist (it binds UDP 6454).
              </div>`:c}

          <label>Host (IP of the Art-Net node)</label>
          <input
            .value=${t.host??""}
            @input=${s=>this._set("host",s.target.value)}
          />

          <div class="row">
            <div>
              <label>Port (blank = protocol default)</label>
              <input
                type="number"
                .value=${t.port!=null?String(t.port):""}
                @input=${s=>{let i=s.target.value;this._set("port",i===""?null:Number(i))}}
              />
            </div>
            <div>
              <label>Max FPS (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                .value=${String(t.max_fps??25)}
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
                .value=${String(t.refresh_every??120)}
                @input=${s=>this._set("refresh_every",Number(s.target.value))}
              />
            </div>
            <div>
              <label>Host override (optional)</label>
              <input
                .value=${t.host_override??""}
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
    `}_cancel(){this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};E.styles=De,h([v({attribute:!1})],E.prototype,"node",2),h([v({type:Boolean})],E.prototype,"isNew",2),h([v()],E.prototype,"errorText",2),h([m()],E.prototype,"_working",2),E=h([T("artnet-node-dialog")],E);function Oe(o){return{id:ce(),channel:o,name:"",type:"dimmer",transition:0,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null}}function Re(){return{id:ce(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,universes:{0:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var b=class extends g{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this.readonly=!1;this._live=!1;this._values=[]}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await He(this.hass,this.nodeKey,this.universeNr,t=>{this._values=t.values})}catch(t){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${t}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let t=new Map;return(this.universe?.devices??[]).forEach((s,i)=>{let[n,r]=Z(s);for(let a=n;a<=Math.min(r,512);a++){let l=t.get(a);t.set(a,{device:s,index:i,first:a===n,overlap:!!l})}}),t}render(){let t=this._channelMap(),s=[];for(let i=1;i<=512;i++){let n=t.get(i),r=this._values[i-1],a=this._live&&r!==void 0?r/255:0;s.push(d`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}"
          style=${n?`--device-color: ${Te(n.index)}`:c}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${i}`:`Channel ${i}`}
          @click=${()=>this._cellClick(i,n?.device)}
        >
          ${this._live?d`<span class="heat" style="opacity: ${a}"></span>`:c}
          <span class="ch">${i}</span>
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
      <div class="grid">${s}</div>
    `}_cellClick(t,s){this.readonly||(s?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:s},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:t},bubbles:!0,composed:!0})))}};b.styles=k`
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
  `,h([v({attribute:!1})],b.prototype,"hass",2),h([v({attribute:!1})],b.prototype,"universe",2),h([v()],b.prototype,"nodeKey",2),h([v({type:Number})],b.prototype,"universeNr",2),h([v({type:Boolean})],b.prototype,"readonly",2),h([m()],b.prototype,"_live",2),h([m()],b.prototype,"_values",2),b=h([T("artnet-universe-grid")],b);var _=class extends g{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._yamlNodes=[];this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._beforeUnload=t=>{this._dirty&&t.preventDefault()}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let t=await Ue(this.hass);this._patch=t.patch??{nodes:[]},this._yamlNodes=t.yaml_nodes??[],this._loaded=!0,this._autoSelect()}catch(t){this._showToast(`Failed to load patch: ${t}`)}}_autoSelect(){this._selected||(this._patch.nodes.length?this._selectNode("ui:0"):this._yamlNodes.length&&this._selectNode("yaml:0"))}_selectNode(t){this._selected=t;let s=this._currentUniverses(),i=Object.keys(s??{}).sort((n,r)=>Number(n)-Number(r));this._selectedUniverse=i[0]??""}_currentNode(){let[t,s]=this._selected.split(":"),i=Number(s);if(t==="ui")return this._patch.nodes[i];if(t==="yaml")return this._yamlNodes[i]}_isYamlSelected(){return this._selected.startsWith("yaml:")}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}async _save(){this._saving=!0,this._errors=[];try{let t=await Me(this.hass,this._patch);t.success?(this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=t.errors,this._showToast("Patch has errors; nothing was saved"))}catch(t){this._showToast(`Save failed: ${t}`)}finally{this._saving=!1}}_showToast(t){this._toast=t,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}_addNode(){this._dialog={kind:"node",node:Re(),isNew:!0}}_editNode(){let t=this._currentNode();!t||this._isYamlSelected()||(this._dialog={kind:"node",node:t,isNew:!1})}_onSaveNode(t){let{node:s,original:i}=t.detail,n=this._patch.nodes,r=n.findIndex(a=>a.id===i.id);r>=0?n[r]=s:(n.push(s),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(t){let{node:s}=t.detail;this._patch.nodes=this._patch.nodes.filter(i=>i.id!==s.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){if(this._isYamlSelected())return;let t=this._currentNode();if(!t)return;let s=prompt("Universe number (0-1024):","0");if(s===null)return;let i=String(Number(s));if(Number.isNaN(Number(s))||Number(i)<0||Number(i)>1024){this._showToast("Universe must be a number between 0 and 1024");return}if(t.universes[i]){this._showToast(`Universe ${i} already exists`);return}t.universes={...t.universes,[i]:{send_partial_universe:!0,output_correction:"linear",devices:[]}},this._selectedUniverse=i,this._markDirty()}_removeUniverse(){if(this._isYamlSelected())return;let t=this._currentNode();if(!t||!this._selectedUniverse)return;let s=t.universes[this._selectedUniverse]?.devices??[];if(s.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${s.length} fixture(s)?`))return;let i={...t.universes};delete i[this._selectedUniverse],t.universes=i;let n=Object.keys(i).sort((r,a)=>Number(r)-Number(a));this._selectedUniverse=n[0]??"",this._markDirty()}_setUniverseOption(t,s){if(this._isYamlSelected())return;let n=this._currentNode()?.universes[this._selectedUniverse];n&&(n[t]=s,this._markDirty())}_onAddDevice(t){this._isYamlSelected()||(this._dialog={kind:"device",device:Oe(t.detail.channel),isNew:!0,universeNr:this._selectedUniverse})}_onEditDevice(t){this._isYamlSelected()||(this._dialog={kind:"device",device:t.detail.device,isNew:!1,universeNr:this._selectedUniverse})}_onSaveDevice(t){let{device:s,original:i}=t.detail;if(this._dialog.kind!=="device")return;let r=this._currentNode()?.universes[this._dialog.universeNr];if(!r)return;let a=r.devices.findIndex(l=>l.id===i.id);a>=0?r.devices[a]=s:r.devices.push(s),r.devices=[...r.devices],this._dialog={kind:"none"},this._markDirty()}_onDeleteDevice(t){let{device:s}=t.detail;if(this._dialog.kind!=="device")return;let n=this._currentNode()?.universes[this._dialog.universeNr];n&&(n.devices=n.devices.filter(r=>r.id!==s.id),this._dialog={kind:"none"},this._markDirty())}render(){if(!this._loaded)return d`<div class="loading">Loading DMX patch…</div>`;let t=this._currentNode(),s=this._isYamlSelected(),i=this._currentUniverses()??{},n=Object.keys(i).sort((a,l)=>Number(a)-Number(l)),r=i[this._selectedUniverse];return d`
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
          ${t?d`
                <div class="node-bar">
                  <h2>${t.host} <small>(${t.node_type})</small></h2>
                  ${s?c:d`<button @click=${this._editNode}>Node settings</button>`}
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
                            ${X.map(a=>d`<option
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
                        .nodeKey=${Pe(t)}
                        ?readonly=${s}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
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
    `}};_.styles=k`
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
  `,h([v({attribute:!1})],_.prototype,"hass",2),h([v({type:Boolean})],_.prototype,"narrow",2),h([m()],_.prototype,"_patch",2),h([m()],_.prototype,"_yamlNodes",2),h([m()],_.prototype,"_loaded",2),h([m()],_.prototype,"_dirty",2),h([m()],_.prototype,"_saving",2),h([m()],_.prototype,"_errors",2),h([m()],_.prototype,"_toast",2),h([m()],_.prototype,"_selected",2),h([m()],_.prototype,"_selectedUniverse",2),h([m()],_.prototype,"_dialog",2),_=h([T("artnet-patch-panel")],_);export{_ as ArtnetPatchPanel};
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
