import{K as A,L as v,M as b,E as D,N as H,t as N,n as C,O as F,P as M,p as _,H as P,a as m,s as w,c as T,d as E,g as R}from"./C3xHPWlp.js";const q=new Set,B=new Set;function K(a){for(var r=0;r<a.length;r++)q.add(a[r]);for(var n of B)n(a)}function L(a){var y;var r=this,n=r.ownerDocument,i=a.type,o=((y=a.composedPath)==null?void 0:y.call(a))||[],e=o[0]||a.target,u=0,h=a.__root;if(h){var d=o.indexOf(h);if(d!==-1&&(r===document||r===window)){a.__root=r;return}var p=o.indexOf(r);if(p===-1)return;d<=p&&(u=d)}if(e=o[u]||a.target,e!==r){A(a,"currentTarget",{configurable:!0,get(){return e||n}});var O=H,S=N;v(null),b(null);try{for(var s,g=[];e!==null;){var c=e.assignedSlot||e.parentNode||e.host||null;try{var l=e["__"+i];if(l!==void 0&&(!e.disabled||a.target===e))if(D(l)){var[k,...x]=l;k.apply(e,[a,...x])}else l.call(e,a)}catch(f){s?g.push(f):s=f}if(a.cancelBubble||c===r||c===null)break;e=c}if(s){for(let f of g)queueMicrotask(()=>{throw f});throw s}}finally{a.__root=r,delete a.currentTarget,v(O),b(S)}}}let t;function Y(){t=void 0}function j(a){let r=null,n=_;var i;if(_){for(r=E,t===void 0&&(t=R(document.head));t!==null&&(t.nodeType!==8||t.data!==P);)t=m(t);t===null?w(!1):t=T(m(t))}_||(i=document.head.appendChild(C()));try{F(()=>a(i),M)}finally{n&&(w(!0),t=E,T(r))}}export{q as a,Y as b,j as c,K as d,L as h,B as r};
