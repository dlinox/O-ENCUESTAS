import{l as O,i as m,q as E,A as le,s as U,z as J,y as q,F as X,x as oe,p as ne,B as ie,K as L,E as D,o as C,c as j,a as I,g as Q,w as M,b as _,n as F,t as W,m as A,j as ue,h as re,M as se}from"./index-38edce0e.js";import{u as V,F as de,f as ve,h as pe,o as g,d as ce,l as z,K as fe,H as N,e as be,t as K,p as me,a as G,O as xe,b}from"./use-outside-click-15baa299.js";import{x as ge,a as h,b as ye,p as he,u as Oe}from"./use-text-value-36ba392e.js";import{f as Se,a as we}from"./hidden-7819c991.js";function Y(t={},i=null,n=[]){for(let[p,e]of Object.entries(t))ee(n,Z(i,p),e);return n}function Z(t,i){return t?t+"["+i+"]":i}function ee(t,i,n){if(Array.isArray(n))for(let[p,e]of n.entries())ee(t,Z(i,p.toString()),e);else n instanceof Date?t.push([i,n.toISOString()]):typeof n=="boolean"?t.push([i,n?"1":"0"]):typeof n=="string"?t.push([i,n]):typeof n=="number"?t.push([i,`${n}`]):n==null?t.push([i,""]):Y(n,i,t)}function Re(t,i,n){let p=O(n==null?void 0:n.value),e=m(()=>t.value!==void 0);return[m(()=>e.value?t.value:p.value),function(c){return e.value||(p.value=c),i==null?void 0:i(c)}]}function ke(t,i){return t===i}var Le=(t=>(t[t.Open=0]="Open",t[t.Closed=1]="Closed",t))(Le||{}),Te=(t=>(t[t.Single=0]="Single",t[t.Multi=1]="Multi",t))(Te||{}),Ve=(t=>(t[t.Pointer=0]="Pointer",t[t.Other=1]="Other",t))(Ve||{});function Pe(t){requestAnimationFrame(()=>requestAnimationFrame(t))}let te=Symbol("ListboxContext");function $(t){let i=ie(te,null);if(i===null){let n=new Error(`<${t} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,$),n}return i}let Ie=E({name:"Listbox",emits:{"update:modelValue":t=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],default:()=>ke},horizontal:{type:[Boolean],default:!1},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},multiple:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(t,{slots:i,attrs:n,emit:p}){let e=O(1),c=O(null),f=O(null),x=O(null),d=O([]),a=O(""),l=O(null),S=O(1);function w(o=u=>u){let u=l.value!==null?d.value[l.value]:null,r=xe(o(d.value.slice()),y=>g(y.dataRef.domRef)),v=u?r.indexOf(u):null;return v===-1&&(v=null),{options:r,activeOptionIndex:v}}let R=m(()=>t.multiple?1:0),[k,B]=Re(m(()=>t.modelValue===void 0?V(R.value,{[1]:[],[0]:void 0}):t.modelValue),o=>p("update:modelValue",o),m(()=>t.defaultValue)),T={listboxState:e,value:k,mode:R,compare(o,u){if(typeof t.by=="string"){let r=t.by;return(o==null?void 0:o[r])===(u==null?void 0:u[r])}return t.by(o,u)},orientation:m(()=>t.horizontal?"horizontal":"vertical"),labelRef:c,buttonRef:f,optionsRef:x,disabled:m(()=>t.disabled),options:d,searchQuery:a,activeOptionIndex:l,activationTrigger:S,closeListbox(){t.disabled||e.value!==1&&(e.value=1,l.value=null)},openListbox(){t.disabled||e.value!==0&&(e.value=0)},goToOption(o,u,r){if(t.disabled||e.value===1)return;let v=w(),y=ge(o===h.Specific?{focus:h.Specific,id:u}:{focus:o},{resolveItems:()=>v.options,resolveActiveIndex:()=>v.activeOptionIndex,resolveId:P=>P.id,resolveDisabled:P=>P.dataRef.disabled});a.value="",l.value=y,S.value=r??1,d.value=v.options},search(o){if(t.disabled||e.value===1)return;let u=a.value!==""?0:1;a.value+=o.toLowerCase();let r=(l.value!==null?d.value.slice(l.value+u).concat(d.value.slice(0,l.value+u)):d.value).find(y=>y.dataRef.textValue.startsWith(a.value)&&!y.dataRef.disabled),v=r?d.value.indexOf(r):-1;v===-1||v===l.value||(l.value=v,S.value=1)},clearSearch(){t.disabled||e.value!==1&&a.value!==""&&(a.value="")},registerOption(o,u){let r=w(v=>[...v,{id:o,dataRef:u}]);d.value=r.options,l.value=r.activeOptionIndex},unregisterOption(o){let u=w(r=>{let v=r.findIndex(y=>y.id===o);return v!==-1&&r.splice(v,1),r});d.value=u.options,l.value=u.activeOptionIndex,S.value=1},select(o){t.disabled||B(V(R.value,{[0]:()=>o,[1]:()=>{let u=L(T.value.value).slice(),r=L(o),v=u.findIndex(y=>T.compare(r,L(y)));return v===-1?u.push(r):u.splice(v,1),u}}))}};de([f,x],(o,u)=>{var r;T.closeListbox(),ve(u,pe.Loose)||(o.preventDefault(),(r=g(f))==null||r.focus())},m(()=>e.value===0)),le(te,T),ce(m(()=>V(e.value,{[0]:z.Open,[1]:z.Closed})));let s=m(()=>{var o;return(o=g(f))==null?void 0:o.closest("form")});return U(()=>{J([s],()=>{if(!s.value||t.defaultValue===void 0)return;function o(){T.select(t.defaultValue)}return s.value.addEventListener("reset",o),()=>{var u;(u=s.value)==null||u.removeEventListener("reset",o)}},{immediate:!0})}),()=>{let{name:o,modelValue:u,disabled:r,form:v,...y}=t,P={open:e.value===0,disabled:r,value:k.value};return q(X,[...o!=null&&k.value!=null?Y({[o]:k.value}).map(([H,ae])=>q(Se,fe({features:we.Hidden,key:H,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:v,name:H,value:ae}))):[],N({ourProps:{},theirProps:{...n,...be(y,["defaultValue","onUpdate:modelValue","horizontal","multiple","by"])},slot:P,slots:i,attrs:n,name:"Listbox"})])}}}),De=E({name:"ListboxButton",props:{as:{type:[Object,String],default:"button"},id:{type:String,default:()=>`headlessui-listbox-button-${K()}`}},setup(t,{attrs:i,slots:n,expose:p}){let e=$("ListboxButton");p({el:e.buttonRef,$el:e.buttonRef});function c(a){switch(a.key){case b.Space:case b.Enter:case b.ArrowDown:a.preventDefault(),e.openListbox(),D(()=>{var l;(l=g(e.optionsRef))==null||l.focus({preventScroll:!0}),e.value.value||e.goToOption(h.First)});break;case b.ArrowUp:a.preventDefault(),e.openListbox(),D(()=>{var l;(l=g(e.optionsRef))==null||l.focus({preventScroll:!0}),e.value.value||e.goToOption(h.Last)});break}}function f(a){switch(a.key){case b.Space:a.preventDefault();break}}function x(a){e.disabled.value||(e.listboxState.value===0?(e.closeListbox(),D(()=>{var l;return(l=g(e.buttonRef))==null?void 0:l.focus({preventScroll:!0})})):(a.preventDefault(),e.openListbox(),Pe(()=>{var l;return(l=g(e.optionsRef))==null?void 0:l.focus({preventScroll:!0})})))}let d=ye(m(()=>({as:t.as,type:i.type})),e.buttonRef);return()=>{var a,l;let S={open:e.listboxState.value===0,disabled:e.disabled.value,value:e.value.value},{id:w,...R}=t,k={ref:e.buttonRef,id:w,type:d.value,"aria-haspopup":"listbox","aria-controls":(a=g(e.optionsRef))==null?void 0:a.id,"aria-expanded":e.disabled.value?void 0:e.listboxState.value===0,"aria-labelledby":e.labelRef.value?[(l=g(e.labelRef))==null?void 0:l.id,w].join(" "):void 0,disabled:e.disabled.value===!0?!0:void 0,onKeydown:c,onKeyup:f,onClick:x};return N({ourProps:k,theirProps:R,slot:S,attrs:i,slots:n,name:"ListboxButton"})}}}),Be=E({name:"ListboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:()=>`headlessui-listbox-options-${K()}`}},setup(t,{attrs:i,slots:n,expose:p}){let e=$("ListboxOptions"),c=O(null);p({el:e.optionsRef,$el:e.optionsRef});function f(a){switch(c.value&&clearTimeout(c.value),a.key){case b.Space:if(e.searchQuery.value!=="")return a.preventDefault(),a.stopPropagation(),e.search(a.key);case b.Enter:if(a.preventDefault(),a.stopPropagation(),e.activeOptionIndex.value!==null){let l=e.options.value[e.activeOptionIndex.value];e.select(l.dataRef.value)}e.mode.value===0&&(e.closeListbox(),D(()=>{var l;return(l=g(e.buttonRef))==null?void 0:l.focus({preventScroll:!0})}));break;case V(e.orientation.value,{vertical:b.ArrowDown,horizontal:b.ArrowRight}):return a.preventDefault(),a.stopPropagation(),e.goToOption(h.Next);case V(e.orientation.value,{vertical:b.ArrowUp,horizontal:b.ArrowLeft}):return a.preventDefault(),a.stopPropagation(),e.goToOption(h.Previous);case b.Home:case b.PageUp:return a.preventDefault(),a.stopPropagation(),e.goToOption(h.First);case b.End:case b.PageDown:return a.preventDefault(),a.stopPropagation(),e.goToOption(h.Last);case b.Escape:a.preventDefault(),a.stopPropagation(),e.closeListbox(),D(()=>{var l;return(l=g(e.buttonRef))==null?void 0:l.focus({preventScroll:!0})});break;case b.Tab:a.preventDefault(),a.stopPropagation();break;default:a.key.length===1&&(e.search(a.key),c.value=setTimeout(()=>e.clearSearch(),350));break}}let x=me(),d=m(()=>x!==null?(x.value&z.Open)===z.Open:e.listboxState.value===0);return()=>{var a,l,S,w;let R={open:e.listboxState.value===0},{id:k,...B}=t,T={"aria-activedescendant":e.activeOptionIndex.value===null||(a=e.options.value[e.activeOptionIndex.value])==null?void 0:a.id,"aria-multiselectable":e.mode.value===1?!0:void 0,"aria-labelledby":(w=(l=g(e.labelRef))==null?void 0:l.id)!=null?w:(S=g(e.buttonRef))==null?void 0:S.id,"aria-orientation":e.orientation.value,id:k,onKeydown:f,role:"listbox",tabIndex:0,ref:e.optionsRef};return N({ourProps:T,theirProps:B,slot:R,attrs:i,slots:n,features:G.RenderStrategy|G.Static,visible:d.value,name:"ListboxOptions"})}}}),Ae=E({name:"ListboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1},id:{type:String,default:()=>`headlessui-listbox.option-${K()}`}},setup(t,{slots:i,attrs:n,expose:p}){let e=$("ListboxOption"),c=O(null);p({el:c,$el:c});let f=m(()=>e.activeOptionIndex.value!==null?e.options.value[e.activeOptionIndex.value].id===t.id:!1),x=m(()=>V(e.mode.value,{[0]:()=>e.compare(L(e.value.value),L(t.value)),[1]:()=>L(e.value.value).some(s=>e.compare(L(s),L(t.value)))})),d=m(()=>V(e.mode.value,{[1]:()=>{var s;let o=L(e.value.value);return((s=e.options.value.find(u=>o.some(r=>e.compare(L(r),L(u.dataRef.value)))))==null?void 0:s.id)===t.id},[0]:()=>x.value})),a=he(c),l=m(()=>({disabled:t.disabled,value:t.value,get textValue(){return a()},domRef:c}));U(()=>e.registerOption(t.id,l)),oe(()=>e.unregisterOption(t.id)),U(()=>{J([e.listboxState,x],()=>{e.listboxState.value===0&&x.value&&V(e.mode.value,{[1]:()=>{d.value&&e.goToOption(h.Specific,t.id)},[0]:()=>{e.goToOption(h.Specific,t.id)}})},{immediate:!0})}),ne(()=>{e.listboxState.value===0&&f.value&&e.activationTrigger.value!==0&&D(()=>{var s,o;return(o=(s=g(c))==null?void 0:s.scrollIntoView)==null?void 0:o.call(s,{block:"nearest"})})});function S(s){if(t.disabled)return s.preventDefault();e.select(t.value),e.mode.value===0&&(e.closeListbox(),D(()=>{var o;return(o=g(e.buttonRef))==null?void 0:o.focus({preventScroll:!0})}))}function w(){if(t.disabled)return e.goToOption(h.Nothing);e.goToOption(h.Specific,t.id)}let R=Oe();function k(s){R.update(s)}function B(s){R.wasMoved(s)&&(t.disabled||f.value||e.goToOption(h.Specific,t.id,0))}function T(s){R.wasMoved(s)&&(t.disabled||f.value&&e.goToOption(h.Nothing))}return()=>{let{disabled:s}=t,o={active:f.value,selected:x.value,disabled:s},{id:u,value:r,disabled:v,...y}=t,P={id:u,ref:c,role:"option",tabIndex:s===!0?void 0:-1,"aria-disabled":s===!0?!0:void 0,"aria-selected":x.value,disabled:void 0,onClick:S,onFocus:w,onPointerenter:k,onMouseenter:k,onPointermove:B,onMousemove:B,onPointerleave:T,onMouseleave:T};return N({ourProps:P,theirProps:y,slot:o,attrs:n,slots:i,name:"ListboxOption"})}}});function Ce(t,i){return C(),j("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[I("path",{"fill-rule":"evenodd",d:"M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z","clip-rule":"evenodd"})])}function Me(t,i){return C(),j("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},[I("path",{"fill-rule":"evenodd",d:"M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z","clip-rule":"evenodd"})])}const _e={class:"relative mt-1"},je={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"},ze=["onClick"],Ee={key:0,class:"absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"},Ke={__name:"HSelect",props:{options:{type:Array,default:[{id:1,title:"Opción 1"},{id:2,title:"Opción 2"}]},itemValue:{type:String,default:"id"},itemTitle:{type:String,default:"title"},modelValue:{type:[String,Number,Object],default:null}},emits:["update:modelValue"],setup(t,{emit:i}){var c;const n=t,p=m({get:()=>n.modelValue,set:f=>i("update:modelValue",f)}),e=O(p.value?(c=n.options.find(f=>f[`${n.itemValue}`]==p.value))==null?void 0:c[`${n.itemTitle}`]:"Seleccione un item");return(f,x)=>(C(),Q(A(Ie),{class:"w-full",modelValue:p.value,"onUpdate:modelValue":x[0]||(x[0]=d=>p.value=d)},{default:M(()=>[I("div",_e,[_(A(De),{class:"relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"},{default:M(()=>[I("span",{class:F(["block truncate text-start ms-2",p.value?"text-black":"text-gray-400"])},W(e.value),3),I("span",je,[_(A(Me),{class:"h-5 w-5 text-gray-400","aria-hidden":"true"})])]),_:1}),_(se,{"leave-active-class":"transition duration-100 ease-in","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:M(()=>[_(A(Be),{class:"absolute mt-1 max-h-60 w-full overflow-auto z-50 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"},{default:M(()=>[(C(!0),j(X,null,ue(t.options,d=>(C(),Q(A(Ae),{key:d,value:d[`${t.itemValue}`],as:"template"},{default:M(({active:a,selected:l})=>[I("li",{class:F([a?"bg-blue-100 text-blue-900":"text-gray-900","relative cursor-default select-none py-2 pl-10 pr-4"]),onClick:()=>e.value=d[`${t.itemTitle}`]},[I("span",{class:F([l?"font-medium text-blue-600":"font-normal","block truncate"])},W(d[`${t.itemTitle}`]),3),l?(C(),j("span",Ee,[_(A(Ce),{class:"h-5 w-5","aria-hidden":"true"})])):re("",!0)],10,ze)]),_:2},1032,["value"]))),128))]),_:1})]),_:1})])]),_:1},8,["modelValue"]))}};export{Ke as _,Ce as a,Re as d,Y as e,Me as r};