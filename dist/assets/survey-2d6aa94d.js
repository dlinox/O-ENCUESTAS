import{i as _,o,c as d,a as t,t as f,k as C,G,n as q,j as w,H as j,F as h,b as y,l as D,h as S,u as F,I as O,g as V,w as $,_ as T,d as k,S as B}from"./index-4eec3473.js";import{_ as I}from"./ButtonPrimary-016e0b7f.js";import{_ as R}from"./IndexSurvey-194f2527.js";const A={class:"grid grid-cols-1"},E=["for"],L={class:"relative mt-1 rounded-md"},M=["id"],Q={__name:"ShortAnswer",props:{modelValue:[String,Number],question:Object},emits:["update:modelValue"],setup(s,{emit:m}){const l=s,n=_({get:()=>l.modelValue,set:r=>m("update:modelValue",r)});return(r,i)=>(o(),d("div",A,[t("label",{for:"id-"+s.question.id,class:"text-sm font-medium leading-6 text-gray-900"},f(s.question.statement),9,E),t("div",L,[C(t("input",{"onUpdate:modelValue":i[0]||(i[0]=u=>n.value=u),type:"text",id:"id-"+s.question.id,class:q(["block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",s.question.error!=null?"ring-red-600 focus:ring-red-600 ":""])},null,10,M),[[G,n.value]])])]))}},z=["id","value","name"],H=["for"],J={__name:"RadioGroupForm",props:{questionId:String,options:Array,modelValue:{type:[String,Number],default:null}},emits:["update:modelValue"],setup(s,{emit:m}){const l=s,n=_({get:()=>l.modelValue,set:r=>m("update:modelValue",r)});return(r,i)=>(o(!0),d(h,null,w(s.options,(u,a)=>(o(),d("div",{key:u.title,class:"flex items-center my-2"},[C(t("input",{id:`radio-${a}${s.questionId}`,type:"radio",value:u.id,"onUpdate:modelValue":i[0]||(i[0]=c=>n.value=c),name:`name-${a}${s.questionId}`,class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"},null,8,z),[[j,n.value]]),t("label",{for:`radio-${a}${s.questionId}`,class:"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"},f(u.title),9,H)]))),128))}},K={class:"grid grid-cols-4"},P={__name:"OneSelection",props:{modelValue:[String,Number],label:String,type:{default:"text",type:String},placeholder:String,question:Object},emits:["update:modelValue"],setup(s,{emit:m}){const l=s,n=_({get:()=>l.modelValue,set:r=>m("update:modelValue",r)});return(r,i)=>{var u,a;return o(),d("div",K,[t("label",{for:"price",class:q(["text-sm font-medium leading-6 text-gray-900",(u=s.question.structure)==null?void 0:u.labelGrid])},f(s.question.statement),3),t("div",{class:q(["relative mt-1 rounded-md",(a=s.question.structure)==null?void 0:a.inputGrid])},[y(J,{questionId:s.question.id,options:s.question.options,modelValue:n.value,"onUpdate:modelValue":i[0]||(i[0]=c=>n.value=c)},null,8,["questionId","options","modelValue"])],2)])}}},W={class:"grid grid-cols-2 mt-4 bg-white mx-auto justify-center"},X={class:"col-span-2 rounded-lg p-4"},Y={key:0},Z={class:"w-full text-end"},ee={class:"text-xs text-red-600"},te={key:1},se={class:"w-full text-end"},le={class:"text-xs text-red-600"},ae={class:"flex justify-end mt-4"},ne={__name:"Form",props:{questions:Array},setup(s){const m=s,l=_(()=>m.questions),n=D(!0),r=(a,c)=>{let e=!0;e=i(a,c),n.value=e},i=(a,c)=>{var e=null;return l.value.map(g=>{g.id==c.id&&(a===null||a===""?(g.error="Obligatorio",e=!1):(delete g.error,e=!0))}),e},u=()=>{n.value=!0,l.value.forEach(a=>{a.answer?delete a.error:(a.error="Obligatorio",n.value=!1)}),n.value&&console.log("Guardando ...")};return(a,c)=>(o(),d("div",W,[t("div",X,[(o(!0),d(h,null,w(l.value,e=>{var g;return o(),d("div",null,[t("ul",null,[e.dependent===0?(o(),d(h,{key:0},[e.options===null||((g=e.options)==null?void 0:g.length)===0?(o(),d("li",Y,[t("div",null,[y(Q,{question:e,modelValue:e.answer,"onUpdate:modelValue":[p=>e.answer=p,p=>r(e.answer,e)]},null,8,["question","modelValue","onUpdate:modelValue"]),t("div",Z,[t("span",ee,f(e.error),1)])])])):e.options.length>0?(o(),d("li",te,[t("div",null,[y(P,{question:e,modelValue:e.answer,"onUpdate:modelValue":[p=>e.answer=p,p=>r(e.answer,e)]},null,8,["question","modelValue","onUpdate:modelValue"]),t("div",se,[t("span",le,f(e.error),1)])])])):S("",!0)],64)):S("",!0)])])}),256)),t("div",ae,[y(I,{title:"Guardar sección",isDisabled:!n.value,onClick:u},null,8,["isDisabled"])])])]))}},oe={class:"grid grid-cols-4 gap-4"},re=t("div",{class:"col-span-4 rounded-lg bg-blue-100 p-4 text-blue-700 mb-1 text-sm"}," ¡Lea y responda! detenidamente todas las preguntas planteadas. Estudiante que no declare correctamente tendrá la sanción respectiva. ",-1),ie={class:"col-span-1"},ue={class:"col-span-3 rounded-lg bg-white p-4 shadow-lg"},de={class:""},ce={class:"text-lg font-semibold mb-3 uppercase"},me={key:0,class:"text-center text-lg uppercase font-extrabold text-gray-400 align-items-center"},_e={__name:"survey",setup(s){const m=new B,l=F(),n=O(),r=_(()=>l.sections),i=_(()=>[...l.questions]),u=_(()=>l.currentSurvey),a=_(()=>l.currentTopic),c=g=>{l.topics.map(p=>{p.id===l.currentTopic.id&&p.sections.map(async v=>{if(v.id==g)if(v.questions)l.questions=v.questions;else{let b=await m.getQuestions(v.id);b.sort((N,U)=>N.ordinal-U.ordinal),v.questions=b,l.questions=b}})})};return(()=>{l.setCurrentSurvey(n.params.id)})(),(g,p)=>(o(),V(T,null,{"header.title":$(()=>[k(f(u.value.title),1)]),"header.subtitle":$(()=>[k(f(u.value.subtitle),1)]),default:$(()=>{var v;return[t("div",oe,[re,t("div",ie,[y(R)]),t("div",ue,[t("div",de,[t("h3",ce,f(a.value.title),1)]),r.value.length==0?(o(),d("h4",me," no hay secciones ")):(o(),d(h,{key:1},[(o(!0),d(h,null,w(r.value,x=>(o(),V(I,{key:x.id,title:x.title,onClick:b=>c(x.id),class:"me-3"},null,8,["title","onClick"]))),128)),((v=i.value)==null?void 0:v.length)>0?(o(),V(ne,{key:0,questions:i.value},null,8,["questions"])):S("",!0)],64))])])]}),_:1}))}};export{_e as default};