var Vt=Object.defineProperty;var Dt=Object.getOwnPropertyDescriptor;var h=(o,i,e,t)=>{for(var r=t>1?void 0:t?Dt(i,e):i,n=o.length-1,s;n>=0;n--)(s=o[n])&&(r=(t?s(i,e,r):s(r))||r);return t&&r&&Vt(i,e,r),r};var pe=globalThis,ue=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),tt=new WeakMap,V=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(ue&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=tt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&tt.set(e,i))}return i}toString(){return this.cssText}},rt=o=>new V(typeof o=="string"?o:o+"",void 0,Ie),E=(o,...i)=>{let e=o.length===1?o[0]:i.reduce((t,r,n)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[n+1],o[0]);return new V(e,o,Ie)},it=(o,i)=>{if(ue)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=pe.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,o.appendChild(t)}},Re=ue?o=>o:o=>o instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return rt(e)})(o):o;var{is:er,defineProperty:tr,getOwnPropertyDescriptor:rr,getOwnPropertyNames:ir,getOwnPropertySymbols:sr,getPrototypeOf:nr}=Object,he=globalThis,st=he.trustedTypes,or=st?st.emptyScript:"",ar=he.reactiveElementPolyfillSupport,D=(o,i)=>o,ee={toAttribute(o,i){switch(i){case Boolean:o=o?or:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,i){let e=o;switch(i){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},me=(o,i)=>!er(o,i),nt={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:me};Symbol.metadata??=Symbol("metadata"),he.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&tr(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:n}=rr(this.prototype,i)??{get(){return this[e]},set(s){this[e]=s}};return{get:r,set(s){let a=r?.call(this);n?.call(this,s),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??nt}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let i=nr(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let e=this.properties,t=[...ir(e),...sr(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(Re(r))}else i!==void 0&&e.push(Re(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:ee).toAttribute(e,t.type);this._$Em=i,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(i,e){let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let n=t.getPropertyOptions(r),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ee;this._$Em=r;let a=s.fromAttribute(e,n.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(i,e,t,r=!1,n){if(i!==void 0){let s=this.constructor;if(r===!1&&(n=this[i]),t??=s.getPropertyOptions(i),!((t.hasChanged??me)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(s._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:n},s){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,s??e??this[i]),n!==!0||s!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,n]of t){let{wrapped:s}=n,a=this[r];s!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[D("elementProperties")]=new Map,R[D("finalized")]=new Map,ar?.({ReactiveElement:R}),(he.reactiveElementVersions??=[]).push("2.1.2");var je=globalThis,ot=o=>o,ve=je.trustedTypes,at=ve?ve.createPolicy("lit-html",{createHTML:o=>o}):void 0,ht="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+H,lr=`<${mt}>`,B=document,re=()=>B.createComment(""),ie=o=>o===null||typeof o!="object"&&typeof o!="function",We=Array.isArray,cr=o=>We(o)||typeof o?.[Symbol.iterator]=="function",Ue=`[ 	
\f\r]`,te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,j=RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,pt=/"/g,vt=/^(?:script|style|textarea|title)$/i,Be=o=>(i,...e)=>({_$litType$:o,strings:i,values:e}),l=Be(1),ft=Be(2),Ar=Be(3),q=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ut=new WeakMap,W=B.createTreeWalker(B,129);function gt(o,i){if(!We(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(i):i}var dr=(o,i)=>{let e=o.length-1,t=[],r,n=i===2?"<svg>":i===3?"<math>":"",s=te;for(let a=0;a<e;a++){let c=o[a],u,d,p=-1,v=0;for(;v<c.length&&(s.lastIndex=v,d=s.exec(c),d!==null);)v=s.lastIndex,s===te?d[1]==="!--"?s=lt:d[1]!==void 0?s=ct:d[2]!==void 0?(vt.test(d[2])&&(r=RegExp("</"+d[2],"g")),s=j):d[3]!==void 0&&(s=j):s===j?d[0]===">"?(s=r??te,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?j:d[3]==='"'?pt:dt):s===pt||s===dt?s=j:s===lt||s===ct?s=te:(s=j,r=void 0);let _=s===j&&o[a+1].startsWith("/>")?" ":"";n+=s===te?c+lr:p>=0?(t.push(u),c.slice(0,p)+ht+c.slice(p)+H+_):c+H+(p===-2?a:_)}return[gt(o,n+(o[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},se=class o{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let n=0,s=0,a=i.length-1,c=this.parts,[u,d]=dr(i,e);if(this.el=o.createElement(u,t),W.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=W.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(ht)){let v=d[s++],_=r.getAttribute(p).split(H),b=/([.?@])?(.*)/.exec(v);c.push({type:1,index:n,name:b[2],strings:_,ctor:b[1]==="."?He:b[1]==="?"?ze:b[1]==="@"?Oe:Y}),r.removeAttribute(p)}else p.startsWith(H)&&(c.push({type:6,index:n}),r.removeAttribute(p));if(vt.test(r.tagName)){let p=r.textContent.split(H),v=p.length-1;if(v>0){r.textContent=ve?ve.emptyScript:"";for(let _=0;_<v;_++)r.append(p[_],re()),W.nextNode(),c.push({type:2,index:++n});r.append(p[v],re())}}}else if(r.nodeType===8)if(r.data===mt)c.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(H,p+1))!==-1;)c.push({type:7,index:n}),p+=H.length-1}n++}}static createElement(i,e){let t=B.createElement("template");return t.innerHTML=i,t}};function X(o,i,e=o,t){if(i===q)return i;let r=t!==void 0?e._$Co?.[t]:e._$Cl,n=ie(i)?void 0:i._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(o),r._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(i=X(o,r._$AS(o,i.values),r,t)),i}var Le=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=(i?.creationScope??B).importNode(e,!0);W.currentNode=r;let n=W.nextNode(),s=0,a=0,c=t[0];for(;c!==void 0;){if(s===c.index){let u;c.type===2?u=new ne(n,n.nextSibling,this,i):c.type===1?u=new c.ctor(n,c.name,c.strings,this,i):c.type===6&&(u=new Fe(n,this,i)),this._$AV.push(u),c=t[++a]}s!==c?.index&&(n=W.nextNode(),s++)}return W.currentNode=B,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},ne=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=X(this,i,e),ie(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==q&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):cr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&ie(this._$AH)?this._$AA.nextSibling.data=i:this.T(B.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=se.createElement(gt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new Le(r,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(i){let e=ut.get(i.strings);return e===void 0&&ut.set(i.strings,e=new se(i)),e}k(i){We(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of i)r===e.length?e.push(t=new o(this.O(re()),this.O(re()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=ot(i).nextSibling;ot(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(i,e=this,t,r){let n=this.strings,s=!1;if(n===void 0)i=X(this,i,e,0),s=!ie(i)||i!==this._$AH&&i!==q,s&&(this._$AH=i);else{let a=i,c,u;for(i=n[0],c=0;c<n.length-1;c++)u=X(this,a[t+c],e,c),u===q&&(u=this._$AH[c]),s||=!ie(u)||u!==this._$AH[c],u===m?i=m:i!==m&&(i+=(u??"")+n[c+1]),this._$AH[c]=u}s&&!r&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},He=class extends Y{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},ze=class extends Y{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},Oe=class extends Y{constructor(i,e,t,r,n){super(i,e,t,r,n),this.type=5}_$AI(i,e=this){if((i=X(this,i,e,0)??m)===q)return;let t=this._$AH,r=i===m&&t!==m||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==m&&(t===m||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Fe=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){X(this,i)}};var pr=je.litHtmlPolyfillSupport;pr?.(se,ne),(je.litHtmlVersions??=[]).push("3.3.3");var bt=(o,i,e)=>{let t=e?.renderBefore??i,r=t._$litPart$;if(r===void 0){let n=e?.renderBefore??null;t._$litPart$=r=new ne(i.insertBefore(re(),n),n,void 0,e??{})}return r._$AI(o),r};var qe=globalThis,y=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};y._$litElement$=!0,y.finalized=!0,qe.litElementHydrateSupport?.({LitElement:y});var ur=qe.litElementPolyfillSupport;ur?.({LitElement:y});(qe.litElementVersions??=[]).push("4.2.2");var S=o=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,i)}):customElements.define(o,i)};var hr={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:me},mr=(o=hr,i,e)=>{let{kind:t,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),t==="accessor"){let{name:s}=e;return{set(a){let c=i.get.call(this);i.set.call(this,a),this.requestUpdate(s,c,o,!0,a)},init(a){return a!==void 0&&this.C(s,void 0,o,a),a}}}if(t==="setter"){let{name:s}=e;return function(a){let c=this[s];i.call(this,a),this.requestUpdate(s,c,o,!0,a)}}throw Error("Unsupported decorator location: "+t)};function g(o){return(i,e)=>typeof e=="object"?mr(o,i,e):((t,r,n)=>{let s=r.hasOwnProperty(n);return r.constructor.createProperty(n,t),s?Object.getOwnPropertyDescriptor(r,n):void 0})(o,i,e)}function f(o){return g({...o,state:!0,attribute:!1})}var _t=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],xt=["artnet-direct","sacn","kinet"],yt=["8bit","16bit","24bit","32bit"],ge=["linear","quadratic","cubic","quadruple"],$t={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},vr={"8bit":1,"16bit":2,"24bit":3,"32bit":4},be={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},_e={d:"Dimmer",r:"Red",R:"Red (unscaled)",g:"Green",G:"Green (unscaled)",b:"Blue",B:"Blue (unscaled)",w:"White",W:"White (unscaled)",c:"Cool white",C:"Cool white (unscaled)",h:"Warm white",H:"Warm white (unscaled)",t:"Color temp (0 = warm)",T:"Color temp (0 = cold)",u:"Hue",U:"Saturation",x:"X (CIE)",y:"Y (CIE)"},wt=32;function oe(o){return typeof o=="number"}function z(o){return!!o.channel_setup&&o.channel_setup.length>0}function Ke(o){if(o.type==="binary")return["d"];let i=z(o)?o.channel_setup:$t[o.type];return i?Array.from(i):["d"]}function xe(o,i){let e=Ke(o)[i],t=o.channel_labels?.[i]||"";return e===void 0?{text:"",dummy:!1}:oe(e)?{text:t||"Fixed",dummy:!0,value:e}:{text:t||_e[e]||e,dummy:!1}}function Ge(o){if(o.type==="binary")return 1;let i=z(o)?o.channel_setup:$t[o.type];return i?i.length:1}function ae(o){return vr[o.channel_size??"8bit"]??1}function T(o){let i=Ge(o),e=o.channel;return[e,e+i*ae(o)-1]}function O(o){return o==="sacn"?1:0}function kt(o){return`${o.node_type}:${o.host}:${o.port??"default"}`}function le(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function ye(o){return`hsl(${o*137.5%360}, 45%, 45%)`}function Z(o,i,e,t,r){let n=`light.${Q(r.name??"")}`,s=Object.values(i);if(s.includes(n)||!s.length&&o?.states?.[n])return n;let a=i[`dmx:${e}/${t}/${r.channel}`];if(a)return a}function J(o,i){o.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}function Et(o,i){return o.transition??i?.transition??0}function Q(o){return o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}var St=o=>o.callWS({type:"dmx_lighting/patch/get"});var At=(o,i)=>o.callWS({type:"dmx_lighting/patch/save",patch:i}),Mt=(o,i)=>o.callWS({type:"dmx_lighting/patch/export",patch:i}),Ct=(o,i)=>o.callWS({type:"dmx_lighting/patch/import",content:i});var Tt=o=>o.callWS({type:"dmx_lighting/entity_map/get"}),Pt=(o,i,e,t)=>o.connection.subscribeMessage(t,{type:"dmx_lighting/dmx/subscribe",node_key:i,universe:e}),Nt=(o,i,e,t=1)=>o.connection.subscribeMessage(()=>{},{type:"dmx_lighting/effect/preview",preview_id:i,preset:e,level:t}),It=(o,i,e,t)=>o.callWS({type:"dmx_lighting/effect/preview/update",preview_id:i,preset:e,...t===void 0?{}:{level:t}}),Rt=(o,i,e,t)=>o.callWS({type:"call_service",domain:i,service:e,service_data:t}),Ut=o=>o.callWS({type:"dmx_lighting/groups/list"}),Lt=(o,i,e)=>o.callWS({type:"dmx_lighting/groups/create",name:i,entities:e}),Ht=(o,i,e)=>o.callWS({type:"dmx_lighting/groups/update",entry_id:i,...e}),zt=(o,i)=>o.callWS({type:"dmx_lighting/groups/delete",entry_id:i});var K="#fixed";function Ot(o){return Ke(o).map((i,e)=>({fn:oe(i)?K:i,value:oe(i)?i:0,label:o.channel_labels?.[e]??""}))}function Xe(o,i){return o.fn===K?!Number.isInteger(o.value)||o.value<0||o.value>255?"Value must be 0\u2013255":"":be[i]?.includes(o.fn)?"":`Not available for ${i}`}function fr(o){if(!o.length)return{channel_setup:null,channel_labels:null};let i=o.map(r=>r.fn===K?r.value:r.fn),e=o.map(r=>r.fn===K&&r.label.trim()?r.label.trim():null);for(;e.length&&e[e.length-1]===null;)e.pop();return{channel_setup:i.some(r=>oe(r))?i:i.join(""),channel_labels:e.length?e:null}}var Ye=!1;function $e(o){Ye=o.target===o.currentTarget}function we(o){let i=Ye&&o.target===o.currentTarget;return Ye=!1,i}var ke=E`
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
`,A=class extends y{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this.entityId="";this.nodeTransition=null;this._count=1;this._suspended=!1;this._rows=null}disconnectedCallback(){super.disconnectedCallback(),this._stopWatching?.()}_openEntity(){this._suspended=!0,J(this,this.entityId);let e=()=>document.querySelector("home-assistant")?.shadowRoot?.querySelector("ha-more-info-dialog"),t=()=>{this._stopWatching?.(),this._suspended=!1},r=s=>{s.detail?.dialog==="ha-more-info-dialog"&&t()};window.addEventListener("dialog-closed",r);let n=window.setInterval(()=>{let s=e();(!s||!s._entityId)&&t()},500);this._stopWatching=()=>{window.removeEventListener("dialog-closed",r),window.clearInterval(n),this._stopWatching=void 0}}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1,this._rows=z(this.device)?Ot(this.device):null)}_set(e,t){this._working={...this._working,[e]:t}}_renderEntity(){if(this.isNew)return m;if(!this.entityId)return l`<div class="entity-row muted">
        No entity yet — it is created when you Save &amp; Apply.
      </div>`;let e=this.hass?.states?.[this.entityId],t=e?.state??"unknown",r=e?.attributes?.friendly_name??"";return l`
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
    `}_setRows(e){this._rows=e,this._working={...this._working,...e?fr(e):{channel_setup:null,channel_labels:null}}}_setType(e){this._set("type",e),e==="binary"&&this._rows&&this._setRows(null)}_toggleCustom(e){if(!e){this._setRows(null);return}let t=Ot({...this._working,channel_setup:null,channel_labels:null});this._setRows(t)}_updateRow(e,t){let r=[...this._rows??[]];r[e]={...r[e],...t},this._setRows(r)}_addRow(e){let t=be[this._working.type]??"",r=e||!t?{fn:K,value:0,label:""}:{fn:t[0],value:0,label:""};this._setRows([...this._rows??[],r])}_moveRow(e,t){let r=[...this._rows??[]],n=e+t;n<0||n>=r.length||([r[e],r[n]]=[r[n],r[e]],this._setRows(r))}_removeRow(e){let t=(this._rows??[]).filter((r,n)=>n!==e);this._setRows(t)}_renderChannels(){let e=this._working;if(e.type==="binary")return m;let t=this._rows,r=be[e.type]??"";return l`
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
              ${t.map((n,s)=>{let a=Xe(n,e.type),c=n.fn===K;return l`
                  <div class="ch-row ${a?"invalid":""}" title=${a}>
                    <span class="ch-nr">${e.channel+s*ae(e)}</span>
                    <select
                      aria-label="Channel ${s+1} function"
                      @change=${u=>this._updateRow(s,{fn:u.target.value})}
                    >
                      ${[...r].map(u=>l`<option value=${u} ?selected=${n.fn===u}>
                            ${_e[u]??u}
                          </option>`)}
                      ${!c&&!r.includes(n.fn)?l`<option value=${n.fn} selected>${_e[n.fn]??n.fn}</option>`:m}
                      <option value=${K} ?selected=${c}>Dummy (fixed value)</option>
                    </select>
                    ${c?l`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${wt}
                            aria-label="Channel ${s+1} label"
                            .value=${n.label}
                            @input=${u=>this._updateRow(s,{label:u.target.value})}
                          />
                          <input
                            class="ch-value"
                            type="number"
                            min="0"
                            max="255"
                            step="1"
                            aria-label="Channel ${s+1} value"
                            .value=${String(n.value)}
                            @input=${u=>this._updateRow(s,{value:Number(u.target.value)})}
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
                    ${a?l`<span class="ch-problem">${a}</span>`:m}
                  </div>
                `})}
            </div>
            <div class="ch-add">
              ${r?l`<button @click=${()=>this._addRow(!1)}>+ Light channel</button>`:m}
              <button @click=${()=>this._addRow(!0)}>+ Dummy channel</button>
            </div>
          `:m}
    `}render(){let e=this._working,[t,r]=T(e),n=e.type==="color_temp"||e.type==="rgbww";return l`
      <div
        class="backdrop"
        style=${this._suspended?"visibility: hidden":""}
        @pointerdown=${$e}
        @click=${s=>we(s)&&this._cancel()}
      >
        <div class="dialog" @click=${s=>s.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          ${this._renderEntity()}

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
                    </div>`:m}
              `:m}

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
                ${_t.map(s=>l`<option value=${s} ?selected=${e.type===s}>${s}</option>`)}
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
                ${yt.map(s=>l`<option value=${s} ?selected=${(e.channel_size??"8bit")===s}>${s}</option>`)}
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
                ${e.transition==null?`Uses the node default: ${this.nodeTransition??0}s`:l`Overrides the node default (${this.nodeTransition??0}s) ·
                      <a href="#" @click=${s=>{s.preventDefault(),this._set("transition",null)}}>use default</a>`}
              </div>
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${s=>{let a=s.target.value;this._set("output_correction",a===""?null:a)}}
              >
                <option value="" ?selected=${!e.output_correction}>universe default</option>
                ${ge.map(s=>l`<option value=${s} ?selected=${e.output_correction===s}>${s}</option>`)}
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
              `:m}

          ${this.errorText?l`<div class="error">${this.errorText}</div>`:m}

          <div class="actions">
            ${this.isNew?m:l`<button class="danger" @click=${this._delete}>Delete</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}let e=(this._rows??[]).findIndex(t=>Xe(t,this._working.type));if(e>=0){this.errorText=`Channel ${e+1}: ${Xe(this._rows[e],this._working.type)}`;return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};A.styles=[ke,E`
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
    `],h([g({attribute:!1})],A.prototype,"device",2),h([g({type:Boolean})],A.prototype,"isNew",2),h([g()],A.prototype,"errorText",2),h([g({attribute:!1})],A.prototype,"hass",2),h([g()],A.prototype,"entityId",2),h([g({attribute:!1})],A.prototype,"nodeTransition",2),h([f()],A.prototype,"_working",2),h([f()],A.prototype,"_count",2),h([f()],A.prototype,"_suspended",2),h([f()],A.prototype,"_rows",2),A=h([S("dmx-device-dialog")],A);var I=class extends y{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_overrides(){return Object.values(this._working.universes??{}).reduce((e,t)=>e+(t.devices??[]).filter(r=>r.transition!=null).length,0)}_renderTransitionOverrides(){let e=this._overrides();return l`<div class="hint">
      Fade time for fixtures that leave their own transition blank; a fixture's own value
      (even 0) wins.
      ${e?l`<br />${e} fixture${e===1?" sets its":"s set their"} own transition.
            <a href="#" @click=${this._clearOverrides}>Make all use this default</a>`:m}
    </div>`}_clearOverrides(e){e.preventDefault();let t=Object.fromEntries(Object.entries(this._working.universes??{}).map(([r,n])=>[r,{...n,devices:(n.devices??[]).map(s=>({...s,transition:null}))}]));this._working={...this._working,universes:t}}_set(e,t){this._working={...this._working,[e]:t}}_addUniverse(){let e=Number(this._newUniverse),t=O(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<t||e>1024){this.errorText=`Universe must be a whole number between ${t} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let t={...this._working.universes};delete t[e],this._working={...this._working,universes:t}}render(){let e=this._working;return l`
      <div
        class="backdrop"
        @pointerdown=${$e}
        @click=${t=>we(t)&&this._cancel()}
      >
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${t=>this._set("node_type",t.target.value)}
          >
            ${xt.map(t=>l`<option value=${t} ?selected=${e.node_type===t}>${t}</option>`)}
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
              `:m}

          <label>Universes</label>
          <div class="chips">
            ${Object.keys(e.universes).sort((t,r)=>Number(t)-Number(r)).map(t=>{let r=e.universes[t]?.devices?.length??0,n=Number(t)<O(e.node_type);return l`
                  <span class="chip ${n?"invalid":""}"
                    title=${n?`Universe ${t} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:r?`${r} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${t}`}
                  >
                    ${t}${r?l` <small>(${r})</small>`:m}
                    ${r?m:l`<button class="chip-x" @click=${()=>this._removeUniverse(t)}>
                          ×
                        </button>`}
                  </span>
                `})}
          </div>
          <div class="row">
            <input
              type="number"
              min=${O(e.node_type)}
              max="1024"
              placeholder="Universe number (${O(e.node_type)}-1024)"
              .value=${this._newUniverse}
              @input=${t=>this._newUniverse=t.target.value}
              @keydown=${t=>t.key==="Enter"&&this._addUniverse()}
            />
            <button @click=${this._addUniverse}>Add universe</button>
          </div>

          ${this.errorText?l`<div class="error">${this.errorText}</div>`:m}

          <div class="actions">
            ${this.isNew?m:l`<button class="danger" @click=${this._delete}>Delete node</button>`}
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.isNew?"Add":"Save"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let t=O(this._working.node_type),r=Object.keys(this._working.universes).filter(n=>Number(n)<t);if(r.length){this.errorText=`Universe ${r.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${t}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};I.styles=ke,h([g({attribute:!1})],I.prototype,"node",2),h([g({type:Boolean})],I.prototype,"isNew",2),h([g()],I.prototype,"errorText",2),h([f()],I.prototype,"_working",2),h([f()],I.prototype,"_newUniverse",2),I=h([S("dmx-node-dialog")],I);var N=class extends y{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return l`
      <div
        class="backdrop"
        @pointerdown=${$e}
        @click=${e=>we(e)&&this._cancel()}
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

          ${this._error?l`<div class="error">${this._error}</div>`:m}

          <div class="actions">
            <span class="spacer"></span>
            <button @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${this._save}>
              ${this.mode==="add"?"Add":"Renumber"}
            </button>
          </div>
        </div>
      </div>
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let t=String(e);if(t!==this.current&&this.existing.includes(t)){this._error=`Universe ${t} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:t},bubbles:!0,composed:!0}))}};N.styles=ke,h([g()],N.prototype,"mode",2),h([g({type:Number})],N.prototype,"minUniverse",2),h([g()],N.prototype,"current",2),h([g({attribute:!1})],N.prototype,"existing",2),h([f()],N.prototype,"_value",2),h([f()],N.prototype,"_error",2),N=h([S("dmx-universe-dialog")],N);var U=class extends y{constructor(){super(...arguments);this.yamlText="";this.errorText="";this._text="";this._copied=!1}willUpdate(e){e.has("yamlText")&&(this._text=this.yamlText)}render(){return l`
      <div
        class="backdrop"
        @pointerdown=${$e}
        @click=${e=>we(e)&&this._cancel()}
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

          ${this.errorText?l`<div class="error">${this.errorText}</div>`:m}

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
    `}async _copy(){try{await navigator.clipboard.writeText(this._text),this._copied=!0,setTimeout(()=>this._copied=!1,1500)}catch{this.errorText="Clipboard unavailable \u2014 select the text and copy manually"}}_download(){let e=new Blob([this._text],{type:"application/yaml"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="dmx_patch.yaml",r.click(),URL.revokeObjectURL(t)}_pickFile(){let e=document.createElement("input");e.type="file",e.accept=".yaml,.yml,.json,.txt",e.onchange=async()=>{let t=e.files?.[0];t&&(this._text=await t.text(),this.errorText="")},e.click()}_import(){this.dispatchEvent(new CustomEvent("import-patch",{detail:{content:this._text},bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}};U.styles=[ke,E`
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
    `],h([g()],U.prototype,"yamlText",2),h([g()],U.prototype,"errorText",2),h([f()],U.prototype,"_text",2),h([f()],U.prototype,"_copied",2),U=h([S("dmx-yaml-dialog")],U);function Ft(o){return{id:le(),channel:o,name:"",type:"dimmer",transition:null,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null,channel_labels:null}}function jt(){return{id:le(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var P=class extends y{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await Pt(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((t,r)=>{let[n,s]=T(t);for(let a=n;a<=Math.min(s,512);a++){let c=e.get(a);e.set(a,{device:t,index:r,first:a===n,overlap:!!c})}}),e}render(){let e=this._channelMap(),t=[];for(let r=1;r<=512;r++){let n=e.get(r),s=this._values[r-1],a=this._live&&s!==void 0?s/255:0,c=this._dropTarget,u=n?xe(n.device,Math.floor((r-n.device.channel)/ae(n.device))):void 0,d=!!u&&z(n.device),p=c&&r>=c.first&&r<=c.last;t.push(l`
        <div
          class="cell ${n?"occupied":""} ${n?.overlap?"overlap":""}
            ${u?.dummy?"dummy":""}
            ${p?c.valid?"drop-ok":"drop-bad":""}"
          style=${n?`--device-color: ${ye(n.index)}`:m}
          title=${n?`${n.device.name} (${n.device.type}) \u2014 channel ${r}: ${u.text}${u.dummy?` (fixed ${u.value})`:""} \u2014 drag to move`:`Channel ${r}`}
          draggable=${n?"true":"false"}
          @click=${()=>this._cellClick(r,n?.device)}
          @dragstart=${n?v=>this._dragStart(v,r,n.device):m}
          @dragover=${v=>this._dragOver(v,r)}
          @drop=${v=>this._drop(v)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?l`<span class="heat" style="opacity: ${a}"></span>`:m}
          <span class="top">
            <span class="ch">${r}</span>
            ${u?.dummy&&!this._live?l`<span class="fixed">${u.value}</span>`:m}
          </span>
          ${n?.first?l`<span class="name">${n.device.name}</span>`:m}
          ${d&&(u.dummy||!n.first)?l`<span class="role">${u.text}</span>`:m}
          ${this._live&&s!==void 0?l`<span class="val">${s}</span>`:m}
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
    `}_dragStart(e,t,r){let[n]=T(r);this._dragInfo={device:r,offset:t-n},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",r.id)}_dragOver(e,t){let r=this._dragInfo;if(!r)return;let[n,s]=T(r.device),a=s-n+1,c=t-r.offset,u=c+a-1,d=c>=1&&u<=512&&!this._collides(r.device.id,c,u);(this._dropTarget?.first!==c||this._dropTarget?.last!==u||this._dropTarget?.valid!==d)&&(this._dropTarget={first:c,last:u,valid:d}),d&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,t,r){return(this.universe?.devices??[]).some(n=>{if(n.id===e)return!1;let[s,a]=T(n);return t<=a&&r>=s})}_drop(e){e.preventDefault();let t=this._dragInfo,r=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!t||!r?.valid)&&T(t.device)[0]!==r.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:t.device.id,channel:r.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,t){t?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0}))}};P.styles=E`
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
  `,h([g({attribute:!1})],P.prototype,"hass",2),h([g({attribute:!1})],P.prototype,"universe",2),h([g()],P.prototype,"nodeKey",2),h([g({type:Number})],P.prototype,"universeNr",2),h([f()],P.prototype,"_live",2),h([f()],P.prototype,"_values",2),h([f()],P.prototype,"_dropTarget",2),P=h([S("dmx-universe-grid")],P);var k=class extends y{constructor(){super(...arguments);this.nodeIndex=0;this.errors=[];this.addUniverse="";this.entityMap={};this._filter="";this._sort="address";this._desc=!1;this._picked=[];this._effectOut={}}updated(e){e.has("hass")&&this.hass&&!this._unsubOutput&&(this._unsubOutput=this.hass.connection.subscribeMessage(t=>this._effectOut=t.fixtures??{},{type:"dmx_lighting/effect/output/subscribe"}).catch(()=>async()=>{}))}disconnectedCallback(){super.disconnectedCallback(),this._unsubOutput?.then(e=>e()).catch(()=>{}),this._unsubOutput=void 0}_rows(){let e=[],t=this.node?.universes??{};for(let[r,n]of Object.entries(t)){let s=n.devices??[],a=s.map(c=>T(c));s.forEach((c,u)=>{let[d,p]=a[u],v=a.some(([$,Ce],L)=>L!==u&&d<=Ce&&p>=$),_=`nodes/${this.nodeIndex}/universes/${r}/devices/${u}`,b=this.errors.filter($=>$.path===_||$.path.startsWith(`${_}/`));e.push({device:c,universe:r,index:u,first:d,last:p,overlap:v,errors:b})})}return e}_visibleRows(){let e=this._filter.trim().toLowerCase(),t=this._rows().filter(s=>{if(!e)return!0;let a=s.device,c=(a.channel_labels??[]).filter(Boolean).join(" ");return[a.name,a.friendly_name??"",a.type,`light.${Q(a.name)}`,c].join(" ").toLowerCase().includes(e)}),r=(s,a)=>Number(s.universe)-Number(a.universe)||s.first-a.first,n={address:r,name:(s,a)=>s.device.name.localeCompare(a.device.name)||r(s,a),type:(s,a)=>s.device.type.localeCompare(a.device.type)||r(s,a)};return t.sort(n[this._sort]),this._desc&&t.reverse(),t}_setSort(e){this._sort===e?this._desc=!this._desc:(this._sort=e,this._desc=!1)}_header(e,t){let r=this._sort===e;return l`<th
      class="sortable ${r?"active":""}"
      aria-sort=${r?this._desc?"descending":"ascending":"none"}
      @click=${()=>this._setSort(e)}
    >
      ${t}<span class="arrow">${r?this._desc?"\u25BC":"\u25B2":""}</span>
    </th>`}_pick(e,t){let r=this._picked.filter(n=>n!==e);t&&r.push(e),this._picked=r}_selectAll(e){let t=e.map(n=>Z(this.hass,this.entityMap,this.node.host,n.universe,n.device)).filter(n=>!!n),r=t.length>0&&t.every(n=>this._picked.includes(n));return l`<input type="checkbox" aria-label="Select all" title="Select all" .checked=${r}
      ?disabled=${!t.length}
      @change=${n=>{let s=n.target.checked;this._picked=s?[...new Set([...this._picked,...t])]:this._picked.filter(a=>!t.includes(a))}} />`}_layout(e){let t=Ge(e),r=[];for(let n=0;n<t;n++){let s=xe(e,n);r.push(s.dummy?l`<span class="part dummy" title="Dummy channel, fixed value ${s.value}"
              >${s.text} <b>${s.value}</b></span
            >`:l`<span class="part">${s.text}</span>`)}return l`${r}${z(e)?m:l`<span class="default">default</span>`}`}_liveTile(e,t){let r=this._effectOut[t.name];if(r){let[L,et]=r,[Te,Pe,Ne]=(et??[255,255,255]).map(Qt=>Math.round(Qt)),de=Math.round(L*100),Yt=(.299*Te+.587*Pe+.114*Ne)/255,Zt=de>=50&&Yt>.6?"#000":"#fff",Jt=this.hass?.states?.[e??""]?.attributes?.dmx_effect??"effect";return l`<div
        class="tile on fx"
        style="--tile-color: rgb(${Te}, ${Pe}, ${Ne}); --tile-level: ${de}%; --tile-ink: ${Zt}"
        title="Driven by ${Jt}: ${et?`RGB ${Te}, ${Pe}, ${Ne} \xB7 `:""}${de}%"
      >
        <span class="fill"></span>
        <span class="pct">${de}%</span>
        <span class="fx-badge">FX</span>
      </div>`}let n=e?this.hass?.states?.[e]:void 0;if(!n)return l`<div class="tile none" title="No entity yet — Save & Apply">–</div>`;if(n.state!=="on"){let L=n.state==="off"?"off":n.state;return l`<div class="tile off ${n.state}" title=${`${e}: ${L}`}>${L}</div>`}let s=n.attributes??{},a=Array.isArray(s.rgb_color)?s.rgb_color:[255,255,255],c=typeof s.brightness=="number"?s.brightness:255,u=Math.round(c/255*100),[d,p,v]=a.map(L=>Math.round(Number(L)||0)),_=`rgb(${d}, ${p}, ${v})`,b=(.299*d+.587*p+.114*v)/255,$=u>=50&&b>.6?"#000":"#fff",Ce=[Array.isArray(s.rgb_color)?`RGB ${d}, ${p}, ${v}`:"",typeof s.color_temp_kelvin=="number"?`${s.color_temp_kelvin} K`:"",`${u}%`].filter(Boolean).join(" \xB7 ");return l`<div
      class="tile on"
      style="--tile-color: ${_}; --tile-level: ${u}%; --tile-ink: ${$}"
      title="${e} (${t.type}): ${Ce}"
    >
      <span class="fill"></span>
      <span class="pct">${u}%</span>
    </div>`}_state(e){let t=e?this.hass?.states?.[e]?.state:void 0;return t?l`<span class="state ${t}" title=${t}></span>`:l`<span class="state none" title="Not created yet — Save & Apply">–</span>`}render(){let e=this._rows(),t=this._visibleRows(),r=Object.keys(this.node?.universes??{}),n=e.reduce((s,a)=>s+(a.last-a.first+1),0);return l`
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
        ${this._picked.length?l`<span class="picked">
              <button class="group-btn" title="Make a Home Assistant light group of the selected fixtures"
                @click=${()=>{this.dispatchEvent(new CustomEvent("create-group",{detail:{entities:[...this._picked]},bubbles:!0,composed:!0})),this._picked=[]}}>
                ⧉ Create group (${this._picked.length})
              </button>
              <button class="clear-btn" title="Clear the selection" @click=${()=>this._picked=[]}>✕</button>
            </span>`:m}
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
                    <th class="select-col">${this._selectAll(t)}</th>
                    <th class="swatch-col"></th>
                    ${this._header("name","Name")}
                    ${this._header("type","Type")}
                    ${this._header("address","Address")}
                    <th>Channels</th>
                    <th class="live-col">Output</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.map(s=>{let a=s.device,c=Z(this.hass,this.entityMap,this.node.host,s.universe,a),u=c??`light.${Q(a.name)}`,d=s.errors.length?s.errors.map(p=>p.message).join(`
`):s.overlap?"Overlaps another fixture":"";return l`
                      <tr
                        class=${d?"invalid":""}
                        tabindex="0"
                        title=${d||`Edit ${a.name}`}
                        @click=${()=>this._edit(s)}
                        @keydown=${p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),this._edit(s))}}
                      >
                        <td class="select-col" @click=${p=>p.stopPropagation()}>
                          <input
                            type="checkbox"
                            aria-label="Select ${a.name}"
                            title=${c?`Select ${a.name}`:"Save & Apply first, then it can join a group"}
                            ?disabled=${!c}
                            .checked=${!!c&&this._picked.includes(c)}
                            @keydown=${p=>p.stopPropagation()}
                            @change=${p=>this._pick(c,p.target.checked)}
                          />
                        </td>
                        <td class="swatch-col">
                          <span class="swatch" style="background: ${ye(s.index)}"></span>
                        </td>
                        <td>
                          <div class="name">${a.name}</div>
                          ${a.friendly_name?l`<div class="sub">${a.friendly_name}</div>`:m}
                          <div class="entity">
                            ${this._state(c)}${c?l`<button
                                  class="entity-link"
                                  title="Open ${c}"
                                  @click=${p=>{p.stopPropagation(),J(this,c)}}
                                  @keydown=${p=>p.stopPropagation()}
                                >
                                  <code>${c}</code>
                                </button>`:l`<code>${u}</code>`}
                          </div>
                          ${d?l`<div class="problem">⚠ ${d}</div>`:m}
                        </td>
                        <td>
                          ${a.type}
                          ${a.channel_size&&a.channel_size!=="8bit"?l`<div class="sub">${a.channel_size}</div>`:m}
                          <div
                            class="sub"
                            title=${a.transition==null?"Node default transition":"Fixture overrides the node default"}
                          >
                            fade ${Et(a,this.node)}s${a.transition==null?"":l` <b>own</b>`}
                          </div>
                        </td>
                        <td class="address">
                          <span class="uni">U${s.universe}</span>
                          ${s.first===s.last?s.first:`${s.first}\u2013${s.last}`}
                        </td>
                        <td class="layout">${this._layout(a)}</td>
                        <td class="live-col">${this._liveTile(c,a)}</td>
                      </tr>
                    `})}
                </tbody>
              </table>
            </div>
          `:l`<div class="empty">
            ${e.length?"No fixtures match the filter.":"No fixtures on this node yet."}
          </div>`}
    `}_edit(e){this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:e.device,universe:e.universe},bubbles:!0,composed:!0}))}};k.styles=E`
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
    td:nth-child(3) {
      min-width: 9em;
    }
    .picked {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }
    button.group-btn {
      font: inherit;
      padding: 8px 14px;
      border-radius: 8px 0 0 8px;
      border: none;
      cursor: pointer;
      background: var(--accent-color, #ff9800);
      color: #000;
      font-weight: 600;
    }
    button.clear-btn {
      font: inherit;
      padding: 8px 10px;
      border-radius: 0 8px 8px 0;
      border: none;
      cursor: pointer;
      background: var(--secondary-background-color, #f0f0f0);
      color: var(--primary-text-color);
    }
    .select-col {
      width: 18px;
      padding-right: 0;
    }
    .select-col input {
      margin: 3px 0 0;
      cursor: pointer;
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
      td.swatch-col {
        grid-column: 1;
        grid-row: 1;
      }
      td.select-col {
        grid-column: 1;
        grid-row: 2;
        width: auto;
      }
      td:nth-child(3) {
        grid-column: 2;
        grid-row: 1;
        min-width: 0;
      }
      td:nth-child(4) {
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
  `,h([g({attribute:!1})],k.prototype,"hass",2),h([g({attribute:!1})],k.prototype,"node",2),h([g({type:Number})],k.prototype,"nodeIndex",2),h([g({attribute:!1})],k.prototype,"errors",2),h([g()],k.prototype,"addUniverse",2),h([g({attribute:!1})],k.prototype,"entityMap",2),h([f()],k.prototype,"_filter",2),h([f()],k.prototype,"_sort",2),h([f()],k.prototype,"_desc",2),h([f()],k.prototype,"_picked",2),h([f()],k.prototype,"_effectOut",2),k=h([S("dmx-fixture-list")],k);var Ee=[{type:"chase",label:"Chase",kind:"intensity",description:"One fixture after another"},{type:"sine",label:"Wave",kind:"intensity",description:"Smooth rise and fall"},{type:"ramp_up",label:"Ramp up",kind:"intensity",description:"Fade up, then snap off"},{type:"ramp_down",label:"Ramp down",kind:"intensity",description:"Snap on, then fade down"},{type:"triangle",label:"Triangle",kind:"intensity",description:"Linear up and down"},{type:"square",label:"Pulse",kind:"intensity",description:"On / off blocks"},{type:"sparkle",label:"Sparkle",kind:"intensity",description:"Random flashes"},{type:"rainbow",label:"Rainbow",kind:"color",description:"Hue rotates through the spectrum"},{type:"color_chase",label:"Colour steps",kind:"color",description:"Steps through 2+ colours you pick"},{type:"color_wave",label:"Colour fade",kind:"color",description:"Fades smoothly through your colours"}],ce=o=>Ee.find(i=>i.type===o)?.kind==="color",Se={speed:{default:30,min:.1,max:600},size:{default:100,min:0,max:100},base:{default:0,min:0,max:100},spread:{default:360,min:0,max:3600},groups:{default:1,min:1,max:512},blocks:{default:1,min:1,max:512},wings:{default:1,min:1,max:512},duty:{default:null,min:1,max:100},crossfade:{default:0,min:0,max:100},fade_in:{default:1,min:0,max:600},fade_out:{default:1,min:0,max:600},seed:{default:0,min:0,max:2**31-1}},Ae=[[255,0,0],[0,255,0],[0,0,255]],Kt=[{name:"RGB",colors:[[255,0,0],[0,255,0],[0,0,255]]},{name:"Warm",colors:[[255,60,0],[255,150,20],[255,210,120]]},{name:"Ocean",colors:[[0,40,255],[0,200,255],[0,255,170]]},{name:"Sunset",colors:[[255,40,90],[255,120,0],[150,0,255]]},{name:"Party",colors:[[255,0,160],[0,255,255],[255,230,0],[120,0,255]]},{name:"Police",colors:[[255,0,0],[0,0,255]]}],F=o=>ce(o)?"color":"intensity";function M(o,i){let e=o[i];return e??Se[i]?.default}function Me(o){return`light.fx_${o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}`}function Gt(o){let i=o>>>0;return()=>{i=i+1831565813>>>0;let e=i;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ze(o,i){let e=[...o];if(i.shuffle){let t=Gt(M(i,"seed")+1);for(let r=e.length-1;r>0;r--){let n=Math.floor(t()*(r+1));[e[r],e[n]]=[e[n],e[r]]}}return i.direction==="reverse"&&e.reverse(),e}function gr(o,i){if(o<=0)return[];let e=Math.max(1,Math.floor(M(i,"blocks"))),t=Math.max(1,Math.floor(M(i,"groups"))),r=Math.max(1,Math.floor(M(i,"wings"))),n=Math.ceil(o/e),s=Math.ceil(n/t),a=Math.ceil(s/r),c=[];for(let u=0;u<o;u++){let p=Math.floor(u/e)%s,v=Math.floor(p/a),_=p%a;v%2===1&&(_=a-1-_),c.push({position:_/a,count:a,index:_})}return c}var Xt=o=>(o%1+1)%1;function br(o,i,e){if(e.direction==="bounce"){let t=Math.floor(o),r=o-t;o=t%2===0?r:1-r}return Xt(o-i.position*M(e,"spread")/360)}function Wt(o,i,e){if(o>=i)return 0;let t=i*e/2;return t<=0?1:o<t?o/t:o>i-t?(i-o)/t:1}function Bt(...o){let i=2166136261;for(let e of o)i^=Math.floor(e)+2654435769,i=Math.imul(i,16777619);return Gt(i)()}function Je(o,i,e,t,r){let n=e.duty,s=M(e,"crossfade")/100;switch(o){case"sine":return .5-.5*Math.cos(2*Math.PI*i);case"ramp_up":return i;case"ramp_down":return 1-i;case"triangle":return 1-Math.abs(2*i-1);case"square":return Wt(i,(n??50)/100,s);case"chase":return Wt(i,n!=null?n/100:1/Math.max(1,t.count),s);case"sparkle":{let a=(n??30)/100,c=M(e,"seed"),u=r+Bt(1,t.index,c),d=Math.floor(u);if(Bt(2,t.index,d,c)>=a)return 0;let p=u-d;return p<.25?1-p/.25:0}default:return 0}}function _r(o){let i=Math.floor(o*6),e=o*6-i,t=1-e,[r,n,s]=[[1,e,0],[t,1,0],[0,1,e],[0,t,1],[e,0,1],[1,0,t]][(i%6+6)%6];return[Math.round(r*255),Math.round(n*255),Math.round(s*255)]}var qt=(o,i,e)=>[0,1,2].map(t=>Math.round(o[t]+(i[t]-o[t])*e));function Qe(o,i,e){let t=e.colors?.length?e.colors:Ae;if(o==="rainbow")return _r(Xt(i));if(o==="color_chase"){let u=t.length,d=i*u,p=Math.floor(d)%u,v=d-Math.floor(d),_=M(e,"crossfade")/100;return _>0&&v>1-_?qt(t[p],t[(p+1)%u],(v-(1-_))/_):t[p]}let r=t.length<2?[t[0],[0,0,0]]:t,n=r.length,s=i*n,a=Math.floor(s)%n,c=s-Math.floor(s);return qt(r[a],r[(a+1)%n],.5-.5*Math.cos(Math.PI*c))}function Ve(o,i,e,t){let r=M(i,"size")/100,n=M(i,"base")/100;return gr(e,i).map(s=>{let a=br(t,s,i);if(ce(o))return{level:1,rgb:Qe(o,a,i)};let c=n+r*Je(o,a,i,s,t);return{level:Math.min(1,Math.max(0,c)),rgb:null}})}function De(o){return{id:crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2),name:o,type:"chase",fixtures:[],params:{speed:60,fade_in:1,fade_out:1}}}var G="group:",xr=o=>"#"+o.map(i=>i.toString(16).padStart(2,"0")).join(""),yr=o=>[1,3,5].map(i=>parseInt(o.slice(i,i+2),16)),w=class extends y{constructor(){super(...arguments);this.effects=[];this.fixtures=[];this.errors=[];this.savedNames=[];this._selectedId="";this._filter="";this._live=!1;this._liveError="";this._phase=0;this._paused=!1;this._layerWithId="";this._phaseOther=0;this._raf=0;this._lastFrame=0;this._previewId="";this._dragIndex=null;this._animate=e=>{let t=this._current();if(t&&!this._paused){let r=this._lastFrame?(e-this._lastFrame)/1e3:0;this._phase+=r*M(t.params,"speed")/60;let n=this._layerWith(t);n&&(this._phaseOther+=r*M(n.params,"speed")/60)}this._lastFrame=e,this._raf=requestAnimationFrame(this._animate)}}connectedCallback(){super.connectedCallback(),this._raf=requestAnimationFrame(this._animate)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._raf),this._stopLive()}willUpdate(e){e.has("effects")&&!this.effects.find(t=>t.id===this._selectedId)&&(this._selectedId=this.effects[0]?.id??""),e.has("savedNames")&&e.get("savedNames")!==void 0&&this._stopLive()}updated(e){e.has("_selectedId")&&this.renderRoot.querySelector(".main")?.scrollTo(0,0)}_current(){return this.effects.find(e=>e.id===this._selectedId)}_layerWith(e){let t=this.effects.find(r=>r.id===this._layerWithId);return t&&F(t.type)!==F(e.type)?t:void 0}_emit(e){this.dispatchEvent(new CustomEvent("effects-changed",{detail:{effects:e},bubbles:!0,composed:!0}))}_update(e){let t=this._current();if(!t)return;let r={...t,...e};this._emit(this.effects.map(n=>n.id===t.id?r:n)),this._schedulePreviewUpdate(r)}_setType(e){let t=this._current();if(t){if((e==="color_chase"||e==="color_wave")&&(t.params.colors?.length??0)<2){this._update({type:e,params:{...t.params,colors:Ae.map(r=>[...r])}});return}this._update({type:e})}}_setParam(e,t){let r=this._current();if(!r)return;let n={...r.params,[e]:t};t==null&&delete n[e],this._update({params:n})}_add(){let e=new Set(this.effects.map(n=>n.name.toLowerCase())),t=this.effects.length+1;for(;e.has(`effect ${t}`);)t++;let r=De(`Effect ${t}`);this._emit([...this.effects,r]),this._select(r.id)}_duplicate(){let e=this._current();if(!e)return;let t={...structuredClone(e),id:De("").id,name:`${e.name} copy`};this._emit([...this.effects,t]),this._select(t.id)}_delete(){let e=this._current();!e||!confirm(`Delete the effect "${e.name}"?`)||(this._stopLive(),this._emit(this.effects.filter(t=>t.id!==e.id)))}_select(e){e!==this._selectedId&&(this._stopLive(),this._selectedId=e,this._phase=0)}_usable(){return this.fixtures.filter(e=>e.type!=="fixed")}_states(){return this.hass.states??{}}_groupMembers(e,t=0){let r=this._states()[e]?.attributes?.entity_id;return!Array.isArray(r)||t>4?[e]:r.flatMap(n=>this._groupMembers(n,t+1))}_expand(e){let t=new Map(this._usable().map(s=>[s.entityId,s.name])),r=new Set(this._usable().map(s=>s.name)),n=[];for(let s of e){let a=s.startsWith(G)?this._groupMembers(s.slice(G.length)).map(c=>t.get(c)).filter(c=>!!c):r.has(s)?[s]:[];for(let c of a)n.includes(c)||n.push(c)}return n}_groups(){let e=new Map(this._usable().map(r=>[r.entityId,r.name])),t=[];for(let[r,n]of Object.entries(this._states())){let s=r.split(".")[0];if(s!=="light"&&s!=="group"||!Array.isArray(n.attributes?.entity_id))continue;let a=this._groupMembers(r),c=[...new Set(a.map(u=>e.get(u)).filter(u=>!!u))];c.length&&t.push({entityId:r,name:n.attributes.friendly_name||r,fixtures:c,total:new Set(a).size})}return t.sort((r,n)=>r.name.localeCompare(n.name))}_groupLabel(e){let t=e.slice(G.length);return this._states()[t]?.attributes?.friendly_name||t}_expandGroup(e){let t=this._current();if(!t)return;let r=t.fixtures.indexOf(e),n=this._expand([e]).filter(a=>!t.fixtures.includes(a)),s=[...t.fixtures];s.splice(r,1,...n),this._update({fixtures:s})}_toggleFixture(e,t){let r=this._current();if(!r)return;let n=r.fixtures.filter(s=>s!==e);t&&n.push(e),this._update({fixtures:n})}_setAll(e,t){let r=this._current();if(r)if(t){let n=e.filter(s=>!r.fixtures.includes(s));this._update({fixtures:[...r.fixtures,...n]})}else this._update({fixtures:r.fixtures.filter(n=>!e.includes(n))})}_sortByAddress(){let e=this._current();if(!e)return;let t=n=>{let s=this.fixtures.find(a=>a.name===n);return s?[s.host,Number(s.universe),s.channel]:["",0,0]},r=[...e.fixtures].sort((n,s)=>{let[a,c,u]=t(n),[d,p,v]=t(s);return a.localeCompare(d)||c-p||u-v});this._update({fixtures:r})}_move(e,t){let r=this._current();if(!r||t<0||t>=r.fixtures.length||e===t)return;let n=[...r.fixtures],[s]=n.splice(e,1);n.splice(t,0,s),this._update({fixtures:n})}async _toggleLive(e){if(!e){this._stopLive();return}let t=this._current();if(t){this._liveError="",this._previewId=`${t.id}-${Date.now()}`,this._live=!0;try{this._previewStop=await Nt(this.hass,this._previewId,this._payload(t))}catch(r){this._live=!1,this._previewStop=void 0,this._liveError=r?.message??String(r)}}}_stopLive(){window.clearTimeout(this._previewTimer);let e=this._previewStop;this._previewStop=void 0,this._live=!1,e?.().catch(()=>{})}_payload(e){let{id:t,...r}=e;return r}_schedulePreviewUpdate(e){!this._live||!this._previewStop||(window.clearTimeout(this._previewTimer),this._previewTimer=window.setTimeout(async()=>{try{await It(this.hass,this._previewId,this._payload(e)),this._liveError=""}catch(t){this._liveError=t?.message??String(t)}},120))}_entityState(e){if(this.savedNames.includes(e.name))return this.hass.states?.[Me(e.name)]}_runSaved(e,t,r){r.stopPropagation(),Rt(this.hass,"light",t?"turn_on":"turn_off",{entity_id:Me(e.name)})}_errorsFor(e){let t=`effects/${e}`;return this.errors.filter(r=>r.path===t||r.path.startsWith(`${t}/`))}render(){let e=this._current();return l`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Effects</div>
          ${this.effects.map((t,r)=>{let n=this._entityState(t),s=n?.state==="on",a=Ee.find(c=>c.type===t.type);return l`
              <div
                class="rail-item ${t.id===this._selectedId?"active":""}
                  ${this._errorsFor(r).length?"invalid":""}"
                role="button"
                tabindex="0"
                @click=${()=>this._select(t.id)}
                @keydown=${c=>c.key==="Enter"&&this._select(t.id)}
              >
                <span class="rail-text">
                  <span class="rail-title">${t.name||"(unnamed)"}</span>
                  <span class="rail-sub">
                    <span class="badge ${F(t.type)}">${F(t.type)==="color"?"Colour":"Intensity"}</span>
                    ${a?.label??t.type} · ${this._expand(t.fixtures).length} fixture${this._expand(t.fixtures).length===1?"":"s"}
                    ${n?m:l` · <em>not saved</em>`}
                  </span>
                </span>
                ${n?l`<button
                      class="run ${s?"on":""}"
                      title=${s?"Stop (fades out)":"Run (fades in)"}
                      aria-label=${s?`Stop ${t.name}`:`Run ${t.name}`}
                      @click=${c=>this._runSaved(t,!s,c)}
                    >${s?"\u25A0":"\u25B6"}</button>`:m}
              </div>
            `})}
          <button class="rail-add" @click=${this._add}>+ New effect</button>
        </nav>
        <main class="main">
          ${e?this._renderEditor(e):this._renderEmpty()}
        </main>
      </div>
    `}_renderEmpty(){return l`<div class="empty">
      <p>Effects run patterns across your fixtures: chases, waves, rainbows and more.</p>
      <button class="primary" @click=${this._add}>+ New effect</button>
    </div>`}_renderEditor(e){let t=this.effects.findIndex(s=>s.id===e.id),r=this._errorsFor(t),n=ce(e.type);return l`
      <div class="editor-head">
        <input
          class="name"
          aria-label="Effect name"
          .value=${e.name}
          @input=${s=>this._update({name:s.target.value})}
        />
        <span class="entity">${Me(e.name||"effect")}</span>
        <span class="spacer"></span>
        <button @click=${this._duplicate}>Duplicate</button>
        <button class="danger" @click=${this._delete}>Delete</button>
      </div>

      ${r.length?l`<div class="errors">${r.map(s=>l`<div>⚠ ${s.message}</div>`)}</div>`:m}

      ${this._renderPreview(e)}

      <section>
        <h3>Effect</h3>
        <div class="layer-note">
          Intensity effects move brightness and keep each fixture's colour; colour effects set
          the colour. Run one of each on the same fixtures to <b>layer</b> them — e.g. a chase
          over a rainbow.
        </div>
        ${["intensity","color"].map(s=>l`
            <div class="type-group">
              <div class="type-group-label">${s==="color"?"Colour":"Intensity"}</div>
              <div class="types">
                ${Ee.filter(a=>a.kind===s).map(a=>l`
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
    `}_renderPreview(e){let t=Ze(this._expand(e.fixtures),e.params),r=Ve(e.type,e.params,t.length,this._phase),n=new Map(t.map((d,p)=>[d,r[p]])),s=this._expand(e.fixtures).filter(d=>n.has(d)),a=s.map(d=>n.get(d)),c=this._layerWith(e);if(c){let d=Ze(this._expand(c.fixtures),c.params),p=Ve(c.type,c.params,d.length,this._phaseOther),v=new Map(d.map((_,b)=>[_,p[b]]));s.forEach((_,b)=>{let $=v.get(_);$&&(a[b]=F(e.type)==="intensity"?{level:a[b].level,rgb:$.rgb}:{level:$.level,rgb:a[b].rgb})})}let u=this.effects.filter(d=>d.id!==e.id&&F(d.type)!==F(e.type));return l`
      <section class="preview">
        <div class="preview-head">
          <h3>Preview</h3>
          <button class="small" @click=${()=>this._paused=!this._paused}>
            ${this._paused?"\u25B6 Play":"\u275A\u275A Pause"}
          </button>
          ${u.length?l`<label class="layer-with">
                Layer with
                <select @change=${d=>{this._layerWithId=d.target.value,this._phaseOther=0}}>
                  <option value="" ?selected=${!c}>nothing</option>
                  ${u.map(d=>l`<option value=${d.id} ?selected=${c?.id===d.id}>${d.name}</option>`)}
                </select>
              </label>`:m}
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
        ${this._liveError?l`<div class="live-error">${this._liveError}</div>`:m}
        ${s.length?l`<div class="strip">
              ${s.map((d,p)=>{let v=a[p],_=v.rgb??[255,214,150],b=_.map($=>Math.round($*v.level));return l`<div class="cell" title=${`${d}: ${Math.round(v.level*100)}%`}>
                  <div class="lamp" style="background: rgb(${b.join(",")}); box-shadow: 0 0 ${Math.round(14*v.level)}px rgba(${_.join(",")}, ${(.8*v.level).toFixed(2)})"></div>
                  <div class="cell-name">${d}</div>
                </div>`})}
            </div>`:l`<div class="hint">Pick some fixtures below to see the effect.</div>`}
      </section>
    `}_typeGlyph(e,t){if(ce(e)){let c=Array.from({length:12},(u,d)=>{let p=Qe(e,d/11,t);return ft`<stop offset=${d/11} stop-color=${`rgb(${p.join(",")})`} />`});return l`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
        <defs><linearGradient id="g-${e}">${c}</linearGradient></defs>
        <rect x="2" y="5" width=${60} height=${12} rx="4" fill="url(#g-${e})" />
      </svg>`}let s={position:0,count:4,index:0},a=Array.from({length:65},(c,u)=>{let d=u/64*2,p=Je(e,d%1,{...t,seed:3},s,d);return`${2+u/64*60},${19-p*16}`}).join(" ");return l`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
      <polyline points=${a} fill="none" stroke="currentColor" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" />
    </svg>`}_renderFixtures(e){let t=this._filter.trim().toLowerCase(),r=this._usable(),n=new Map;for(let d of r){if(t&&!`${d.name} ${d.type}`.toLowerCase().includes(t))continue;let p=`${d.host} \xB7 universe ${d.universe}`;n.set(p,[...n.get(p)??[],d])}let s=this._groups().filter(d=>!t||`${d.name} ${d.entityId}`.toLowerCase().includes(t)),a=this._states(),c=e.fixtures.filter(d=>d.startsWith(G)?!a[d.slice(G.length)]:!r.some(p=>p.name===d)),u=this._expand(e.fixtures).length;return l`
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
              ${s.length?l`<div class="pick-group">
                    <div class="pick-head plain">Home Assistant groups</div>
                    ${s.map(d=>{let p=`${G}${d.entityId}`;return l`<label class="pick-item" title=${d.fixtures.join(", ")}>
                        <input type="checkbox" .checked=${e.fixtures.includes(p)}
                          @change=${v=>this._toggleFixture(p,v.target.checked)} />
                        <span class="pick-name"><span class="group-icon" aria-hidden="true">⧉</span>${d.name}</span>
                        <span class="pick-sub">${d.fixtures.length} fixture${d.fixtures.length===1?"":"s"}${d.total>d.fixtures.length?` of ${d.total} lights`:""}</span>
                      </label>`})}
                  </div>`:m}
              ${r.length?[...n.entries()].map(([d,p])=>{let v=p.map(b=>b.name),_=v.every(b=>e.fixtures.includes(b));return l`
                      <div class="pick-group">
                        <label class="pick-head">
                          <input type="checkbox" .checked=${_}
                            @change=${b=>this._setAll(v,b.target.checked)} />
                          ${d}
                        </label>
                        ${p.map(b=>l`<label class="pick-item">
                            <input type="checkbox" .checked=${e.fixtures.includes(b.name)}
                              @change=${$=>this._toggleFixture(b.name,$.target.checked)} />
                            <span class="pick-name">${b.name}</span>
                            <span class="pick-sub">${b.type} · ${b.channel}</span>
                          </label>`)}
                      </div>`}):l`<div class="hint">No fixtures in the patch yet.</div>`}
            </div>
          </div>
          <div class="order">
            <div class="order-head">
              <span>Order <span class="order-count">(${u} fixture${u===1?"":"s"})</span></span>
              <span class="spacer"></span>
              <button class="small" ?disabled=${e.fixtures.length<2} @click=${this._sortByAddress}>By address</button>
              <button class="small" ?disabled=${e.fixtures.length<2}
                @click=${()=>this._update({fixtures:[...e.fixtures].reverse()})}>Reverse</button>
              <button class="small" ?disabled=${!e.fixtures.length}
                @click=${()=>this._update({fixtures:[]})}>Clear</button>
            </div>
            ${e.fixtures.length?l`<ol class="order-list">
                  ${e.fixtures.map((d,p)=>l`<li
                      class=${c.includes(d)?"missing":""}
                      draggable="true"
                      @dragstart=${v=>{this._dragIndex=p,v.dataTransfer.effectAllowed="move",v.dataTransfer.setData("text/plain",d)}}
                      @dragover=${v=>v.preventDefault()}
                      @drop=${v=>{v.preventDefault(),this._dragIndex!==null&&this._move(this._dragIndex,p),this._dragIndex=null}}
                    >
                      <span class="grip" aria-hidden="true">⋮⋮</span>
                      <span class="order-nr">${p+1}</span>
                      ${d.startsWith(G)?l`<span class="order-name group" title=${this._expand([d]).join(", ")}>
                            <span class="group-icon" aria-hidden="true">⧉</span>${this._groupLabel(d)}
                            <small>${c.includes(d)?"group not found":`${this._expand([d]).length} fixtures`}</small>
                          </span>
                          <button class="small" title="Replace the group with its fixtures, to order them one by one"
                            ?disabled=${c.includes(d)} @click=${()=>this._expandGroup(d)}>Expand</button>`:l`<span class="order-name">${d}${c.includes(d)?" (not in patch)":""}</span>`}
                      <button class="icon" title="Move up" ?disabled=${p===0} @click=${()=>this._move(p,p-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${p===e.fixtures.length-1}
                        @click=${()=>this._move(p,p+1)}>↓</button>
                      <button class="icon" title="Remove" @click=${()=>this._toggleFixture(d,!1)}>✕</button>
                    </li>`)}
                </ol>`:l`<div class="hint">Tick fixtures or groups on the left. The effect flows through them in this order — drag to rearrange. A group follows its members when the effect starts and as the group changes.</div>`}
          </div>
        </div>
      </section>
    `}_renderShape(e){let t=e.type,r=t==="square"||t==="chase"||t==="sparkle",n=t==="square"||t==="chase",s=e.params.duty==null;return l`
      <section>
        <h3>Shape</h3>
        ${this._slider("Size","size",e,{min:0,max:100,step:1,unit:"%",hint:"How far the intensity moves"})}
        ${this._slider("Base","base",e,{min:0,max:100,step:1,unit:"%",hint:"Lowest intensity"})}
        ${r?l`
              ${t==="chase"||t==="sparkle"?l`<label class="check">
                    <input type="checkbox" .checked=${s}
                      @change=${a=>this._setParam("duty",a.target.checked?null:t==="sparkle"?30:25)} />
                    ${t==="chase"?"One fixture at a time":"Default sparkle amount"}
                  </label>`:m}
              ${!s||t==="square"?this._slider(t==="sparkle"?"Amount":"On time","duty",e,{min:1,max:100,step:1,unit:"%",fallback:50,hint:t==="sparkle"?"How often fixtures flash":"Share of each cycle that is on"}):m}
            `:m}
        ${n?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Fade instead of snap"}):m}
      </section>
    `}_renderColors(e){if(e.type==="rainbow")return l`<section><h3>Colours</h3>
        <div class="hint">The rainbow runs through every hue. Use Spread to set how many colours show at once.</div>
      </section>`;let t=e.params.colors?.length?e.params.colors:Ae,r=s=>this._setParam("colors",s),n=(s,a)=>s.length===a.length&&s.every((c,u)=>c.every((d,p)=>d===a[u][p]));return l`
      <section>
        <h3>Colours</h3>
        <div class="hint">
          ${e.type==="color_chase"?"Each fixture steps through these colours in order. Pick 2 or more.":"Each fixture fades smoothly through these colours in order. Pick 2 or more."}
        </div>
        <div class="colors">
          ${t.map((s,a)=>l`<div class="color">
              <span class="color-nr">${a+1}</span>
              <input type="color" aria-label="Colour ${a+1}" .value=${xr(s)}
                @input=${c=>r(t.map((u,d)=>d===a?yr(c.target.value):u))} />
              <span class="color-tools">
                <button class="icon" title="Move earlier" ?disabled=${a===0}
                  @click=${()=>{let c=[...t];[c[a-1],c[a]]=[c[a],c[a-1]],r(c)}}>←</button>
                <button class="icon" title="Move later" ?disabled=${a===t.length-1}
                  @click=${()=>{let c=[...t];[c[a+1],c[a]]=[c[a],c[a+1]],r(c)}}>→</button>
                <button class="icon" title="Remove colour" ?disabled=${t.length<=2}
                  @click=${()=>r(t.filter((c,u)=>u!==a))}>✕</button>
              </span>
            </div>`)}
          ${t.length<16?l`<button class="add-color" title="Add a colour"
                @click=${()=>r([...t,[255,255,255]])}>+</button>`:m}
        </div>
        <div class="palettes">
          <span class="field-label">Palettes</span>
          ${Kt.map(s=>l`<button class="palette ${n(s.colors,t)?"active":""}"
              title=${s.name} @click=${()=>r(s.colors.map(a=>[...a]))}>
              <span class="palette-swatch" style="background: linear-gradient(90deg, ${s.colors.map(a=>`rgb(${a.join(",")})`).join(", ")})"></span>
              ${s.name}
            </button>`)}
        </div>
        ${e.type==="color_chase"?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Blend into the next colour"}):m}
      </section>
    `}_renderFlow(e){let t=e.params.direction??"forward",r=[["forward","Forward"],["reverse","Reverse"],["bounce","Bounce"]];return l`
      <section>
        <h3>Flow across fixtures</h3>
        ${this._slider("Spread","spread",e,{min:0,max:720,step:15,unit:"\xB0",hint:"0\xB0 = all together, 360\xB0 = one wave across them all"})}
        <div class="field">
          <span class="field-label">Direction</span>
          <div class="segmented" role="group" aria-label="Direction">
            ${r.map(([n,s])=>l`<button class=${t===n?"active":""} aria-pressed=${t===n}
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
          ${e.params.shuffle?l`<button class="small" @click=${()=>this._setParam("seed",(e.params.seed??0)+1)}>Reshuffle</button>`:m}
        </div>
        <div class="row3">
          ${this._stepper("Groups","groups",e,"Repeat the pattern in N parts")}
          ${this._stepper("Blocks","blocks",e,"N fixtures move together")}
          ${this._stepper("Wings","wings",e,"Mirror every other part")}
        </div>
      </section>
    `}_slider(e,t,r,n){let a=r.params[t]??Se[t]?.default??n.fallback??n.min,c=Se[t];return l`<div class="field">
      <span class="field-label">${e}</span>
      <input type="range" min=${n.min} max=${n.max} step=${n.step} .value=${String(Math.min(n.max,a))}
        aria-label=${e}
        @input=${u=>this._setParam(t,Number(u.target.value))} />
      <span class="num">
        <input type="number" min=${c?.min??n.min} max=${c?.max??n.max} step=${n.step===15?1:n.step}
          .value=${String(a)} aria-label="${e} value"
          @change=${u=>{let d=Number(u.target.value);Number.isNaN(d)||this._setParam(t,d)}} />
        <span class="unit">${n.unit}</span>
      </span>
      ${n.hint?l`<span class="field-hint">${n.hint}</span>`:m}
    </div>`}_number(e,t,r,n,s){return l`<label class="field compact">
      <span class="field-label">${e}</span>
      <span class="num">
        <input type="number" min="0" max="600" step=${s} .value=${String(M(r.params,t))}
          @change=${a=>this._setParam(t,Number(a.target.value))} />
        <span class="unit">${n}</span>
      </span>
    </label>`}_stepper(e,t,r,n){let s=M(r.params,t),a=c=>this._setParam(t,Math.max(1,Math.min(512,c))===1?void 0:Math.max(1,Math.min(512,c)));return l`<div class="stepper" title=${n}>
      <span class="field-label">${e}</span>
      <div class="stepper-ctl">
        <button class="icon" aria-label="Fewer ${e.toLowerCase()}" ?disabled=${s<=1} @click=${()=>a(s-1)}>−</button>
        <span class="stepper-val">${s}</span>
        <button class="icon" aria-label="More ${e.toLowerCase()}" @click=${()=>a(s+1)}>+</button>
      </div>
      <span class="field-hint">${n}</span>
    </div>`}};w.styles=E`
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
  `,h([g({attribute:!1})],w.prototype,"hass",2),h([g({attribute:!1})],w.prototype,"effects",2),h([g({attribute:!1})],w.prototype,"fixtures",2),h([g({attribute:!1})],w.prototype,"errors",2),h([g({attribute:!1})],w.prototype,"savedNames",2),h([f()],w.prototype,"_selectedId",2),h([f()],w.prototype,"_filter",2),h([f()],w.prototype,"_live",2),h([f()],w.prototype,"_liveError",2),h([f()],w.prototype,"_phase",2),h([f()],w.prototype,"_paused",2),h([f()],w.prototype,"_layerWithId",2),w=h([S("dmx-effects-view")],w);var C=class extends y{constructor(){super(...arguments);this.fixtures=[];this.prefill=null;this._groups=[];this._loaded=!1;this._selected="";this._draft=null;this._saving=!1;this._error="";this._filter=""}connectedCallback(){super.connectedCallback(),this._load()}willUpdate(e){e.has("prefill")&&this.prefill&&this._startNew(this.prefill.entities)}async _load(e){try{this._groups=(await Ut(this.hass)).groups,this._error=""}catch(t){this._error=t?.message??String(t)}this._loaded=!0,e?this._select(e):!this._selected&&this._groups.length&&this._select(this._groups[0].entry_id)}_current(){return this._groups.find(e=>e.entry_id===this._selected)}_select(e){let t=this._groups.find(r=>r.entry_id===e);this._selected=e,this._error="",this._draft=t?{name:t.name,entities:[...t.entities]}:null}_startNew(e=[]){this._selected="new",this._error="",this._draft={name:"",entities:[...e]},this.updateComplete.then(()=>this.renderRoot.querySelector("input.name")?.focus())}_dirty(){if(!this._draft)return!1;if(this._selected==="new")return!0;let e=this._current();return!!e&&(e.name!==this._draft.name||e.entities.join()!==this._draft.entities.join())}_byEntity(){return new Map(this.fixtures.map(e=>[e.entityId??"",e]))}_setMembers(e){this._draft&&(this._draft={...this._draft,entities:e})}_toggle(e,t){let r=(this._draft?.entities??[]).filter(n=>n!==e);t&&r.push(e),this._setMembers(r)}_setAll(e,t){let r=this._draft?.entities??[];this._setMembers(t?[...r,...e.filter(n=>!r.includes(n))]:r.filter(n=>!e.includes(n)))}_move(e,t){let r=[...this._draft?.entities??[]];if(t<0||t>=r.length)return;let[n]=r.splice(e,1);r.splice(t,0,n),this._setMembers(r)}async _save(){let e=this._draft;if(e){if(!e.name.trim()){this._error="Give the group a name";return}if(!e.entities.length){this._error="Pick at least one fixture";return}this._saving=!0,this._error="";try{if(this._selected==="new"){let t=await Lt(this.hass,e.name,e.entities);this._toast(`Created ${t.name}${t.entity_id?` (${t.entity_id})`:""}`),await this._load(t.entry_id)}else{let t=this._current(),r={};t.name!==e.name&&(r.name=e.name),t.entities.join()!==e.entities.join()&&(r.entities=e.entities),await Ht(this.hass,t.entry_id,r),this._toast(`Saved ${e.name}`),await this._load(t.entry_id)}}catch(t){this._error=t?.message??String(t)}finally{this._saving=!1}}}async _delete(){let e=this._current();if(!(!e||!confirm(`Delete the light group "${e.name}"? Effects using it will skip it.`))){this._saving=!0;try{await zt(this.hass,e.entry_id),this._toast(`Deleted ${e.name}`),this._selected="",this._draft=null,await this._load()}catch(t){this._error=t?.message??String(t)}finally{this._saving=!1}}}_toast(e){this.dispatchEvent(new CustomEvent("panel-toast",{detail:e,bubbles:!0,composed:!0}))}render(){let e=this._byEntity();return l`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Light groups</div>
          ${this._groups.map(t=>{let r=t.entities.filter(s=>e.has(s)).length,n=t.entity_id?this.hass.states?.[t.entity_id]?.state:void 0;return l`<button
              class="rail-item ${t.entry_id===this._selected?"active":""}"
              @click=${()=>this._select(t.entry_id)}
            >
              <span class="dot ${n??""}"></span>
              <span class="rail-text">
                <span class="rail-title">${t.name}</span>
                <span class="rail-sub">${r} fixture${r===1?"":"s"}${t.entities.length>r?` \xB7 ${t.entities.length-r} other`:""}</span>
              </span>
            </button>`})}
          ${this._selected==="new"?l`<div class="rail-item active new"><span class="rail-title">New group</span></div>`:m}
          <button class="rail-add" @click=${()=>this._startNew()}>+ New group</button>
        </nav>
        <main class="main">
          ${this._draft?this._renderEditor():this._renderEmpty()}
        </main>
      </div>
    `}_renderEmpty(){return l`<div class="empty">
      ${this._loaded?l`<p>Light groups gather fixtures under one light entity — for dashboards,
            automations and effects.</p>
            <p class="hint">Tip: in the Patch tab's list view, tick fixtures and use
            <b>Create group</b>.</p>
            <button class="primary" @click=${()=>this._startNew()}>+ New group</button>`:"Loading\u2026"}
      ${this._error?l`<div class="error">${this._error}</div>`:m}
    </div>`}_renderEditor(){let e=this._draft,t=this._current(),r=this._selected==="new",n=this._byEntity(),s=this._filter.trim().toLowerCase(),a=new Map,c=0;for(let d of this.fixtures){if(!d.entityId||!this.hass.states?.[d.entityId]){c++;continue}if(s&&!`${d.name} ${d.type}`.toLowerCase().includes(s))continue;let p=`${d.host} \xB7 universe ${d.universe}`;a.set(p,[...a.get(p)??[],d])}let u=t?.entity_id?this.hass.states?.[t.entity_id]:void 0;return l`
      <div class="editor-head">
        <input
          class="name"
          placeholder="Group name, e.g. Front wash"
          aria-label="Group name"
          .value=${e.name}
          @input=${d=>this._draft={...e,name:d.target.value}}
        />
        ${t?.entity_id?l`<button class="link" title="Open the group's light entity"
              @click=${()=>J(this,t.entity_id)}>
              <span class="dot ${u?.state??""}"></span><code>${t.entity_id}</code>
            </button>`:l`<span class="hint">${r?"Becomes a light entity when you create it":""}</span>`}
        <span class="spacer"></span>
        ${r?m:l`<button class="danger" ?disabled=${this._saving} @click=${this._delete}>Delete</button>`}
        ${this._dirty()&&!r?l`<button ?disabled=${this._saving} @click=${()=>this._select(this._selected)}>Discard</button>`:m}
        <button class="primary" ?disabled=${this._saving||!this._dirty()} @click=${this._save}>
          ${this._saving?"Saving\u2026":r?"Create group":"Save"}
        </button>
      </div>
      <div class="hint note">
        This is a Home Assistant light group helper (also under Settings → Helpers). Changes are
        saved straight away — no Save &amp; Apply needed. The order of members is the order effects
        flow through them.
      </div>
      ${this._error?l`<div class="error">${this._error}</div>`:m}

      <section>
        <h3>Members</h3>
        <div class="members">
          <div class="pick">
            <input class="filter" type="search" placeholder="Filter fixtures" .value=${this._filter}
              @input=${d=>this._filter=d.target.value} />
            <div class="pick-list">
              ${this.fixtures.length?[...a.entries()].map(([d,p])=>{let v=p.map(b=>b.entityId),_=v.every(b=>e.entities.includes(b));return l`<div class="pick-group">
                      <label class="pick-head">
                        <input type="checkbox" .checked=${_}
                          @change=${b=>this._setAll(v,b.target.checked)} />
                        ${d}
                      </label>
                      ${p.map(b=>l`<label class="pick-item">
                        <input type="checkbox" .checked=${e.entities.includes(b.entityId)}
                          @change=${$=>this._toggle(b.entityId,$.target.checked)} />
                        <span class="pick-name">${b.name}</span>
                        <span class="pick-sub">${b.type} · ${b.channel}</span>
                      </label>`)}
                    </div>`}):l`<div class="hint">No fixtures in the patch yet.</div>`}
              ${c?l`<div class="hint">${c} new fixture${c===1?"":"s"} not listed:
                    Save &amp; Apply the patch first to create their lights.</div>`:m}
            </div>
          </div>
          <div class="order">
            <div class="order-head">In this group (${e.entities.length})</div>
            ${e.entities.length?l`<ol class="order-list">
                  ${e.entities.map((d,p)=>{let v=n.get(d),_=v?.name??(this.hass.states?.[d]?.attributes?.friendly_name||d);return l`<li class=${v?"":"other"}>
                      <span class="order-nr">${p+1}</span>
                      <span class="order-name">${_}${v?"":l` <small>not a DMX fixture</small>`}</span>
                      <button class="icon" title="Move up" ?disabled=${p===0} @click=${()=>this._move(p,p-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${p===e.entities.length-1}
                        @click=${()=>this._move(p,p+1)}>↓</button>
                      <button class="icon" title="Remove from group" @click=${()=>this._toggle(d,!1)}>✕</button>
                    </li>`})}
                </ol>`:l`<div class="hint">Tick fixtures on the left to add them.</div>`}
          </div>
        </div>
      </section>
    `}};C.styles=E`
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
      text-align: left;
      border-radius: 8px;
      padding: 8px 10px;
      background: none;
    }
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .rail-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
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
    button.icon {
      padding: 2px 8px;
      background: none;
    }
    button.link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      color: var(--primary-color);
      padding: 4px 6px;
    }
    .dot {
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--disabled-text-color, #9e9e9e);
    }
    .dot.on {
      background: var(--state-light-active-color, #ffc107);
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
      font: inherit;
      font-size: 1.3rem;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      min-width: 0;
      flex: 0 1 320px;
    }
    .spacer {
      flex: 1;
    }
    .hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .note {
      margin-top: 8px;
    }
    .error {
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
    .members {
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
      color: var(--primary-text-color);
      font: inherit;
    }
    .pick-list {
      margin-top: 8px;
      max-height: 420px;
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
      font-size: 0.85rem;
      font-weight: 600;
    }
    .order-list {
      list-style: none;
      margin: 8px 0 0;
      padding: 0;
      max-height: 440px;
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
    }
    .order-list li.other {
      opacity: 0.75;
    }
    .order-nr {
      width: 1.6em;
      text-align: right;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    .order-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .order-name small {
      color: var(--secondary-text-color);
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
      }
      .rail-section {
        width: 100%;
      }
      .main {
        padding: 12px;
      }
      .members {
        grid-template-columns: 1fr;
      }
    }
  `,h([g({attribute:!1})],C.prototype,"hass",2),h([g({attribute:!1})],C.prototype,"fixtures",2),h([g({attribute:!1})],C.prototype,"prefill",2),h([f()],C.prototype,"_groups",2),h([f()],C.prototype,"_loaded",2),h([f()],C.prototype,"_selected",2),h([f()],C.prototype,"_draft",2),h([f()],C.prototype,"_saving",2),h([f()],C.prototype,"_error",2),h([f()],C.prototype,"_filter",2),C=h([S("dmx-groups-view")],C);var x=class extends y{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._updateAvailable=!1;this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._entityMap={};this._mode=x._loadMode();this._groupPrefill=null;this._savedEffectNames=[];this._view=x._loadView();this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}static _loadMode(){try{let e=localStorage.getItem("dmx_lighting.mode");return e==="effects"||e==="groups"?e:"patch"}catch{return"patch"}}_onCreateGroup(e){this._groupPrefill={entities:e.detail.entities,token:Date.now()},this._setMode("groups")}_setMode(e){this._mode=e;try{localStorage.setItem("dmx_lighting.mode",e)}catch{}}_fixtureInfos(){return this._patch.nodes.flatMap(e=>Object.entries(e.universes??{}).flatMap(([t,r])=>(r.devices??[]).map(n=>({name:n.name,type:n.type,host:e.host,universe:t,channel:n.channel,entityId:Z(this.hass,this._entityMap,e.host,t,n)??`light.${Q(n.name)}`}))))}_fixtureNames(e=this._patch){return new Set(e.nodes.flatMap(t=>Object.values(t.universes??{}).flatMap(r=>(r.devices??[]).map(n=>n.name))))}willUpdate(e){e.has("hass")&&this._checkForUpdate();let t=e.get("_patch");if(!t||!this._patch.effects?.length)return;let r=this._fixtureNames(),n=[...this._fixtureNames(t)].filter(s=>!r.has(s));n.length&&(this._patch={...this._patch,effects:this._patch.effects.map(s=>({...s,fixtures:s.fixtures.filter(a=>!n.includes(a))}))})}_checkForUpdate(){let e=this.hass?.panels?.["dmx-patch"]?.config?._panel_custom?.module_url;if(e)try{let t=new URL(e,location.origin).searchParams.get("v"),r=new URL(import.meta.url).searchParams.get("v");this._updateAvailable=!!t&&!!r&&t!==r}catch{}}_onEffectsChanged(e){this._patch={...this._patch,effects:e.detail.effects},this._dirty=!0}static _loadView(){try{return localStorage.getItem("dmx_lighting.view")==="list"?"list":"grid"}catch{return"grid"}}_setView(e){this._view=e;try{localStorage.setItem("dmx_lighting.view",e)}catch{}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await St(this.hass);this._patch=e.patch??{nodes:[]},this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._errors=e.errors??[],this._loaded=!0,this._autoSelect(),this._refreshEntityMap()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}async _refreshEntityMap(){try{this._entityMap=(await Tt(this.hass)).entities??{}}catch{}}_autoSelect(){this._selected||this._patch.nodes.length&&this._selectNode("ui:0")}_selectNode(e){this._selected=e;let t=this._currentUniverses(),r=Object.keys(t??{}).sort((n,s)=>Number(n)-Number(s));this._selectedUniverse=r[0]??""}_currentNode(){let[e,t]=this._selected.split(":"),r=Number(t);if(e==="ui")return this._patch.nodes[r]}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[t,r]=this._selected.split(":");if(t!=="ui")return;let n=Number(r),s=[...this._patch.nodes];s[n]=e(s[n]),this._patch={...this._patch,nodes:s},this._dirty=!0}_updateUniverse(e,t){this._updateSelectedNode(r=>{let n=r.universes[e];return n?{...r,universes:{...r.universes,[e]:t(n)}}:r})}async _save(){this._saving=!0,this._errors=[];try{let e=await At(this.hass,this._patch);e.success?(this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}async _openYamlDialog(){try{let e=await Mt(this.hass,this._patch);this._dialog={kind:"yaml",yamlText:e.yaml,errorText:""}}catch(e){this._showToast(`Export failed: ${e}`)}}async _onImportPatch(e){if(this._dialog.kind!=="yaml")return;let{content:t}=e.detail;try{let r=await Ct(this.hass,t);this._patch=r.patch,this._dirty=!0,this._errors=r.errors,this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._showToast(r.valid?"Loaded into editor \u2014 review and Save & Apply":"Loaded with validation errors \u2014 fix them before saving")}catch(r){let n=r?.message??String(r);this._dialog={kind:"yaml",yamlText:t,errorText:n}}}_addNode(){this._dialog={kind:"node",node:jt(),isNew:!0}}_editNode(){let e=this._currentNode();e&&(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:t,original:r}=e.detail,n=this._patch.nodes,s=n.findIndex(a=>a.id===r.id);s>=0?n[s]=t:(n.push(t),this._selectNode(`ui:${n.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:t}=e.detail;this._patch.nodes=this._patch.nodes.filter(r=>r.id!==t.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._dialog={kind:"universe",mode:"add",current:""}}_renumberUniverse(){this._selectedUniverse&&(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:t}=e.detail;if(this._dialog.kind!=="universe")return;let r=this._dialog.mode,n=this._dialog.current;this._updateSelectedNode(s=>{let a={...s.universes};return r==="add"?a[t]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[t]=a[n],delete a[n]),{...s,universes:a}}),this._selectedUniverse=t,this._dialog={kind:"none"}}_removeUniverse(){let e=this._currentNode();if(!e||!this._selectedUniverse)return;let t=e.universes[this._selectedUniverse]?.devices??[];if(t.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${t.length} fixture(s)?`))return;let r={...e.universes};delete r[this._selectedUniverse],this._updateSelectedNode(s=>({...s,universes:r}));let n=Object.keys(r).sort((s,a)=>Number(s)-Number(a));this._selectedUniverse=n[0]??""}_setUniverseOption(e,t){this._updateUniverse(this._selectedUniverse,r=>({...r,[e]:t}))}_onAddDevice(e){let t=this._selectedUniverse;if(!t){this._showToast("Add a universe first");return}let r=e.detail.channel??this._firstFreeChannel(t);this._dialog={kind:"device",device:Ft(r),isNew:!0,universeNr:t}}_firstFreeChannel(e){let t=(this._currentUniverses()?.[e]?.devices??[]).map(n=>T(n)).sort((n,s)=>n[0]-s[0]),r=1;for(let[n,s]of t){if(r<n)break;r=Math.max(r,s+1)}return Math.min(r,512)}_onEditDevice(e){this._refreshEntityMap();let t=e.detail.universe??this._selectedUniverse;this._selectedUniverse=t,this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:t}}_onSaveDevice(e){let{device:t,original:r,count:n}=e.detail;if(this._dialog.kind!=="device")return;let s=this._dialog.universeNr;r.name&&t.name!==r.name&&this._patch.effects?.length&&(this._patch={...this._patch,effects:this._patch.effects.map(c=>({...c,fixtures:c.fixtures.map(u=>u===r.name?t.name:u)}))});let a=0;this._updateUniverse(s,c=>{let u=[...c.devices],d=u.findIndex(p=>p.id===r.id);if(d>=0)u[d]=t;else if(n>1){let p=t.channel;for(let v=1;v<=n;v++){let _={...t,id:le(),name:`${t.name}_${v}`,channel:p},[b,$]=T(_);if($>512){a=n-v+1;break}u.push(_),p=$+1}}else u.push(t);return{...c,devices:u}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:t}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,r=>({...r,devices:r.devices.filter(n=>n.id!==t.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:t,channel:r}=e.detail;this._updateUniverse(this._selectedUniverse,n=>({...n,devices:n.devices.map(s=>s.id===t?{...s,channel:r}:s)}))}render(){if(!this._loaded)return l`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),t=this._currentUniverses()??{},r=Object.keys(t).sort((s,a)=>Number(s)-Number(a)),n=t[this._selectedUniverse];return l`
      <div class="header">
        <h1>DMX Patch</h1>
        <span class="mode-toggle" role="tablist" aria-label="Section">
          <button role="tab" aria-selected=${this._mode==="patch"}
            class=${this._mode==="patch"?"active":""} @click=${()=>this._setMode("patch")}>Patch</button>
          <button role="tab" aria-selected=${this._mode==="effects"}
            class=${this._mode==="effects"?"active":""} @click=${()=>this._setMode("effects")}>Effects</button>
          <button role="tab" aria-selected=${this._mode==="groups"}
            class=${this._mode==="groups"?"active":""} @click=${()=>this._setMode("groups")}>Groups</button>
        </span>
        ${this._dirty?l`<span class="dirty">unsaved changes</span>`:m}
        ${this._updateAvailable?l`<button
              class="update"
              title="DMX Lighting was updated. Reload to use the new panel${this._dirty?" (unsaved changes will be lost)":""}."
              @click=${()=>location.reload()}
            >
              ↻ Update installed — reload
            </button>`:m}
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

      ${this._mode==="groups"?l`<div class="layout effects-layout">
            <dmx-groups-view
              .hass=${this.hass}
              .fixtures=${this._fixtureInfos().filter(s=>s.type!=="fixed")}
              .prefill=${this._groupPrefill}
              @panel-toast=${s=>this._showToast(s.detail)}
            ></dmx-groups-view>
          </div>`:this._mode==="effects"?l`<div class="layout effects-layout">
            <dmx-effects-view
              .hass=${this.hass}
              .effects=${this._patch.effects??[]}
              .fixtures=${this._fixtureInfos()}
              .errors=${this._errors}
              .savedNames=${this._savedEffectNames}
              @effects-changed=${this._onEffectsChanged}
            ></dmx-effects-view>
          </div>`:l`
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
                      `:m}
                </div>

                ${this._view==="list"?l`
                      <dmx-fixture-list
                        .hass=${this.hass}
                        .node=${e}
                        .nodeIndex=${Number(this._selected.split(":")[1])}
                        .errors=${this._errors}
                        .addUniverse=${this._selectedUniverse}
                        .entityMap=${this._entityMap}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @create-group=${this._onCreateGroup}
                      ></dmx-fixture-list>
                    `:n?l`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            @change=${s=>this._setUniverseOption("output_correction",s.target.value)}
                          >
                            ${ge.map(s=>l`<option
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
                        .nodeKey=${kt(e)}
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
              `:m}
        </main>
      </div>`}

      ${this._dialog.kind==="device"?l`
            <dmx-device-dialog
              .device=${this._dialog.device}
              ?isNew=${this._dialog.isNew}
              .hass=${this.hass}
              .nodeTransition=${this._currentNode()?.transition??null}
              .entityId=${this._dialog.isNew?"":Z(this.hass,this._entityMap,this._currentNode()?.host??"",this._dialog.universeNr,this._dialog.device)??""}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-device=${this._onSaveDevice}
              @delete-device=${this._onDeleteDevice}
            ></dmx-device-dialog>
          `:m}
      ${this._dialog.kind==="node"?l`
            <dmx-node-dialog
              .node=${this._dialog.node}
              ?isNew=${this._dialog.isNew}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-node=${this._onSaveNode}
              @delete-node=${this._onDeleteNode}
            ></dmx-node-dialog>
          `:m}
      ${this._dialog.kind==="yaml"?l`
            <dmx-yaml-dialog
              .yamlText=${this._dialog.yamlText}
              .errorText=${this._dialog.errorText}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @import-patch=${this._onImportPatch}
            ></dmx-yaml-dialog>
          `:m}
      ${this._dialog.kind==="universe"?l`
            <dmx-universe-dialog
              .mode=${this._dialog.mode}
              .current=${this._dialog.current}
              .minUniverse=${O(e?.node_type??"artnet-direct")}
              .existing=${r}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></dmx-universe-dialog>
          `:m}
      ${this._toast?l`<div class="toast">${this._toast}</div>`:m}
    `}};x.styles=E`
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
    button.update {
      padding: 4px 12px;
      border-radius: 14px;
      background: var(--warning-color, #ffa600);
      color: #000;
      font-weight: 600;
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
  `,h([g({attribute:!1})],x.prototype,"hass",2),h([g({type:Boolean})],x.prototype,"narrow",2),h([f()],x.prototype,"_patch",2),h([f()],x.prototype,"_loaded",2),h([f()],x.prototype,"_dirty",2),h([f()],x.prototype,"_saving",2),h([f()],x.prototype,"_errors",2),h([f()],x.prototype,"_toast",2),h([f()],x.prototype,"_updateAvailable",2),h([f()],x.prototype,"_selected",2),h([f()],x.prototype,"_selectedUniverse",2),h([f()],x.prototype,"_dialog",2),h([f()],x.prototype,"_entityMap",2),h([f()],x.prototype,"_mode",2),h([f()],x.prototype,"_groupPrefill",2),h([f()],x.prototype,"_savedEffectNames",2),h([f()],x.prototype,"_view",2),x=h([S("dmx-patch-panel")],x);export{x as DmxPatchPanel};
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
