var Dt=Object.defineProperty;var er=Object.getOwnPropertyDescriptor;var u=(o,i,e,t)=>{for(var r=t>1?void 0:t?er(i,e):i,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(t?n(i,e,r):n(r))||r);return t&&r&&Dt(i,e,r),r};var me=globalThis,fe=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Le=Symbol(),it=new WeakMap,te=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(fe&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=it.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&it.set(e,i))}return i}toString(){return this.cssText}},st=o=>new te(typeof o=="string"?o:o+"",void 0,Le),w=(o,...i)=>{let e=o.length===1?o[0]:i.reduce((t,r,s)=>t+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[s+1],o[0]);return new te(e,o,Le)},nt=(o,i)=>{if(fe)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=me.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,o.appendChild(t)}},Ue=fe?o=>o:o=>o instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return st(e)})(o):o;var{is:tr,defineProperty:rr,getOwnPropertyDescriptor:ir,getOwnPropertyNames:sr,getOwnPropertySymbols:nr,getPrototypeOf:or}=Object,ve=globalThis,ot=ve.trustedTypes,ar=ot?ot.emptyScript:"",lr=ve.reactiveElementPolyfillSupport,re=(o,i)=>o,ie={toAttribute(o,i){switch(i){case Boolean:o=o?ar:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,i){let e=o;switch(i){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ge=(o,i)=>!tr(o,i),at={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:ge};Symbol.metadata??=Symbol("metadata"),ve.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&rr(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:s}=ir(this.prototype,i)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let a=r?.call(this);s?.call(this,n),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??at}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;let i=or(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){let e=this.properties,t=[...sr(e),...nr(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(Ue(r))}else i!==void 0&&e.push(Ue(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:ie).toAttribute(e,t.type);this._$Em=i,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(i,e){let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let s=t.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ie;this._$Em=r;let a=n.fromAttribute(e,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(i,e,t,r=!1,s){if(i!==void 0){let n=this.constructor;if(r===!1&&(s=this[i]),t??=n.getPropertyOptions(i),!((t.hasChanged??ge)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(n._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:s},n){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,n??e??this[i]),s!==!0||n!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,s]of t){let{wrapped:n}=s,a=this[r];n!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[re("elementProperties")]=new Map,L[re("finalized")]=new Map,lr?.({ReactiveElement:L}),(ve.reactiveElementVersions??=[]).push("2.1.2");var Be=globalThis,lt=o=>o,be=Be.trustedTypes,ct=be?be.createPolicy("lit-html",{createHTML:o=>o}):void 0,ft="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+z,cr=`<${vt}>`,K=document,ne=()=>K.createComment(""),oe=o=>o===null||typeof o!="object"&&typeof o!="function",qe=Array.isArray,dr=o=>qe(o)||typeof o?.[Symbol.iterator]=="function",He=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,pt=/>/g,B=RegExp(`>|${He}(?:([^\\s"'>=/]+)(${He}*=${He}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,ht=/"/g,gt=/^(?:script|style|textarea|title)$/i,Ke=o=>(i,...e)=>({_$litType$:o,strings:i,values:e}),l=Ke(1),bt=Ke(2),Nr=Ke(3),G=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),mt=new WeakMap,q=K.createTreeWalker(K,129);function _t(o,i){if(!qe(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(i):i}var pr=(o,i)=>{let e=o.length-1,t=[],r,s=i===2?"<svg>":i===3?"<math>":"",n=se;for(let a=0;a<e;a++){let c=o[a],p,d,h=-1,f=0;for(;f<c.length&&(n.lastIndex=f,d=n.exec(c),d!==null);)f=n.lastIndex,n===se?d[1]==="!--"?n=dt:d[1]!==void 0?n=pt:d[2]!==void 0?(gt.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=B):d[3]!==void 0&&(n=B):n===B?d[0]===">"?(n=r??se,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,p=d[1],n=d[3]===void 0?B:d[3]==='"'?ht:ut):n===ht||n===ut?n=B:n===dt||n===pt?n=se:(n=B,r=void 0);let g=n===B&&o[a+1].startsWith("/>")?" ":"";s+=n===se?c+cr:h>=0?(t.push(p),c.slice(0,h)+ft+c.slice(h)+z+g):c+z+(h===-2?a:g)}return[_t(o,s+(o[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},ae=class o{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let s=0,n=0,a=i.length-1,c=this.parts,[p,d]=pr(i,e);if(this.el=o.createElement(p,t),q.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=q.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(ft)){let f=d[n++],g=r.getAttribute(h).split(z),_=/([.?@])?(.*)/.exec(f);c.push({type:1,index:s,name:_[2],strings:g,ctor:_[1]==="."?Oe:_[1]==="?"?Fe:_[1]==="@"?je:Q}),r.removeAttribute(h)}else h.startsWith(z)&&(c.push({type:6,index:s}),r.removeAttribute(h));if(gt.test(r.tagName)){let h=r.textContent.split(z),f=h.length-1;if(f>0){r.textContent=be?be.emptyScript:"";for(let g=0;g<f;g++)r.append(h[g],ne()),q.nextNode(),c.push({type:2,index:++s});r.append(h[f],ne())}}}else if(r.nodeType===8)if(r.data===vt)c.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(z,h+1))!==-1;)c.push({type:7,index:s}),h+=z.length-1}s++}}static createElement(i,e){let t=K.createElement("template");return t.innerHTML=i,t}};function Z(o,i,e=o,t){if(i===G)return i;let r=t!==void 0?e._$Co?.[t]:e._$Cl,s=oe(i)?void 0:i._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(o),r._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(i=Z(o,r._$AS(o,i.values),r,t)),i}var ze=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=(i?.creationScope??K).importNode(e,!0);q.currentNode=r;let s=q.nextNode(),n=0,a=0,c=t[0];for(;c!==void 0;){if(n===c.index){let p;c.type===2?p=new le(s,s.nextSibling,this,i):c.type===1?p=new c.ctor(s,c.name,c.strings,this,i):c.type===6&&(p=new We(s,this,i)),this._$AV.push(p),c=t[++a]}n!==c?.index&&(s=q.nextNode(),n++)}return q.currentNode=K,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},le=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=Z(this,i,e),oe(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==G&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):dr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&oe(this._$AH)?this._$AA.nextSibling.data=i:this.T(K.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=ae.createElement(_t(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let s=new ze(r,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s}}_$AC(i){let e=mt.get(i.strings);return e===void 0&&mt.set(i.strings,e=new ae(i)),e}k(i){qe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let s of i)r===e.length?e.push(t=new o(this.O(ne()),this.O(ne()),this,this.options)):t=e[r],t._$AI(s),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=lt(i).nextSibling;lt(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(i,e=this,t,r){let s=this.strings,n=!1;if(s===void 0)i=Z(this,i,e,0),n=!oe(i)||i!==this._$AH&&i!==G,n&&(this._$AH=i);else{let a=i,c,p;for(i=s[0],c=0;c<s.length-1;c++)p=Z(this,a[t+c],e,c),p===G&&(p=this._$AH[c]),n||=!oe(p)||p!==this._$AH[c],p===m?i=m:i!==m&&(i+=(p??"")+s[c+1]),this._$AH[c]=p}n&&!r&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Oe=class extends Q{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},Fe=class extends Q{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},je=class extends Q{constructor(i,e,t,r,s){super(i,e,t,r,s),this.type=5}_$AI(i,e=this){if((i=Z(this,i,e,0)??m)===G)return;let t=this._$AH,r=i===m&&t!==m||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,s=i!==m&&(t===m||r);r&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},We=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){Z(this,i)}};var ur=Be.litHtmlPolyfillSupport;ur?.(ae,le),(Be.litHtmlVersions??=[]).push("3.3.3");var xt=(o,i,e)=>{let t=e?.renderBefore??i,r=t._$litPart$;if(r===void 0){let s=e?.renderBefore??null;t._$litPart$=r=new le(i.insertBefore(ne(),s),s,void 0,e??{})}return r._$AI(o),r};var Ge=globalThis,y=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};y._$litElement$=!0,y.finalized=!0,Ge.litElementHydrateSupport?.({LitElement:y});var hr=Ge.litElementPolyfillSupport;hr?.({LitElement:y});(Ge.litElementVersions??=[]).push("4.2.2");var k=o=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,i)}):customElements.define(o,i)};var mr={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:ge},fr=(o=mr,i,e)=>{let{kind:t,metadata:r}=e,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),t==="accessor"){let{name:n}=e;return{set(a){let c=i.get.call(this);i.set.call(this,a),this.requestUpdate(n,c,o,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,o,a),a}}}if(t==="setter"){let{name:n}=e;return function(a){let c=this[n];i.call(this,a),this.requestUpdate(n,c,o,!0,a)}}throw Error("Unsupported decorator location: "+t)};function b(o){return(i,e)=>typeof e=="object"?fr(o,i,e):((t,r,s)=>{let n=r.hasOwnProperty(s);return r.constructor.createProperty(s,t),n?Object.getOwnPropertyDescriptor(r,s):void 0})(o,i,e)}function v(o){return b({...o,state:!0,attribute:!1})}var yt=["dimmer","rgb","rgbw","rgbww","color_temp","xy","binary","fixed"],$t=["artnet-direct","sacn","kinet"],wt=["8bit","16bit","24bit","32bit"],xe=["linear","quadratic","cubic","quadruple"],kt={fixed:[255],binary:null,dimmer:null,color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},vr={"8bit":1,"16bit":2,"24bit":3,"32bit":4},ye={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},$e={d:"Dimmer",r:"Red",R:"Red (unscaled)",g:"Green",G:"Green (unscaled)",b:"Blue",B:"Blue (unscaled)",w:"White",W:"White (unscaled)",c:"Cool white",C:"Cool white (unscaled)",h:"Warm white",H:"Warm white (unscaled)",t:"Color temp (0 = warm)",T:"Color temp (0 = cold)",u:"Hue",U:"Saturation",x:"X (CIE)",y:"Y (CIE)"},Et=32;function ce(o){return typeof o=="number"}function O(o){return!!o.channel_setup&&o.channel_setup.length>0}function Xe(o){if(o.type==="binary")return["d"];let i=O(o)?o.channel_setup:kt[o.type];return i?Array.from(i):["d"]}function we(o,i){let e=Xe(o)[i],t=o.channel_labels?.[i]||"";return e===void 0?{text:"",dummy:!1}:ce(e)?{text:t||"Fixed",dummy:!0,value:e}:{text:t||$e[e]||e,dummy:!1}}function Ye(o){if(o.type==="binary")return 1;let i=O(o)?o.channel_setup:kt[o.type];return i?i.length:1}function de(o){return vr[o.channel_size??"8bit"]??1}function N(o){let i=Ye(o),e=o.channel;return[e,e+i*de(o)-1]}function F(o){return o==="sacn"?1:0}function St(o){return`${o.node_type}:${o.host}:${o.port??"default"}`}function pe(){return crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)}function ke(o){return`hsl(${o*137.5%360}, 45%, 45%)`}function X(o,i,e,t,r){let s=`light.${V(r.name??"")}`,n=Object.values(i);if(n.includes(s)||!n.length&&o?.states?.[s])return s;let a=i[`dmx:${e}/${t}/${r.channel}`];if(a)return a}function j(o,i){o.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}function At(o,i){return o.transition??i?.transition??0}function V(o){return o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}var Tt=o=>o.callWS({type:"dmx_lighting/patch/get"});var Mt=(o,i)=>o.callWS({type:"dmx_lighting/patch/save",patch:i}),Ct=(o,i)=>o.callWS({type:"dmx_lighting/patch/export",patch:i}),Nt=(o,i)=>o.callWS({type:"dmx_lighting/patch/import",content:i});var Pt=o=>o.callWS({type:"dmx_lighting/entity_map/get"}),It=(o,i,e,t)=>o.connection.subscribeMessage(t,{type:"dmx_lighting/dmx/subscribe",node_key:i,universe:e}),Rt=(o,i,e,t=1)=>o.connection.subscribeMessage(()=>{},{type:"dmx_lighting/effect/preview",preview_id:i,preset:e,level:t}),Lt=(o,i,e,t)=>o.callWS({type:"dmx_lighting/effect/preview/update",preview_id:i,preset:e,...t===void 0?{}:{level:t}}),D=(o,i,e,t)=>o.callWS({type:"call_service",domain:i,service:e,service_data:t}),Ut=o=>o.callWS({type:"dmx_lighting/groups/list"}),Ht=(o,i,e)=>o.callWS({type:"dmx_lighting/groups/create",name:i,entities:e}),zt=(o,i,e)=>o.callWS({type:"dmx_lighting/groups/update",entry_id:i,...e}),Ot=(o,i)=>o.callWS({type:"dmx_lighting/groups/delete",entry_id:i});var Y="#fixed";function Ft(o){return Xe(o).map((i,e)=>({fn:ce(i)?Y:i,value:ce(i)?i:0,label:o.channel_labels?.[e]??""}))}function Je(o,i){return o.fn===Y?!Number.isInteger(o.value)||o.value<0||o.value>255?"Value must be 0\u2013255":"":ye[i]?.includes(o.fn)?"":`Not available for ${i}`}function gr(o){if(!o.length)return{channel_setup:null,channel_labels:null};let i=o.map(r=>r.fn===Y?r.value:r.fn),e=o.map(r=>r.fn===Y&&r.label.trim()?r.label.trim():null);for(;e.length&&e[e.length-1]===null;)e.pop();return{channel_setup:i.some(r=>ce(r))?i:i.join(""),channel_labels:e.length?e:null}}var Ze=!1;function Ee(o){Ze=o.target===o.currentTarget}function Se(o){let i=Ze&&o.target===o.currentTarget;return Ze=!1,i}var Ae=w`
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
`,A=class extends y{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this.entityId="";this.nodeTransition=null;this._count=1;this._suspended=!1;this._rows=null}disconnectedCallback(){super.disconnectedCallback(),this._stopWatching?.()}_openEntity(){this._suspended=!0,j(this,this.entityId);let e=()=>document.querySelector("home-assistant")?.shadowRoot?.querySelector("ha-more-info-dialog"),t=()=>{this._stopWatching?.(),this._suspended=!1},r=n=>{n.detail?.dialog==="ha-more-info-dialog"&&t()};window.addEventListener("dialog-closed",r);let s=window.setInterval(()=>{let n=e();(!n||!n._entityId)&&t()},500);this._stopWatching=()=>{window.removeEventListener("dialog-closed",r),window.clearInterval(s),this._stopWatching=void 0}}willUpdate(e){e.has("device")&&(this._working={...this.device},this._count=1,this._rows=O(this.device)?Ft(this.device):null)}_set(e,t){this._working={...this._working,[e]:t}}_renderEntity(){if(this.isNew)return m;if(!this.entityId)return l`<div class="entity-row muted">
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
    `}_setRows(e){this._rows=e,this._working={...this._working,...e?gr(e):{channel_setup:null,channel_labels:null}}}_setType(e){this._set("type",e),e==="binary"&&this._rows&&this._setRows(null)}_toggleCustom(e){if(!e){this._setRows(null);return}let t=Ft({...this._working,channel_setup:null,channel_labels:null});this._setRows(t)}_updateRow(e,t){let r=[...this._rows??[]];r[e]={...r[e],...t},this._setRows(r)}_addRow(e){let t=ye[this._working.type]??"",r=e||!t?{fn:Y,value:0,label:""}:{fn:t[0],value:0,label:""};this._setRows([...this._rows??[],r])}_moveRow(e,t){let r=[...this._rows??[]],s=e+t;s<0||s>=r.length||([r[e],r[s]]=[r[s],r[e]],this._setRows(r))}_removeRow(e){let t=(this._rows??[]).filter((r,s)=>s!==e);this._setRows(t)}_renderChannels(){let e=this._working;if(e.type==="binary")return m;let t=this._rows,r=ye[e.type]??"";return l`
      <label class="check">
        <input
          type="checkbox"
          .checked=${!!t}
          @change=${s=>this._toggleCustom(s.target.checked)}
        />
        Custom channel layout
      </label>
      <div class="hint">
        ${t?"Light channels follow the entity; dummy channels always send their fixed value (use them for mode, strobe or macro channels).":`Uses the ${e.type} default. Turn on to reorder channels or add dummy channels such as Mode or Strobe.`}
      </div>
      ${t?l`
            <div class="channels">
              ${t.map((s,n)=>{let a=Je(s,e.type),c=s.fn===Y;return l`
                  <div class="ch-row ${a?"invalid":""}" title=${a}>
                    <span class="ch-nr">${e.channel+n*de(e)}</span>
                    <select
                      aria-label="Channel ${n+1} function"
                      @change=${p=>this._updateRow(n,{fn:p.target.value})}
                    >
                      ${[...r].map(p=>l`<option value=${p} ?selected=${s.fn===p}>
                            ${$e[p]??p}
                          </option>`)}
                      ${!c&&!r.includes(s.fn)?l`<option value=${s.fn} selected>${$e[s.fn]??s.fn}</option>`:m}
                      <option value=${Y} ?selected=${c}>Dummy (fixed value)</option>
                    </select>
                    ${c?l`
                          <input
                            class="ch-label"
                            placeholder="Label, e.g. Mode"
                            maxlength=${Et}
                            aria-label="Channel ${n+1} label"
                            .value=${s.label}
                            @input=${p=>this._updateRow(n,{label:p.target.value})}
                          />
                          <input
                            class="ch-value"
                            type="number"
                            min="0"
                            max="255"
                            step="1"
                            aria-label="Channel ${n+1} value"
                            .value=${String(s.value)}
                            @input=${p=>this._updateRow(n,{value:Number(p.target.value)})}
                          />
                        `:l`<span class="ch-fill">follows light</span>`}
                    <span class="ch-tools">
                      <button class="icon" title="Move up" ?disabled=${n===0}
                        @click=${()=>this._moveRow(n,-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${n===t.length-1}
                        @click=${()=>this._moveRow(n,1)}>↓</button>
                      <button class="icon" title="Remove channel" ?disabled=${t.length===1}
                        @click=${()=>this._removeRow(n)}>✕</button>
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
    `}render(){let e=this._working,[t,r]=N(e),s=e.type==="color_temp"||e.type==="rgbww";return l`
      <div
        class="backdrop"
        style=${this._suspended?"visibility: hidden":""}
        @pointerdown=${Ee}
        @click=${n=>Se(n)&&this._cancel()}
      >
        <div class="dialog" @click=${n=>n.stopPropagation()}>
          <h3>${this.isNew?"Add fixture":`Edit ${this.device.name}`}</h3>

          ${this._renderEntity()}

          <label>Name (entity id becomes light.&lt;slug&gt;)</label>
          <input
            .value=${e.name??""}
            @input=${n=>this._set("name",n.target.value)}
          />

          ${this.isNew?l`
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="512"
                  .value=${String(this._count)}
                  @input=${n=>this._count=Math.max(1,Number(n.target.value)||1)}
                />
                ${this._count>1?l`<div class="hint">
                      Adds ${this._count} fixtures back-to-back, named
                      ${e.name||"name"}_1 … ${e.name||"name"}_${this._count}
                    </div>`:m}
              `:m}

          <label>Friendly name (optional)</label>
          <input
            .value=${e.friendly_name??""}
            @input=${n=>this._set("friendly_name",n.target.value||void 0)}
          />

          <div class="row">
            <div>
              <label>Type</label>
              <select
                .value=${e.type}
                @change=${n=>this._setType(n.target.value)}
              >
                ${yt.map(n=>l`<option value=${n} ?selected=${e.type===n}>${n}</option>`)}
              </select>
            </div>
            <div>
              <label>DMX channel (1-512)</label>
              <input
                type="number"
                min="1"
                max="512"
                .value=${String(e.channel)}
                @input=${n=>this._set("channel",Number(n.target.value))}
              />
            </div>
          </div>
          <div class="hint">Occupies channels ${t}–${r}</div>

          <div class="row">
            <div>
              <label>Channel size</label>
              <select
                .value=${e.channel_size??"8bit"}
                @change=${n=>this._set("channel_size",n.target.value)}
              >
                ${wt.map(n=>l`<option value=${n} ?selected=${(e.channel_size??"8bit")===n}>${n}</option>`)}
              </select>
            </div>
            <div>
              <label>Byte order</label>
              <select
                .value=${e.byte_order??"big"}
                @change=${n=>this._set("byte_order",n.target.value)}
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
                @input=${n=>{let a=n.target.value;this._set("transition",a===""?null:Number(a))}}
              />
              <div class="hint">
                ${e.transition==null?`Uses the node default: ${this.nodeTransition??0}s`:l`Overrides the node default (${this.nodeTransition??0}s) ·
                      <a href="#" @click=${n=>{n.preventDefault(),this._set("transition",null)}}>use default</a>`}
              </div>
            </div>
            <div>
              <label>Output correction</label>
              <select
                @change=${n=>{let a=n.target.value;this._set("output_correction",a===""?null:a)}}
              >
                <option value="" ?selected=${!e.output_correction}>universe default</option>
                ${xe.map(n=>l`<option value=${n} ?selected=${e.output_correction===n}>${n}</option>`)}
              </select>
            </div>
          </div>

          ${this._renderChannels()}

          ${s?l`
                <div class="row">
                  <div>
                    <label>Min temp</label>
                    <input
                      .value=${e.min_temp??"2700K"}
                      @input=${n=>this._set("min_temp",n.target.value)}
                    />
                  </div>
                  <div>
                    <label>Max temp</label>
                    <input
                      .value=${e.max_temp??"6500K"}
                      @input=${n=>this._set("max_temp",n.target.value)}
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
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.name?.trim()){this.errorText="Name is required";return}let e=(this._rows??[]).findIndex(t=>Je(t,this._working.type));if(e>=0){this.errorText=`Channel ${e+1}: ${Je(this._rows[e],this._working.type)}`;return}this.dispatchEvent(new CustomEvent("save-device",{detail:{device:this._working,original:this.device,count:this.isNew?this._count:1},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-device",{detail:{device:this.device},bubbles:!0,composed:!0}))}};A.styles=[Ae,w`
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
    `],u([b({attribute:!1})],A.prototype,"device",2),u([b({type:Boolean})],A.prototype,"isNew",2),u([b()],A.prototype,"errorText",2),u([b({attribute:!1})],A.prototype,"hass",2),u([b()],A.prototype,"entityId",2),u([b({attribute:!1})],A.prototype,"nodeTransition",2),u([v()],A.prototype,"_working",2),u([v()],A.prototype,"_count",2),u([v()],A.prototype,"_suspended",2),u([v()],A.prototype,"_rows",2),A=u([k("dmx-device-dialog")],A);var R=class extends y{constructor(){super(...arguments);this.isNew=!1;this.errorText="";this._newUniverse=""}willUpdate(e){e.has("node")&&(this._working={...this.node,universes:{...this.node.universes}},this._newUniverse="")}_overrides(){return Object.values(this._working.universes??{}).reduce((e,t)=>e+(t.devices??[]).filter(r=>r.transition!=null).length,0)}_renderTransitionOverrides(){let e=this._overrides();return l`<div class="hint">
      Fade time for fixtures that leave their own transition blank; a fixture's own value
      (even 0) wins.
      ${e?l`<br />${e} fixture${e===1?" sets its":"s set their"} own transition.
            <a href="#" @click=${this._clearOverrides}>Make all use this default</a>`:m}
    </div>`}_clearOverrides(e){e.preventDefault();let t=Object.fromEntries(Object.entries(this._working.universes??{}).map(([r,s])=>[r,{...s,devices:(s.devices??[]).map(n=>({...n,transition:null}))}]));this._working={...this._working,universes:t}}_set(e,t){this._working={...this._working,[e]:t}}_addUniverse(){let e=Number(this._newUniverse),t=F(this._working.node_type);if(this._newUniverse===""||!Number.isInteger(e)||e<t||e>1024){this.errorText=`Universe must be a whole number between ${t} and 1024`;return}if(this._working.universes[String(e)]){this.errorText=`Universe ${e} already exists`;return}this.errorText="",this._working={...this._working,universes:{...this._working.universes,[String(e)]:{send_partial_universe:!0,output_correction:"linear",devices:[]}}},this._newUniverse=""}_removeUniverse(e){if(this._working.universes[e]?.devices?.length)return;let t={...this._working.universes};delete t[e],this._working={...this._working,universes:t}}render(){let e=this._working;return l`
      <div
        class="backdrop"
        @pointerdown=${Ee}
        @click=${t=>Se(t)&&this._cancel()}
      >
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h3>${this.isNew?"Add node":`Edit ${this.node.host}`}</h3>

          <label>Protocol</label>
          <select
            @change=${t=>this._set("node_type",t.target.value)}
          >
            ${$t.map(t=>l`<option value=${t} ?selected=${e.node_type===t}>${t}</option>`)}
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
            ${Object.keys(e.universes).sort((t,r)=>Number(t)-Number(r)).map(t=>{let r=e.universes[t]?.devices?.length??0,s=Number(t)<F(e.node_type);return l`
                  <span class="chip ${s?"invalid":""}"
                    title=${s?`Universe ${t} is not allowed for ${e.node_type} \u2014 renumber it from the universe bar`:r?`${r} fixture(s) \u2014 remove them first to delete this universe`:`Universe ${t}`}
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
              min=${F(e.node_type)}
              max="1024"
              placeholder="Universe number (${F(e.node_type)}-1024)"
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
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){if(!this._working.host?.trim()){this.errorText="Host is required";return}let e=this._working.port;if(e!=null&&(!Number.isInteger(e)||e<1||e>65535)){this.errorText="Port must be a whole number between 1 and 65535 \u2014 leave it blank to use the protocol default";return}let t=F(this._working.node_type),r=Object.keys(this._working.universes).filter(s=>Number(s)<t);if(r.length){this.errorText=`Universe ${r.join(", ")} is not allowed for ${this._working.node_type} (minimum is ${t}). Renumber it from the universe bar or remove it.`;return}this.dispatchEvent(new CustomEvent("save-node",{detail:{node:this._working,original:this.node},bubbles:!0,composed:!0}))}_delete(){this.dispatchEvent(new CustomEvent("delete-node",{detail:{node:this.node},bubbles:!0,composed:!0}))}};R.styles=Ae,u([b({attribute:!1})],R.prototype,"node",2),u([b({type:Boolean})],R.prototype,"isNew",2),u([b()],R.prototype,"errorText",2),u([v()],R.prototype,"_working",2),u([v()],R.prototype,"_newUniverse",2),R=u([k("dmx-node-dialog")],R);var I=class extends y{constructor(){super(...arguments);this.mode="add";this.minUniverse=0;this.current="";this.existing=[];this._value="";this._error=""}willUpdate(e){(e.has("current")||e.has("mode"))&&(this._value=this.mode==="renumber"?this.current:String(this.minUniverse),this._error="")}render(){return l`
      <div
        class="backdrop"
        @pointerdown=${Ee}
        @click=${e=>Se(e)&&this._cancel()}
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
    `}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}_save(){let e=Number(this._value);if(!Number.isInteger(e)||e<this.minUniverse||e>1024){this._error=`Universe must be a whole number between ${this.minUniverse} and 1024`;return}let t=String(e);if(t!==this.current&&this.existing.includes(t)){this._error=`Universe ${t} already exists on this node`;return}this.dispatchEvent(new CustomEvent("save-universe",{detail:{nr:t},bubbles:!0,composed:!0}))}};I.styles=Ae,u([b()],I.prototype,"mode",2),u([b({type:Number})],I.prototype,"minUniverse",2),u([b()],I.prototype,"current",2),u([b({attribute:!1})],I.prototype,"existing",2),u([v()],I.prototype,"_value",2),u([v()],I.prototype,"_error",2),I=u([k("dmx-universe-dialog")],I);var U=class extends y{constructor(){super(...arguments);this.yamlText="";this.errorText="";this._text="";this._copied=!1}willUpdate(e){e.has("yamlText")&&(this._text=this.yamlText)}render(){return l`
      <div
        class="backdrop"
        @pointerdown=${Ee}
        @click=${e=>Se(e)&&this._cancel()}
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
    `}async _copy(){try{await navigator.clipboard.writeText(this._text),this._copied=!0,setTimeout(()=>this._copied=!1,1500)}catch{this.errorText="Clipboard unavailable \u2014 select the text and copy manually"}}_download(){let e=new Blob([this._text],{type:"application/yaml"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="dmx_patch.yaml",r.click(),URL.revokeObjectURL(t)}_pickFile(){let e=document.createElement("input");e.type="file",e.accept=".yaml,.yml,.json,.txt",e.onchange=async()=>{let t=e.files?.[0];t&&(this._text=await t.text(),this.errorText="")},e.click()}_import(){this.dispatchEvent(new CustomEvent("import-patch",{detail:{content:this._text},bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent("panel-dialog-closed",{bubbles:!0,composed:!0}))}};U.styles=[Ae,w`
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
    `],u([b()],U.prototype,"yamlText",2),u([b()],U.prototype,"errorText",2),u([v()],U.prototype,"_text",2),u([v()],U.prototype,"_copied",2),U=u([k("dmx-yaml-dialog")],U);function jt(o){return{id:pe(),channel:o,name:"",type:"dimmer",transition:null,channel_size:"8bit",byte_order:"big",output_correction:null,channel_setup:null,channel_labels:null}}function Wt(){return{id:pe(),node_type:"artnet-direct",host:"",port:null,max_fps:25,refresh_every:120,priority:100,universes:{1:{send_partial_universe:!0,output_correction:"linear",devices:[]}}}}var P=class extends y{constructor(){super(...arguments);this.nodeKey="";this.universeNr=0;this._live=!1;this._values=[];this._dropTarget=null}disconnectedCallback(){super.disconnectedCallback(),this._stopLive()}async _toggleLive(){if(this._live){this._stopLive(),this._live=!1;return}this._live=!0;try{this._unsub=await It(this.hass,this.nodeKey,this.universeNr,e=>{this._values=e.values})}catch(e){this._live=!1,this.dispatchEvent(new CustomEvent("grid-error",{detail:`Live monitoring unavailable: ${e}`,bubbles:!0,composed:!0}))}}_stopLive(){this._unsub?.(),this._unsub=void 0,this._values=[]}_channelMap(){let e=new Map;return(this.universe?.devices??[]).forEach((t,r)=>{let[s,n]=N(t);for(let a=s;a<=Math.min(n,512);a++){let c=e.get(a);e.set(a,{device:t,index:r,first:a===s,overlap:!!c})}}),e}render(){let e=this._channelMap(),t=[];for(let r=1;r<=512;r++){let s=e.get(r),n=this._values[r-1],a=this._live&&n!==void 0?n/255:0,c=this._dropTarget,p=s?we(s.device,Math.floor((r-s.device.channel)/de(s.device))):void 0,d=!!p&&O(s.device),h=c&&r>=c.first&&r<=c.last;t.push(l`
        <div
          class="cell ${s?"occupied":""} ${s?.overlap?"overlap":""}
            ${p?.dummy?"dummy":""}
            ${h?c.valid?"drop-ok":"drop-bad":""}"
          style=${s?`--device-color: ${ke(s.index)}`:m}
          title=${s?`${s.device.name} (${s.device.type}) \u2014 channel ${r}: ${p.text}${p.dummy?` (fixed ${p.value})`:""} \u2014 drag to move`:`Channel ${r}`}
          draggable=${s?"true":"false"}
          @click=${()=>this._cellClick(r,s?.device)}
          @dragstart=${s?f=>this._dragStart(f,r,s.device):m}
          @dragover=${f=>this._dragOver(f,r)}
          @drop=${f=>this._drop(f)}
          @dragend=${()=>this._dragEnd()}
        >
          ${this._live?l`<span class="heat" style="opacity: ${a}"></span>`:m}
          <span class="top">
            <span class="ch">${r}</span>
            ${p?.dummy&&!this._live?l`<span class="fixed">${p.value}</span>`:m}
          </span>
          ${s?.first?l`<span class="name">${s.device.name}</span>`:m}
          ${d&&(p.dummy||!s.first)?l`<span class="role">${p.text}</span>`:m}
          ${this._live&&n!==void 0?l`<span class="val">${n}</span>`:m}
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
    `}_dragStart(e,t,r){let[s]=N(r);this._dragInfo={device:r,offset:t-s},e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",r.id)}_dragOver(e,t){let r=this._dragInfo;if(!r)return;let[s,n]=N(r.device),a=n-s+1,c=t-r.offset,p=c+a-1,d=c>=1&&p<=512&&!this._collides(r.device.id,c,p);(this._dropTarget?.first!==c||this._dropTarget?.last!==p||this._dropTarget?.valid!==d)&&(this._dropTarget={first:c,last:p,valid:d}),d&&(e.preventDefault(),e.dataTransfer.dropEffect="move")}_collides(e,t,r){return(this.universe?.devices??[]).some(s=>{if(s.id===e)return!1;let[n,a]=N(s);return t<=a&&r>=n})}_drop(e){e.preventDefault();let t=this._dragInfo,r=this._dropTarget;this._dragInfo=void 0,this._dropTarget=null,!(!t||!r?.valid)&&N(t.device)[0]!==r.first&&this.dispatchEvent(new CustomEvent("move-device",{detail:{deviceId:t.device.id,channel:r.first},bubbles:!0,composed:!0}))}_dragEnd(){this._dragInfo=void 0,this._dropTarget=null}_cellClick(e,t){t?this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:t},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("add-device",{detail:{channel:e},bubbles:!0,composed:!0}))}};P.styles=w`
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
  `,u([b({attribute:!1})],P.prototype,"hass",2),u([b({attribute:!1})],P.prototype,"universe",2),u([b()],P.prototype,"nodeKey",2),u([b({type:Number})],P.prototype,"universeNr",2),u([v()],P.prototype,"_live",2),u([v()],P.prototype,"_values",2),u([v()],P.prototype,"_dropTarget",2),P=u([k("dmx-universe-grid")],P);var E=class extends y{constructor(){super(...arguments);this.nodeIndex=0;this.errors=[];this.addUniverse="";this.universe="";this.entityMap={};this._filter="";this._sort="address";this._desc=!1;this._picked=[];this._visibleIds=[];this._anchor=null;this._effectOut={}}updated(e){e.has("hass")&&this.hass&&!this._unsubOutput&&(this._unsubOutput=this.hass.connection.subscribeMessage(t=>this._effectOut=t.fixtures??{},{type:"dmx_lighting/effect/output/subscribe"}).catch(()=>async()=>{}))}disconnectedCallback(){super.disconnectedCallback(),this._unsubOutput?.then(e=>e()).catch(()=>{}),this._unsubOutput=void 0}_rows(){let e=[],t=this.node?.universes??{};for(let[r,s]of Object.entries(t)){if(this.universe&&r!==this.universe)continue;let n=s.devices??[],a=n.map(c=>N(c));n.forEach((c,p)=>{let[d,h]=a[p],f=a.some(([$,Ne],H)=>H!==p&&d<=Ne&&h>=$),g=`nodes/${this.nodeIndex}/universes/${r}/devices/${p}`,_=this.errors.filter($=>$.path===g||$.path.startsWith(`${g}/`));e.push({device:c,universe:r,index:p,first:d,last:h,overlap:f,errors:_})})}return e}_visibleRows(){let e=this._filter.trim().toLowerCase(),t=this._rows().filter(n=>{if(!e)return!0;let a=n.device,c=(a.channel_labels??[]).filter(Boolean).join(" ");return[a.name,a.friendly_name??"",a.type,`light.${V(a.name)}`,c].join(" ").toLowerCase().includes(e)}),r=(n,a)=>Number(n.universe)-Number(a.universe)||n.first-a.first,s={address:r,name:(n,a)=>n.device.name.localeCompare(a.device.name)||r(n,a),type:(n,a)=>n.device.type.localeCompare(a.device.type)||r(n,a)};return t.sort(s[this._sort]),this._desc&&t.reverse(),t}_setSort(e){this._sort===e?this._desc=!this._desc:(this._sort=e,this._desc=!1)}_header(e,t){let r=this._sort===e;return l`<th
      class="sortable ${r?"active":""}"
      aria-sort=${r?this._desc?"descending":"ascending":"none"}
      @click=${()=>this._setSort(e)}
    >
      ${t}<span class="arrow">${r?this._desc?"\u25BC":"\u25B2":""}</span>
    </th>`}_pick(e,t){let r=this._picked.filter(s=>s!==e);t&&r.push(e),this._picked=r}_pickClick(e,t,r){let s=this._visibleIds;if(r&&this._anchor!==null&&this._anchor<s.length){let[n,a]=[Math.min(this._anchor,e),Math.max(this._anchor,e)],c=s.slice(n,a+1).filter(p=>!!p);this._picked=t?[...this._picked,...c.filter(p=>!this._picked.includes(p))]:this._picked.filter(p=>!c.includes(p))}else s[e]&&this._pick(s[e],t);this._anchor=e}_selectAll(e){let t=e.map(s=>X(this.hass,this.entityMap,this.node.host,s.universe,s.device)).filter(s=>!!s),r=t.length>0&&t.every(s=>this._picked.includes(s));return l`<input type="checkbox" aria-label="Select all" title="Select all" .checked=${r}
      ?disabled=${!t.length}
      @change=${s=>{let n=s.target.checked;this._picked=n?[...new Set([...this._picked,...t])]:this._picked.filter(a=>!t.includes(a))}} />`}_layout(e){let t=Ye(e),r=[];for(let s=0;s<t;s++){let n=we(e,s);r.push(n.dummy?l`<span class="part dummy" title="Dummy channel, fixed value ${n.value}"
              >${n.text} <b>${n.value}</b></span
            >`:l`<span class="part">${n.text}</span>`)}return l`${r}${O(e)?m:l`<span class="default">default</span>`}`}_liveTile(e,t){let r=this._effectOut[t.name];if(r){let[H,rt]=r,[Pe,Ie,Re]=(rt??[255,255,255]).map(Vt=>Math.round(Vt)),he=Math.round(H*100),Jt=(.299*Pe+.587*Ie+.114*Re)/255,Zt=he>=50&&Jt>.6?"#000":"#fff",Qt=this.hass?.states?.[e??""]?.attributes?.dmx_effect??"effect";return l`<div
        class="tile on fx"
        style="--tile-color: rgb(${Pe}, ${Ie}, ${Re}); --tile-level: ${he}%; --tile-ink: ${Zt}"
        title="Driven by ${Qt}: ${rt?`RGB ${Pe}, ${Ie}, ${Re} \xB7 `:""}${he}%"
      >
        <span class="fill"></span>
        <span class="pct">${he}%</span>
        <span class="fx-badge">FX</span>
      </div>`}let s=e?this.hass?.states?.[e]:void 0;if(!s)return l`<div class="tile none" title="No entity yet — Save & Apply">–</div>`;if(s.state!=="on"){let H=s.state==="off"?"off":s.state;return l`<div class="tile off ${s.state}" title=${`${e}: ${H}`}>${H}</div>`}let n=s.attributes??{},a=Array.isArray(n.rgb_color)?n.rgb_color:[255,255,255],c=typeof n.brightness=="number"?n.brightness:255,p=Math.round(c/255*100),[d,h,f]=a.map(H=>Math.round(Number(H)||0)),g=`rgb(${d}, ${h}, ${f})`,_=(.299*d+.587*h+.114*f)/255,$=p>=50&&_>.6?"#000":"#fff",Ne=[Array.isArray(n.rgb_color)?`RGB ${d}, ${h}, ${f}`:"",typeof n.color_temp_kelvin=="number"?`${n.color_temp_kelvin} K`:"",`${p}%`].filter(Boolean).join(" \xB7 ");return l`<div
      class="tile on"
      style="--tile-color: ${g}; --tile-level: ${p}%; --tile-ink: ${$}"
      title="${e} (${t.type}): ${Ne}"
    >
      <span class="fill"></span>
      <span class="pct">${p}%</span>
    </div>`}_state(e){let t=e?this.hass?.states?.[e]?.state:void 0;return t?l`<span class="state ${t}" title=${t}></span>`:l`<span class="state none" title="Not created yet — Save & Apply">–</span>`}render(){let e=this._rows(),t=this._visibleRows();this._visibleIds=t.map(n=>X(this.hass,this.entityMap,this.node.host,n.universe,n.device));let r=Object.keys(this.node?.universes??{}),s=e.reduce((n,a)=>n+(a.last-a.first+1),0);return l`
      <div class="toolbar">
        <input
          class="filter"
          type="search"
          placeholder="Filter by name, type, entity or label"
          .value=${this._filter}
          @input=${n=>this._filter=n.target.value}
        />
        <span class="summary">
          ${e.length} fixture${e.length===1?"":"s"} · ${s} channels ·
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
                  ${t.map((n,a)=>{let c=n.device,p=X(this.hass,this.entityMap,this.node.host,n.universe,c),d=p??`light.${V(c.name)}`,h=n.errors.length?n.errors.map(f=>f.message).join(`
`):n.overlap?"Overlaps another fixture":"";return l`
                      <tr
                        class=${h?"invalid":""}
                        tabindex="0"
                        title=${h||`Edit ${c.name}`}
                        @click=${()=>this._edit(n)}
                        @keydown=${f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),this._edit(n))}}
                      >
                        <td class="select-col" @click=${f=>f.stopPropagation()}>
                          <input
                            type="checkbox"
                            aria-label="Select ${c.name}"
                            title=${p?`Select ${c.name} (Shift-click to select a range)`:"Save & Apply first, then it can join a group"}
                            ?disabled=${!p}
                            .checked=${!!p&&this._picked.includes(p)}
                            @keydown=${f=>f.stopPropagation()}
                            @click=${f=>this._pickClick(a,f.target.checked,f.shiftKey)}
                          />
                        </td>
                        <td class="swatch-col">
                          <span class="swatch" style="background: ${ke(n.index)}"></span>
                        </td>
                        <td>
                          <div class="name">${c.name}</div>
                          ${c.friendly_name?l`<div class="sub">${c.friendly_name}</div>`:m}
                          <div class="entity">
                            ${this._state(p)}${p?l`<button
                                  class="entity-link"
                                  title="Open ${p}"
                                  @click=${f=>{f.stopPropagation(),j(this,p)}}
                                  @keydown=${f=>f.stopPropagation()}
                                >
                                  <code>${p}</code>
                                </button>`:l`<code>${d}</code>`}
                          </div>
                          ${h?l`<div class="problem">⚠ ${h}</div>`:m}
                        </td>
                        <td>
                          ${c.type}
                          ${c.channel_size&&c.channel_size!=="8bit"?l`<div class="sub">${c.channel_size}</div>`:m}
                          <div
                            class="sub"
                            title=${c.transition==null?"Node default transition":"Fixture overrides the node default"}
                          >
                            fade ${At(c,this.node)}s${c.transition==null?"":l` <b>own</b>`}
                          </div>
                        </td>
                        <td class="address">
                          <span class="uni">U${n.universe}</span>
                          ${n.first===n.last?n.first:`${n.first}\u2013${n.last}`}
                        </td>
                        <td class="layout">${this._layout(c)}</td>
                        <td class="live-col">${this._liveTile(p,c)}</td>
                      </tr>
                    `})}
                </tbody>
              </table>
            </div>
          `:l`<div class="empty">
            ${e.length?"No fixtures match the filter.":"No fixtures on this node yet."}
          </div>`}
    `}_edit(e){this.dispatchEvent(new CustomEvent("edit-device",{detail:{device:e.device,universe:e.universe},bubbles:!0,composed:!0}))}};E.styles=w`
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
  `,u([b({attribute:!1})],E.prototype,"hass",2),u([b({attribute:!1})],E.prototype,"node",2),u([b({type:Number})],E.prototype,"nodeIndex",2),u([b({attribute:!1})],E.prototype,"errors",2),u([b()],E.prototype,"addUniverse",2),u([b()],E.prototype,"universe",2),u([b({attribute:!1})],E.prototype,"entityMap",2),u([v()],E.prototype,"_filter",2),u([v()],E.prototype,"_sort",2),u([v()],E.prototype,"_desc",2),u([v()],E.prototype,"_picked",2),u([v()],E.prototype,"_effectOut",2),E=u([k("dmx-fixture-list")],E);var Te=[{type:"chase",label:"Chase",kind:"intensity",description:"One fixture after another"},{type:"sine",label:"Wave",kind:"intensity",description:"Smooth rise and fall"},{type:"ramp_up",label:"Ramp up",kind:"intensity",description:"Fade up, then snap off"},{type:"ramp_down",label:"Ramp down",kind:"intensity",description:"Snap on, then fade down"},{type:"triangle",label:"Triangle",kind:"intensity",description:"Linear up and down"},{type:"square",label:"Pulse",kind:"intensity",description:"On / off blocks"},{type:"sparkle",label:"Sparkle",kind:"intensity",description:"Random flashes"},{type:"rainbow",label:"Rainbow",kind:"color",description:"Hue rotates through the spectrum"},{type:"color_chase",label:"Colour steps",kind:"color",description:"Steps through 2+ colours you pick"},{type:"color_wave",label:"Colour fade",kind:"color",description:"Fades smoothly through your colours"}],ue=o=>Te.find(i=>i.type===o)?.kind==="color",Me={speed:{default:30,min:.1,max:600},size:{default:100,min:0,max:100},base:{default:0,min:0,max:100},spread:{default:360,min:0,max:3600},groups:{default:1,min:1,max:512},blocks:{default:1,min:1,max:512},wings:{default:1,min:1,max:512},duty:{default:null,min:1,max:100},crossfade:{default:0,min:0,max:100},fade_in:{default:1,min:0,max:600},fade_out:{default:1,min:0,max:600},seed:{default:0,min:0,max:2**31-1}},Ce=[[255,0,0],[0,255,0],[0,0,255]],Gt=[{name:"RGB",colors:[[255,0,0],[0,255,0],[0,0,255]]},{name:"Warm",colors:[[255,60,0],[255,150,20],[255,210,120]]},{name:"Ocean",colors:[[0,40,255],[0,200,255],[0,255,170]]},{name:"Sunset",colors:[[255,40,90],[255,120,0],[150,0,255]]},{name:"Party",colors:[[255,0,160],[0,255,255],[255,230,0],[120,0,255]]},{name:"Police",colors:[[255,0,0],[0,0,255]]}],W=o=>ue(o)?"color":"intensity";function T(o,i){let e=o[i];return e??Me[i]?.default}function ee(o){return`light.fx_${o.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}`}function Xt(o){let i=o>>>0;return()=>{i=i+1831565813>>>0;let e=i;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Qe(o,i){let e=[...o];if(i.shuffle){let t=Xt(T(i,"seed")+1);for(let r=e.length-1;r>0;r--){let s=Math.floor(t()*(r+1));[e[r],e[s]]=[e[s],e[r]]}}return i.direction==="reverse"&&e.reverse(),e}function br(o,i){if(o<=0)return[];let e=Math.max(1,Math.floor(T(i,"blocks"))),t=Math.max(1,Math.floor(T(i,"groups"))),r=Math.max(1,Math.floor(T(i,"wings"))),s=Math.ceil(o/e),n=Math.ceil(s/t),a=Math.ceil(n/r),c=[];for(let p=0;p<o;p++){let h=Math.floor(p/e)%n,f=Math.floor(h/a),g=h%a;f%2===1&&(g=a-1-g),c.push({position:g/a,count:a,index:g})}return c}var Yt=o=>(o%1+1)%1;function _r(o,i,e){if(e.direction==="bounce"){let t=Math.floor(o),r=o-t;o=t%2===0?r:1-r}return Yt(o-i.position*T(e,"spread")/360)}function Bt(o,i,e){if(o>=i)return 0;let t=i*e/2;return t<=0?1:o<t?o/t:o>i-t?(i-o)/t:1}function qt(...o){let i=2166136261;for(let e of o)i^=Math.floor(e)+2654435769,i=Math.imul(i,16777619);return Xt(i)()}function Ve(o,i,e,t,r){let s=e.duty,n=T(e,"crossfade")/100;switch(o){case"sine":return .5-.5*Math.cos(2*Math.PI*i);case"ramp_up":return i;case"ramp_down":return 1-i;case"triangle":return 1-Math.abs(2*i-1);case"square":return Bt(i,(s??50)/100,n);case"chase":return Bt(i,s!=null?s/100:1/Math.max(1,t.count),n);case"sparkle":{let a=(s??30)/100,c=T(e,"seed"),p=r+qt(1,t.index,c),d=Math.floor(p);if(qt(2,t.index,d,c)>=a)return 0;let h=p-d;return h<.25?1-h/.25:0}default:return 0}}function xr(o){let i=Math.floor(o*6),e=o*6-i,t=1-e,[r,s,n]=[[1,e,0],[t,1,0],[0,1,e],[0,t,1],[e,0,1],[1,0,t]][(i%6+6)%6];return[Math.round(r*255),Math.round(s*255),Math.round(n*255)]}var Kt=(o,i,e)=>[0,1,2].map(t=>Math.round(o[t]+(i[t]-o[t])*e));function De(o,i,e){let t=e.colors?.length?e.colors:Ce;if(o==="rainbow")return xr(Yt(i));if(o==="color_chase"){let p=t.length,d=i*p,h=Math.floor(d)%p,f=d-Math.floor(d),g=T(e,"crossfade")/100;return g>0&&f>1-g?Kt(t[h],t[(h+1)%p],(f-(1-g))/g):t[h]}let r=t.length<2?[t[0],[0,0,0]]:t,s=r.length,n=i*s,a=Math.floor(n)%s,c=n-Math.floor(n);return Kt(r[a],r[(a+1)%s],.5-.5*Math.cos(Math.PI*c))}function et(o,i,e,t){let r=T(i,"size")/100,s=T(i,"base")/100;return br(e,i).map(n=>{let a=_r(t,n,i);if(ue(o))return{level:1,rgb:De(o,a,i)};let c=s+r*Ve(o,a,i,n,t);return{level:Math.min(1,Math.max(0,c)),rgb:null}})}function tt(o){return{id:crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2),name:o,type:"chase",fixtures:[],params:{speed:60,fade_in:1,fade_out:1}}}var J="group:",yr=o=>"#"+o.map(i=>i.toString(16).padStart(2,"0")).join(""),$r=o=>[1,3,5].map(i=>parseInt(o.slice(i,i+2),16)),S=class extends y{constructor(){super(...arguments);this.effects=[];this.fixtures=[];this.errors=[];this.savedNames=[];this._selectedId="";this._filter="";this._live=!1;this._liveError="";this._phase=0;this._paused=!1;this._layerWithId="";this._phaseOther=0;this._raf=0;this._lastFrame=0;this._previewId="";this._dragIndex=null;this._animate=e=>{let t=this._current();if(t&&!this._paused){let r=this._lastFrame?(e-this._lastFrame)/1e3:0;this._phase+=r*T(t.params,"speed")/60;let s=this._layerWith(t);s&&(this._phaseOther+=r*T(s.params,"speed")/60)}this._lastFrame=e,this._raf=requestAnimationFrame(this._animate)}}connectedCallback(){super.connectedCallback(),this._raf=requestAnimationFrame(this._animate)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._raf),this._stopLive()}willUpdate(e){e.has("effects")&&!this.effects.find(t=>t.id===this._selectedId)&&(this._selectedId=this.effects[0]?.id??""),e.has("savedNames")&&e.get("savedNames")!==void 0&&this._stopLive()}updated(e){e.has("_selectedId")&&this.renderRoot.querySelector(".main")?.scrollTo(0,0)}_current(){return this.effects.find(e=>e.id===this._selectedId)}_layerWith(e){let t=this.effects.find(r=>r.id===this._layerWithId);return t&&W(t.type)!==W(e.type)?t:void 0}_emit(e){this.dispatchEvent(new CustomEvent("effects-changed",{detail:{effects:e},bubbles:!0,composed:!0}))}_update(e){let t=this._current();if(!t)return;let r={...t,...e};this._emit(this.effects.map(s=>s.id===t.id?r:s)),this._schedulePreviewUpdate(r)}_setType(e){let t=this._current();if(t){if((e==="color_chase"||e==="color_wave")&&(t.params.colors?.length??0)<2){this._update({type:e,params:{...t.params,colors:Ce.map(r=>[...r])}});return}this._update({type:e})}}_setParam(e,t){let r=this._current();if(!r)return;let s={...r.params,[e]:t};t==null&&delete s[e],this._update({params:s})}_add(){let e=new Set(this.effects.map(s=>s.name.toLowerCase())),t=this.effects.length+1;for(;e.has(`effect ${t}`);)t++;let r=tt(`Effect ${t}`);this._emit([...this.effects,r]),this._select(r.id)}_duplicate(){let e=this._current();if(!e)return;let t={...structuredClone(e),id:tt("").id,name:`${e.name} copy`};this._emit([...this.effects,t]),this._select(t.id)}_delete(){let e=this._current();!e||!confirm(`Delete the effect "${e.name}"?`)||(this._stopLive(),this._emit(this.effects.filter(t=>t.id!==e.id)))}_select(e){e!==this._selectedId&&(this._stopLive(),this._selectedId=e,this._phase=0)}_usable(){return this.fixtures.filter(e=>e.type!=="fixed")}_states(){return this.hass.states??{}}_groupMembers(e,t=0){let r=this._states()[e]?.attributes?.entity_id;return!Array.isArray(r)||t>4?[e]:r.flatMap(s=>this._groupMembers(s,t+1))}_expand(e){let t=new Map(this._usable().map(n=>[n.entityId,n.name])),r=new Set(this._usable().map(n=>n.name)),s=[];for(let n of e){let a=n.startsWith(J)?this._groupMembers(n.slice(J.length)).map(c=>t.get(c)).filter(c=>!!c):r.has(n)?[n]:[];for(let c of a)s.includes(c)||s.push(c)}return s}_groups(){let e=new Map(this._usable().map(r=>[r.entityId,r.name])),t=[];for(let[r,s]of Object.entries(this._states())){let n=r.split(".")[0];if(n!=="light"&&n!=="group"||!Array.isArray(s.attributes?.entity_id))continue;let a=this._groupMembers(r),c=[...new Set(a.map(p=>e.get(p)).filter(p=>!!p))];c.length&&t.push({entityId:r,name:s.attributes.friendly_name||r,fixtures:c,total:new Set(a).size})}return t.sort((r,s)=>r.name.localeCompare(s.name))}_groupLabel(e){let t=e.slice(J.length);return this._states()[t]?.attributes?.friendly_name||t}_expandGroup(e){let t=this._current();if(!t)return;let r=t.fixtures.indexOf(e),s=this._expand([e]).filter(a=>!t.fixtures.includes(a)),n=[...t.fixtures];n.splice(r,1,...s),this._update({fixtures:n})}_toggleFixture(e,t){let r=this._current();if(!r)return;let s=r.fixtures.filter(n=>n!==e);t&&s.push(e),this._update({fixtures:s})}_setAll(e,t){let r=this._current();if(r)if(t){let s=e.filter(n=>!r.fixtures.includes(n));this._update({fixtures:[...r.fixtures,...s]})}else this._update({fixtures:r.fixtures.filter(s=>!e.includes(s))})}_sortByAddress(){let e=this._current();if(!e)return;let t=s=>{let n=this.fixtures.find(a=>a.name===s);return n?[n.host,Number(n.universe),n.channel]:["",0,0]},r=[...e.fixtures].sort((s,n)=>{let[a,c,p]=t(s),[d,h,f]=t(n);return a.localeCompare(d)||c-h||p-f});this._update({fixtures:r})}_move(e,t){let r=this._current();if(!r||t<0||t>=r.fixtures.length||e===t)return;let s=[...r.fixtures],[n]=s.splice(e,1);s.splice(t,0,n),this._update({fixtures:s})}async _toggleLive(e){if(!e){this._stopLive();return}let t=this._current();if(t){this._liveError="",this._previewId=`${t.id}-${Date.now()}`,this._live=!0;try{this._previewStop=await Rt(this.hass,this._previewId,this._payload(t))}catch(r){this._live=!1,this._previewStop=void 0,this._liveError=r?.message??String(r)}}}_stopLive(){window.clearTimeout(this._previewTimer);let e=this._previewStop;this._previewStop=void 0,this._live=!1,e?.().catch(()=>{})}_payload(e){let{id:t,...r}=e;return r}_schedulePreviewUpdate(e){!this._live||!this._previewStop||(window.clearTimeout(this._previewTimer),this._previewTimer=window.setTimeout(async()=>{try{await Lt(this.hass,this._previewId,this._payload(e)),this._liveError=""}catch(t){this._liveError=t?.message??String(t)}},120))}_entityState(e){if(this.savedNames.includes(e.name))return this.hass.states?.[ee(e.name)]}_runSaved(e,t,r){r.stopPropagation(),D(this.hass,"light",t?"turn_on":"turn_off",{entity_id:ee(e.name)})}_errorsFor(e){let t=`effects/${e}`;return this.errors.filter(r=>r.path===t||r.path.startsWith(`${t}/`))}render(){let e=this._current();return l`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Effects</div>
          ${this.effects.map((t,r)=>{let s=this._entityState(t),n=s?.state==="on",a=Te.find(c=>c.type===t.type);return l`
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
                    <span class="badge ${W(t.type)}">${W(t.type)==="color"?"Colour":"Intensity"}</span>
                    ${a?.label??t.type} · ${this._expand(t.fixtures).length} fixture${this._expand(t.fixtures).length===1?"":"s"}
                    ${s?m:l` · <em>not saved</em>`}
                  </span>
                </span>
                ${s?l`<button
                      class="run ${n?"on":""}"
                      title=${n?"Stop (fades out)":"Run (fades in)"}
                      aria-label=${n?`Stop ${t.name}`:`Run ${t.name}`}
                      @click=${c=>this._runSaved(t,!n,c)}
                    >${n?"\u25A0":"\u25B6"}</button>`:m}
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
    </div>`}_renderEditor(e){let t=this.effects.findIndex(n=>n.id===e.id),r=this._errorsFor(t),s=ue(e.type);return l`
      <div class="editor-head">
        <input
          class="name"
          aria-label="Effect name"
          .value=${e.name}
          @input=${n=>this._update({name:n.target.value})}
        />
        <span class="entity">${ee(e.name||"effect")}</span>
        <span class="spacer"></span>
        <button @click=${this._duplicate}>Duplicate</button>
        <button class="danger" @click=${this._delete}>Delete</button>
      </div>

      ${r.length?l`<div class="errors">${r.map(n=>l`<div>⚠ ${n.message}</div>`)}</div>`:m}

      ${this._renderPreview(e)}

      <section>
        <h3>Effect</h3>
        <div class="layer-note">
          Intensity effects move brightness and keep each fixture's colour; colour effects set
          the colour. Run one of each on the same fixtures to <b>layer</b> them — e.g. a chase
          over a rainbow.
        </div>
        ${["intensity","color"].map(n=>l`
            <div class="type-group">
              <div class="type-group-label">${n==="color"?"Colour":"Intensity"}</div>
              <div class="types">
                ${Te.filter(a=>a.kind===n).map(a=>l`
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

      ${s?this._renderColors(e):this._renderShape(e)}

      ${this._renderFlow(e)}
    `}_renderPreview(e){let t=Qe(this._expand(e.fixtures),e.params),r=et(e.type,e.params,t.length,this._phase),s=new Map(t.map((d,h)=>[d,r[h]])),n=this._expand(e.fixtures).filter(d=>s.has(d)),a=n.map(d=>s.get(d)),c=this._layerWith(e);if(c){let d=Qe(this._expand(c.fixtures),c.params),h=et(c.type,c.params,d.length,this._phaseOther),f=new Map(d.map((g,_)=>[g,h[_]]));n.forEach((g,_)=>{let $=f.get(g);$&&(a[_]=W(e.type)==="intensity"?{level:a[_].level,rgb:$.rgb}:{level:$.level,rgb:a[_].rgb})})}let p=this.effects.filter(d=>d.id!==e.id&&W(d.type)!==W(e.type));return l`
      <section class="preview">
        <div class="preview-head">
          <h3>Preview</h3>
          <button class="small" @click=${()=>this._paused=!this._paused}>
            ${this._paused?"\u25B6 Play":"\u275A\u275A Pause"}
          </button>
          ${p.length?l`<label class="layer-with">
                Layer with
                <select @change=${d=>{this._layerWithId=d.target.value,this._phaseOther=0}}>
                  <option value="" ?selected=${!c}>nothing</option>
                  ${p.map(d=>l`<option value=${d.id} ?selected=${c?.id===d.id}>${d.name}</option>`)}
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
        ${n.length?l`<div class="strip">
              ${n.map((d,h)=>{let f=a[h],g=f.rgb??[255,214,150],_=g.map($=>Math.round($*f.level));return l`<div class="cell" title=${`${d}: ${Math.round(f.level*100)}%`}>
                  <div class="lamp" style="background: rgb(${_.join(",")}); box-shadow: 0 0 ${Math.round(14*f.level)}px rgba(${g.join(",")}, ${(.8*f.level).toFixed(2)})"></div>
                  <div class="cell-name">${d}</div>
                </div>`})}
            </div>`:l`<div class="hint">Pick some fixtures below to see the effect.</div>`}
      </section>
    `}_typeGlyph(e,t){if(ue(e)){let c=Array.from({length:12},(p,d)=>{let h=De(e,d/11,t);return bt`<stop offset=${d/11} stop-color=${`rgb(${h.join(",")})`} />`});return l`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
        <defs><linearGradient id="g-${e}">${c}</linearGradient></defs>
        <rect x="2" y="5" width=${60} height=${12} rx="4" fill="url(#g-${e})" />
      </svg>`}let n={position:0,count:4,index:0},a=Array.from({length:65},(c,p)=>{let d=p/64*2,h=Ve(e,d%1,{...t,seed:3},n,d);return`${2+p/64*60},${19-h*16}`}).join(" ");return l`<svg class="glyph" viewBox="0 0 ${64} ${22}" aria-hidden="true">
      <polyline points=${a} fill="none" stroke="currentColor" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" />
    </svg>`}_renderFixtures(e){let t=this._filter.trim().toLowerCase(),r=this._usable(),s=new Map;for(let d of r){if(t&&!`${d.name} ${d.type}`.toLowerCase().includes(t))continue;let h=`${d.host} \xB7 universe ${d.universe}`;s.set(h,[...s.get(h)??[],d])}let n=this._groups().filter(d=>!t||`${d.name} ${d.entityId}`.toLowerCase().includes(t)),a=this._states(),c=e.fixtures.filter(d=>d.startsWith(J)?!a[d.slice(J.length)]:!r.some(h=>h.name===d)),p=this._expand(e.fixtures).length;return l`
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
              <div class="pick-group groups">
                <div class="pick-head plain">
                  Groups
                  <button class="small link-btn" title="Make or edit light groups"
                    @click=${()=>this.dispatchEvent(new CustomEvent("open-groups",{bubbles:!0,composed:!0}))}>
                    Manage groups
                  </button>
                </div>
                ${n.length?n.map(d=>{let h=`${J}${d.entityId}`;return l`<label class="pick-item" title=${d.fixtures.join(", ")}>
                        <input type="checkbox" .checked=${e.fixtures.includes(h)}
                          @change=${f=>this._toggleFixture(h,f.target.checked)} />
                        <span class="pick-name"><span class="group-icon" aria-hidden="true">⧉</span>${d.name}</span>
                        <span class="pick-sub">${d.fixtures.length} fixture${d.fixtures.length===1?"":"s"}${d.total>d.fixtures.length?` of ${d.total} lights`:""}</span>
                      </label>`}):l`<div class="hint group-hint">
                      ${t?"No groups match the filter.":l`No light groups of these fixtures yet.
                        Make one in the <b>Groups</b> tab (or tick fixtures in the Patch list view and
                        use <b>Create group</b>) to use it here as one target.`}
                    </div>`}
              </div>
              ${r.length?[...s.entries()].map(([d,h])=>{let f=h.map(_=>_.name),g=f.every(_=>e.fixtures.includes(_));return l`
                      <div class="pick-group">
                        <label class="pick-head">
                          <input type="checkbox" .checked=${g}
                            @change=${_=>this._setAll(f,_.target.checked)} />
                          ${d}
                        </label>
                        ${h.map(_=>l`<label class="pick-item">
                            <input type="checkbox" .checked=${e.fixtures.includes(_.name)}
                              @change=${$=>this._toggleFixture(_.name,$.target.checked)} />
                            <span class="pick-name">${_.name}</span>
                            <span class="pick-sub">${_.type} · ${_.channel}</span>
                          </label>`)}
                      </div>`}):l`<div class="hint">No fixtures in the patch yet.</div>`}
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
            ${e.fixtures.length?l`<ol class="order-list">
                  ${e.fixtures.map((d,h)=>l`<li
                      class=${c.includes(d)?"missing":""}
                      draggable="true"
                      @dragstart=${f=>{this._dragIndex=h,f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain",d)}}
                      @dragover=${f=>f.preventDefault()}
                      @drop=${f=>{f.preventDefault(),this._dragIndex!==null&&this._move(this._dragIndex,h),this._dragIndex=null}}
                    >
                      <span class="grip" aria-hidden="true">⋮⋮</span>
                      <span class="order-nr">${h+1}</span>
                      ${d.startsWith(J)?l`<span class="order-name group" title=${this._expand([d]).join(", ")}>
                            <span class="group-icon" aria-hidden="true">⧉</span>${this._groupLabel(d)}
                            <small>${c.includes(d)?"group not found":`${this._expand([d]).length} fixtures`}</small>
                          </span>
                          <button class="small" title="Replace the group with its fixtures, to order them one by one"
                            ?disabled=${c.includes(d)} @click=${()=>this._expandGroup(d)}>Expand</button>`:l`<span class="order-name">${d}${c.includes(d)?" (not in patch)":""}</span>`}
                      <button class="icon" title="Move up" ?disabled=${h===0} @click=${()=>this._move(h,h-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${h===e.fixtures.length-1}
                        @click=${()=>this._move(h,h+1)}>↓</button>
                      <button class="icon" title="Remove" @click=${()=>this._toggleFixture(d,!1)}>✕</button>
                    </li>`)}
                </ol>`:l`<div class="hint">Tick fixtures or groups on the left. The effect flows through them in this order — drag to rearrange. A group follows its members when the effect starts and as the group changes.</div>`}
          </div>
        </div>
      </section>
    `}_renderShape(e){let t=e.type,r=t==="square"||t==="chase"||t==="sparkle",s=t==="square"||t==="chase",n=e.params.duty==null;return l`
      <section>
        <h3>Shape</h3>
        ${this._slider("Size","size",e,{min:0,max:100,step:1,unit:"%",hint:"How far the intensity moves"})}
        ${this._slider("Base","base",e,{min:0,max:100,step:1,unit:"%",hint:"Lowest intensity"})}
        ${r?l`
              ${t==="chase"||t==="sparkle"?l`<label class="check">
                    <input type="checkbox" .checked=${n}
                      @change=${a=>this._setParam("duty",a.target.checked?null:t==="sparkle"?30:25)} />
                    ${t==="chase"?"One fixture at a time":"Default sparkle amount"}
                  </label>`:m}
              ${!n||t==="square"?this._slider(t==="sparkle"?"Amount":"On time","duty",e,{min:1,max:100,step:1,unit:"%",fallback:50,hint:t==="sparkle"?"How often fixtures flash":"Share of each cycle that is on"}):m}
            `:m}
        ${s?this._slider("Crossfade","crossfade",e,{min:0,max:100,step:1,unit:"%",hint:"Fade instead of snap"}):m}
      </section>
    `}_renderColors(e){if(e.type==="rainbow")return l`<section><h3>Colours</h3>
        <div class="hint">The rainbow runs through every hue. Use Spread to set how many colours show at once.</div>
      </section>`;let t=e.params.colors?.length?e.params.colors:Ce,r=n=>this._setParam("colors",n),s=(n,a)=>n.length===a.length&&n.every((c,p)=>c.every((d,h)=>d===a[p][h]));return l`
      <section>
        <h3>Colours</h3>
        <div class="hint">
          ${e.type==="color_chase"?"Each fixture steps through these colours in order. Pick 2 or more.":"Each fixture fades smoothly through these colours in order. Pick 2 or more."}
        </div>
        <div class="colors">
          ${t.map((n,a)=>l`<div class="color">
              <span class="color-nr">${a+1}</span>
              <input type="color" aria-label="Colour ${a+1}" .value=${yr(n)}
                @input=${c=>r(t.map((p,d)=>d===a?$r(c.target.value):p))} />
              <span class="color-tools">
                <button class="icon" title="Move earlier" ?disabled=${a===0}
                  @click=${()=>{let c=[...t];[c[a-1],c[a]]=[c[a],c[a-1]],r(c)}}>←</button>
                <button class="icon" title="Move later" ?disabled=${a===t.length-1}
                  @click=${()=>{let c=[...t];[c[a+1],c[a]]=[c[a],c[a+1]],r(c)}}>→</button>
                <button class="icon" title="Remove colour" ?disabled=${t.length<=2}
                  @click=${()=>r(t.filter((c,p)=>p!==a))}>✕</button>
              </span>
            </div>`)}
          ${t.length<16?l`<button class="add-color" title="Add a colour"
                @click=${()=>r([...t,[255,255,255]])}>+</button>`:m}
        </div>
        <div class="palettes">
          <span class="field-label">Palettes</span>
          ${Gt.map(n=>l`<button class="palette ${s(n.colors,t)?"active":""}"
              title=${n.name} @click=${()=>r(n.colors.map(a=>[...a]))}>
              <span class="palette-swatch" style="background: linear-gradient(90deg, ${n.colors.map(a=>`rgb(${a.join(",")})`).join(", ")})"></span>
              ${n.name}
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
            ${r.map(([s,n])=>l`<button class=${t===s?"active":""} aria-pressed=${t===s}
              @click=${()=>this._setParam("direction",s==="forward"?void 0:s)}>${n}</button>`)}
          </div>
        </div>
        <div class="field">
          <span class="field-label">Shuffle</span>
          <label class="check inline">
            <input type="checkbox" .checked=${!!e.params.shuffle}
              @change=${s=>this._setParam("shuffle",s.target.checked||void 0)} />
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
    `}_slider(e,t,r,s){let a=r.params[t]??Me[t]?.default??s.fallback??s.min,c=Me[t];return l`<div class="field">
      <span class="field-label">${e}</span>
      <input type="range" min=${s.min} max=${s.max} step=${s.step} .value=${String(Math.min(s.max,a))}
        aria-label=${e}
        @input=${p=>this._setParam(t,Number(p.target.value))} />
      <span class="num">
        <input type="number" min=${c?.min??s.min} max=${c?.max??s.max} step=${s.step===15?1:s.step}
          .value=${String(a)} aria-label="${e} value"
          @change=${p=>{let d=Number(p.target.value);Number.isNaN(d)||this._setParam(t,d)}} />
        <span class="unit">${s.unit}</span>
      </span>
      ${s.hint?l`<span class="field-hint">${s.hint}</span>`:m}
    </div>`}_number(e,t,r,s,n){return l`<label class="field compact">
      <span class="field-label">${e}</span>
      <span class="num">
        <input type="number" min="0" max="600" step=${n} .value=${String(T(r.params,t))}
          @change=${a=>this._setParam(t,Number(a.target.value))} />
        <span class="unit">${s}</span>
      </span>
    </label>`}_stepper(e,t,r,s){let n=T(r.params,t),a=c=>this._setParam(t,Math.max(1,Math.min(512,c))===1?void 0:Math.max(1,Math.min(512,c)));return l`<div class="stepper" title=${s}>
      <span class="field-label">${e}</span>
      <div class="stepper-ctl">
        <button class="icon" aria-label="Fewer ${e.toLowerCase()}" ?disabled=${n<=1} @click=${()=>a(n-1)}>−</button>
        <span class="stepper-val">${n}</span>
        <button class="icon" aria-label="More ${e.toLowerCase()}" @click=${()=>a(n+1)}>+</button>
      </div>
      <span class="field-hint">${s}</span>
    </div>`}};S.styles=w`
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
      justify-content: space-between;
    }
    button.link-btn {
      background: none;
      color: var(--primary-color);
      padding: 2px 6px;
    }
    .group-hint {
      padding: 2px 4px 6px;
      font-size: 0.78rem;
    }
    .pick-group.groups {
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      padding-bottom: 6px;
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
  `,u([b({attribute:!1})],S.prototype,"hass",2),u([b({attribute:!1})],S.prototype,"effects",2),u([b({attribute:!1})],S.prototype,"fixtures",2),u([b({attribute:!1})],S.prototype,"errors",2),u([b({attribute:!1})],S.prototype,"savedNames",2),u([v()],S.prototype,"_selectedId",2),u([v()],S.prototype,"_filter",2),u([v()],S.prototype,"_live",2),u([v()],S.prototype,"_liveError",2),u([v()],S.prototype,"_phase",2),u([v()],S.prototype,"_paused",2),u([v()],S.prototype,"_layerWithId",2),S=u([k("dmx-effects-view")],S);var M=class extends y{constructor(){super(...arguments);this.fixtures=[];this.prefill=null;this._groups=[];this._loaded=!1;this._selected="";this._draft=null;this._saving=!1;this._error="";this._filter=""}connectedCallback(){super.connectedCallback(),this._load()}willUpdate(e){e.has("prefill")&&this.prefill&&this._startNew(this.prefill.entities)}async _load(e){try{this._groups=(await Ut(this.hass)).groups,this._error=""}catch(t){this._error=t?.message??String(t)}this._loaded=!0,e?this._select(e):!this._selected&&this._groups.length&&this._select(this._groups[0].entry_id)}_current(){return this._groups.find(e=>e.entry_id===this._selected)}_select(e){let t=this._groups.find(r=>r.entry_id===e);this._selected=e,this._error="",this._draft=t?{name:t.name,entities:[...t.entities]}:null}_startNew(e=[]){this._selected="new",this._error="",this._draft={name:"",entities:[...e]},this.updateComplete.then(()=>this.renderRoot.querySelector("input.name")?.focus())}_dirty(){if(!this._draft)return!1;if(this._selected==="new")return!0;let e=this._current();return!!e&&(e.name!==this._draft.name||e.entities.join()!==this._draft.entities.join())}_byEntity(){return new Map(this.fixtures.map(e=>[e.entityId??"",e]))}_setMembers(e){this._draft&&(this._draft={...this._draft,entities:e})}_toggle(e,t){let r=(this._draft?.entities??[]).filter(s=>s!==e);t&&r.push(e),this._setMembers(r)}_setAll(e,t){let r=this._draft?.entities??[];this._setMembers(t?[...r,...e.filter(s=>!r.includes(s))]:r.filter(s=>!e.includes(s)))}_move(e,t){let r=[...this._draft?.entities??[]];if(t<0||t>=r.length)return;let[s]=r.splice(e,1);r.splice(t,0,s),this._setMembers(r)}async _save(){let e=this._draft;if(e){if(!e.name.trim()){this._error="Give the group a name";return}if(!e.entities.length){this._error="Pick at least one fixture";return}this._saving=!0,this._error="";try{if(this._selected==="new"){let t=await Ht(this.hass,e.name,e.entities);this._toast(`Created ${t.name}${t.entity_id?` (${t.entity_id})`:""}`),await this._load(t.entry_id)}else{let t=this._current(),r={};t.name!==e.name&&(r.name=e.name),t.entities.join()!==e.entities.join()&&(r.entities=e.entities),await zt(this.hass,t.entry_id,r),this._toast(`Saved ${e.name}`),await this._load(t.entry_id)}}catch(t){this._error=t?.message??String(t)}finally{this._saving=!1}}}async _delete(){let e=this._current();if(!(!e||!confirm(`Delete the light group "${e.name}"? Effects using it will skip it.`))){this._saving=!0;try{await Ot(this.hass,e.entry_id),this._toast(`Deleted ${e.name}`),this._selected="",this._draft=null,await this._load()}catch(t){this._error=t?.message??String(t)}finally{this._saving=!1}}}_toast(e){this.dispatchEvent(new CustomEvent("panel-toast",{detail:e,bubbles:!0,composed:!0}))}render(){let e=this._byEntity();return l`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Light groups</div>
          ${this._groups.map(t=>{let r=t.entities.filter(n=>e.has(n)).length,s=t.entity_id?this.hass.states?.[t.entity_id]?.state:void 0;return l`<button
              class="rail-item ${t.entry_id===this._selected?"active":""}"
              @click=${()=>this._select(t.entry_id)}
            >
              <span class="dot ${s??""}"></span>
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
    </div>`}_renderEditor(){let e=this._draft,t=this._current(),r=this._selected==="new",s=this._byEntity(),n=this._filter.trim().toLowerCase(),a=new Map,c=0;for(let d of this.fixtures){if(!d.entityId||!this.hass.states?.[d.entityId]){c++;continue}if(n&&!`${d.name} ${d.type}`.toLowerCase().includes(n))continue;let h=`${d.host} \xB7 universe ${d.universe}`;a.set(h,[...a.get(h)??[],d])}let p=t?.entity_id?this.hass.states?.[t.entity_id]:void 0;return l`
      <div class="editor-head">
        <input
          class="name"
          placeholder="Group name, e.g. Front wash"
          aria-label="Group name"
          .value=${e.name}
          @input=${d=>this._draft={...e,name:d.target.value}}
        />
        ${t?.entity_id?l`<button class="link" title="Open the group's light entity"
              @click=${()=>j(this,t.entity_id)}>
              <span class="dot ${p?.state??""}"></span><code>${t.entity_id}</code>
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
              ${this.fixtures.length?[...a.entries()].map(([d,h])=>{let f=h.map(_=>_.entityId),g=f.every(_=>e.entities.includes(_));return l`<div class="pick-group">
                      <label class="pick-head">
                        <input type="checkbox" .checked=${g}
                          @change=${_=>this._setAll(f,_.target.checked)} />
                        ${d}
                      </label>
                      ${h.map(_=>l`<label class="pick-item">
                        <input type="checkbox" .checked=${e.entities.includes(_.entityId)}
                          @change=${$=>this._toggle(_.entityId,$.target.checked)} />
                        <span class="pick-name">${_.name}</span>
                        <span class="pick-sub">${_.type} · ${_.channel}</span>
                      </label>`)}
                    </div>`}):l`<div class="hint">No fixtures in the patch yet.</div>`}
              ${c?l`<div class="hint">${c} new fixture${c===1?"":"s"} not listed:
                    Save &amp; Apply the patch first to create their lights.</div>`:m}
            </div>
          </div>
          <div class="order">
            <div class="order-head">In this group (${e.entities.length})</div>
            ${e.entities.length?l`<ol class="order-list">
                  ${e.entities.map((d,h)=>{let f=s.get(d),g=f?.name??(this.hass.states?.[d]?.attributes?.friendly_name||d);return l`<li class=${f?"":"other"}>
                      <span class="order-nr">${h+1}</span>
                      <span class="order-name">${g}${f?"":l` <small>not a DMX fixture</small>`}</span>
                      <button class="icon" title="Move up" ?disabled=${h===0} @click=${()=>this._move(h,h-1)}>↑</button>
                      <button class="icon" title="Move down" ?disabled=${h===e.entities.length-1}
                        @click=${()=>this._move(h,h+1)}>↓</button>
                      <button class="icon" title="Remove from group" @click=${()=>this._toggle(d,!1)}>✕</button>
                    </li>`})}
                </ol>`:l`<div class="hint">Tick fixtures on the left to add them.</div>`}
          </div>
        </div>
      </section>
    `}};M.styles=w`
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
  `,u([b({attribute:!1})],M.prototype,"hass",2),u([b({attribute:!1})],M.prototype,"fixtures",2),u([b({attribute:!1})],M.prototype,"prefill",2),u([v()],M.prototype,"_groups",2),u([v()],M.prototype,"_loaded",2),u([v()],M.prototype,"_selected",2),u([v()],M.prototype,"_draft",2),u([v()],M.prototype,"_saving",2),u([v()],M.prototype,"_error",2),u([v()],M.prototype,"_filter",2),M=u([k("dmx-groups-view")],M);var wr=o=>"#"+o.map(i=>Math.round(i).toString(16).padStart(2,"0")).join(""),kr=o=>[1,3,5].map(i=>parseInt(o.slice(i,i+2),16)),Er={rgb:"rgb",rgbw:"rgb",rgbww:"rgb",xy:"rgb",color_temp:"ct",dimmer:"dim",binary:"onoff"},C=class extends y{constructor(){super(...arguments);this.fixtures=[];this.effectEntities=[];this._selected="";this._draft=null;this._original="";this._saving=!1;this._error="";this._filter="";this._live=!1}_states(){return this.hass.states??{}}_scenes(){return Object.entries(this._states()).filter(([e,t])=>e.startsWith("scene.")&&t.attributes.id!=null).map(([e,t])=>({entityId:e,id:String(t.attributes.id),name:t.attributes.friendly_name||e,members:t.attributes.entity_id??[]})).sort((e,t)=>e.name.localeCompare(t.name))}_targets(){let e=this._states(),t=[],r=new Set;for(let s of this.fixtures)!s.entityId||!e[s.entityId]||s.type==="fixed"||(r.add(s.entityId),t.push({entityId:s.entityId,label:s.name,kind:"fixture",control:Er[s.type]??"dim",section:`Fixtures \xB7 ${s.host} \xB7 universe ${s.universe}`}));for(let[s,n]of Object.entries(e)){let a=n.attributes.entity_id;if(!s.startsWith("light.")||!Array.isArray(a)||!a.some(p=>r.has(p)))continue;let c=n.attributes.supported_color_modes??[];t.push({entityId:s,label:n.attributes.friendly_name||s,kind:"group",control:c.some(p=>["rgb","rgbw","rgbww","hs","xy"].includes(p))?"rgb":c.includes("color_temp")?"ct":c.includes("onoff")&&c.length===1?"onoff":"dim",section:"Light groups"})}for(let s of this.effectEntities)e[s.entityId]&&t.push({entityId:s.entityId,label:s.name,kind:"effect",control:"dim",section:"Effects"});return t}willUpdate(e){if(e.has("hass")&&!this._selected){let t=this._scenes()[0];t&&this._select(t.id)}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._liveTimer)}async _select(e){this._live=!1,this._error="",this._selected=e,this._draft=null;try{let t=await this.hass.callApi("GET",`config/scene/config/${e}`);this._draft={id:e,name:t.name??"",icon:t.icon,entities:t.entities??{}},this._original=JSON.stringify(this._draft)}catch(t){this._error=`Couldn't load this scene: ${t?.message??t}`}}_startNew(){this._live=!1,this._error="",this._selected="new",this._draft={id:String(Date.now()),name:"",entities:{}},this._original="",this.updateComplete.then(()=>this.renderRoot.querySelector("input.name")?.focus())}_dirty(){return!!this._draft&&JSON.stringify(this._draft)!==this._original}_setEntities(e){this._draft&&(this._draft={...this._draft,entities:e},this._scheduleLive())}_capture(e){let t=this._states()[e.entityId];if(!t||t.state!=="on")return{state:"off"};let r=t.attributes,s={state:"on"};return e.control!=="onoff"&&typeof r.brightness=="number"&&(s.brightness=r.brightness),e.control==="rgb"&&Array.isArray(r.rgb_color)&&(s.rgb_color=r.rgb_color.slice(0,3)),e.control==="ct"&&typeof r.color_temp_kelvin=="number"&&(s.color_temp_kelvin=r.color_temp_kelvin),s}_toggleTarget(e,t){let r={...this._draft?.entities??{}};if(t){let s=this._capture(e);r[e.entityId]=s.state==="on"?s:{state:"on",...e.control==="onoff"?{}:{brightness:255}}}else delete r[e.entityId];this._setEntities(r)}_setAll(e,t){let r={...this._draft?.entities??{}};for(let s of e)t&&!r[s.entityId]&&(r[s.entityId]={state:"on",...s.control==="onoff"?{}:{brightness:255}}),t||delete r[s.entityId];this._setEntities(r)}_update(e,t){let r={...this._draft?.entities??{}},s={...r[e],...t};for(let[n,a]of Object.entries(t))a===void 0&&delete s[n];r[e]=s,this._setEntities(r)}_captureAll(){let e=new Map(this._targets().map(r=>[r.entityId,r])),t={};for(let[r,s]of Object.entries(this._draft?.entities??{})){let n=e.get(r);t[r]=n?this._capture(n):s}this._setEntities(t)}_scheduleLive(){this._live&&(window.clearTimeout(this._liveTimer),this._liveTimer=window.setTimeout(()=>this._applyDraft(),150))}async _applyDraft(){let e=this._draft?.entities??{};if(Object.keys(e).length)try{await D(this.hass,"scene","apply",{entities:e,transition:0}),this._error=""}catch(t){this._error=`Couldn't preview: ${t?.message??t}`}}_toggleLive(e){this._live=e,e&&this._applyDraft()}_activate(){let e=this._scenes().find(t=>t.id===this._selected);e&&!this._dirty()?D(this.hass,"scene","turn_on",{entity_id:e.entityId}):this._applyDraft()}async _save(){let e=this._draft;if(e){if(!e.name.trim()){this._error="Give the scene a name";return}if(!Object.keys(e.entities).length){this._error="Add at least one light";return}this._saving=!0,this._error="";try{let t={name:e.name.trim(),entities:e.entities};e.icon&&(t.icon=e.icon),await this.hass.callApi("POST",`config/scene/config/${e.id}`,t),this._original=JSON.stringify(e),this._selected=e.id,this._toast(`Saved ${e.name.trim()}`)}catch(t){let r=t;this._error=`Couldn't save: ${r?.body?.message??r?.message??t}. Scenes made in the UI need "scene: !include scenes.yaml" in configuration.yaml (the default).`}finally{this._saving=!1}}}async _delete(){let e=this._draft;if(!(!e||!confirm(`Delete the scene "${e.name}"?`)))try{await this.hass.callApi("DELETE",`config/scene/config/${e.id}`),this._toast(`Deleted ${e.name}`),this._selected="",this._draft=null}catch(t){this._error=`Couldn't delete: ${t?.message??t}`}}_toast(e){this.dispatchEvent(new CustomEvent("panel-toast",{detail:e,bubbles:!0,composed:!0}))}render(){let e=this._scenes();return l`
      <div class="layout">
        <nav class="rail">
          <div class="rail-section">Scenes</div>
          ${e.map(t=>l`<div
              class="rail-item ${t.id===this._selected?"active":""}"
              role="button"
              tabindex="0"
              @click=${()=>this._select(t.id)}
              @keydown=${r=>r.key==="Enter"&&this._select(t.id)}
            >
              <span class="rail-text">
                <span class="rail-title">${t.name}</span>
                <span class="rail-sub">${t.members.length} light${t.members.length===1?"":"s"}</span>
              </span>
              <button class="run" title="Activate ${t.name}" aria-label="Activate ${t.name}"
                @click=${r=>{r.stopPropagation(),D(this.hass,"scene","turn_on",{entity_id:t.entityId})}}>▶</button>
            </div>`)}
          ${this._selected==="new"?l`<div class="rail-item active"><span class="rail-title">New scene</span></div>`:m}
          <button class="rail-add" @click=${this._startNew}>+ New scene</button>
        </nav>
        <main class="main">
          ${this._draft?this._renderEditor():this._renderEmpty(e.length)}
        </main>
      </div>
    `}_renderEmpty(e){return l`<div class="empty">
      ${e&&this._selected?"Loading\u2026":l`<p>Scenes store how your fixtures, groups and effects look, and bring them back
            in one go.</p>
            <button class="primary" @click=${this._startNew}>+ New scene</button>`}
      ${this._error?l`<div class="error">${this._error}</div>`:m}
    </div>`}_renderEditor(){let e=this._draft,t=this._selected==="new",r=this._scenes().find(d=>d.id===this._selected),s=this._targets(),n=new Map(s.map(d=>[d.entityId,d])),a=this._filter.trim().toLowerCase(),c=new Map;for(let d of s)a&&!`${d.label} ${d.entityId}`.toLowerCase().includes(a)||c.set(d.section,[...c.get(d.section)??[],d]);let p=Object.keys(e.entities);return l`
      <div class="editor-head">
        <input class="name" placeholder="Scene name, e.g. Evening" aria-label="Scene name"
          .value=${e.name}
          @input=${d=>this._draft={...e,name:d.target.value}} />
        ${r?l`<button class="link" @click=${()=>j(this,r.entityId)}><code>${r.entityId}</code></button>`:m}
        <span class="spacer"></span>
        ${t?m:l`<button class="danger" @click=${this._delete}>Delete</button>`}
        ${this._dirty()&&!t?l`<button @click=${()=>this._select(this._selected)}>Discard</button>`:m}
        <button class="primary" ?disabled=${this._saving||!this._dirty()} @click=${this._save}>
          ${this._saving?"Saving\u2026":t?"Create scene":"Save"}
        </button>
      </div>
      <div class="toolbar">
        <button @click=${this._activate} ?disabled=${!p.length}
          title=${this._dirty()?"Show the scene as edited (not saved yet)":"Activate the scene"}>▶ Activate</button>
        <button @click=${this._captureAll} ?disabled=${!p.length}
          title="Set every light in the scene to how it looks right now">⟳ Capture current</button>
        <label class="switch" title="Apply every change to the lights as you make it">
          <input type="checkbox" .checked=${this._live} ?disabled=${!p.length}
            @change=${d=>this._toggleLive(d.target.checked)} />
          Live edit
        </label>
      </div>
      <div class="hint">A Home Assistant scene (also under Settings → Automations &amp; Scenes →
        Scenes). Saved straight to Home Assistant — no Save &amp; Apply needed.</div>
      ${this._error?l`<div class="error">${this._error}</div>`:m}

      <div class="columns">
        <section class="pick">
          <h3>Add lights</h3>
          <input class="filter" type="search" placeholder="Filter" .value=${this._filter}
            @input=${d=>this._filter=d.target.value} />
          <div class="pick-list">
            ${[...c.entries()].map(([d,h])=>{let f=h.every(g=>e.entities[g.entityId]);return l`<div class="pick-group">
                <label class="pick-head">
                  <input type="checkbox" .checked=${f}
                    @change=${g=>this._setAll(h,g.target.checked)} />
                  ${d}
                </label>
                ${h.map(g=>l`<label class="pick-item">
                  <input type="checkbox" .checked=${!!e.entities[g.entityId]}
                    @change=${_=>this._toggleTarget(g,_.target.checked)} />
                  <span class="pick-name">${g.kind==="group"?"\u29C9 ":g.kind==="effect"?"\u2726 ":""}${g.label}</span>
                </label>`)}
              </div>`})}
            ${s.length?m:l`<div class="hint">No fixtures with light entities yet —
              Save &amp; Apply the patch first.</div>`}
          </div>
        </section>
        <section class="settings">
          <h3>In this scene (${p.length})</h3>
          ${p.length?p.map(d=>this._renderRow(d,e.entities[d],n.get(d))):l`<div class="hint">Tick fixtures, groups or effects on the left.</div>`}
        </section>
      </div>
    `}_renderRow(e,t,r){let s=t.state==="on",n=r?.label??(this._states()[e]?.attributes?.friendly_name||e),a=s?t.rgb_color?`rgb(${t.rgb_color.join(",")})`:r?.control==="ct"?"#ffd9a0":"#fff6e0":"transparent",c=Math.round((t.brightness??255)/255*100);return l`<div class="row ${s?"":"off"}">
      <div class="row-head">
        <span class="swatch" style="background: ${a}; opacity: ${s?Math.max(.25,c/100):1}"></span>
        <span class="row-name">${r?.kind==="group"?"\u29C9 ":r?.kind==="effect"?"\u2726 ":""}${n}</span>
        ${r?m:l`<small class="muted">kept as is</small>`}
        <span class="spacer"></span>
        <label class="onoff">
          <input type="checkbox" .checked=${s} ?disabled=${!r}
            @change=${p=>{p.target.checked?this._update(e,{state:"on",brightness:t.brightness??(r?.control==="onoff"?void 0:255)}):this._update(e,{state:"off",brightness:void 0,rgb_color:void 0,color_temp_kelvin:void 0})}} />
          ${s?"On":"Off"}
        </label>
        <button class="icon" title="Remove from scene" @click=${()=>{let p={...this._draft?.entities??{}};delete p[e],this._setEntities(p)}}>✕</button>
      </div>
      ${s&&r&&r.control!=="onoff"?l`<div class="row-controls">
            <label class="ctl">
              <span>${r.kind==="effect"?"Level":"Brightness"}</span>
              <input type="range" min="1" max="255" .value=${String(t.brightness??255)}
                @input=${p=>this._update(e,{brightness:Number(p.target.value)})} />
              <span class="num">${c}%</span>
            </label>
            ${r.control==="rgb"?l`<label class="ctl">
                  <span>Colour</span>
                  <input type="color" .value=${wr(t.rgb_color??[255,255,255])}
                    @input=${p=>this._update(e,{rgb_color:kr(p.target.value)})} />
                  ${t.rgb_color?l`<button class="small" title="Keep the light's own colour"
                        @click=${()=>this._update(e,{rgb_color:void 0})}>clear</button>`:l`<span class="muted">unchanged</span>`}
                </label>`:m}
            ${r.control==="ct"?l`<label class="ctl">
                  <span>Colour temp</span>
                  <input type="range" min="2000" max="6500" step="50"
                    .value=${String(t.color_temp_kelvin??4e3)}
                    @input=${p=>this._update(e,{color_temp_kelvin:Number(p.target.value)})} />
                  <span class="num">${t.color_temp_kelvin?`${t.color_temp_kelvin} K`:"unchanged"}</span>
                </label>`:m}
          </div>`:m}
    </div>`}};C.styles=w`
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
    .rail-item.active {
      background: var(--secondary-background-color, #f0f0f0);
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
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px 40px;
      box-sizing: border-box;
      max-width: 1100px;
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
    button.small {
      padding: 2px 8px;
      font-size: 0.8rem;
    }
    button.link {
      background: none;
      color: var(--primary-color);
      padding: 4px 6px;
    }
    .empty {
      padding: 48px 24px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .editor-head,
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
    }
    .toolbar {
      margin-top: 10px;
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
    .switch {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .spacer {
      flex: 1;
    }
    .hint,
    .muted {
      font-size: 0.82rem;
      color: var(--secondary-text-color);
    }
    .hint {
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
    .columns {
      display: grid;
      grid-template-columns: minmax(200px, 1fr) minmax(0, 2fr);
      gap: 16px;
      margin-top: 16px;
      align-items: start;
    }
    section {
      min-width: 0;
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
      max-height: 60vh;
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
    .row {
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      margin-bottom: 6px;
    }
    .row.off {
      opacity: 0.75;
    }
    .row-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .swatch {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      flex: none;
    }
    .row-name {
      font-weight: 500;
    }
    .onoff {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.85rem;
    }
    .row-controls {
      display: grid;
      gap: 4px;
      margin: 6px 0 0 24px;
    }
    .ctl {
      display: grid;
      grid-template-columns: 90px 1fr auto;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }
    .ctl input[type='range'] {
      width: 100%;
      accent-color: var(--primary-color);
    }
    .ctl input[type='color'] {
      width: 48px;
      height: 28px;
      padding: 0;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: none;
      cursor: pointer;
    }
    .num {
      min-width: 4.5em;
      text-align: right;
      font-variant-numeric: tabular-nums;
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
      .columns {
        grid-template-columns: 1fr;
      }
      .ctl {
        grid-template-columns: 76px 1fr auto;
      }
    }
  `,u([b({attribute:!1})],C.prototype,"hass",2),u([b({attribute:!1})],C.prototype,"fixtures",2),u([b({attribute:!1})],C.prototype,"effectEntities",2),u([v()],C.prototype,"_selected",2),u([v()],C.prototype,"_draft",2),u([v()],C.prototype,"_original",2),u([v()],C.prototype,"_saving",2),u([v()],C.prototype,"_error",2),u([v()],C.prototype,"_filter",2),u([v()],C.prototype,"_live",2),C=u([k("dmx-scenes-view")],C);var x=class extends y{constructor(){super(...arguments);this.narrow=!1;this._patch={nodes:[]};this._loaded=!1;this._dirty=!1;this._saving=!1;this._errors=[];this._toast="";this._updateAvailable=!1;this._selected="";this._selectedUniverse="";this._dialog={kind:"none"};this._entityMap={};this._mode=x._loadMode();this._groupPrefill=null;this._savedEffectNames=[];this._view=x._loadView();this._listAll=!1;this._beforeUnload=e=>{this._dirty&&e.preventDefault()}}static _loadMode(){try{let e=localStorage.getItem("dmx_lighting.mode");return e==="effects"||e==="groups"||e==="scenes"?e:"patch"}catch{return"patch"}}_onCreateGroup(e){this._groupPrefill={entities:e.detail.entities,token:Date.now()},this._setMode("groups")}_setMode(e){this._mode=e;try{localStorage.setItem("dmx_lighting.mode",e)}catch{}}_fixtureInfos(){return this._patch.nodes.flatMap(e=>Object.entries(e.universes??{}).flatMap(([t,r])=>(r.devices??[]).map(s=>({name:s.name,type:s.type,host:e.host,universe:t,channel:s.channel,entityId:X(this.hass,this._entityMap,e.host,t,s)??`light.${V(s.name)}`}))))}_fixtureNames(e=this._patch){return new Set(e.nodes.flatMap(t=>Object.values(t.universes??{}).flatMap(r=>(r.devices??[]).map(s=>s.name))))}willUpdate(e){e.has("hass")&&this._checkForUpdate();let t=e.get("_patch");if(!t||!this._patch.effects?.length)return;let r=this._fixtureNames(),s=[...this._fixtureNames(t)].filter(n=>!r.has(n));s.length&&(this._patch={...this._patch,effects:this._patch.effects.map(n=>({...n,fixtures:n.fixtures.filter(a=>!s.includes(a))}))})}_checkForUpdate(){let e=this.hass?.panels?.["dmx-patch"]?.config?._panel_custom?.module_url;if(e)try{let t=new URL(e,location.origin).searchParams.get("v"),r=new URL(import.meta.url).searchParams.get("v");this._updateAvailable=!!t&&!!r&&t!==r}catch{}}_onEffectsChanged(e){this._patch={...this._patch,effects:e.detail.effects},this._dirty=!0}static _loadView(){try{return localStorage.getItem("dmx_lighting.view")==="list"?"list":"grid"}catch{return"grid"}}_setView(e){this._view=e;try{localStorage.setItem("dmx_lighting.view",e)}catch{}}connectedCallback(){super.connectedCallback(),this._load(),window.addEventListener("beforeunload",this._beforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("beforeunload",this._beforeUnload)}async _load(){try{let e=await Tt(this.hass);this._patch=e.patch??{nodes:[]},this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._errors=e.errors??[],this._loaded=!0,this._autoSelect(),this._refreshEntityMap()}catch(e){this._showToast(`Failed to load patch: ${e}`)}}async _refreshEntityMap(){try{this._entityMap=(await Pt(this.hass)).entities??{}}catch{}}_autoSelect(){this._selected||this._patch.nodes.length&&this._selectNode("ui:0")}_selectNode(e){this._selected=e;let t=this._currentUniverses(),r=Object.keys(t??{}).sort((s,n)=>Number(s)-Number(n));this._selectedUniverse=r[0]??""}_currentNode(){let[e,t]=this._selected.split(":"),r=Number(t);if(e==="ui")return this._patch.nodes[r]}_currentUniverses(){return this._currentNode()?.universes}_markDirty(){this._dirty=!0,this._patch={...this._patch,nodes:[...this._patch.nodes]}}_updateSelectedNode(e){let[t,r]=this._selected.split(":");if(t!=="ui")return;let s=Number(r),n=[...this._patch.nodes];n[s]=e(n[s]),this._patch={...this._patch,nodes:n},this._dirty=!0}_updateUniverse(e,t){this._updateSelectedNode(r=>{let s=r.universes[e];return s?{...r,universes:{...r.universes,[e]:t(s)}}:r})}async _save(){this._saving=!0,this._errors=[];try{let e=await Mt(this.hass,this._patch);e.success?(this._savedEffectNames=(this._patch.effects??[]).map(t=>t.name),this._dirty=!1,this._showToast("Patch saved \u2014 changes applied live")):(this._errors=e.errors,this._showToast("Patch has errors; nothing was saved"))}catch(e){this._showToast(`Save failed: ${e}`)}finally{this._saving=!1}}_showToast(e){this._toast=e,clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast="",4e3)}async _openYamlDialog(){try{let e=await Ct(this.hass,this._patch);this._dialog={kind:"yaml",yamlText:e.yaml,errorText:""}}catch(e){this._showToast(`Export failed: ${e}`)}}async _onImportPatch(e){if(this._dialog.kind!=="yaml")return;let{content:t}=e.detail;try{let r=await Nt(this.hass,t);this._patch=r.patch,this._dirty=!0,this._errors=r.errors,this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._showToast(r.valid?"Loaded into editor \u2014 review and Save & Apply":"Loaded with validation errors \u2014 fix them before saving")}catch(r){let s=r?.message??String(r);this._dialog={kind:"yaml",yamlText:t,errorText:s}}}_addNode(){this._dialog={kind:"node",node:Wt(),isNew:!0}}_editNode(){let e=this._currentNode();e&&(this._dialog={kind:"node",node:e,isNew:!1})}_onSaveNode(e){let{node:t,original:r}=e.detail,s=this._patch.nodes,n=s.findIndex(a=>a.id===r.id);n>=0?s[n]=t:(s.push(t),this._selectNode(`ui:${s.length-1}`)),this._dialog={kind:"none"},this._markDirty()}_onDeleteNode(e){let{node:t}=e.detail;this._patch.nodes=this._patch.nodes.filter(r=>r.id!==t.id),this._dialog={kind:"none"},this._selected="",this._autoSelect(),this._markDirty()}_addUniverse(){this._dialog={kind:"universe",mode:"add",current:""}}_renumberUniverse(){this._selectedUniverse&&(this._dialog={kind:"universe",mode:"renumber",current:this._selectedUniverse})}_onSaveUniverse(e){let{nr:t}=e.detail;if(this._dialog.kind!=="universe")return;let r=this._dialog.mode,s=this._dialog.current;this._updateSelectedNode(n=>{let a={...n.universes};return r==="add"?a[t]={send_partial_universe:!0,output_correction:"linear",devices:[]}:(a[t]=a[s],delete a[s]),{...n,universes:a}}),this._selectedUniverse=t,this._dialog={kind:"none"}}_removeUniverse(){let e=this._currentNode();if(!e||!this._selectedUniverse)return;let t=e.universes[this._selectedUniverse]?.devices??[];if(t.length&&!confirm(`Delete universe ${this._selectedUniverse} and its ${t.length} fixture(s)?`))return;let r={...e.universes};delete r[this._selectedUniverse],this._updateSelectedNode(n=>({...n,universes:r}));let s=Object.keys(r).sort((n,a)=>Number(n)-Number(a));this._selectedUniverse=s[0]??""}_setUniverseOption(e,t){this._updateUniverse(this._selectedUniverse,r=>({...r,[e]:t}))}_onAddDevice(e){let t=this._selectedUniverse;if(!t){this._showToast("Add a universe first");return}let r=e.detail.channel??this._firstFreeChannel(t);this._dialog={kind:"device",device:jt(r),isNew:!0,universeNr:t}}_firstFreeChannel(e){let t=(this._currentUniverses()?.[e]?.devices??[]).map(s=>N(s)).sort((s,n)=>s[0]-n[0]),r=1;for(let[s,n]of t){if(r<s)break;r=Math.max(r,n+1)}return Math.min(r,512)}_onEditDevice(e){this._refreshEntityMap();let t=e.detail.universe??this._selectedUniverse;this._selectedUniverse=t,this._dialog={kind:"device",device:e.detail.device,isNew:!1,universeNr:t}}_onSaveDevice(e){let{device:t,original:r,count:s}=e.detail;if(this._dialog.kind!=="device")return;let n=this._dialog.universeNr;r.name&&t.name!==r.name&&this._patch.effects?.length&&(this._patch={...this._patch,effects:this._patch.effects.map(c=>({...c,fixtures:c.fixtures.map(p=>p===r.name?t.name:p)}))});let a=0;this._updateUniverse(n,c=>{let p=[...c.devices],d=p.findIndex(h=>h.id===r.id);if(d>=0)p[d]=t;else if(s>1){let h=t.channel;for(let f=1;f<=s;f++){let g={...t,id:pe(),name:`${t.name}_${f}`,channel:h},[_,$]=N(g);if($>512){a=s-f+1;break}p.push(g),h=$+1}}else p.push(t);return{...c,devices:p}}),a&&this._showToast(`Stopped after channel 512 \u2014 ${a} fixture(s) not added`),this._dialog={kind:"none"}}_onDeleteDevice(e){let{device:t}=e.detail;this._dialog.kind==="device"&&(this._updateUniverse(this._dialog.universeNr,r=>({...r,devices:r.devices.filter(s=>s.id!==t.id)})),this._dialog={kind:"none"})}_onMoveDevice(e){let{deviceId:t,channel:r}=e.detail;this._updateUniverse(this._selectedUniverse,s=>({...s,devices:s.devices.map(n=>n.id===t?{...n,channel:r}:n)}))}render(){if(!this._loaded)return l`<div class="loading">Loading DMX patch…</div>`;let e=this._currentNode(),t=this._currentUniverses()??{},r=Object.keys(t).sort((n,a)=>Number(n)-Number(a)),s=t[this._selectedUniverse];return l`
      <div class="header">
        <h1>DMX Patch</h1>
        <span class="mode-toggle" role="tablist" aria-label="Section">
          <button role="tab" aria-selected=${this._mode==="patch"}
            class=${this._mode==="patch"?"active":""} @click=${()=>this._setMode("patch")}>Patch</button>
          <button role="tab" aria-selected=${this._mode==="effects"}
            class=${this._mode==="effects"?"active":""} @click=${()=>this._setMode("effects")}>Effects</button>
          <button role="tab" aria-selected=${this._mode==="groups"}
            class=${this._mode==="groups"?"active":""} @click=${()=>this._setMode("groups")}>Groups</button>
          <button role="tab" aria-selected=${this._mode==="scenes"}
            class=${this._mode==="scenes"?"active":""} @click=${()=>this._setMode("scenes")}>Scenes</button>
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

      ${this._mode==="scenes"?l`<div class="layout effects-layout">
            <dmx-scenes-view
              .hass=${this.hass}
              .fixtures=${this._fixtureInfos()}
              .effectEntities=${this._savedEffectNames.map(n=>({entityId:ee(n),name:n}))}
              @panel-toast=${n=>this._showToast(n.detail)}
            ></dmx-scenes-view>
          </div>`:this._mode==="groups"?l`<div class="layout effects-layout">
            <dmx-groups-view
              .hass=${this.hass}
              .fixtures=${this._fixtureInfos().filter(n=>n.type!=="fixed")}
              .prefill=${this._groupPrefill}
              @panel-toast=${n=>this._showToast(n.detail)}
            ></dmx-groups-view>
          </div>`:this._mode==="effects"?l`<div class="layout effects-layout">
            <dmx-effects-view
              .hass=${this.hass}
              .effects=${this._patch.effects??[]}
              .fixtures=${this._fixtureInfos()}
              .errors=${this._errors}
              .savedNames=${this._savedEffectNames}
              @effects-changed=${this._onEffectsChanged}
              @open-groups=${()=>this._setMode("groups")}
            ></dmx-effects-view>
          </div>`:l`
      <div class="layout ${this.narrow?"narrow":""}">
        <nav class="rail">
          <div class="rail-section">Patch nodes</div>
          ${this._patch.nodes.map((n,a)=>l`
              <button
                class="rail-item ${this._selected===`ui:${a}`?"active":""}"
                @click=${()=>this._selectNode(`ui:${a}`)}
              >
                <span class="rail-title">${n.host||"(new node)"}</span>
                <span class="rail-sub">${n.node_type}</span>
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
                  ${this._view==="list"&&r.length>1?l`<button
                        class="tab ${this._listAll?"active":""}"
                        title="Show the fixtures of every universe"
                        @click=${()=>this._listAll=!0}
                      >
                        All
                      </button>`:m}
                  ${r.map(n=>l`
                      <button
                        class="tab ${this._selectedUniverse===n&&!(this._view==="list"&&this._listAll)?"active":""}"
                        @click=${()=>{this._selectedUniverse=n,this._listAll=!1}}
                      >
                        Universe ${n}
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
                        .universe=${this._listAll?"":this._selectedUniverse}
                        .entityMap=${this._entityMap}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @create-group=${this._onCreateGroup}
                      ></dmx-fixture-list>
                    `:s?l`
                      <div class="universe-options">
                        <label>
                          Output correction
                          <select
                            @change=${n=>this._setUniverseOption("output_correction",n.target.value)}
                          >
                            ${xe.map(n=>l`<option
                                  value=${n}
                                  ?selected=${(s.output_correction??"linear")===n}
                                >
                                  ${n}
                                </option>`)}
                          </select>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            .checked=${s.send_partial_universe??!0}
                            @change=${n=>this._setUniverseOption("send_partial_universe",n.target.checked)}
                          />
                          Send partial universe
                        </label>
                      </div>

                      <dmx-universe-grid
                        .hass=${this.hass}
                        .universe=${s}
                        .universeNr=${Number(this._selectedUniverse)}
                        .nodeKey=${St(e)}
                        @add-device=${this._onAddDevice}
                        @edit-device=${this._onEditDevice}
                        @move-device=${this._onMoveDevice}
                        @grid-error=${n=>this._showToast(n.detail)}
                      ></dmx-universe-grid>
                    `:l`<div class="empty">No universes. Add one to start placing fixtures.</div>`}
              `:l`<div class="empty">
                No nodes yet. Add a node to start patching, or load a patch with the YAML button.
              </div>`}

          ${this._errors.length?l`
                <div class="errors">
                  <strong>Validation errors</strong>
                  <ul>
                    ${this._errors.map(n=>l`<li><code>${n.path}</code>: ${n.message}</li>`)}
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
              .entityId=${this._dialog.isNew?"":X(this.hass,this._entityMap,this._currentNode()?.host??"",this._dialog.universeNr,this._dialog.device)??""}
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
              .minUniverse=${F(e?.node_type??"artnet-direct")}
              .existing=${r}
              @panel-dialog-closed=${()=>this._dialog={kind:"none"}}
              @save-universe=${this._onSaveUniverse}
            ></dmx-universe-dialog>
          `:m}
      ${this._toast?l`<div class="toast">${this._toast}</div>`:m}
    `}};x.styles=w`
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
  `,u([b({attribute:!1})],x.prototype,"hass",2),u([b({type:Boolean})],x.prototype,"narrow",2),u([v()],x.prototype,"_patch",2),u([v()],x.prototype,"_loaded",2),u([v()],x.prototype,"_dirty",2),u([v()],x.prototype,"_saving",2),u([v()],x.prototype,"_errors",2),u([v()],x.prototype,"_toast",2),u([v()],x.prototype,"_updateAvailable",2),u([v()],x.prototype,"_selected",2),u([v()],x.prototype,"_selectedUniverse",2),u([v()],x.prototype,"_dialog",2),u([v()],x.prototype,"_entityMap",2),u([v()],x.prototype,"_mode",2),u([v()],x.prototype,"_groupPrefill",2),u([v()],x.prototype,"_savedEffectNames",2),u([v()],x.prototype,"_view",2),u([v()],x.prototype,"_listAll",2),x=u([k("dmx-patch-panel")],x);export{x as DmxPatchPanel};
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
