import{n as $,o as P,p as y,R as g,w as R,W as w,$ as E,a2 as A,a0 as L,aj as z,at as T,au as V}from"./index-XsIMaQZM.js";import{u as j}from"./Table-Uv2kxH-W.js";import{g as B}from"./get-auto-contrast-value-Da6zqqWm.js";const[M,x]=$("Progress.Root component was not found in tree");var u={root:"m_db6d6462",section:"m_2242eb65","stripes-animation":"m_81a374bd",label:"m_91e40b74"};const W={},h=P((r,t)=>{const{classNames:s,className:e,style:a,styles:l,vars:p,...o}=y("ProgressLabel",W,r),n=x();return g.createElement(R,{ref:t,...n.getStyles("label",{className:e,style:a,classNames:s,styles:l}),...o})});h.classes=u;h.displayName="@mantine/core/ProgressLabel";const k={},q=E((r,{size:t,radius:s,transitionDuration:e})=>({root:{"--progress-size":A(t,"progress-size"),"--progress-radius":s===void 0?void 0:L(s),"--progress-transition-duration":typeof e=="number"?`${e}ms`:void 0}})),b=P((r,t)=>{const s=y("ProgressRoot",k,r),{classNames:e,className:a,style:l,styles:p,unstyled:o,vars:n,autoContrast:c,transitionDuration:v,...i}=s,m=w({name:"Progress",classes:u,props:s,className:a,style:l,classNames:e,styles:p,unstyled:o,vars:n,varsResolver:q});return g.createElement(M,{value:{getStyles:m,autoContrast:c}},g.createElement(R,{ref:t,...m("root"),...i}))});b.classes=u;b.displayName="@mantine/core/ProgressRoot";const D={withAria:!0},N=P((r,t)=>{const{classNames:s,className:e,style:a,styles:l,vars:p,value:o,withAria:n,color:c,striped:v,animated:i,mod:m,...S}=y("ProgressSection",D,r),C=x(),f=z(),_=n?{role:"progressbar","aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":o,"aria-valuetext":`${o}%`}:{};return g.createElement(R,{ref:t,...C.getStyles("section",{className:e,classNames:s,styles:l,style:a}),...S,..._,mod:[{striped:v||i,animated:i},m],__vars:{"--progress-section-width":`${o}%`,"--progress-section-color":T(c,f),"--progress-label-color":B(C.autoContrast,f)?V({color:c,theme:f}):void 0}})});N.classes=u;N.displayName="@mantine/core/ProgressSection";const F={},d=P((r,t)=>{const s=y("Progress",F,r),{value:e,classNames:a,styles:l,vars:p,color:o,striped:n,animated:c,"aria-label":v,...i}=s,{resolvedClassNames:m,resolvedStyles:S}=j({classNames:a,styles:l,props:s});return g.createElement(b,{ref:t,classNames:m,styles:S,vars:p,...i},g.createElement(N,{value:e,color:o,striped:n,animated:c,"aria-label":v}))});d.classes=u;d.displayName="@mantine/core/Progress";d.Section=N;d.Root=b;d.Label=h;export{d as P};