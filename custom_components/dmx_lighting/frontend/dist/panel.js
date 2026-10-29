var It=Object.defineProperty;var Ht=Object.getOwnPropertyDescriptor;var p=(o,r,e,t)=>{for(var i=t>1?void 0:t?Ht(r,e):r,n=o.length-1,s;n>=0;n--)(s=o[n])&&(i=(t?s(r,e,i):s(i))||i);return t&&i&&It(r,e,i),i};var ie=globalThis,se=ie.ShadowRoot&&(ie.ShadyCSS===void 0||ie.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),We=new WeakMap,V=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(se&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=We.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&We.set(e,r))}return r}toString(){return this.cssText}},Ke=o=>new V(typeof o=="string"?o:o+"",void 0,ke),E=(o,...r)=>{let e=o.length===1?o[0]:r.reduce((t,i,n)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new V(e,o,ke)},Ve=(o,r)=>{if(se)o.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),i=ie.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,o.appendChild(t)}},Ee=se?o=>o:o=>o instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return Ke(e)})(o):o;var{is:Lt,defineProperty:zt,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Ft,getOwnPropertySymbols:jt,getPrototypeOf:Bt}=Object,ne=globalThis,Xe=ne.trustedTypes,qt=Xe?Xe.emptyScript:"",Wt=ne.reactiveElementPolyfillSupport,X=(o,r)=>o,Y={toAttribute(o,r){switch(r){case Boolean:o=o?qt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,r){let e=o;switch(r){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},oe=(o,r)=>!Lt(o,r),Ye={attribute:!0,type:String,converter:Y,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??=Symbol("metadata"),ne.litPropertyMetadata??=new WeakMap;var U=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Ye){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(r,t,e);i!==void 0&&zt(this.prototype,r,i)}}static getPropertyDescriptor(r,e,t){let{get:i,set:n}=Ot(this.prototype,r)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let a=i?.call(this);n?.call(this,s),this.requestUpdate(r,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Ye}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;let r=Bt(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){let e=this.properties,t=[...Ft(e),...jt(e)];for(let i of t)this.createProperty(i,e[i])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let i of t)e.unshift(Ee(i))}else r!==void 0&&e.push(Ee(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ve(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,t);if(i!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:Y).toAttribute(e,t.type);this._$Em=r,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(r,e){let t=this.constructor,i=t._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let n=t.getPropertyOptions(i),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Y;this._$Em=i;let a=s.fromAttribute(e,n.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(r,e,t,i=!1,n){if(r!==void 0){let s=this.constructor;if(i===!1&&(n=this[r]),t??=s.getPropertyOptions(r),!((t.hasChanged??oe)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(r)&&!this.hasAttribute(s._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:i,wrapped:n},s){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,s??e??this[r]),n!==!0||s!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,n]of t){let{wrapped:s}=n,a=this[i];s!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,n,a)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[X("elementProperties")]=new Map,U[X("finalized")]=new Map,Wt?.({ReactiveElement:U}),(ne.reactiveElementVersions??=[]).push("2.1.2");var Pe=globalThis,Ge=o=>o,ae=Pe.trustedTypes,Ze=ae?ae.createPolicy("lit-html",{createHTML:o=>o}):void 0,rt="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,it="?"+I,Kt=`<${it}>`,F=document,Z=()=>F.createComment(""),J=o=>o===null||typeof o!="object"&&typeof o!="function",Ue=Array.isArray,Vt=o=>Ue(o)||typeof o?.[Symbol.iterator]=="function",Se=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Je=/-->/g,Qe=/>/g,z=RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),De=/'/g,et=/"/g,st=/^(?:script|style|textarea|title)$/i,Re=o=>(r,...e)=>({_$litType$:o,strings:r,values:e}),c=Re(1),nt=Re(2),dr=Re(3),j=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),tt=new WeakMap,O=F.createTreeWalker(F,129);function ot(o,r){if(!Ue(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ze!==void 0?Ze.createHTML(r):r}var Xt=(o,r)=>{let e=o.length-1,t=[],i,n=r===2?"<svg>":r===3?"<math>":"",s=G;for(let a=0;a<e;a++){let l=o[a],d,v,h=-1,g=0;for(;g<l.length&&(s.lastIndex=g,v=s.exec(l),v!==null);)g=s.lastIndex,s===G?v[1]==="!--"?s=Je:v[1]!==void 0?s=Qe:v[2]!==void 0?(st.test(v[2])&&(i=RegExp("</"+v[2],"g")),s=z):v[3]!==void 0&&(s=z):s===z?v[0]===">"?(s=i??G,h=-1):v[1]===void 0?h=-2:(h=s.lastIndex-v[2].length,d=v[1],s=v[3]===void 0?z:v[3]==='"'?et:De):s===et||s===De?s=z:s===Je||s===Qe?s=G:(s=z,i=void 0);let _=s===z&&o[a+1].startsWith("/>")?" ":"";n+=s===G?l+Kt:h>=0?(t.push(d),l.slice(0,h)+rt+l.slice(h)+I+_):l+I+(h===-2?a:_)}return[ot(o,n+(o[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},Q=class o{constructor({strings:r,_$litType$:e},t){let i;this.parts=[];let n=0,s=0,a=r.length-1,l=this.parts,[d,v]=Xt(r,e);if(this.el=o.createElement(d,t),O.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=O.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(rt)){let g=v[s++],_=i.getAttribute(h).split(I),N=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:N[2],strings:_,ctor:N[1]==="."?Ce:N[1]==="?"?Te:N[1]==="@"?Me:K}),i.removeAttribute(h)}else h.startsWith(I)&&(l.push({type:6,index:n}),i.removeAttribute(h));if(st.test(i.tagName)){let h=i.textContent.split(I),g=h.length-1;if(g>0){i.textContent=ae?ae.emptyScript:"";for(let _=0;_<g;_++)i.append(h[_],Z()),O.nextNode(),l.push({type:2,index:++n});i.append(h[g],Z())}}}else if(i.nodeType===8)if(i.data===it)l.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(I,h+1))!==-1;)l.push({type:7,index:n}),h+=I.length-1}n++}}static createElement(r,e){let t=F.createElement("template");return t.innerHTML=r,t}};function W(o,r,e=o,t){if(r===j)return r;let i=t!==void 0?e._$Co?.[t]:e._$Cl,n=J(r)?void 0:r._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(r=W(o,i._$AS(o,r.values),i,t)),r}var Ae=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,i=(r?.creationScope??F).importNode(e,!0);O.currentNode=i;let n=O.nextNode(),s=0,a=0,l=t[0];for(;l!==void 0;){if(s===l.index){let d;l.type===2?d=new D(n,n.nextSibling,this,r):l.type===1?d=new l.ctor(n,l.name,l.strings,this,r):l.type===6&&(d=new Ne(n,this,r)),this._$AV.push(d),l=t[++a]}s!==l?.index&&(n=O.nextNode(),s++)}return O.currentNode=F,i}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},D=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=W(this,r,e),J(r)?r===u||r==null||r===""?(this._$AH!==u&&this._$AR(),this._$AH=u):r!==this._$AH&&r!==j&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Vt(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==u&&J(this._$AH)?this._$AA.nextSibling.data=r:this.T(F.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,i=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=Q.createElement(ot(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Ae(i,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(r){let e=tt.get(r.strings);return e===void 0&&tt.set(r.strings,e=new Q(r)),e}k(r){Ue(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let n of r)i===e.length?e.push(t=new o(this.O(Z()),this.O(Z()),this,this.options)):t=e[i],t._$AI(n),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Ge(r).nextSibling;Ge(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,i,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(r,e=this,t,i){let n=this.strings,s=!1;if(n===void 0)r=W(this,r,e,0),s=!J(r)||r!==this._$AH&&r!==j,s&&(this._$AH=r);else{let a=r,l,d;for(r=n[0],l=0;l<n.length-1;l++)d=W(this,a[t+l],e,l),d===j&&(d=this._$AH[l]),s||=!J(d)||d!==this._$AH[l],d===u?r=u:r!==u&&(r+=(d??"")+n[l+1]),this._$AH[l]=d}s&&!i&&this.j(r)}j(r){r===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Ce=class extends K{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===u?void 0:r}},Te=class extends K{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==u)}},Me=class extends K{constructor(r,e,t,i,n){super(r,e,t,i,n),this.type=5}_$AI(r,e=this){if((r=W(this,r,e,0)??u)===j)return;let t=this._$AH,i=r===u&&t!==u||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,n=r!==u&&(t===u||i);i&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Ne=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){W(this,r)}};var Yt=Pe.litHtmlPolyfillSupport;Yt?.(Q,D),(Pe.litHtmlVersions??=[]).push("3.3.3");var at=(o,r,e)=>{let t=e?.renderBefore??r,i=t._$litPart$;if(i===void 0){let n=e?.renderBefore??null;t._$litPart$=i=new D(r.insertBefore(Z(),n),n,void 0,e??{})}return i._$AI(o),i};var Ie=globalThis,x=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=at(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};x._$litElement$=!0,x.finalized=!0,Ie.litElementHydrateSupport?.({LitElement:x});var Gt=Ie.litElementPolyfillSupport;Gt?.({LitElement:x});(Ie.litElementVersions??=[]).push("4.2.2");var S=o=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,r)}):customElements.define(o,r)};var Zt={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:oe},Jt=(o=Zt,r,e)=>{let{kind:t,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),t==="accessor"){let{name:s}=e;return{set(a){let l=r.get.call(this);r.set.call(this,a),this.requestUpdate(s,l,o,!0,a)},init(a){return a!==void 0&&this.C(s,void 0,o,a),a}}}if(t==="setter"){let{name:s}=e;return function(a){let l=this[s];r.call(this,a),this.requestUpdate(s,l,o,!0,a)}}throw Error("Unsupported decorator location: "+t)};function f(o){return(r,e)=>typeof e=="object"?Jt(o,r,e):((t,i,n)=>{let s=i.hasOwnProperty(n);return i.constructor.createProperty(n,t),s?Object.getOwnPropertyDescriptor(i,n):void 0})(o,r,e)}function m(o){return f({...o,state:!0,attribute:!1})}var lt=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],ct=["artnet-direct","sacn","kinet"],dt=["8bit","16bit","24bit","32bit"],ce=["linear","quadratic","cubic","quadruple"],pt={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},Qt={"8bit":1,"16bit":2,"24bit":3,"32bit":4},de={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},pe={d:"Dimmer",r:"Red",R:"Red (unscaled)",g:"Green",G:"Green (unscaled)",b:"Blue",B:"Blue (unscaled)",w:"White",W:"White (unscaled)",c:"Cool white",C:"Cool white (unscaled)",h:"Warm white",H:"Warm white (unscaled)",t:"Color temp (0 = warm)",T:"Color temp (0 = cold)",u:"Hue",U:"Saturation",x:"X (CIE)",y:"Y (CIE)"},ut=32;function ee(o){return typeof o=="number"}function H(o){return!!o.channel_setup&&o.channel_setup.length>0}function He(o){if(o.type==="binary")return["d"];let r=H(o)?o.channel_setup:pt[o.type];return r?Array.from(r):["d"]}function ue(o,r){let e=He(o)[r],t=o.channel_labels?.[r]||"";return e===void 0?{text:"",dummy:!1}:ee(e)?{text:t||"Fixed",dummy:!0,value:e}:{text:t||pe[e]||e,dummy:!1}}function Le(o){if(o.type==="binary")return 1;let r=H(o)?o.channel_setup:pt[o.type];return r?r.length:1}function te(o){return Qt[o.channel_size??"8bit"]??1}function A(o){let r=Le(o),e=o.channel;return[e,e+r*te(o)-1]}function L(o){return o==="sacn"?1:0}function ht(o){return`${o.node_type}:${o.host}:${o.port??"default"}`}function re(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function he(o){return`hsl(${o*137.5%360}, 45%, 45%)`}function ve(o,r,e,t,i){let n=r[`dmx:${e}/${t}/${i.channel}`];if(n)return n;let s=`light.${fe(i.name??"")}`;if(Object.values(r).includes(s)||o?.states?.[s])return s}function me(o,r){o.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))}function vt(o,r){return o.transition??r?.transition??0}function fe(o){return o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}var mt=o=>o.callWS({type:"dmx_lighting/patch/get"});var ft=(o,r)=>o.callWS({type:"dmx_lighting/patch/save",patch:r}),gt=(o,r)=>o.callWS({type:"dmx_lighting/patch/export",patch:r}),bt=(o,r)=>o.callWS({type:"dmx_lighting/patch/import",content:r});var _t=o=>o.callWS({type:"dmx_lighting/entity_map/get"}),xt=(o,r,e,t)=>o.connection.subscribeMessage(t,{type:"dmx_lighting/dmx/subscribe",node_key:r,universe:e}),yt=(o,r,e,t=1)=>o.connection.subscribeMessage(()=>{},{type:"dmx_lighting/effect/preview",preview_id:r,preset:e,level:t}),$t=(o,r,e,t)=>o.callWS({type:"dmx_lighting/effect/preview/update",preview_id:r,preset:e,...t===void 0?{}:{level:t}}),wt=(o,r,e,t)=>o.callWS({type:"call_service",domain:r,service:e,service_data:t});var B="#fixed";function kt(o){return He(o).map((r,e)=>({fn:ee(r)?B:r,value:ee(r)?r:0,label:o.channel_labels?.[e]??""}))}function ze(o,r){return o.fn===B?!Number.isInteger(o.value)||o.value<0||o.value>255?"Value must be 0\u2013255":"":de[r]?.includes(o.fn)?"":`Not available for ${r}`}function Dt(o){if(!o.length)return{channel_setup:null,channel_labels:null};let r=o.map(i=>i.fn===B?i.value:i.fn),e=o.map(i=>i.fn===B&&i.label.trim()?i.label.trim():null);for(;e.length&&e[e.length-1]===null;)e.pop();return{channel_setup:r.some(i=>ee(i))?r:r.join(""),channel_labels:e.length?e:null}}var Oe=!1;function ge(o){Oe=o.target===o.currentTarget}function be(o){let r=Oe&&o.target===o.currentTarget;return Oe=!1,r}var _e=E`
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
`,$=class extends x{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this.entityId="";this.nodeTransition=null;this._count=1;this._suspended=!1;this._rows=null}disconnectedCallback(){super.disconnectedCallback(),this._stopWatching?.()}_openEntity(){this._suspended=!0,me(this,this.entityId);let e=()=>document.querySelector("home-assistant")?.shadowRoot?.querySelector("ha-more-info-dialog"),t=()=>{this._stopWatching?.(),this._suspended=!1},i=s=>{s.detail?.dialog==="ha-more-info-dialog"&&t()};window.addEventListener("dialog-closed",i);let n=window.setInterval(()=>{let s=e();(!s||!s._entityId)&&t()},500);this._stopWatching=()=>{window.removeEventListener("dialog-closed",i),window.clearInterval(n),this._stopWatching=void 0}}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1,this._rows=H(this.device)?kt(this.device):null)}_set(e,t){this._working={...this._working,[e]:t}}_renderEntity(){if(this.isNew)return u;if(!this.entityId)return c`<div class="entity-row muted">
        No entity yet — it is created when you Save &amp; Apply.
      </div>`;let e=this.hass?.states?.[this.entityId],t=e?.state??"unknown",i=e?.attributes?.friendly_name??"";return c`
      <div class="entity-row">
        <span class="dot ${t}" title=${t}></span>
        <span class="entity-text">
          <code>${this.entityId}</code>
          <small>${i&&i!==this.entityId?`${i} \xB7 `:""}${t}</small>
        </span>
        <button
          class="open-entity"
          title="Open the entity (controls, history, settings)"
          @click=${this._openEntity}
        >
          Open entity
        </button>
      </div>
    `}_setRows(e){this._rows=e,this._working={...this._working,...e?Dt(e):{channel_setup:null,channel_labels:null}}}_setType(e){this._set("type",e),e==="binary"&&this._rows&&this._setRows(null)}_toggleCustom(e){if(!e){this._setRows(null);return}let t=kt({...this._working,channel_setup:null,channel_labels:null});this._setRows(t)}_updateRow(e,t){let i=[...this._rows??[]];i[e]={...i[e],...t},this._setRows(i)}_addRow(e){let t=de[this._working.type]??"",i=e||!t?{fn:B,value:0,label:""}:{fn:t[0],value:0,label:""};this._setRows([...this._rows??[],i])}_moveRow(e,t){let i=[...this._rows??[]],n=e+t;n<0||n>=i.length||([i[e],i[n]]=[i[n],i[e]],this._setRows(i))}_removeRow(e){let t=(this._rows??[]).filter((i,n)=>n!==e);this._setRows(t)}_renderChannels(){let e=this._working;if(e.type==="binary")return u;let t=this._rows,i=de[e.type]??"";return c`
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
              ${t.map((n,s)=>{let a=ze(n,e.type),l=n.fn===B;return c`
                  <div class="ch-row ${a?"invalid":""}" title=${a}>
                    <span class="ch-nr">${e.channel+s*te(e)}</span>
                    <select
                      aria-label="Channel ${s+1} function"
                      @change=${d=>this._updateRow(s,{fn:d.target.value})}
                    >
                      ${[...i].map(d=>c`<option value=${d} ?selected=${n.fn===d}>
                            ${pe[d]??d}
                          </option>`)}
                      ${!l&&!i.includes(n.fn)?c`<option value=${n.fn} selected>${pe[n.fn]??n.fn}</option>`:u}
                      <option value=${B} ?selected=${l}>Dummy (fixed value)</option>
                    </select>
                    ${l?c`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${ut}
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
                        `:c`<span class="ch-fill">follows light</span>`}
                    <span class="ch-tools">
                      <button class="icon" title="Move up" ?disabled=${s===0}
                        @click=${()=>this._moveRow(s,-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${s===t.length-1}
                        @click=${()=>this._moveRow(s,1)}>↓</button>
                      <button class="icon" title="Remove channel" ?disabled=${t.length===1}
                        @click=${()=>this._removeRow(s)}>✕</button>
                    </span>
                    ${a?c`<span class="ch-problem">${a}</span>`:u}
                  </div>
                `})}
            </div>
            <div class="ch-add">
              ${i?c`<button @click=${()=>this._addRow(!1)}>+ Light channel</button>`:u}
              <button @click=${()=>this._addRow(!0)}>+ Dummy channel</button>
            </div>
          `:u}
    `}render(){let e=this._working,[t,i]=A(e),n=e.type==="color_temp"||e.type==="rgbww";return c`
      <div
        class="backdrop"
        style=${this._suspended?"visibility: hidden":""}
        @pointerdown=${ge}
        @click=${s=>be(s)&&this._cancel()}
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
                    </div>`:u}
              `:u}

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
                ${lt.map(s=>c`<option value=${s} ?selected=${e.type===s}>${s}</option>`)}
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
          <div class="hint">Occupies channels ${t}–${i}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${e.channel_size??"8bit"}
                @change=${s=>this._set("channel_size",s.target.value)}
              >
                ${dt.map(s=>c`<option value=${s} ?selected=${(e.channel_size??"8bit")===s}>${s}</option>`)}
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
                ${ce.map(s=>c`<option value=${s} ?selected=${e.output_correction===s}>${s}</option>`)}
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
              `:u}

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:u}

          <div class="actions">
            ${this.isNew?u:c`<button class="danger" @click=${this._delete}>Delete</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}let e=(this._rows??[]).findIndex(t=>ze(t,this._working.type));if(e>=0){this.errorText=`Channel ${e+1}: ${ze(this._rows[e],this._working.type)}`;return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};$.styles=[_e,E`
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
    `],p([f({attribute:!1})],$.prototype,"device",2),p([f({type:Boolean})],$.prototype,"isNew",2),p([f()],$.prototype,"errorText",2),p([f({attribute:!1})],$.prototype,"hass",2),p([f()],$.prototype,"entityId",2),p([f({attribute:!1})],$.prototype,"nodeTransition",2),p([m()],$.prototype,"_working",2),p([m()],$.prototype,"_count",2),p([m()],$.prototype,"_suspended",2),p([m()],$.prototype,"_rows",2),$=p([S("dmx-device-dialog")],$);var M=class extends x{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_overrides(){return Object.values(this._working.universes??{}).reduce((e,t)=>e+(t.devices??[]).filter(i=>i.transition!=null).length,0)}_renderTransitionOverrides(){let e=this._overrides();return c`<div class="hint">
      Fade time for fixtures that leave their own transition blank; a fixture's own value
      (even 0) wins.
      ${e?c`<br />${e} fixture${e===1?" sets its":"s set their"} own transition.
            <a href="#" @click=${this._clearOverrides}>Make all use this default</a>`:u}
    </div>`}_clearOverrides(e){e.preventDefault();let t=Object.fromEntries(Object.entries(this._working.universes??{}).map(([i,n])=>[i,{...n,devices:(n.devices??[]).map(s=>({...s,transition:null}))}]));this._working={...this._working,universes:t}}_set(e,t){this._working={...this._working,[e]:t}}_addUniverse(){let e=Number(this._newUniverse),t=L(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<t||e>1024){this.errorText=`Universe must be a whole number between ${t} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let t={...this._working.universes};delete t[e],this._working={...this._working,universes:t}}render(){let e=this._working;return c`
      <div
        class="backdrop"
        @pointerdown=${ge}
        @click=${t=>be(t)&&this._cancel()}
      >
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${t=>this._set("node_type",t.target.value)}
          >
            ${ct.map(t=>c`<option value=${t} ?selected=${e.node_type===t}>${t}</option>`)}
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
                @input=${t=>{let i=t.target.value;this._set("port",i===""?null:Number(i))}}
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
                @input=${t=>{let i=t.target.value;this._set("transition",i===""?null:Number(i))}}
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
              `:u}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(e.universes).sort((t,i)=>Number(t)-Number(i)).map(t=>{let i=e.universes[t]?.devices?.length??0,n=Number(t)<L(e.node_type);return c`
                  <span class="chip ${n?"invalid":""}"
                    title=${n?`Universe ${t} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:i?`${i} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${t}`}
                  >
                    ${t}${i?c` <small>(${i})</small>`:u}
                    ${i?u:c`<button class="chip-x" @click=${()=>this._removeUniverse(t)}>
                          ×
                        </button>`}
                  </span>
                `})}
          </div>
          <div class="row">
            <input
              type="number"
              min=${L(e.node_type)}
              max="1024"
              placeholder="Universe number (${L(e.node_type)}-1024)"
              .value=${this._newUniverse}
              @input=${t=>this._newUniverse=t.target.value}
              @keydown=${t=>t.key==="Enter"&&this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:u}

          <div class="actions">
            ${this.isNew?u:c`<button class="danger" @click=${this._delete}>Delete node</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let t=L(this._working.node_type),i=Object.keys(this._working.universes).filter(n=>Number(n)<t);if(i.length){this.errorText=`Universe ${i.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${t}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};M.styles=_e,p([f({attribute:!1})],M.prototype,"node",2),p([f({type:Boolean})],M.prototype,"isNew",2),p([f()],M.prototype,"errorText",2),p([m()],M.prototype,"_working",2),p([m()],M.prototype,"_newUniverse",2),M=p([S("dmx-node-dialog")],M);var T=class extends x{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return c`
      <div
        class="backdrop"
        @pointerdown=${ge}
        @click=${e=>be(e)&&this._cancel()}
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

          ${this._error?c`<div class="error">${this._error}</div>`:u}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode==="add"?"Add":"Renumber"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let t=String(e);if(t!==this.current&&this.existing.includes(t)){this._error=`Universe ${t} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:t},bubbles:!0,composed:!0}))}};T.styles=_e,p([f()],T.prototype,"mode",2),p([f({type:Number})],T.prototype,"minUniverse",2),p([f()],T.prototype,"current",2),p([f({attribute:!1})],T.prototype,"existing",2),p([m()],T.prototype,"_value",2),p([m()],T.prototype,"_error",2),T=p([S("dmx-universe-dialog")],T);var R=class extends x{constructor(){super(...arguments);this.yamlText="";this.errorText="";this._text="";this._copied=!1}willUpdate(e){e.has("yamlText")&&(this._text=this.yamlText)}render(){return c`
      <div
        class="backdrop"
        @pointerdown=${ge}
        @click=${e=>be(e)&&this._cancel()}
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

          ${this.errorText?c`<div class="error">${this.errorText}</div>`:u}

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
    `}async _copy(){try{await navigator.clipboard.writeText(this._text),this._copied=!0,setTimeout(()=>this._copied=!1,1500)}catch{this.errorText="Clipboard unavailable \u2014 select the text and copy manually"}}_download(){let e=new Blob([this._text],{type:"application/yaml"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download="dmx_patch.yaml",i.click(),URL.revokeObjectURL(t)}_pickFile(){let e=document.createElement("input");e.type="file",e.accept=".yaml,.yml,.json,.txt",e.onchange=async()=>{let t=e.files?.[0];t&&(this._text=await t.text(),this.errorText="")},e.click()}_import(){this.dispatchEvent(new CustomEvent("import-patch",{detail:{content:this._text},bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}};R.styles=[_e,E`
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
    `],p([f()],R.prototype,"yamlText",2),p([f()],R.prototype,"errorText",2),p([m()],R.prototype,"_text",2),p([m()],R.prototype,"_copied",2),R=p([S("dmx-yaml-dialog")],R);function Et(o){return{id:re(),channel:o,name:"",type:"dimmer",transition:null,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null,channel_labels:null}}function St(){return{id:re(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var C=class extends x{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await xt(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((t,i)=>{let[n,s]=A(t);for(let a=n;a<=Math.min(s,512);a++){let l=e.get(a);e.set(a,{device:t,index:i,first:a===n,overlap:!!l})}}),e}render(){let e=this._channelMap(),t=[];for(let i=1;i<=512;i++){let n=e.get(i),s=this._values[i-1],a=this._live&&s!==void 0?s/255:0,l=this._dropTarget,d=n?ue(n.device,Math.floor((i-n.device.channel)/te(n.device))):void 0,v=!!d&&H(n.device),h=l&&i>=l.first&&i<=l.last;t.push(c`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}
            ${d?.dummy?"dummy":""}
            ${h?l.valid?"drop-ok":"drop-bad":""}"
          style=${n?`--device-color: ${he(n.index)}`:u}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${i}: ${d.text}${d.dummy?` (fixed ${d.value})`:""} \u2014 drag to move`:`Channel ${i}`}
          draggable=${n?"true":"false"}
          @click=${()=>this._cellClick(i,n?.device)}
          @dragstart=${n?g=>this._dragStart(g,i,n.device):u}
          @dragover=${g=>this._dragOver(g,i)}
          @drop=${g=>this._drop(g)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?c`<span class="heat" style="opacity: ${a}"></span>`:u}
          <span class="top">
            <span class="ch">${i}</span>
            ${d?.dummy&&!this._live?c`<span class="fixed">${d.value}</span>`:u}
          </span>
          ${n?.first?c`<span class="name">${n.device.name}</span>`:u}
          ${v&&(d.dummy||!n.first)?c`<span class="role">${d.text}</span>`:u}
          ${this._live&&s!==void 0?c`<span class="val">${s}</span>`:u}
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
    `}_dragStart(e,t,i){let[n]=A(i);this._dragInfo={device:i,offset:t-n},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",i.id)}_dragOver(e,t){let i=this._dragInfo;if(!i)return;let[n,s]=A(i.device),a=s-n+1,l=t-i.offset,d=l+a-1,v=l>=1&&d<=512&&!this._collides(i.device.id,l,d);(this._dropTarget?.first!==l||this._dropTarget?.last!==d||this._dropTarget?.valid!==v)&&(this._dropTarget={first:l,last:d,valid:v}),v&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,t,i){return(this.universe?.devices??[]).some(n=>{if(n.id===e)return!1;let[s,a]=A(n);return t<=a&&i>=s})}_drop(e){e.preventDefault();let t=this._dragInfo,i=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!t||!i?.valid)&&A(t.device)[0]!==i.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:t.device.id,channel:i.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,t){t?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0}))}};C.styles=E`
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
  `,p([f({attribute:!1})],C.prototype,"hass",2),p([f({attribute:!1})],C.prototype,"universe",2),p([f()],C.prototype,"nodeKey",2),p([f({type:Number})],C.prototype,"universeNr",2),p([m()],C.prototype,"_live",2),p([m()],C.prototype,"_values",2),p([m()],C.prototype,"_dropTarget",2),C=p([S("dmx-universe-grid")],C);var w=class extends x{constructor(){super(...arguments);this.nodeIndex=0;this.errors=[];this.addUniverse="";this.entityMap={};this._filter="";this._sort="address";this._desc=!1}_rows(){let e=[],t=this.node?.universes??{};for(let[i,n]of Object.entries(t)){let s=n.devices??[],a=s.map(l=>A(l));s.forEach((l,d)=>{let[v,h]=a[d],g=a.some(([P,q],Rt)=>Rt!==d&&v<=q&&h>=P),_=`nodes/${this.nodeIndex}/universes/${i}/devices/${d}`,N=this.errors.filter(P=>P.path===_||P.path.startsWith(`${_}/`));e.push({device:l,universe:i,index:d,first:v,last:h,overlap:g,errors:N})})}return e}_visibleRows(){let e=this._filter.trim().toLowerCase(),t=this._rows().filter(s=>{if(!e)return!0;let a=s.device,l=(a.channel_labels??[]).filter(Boolean).join(" ");return[a.name,a.friendly_name??"",a.type,`light.${fe(a.name)}`,l].join(" ").toLowerCase().includes(e)}),i=(s,a)=>Number(s.universe)-Number(a.universe)||s.first-a.first,n={address:i,name:(s,a)=>s.device.name.localeCompare(a.device.name)||i(s,a),type:(s,a)=>s.device.type.localeCompare(a.device.type)||i(s,a)};return t.sort(n[this._sort]),this._desc&&t.reverse(),t}_setSort(e){this._sort===e?this._desc=!this._desc:(this._sort=e,this._desc=!1)}_header(e,t){let i=this._sort===e;return c`<th
      class="sortable ${i?"active":""}"
      aria-sort=${i?this._desc?"descending":"ascending":"none"}
      @click=${()=>this._setSort(e)}
    >
      ${t}<span class="arrow">${i?this._desc?"\u25BC":"\u25B2":""}</span>
    </th>`}_layout(e){let t=Le(e),i=[];for(let n=0;n<t;n++){let s=ue(e,n);i.push(s.dummy?c`<span class="part dummy" title="Dummy channel, fixed value ${s.value}"
              >${s.text} <b>${s.value}</b></span
            >`:c`<span class="part">${s.text}</span>`)}return c`${i}${H(e)?u:c`<span class="default">default</span>`}`}_liveTile(e,t){let i=e?this.hass?.states?.[e]:void 0;if(!i)return c`<div class="tile none" title="No entity yet — Save & Apply">–</div>`;if(i.state!=="on"){let q=i.state==="off"?"off":i.state;return c`<div class="tile off ${i.state}" title=${`${e}: ${q}`}>${q}</div>`}let n=i.attributes??{},s=Array.isArray(n.rgb_color)?n.rgb_color:[255,255,255],a=typeof n.brightness=="number"?n.brightness:255,l=Math.round(a/255*100),[d,v,h]=s.map(q=>Math.round(Number(q)||0)),g=`rgb(${d}, ${v}, ${h})`,_=(.299*d+.587*v+.114*h)/255,N=l>=50&&_>.6?"#000":"#fff",P=[Array.isArray(n.rgb_color)?`RGB ${d}, ${v}, ${h}`:"",typeof n.color_temp_kelvin=="number"?`${n.color_temp_kelvin} K`:"",`${l}%`].filter(Boolean).join(" \xB7 ");return c`<div
      class="tile on"
      style="--tile-color: ${g}; --tile-level: ${l}%; --tile-ink: ${N}"
      title="${e} (${t.type}): ${P}"
    >
      <span class="fill"></span>
      <span class="pct">${l}%</span>
    </div>`}_state(e){let t=e?this.hass?.states?.[e]?.state:void 0;return t?c`<span class="state ${t}" title=${t}></span>`:c`<span class="state none" title="Not created yet — Save & Apply">–</span>`}render(){let e=this._rows(),t=this._visibleRows(),i=Object.keys(this.node?.universes??{}),n=e.reduce((s,a)=>s+(a.last-a.first+1),0);return c`
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
          ${i.length} universe${i.length===1?"":"s"}
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
                  ${t.map(s=>{let a=s.device,l=ve(this.hass,this.entityMap,this.node.host,s.universe,a),d=l??`light.${fe(a.name)}`,v=s.errors.length?s.errors.map(h=>h.message).join(`
`):s.overlap?"Overlaps another fixture":"";return c`
                      <tr
                        class=${v?"invalid":""}
                        tabindex="0"
                        title=${v||`Edit ${a.name}`}
                        @click=${()=>this._edit(s)}
                        @keydown=${h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),this._edit(s))}}
                      >
                        <td class="swatch-col">
                          <span class="swatch" style="background: ${he(s.index)}"></span>
                        </td>
                        <td>
                          <div class="name">${a.name}</div>
                          ${a.friendly_name?c`<div class="sub">${a.friendly_name}</div>`:u}
                          <div class="entity">
                            ${this._state(l)}${l?c`<button
                                  class="entity-link"
                                  title="Open ${l}"
                                  @click=${h=>{h.stopPropagation(),me(this,l)}}
                                  @keydown=${h=>h.stopPropagation()}
                                >
                                  <code>${l}</code>
                                </button>`:c`<code>${d}</code>`}
                          </div>
                          ${v?c`<div class="problem">⚠ ${v}</div>`:u}
                        </td>
                        <td>
                          ${a.type}
                          ${a.channel_size&&a.channel_size!=="8bit"?c`<div class="sub">${a.channel_size}</div>`:u}
                          <div
                            class="sub"
                            title=${a.transition==null?"Node default transition":"Fixture overrides the node default"}
                          >
                            fade ${vt(a,this.node)}s${a.transition==null?"":c` <b>own</b>`}
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
    `}_edit(e){this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:e.device,universe:e.universe},bubbles:!0,composed:!0}))}};w.styles=E`
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
  `,p([f({attribute:!1})],w.prototype,"hass",2),p([f({attribute:!1})],w.prototype,"node",2),p([f({type:Number})],w.prototype,"nodeIndex",2),p([f({attribute:!1})],w.prototype,"errors",2),p([f()],w.prototype,"addUniverse",2),p([f({attribute:!1})],w.prototype,"entityMap",2),p([m()],w.prototype,"_filter",2),p([m()],w.prototype,"_sort",2),p([m()],w.prototype,"_desc",2),w=p([S("dmx-fixture-list")],w);var xe=[{type:"chase",label:"Chase",kind:"intensity",description:"One fixture after another"},{type:"sine",label:"Wave",kind:"intensity",description:"Smooth rise and fall"},{type:"ramp_up",label:"Ramp up",kind:"intensity",description:"Fade up, then snap off"},{type:"ramp_down",label:"Ramp down",kind:"intensity",description:"Snap on, then fade down"},{type:"triangle",label:"Triangle",kind:"intensity",description:"Linear up and down"},{type:"square",label:"Pulse",kind:"intensity",description:"On / off blocks"},{type:"sparkle",label:"Sparkle",kind:"intensity",description:"Random flashes"},{type:"rainbow",label:"Rainbow",kind:"color",description:"Hue rotates through the spectrum"},{type:"color_chase",label:"Colour chase",kind:"color",description:"Steps through your colours"},{type:"color_wave",label:"Colour wave",kind:"color",description:"Blends between two colours"}],ye=o=>xe.find(r=>r.type===o)?.kind==="color",$e={speed:{default:30,min:.1,max:600},size:{default:100,min:0,max:100},base:{default:0,min:0,max:100},spread:{default:360,min:0,max:3600},groups:{default:1,min:1,max:512},blocks:{default:1,min:1,max:512},wings:{default:1,min:1,max:512},duty:{default:null,min:1,max:100},crossfade:{default:0,min:0,max:100},fade_in:{default:1,min:0,max:600},fade_out:{default:1,min:0,max:600},seed:{default:0,min:0,max:2**31-1}},Fe=[[255,0,0],[0,255,0],[0,0,255]];function k(o,r){let e=o[r];return e??$e[r]?.default}function we(o){return`light.fx_${o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}`}function Mt(o){let r=o>>>0;return()=>{r=r+1831565813>>>0;let e=r;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Nt(o,r){let e=[...o];if(r.shuffle){let t=Mt(k(r,"seed")+1);for(let i=e.length-1;i>0;i--){let n=Math.floor(t()*(i+1));[e[i],e[n]]=[e[n],e[i]]}}return r.direction==="reverse"&&e.reverse(),e}function er(o,r){if(o<=0)return[];let e=Math.max(1,Math.floor(k(r,"blocks"))),t=Math.max(1,Math.floor(k(r,"groups"))),i=Math.max(1,Math.floor(k(r,"wings"))),n=Math.ceil(o/e),s=Math.ceil(n/t),a=Math.ceil(s/i),l=[];for(let d=0;d<o;d++){let h=Math.floor(d/e)%s,g=Math.floor(h/a),_=h%a;g%2===1&&(_=a-1-_),l.push({position:_/a,count:a,index:_})}return l}var Pt=o=>(o%1+1)%1;function tr(o,r,e){let t=r.position;return e.direction==="bounce"&&Math.floor(o)%2===1&&(t=(r.count-1-r.index)/r.count),Pt(o-t*k(e,"spread")/360)}function At(o,r,e){if(o>=r)return 0;let t=r*e/2;return t<=0?1:o<t?o/t:o>r-t?(r-o)/t:1}function Ct(...o){let r=2166136261;for(let e of o)r^=Math.floor(e)+2654435769,r=Math.imul(r,16777619);return Mt(r)()}function je(o,r,e,t,i){let n=e.duty,s=k(e,"crossfade")/100;switch(o){case"sine":return .5-.5*Math.cos(2*Math.PI*r);case"ramp_up":return r;case"ramp_down":return 1-r;case"triangle":return 1-Math.abs(2*r-1);case"square":return At(r,(n??50)/100,s);case"chase":return At(r,n!=null?n/100:1/Math.max(1,t.count),s);case"sparkle":{let a=(n??30)/100,l=k(e,"seed"),d=i+Ct(1,t.index,l),v=Math.floor(d);if(Ct(2,t.index,v,l)>=a)return 0;let h=d-v;return h<.25?1-h/.25:0}default:return 0}}function rr(o){let r=Math.floor(o*6),e=o*6-r,t=1-e,[i,n,s]=[[1,e,0],[t,1,0],[0,1,e],[0,t,1],[e,0,1],[1,0,t]][(r%6+6)%6];return[Math.round(i*255),Math.round(n*255),Math.round(s*255)]}var Tt=(o,r,e)=>[0,1,2].map(t=>Math.round(o[t]+(r[t]-o[t])*e));function Be(o,r,e){let t=e.colors?.length?e.colors:Fe;if(o==="rainbow")return rr(Pt(r));if(o==="color_chase"){let n=t.length,s=r*n,a=Math.floor(s)%n,l=s-Math.floor(s),d=k(e,"crossfade")/100;return d>0&&l>1-d?Tt(t[a],t[(a+1)%n],(l-(1-d))/d):t[a]}let i=t[1]??[0,0,0];return Tt(t[0],i,.5-.5*Math.cos(2*Math.PI*r))}function Ut(o,r,e,t){let i=k(r,"size")/100,n=k(r,"base")/100;return er(e,r).map(s=>{let a=tr(t,s,r);if(ye(o))return{level:1,rgb:Be(o,a,r)};let l=n+i*je(o,a,r,s,t);return{level:Math.min(1,Math.max(0,l)),rgb:null}})}function qe(o){return{id:crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2),name:o,type:"chase",fixtures:[],params:{speed:60,fade_in:1,fade_out:1}}}var ir=o=>"#"+o.map(r=>r.toString(16).padStart(2,"0")).join(""),sr=o=>[1,3,5].map(r=>parseInt(o.slice(r,r+2),16)),y=class extends x{constructor(){super(...arguments);this.effects=[];this.fixtures=[];this.errors=[];this.savedNames=[];this._selectedId="";this._filter="";this._live=!1;this._liveError="";this._phase=0;this._paused=!1;this._raf=0;this._lastFrame=0;this._previewId="";this._dragIndex=null;this._animate=e=>{let t=this._current();if(t&&!this._paused){let i=this._lastFrame?(e-this._lastFrame)/1e3:0;this._phase+=i*k(t.params,"speed")/60}this._lastFrame=e,this._raf=requestAnimationFrame(this._animate)}}connectedCallback(){super.connectedCallback(),this._raf=requestAnimationFrame(this._animate)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._raf),this._stopLive()}willUpdate(e){e.has("effects")&&!this.effects.find(t=>t.id===this._selectedId)&&(this._selectedId=this.effects[0]?.id??""),e.has("savedNames")&&e.get("savedNames")!==void 0&&this._stopLive()}updated(e){e.has("_selectedId")&&this.renderRoot.querySelector(".main")?.scrollTo(0,0)}_current(){return this.effects.find(e=>e.id===this._selectedId)}_emit(e){this.dispatchEvent(new CustomEvent("effects-changed",{detail:{effects:e},bubbles:!0,composed:!0}))}_update(e){let t=this._current();if(!t)return;let i={...t,...e};this._emit(this.effects.map(n=>n.id===t.id?i:n)),this._schedulePreviewUpdate(i)}_setParam(e,t){let i=this._current();if(!i)return;let n={...i.params,[e]:t};t==null&&delete n[e],this._update({params:n})}_add(){let e=new Set(this.effects.map(n=>n.name.toLowerCase())),t=this.effects.length+1;for(;e.has(`effect ${t}`);)t++;let i=qe(`Effect ${t}`);this._emit([...this.effects,i]),this._select(i.id)}_duplicate(){let e=this._current();if(!e)return;let t={...structuredClone(e),id:qe("").id,name:`${e.name} copy`};this._emit([...this.effects,t]),this._select(t.id)}_delete(){let e=this._current();!e||!confirm(`Delete the effect "${e.name}"?`)||(this._stopLive(),this._emit(this.effects.filter(t=>t.id!==e.id)))}_select(e){e!==this._selectedId&&(this._stopLive(),this._selectedId=e,this._phase=0)}_usable(){return this.fixtures.filter(e=>e.type!=="fixed")}_toggleFixture(e,t){let i=this._current();if(!i)return;let n=i.fixtures.filter(s=>s!==e);t&&n.push(e),this._update({fixtures:n})}_setAll(e,t){let i=this._current();if(i)if(t){let n=e.filter(s=>!i.fixtures.includes(s));this._update({fixtures:[...i.fixtures,...n]})}else this._update({fixtures:i.fixtures.filter(n=>!e.includes(n))})}_sortByAddress(){let e=this._current();if(!e)return;let t=n=>{let s=this.fixtures.find(a=>a.name===n);return s?[s.host,Number(s.universe),s.channel]:["",0,0]},i=[...e.fixtures].sort((n,s)=>{let[a,l,d]=t(n),[v,h,g]=t(s);return a.localeCompare(v)||l-h||d-g});this._update({fixtures:i})}_move(e,t){let i=this._current();if(!i||t<0||t>=i.fixtures.length||e===t)return;let n=[...i.fixtures],[s]=n.splice(e,1);n.splice(t,0,s),this._update({fixtures:n})}async _toggleLive(e){if(!e){this._stopLive();return}let t=this._current();if(t){this._liveError="",this._previewId=`${t.id}-${Date.now()}`,this._live=!0;try{this._previewStop=await yt(this.hass,this._previewId,this._payload(t))}catch(i){this._live=!1,this._previewStop=void 0,this._liveError=i?.message??String(i)}}}_stopLive(){window.clearTimeout(this._previewTimer);let e=this._previewStop;this._previewStop=void 0,this._live=!1,e?.().catch(()=>{})}_payload(e){let{id:t,...i}=e;return i}_schedulePreviewUpdate(e){!this._live||!this._previewStop||(window.clearTimeout(this._previewTimer),this._previewTimer=window.setTimeout(async()=>{try{await $t(this.hass,this._previewId,this._payload(e)),this._liveError=""}catch(t){this._liveError=t?.message??String(t)}},120))}_entityState(e){if(this.savedNames.includes(e.name))return this.hass.states?.[we(e.name)]}_runSaved(e,t,i){i.stopPropagation(),wt(this.hass,"light",t?"turn_on":"turn_off",{entity_id:we(e.name)})}_errorsFor(e){let t=`effects/${e}`;return this.errors.filter(i=>i.path===t||i.path.startsWith(`${t}/`))}render(){let e=this._current();return c`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Effects</div>
          ${this.effects.map((t,i)=>{let n=this._entityState(t),s=n?.state==="on",a=xe.find(l=>l.type===t.type);return c`
              <div
                class="rail-item ${t.id===this._selectedId?"active":""}
                  ${this._errorsFor(i).length?"invalid":""}"
                role="button"
                tabindex="0"
                @click=${()=>this._select(t.id)}
                @keydown=${l=>l.key==="Enter"&&this._select(t.id)}
              >
                <span class="rail-text">
                  <span class="rail-title">${t.name||"(unnamed)"}</span>
                  <span class="rail-sub">
                    ${a?.label??t.type} · ${t.fixtures.length} fixture${t.fixtures.length===1?"":"s"}
                    ${n?u:c` · <em>not saved</em>`}
                  </span>
                </span>
                ${n?c`<button
                      class="run ${s?"on":""}"
                      title=${s?"Stop (fades out)":"Run (fades in)"}
                      aria-label=${s?`Stop ${t.name}`:`Run ${t.name}`}
                      @click=${l=>this._runSaved(t,!s,l)}
                    >${s?"\u25A0":"\u25B6"}</button>`:u}
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
    </div>`}_renderEditor(e){let t=this.effects.findIndex(s=>s.id===e.id),i=this._errorsFor(t),n=ye(e.type);return c`
      <div class="editor-head">
        <input
          class="name"
          aria-label="Effect name"
          .value=${e.name}
          @input=${s=>this._update({name:s.target.value})}
        />
        <span class="entity">${we(e.name||"effect")}</span>
        <span class="spacer"></span>
        <button @click=${this._duplicate}>Duplicate</button>
        <button class="danger" @click=${this._delete}>Delete</button>
      </div>

      ${i.length?c`<div class="errors">${i.map(s=>c`<div>⚠ ${s.message}</div>`)}</div>`:u}

      ${this._renderPreview(e)}

      <section>
        <h3>Effect</h3>
        <div class="types">
          ${xe.map(s=>c`
              <button
                class="type ${e.type===s.type?"active":""}"
                aria-pressed=${e.type===s.type}
                @click=${()=>this._update({type:s.type})}
              >
                ${this._typeGlyph(s.type,e.params)}
                <span class="type-label">${s.label}</span>
                <span class="type-desc">${s.description}</span>
              </button>
            `)}
        </div>
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
    `}_renderPreview(e){let t=Nt(e.fixtures,e.params),i=Ut(e.type,e.params,t.length,this._phase);return c`
      <section class="preview">
        <div class="preview-head">
          <h3>Preview</h3>
          <button class="small" @click=${()=>this._paused=!this._paused}>
            ${this._paused?"\u25B6 Play":"\u275A\u275A Pause"}
          </button>
          <span class="spacer"></span>
          <label class="switch" title="Run this effect on the real fixtures while you edit">
            <input
              type="checkbox"
              .checked=${this._live}
              ?disabled=${!e.fixtures.length}
              @change=${n=>this._toggleLive(n.target.checked)}
            />
            Live on fixtures
          </label>
        </div>
        ${this._liveError?c`<div class="live-error">${this._liveError}</div>`:u}
        ${t.length?c`<div class="strip">
              ${t.map((n,s)=>{let a=i[s],l=a.rgb??[255,214,150],d=l.map(v=>Math.round(v*a.level));return c`<div class="cell" title=${`${n}: ${Math.round(a.level*100)}%`}>
                  <div class="lamp" style="background: rgb(${d.join(",")}); box-shadow: 0 0 ${Math.round(14*a.level)}px rgba(${l.join(",")}, ${(.8*a.level).toFixed(2)})"></div>
                  <div class="cell-name">${n}</div>
                </div>`})}
            </div>`:c`<div class="hint">Pick some fixtures below to see the effect.</div>`}
      </section>
    `}_typeGlyph(e,t){if(ye(e)){let l=Array.from({length:12},(d,v)=>{let h=Be(e,v/11,t);return nt`<stop offset=${v/11} stop-color=${`rgb(${h.join(",")})`} />`});return c`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
        <defs><linearGradient id="g-${e}">${l}</linearGradient></defs>
        <rect x="2" y="5" width=${60} height=${12} rx="4" fill="url(#g-${e})" />
      </svg>`}let s={position:0,count:4,index:0},a=Array.from({length:65},(l,d)=>{let v=d/64*2,h=je(e,v%1,{...t,seed:3},s,v);return`${2+d/64*60},${19-h*16}`}).join(" ");return c`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
      <polyline points=${a} fill="none" stroke="currentColor" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" />
    </svg>`}_renderFixtures(e){let t=this._filter.trim().toLowerCase(),i=this._usable(),n=new Map;for(let a of i){if(t&&!`${a.name} ${a.type}`.toLowerCase().includes(t))continue;let l=`${a.host} \xB7 universe ${a.universe}`;n.set(l,[...n.get(l)??[],a])}let s=e.fixtures.filter(a=>!i.some(l=>l.name===a));return c`
      <section>
        <h3>Fixtures</h3>
        <div class="fixtures">
          <div class="pick">
            <input
              class="filter"
              type="search"
              placeholder="Filter fixtures"
              .value=${this._filter}
              @input=${a=>this._filter=a.target.value}
            />
            <div class="pick-list">
              ${i.length?[...n.entries()].map(([a,l])=>{let d=l.map(h=>h.name),v=d.every(h=>e.fixtures.includes(h));return c`
                      <div class="pick-group">
                        <label class="pick-head">
                          <input type="checkbox" .checked=${v}
                            @change=${h=>this._setAll(d,h.target.checked)} />
                          ${a}
                        </label>
                        ${l.map(h=>c`<label class="pick-item">
                            <input type="checkbox" .checked=${e.fixtures.includes(h.name)}
                              @change=${g=>this._toggleFixture(h.name,g.target.checked)} />
                            <span class="pick-name">${h.name}</span>
                            <span class="pick-sub">${h.type} · ${h.channel}</span>
                          </label>`)}
                      </div>`}):c`<div class="hint">No fixtures in the patch yet.</div>`}
            </div>
          </div>
          <div class="order">
            <div class="order-head">
              <span>Order (${e.fixtures.length})</span>
              <span class="spacer"></span>
              <button class="small" ?disabled=${e.fixtures.length<2} @click=${this._sortByAddress}>By address</button>
              <button class="small" ?disabled=${e.fixtures.length<2}
                @click=${()=>this._update({fixtures:[...e.fixtures].reverse()})}>Reverse</button>
              <button class="small" ?disabled=${!e.fixtures.length}
                @click=${()=>this._update({fixtures:[]})}>Clear</button>
            </div>
            ${e.fixtures.length?c`<ol class="order-list">
                  ${e.fixtures.map((a,l)=>c`<li
                      class=${s.includes(a)?"missing":""}
                      draggable="true"
                      @dragstart=${d=>{this._dragIndex=l,d.dataTransfer.effectAllowed="move",d.dataTransfer.setData("text/plain",a)}}
                      @dragover=${d=>d.preventDefault()}
                      @drop=${d=>{d.preventDefault(),this._dragIndex!==null&&this._move(this._dragIndex,l),this._dragIndex=null}}
                    >
                      <span class="grip" aria-hidden="true">⋮⋮</span>
                      <span class="order-nr">${l+1}</span>
                      <span class="order-name">${a}${s.includes(a)?" (not in patch)":""}</span>
                      <button class="icon" title="Move up" ?disabled=${l===0} @click=${()=>this._move(l,l-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${l===e.fixtures.length-1}
                        @click=${()=>this._move(l,l+1)}>↓</button>
                      <button class="icon" title="Remove" @click=${()=>this._toggleFixture(a,!1)}>✕</button>
                    </li>`)}
                </ol>`:c`<div class="hint">Tick fixtures on the left. The effect flows through them in this order — drag to rearrange.</div>`}
          </div>
        </div>
      </section>
    `}_renderShape(e){let t=e.type,i=t==="square"||t==="chase"||t==="sparkle",n=t==="square"||t==="chase",s=e.params.duty==null;return c`
      <section>
        <h3>Shape</h3>
        ${this._slider("Size","size",e,{min:0,max:100,step:1,unit:"%",hint:"How far the intensity moves"})}
        ${this._slider("Base","base",e,{min:0,max:100,step:1,unit:"%",hint:"Lowest intensity"})}
        ${i?c`
              ${t==="chase"||t==="sparkle"?c`<label class="check">
                    <input type="checkbox" .checked=${s}
                      @change=${a=>this._setParam("duty",a.target.checked?null:t==="sparkle"?30:25)} />
                    ${t==="chase"?"One fixture at a time":"Default sparkle amount"}
                  </label>`:u}
              ${!s||t==="square"?this._slider(t==="sparkle"?"Amount":"On time","duty",e,{min:1,max:100,step:1,unit:"%",fallback:50,hint:t==="sparkle"?"How often fixtures flash":"Share of each cycle that is on"}):u}
            `:u}
        ${n?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Fade instead of snap"}):u}
      </section>
    `}_renderColors(e){if(e.type==="rainbow")return c`<section><h3>Colours</h3>
        <div class="hint">The rainbow runs through every hue. Use Spread to set how many colours show at once.</div>
      </section>`;let t=e.params.colors?.length?e.params.colors:Fe,i=n=>this._setParam("colors",n);return c`
      <section>
        <h3>Colours</h3>
        <div class="colors">
          ${t.map((n,s)=>c`<div class="color">
              <input type="color" aria-label="Colour ${s+1}" .value=${ir(n)}
                @input=${a=>i(t.map((l,d)=>d===s?sr(a.target.value):l))} />
              ${t.length>(e.type==="color_wave"?2:1)?c`<button class="icon" title="Remove colour"
                    @click=${()=>i(t.filter((a,l)=>l!==s))}>✕</button>`:u}
            </div>`)}
          ${e.type==="color_chase"||t.length<2?c`<button class="small" @click=${()=>i([...t,[255,255,255]])}>+ Colour</button>`:u}
        </div>
        ${e.type==="color_chase"?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Blend into the next colour"}):u}
      </section>
    `}_renderFlow(e){let t=e.params.direction??"forward",i=[["forward","Forward"],["reverse","Reverse"],["bounce","Bounce"]];return c`
      <section>
        <h3>Flow across fixtures</h3>
        ${this._slider("Spread","spread",e,{min:0,max:720,step:15,unit:"\xB0",hint:"0\xB0 = all together, 360\xB0 = one wave across them all"})}
        <div class="field">
          <span class="field-label">Direction</span>
          <div class="segmented" role="group" aria-label="Direction">
            ${i.map(([n,s])=>c`<button class=${t===n?"active":""} aria-pressed=${t===n}
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
          ${e.params.shuffle?c`<button class="small" @click=${()=>this._setParam("seed",(e.params.seed??0)+1)}>Reshuffle</button>`:u}
        </div>
        <div class="row3">
          ${this._stepper("Groups","groups",e,"Repeat the pattern in N parts")}
          ${this._stepper("Blocks","blocks",e,"N fixtures move together")}
          ${this._stepper("Wings","wings",e,"Mirror every other part")}
        </div>
      </section>
    `}_slider(e,t,i,n){let a=i.params[t]??$e[t]?.default??n.fallback??n.min,l=$e[t];return c`<div class="field">
      <span class="field-label">${e}</span>
      <input type="range" min=${n.min} max=${n.max} step=${n.step} .value=${String(Math.min(n.max,a))}
        aria-label=${e}
        @input=${d=>this._setParam(t,Number(d.target.value))} />
      <span class="num">
        <input type="number" min=${l?.min??n.min} max=${l?.max??n.max} step=${n.step===15?1:n.step}
          .value=${String(a)} aria-label="${e} value"
          @change=${d=>{let v=Number(d.target.value);Number.isNaN(v)||this._setParam(t,v)}} />
        <span class="unit">${n.unit}</span>
      </span>
      ${n.hint?c`<span class="field-hint">${n.hint}</span>`:u}
    </div>`}_number(e,t,i,n,s){return c`<label class="field compact">
      <span class="field-label">${e}</span>
      <span class="num">
        <input type="number" min="0" max="600" step=${s} .value=${String(k(i.params,t))}
          @change=${a=>this._setParam(t,Number(a.target.value))} />
        <span class="unit">${n}</span>
      </span>
    </label>`}_stepper(e,t,i,n){let s=k(i.params,t),a=l=>this._setParam(t,Math.max(1,Math.min(512,l))===1?void 0:Math.max(1,Math.min(512,l)));return c`<div class="stepper" title=${n}>
      <span class="field-label">${e}</span>
      <div class="stepper-ctl">
        <button class="icon" aria-label="Fewer ${e.toLowerCase()}" ?disabled=${s<=1} @click=${()=>a(s-1)}>−</button>
        <span class="stepper-val">${s}</span>
        <button class="icon" aria-label="More ${e.toLowerCase()}" @click=${()=>a(s+1)}>+</button>
      </div>
      <span class="field-hint">${n}</span>
    </div>`}};y.styles=E`
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
  `,p([f({attribute:!1})],y.prototype,"hass",2),p([f({attribute:!1})],y.prototype,"effects",2),p([f({attribute:!1})],y.prototype,"fixtures",2),p([f({attribute:!1})],y.prototype,"errors",2),p([f({attribute:!1})],y.prototype,"savedNames",2),p([m()],y.prototype,"_selectedId",2),p([m()],y.prototype,"_filter",2),p([m()],y.prototype,"_live",2),p([m()],y.prototype,"_liveError",2),p([m()],y.prototype,"_phase",2),p([m()],y.prototype,"_paused",2),y=p([S("dmx-effects-view")],y);var b=class extends x{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._entityMap={};this._mode=b._loadMode();this._savedEffectNames=[];this._view=b._loadView();this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}static _loadMode(){try{return localStorage.getItem("dmx_lighting.mode")==="effects"?"effects":"patch"}catch{return"patch"}}_setMode(e){this._mode=e;try{localStorage.setItem("dmx_lighting.mode",e)}catch{}}_fixtureInfos(){return this._patch.nodes.flatMap(e=>Object.entries(e.universes??{}).flatMap(([t,i])=>(i.devices??[]).map(n=>({name:n.name,type:n.type,host:e.host,universe:t,channel:n.channel}))))}_fixtureNames(e=this._patch){return new Set(e.nodes.flatMap(t=>Object.values(t.universes??{}).flatMap(i=>(i.devices??[]).map(n=>n.name))))}willUpdate(e){let t=e.get("_patch");if(!t||!this._patch.effects?.length)return;let i=this._fixtureNames(),n=[...this._fixtureNames(t)].filter(s=>!i.has(s));n.length&&(this._patch={...this._patch,effects:this._patch.effects.map(s=>({...s,fixtures:s.fixtures.filter(a=>!n.includes(a))}))})}_onEffectsChanged(e){this._patch={...this._patch,effects:e.detail.effects},this._dirty=!0}static _loadView(){try{return localStorage.getItem("dmx_lighting.view")==="list"?"list":"grid"}catch{return"grid"}}_setView(e){this._view=e;try{localStorage.setItem("dmx_lighting.view",e)}catch{}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await mt(this.hass);this._patch=e.patch??{nodes:[]},this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._errors=e.errors??[],this._loaded=!0,this._autoSelect(),this._refreshEntityMap()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}async _refreshEntityMap(){try{this._entityMap=(await _t(this.hass)).entities??{}}catch{}}_autoSelect(){this._selected||this._patch.nodes.length&&this._selectNode("ui:0")}_selectNode(e){this._selected=e;let t=this._currentUniverses(),i=Object.keys(t??{}).sort((n,s)=>Number(n)-Number(s));this._selectedUniverse=i[0]??""}_currentNode(){let[e,t]=this._selected.split(":"),i=Number(t);if(e==="ui")return this._patch.nodes[i]}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[t,i]=this._selected.split(":");if(t!=="ui")return;let n=Number(i),s=[...this._patch.nodes];s[n]=e(s[n]),this._patch={...this._patch,nodes:s},this._dirty=!0}_updateUniverse(e,t){this._updateSelectedNode(i=>{let n=i.universes[e];return n?{...i,universes:{...i.universes,[e]:t(n)}}:i})}async _save(){this._saving=!0,this._errors=[];try{let e=await ft(this.hass,this._patch);e.success?(this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}async _openYamlDialog(){try{let e=await gt(this.hass,this._patch);this._dialog={kind:"yaml",yamlText:e.yaml,errorText:""}}catch(e){this._showToast(`Export failed: ${e}`)}}async _onImportPatch(e){if(this._dialog.kind!=="yaml")return;let{content:t}=e.detail;try{let i=await bt(this.hass,t);this._patch=i.patch,this._dirty=!0,this._errors=i.errors,this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._showToast(i.valid?"Loaded into editor \u2014 review and Save & Apply":"Loaded with validation errors \u2014 fix them before saving")}catch(i){let n=i?.message??String(i);this._dialog={kind:"yaml",yamlText:t,errorText:n}}}_addNode(){this._dialog={kind:"node",node:St(),isNew:!0}}_editNode(){let e=this._currentNode();e&&(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:t,original:i}=e.detail,n=this._patch.nodes,s=n.findIndex(a=>a.id===i.id);s>=0?n[s]=t:(n.push(t),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:t}=e.detail;this._patch.nodes=this._patch.nodes.filter(i=>i.id!==t.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._dialog={kind:"universe",mode:"add",current:""}}_renumberUniverse(){this._selectedUniverse&&(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:t}=e.detail;if(this._dialog.kind!=="universe")return;let i=this._dialog.mode,n=this._dialog.current;this._updateSelectedNode(s=>{let a={...s.universes};return i==="add"?a[t]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[t]=a[n],delete a[n]),{...s,universes:a}}),this._selectedUniverse=t,this._dialog={kind:"none"}}_removeUniverse(){let e=this._currentNode();if(!e||!this._selectedUniverse)return;let t=e.universes[this._selectedUniverse]?.devices??[];if(t.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${t.length} fixture(s)?`))return;let i={...e.universes};delete i[this._selectedUniverse],this._updateSelectedNode(s=>({...s,universes:i}));let n=Object.keys(i).sort((s,a)=>Number(s)-Number(a));this._selectedUniverse=n[0]??""}_setUniverseOption(e,t){this._updateUniverse(this._selectedUniverse,i=>({...i,[e]:t}))}_onAddDevice(e){let t=this._selectedUniverse;if(!t){this._showToast("Add a universe first");return}let i=e.detail.channel??this._firstFreeChannel(t);this._dialog={kind:"device",device:Et(i),isNew:!0,universeNr:t}}_firstFreeChannel(e){let t=(this._currentUniverses()?.[e]?.devices??[]).map(n=>A(n)).sort((n,s)=>n[0]-s[0]),i=1;for(let[n,s]of t){if(i<n)break;i=Math.max(i,s+1)}return Math.min(i,512)}_onEditDevice(e){this._refreshEntityMap();let t=e.detail.universe??this._selectedUniverse;this._selectedUniverse=t,this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:t}}_onSaveDevice(e){let{device:t,original:i,count:n}=e.detail;if(this._dialog.kind!=="device")return;let s=this._dialog.universeNr;i.name&&t.name!==i.name&&this._patch.effects?.length&&(this._patch={...this._patch,effects:this._patch.effects.map(l=>({...l,fixtures:l.fixtures.map(d=>d===i.name?t.name:d)}))});let a=0;this._updateUniverse(s,l=>{let d=[...l.devices],v=d.findIndex(h=>h.id===i.id);if(v>=0)d[v]=t;else if(n>1){let h=t.channel;for(let g=1;g<=n;g++){let _={...t,id:re(),name:`${t.name}_${g}`,channel:h},[N,P]=A(_);if(P>512){a=n-g+1;break}d.push(_),h=P+1}}else d.push(t);return{...l,devices:d}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:t}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,i=>({...i,devices:i.devices.filter(n=>n.id!==t.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:t,channel:i}=e.detail;this._updateUniverse(this._selectedUniverse,n=>({...n,devices:n.devices.map(s=>s.id===t?{...s,channel:i}:s)}))}render(){if(!this._loaded)return c`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),t=this._currentUniverses()??{},i=Object.keys(t).sort((s,a)=>Number(s)-Number(a)),n=t[this._selectedUniverse];return c`
      <div class="header">
        <h1>DMX Patch</h1>
        <span class="mode-toggle" role="tablist" aria-label="Section">
          <button role="tab" aria-selected=${this._mode==="patch"}
            class=${this._mode==="patch"?"active":""} @click=${()=>this._setMode("patch")}>Patch</button>
          <button role="tab" aria-selected=${this._mode==="effects"}
            class=${this._mode==="effects"?"active":""} @click=${()=>this._setMode("effects")}>Effects</button>
        </span>
        ${this._dirty?c`<span class="dirty">unsaved changes</span>`:u}
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
                  ${i.map(s=>c`
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
                      `:u}
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
                            ${ce.map(s=>c`<option
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
                        .nodeKey=${ht(e)}
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
              `:u}
        </main>
      </div>`}

      ${this._dialog.kind==="device"?c`
            <dmx-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              .hass=${this.hass}
              .nodeTransition=${this._currentNode()?.transition??null}
              .entityId=${this._dialog.isNew?"":ve(this.hass,this._entityMap,this._currentNode()?.host??"",this._dialog.universeNr,this._dialog.device)??""}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></dmx-device-dialog>
          `:u}
      ${this._dialog.kind==="node"?c`
            <dmx-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></dmx-node-dialog>
          `:u}
      ${this._dialog.kind==="yaml"?c`
            <dmx-yaml-dialog
              .yamlText=${this._dialog.yamlText}
              .errorText=${this._dialog.errorText}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @import-patch=${this._onImportPatch}
            ></dmx-yaml-dialog>
          `:u}
      ${this._dialog.kind==="universe"?c`
            <dmx-universe-dialog
              .mode=${this._dialog.mode}
              .current=${this._dialog.current}
              .minUniverse=${L(e?.node_type??"artnet-direct")}
              .existing=${i}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></dmx-universe-dialog>
          `:u}
      ${this._toast?c`<div class="toast">${this._toast}</div>`:u}
    `}};b.styles=E`
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
  `,p([f({attribute:!1})],b.prototype,"hass",2),p([f({type:Boolean})],b.prototype,"narrow",2),p([m()],b.prototype,"_patch",2),p([m()],b.prototype,"_loaded",2),p([m()],b.prototype,"_dirty",2),p([m()],b.prototype,"_saving",2),p([m()],b.prototype,"_errors",2),p([m()],b.prototype,"_toast",2),p([m()],b.prototype,"_selected",2),p([m()],b.prototype,"_selectedUniverse",2),p([m()],b.prototype,"_dialog",2),p([m()],b.prototype,"_entityMap",2),p([m()],b.prototype,"_mode",2),p([m()],b.prototype,"_savedEffectNames",2),p([m()],b.prototype,"_view",2),b=p([S("dmx-patch-panel")],b);export{b as DmxPatchPanel};
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
