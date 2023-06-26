import{N as I,y as k,F as D,B as M,A as C,E as H,p as N,l as U,i as R}from"./index-38edce0e.js";function b(e,t,...n){if(e in t){let o=t[e];return typeof o=="function"?o(...n):o}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(o=>`"${o}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,b),r}var _=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(_||{}),K=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(K||{});function ce({visible:e=!0,features:t=0,ourProps:n,theirProps:r,...o}){var l;let u=A(r,n),i=Object.assign(o,{props:u});if(e||t&2&&u.static)return w(i);if(t&1){let m=(l=u.unmount)==null||l?0:1;return b(m,{[0](){return null},[1](){return w({...o,props:{...u,hidden:!0,style:{display:"none"}}})}})}return w(i)}function w({props:e,attrs:t,slots:n,slot:r,name:o}){var l,u;let{as:i,...m}=W(e,["unmount","static"]),a=(l=n.default)==null?void 0:l.call(n,r),s={};if(r){let p=!1,v=[];for(let[f,c]of Object.entries(r))typeof c=="boolean"&&(p=!0),c===!0&&v.push(f);p&&(s["data-headlessui-state"]=v.join(" "))}if(i==="template"){if(a=S(a??[]),Object.keys(m).length>0||Object.keys(t).length>0){let[p,...v]=a??[];if(!G(p)||v.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${o} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(m).concat(Object.keys(t)).map(d=>d.trim()).filter((d,h,T)=>T.indexOf(d)===h).sort((d,h)=>d.localeCompare(h)).map(d=>`  - ${d}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(d=>`  - ${d}`).join(`
`)].join(`
`));let f=A((u=p.props)!=null?u:{},m),c=I(p,f);for(let d in f)d.startsWith("on")&&(c.props||(c.props={}),c.props[d]=f[d]);return c}return Array.isArray(a)&&a.length===1?a[0]:a}return k(i,Object.assign({},m,s),{default:()=>a})}function S(e){return e.flatMap(t=>t.type===D?S(t.children):[t])}function A(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let o in r)o.startsWith("on")&&typeof r[o]=="function"?(n[o]!=null||(n[o]=[]),n[o].push(r[o])):t[o]=r[o];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(r=>[r,void 0])));for(let r in n)Object.assign(t,{[r](o,...l){let u=n[r];for(let i of u){if(o instanceof Event&&o.defaultPrevented)return;i(o,...l)}}});return t}function de(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function W(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}function G(e){return e==null?!1:typeof e.type=="string"||typeof e.type=="object"||typeof e.type=="function"}let V=0;function B(){return++V}function fe(){return B()}var X=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(X||{});function j(e){var t;return e==null||e.value==null?null:(t=e.value.$el)!=null?t:e.value}let P=Symbol("Context");var q=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(q||{});function pe(){return Y()!==null}function Y(){return M(P,null)}function me(e){C(P,e)}var z=Object.defineProperty,J=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,g=(e,t,n)=>(J(e,typeof t!="symbol"?t+"":t,n),n);class Q{constructor(){g(this,"current",this.detect()),g(this,"currentId",0)}set(t){this.current!==t&&(this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}}let E=new Q;function $(e){if(E.isServer)return null;if(e instanceof Node)return e.ownerDocument;if(e!=null&&e.hasOwnProperty("value")){let t=j(e);if(t)return t.ownerDocument}return document}let y=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var Z=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(Z||{}),ee=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(ee||{}),te=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(te||{});function x(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(y)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}var F=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(F||{});function L(e,t=0){var n;return e===((n=$(e))==null?void 0:n.body)?!1:b(t,{[0](){return e.matches(y)},[1](){let r=e;for(;r!==null;){if(r.matches(y))return!0;r=r.parentElement}return!1}})}function ve(e){let t=$(e);H(()=>{t&&!L(t.activeElement,0)&&re(e)})}var ne=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(ne||{});typeof window<"u"&&typeof document<"u"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0));function re(e){e==null||e.focus({preventScroll:!0})}let oe=["textarea","input"].join(",");function le(e){var t,n;return(n=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,oe))!=null?n:!1}function ie(e,t=n=>n){return e.slice().sort((n,r)=>{let o=t(n),l=t(r);if(o===null||l===null)return 0;let u=o.compareDocumentPosition(l);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function he(e,t){return ue(x(),t,{relativeTo:e})}function ue(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:o=[]}={}){var l;let u=(l=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?l:document,i=Array.isArray(e)?n?ie(e):e:x(e);o.length>0&&i.length>1&&(i=i.filter(c=>!o.includes(c))),r=r??u.activeElement;let m=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),a=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,i.indexOf(r))-1;if(t&4)return Math.max(0,i.indexOf(r))+1;if(t&8)return i.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=t&32?{preventScroll:!0}:{},p=0,v=i.length,f;do{if(p>=v||p+v<=0)return 0;let c=a+p;if(t&16)c=(c+v)%v;else{if(c<0)return 3;if(c>=v)return 1}f=i[c],f==null||f.focus(s),p+=m}while(f!==u.activeElement);return t&6&&le(f)&&f.select(),2}function O(e,t,n){E.isServer||N(r=>{document.addEventListener(e,t,n),r(()=>document.removeEventListener(e,t,n))})}function ae(e,t,n){E.isServer||N(r=>{window.addEventListener(e,t,n),r(()=>window.removeEventListener(e,t,n))})}function we(e,t,n=R(()=>!0)){function r(l,u){if(!n.value||l.defaultPrevented)return;let i=u(l);if(i===null||!i.getRootNode().contains(i))return;let m=function a(s){return typeof s=="function"?a(s()):Array.isArray(s)||s instanceof Set?s:[s]}(e);for(let a of m){if(a===null)continue;let s=a instanceof HTMLElement?a:j(a);if(s!=null&&s.contains(i)||l.composed&&l.composedPath().includes(s))return}return!L(i,F.Loose)&&i.tabIndex!==-1&&l.preventDefault(),t(l,i)}let o=U(null);O("mousedown",l=>{var u,i;n.value&&(o.value=((i=(u=l.composedPath)==null?void 0:u.call(l))==null?void 0:i[0])||l.target)},!0),O("click",l=>{o.value&&(r(l,()=>o.value),o.value=null)},!0),ae("blur",l=>r(l,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}export{pe as C,we as F,ce as H,de as K,Z as N,ie as O,ue as P,re as S,ee as T,ve as _,_ as a,X as b,E as c,me as d,W as e,L as f,K as g,F as h,q as l,$ as m,j as o,Y as p,fe as t,b as u,he as v,ae as w};