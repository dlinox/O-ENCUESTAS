import{o as c,c as s,a as e,t as n,F as r,O as t}from"./index-38edce0e.js";const u={__name:"structure",setup(o){const i=async()=>{t.defaults.headers["custom-header"]="valor-custom",await t.get("http://oti.test/custom-header")},a=[{id:"00f8bb07-09ee-11ee-9726-00505689a76b",title:"ficha integral del estudiante universitario",description:"",stage:"2023-II",topics:[{id:"1c2b2a8e-5059-4aee-a713-0ac1fa7beeaf",title:"información socioeconómica",description:"",sections:[{id:"e699c0fc-d251-4d48-bd1c-f3743ead11bb",title:"Seccion 1",description:"Descripcion de la seccion 1",questions:[{id:"1345c8e1-ac99-4216-81f0-5cbffc7025e5",statement:"Tipo de discapacidad:",helpQuestion:"",optionTrigger:"1",IsDependent:"1",IsInline:"default = false",IsRequiered:"default = true",type:"text string, date date, number int , select int, radio int  , checkbox [int, int ...]",optionOther:"si la pregunta acepta una respuesta personalizada (especificar, otro, ...)",rules:"required|number"}]}]},{id:"45e2f071-eeaf-4e37-abfa-61cf8151cdcb",title:"información general",description:""},{id:"68e175dd-a6d7-481d-8ba1-aae716918e77",title:"información para/del servicio médico",description:""},{id:"83390d6e-1f2e-4983-8f12-8c005457e8d4",title:"información para/de tutoría y servicio psicopedagógico",description:""}]}];return(d,p)=>(c(),s(r,null,[e("pre",null,"                "+n(a)+`
            `),e("button",{class:"p-4 bg-black text-white",onClick:i}," prueba ")],64))}};export{u as default};
