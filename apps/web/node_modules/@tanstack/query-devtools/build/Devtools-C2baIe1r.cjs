const e=require("./utils-DzxoHwL2.cjs"),t=e=>e!=null,n=e=>e.filter(t);function r(e){return(...t)=>{for(let n of e)n&&n(...t)}}const i=e=>typeof e==`function`&&!e.length?e():e,a=e=>Array.isArray(e)?e:e?[e]:[];function o(e,...t){return typeof e==`function`?e(...t):e}const s=e.X;function c(e,t,n,r){let i=e.length,a=t.length,o=0;if(!a){for(;o<i;o++)n(e[o]);return}if(!i){for(;o<a;o++)r(t[o]);return}for(;o<a&&t[o]===e[o];o++);let s,c;t=t.slice(o),e=e.slice(o);for(s of t)e.includes(s)||r(s);for(c of e)t.includes(c)||n(c)}function l(t){let[n,r]=e.W(),i=t?.throw?(e,t)=>{throw r(e instanceof Error?e:Error(t)),e}:(e,t)=>{r(e instanceof Error?e:Error(t))},a=t?.api?Array.isArray(t.api)?t.api:[t.api]:[globalThis.localStorage].filter(Boolean),o=t?.prefix?`${t.prefix}.`:``,s=new Map,c=new Proxy({},{get(n,r){let c=s.get(r);c||(c=e.W(void 0,{equals:!1}),s.set(r,c)),c[0]();let l=a.reduce((e,t)=>{if(e!==null||!t)return e;try{return t.getItem(`${o}${r}`)}catch(e){return i(e,`Error reading ${o}${r} from ${t.name}`),null}},null);return l!==null&&t?.deserializer?t.deserializer(l,r,t.options):l}});return t?.sync!==!1&&e.Z(()=>{let t=e=>{let t=!1;a.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(t){i(t,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&s.get(e.key)?.[1]()};`addEventListener`in globalThis?(globalThis.addEventListener(`storage`,t),e.X(()=>globalThis.removeEventListener(`storage`,t))):(a.forEach(e=>e.addEventListener?.(`storage`,t)),e.X(()=>a.forEach(e=>e.removeEventListener?.(`storage`,t))))}),[c,(e,n,r)=>{let c=t?.serializer?t.serializer(n,e,r??t.options):n,l=`${o}${e}`;a.forEach(t=>{try{t.getItem(l)!==c&&t.setItem(l,c)}catch(n){i(n,`Error setting ${o}${e} to ${c} in ${t.name}`)}});let u=s.get(e);u&&u[1]()},{clear:()=>a.forEach(e=>{try{e.clear()}catch(t){i(t,`Error clearing ${e.name}`)}}),error:n,remove:e=>a.forEach(t=>{try{t.removeItem(`${o}${e}`)}catch(n){i(n,`Error removing ${o}${e} from ${t.name}`)}}),toJSON:()=>{let e={},n=(n,r)=>{if(!e.hasOwnProperty(n)){let i=r&&t?.deserializer?t.deserializer(r,n,t.options):r;i&&(e[n]=i)}};return a.forEach(t=>{if(typeof t.getAll==`function`){let e;try{e=t.getAll()}catch(e){i(e,`Error getting all values from in ${t.name}`)}for(let t of e)n(t,e[t])}else{let r=0,a;try{for(;a=t.key(r++);)e.hasOwnProperty(a)||n(a,t.getItem(a))}catch(e){i(e,`Error getting all values from ${t.name}`)}}}),e}}]}var u=l,d=e=>(typeof e.clear==`function`||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),f=e=>{if(!e)return``;let t=``;for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r==`boolean`?`; ${n}`:`; ${n}=${r}`}return t},p=d({_cookies:[globalThis.document,`cookie`],getItem:e=>p._cookies[0][p._cookies[1]].match(`(^|;)\\s*`+e+`\\s*=\\s*([^;]+)`)?.pop()??null,setItem:(e,t,n)=>{let r=p.getItem(e);p._cookies[0][p._cookies[1]]=`${e}=${t}${f(n)}`;let i=Object.assign(new Event(`storage`),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:p});window.dispatchEvent(i)},removeItem:e=>{p._cookies[0][p._cookies[1]]=`${e}=deleted${f({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return p._cookies[0][p._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,i)=>(!t&&i&&n++===e&&(t=i),``)),t},get length(){let e=0;return p._cookies[0][p._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=+!!t,``)),e}});
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
const m={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,Ấ:`A`,Ắ:`A`,Ẳ:`A`,Ẵ:`A`,Ặ:`A`,Æ:`AE`,Ầ:`A`,Ằ:`A`,Ȃ:`A`,Ç:`C`,Ḉ:`C`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,Ế:`E`,Ḗ:`E`,Ề:`E`,Ḕ:`E`,Ḝ:`E`,Ȇ:`E`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,Ḯ:`I`,Ȋ:`I`,Ð:`D`,Ñ:`N`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,Ố:`O`,Ṍ:`O`,Ṓ:`O`,Ȏ:`O`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,Ý:`Y`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,ấ:`a`,ắ:`a`,ẳ:`a`,ẵ:`a`,ặ:`a`,æ:`ae`,ầ:`a`,ằ:`a`,ȃ:`a`,ç:`c`,ḉ:`c`,è:`e`,é:`e`,ê:`e`,ë:`e`,ế:`e`,ḗ:`e`,ề:`e`,ḕ:`e`,ḝ:`e`,ȇ:`e`,ì:`i`,í:`i`,î:`i`,ï:`i`,ḯ:`i`,ȋ:`i`,ð:`d`,ñ:`n`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,ố:`o`,ṍ:`o`,ṓ:`o`,ȏ:`o`,ù:`u`,ú:`u`,û:`u`,ü:`u`,ý:`y`,ÿ:`y`,Ā:`A`,ā:`a`,Ă:`A`,ă:`a`,Ą:`A`,ą:`a`,Ć:`C`,ć:`c`,Ĉ:`C`,ĉ:`c`,Ċ:`C`,ċ:`c`,Č:`C`,č:`c`,C̆:`C`,c̆:`c`,Ď:`D`,ď:`d`,Đ:`D`,đ:`d`,Ē:`E`,ē:`e`,Ĕ:`E`,ĕ:`e`,Ė:`E`,ė:`e`,Ę:`E`,ę:`e`,Ě:`E`,ě:`e`,Ĝ:`G`,Ǵ:`G`,ĝ:`g`,ǵ:`g`,Ğ:`G`,ğ:`g`,Ġ:`G`,ġ:`g`,Ģ:`G`,ģ:`g`,Ĥ:`H`,ĥ:`h`,Ħ:`H`,ħ:`h`,Ḫ:`H`,ḫ:`h`,Ĩ:`I`,ĩ:`i`,Ī:`I`,ī:`i`,Ĭ:`I`,ĭ:`i`,Į:`I`,į:`i`,İ:`I`,ı:`i`,Ĳ:`IJ`,ĳ:`ij`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,Ḱ:`K`,ḱ:`k`,K̆:`K`,k̆:`k`,Ĺ:`L`,ĺ:`l`,Ļ:`L`,ļ:`l`,Ľ:`L`,ľ:`l`,Ŀ:`L`,ŀ:`l`,Ł:`l`,ł:`l`,Ḿ:`M`,ḿ:`m`,M̆:`M`,m̆:`m`,Ń:`N`,ń:`n`,Ņ:`N`,ņ:`n`,Ň:`N`,ň:`n`,ŉ:`n`,N̆:`N`,n̆:`n`,Ō:`O`,ō:`o`,Ŏ:`O`,ŏ:`o`,Ő:`O`,ő:`o`,Œ:`OE`,œ:`oe`,P̆:`P`,p̆:`p`,Ŕ:`R`,ŕ:`r`,Ŗ:`R`,ŗ:`r`,Ř:`R`,ř:`r`,R̆:`R`,r̆:`r`,Ȓ:`R`,ȓ:`r`,Ś:`S`,ś:`s`,Ŝ:`S`,ŝ:`s`,Ş:`S`,Ș:`S`,ș:`s`,ş:`s`,Š:`S`,š:`s`,Ţ:`T`,ţ:`t`,ț:`t`,Ț:`T`,Ť:`T`,ť:`t`,Ŧ:`T`,ŧ:`t`,T̆:`T`,t̆:`t`,Ũ:`U`,ũ:`u`,Ū:`U`,ū:`u`,Ŭ:`U`,ŭ:`u`,Ů:`U`,ů:`u`,Ű:`U`,ű:`u`,Ų:`U`,ų:`u`,Ȗ:`U`,ȗ:`u`,V̆:`V`,v̆:`v`,Ŵ:`W`,ŵ:`w`,Ẃ:`W`,ẃ:`w`,X̆:`X`,x̆:`x`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Y̆:`Y`,y̆:`y`,Ź:`Z`,ź:`z`,Ż:`Z`,ż:`z`,Ž:`Z`,ž:`z`,ſ:`s`,ƒ:`f`,Ơ:`O`,ơ:`o`,Ư:`U`,ư:`u`,Ǎ:`A`,ǎ:`a`,Ǐ:`I`,ǐ:`i`,Ǒ:`O`,ǒ:`o`,Ǔ:`U`,ǔ:`u`,Ǖ:`U`,ǖ:`u`,Ǘ:`U`,ǘ:`u`,Ǚ:`U`,ǚ:`u`,Ǜ:`U`,ǜ:`u`,Ứ:`U`,ứ:`u`,Ṹ:`U`,ṹ:`u`,Ǻ:`A`,ǻ:`a`,Ǽ:`AE`,ǽ:`ae`,Ǿ:`O`,ǿ:`o`,Þ:`TH`,þ:`th`,Ṕ:`P`,ṕ:`p`,Ṥ:`S`,ṥ:`s`,X́:`X`,x́:`x`,Ѓ:`Г`,ѓ:`г`,Ќ:`К`,ќ:`к`,A̋:`A`,a̋:`a`,E̋:`E`,e̋:`e`,I̋:`I`,i̋:`i`,Ǹ:`N`,ǹ:`n`,Ồ:`O`,ồ:`o`,Ṑ:`O`,ṑ:`o`,Ừ:`U`,ừ:`u`,Ẁ:`W`,ẁ:`w`,Ỳ:`Y`,ỳ:`y`,Ȁ:`A`,ȁ:`a`,Ȅ:`E`,ȅ:`e`,Ȉ:`I`,ȉ:`i`,Ȍ:`O`,ȍ:`o`,Ȑ:`R`,ȑ:`r`,Ȕ:`U`,ȕ:`u`,B̌:`B`,b̌:`b`,Č̣:`C`,č̣:`c`,Ê̌:`E`,ê̌:`e`,F̌:`F`,f̌:`f`,Ǧ:`G`,ǧ:`g`,Ȟ:`H`,ȟ:`h`,J̌:`J`,ǰ:`j`,Ǩ:`K`,ǩ:`k`,M̌:`M`,m̌:`m`,P̌:`P`,p̌:`p`,Q̌:`Q`,q̌:`q`,Ř̩:`R`,ř̩:`r`,Ṧ:`S`,ṧ:`s`,V̌:`V`,v̌:`v`,W̌:`W`,w̌:`w`,X̌:`X`,x̌:`x`,Y̌:`Y`,y̌:`y`,A̧:`A`,a̧:`a`,B̧:`B`,b̧:`b`,Ḑ:`D`,ḑ:`d`,Ȩ:`E`,ȩ:`e`,Ɛ̧:`E`,ɛ̧:`e`,Ḩ:`H`,ḩ:`h`,I̧:`I`,i̧:`i`,Ɨ̧:`I`,ɨ̧:`i`,M̧:`M`,m̧:`m`,O̧:`O`,o̧:`o`,Q̧:`Q`,q̧:`q`,U̧:`U`,u̧:`u`,X̧:`X`,x̧:`x`,Z̧:`Z`,z̧:`z`},h=Object.keys(m).join(`|`),g=new RegExp(h,`g`);function _(e){return e.replace(g,e=>m[e])}
/**
* @name match-sorter
* @license MIT license.
* @copyright (c) 2099 Kent C. Dodds
* @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
*/
const v={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function y(e,t,n){if(n||={},n.threshold=n.threshold??v.MATCHES,!n.accessors){let r=b(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}let r=T(e,n.accessors),i={rankedValue:e,rank:v.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let e=0;e<r.length;e++){let a=r[e],o=b(a.itemValue,t,n),{minRanking:s,maxRanking:c,threshold:l=n.threshold}=a.attributes;o<s&&o>=v.MATCHES?o=s:o>c&&(o=c),o=Math.min(o,c),o>=l&&o>i.rank&&(i.rank=o,i.passed=!0,i.accessorIndex=e,i.accessorThreshold=l,i.rankedValue=a.itemValue)}return i}function b(e,t,n){return e=C(e,n),t=C(t,n),t.length>e.length?v.NO_MATCH:e===t?v.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?v.EQUAL:e.startsWith(t)?v.STARTS_WITH:e.includes(` ${t}`)?v.WORD_STARTS_WITH:e.includes(t)?v.CONTAINS:t.length===1?v.NO_MATCH:x(e).includes(t)?v.ACRONYM:S(e,t))}function x(e){let t=``;return e.split(` `).forEach(e=>{e.split(`-`).forEach(e=>{t+=e.substr(0,1)})}),t}function S(e,t){let n=0,r=0;function i(e,t,r){for(let i=r,a=t.length;i<a;i++)if(t[i]===e)return n+=1,i+1;return-1}function a(e){let r=1/e,i=n/t.length;return v.MATCHES+i*r}let o=i(t[0],e,0);if(o<0)return v.NO_MATCH;r=o;for(let n=1,a=t.length;n<a;n++){let a=t[n];if(r=i(a,e,r),!(r>-1))return v.NO_MATCH}return a(r-o)}function C(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=_(e)),e}function w(e,t){let n=t;typeof t==`object`&&(n=t.accessor);let r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function T(e,t){let n=[];for(let r=0,i=t.length;r<i;r++){let i=t[r],a=D(i),o=w(e,i);for(let e=0,t=o.length;e<t;e++)n.push({itemValue:o[e],attributes:a})}return n}const E={maxRanking:1/0,minRanking:-1/0};function D(e){return typeof e==`function`?E:{...E,...e}}let O={data:``},k=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||O},A=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,j=/\/\*[^]*?\*\/|  +/g,M=/\n+/g,N=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?N(o,a):a+`{`+N(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=N(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=N.p?N.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},P={},F=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+F(e[n]);return t}return e},ee=(e,t,n,r,i)=>{let a=F(e),o=P[a]||(P[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!P[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=A.exec(e.replace(j,``));)t[4]?r.shift():t[3]?(n=t[3].replace(M,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(M,` `).trim();return r[0]})(e):e;P[o]=N(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&P.g?P.g:null;return n&&(P.g=P[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(P[o],t,r,s),o},te=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:N(e,``):!1===e?``:e}return e+r+(a??``)},``);function I(e){let t=this||{},n=e.call?e(t.p):e;return ee(n.unshift?n.raw?te(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,k(t.target),t.g,t.o,t.k)}I.bind({g:1}),I.bind({k:1});function ne(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=ne(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function L(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=ne(e))&&(r&&(r+=` `),r+=t);return r}const re=()=>{};function ie(t,n){let r=e.$(t),{onChange:i}=n,a=new Set(n.appear?void 0:r),o=new WeakSet,[s,c]=e.W([],{equals:!1}),[l]=e.tt(),u=n.exitMethod===`remove`?re:e=>{c(t=>(t.push.apply(t,e),t));for(let t of e)o.delete(t)},d=n.exitMethod===`remove`?re:n.exitMethod===`keep-index`?(e,t,n)=>e.splice(n,0,t):(e,t)=>e.push(t);return e.V(n=>{let r=s(),c=t();if(c[e.A],e.$(l))return l(),n;if(r.length){let e=n.filter(e=>!r.includes(e));return r.length=0,i({list:e,added:[],removed:[],unchanged:e,finishRemoved:u}),e}return e.$(()=>{let e=new Set(c),t=c.slice(),r=[],s=[],l=[];for(let e of c)(a.has(e)?l:r).push(e);let f=!r.length;for(let r=0;r<n.length;r++){let i=n[r];e.has(i)||(o.has(i)||(s.push(i),o.add(i)),d(t,i,r)),f&&i!==t[r]&&(f=!1)}return!s.length&&f?n:(i({list:t,added:r,removed:s,unchanged:l,finishRemoved:u}),a=e,t)})},n.appear?[]:r.slice())}function R(...e){return r(e)}const ae=e=>e instanceof Element;function oe(e,t){if(t(e))return e;if(typeof e==`function`&&!e.length)return oe(e(),t);if(Array.isArray(e)){let n=[];for(let r of e){let e=oe(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function se(t,n=ae,r=ae){let i=e.V(t),a=e.V(()=>oe(i(),n));return a.toArray=()=>{let e=a();return Array.isArray(e)?e:e?[e]:[]},a}function ce(t){return e.V(()=>{let e=t.name||`s`;return{enterActive:(t.enterActiveClass||e+`-enter-active`).split(` `),enter:(t.enterClass||e+`-enter`).split(` `),enterTo:(t.enterToClass||e+`-enter-to`).split(` `),exitActive:(t.exitActiveClass||e+`-exit-active`).split(` `),exit:(t.exitClass||e+`-exit`).split(` `),exitTo:(t.exitToClass||e+`-exit-to`).split(` `),move:(t.moveClass||e+`-move`).split(` `)}})}function le(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function ue(e,t,n,r){let{onBeforeEnter:i,onEnter:a,onAfterEnter:o}=t;i?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();a?.(n,()=>s())}),le(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),o?.(n))}}function de(e,t,n,r){let{onBeforeExit:i,onExit:a,onAfterExit:o}=t;if(!n.parentNode)return r?.();i?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),a?.(n,()=>s()),le(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),o?.(n))}}var fe=e=>{let t=ce(e);return ie(se(()=>e.children).toArray,{appear:e.appear,exitMethod:`keep-index`,onChange({added:n,removed:r,finishRemoved:i,list:a}){let o=t();for(let t of n)ue(o,e,t);let s=[];for(let e of a)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{let e=[];for(let{el:t,rect:n}of s)if(t.isConnected){let r=t.getBoundingClientRect(),i=n.left-r.left,a=n.top-r.top;(i||a)&&(t.style.transform=`translate(${i}px, ${a}px)`,t.style.transitionDuration=`0s`,e.push(t))}document.body.offsetHeight;for(let t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener(`transitionend`,e),t.classList.remove(...o.move))};t.classList.add(...o.move),t.style.transform=t.style.transitionDuration=``,t.addEventListener(`transitionend`,e)}});for(let t of r)de(o,e,t,()=>i([t]))}})};const pe=Symbol(`fallback`);function me(e){for(let t of e)t.dispose()}function he(t,n,r,i={}){let a=new Map;return e.X(()=>me(a.values())),()=>{let r=t()||[];return r[e.A],e.$(()=>{if(!r.length)return me(a.values()),a.clear(),i.fallback?[e.U(e=>(a.set(pe,{dispose:e}),i.fallback()))]:[];let t=Array(r.length),s=a.get(pe);if(!a.size||s){s?.dispose(),a.delete(pe);for(let e=0;e<r.length;e++){let i=r[e],a=n(i,e);o(t,i,e,a)}return t}let c=new Set(a.keys());for(let e=0;e<r.length;e++){let i=r[e],s=n(i,e);c.delete(s);let l=a.get(s);l?(t[e]=l.mapped,l.setIndex?.(e),l.setItem(()=>i)):o(t,i,e,s)}for(let e of c)a.get(e)?.dispose(),a.delete(e);return t})};function o(t,n,i,o){e.U(s=>{let[c,l]=e.W(n),u={setItem:l,dispose:s};if(r.length>1){let[t,n]=e.W(i);u.setIndex=n,u.mapped=r(c,t)}else u.mapped=r(c);a.set(o,u),t[i]=u.mapped})}}function ge(t){let{by:n}=t;return e.V(he(()=>t.each,typeof n==`function`?n:e=>e[n],t.children,`fallback`in t?{fallback:()=>t.fallback}:void 0))}function _e(e,t,n,r){return e.addEventListener(t,n,r),s(e.removeEventListener.bind(e,t,n,r))}function ve(t,n,r,o){let s=()=>{a(i(t)).forEach(e=>{e&&a(i(n)).forEach(t=>_e(e,t,r,o))})};typeof t==`function`?e.B(s):e.H(s)}function ye(t,n){let r=new ResizeObserver(t);return e.X(r.disconnect.bind(r)),{observe:e=>r.observe(e,n),unobserve:r.unobserve.bind(r)}}function be(t,r,o){let s=new WeakMap,{observe:l,unobserve:u}=ye(e=>{for(let t of e){let{contentRect:e,target:n}=t,i=Math.round(e.width),a=Math.round(e.height),o=s.get(n);(!o||o.width!==i||o.height!==a)&&(r(e,n,t),s.set(n,{width:i,height:a}))}},o);e.B(e=>{let r=n(a(i(t)));return c(r,e,l,u),r},[])}const xe=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function Se(e){let t={},n;for(;n=xe.exec(e);)t[n[1]]=n[2];return t}function Ce(e,t){if(typeof e==`string`){if(typeof t==`string`)return`${e};${t}`;e=Se(e)}else typeof t==`string`&&(t=Se(t));return{...e,...t}}function we(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function Te(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Ee(e){return typeof e==`number`}function De(e){return Object.prototype.toString.call(e)===`[object String]`}function Oe(e){return typeof e==`function`}function ke(e){return t=>`${e()}-${t}`}function z(e,t){return e?e===t||e.contains(t):!1}function Ae(e,t=!1){let{activeElement:n}=Me(e);if(!n?.nodeName)return null;if(Ne(n)&&n.contentDocument)return Ae(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=Me(n).getElementById(e);if(t)return t}}return n}function je(e){return Me(e).defaultView||window}function Me(e){return e?e.ownerDocument||e:document}function Ne(e){return e.tagName===`IFRAME`}var Pe=(e=>(e.Escape=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`,e.Space=` `,e.ArrowDown=`ArrowDown`,e.ArrowLeft=`ArrowLeft`,e.ArrowRight=`ArrowRight`,e.ArrowUp=`ArrowUp`,e.End=`End`,e.Home=`Home`,e.PageDown=`PageDown`,e.PageUp=`PageUp`,e))(Pe||{});function Fe(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Ie(){return Fe(/^Mac/i)}function Le(){return Fe(/^iPhone/i)}function Re(){return Fe(/^iPad/i)||Ie()&&navigator.maxTouchPoints>1}function ze(){return Le()||Re()}function Be(){return Ie()||ze()}function B(e,t){return t&&(Oe(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function V(e){return t=>{for(let n of e)B(t,n)}}function Ve(e){return Ie()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function H(e){if(e){if(Ue())e.focus({preventScroll:!0});else{let t=We(e);e.focus(),Ge(t)}}}var He=null;function Ue(){if(He==null){He=!1;try{document.createElement(`div`).focus({get preventScroll(){return He=!0,!0}})}catch{}}return He}function We(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function Ge(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var Ke=[`input:not([type='hidden']):not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`[tabindex]`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable='false'])`],qe=[...Ke,`[tabindex]:not([tabindex="-1"]):not([disabled])`],Je=`${Ke.join(`:not([hidden]),`)},[tabindex]:not([disabled]):not([hidden])`,Ye=qe.join(`:not([hidden]):not([tabindex="-1"]),`);function Xe(e,t){let n=Array.from(e.querySelectorAll(Je)).filter(Ze);return t&&Ze(e)&&n.unshift(e),n.forEach((e,t)=>{if(Ne(e)&&e.contentDocument){let r=e.contentDocument.body,i=Xe(r,!1);n.splice(t,1,...i)}}),n}function Ze(e){return Qe(e)&&!$e(e)}function Qe(e){return e.matches(Je)&&et(e)}function $e(e){return Number.parseInt(e.getAttribute(`tabindex`)||`0`,10)<0}function et(e,t){return e.nodeName!==`#comment`&&tt(e)&&nt(e,t)&&(!e.parentElement||et(e.parentElement,e))}function tt(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:t,visibility:n}=e.style,r=t!==`none`&&n!==`hidden`&&n!==`collapse`;if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:i}=t(e);r=n!==`none`&&i!==`hidden`&&i!==`collapse`}return r}function nt(e,t){return!e.hasAttribute(`hidden`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function rt(e,t){return t.some(t=>t.contains(e))}function it(e,t,n){let r=t?.tabbable?Ye:Je,i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(r)&&et(e)&&(!n||rt(e,n))&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(i.currentNode=t.from),i}function at(e){let t=e;for(;t&&!ot(t);)t=t.parentElement;return t||document.scrollingElement||document.documentElement}function ot(e){let t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function st(){}function ct(e,t){let[n,r]=e,i=!1,a=t.length;for(let e=a,o=0,s=e-1;o<e;s=o++){let[a,c]=t[o],[l,u]=t[s],[,d]=t[s===0?e-1:s-1]||[0,0],f=(c-u)*(n-a)-(a-l)*(r-c);if(u<c){if(r>=u&&r<c){if(f===0)return!0;f>0&&(r===u?r>d&&(i=!i):i=!i)}}else if(c<u){if(r>c&&r<=u){if(f===0)return!0;f<0&&(r===u?r<d&&(i=!i):i=!i)}}else if(r===c&&(n>=l&&n<=a||n>=a&&n<=l))return!0}return i}function U(t,n){return e.J(t,n)}var lt=new Map,ut=new Set;function dt(){if(typeof window>`u`)return;let e=e=>{if(!e.target)return;let n=lt.get(e.target);n||(n=new Set,lt.set(e.target,n),e.target.addEventListener(`transitioncancel`,t)),n.add(e.propertyName)},t=e=>{if(!e.target)return;let n=lt.get(e.target);if(n&&(n.delete(e.propertyName),n.size===0&&(e.target.removeEventListener(`transitioncancel`,t),lt.delete(e.target)),lt.size===0)){for(let e of ut)e();ut.clear()}};document.body.addEventListener(`transitionrun`,e),document.body.addEventListener(`transitionend`,t)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,dt):dt());function ft(e,t){let n=pt(e,t,`left`),r=pt(e,t,`top`),i=t.offsetWidth,a=t.offsetHeight,o=e.scrollLeft,s=e.scrollTop,c=o+e.offsetWidth,l=s+e.offsetHeight;n<=o?o=n:n+i>c&&(o+=n+i-c),r<=s?s=r:r+a>l&&(s+=r+a-l),e.scrollLeft=o,e.scrollTop=s}function pt(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[r];break}t=t.offsetParent}return i}function mt(e,t){if(document.contains(e)){let n=document.scrollingElement||document.documentElement;if(window.getComputedStyle(n).overflow!==`hidden`){let{left:n,top:r}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:i,top:a}=e.getBoundingClientRect();(Math.abs(n-i)>1||Math.abs(r-a)>1)&&(t?.containingElement?.scrollIntoView?.({block:`center`,inline:`center`}),e.scrollIntoView?.({block:`nearest`}))}else{let t=at(e);for(;e&&t&&e!==n&&t!==n;)ft(t,e),e=t,t=at(e)}}}var ht={border:`0`,clip:`rect(0 0 0 0)`,"clip-path":`inset(50%)`,height:`1px`,margin:`0 -1px -1px 0`,overflow:`hidden`,padding:`0`,position:`absolute`,width:`1px`,"white-space":`nowrap`};function gt(t,n){let[r,i]=e.W(_t(n?.()));return e.B(()=>{i(t()?.tagName.toLowerCase()||_t(n?.()))}),r}function _t(e){return De(e)?e:void 0}function W(t){let[n,r]=e.Q(t,[`as`]);if(!n.as)throw Error("[kobalte]: Polymorphic is missing the required `as` prop.");return e.L(e.g,e.J(r,{get component(){return n.as}}))}var vt=Object.defineProperty,yt=(e,t)=>{for(var n in t)vt(e,n,{get:t[n],enumerable:!0})};yt({},{Button:()=>Ct,Root:()=>St});var bt=[`button`,`color`,`file`,`image`,`reset`,`submit`];function xt(e){let t=e.tagName.toLowerCase();return t===`button`?!0:t===`input`&&e.type?bt.indexOf(e.type)!==-1:!1}function St(t){let n,r=U({type:`button`},t),[i,a]=e.Q(r,[`ref`,`type`,`disabled`]),o=gt(()=>n,()=>`button`),s=e.V(()=>{let e=o();return e!=null&&xt({tagName:e,type:i.type})}),c=e.V(()=>o()===`input`),l=e.V(()=>o()===`a`&&n?.getAttribute(`href`)!=null);return e.L(W,e.J({as:`button`,ref(e){let t=R(e=>n=e,i.ref);typeof t==`function`&&t(e)},get type(){return s()||c()?i.type:void 0},get role(){return!s()&&!l()?`button`:void 0},get tabIndex(){return!s()&&!l()&&!i.disabled?0:void 0},get disabled(){return s()||c()?i.disabled:void 0},get"aria-disabled"(){return!s()&&!c()&&i.disabled?!0:void 0},get"data-disabled"(){return i.disabled?``:void 0}},a))}var Ct=St;function wt(t){let[n,r]=e.W(t.defaultValue?.()),i=e.V(()=>t.value?.()!==void 0),a=e.V(()=>i()?t.value?.():n());return[a,n=>{e.$(()=>{let e=o(n,a());return Object.is(e,a())||(i()||r(e),t.onChange?.(e)),e})}]}function Tt(e){let[t,n]=wt(e);return[()=>t()??!1,n]}function Et(e){let[t,n]=wt(e);return[()=>t()??[],n]}function Dt(e={}){let[t,n]=Tt({value:()=>i(e.isSelected),defaultValue:()=>!!i(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{!i(e.isReadOnly)&&!i(e.isDisabled)&&n(t)},toggle:()=>{!i(e.isReadOnly)&&!i(e.isDisabled)&&n(!t())}}}function Ot(e){let t=e.startIndex??0,n=e.startLevel??0,r=[],i=t=>{if(t==null)return``;let n=e.getKey??`key`,r=De(n)?t[n]:n(t);return r==null?``:String(r)},a=t=>{if(t==null)return``;let n=e.getTextValue??`textValue`,r=De(n)?t[n]:n(t);return r==null?``:String(r)},o=t=>{if(t==null)return!1;let n=e.getDisabled??`disabled`;return(De(n)?t[n]:n(t))??!1},s=t=>{if(t!=null)return De(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(let c of e.dataSource){if(De(c)||Ee(c)){r.push({type:`item`,rawValue:c,key:String(c),textValue:String(c),disabled:o(c),level:n,index:t}),t++;continue}if(s(c)!=null){r.push({type:`section`,rawValue:c,key:``,textValue:``,disabled:!1,level:n,index:t}),t++;let i=s(c)??[];if(i.length>0){let a=Ot({dataSource:i,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...a),t+=a.length}}else r.push({type:`item`,rawValue:c,key:i(c),textValue:a(c),disabled:o(c),level:n,index:t}),t++}return r}function kt(t,n=[]){return e.V(()=>{let e=Ot({dataSource:i(t.dataSource),getKey:i(t.getKey),getTextValue:i(t.getTextValue),getDisabled:i(t.getDisabled),getSectionChildren:i(t.getSectionChildren)});for(let e=0;e<n.length;e++)n[e]();return t.factory(e)})}var At=new Set([`Avst`,`Arab`,`Armi`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),jt=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Mt(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??``;return At.has(t)}let t=e.split(`-`)[0];return jt.has(t)}function Nt(e){return Mt(e)?`rtl`:`ltr`}function Pt(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;return{locale:e,direction:Nt(e)}}var Ft=Pt(),It=new Set;function Lt(){Ft=Pt();for(let e of It)e(Ft)}function Rt(){let[t,n]=e.W(Ft),r=e.V(()=>t());return e.Z(()=>{It.size===0&&window.addEventListener(`languagechange`,Lt),It.add(n),e.X(()=>{It.delete(n),It.size===0&&window.removeEventListener(`languagechange`,Lt)})}),{locale:()=>r().locale,direction:()=>r().direction}}var zt=e.z();function Bt(){let t=Rt();return e.et(zt)||t}var Vt=new Map;function Ht(t){let{locale:n}=Bt(),r=e.V(()=>n()+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():``));return e.V(()=>{let e=r(),i;return Vt.has(e)&&(i=Vt.get(e)),i||(i=new Intl.Collator(n(),t),Vt.set(e,i)),i})}var Ut=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function Wt(e){let[t,n]=wt(e);return[()=>t()??new Ut,n]}function Gt(e){return Be()?e.altKey:e.ctrlKey}function Kt(e){return Ie()?e.metaKey:e.ctrlKey}function qt(e){return new Ut(e)}function Jt(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function Yt(t){let n=U({selectionMode:`none`,selectionBehavior:`toggle`},t),[r,a]=e.W(!1),[o,s]=e.W(),[c,l]=Wt({value:e.V(()=>{let e=i(n.selectedKeys);return e==null?e:qt(e)}),defaultValue:e.V(()=>{let e=i(n.defaultSelectedKeys);return e==null?new Ut:qt(e)}),onChange:e=>n.onSelectionChange?.(e)}),[u,d]=e.W(i(n.selectionBehavior));return e.B(()=>{let e=c();i(n.selectionBehavior)===`replace`&&u()===`toggle`&&typeof e==`object`&&e.size===0&&d(`replace`)}),e.B(()=>{d(i(n.selectionBehavior)??`toggle`)}),{selectionMode:()=>i(n.selectionMode),disallowEmptySelection:()=>i(n.disallowEmptySelection)??!1,selectionBehavior:u,setSelectionBehavior:d,isFocused:r,setFocused:a,focusedKey:o,setFocusedKey:s,selectedKeys:c,setSelectedKeys:e=>{(i(n.allowDuplicateSelectionEvents)||!Jt(e,c()))&&l(e)}}}function Xt(t){let[n,r]=e.W(``),[a,o]=e.W(-1);return{typeSelectHandlers:{onKeyDown:e=>{if(i(t.isDisabled))return;let s=i(t.keyboardDelegate),c=i(t.selectionManager);if(!s.getKeyForSearch)return;let l=Zt(e.key);if(!l||e.ctrlKey||e.metaKey)return;l===` `&&n().trim().length>0&&(e.preventDefault(),e.stopPropagation());let u=r(e=>e+l),d=s.getKeyForSearch(u,c.focusedKey())??s.getKeyForSearch(u);d==null&&Qt(u)&&(u=u[0],d=s.getKeyForSearch(u,c.focusedKey())??s.getKeyForSearch(u)),d!=null&&(c.setFocusedKey(d),t.onTypeSelect?.(d)),clearTimeout(a()),o(window.setTimeout(()=>r(``),500))}}}}function Zt(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function Qt(e){return e.split(``).every(t=>t===e[0])}function $t(t,n,r){let a=e.J({selectOnFocus:()=>i(t.selectionManager).selectionBehavior()===`replace`},t),o=()=>r?.()??n(),{direction:s}=Bt(),c={top:0,left:0};ve(()=>i(a.isVirtualized)?void 0:o(),`scroll`,()=>{let e=o();e&&(c={top:e.scrollTop,left:e.scrollLeft})});let{typeSelectHandlers:l}=Xt({isDisabled:()=>i(a.disallowTypeAhead),keyboardDelegate:()=>i(a.keyboardDelegate),selectionManager:()=>i(a.selectionManager)}),u=()=>i(a.orientation)??`vertical`,d=e=>{B(e,l.onKeyDown),e.altKey&&e.key===`Tab`&&e.preventDefault();let t=n();if(!t?.contains(e.target))return;let r=i(a.selectionManager),o=i(a.selectOnFocus),c=t=>{t!=null&&(r.setFocusedKey(t),e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):o&&!Gt(e)&&r.replaceSelection(t))},d=i(a.keyboardDelegate),f=i(a.shouldFocusWrap),p=r.focusedKey();switch(e.key){case u()===`vertical`?`ArrowDown`:`ArrowRight`:if(d.getKeyBelow){e.preventDefault();let t;t=p==null?d.getFirstKey?.():d.getKeyBelow(p),t==null&&f&&(t=d.getFirstKey?.(p)),c(t)}break;case u()===`vertical`?`ArrowUp`:`ArrowLeft`:if(d.getKeyAbove){e.preventDefault();let t;t=p==null?d.getLastKey?.():d.getKeyAbove(p),t==null&&f&&(t=d.getLastKey?.(p)),c(t)}break;case u()===`vertical`?`ArrowLeft`:`ArrowUp`:if(d.getKeyLeftOf){e.preventDefault();let t=s()===`rtl`,n;n=p==null?t?d.getFirstKey?.():d.getLastKey?.():d.getKeyLeftOf(p),c(n)}break;case u()===`vertical`?`ArrowRight`:`ArrowDown`:if(d.getKeyRightOf){e.preventDefault();let t=s()===`rtl`,n;n=p==null?t?d.getLastKey?.():d.getFirstKey?.():d.getKeyRightOf(p),c(n)}break;case`Home`:if(d.getFirstKey){e.preventDefault();let t=d.getFirstKey(p,Kt(e));t!=null&&(r.setFocusedKey(t),Kt(e)&&e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):o&&r.replaceSelection(t))}break;case`End`:if(d.getLastKey){e.preventDefault();let t=d.getLastKey(p,Kt(e));t!=null&&(r.setFocusedKey(t),Kt(e)&&e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):o&&r.replaceSelection(t))}break;case`PageDown`:d.getKeyPageBelow&&p!=null&&(e.preventDefault(),c(d.getKeyPageBelow(p)));break;case`PageUp`:d.getKeyPageAbove&&p!=null&&(e.preventDefault(),c(d.getKeyPageAbove(p)));break;case`a`:Kt(e)&&r.selectionMode()===`multiple`&&i(a.disallowSelectAll)!==!0&&(e.preventDefault(),r.selectAll());break;case`Escape`:e.defaultPrevented||(e.preventDefault(),i(a.disallowEmptySelection)||r.clearSelection());break;case`Tab`:if(!i(a.allowsTabNavigation)){if(e.shiftKey)t.focus();else{let e=it(t,{tabbable:!0}),n,r;do r=e.lastChild(),r&&(n=r);while(r);n&&!n.contains(document.activeElement)&&H(n)}break}}},f=e=>{let t=i(a.selectionManager),n=i(a.keyboardDelegate),r=i(a.selectOnFocus);if(t.isFocused()){e.currentTarget.contains(e.target)||t.setFocused(!1);return}if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),t.focusedKey()==null){let i=e=>{e!=null&&(t.setFocusedKey(e),r&&t.replaceSelection(e))},a=e.relatedTarget;a&&e.currentTarget.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING?i(t.lastSelectedKey()??n.getLastKey?.()):i(t.firstSelectedKey()??n.getFirstKey?.())}else if(!i(a.isVirtualized)){let e=o();if(e){e.scrollTop=c.top,e.scrollLeft=c.left;let n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(H(n),ft(e,n))}}}},p=e=>{let t=i(a.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},m=e=>{o()===e.target&&e.preventDefault()},h=()=>{let e=i(a.autoFocus);if(!e)return;let t=i(a.selectionManager),r=i(a.keyboardDelegate),o;e===`first`&&(o=r.getFirstKey?.()),e===`last`&&(o=r.getLastKey?.());let s=t.selectedKeys();s.size&&(o=s.values().next().value),t.setFocused(!0),t.setFocusedKey(o);let c=n();c&&o==null&&!i(a.shouldUseVirtualFocus)&&H(c)};return e.Z(()=>{a.deferAutoFocus?setTimeout(h,0):h()}),e.B(e.Y([o,()=>i(a.isVirtualized),()=>i(a.selectionManager).focusedKey()],e=>{let[t,n,r]=e;if(n)r&&a.scrollToKey?.(r);else if(r&&t){let e=t.querySelector(`[data-key="${r}"]`);e&&ft(t,e)}})),{tabIndex:e.V(()=>{if(!i(a.shouldUseVirtualFocus))return i(a.selectionManager).focusedKey()==null?0:-1}),onKeyDown:d,onMouseDown:m,onFocusIn:f,onFocusOut:p}}function en(t,n){let r=()=>i(t.selectionManager),a=()=>i(t.key),o=()=>i(t.shouldUseVirtualFocus),s=e=>{r().selectionMode()!==`none`&&(r().selectionMode()===`single`?r().isSelected(a())&&!r().disallowEmptySelection()?r().toggleSelection(a()):r().replaceSelection(a()):e?.shiftKey?r().extendSelection(a()):r().selectionBehavior()===`toggle`||Kt(e)||`pointerType`in e&&e.pointerType===`touch`?r().toggleSelection(a()):r().replaceSelection(a()))},c=()=>r().isSelected(a()),l=()=>i(t.disabled)||r().isDisabled(a()),u=()=>!l()&&r().canSelectItem(a()),d=null,f=e=>{u()&&(d=e.pointerType,e.pointerType===`mouse`&&e.button===0&&!i(t.shouldSelectOnPressUp)&&s(e))},p=e=>{u()&&e.pointerType===`mouse`&&e.button===0&&i(t.shouldSelectOnPressUp)&&i(t.allowsDifferentPressOrigin)&&s(e)},m=e=>{u()&&(i(t.shouldSelectOnPressUp)&&!i(t.allowsDifferentPressOrigin)||d!==`mouse`)&&s(e)},h=e=>{!u()||![`Enter`,` `].includes(e.key)||(Gt(e)?r().toggleSelection(a()):s(e))},g=e=>{l()&&e.preventDefault()},_=e=>{let t=n();o()||l()||!t||e.target===t&&r().setFocusedKey(a())},v=e.V(()=>{if(!(o()||l()))return a()===r().focusedKey()?0:-1}),y=e.V(()=>i(t.virtualized)?void 0:a());return e.B(e.Y([n,a,o,()=>r().focusedKey(),()=>r().isFocused()],([e,n,r,i,a])=>{e&&n===i&&a&&!r&&document.activeElement!==e&&(t.focus?t.focus():H(e))})),{isSelected:c,isDisabled:l,allowsSelection:u,tabIndex:v,dataKey:y,onPointerDown:f,onPointerUp:p,onClick:m,onKeyDown:h,onMouseDown:g,onFocus:_}}var tn=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()===`none`)return!1;let t=this.getKey(e);return t!=null&&this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index<e.index;(!e||r)&&(e=n)}return e?.key}lastSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index>e.index;(!e||r)&&(e=n)}return e?.key}extendSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=this.state.selectedKeys(),r=n.anchorKey||t,i=new Ut(n,r,t);for(let e of this.getKeyRange(r,n.currentKey||t))i.delete(e);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&i.add(e);this.state.setSelectedKeys(i)}getKeyRange(e,t){let n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let n=[],r=e;for(;r!=null;){let e=this.collection().getItem(r);if(e&&e.type===`item`&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let t=this.collection().getItem(e);return t?!t||t.type!==`item`?null:t.key:e}toggleSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new Ut(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection()&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new Ut([t],t,t):new Ut;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()===`none`)return;let t=new Ut;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode()===`single`))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()===`multiple`&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new Ut)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!==`none`&&(this.selectionMode()===`single`?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()===`toggle`||t&&t.pointerType===`touch`?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let t=this.selectedKeys();if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()===`none`)return!1;let t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){let t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let n=this.collection().getItem(t);if(!n)continue;n.type===`item`&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},nn=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let t of e)this.keyMap.set(t.key,t);if(this.keyMap.size===0)return;let t,n=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),r.type===`item`&&(r.index=n++),t=r,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}};function rn(t){let n=Yt(t),r=kt({dataSource:()=>i(t.dataSource),getKey:()=>i(t.getKey),getTextValue:()=>i(t.getTextValue),getDisabled:()=>i(t.getDisabled),getSectionChildren:()=>i(t.getSectionChildren),factory:e=>t.filter?new nn(t.filter(e)):new nn(e)},[()=>t.filter]),a=new tn(r,n);return e.R(()=>{let e=n.focusedKey();e!=null&&!r().getItem(e)&&n.setFocusedKey(void 0)}),{collection:r,selectionManager:()=>a}}var an=e.z();function on(){return e.et(an)}function sn(){let e=on();if(e===void 0)throw Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function cn(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function ln(e,t){let n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){let t=e[r]?.ref();if(t&&cn(t,n))return r+1}return 0}function un(e){let t=e.map((e,t)=>[t,e]),n=!1;return t.sort(([e,t],[r,i])=>{let a=t.ref(),o=i.ref();return a===o||!a||!o?0:cn(a,o)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1)}),n?t.map(([e,t])=>t):e}function dn(e,t){let n=un(e);e!==n&&t(n)}function fn(e){let t=e[0],n=e[e.length-1]?.ref(),r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return Me(r).body}function pn(t,n){e.B(()=>{let r=setTimeout(()=>{dn(t(),n)});e.X(()=>clearTimeout(r))})}function mn(t,n){if(typeof IntersectionObserver!=`function`){pn(t,n);return}let r=[];e.B(()=>{let i=()=>{let e=!!r.length;r=t(),e&&dn(t(),n)},a=fn(t()),o=new IntersectionObserver(i,{root:a});for(let e of t()){let t=e.ref();t&&o.observe(t)}e.X(()=>o.disconnect())})}function hn(t={}){let[n,r]=Et({value:()=>i(t.items),onChange:e=>t.onItemsChange?.(e)});mn(n,r);let a=e=>(r(t=>we(t,e,ln(t,e))),()=>{r(t=>{let n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:t=>e.L(an.Provider,{value:{registerItem:a},get children(){return t.children}})}}function gn(t){let n=sn(),r=U({shouldRegisterItem:!0},t);e.B(()=>{if(!r.shouldRegisterItem)return;let t=n.registerItem(r.getItem());e.X(t)})}const _n=[`top`,`right`,`bottom`,`left`],vn=Math.min,G=Math.max,yn=Math.round,bn=Math.floor,xn=e=>({x:e,y:e}),Sn={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function Cn(e,t,n){return G(e,vn(t,n))}function wn(e,t){return typeof e==`function`?e(t):e}function Tn(e){return e.split(`-`)[0]}function En(e){return e.split(`-`)[1]}function Dn(e){return e===`x`?`y`:`x`}function On(e){return e===`y`?`height`:`width`}function kn(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function An(e){return Dn(kn(e))}function jn(e,t,n){n===void 0&&(n=!1);let r=En(e),i=An(e),a=On(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Bn(o)),[o,Bn(o)]}function Mn(e){let t=Bn(e);return[Nn(e),t,Nn(t)]}function Nn(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}const Pn=[`left`,`right`],Fn=[`right`,`left`],In=[`top`,`bottom`],Ln=[`bottom`,`top`];function Rn(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Fn:Pn:t?Pn:Fn;case`left`:case`right`:return t?In:Ln;default:return[]}}function zn(e,t,n,r){let i=En(e),a=Rn(Tn(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Nn)))),a}function Bn(e){let t=Tn(e);return Sn[t]+e.slice(t.length)}function Vn(e){return{top:0,right:0,bottom:0,left:0,...e}}function Hn(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Vn(e)}function Un(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function Wn(e,t,n){let{reference:r,floating:i}=e,a=kn(t),o=An(t),s=On(o),c=Tn(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(En(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1)}return p}async function Gn(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=wn(t,e),p=Hn(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Un(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Un(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}const Kn=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Gn},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Wn(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<50&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=Wn(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},qn=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=wn(e,t)||{};if(l==null)return{};let d=Hn(u),f={x:n,y:r},p=An(i),m=On(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=vn(d[_],T),D=vn(d[v],T),O=E,k=C-h[m]-D,A=C/2-h[m]/2+w,j=Cn(O,A,k),M=!c.arrow&&En(i)!=null&&A!==j&&a.reference[m]/2-(A<O?E:D)-h[m]/2<0,N=M?A<O?A-O:A-k:0;return{[p]:f[p]+N,data:{[p]:j,centerOffset:A-j-N,...M&&{alignmentOffset:N}},reset:M}}}),Jn=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=wn(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Tn(r),_=kn(o),v=Tn(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Bn(o)]:Mn(o)),x=p!==`none`;!d&&x&&b.push(...zn(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=jn(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===kn(t)||T.every(e=>kn(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=kn(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}};function Yn(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function Xn(e){return _n.some(t=>e[t]>=0)}const Zn=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=wn(e,t);switch(i){case`referenceHidden`:{let e=Yn(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:Xn(e)}}}case`escaped`:{let e=Yn(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:Xn(e)}}}default:return{}}}}},Qn=new Set([`left`,`top`]);async function $n(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Tn(n),s=En(n),c=kn(n)===`y`,l=Qn.has(o)?-1:1,u=a&&c?-1:1,d=wn(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}const er=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await $n(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},tr=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=wn(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=kn(Tn(i)),p=Dn(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=Cn(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=Cn(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},nr=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=wn(e,t),u=await o.detectOverflow(t,l),d=Tn(i),f=En(i),p=kn(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=vn(h-u[g],v),x=vn(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=G(u.left,0),t=G(u.right,0),n=G(u.top,0),r=G(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:G(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:G(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function rr(){return typeof window<`u`}function ir(e){return or(e)?(e.nodeName||``).toLowerCase():`#document`}function K(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ar(e){return((or(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function or(e){return rr()?e instanceof Node||e instanceof K(e).Node:!1}function sr(e){return rr()?e instanceof Element||e instanceof K(e).Element:!1}function cr(e){return rr()?e instanceof HTMLElement||e instanceof K(e).HTMLElement:!1}function lr(e){return!rr()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof K(e).ShadowRoot}function ur(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=xr(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function dr(e){return/^(table|td|th)$/.test(ir(e))}function fr(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}const pr=/transform|translate|scale|rotate|perspective|filter/,mr=/paint|layout|strict|content/,hr=e=>!!e&&e!==`none`;let gr;function _r(e){let t=sr(e)?xr(e):e;return hr(t.transform)||hr(t.translate)||hr(t.scale)||hr(t.rotate)||hr(t.perspective)||!yr()&&(hr(t.backdropFilter)||hr(t.filter))||pr.test(t.willChange||``)||mr.test(t.contain||``)}function vr(e){let t=Cr(e);for(;cr(t)&&!br(t);){if(_r(t))return t;if(fr(t))return null;t=Cr(t)}return null}function yr(){return gr??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),gr}function br(e){return/^(html|body|#document)$/.test(ir(e))}function xr(e){return K(e).getComputedStyle(e)}function Sr(e){return sr(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Cr(e){if(ir(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||lr(e)&&e.host||ar(e);return lr(t)?t.host:t}function wr(e){let t=Cr(e);return br(t)?e.ownerDocument?e.ownerDocument.body:e.body:cr(t)&&ur(t)?t:wr(t)}function Tr(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=wr(e),i=r===e.ownerDocument?.body,a=K(r);if(i){let e=Er(a);return t.concat(a,a.visualViewport||[],ur(r)?r:[],e&&n?Tr(e):[])}return t.concat(r,Tr(r,[],n))}function Er(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Dr(e){let t=xr(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=cr(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=yn(n)!==a||yn(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Or(e){return sr(e)?e:e.contextElement}function kr(e){let t=Or(e);if(!cr(t))return xn(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Dr(t),o=(a?yn(n.width):n.width)/r,s=(a?yn(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}const Ar=xn(0);function jr(e){let t=K(e);return!yr()||!t.visualViewport?Ar:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Mr(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==K(e)?!1:t}function Nr(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Or(e),o=xn(1);t&&(r?sr(r)&&(o=kr(r)):o=kr(e));let s=Mr(a,n,r)?jr(a):xn(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=K(a),t=r&&sr(r)?K(r):r,n=e,i=Er(n);for(;i&&r&&t!==n;){let e=kr(i),t=i.getBoundingClientRect(),r=xr(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=K(i),i=Er(n)}}return Un({width:u,height:d,x:c,y:l})}function Pr(e,t){let n=Sr(e).scrollLeft;return t?t.left+n:Nr(ar(e)).left+n}function Fr(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Pr(e,n),y:n.top+t.scrollTop}}function Ir(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=ar(r),s=t?fr(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=xn(1),u=xn(0),d=cr(r);if((d||!d&&!a)&&((ir(r)!==`body`||ur(o))&&(c=Sr(r)),d)){let e=Nr(r);l=kr(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Fr(o,c):xn(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Lr(e){return Array.from(e.getClientRects())}function Rr(e){let t=ar(e),n=Sr(e),r=e.ownerDocument.body,i=G(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=G(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+Pr(e),s=-n.scrollTop;return xr(r).direction===`rtl`&&(o+=G(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}function zr(e,t){let n=K(e),r=ar(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=yr();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=Pr(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=25&&(a-=o)}else l<=25&&(a+=l);return{width:a,height:o,x:s,y:c}}function Br(e,t){let n=Nr(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=cr(e)?kr(e):xn(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function Vr(e,t,n){let r;if(t===`viewport`)r=zr(e,n);else if(t===`document`)r=Rr(ar(e));else if(sr(t))r=Br(t,n);else{let n=jr(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Un(r)}function Hr(e,t){let n=Cr(e);return n===t||!sr(n)||br(n)?!1:xr(n).position===`fixed`||Hr(n,t)}function Ur(e,t){let n=t.get(e);if(n)return n;let r=Tr(e,[],!1).filter(e=>sr(e)&&ir(e)!==`body`),i=null,a=xr(e).position===`fixed`,o=a?Cr(e):e;for(;sr(o)&&!br(o);){let t=xr(o),n=_r(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||ur(o)&&!n&&Hr(e,o))?r=r.filter(e=>e!==o):i=t,o=Cr(o)}return t.set(e,r),r}function Wr(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?fr(t)?[]:Ur(t,this._c):[].concat(n),r],o=Vr(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=Vr(t,a[e],i);s=G(n.top,s),c=vn(n.right,c),l=vn(n.bottom,l),u=G(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Gr(e){let{width:t,height:n}=Dr(e);return{width:t,height:n}}function Kr(e,t,n){let r=cr(t),i=ar(t),a=n===`fixed`,o=Nr(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=xn(0);function l(){c.x=Pr(i)}if(r||!r&&!a){if((ir(t)!==`body`||ur(i))&&(s=Sr(t)),r){let e=Nr(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l()}a&&!r&&i&&l();let u=i&&!r&&!a?Fr(i,s):xn(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function qr(e){return xr(e).position===`static`}function Jr(e,t){if(!cr(e)||xr(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return ar(e)===n&&(n=n.ownerDocument.body),n}function Yr(e,t){let n=K(e);if(fr(e))return n;if(!cr(e)){let t=Cr(e);for(;t&&!br(t);){if(sr(t)&&!qr(t))return t;t=Cr(t)}return n}let r=Jr(e,t);for(;r&&dr(r)&&qr(r);)r=Jr(r,t);return r&&br(r)&&qr(r)&&!_r(r)?n:r||vr(e)||n}const Xr=async function(e){let t=this.getOffsetParent||Yr,n=this.getDimensions,r=await n(e.floating);return{reference:Kr(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Zr(e){return xr(e).direction===`rtl`}const Qr={convertOffsetParentRelativeRectToViewportRelativeRect:Ir,getDocumentElement:ar,getClippingRect:Wr,getOffsetParent:Yr,getElementRects:Xr,getClientRects:Lr,getDimensions:Gr,getScale:kr,isElement:sr,isRTL:Zr};function $r(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function ei(e,t){let n=null,r,i=ar(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=bn(d),h=bn(i.clientWidth-(u+f)),g=bn(i.clientHeight-(d+p)),_=bn(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:G(0,vn(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!$r(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function ti(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Or(e),u=i||a?[...l?Tr(l):[],...t?Tr(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?ei(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Nr(e):null;c&&g();function g(){let t=Nr(e);h&&!$r(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}const ni=er,ri=tr,ii=Jn,ai=nr,oi=Zn,si=qn,ci=(e,t,n)=>{let r=new Map,i={platform:Qr,...n},a={...i.platform,_c:r};return Kn(e,t,{...i,platform:a})};var li=e.z();function ui(){let t=e.et(li);if(t===void 0)throw Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return t}var di=e.O(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`),fi=30,pi=fi/2,mi={top:180,right:-90,bottom:0,left:90};function hi(t){let n=ui(),r=U({size:fi},t),[i,a]=e.Q(r,[`ref`,`style`,`size`]),o=()=>n.currentPlacement().split(`-`)[0],s=gi(n.contentRef),c=()=>s()?.getPropertyValue(`background-color`)||`none`,l=()=>s()?.getPropertyValue(`border-${o()}-color`)||`none`,u=()=>s()?.getPropertyValue(`border-${o()}-width`)||`0px`,d=()=>Number.parseInt(u())*2*(fi/i.size),f=()=>`rotate(${mi[o()]} ${pi} ${pi}) translate(0 2)`;return e.L(W,e.J({as:`div`,ref(e){let t=R(n.setArrowRef,i.ref);typeof t==`function`&&t(e)},"aria-hidden":`true`,get style(){return Ce({position:`absolute`,"font-size":`${i.size}px`,width:`1em`,height:`1em`,"pointer-events":`none`,fill:c(),stroke:l(),"stroke-width":d()},i.style)}},a,{get children(){let t=di(),n=t.firstChild;return e.H(()=>e.T(n,`transform`,f())),t}}))}function gi(t){let[n,r]=e.W();return e.B(()=>{let e=t();e&&r(je(e).getComputedStyle(e))}),n}function _i(t){let n=ui(),[r,i]=e.Q(t,[`ref`,`style`]);return e.L(W,e.J({as:`div`,ref(e){let t=R(n.setPositionerRef,r.ref);typeof t==`function`&&t(e)},"data-popper-positioner":``,get style(){return Ce({position:`absolute`,top:0,left:0,"min-width":`max-content`},r.style)}},i))}function vi(e){let{x:t=0,y:n=0,width:r=0,height:i=0}=e??{};if(typeof DOMRect==`function`)return new DOMRect(t,n,r,i);let a={x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:n+i,left:t};return{...a,toJSON:()=>a}}function yi(e,t){return{contextElement:e,getBoundingClientRect:()=>{let n=t(e);return n?vi(n):e?e.getBoundingClientRect():vi()}}}function bi(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var xi={top:`bottom`,right:`left`,bottom:`top`,left:`right`};function Si(e,t){let[n,r]=e.split(`-`),i=xi[n];return r?n===`left`||n===`right`?`${i} ${r===`start`?`top`:`bottom`}`:r===`start`?`${i} ${t===`rtl`?`right`:`left`}`:`${i} ${t===`rtl`?`left`:`right`}`:`${i} center`}function Ci(t){let n=U({getAnchorRect:e=>e?.getBoundingClientRect(),placement:`bottom`,gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},t),[r,i]=e.W(),[a,o]=e.W(),[s,c]=e.W(n.placement),l=()=>yi(n.anchorRef?.(),n.getAnchorRect),{direction:u}=Bt();async function d(){let e=l(),t=r(),i=a();if(!e||!t)return;let o=(i?.clientHeight||0)/2,s=typeof n.gutter==`number`?n.gutter+o:n.gutter??o;t.style.setProperty(`--kb-popper-content-overflow-padding`,`${n.overflowPadding}px`),e.getBoundingClientRect();let d=[ni(({placement:e})=>{let t=!!e.split(`-`)[1];return{mainAxis:s,crossAxis:t?void 0:n.shift,alignmentAxis:n.shift}})];if(n.flip!==!1){let e=typeof n.flip==`string`?n.flip.split(` `):void 0;if(e!==void 0&&!e.every(bi))throw Error("`flip` expects a spaced-delimited list of placements");d.push(ii({padding:n.overflowPadding,fallbackPlacements:e}))}(n.slide||n.overlap)&&d.push(ri({mainAxis:n.slide,crossAxis:n.overlap,padding:n.overflowPadding})),d.push(ai({padding:n.overflowPadding,apply({availableWidth:e,availableHeight:r,rects:i}){let a=Math.round(i.reference.width);e=Math.floor(e),r=Math.floor(r),t.style.setProperty(`--kb-popper-anchor-width`,`${a}px`),t.style.setProperty(`--kb-popper-content-available-width`,`${e}px`),t.style.setProperty(`--kb-popper-content-available-height`,`${r}px`),n.sameWidth&&(t.style.width=`${a}px`),n.fitViewport&&(t.style.maxWidth=`${e}px`,t.style.maxHeight=`${r}px`)}})),n.hideWhenDetached&&d.push(oi({padding:n.detachedPadding})),i&&d.push(si({element:i,padding:n.arrowPadding}));let f=await ci(e,t,{placement:n.placement,strategy:`absolute`,middleware:d,platform:{...Qr,isRTL:()=>u()===`rtl`}});if(c(f.placement),n.onCurrentPlacementChange?.(f.placement),!t)return;t.style.setProperty(`--kb-popper-content-transform-origin`,Si(f.placement,u()));let p=Math.round(f.x),m=Math.round(f.y),h;if(n.hideWhenDetached&&(h=f.middlewareData.hide?.referenceHidden?`hidden`:`visible`),Object.assign(t.style,{top:`0`,left:`0`,transform:`translate3d(${p}px, ${m}px, 0)`,visibility:h}),i&&f.middlewareData.arrow){let{x:e,y:t}=f.middlewareData.arrow,n=f.placement.split(`-`)[0];Object.assign(i.style,{left:e==null?``:`${e}px`,top:t==null?``:`${t}px`,[n]:`100%`})}}e.B(()=>{let t=l(),n=r();if(!t||!n)return;let i=ti(t,n,d,{elementResize:typeof ResizeObserver==`function`});e.X(i)}),e.B(()=>{let e=r(),t=n.contentRef?.();!e||!t||queueMicrotask(()=>{e.style.zIndex=getComputedStyle(t).zIndex})});let f={currentPlacement:s,contentRef:()=>n.contentRef?.(),setPositionerRef:i,setArrowRef:o};return e.L(li.Provider,{value:f,get children(){return n.children}})}var wi=Object.assign(Ci,{Arrow:hi,Context:li,usePopperContext:ui,Positioner:_i}),Ti=`data-kb-top-layer`,Ei,Di=!1,Oi=[];function ki(e){return Oi.findIndex(t=>t.node===e)}function Ai(e){return Oi[ki(e)]}function ji(e){return Oi[Oi.length-1].node===e}function Mi(){return Oi.filter(e=>e.isPointerBlocking)}function Ni(){return[...Mi()].slice(-1)[0]}function Pi(){return Mi().length>0}function Fi(e){let t=ki(Ni()?.node);return ki(e)<t}function Ii(e){Oi.push(e)}function Li(e){let t=ki(e);t<0||Oi.splice(t,1)}function Ri(){for(let{node:e}of Oi)e.style.pointerEvents=Fi(e)?`none`:`auto`}function zi(e){if(Pi()&&!Di){let t=Me(e);Ei=document.body.style.pointerEvents,t.body.style.pointerEvents=`none`,Di=!0}}function Bi(e){if(Pi())return;let t=Me(e);t.body.style.pointerEvents=Ei,t.body.style.length===0&&t.body.removeAttribute(`style`),Di=!1}var q={layers:Oi,isTopMostLayer:ji,hasPointerBlockingLayer:Pi,isBelowPointerBlockingLayer:Fi,addLayer:Ii,removeLayer:Li,indexOf:ki,find:Ai,assignPointerEventToLayers:Ri,disableBodyPointerEvents:zi,restoreBodyPointerEvents:Bi},Vi=`interactOutside.pointerDownOutside`,Hi=`interactOutside.focusOutside`;function Ui(t,n){let r,a=st,o=()=>Me(n()),s=e=>t.onPointerDownOutside?.(e),c=e=>t.onFocusOutside?.(e),l=e=>t.onInteractOutside?.(e),u=e=>{let r=e.target;return!(r instanceof Element)||r.closest(`[data-kb-top-layer]`)||!z(o(),r)||z(n(),r)?!1:!t.shouldExcludeElement?.(r)},d=e=>{function t(){let t=n(),r=e.target;if(!t||!r||!u(e))return;let i=V([s,l]);r.addEventListener(Vi,i,{once:!0});let a=new CustomEvent(Vi,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:e.button===2||Ve(e)&&e.button===0}});r.dispatchEvent(a)}e.pointerType===`touch`?(o().removeEventListener(`click`,t),a=t,o().addEventListener(`click`,t,{once:!0})):t()},f=e=>{let t=n(),r=e.target;if(!t||!r||!u(e))return;let i=V([c,l]);r.addEventListener(Hi,i,{once:!0});let a=new CustomEvent(Hi,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(a)};e.B(()=>{i(t.isDisabled)||(r=window.setTimeout(()=>{o().addEventListener(`pointerdown`,d,!0)},0),o().addEventListener(`focusin`,f,!0),e.X(()=>{window.clearTimeout(r),o().removeEventListener(`click`,a),o().removeEventListener(`pointerdown`,d,!0),o().removeEventListener(`focusin`,f,!0)}))})}function Wi(t){let n=e=>{e.key===Pe.Escape&&t.onEscapeKeyDown?.(e)};e.B(()=>{if(i(t.isDisabled))return;let r=t.ownerDocument?.()??Me();r.addEventListener(`keydown`,n),e.X(()=>{r.removeEventListener(`keydown`,n)})})}var Gi=e.z();function Ki(){return e.et(Gi)}function qi(t){let n,r=Ki(),[i,a]=e.Q(t,[`ref`,`disableOutsidePointerEvents`,`excludedElements`,`onEscapeKeyDown`,`onPointerDownOutside`,`onFocusOutside`,`onInteractOutside`,`onDismiss`,`bypassTopMostLayerCheck`]),o=new Set([]),s=e=>{o.add(e);let t=r?.registerNestedLayer(e);return()=>{o.delete(e),t?.()}};Ui({shouldExcludeElement:e=>n?i.excludedElements?.some(t=>z(t(),e))||[...o].some(t=>z(t,e)):!1,onPointerDownOutside:e=>{!n||q.isBelowPointerBlockingLayer(n)||!i.bypassTopMostLayerCheck&&!q.isTopMostLayer(n)||(i.onPointerDownOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.())},onFocusOutside:e=>{i.onFocusOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.()}},()=>n),Wi({ownerDocument:()=>Me(n),onEscapeKeyDown:e=>{!n||!q.isTopMostLayer(n)||(i.onEscapeKeyDown?.(e),!e.defaultPrevented&&i.onDismiss&&(e.preventDefault(),i.onDismiss()))}}),e.Z(()=>{if(!n)return;q.addLayer({node:n,isPointerBlocking:i.disableOutsidePointerEvents,dismiss:i.onDismiss});let t=r?.registerNestedLayer(n);q.assignPointerEventToLayers(),q.disableBodyPointerEvents(n),e.X(()=>{n&&(q.removeLayer(n),t?.(),q.assignPointerEventToLayers(),q.restoreBodyPointerEvents(n))})}),e.B(e.Y([()=>n,()=>i.disableOutsidePointerEvents],([t,n])=>{if(!t)return;let r=q.find(t);r&&r.isPointerBlocking!==n&&(r.isPointerBlocking=n,q.assignPointerEventToLayers()),n&&q.disableBodyPointerEvents(t),e.X(()=>{q.restoreBodyPointerEvents(t)})},{defer:!0}));let c={registerNestedLayer:s};return e.L(Gi.Provider,{value:c,get children(){return e.L(W,e.J({as:`div`,ref(e){let t=R(e=>n=e,i.ref);typeof t==`function`&&t(e)}},a))}})}function Ji(e={}){let[t,n]=Tt({value:()=>i(e.open),defaultValue:()=>!!i(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},a=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:a,toggle:()=>{t()?a():r()}}}function Yi(e){return t=>(e(t),()=>e(void 0))}var J=e=>typeof e==`function`?e():e,Xi=t=>{let n=e.V(()=>{let e=J(t.element);if(e)return getComputedStyle(e)}),r=()=>n()?.animationName??`none`,[i,a]=e.W(J(t.show)?`present`:`hidden`),o=`none`;return e.B(i=>{let s=J(t.show);return e.$(()=>{if(i===s)return s;let e=o,t=r();s?a(`present`):t===`none`||n()?.display===`none`?a(`hidden`):a(i===!0&&e!==t?`hiding`:`hidden`)}),s}),e.B(()=>{let n=J(t.element);if(!n)return;let s=e=>{e.target===n&&(o=r())},c=e=>{let t=r().includes(e.animationName);e.target===n&&t&&i()===`hiding`&&a(`hidden`)};n.addEventListener(`animationstart`,s),n.addEventListener(`animationcancel`,c),n.addEventListener(`animationend`,c),e.X(()=>{n.removeEventListener(`animationstart`,s),n.removeEventListener(`animationcancel`,c),n.removeEventListener(`animationend`,c)})}),{present:()=>i()===`present`||i()===`hiding`,state:i,setState:a}},Zi=[`id`,`name`,`validationState`,`required`,`disabled`,`readOnly`];function Qi(t){let n=U({id:`form-control-${e.G()}`},t),[r,a]=e.W(),[o,s]=e.W(),[c,l]=e.W(),[u,d]=e.W();return{formControlContext:{name:()=>i(n.name)??i(n.id),dataset:e.V(()=>({"data-valid":i(n.validationState)===`valid`?``:void 0,"data-invalid":i(n.validationState)===`invalid`?``:void 0,"data-required":i(n.required)?``:void 0,"data-disabled":i(n.disabled)?``:void 0,"data-readonly":i(n.readOnly)?``:void 0})),validationState:()=>i(n.validationState),isRequired:()=>i(n.required),isDisabled:()=>i(n.disabled),isReadOnly:()=>i(n.readOnly),labelId:r,fieldId:o,descriptionId:c,errorMessageId:u,getAriaLabelledBy:(e,t,n)=>{let i=n!=null||r()!=null;return[n,r(),i&&t!=null?e:void 0].filter(Boolean).join(` `)||void 0},getAriaDescribedBy:e=>[c(),u(),e].filter(Boolean).join(` `)||void 0,generateId:ke(()=>i(n.id)),registerLabel:Yi(a),registerField:Yi(s),registerDescription:Yi(l),registerErrorMessage:Yi(d)}}}var $i=e.z();function ea(){let t=e.et($i);if(t===void 0)throw Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return t}function ta(t){let n=ea(),r=U({id:n.generateId(`description`)},t);return e.B(()=>e.X(n.registerDescription(r.id))),e.L(W,e.J({as:`div`},()=>n.dataset(),r))}function na(t){let n,r=ea(),i=U({id:r.generateId(`label`)},t),[a,o]=e.Q(i,[`ref`]),s=gt(()=>n,()=>`label`);return e.B(()=>e.X(r.registerLabel(o.id))),e.L(W,e.J({as:`label`,ref(e){let t=R(e=>n=e,a.ref);typeof t==`function`&&t(e)},get for(){return e.C(()=>s()===`label`)()?r.fieldId():void 0}},()=>r.dataset(),o))}function ra(t,n){e.B(e.Y(t,t=>{if(t==null)return;let r=ia(t);r!=null&&(r.addEventListener(`reset`,n,{passive:!0}),e.X(()=>{r.removeEventListener(`reset`,n)}))}))}function ia(e){return aa(e)?e.form:e.closest(`form`)}function aa(e){return e.matches(`textarea, input, select, button`)}function oa(t){let n=ea(),r=U({id:n.generateId(`error-message`)},t),[i,a]=e.Q(r,[`forceMount`]),o=()=>n.validationState()===`invalid`;return e.B(()=>{o()&&e.X(n.registerErrorMessage(a.id))}),e.L(e.P,{get when(){return i.forceMount||o()},get children(){return e.L(W,e.J({as:`div`},()=>n.dataset(),a))}})}var sa=`focusScope.autoFocusOnMount`,ca=`focusScope.autoFocusOnUnmount`,la={bubbles:!1,cancelable:!0},ua={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=Te(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=Te(this.stack,e),this.active()?.resume()}};function da(t,n){let[r,a]=e.W(!1),o={pause(){a(!0)},resume(){a(!1)}},s=null,c=e=>t.onMountAutoFocus?.(e),l=e=>t.onUnmountAutoFocus?.(e),u=()=>Me(n()),d=()=>{let e=u().createElement(`span`);return e.setAttribute(`data-focus-trap`,``),e.tabIndex=0,Object.assign(e.style,ht),e},f=()=>{let e=n();return e?Xe(e,!0).filter(e=>!e.hasAttribute(`data-focus-trap`)):[]},p=()=>{let e=f();return e.length>0?e[0]:null},m=()=>{let e=f();return e.length>0?e[e.length-1]:null},h=()=>{let e=n();if(!e)return!1;let t=Ae(e);return!t||z(e,t)?!1:Qe(t)};e.B(()=>{let t=n();if(!t)return;ua.add(o);let r=Ae(t);if(!z(t,r)){let e=new CustomEvent(sa,la);t.addEventListener(sa,c),t.dispatchEvent(e),e.defaultPrevented||setTimeout(()=>{H(p()),Ae(t)===r&&H(t)},0)}e.X(()=>{t.removeEventListener(sa,c),setTimeout(()=>{let e=new CustomEvent(ca,la);h()&&e.preventDefault(),t.addEventListener(ca,l),t.dispatchEvent(e),e.defaultPrevented||H(r??u().body),t.removeEventListener(ca,l),ua.remove(o)},0)})}),e.B(()=>{let a=n();if(!a||!i(t.trapFocus)||r())return;let o=e=>{let t=e.target;t?.closest(`[data-kb-top-layer]`)||(z(a,t)?s=t:H(s))},c=e=>{let t=e.relatedTarget??Ae(a);t?.closest(`[data-kb-top-layer]`)||z(a,t)||H(s)};u().addEventListener(`focusin`,o),u().addEventListener(`focusout`,c),e.X(()=>{u().removeEventListener(`focusin`,o),u().removeEventListener(`focusout`,c)})}),e.B(()=>{let a=n();if(!a||!i(t.trapFocus)||r())return;let o=d();a.insertAdjacentElement(`afterbegin`,o);let s=d();a.insertAdjacentElement(`beforeend`,s);function c(e){let t=p(),n=m();e.relatedTarget===t?H(n):H(t)}o.addEventListener(`focusin`,c),s.addEventListener(`focusin`,c);let l=new MutationObserver(e=>{for(let t of e)t.previousSibling===s&&(s.remove(),a.insertAdjacentElement(`beforeend`,s)),t.nextSibling===o&&(o.remove(),a.insertAdjacentElement(`afterbegin`,o))});l.observe(a,{childList:!0,subtree:!1}),e.X(()=>{o.removeEventListener(`focusin`,c),s.removeEventListener(`focusin`,c),o.remove(),s.remove(),l.disconnect()})})}var fa=`data-live-announcer`;function pa(t){e.B(()=>{i(t.isDisabled)||e.X(ga(i(t.targets),i(t.root)))})}var ma=new WeakMap,ha=[];function ga(e,t=document.body){let n=new Set(e),r=new Set,i=e=>{for(let t of e.querySelectorAll(`[${fa}], [${Ti}]`))n.add(t);let t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&a(e),o!==NodeFilter.FILTER_REJECT){let e=i.nextNode();for(;e!=null;)a(e),e=i.nextNode()}},a=e=>{let t=ma.get(e)??0;(e.getAttribute(`aria-hidden`)!==`true`||t!==0)&&(t===0&&e.setAttribute(`aria-hidden`,`true`),r.add(e),ma.set(e,t+1))};ha.length&&ha[ha.length-1].disconnect(),i(t);let o=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`&&t.addedNodes.length!==0&&![...n,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&(e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer===`true`)?n.add(e):e instanceof Element&&i(e)}});o.observe(t,{childList:!0,subtree:!0});let s={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return ha.push(s),()=>{o.disconnect();for(let e of r){let t=ma.get(e);if(t==null)return;t===1?(e.removeAttribute(`aria-hidden`),ma.delete(e)):ma.set(e,t-1)}s===ha[ha.length-1]?(ha.pop(),ha.length&&ha[ha.length-1].observe()):ha.splice(ha.indexOf(s),1)}}var _a=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},va=new Map,ya=t=>{e.B(()=>{let n=J(t.style)??{},r=J(t.properties)??[],i={};for(let e in n)i[e]=t.element.style[e];let a=va.get(t.key);a?a.activeCount++:va.set(t.key,{activeCount:1,originalStyles:i,properties:r.map(e=>e.key)}),Object.assign(t.element.style,t.style);for(let e of r)t.element.style.setProperty(e.key,e.value);e.X(()=>{let e=va.get(t.key);if(e){if(e.activeCount!==1){e.activeCount--;return}va.delete(t.key);for(let[n,r]of Object.entries(e.originalStyles))t.element.style[n]=r;for(let n of e.properties)t.element.style.removeProperty(n);t.element.style.length===0&&t.element.removeAttribute(`style`),t.cleanup?.()}})})},ba=(e,t)=>{switch(t){case`x`:return[e.clientWidth,e.scrollLeft,e.scrollWidth];case`y`:return[e.clientHeight,e.scrollTop,e.scrollHeight]}},xa=(e,t)=>{let n=getComputedStyle(e),r=t===`x`?n.overflowX:n.overflowY;return r===`auto`||r===`scroll`||e.tagName===`HTML`&&r===`visible`},Sa=(e,t,n)=>{let r=t===`x`&&window.getComputedStyle(e).direction===`rtl`?-1:1,i=e,a=0,o=0,s=!1;do{let[e,c,l]=ba(i,t),u=l-e-r*c;(c!==0||u!==0)&&xa(i,t)&&(a+=u,o+=c),i===(n??document.documentElement)?s=!0:i=i._$host??i.parentElement}while(i&&!s);return[a,o]},[Ca,wa]=e.W([]),Ta=e=>Ca().indexOf(e)===Ca().length-1,Ea=t=>{let n=e.J({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:`padding`,restoreScrollPosition:!0,allowPinchZoom:!1},t),r=e.G(),i=[0,0],a=null,o=null;e.B(()=>{J(n.enabled)&&(wa(e=>[...e,r]),e.X(()=>{wa(e=>e.filter(e=>e!==r))}))}),e.B(()=>{if(!J(n.enabled)||!J(n.hideScrollbar))return;let{body:e}=document,t=window.innerWidth-e.offsetWidth;if(J(n.preventScrollbarShift)){let r={overflow:`hidden`},i=[];t>0&&(J(n.preventScrollbarShiftMode)===`padding`?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${t}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${t}px)`,i.push({key:`--scrollbar-width`,value:`${t}px`}));let a=window.scrollY,o=window.scrollX;ya({key:`prevent-scroll`,element:e,style:r,properties:i,cleanup:()=>{J(n.restoreScrollPosition)&&t>0&&window.scrollTo(o,a)}})}else ya({key:`prevent-scroll`,element:e,style:{overflow:`hidden`}})}),e.B(()=>{!Ta(r)||!J(n.enabled)||(document.addEventListener(`wheel`,c,{passive:!1}),document.addEventListener(`touchstart`,s,{passive:!1}),document.addEventListener(`touchmove`,l,{passive:!1}),e.X(()=>{document.removeEventListener(`wheel`,c),document.removeEventListener(`touchstart`,s),document.removeEventListener(`touchmove`,l)}))});let s=e=>{i=Oa(e),a=null,o=null},c=e=>{let t=e.target,r=J(n.element),i=Da(e),a=Math.abs(i[0])>Math.abs(i[1])?`x`:`y`,o=ka(t,a,a===`x`?i[0]:i[1],r),s;s=r&&_a(r,t)?!o:!0,s&&e.cancelable&&e.preventDefault()},l=e=>{let t=J(n.element),r=e.target,s;if(e.touches.length===2)s=!J(n.allowPinchZoom);else{if(a==null||o===null){let t=Oa(e).map((e,t)=>i[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?`x`:`y`;a=n,o=n===`x`?t[0]:t[1]}if(r.type===`range`)s=!1;else{let e=ka(r,a,o,t);s=t&&_a(t,r)?!e:!0}}s&&e.cancelable&&e.preventDefault()}},Da=e=>[e.deltaX,e.deltaY],Oa=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],ka=(e,t,n,r)=>{let[i,a]=Sa(e,t,r!==null&&_a(r,e)?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(a)<1)},Aa=Ea,ja={};yt(ja,{Description:()=>ta,ErrorMessage:()=>oa,Item:()=>Ia,ItemControl:()=>La,ItemDescription:()=>Ra,ItemIndicator:()=>za,ItemInput:()=>Ba,ItemLabel:()=>Va,Label:()=>Ha,RadioGroup:()=>Wa,Root:()=>Ua,useRadioGroupContext:()=>Na});var Ma=e.z();function Na(){let t=e.et(Ma);if(t===void 0)throw Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return t}var Pa=e.z();function Fa(){let t=e.et(Pa);if(t===void 0)throw Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return t}function Ia(t){let n=ea(),r=Na(),i=U({id:`${n.generateId(`item`)}-${e.G()}`},t),[a,o]=e.Q(i,[`value`,`disabled`,`onPointerDown`]),[s,c]=e.W(),[l,u]=e.W(),[d,f]=e.W(),[p,m]=e.W(),[h,g]=e.W(!1),_=e.V(()=>r.isDefaultValue(a.value)),v=e.V(()=>r.isSelectedValue(a.value)),y=e.V(()=>a.disabled||n.isDisabled()||!1),b=e=>{B(e,a.onPointerDown),h()&&e.preventDefault()},x=e.V(()=>({...n.dataset(),"data-disabled":y()?``:void 0,"data-checked":v()?``:void 0})),S={value:()=>a.value,dataset:x,isDefault:_,isSelected:v,isDisabled:y,inputId:s,labelId:l,descriptionId:d,inputRef:p,select:()=>r.setSelectedValue(a.value),generateId:ke(()=>o.id),registerInput:Yi(c),registerLabel:Yi(u),registerDescription:Yi(f),setIsFocused:g,setInputRef:m};return e.L(Pa.Provider,{value:S,get children(){return e.L(W,e.J({as:`div`,role:`group`,onPointerDown:b},x,o))}})}function La(t){let n=Fa(),r=U({id:n.generateId(`control`)},t),[i,a]=e.Q(r,[`onClick`,`onKeyDown`]);return e.L(W,e.J({as:`div`,onClick:e=>{B(e,i.onClick),n.select(),n.inputRef()?.focus()},onKeyDown:e=>{B(e,i.onKeyDown),e.key===Pe.Space&&(n.select(),n.inputRef()?.focus())}},()=>n.dataset(),a))}function Ra(t){let n=Fa(),r=U({id:n.generateId(`description`)},t);return e.B(()=>e.X(n.registerDescription(r.id))),e.L(W,e.J({as:`div`},()=>n.dataset(),r))}function za(t){let n=Fa(),r=U({id:n.generateId(`indicator`)},t),[i,a]=e.Q(r,[`ref`,`forceMount`]),[o,s]=e.W(),{present:c}=Xi({show:()=>i.forceMount||n.isSelected(),element:()=>o()??null});return e.L(e.P,{get when(){return c()},get children(){return e.L(W,e.J({as:`div`,ref(e){let t=R(s,i.ref);typeof t==`function`&&t(e)}},()=>n.dataset(),a))}})}function Ba(t){let n=ea(),r=Na(),i=Fa(),a=U({id:i.generateId(`input`)},t),[o,s]=e.Q(a,[`ref`,`style`,`aria-labelledby`,`aria-describedby`,`onChange`,`onFocus`,`onBlur`]),c=()=>[o[`aria-labelledby`],i.labelId(),o[`aria-labelledby`]!=null&&s[`aria-label`]!=null?s.id:void 0].filter(Boolean).join(` `)||void 0,l=()=>[o[`aria-describedby`],i.descriptionId(),r.ariaDescribedBy()].filter(Boolean).join(` `)||void 0,[u,d]=e.W(!1);return e.B(e.Y([()=>i.isSelected(),()=>i.value()],e=>{if(!e[0]&&e[1]===i.value())return;d(!0);let t=i.inputRef();t?.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!0}))},{defer:!0})),e.B(()=>e.X(i.registerInput(s.id))),e.L(W,e.J({as:`input`,ref(e){let t=R(i.setInputRef,o.ref);typeof t==`function`&&t(e)},type:`radio`,get name(){return n.name()},get value(){return i.value()},get checked(){return i.isSelected()},get required(){return n.isRequired()},get disabled(){return i.isDisabled()},get readonly(){return n.isReadOnly()},get style(){return Ce({...ht},o.style)},get"aria-labelledby"(){return c()},get"aria-describedby"(){return l()},onChange:e=>{if(B(e,o.onChange),e.stopPropagation(),!u()){r.setSelectedValue(i.value());let t=e.target;t.checked=i.isSelected()}d(!1)},onFocus:e=>{B(e,o.onFocus),i.setIsFocused(!0)},onBlur:e=>{B(e,o.onBlur),i.setIsFocused(!1)}},()=>i.dataset(),s))}function Va(t){let n=Fa(),r=U({id:n.generateId(`label`)},t);return e.B(()=>e.X(n.registerLabel(r.id))),e.L(W,e.J({as:`label`,get for(){return n.inputId()}},()=>n.dataset(),r))}function Ha(t){return e.L(na,e.J({as:`span`},t))}function Ua(t){let n,r=U({id:`radiogroup-${e.G()}`,orientation:`vertical`},t),[a,o,s]=e.Q(r,[`ref`,`value`,`defaultValue`,`onChange`,`orientation`,`aria-labelledby`,`aria-describedby`],Zi),[c,l]=wt({value:()=>a.value,defaultValue:()=>a.defaultValue,onChange:e=>a.onChange?.(e)}),{formControlContext:u}=Qi(o);ra(()=>n,()=>l(a.defaultValue??``));let d=()=>u.getAriaLabelledBy(i(o.id),s[`aria-label`],a[`aria-labelledby`]),f=()=>u.getAriaDescribedBy(a[`aria-describedby`]),p=e=>e===t.defaultValue,m=e=>e===c(),h={ariaDescribedBy:f,isDefaultValue:p,isSelectedValue:m,setSelectedValue:e=>{if(!(u.isReadOnly()||u.isDisabled())&&(l(e),n))for(let e of n.querySelectorAll(`[type='radio']`)){let t=e;t.checked=m(t.value)}}};return e.L($i.Provider,{value:u,get children(){return e.L(Ma.Provider,{value:h,get children(){return e.L(W,e.J({as:`div`,ref(e){let t=R(e=>n=e,a.ref);typeof t==`function`&&t(e)},role:`radiogroup`,get id(){return i(o.id)},get"aria-invalid"(){return u.validationState()===`invalid`||void 0},get"aria-required"(){return u.isRequired()||void 0},get"aria-disabled"(){return u.isDisabled()||void 0},get"aria-readonly"(){return u.isReadOnly()||void 0},get"aria-orientation"(){return a.orientation},get"aria-labelledby"(){return d()},get"aria-describedby"(){return f()}},()=>u.dataset(),s))}})}})}var Wa=Object.assign(Ua,{Description:ta,ErrorMessage:oa,Item:Ia,ItemControl:La,ItemDescription:Ra,ItemIndicator:za,ItemInput:Ba,ItemLabel:Va,Label:Ha}),Ga=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight),i=e;for(;i&&n&&n.offsetTop>r;)i=this.getKeyAbove(i),n=i==null?null:this.getItem(i);return i}getKeyPageBelow(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight),i=e;for(;i&&n&&n.offsetTop<r;)i=this.getKeyBelow(i),n=i==null?null:this.getItem(i);return i}getKeyForSearch(e,t){let n=this.collator?.();if(!n)return;let r=t==null?this.getFirstKey():this.getKeyBelow(t);for(;r!=null;){let t=this.collection().getItem(r);if(t){let i=t.textValue.slice(0,e.length);if(t.textValue&&n.compare(i,e)===0)return r}r=this.getKeyBelow(r)}}};function Ka(t,n,r){let a=Ht({usage:`search`,sensitivity:`base`});return $t({selectionManager:()=>i(t.selectionManager),keyboardDelegate:e.V(()=>i(t.keyboardDelegate)||new Ga(t.collection,n,a)),autoFocus:()=>i(t.autoFocus),deferAutoFocus:()=>i(t.deferAutoFocus),shouldFocusWrap:()=>i(t.shouldFocusWrap),disallowEmptySelection:()=>i(t.disallowEmptySelection),selectOnFocus:()=>i(t.selectOnFocus),disallowTypeAhead:()=>i(t.disallowTypeAhead),shouldUseVirtualFocus:()=>i(t.shouldUseVirtualFocus),allowsTabNavigation:()=>i(t.allowsTabNavigation),isVirtualized:()=>i(t.isVirtualized),scrollToKey:e=>i(t.scrollToKey)?.(e),orientation:()=>i(t.orientation)},n,r)}var qa=e.z();function Ja(){return e.et(qa)}var Ya=e.z();function Xa(){return e.et(Ya)}var Za=e.z();function Qa(){return e.et(Za)}function $a(){let e=Qa();if(e===void 0)throw Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var eo=e.z();function to(){let t=e.et(eo);if(t===void 0)throw Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return t}var no=e.z();function ro(){let t=e.et(no);if(t===void 0)throw Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return t}function io(t){let n,r=ro(),i=$a(),a=U({id:r.generateId(`item-${e.G()}`)},t),[o,s]=e.Q(a,[`ref`,`textValue`,`disabled`,`closeOnSelect`,`checked`,`indeterminate`,`onSelect`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),[c,l]=e.W(),[u,d]=e.W(),[f,p]=e.W(),m=()=>i.listState().selectionManager(),h=()=>s.id,g=()=>m().focusedKey()===h(),_=()=>{o.onSelect?.(),o.closeOnSelect&&setTimeout(()=>{i.close(!0)})};gn({getItem:()=>({ref:()=>n,type:`item`,key:h(),textValue:o.textValue??f()?.textContent??n?.textContent??``,disabled:o.disabled??!1})});let v=en({key:h,selectionManager:m,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>o.disabled},()=>n),y=e=>{B(e,o.onPointerMove),e.pointerType===`mouse`&&(o.disabled?i.onItemLeave(e):(i.onItemEnter(e),e.defaultPrevented||(H(e.currentTarget),i.listState().selectionManager().setFocused(!0),i.listState().selectionManager().setFocusedKey(h()))))},b=e=>{B(e,o.onPointerLeave),e.pointerType===`mouse`&&i.onItemLeave(e)},x=e=>{B(e,o.onPointerUp),!o.disabled&&e.button===0&&_()},S=e=>{if(B(e,o.onKeyDown),!e.repeat&&!o.disabled)switch(e.key){case`Enter`:case` `:_()}},C=e.V(()=>{if(o.indeterminate)return`mixed`;if(o.checked!=null)return o.checked}),w=e.V(()=>({"data-indeterminate":o.indeterminate?``:void 0,"data-checked":o.checked&&!o.indeterminate?``:void 0,"data-disabled":o.disabled?``:void 0,"data-highlighted":g()?``:void 0})),T={isChecked:()=>o.checked,dataset:w,setLabelRef:p,generateId:ke(()=>s.id),registerLabel:Yi(l),registerDescription:Yi(d)};return e.L(eo.Provider,{value:T,get children(){return e.L(W,e.J({as:`div`,ref(e){let t=R(e=>n=e,o.ref);typeof t==`function`&&t(e)},get tabIndex(){return v.tabIndex()},get"aria-checked"(){return C()},get"aria-disabled"(){return o.disabled},get"aria-labelledby"(){return c()},get"aria-describedby"(){return u()},get"data-key"(){return v.dataKey()},get onPointerDown(){return V([o.onPointerDown,v.onPointerDown])},get onPointerUp(){return V([x,v.onPointerUp])},get onClick(){return V([o.onClick,v.onClick])},get onKeyDown(){return V([S,v.onKeyDown])},get onMouseDown(){return V([o.onMouseDown,v.onMouseDown])},get onFocus(){return V([o.onFocus,v.onFocus])},onPointerMove:y,onPointerLeave:b},w,s))}})}function ao(t){let n=U({closeOnSelect:!1},t),[r,i]=e.Q(n,[`checked`,`defaultChecked`,`onChange`,`onSelect`]),a=Dt({isSelected:()=>r.checked,defaultIsSelected:()=>r.defaultChecked,onSelectedChange:e=>r.onChange?.(e),isDisabled:()=>i.disabled});return e.L(io,e.J({role:`menuitemcheckbox`,get checked(){return a.isSelected()},onSelect:()=>{r.onSelect?.(),a.toggle()}},i))}var oo={next:(e,t)=>e===`ltr`?t===`horizontal`?`ArrowRight`:`ArrowDown`:t===`horizontal`?`ArrowLeft`:`ArrowUp`,previous:(e,t)=>oo.next(e===`ltr`?`rtl`:`ltr`,t)},so={first:e=>e===`horizontal`?`ArrowDown`:`ArrowRight`,last:e=>e===`horizontal`?`ArrowUp`:`ArrowLeft`};function co(t){let n=ro(),r=$a(),i=Ja(),{direction:a}=Bt(),o=U({id:n.generateId(`trigger`)},t),[s,c]=e.Q(o,[`ref`,`id`,`disabled`,`onPointerDown`,`onClick`,`onKeyDown`,`onMouseOver`,`onFocus`]),l=()=>n.value();i!==void 0&&(l=()=>n.value()??s.id,i.lastValue()===void 0&&i.setLastValue(l));let u=gt(()=>r.triggerRef(),()=>`button`),d=e.V(()=>u()===`a`&&r.triggerRef()?.getAttribute(`href`)!=null);e.B(e.Y(()=>i?.value(),e=>{d()&&e===l()&&r.triggerRef()?.focus()}));let f=()=>{i===void 0?r.toggle(!0):r.isOpen()?i.value()===l()&&i.closeMenu():(i.autoFocusMenu()||i.setAutoFocusMenu(!0),r.open(!1))};return e.B(()=>e.X(r.registerTriggerId(s.id))),e.L(St,e.J({ref(e){let t=R(r.setTriggerRef,s.ref);typeof t==`function`&&t(e)},get"data-kb-menu-value-trigger"(){return n.value()},get id(){return s.id},get disabled(){return s.disabled},"aria-haspopup":`true`,get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return e.C(()=>!!r.isOpen())()?r.contentId():void 0},get"data-highlighted"(){return l()!==void 0&&i?.value()===l()||void 0},get tabIndex(){return i===void 0?void 0:i.value()===l()||i.lastValue()===l()?0:-1},onPointerDown:e=>{B(e,s.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,!s.disabled&&e.pointerType!==`touch`&&e.button===0&&f()},onMouseOver:e=>{B(e,s.onMouseOver),r.triggerRef()?.dataset.pointerType!==`touch`&&!s.disabled&&i!==void 0&&i.value()!==void 0&&i.setValue(l)},onClick:e=>{B(e,s.onClick),s.disabled||e.currentTarget.dataset.pointerType===`touch`&&f()},onKeyDown:e=>{if(B(e,s.onKeyDown),!s.disabled){if(d())switch(e.key){case`Enter`:case` `:return}switch(e.key){case`Enter`:case` `:case so.first(n.orientation()):e.stopPropagation(),e.preventDefault(),mt(e.currentTarget),r.open(`first`),i?.setAutoFocusMenu(!0),i?.setValue(l);break;case so.last(n.orientation()):e.stopPropagation(),e.preventDefault(),r.open(`last`);break;case oo.next(a(),n.orientation()):if(i===void 0)break;e.stopPropagation(),e.preventDefault(),i.nextMenu();break;case oo.previous(a(),n.orientation()):if(i===void 0)break;e.stopPropagation(),e.preventDefault(),i.previousMenu()}}},onFocus:e=>{B(e,s.onFocus),i!==void 0&&e.currentTarget.dataset.pointerType!==`touch`&&i.setValue(l)},role:i===void 0?void 0:`menuitem`},()=>r.dataset(),c))}function lo(t){let n,r=ro(),i=$a(),a=Ja(),o=Xa(),{direction:s}=Bt(),c=U({id:r.generateId(`content-${e.G()}`)},t),[l,u]=e.Q(c,[`ref`,`id`,`style`,`onOpenAutoFocus`,`onCloseAutoFocus`,`onEscapeKeyDown`,`onFocusOutside`,`onPointerEnter`,`onPointerMove`,`onKeyDown`,`onMouseDown`,`onFocusIn`,`onFocusOut`]),d=0,f=()=>i.parentMenuContext()==null&&a===void 0&&r.isModal(),p=Ka({selectionManager:i.listState().selectionManager,collection:i.listState().collection,autoFocus:i.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!i.listState().selectionManager().isFocused(),orientation:()=>r.orientation()===`horizontal`?`vertical`:`horizontal`},()=>n);da({trapFocus:()=>f()&&i.isOpen(),onMountAutoFocus:e=>{a===void 0&&l.onOpenAutoFocus?.(e)},onUnmountAutoFocus:l.onCloseAutoFocus},()=>n);let m=e=>{if(z(e.currentTarget,e.target)&&(e.key===`Tab`&&i.isOpen()&&e.preventDefault(),a!==void 0&&e.currentTarget.getAttribute(`aria-haspopup`)!==`true`))switch(e.key){case oo.next(s(),r.orientation()):e.stopPropagation(),e.preventDefault(),i.close(!0),a.setAutoFocusMenu(!0),a.nextMenu();break;case oo.previous(s(),r.orientation()):if(e.currentTarget.hasAttribute(`data-closed`))break;e.stopPropagation(),e.preventDefault(),i.close(!0),a.setAutoFocusMenu(!0),a.previousMenu();break}},h=e=>{l.onEscapeKeyDown?.(e),a?.setAutoFocusMenu(!1),i.close(!0)},g=e=>{l.onFocusOutside?.(e),r.isModal()&&e.preventDefault()},_=e=>{B(e,l.onPointerEnter),i.isOpen()&&(i.parentMenuContext()?.listState().selectionManager().setFocused(!1),i.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},v=e=>{if(B(e,l.onPointerMove),e.pointerType!==`mouse`)return;let t=e.target,n=d!==e.clientX;z(e.currentTarget,t)&&n&&(i.setPointerDir(e.clientX>d?`right`:`left`),d=e.clientX)};e.B(()=>e.X(i.registerContentId(l.id))),e.X(()=>i.setContentRef(void 0));let y={ref:R(e=>{i.setContentRef(e),n=e},l.ref),role:`menu`,get id(){return l.id},get tabIndex(){return p.tabIndex()},get"aria-labelledby"(){return i.triggerId()},onKeyDown:V([l.onKeyDown,p.onKeyDown,m]),onMouseDown:V([l.onMouseDown,p.onMouseDown]),onFocusIn:V([l.onFocusIn,p.onFocusIn]),onFocusOut:V([l.onFocusOut,p.onFocusOut]),onPointerEnter:_,onPointerMove:v,get"data-orientation"(){return r.orientation()}};return e.L(e.P,{get when(){return i.contentPresent()},get children(){return e.L(e.P,{get when(){return o===void 0||i.parentMenuContext()!=null},get fallback(){return e.L(W,e.J({as:`div`},()=>i.dataset(),y,u))},get children(){return e.L(wi.Positioner,{get children(){return e.L(qi,e.J({get disableOutsidePointerEvents(){return e.C(()=>!!f())()&&i.isOpen()},get excludedElements(){return[i.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return Ce({"--kb-menu-content-transform-origin":`var(--kb-popper-content-transform-origin)`,position:`relative`},l.style)},onEscapeKeyDown:h,onFocusOutside:g,get onDismiss(){return i.close}},()=>i.dataset(),y,u))}})}})}})}function uo(t){let n,r=ro(),i=$a(),[a,o]=e.Q(t,[`ref`]);return Aa({element:()=>n??null,enabled:()=>i.contentPresent()&&r.preventScroll()}),e.L(lo,e.J({ref(e){let t=R(e=>{n=e},a.ref);typeof t==`function`&&t(e)}},o))}var fo=e.z();function po(){let t=e.et(fo);if(t===void 0)throw Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return t}function mo(t){let n=U({id:ro().generateId(`group-${e.G()}`)},t),[r,i]=e.W(),a={generateId:ke(()=>n.id),registerLabelId:Yi(i)};return e.L(fo.Provider,{value:a,get children(){return e.L(W,e.J({as:`div`,role:`group`,get"aria-labelledby"(){return r()}},n))}})}function ho(t){let n=po(),r=U({id:n.generateId(`label`)},t),[i,a]=e.Q(r,[`id`]);return e.B(()=>e.X(n.registerLabelId(i.id))),e.L(W,e.J({as:`span`,get id(){return i.id},"aria-hidden":`true`},a))}function go(t){let n=$a(),r=U({children:`▼`},t);return e.L(W,e.J({as:`span`,"aria-hidden":`true`},()=>n.dataset(),r))}function _o(t){return e.L(io,e.J({role:`menuitem`,closeOnSelect:!0},t))}function vo(t){let n=to(),r=U({id:n.generateId(`description`)},t),[i,a]=e.Q(r,[`id`]);return e.B(()=>e.X(n.registerDescription(i.id))),e.L(W,e.J({as:`div`,get id(){return i.id}},()=>n.dataset(),a))}function yo(t){let n=to(),r=U({id:n.generateId(`indicator`)},t),[i,a]=e.Q(r,[`forceMount`]);return e.L(e.P,{get when(){return i.forceMount||n.isChecked()},get children(){return e.L(W,e.J({as:`div`},()=>n.dataset(),a))}})}function bo(t){let n=to(),r=U({id:n.generateId(`label`)},t),[i,a]=e.Q(r,[`ref`,`id`]);return e.B(()=>e.X(n.registerLabel(i.id))),e.L(W,e.J({as:`div`,ref(e){let t=R(n.setLabelRef,i.ref);typeof t==`function`&&t(e)},get id(){return i.id}},()=>n.dataset(),a))}function xo(t){let n=$a();return e.L(e.P,{get when(){return n.contentPresent()},get children(){return e.L(e._,t)}})}var So=e.z();function Co(){let t=e.et(So);if(t===void 0)throw Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return t}function wo(t){let n=U({id:ro().generateId(`radiogroup-${e.G()}`)},t),[r,i]=e.Q(n,[`value`,`defaultValue`,`onChange`,`disabled`]),[a,o]=wt({value:()=>r.value,defaultValue:()=>r.defaultValue,onChange:e=>r.onChange?.(e)});return e.L(So.Provider,{value:{isDisabled:()=>r.disabled,isSelectedValue:e=>e===a(),setSelectedValue:e=>o(e)},get children(){return e.L(mo,i)}})}function To(t){let n=Co(),r=U({closeOnSelect:!1},t),[i,a]=e.Q(r,[`value`,`onSelect`]);return e.L(io,e.J({role:`menuitemradio`,get checked(){return n.isSelectedValue(i.value)},onSelect:()=>{i.onSelect?.(),n.setSelectedValue(i.value)}},a))}function Eo(e,t,n){let r=e.split(`-`)[0],i=n.getBoundingClientRect(),a=[],o=t.clientX,s=t.clientY;switch(r){case`top`:a.push([o,s+5]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]);break;case`right`:a.push([o-5,s]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]);break;case`bottom`:a.push([o,s-5]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]);break;case`left`:a.push([o+5,s]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top])}return a}function Do(e,t){return t?ct([e.clientX,e.clientY],t):!1}function Oo(t){let n=ro(),r=on(),i=Qa(),a=Ja(),o=Xa(),s=U({placement:n.orientation()===`horizontal`?`bottom-start`:`right-start`},t),[c,l]=e.Q(s,[`open`,`defaultOpen`,`onOpenChange`]),u=0,d=null,f=`right`,[p,m]=e.W(),[h,g]=e.W(),[_,v]=e.W(),[y,b]=e.W(),[x,S]=e.W(!0),[C,w]=e.W(l.placement),[T,E]=e.W([]),[D,O]=e.W([]),{DomCollectionProvider:k}=hn({items:D,onItemsChange:O}),A=Ji({open:()=>c.open,defaultOpen:()=>c.defaultOpen,onOpenChange:e=>c.onOpenChange?.(e)}),{present:j}=Xi({show:()=>n.forceMount()||A.isOpen(),element:()=>y()??null}),M=rn({selectionMode:`none`,dataSource:D}),N=e=>{S(e),A.open()},P=(e=!1)=>{A.close(),e&&i&&i.close(!0)},F=e=>{S(e),A.toggle()},ee=()=>{let e=y();e&&(H(e),M.selectionManager().setFocused(!0),M.selectionManager().setFocusedKey(void 0))},te=()=>{o==null?ee():setTimeout(()=>ee())},I=e=>{E(t=>[...t,e]);let t=i?.registerNestedMenu(e);return()=>{E(t=>Te(t,e)),t?.()}},ne=e=>f===d?.side&&Do(e,d?.area),L=e=>{ne(e)&&e.preventDefault()},re=e=>{ne(e)||te()},ie=e=>{ne(e)&&e.preventDefault()};pa({isDisabled:()=>!(i==null&&A.isOpen()&&n.isModal()),targets:()=>[y(),...T()].filter(Boolean)}),e.B(()=>{let t=y();if(!t||!i)return;let n=i.registerNestedMenu(t);e.X(()=>{n()})}),e.B(()=>{i===void 0&&a?.registerMenu(n.value(),[y(),...T()])}),e.B(()=>{i===void 0&&a!==void 0&&(a.value()===n.value()?(_()?.focus(),a.autoFocusMenu()&&N(!0)):P())}),e.B(()=>{i===void 0&&a!==void 0&&A.isOpen()&&a.setValue(n.value())}),e.X(()=>{i===void 0&&a?.unregisterMenu(n.value())});let R={dataset:e.V(()=>({"data-expanded":A.isOpen()?``:void 0,"data-closed":A.isOpen()?void 0:``})),isOpen:A.isOpen,contentPresent:j,nestedMenus:T,currentPlacement:C,pointerGraceTimeoutId:()=>u,autoFocus:x,listState:()=>M,parentMenuContext:()=>i,triggerRef:_,contentRef:y,triggerId:p,contentId:h,setTriggerRef:v,setContentRef:b,open:N,close:P,toggle:F,focusContent:te,onItemEnter:L,onItemLeave:re,onTriggerLeave:ie,setPointerDir:e=>f=e,setPointerGraceTimeoutId:e=>u=e,setPointerGraceIntent:e=>d=e,registerNestedMenu:I,registerItemToParentDomCollection:r?.registerItem,registerTriggerId:Yi(m),registerContentId:Yi(g)};return e.L(k,{get children(){return e.L(Za.Provider,{value:R,get children(){return e.L(e.P,{when:o===void 0,get fallback(){return l.children},get children(){return e.L(wi,e.J({anchorRef:_,contentRef:y,onCurrentPlacementChange:w},l))}})}})}})}function ko(t){let{direction:n}=Bt();return e.L(Oo,e.J({get placement(){return n()===`rtl`?`left-start`:`right-start`},flip:!0},t))}var Ao={close:(e,t)=>e===`ltr`?[t===`horizontal`?`ArrowLeft`:`ArrowUp`]:[t===`horizontal`?`ArrowRight`:`ArrowDown`]};function jo(t){let n=$a(),r=ro(),[i,a]=e.Q(t,[`onFocusOutside`,`onKeyDown`]),{direction:o}=Bt();return e.L(lo,e.J({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{i.onFocusOutside?.(e);let t=e.target;z(n.triggerRef(),t)||n.close()},onKeyDown:e=>{B(e,i.onKeyDown);let t=z(e.currentTarget,e.target),a=Ao.close(o(),r.orientation()).includes(e.key),s=n.parentMenuContext()!=null;t&&a&&s&&(n.close(),H(n.triggerRef()))}},a))}var Mo=[`Enter`,` `],No={open:(e,t)=>e===`ltr`?[...Mo,t===`horizontal`?`ArrowRight`:`ArrowDown`]:[...Mo,t===`horizontal`?`ArrowLeft`:`ArrowUp`]};function Po(t){let n,r=ro(),i=$a(),a=U({id:r.generateId(`sub-trigger-${e.G()}`)},t),[o,s]=e.Q(a,[`ref`,`id`,`textValue`,`disabled`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),c=null,l=()=>{c&&window.clearTimeout(c),c=null},{direction:u}=Bt(),d=()=>o.id,f=()=>{let e=i.parentMenuContext();if(e==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},p=()=>i.listState().collection(),m=()=>f().focusedKey()===d(),h=en({key:d,selectionManager:f,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>o.disabled},()=>n),g=e=>{B(e,o.onClick),!i.isOpen()&&!o.disabled&&i.open(!0)},_=e=>{if(B(e,o.onPointerMove),e.pointerType!==`mouse`)return;let t=i.parentMenuContext();if(t?.onItemEnter(e),!e.defaultPrevented){if(o.disabled){t?.onItemLeave(e);return}!i.isOpen()&&!c&&(i.parentMenuContext()?.setPointerGraceIntent(null),c=window.setTimeout(()=>{i.open(!1),l()},100)),t?.onItemEnter(e),e.defaultPrevented||(i.listState().selectionManager().isFocused()&&(i.listState().selectionManager().setFocused(!1),i.listState().selectionManager().setFocusedKey(void 0)),H(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(d()))}},v=e=>{if(B(e,o.onPointerLeave),e.pointerType!==`mouse`)return;l();let t=i.parentMenuContext(),n=i.contentRef();if(n){t?.setPointerGraceIntent({area:Eo(i.currentPlacement(),e,n),side:i.currentPlacement().split(`-`)[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());let r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)},y=e=>{B(e,o.onKeyDown),!e.repeat&&(o.disabled||No.open(u(),r.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),f().setFocused(!1),f().setFocusedKey(void 0),i.isOpen()||i.open(`first`),i.focusContent(),i.listState().selectionManager().setFocused(!0),i.listState().selectionManager().setFocusedKey(p().getFirstKey())))};return e.B(()=>{if(i.registerItemToParentDomCollection==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");let t=i.registerItemToParentDomCollection({ref:()=>n,type:`item`,key:d(),textValue:o.textValue??n?.textContent??``,disabled:o.disabled??!1});e.X(t)}),e.B(e.Y(()=>i.parentMenuContext()?.pointerGraceTimeoutId(),t=>{e.X(()=>{window.clearTimeout(t),i.parentMenuContext()?.setPointerGraceIntent(null)})})),e.B(()=>e.X(i.registerTriggerId(o.id))),e.X(()=>{l()}),e.L(W,e.J({as:`div`,ref(e){let t=R(e=>{i.setTriggerRef(e),n=e},o.ref);typeof t==`function`&&t(e)},get id(){return o.id},role:`menuitem`,get tabIndex(){return h.tabIndex()},"aria-haspopup":`true`,get"aria-expanded"(){return i.isOpen()},get"aria-controls"(){return e.C(()=>!!i.isOpen())()?i.contentId():void 0},get"aria-disabled"(){return o.disabled},get"data-key"(){return h.dataKey()},get"data-highlighted"(){return m()?``:void 0},get"data-disabled"(){return o.disabled?``:void 0},get onPointerDown(){return V([o.onPointerDown,h.onPointerDown])},get onPointerUp(){return V([o.onPointerUp,h.onPointerUp])},get onClick(){return V([g,h.onClick])},get onKeyDown(){return V([y,h.onKeyDown])},get onMouseDown(){return V([o.onMouseDown,h.onMouseDown])},get onFocus(){return V([o.onFocus,h.onFocus])},onPointerMove:_,onPointerLeave:v},()=>i.dataset(),s))}function Fo(t){let n=Ja(),r=U({id:`menu-${e.G()}`,modal:!0},t),[i,a]=e.Q(r,[`id`,`modal`,`preventScroll`,`forceMount`,`open`,`defaultOpen`,`onOpenChange`,`value`,`orientation`]),o=Ji({open:()=>i.open,defaultOpen:()=>i.defaultOpen,onOpenChange:e=>i.onOpenChange?.(e)}),s={isModal:()=>i.modal??!0,preventScroll:()=>i.preventScroll??s.isModal(),forceMount:()=>i.forceMount??!1,generateId:ke(()=>i.id),value:()=>i.value,orientation:()=>i.orientation??n?.orientation()??`horizontal`};return e.L(no.Provider,{value:s,get children(){return e.L(Oo,e.J({get open(){return o.isOpen()},get onOpenChange(){return o.setIsOpen}},a))}})}yt({},{Root:()=>Io,Separator:()=>Lo});function Io(t){let n,r=U({orientation:`horizontal`},t),[i,a]=e.Q(r,[`ref`,`orientation`]),o=gt(()=>n,()=>`hr`);return e.L(W,e.J({as:`hr`,ref(e){let t=R(e=>n=e,i.ref);typeof t==`function`&&t(e)},get role(){return o()===`hr`?void 0:`separator`},get"aria-orientation"(){return i.orientation===`vertical`?`vertical`:void 0},get"data-orientation"(){return i.orientation}},a))}var Lo=Io,Y={};yt(Y,{Arrow:()=>hi,CheckboxItem:()=>ao,Content:()=>Ro,DropdownMenu:()=>Bo,Group:()=>mo,GroupLabel:()=>ho,Icon:()=>go,Item:()=>_o,ItemDescription:()=>vo,ItemIndicator:()=>yo,ItemLabel:()=>bo,Portal:()=>xo,RadioGroup:()=>wo,RadioItem:()=>To,Root:()=>zo,Separator:()=>Io,Sub:()=>ko,SubContent:()=>jo,SubTrigger:()=>Po,Trigger:()=>co});function Ro(t){let n=ro(),r=$a(),[i,a]=e.Q(t,[`onCloseAutoFocus`,`onInteractOutside`]),o=!1;return e.L(uo,e.J({onCloseAutoFocus:e=>{i.onCloseAutoFocus?.(e),o||H(r.triggerRef()),o=!1,e.preventDefault()},onInteractOutside:e=>{i.onInteractOutside?.(e),(!n.isModal()||e.detail.isContextMenu)&&(o=!0)}},a))}function zo(t){let n=U({id:`dropdownmenu-${e.G()}`},t);return e.L(Fo,n)}var Bo=Object.assign(zo,{Arrow:hi,CheckboxItem:ao,Content:Ro,Group:mo,GroupLabel:ho,Icon:go,Item:_o,ItemDescription:vo,ItemIndicator:yo,ItemLabel:bo,Portal:xo,RadioGroup:wo,RadioItem:To,Separator:Io,Sub:ko,SubContent:jo,SubTrigger:Po,Trigger:co});const X={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsqd-font-size) * 0.625)`,xs:`calc(var(--tsqd-font-size) * 0.75)`,sm:`calc(var(--tsqd-font-size) * 0.875)`,md:`var(--tsqd-font-size)`,lg:`calc(var(--tsqd-font-size) * 1.125)`,xl:`calc(var(--tsqd-font-size) * 1.25)`,"2xl":`calc(var(--tsqd-font-size) * 1.5)`,"3xl":`calc(var(--tsqd-font-size) * 1.875)`,"4xl":`calc(var(--tsqd-font-size) * 2.25)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.75)`,"7xl":`calc(var(--tsqd-font-size) * 4.5)`,"8xl":`calc(var(--tsqd-font-size) * 6)`,"9xl":`calc(var(--tsqd-font-size) * 8)`},lineHeight:{xs:`calc(var(--tsqd-font-size) * 1)`,sm:`calc(var(--tsqd-font-size) * 1.25)`,md:`calc(var(--tsqd-font-size) * 1.5)`,lg:`calc(var(--tsqd-font-size) * 1.75)`,xl:`calc(var(--tsqd-font-size) * 2)`,"2xl":`calc(var(--tsqd-font-size) * 2.25)`,"3xl":`calc(var(--tsqd-font-size) * 2.5)`,"4xl":`calc(var(--tsqd-font-size) * 2.75)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.25)`,"7xl":`calc(var(--tsqd-font-size) * 3.5)`,"8xl":`calc(var(--tsqd-font-size) * 3.75)`,"9xl":`calc(var(--tsqd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsqd-font-size) * 0.125)`,sm:`calc(var(--tsqd-font-size) * 0.25)`,md:`calc(var(--tsqd-font-size) * 0.375)`,lg:`calc(var(--tsqd-font-size) * 0.5)`,xl:`calc(var(--tsqd-font-size) * 0.75)`,"2xl":`calc(var(--tsqd-font-size) * 1)`,"3xl":`calc(var(--tsqd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsqd-font-size) * 0.0625)`,.5:`calc(var(--tsqd-font-size) * 0.125)`,1:`calc(var(--tsqd-font-size) * 0.25)`,1.5:`calc(var(--tsqd-font-size) * 0.375)`,2:`calc(var(--tsqd-font-size) * 0.5)`,2.5:`calc(var(--tsqd-font-size) * 0.625)`,3:`calc(var(--tsqd-font-size) * 0.75)`,3.5:`calc(var(--tsqd-font-size) * 0.875)`,4:`calc(var(--tsqd-font-size) * 1)`,4.5:`calc(var(--tsqd-font-size) * 1.125)`,5:`calc(var(--tsqd-font-size) * 1.25)`,5.5:`calc(var(--tsqd-font-size) * 1.375)`,6:`calc(var(--tsqd-font-size) * 1.5)`,6.5:`calc(var(--tsqd-font-size) * 1.625)`,7:`calc(var(--tsqd-font-size) * 1.75)`,8:`calc(var(--tsqd-font-size) * 2)`,9:`calc(var(--tsqd-font-size) * 2.25)`,10:`calc(var(--tsqd-font-size) * 2.5)`,11:`calc(var(--tsqd-font-size) * 2.75)`,12:`calc(var(--tsqd-font-size) * 3)`,14:`calc(var(--tsqd-font-size) * 3.5)`,16:`calc(var(--tsqd-font-size) * 4)`,20:`calc(var(--tsqd-font-size) * 5)`,24:`calc(var(--tsqd-font-size) * 6)`,28:`calc(var(--tsqd-font-size) * 7)`,32:`calc(var(--tsqd-font-size) * 8)`,36:`calc(var(--tsqd-font-size) * 9)`,40:`calc(var(--tsqd-font-size) * 10)`,44:`calc(var(--tsqd-font-size) * 11)`,48:`calc(var(--tsqd-font-size) * 12)`,52:`calc(var(--tsqd-font-size) * 13)`,56:`calc(var(--tsqd-font-size) * 14)`,60:`calc(var(--tsqd-font-size) * 15)`,64:`calc(var(--tsqd-font-size) * 16)`,72:`calc(var(--tsqd-font-size) * 18)`,80:`calc(var(--tsqd-font-size) * 20)`,96:`calc(var(--tsqd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}};var Vo=e.O(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Ho=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Uo=e.O(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Wo=e.O(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Go=e.O(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Ko=e.O(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),qo=e.O(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(-90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),Jo=e.O(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Yo=e.O(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Xo=e.O(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Zo=e.O(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`),Qo=e.O(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`),$o=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),es=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),ts=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`),ns=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),rs=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),is=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),as=e.O(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`),os=e.O(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),ss=e.O(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),cs=e.O(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`),ls=e.O(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),us=e.O(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),ds=e.O(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);function fs(){return Vo()}function ps(){return Ho()}function ms(){return Uo()}function hs(){return Wo()}function gs(){return Go()}function _s(){return Ko()}function vs(){return qo()}function ys(){return Jo()}function bs(){return Yo()}function xs(){return Xo()}function Ss(){return Zo()}function Cs(){return Qo()}function ws(){return $o()}function Ts(){return es()}function Es(){return ts()}function Ds(){return ns()}function Os(t){return(()=>{var n=rs(),r=n.firstChild;return e.H(()=>e.T(r,`stroke`,t.theme===`dark`?`#12B76A`:`#027A48`)),n})()}function ks(){return is()}function As(){return as()}function js(t){return[e.L(e.P,{get when(){return t.checked},get children(){var n=rs(),r=n.firstChild;return e.H(()=>e.T(r,`stroke`,t.theme===`dark`?`#9B8AFB`:`#6938EF`)),n}}),e.L(e.P,{get when(){return!t.checked},get children(){var n=os(),r=n.firstChild;return e.H(()=>e.T(r,`stroke`,t.theme===`dark`?`#9B8AFB`:`#6938EF`)),n}})]}function Ms(){return ss()}function Ns(){return cs()}function Ps(){return ls()}function Fs(){return us()}function Is(){let t=e.G();return(()=>{var n=ds(),r=n.firstChild,i=r.nextSibling,a=i.nextSibling,o=a.firstChild,s=a.nextSibling,c=s.firstChild,l=s.nextSibling,u=l.nextSibling,d=u.firstChild,f=u.nextSibling,p=f.firstChild,m=f.nextSibling,h=m.nextSibling,g=h.firstChild,_=h.nextSibling,v=_.firstChild,y=_.nextSibling,b=y.nextSibling,x=b.firstChild,S=b.nextSibling,C=S.firstChild,w=S.nextSibling,T=w.nextSibling,E=T.firstChild,D=T.nextSibling,O=D.firstChild,k=D.nextSibling,A=k.nextSibling,j=A.firstChild,M=A.nextSibling,N=M.firstChild,P=M.nextSibling,F=P.nextSibling,ee=F.firstChild,te=F.nextSibling,I=te.firstChild,ne=te.nextSibling,L=ne.firstChild.nextSibling.nextSibling.nextSibling,re=L.nextSibling,ie=ne.nextSibling,R=ie.firstChild,ae=ie.nextSibling,oe=ae.firstChild,se=ae.nextSibling,ce=se.firstChild,le=ce.nextSibling,ue=le.nextSibling.firstChild,de=ue.nextSibling,fe=de.nextSibling,pe=fe.nextSibling,me=pe.nextSibling,he=me.nextSibling,ge=he.nextSibling,_e=ge.nextSibling,ve=_e.nextSibling,ye=ve.nextSibling,be=ye.nextSibling,xe=be.nextSibling,Se=se.nextSibling,Ce=Se.firstChild,we=Se.nextSibling,Te=we.firstChild,Ee=we.nextSibling,De=Ee.firstChild,Oe=De.nextSibling,ke=Ee.nextSibling,z=ke.firstChild,Ae=ke.nextSibling,je=Ae.firstChild,Me=Ae.nextSibling,Ne=Me.firstChild,Pe=Ne.nextSibling,Fe=Pe.nextSibling,Ie=Fe.nextSibling,Le=Ie.nextSibling,Re=Le.nextSibling,ze=Re.nextSibling,Be=ze.nextSibling,B=Be.nextSibling,V=B.nextSibling,Ve=V.nextSibling,H=Ve.nextSibling,He=H.nextSibling,Ue=He.nextSibling,We=Ue.nextSibling,Ge=We.nextSibling,Ke=Ge.nextSibling,qe=Ke.nextSibling;return e.T(r,`id`,`a-${t}`),e.T(i,`fill`,`url(#a-${t})`),e.T(o,`id`,`am-${t}`),e.T(s,`id`,`b-${t}`),e.T(c,`filter`,`url(#am-${t})`),e.T(l,`mask`,`url(#b-${t})`),e.T(d,`id`,`ah-${t}`),e.T(f,`id`,`k-${t}`),e.T(p,`filter`,`url(#ah-${t})`),e.T(m,`mask`,`url(#k-${t})`),e.T(g,`id`,`ae-${t}`),e.T(_,`id`,`j-${t}`),e.T(v,`filter`,`url(#ae-${t})`),e.T(y,`mask`,`url(#j-${t})`),e.T(x,`id`,`ai-${t}`),e.T(S,`id`,`i-${t}`),e.T(C,`filter`,`url(#ai-${t})`),e.T(w,`mask`,`url(#i-${t})`),e.T(E,`id`,`aj-${t}`),e.T(D,`id`,`h-${t}`),e.T(O,`filter`,`url(#aj-${t})`),e.T(k,`mask`,`url(#h-${t})`),e.T(j,`id`,`ag-${t}`),e.T(M,`id`,`g-${t}`),e.T(N,`filter`,`url(#ag-${t})`),e.T(P,`mask`,`url(#g-${t})`),e.T(ee,`id`,`af-${t}`),e.T(te,`id`,`f-${t}`),e.T(I,`filter`,`url(#af-${t})`),e.T(ne,`mask`,`url(#f-${t})`),e.T(L,`id`,`m-${t}`),e.T(re,`fill`,`url(#m-${t})`),e.T(R,`id`,`ak-${t}`),e.T(ae,`id`,`e-${t}`),e.T(oe,`filter`,`url(#ak-${t})`),e.T(se,`mask`,`url(#e-${t})`),e.T(ce,`id`,`n-${t}`),e.T(le,`fill`,`url(#n-${t})`),e.T(ue,`id`,`r-${t}`),e.T(de,`fill`,`url(#r-${t})`),e.T(fe,`id`,`s-${t}`),e.T(pe,`fill`,`url(#s-${t})`),e.T(me,`id`,`q-${t}`),e.T(he,`fill`,`url(#q-${t})`),e.T(ge,`id`,`p-${t}`),e.T(_e,`fill`,`url(#p-${t})`),e.T(ve,`id`,`o-${t}`),e.T(ye,`fill`,`url(#o-${t})`),e.T(be,`id`,`l-${t}`),e.T(xe,`fill`,`url(#l-${t})`),e.T(Ce,`id`,`al-${t}`),e.T(we,`id`,`d-${t}`),e.T(Te,`filter`,`url(#al-${t})`),e.T(Ee,`mask`,`url(#d-${t})`),e.T(De,`id`,`u-${t}`),e.T(Oe,`fill`,`url(#u-${t})`),e.T(z,`id`,`ad-${t}`),e.T(Ae,`id`,`c-${t}`),e.T(je,`filter`,`url(#ad-${t})`),e.T(Me,`mask`,`url(#c-${t})`),e.T(Ne,`id`,`t-${t}`),e.T(Pe,`fill`,`url(#t-${t})`),e.T(Fe,`id`,`v-${t}`),e.T(Ie,`stroke`,`url(#v-${t})`),e.T(Le,`id`,`aa-${t}`),e.T(Re,`stroke`,`url(#aa-${t})`),e.T(ze,`id`,`w-${t}`),e.T(Be,`stroke`,`url(#w-${t})`),e.T(B,`id`,`ac-${t}`),e.T(V,`stroke`,`url(#ac-${t})`),e.T(Ve,`id`,`ab-${t}`),e.T(H,`stroke`,`url(#ab-${t})`),e.T(He,`id`,`y-${t}`),e.T(Ue,`stroke`,`url(#y-${t})`),e.T(We,`id`,`x-${t}`),e.T(Ge,`stroke`,`url(#x-${t})`),e.T(Ke,`id`,`z-${t}`),e.T(qe,`stroke`,`url(#z-${t})`),n})()}const Ls=Object.keys(e.f)[0],Rs=Object.keys(e.u)[0],zs=e.z({client:void 0,onlineManager:void 0,queryFlavor:``,version:``,shadowDOMTarget:void 0});function Z(){return e.et(zs)}var Bs=class extends Error{};const Vs=e.z(void 0),Hs=t=>{let[n,r]=e.W(null),i=()=>{let e=n();e!=null&&(e.close(),t.setLocalStore(`pip_open`,`false`),r(null))},a=(i,a)=>{if(n()!=null)return;let o=window.open(``,`TSQD-Devtools-Panel`,`width=${i},height=${a},popup`);if(!o)throw new Bs(`Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.`);o.document.head.innerHTML=``,o.document.body.innerHTML=``,e.b(o.document),o.document.title=`TanStack Query Devtools`,o.document.body.style.margin=`0`,o.addEventListener(`pagehide`,()=>{t.setLocalStore(`pip_open`,`false`),r(null)}),[...(Z().shadowDOMTarget||document).styleSheets].forEach(e=>{try{let t=[...e.cssRules].map(e=>e.cssText).join(``),n=document.createElement(`style`),r=e.ownerNode,i=``;r&&`id`in r&&(i=r.id),i&&n.setAttribute(`id`,i),n.textContent=t,o.document.head.appendChild(n)}catch{let t=document.createElement(`link`);if(e.href==null)return;t.rel=`stylesheet`,t.type=e.type,t.media=e.media.toString(),t.href=e.href,o.document.head.appendChild(t)}}),e.x([`focusin`,`focusout`,`pointermove`,`keydown`,`pointerdown`,`pointerup`,`click`,`mousedown`,`input`],o.document),t.setLocalStore(`pip_open`,`true`),r(o)};e.B(()=>{if((t.localStore.pip_open??`false`)===`true`&&!t.disabled)try{a(Number(window.innerWidth),Number(t.localStore.height||500))}catch(e){if(e instanceof Bs){t.setLocalStore(`pip_open`,`false`),t.setLocalStore(`open`,`false`);return}throw e}}),e.B(()=>{let t=(Z().shadowDOMTarget||document).querySelector(`#_goober`),r=n();if(t&&r){let n=new MutationObserver(()=>{let e=(Z().shadowDOMTarget||r.document).querySelector(`#_goober`);e&&(e.textContent=t.textContent)});n.observe(t,{childList:!0,subtree:!0,characterDataOldValue:!0}),e.X(()=>{n.disconnect()})}});let o=e.V(()=>({pipWindow:n(),requestPipWindow:a,closePipWindow:i,disabled:t.disabled??!1}));return e.L(Vs.Provider,{value:o,get children(){return t.children}})},Us=()=>e.V(()=>{let t=e.et(Vs);if(!t)throw Error(`usePiPWindow must be used within a PiPProvider`);return t()}),Ws=e.z(()=>`dark`);function Q(){return e.et(Ws)}var Gs=e.O(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ks=e.O(`<button title="Copy object to clipboard">`),qs=e.O(`<button title="Remove all items"aria-label="Remove all items">`),Js=e.O(`<button title="Delete item"aria-label="Delete item">`),Ys=e.O(`<button title="Toggle value"aria-label="Toggle value">`),Xs=e.O(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`),Zs=e.O(`<div>`),Qs=e.O(`<div><button> <span></span> <span> `),$s=e.O(`<input>`),ec=e.O(`<span>`),tc=e.O(`<div><label>:`),nc=e.O(`<div><div><button> [<!>...<!>]`);function rc(e,t){if(t<1)return[];let n=0,r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}const ic=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?pc(r):fc(r));return(()=>{var n=Gs();return e.H(()=>e.y(n,L(i().expander,r`
          transform: rotate(${t.expanded?90:0}deg);
        `,t.expanded&&r`
            & svg {
              top: -1px;
            }
          `))),n})()},ac=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?pc(r):fc(r)),[a,o]=e.W(`NoCopy`);return(()=>{var r=Ks();return e.v(r,`click`,a()===`NoCopy`?()=>{navigator.clipboard.writeText(e.h(t.value)).then(()=>{o(`SuccessCopy`),setTimeout(()=>{o(`NoCopy`)},1500)},e=>{o(`ErrorCopy`),setTimeout(()=>{o(`NoCopy`)},1500)})}:void 0,!0),e.S(r,e.L(e.F,{get children(){return[e.L(e.N,{get when(){return a()===`NoCopy`},get children(){return e.L(Es,{})}}),e.L(e.N,{get when(){return a()===`SuccessCopy`},get children(){return e.L(Os,{get theme(){return n()}})}}),e.L(e.N,{get when(){return a()===`ErrorCopy`},get children(){return e.L(ks,{})}})]}})),e.H(t=>{var n=i().actionButton,o=`${a()===`NoCopy`?`Copy object to clipboard`:a()===`SuccessCopy`?`Object copied to clipboard`:`Error copying object to clipboard`}`;return n!==t.e&&e.y(r,t.e=n),o!==t.t&&e.T(r,`aria-label`,t.t=o),t},{e:void 0,t:void 0}),r})()},oc=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?pc(r):fc(r)),a=Z().client;return(()=>{var n=qs();return n.$$click=()=>{let n=t.activeQuery.state.data,r=e.p(n,t.dataPath,[]);a.setQueryData(t.activeQuery.queryKey,r)},e.S(n,e.L(As,{})),e.H(()=>e.y(n,i().actionButton)),n})()},sc=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?pc(r):fc(r)),a=Z().client;return(()=>{var n=Js();return n.$$click=()=>{let n=t.activeQuery.state.data,r=e.n(n,t.dataPath);a.setQueryData(t.activeQuery.queryKey,r)},e.S(n,e.L(ps,{})),e.H(()=>e.y(n,L(i().actionButton))),n})()},cc=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?pc(r):fc(r)),a=Z().client;return(()=>{var o=Ys();return o.$$click=()=>{let n=t.activeQuery.state.data,r=e.p(n,t.dataPath,!t.value);a.setQueryData(t.activeQuery.queryKey,r)},e.S(o,e.L(js,{get theme(){return n()},get checked(){return t.value}})),e.H(()=>e.y(o,L(i().actionButton,r`
          width: ${X.size[3.5]};
          height: ${X.size[3.5]};
        `))),o})()};function lc(e){return Symbol.iterator in e}function uc(t){let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?pc(r):fc(r)),a=Z().client,[o,s]=e.W((t.defaultExpanded||[]).includes(t.label)),c=()=>s(e=>!e),[l,u]=e.W([]),d=e.V(()=>Array.isArray(t.value)?t.value.map((e,t)=>({label:t.toString(),value:e})):t.value!==null&&typeof t.value==`object`&&lc(t.value)&&typeof t.value[Symbol.iterator]==`function`?t.value instanceof Map?Array.from(t.value,([e,t])=>({label:e,value:t})):Array.from(t.value,(e,t)=>({label:t.toString(),value:e})):typeof t.value==`object`&&t.value!==null?Object.entries(t.value).map(([e,t])=>({label:e,value:t})):[]),f=e.V(()=>Array.isArray(t.value)?`array`:t.value!==null&&typeof t.value==`object`&&lc(t.value)&&typeof t.value[Symbol.iterator]==`function`?`Iterable`:typeof t.value==`object`&&t.value!==null?`object`:typeof t.value),p=e.V(()=>rc(d(),100)),m=t.dataPath??[],h=e.G();return(()=>{var n=Zs();return e.S(n,e.L(e.P,{get when(){return p().length},get children(){return[(()=>{var n=Qs(),r=n.firstChild,a=r.firstChild,s=a.nextSibling,l=s.nextSibling.nextSibling,u=l.firstChild;return r.$$click=()=>c(),e.S(r,e.L(ic,{get expanded(){return o()}}),a),e.S(s,()=>t.label),e.S(l,()=>String(f()).toLowerCase()===`iterable`?`(Iterable) `:``,u),e.S(l,()=>d().length,u),e.S(l,()=>d().length>1?`items`:`item`,null),e.S(n,e.L(e.P,{get when(){return t.editable},get children(){var n=Zs();return e.S(n,e.L(ac,{get value(){return t.value}}),null),e.S(n,e.L(e.P,{get when(){return e.C(()=>!!t.itemsDeletable)()&&t.activeQuery!==void 0},get children(){return e.L(sc,{get activeQuery(){return t.activeQuery},dataPath:m})}}),null),e.S(n,e.L(e.P,{get when(){return e.C(()=>f()===`array`)()&&t.activeQuery!==void 0},get children(){return e.L(oc,{get activeQuery(){return t.activeQuery},dataPath:m})}}),null),e.S(n,e.L(e.P,{get when(){return e.C(()=>!!t.onEdit)()&&!e.m(t.value).meta},get children(){var n=Xs();return n.$$click=()=>{t.onEdit?.()},e.S(n,e.L(Ds,{})),e.H(()=>e.y(n,i().actionButton)),n}}),null),e.H(()=>e.y(n,i().actions)),n}}),null),e.H(t=>{var a=i().expanderButtonContainer,s=i().expanderButton,c=o()?`true`:`false`,u=i().info;return a!==t.e&&e.y(n,t.e=a),s!==t.t&&e.y(r,t.t=s),c!==t.a&&e.T(r,`aria-expanded`,t.a=c),u!==t.o&&e.y(l,t.o=u),t},{e:void 0,t:void 0,a:void 0,o:void 0}),n})(),e.L(e.P,{get when(){return o()},get children(){return[e.L(e.P,{get when(){return p().length===1},get children(){var n=Zs();return e.S(n,e.L(ge,{get each(){return d()},by:e=>e.label,children:n=>e.L(uc,{get defaultExpanded(){return t.defaultExpanded},get label(){return n().label},get value(){return n().value},get editable(){return t.editable},get dataPath(){return[...m,n().label]},get activeQuery(){return t.activeQuery},get itemsDeletable(){return f()===`array`||f()===`Iterable`||f()===`object`}})})),e.H(()=>e.y(n,i().subEntry)),n}}),e.L(e.P,{get when(){return p().length>1},get children(){var n=Zs();return e.S(n,e.L(e.M,{get each(){return p()},children:(n,r)=>(()=>{var a=nc(),o=a.firstChild,s=o.firstChild,c=s.firstChild,d=c.nextSibling,f=d.nextSibling.nextSibling;return f.nextSibling,s.$$click=()=>u(e=>e.includes(r)?e.filter(e=>e!==r):[...e,r]),e.S(s,e.L(ic,{get expanded(){return l().includes(r)}}),c),e.S(s,r*100,d),e.S(s,r*100+100-1,f),e.S(o,e.L(e.P,{get when(){return l().includes(r)},get children(){var r=Zs();return e.S(r,e.L(ge,{get each(){return n()},by:e=>e.label,children:n=>e.L(uc,{get defaultExpanded(){return t.defaultExpanded},get label(){return n().label},get value(){return n().value},get editable(){return t.editable},get dataPath(){return[...m,n().label]},get activeQuery(){return t.activeQuery}})})),e.H(()=>e.y(r,i().subEntry)),r}}),null),e.H(t=>{var n=i().entry,r=i().expanderButton;return n!==t.e&&e.y(o,t.e=n),r!==t.t&&e.y(s,t.t=r),t},{e:void 0,t:void 0}),a})()})),e.H(()=>e.y(n,i().subEntry)),n}})]}})]}}),null),e.S(n,e.L(e.P,{get when(){return p().length===0},get children(){var n=tc(),r=n.firstChild,o=r.firstChild;return e.T(r,`for`,h),e.S(r,()=>t.label,o),e.S(n,e.L(e.P,{get when(){return e.C(()=>!!(t.editable&&t.activeQuery!==void 0))()&&(f()===`string`||f()===`number`||f()===`boolean`)},get fallback(){return(()=>{var n=ec();return e.S(n,()=>e.r(t.value)),e.H(()=>e.y(n,i().value)),n})()},get children(){return[e.L(e.P,{get when(){return e.C(()=>!!(t.editable&&t.activeQuery!==void 0))()&&(f()===`string`||f()===`number`)},get children(){var n=$s();return n.addEventListener(`change`,n=>{let r=t.activeQuery.state.data,i=e.p(r,m,f()===`number`?n.target.valueAsNumber:n.target.value);a.setQueryData(t.activeQuery.queryKey,i)}),e.T(n,`id`,h),e.H(t=>{var r=f()===`number`?`number`:`text`,a=L(i().value,i().editableInput);return r!==t.e&&e.T(n,`type`,t.e=r),a!==t.t&&e.y(n,t.t=a),t},{e:void 0,t:void 0}),e.H(()=>n.value=t.value),n}}),e.L(e.P,{get when(){return f()===`boolean`},get children(){var n=ec();return e.S(n,e.L(cc,{get activeQuery(){return t.activeQuery},dataPath:m,get value(){return t.value}}),null),e.S(n,()=>e.r(t.value),null),e.H(()=>e.y(n,L(i().value,i().actions,i().editableInput))),n}})]}}),null),e.S(n,e.L(e.P,{get when(){return e.C(()=>!!(t.editable&&t.itemsDeletable))()&&t.activeQuery!==void 0},get children(){return e.L(sc,{get activeQuery(){return t.activeQuery},dataPath:m})}}),null),e.H(t=>{var a=i().row,o=i().label;return a!==t.e&&e.y(n,t.e=a),o!==t.t&&e.y(r,t.t=o),t},{e:void 0,t:void 0}),n}}),null),e.H(()=>e.y(n,i().entry)),n})()}const dc=(e,t)=>{let{colors:n,font:r,size:i,border:a}=X,o=(t,n)=>e===`light`?t:n;return{entry:t`
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
    `}},fc=e=>dc(`light`,e),pc=e=>dc(`dark`,e);e.x([`click`]);var mc=e.O(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`),hc=e.O(`<div>`),gc=e.O(`<div style=--tsqd-font-size:16px;max-height:100vh;height:100vh;width:100vw>`),_c=e.O(`<div style=--tsqd-font-size:16px>`),vc=e.O(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`),yc=e.O(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`),bc=e.O(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`),xc=e.O(`<span>Asc`),Sc=e.O(`<span>Desc`),Cc=e.O(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`),wc=e.O(`<div>Settings`),Tc=e.O(`<span>Position`),Ec=e.O(`<span>Top`),Dc=e.O(`<span>Bottom`),Oc=e.O(`<span>Left`),kc=e.O(`<span>Right`),Ac=e.O(`<span>Theme`),jc=e.O(`<span>Light`),Mc=e.O(`<span>Dark`),Nc=e.O(`<span>System`),Pc=e.O(`<span>Disabled Queries`),Fc=e.O(`<span>Show`),Ic=e.O(`<span>Hide`),Lc=e.O(`<div><div class=tsqd-queries-container>`),Rc=e.O(`<div><div class=tsqd-mutations-container>`),zc=e.O(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`),Bc=e.O(`<option>Sort by `),Vc=e.O(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`),Hc=e.O(`<div class=tsqd-query-static-indicator aria-hidden=true>static`),Uc=e.O(`<button><div></div><code class=tsqd-query-hash>`),Wc=e.O(`<div role=tooltip id=tsqd-status-tooltip>`),Gc=e.O(`<span>`),Kc=e.O(`<button><span aria-hidden=true></span><span>`),qc=e.O(`<button><span aria-hidden=true></span> Error`),Jc=e.O(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value disabled selected>`),Yc=e.O(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`),Xc=e.O(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`),Zc=e.O(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),Qc=e.O(`<option>`),$c=e.O(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);const[el,tl]=e.W(null),[nl,rl]=e.W(null),[il,al]=e.W(0),[ol,sl]=e.W(!1),cl=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?Ol(r):Dl(r)),a=e.V(()=>Z().onlineManager);e.Z(()=>{let t=a().subscribe(e=>{sl(!e)});e.X(()=>{t()})});let o=Us(),s=e.V(()=>Z().buttonPosition||`bottom-right`),c=e.V(()=>t.localStore.open===`true`?!0:t.localStore.open===`false`?!1:Z().initialIsOpen||!1),l=e.V(()=>t.localStore.position||Z().position||`bottom`),u;e.B(()=>{let e=u.parentElement,n=t.localStore.height||500,r=t.localStore.width||500,i=l();e.style.setProperty(`--tsqd-panel-height`,`${i===`top`?`-`:``}${n}px`),e.style.setProperty(`--tsqd-panel-width`,`${i===`left`?`-`:``}${r}px`)}),e.Z(()=>{let t=()=>{let e=u.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty(`--tsqd-font-size`,t)};t(),window.addEventListener(`focus`,t),e.X(()=>{window.removeEventListener(`focus`,t)})});let d=e.V(()=>t.localStore.pip_open??`false`);return[e.L(e.P,{get when(){return e.C(()=>!!o().pipWindow)()&&d()==`true`},get children(){return e.L(e._,{get mount(){return o().pipWindow?.document.body},get children(){return e.L(ll,{get children(){return e.L(fl,t)}})}})}}),(()=>{var n=hc(),a=u;return typeof a==`function`?e.k(a,n):u=n,e.S(n,e.L(fe,{name:`tsqd-panel-transition`,get children(){return e.L(e.P,{get when(){return e.C(()=>!!(c()&&!o().pipWindow))()&&d()==`false`},get children(){return e.L(dl,{get localStore(){return t.localStore},get setLocalStore(){return t.setLocalStore}})}})}}),null),e.S(n,e.L(fe,{name:`tsqd-button-transition`,get children(){return e.L(e.P,{get when(){return!c()},get children(){var n=mc(),r=n.firstChild,a=r.nextSibling;return e.S(r,e.L(Is,{})),a.$$click=()=>t.setLocalStore(`open`,`true`),e.S(a,e.L(Is,{})),e.H(()=>e.y(n,L(i().devtoolsBtn,i()[`devtoolsBtn-position-${s()}`],`tsqd-open-btn-container`))),n}})}}),null),e.H(()=>e.y(n,L(r`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${l()===`top`||l()===`bottom`?`transform: translateY(var(--tsqd-panel-height));`:`transform: translateX(var(--tsqd-panel-width));`}
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
              transform: ${s()===`relative`?`none;`:s()===`top-left`?`translateX(-72px);`:s()===`top-right`?`translateX(72px);`:`translateY(72px);`};
              opacity: 0;
            }
          `,`tsqd-transitions-container`))),n})()]},ll=t=>{let n=Us(),r=Q(),i=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,a=e.V(()=>r()===`dark`?Ol(i):Dl(i)),o=()=>{let{colors:e}=X,t=(e,t)=>r()===`dark`?t:e;return il()<796?i`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:i`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return e.B(()=>{let t=n().pipWindow,r=()=>{t&&al(t.innerWidth)};t&&(t.addEventListener(`resize`,r),r()),e.X(()=>{t&&t.removeEventListener(`resize`,r)})}),(()=>{var n=gc();return e.S(n,()=>t.children),e.H(()=>e.y(n,L(a().panel,o(),{[i`
            min-width: min-content;
          `]:il()<700},`tsqd-main-panel`))),n})()},ul=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?Ol(r):Dl(r)),a;e.Z(()=>{be(a,({width:e},t)=>{t===a&&al(e)})});let o=()=>{let{colors:e}=X,t=(e,t)=>n()===`dark`?t:e;return il()<796?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return(()=>{var n=_c(),s=a;return typeof s==`function`?e.k(s,n):a=n,e.S(n,()=>t.children),e.H(()=>e.y(n,L(i().parentPanel,o(),{[r`
            min-width: min-content;
          `]:il()<700},`tsqd-main-panel`))),n})()},dl=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?Ol(r):Dl(r)),a;e.Z(()=>{a.focus()});let[o,s]=e.W(!1),c=e.V(()=>t.localStore.position||Z().position||`bottom`),l=n=>{let r=n.currentTarget.parentElement;if(!r)return;s(!0);let{height:i,width:a}=r.getBoundingClientRect(),l=n.clientX,u=n.clientY,d=0,f=e.t(3.5),p=e.t(12),m=e=>{if(e.preventDefault(),c()===`left`||c()===`right`){let n=c()===`right`?l-e.clientX:e.clientX-l;d=Math.round(a+n),d<p&&(d=p),t.setLocalStore(`width`,String(Math.round(d)));let i=r.getBoundingClientRect().width;Number(t.localStore.width)<i&&t.setLocalStore(`width`,String(i))}else{let n=c()===`bottom`?u-e.clientY:e.clientY-u;d=Math.round(i+n),d<f&&(d=f,tl(null)),t.setLocalStore(`height`,String(Math.round(d)))}},h=()=>{o()&&s(!1),document.removeEventListener(`mousemove`,m,!1),document.removeEventListener(`mouseup`,h,!1)};document.addEventListener(`mousemove`,m,!1),document.addEventListener(`mouseup`,h,!1)},u;e.Z(()=>{be(u,({width:e},t)=>{t===u&&al(e)})}),e.B(()=>{let n=u.parentElement?.parentElement?.parentElement;if(!n)return;let r=t.localStore.position||`bottom`,i=e.l(`padding`,r),a=t.localStore.position===`left`||t.localStore.position===`right`,o=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i}))(n.style);n.style[i]=`${a?t.localStore.width:t.localStore.height}px`,e.X(()=>{Object.entries(o).forEach(([e,t])=>{n.style[e]=t})})});let d=()=>{let{colors:e}=X,t=(e,t)=>n()===`dark`?t:e;return il()<796?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return(()=>{var n=vc(),o=n.firstChild,s=o.nextSibling,f=u;typeof f==`function`?e.k(f,n):u=n,o.$$keydown=n=>{let r=e.t(3.5),i=e.t(12);if(c()===`top`||c()===`bottom`){if(n.key===`ArrowUp`||n.key===`ArrowDown`){n.preventDefault();let e=Number(t.localStore.height||500),i=c()===`bottom`?n.key===`ArrowUp`?10:-10:n.key===`ArrowDown`?10:-10,a=Math.max(r,e+i);t.setLocalStore(`height`,String(a))}}else if(n.key===`ArrowLeft`||n.key===`ArrowRight`){n.preventDefault();let e=Number(t.localStore.width||500),r=c()===`right`?n.key===`ArrowLeft`?10:-10:n.key===`ArrowRight`?10:-10,a=Math.max(i,e+r);t.setLocalStore(`width`,String(a))}},o.$$mousedown=l,s.$$click=()=>t.setLocalStore(`open`,`false`);var p=a;return typeof p==`function`?e.k(p,s):a=s,e.S(s,e.L(ms,{})),e.S(n,e.L(fl,t),null),e.H(a=>{var l=L(i().panel,i()[`panel-position-${c()}`],d(),{[r`
            min-width: min-content;
          `]:il()<700&&(c()===`right`||c()===`left`)},`tsqd-main-panel`),u=c()===`bottom`||c()===`top`?`${t.localStore.height||500}px`:`auto`,f=c()===`right`||c()===`left`?`${t.localStore.width||500}px`:`auto`,p=c()===`top`||c()===`bottom`?`horizontal`:`vertical`,m=c()===`top`||c()===`bottom`?e.t(3.5):e.t(12),h=c()===`top`||c()===`bottom`?Number(t.localStore.height||500):Number(t.localStore.width||500),g=L(i().dragHandle,i()[`dragHandle-position-${c()}`],`tsqd-drag-handle`),_=L(i().closeBtn,i()[`closeBtn-position-${c()}`],`tsqd-minimize-btn`);return l!==a.e&&e.y(n,a.e=l),u!==a.t&&e.E(n,`height`,a.t=u),f!==a.a&&e.E(n,`width`,a.a=f),p!==a.o&&e.T(o,`aria-orientation`,a.o=p),m!==a.i&&e.T(o,`aria-valuemin`,a.i=m),h!==a.n&&e.T(o,`aria-valuenow`,a.n=h),g!==a.s&&e.y(o,a.s=g),_!==a.h&&e.y(s,a.h=_),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),n})()},fl=t=>{xl(),Cl();let n,r=Q(),i=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,a=e.V(()=>r()===`dark`?Ol(i):Dl(i)),o=Us(),[s,c]=e.W(`queries`),l=e.V(()=>t.localStore.sort||Ls),u=e.V(()=>Number(t.localStore.sortOrder)||1),d=e.V(()=>t.localStore.mutationSort||Rs),f=e.V(()=>Number(t.localStore.mutationSortOrder)||1),p=e.V(()=>e.f[l()]),m=e.V(()=>e.u[d()]),h=e.V(()=>Z().onlineManager),g=e.V(()=>Z().client.getQueryCache()),_=e.V(()=>Z().client.getMutationCache()),v=$(e=>e().getAll().length,!1),b=e.V(e.Y(()=>[v(),t.localStore.filter,l(),u(),t.localStore.hideDisabledQueries],()=>{let e=g().getAll(),n=t.localStore.filter?e.filter(e=>y(e.queryHash,t.localStore.filter||``).passed):[...e];return t.localStore.hideDisabledQueries===`true`&&(n=n.filter(e=>!e.isDisabled())),p()?n.sort((e,t)=>p()(e,t)*u()):n})),x=wl(e=>e().getAll().length,!1),S=e.V(e.Y(()=>[x(),t.localStore.mutationFilter,d(),f()],()=>{let e=_().getAll(),n=t.localStore.mutationFilter?e.filter(e=>y(`${e.options.mutationKey?JSON.stringify(e.options.mutationKey)+` - `:``}${new Date(e.state.submittedAt).toLocaleString()}`,t.localStore.mutationFilter||``).passed):[...e];return m()?n.sort((e,t)=>m()(e,t)*f()):n})),C=e=>{t.setLocalStore(`position`,e)},w=e=>{let t=getComputedStyle(n).getPropertyValue(`--tsqd-font-size`);e.style.setProperty(`--tsqd-font-size`,t)};return[(()=>{var r=zc(),p=r.firstChild,m=p.firstChild,v=m.firstChild,y=v.firstChild,x=y.nextSibling,T=x.firstChild,E=p.nextSibling,D=E.firstChild,O=D.firstChild,k=O.firstChild,A=O.nextSibling,j=A.nextSibling,M=D.nextSibling,N=M.firstChild,P=N.nextSibling,F=n;return typeof F==`function`?e.k(F,r):n=r,v.$$click=()=>{if(!o().pipWindow&&!t.showPanelViewOnly){t.setLocalStore(`open`,`false`);return}t.onClose&&t.onClose()},e.S(x,()=>Z().queryFlavor,T),e.S(x,()=>Z().version,null),e.S(m,e.L(ja.Root,{get class(){return L(a().viewToggle)},get value(){return s()},"aria-label":`Toggle between queries and mutations view`,onChange:e=>{c(e),tl(null),rl(null)},get children(){return[e.L(ja.Item,{value:`queries`,class:`tsqd-radio-toggle`,get children(){return[e.L(ja.ItemInput,{}),e.L(ja.ItemControl,{get children(){return e.L(ja.ItemIndicator,{})}}),e.L(ja.ItemLabel,{title:`Toggle Queries View`,children:`Queries`})]}}),e.L(ja.Item,{value:`mutations`,class:`tsqd-radio-toggle`,get children(){return[e.L(ja.ItemInput,{}),e.L(ja.ItemControl,{get children(){return e.L(ja.ItemIndicator,{})}}),e.L(ja.ItemLabel,{title:`Toggle Mutations View`,children:`Mutations`})]}})]}}),null),e.S(p,e.L(e.P,{get when(){return s()===`queries`},get children(){return e.L(hl,{})}}),null),e.S(p,e.L(e.P,{get when(){return s()===`mutations`},get children(){return e.L(gl,{})}}),null),e.S(O,e.L(fs,{}),k),k.$$input=e=>{s()===`queries`?t.setLocalStore(`filter`,e.currentTarget.value):t.setLocalStore(`mutationFilter`,e.currentTarget.value)},e.S(A,e.L(e.P,{get when(){return s()===`queries`},get children(){var n=yc();return n.addEventListener(`change`,e=>{t.setLocalStore(`sort`,e.currentTarget.value)}),e.S(n,()=>Object.keys(e.f).map(t=>(()=>{var n=Bc();return n.firstChild,n.value=t,e.S(n,t,null),n})())),e.H(()=>n.value=l()),n}}),null),e.S(A,e.L(e.P,{get when(){return s()===`mutations`},get children(){var n=bc();return n.addEventListener(`change`,e=>{t.setLocalStore(`mutationSort`,e.currentTarget.value)}),e.S(n,()=>Object.keys(e.u).map(t=>(()=>{var n=Bc();return n.firstChild,n.value=t,e.S(n,t,null),n})())),e.H(()=>n.value=d()),n}}),null),e.S(A,e.L(ms,{}),null),j.$$click=()=>{s()===`queries`?t.setLocalStore(`sortOrder`,String(u()*-1)):t.setLocalStore(`mutationSortOrder`,String(f()*-1))},e.S(j,e.L(e.P,{get when(){return(s()===`queries`?u():f())===1},get children(){return[xc(),e.L(hs,{})]}}),null),e.S(j,e.L(e.P,{get when(){return(s()===`queries`?u():f())===-1},get children(){return[Sc(),e.L(gs,{})]}}),null),N.$$click=()=>{s()===`queries`?(Tl({type:`CLEAR_QUERY_CACHE`}),g().clear()):(Tl({type:`CLEAR_MUTATION_CACHE`}),_().clear())},e.S(N,e.L(ps,{})),P.$$click=()=>{h().setOnline(!h().isOnline())},e.S(P,(()=>{var t=e.C(()=>!!ol());return()=>t()?e.L(Cs,{}):e.L(Ss,{})})()),e.S(M,e.L(e.P,{get when(){return e.C(()=>!o().pipWindow)()&&!o().disabled},get children(){var n=Cc();return n.$$click=()=>{o().requestPipWindow(Number(window.innerWidth),Number(t.localStore.height??500))},e.S(n,e.L(Ts,{})),e.H(()=>e.y(n,L(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-open-pip`))),n}}),null),e.S(M,e.L(Y.Root,{gutter:4,get children(){return[e.L(Y.Trigger,{get class(){return L(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-settings`)},"aria-label":`Open settings menu`,title:`Open settings menu`,get children(){return e.L(ws,{})}}),e.L(Y.Portal,{ref:e=>w(e),get mount(){return e.C(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return e.L(Y.Content,{get class(){return L(a().settingsMenu,`tsqd-settings-menu`)},get children(){return[(()=>{var t=wc();return e.H(()=>e.y(t,L(a().settingsMenuHeader,`tsqd-settings-menu-header`))),t})(),e.L(e.P,{get when(){return!t.showPanelViewOnly},get children(){return e.L(Y.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[e.L(Y.SubTrigger,{get class(){return L(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[Tc(),e.L(ms,{})]}}),e.L(Y.Portal,{ref:e=>w(e),get mount(){return e.C(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return e.L(Y.SubContent,{get class(){return L(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return e.L(Y.RadioGroup,{"aria-label":`Position settings`,get value(){return t.localStore.position},onChange:e=>C(e),get children(){return[e.L(Y.RadioItem,{value:`top`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ec(),e.L(hs,{})]}}),e.L(Y.RadioItem,{value:`bottom`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Dc(),e.L(gs,{})]}}),e.L(Y.RadioItem,{value:`left`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Oc(),e.L(_s,{})]}}),e.L(Y.RadioItem,{value:`right`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-right`)},get children(){return[kc(),e.L(vs,{})]}})]}})}})}})]}})}}),e.L(Y.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[e.L(Y.SubTrigger,{get class(){return L(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-theme`)},get children(){return[Ac(),e.L(ms,{})]}}),e.L(Y.Portal,{ref:e=>w(e),get mount(){return e.C(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return e.L(Y.SubContent,{get class(){return L(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return e.L(Y.RadioGroup,{get value(){return t.localStore.theme_preference},onChange:e=>{t.setLocalStore(`theme_preference`,e)},"aria-label":`Theme preference`,get children(){return[e.L(Y.RadioItem,{value:`light`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[jc(),e.L(ys,{})]}}),e.L(Y.RadioItem,{value:`dark`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Mc(),e.L(bs,{})]}}),e.L(Y.RadioItem,{value:`system`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Nc(),e.L(xs,{})]}})]}})}})}})]}}),e.L(Y.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[e.L(Y.SubTrigger,{get class(){return L(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-disabled-queries`)},get children(){return[Pc(),e.L(ms,{})]}}),e.L(Y.Portal,{ref:e=>w(e),get mount(){return e.C(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return e.L(Y.SubContent,{get class(){return L(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return e.L(Y.RadioGroup,{get value(){return t.localStore.hideDisabledQueries},"aria-label":`Hide disabled queries setting`,onChange:e=>t.setLocalStore(`hideDisabledQueries`,e),get children(){return[e.L(Y.RadioItem,{value:`false`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-show`)},get children(){return[Fc(),e.L(e.P,{get when(){return t.localStore.hideDisabledQueries!==`true`},get children(){return e.L(Ms,{})}})]}}),e.L(Y.RadioItem,{value:`true`,get class(){return L(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-hide`)},get children(){return[Ic(),e.L(e.P,{get when(){return t.localStore.hideDisabledQueries===`true`},get children(){return e.L(Ms,{})}})]}})]}})}})}})]}})]}})}})]}}),null),e.S(r,e.L(e.P,{get when(){return s()===`queries`},get children(){var t=Lc(),n=t.firstChild;return e.S(n,e.L(ge,{by:e=>e.queryHash,get each(){return b()},children:t=>e.L(pl,{get query(){return t()}})})),e.H(()=>e.y(t,L(a().overflowQueryContainer,`tsqd-queries-overflow-container`))),t}}),null),e.S(r,e.L(e.P,{get when(){return s()===`mutations`},get children(){var t=Rc(),n=t.firstChild;return e.S(n,e.L(ge,{by:e=>e.mutationId,get each(){return S()},children:t=>e.L(ml,{get mutation(){return t()}})})),e.H(()=>e.y(t,L(a().overflowQueryContainer,`tsqd-mutations-overflow-container`))),t}}),null),e.H(t=>{var n=L(a().queriesContainer,il()<796&&(el()||nl())&&i`
              height: 50%;
              max-height: 50%;
            `,il()<796&&!(el()||nl())&&i`
              height: 100%;
              max-height: 100%;
            `,`tsqd-queries-container`),o=L(a().row,`tsqd-header`),c=a().logoAndToggleContainer,l=L(a().logo,`tsqd-text-logo-container`),d=L(a().tanstackLogo,`tsqd-text-logo-tanstack`),h=L(a().queryFlavorLogo,`tsqd-text-logo-query-flavor`),g=L(a().row,`tsqd-filters-actions-container`),_=L(a().filtersContainer,`tsqd-filters-container`),b=L(a().filterInput,`tsqd-query-filter-textfield-container`),S=L(`tsqd-query-filter-textfield`),C=L(a().filterSelect,`tsqd-query-filter-sort-container`),w=`Sort order ${(s()===`queries`?u():f())===-1?`descending`:`ascending`}`,T=(s()===`queries`?u():f())===-1,F=L(a().actionsContainer,`tsqd-actions-container`),ee=L(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-clear-cache`),te=`Clear ${s()} cache`,I=L(a().actionsBtn,ol()&&a().actionsBtnOffline,`tsqd-actions-btn`,`tsqd-action-mock-offline-behavior`),ne=`${ol()?`Unset offline mocking behavior`:`Mock offline behavior`}`,re=ol(),ie=`${ol()?`Unset offline mocking behavior`:`Mock offline behavior`}`;return n!==t.e&&e.y(r,t.e=n),o!==t.t&&e.y(p,t.t=o),c!==t.a&&e.y(m,t.a=c),l!==t.o&&e.y(v,t.o=l),d!==t.i&&e.y(y,t.i=d),h!==t.n&&e.y(x,t.n=h),g!==t.s&&e.y(E,t.s=g),_!==t.h&&e.y(D,t.h=_),b!==t.r&&e.y(O,t.r=b),S!==t.d&&e.y(k,t.d=S),C!==t.l&&e.y(A,t.l=C),w!==t.u&&e.T(j,`aria-label`,t.u=w),T!==t.c&&e.T(j,`aria-pressed`,t.c=T),F!==t.w&&e.y(M,t.w=F),ee!==t.m&&e.y(N,t.m=ee),te!==t.f&&e.T(N,`title`,t.f=te),I!==t.y&&e.y(P,t.y=I),ne!==t.g&&e.T(P,`aria-label`,t.g=ne),re!==t.p&&e.T(P,`aria-pressed`,t.p=re),ie!==t.b&&e.T(P,`title`,t.b=ie),t},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),e.H(()=>k.value=s()===`queries`?t.localStore.filter||``:t.localStore.mutationFilter||``),r})(),e.L(e.P,{get when(){return e.C(()=>s()===`queries`)()&&el()},get children(){return e.L(vl,{})}}),e.L(e.P,{get when(){return e.C(()=>s()===`mutations`)()&&nl()},get children(){return e.L(yl,{})}})]},pl=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?Ol(r):Dl(r)),{colors:a,alpha:o}=X,s=(e,t)=>n()===`dark`?t:e,c=$(e=>e().get(t.query.queryHash)?.state,!0,e=>e.query.queryHash===t.query.queryHash),l=$(e=>e().get(t.query.queryHash)?.isDisabled()??!1,!0,e=>e.query.queryHash===t.query.queryHash),u=$(e=>e().get(t.query.queryHash)?.isStatic()??!1,!0,e=>e.query.queryHash===t.query.queryHash),d=$(e=>e().get(t.query.queryHash)?.isStale()??!1,!0,e=>e.query.queryHash===t.query.queryHash),f=$(e=>e().get(t.query.queryHash)?.getObserversCount()??0,!0,e=>e.query.queryHash===t.query.queryHash),p=e.V(()=>e.o({queryState:c(),observerCount:f(),isStale:d()})),m=()=>p()===`gray`?r`
        background-color: ${s(a[p()][200],a[p()][700])};
        color: ${s(a[p()][700],a[p()][300])};
      `:r`
      background-color: ${s(a[p()][200]+o[80],a[p()][900])};
      color: ${s(a[p()][800],a[p()][300])};
    `;return e.L(e.P,{get when(){return c()},get children(){var n=Uc(),r=n.firstChild,a=r.nextSibling;return n.$$click=()=>tl(t.query.queryHash===el()?null:t.query.queryHash),e.S(r,f),e.S(a,()=>t.query.queryHash),e.S(n,e.L(e.P,{get when(){return l()},get children(){return Vc()}}),null),e.S(n,e.L(e.P,{get when(){return u()},get children(){return Hc()}}),null),e.H(a=>{var o=L(i().queryRow,el()===t.query.queryHash&&i().selectedQueryRow,`tsqd-query-row`),s=`Query key ${t.query.queryHash}${l()?`, disabled`:``}${u()?`, static`:``}`,c=L(m(),`tsqd-query-observer-count`);return o!==a.e&&e.y(n,a.e=o),s!==a.t&&e.T(n,`aria-label`,a.t=s),c!==a.a&&e.y(r,a.a=c),a},{e:void 0,t:void 0,a:void 0}),n}})},ml=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?Ol(r):Dl(r)),{colors:a,alpha:o}=X,s=(e,t)=>n()===`dark`?t:e,c=wl(e=>e().getAll().find(e=>e.mutationId===t.mutation.mutationId)?.state),l=wl(e=>{let n=e().getAll().find(e=>e.mutationId===t.mutation.mutationId);return n?n.state.isPaused:!1}),u=wl(e=>{let n=e().getAll().find(e=>e.mutationId===t.mutation.mutationId);return n?n.state.status:`idle`}),d=e.V(()=>e.i({isPaused:l(),status:u()})),f=()=>d()===`gray`?r`
        background-color: ${s(a[d()][200],a[d()][700])};
        color: ${s(a[d()][700],a[d()][300])};
      `:r`
      background-color: ${s(a[d()][200]+o[80],a[d()][900])};
      color: ${s(a[d()][800],a[d()][300])};
    `;return e.L(e.P,{get when(){return c()},get children(){var n=Uc(),r=n.firstChild,a=r.nextSibling;return n.$$click=()=>{rl(t.mutation.mutationId===nl()?null:t.mutation.mutationId)},e.S(r,e.L(e.P,{get when(){return d()===`purple`},get children(){return e.L(Fs,{})}}),null),e.S(r,e.L(e.P,{get when(){return d()===`green`},get children(){return e.L(Ms,{})}}),null),e.S(r,e.L(e.P,{get when(){return d()===`red`},get children(){return e.L(Ps,{})}}),null),e.S(r,e.L(e.P,{get when(){return d()===`yellow`},get children(){return e.L(Ns,{})}}),null),e.S(a,e.L(e.P,{get when(){return t.mutation.options.mutationKey},get children(){return[e.C(()=>JSON.stringify(t.mutation.options.mutationKey)),` -`,` `]}}),null),e.S(a,()=>new Date(t.mutation.state.submittedAt).toLocaleString(),null),e.H(a=>{var o=L(i().queryRow,nl()===t.mutation.mutationId&&i().selectedQueryRow,`tsqd-query-row`),s=`Mutation submitted at ${new Date(t.mutation.state.submittedAt).toLocaleString()}`,c=L(f(),`tsqd-query-observer-count`);return o!==a.e&&e.y(n,a.e=o),s!==a.t&&e.T(n,`aria-label`,a.t=s),c!==a.a&&e.y(r,a.a=c),a},{e:void 0,t:void 0,a:void 0}),n}})},hl=()=>{let t=$(t=>t().getAll().filter(t=>e.c(t)===`stale`).length),n=$(t=>t().getAll().filter(t=>e.c(t)===`fresh`).length),r=$(t=>t().getAll().filter(t=>e.c(t)===`fetching`).length),i=$(t=>t().getAll().filter(t=>e.c(t)===`paused`).length),a=$(t=>t().getAll().filter(t=>e.c(t)===`inactive`).length),o=Q(),s=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,c=e.V(()=>o()===`dark`?Ol(s):Dl(s));return(()=>{var o=hc();return e.S(o,e.L(_l,{label:`Fresh`,color:`green`,get count(){return n()}}),null),e.S(o,e.L(_l,{label:`Fetching`,color:`blue`,get count(){return r()}}),null),e.S(o,e.L(_l,{label:`Paused`,color:`purple`,get count(){return i()}}),null),e.S(o,e.L(_l,{label:`Stale`,color:`yellow`,get count(){return t()}}),null),e.S(o,e.L(_l,{label:`Inactive`,color:`gray`,get count(){return a()}}),null),e.H(()=>e.y(o,L(c().queryStatusContainer,`tsqd-query-status-container`))),o})()},gl=()=>{let t=wl(t=>t().getAll().filter(t=>e.i({isPaused:t.state.isPaused,status:t.state.status})===`green`).length),n=wl(t=>t().getAll().filter(t=>e.i({isPaused:t.state.isPaused,status:t.state.status})===`yellow`).length),r=wl(t=>t().getAll().filter(t=>e.i({isPaused:t.state.isPaused,status:t.state.status})===`purple`).length),i=wl(t=>t().getAll().filter(t=>e.i({isPaused:t.state.isPaused,status:t.state.status})===`red`).length),a=Q(),o=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,s=e.V(()=>a()===`dark`?Ol(o):Dl(o));return(()=>{var a=hc();return e.S(a,e.L(_l,{label:`Paused`,color:`purple`,get count(){return r()}}),null),e.S(a,e.L(_l,{label:`Pending`,color:`yellow`,get count(){return n()}}),null),e.S(a,e.L(_l,{label:`Success`,color:`green`,get count(){return t()}}),null),e.S(a,e.L(_l,{label:`Error`,color:`red`,get count(){return i()}}),null),e.H(()=>e.y(a,L(s().queryStatusContainer,`tsqd-query-status-container`))),a})()},_l=t=>{let n=Q(),r=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,i=e.V(()=>n()===`dark`?Ol(r):Dl(r)),{colors:a,alpha:o}=X,s=(e,t)=>n()===`dark`?t:e,c,[l,u]=e.W(!1),[d,f]=e.W(!1),p=e.V(()=>!(el()&&il()<1024&&il()>796||il()<796));return(()=>{var n=Kc(),m=n.firstChild,h=m.nextSibling,g=c;return typeof g==`function`?e.k(g,n):c=n,n.addEventListener(`mouseleave`,()=>{u(!1),f(!1)}),n.addEventListener(`mouseenter`,()=>u(!0)),n.addEventListener(`blur`,()=>f(!1)),n.addEventListener(`focus`,()=>f(!0)),e.D(n,e.J({get disabled(){return p()},get"aria-label"(){return`${t.label}: ${t.count}`},get class(){return L(i().queryStatusTag,!p()&&r`
            cursor: pointer;
            &:hover {
              background: ${s(a.gray[200],a.darkGray[400])}${o[80]};
            }
          `,`tsqd-query-status-tag`,`tsqd-query-status-tag-${t.label.toLowerCase()}`)}},()=>l()||d()?{"aria-describedby":`tsqd-status-tooltip`}:{}),!1,!0),e.S(n,e.L(e.P,{get when(){return e.C(()=>!p())()&&(l()||d())},get children(){var n=Wc();return e.S(n,()=>t.label),e.H(()=>e.y(n,L(i().statusTooltip,`tsqd-query-status-tooltip`))),n}}),m),e.S(n,e.L(e.P,{get when(){return p()},get children(){var n=Gc();return e.S(n,()=>t.label),e.H(()=>e.y(n,L(i().queryStatusTagLabel,`tsqd-query-status-tag-label`))),n}}),h),e.S(h,()=>t.count),e.H(n=>{var o=L(r`
            width: ${X.size[1.5]};
            height: ${X.size[1.5]};
            border-radius: ${X.border.radius.full};
            background-color: ${X.colors[t.color][500]};
          `,`tsqd-query-status-tag-dot`),c=L(i().queryStatusCount,t.count>0&&t.color!==`gray`&&r`
              background-color: ${s(a[t.color][100],a[t.color][900])};
              color: ${s(a[t.color][700],a[t.color][300])};
            `,`tsqd-query-status-tag-count`);return o!==n.e&&e.y(m,n.e=o),c!==n.t&&e.y(h,n.t=c),n},{e:void 0,t:void 0}),n})()},vl=()=>{let t=Q(),n=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,r=e.V(()=>t()===`dark`?Ol(n):Dl(n)),{colors:i}=X,a=(e,n)=>t()===`dark`?n:e,o=Z().client,[s,c]=e.W(!1),[l,u]=e.W(`view`),[d,f]=e.W(!1),p=e.V(()=>Z().errorTypes||[]),m=$(e=>e().getAll().find(e=>e.queryHash===el()),!1),h=$(e=>e().getAll().find(e=>e.queryHash===el()),!1),g=$(e=>e().getAll().find(e=>e.queryHash===el())?.state,!1),_=$(e=>e().getAll().find(e=>e.queryHash===el())?.state.data,!1),v=$(t=>{let n=t().getAll().find(e=>e.queryHash===el());return n?e.c(n):`inactive`}),y=$(e=>{let t=e().getAll().find(e=>e.queryHash===el());return t?t.state.status:`pending`}),b=$(e=>e().getAll().find(e=>e.queryHash===el())?.getObserversCount()??0),x=e.V(()=>e.s(v())),S=()=>{Tl({type:`REFETCH`,queryHash:m()?.queryHash}),(m()?.fetch())?.catch(()=>{})},C=e=>{let t=m();if(!t)return;Tl({type:`TRIGGER_ERROR`,queryHash:t.queryHash,metadata:{error:e?.name}});let n=e?.initializer(t)??Error(`Unknown error from devtools`),r=t.options;t.setState({data:void 0,status:`error`,error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})},w=()=>{let e=m();if(!e)return;Tl({type:`RESTORE_LOADING`,queryHash:e.queryHash});let t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:`idle`,fetchMeta:null}),n&&e.fetch(n)};e.B(()=>{v()!==`fetching`&&c(!1)});let T=()=>x()===`gray`?n`
        background-color: ${a(i[x()][200],i[x()][700])};
        color: ${a(i[x()][700],i[x()][300])};
        border-color: ${a(i[x()][400],i[x()][600])};
      `:n`
      background-color: ${a(i[x()][100],i[x()][900])};
      color: ${a(i[x()][700],i[x()][300])};
      border-color: ${a(i[x()][400],i[x()][600])};
    `;return e.L(e.P,{get when(){return e.C(()=>!!m())()&&g()},get children(){var t=Zc(),x=t.firstChild,E=x.nextSibling,D=E.firstChild,O=D.firstChild,k=O.firstChild,A=O.nextSibling,j=D.nextSibling,M=j.firstChild.nextSibling,N=j.nextSibling.firstChild.nextSibling,P=E.nextSibling,F=P.nextSibling,ee=F.firstChild,te=ee.firstChild,I=ee.nextSibling,ne=I.firstChild,re=I.nextSibling,ie=re.firstChild,R=re.nextSibling,ae=R.firstChild,oe=R.nextSibling,se=oe.firstChild,ce=se.nextSibling,le=F.nextSibling;le.firstChild;var ue=le.nextSibling,de=ue.nextSibling;return e.S(k,()=>e.r(m().queryKey,!0)),e.S(A,v),e.S(M,b),e.S(N,()=>new Date(g().dataUpdatedAt).toLocaleTimeString()),ee.$$click=S,I.$$click=()=>{Tl({type:`INVALIDATE`,queryHash:m()?.queryHash}),o.invalidateQueries({queryKey:m()?.queryKey,exact:!0})},re.$$click=()=>{Tl({type:`RESET`,queryHash:m()?.queryHash}),o.resetQueries({queryKey:m()?.queryKey,exact:!0})},R.$$click=()=>{Tl({type:`REMOVE`,queryHash:m()?.queryHash}),o.removeQueries({queryKey:m()?.queryKey,exact:!0}),tl(null)},oe.$$click=()=>{if(m()?.state.data===void 0)c(!0),w();else{let e=m();if(!e)return;Tl({type:`TRIGGER_LOADING`,queryHash:e.queryHash});let t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:`pending`,fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},e.S(oe,()=>y()===`pending`?`Restore`:`Trigger`,ce),e.S(F,e.L(e.P,{get when(){return p().length===0||y()===`error`},get children(){var t=qc(),r=t.firstChild,s=r.nextSibling;return t.$$click=()=>{m().state.error?(Tl({type:`RESTORE_ERROR`,queryHash:m()?.queryHash}),o.resetQueries({queryKey:m()?.queryKey})):C()},e.S(t,()=>y()===`error`?`Restore`:`Trigger`,s),e.H(o=>{var s=L(n`
                  color: ${a(i.red[500],i.red[400])};
                `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error`),c=y()===`pending`,l=n`
                  background-color: ${a(i.red[500],i.red[400])};
                `;return s!==o.e&&e.y(t,o.e=s),c!==o.t&&(t.disabled=o.t=c),l!==o.a&&e.y(r,o.a=l),o},{e:void 0,t:void 0,a:void 0}),t}}),null),e.S(F,e.L(e.P,{get when(){return p().length!==0&&y()!==`error`},get children(){var t=Jc(),i=t.firstChild,a=i.nextSibling.nextSibling;return a.firstChild,a.addEventListener(`change`,e=>{let t=p().find(t=>t.name===e.currentTarget.value);C(t)}),e.S(a,e.L(e.j,{get each(){return p()},children:t=>(()=>{var n=Qc();return e.S(n,()=>t.name),e.H(()=>n.value=t.name),n})()}),null),e.S(t,e.L(ms,{}),null),e.H(o=>{var s=L(r().actionsSelect,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error-multiple`),c=n`
                  background-color: ${X.colors.red[400]};
                `,l=y()===`pending`;return s!==o.e&&e.y(t,o.e=s),c!==o.t&&e.y(i,o.t=c),l!==o.a&&(a.disabled=o.a=l),o},{e:void 0,t:void 0,a:void 0}),t}}),null),e.S(le,()=>l()===`view`?`Explorer`:`Editor`,null),e.S(t,e.L(e.P,{get when(){return l()===`view`},get children(){var t=Yc();return e.S(t,e.L(uc,{label:`Data`,defaultExpanded:[`Data`],get value(){return _()},editable:!0,onEdit:()=>u(`edit`),get activeQuery(){return m()}})),e.H(n=>e.E(t,`padding`,X.size[2])),t}}),ue),e.S(t,e.L(e.P,{get when(){return l()===`edit`},get children(){var t=Xc(),o=t.firstChild,s=o.nextSibling,c=s.firstChild,l=c.nextSibling,p=l.firstChild,h=p.nextSibling;return t.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget).get(`data`);try{let e=JSON.parse(t);m().setState({...m().state,data:e}),u(`view`)}catch{f(!0)}}),o.addEventListener(`focus`,()=>f(!1)),e.S(c,()=>d()?`Invalid Value`:``),p.$$click=()=>u(`view`),e.H(u=>{var f=L(r().devtoolsEditForm,`tsqd-query-details-data-editor`),m=r().devtoolsEditTextarea,g=d(),_=r().devtoolsEditFormActions,v=r().devtoolsEditFormError,y=r().devtoolsEditFormActionContainer,b=L(r().devtoolsEditFormAction,n`
                      color: ${a(i.gray[600],i.gray[300])};
                    `),x=L(r().devtoolsEditFormAction,n`
                      color: ${a(i.blue[600],i.blue[400])};
                    `);return f!==u.e&&e.y(t,u.e=f),m!==u.t&&e.y(o,u.t=m),g!==u.a&&e.T(o,`data-error`,u.a=g),_!==u.o&&e.y(s,u.o=_),v!==u.i&&e.y(c,u.i=v),y!==u.n&&e.y(l,u.n=y),b!==u.s&&e.y(p,u.s=b),x!==u.h&&e.y(h,u.h=x),u},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),e.H(()=>o.value=JSON.stringify(_(),null,2)),t}}),ue),e.S(de,e.L(uc,{label:`Query`,defaultExpanded:[`Query`,`queryKey`],get value(){return h()}})),e.H(o=>{var c=L(r().detailsContainer,`tsqd-query-details-container`),l=L(r().detailsHeader,`tsqd-query-details-header`),u=L(r().detailsBody,`tsqd-query-details-summary-container`),d=L(r().queryDetailsStatus,T()),f=L(r().detailsHeader,`tsqd-query-details-header`),p=L(r().actionsBody,`tsqd-query-details-actions-container`),m=L(n`
                color: ${a(i.blue[600],i.blue[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-refetch`),h=v()===`fetching`,g=n`
                background-color: ${a(i.blue[600],i.blue[400])};
              `,_=L(n`
                color: ${a(i.yellow[600],i.yellow[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-invalidate`),b=y()===`pending`,S=n`
                background-color: ${a(i.yellow[600],i.yellow[400])};
              `,C=L(n`
                color: ${a(i.gray[600],i.gray[300])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-reset`),w=y()===`pending`,D=n`
                background-color: ${a(i.gray[600],i.gray[400])};
              `,O=L(n`
                color: ${a(i.pink[500],i.pink[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-remove`),k=v()===`fetching`,j=n`
                background-color: ${a(i.pink[500],i.pink[400])};
              `,M=L(n`
                color: ${a(i.cyan[500],i.cyan[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-loading`),N=s(),ce=n`
                background-color: ${a(i.cyan[500],i.cyan[400])};
              `,fe=L(r().detailsHeader,`tsqd-query-details-header`),pe=L(r().detailsHeader,`tsqd-query-details-header`),me=X.size[2];return c!==o.e&&e.y(t,o.e=c),l!==o.t&&e.y(x,o.t=l),u!==o.a&&e.y(E,o.a=u),d!==o.o&&e.y(A,o.o=d),f!==o.i&&e.y(P,o.i=f),p!==o.n&&e.y(F,o.n=p),m!==o.s&&e.y(ee,o.s=m),h!==o.h&&(ee.disabled=o.h=h),g!==o.r&&e.y(te,o.r=g),_!==o.d&&e.y(I,o.d=_),b!==o.l&&(I.disabled=o.l=b),S!==o.u&&e.y(ne,o.u=S),C!==o.c&&e.y(re,o.c=C),w!==o.w&&(re.disabled=o.w=w),D!==o.m&&e.y(ie,o.m=D),O!==o.f&&e.y(R,o.f=O),k!==o.y&&(R.disabled=o.y=k),j!==o.g&&e.y(ae,o.g=j),M!==o.p&&e.y(oe,o.p=M),N!==o.b&&(oe.disabled=o.b=N),ce!==o.T&&e.y(se,o.T=ce),fe!==o.A&&e.y(le,o.A=fe),pe!==o.O&&e.y(ue,o.O=pe),me!==o.I&&e.E(de,`padding`,o.I=me),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),t}})},yl=()=>{let t=Q(),n=Z().shadowDOMTarget?I.bind({target:Z().shadowDOMTarget}):I,r=e.V(()=>t()===`dark`?Ol(n):Dl(n)),{colors:i}=X,a=(e,n)=>t()===`dark`?n:e,o=wl(e=>{let t=e().getAll().find(e=>e.mutationId===nl());return t?t.state.isPaused:!1}),s=wl(e=>{let t=e().getAll().find(e=>e.mutationId===nl());return t?t.state.status:`idle`}),c=e.V(()=>e.i({isPaused:o(),status:s()})),l=wl(e=>e().getAll().find(e=>e.mutationId===nl()),!1),u=()=>c()===`gray`?n`
        background-color: ${a(i[c()][200],i[c()][700])};
        color: ${a(i[c()][700],i[c()][300])};
        border-color: ${a(i[c()][400],i[c()][600])};
      `:n`
      background-color: ${a(i[c()][100],i[c()][900])};
      color: ${a(i[c()][700],i[c()][300])};
      border-color: ${a(i[c()][400],i[c()][600])};
    `;return e.L(e.P,{get when(){return l()},get children(){var t=$c(),n=t.firstChild,i=n.nextSibling,a=i.firstChild,o=a.firstChild,d=o.firstChild,f=o.nextSibling,p=a.nextSibling.firstChild.nextSibling,m=i.nextSibling,h=m.nextSibling,g=h.nextSibling,_=g.nextSibling,v=_.nextSibling,y=v.nextSibling,b=y.nextSibling,x=b.nextSibling;return e.S(d,e.L(e.P,{get when(){return l().options.mutationKey},fallback:`No mutationKey found`,get children(){return e.r(l().options.mutationKey,!0)}})),e.S(f,e.L(e.P,{get when(){return c()===`purple`},children:`pending`}),null),e.S(f,e.L(e.P,{get when(){return c()!==`purple`},get children(){return s()}}),null),e.S(p,()=>new Date(l().state.submittedAt).toLocaleTimeString()),e.S(h,e.L(uc,{label:`Variables`,defaultExpanded:[`Variables`],get value(){return l().state.variables}})),e.S(_,e.L(uc,{label:`Context`,defaultExpanded:[`Context`],get value(){return l().state.context}})),e.S(y,e.L(uc,{label:`Data`,defaultExpanded:[`Data`],get value(){return l().state.data}})),e.S(x,e.L(uc,{label:`Mutation`,defaultExpanded:[`Mutation`],get value(){return l()}})),e.H(a=>{var o=L(r().detailsContainer,`tsqd-query-details-container`),s=L(r().detailsHeader,`tsqd-query-details-header`),c=L(r().detailsBody,`tsqd-query-details-summary-container`),l=L(r().queryDetailsStatus,u()),d=L(r().detailsHeader,`tsqd-query-details-header`),p=X.size[2],S=L(r().detailsHeader,`tsqd-query-details-header`),C=X.size[2],w=L(r().detailsHeader,`tsqd-query-details-header`),T=X.size[2],E=L(r().detailsHeader,`tsqd-query-details-header`),D=X.size[2];return o!==a.e&&e.y(t,a.e=o),s!==a.t&&e.y(n,a.t=s),c!==a.a&&e.y(i,a.a=c),l!==a.o&&e.y(f,a.o=l),d!==a.i&&e.y(m,a.i=d),p!==a.n&&e.E(h,`padding`,a.n=p),S!==a.s&&e.y(g,a.s=S),C!==a.h&&e.E(_,`padding`,a.h=C),w!==a.r&&e.y(v,a.r=w),T!==a.d&&e.E(y,`padding`,a.d=T),E!==a.l&&e.y(b,a.l=E),D!==a.u&&e.E(x,`padding`,a.u=D),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),t}})},bl=new Map,xl=()=>{let t=e.V(()=>Z().client.getQueryCache()),n=t().subscribe(n=>{e.I(()=>{for(let[e,r]of bl.entries())r.shouldUpdate(n)&&r.setter(e(t))})});return e.X(()=>{bl.clear(),n()}),n},$=(t,n=!0,r=()=>!0)=>{let i=e.V(()=>Z().client.getQueryCache()),[a,o]=e.W(t(i),n?void 0:{equals:!1});return e.B(()=>{o(t(i))}),bl.set(t,{setter:o,shouldUpdate:r}),e.X(()=>{bl.delete(t)}),a},Sl=new Map,Cl=()=>{let t=e.V(()=>Z().client.getMutationCache()),n=t().subscribe(()=>{for(let[e,n]of Sl.entries())queueMicrotask(()=>{n(e(t))})});return e.X(()=>{Sl.clear(),n()}),n},wl=(t,n=!0)=>{let r=e.V(()=>Z().client.getMutationCache()),[i,a]=e.W(t(r),n?void 0:{equals:!1});return e.B(()=>{a(t(r))}),Sl.set(t,a),e.X(()=>{Sl.delete(t)}),i},Tl=({type:e,queryHash:t,metadata:n})=>{let r=new CustomEvent(`@tanstack/query-devtools-event`,{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},El=(e,t)=>{let{colors:n,font:r,size:i,alpha:a,shadow:o,border:s}=X,c=(t,n)=>e===`light`?t:n;return{devtoolsBtn:t`
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
    `}},Dl=e=>El(`light`,e),Ol=e=>El(`dark`,e);e.x([`click`,`mousedown`,`keydown`,`input`]),Object.defineProperty(exports,"a",{enumerable:!0,get:function(){return Hs}}),Object.defineProperty(exports,"c",{enumerable:!0,get:function(){return u}}),Object.defineProperty(exports,"i",{enumerable:!0,get:function(){return Ws}}),Object.defineProperty(exports,"n",{enumerable:!0,get:function(){return cl}}),Object.defineProperty(exports,"o",{enumerable:!0,get:function(){return zs}}),Object.defineProperty(exports,"r",{enumerable:!0,get:function(){return ul}}),Object.defineProperty(exports,"s",{enumerable:!0,get:function(){return`system`}}),Object.defineProperty(exports,"t",{enumerable:!0,get:function(){return fl}});