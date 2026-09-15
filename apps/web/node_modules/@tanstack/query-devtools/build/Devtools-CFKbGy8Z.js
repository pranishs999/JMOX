import{$ as e,A as t,B as n,C as r,D as i,E as a,F as o,G as s,H as c,I as l,J as u,L as d,M as f,N as p,O as m,P as h,Q as g,R as _,S as v,T as y,U as b,V as x,W as S,X as C,Y as w,Z as T,_ as E,b as D,c as O,et as k,f as A,g as j,h as M,i as N,j as ee,k as te,l as ne,m as P,n as re,o as ie,p as ae,r as oe,s as se,t as F,tt as ce,u as le,v as ue,x as de,y as I,z as L}from"./utils-BPMMmTje.js";const fe=e=>e!=null,pe=e=>e.filter(fe);function me(e){return(...t)=>{for(let n of e)n&&n(...t)}}const R=e=>typeof e==`function`&&!e.length?e():e,he=e=>Array.isArray(e)?e:e?[e]:[];function ge(e,...t){return typeof e==`function`?e(...t):e}const _e=C;function ve(e,t,n,r){let i=e.length,a=t.length,o=0;if(!a){for(;o<i;o++)n(e[o]);return}if(!i){for(;o<a;o++)r(t[o]);return}for(;o<a&&t[o]===e[o];o++);let s,c;t=t.slice(o),e=e.slice(o);for(s of t)e.includes(s)||r(s);for(c of e)t.includes(c)||n(c)}function ye(e){let[t,n]=S(),r=e?.throw?(e,t)=>{throw n(e instanceof Error?e:Error(t)),e}:(e,t)=>{n(e instanceof Error?e:Error(t))},i=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),a=e?.prefix?`${e.prefix}.`:``,o=new Map,s=new Proxy({},{get(t,n){let s=o.get(n);s||(s=S(void 0,{equals:!1}),o.set(n,s)),s[0]();let c=i.reduce((e,t)=>{if(e!==null||!t)return e;try{return t.getItem(`${a}${n}`)}catch(e){return r(e,`Error reading ${a}${n} from ${t.name}`),null}},null);return c!==null&&e?.deserializer?e.deserializer(c,n,e.options):c}});return e?.sync!==!1&&T(()=>{let e=e=>{let t=!1;i.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(t){r(t,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&o.get(e.key)?.[1]()};`addEventListener`in globalThis?(globalThis.addEventListener(`storage`,e),C(()=>globalThis.removeEventListener(`storage`,e))):(i.forEach(t=>t.addEventListener?.(`storage`,e)),C(()=>i.forEach(t=>t.removeEventListener?.(`storage`,e))))}),[s,(t,n,s)=>{let c=e?.serializer?e.serializer(n,t,s??e.options):n,l=`${a}${t}`;i.forEach(e=>{try{e.getItem(l)!==c&&e.setItem(l,c)}catch(n){r(n,`Error setting ${a}${t} to ${c} in ${e.name}`)}});let u=o.get(t);u&&u[1]()},{clear:()=>i.forEach(e=>{try{e.clear()}catch(t){r(t,`Error clearing ${e.name}`)}}),error:t,remove:e=>i.forEach(t=>{try{t.removeItem(`${a}${e}`)}catch(n){r(n,`Error removing ${a}${e} from ${t.name}`)}}),toJSON:()=>{let t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){let i=r&&e?.deserializer?e.deserializer(r,n,e.options):r;i&&(t[n]=i)}};return i.forEach(e=>{if(typeof e.getAll==`function`){let t;try{t=e.getAll()}catch(t){r(t,`Error getting all values from in ${e.name}`)}for(let e of t)n(e,t[e])}else{let i=0,a;try{for(;a=e.key(i++);)t.hasOwnProperty(a)||n(a,e.getItem(a))}catch(t){r(t,`Error getting all values from ${e.name}`)}}}),t}}]}var be=ye,xe=e=>(typeof e.clear==`function`||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),Se=e=>{if(!e)return``;let t=``;for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r==`boolean`?`; ${n}`:`; ${n}=${r}`}return t},Ce=xe({_cookies:[globalThis.document,`cookie`],getItem:e=>Ce._cookies[0][Ce._cookies[1]].match(`(^|;)\\s*`+e+`\\s*=\\s*([^;]+)`)?.pop()??null,setItem:(e,t,n)=>{let r=Ce.getItem(e);Ce._cookies[0][Ce._cookies[1]]=`${e}=${t}${Se(n)}`;let i=Object.assign(new Event(`storage`),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:Ce});window.dispatchEvent(i)},removeItem:e=>{Ce._cookies[0][Ce._cookies[1]]=`${e}=deleted${Se({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return Ce._cookies[0][Ce._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,i)=>(!t&&i&&n++===e&&(t=i),``)),t},get length(){let e=0;return Ce._cookies[0][Ce._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=+!!t,``)),e}});
/**
* match-sorter-utils
*
* Copyright (c) TanStack
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
const we={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,Ấ:`A`,Ắ:`A`,Ẳ:`A`,Ẵ:`A`,Ặ:`A`,Æ:`AE`,Ầ:`A`,Ằ:`A`,Ȃ:`A`,Ç:`C`,Ḉ:`C`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,Ế:`E`,Ḗ:`E`,Ề:`E`,Ḕ:`E`,Ḝ:`E`,Ȇ:`E`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,Ḯ:`I`,Ȋ:`I`,Ð:`D`,Ñ:`N`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,Ố:`O`,Ṍ:`O`,Ṓ:`O`,Ȏ:`O`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,Ý:`Y`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,ấ:`a`,ắ:`a`,ẳ:`a`,ẵ:`a`,ặ:`a`,æ:`ae`,ầ:`a`,ằ:`a`,ȃ:`a`,ç:`c`,ḉ:`c`,è:`e`,é:`e`,ê:`e`,ë:`e`,ế:`e`,ḗ:`e`,ề:`e`,ḕ:`e`,ḝ:`e`,ȇ:`e`,ì:`i`,í:`i`,î:`i`,ï:`i`,ḯ:`i`,ȋ:`i`,ð:`d`,ñ:`n`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,ố:`o`,ṍ:`o`,ṓ:`o`,ȏ:`o`,ù:`u`,ú:`u`,û:`u`,ü:`u`,ý:`y`,ÿ:`y`,Ā:`A`,ā:`a`,Ă:`A`,ă:`a`,Ą:`A`,ą:`a`,Ć:`C`,ć:`c`,Ĉ:`C`,ĉ:`c`,Ċ:`C`,ċ:`c`,Č:`C`,č:`c`,C̆:`C`,c̆:`c`,Ď:`D`,ď:`d`,Đ:`D`,đ:`d`,Ē:`E`,ē:`e`,Ĕ:`E`,ĕ:`e`,Ė:`E`,ė:`e`,Ę:`E`,ę:`e`,Ě:`E`,ě:`e`,Ĝ:`G`,Ǵ:`G`,ĝ:`g`,ǵ:`g`,Ğ:`G`,ğ:`g`,Ġ:`G`,ġ:`g`,Ģ:`G`,ģ:`g`,Ĥ:`H`,ĥ:`h`,Ħ:`H`,ħ:`h`,Ḫ:`H`,ḫ:`h`,Ĩ:`I`,ĩ:`i`,Ī:`I`,ī:`i`,Ĭ:`I`,ĭ:`i`,Į:`I`,į:`i`,İ:`I`,ı:`i`,Ĳ:`IJ`,ĳ:`ij`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,Ḱ:`K`,ḱ:`k`,K̆:`K`,k̆:`k`,Ĺ:`L`,ĺ:`l`,Ļ:`L`,ļ:`l`,Ľ:`L`,ľ:`l`,Ŀ:`L`,ŀ:`l`,Ł:`l`,ł:`l`,Ḿ:`M`,ḿ:`m`,M̆:`M`,m̆:`m`,Ń:`N`,ń:`n`,Ņ:`N`,ņ:`n`,Ň:`N`,ň:`n`,ŉ:`n`,N̆:`N`,n̆:`n`,Ō:`O`,ō:`o`,Ŏ:`O`,ŏ:`o`,Ő:`O`,ő:`o`,Œ:`OE`,œ:`oe`,P̆:`P`,p̆:`p`,Ŕ:`R`,ŕ:`r`,Ŗ:`R`,ŗ:`r`,Ř:`R`,ř:`r`,R̆:`R`,r̆:`r`,Ȓ:`R`,ȓ:`r`,Ś:`S`,ś:`s`,Ŝ:`S`,ŝ:`s`,Ş:`S`,Ș:`S`,ș:`s`,ş:`s`,Š:`S`,š:`s`,Ţ:`T`,ţ:`t`,ț:`t`,Ț:`T`,Ť:`T`,ť:`t`,Ŧ:`T`,ŧ:`t`,T̆:`T`,t̆:`t`,Ũ:`U`,ũ:`u`,Ū:`U`,ū:`u`,Ŭ:`U`,ŭ:`u`,Ů:`U`,ů:`u`,Ű:`U`,ű:`u`,Ų:`U`,ų:`u`,Ȗ:`U`,ȗ:`u`,V̆:`V`,v̆:`v`,Ŵ:`W`,ŵ:`w`,Ẃ:`W`,ẃ:`w`,X̆:`X`,x̆:`x`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Y̆:`Y`,y̆:`y`,Ź:`Z`,ź:`z`,Ż:`Z`,ż:`z`,Ž:`Z`,ž:`z`,ſ:`s`,ƒ:`f`,Ơ:`O`,ơ:`o`,Ư:`U`,ư:`u`,Ǎ:`A`,ǎ:`a`,Ǐ:`I`,ǐ:`i`,Ǒ:`O`,ǒ:`o`,Ǔ:`U`,ǔ:`u`,Ǖ:`U`,ǖ:`u`,Ǘ:`U`,ǘ:`u`,Ǚ:`U`,ǚ:`u`,Ǜ:`U`,ǜ:`u`,Ứ:`U`,ứ:`u`,Ṹ:`U`,ṹ:`u`,Ǻ:`A`,ǻ:`a`,Ǽ:`AE`,ǽ:`ae`,Ǿ:`O`,ǿ:`o`,Þ:`TH`,þ:`th`,Ṕ:`P`,ṕ:`p`,Ṥ:`S`,ṥ:`s`,X́:`X`,x́:`x`,Ѓ:`Г`,ѓ:`г`,Ќ:`К`,ќ:`к`,A̋:`A`,a̋:`a`,E̋:`E`,e̋:`e`,I̋:`I`,i̋:`i`,Ǹ:`N`,ǹ:`n`,Ồ:`O`,ồ:`o`,Ṑ:`O`,ṑ:`o`,Ừ:`U`,ừ:`u`,Ẁ:`W`,ẁ:`w`,Ỳ:`Y`,ỳ:`y`,Ȁ:`A`,ȁ:`a`,Ȅ:`E`,ȅ:`e`,Ȉ:`I`,ȉ:`i`,Ȍ:`O`,ȍ:`o`,Ȑ:`R`,ȑ:`r`,Ȕ:`U`,ȕ:`u`,B̌:`B`,b̌:`b`,Č̣:`C`,č̣:`c`,Ê̌:`E`,ê̌:`e`,F̌:`F`,f̌:`f`,Ǧ:`G`,ǧ:`g`,Ȟ:`H`,ȟ:`h`,J̌:`J`,ǰ:`j`,Ǩ:`K`,ǩ:`k`,M̌:`M`,m̌:`m`,P̌:`P`,p̌:`p`,Q̌:`Q`,q̌:`q`,Ř̩:`R`,ř̩:`r`,Ṧ:`S`,ṧ:`s`,V̌:`V`,v̌:`v`,W̌:`W`,w̌:`w`,X̌:`X`,x̌:`x`,Y̌:`Y`,y̌:`y`,A̧:`A`,a̧:`a`,B̧:`B`,b̧:`b`,Ḑ:`D`,ḑ:`d`,Ȩ:`E`,ȩ:`e`,Ɛ̧:`E`,ɛ̧:`e`,Ḩ:`H`,ḩ:`h`,I̧:`I`,i̧:`i`,Ɨ̧:`I`,ɨ̧:`i`,M̧:`M`,m̧:`m`,O̧:`O`,o̧:`o`,Q̧:`Q`,q̧:`q`,U̧:`U`,u̧:`u`,X̧:`X`,x̧:`x`,Z̧:`Z`,z̧:`z`},Te=Object.keys(we).join(`|`),Ee=new RegExp(Te,`g`);function De(e){return e.replace(Ee,e=>we[e])}
/**
* @name match-sorter
* @license MIT license.
* @copyright (c) 2099 Kent C. Dodds
* @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
*/
const z={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function Oe(e,t,n){if(n||={},n.threshold=n.threshold??z.MATCHES,!n.accessors){let r=ke(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}let r=Pe(e,n.accessors),i={rankedValue:e,rank:z.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let e=0;e<r.length;e++){let a=r[e],o=ke(a.itemValue,t,n),{minRanking:s,maxRanking:c,threshold:l=n.threshold}=a.attributes;o<s&&o>=z.MATCHES?o=s:o>c&&(o=c),o=Math.min(o,c),o>=l&&o>i.rank&&(i.rank=o,i.passed=!0,i.accessorIndex=e,i.accessorThreshold=l,i.rankedValue=a.itemValue)}return i}function ke(e,t,n){return e=Me(e,n),t=Me(t,n),t.length>e.length?z.NO_MATCH:e===t?z.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?z.EQUAL:e.startsWith(t)?z.STARTS_WITH:e.includes(` ${t}`)?z.WORD_STARTS_WITH:e.includes(t)?z.CONTAINS:t.length===1?z.NO_MATCH:Ae(e).includes(t)?z.ACRONYM:je(e,t))}function Ae(e){let t=``;return e.split(` `).forEach(e=>{e.split(`-`).forEach(e=>{t+=e.substr(0,1)})}),t}function je(e,t){let n=0,r=0;function i(e,t,r){for(let i=r,a=t.length;i<a;i++)if(t[i]===e)return n+=1,i+1;return-1}function a(e){let r=1/e,i=n/t.length;return z.MATCHES+i*r}let o=i(t[0],e,0);if(o<0)return z.NO_MATCH;r=o;for(let n=1,a=t.length;n<a;n++){let a=t[n];if(r=i(a,e,r),!(r>-1))return z.NO_MATCH}return a(r-o)}function Me(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=De(e)),e}function Ne(e,t){let n=t;typeof t==`object`&&(n=t.accessor);let r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function Pe(e,t){let n=[];for(let r=0,i=t.length;r<i;r++){let i=t[r],a=Ie(i),o=Ne(e,i);for(let e=0,t=o.length;e<t;e++)n.push({itemValue:o[e],attributes:a})}return n}const Fe={maxRanking:1/0,minRanking:-1/0};function Ie(e){return typeof e==`function`?Fe:{...Fe,...e}}let Le={data:``},Re=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Le},ze=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Be=/\/\*[^]*?\*\/|  +/g,Ve=/\n+/g,He=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?He(o,a):a+`{`+He(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=He(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=He.p?He.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},Ue={},We=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+We(e[n]);return t}return e},Ge=(e,t,n,r,i)=>{let a=We(e),o=Ue[a]||(Ue[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!Ue[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=ze.exec(e.replace(Be,``));)t[4]?r.shift():t[3]?(n=t[3].replace(Ve,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(Ve,` `).trim();return r[0]})(e):e;Ue[o]=He(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&Ue.g?Ue.g:null;return n&&(Ue.g=Ue[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(Ue[o],t,r,s),o},Ke=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:He(e,``):!1===e?``:e}return e+r+(a??``)},``);function B(e){let t=this||{},n=e.call?e(t.p):e;return Ge(n.unshift?n.raw?Ke(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,Re(t.target),t.g,t.o,t.k)}B.bind({g:1}),B.bind({k:1});function qe(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=qe(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function V(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=qe(e))&&(r&&(r+=` `),r+=t);return r}const Je=()=>{};function Ye(n,r){let i=e(n),{onChange:a}=r,o=new Set(r.appear?void 0:i),s=new WeakSet,[c,l]=S([],{equals:!1}),[u]=ce(),d=r.exitMethod===`remove`?Je:e=>{l(t=>(t.push.apply(t,e),t));for(let t of e)s.delete(t)},f=r.exitMethod===`remove`?Je:r.exitMethod===`keep-index`?(e,t,n)=>e.splice(n,0,t):(e,t)=>e.push(t);return x(r=>{let i=c(),l=n();if(l[t],e(u))return u(),r;if(i.length){let e=r.filter(e=>!i.includes(e));return i.length=0,a({list:e,added:[],removed:[],unchanged:e,finishRemoved:d}),e}return e(()=>{let e=new Set(l),t=l.slice(),n=[],i=[],c=[];for(let e of l)(o.has(e)?c:n).push(e);let u=!n.length;for(let n=0;n<r.length;n++){let a=r[n];e.has(a)||(s.has(a)||(i.push(a),s.add(a)),f(t,a,n)),u&&a!==t[n]&&(u=!1)}return!i.length&&u?r:(a({list:t,added:n,removed:i,unchanged:c,finishRemoved:d}),o=e,t)})},r.appear?[]:i.slice())}function H(...e){return me(e)}const Xe=e=>e instanceof Element;function Ze(e,t){if(t(e))return e;if(typeof e==`function`&&!e.length)return Ze(e(),t);if(Array.isArray(e)){let n=[];for(let r of e){let e=Ze(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function Qe(e,t=Xe,n=Xe){let r=x(e),i=x(()=>Ze(r(),t));return i.toArray=()=>{let e=i();return Array.isArray(e)?e:e?[e]:[]},i}function $e(e){return x(()=>{let t=e.name||`s`;return{enterActive:(e.enterActiveClass||t+`-enter-active`).split(` `),enter:(e.enterClass||t+`-enter`).split(` `),enterTo:(e.enterToClass||t+`-enter-to`).split(` `),exitActive:(e.exitActiveClass||t+`-exit-active`).split(` `),exit:(e.exitClass||t+`-exit`).split(` `),exitTo:(e.exitToClass||t+`-exit-to`).split(` `),move:(e.moveClass||t+`-move`).split(` `)}})}function et(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function tt(e,t,n,r){let{onBeforeEnter:i,onEnter:a,onAfterEnter:o}=t;i?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();a?.(n,()=>s())}),et(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),o?.(n))}}function nt(e,t,n,r){let{onBeforeExit:i,onExit:a,onAfterExit:o}=t;if(!n.parentNode)return r?.();i?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),a?.(n,()=>s()),et(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),o?.(n))}}var rt=e=>{let t=$e(e);return Ye(Qe(()=>e.children).toArray,{appear:e.appear,exitMethod:`keep-index`,onChange({added:n,removed:r,finishRemoved:i,list:a}){let o=t();for(let t of n)tt(o,e,t);let s=[];for(let e of a)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{let e=[];for(let{el:t,rect:n}of s)if(t.isConnected){let r=t.getBoundingClientRect(),i=n.left-r.left,a=n.top-r.top;(i||a)&&(t.style.transform=`translate(${i}px, ${a}px)`,t.style.transitionDuration=`0s`,e.push(t))}document.body.offsetHeight;for(let t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener(`transitionend`,e),t.classList.remove(...o.move))};t.classList.add(...o.move),t.style.transform=t.style.transitionDuration=``,t.addEventListener(`transitionend`,e)}});for(let t of r)nt(o,e,t,()=>i([t]))}})};const it=Symbol(`fallback`);function at(e){for(let t of e)t.dispose()}function ot(n,r,i,a={}){let o=new Map;return C(()=>at(o.values())),()=>{let i=n()||[];return i[t],e(()=>{if(!i.length)return at(o.values()),o.clear(),a.fallback?[b(e=>(o.set(it,{dispose:e}),a.fallback()))]:[];let e=Array(i.length),t=o.get(it);if(!o.size||t){t?.dispose(),o.delete(it);for(let t=0;t<i.length;t++){let n=i[t],a=r(n,t);s(e,n,t,a)}return e}let n=new Set(o.keys());for(let t=0;t<i.length;t++){let a=i[t],c=r(a,t);n.delete(c);let l=o.get(c);l?(e[t]=l.mapped,l.setIndex?.(t),l.setItem(()=>a)):s(e,a,t,c)}for(let e of n)o.get(e)?.dispose(),o.delete(e);return e})};function s(e,t,n,r){b(a=>{let[s,c]=S(t),l={setItem:c,dispose:a};if(i.length>1){let[e,t]=S(n);l.setIndex=t,l.mapped=i(s,e)}else l.mapped=i(s);o.set(r,l),e[n]=l.mapped})}}function st(e){let{by:t}=e;return x(ot(()=>e.each,typeof t==`function`?t:e=>e[t],e.children,`fallback`in e?{fallback:()=>e.fallback}:void 0))}function ct(e,t,n,r){return e.addEventListener(t,n,r),_e(e.removeEventListener.bind(e,t,n,r))}function lt(e,t,r,i){let a=()=>{he(R(e)).forEach(e=>{e&&he(R(t)).forEach(t=>ct(e,t,r,i))})};typeof e==`function`?n(a):c(a)}function ut(e,t){let n=new ResizeObserver(e);return C(n.disconnect.bind(n)),{observe:e=>n.observe(e,t),unobserve:n.unobserve.bind(n)}}function dt(e,t,r){let i=new WeakMap,{observe:a,unobserve:o}=ut(e=>{for(let n of e){let{contentRect:e,target:r}=n,a=Math.round(e.width),o=Math.round(e.height),s=i.get(r);(!s||s.width!==a||s.height!==o)&&(t(e,r,n),i.set(r,{width:a,height:o}))}},r);n(t=>{let n=pe(he(R(e)));return ve(n,t,a,o),n},[])}const ft=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function pt(e){let t={},n;for(;n=ft.exec(e);)t[n[1]]=n[2];return t}function mt(e,t){if(typeof e==`string`){if(typeof t==`string`)return`${e};${t}`;e=pt(e)}else typeof t==`string`&&(t=pt(t));return{...e,...t}}function ht(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function gt(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function _t(e){return typeof e==`number`}function vt(e){return Object.prototype.toString.call(e)===`[object String]`}function yt(e){return typeof e==`function`}function bt(e){return t=>`${e()}-${t}`}function xt(e,t){return e?e===t||e.contains(t):!1}function St(e,t=!1){let{activeElement:n}=wt(e);if(!n?.nodeName)return null;if(Tt(n)&&n.contentDocument)return St(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=wt(n).getElementById(e);if(t)return t}}return n}function Ct(e){return wt(e).defaultView||window}function wt(e){return e?e.ownerDocument||e:document}function Tt(e){return e.tagName===`IFRAME`}var Et=(e=>(e.Escape=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`,e.Space=` `,e.ArrowDown=`ArrowDown`,e.ArrowLeft=`ArrowLeft`,e.ArrowRight=`ArrowRight`,e.ArrowUp=`ArrowUp`,e.End=`End`,e.Home=`Home`,e.PageDown=`PageDown`,e.PageUp=`PageUp`,e))(Et||{});function Dt(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Ot(){return Dt(/^Mac/i)}function kt(){return Dt(/^iPhone/i)}function At(){return Dt(/^iPad/i)||Ot()&&navigator.maxTouchPoints>1}function jt(){return kt()||At()}function Mt(){return Ot()||jt()}function U(e,t){return t&&(yt(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function W(e){return t=>{for(let n of e)U(t,n)}}function Nt(e){return Ot()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function G(e){if(e){if(Ft())e.focus({preventScroll:!0});else{let t=It(e);e.focus(),Lt(t)}}}var Pt=null;function Ft(){if(Pt==null){Pt=!1;try{document.createElement(`div`).focus({get preventScroll(){return Pt=!0,!0}})}catch{}}return Pt}function It(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function Lt(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var Rt=[`input:not([type='hidden']):not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`[tabindex]`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable='false'])`],zt=[...Rt,`[tabindex]:not([tabindex="-1"]):not([disabled])`],Bt=`${Rt.join(`:not([hidden]),`)},[tabindex]:not([disabled]):not([hidden])`,Vt=zt.join(`:not([hidden]):not([tabindex="-1"]),`);function Ht(e,t){let n=Array.from(e.querySelectorAll(Bt)).filter(Ut);return t&&Ut(e)&&n.unshift(e),n.forEach((e,t)=>{if(Tt(e)&&e.contentDocument){let r=e.contentDocument.body,i=Ht(r,!1);n.splice(t,1,...i)}}),n}function Ut(e){return Wt(e)&&!Gt(e)}function Wt(e){return e.matches(Bt)&&Kt(e)}function Gt(e){return Number.parseInt(e.getAttribute(`tabindex`)||`0`,10)<0}function Kt(e,t){return e.nodeName!==`#comment`&&qt(e)&&Jt(e,t)&&(!e.parentElement||Kt(e.parentElement,e))}function qt(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:t,visibility:n}=e.style,r=t!==`none`&&n!==`hidden`&&n!==`collapse`;if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:i}=t(e);r=n!==`none`&&i!==`hidden`&&i!==`collapse`}return r}function Jt(e,t){return!e.hasAttribute(`hidden`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function Yt(e,t){return t.some(t=>t.contains(e))}function Xt(e,t,n){let r=t?.tabbable?Vt:Bt,i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(r)&&Kt(e)&&(!n||Yt(e,n))&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(i.currentNode=t.from),i}function Zt(e){let t=e;for(;t&&!Qt(t);)t=t.parentElement;return t||document.scrollingElement||document.documentElement}function Qt(e){let t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function $t(){}function en(e,t){let[n,r]=e,i=!1,a=t.length;for(let e=a,o=0,s=e-1;o<e;s=o++){let[a,c]=t[o],[l,u]=t[s],[,d]=t[s===0?e-1:s-1]||[0,0],f=(c-u)*(n-a)-(a-l)*(r-c);if(u<c){if(r>=u&&r<c){if(f===0)return!0;f>0&&(r===u?r>d&&(i=!i):i=!i)}}else if(c<u){if(r>c&&r<=u){if(f===0)return!0;f<0&&(r===u?r<d&&(i=!i):i=!i)}}else if(r===c&&(n>=l&&n<=a||n>=a&&n<=l))return!0}return i}function K(e,t){return u(e,t)}var tn=new Map,nn=new Set;function rn(){if(typeof window>`u`)return;let e=e=>{if(!e.target)return;let n=tn.get(e.target);n||(n=new Set,tn.set(e.target,n),e.target.addEventListener(`transitioncancel`,t)),n.add(e.propertyName)},t=e=>{if(!e.target)return;let n=tn.get(e.target);if(n&&(n.delete(e.propertyName),n.size===0&&(e.target.removeEventListener(`transitioncancel`,t),tn.delete(e.target)),tn.size===0)){for(let e of nn)e();nn.clear()}};document.body.addEventListener(`transitionrun`,e),document.body.addEventListener(`transitionend`,t)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,rn):rn());function an(e,t){let n=on(e,t,`left`),r=on(e,t,`top`),i=t.offsetWidth,a=t.offsetHeight,o=e.scrollLeft,s=e.scrollTop,c=o+e.offsetWidth,l=s+e.offsetHeight;n<=o?o=n:n+i>c&&(o+=n+i-c),r<=s?s=r:r+a>l&&(s+=r+a-l),e.scrollLeft=o,e.scrollTop=s}function on(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[r];break}t=t.offsetParent}return i}function sn(e,t){if(document.contains(e)){let n=document.scrollingElement||document.documentElement;if(window.getComputedStyle(n).overflow!==`hidden`){let{left:n,top:r}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:i,top:a}=e.getBoundingClientRect();(Math.abs(n-i)>1||Math.abs(r-a)>1)&&(t?.containingElement?.scrollIntoView?.({block:`center`,inline:`center`}),e.scrollIntoView?.({block:`nearest`}))}else{let t=Zt(e);for(;e&&t&&e!==n&&t!==n;)an(t,e),e=t,t=Zt(e)}}}var cn={border:`0`,clip:`rect(0 0 0 0)`,"clip-path":`inset(50%)`,height:`1px`,margin:`0 -1px -1px 0`,overflow:`hidden`,padding:`0`,position:`absolute`,width:`1px`,"white-space":`nowrap`};function ln(e,t){let[r,i]=S(un(t?.()));return n(()=>{i(e()?.tagName.toLowerCase()||un(t?.()))}),r}function un(e){return vt(e)?e:void 0}function q(e){let[t,n]=g(e,[`as`]);if(!t.as)throw Error("[kobalte]: Polymorphic is missing the required `as` prop.");return d(j,u(n,{get component(){return t.as}}))}var dn=Object.defineProperty,fn=(e,t)=>{for(var n in t)dn(e,n,{get:t[n],enumerable:!0})};fn({},{Button:()=>gn,Root:()=>hn});var pn=[`button`,`color`,`file`,`image`,`reset`,`submit`];function mn(e){let t=e.tagName.toLowerCase();return t===`button`?!0:t===`input`&&e.type?pn.indexOf(e.type)!==-1:!1}function hn(e){let t,n=K({type:`button`},e),[r,i]=g(n,[`ref`,`type`,`disabled`]),a=ln(()=>t,()=>`button`),o=x(()=>{let e=a();return e!=null&&mn({tagName:e,type:r.type})}),s=x(()=>a()===`input`),c=x(()=>a()===`a`&&t?.getAttribute(`href`)!=null);return d(q,u({as:`button`,ref(e){let n=H(e=>t=e,r.ref);typeof n==`function`&&n(e)},get type(){return o()||s()?r.type:void 0},get role(){return!o()&&!c()?`button`:void 0},get tabIndex(){return!o()&&!c()&&!r.disabled?0:void 0},get disabled(){return o()||s()?r.disabled:void 0},get"aria-disabled"(){return!o()&&!s()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?``:void 0}},i))}var gn=hn;function _n(t){let[n,r]=S(t.defaultValue?.()),i=x(()=>t.value?.()!==void 0),a=x(()=>i()?t.value?.():n());return[a,n=>{e(()=>{let e=ge(n,a());return Object.is(e,a())||(i()||r(e),t.onChange?.(e)),e})}]}function vn(e){let[t,n]=_n(e);return[()=>t()??!1,n]}function yn(e){let[t,n]=_n(e);return[()=>t()??[],n]}function bn(e={}){let[t,n]=vn({value:()=>R(e.isSelected),defaultValue:()=>!!R(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{!R(e.isReadOnly)&&!R(e.isDisabled)&&n(t)},toggle:()=>{!R(e.isReadOnly)&&!R(e.isDisabled)&&n(!t())}}}function xn(e){let t=e.startIndex??0,n=e.startLevel??0,r=[],i=t=>{if(t==null)return``;let n=e.getKey??`key`,r=vt(n)?t[n]:n(t);return r==null?``:String(r)},a=t=>{if(t==null)return``;let n=e.getTextValue??`textValue`,r=vt(n)?t[n]:n(t);return r==null?``:String(r)},o=t=>{if(t==null)return!1;let n=e.getDisabled??`disabled`;return(vt(n)?t[n]:n(t))??!1},s=t=>{if(t!=null)return vt(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(let c of e.dataSource){if(vt(c)||_t(c)){r.push({type:`item`,rawValue:c,key:String(c),textValue:String(c),disabled:o(c),level:n,index:t}),t++;continue}if(s(c)!=null){r.push({type:`section`,rawValue:c,key:``,textValue:``,disabled:!1,level:n,index:t}),t++;let i=s(c)??[];if(i.length>0){let a=xn({dataSource:i,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...a),t+=a.length}}else r.push({type:`item`,rawValue:c,key:i(c),textValue:a(c),disabled:o(c),level:n,index:t}),t++}return r}function Sn(e,t=[]){return x(()=>{let n=xn({dataSource:R(e.dataSource),getKey:R(e.getKey),getTextValue:R(e.getTextValue),getDisabled:R(e.getDisabled),getSectionChildren:R(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var Cn=new Set([`Avst`,`Arab`,`Armi`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),wn=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Tn(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??``;return Cn.has(t)}let t=e.split(`-`)[0];return wn.has(t)}function En(e){return Tn(e)?`rtl`:`ltr`}function Dn(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;return{locale:e,direction:En(e)}}var On=Dn(),kn=new Set;function An(){On=Dn();for(let e of kn)e(On)}function jn(){let[e,t]=S(On),n=x(()=>e());return T(()=>{kn.size===0&&window.addEventListener(`languagechange`,An),kn.add(t),C(()=>{kn.delete(t),kn.size===0&&window.removeEventListener(`languagechange`,An)})}),{locale:()=>n().locale,direction:()=>n().direction}}var Mn=L();function Nn(){let e=jn();return k(Mn)||e}var Pn=new Map;function Fn(e){let{locale:t}=Nn(),n=x(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():``));return x(()=>{let r=n(),i;return Pn.has(r)&&(i=Pn.get(r)),i||(i=new Intl.Collator(t(),e),Pn.set(r,i)),i})}var In=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function Ln(e){let[t,n]=_n(e);return[()=>t()??new In,n]}function Rn(e){return Mt()?e.altKey:e.ctrlKey}function zn(e){return Ot()?e.metaKey:e.ctrlKey}function Bn(e){return new In(e)}function Vn(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function Hn(e){let t=K({selectionMode:`none`,selectionBehavior:`toggle`},e),[r,i]=S(!1),[a,o]=S(),[s,c]=Ln({value:x(()=>{let e=R(t.selectedKeys);return e==null?e:Bn(e)}),defaultValue:x(()=>{let e=R(t.defaultSelectedKeys);return e==null?new In:Bn(e)}),onChange:e=>t.onSelectionChange?.(e)}),[l,u]=S(R(t.selectionBehavior));return n(()=>{let e=s();R(t.selectionBehavior)===`replace`&&l()===`toggle`&&typeof e==`object`&&e.size===0&&u(`replace`)}),n(()=>{u(R(t.selectionBehavior)??`toggle`)}),{selectionMode:()=>R(t.selectionMode),disallowEmptySelection:()=>R(t.disallowEmptySelection)??!1,selectionBehavior:l,setSelectionBehavior:u,isFocused:r,setFocused:i,focusedKey:a,setFocusedKey:o,selectedKeys:s,setSelectedKeys:e=>{(R(t.allowDuplicateSelectionEvents)||!Vn(e,s()))&&c(e)}}}function Un(e){let[t,n]=S(``),[r,i]=S(-1);return{typeSelectHandlers:{onKeyDown:a=>{if(R(e.isDisabled))return;let o=R(e.keyboardDelegate),s=R(e.selectionManager);if(!o.getKeyForSearch)return;let c=Wn(a.key);if(!c||a.ctrlKey||a.metaKey)return;c===` `&&t().trim().length>0&&(a.preventDefault(),a.stopPropagation());let l=n(e=>e+c),u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l);u==null&&Gn(l)&&(l=l[0],u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l)),u!=null&&(s.setFocusedKey(u),e.onTypeSelect?.(u)),clearTimeout(r()),i(window.setTimeout(()=>n(``),500))}}}}function Wn(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function Gn(e){return e.split(``).every(t=>t===e[0])}function Kn(e,t,r){let i=u({selectOnFocus:()=>R(e.selectionManager).selectionBehavior()===`replace`},e),a=()=>r?.()??t(),{direction:o}=Nn(),s={top:0,left:0};lt(()=>R(i.isVirtualized)?void 0:a(),`scroll`,()=>{let e=a();e&&(s={top:e.scrollTop,left:e.scrollLeft})});let{typeSelectHandlers:c}=Un({isDisabled:()=>R(i.disallowTypeAhead),keyboardDelegate:()=>R(i.keyboardDelegate),selectionManager:()=>R(i.selectionManager)}),l=()=>R(i.orientation)??`vertical`,d=e=>{U(e,c.onKeyDown),e.altKey&&e.key===`Tab`&&e.preventDefault();let n=t();if(!n?.contains(e.target))return;let r=R(i.selectionManager),a=R(i.selectOnFocus),s=t=>{t!=null&&(r.setFocusedKey(t),e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):a&&!Rn(e)&&r.replaceSelection(t))},u=R(i.keyboardDelegate),d=R(i.shouldFocusWrap),f=r.focusedKey();switch(e.key){case l()===`vertical`?`ArrowDown`:`ArrowRight`:if(u.getKeyBelow){e.preventDefault();let t;t=f==null?u.getFirstKey?.():u.getKeyBelow(f),t==null&&d&&(t=u.getFirstKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowUp`:`ArrowLeft`:if(u.getKeyAbove){e.preventDefault();let t;t=f==null?u.getLastKey?.():u.getKeyAbove(f),t==null&&d&&(t=u.getLastKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowLeft`:`ArrowUp`:if(u.getKeyLeftOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getFirstKey?.():u.getLastKey?.():u.getKeyLeftOf(f),s(n)}break;case l()===`vertical`?`ArrowRight`:`ArrowDown`:if(u.getKeyRightOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getLastKey?.():u.getFirstKey?.():u.getKeyRightOf(f),s(n)}break;case`Home`:if(u.getFirstKey){e.preventDefault();let t=u.getFirstKey(f,zn(e));t!=null&&(r.setFocusedKey(t),zn(e)&&e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):a&&r.replaceSelection(t))}break;case`End`:if(u.getLastKey){e.preventDefault();let t=u.getLastKey(f,zn(e));t!=null&&(r.setFocusedKey(t),zn(e)&&e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):a&&r.replaceSelection(t))}break;case`PageDown`:u.getKeyPageBelow&&f!=null&&(e.preventDefault(),s(u.getKeyPageBelow(f)));break;case`PageUp`:u.getKeyPageAbove&&f!=null&&(e.preventDefault(),s(u.getKeyPageAbove(f)));break;case`a`:zn(e)&&r.selectionMode()===`multiple`&&R(i.disallowSelectAll)!==!0&&(e.preventDefault(),r.selectAll());break;case`Escape`:e.defaultPrevented||(e.preventDefault(),R(i.disallowEmptySelection)||r.clearSelection());break;case`Tab`:if(!R(i.allowsTabNavigation)){if(e.shiftKey)n.focus();else{let e=Xt(n,{tabbable:!0}),t,r;do r=e.lastChild(),r&&(t=r);while(r);t&&!t.contains(document.activeElement)&&G(t)}break}}},f=e=>{let t=R(i.selectionManager),n=R(i.keyboardDelegate),r=R(i.selectOnFocus);if(t.isFocused()){e.currentTarget.contains(e.target)||t.setFocused(!1);return}if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),t.focusedKey()==null){let i=e=>{e!=null&&(t.setFocusedKey(e),r&&t.replaceSelection(e))},a=e.relatedTarget;a&&e.currentTarget.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING?i(t.lastSelectedKey()??n.getLastKey?.()):i(t.firstSelectedKey()??n.getFirstKey?.())}else if(!R(i.isVirtualized)){let e=a();if(e){e.scrollTop=s.top,e.scrollLeft=s.left;let n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(G(n),an(e,n))}}}},p=e=>{let t=R(i.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},m=e=>{a()===e.target&&e.preventDefault()},h=()=>{let e=R(i.autoFocus);if(!e)return;let n=R(i.selectionManager),r=R(i.keyboardDelegate),a;e===`first`&&(a=r.getFirstKey?.()),e===`last`&&(a=r.getLastKey?.());let o=n.selectedKeys();o.size&&(a=o.values().next().value),n.setFocused(!0),n.setFocusedKey(a);let s=t();s&&a==null&&!R(i.shouldUseVirtualFocus)&&G(s)};return T(()=>{i.deferAutoFocus?setTimeout(h,0):h()}),n(w([a,()=>R(i.isVirtualized),()=>R(i.selectionManager).focusedKey()],e=>{let[t,n,r]=e;if(n)r&&i.scrollToKey?.(r);else if(r&&t){let e=t.querySelector(`[data-key="${r}"]`);e&&an(t,e)}})),{tabIndex:x(()=>{if(!R(i.shouldUseVirtualFocus))return R(i.selectionManager).focusedKey()==null?0:-1}),onKeyDown:d,onMouseDown:m,onFocusIn:f,onFocusOut:p}}function qn(e,t){let r=()=>R(e.selectionManager),i=()=>R(e.key),a=()=>R(e.shouldUseVirtualFocus),o=e=>{r().selectionMode()!==`none`&&(r().selectionMode()===`single`?r().isSelected(i())&&!r().disallowEmptySelection()?r().toggleSelection(i()):r().replaceSelection(i()):e?.shiftKey?r().extendSelection(i()):r().selectionBehavior()===`toggle`||zn(e)||`pointerType`in e&&e.pointerType===`touch`?r().toggleSelection(i()):r().replaceSelection(i()))},s=()=>r().isSelected(i()),c=()=>R(e.disabled)||r().isDisabled(i()),l=()=>!c()&&r().canSelectItem(i()),u=null,d=t=>{l()&&(u=t.pointerType,t.pointerType===`mouse`&&t.button===0&&!R(e.shouldSelectOnPressUp)&&o(t))},f=t=>{l()&&t.pointerType===`mouse`&&t.button===0&&R(e.shouldSelectOnPressUp)&&R(e.allowsDifferentPressOrigin)&&o(t)},p=t=>{l()&&(R(e.shouldSelectOnPressUp)&&!R(e.allowsDifferentPressOrigin)||u!==`mouse`)&&o(t)},m=e=>{!l()||![`Enter`,` `].includes(e.key)||(Rn(e)?r().toggleSelection(i()):o(e))},h=e=>{c()&&e.preventDefault()},g=e=>{let n=t();a()||c()||!n||e.target===n&&r().setFocusedKey(i())},_=x(()=>{if(!(a()||c()))return i()===r().focusedKey()?0:-1}),v=x(()=>R(e.virtualized)?void 0:i());return n(w([t,i,a,()=>r().focusedKey(),()=>r().isFocused()],([t,n,r,i,a])=>{t&&n===i&&a&&!r&&document.activeElement!==t&&(e.focus?e.focus():G(t))})),{isSelected:s,isDisabled:c,allowsSelection:l,tabIndex:_,dataKey:v,onPointerDown:d,onPointerUp:f,onClick:p,onKeyDown:m,onMouseDown:h,onFocus:g}}var Jn=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()===`none`)return!1;let t=this.getKey(e);return t!=null&&this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index<e.index;(!e||r)&&(e=n)}return e?.key}lastSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index>e.index;(!e||r)&&(e=n)}return e?.key}extendSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=this.state.selectedKeys(),r=n.anchorKey||t,i=new In(n,r,t);for(let e of this.getKeyRange(r,n.currentKey||t))i.delete(e);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&i.add(e);this.state.setSelectedKeys(i)}getKeyRange(e,t){let n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let n=[],r=e;for(;r!=null;){let e=this.collection().getItem(r);if(e&&e.type===`item`&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let t=this.collection().getItem(e);return t?!t||t.type!==`item`?null:t.key:e}toggleSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new In(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection()&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new In([t],t,t):new In;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()===`none`)return;let t=new In;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode()===`single`))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()===`multiple`&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new In)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!==`none`&&(this.selectionMode()===`single`?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()===`toggle`||t&&t.pointerType===`touch`?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let t=this.selectedKeys();if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()===`none`)return!1;let t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){let t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let n=this.collection().getItem(t);if(!n)continue;n.type===`item`&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},Yn=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let t of e)this.keyMap.set(t.key,t);if(this.keyMap.size===0)return;let t,n=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),r.type===`item`&&(r.index=n++),t=r,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}};function Xn(e){let t=Hn(e),n=Sn({dataSource:()=>R(e.dataSource),getKey:()=>R(e.getKey),getTextValue:()=>R(e.getTextValue),getDisabled:()=>R(e.getDisabled),getSectionChildren:()=>R(e.getSectionChildren),factory:t=>e.filter?new Yn(e.filter(t)):new Yn(t)},[()=>e.filter]),r=new Jn(n,t);return _(()=>{let e=t.focusedKey();e!=null&&!n().getItem(e)&&t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>r}}var Zn=L();function Qn(){return k(Zn)}function $n(){let e=Qn();if(e===void 0)throw Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function er(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function tr(e,t){let n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){let t=e[r]?.ref();if(t&&er(t,n))return r+1}return 0}function nr(e){let t=e.map((e,t)=>[t,e]),n=!1;return t.sort(([e,t],[r,i])=>{let a=t.ref(),o=i.ref();return a===o||!a||!o?0:er(a,o)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1)}),n?t.map(([e,t])=>t):e}function rr(e,t){let n=nr(e);e!==n&&t(n)}function ir(e){let t=e[0],n=e[e.length-1]?.ref(),r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return wt(r).body}function ar(e,t){n(()=>{let n=setTimeout(()=>{rr(e(),t)});C(()=>clearTimeout(n))})}function or(e,t){if(typeof IntersectionObserver!=`function`){ar(e,t);return}let r=[];n(()=>{let n=()=>{let n=!!r.length;r=e(),n&&rr(e(),t)},i=ir(e()),a=new IntersectionObserver(n,{root:i});for(let t of e()){let e=t.ref();e&&a.observe(e)}C(()=>a.disconnect())})}function sr(e={}){let[t,n]=yn({value:()=>R(e.items),onChange:t=>e.onItemsChange?.(t)});or(t,n);let r=e=>(n(t=>ht(t,e,tr(t,e))),()=>{n(t=>{let n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>d(Zn.Provider,{value:{registerItem:r},get children(){return e.children}})}}function cr(e){let t=$n(),r=K({shouldRegisterItem:!0},e);n(()=>{if(!r.shouldRegisterItem)return;let e=t.registerItem(r.getItem());C(e)})}const lr=[`top`,`right`,`bottom`,`left`],ur=Math.min,dr=Math.max,fr=Math.round,pr=Math.floor,mr=e=>({x:e,y:e}),hr={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function gr(e,t,n){return dr(e,ur(t,n))}function _r(e,t){return typeof e==`function`?e(t):e}function vr(e){return e.split(`-`)[0]}function yr(e){return e.split(`-`)[1]}function br(e){return e===`x`?`y`:`x`}function xr(e){return e===`y`?`height`:`width`}function Sr(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function Cr(e){return br(Sr(e))}function wr(e,t,n){n===void 0&&(n=!1);let r=yr(e),i=Cr(e),a=xr(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Nr(o)),[o,Nr(o)]}function Tr(e){let t=Nr(e);return[Er(e),t,Er(t)]}function Er(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}const Dr=[`left`,`right`],Or=[`right`,`left`],kr=[`top`,`bottom`],Ar=[`bottom`,`top`];function jr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Or:Dr:t?Dr:Or;case`left`:case`right`:return t?kr:Ar;default:return[]}}function Mr(e,t,n,r){let i=yr(e),a=jr(vr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Er)))),a}function Nr(e){let t=vr(e);return hr[t]+e.slice(t.length)}function Pr(e){return{top:0,right:0,bottom:0,left:0,...e}}function Fr(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Pr(e)}function Ir(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function Lr(e,t,n){let{reference:r,floating:i}=e,a=Sr(t),o=Cr(t),s=xr(o),c=vr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(yr(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1)}return p}async function Rr(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=_r(t,e),p=Fr(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Ir(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Ir(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}const zr=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Rr},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Lr(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<50&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=Lr(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},Br=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=_r(e,t)||{};if(l==null)return{};let d=Fr(u),f={x:n,y:r},p=Cr(i),m=xr(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=ur(d[_],T),D=ur(d[v],T),O=E,k=C-h[m]-D,A=C/2-h[m]/2+w,j=gr(O,A,k),M=!c.arrow&&yr(i)!=null&&A!==j&&a.reference[m]/2-(A<O?E:D)-h[m]/2<0,N=M?A<O?A-O:A-k:0;return{[p]:f[p]+N,data:{[p]:j,centerOffset:A-j-N,...M&&{alignmentOffset:N}},reset:M}}}),Vr=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=_r(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=vr(r),_=Sr(o),v=vr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Nr(o)]:Tr(o)),x=p!==`none`;!d&&x&&b.push(...Mr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=wr(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===Sr(t)||T.every(e=>Sr(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=Sr(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}};function Hr(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function Ur(e){return lr.some(t=>e[t]>=0)}const Wr=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=_r(e,t);switch(i){case`referenceHidden`:{let e=Hr(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:Ur(e)}}}case`escaped`:{let e=Hr(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:Ur(e)}}}default:return{}}}}},Gr=new Set([`left`,`top`]);async function Kr(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=vr(n),s=yr(n),c=Sr(n)===`y`,l=Gr.has(o)?-1:1,u=a&&c?-1:1,d=_r(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}const qr=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await Kr(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},Jr=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=_r(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Sr(vr(i)),p=br(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=gr(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=gr(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},Yr=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=_r(e,t),u=await o.detectOverflow(t,l),d=vr(i),f=yr(i),p=Sr(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=ur(h-u[g],v),x=ur(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=dr(u.left,0),t=dr(u.right,0),n=dr(u.top,0),r=dr(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:dr(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:dr(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function Xr(){return typeof window<`u`}function Zr(e){return ei(e)?(e.nodeName||``).toLowerCase():`#document`}function Qr(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function $r(e){return((ei(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function ei(e){return Xr()?e instanceof Node||e instanceof Qr(e).Node:!1}function ti(e){return Xr()?e instanceof Element||e instanceof Qr(e).Element:!1}function ni(e){return Xr()?e instanceof HTMLElement||e instanceof Qr(e).HTMLElement:!1}function ri(e){return!Xr()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof Qr(e).ShadowRoot}function ii(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=hi(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function ai(e){return/^(table|td|th)$/.test(Zr(e))}function oi(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}const si=/transform|translate|scale|rotate|perspective|filter/,ci=/paint|layout|strict|content/,li=e=>!!e&&e!==`none`;let ui;function di(e){let t=ti(e)?hi(e):e;return li(t.transform)||li(t.translate)||li(t.scale)||li(t.rotate)||li(t.perspective)||!pi()&&(li(t.backdropFilter)||li(t.filter))||si.test(t.willChange||``)||ci.test(t.contain||``)}function fi(e){let t=_i(e);for(;ni(t)&&!mi(t);){if(di(t))return t;if(oi(t))return null;t=_i(t)}return null}function pi(){return ui??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),ui}function mi(e){return/^(html|body|#document)$/.test(Zr(e))}function hi(e){return Qr(e).getComputedStyle(e)}function gi(e){return ti(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function _i(e){if(Zr(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||ri(e)&&e.host||$r(e);return ri(t)?t.host:t}function vi(e){let t=_i(e);return mi(t)?e.ownerDocument?e.ownerDocument.body:e.body:ni(t)&&ii(t)?t:vi(t)}function yi(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=vi(e),i=r===e.ownerDocument?.body,a=Qr(r);if(i){let e=bi(a);return t.concat(a,a.visualViewport||[],ii(r)?r:[],e&&n?yi(e):[])}return t.concat(r,yi(r,[],n))}function bi(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function xi(e){let t=hi(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=ni(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=fr(n)!==a||fr(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Si(e){return ti(e)?e:e.contextElement}function Ci(e){let t=Si(e);if(!ni(t))return mr(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=xi(t),o=(a?fr(n.width):n.width)/r,s=(a?fr(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}const wi=mr(0);function Ti(e){let t=Qr(e);return!pi()||!t.visualViewport?wi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ei(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==Qr(e)?!1:t}function Di(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Si(e),o=mr(1);t&&(r?ti(r)&&(o=Ci(r)):o=Ci(e));let s=Ei(a,n,r)?Ti(a):mr(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=Qr(a),t=r&&ti(r)?Qr(r):r,n=e,i=bi(n);for(;i&&r&&t!==n;){let e=Ci(i),t=i.getBoundingClientRect(),r=hi(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=Qr(i),i=bi(n)}}return Ir({width:u,height:d,x:c,y:l})}function Oi(e,t){let n=gi(e).scrollLeft;return t?t.left+n:Di($r(e)).left+n}function ki(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Oi(e,n),y:n.top+t.scrollTop}}function Ai(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=$r(r),s=t?oi(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=mr(1),u=mr(0),d=ni(r);if((d||!d&&!a)&&((Zr(r)!==`body`||ii(o))&&(c=gi(r)),d)){let e=Di(r);l=Ci(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?ki(o,c):mr(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function ji(e){return Array.from(e.getClientRects())}function Mi(e){let t=$r(e),n=gi(e),r=e.ownerDocument.body,i=dr(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=dr(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+Oi(e),s=-n.scrollTop;return hi(r).direction===`rtl`&&(o+=dr(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}function Ni(e,t){let n=Qr(e),r=$r(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=pi();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=Oi(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=25&&(a-=o)}else l<=25&&(a+=l);return{width:a,height:o,x:s,y:c}}function Pi(e,t){let n=Di(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=ni(e)?Ci(e):mr(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function Fi(e,t,n){let r;if(t===`viewport`)r=Ni(e,n);else if(t===`document`)r=Mi($r(e));else if(ti(t))r=Pi(t,n);else{let n=Ti(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Ir(r)}function Ii(e,t){let n=_i(e);return n===t||!ti(n)||mi(n)?!1:hi(n).position===`fixed`||Ii(n,t)}function Li(e,t){let n=t.get(e);if(n)return n;let r=yi(e,[],!1).filter(e=>ti(e)&&Zr(e)!==`body`),i=null,a=hi(e).position===`fixed`,o=a?_i(e):e;for(;ti(o)&&!mi(o);){let t=hi(o),n=di(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||ii(o)&&!n&&Ii(e,o))?r=r.filter(e=>e!==o):i=t,o=_i(o)}return t.set(e,r),r}function Ri(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?oi(t)?[]:Li(t,this._c):[].concat(n),r],o=Fi(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=Fi(t,a[e],i);s=dr(n.top,s),c=ur(n.right,c),l=ur(n.bottom,l),u=dr(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function zi(e){let{width:t,height:n}=xi(e);return{width:t,height:n}}function Bi(e,t,n){let r=ni(t),i=$r(t),a=n===`fixed`,o=Di(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=mr(0);function l(){c.x=Oi(i)}if(r||!r&&!a){if((Zr(t)!==`body`||ii(i))&&(s=gi(t)),r){let e=Di(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l()}a&&!r&&i&&l();let u=i&&!r&&!a?ki(i,s):mr(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function Vi(e){return hi(e).position===`static`}function Hi(e,t){if(!ni(e)||hi(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return $r(e)===n&&(n=n.ownerDocument.body),n}function Ui(e,t){let n=Qr(e);if(oi(e))return n;if(!ni(e)){let t=_i(e);for(;t&&!mi(t);){if(ti(t)&&!Vi(t))return t;t=_i(t)}return n}let r=Hi(e,t);for(;r&&ai(r)&&Vi(r);)r=Hi(r,t);return r&&mi(r)&&Vi(r)&&!di(r)?n:r||fi(e)||n}const Wi=async function(e){let t=this.getOffsetParent||Ui,n=this.getDimensions,r=await n(e.floating);return{reference:Bi(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Gi(e){return hi(e).direction===`rtl`}const Ki={convertOffsetParentRelativeRectToViewportRelativeRect:Ai,getDocumentElement:$r,getClippingRect:Ri,getOffsetParent:Ui,getElementRects:Wi,getClientRects:ji,getDimensions:zi,getScale:Ci,isElement:ti,isRTL:Gi};function qi(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Ji(e,t){let n=null,r,i=$r(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=pr(d),h=pr(i.clientWidth-(u+f)),g=pr(i.clientHeight-(d+p)),_=pr(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:dr(0,ur(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!qi(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function Yi(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Si(e),u=i||a?[...l?yi(l):[],...t?yi(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?Ji(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Di(e):null;c&&g();function g(){let t=Di(e);h&&!qi(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}const Xi=qr,Zi=Jr,Qi=Vr,$i=Yr,ea=Wr,ta=Br,na=(e,t,n)=>{let r=new Map,i={platform:Ki,...n},a={...i.platform,_c:r};return zr(e,t,{...i,platform:a})};var ra=L();function ia(){let e=k(ra);if(e===void 0)throw Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var aa=m(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`),oa=30,sa=oa/2,ca={top:180,right:-90,bottom:0,left:90};function la(e){let t=ia(),n=K({size:oa},e),[r,i]=g(n,[`ref`,`style`,`size`]),a=()=>t.currentPlacement().split(`-`)[0],o=ua(t.contentRef),s=()=>o()?.getPropertyValue(`background-color`)||`none`,l=()=>o()?.getPropertyValue(`border-${a()}-color`)||`none`,f=()=>o()?.getPropertyValue(`border-${a()}-width`)||`0px`,p=()=>Number.parseInt(f())*2*(oa/r.size),m=()=>`rotate(${ca[a()]} ${sa} ${sa}) translate(0 2)`;return d(q,u({as:`div`,ref(e){let n=H(t.setArrowRef,r.ref);typeof n==`function`&&n(e)},"aria-hidden":`true`,get style(){return mt({position:`absolute`,"font-size":`${r.size}px`,width:`1em`,height:`1em`,"pointer-events":`none`,fill:s(),stroke:l(),"stroke-width":p()},r.style)}},i,{get children(){let e=aa(),t=e.firstChild;return c(()=>y(t,`transform`,m())),e}}))}function ua(e){let[t,r]=S();return n(()=>{let t=e();t&&r(Ct(t).getComputedStyle(t))}),t}function da(e){let t=ia(),[n,r]=g(e,[`ref`,`style`]);return d(q,u({as:`div`,ref(e){let r=H(t.setPositionerRef,n.ref);typeof r==`function`&&r(e)},"data-popper-positioner":``,get style(){return mt({position:`absolute`,top:0,left:0,"min-width":`max-content`},n.style)}},r))}function fa(e){let{x:t=0,y:n=0,width:r=0,height:i=0}=e??{};if(typeof DOMRect==`function`)return new DOMRect(t,n,r,i);let a={x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:n+i,left:t};return{...a,toJSON:()=>a}}function pa(e,t){return{contextElement:e,getBoundingClientRect:()=>{let n=t(e);return n?fa(n):e?e.getBoundingClientRect():fa()}}}function ma(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var ha={top:`bottom`,right:`left`,bottom:`top`,left:`right`};function ga(e,t){let[n,r]=e.split(`-`),i=ha[n];return r?n===`left`||n===`right`?`${i} ${r===`start`?`top`:`bottom`}`:r===`start`?`${i} ${t===`rtl`?`right`:`left`}`:`${i} ${t===`rtl`?`left`:`right`}`:`${i} center`}function _a(e){let t=K({getAnchorRect:e=>e?.getBoundingClientRect(),placement:`bottom`,gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[r,i]=S(),[a,o]=S(),[s,c]=S(t.placement),l=()=>pa(t.anchorRef?.(),t.getAnchorRect),{direction:u}=Nn();async function f(){let e=l(),n=r(),i=a();if(!e||!n)return;let o=(i?.clientHeight||0)/2,s=typeof t.gutter==`number`?t.gutter+o:t.gutter??o;n.style.setProperty(`--kb-popper-content-overflow-padding`,`${t.overflowPadding}px`),e.getBoundingClientRect();let d=[Xi(({placement:e})=>{let n=!!e.split(`-`)[1];return{mainAxis:s,crossAxis:n?void 0:t.shift,alignmentAxis:t.shift}})];if(t.flip!==!1){let e=typeof t.flip==`string`?t.flip.split(` `):void 0;if(e!==void 0&&!e.every(ma))throw Error("`flip` expects a spaced-delimited list of placements");d.push(Qi({padding:t.overflowPadding,fallbackPlacements:e}))}(t.slide||t.overlap)&&d.push(Zi({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),d.push($i({padding:t.overflowPadding,apply({availableWidth:e,availableHeight:r,rects:i}){let a=Math.round(i.reference.width);e=Math.floor(e),r=Math.floor(r),n.style.setProperty(`--kb-popper-anchor-width`,`${a}px`),n.style.setProperty(`--kb-popper-content-available-width`,`${e}px`),n.style.setProperty(`--kb-popper-content-available-height`,`${r}px`),t.sameWidth&&(n.style.width=`${a}px`),t.fitViewport&&(n.style.maxWidth=`${e}px`,n.style.maxHeight=`${r}px`)}})),t.hideWhenDetached&&d.push(ea({padding:t.detachedPadding})),i&&d.push(ta({element:i,padding:t.arrowPadding}));let f=await na(e,n,{placement:t.placement,strategy:`absolute`,middleware:d,platform:{...Ki,isRTL:()=>u()===`rtl`}});if(c(f.placement),t.onCurrentPlacementChange?.(f.placement),!n)return;n.style.setProperty(`--kb-popper-content-transform-origin`,ga(f.placement,u()));let p=Math.round(f.x),m=Math.round(f.y),h;if(t.hideWhenDetached&&(h=f.middlewareData.hide?.referenceHidden?`hidden`:`visible`),Object.assign(n.style,{top:`0`,left:`0`,transform:`translate3d(${p}px, ${m}px, 0)`,visibility:h}),i&&f.middlewareData.arrow){let{x:e,y:t}=f.middlewareData.arrow,n=f.placement.split(`-`)[0];Object.assign(i.style,{left:e==null?``:`${e}px`,top:t==null?``:`${t}px`,[n]:`100%`})}}n(()=>{let e=l(),t=r();if(!e||!t)return;let n=Yi(e,t,f,{elementResize:typeof ResizeObserver==`function`});C(n)}),n(()=>{let e=r(),n=t.contentRef?.();!e||!n||queueMicrotask(()=>{e.style.zIndex=getComputedStyle(n).zIndex})});let p={currentPlacement:s,contentRef:()=>t.contentRef?.(),setPositionerRef:i,setArrowRef:o};return d(ra.Provider,{value:p,get children(){return t.children}})}var va=Object.assign(_a,{Arrow:la,Context:ra,usePopperContext:ia,Positioner:da}),ya=`data-kb-top-layer`,ba,xa=!1,Sa=[];function Ca(e){return Sa.findIndex(t=>t.node===e)}function wa(e){return Sa[Ca(e)]}function Ta(e){return Sa[Sa.length-1].node===e}function Ea(){return Sa.filter(e=>e.isPointerBlocking)}function Da(){return[...Ea()].slice(-1)[0]}function Oa(){return Ea().length>0}function ka(e){let t=Ca(Da()?.node);return Ca(e)<t}function Aa(e){Sa.push(e)}function ja(e){let t=Ca(e);t<0||Sa.splice(t,1)}function Ma(){for(let{node:e}of Sa)e.style.pointerEvents=ka(e)?`none`:`auto`}function Na(e){if(Oa()&&!xa){let t=wt(e);ba=document.body.style.pointerEvents,t.body.style.pointerEvents=`none`,xa=!0}}function Pa(e){if(Oa())return;let t=wt(e);t.body.style.pointerEvents=ba,t.body.style.length===0&&t.body.removeAttribute(`style`),xa=!1}var Fa={layers:Sa,isTopMostLayer:Ta,hasPointerBlockingLayer:Oa,isBelowPointerBlockingLayer:ka,addLayer:Aa,removeLayer:ja,indexOf:Ca,find:wa,assignPointerEventToLayers:Ma,disableBodyPointerEvents:Na,restoreBodyPointerEvents:Pa},Ia=`interactOutside.pointerDownOutside`,La=`interactOutside.focusOutside`;function Ra(e,t){let r,i=$t,a=()=>wt(t()),o=t=>e.onPointerDownOutside?.(t),s=t=>e.onFocusOutside?.(t),c=t=>e.onInteractOutside?.(t),l=n=>{let r=n.target;return!(r instanceof Element)||r.closest(`[data-kb-top-layer]`)||!xt(a(),r)||xt(t(),r)?!1:!e.shouldExcludeElement?.(r)},u=e=>{function n(){let n=t(),r=e.target;if(!n||!r||!l(e))return;let i=W([o,c]);r.addEventListener(Ia,i,{once:!0});let a=new CustomEvent(Ia,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:e.button===2||Nt(e)&&e.button===0}});r.dispatchEvent(a)}e.pointerType===`touch`?(a().removeEventListener(`click`,n),i=n,a().addEventListener(`click`,n,{once:!0})):n()},d=e=>{let n=t(),r=e.target;if(!n||!r||!l(e))return;let i=W([s,c]);r.addEventListener(La,i,{once:!0});let a=new CustomEvent(La,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(a)};n(()=>{R(e.isDisabled)||(r=window.setTimeout(()=>{a().addEventListener(`pointerdown`,u,!0)},0),a().addEventListener(`focusin`,d,!0),C(()=>{window.clearTimeout(r),a().removeEventListener(`click`,i),a().removeEventListener(`pointerdown`,u,!0),a().removeEventListener(`focusin`,d,!0)}))})}function za(e){let t=t=>{t.key===Et.Escape&&e.onEscapeKeyDown?.(t)};n(()=>{if(R(e.isDisabled))return;let n=e.ownerDocument?.()??wt();n.addEventListener(`keydown`,t),C(()=>{n.removeEventListener(`keydown`,t)})})}var Ba=L();function Va(){return k(Ba)}function Ha(e){let t,r=Va(),[i,a]=g(e,[`ref`,`disableOutsidePointerEvents`,`excludedElements`,`onEscapeKeyDown`,`onPointerDownOutside`,`onFocusOutside`,`onInteractOutside`,`onDismiss`,`bypassTopMostLayerCheck`]),o=new Set([]),s=e=>{o.add(e);let t=r?.registerNestedLayer(e);return()=>{o.delete(e),t?.()}};Ra({shouldExcludeElement:e=>t?i.excludedElements?.some(t=>xt(t(),e))||[...o].some(t=>xt(t,e)):!1,onPointerDownOutside:e=>{!t||Fa.isBelowPointerBlockingLayer(t)||!i.bypassTopMostLayerCheck&&!Fa.isTopMostLayer(t)||(i.onPointerDownOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.())},onFocusOutside:e=>{i.onFocusOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.()}},()=>t),za({ownerDocument:()=>wt(t),onEscapeKeyDown:e=>{!t||!Fa.isTopMostLayer(t)||(i.onEscapeKeyDown?.(e),!e.defaultPrevented&&i.onDismiss&&(e.preventDefault(),i.onDismiss()))}}),T(()=>{if(!t)return;Fa.addLayer({node:t,isPointerBlocking:i.disableOutsidePointerEvents,dismiss:i.onDismiss});let e=r?.registerNestedLayer(t);Fa.assignPointerEventToLayers(),Fa.disableBodyPointerEvents(t),C(()=>{t&&(Fa.removeLayer(t),e?.(),Fa.assignPointerEventToLayers(),Fa.restoreBodyPointerEvents(t))})}),n(w([()=>t,()=>i.disableOutsidePointerEvents],([e,t])=>{if(!e)return;let n=Fa.find(e);n&&n.isPointerBlocking!==t&&(n.isPointerBlocking=t,Fa.assignPointerEventToLayers()),t&&Fa.disableBodyPointerEvents(e),C(()=>{Fa.restoreBodyPointerEvents(e)})},{defer:!0}));let c={registerNestedLayer:s};return d(Ba.Provider,{value:c,get children(){return d(q,u({as:`div`,ref(e){let n=H(e=>t=e,i.ref);typeof n==`function`&&n(e)}},a))}})}function Ua(e={}){let[t,n]=vn({value:()=>R(e.open),defaultValue:()=>!!R(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},i=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:i,toggle:()=>{t()?i():r()}}}function Wa(e){return t=>(e(t),()=>e(void 0))}var J=e=>typeof e==`function`?e():e,Ga=t=>{let r=x(()=>{let e=J(t.element);if(e)return getComputedStyle(e)}),i=()=>r()?.animationName??`none`,[a,o]=S(J(t.show)?`present`:`hidden`),s=`none`;return n(n=>{let a=J(t.show);return e(()=>{if(n===a)return a;let e=s,t=i();a?o(`present`):t===`none`||r()?.display===`none`?o(`hidden`):o(n===!0&&e!==t?`hiding`:`hidden`)}),a}),n(()=>{let e=J(t.element);if(!e)return;let n=t=>{t.target===e&&(s=i())},r=t=>{let n=i().includes(t.animationName);t.target===e&&n&&a()===`hiding`&&o(`hidden`)};e.addEventListener(`animationstart`,n),e.addEventListener(`animationcancel`,r),e.addEventListener(`animationend`,r),C(()=>{e.removeEventListener(`animationstart`,n),e.removeEventListener(`animationcancel`,r),e.removeEventListener(`animationend`,r)})}),{present:()=>a()===`present`||a()===`hiding`,state:a,setState:o}},Ka=[`id`,`name`,`validationState`,`required`,`disabled`,`readOnly`];function qa(e){let t=K({id:`form-control-${s()}`},e),[n,r]=S(),[i,a]=S(),[o,c]=S(),[l,u]=S();return{formControlContext:{name:()=>R(t.name)??R(t.id),dataset:x(()=>({"data-valid":R(t.validationState)===`valid`?``:void 0,"data-invalid":R(t.validationState)===`invalid`?``:void 0,"data-required":R(t.required)?``:void 0,"data-disabled":R(t.disabled)?``:void 0,"data-readonly":R(t.readOnly)?``:void 0})),validationState:()=>R(t.validationState),isRequired:()=>R(t.required),isDisabled:()=>R(t.disabled),isReadOnly:()=>R(t.readOnly),labelId:n,fieldId:i,descriptionId:o,errorMessageId:l,getAriaLabelledBy:(e,t,r)=>{let i=r!=null||n()!=null;return[r,n(),i&&t!=null?e:void 0].filter(Boolean).join(` `)||void 0},getAriaDescribedBy:e=>[o(),l(),e].filter(Boolean).join(` `)||void 0,generateId:bt(()=>R(t.id)),registerLabel:Wa(r),registerField:Wa(a),registerDescription:Wa(c),registerErrorMessage:Wa(u)}}}var Ja=L();function Ya(){let e=k(Ja);if(e===void 0)throw Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function Xa(e){let t=Ya(),r=K({id:t.generateId(`description`)},e);return n(()=>C(t.registerDescription(r.id))),d(q,u({as:`div`},()=>t.dataset(),r))}function Za(e){let t,i=Ya(),a=K({id:i.generateId(`label`)},e),[o,s]=g(a,[`ref`]),c=ln(()=>t,()=>`label`);return n(()=>C(i.registerLabel(s.id))),d(q,u({as:`label`,ref(e){let n=H(e=>t=e,o.ref);typeof n==`function`&&n(e)},get for(){return r(()=>c()===`label`)()?i.fieldId():void 0}},()=>i.dataset(),s))}function Qa(e,t){n(w(e,e=>{if(e==null)return;let n=$a(e);n!=null&&(n.addEventListener(`reset`,t,{passive:!0}),C(()=>{n.removeEventListener(`reset`,t)}))}))}function $a(e){return eo(e)?e.form:e.closest(`form`)}function eo(e){return e.matches(`textarea, input, select, button`)}function to(e){let t=Ya(),r=K({id:t.generateId(`error-message`)},e),[i,a]=g(r,[`forceMount`]),o=()=>t.validationState()===`invalid`;return n(()=>{o()&&C(t.registerErrorMessage(a.id))}),d(h,{get when(){return i.forceMount||o()},get children(){return d(q,u({as:`div`},()=>t.dataset(),a))}})}var no=`focusScope.autoFocusOnMount`,ro=`focusScope.autoFocusOnUnmount`,io={bubbles:!1,cancelable:!0},ao={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=gt(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=gt(this.stack,e),this.active()?.resume()}};function oo(e,t){let[r,i]=S(!1),a={pause(){i(!0)},resume(){i(!1)}},o=null,s=t=>e.onMountAutoFocus?.(t),c=t=>e.onUnmountAutoFocus?.(t),l=()=>wt(t()),u=()=>{let e=l().createElement(`span`);return e.setAttribute(`data-focus-trap`,``),e.tabIndex=0,Object.assign(e.style,cn),e},d=()=>{let e=t();return e?Ht(e,!0).filter(e=>!e.hasAttribute(`data-focus-trap`)):[]},f=()=>{let e=d();return e.length>0?e[0]:null},p=()=>{let e=d();return e.length>0?e[e.length-1]:null},m=()=>{let e=t();if(!e)return!1;let n=St(e);return!n||xt(e,n)?!1:Wt(n)};n(()=>{let e=t();if(!e)return;ao.add(a);let n=St(e);if(!xt(e,n)){let t=new CustomEvent(no,io);e.addEventListener(no,s),e.dispatchEvent(t),t.defaultPrevented||setTimeout(()=>{G(f()),St(e)===n&&G(e)},0)}C(()=>{e.removeEventListener(no,s),setTimeout(()=>{let t=new CustomEvent(ro,io);m()&&t.preventDefault(),e.addEventListener(ro,c),e.dispatchEvent(t),t.defaultPrevented||G(n??l().body),e.removeEventListener(ro,c),ao.remove(a)},0)})}),n(()=>{let n=t();if(!n||!R(e.trapFocus)||r())return;let i=e=>{let t=e.target;t?.closest(`[data-kb-top-layer]`)||(xt(n,t)?o=t:G(o))},a=e=>{let t=e.relatedTarget??St(n);t?.closest(`[data-kb-top-layer]`)||xt(n,t)||G(o)};l().addEventListener(`focusin`,i),l().addEventListener(`focusout`,a),C(()=>{l().removeEventListener(`focusin`,i),l().removeEventListener(`focusout`,a)})}),n(()=>{let n=t();if(!n||!R(e.trapFocus)||r())return;let i=u();n.insertAdjacentElement(`afterbegin`,i);let a=u();n.insertAdjacentElement(`beforeend`,a);function o(e){let t=f(),n=p();e.relatedTarget===t?G(n):G(t)}i.addEventListener(`focusin`,o),a.addEventListener(`focusin`,o);let s=new MutationObserver(e=>{for(let t of e)t.previousSibling===a&&(a.remove(),n.insertAdjacentElement(`beforeend`,a)),t.nextSibling===i&&(i.remove(),n.insertAdjacentElement(`afterbegin`,i))});s.observe(n,{childList:!0,subtree:!1}),C(()=>{i.removeEventListener(`focusin`,o),a.removeEventListener(`focusin`,o),i.remove(),a.remove(),s.disconnect()})})}var so=`data-live-announcer`;function co(e){n(()=>{R(e.isDisabled)||C(fo(R(e.targets),R(e.root)))})}var lo=new WeakMap,uo=[];function fo(e,t=document.body){let n=new Set(e),r=new Set,i=e=>{for(let t of e.querySelectorAll(`[${so}], [${ya}]`))n.add(t);let t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&a(e),o!==NodeFilter.FILTER_REJECT){let e=i.nextNode();for(;e!=null;)a(e),e=i.nextNode()}},a=e=>{let t=lo.get(e)??0;(e.getAttribute(`aria-hidden`)!==`true`||t!==0)&&(t===0&&e.setAttribute(`aria-hidden`,`true`),r.add(e),lo.set(e,t+1))};uo.length&&uo[uo.length-1].disconnect(),i(t);let o=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`&&t.addedNodes.length!==0&&![...n,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&(e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer===`true`)?n.add(e):e instanceof Element&&i(e)}});o.observe(t,{childList:!0,subtree:!0});let s={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return uo.push(s),()=>{o.disconnect();for(let e of r){let t=lo.get(e);if(t==null)return;t===1?(e.removeAttribute(`aria-hidden`),lo.delete(e)):lo.set(e,t-1)}s===uo[uo.length-1]?(uo.pop(),uo.length&&uo[uo.length-1].observe()):uo.splice(uo.indexOf(s),1)}}var po=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},mo=new Map,ho=e=>{n(()=>{let t=J(e.style)??{},n=J(e.properties)??[],r={};for(let n in t)r[n]=e.element.style[n];let i=mo.get(e.key);i?i.activeCount++:mo.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(let t of n)e.element.style.setProperty(t.key,t.value);C(()=>{let t=mo.get(e.key);if(t){if(t.activeCount!==1){t.activeCount--;return}mo.delete(e.key);for(let[n,r]of Object.entries(t.originalStyles))e.element.style[n]=r;for(let n of t.properties)e.element.style.removeProperty(n);e.element.style.length===0&&e.element.removeAttribute(`style`),e.cleanup?.()}})})},go=(e,t)=>{switch(t){case`x`:return[e.clientWidth,e.scrollLeft,e.scrollWidth];case`y`:return[e.clientHeight,e.scrollTop,e.scrollHeight]}},_o=(e,t)=>{let n=getComputedStyle(e),r=t===`x`?n.overflowX:n.overflowY;return r===`auto`||r===`scroll`||e.tagName===`HTML`&&r===`visible`},vo=(e,t,n)=>{let r=t===`x`&&window.getComputedStyle(e).direction===`rtl`?-1:1,i=e,a=0,o=0,s=!1;do{let[e,c,l]=go(i,t),u=l-e-r*c;(c!==0||u!==0)&&_o(i,t)&&(a+=u,o+=c),i===(n??document.documentElement)?s=!0:i=i._$host??i.parentElement}while(i&&!s);return[a,o]},[yo,bo]=S([]),xo=e=>yo().indexOf(e)===yo().length-1,So=e=>{let t=u({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:`padding`,restoreScrollPosition:!0,allowPinchZoom:!1},e),r=s(),i=[0,0],a=null,o=null;n(()=>{J(t.enabled)&&(bo(e=>[...e,r]),C(()=>{bo(e=>e.filter(e=>e!==r))}))}),n(()=>{if(!J(t.enabled)||!J(t.hideScrollbar))return;let{body:e}=document,n=window.innerWidth-e.offsetWidth;if(J(t.preventScrollbarShift)){let r={overflow:`hidden`},i=[];n>0&&(J(t.preventScrollbarShiftMode)===`padding`?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${n}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${n}px)`,i.push({key:`--scrollbar-width`,value:`${n}px`}));let a=window.scrollY,o=window.scrollX;ho({key:`prevent-scroll`,element:e,style:r,properties:i,cleanup:()=>{J(t.restoreScrollPosition)&&n>0&&window.scrollTo(o,a)}})}else ho({key:`prevent-scroll`,element:e,style:{overflow:`hidden`}})}),n(()=>{!xo(r)||!J(t.enabled)||(document.addEventListener(`wheel`,l,{passive:!1}),document.addEventListener(`touchstart`,c,{passive:!1}),document.addEventListener(`touchmove`,d,{passive:!1}),C(()=>{document.removeEventListener(`wheel`,l),document.removeEventListener(`touchstart`,c),document.removeEventListener(`touchmove`,d)}))});let c=e=>{i=wo(e),a=null,o=null},l=e=>{let n=e.target,r=J(t.element),i=Co(e),a=Math.abs(i[0])>Math.abs(i[1])?`x`:`y`,o=To(n,a,a===`x`?i[0]:i[1],r),s;s=r&&po(r,n)?!o:!0,s&&e.cancelable&&e.preventDefault()},d=e=>{let n=J(t.element),r=e.target,s;if(e.touches.length===2)s=!J(t.allowPinchZoom);else{if(a==null||o===null){let t=wo(e).map((e,t)=>i[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?`x`:`y`;a=n,o=n===`x`?t[0]:t[1]}if(r.type===`range`)s=!1;else{let e=To(r,a,o,n);s=n&&po(n,r)?!e:!0}}s&&e.cancelable&&e.preventDefault()}},Co=e=>[e.deltaX,e.deltaY],wo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],To=(e,t,n,r)=>{let[i,a]=vo(e,t,r!==null&&po(r,e)?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(a)<1)},Eo=So,Do={};fn(Do,{Description:()=>Xa,ErrorMessage:()=>to,Item:()=>Mo,ItemControl:()=>No,ItemDescription:()=>Po,ItemIndicator:()=>Fo,ItemInput:()=>Io,ItemLabel:()=>Lo,Label:()=>Ro,RadioGroup:()=>Bo,Root:()=>zo,useRadioGroupContext:()=>ko});var Oo=L();function ko(){let e=k(Oo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Ao=L();function jo(){let e=k(Ao);if(e===void 0)throw Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Mo(e){let t=Ya(),n=ko(),r=K({id:`${t.generateId(`item`)}-${s()}`},e),[i,a]=g(r,[`value`,`disabled`,`onPointerDown`]),[o,c]=S(),[l,f]=S(),[p,m]=S(),[h,_]=S(),[v,y]=S(!1),b=x(()=>n.isDefaultValue(i.value)),C=x(()=>n.isSelectedValue(i.value)),w=x(()=>i.disabled||t.isDisabled()||!1),T=e=>{U(e,i.onPointerDown),v()&&e.preventDefault()},E=x(()=>({...t.dataset(),"data-disabled":w()?``:void 0,"data-checked":C()?``:void 0})),D={value:()=>i.value,dataset:E,isDefault:b,isSelected:C,isDisabled:w,inputId:o,labelId:l,descriptionId:p,inputRef:h,select:()=>n.setSelectedValue(i.value),generateId:bt(()=>a.id),registerInput:Wa(c),registerLabel:Wa(f),registerDescription:Wa(m),setIsFocused:y,setInputRef:_};return d(Ao.Provider,{value:D,get children(){return d(q,u({as:`div`,role:`group`,onPointerDown:T},E,a))}})}function No(e){let t=jo(),n=K({id:t.generateId(`control`)},e),[r,i]=g(n,[`onClick`,`onKeyDown`]);return d(q,u({as:`div`,onClick:e=>{U(e,r.onClick),t.select(),t.inputRef()?.focus()},onKeyDown:e=>{U(e,r.onKeyDown),e.key===Et.Space&&(t.select(),t.inputRef()?.focus())}},()=>t.dataset(),i))}function Po(e){let t=jo(),r=K({id:t.generateId(`description`)},e);return n(()=>C(t.registerDescription(r.id))),d(q,u({as:`div`},()=>t.dataset(),r))}function Fo(e){let t=jo(),n=K({id:t.generateId(`indicator`)},e),[r,i]=g(n,[`ref`,`forceMount`]),[a,o]=S(),{present:s}=Ga({show:()=>r.forceMount||t.isSelected(),element:()=>a()??null});return d(h,{get when(){return s()},get children(){return d(q,u({as:`div`,ref(e){let t=H(o,r.ref);typeof t==`function`&&t(e)}},()=>t.dataset(),i))}})}function Io(e){let t=Ya(),r=ko(),i=jo(),a=K({id:i.generateId(`input`)},e),[o,s]=g(a,[`ref`,`style`,`aria-labelledby`,`aria-describedby`,`onChange`,`onFocus`,`onBlur`]),c=()=>[o[`aria-labelledby`],i.labelId(),o[`aria-labelledby`]!=null&&s[`aria-label`]!=null?s.id:void 0].filter(Boolean).join(` `)||void 0,l=()=>[o[`aria-describedby`],i.descriptionId(),r.ariaDescribedBy()].filter(Boolean).join(` `)||void 0,[f,p]=S(!1);return n(w([()=>i.isSelected(),()=>i.value()],e=>{if(!e[0]&&e[1]===i.value())return;p(!0);let t=i.inputRef();t?.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!0}))},{defer:!0})),n(()=>C(i.registerInput(s.id))),d(q,u({as:`input`,ref(e){let t=H(i.setInputRef,o.ref);typeof t==`function`&&t(e)},type:`radio`,get name(){return t.name()},get value(){return i.value()},get checked(){return i.isSelected()},get required(){return t.isRequired()},get disabled(){return i.isDisabled()},get readonly(){return t.isReadOnly()},get style(){return mt({...cn},o.style)},get"aria-labelledby"(){return c()},get"aria-describedby"(){return l()},onChange:e=>{if(U(e,o.onChange),e.stopPropagation(),!f()){r.setSelectedValue(i.value());let t=e.target;t.checked=i.isSelected()}p(!1)},onFocus:e=>{U(e,o.onFocus),i.setIsFocused(!0)},onBlur:e=>{U(e,o.onBlur),i.setIsFocused(!1)}},()=>i.dataset(),s))}function Lo(e){let t=jo(),r=K({id:t.generateId(`label`)},e);return n(()=>C(t.registerLabel(r.id))),d(q,u({as:`label`,get for(){return t.inputId()}},()=>t.dataset(),r))}function Ro(e){return d(Za,u({as:`span`},e))}function zo(e){let t,n=K({id:`radiogroup-${s()}`,orientation:`vertical`},e),[r,i,a]=g(n,[`ref`,`value`,`defaultValue`,`onChange`,`orientation`,`aria-labelledby`,`aria-describedby`],Ka),[o,c]=_n({value:()=>r.value,defaultValue:()=>r.defaultValue,onChange:e=>r.onChange?.(e)}),{formControlContext:l}=qa(i);Qa(()=>t,()=>c(r.defaultValue??``));let f=()=>l.getAriaLabelledBy(R(i.id),a[`aria-label`],r[`aria-labelledby`]),p=()=>l.getAriaDescribedBy(r[`aria-describedby`]),m=t=>t===e.defaultValue,h=e=>e===o(),_={ariaDescribedBy:p,isDefaultValue:m,isSelectedValue:h,setSelectedValue:e=>{if(!(l.isReadOnly()||l.isDisabled())&&(c(e),t))for(let e of t.querySelectorAll(`[type='radio']`)){let t=e;t.checked=h(t.value)}}};return d(Ja.Provider,{value:l,get children(){return d(Oo.Provider,{value:_,get children(){return d(q,u({as:`div`,ref(e){let n=H(e=>t=e,r.ref);typeof n==`function`&&n(e)},role:`radiogroup`,get id(){return R(i.id)},get"aria-invalid"(){return l.validationState()===`invalid`||void 0},get"aria-required"(){return l.isRequired()||void 0},get"aria-disabled"(){return l.isDisabled()||void 0},get"aria-readonly"(){return l.isReadOnly()||void 0},get"aria-orientation"(){return r.orientation},get"aria-labelledby"(){return f()},get"aria-describedby"(){return p()}},()=>l.dataset(),a))}})}})}var Bo=Object.assign(zo,{Description:Xa,ErrorMessage:to,Item:Mo,ItemControl:No,ItemDescription:Po,ItemIndicator:Fo,ItemInput:Io,ItemLabel:Lo,Label:Ro}),Vo=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight),i=e;for(;i&&n&&n.offsetTop>r;)i=this.getKeyAbove(i),n=i==null?null:this.getItem(i);return i}getKeyPageBelow(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight),i=e;for(;i&&n&&n.offsetTop<r;)i=this.getKeyBelow(i),n=i==null?null:this.getItem(i);return i}getKeyForSearch(e,t){let n=this.collator?.();if(!n)return;let r=t==null?this.getFirstKey():this.getKeyBelow(t);for(;r!=null;){let t=this.collection().getItem(r);if(t){let i=t.textValue.slice(0,e.length);if(t.textValue&&n.compare(i,e)===0)return r}r=this.getKeyBelow(r)}}};function Ho(e,t,n){let r=Fn({usage:`search`,sensitivity:`base`});return Kn({selectionManager:()=>R(e.selectionManager),keyboardDelegate:x(()=>R(e.keyboardDelegate)||new Vo(e.collection,t,r)),autoFocus:()=>R(e.autoFocus),deferAutoFocus:()=>R(e.deferAutoFocus),shouldFocusWrap:()=>R(e.shouldFocusWrap),disallowEmptySelection:()=>R(e.disallowEmptySelection),selectOnFocus:()=>R(e.selectOnFocus),disallowTypeAhead:()=>R(e.disallowTypeAhead),shouldUseVirtualFocus:()=>R(e.shouldUseVirtualFocus),allowsTabNavigation:()=>R(e.allowsTabNavigation),isVirtualized:()=>R(e.isVirtualized),scrollToKey:t=>R(e.scrollToKey)?.(t),orientation:()=>R(e.orientation)},t,n)}var Uo=L();function Wo(){return k(Uo)}var Go=L();function Ko(){return k(Go)}var qo=L();function Jo(){return k(qo)}function Yo(){let e=Jo();if(e===void 0)throw Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var Xo=L();function Zo(){let e=k(Xo);if(e===void 0)throw Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var Qo=L();function $o(){let e=k(Qo);if(e===void 0)throw Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function es(e){let t,n=$o(),r=Yo(),i=K({id:n.generateId(`item-${s()}`)},e),[a,o]=g(i,[`ref`,`textValue`,`disabled`,`closeOnSelect`,`checked`,`indeterminate`,`onSelect`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),[c,l]=S(),[f,p]=S(),[m,h]=S(),_=()=>r.listState().selectionManager(),v=()=>o.id,y=()=>_().focusedKey()===v(),b=()=>{a.onSelect?.(),a.closeOnSelect&&setTimeout(()=>{r.close(!0)})};cr({getItem:()=>({ref:()=>t,type:`item`,key:v(),textValue:a.textValue??m()?.textContent??t?.textContent??``,disabled:a.disabled??!1})});let C=qn({key:v,selectionManager:_,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>a.disabled},()=>t),w=e=>{U(e,a.onPointerMove),e.pointerType===`mouse`&&(a.disabled?r.onItemLeave(e):(r.onItemEnter(e),e.defaultPrevented||(G(e.currentTarget),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(v()))))},T=e=>{U(e,a.onPointerLeave),e.pointerType===`mouse`&&r.onItemLeave(e)},E=e=>{U(e,a.onPointerUp),!a.disabled&&e.button===0&&b()},D=e=>{if(U(e,a.onKeyDown),!e.repeat&&!a.disabled)switch(e.key){case`Enter`:case` `:b()}},O=x(()=>{if(a.indeterminate)return`mixed`;if(a.checked!=null)return a.checked}),k=x(()=>({"data-indeterminate":a.indeterminate?``:void 0,"data-checked":a.checked&&!a.indeterminate?``:void 0,"data-disabled":a.disabled?``:void 0,"data-highlighted":y()?``:void 0})),A={isChecked:()=>a.checked,dataset:k,setLabelRef:h,generateId:bt(()=>o.id),registerLabel:Wa(l),registerDescription:Wa(p)};return d(Xo.Provider,{value:A,get children(){return d(q,u({as:`div`,ref(e){let n=H(e=>t=e,a.ref);typeof n==`function`&&n(e)},get tabIndex(){return C.tabIndex()},get"aria-checked"(){return O()},get"aria-disabled"(){return a.disabled},get"aria-labelledby"(){return c()},get"aria-describedby"(){return f()},get"data-key"(){return C.dataKey()},get onPointerDown(){return W([a.onPointerDown,C.onPointerDown])},get onPointerUp(){return W([E,C.onPointerUp])},get onClick(){return W([a.onClick,C.onClick])},get onKeyDown(){return W([D,C.onKeyDown])},get onMouseDown(){return W([a.onMouseDown,C.onMouseDown])},get onFocus(){return W([a.onFocus,C.onFocus])},onPointerMove:w,onPointerLeave:T},k,o))}})}function ts(e){let t=K({closeOnSelect:!1},e),[n,r]=g(t,[`checked`,`defaultChecked`,`onChange`,`onSelect`]),i=bn({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:e=>n.onChange?.(e),isDisabled:()=>r.disabled});return d(es,u({role:`menuitemcheckbox`,get checked(){return i.isSelected()},onSelect:()=>{n.onSelect?.(),i.toggle()}},r))}var ns={next:(e,t)=>e===`ltr`?t===`horizontal`?`ArrowRight`:`ArrowDown`:t===`horizontal`?`ArrowLeft`:`ArrowUp`,previous:(e,t)=>ns.next(e===`ltr`?`rtl`:`ltr`,t)},rs={first:e=>e===`horizontal`?`ArrowDown`:`ArrowRight`,last:e=>e===`horizontal`?`ArrowUp`:`ArrowLeft`};function is(e){let t=$o(),i=Yo(),a=Wo(),{direction:o}=Nn(),s=K({id:t.generateId(`trigger`)},e),[c,l]=g(s,[`ref`,`id`,`disabled`,`onPointerDown`,`onClick`,`onKeyDown`,`onMouseOver`,`onFocus`]),f=()=>t.value();a!==void 0&&(f=()=>t.value()??c.id,a.lastValue()===void 0&&a.setLastValue(f));let p=ln(()=>i.triggerRef(),()=>`button`),m=x(()=>p()===`a`&&i.triggerRef()?.getAttribute(`href`)!=null);n(w(()=>a?.value(),e=>{m()&&e===f()&&i.triggerRef()?.focus()}));let h=()=>{a===void 0?i.toggle(!0):i.isOpen()?a.value()===f()&&a.closeMenu():(a.autoFocusMenu()||a.setAutoFocusMenu(!0),i.open(!1))};return n(()=>C(i.registerTriggerId(c.id))),d(hn,u({ref(e){let t=H(i.setTriggerRef,c.ref);typeof t==`function`&&t(e)},get"data-kb-menu-value-trigger"(){return t.value()},get id(){return c.id},get disabled(){return c.disabled},"aria-haspopup":`true`,get"aria-expanded"(){return i.isOpen()},get"aria-controls"(){return r(()=>!!i.isOpen())()?i.contentId():void 0},get"data-highlighted"(){return f()!==void 0&&a?.value()===f()||void 0},get tabIndex(){return a===void 0?void 0:a.value()===f()||a.lastValue()===f()?0:-1},onPointerDown:e=>{U(e,c.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,!c.disabled&&e.pointerType!==`touch`&&e.button===0&&h()},onMouseOver:e=>{U(e,c.onMouseOver),i.triggerRef()?.dataset.pointerType!==`touch`&&!c.disabled&&a!==void 0&&a.value()!==void 0&&a.setValue(f)},onClick:e=>{U(e,c.onClick),c.disabled||e.currentTarget.dataset.pointerType===`touch`&&h()},onKeyDown:e=>{if(U(e,c.onKeyDown),!c.disabled){if(m())switch(e.key){case`Enter`:case` `:return}switch(e.key){case`Enter`:case` `:case rs.first(t.orientation()):e.stopPropagation(),e.preventDefault(),sn(e.currentTarget),i.open(`first`),a?.setAutoFocusMenu(!0),a?.setValue(f);break;case rs.last(t.orientation()):e.stopPropagation(),e.preventDefault(),i.open(`last`);break;case ns.next(o(),t.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.nextMenu();break;case ns.previous(o(),t.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.previousMenu()}}},onFocus:e=>{U(e,c.onFocus),a!==void 0&&e.currentTarget.dataset.pointerType!==`touch`&&a.setValue(f)},role:a===void 0?void 0:`menuitem`},()=>i.dataset(),l))}function as(e){let t,i=$o(),a=Yo(),o=Wo(),c=Ko(),{direction:l}=Nn(),f=K({id:i.generateId(`content-${s()}`)},e),[p,m]=g(f,[`ref`,`id`,`style`,`onOpenAutoFocus`,`onCloseAutoFocus`,`onEscapeKeyDown`,`onFocusOutside`,`onPointerEnter`,`onPointerMove`,`onKeyDown`,`onMouseDown`,`onFocusIn`,`onFocusOut`]),_=0,v=()=>a.parentMenuContext()==null&&o===void 0&&i.isModal(),y=Ho({selectionManager:a.listState().selectionManager,collection:a.listState().collection,autoFocus:a.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!a.listState().selectionManager().isFocused(),orientation:()=>i.orientation()===`horizontal`?`vertical`:`horizontal`},()=>t);oo({trapFocus:()=>v()&&a.isOpen(),onMountAutoFocus:e=>{o===void 0&&p.onOpenAutoFocus?.(e)},onUnmountAutoFocus:p.onCloseAutoFocus},()=>t);let b=e=>{if(xt(e.currentTarget,e.target)&&(e.key===`Tab`&&a.isOpen()&&e.preventDefault(),o!==void 0&&e.currentTarget.getAttribute(`aria-haspopup`)!==`true`))switch(e.key){case ns.next(l(),i.orientation()):e.stopPropagation(),e.preventDefault(),a.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case ns.previous(l(),i.orientation()):if(e.currentTarget.hasAttribute(`data-closed`))break;e.stopPropagation(),e.preventDefault(),a.close(!0),o.setAutoFocusMenu(!0),o.previousMenu();break}},x=e=>{p.onEscapeKeyDown?.(e),o?.setAutoFocusMenu(!1),a.close(!0)},S=e=>{p.onFocusOutside?.(e),i.isModal()&&e.preventDefault()},w=e=>{U(e,p.onPointerEnter),a.isOpen()&&(a.parentMenuContext()?.listState().selectionManager().setFocused(!1),a.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},T=e=>{if(U(e,p.onPointerMove),e.pointerType!==`mouse`)return;let t=e.target,n=_!==e.clientX;xt(e.currentTarget,t)&&n&&(a.setPointerDir(e.clientX>_?`right`:`left`),_=e.clientX)};n(()=>C(a.registerContentId(p.id))),C(()=>a.setContentRef(void 0));let E={ref:H(e=>{a.setContentRef(e),t=e},p.ref),role:`menu`,get id(){return p.id},get tabIndex(){return y.tabIndex()},get"aria-labelledby"(){return a.triggerId()},onKeyDown:W([p.onKeyDown,y.onKeyDown,b]),onMouseDown:W([p.onMouseDown,y.onMouseDown]),onFocusIn:W([p.onFocusIn,y.onFocusIn]),onFocusOut:W([p.onFocusOut,y.onFocusOut]),onPointerEnter:w,onPointerMove:T,get"data-orientation"(){return i.orientation()}};return d(h,{get when(){return a.contentPresent()},get children(){return d(h,{get when(){return c===void 0||a.parentMenuContext()!=null},get fallback(){return d(q,u({as:`div`},()=>a.dataset(),E,m))},get children(){return d(va.Positioner,{get children(){return d(Ha,u({get disableOutsidePointerEvents(){return r(()=>!!v())()&&a.isOpen()},get excludedElements(){return[a.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return mt({"--kb-menu-content-transform-origin":`var(--kb-popper-content-transform-origin)`,position:`relative`},p.style)},onEscapeKeyDown:x,onFocusOutside:S,get onDismiss(){return a.close}},()=>a.dataset(),E,m))}})}})}})}function os(e){let t,n=$o(),r=Yo(),[i,a]=g(e,[`ref`]);return Eo({element:()=>t??null,enabled:()=>r.contentPresent()&&n.preventScroll()}),d(as,u({ref(e){let n=H(e=>{t=e},i.ref);typeof n==`function`&&n(e)}},a))}var ss=L();function cs(){let e=k(ss);if(e===void 0)throw Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function ls(e){let t=K({id:$o().generateId(`group-${s()}`)},e),[n,r]=S(),i={generateId:bt(()=>t.id),registerLabelId:Wa(r)};return d(ss.Provider,{value:i,get children(){return d(q,u({as:`div`,role:`group`,get"aria-labelledby"(){return n()}},t))}})}function us(e){let t=cs(),r=K({id:t.generateId(`label`)},e),[i,a]=g(r,[`id`]);return n(()=>C(t.registerLabelId(i.id))),d(q,u({as:`span`,get id(){return i.id},"aria-hidden":`true`},a))}function ds(e){let t=Yo(),n=K({children:`▼`},e);return d(q,u({as:`span`,"aria-hidden":`true`},()=>t.dataset(),n))}function fs(e){return d(es,u({role:`menuitem`,closeOnSelect:!0},e))}function ps(e){let t=Zo(),r=K({id:t.generateId(`description`)},e),[i,a]=g(r,[`id`]);return n(()=>C(t.registerDescription(i.id))),d(q,u({as:`div`,get id(){return i.id}},()=>t.dataset(),a))}function ms(e){let t=Zo(),n=K({id:t.generateId(`indicator`)},e),[r,i]=g(n,[`forceMount`]);return d(h,{get when(){return r.forceMount||t.isChecked()},get children(){return d(q,u({as:`div`},()=>t.dataset(),i))}})}function hs(e){let t=Zo(),r=K({id:t.generateId(`label`)},e),[i,a]=g(r,[`ref`,`id`]);return n(()=>C(t.registerLabel(i.id))),d(q,u({as:`div`,ref(e){let n=H(t.setLabelRef,i.ref);typeof n==`function`&&n(e)},get id(){return i.id}},()=>t.dataset(),a))}function gs(e){let t=Yo();return d(h,{get when(){return t.contentPresent()},get children(){return d(E,e)}})}var _s=L();function vs(){let e=k(_s);if(e===void 0)throw Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function ys(e){let t=K({id:$o().generateId(`radiogroup-${s()}`)},e),[n,r]=g(t,[`value`,`defaultValue`,`onChange`,`disabled`]),[i,a]=_n({value:()=>n.value,defaultValue:()=>n.defaultValue,onChange:e=>n.onChange?.(e)});return d(_s.Provider,{value:{isDisabled:()=>n.disabled,isSelectedValue:e=>e===i(),setSelectedValue:e=>a(e)},get children(){return d(ls,r)}})}function bs(e){let t=vs(),n=K({closeOnSelect:!1},e),[r,i]=g(n,[`value`,`onSelect`]);return d(es,u({role:`menuitemradio`,get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{r.onSelect?.(),t.setSelectedValue(r.value)}},i))}function xs(e,t,n){let r=e.split(`-`)[0],i=n.getBoundingClientRect(),a=[],o=t.clientX,s=t.clientY;switch(r){case`top`:a.push([o,s+5]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]);break;case`right`:a.push([o-5,s]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]);break;case`bottom`:a.push([o,s-5]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]);break;case`left`:a.push([o+5,s]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top])}return a}function Ss(e,t){return t?en([e.clientX,e.clientY],t):!1}function Cs(e){let t=$o(),r=Qn(),i=Jo(),a=Wo(),o=Ko(),s=K({placement:t.orientation()===`horizontal`?`bottom-start`:`right-start`},e),[c,l]=g(s,[`open`,`defaultOpen`,`onOpenChange`]),f=0,p=null,m=`right`,[_,v]=S(),[y,b]=S(),[w,T]=S(),[E,D]=S(),[O,k]=S(!0),[A,j]=S(l.placement),[M,N]=S([]),[ee,te]=S([]),{DomCollectionProvider:ne}=sr({items:ee,onItemsChange:te}),P=Ua({open:()=>c.open,defaultOpen:()=>c.defaultOpen,onOpenChange:e=>c.onOpenChange?.(e)}),{present:re}=Ga({show:()=>t.forceMount()||P.isOpen(),element:()=>E()??null}),ie=Xn({selectionMode:`none`,dataSource:ee}),ae=e=>{k(e),P.open()},oe=(e=!1)=>{P.close(),e&&i&&i.close(!0)},se=e=>{k(e),P.toggle()},F=()=>{let e=E();e&&(G(e),ie.selectionManager().setFocused(!0),ie.selectionManager().setFocusedKey(void 0))},ce=()=>{o==null?F():setTimeout(()=>F())},le=e=>{N(t=>[...t,e]);let t=i?.registerNestedMenu(e);return()=>{N(t=>gt(t,e)),t?.()}},ue=e=>m===p?.side&&Ss(e,p?.area),de=e=>{ue(e)&&e.preventDefault()},I=e=>{ue(e)||ce()},L=e=>{ue(e)&&e.preventDefault()};co({isDisabled:()=>!(i==null&&P.isOpen()&&t.isModal()),targets:()=>[E(),...M()].filter(Boolean)}),n(()=>{let e=E();if(!e||!i)return;let t=i.registerNestedMenu(e);C(()=>{t()})}),n(()=>{i===void 0&&a?.registerMenu(t.value(),[E(),...M()])}),n(()=>{i===void 0&&a!==void 0&&(a.value()===t.value()?(w()?.focus(),a.autoFocusMenu()&&ae(!0)):oe())}),n(()=>{i===void 0&&a!==void 0&&P.isOpen()&&a.setValue(t.value())}),C(()=>{i===void 0&&a?.unregisterMenu(t.value())});let fe={dataset:x(()=>({"data-expanded":P.isOpen()?``:void 0,"data-closed":P.isOpen()?void 0:``})),isOpen:P.isOpen,contentPresent:re,nestedMenus:M,currentPlacement:A,pointerGraceTimeoutId:()=>f,autoFocus:O,listState:()=>ie,parentMenuContext:()=>i,triggerRef:w,contentRef:E,triggerId:_,contentId:y,setTriggerRef:T,setContentRef:D,open:ae,close:oe,toggle:se,focusContent:ce,onItemEnter:de,onItemLeave:I,onTriggerLeave:L,setPointerDir:e=>m=e,setPointerGraceTimeoutId:e=>f=e,setPointerGraceIntent:e=>p=e,registerNestedMenu:le,registerItemToParentDomCollection:r?.registerItem,registerTriggerId:Wa(v),registerContentId:Wa(b)};return d(ne,{get children(){return d(qo.Provider,{value:fe,get children(){return d(h,{when:o===void 0,get fallback(){return l.children},get children(){return d(va,u({anchorRef:w,contentRef:E,onCurrentPlacementChange:j},l))}})}})}})}function ws(e){let{direction:t}=Nn();return d(Cs,u({get placement(){return t()===`rtl`?`left-start`:`right-start`},flip:!0},e))}var Ts={close:(e,t)=>e===`ltr`?[t===`horizontal`?`ArrowLeft`:`ArrowUp`]:[t===`horizontal`?`ArrowRight`:`ArrowDown`]};function Es(e){let t=Yo(),n=$o(),[r,i]=g(e,[`onFocusOutside`,`onKeyDown`]),{direction:a}=Nn();return d(as,u({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{r.onFocusOutside?.(e);let n=e.target;xt(t.triggerRef(),n)||t.close()},onKeyDown:e=>{U(e,r.onKeyDown);let i=xt(e.currentTarget,e.target),o=Ts.close(a(),n.orientation()).includes(e.key),s=t.parentMenuContext()!=null;i&&o&&s&&(t.close(),G(t.triggerRef()))}},i))}var Ds=[`Enter`,` `],Os={open:(e,t)=>e===`ltr`?[...Ds,t===`horizontal`?`ArrowRight`:`ArrowDown`]:[...Ds,t===`horizontal`?`ArrowLeft`:`ArrowUp`]};function ks(e){let t,i=$o(),a=Yo(),o=K({id:i.generateId(`sub-trigger-${s()}`)},e),[c,l]=g(o,[`ref`,`id`,`textValue`,`disabled`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),f=null,p=()=>{f&&window.clearTimeout(f),f=null},{direction:m}=Nn(),h=()=>c.id,_=()=>{let e=a.parentMenuContext();if(e==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},v=()=>a.listState().collection(),y=()=>_().focusedKey()===h(),b=qn({key:h,selectionManager:_,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>c.disabled},()=>t),x=e=>{U(e,c.onClick),!a.isOpen()&&!c.disabled&&a.open(!0)},S=e=>{if(U(e,c.onPointerMove),e.pointerType!==`mouse`)return;let t=a.parentMenuContext();if(t?.onItemEnter(e),!e.defaultPrevented){if(c.disabled){t?.onItemLeave(e);return}!a.isOpen()&&!f&&(a.parentMenuContext()?.setPointerGraceIntent(null),f=window.setTimeout(()=>{a.open(!1),p()},100)),t?.onItemEnter(e),e.defaultPrevented||(a.listState().selectionManager().isFocused()&&(a.listState().selectionManager().setFocused(!1),a.listState().selectionManager().setFocusedKey(void 0)),G(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(h()))}},T=e=>{if(U(e,c.onPointerLeave),e.pointerType!==`mouse`)return;p();let t=a.parentMenuContext(),n=a.contentRef();if(n){t?.setPointerGraceIntent({area:xs(a.currentPlacement(),e,n),side:a.currentPlacement().split(`-`)[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());let r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)},E=e=>{U(e,c.onKeyDown),!e.repeat&&(c.disabled||Os.open(m(),i.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),_().setFocused(!1),_().setFocusedKey(void 0),a.isOpen()||a.open(`first`),a.focusContent(),a.listState().selectionManager().setFocused(!0),a.listState().selectionManager().setFocusedKey(v().getFirstKey())))};return n(()=>{if(a.registerItemToParentDomCollection==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");let e=a.registerItemToParentDomCollection({ref:()=>t,type:`item`,key:h(),textValue:c.textValue??t?.textContent??``,disabled:c.disabled??!1});C(e)}),n(w(()=>a.parentMenuContext()?.pointerGraceTimeoutId(),e=>{C(()=>{window.clearTimeout(e),a.parentMenuContext()?.setPointerGraceIntent(null)})})),n(()=>C(a.registerTriggerId(c.id))),C(()=>{p()}),d(q,u({as:`div`,ref(e){let n=H(e=>{a.setTriggerRef(e),t=e},c.ref);typeof n==`function`&&n(e)},get id(){return c.id},role:`menuitem`,get tabIndex(){return b.tabIndex()},"aria-haspopup":`true`,get"aria-expanded"(){return a.isOpen()},get"aria-controls"(){return r(()=>!!a.isOpen())()?a.contentId():void 0},get"aria-disabled"(){return c.disabled},get"data-key"(){return b.dataKey()},get"data-highlighted"(){return y()?``:void 0},get"data-disabled"(){return c.disabled?``:void 0},get onPointerDown(){return W([c.onPointerDown,b.onPointerDown])},get onPointerUp(){return W([c.onPointerUp,b.onPointerUp])},get onClick(){return W([x,b.onClick])},get onKeyDown(){return W([E,b.onKeyDown])},get onMouseDown(){return W([c.onMouseDown,b.onMouseDown])},get onFocus(){return W([c.onFocus,b.onFocus])},onPointerMove:S,onPointerLeave:T},()=>a.dataset(),l))}function As(e){let t=Wo(),n=K({id:`menu-${s()}`,modal:!0},e),[r,i]=g(n,[`id`,`modal`,`preventScroll`,`forceMount`,`open`,`defaultOpen`,`onOpenChange`,`value`,`orientation`]),a=Ua({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:e=>r.onOpenChange?.(e)}),o={isModal:()=>r.modal??!0,preventScroll:()=>r.preventScroll??o.isModal(),forceMount:()=>r.forceMount??!1,generateId:bt(()=>r.id),value:()=>r.value,orientation:()=>r.orientation??t?.orientation()??`horizontal`};return d(Qo.Provider,{value:o,get children(){return d(Cs,u({get open(){return a.isOpen()},get onOpenChange(){return a.setIsOpen}},i))}})}fn({},{Root:()=>js,Separator:()=>Ms});function js(e){let t,n=K({orientation:`horizontal`},e),[r,i]=g(n,[`ref`,`orientation`]),a=ln(()=>t,()=>`hr`);return d(q,u({as:`hr`,ref(e){let n=H(e=>t=e,r.ref);typeof n==`function`&&n(e)},get role(){return a()===`hr`?void 0:`separator`},get"aria-orientation"(){return r.orientation===`vertical`?`vertical`:void 0},get"data-orientation"(){return r.orientation}},i))}var Ms=js,Y={};fn(Y,{Arrow:()=>la,CheckboxItem:()=>ts,Content:()=>Ns,DropdownMenu:()=>Fs,Group:()=>ls,GroupLabel:()=>us,Icon:()=>ds,Item:()=>fs,ItemDescription:()=>ps,ItemIndicator:()=>ms,ItemLabel:()=>hs,Portal:()=>gs,RadioGroup:()=>ys,RadioItem:()=>bs,Root:()=>Ps,Separator:()=>js,Sub:()=>ws,SubContent:()=>Es,SubTrigger:()=>ks,Trigger:()=>is});function Ns(e){let t=$o(),n=Yo(),[r,i]=g(e,[`onCloseAutoFocus`,`onInteractOutside`]),a=!1;return d(os,u({onCloseAutoFocus:e=>{r.onCloseAutoFocus?.(e),a||G(n.triggerRef()),a=!1,e.preventDefault()},onInteractOutside:e=>{r.onInteractOutside?.(e),(!t.isModal()||e.detail.isContextMenu)&&(a=!0)}},i))}function Ps(e){let t=K({id:`dropdownmenu-${s()}`},e);return d(As,t)}var Fs=Object.assign(Ps,{Arrow:la,CheckboxItem:ts,Content:Ns,Group:ls,GroupLabel:us,Icon:ds,Item:fs,ItemDescription:ps,ItemIndicator:ms,ItemLabel:hs,Portal:gs,RadioGroup:ys,RadioItem:bs,Separator:js,Sub:ws,SubContent:Es,SubTrigger:ks,Trigger:is});const X={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsqd-font-size) * 0.625)`,xs:`calc(var(--tsqd-font-size) * 0.75)`,sm:`calc(var(--tsqd-font-size) * 0.875)`,md:`var(--tsqd-font-size)`,lg:`calc(var(--tsqd-font-size) * 1.125)`,xl:`calc(var(--tsqd-font-size) * 1.25)`,"2xl":`calc(var(--tsqd-font-size) * 1.5)`,"3xl":`calc(var(--tsqd-font-size) * 1.875)`,"4xl":`calc(var(--tsqd-font-size) * 2.25)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.75)`,"7xl":`calc(var(--tsqd-font-size) * 4.5)`,"8xl":`calc(var(--tsqd-font-size) * 6)`,"9xl":`calc(var(--tsqd-font-size) * 8)`},lineHeight:{xs:`calc(var(--tsqd-font-size) * 1)`,sm:`calc(var(--tsqd-font-size) * 1.25)`,md:`calc(var(--tsqd-font-size) * 1.5)`,lg:`calc(var(--tsqd-font-size) * 1.75)`,xl:`calc(var(--tsqd-font-size) * 2)`,"2xl":`calc(var(--tsqd-font-size) * 2.25)`,"3xl":`calc(var(--tsqd-font-size) * 2.5)`,"4xl":`calc(var(--tsqd-font-size) * 2.75)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.25)`,"7xl":`calc(var(--tsqd-font-size) * 3.5)`,"8xl":`calc(var(--tsqd-font-size) * 3.75)`,"9xl":`calc(var(--tsqd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsqd-font-size) * 0.125)`,sm:`calc(var(--tsqd-font-size) * 0.25)`,md:`calc(var(--tsqd-font-size) * 0.375)`,lg:`calc(var(--tsqd-font-size) * 0.5)`,xl:`calc(var(--tsqd-font-size) * 0.75)`,"2xl":`calc(var(--tsqd-font-size) * 1)`,"3xl":`calc(var(--tsqd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsqd-font-size) * 0.0625)`,.5:`calc(var(--tsqd-font-size) * 0.125)`,1:`calc(var(--tsqd-font-size) * 0.25)`,1.5:`calc(var(--tsqd-font-size) * 0.375)`,2:`calc(var(--tsqd-font-size) * 0.5)`,2.5:`calc(var(--tsqd-font-size) * 0.625)`,3:`calc(var(--tsqd-font-size) * 0.75)`,3.5:`calc(var(--tsqd-font-size) * 0.875)`,4:`calc(var(--tsqd-font-size) * 1)`,4.5:`calc(var(--tsqd-font-size) * 1.125)`,5:`calc(var(--tsqd-font-size) * 1.25)`,5.5:`calc(var(--tsqd-font-size) * 1.375)`,6:`calc(var(--tsqd-font-size) * 1.5)`,6.5:`calc(var(--tsqd-font-size) * 1.625)`,7:`calc(var(--tsqd-font-size) * 1.75)`,8:`calc(var(--tsqd-font-size) * 2)`,9:`calc(var(--tsqd-font-size) * 2.25)`,10:`calc(var(--tsqd-font-size) * 2.5)`,11:`calc(var(--tsqd-font-size) * 2.75)`,12:`calc(var(--tsqd-font-size) * 3)`,14:`calc(var(--tsqd-font-size) * 3.5)`,16:`calc(var(--tsqd-font-size) * 4)`,20:`calc(var(--tsqd-font-size) * 5)`,24:`calc(var(--tsqd-font-size) * 6)`,28:`calc(var(--tsqd-font-size) * 7)`,32:`calc(var(--tsqd-font-size) * 8)`,36:`calc(var(--tsqd-font-size) * 9)`,40:`calc(var(--tsqd-font-size) * 10)`,44:`calc(var(--tsqd-font-size) * 11)`,48:`calc(var(--tsqd-font-size) * 12)`,52:`calc(var(--tsqd-font-size) * 13)`,56:`calc(var(--tsqd-font-size) * 14)`,60:`calc(var(--tsqd-font-size) * 15)`,64:`calc(var(--tsqd-font-size) * 16)`,72:`calc(var(--tsqd-font-size) * 18)`,80:`calc(var(--tsqd-font-size) * 20)`,96:`calc(var(--tsqd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}};var Is=m(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Ls=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Rs=m(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),zs=m(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Bs=m(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Vs=m(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Hs=m(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(-90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Us=m(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ws=m(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Gs=m(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ks=m(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`),qs=m(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`),Js=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ys=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Xs=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`),Zs=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Qs=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),$s=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),ec=m(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`),tc=m(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),nc=m(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),rc=m(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`),ic=m(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),ac=m(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),oc=m(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);function sc(){return Is()}function cc(){return Ls()}function lc(){return Rs()}function uc(){return zs()}function dc(){return Bs()}function fc(){return Vs()}function pc(){return Hs()}function mc(){return Us()}function hc(){return Ws()}function gc(){return Gs()}function _c(){return Ks()}function vc(){return qs()}function yc(){return Js()}function bc(){return Ys()}function xc(){return Xs()}function Sc(){return Zs()}function Cc(e){return(()=>{var t=Qs(),n=t.firstChild;return c(()=>y(n,`stroke`,e.theme===`dark`?`#12B76A`:`#027A48`)),t})()}function wc(){return $s()}function Tc(){return ec()}function Ec(e){return[d(h,{get when(){return e.checked},get children(){var t=Qs(),n=t.firstChild;return c(()=>y(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}}),d(h,{get when(){return!e.checked},get children(){var t=tc(),n=t.firstChild;return c(()=>y(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}})]}function Dc(){return nc()}function Oc(){return rc()}function kc(){return ic()}function Ac(){return ac()}function jc(){let e=s();return(()=>{var t=oc(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=i.firstChild,o=i.nextSibling,s=o.firstChild,c=o.nextSibling,l=c.nextSibling,u=l.firstChild,d=l.nextSibling,f=d.firstChild,p=d.nextSibling,m=p.nextSibling,h=m.firstChild,g=m.nextSibling,_=g.firstChild,v=g.nextSibling,b=v.nextSibling,x=b.firstChild,S=b.nextSibling,C=S.firstChild,w=S.nextSibling,T=w.nextSibling,E=T.firstChild,D=T.nextSibling,O=D.firstChild,k=D.nextSibling,A=k.nextSibling,j=A.firstChild,M=A.nextSibling,N=M.firstChild,ee=M.nextSibling,te=ee.nextSibling,ne=te.firstChild,P=te.nextSibling,re=P.firstChild,ie=P.nextSibling,ae=ie.firstChild.nextSibling.nextSibling.nextSibling,oe=ae.nextSibling,se=ie.nextSibling,F=se.firstChild,ce=se.nextSibling,le=ce.firstChild,ue=ce.nextSibling,de=ue.firstChild,I=de.nextSibling,L=I.nextSibling.firstChild,fe=L.nextSibling,pe=fe.nextSibling,me=pe.nextSibling,R=me.nextSibling,he=R.nextSibling,ge=he.nextSibling,_e=ge.nextSibling,ve=_e.nextSibling,ye=ve.nextSibling,be=ye.nextSibling,xe=be.nextSibling,Se=ue.nextSibling,Ce=Se.firstChild,we=Se.nextSibling,Te=we.firstChild,Ee=we.nextSibling,De=Ee.firstChild,z=De.nextSibling,Oe=Ee.nextSibling,ke=Oe.firstChild,Ae=Oe.nextSibling,je=Ae.firstChild,Me=Ae.nextSibling,Ne=Me.firstChild,Pe=Ne.nextSibling,Fe=Pe.nextSibling,Ie=Fe.nextSibling,Le=Ie.nextSibling,Re=Le.nextSibling,ze=Re.nextSibling,Be=ze.nextSibling,Ve=Be.nextSibling,He=Ve.nextSibling,Ue=He.nextSibling,We=Ue.nextSibling,Ge=We.nextSibling,Ke=Ge.nextSibling,B=Ke.nextSibling,qe=B.nextSibling,V=qe.nextSibling,Je=V.nextSibling;return y(n,`id`,`a-${e}`),y(r,`fill`,`url(#a-${e})`),y(a,`id`,`am-${e}`),y(o,`id`,`b-${e}`),y(s,`filter`,`url(#am-${e})`),y(c,`mask`,`url(#b-${e})`),y(u,`id`,`ah-${e}`),y(d,`id`,`k-${e}`),y(f,`filter`,`url(#ah-${e})`),y(p,`mask`,`url(#k-${e})`),y(h,`id`,`ae-${e}`),y(g,`id`,`j-${e}`),y(_,`filter`,`url(#ae-${e})`),y(v,`mask`,`url(#j-${e})`),y(x,`id`,`ai-${e}`),y(S,`id`,`i-${e}`),y(C,`filter`,`url(#ai-${e})`),y(w,`mask`,`url(#i-${e})`),y(E,`id`,`aj-${e}`),y(D,`id`,`h-${e}`),y(O,`filter`,`url(#aj-${e})`),y(k,`mask`,`url(#h-${e})`),y(j,`id`,`ag-${e}`),y(M,`id`,`g-${e}`),y(N,`filter`,`url(#ag-${e})`),y(ee,`mask`,`url(#g-${e})`),y(ne,`id`,`af-${e}`),y(P,`id`,`f-${e}`),y(re,`filter`,`url(#af-${e})`),y(ie,`mask`,`url(#f-${e})`),y(ae,`id`,`m-${e}`),y(oe,`fill`,`url(#m-${e})`),y(F,`id`,`ak-${e}`),y(ce,`id`,`e-${e}`),y(le,`filter`,`url(#ak-${e})`),y(ue,`mask`,`url(#e-${e})`),y(de,`id`,`n-${e}`),y(I,`fill`,`url(#n-${e})`),y(L,`id`,`r-${e}`),y(fe,`fill`,`url(#r-${e})`),y(pe,`id`,`s-${e}`),y(me,`fill`,`url(#s-${e})`),y(R,`id`,`q-${e}`),y(he,`fill`,`url(#q-${e})`),y(ge,`id`,`p-${e}`),y(_e,`fill`,`url(#p-${e})`),y(ve,`id`,`o-${e}`),y(ye,`fill`,`url(#o-${e})`),y(be,`id`,`l-${e}`),y(xe,`fill`,`url(#l-${e})`),y(Ce,`id`,`al-${e}`),y(we,`id`,`d-${e}`),y(Te,`filter`,`url(#al-${e})`),y(Ee,`mask`,`url(#d-${e})`),y(De,`id`,`u-${e}`),y(z,`fill`,`url(#u-${e})`),y(ke,`id`,`ad-${e}`),y(Ae,`id`,`c-${e}`),y(je,`filter`,`url(#ad-${e})`),y(Me,`mask`,`url(#c-${e})`),y(Ne,`id`,`t-${e}`),y(Pe,`fill`,`url(#t-${e})`),y(Fe,`id`,`v-${e}`),y(Ie,`stroke`,`url(#v-${e})`),y(Le,`id`,`aa-${e}`),y(Re,`stroke`,`url(#aa-${e})`),y(ze,`id`,`w-${e}`),y(Be,`stroke`,`url(#w-${e})`),y(Ve,`id`,`ac-${e}`),y(He,`stroke`,`url(#ac-${e})`),y(Ue,`id`,`ab-${e}`),y(We,`stroke`,`url(#ab-${e})`),y(Ge,`id`,`y-${e}`),y(Ke,`stroke`,`url(#y-${e})`),y(B,`id`,`x-${e}`),y(qe,`stroke`,`url(#x-${e})`),y(V,`id`,`z-${e}`),y(Je,`stroke`,`url(#z-${e})`),t})()}const Mc=`system`,Nc=Object.keys(A)[0],Pc=Object.keys(le)[0],Fc=L({client:void 0,onlineManager:void 0,queryFlavor:``,version:``,shadowDOMTarget:void 0});function Z(){return k(Fc)}var Ic=class extends Error{};const Lc=L(void 0),Rc=e=>{let[t,r]=S(null),i=()=>{let n=t();n!=null&&(n.close(),e.setLocalStore(`pip_open`,`false`),r(null))},a=(n,i)=>{if(t()!=null)return;let a=window.open(``,`TSQD-Devtools-Panel`,`width=${n},height=${i},popup`);if(!a)throw new Ic(`Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.`);a.document.head.innerHTML=``,a.document.body.innerHTML=``,D(a.document),a.document.title=`TanStack Query Devtools`,a.document.body.style.margin=`0`,a.addEventListener(`pagehide`,()=>{e.setLocalStore(`pip_open`,`false`),r(null)}),[...(Z().shadowDOMTarget||document).styleSheets].forEach(e=>{try{let t=[...e.cssRules].map(e=>e.cssText).join(``),n=document.createElement(`style`),r=e.ownerNode,i=``;r&&`id`in r&&(i=r.id),i&&n.setAttribute(`id`,i),n.textContent=t,a.document.head.appendChild(n)}catch{let t=document.createElement(`link`);if(e.href==null)return;t.rel=`stylesheet`,t.type=e.type,t.media=e.media.toString(),t.href=e.href,a.document.head.appendChild(t)}}),de([`focusin`,`focusout`,`pointermove`,`keydown`,`pointerdown`,`pointerup`,`click`,`mousedown`,`input`],a.document),e.setLocalStore(`pip_open`,`true`),r(a)};n(()=>{if((e.localStore.pip_open??`false`)===`true`&&!e.disabled)try{a(Number(window.innerWidth),Number(e.localStore.height||500))}catch(t){if(t instanceof Ic){e.setLocalStore(`pip_open`,`false`),e.setLocalStore(`open`,`false`);return}throw t}}),n(()=>{let e=(Z().shadowDOMTarget||document).querySelector(`#_goober`),n=t();if(e&&n){let t=new MutationObserver(()=>{let t=(Z().shadowDOMTarget||n.document).querySelector(`#_goober`);t&&(t.textContent=e.textContent)});t.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),C(()=>{t.disconnect()})}});let o=x(()=>({pipWindow:t(),requestPipWindow:a,closePipWindow:i,disabled:e.disabled??!1}));return d(Lc.Provider,{value:o,get children(){return e.children}})},zc=()=>x(()=>{let e=k(Lc);if(!e)throw Error(`usePiPWindow must be used within a PiPProvider`);return e()}),Bc=L(()=>`dark`);function Q(){return k(Bc)}var Vc=m(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Hc=m(`<button title="Copy object to clipboard">`),Uc=m(`<button title="Remove all items"aria-label="Remove all items">`),Wc=m(`<button title="Delete item"aria-label="Delete item">`),Gc=m(`<button title="Toggle value"aria-label="Toggle value">`),Kc=m(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`),qc=m(`<div>`),Jc=m(`<div><button> <span></span> <span> `),Yc=m(`<input>`),Xc=m(`<span>`),Zc=m(`<div><label>:`),Qc=m(`<div><div><button> [<!>...<!>]`);function $c(e,t){if(t<1)return[];let n=0,r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}const el=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?ll(n):cl(n));return(()=>{var t=Vc();return c(()=>I(t,V(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),t})()},tl=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?ll(n):cl(n)),[i,a]=S(`NoCopy`);return(()=>{var n=Hc();return ue(n,`click`,i()===`NoCopy`?()=>{navigator.clipboard.writeText(M(e.value)).then(()=>{a(`SuccessCopy`),setTimeout(()=>{a(`NoCopy`)},1500)},e=>{a(`ErrorCopy`),setTimeout(()=>{a(`NoCopy`)},1500)})}:void 0,!0),v(n,d(o,{get children(){return[d(p,{get when(){return i()===`NoCopy`},get children(){return d(xc,{})}}),d(p,{get when(){return i()===`SuccessCopy`},get children(){return d(Cc,{get theme(){return t()}})}}),d(p,{get when(){return i()===`ErrorCopy`},get children(){return d(wc,{})}})]}})),c(e=>{var t=r().actionButton,a=`${i()===`NoCopy`?`Copy object to clipboard`:i()===`SuccessCopy`?`Object copied to clipboard`:`Error copying object to clipboard`}`;return t!==e.e&&I(n,e.e=t),a!==e.t&&y(n,`aria-label`,e.t=a),e},{e:void 0,t:void 0}),n})()},nl=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?ll(n):cl(n)),i=Z().client;return(()=>{var t=Uc();return t.$$click=()=>{let t=e.activeQuery.state.data,n=ae(t,e.dataPath,[]);i.setQueryData(e.activeQuery.queryKey,n)},v(t,d(Tc,{})),c(()=>I(t,r().actionButton)),t})()},rl=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?ll(n):cl(n)),i=Z().client;return(()=>{var t=Wc();return t.$$click=()=>{let t=e.activeQuery.state.data,n=re(t,e.dataPath);i.setQueryData(e.activeQuery.queryKey,n)},v(t,d(cc,{})),c(()=>I(t,V(r().actionButton))),t})()},il=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?ll(n):cl(n)),i=Z().client;return(()=>{var a=Gc();return a.$$click=()=>{let t=e.activeQuery.state.data,n=ae(t,e.dataPath,!e.value);i.setQueryData(e.activeQuery.queryKey,n)},v(a,d(Ec,{get theme(){return t()},get checked(){return e.value}})),c(()=>I(a,V(r().actionButton,n`
          width: ${X.size[3.5]};
          height: ${X.size[3.5]};
        `))),a})()};function al(e){return Symbol.iterator in e}function ol(e){let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,i=x(()=>t()===`dark`?ll(n):cl(n)),a=Z().client,[o,l]=S((e.defaultExpanded||[]).includes(e.label)),u=()=>l(e=>!e),[p,m]=S([]),g=x(()=>Array.isArray(e.value)?e.value.map((e,t)=>({label:t.toString(),value:e})):e.value!==null&&typeof e.value==`object`&&al(e.value)&&typeof e.value[Symbol.iterator]==`function`?e.value instanceof Map?Array.from(e.value,([e,t])=>({label:e,value:t})):Array.from(e.value,(e,t)=>({label:t.toString(),value:e})):typeof e.value==`object`&&e.value!==null?Object.entries(e.value).map(([e,t])=>({label:e,value:t})):[]),_=x(()=>Array.isArray(e.value)?`array`:e.value!==null&&typeof e.value==`object`&&al(e.value)&&typeof e.value[Symbol.iterator]==`function`?`Iterable`:typeof e.value==`object`&&e.value!==null?`object`:typeof e.value),b=x(()=>$c(g(),100)),C=e.dataPath??[],w=s();return(()=>{var t=qc();return v(t,d(h,{get when(){return b().length},get children(){return[(()=>{var t=Jc(),n=t.firstChild,a=n.firstChild,s=a.nextSibling,l=s.nextSibling.nextSibling,f=l.firstChild;return n.$$click=()=>u(),v(n,d(el,{get expanded(){return o()}}),a),v(s,()=>e.label),v(l,()=>String(_()).toLowerCase()===`iterable`?`(Iterable) `:``,f),v(l,()=>g().length,f),v(l,()=>g().length>1?`items`:`item`,null),v(t,d(h,{get when(){return e.editable},get children(){var t=qc();return v(t,d(tl,{get value(){return e.value}}),null),v(t,d(h,{get when(){return r(()=>!!e.itemsDeletable)()&&e.activeQuery!==void 0},get children(){return d(rl,{get activeQuery(){return e.activeQuery},dataPath:C})}}),null),v(t,d(h,{get when(){return r(()=>_()===`array`)()&&e.activeQuery!==void 0},get children(){return d(nl,{get activeQuery(){return e.activeQuery},dataPath:C})}}),null),v(t,d(h,{get when(){return r(()=>!!e.onEdit)()&&!P(e.value).meta},get children(){var t=Kc();return t.$$click=()=>{e.onEdit?.()},v(t,d(Sc,{})),c(()=>I(t,i().actionButton)),t}}),null),c(()=>I(t,i().actions)),t}}),null),c(e=>{var r=i().expanderButtonContainer,a=i().expanderButton,s=o()?`true`:`false`,c=i().info;return r!==e.e&&I(t,e.e=r),a!==e.t&&I(n,e.t=a),s!==e.a&&y(n,`aria-expanded`,e.a=s),c!==e.o&&I(l,e.o=c),e},{e:void 0,t:void 0,a:void 0,o:void 0}),t})(),d(h,{get when(){return o()},get children(){return[d(h,{get when(){return b().length===1},get children(){var t=qc();return v(t,d(st,{get each(){return g()},by:e=>e.label,children:t=>d(ol,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...C,t().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return _()===`array`||_()===`Iterable`||_()===`object`}})})),c(()=>I(t,i().subEntry)),t}}),d(h,{get when(){return b().length>1},get children(){var t=qc();return v(t,d(f,{get each(){return b()},children:(t,n)=>(()=>{var r=Qc(),a=r.firstChild,o=a.firstChild,s=o.firstChild,l=s.nextSibling,u=l.nextSibling.nextSibling;return u.nextSibling,o.$$click=()=>m(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n]),v(o,d(el,{get expanded(){return p().includes(n)}}),s),v(o,n*100,l),v(o,n*100+100-1,u),v(a,d(h,{get when(){return p().includes(n)},get children(){var n=qc();return v(n,d(st,{get each(){return t()},by:e=>e.label,children:t=>d(ol,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...C,t().label]},get activeQuery(){return e.activeQuery}})})),c(()=>I(n,i().subEntry)),n}}),null),c(e=>{var t=i().entry,n=i().expanderButton;return t!==e.e&&I(a,e.e=t),n!==e.t&&I(o,e.t=n),e},{e:void 0,t:void 0}),r})()})),c(()=>I(t,i().subEntry)),t}})]}})]}}),null),v(t,d(h,{get when(){return b().length===0},get children(){var t=Zc(),n=t.firstChild,o=n.firstChild;return y(n,`for`,w),v(n,()=>e.label,o),v(t,d(h,{get when(){return r(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(_()===`string`||_()===`number`||_()===`boolean`)},get fallback(){return(()=>{var t=Xc();return v(t,()=>oe(e.value)),c(()=>I(t,i().value)),t})()},get children(){return[d(h,{get when(){return r(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(_()===`string`||_()===`number`)},get children(){var t=Yc();return t.addEventListener(`change`,t=>{let n=e.activeQuery.state.data,r=ae(n,C,_()===`number`?t.target.valueAsNumber:t.target.value);a.setQueryData(e.activeQuery.queryKey,r)}),y(t,`id`,w),c(e=>{var n=_()===`number`?`number`:`text`,r=V(i().value,i().editableInput);return n!==e.e&&y(t,`type`,e.e=n),r!==e.t&&I(t,e.t=r),e},{e:void 0,t:void 0}),c(()=>t.value=e.value),t}}),d(h,{get when(){return _()===`boolean`},get children(){var t=Xc();return v(t,d(il,{get activeQuery(){return e.activeQuery},dataPath:C,get value(){return e.value}}),null),v(t,()=>oe(e.value),null),c(()=>I(t,V(i().value,i().actions,i().editableInput))),t}})]}}),null),v(t,d(h,{get when(){return r(()=>!!(e.editable&&e.itemsDeletable))()&&e.activeQuery!==void 0},get children(){return d(rl,{get activeQuery(){return e.activeQuery},dataPath:C})}}),null),c(e=>{var r=i().row,a=i().label;return r!==e.e&&I(t,e.e=r),a!==e.t&&I(n,e.t=a),e},{e:void 0,t:void 0}),t}}),null),c(()=>I(t,i().entry)),t})()}const sl=(e,t)=>{let{colors:n,font:r,size:i,border:a}=X,o=(t,n)=>e===`light`?t:n;return{entry:t`
      & * {
        font-size: ${r.size.xs};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:t`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${o(n.gray[300],n.darkGray[400])};
      /* outline: 1px solid ${n.teal[400]}; */
    `,expander:t`
      & path {
        stroke: ${n.gray[400]};
      }
      & svg {
        width: ${i[3]};
        height: ${i[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${n.blue[400]}; */
    `,expanderButtonContainer:t`
      display: flex;
      align-items: center;
      line-height: ${i[4]};
      min-height: ${i[4]};
      gap: ${i[2]};
    `,expanderButton:t`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${i[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${i[1]};
      position: relative;
      /* outline: 1px solid ${n.green[400]}; */

      &:focus-visible {
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:t`
      color: ${o(n.gray[500],n.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${i[1]};
      /* outline: 1px solid ${n.yellow[400]}; */
    `,label:t`
      color: ${o(n.gray[700],n.gray[300])};
      white-space: nowrap;
    `,value:t`
      color: ${o(n.purple[600],n.purple[400])};
      flex-grow: 1;
    `,actions:t`
      display: inline-flex;
      gap: ${i[2]};
      align-items: center;
    `,row:t`
      display: inline-flex;
      gap: ${i[2]};
      width: 100%;
      margin: ${i[.25]} 0px;
      line-height: ${i[4.5]};
      align-items: center;
    `,editableInput:t`
      border: none;
      padding: ${i[.5]} ${i[1]} ${i[.5]} ${i[1.5]};
      flex-grow: 1;
      border-radius: ${a.radius.xs};
      background-color: ${o(n.gray[200],n.darkGray[500])};

      &:hover {
        background-color: ${o(n.gray[300],n.darkGray[600])};
      }
    `,actionButton:t`
      background-color: transparent;
      color: ${o(n.gray[500],n.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${i[3]};
      height: ${i[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${o(n.gray[600],n.gray[400])};
      }

      &:focus-visible {
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
        outline-offset: 2px;
      }
    `}},cl=e=>sl(`light`,e),ll=e=>sl(`dark`,e);de([`click`]);var ul=m(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`),dl=m(`<div>`),fl=m(`<div style=--tsqd-font-size:16px;max-height:100vh;height:100vh;width:100vw>`),pl=m(`<div style=--tsqd-font-size:16px>`),ml=m(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`),hl=m(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`),gl=m(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`),_l=m(`<span>Asc`),vl=m(`<span>Desc`),yl=m(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`),bl=m(`<div>Settings`),xl=m(`<span>Position`),Sl=m(`<span>Top`),Cl=m(`<span>Bottom`),wl=m(`<span>Left`),Tl=m(`<span>Right`),El=m(`<span>Theme`),Dl=m(`<span>Light`),Ol=m(`<span>Dark`),kl=m(`<span>System`),Al=m(`<span>Disabled Queries`),jl=m(`<span>Show`),Ml=m(`<span>Hide`),Nl=m(`<div><div class=tsqd-queries-container>`),Pl=m(`<div><div class=tsqd-mutations-container>`),Fl=m(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`),Il=m(`<option>Sort by `),Ll=m(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`),Rl=m(`<div class=tsqd-query-static-indicator aria-hidden=true>static`),zl=m(`<button><div></div><code class=tsqd-query-hash>`),Bl=m(`<div role=tooltip id=tsqd-status-tooltip>`),Vl=m(`<span>`),Hl=m(`<button><span aria-hidden=true></span><span>`),Ul=m(`<button><span aria-hidden=true></span> Error`),Wl=m(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value disabled selected>`),Gl=m(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`),Kl=m(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`),ql=m(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),Jl=m(`<option>`),Yl=m(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);const[Xl,Zl]=S(null),[Ql,$l]=S(null),[eu,tu]=S(0),[nu,ru]=S(!1),iu=e=>{let t=Q(),i=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,a=x(()=>t()===`dark`?wu(i):Cu(i)),o=x(()=>Z().onlineManager);T(()=>{let e=o().subscribe(e=>{ru(!e)});C(()=>{e()})});let s=zc(),l=x(()=>Z().buttonPosition||`bottom-right`),u=x(()=>e.localStore.open===`true`?!0:e.localStore.open===`false`?!1:Z().initialIsOpen||!1),f=x(()=>e.localStore.position||Z().position||`bottom`),p;n(()=>{let t=p.parentElement,n=e.localStore.height||500,r=e.localStore.width||500,i=f();t.style.setProperty(`--tsqd-panel-height`,`${i===`top`?`-`:``}${n}px`),t.style.setProperty(`--tsqd-panel-width`,`${i===`left`?`-`:``}${r}px`)}),T(()=>{let e=()=>{let e=p.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty(`--tsqd-font-size`,t)};e(),window.addEventListener(`focus`,e),C(()=>{window.removeEventListener(`focus`,e)})});let m=x(()=>e.localStore.pip_open??`false`);return[d(h,{get when(){return r(()=>!!s().pipWindow)()&&m()==`true`},get children(){return d(E,{get mount(){return s().pipWindow?.document.body},get children(){return d(au,{get children(){return d(cu,e)}})}})}}),(()=>{var t=dl(),n=p;return typeof n==`function`?te(n,t):p=t,v(t,d(rt,{name:`tsqd-panel-transition`,get children(){return d(h,{get when(){return r(()=>!!(u()&&!s().pipWindow))()&&m()==`false`},get children(){return d(su,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),v(t,d(rt,{name:`tsqd-button-transition`,get children(){return d(h,{get when(){return!u()},get children(){var t=ul(),n=t.firstChild,r=n.nextSibling;return v(n,d(jc,{})),r.$$click=()=>e.setLocalStore(`open`,`true`),v(r,d(jc,{})),c(()=>I(t,V(a().devtoolsBtn,a()[`devtoolsBtn-position-${l()}`],`tsqd-open-btn-container`))),t}})}}),null),c(()=>I(t,V(i`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${f()===`top`||f()===`bottom`?`transform: translateY(var(--tsqd-panel-height));`:`transform: translateX(var(--tsqd-panel-width));`}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${l()===`relative`?`none;`:l()===`top-left`?`translateX(-72px);`:l()===`top-right`?`translateX(72px);`:`translateY(72px);`};
              opacity: 0;
            }
          `,`tsqd-transitions-container`))),t})()]},au=e=>{let t=zc(),r=Q(),i=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,a=x(()=>r()===`dark`?wu(i):Cu(i)),o=()=>{let{colors:e}=X,t=(e,t)=>r()===`dark`?t:e;return eu()<796?i`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:i`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return n(()=>{let e=t().pipWindow,n=()=>{e&&tu(e.innerWidth)};e&&(e.addEventListener(`resize`,n),n()),C(()=>{e&&e.removeEventListener(`resize`,n)})}),(()=>{var t=fl();return v(t,()=>e.children),c(()=>I(t,V(a().panel,o(),{[i`
            min-width: min-content;
          `]:eu()<700},`tsqd-main-panel`))),t})()},ou=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?wu(n):Cu(n)),i;T(()=>{dt(i,({width:e},t)=>{t===i&&tu(e)})});let a=()=>{let{colors:e}=X,r=(e,n)=>t()===`dark`?n:e;return eu()<796?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=pl(),o=i;return typeof o==`function`?te(o,t):i=t,v(t,()=>e.children),c(()=>I(t,V(r().parentPanel,a(),{[n`
            min-width: min-content;
          `]:eu()<700},`tsqd-main-panel`))),t})()},su=e=>{let t=Q(),r=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,i=x(()=>t()===`dark`?wu(r):Cu(r)),o;T(()=>{o.focus()});let[s,l]=S(!1),u=x(()=>e.localStore.position||Z().position||`bottom`),f=t=>{let n=t.currentTarget.parentElement;if(!n)return;l(!0);let{height:r,width:i}=n.getBoundingClientRect(),a=t.clientX,o=t.clientY,c=0,d=F(3.5),f=F(12),p=t=>{if(t.preventDefault(),u()===`left`||u()===`right`){let r=u()===`right`?a-t.clientX:t.clientX-a;c=Math.round(i+r),c<f&&(c=f),e.setLocalStore(`width`,String(Math.round(c)));let o=n.getBoundingClientRect().width;Number(e.localStore.width)<o&&e.setLocalStore(`width`,String(o))}else{let n=u()===`bottom`?o-t.clientY:t.clientY-o;c=Math.round(r+n),c<d&&(c=d,Zl(null)),e.setLocalStore(`height`,String(Math.round(c)))}},m=()=>{s()&&l(!1),document.removeEventListener(`mousemove`,p,!1),document.removeEventListener(`mouseup`,m,!1)};document.addEventListener(`mousemove`,p,!1),document.addEventListener(`mouseup`,m,!1)},p;T(()=>{dt(p,({width:e},t)=>{t===p&&tu(e)})}),n(()=>{let t=p.parentElement?.parentElement?.parentElement;if(!t)return;let n=e.localStore.position||`bottom`,r=ne(`padding`,n),i=e.localStore.position===`left`||e.localStore.position===`right`,a=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i}))(t.style);t.style[r]=`${i?e.localStore.width:e.localStore.height}px`,C(()=>{Object.entries(a).forEach(([e,n])=>{t.style[e]=n})})});let m=()=>{let{colors:e}=X,n=(e,n)=>t()===`dark`?n:e;return eu()<796?r`
        flex-direction: column;
        background-color: ${n(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${n(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=ml(),n=t.firstChild,s=n.nextSibling,l=p;typeof l==`function`?te(l,t):p=t,n.$$keydown=t=>{let n=F(3.5),r=F(12);if(u()===`top`||u()===`bottom`){if(t.key===`ArrowUp`||t.key===`ArrowDown`){t.preventDefault();let r=Number(e.localStore.height||500),i=u()===`bottom`?t.key===`ArrowUp`?10:-10:t.key===`ArrowDown`?10:-10,a=Math.max(n,r+i);e.setLocalStore(`height`,String(a))}}else if(t.key===`ArrowLeft`||t.key===`ArrowRight`){t.preventDefault();let n=Number(e.localStore.width||500),i=u()===`right`?t.key===`ArrowLeft`?10:-10:t.key===`ArrowRight`?10:-10,a=Math.max(r,n+i);e.setLocalStore(`width`,String(a))}},n.$$mousedown=f,s.$$click=()=>e.setLocalStore(`open`,`false`);var h=o;return typeof h==`function`?te(h,s):o=s,v(s,d(lc,{})),v(t,d(cu,e),null),c(o=>{var c=V(i().panel,i()[`panel-position-${u()}`],m(),{[r`
            min-width: min-content;
          `]:eu()<700&&(u()===`right`||u()===`left`)},`tsqd-main-panel`),l=u()===`bottom`||u()===`top`?`${e.localStore.height||500}px`:`auto`,d=u()===`right`||u()===`left`?`${e.localStore.width||500}px`:`auto`,f=u()===`top`||u()===`bottom`?`horizontal`:`vertical`,p=u()===`top`||u()===`bottom`?F(3.5):F(12),h=u()===`top`||u()===`bottom`?Number(e.localStore.height||500):Number(e.localStore.width||500),g=V(i().dragHandle,i()[`dragHandle-position-${u()}`],`tsqd-drag-handle`),_=V(i().closeBtn,i()[`closeBtn-position-${u()}`],`tsqd-minimize-btn`);return c!==o.e&&I(t,o.e=c),l!==o.t&&a(t,`height`,o.t=l),d!==o.a&&a(t,`width`,o.a=d),f!==o.o&&y(n,`aria-orientation`,o.o=f),p!==o.i&&y(n,`aria-valuemin`,o.i=p),h!==o.n&&y(n,`aria-valuenow`,o.n=h),g!==o.s&&I(n,o.s=g),_!==o.h&&I(s,o.h=_),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),t})()},cu=e=>{_u(),yu();let t,n=Q(),i=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,a=x(()=>n()===`dark`?wu(i):Cu(i)),o=zc(),[s,l]=S(`queries`),u=x(()=>e.localStore.sort||Nc),f=x(()=>Number(e.localStore.sortOrder)||1),p=x(()=>e.localStore.mutationSort||Pc),m=x(()=>Number(e.localStore.mutationSortOrder)||1),g=x(()=>A[u()]),_=x(()=>le[p()]),b=x(()=>Z().onlineManager),C=x(()=>Z().client.getQueryCache()),T=x(()=>Z().client.getMutationCache()),E=$(e=>e().getAll().length,!1),D=x(w(()=>[E(),e.localStore.filter,u(),f(),e.localStore.hideDisabledQueries],()=>{let t=C().getAll(),n=e.localStore.filter?t.filter(t=>Oe(t.queryHash,e.localStore.filter||``).passed):[...t];return e.localStore.hideDisabledQueries===`true`&&(n=n.filter(e=>!e.isDisabled())),g()?n.sort((e,t)=>g()(e,t)*f()):n})),O=bu(e=>e().getAll().length,!1),k=x(w(()=>[O(),e.localStore.mutationFilter,p(),m()],()=>{let t=T().getAll(),n=e.localStore.mutationFilter?t.filter(t=>Oe(`${t.options.mutationKey?JSON.stringify(t.options.mutationKey)+` - `:``}${new Date(t.state.submittedAt).toLocaleString()}`,e.localStore.mutationFilter||``).passed):[...t];return _()?n.sort((e,t)=>_()(e,t)*m()):n})),j=t=>{e.setLocalStore(`position`,t)},M=e=>{let n=getComputedStyle(t).getPropertyValue(`--tsqd-font-size`);e.style.setProperty(`--tsqd-font-size`,n)};return[(()=>{var n=Fl(),g=n.firstChild,_=g.firstChild,x=_.firstChild,S=x.firstChild,w=S.nextSibling,E=w.firstChild,O=g.nextSibling,N=O.firstChild,ee=N.firstChild,ne=ee.firstChild,P=ee.nextSibling,re=P.nextSibling,ie=N.nextSibling,ae=ie.firstChild,oe=ae.nextSibling,se=t;return typeof se==`function`?te(se,n):t=n,x.$$click=()=>{if(!o().pipWindow&&!e.showPanelViewOnly){e.setLocalStore(`open`,`false`);return}e.onClose&&e.onClose()},v(w,()=>Z().queryFlavor,E),v(w,()=>Z().version,null),v(_,d(Do.Root,{get class(){return V(a().viewToggle)},get value(){return s()},"aria-label":`Toggle between queries and mutations view`,onChange:e=>{l(e),Zl(null),$l(null)},get children(){return[d(Do.Item,{value:`queries`,class:`tsqd-radio-toggle`,get children(){return[d(Do.ItemInput,{}),d(Do.ItemControl,{get children(){return d(Do.ItemIndicator,{})}}),d(Do.ItemLabel,{title:`Toggle Queries View`,children:`Queries`})]}}),d(Do.Item,{value:`mutations`,class:`tsqd-radio-toggle`,get children(){return[d(Do.ItemInput,{}),d(Do.ItemControl,{get children(){return d(Do.ItemIndicator,{})}}),d(Do.ItemLabel,{title:`Toggle Mutations View`,children:`Mutations`})]}})]}}),null),v(g,d(h,{get when(){return s()===`queries`},get children(){return d(du,{})}}),null),v(g,d(h,{get when(){return s()===`mutations`},get children(){return d(fu,{})}}),null),v(ee,d(sc,{}),ne),ne.$$input=t=>{s()===`queries`?e.setLocalStore(`filter`,t.currentTarget.value):e.setLocalStore(`mutationFilter`,t.currentTarget.value)},v(P,d(h,{get when(){return s()===`queries`},get children(){var t=hl();return t.addEventListener(`change`,t=>{e.setLocalStore(`sort`,t.currentTarget.value)}),v(t,()=>Object.keys(A).map(e=>(()=>{var t=Il();return t.firstChild,t.value=e,v(t,e,null),t})())),c(()=>t.value=u()),t}}),null),v(P,d(h,{get when(){return s()===`mutations`},get children(){var t=gl();return t.addEventListener(`change`,t=>{e.setLocalStore(`mutationSort`,t.currentTarget.value)}),v(t,()=>Object.keys(le).map(e=>(()=>{var t=Il();return t.firstChild,t.value=e,v(t,e,null),t})())),c(()=>t.value=p()),t}}),null),v(P,d(lc,{}),null),re.$$click=()=>{s()===`queries`?e.setLocalStore(`sortOrder`,String(f()*-1)):e.setLocalStore(`mutationSortOrder`,String(m()*-1))},v(re,d(h,{get when(){return(s()===`queries`?f():m())===1},get children(){return[_l(),d(uc,{})]}}),null),v(re,d(h,{get when(){return(s()===`queries`?f():m())===-1},get children(){return[vl(),d(dc,{})]}}),null),ae.$$click=()=>{s()===`queries`?(xu({type:`CLEAR_QUERY_CACHE`}),C().clear()):(xu({type:`CLEAR_MUTATION_CACHE`}),T().clear())},v(ae,d(cc,{})),oe.$$click=()=>{b().setOnline(!b().isOnline())},v(oe,(()=>{var e=r(()=>!!nu());return()=>e()?d(vc,{}):d(_c,{})})()),v(ie,d(h,{get when(){return r(()=>!o().pipWindow)()&&!o().disabled},get children(){var t=yl();return t.$$click=()=>{o().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},v(t,d(bc,{})),c(()=>I(t,V(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-open-pip`))),t}}),null),v(ie,d(Y.Root,{gutter:4,get children(){return[d(Y.Trigger,{get class(){return V(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-settings`)},"aria-label":`Open settings menu`,title:`Open settings menu`,get children(){return d(yc,{})}}),d(Y.Portal,{ref:e=>M(e),get mount(){return r(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return d(Y.Content,{get class(){return V(a().settingsMenu,`tsqd-settings-menu`)},get children(){return[(()=>{var e=bl();return c(()=>I(e,V(a().settingsMenuHeader,`tsqd-settings-menu-header`))),e})(),d(h,{get when(){return!e.showPanelViewOnly},get children(){return d(Y.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[d(Y.SubTrigger,{get class(){return V(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[xl(),d(lc,{})]}}),d(Y.Portal,{ref:e=>M(e),get mount(){return r(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return d(Y.SubContent,{get class(){return V(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return d(Y.RadioGroup,{"aria-label":`Position settings`,get value(){return e.localStore.position},onChange:e=>j(e),get children(){return[d(Y.RadioItem,{value:`top`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Sl(),d(uc,{})]}}),d(Y.RadioItem,{value:`bottom`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Cl(),d(dc,{})]}}),d(Y.RadioItem,{value:`left`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[wl(),d(fc,{})]}}),d(Y.RadioItem,{value:`right`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-right`)},get children(){return[Tl(),d(pc,{})]}})]}})}})}})]}})}}),d(Y.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[d(Y.SubTrigger,{get class(){return V(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-theme`)},get children(){return[El(),d(lc,{})]}}),d(Y.Portal,{ref:e=>M(e),get mount(){return r(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return d(Y.SubContent,{get class(){return V(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return d(Y.RadioGroup,{get value(){return e.localStore.theme_preference},onChange:t=>{e.setLocalStore(`theme_preference`,t)},"aria-label":`Theme preference`,get children(){return[d(Y.RadioItem,{value:`light`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Dl(),d(mc,{})]}}),d(Y.RadioItem,{value:`dark`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Ol(),d(hc,{})]}}),d(Y.RadioItem,{value:`system`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[kl(),d(gc,{})]}})]}})}})}})]}}),d(Y.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[d(Y.SubTrigger,{get class(){return V(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-disabled-queries`)},get children(){return[Al(),d(lc,{})]}}),d(Y.Portal,{ref:e=>M(e),get mount(){return r(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return d(Y.SubContent,{get class(){return V(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return d(Y.RadioGroup,{get value(){return e.localStore.hideDisabledQueries},"aria-label":`Hide disabled queries setting`,onChange:t=>e.setLocalStore(`hideDisabledQueries`,t),get children(){return[d(Y.RadioItem,{value:`false`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-show`)},get children(){return[jl(),d(h,{get when(){return e.localStore.hideDisabledQueries!==`true`},get children(){return d(Dc,{})}})]}}),d(Y.RadioItem,{value:`true`,get class(){return V(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-hide`)},get children(){return[Ml(),d(h,{get when(){return e.localStore.hideDisabledQueries===`true`},get children(){return d(Dc,{})}})]}})]}})}})}})]}})]}})}})]}}),null),v(n,d(h,{get when(){return s()===`queries`},get children(){var e=Nl(),t=e.firstChild;return v(t,d(st,{by:e=>e.queryHash,get each(){return D()},children:e=>d(lu,{get query(){return e()}})})),c(()=>I(e,V(a().overflowQueryContainer,`tsqd-queries-overflow-container`))),e}}),null),v(n,d(h,{get when(){return s()===`mutations`},get children(){var e=Pl(),t=e.firstChild;return v(t,d(st,{by:e=>e.mutationId,get each(){return k()},children:e=>d(uu,{get mutation(){return e()}})})),c(()=>I(e,V(a().overflowQueryContainer,`tsqd-mutations-overflow-container`))),e}}),null),c(e=>{var t=V(a().queriesContainer,eu()<796&&(Xl()||Ql())&&i`
              height: 50%;
              max-height: 50%;
            `,eu()<796&&!(Xl()||Ql())&&i`
              height: 100%;
              max-height: 100%;
            `,`tsqd-queries-container`),r=V(a().row,`tsqd-header`),o=a().logoAndToggleContainer,c=V(a().logo,`tsqd-text-logo-container`),l=V(a().tanstackLogo,`tsqd-text-logo-tanstack`),u=V(a().queryFlavorLogo,`tsqd-text-logo-query-flavor`),d=V(a().row,`tsqd-filters-actions-container`),p=V(a().filtersContainer,`tsqd-filters-container`),h=V(a().filterInput,`tsqd-query-filter-textfield-container`),v=V(`tsqd-query-filter-textfield`),b=V(a().filterSelect,`tsqd-query-filter-sort-container`),C=`Sort order ${(s()===`queries`?f():m())===-1?`descending`:`ascending`}`,T=(s()===`queries`?f():m())===-1,E=V(a().actionsContainer,`tsqd-actions-container`),D=V(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-clear-cache`),k=`Clear ${s()} cache`,A=V(a().actionsBtn,nu()&&a().actionsBtnOffline,`tsqd-actions-btn`,`tsqd-action-mock-offline-behavior`),j=`${nu()?`Unset offline mocking behavior`:`Mock offline behavior`}`,M=nu(),te=`${nu()?`Unset offline mocking behavior`:`Mock offline behavior`}`;return t!==e.e&&I(n,e.e=t),r!==e.t&&I(g,e.t=r),o!==e.a&&I(_,e.a=o),c!==e.o&&I(x,e.o=c),l!==e.i&&I(S,e.i=l),u!==e.n&&I(w,e.n=u),d!==e.s&&I(O,e.s=d),p!==e.h&&I(N,e.h=p),h!==e.r&&I(ee,e.r=h),v!==e.d&&I(ne,e.d=v),b!==e.l&&I(P,e.l=b),C!==e.u&&y(re,`aria-label`,e.u=C),T!==e.c&&y(re,`aria-pressed`,e.c=T),E!==e.w&&I(ie,e.w=E),D!==e.m&&I(ae,e.m=D),k!==e.f&&y(ae,`title`,e.f=k),A!==e.y&&I(oe,e.y=A),j!==e.g&&y(oe,`aria-label`,e.g=j),M!==e.p&&y(oe,`aria-pressed`,e.p=M),te!==e.b&&y(oe,`title`,e.b=te),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),c(()=>ne.value=s()===`queries`?e.localStore.filter||``:e.localStore.mutationFilter||``),n})(),d(h,{get when(){return r(()=>s()===`queries`)()&&Xl()},get children(){return d(mu,{})}}),d(h,{get when(){return r(()=>s()===`mutations`)()&&Ql()},get children(){return d(hu,{})}})]},lu=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,r=x(()=>t()===`dark`?wu(n):Cu(n)),{colors:i,alpha:a}=X,o=(e,n)=>t()===`dark`?n:e,s=$(t=>t().get(e.query.queryHash)?.state,!0,t=>t.query.queryHash===e.query.queryHash),l=$(t=>t().get(e.query.queryHash)?.isDisabled()??!1,!0,t=>t.query.queryHash===e.query.queryHash),u=$(t=>t().get(e.query.queryHash)?.isStatic()??!1,!0,t=>t.query.queryHash===e.query.queryHash),f=$(t=>t().get(e.query.queryHash)?.isStale()??!1,!0,t=>t.query.queryHash===e.query.queryHash),p=$(t=>t().get(e.query.queryHash)?.getObserversCount()??0,!0,t=>t.query.queryHash===e.query.queryHash),m=x(()=>ie({queryState:s(),observerCount:p(),isStale:f()})),g=()=>m()===`gray`?n`
        background-color: ${o(i[m()][200],i[m()][700])};
        color: ${o(i[m()][700],i[m()][300])};
      `:n`
      background-color: ${o(i[m()][200]+a[80],i[m()][900])};
      color: ${o(i[m()][800],i[m()][300])};
    `;return d(h,{get when(){return s()},get children(){var t=zl(),n=t.firstChild,i=n.nextSibling;return t.$$click=()=>Zl(e.query.queryHash===Xl()?null:e.query.queryHash),v(n,p),v(i,()=>e.query.queryHash),v(t,d(h,{get when(){return l()},get children(){return Ll()}}),null),v(t,d(h,{get when(){return u()},get children(){return Rl()}}),null),c(i=>{var a=V(r().queryRow,Xl()===e.query.queryHash&&r().selectedQueryRow,`tsqd-query-row`),o=`Query key ${e.query.queryHash}${l()?`, disabled`:``}${u()?`, static`:``}`,s=V(g(),`tsqd-query-observer-count`);return a!==i.e&&I(t,i.e=a),o!==i.t&&y(t,`aria-label`,i.t=o),s!==i.a&&I(n,i.a=s),i},{e:void 0,t:void 0,a:void 0}),t}})},uu=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,i=x(()=>t()===`dark`?wu(n):Cu(n)),{colors:a,alpha:o}=X,s=(e,n)=>t()===`dark`?n:e,l=bu(t=>t().getAll().find(t=>t.mutationId===e.mutation.mutationId)?.state),u=bu(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.isPaused:!1}),f=bu(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.status:`idle`}),p=x(()=>N({isPaused:u(),status:f()})),m=()=>p()===`gray`?n`
        background-color: ${s(a[p()][200],a[p()][700])};
        color: ${s(a[p()][700],a[p()][300])};
      `:n`
      background-color: ${s(a[p()][200]+o[80],a[p()][900])};
      color: ${s(a[p()][800],a[p()][300])};
    `;return d(h,{get when(){return l()},get children(){var t=zl(),n=t.firstChild,a=n.nextSibling;return t.$$click=()=>{$l(e.mutation.mutationId===Ql()?null:e.mutation.mutationId)},v(n,d(h,{get when(){return p()===`purple`},get children(){return d(Ac,{})}}),null),v(n,d(h,{get when(){return p()===`green`},get children(){return d(Dc,{})}}),null),v(n,d(h,{get when(){return p()===`red`},get children(){return d(kc,{})}}),null),v(n,d(h,{get when(){return p()===`yellow`},get children(){return d(Oc,{})}}),null),v(a,d(h,{get when(){return e.mutation.options.mutationKey},get children(){return[r(()=>JSON.stringify(e.mutation.options.mutationKey)),` -`,` `]}}),null),v(a,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),c(r=>{var a=V(i().queryRow,Ql()===e.mutation.mutationId&&i().selectedQueryRow,`tsqd-query-row`),o=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,s=V(m(),`tsqd-query-observer-count`);return a!==r.e&&I(t,r.e=a),o!==r.t&&y(t,`aria-label`,r.t=o),s!==r.a&&I(n,r.a=s),r},{e:void 0,t:void 0,a:void 0}),t}})},du=()=>{let e=$(e=>e().getAll().filter(e=>O(e)===`stale`).length),t=$(e=>e().getAll().filter(e=>O(e)===`fresh`).length),n=$(e=>e().getAll().filter(e=>O(e)===`fetching`).length),r=$(e=>e().getAll().filter(e=>O(e)===`paused`).length),i=$(e=>e().getAll().filter(e=>O(e)===`inactive`).length),a=Q(),o=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,s=x(()=>a()===`dark`?wu(o):Cu(o));return(()=>{var a=dl();return v(a,d(pu,{label:`Fresh`,color:`green`,get count(){return t()}}),null),v(a,d(pu,{label:`Fetching`,color:`blue`,get count(){return n()}}),null),v(a,d(pu,{label:`Paused`,color:`purple`,get count(){return r()}}),null),v(a,d(pu,{label:`Stale`,color:`yellow`,get count(){return e()}}),null),v(a,d(pu,{label:`Inactive`,color:`gray`,get count(){return i()}}),null),c(()=>I(a,V(s().queryStatusContainer,`tsqd-query-status-container`))),a})()},fu=()=>{let e=bu(e=>e().getAll().filter(e=>N({isPaused:e.state.isPaused,status:e.state.status})===`green`).length),t=bu(e=>e().getAll().filter(e=>N({isPaused:e.state.isPaused,status:e.state.status})===`yellow`).length),n=bu(e=>e().getAll().filter(e=>N({isPaused:e.state.isPaused,status:e.state.status})===`purple`).length),r=bu(e=>e().getAll().filter(e=>N({isPaused:e.state.isPaused,status:e.state.status})===`red`).length),i=Q(),a=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,o=x(()=>i()===`dark`?wu(a):Cu(a));return(()=>{var i=dl();return v(i,d(pu,{label:`Paused`,color:`purple`,get count(){return n()}}),null),v(i,d(pu,{label:`Pending`,color:`yellow`,get count(){return t()}}),null),v(i,d(pu,{label:`Success`,color:`green`,get count(){return e()}}),null),v(i,d(pu,{label:`Error`,color:`red`,get count(){return r()}}),null),c(()=>I(i,V(o().queryStatusContainer,`tsqd-query-status-container`))),i})()},pu=e=>{let t=Q(),n=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,a=x(()=>t()===`dark`?wu(n):Cu(n)),{colors:o,alpha:s}=X,l=(e,n)=>t()===`dark`?n:e,f,[p,m]=S(!1),[g,_]=S(!1),y=x(()=>!(Xl()&&eu()<1024&&eu()>796||eu()<796));return(()=>{var t=Hl(),b=t.firstChild,x=b.nextSibling,S=f;return typeof S==`function`?te(S,t):f=t,t.addEventListener(`mouseleave`,()=>{m(!1),_(!1)}),t.addEventListener(`mouseenter`,()=>m(!0)),t.addEventListener(`blur`,()=>_(!1)),t.addEventListener(`focus`,()=>_(!0)),i(t,u({get disabled(){return y()},get"aria-label"(){return`${e.label}: ${e.count}`},get class(){return V(a().queryStatusTag,!y()&&n`
            cursor: pointer;
            &:hover {
              background: ${l(o.gray[200],o.darkGray[400])}${s[80]};
            }
          `,`tsqd-query-status-tag`,`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>p()||g()?{"aria-describedby":`tsqd-status-tooltip`}:{}),!1,!0),v(t,d(h,{get when(){return r(()=>!y())()&&(p()||g())},get children(){var t=Bl();return v(t,()=>e.label),c(()=>I(t,V(a().statusTooltip,`tsqd-query-status-tooltip`))),t}}),b),v(t,d(h,{get when(){return y()},get children(){var t=Vl();return v(t,()=>e.label),c(()=>I(t,V(a().queryStatusTagLabel,`tsqd-query-status-tag-label`))),t}}),x),v(x,()=>e.count),c(t=>{var r=V(n`
            width: ${X.size[1.5]};
            height: ${X.size[1.5]};
            border-radius: ${X.border.radius.full};
            background-color: ${X.colors[e.color][500]};
          `,`tsqd-query-status-tag-dot`),i=V(a().queryStatusCount,e.count>0&&e.color!==`gray`&&n`
              background-color: ${l(o[e.color][100],o[e.color][900])};
              color: ${l(o[e.color][700],o[e.color][300])};
            `,`tsqd-query-status-tag-count`);return r!==t.e&&I(b,t.e=r),i!==t.t&&I(x,t.t=i),t},{e:void 0,t:void 0}),t})()},mu=()=>{let e=Q(),t=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,i=x(()=>e()===`dark`?wu(t):Cu(t)),{colors:o}=X,s=(t,n)=>e()===`dark`?n:t,l=Z().client,[u,f]=S(!1),[p,m]=S(`view`),[g,_]=S(!1),b=x(()=>Z().errorTypes||[]),C=$(e=>e().getAll().find(e=>e.queryHash===Xl()),!1),w=$(e=>e().getAll().find(e=>e.queryHash===Xl()),!1),T=$(e=>e().getAll().find(e=>e.queryHash===Xl())?.state,!1),E=$(e=>e().getAll().find(e=>e.queryHash===Xl())?.state.data,!1),D=$(e=>{let t=e().getAll().find(e=>e.queryHash===Xl());return t?O(t):`inactive`}),k=$(e=>{let t=e().getAll().find(e=>e.queryHash===Xl());return t?t.state.status:`pending`}),A=$(e=>e().getAll().find(e=>e.queryHash===Xl())?.getObserversCount()??0),j=x(()=>se(D())),M=()=>{xu({type:`REFETCH`,queryHash:C()?.queryHash}),(C()?.fetch())?.catch(()=>{})},N=e=>{let t=C();if(!t)return;xu({type:`TRIGGER_ERROR`,queryHash:t.queryHash,metadata:{error:e?.name}});let n=e?.initializer(t)??Error(`Unknown error from devtools`),r=t.options;t.setState({data:void 0,status:`error`,error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})},te=()=>{let e=C();if(!e)return;xu({type:`RESTORE_LOADING`,queryHash:e.queryHash});let t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:`idle`,fetchMeta:null}),n&&e.fetch(n)};n(()=>{D()!==`fetching`&&f(!1)});let ne=()=>j()===`gray`?t`
        background-color: ${s(o[j()][200],o[j()][700])};
        color: ${s(o[j()][700],o[j()][300])};
        border-color: ${s(o[j()][400],o[j()][600])};
      `:t`
      background-color: ${s(o[j()][100],o[j()][900])};
      color: ${s(o[j()][700],o[j()][300])};
      border-color: ${s(o[j()][400],o[j()][600])};
    `;return d(h,{get when(){return r(()=>!!C())()&&T()},get children(){var e=ql(),n=e.firstChild,r=n.nextSibling,x=r.firstChild,S=x.firstChild,O=S.firstChild,j=S.nextSibling,P=x.nextSibling,re=P.firstChild.nextSibling,ie=P.nextSibling.firstChild.nextSibling,ae=r.nextSibling,se=ae.nextSibling,F=se.firstChild,ce=F.firstChild,le=F.nextSibling,ue=le.firstChild,de=le.nextSibling,L=de.firstChild,fe=de.nextSibling,pe=fe.firstChild,me=fe.nextSibling,R=me.firstChild,he=R.nextSibling,ge=se.nextSibling;ge.firstChild;var _e=ge.nextSibling,ve=_e.nextSibling;return v(O,()=>oe(C().queryKey,!0)),v(j,D),v(re,A),v(ie,()=>new Date(T().dataUpdatedAt).toLocaleTimeString()),F.$$click=M,le.$$click=()=>{xu({type:`INVALIDATE`,queryHash:C()?.queryHash}),l.invalidateQueries({queryKey:C()?.queryKey,exact:!0})},de.$$click=()=>{xu({type:`RESET`,queryHash:C()?.queryHash}),l.resetQueries({queryKey:C()?.queryKey,exact:!0})},fe.$$click=()=>{xu({type:`REMOVE`,queryHash:C()?.queryHash}),l.removeQueries({queryKey:C()?.queryKey,exact:!0}),Zl(null)},me.$$click=()=>{if(C()?.state.data===void 0)f(!0),te();else{let e=C();if(!e)return;xu({type:`TRIGGER_LOADING`,queryHash:e.queryHash});let t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:`pending`,fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},v(me,()=>k()===`pending`?`Restore`:`Trigger`,he),v(se,d(h,{get when(){return b().length===0||k()===`error`},get children(){var e=Ul(),n=e.firstChild,r=n.nextSibling;return e.$$click=()=>{C().state.error?(xu({type:`RESTORE_ERROR`,queryHash:C()?.queryHash}),l.resetQueries({queryKey:C()?.queryKey})):N()},v(e,()=>k()===`error`?`Restore`:`Trigger`,r),c(r=>{var i=V(t`
                  color: ${s(o.red[500],o.red[400])};
                `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error`),a=k()===`pending`,c=t`
                  background-color: ${s(o.red[500],o.red[400])};
                `;return i!==r.e&&I(e,r.e=i),a!==r.t&&(e.disabled=r.t=a),c!==r.a&&I(n,r.a=c),r},{e:void 0,t:void 0,a:void 0}),e}}),null),v(se,d(h,{get when(){return b().length!==0&&k()!==`error`},get children(){var e=Wl(),n=e.firstChild,r=n.nextSibling.nextSibling;return r.firstChild,r.addEventListener(`change`,e=>{let t=b().find(t=>t.name===e.currentTarget.value);N(t)}),v(r,d(ee,{get each(){return b()},children:e=>(()=>{var t=Jl();return v(t,()=>e.name),c(()=>t.value=e.name),t})()}),null),v(e,d(lc,{}),null),c(a=>{var o=V(i().actionsSelect,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error-multiple`),s=t`
                  background-color: ${X.colors.red[400]};
                `,c=k()===`pending`;return o!==a.e&&I(e,a.e=o),s!==a.t&&I(n,a.t=s),c!==a.a&&(r.disabled=a.a=c),a},{e:void 0,t:void 0,a:void 0}),e}}),null),v(ge,()=>p()===`view`?`Explorer`:`Editor`,null),v(e,d(h,{get when(){return p()===`view`},get children(){var e=Gl();return v(e,d(ol,{label:`Data`,defaultExpanded:[`Data`],get value(){return E()},editable:!0,onEdit:()=>m(`edit`),get activeQuery(){return C()}})),c(t=>a(e,`padding`,X.size[2])),e}}),_e),v(e,d(h,{get when(){return p()===`edit`},get children(){var e=Kl(),n=e.firstChild,r=n.nextSibling,a=r.firstChild,l=a.nextSibling,u=l.firstChild,d=u.nextSibling;return e.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget).get(`data`);try{let e=JSON.parse(t);C().setState({...C().state,data:e}),m(`view`)}catch{_(!0)}}),n.addEventListener(`focus`,()=>_(!1)),v(a,()=>g()?`Invalid Value`:``),u.$$click=()=>m(`view`),c(c=>{var f=V(i().devtoolsEditForm,`tsqd-query-details-data-editor`),p=i().devtoolsEditTextarea,m=g(),h=i().devtoolsEditFormActions,_=i().devtoolsEditFormError,v=i().devtoolsEditFormActionContainer,b=V(i().devtoolsEditFormAction,t`
                      color: ${s(o.gray[600],o.gray[300])};
                    `),x=V(i().devtoolsEditFormAction,t`
                      color: ${s(o.blue[600],o.blue[400])};
                    `);return f!==c.e&&I(e,c.e=f),p!==c.t&&I(n,c.t=p),m!==c.a&&y(n,`data-error`,c.a=m),h!==c.o&&I(r,c.o=h),_!==c.i&&I(a,c.i=_),v!==c.n&&I(l,c.n=v),b!==c.s&&I(u,c.s=b),x!==c.h&&I(d,c.h=x),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),c(()=>n.value=JSON.stringify(E(),null,2)),e}}),_e),v(ve,d(ol,{label:`Query`,defaultExpanded:[`Query`,`queryKey`],get value(){return w()}})),c(c=>{var l=V(i().detailsContainer,`tsqd-query-details-container`),d=V(i().detailsHeader,`tsqd-query-details-header`),f=V(i().detailsBody,`tsqd-query-details-summary-container`),p=V(i().queryDetailsStatus,ne()),m=V(i().detailsHeader,`tsqd-query-details-header`),h=V(i().actionsBody,`tsqd-query-details-actions-container`),g=V(t`
                color: ${s(o.blue[600],o.blue[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-refetch`),_=D()===`fetching`,v=t`
                background-color: ${s(o.blue[600],o.blue[400])};
              `,y=V(t`
                color: ${s(o.yellow[600],o.yellow[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-invalidate`),b=k()===`pending`,x=t`
                background-color: ${s(o.yellow[600],o.yellow[400])};
              `,S=V(t`
                color: ${s(o.gray[600],o.gray[300])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-reset`),C=k()===`pending`,w=t`
                background-color: ${s(o.gray[600],o.gray[400])};
              `,T=V(t`
                color: ${s(o.pink[500],o.pink[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-remove`),E=D()===`fetching`,O=t`
                background-color: ${s(o.pink[500],o.pink[400])};
              `,A=V(t`
                color: ${s(o.cyan[500],o.cyan[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-loading`),M=u(),N=t`
                background-color: ${s(o.cyan[500],o.cyan[400])};
              `,ee=V(i().detailsHeader,`tsqd-query-details-header`),te=V(i().detailsHeader,`tsqd-query-details-header`),P=X.size[2];return l!==c.e&&I(e,c.e=l),d!==c.t&&I(n,c.t=d),f!==c.a&&I(r,c.a=f),p!==c.o&&I(j,c.o=p),m!==c.i&&I(ae,c.i=m),h!==c.n&&I(se,c.n=h),g!==c.s&&I(F,c.s=g),_!==c.h&&(F.disabled=c.h=_),v!==c.r&&I(ce,c.r=v),y!==c.d&&I(le,c.d=y),b!==c.l&&(le.disabled=c.l=b),x!==c.u&&I(ue,c.u=x),S!==c.c&&I(de,c.c=S),C!==c.w&&(de.disabled=c.w=C),w!==c.m&&I(L,c.m=w),T!==c.f&&I(fe,c.f=T),E!==c.y&&(fe.disabled=c.y=E),O!==c.g&&I(pe,c.g=O),A!==c.p&&I(me,c.p=A),M!==c.b&&(me.disabled=c.b=M),N!==c.T&&I(R,c.T=N),ee!==c.A&&I(ge,c.A=ee),te!==c.O&&I(_e,c.O=te),P!==c.I&&a(ve,`padding`,c.I=P),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),e}})},hu=()=>{let e=Q(),t=Z().shadowDOMTarget?B.bind({target:Z().shadowDOMTarget}):B,n=x(()=>e()===`dark`?wu(t):Cu(t)),{colors:r}=X,i=(t,n)=>e()===`dark`?n:t,o=bu(e=>{let t=e().getAll().find(e=>e.mutationId===Ql());return t?t.state.isPaused:!1}),s=bu(e=>{let t=e().getAll().find(e=>e.mutationId===Ql());return t?t.state.status:`idle`}),l=x(()=>N({isPaused:o(),status:s()})),u=bu(e=>e().getAll().find(e=>e.mutationId===Ql()),!1),f=()=>l()===`gray`?t`
        background-color: ${i(r[l()][200],r[l()][700])};
        color: ${i(r[l()][700],r[l()][300])};
        border-color: ${i(r[l()][400],r[l()][600])};
      `:t`
      background-color: ${i(r[l()][100],r[l()][900])};
      color: ${i(r[l()][700],r[l()][300])};
      border-color: ${i(r[l()][400],r[l()][600])};
    `;return d(h,{get when(){return u()},get children(){var e=Yl(),t=e.firstChild,r=t.nextSibling,i=r.firstChild,o=i.firstChild,p=o.firstChild,m=o.nextSibling,g=i.nextSibling.firstChild.nextSibling,_=r.nextSibling,y=_.nextSibling,b=y.nextSibling,x=b.nextSibling,S=x.nextSibling,C=S.nextSibling,w=C.nextSibling,T=w.nextSibling;return v(p,d(h,{get when(){return u().options.mutationKey},fallback:`No mutationKey found`,get children(){return oe(u().options.mutationKey,!0)}})),v(m,d(h,{get when(){return l()===`purple`},children:`pending`}),null),v(m,d(h,{get when(){return l()!==`purple`},get children(){return s()}}),null),v(g,()=>new Date(u().state.submittedAt).toLocaleTimeString()),v(y,d(ol,{label:`Variables`,defaultExpanded:[`Variables`],get value(){return u().state.variables}})),v(x,d(ol,{label:`Context`,defaultExpanded:[`Context`],get value(){return u().state.context}})),v(C,d(ol,{label:`Data`,defaultExpanded:[`Data`],get value(){return u().state.data}})),v(T,d(ol,{label:`Mutation`,defaultExpanded:[`Mutation`],get value(){return u()}})),c(i=>{var o=V(n().detailsContainer,`tsqd-query-details-container`),s=V(n().detailsHeader,`tsqd-query-details-header`),c=V(n().detailsBody,`tsqd-query-details-summary-container`),l=V(n().queryDetailsStatus,f()),u=V(n().detailsHeader,`tsqd-query-details-header`),d=X.size[2],p=V(n().detailsHeader,`tsqd-query-details-header`),h=X.size[2],g=V(n().detailsHeader,`tsqd-query-details-header`),v=X.size[2],E=V(n().detailsHeader,`tsqd-query-details-header`),D=X.size[2];return o!==i.e&&I(e,i.e=o),s!==i.t&&I(t,i.t=s),c!==i.a&&I(r,i.a=c),l!==i.o&&I(m,i.o=l),u!==i.i&&I(_,i.i=u),d!==i.n&&a(y,`padding`,i.n=d),p!==i.s&&I(b,i.s=p),h!==i.h&&a(x,`padding`,i.h=h),g!==i.r&&I(S,i.r=g),v!==i.d&&a(C,`padding`,i.d=v),E!==i.l&&I(w,i.l=E),D!==i.u&&a(T,`padding`,i.u=D),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),e}})},gu=new Map,_u=()=>{let e=x(()=>Z().client.getQueryCache()),t=e().subscribe(t=>{l(()=>{for(let[n,r]of gu.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return C(()=>{gu.clear(),t()}),t},$=(e,t=!0,r=()=>!0)=>{let i=x(()=>Z().client.getQueryCache()),[a,o]=S(e(i),t?void 0:{equals:!1});return n(()=>{o(e(i))}),gu.set(e,{setter:o,shouldUpdate:r}),C(()=>{gu.delete(e)}),a},vu=new Map,yu=()=>{let e=x(()=>Z().client.getMutationCache()),t=e().subscribe(()=>{for(let[t,n]of vu.entries())queueMicrotask(()=>{n(t(e))})});return C(()=>{vu.clear(),t()}),t},bu=(e,t=!0)=>{let r=x(()=>Z().client.getMutationCache()),[i,a]=S(e(r),t?void 0:{equals:!1});return n(()=>{a(e(r))}),vu.set(e,a),C(()=>{vu.delete(e)}),i},xu=({type:e,queryHash:t,metadata:n})=>{let r=new CustomEvent(`@tanstack/query-devtools-event`,{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},Su=(e,t)=>{let{colors:n,font:r,size:i,alpha:a,shadow:o,border:s}=X,c=(t,n)=>e===`light`?t:n;return{devtoolsBtn:t`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${o.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${n.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:t`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${X.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${c(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${c(n.gray[400],n.darkGray[300])};
      }
    `,parentPanel:t`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${X.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${c(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${c(n.gray[400],n.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":t`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":t`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":t`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":t`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":t`
      position: relative;
    `,"panel-position-top":t`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${i[14]};
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-bottom":t`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${i[14]};
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-right":t`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":t`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:t`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${c(n.gray[50],n.darkGray[700])};
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[600]};
      }
      & svg {
        color: ${c(n.gray[600],n.gray[400])};
        width: ${i[2]};
        height: ${i[2]};
      }
    `,"closeBtn-position-top":t`
      bottom: 0;
      right: ${i[2]};
      transform: translate(0, 100%);
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${s.radius.sm} ${s.radius.sm};
      padding: ${i[.5]} ${i[1.5]} ${i[1]} ${i[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${i[2.5]};
        height: ${i[1.5]};
        width: calc(100% + ${i[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":t`
      top: 0;
      right: ${i[2]};
      transform: translate(0, -100%);
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${s.radius.sm} ${s.radius.sm} 0px 0px;
      padding: ${i[1]} ${i[1.5]} ${i[.5]} ${i[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${i[2.5]};
        height: ${i[1.5]};
        width: calc(100% + ${i[5]});
      }
    `,"closeBtn-position-right":t`
      bottom: ${i[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: ${s.radius.sm} 0px 0px ${s.radius.sm};
      padding: ${i[1.5]} ${i[.5]} ${i[1.5]} ${i[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${i[5]});
        width: ${i[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":t`
      bottom: ${i[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px ${s.radius.sm} ${s.radius.sm} 0px;
      padding: ${i[1.5]} ${i[1]} ${i[1.5]} ${i[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${i[5]});
        width: ${i[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:t`
      flex: 1 1 700px;
      background-color: ${c(n.gray[50],n.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:t`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${n.purple[400]}${c(``,a[90])};
      }
      &:focus {
        outline: none;
        background-color: ${n.purple[400]}${c(``,a[90])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[800]};
        outline-offset: -2px;
        background-color: ${n.purple[400]}${c(``,a[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":t`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":t`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":t`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":t`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:t`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${X.size[2]} ${X.size[2.5]};
      gap: ${X.size[2.5]};
      border-bottom: ${c(n.gray[300],n.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${i[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:t`
      display: flex;
      gap: ${X.size[3]};
      align-items: center;
    `,logo:t`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${X.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,tanstackLogo:t`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${c(n.gray[600],n.gray[300])};
    `,queryFlavorLogo:t`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${c(`#ea4037, #ff9b11`,`#dd524b, #e9a03b`)}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:t`
      display: flex;
      gap: ${X.size[2]};
      height: min-content;
    `,queryStatusTag:t`
      display: flex;
      gap: ${X.size[1.5]};
      box-sizing: border-box;
      height: ${X.size[6.5]};
      background: ${c(n.gray[50],n.darkGray[500])};
      color: ${c(n.gray[700],n.gray[300])};
      border-radius: ${X.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${X.size[1]};
      padding-left: ${X.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${c(`1px solid `+n.gray[300],`1px solid transparent`)};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,queryStatusTagLabel:t`
      font-size: ${r.size.xs};
    `,queryStatusCount:t`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${c(n.gray[500],n.gray[400])};
      background-color: ${c(n.gray[200],n.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${X.size[4.5]};
    `,statusTooltip:t`
      position: absolute;
      z-index: 1;
      background-color: ${c(n.gray[50],n.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${X.size[2]}));
      padding: ${X.size[.5]} ${X.size[2]};
      border-radius: ${X.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${c(n.gray[400],n.gray[600])};
      color: ${c(n.gray[600],n.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${c(n.gray[400],n.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${c(n.gray[100],n.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:t`
      display: flex;
      gap: ${X.size[2]};
      & > button {
        cursor: pointer;
        padding: ${X.size[.5]} ${X.size[1.5]} ${X.size[.5]}
          ${X.size[2]};
        border-radius: ${X.border.radius.sm};
        background-color: ${c(n.gray[100],n.darkGray[400])};
        border: 1px solid ${c(n.gray[300],n.darkGray[200])};
        color: ${c(n.gray[700],n.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${X.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        & svg {
          width: ${X.size[3]};
          height: ${X.size[3]};
          color: ${c(n.gray[500],n.gray[400])};
        }
      }
    `,filterInput:t`
      padding: ${i[.5]} ${i[2]};
      border-radius: ${X.border.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${X.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      height: min-content;
      color: ${c(n.gray[600],n.gray[400])};
      & > svg {
        width: ${i[3]};
        height: ${i[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${c(n.gray[100],n.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${c(n.gray[700],n.gray[300])};
        &::placeholder {
          color: ${c(n.gray[700],n.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,filterSelect:t`
      padding: ${X.size[.5]} ${X.size[2]};
      border-radius: ${X.border.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${X.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${c(n.gray[600],n.gray[400])};
        width: ${X.size[2]};
        height: ${X.size[2]};
      }
      & > select {
        appearance: none;
        color: ${c(n.gray[700],n.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${c(n.gray[100],n.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsContainer:t`
      display: flex;
      gap: ${X.size[2]};
    `,actionsBtn:t`
      border-radius: ${X.border.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[400])};
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      width: ${X.size[6.5]};
      height: ${X.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${X.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      & svg {
        color: ${c(n.gray[700],n.gray[300])};
        width: ${X.size[3]};
        height: ${X.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsBtnOffline:t`
      & svg {
        stroke: ${c(n.yellow[700],n.yellow[500])};
        fill: ${c(n.yellow[700],n.yellow[500])};
      }
    `,overflowQueryContainer:t`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:t`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${c(n.gray[700],n.gray[300])};
      background-color: ${c(n.gray[50],n.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${c(n.gray[200],n.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${X.size[1]};
        user-select: none;
        min-width: ${X.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${c(n.gray[300],n.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${X.size[6]};
        flex: 1;
        padding: ${X.size[1]} ${X.size[2]};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${c(n.gray[300],n.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${X.size[2]};
        color: ${c(n.gray[800],n.gray[300])};
        background-color: ${c(n.gray[300],n.darkGray[600])};
        border-bottom: 1px solid ${c(n.gray[300],n.darkGray[400])};
        font-size: ${r.size.xs};
      }

      & .tsqd-query-static-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${X.size[2]};
        color: ${c(n.teal[800],n.teal[300])};
        background-color: ${c(n.teal[100],n.teal[900])};
        border-bottom: 1px solid ${c(n.teal[300],n.teal[700])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:t`
      background-color: ${c(n.gray[200],n.darkGray[500])};
    `,detailsContainer:t`
      flex: 1 1 700px;
      background-color: ${c(n.gray[50],n.darkGray[700])};
      color: ${c(n.gray[700],n.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${c(n.gray[200],n.darkGray[600])};
      padding: ${X.size[1.5]} ${X.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:t`
      margin: ${X.size[1.5]} 0px ${X.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${X.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${X.size[1.5]};
      }

      & code {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
        max-width: 100%;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:t`
      border: 1px solid ${n.darkGray[200]};
      border-radius: ${X.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${X.size[1]} ${X.size[2.5]};
    `,actionsBody:t`
      flex-wrap: wrap;
      margin: ${X.size[2]} 0px ${X.size[2]} 0px;
      display: flex;
      gap: ${X.size[2]};
      padding: 0px ${X.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${X.size[1]} ${X.size[2]};
        display: flex;
        border-radius: ${X.border.radius.sm};
        background-color: ${c(n.gray[100],n.darkGray[600])};
        border: 1px solid ${c(n.gray[300],n.darkGray[400])};
        align-items: center;
        gap: ${X.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        &:hover {
          background-color: ${c(n.gray[200],n.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${i[1.5]};
          height: ${i[1.5]};
          border-radius: ${X.border.radius.full};
        }
      }
    `,actionsSelect:t`
      font-size: ${r.size.xs};
      padding: ${X.size[.5]} ${X.size[2]};
      display: flex;
      border-radius: ${X.border.radius.sm};
      overflow: hidden;
      background-color: ${c(n.gray[100],n.darkGray[600])};
      border: 1px solid ${c(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${X.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${c(n.red[500],n.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      & > span {
        width: ${i[1.5]};
        height: ${i[1.5]};
        border-radius: ${X.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${X.colors.red[400]};
      }
      & svg {
        width: ${X.size[2]};
        height: ${X.size[2]};
      }
    `,settingsMenu:t`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${i[.5]};
      border-radius: ${X.border.radius.sm};
      border: 1px solid ${c(n.gray[300],n.gray[700])};
      background-color: ${c(n.gray[50],n.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${c(n.gray[700],n.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${i[.5]};
    `,settingsSubTrigger:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${X.border.radius.xs};
      padding: ${X.size[1]} ${X.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${c(n.gray[700],n.gray[300])};
      & svg {
        color: ${c(n.gray[600],n.gray[400])};
        transform: rotate(-90deg);
        width: ${X.size[2]};
        height: ${X.size[2]};
      }
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:t`
      padding: ${X.size[1]} ${X.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${c(n.gray[300],n.darkGray[400])};
      color: ${c(n.gray[500],n.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${c(n.gray[700],n.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${X.border.radius.xs};
      padding: ${X.size[1]} ${X.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${c(n.gray[600],n.gray[400])};
      }
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &[data-checked] {
        background-color: ${c(n.purple[100],n.purple[900])};
        color: ${c(n.purple[700],n.purple[300])};
        & svg {
          color: ${c(n.purple[700],n.purple[300])};
        }
        &:hover {
          background-color: ${c(n.purple[100],n.purple[900])};
        }
      }
    `,viewToggle:t`
      border-radius: ${X.border.radius.sm};
      background-color: ${c(n.gray[200],n.darkGray[600])};
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${c(n.gray[700],n.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${n.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${c(n.gray[100],n.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${c(n.gray[100],n.darkGray[400])};
        & label:hover {
          background-color: ${c(n.gray[100],n.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${X.size[1.5]} 0 ${X.size[2]};
        }
        border-right: 1px solid ${c(n.gray[300],n.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${X.size[2]} 0 ${X.size[1.5]};
        }
      }
    `,devtoolsEditForm:t`
      padding: ${i[2]};
      & > [data-error='true'] {
        outline: 2px solid ${c(n.red[200],n.red[800])};
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
      }
    `,devtoolsEditTextarea:t`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${s.radius.sm};
      field-sizing: content;
      padding: ${i[2]};
      background-color: ${c(n.gray[100],n.darkGray[800])};
      color: ${c(n.gray[900],n.gray[100])};
      border: 1px solid ${c(n.gray[200],n.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${c(n.blue[200],n.blue[800])};
      }
    `,devtoolsEditFormActions:t`
      display: flex;
      justify-content: space-between;
      gap: ${i[2]};
      align-items: center;
      padding-top: ${i[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:t`
      color: ${c(n.red[700],n.red[500])};
    `,devtoolsEditFormActionContainer:t`
      display: flex;
      gap: ${i[2]};
    `,devtoolsEditFormAction:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${i[1]} ${X.size[2]};
      display: flex;
      border-radius: ${s.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[600])};
      border: 1px solid ${c(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${i[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},Cu=e=>Su(`light`,e),wu=e=>Su(`dark`,e);de([`click`,`mousedown`,`keydown`,`input`]);export{Rc as a,be as c,Bc as i,iu as n,Fc as o,ou as r,Mc as s,cu as t};
//# sourceMappingURL=Devtools-CFKbGy8Z.js.map