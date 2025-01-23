import{Q as S,R as B,o as f,c as b,aj as N,ag as E,a4 as y,ac as C,W as _,a5 as z,aE as x,as as O,ay as P,ad as V,aC as $,aD as j}from"./index-CRKnr2MZ.js";import{r as A,u as d}from"./xlsx-DFPg4xC4.js";const W={__name:"index",props:{size:{type:Number,default:5}},emits:["uploadSuccess"],setup(D,{emit:o}){const g=o,p=D,s=S({loading:!1,refInput:null}),{loading:n,refInput:k}=B(s),h=e=>{const a=[],t=d.decode_range(e["!ref"]);let r;const i=t.s.r;for(r=t.s.c;r<=t.e.c;++r){const c=e[d.encode_cell({c:r,r:i})];let u="UNKNOWN "+r;c&&c.t&&(u=d.format_cell(c)),a.push(u)}return a},m=e=>{s.loading=!0;const a=new FileReader;a.onload=t=>{const r=t.target.result,i=A(r,{type:"array"}),c=i.SheetNames[0],u=i.Sheets[c],U=h(u),F=d.sheet_to_json(u);g("uploadSuccess",{header:U,results:F}),s.loading=!1},a.readAsArrayBuffer(e)},l=e=>e.size/1024/1024<p.size?!0:(x.warning(`Please do not upload files larger than ${p.size}m in size.`),!1),v=e=>{s.refInput.value=null,l(e)&&m(e)},I=e=>{const t=e.target.files[0];t&&v(t)},R=e=>/\.(xlsx|xls|csv)$/.test(e.name),T=e=>{if(e.stopPropagation(),e.preventDefault(),s.loading)return;const a=e.dataTransfer.files;if(a.length!==1)return x.error("Only support uploading one file!");const t=a[0];if(!R(t))return x.error("Only supports upload .xlsx, .xls, .csv suffix files");v(t)},w=e=>{e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"},H=()=>{s.refInput.click()};return(e,a)=>{const t=O;return f(),b(z,null,[N("input",{ref_key:"refInput",ref:k,class:"excel-upload-input",type:"file",accept:".xlsx, .xls",onChange:I},null,544),N("div",{class:"drop",onDrop:T,onDragover:w,onDragenter:w},[E(" Drop excel file here or "),y(t,{loading:_(n),style:{"margin-left":"16px"},type:"primary",onClick:H},{default:C(()=>[E(" Browse ")]),_:1},8,["loading"])],32)],64)}}},K={class:"upload-excel-container"},Q={__name:"upload-excel",setup(D){const o=S({tableData:[],tableHeader:[]}),{tableData:g,tableHeader:p}=B(o),s=n=>{o.tableData=n.results,o.tableHeader=n.header};return(n,k)=>{const h=$,m=j;return f(),b("div",K,[y(_(W),{onUploadSuccess:s}),y(m,{data:_(g),border:"","highlight-current-row":"",style:{width:"100%","margin-top":"20px"}},{default:C(()=>[(f(!0),b(z,null,P(_(p),l=>(f(),V(h,{key:l,prop:l,label:l},null,8,["prop","label"]))),128))]),_:1},8,["data"])])}}};export{Q as default};
