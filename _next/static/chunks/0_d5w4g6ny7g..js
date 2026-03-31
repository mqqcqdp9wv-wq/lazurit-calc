(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,r)=>{"use strict";function s({widthInt:e,heightInt:t,blurWidth:r,blurHeight:a,blurDataURL:n,objectFit:i}){let l=r?40*r:e,o=a?40*a:t,d=l&&o?`viewBox='0 0 ${l} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${n}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return s}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={VALID_LOADERS:function(){return n},imageConfigDefault:function(){return i}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let n=["default","imgix","cloudinary","akamai","custom"],i={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let s=e.r(43369),a=e.r(88143),n=e.r(87690),i=["-moz-initial","fill","none","scale-down",void 0];function l(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:r=!1,priority:c=!1,preload:m=!1,loading:u,className:x,quality:p,width:f,height:h,fill:g=!1,style:b,overrideSrc:y,onLoad:j,onLoadingComplete:v,placeholder:L="empty",blurDataURL:w,fetchPriority:N,decoding:k="async",layout:C,objectFit:S,objectPosition:_,lazyBoundary:O,lazyRoot:I,...E},z){var M;let P,$,R,{imgConf:D,showAltText:T,blurComplete:q,defaultLoader:A}=z,B=D||n.imageConfigDefault;if("allSizes"in B)P=B;else{let e=[...B.deviceSizes,...B.imageSizes].sort((e,t)=>e-t),t=B.deviceSizes.sort((e,t)=>e-t),r=B.qualities?.sort((e,t)=>e-t);P={...B,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===A)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let W=E.loader||A;delete E.loader,delete E.srcSet;let U="__next_img_default"in W;if(U){if("custom"===P.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=W;W=t=>{let{config:r,...s}=t;return e(s)}}if(C){"fill"===C&&(g=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(b={...b,...e});let r={responsive:"100vw",fill:"100vw"}[C];r&&!t&&(t=r)}let Z="",F=o(f),G=o(h);if((M=e)&&"object"==typeof M&&(l(M)||void 0!==M.src)){let t=l(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if($=t.blurWidth,R=t.blurHeight,w=w||t.blurDataURL,Z=t.src,!g)if(F||G){if(F&&!G){let e=F/t.width;G=Math.round(t.height*e)}else if(!F&&G){let e=G/t.height;F=Math.round(t.width*e)}}else F=t.width,G=t.height}let V=!c&&!m&&("lazy"===u||void 0===u);(!(e="string"==typeof e?e:Z)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,V=!1),P.unoptimized&&(r=!0),U&&!P.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let X=o(p),H=Object.assign(g?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:S,objectPosition:_}:{},T?{}:{color:"transparent"},b),J=q||"empty"===L?null:"blur"===L?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:F,heightInt:G,blurWidth:$,blurHeight:R,blurDataURL:w||"",objectFit:H.objectFit})}")`:`url("${L}")`,K=i.includes(H.objectFit)?"fill"===H.objectFit?"100% 100%":"cover":H.objectFit,Q=J?{backgroundSize:K,backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:J}:{},Y=function({config:e,src:t,unoptimized:r,width:a,quality:n,sizes:i,loader:l}){if(r){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,s.getDeploymentId)();if(e){let r=t.indexOf("?");if(-1!==r){let s=new URLSearchParams(t.slice(r+1));s.get("dpl")||(s.append("dpl",e),t=t.slice(0,r)+"?"+s.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},r,s){if(s){let r=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=r.exec(s);)a.push(parseInt(e[2]));if(a.length){let r=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,a,i),c=o.length-1;return{sizes:i||"w"!==d?i:"100vw",srcSet:o.map((r,s)=>`${l({config:e,src:t,quality:n,width:r})} ${"w"===d?r:s+1}${d}`).join(", "),src:l({config:e,src:t,quality:n,width:o[c]})}}({config:P,src:e,unoptimized:r,width:F,quality:X,sizes:t,loader:W}),ee=V?"lazy":u;return{props:{...E,loading:ee,fetchPriority:N,width:F,height:G,decoding:k,className:x,style:{...H,...Q},sizes:Y.sizes,srcSet:Y.srcSet,src:y||Y.src},meta:{unoptimized:r,preload:m||c,placeholder:L,fill:g}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return l}});let s=e.r(71645),a="u"<typeof window,n=a?()=>{}:s.useLayoutEffect,i=a?()=>{}:s.useEffect;function l(e){let{headManager:t,reduceComponentsToState:r}=e;function l(){if(t&&t.mountedInstances){let e=s.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return a&&(t?.mountedInstances?.add(e.children),l()),n(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),n(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),i(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return f},defaultHead:function(){return m}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let n=e.r(55682),i=e.r(90809),l=e.r(43476),o=i._(e.r(71645)),d=n._(e.r(98879)),c=e.r(42732);function m(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let x=["name","httpEquiv","charSet","itemProp"];function p(e){let t,r,s,a;return e.reduce(u,[]).reverse().concat(m().reverse()).filter((t=new Set,r=new Set,s=new Set,a={},e=>{let n=!0,i=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){i=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?n=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?n=!1:r.add(e.type);break;case"meta":for(let t=0,r=x.length;t<r;t++){let r=x[t];if(e.props.hasOwnProperty(r))if("charSet"===r)s.has(r)?n=!1:s.add(r);else{let t=e.props[r],s=a[r]||new Set;("name"!==r||!i)&&s.has(t)?n=!1:(s.add(t),a[r]=s)}}}return n})).reverse().map((e,t)=>{let r=e.key||t;return o.default.cloneElement(e,{key:r})})}let f=function({children:e}){let t=(0,o.useContext)(c.HeadManagerContext);return(0,l.jsx)(d.default,{reduceComponentsToState:p,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return n}});let s=e.r(55682)._(e.r(71645)),a=e.r(87690),n=s.default.createContext(a.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return s}});let s=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function s(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,t.qualities[0]):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return s}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return i}});let s=e.r(70965),a=e.r(43369);function n({config:e,src:t,width:r,quality:i}){let l=(0,a.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let r=new URLSearchParams(t.slice(e+1)),s=r.get("dpl");if(s){l=s,r.delete("dpl");let a=r.toString();t=t.slice(0,e)+(a?"?"+a:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let o=(0,s.findClosestQuality)(i,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${o}${t.startsWith("/")&&l?`&dpl=${l}`:""}`}n.__next_img_default=!0;let i=n},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let s=e.r(71645);function a(e,t){let r=(0,s.useRef)(null),a=(0,s.useRef)(null);return(0,s.useCallback)(s=>{if(null===s){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=n(e,s)),t&&(a.current=n(t,s))},[e,t])}function n(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return j}});let s=e.r(55682),a=e.r(90809),n=e.r(43476),i=a._(e.r(71645)),l=s._(e.r(74080)),o=s._(e.r(25633)),d=e.r(8927),c=e.r(87690),m=e.r(18556);e.r(33525);let u=e.r(65856),x=s._(e.r(1948)),p=e.r(18581),f={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,r,s,a,n,i){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let s=!1,a=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>s,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{s=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}s?.current&&s.current(e)}}))}function g(e){return i.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,i.forwardRef)(({src:e,srcSet:t,sizes:r,height:s,width:a,decoding:l,className:o,style:d,fetchPriority:c,placeholder:m,loading:u,unoptimized:x,fill:f,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:j,setShowAltText:v,sizesInput:L,onLoad:w,onError:N,...k},C)=>{let S=(0,i.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&h(e,m,b,y,j,x,L))},[e,m,b,y,j,N,x,L]),_=(0,p.useMergedRef)(C,S);return(0,n.jsx)("img",{...k,...g(c),loading:u,width:a,height:s,decoding:l,"data-nimg":f?"fill":"1",className:o,style:d,sizes:r,srcSet:t,src:e,ref:_,onLoad:e=>{h(e.currentTarget,m,b,y,j,x,L)},onError:e=>{v(!0),"empty"!==m&&j(!0),N&&N(e)}})});function y({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,r),null):(0,n.jsx)(o.default,{children:(0,n.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let j=(0,i.forwardRef)((e,t)=>{let r=(0,i.useContext)(u.RouterContext),s=(0,i.useContext)(m.ImageConfigContext),a=(0,i.useMemo)(()=>{let e=f||s||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),a=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:a,localPatterns:"u"<typeof window?s?.localPatterns:e.localPatterns}},[s]),{onLoad:l,onLoadingComplete:o}=e,p=(0,i.useRef)(l);(0,i.useEffect)(()=>{p.current=l},[l]);let h=(0,i.useRef)(o);(0,i.useEffect)(()=>{h.current=o},[o]);let[g,j]=(0,i.useState)(!1),[v,L]=(0,i.useState)(!1),{props:w,meta:N}=(0,d.getImgProps)(e,{defaultLoader:x.default,imgConf:a,blurComplete:g,showAltText:v});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(b,{...w,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:p,onLoadingCompleteRef:h,setBlurComplete:j,setShowAltText:L,sizesInput:e.sizes,ref:t}),N.preload?(0,n.jsx)(y,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return c},getImageProps:function(){return d}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let n=e.r(55682),i=e.r(8927),l=e.r(5500),o=n._(e.r(1948));function d(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let c=l.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},52683,e=>{"use strict";var t=e.i(47167),r=e.i(43476),s=e.i(71645);let a={head:{key:"head",title:"Лицо",items:[{id:1,title:"Верхняя губа",price:1265},{id:2,title:"Подбородок",price:1265},{id:3,title:"Бакенбарды",price:1265},{id:26,title:"Межбровное пространство",price:1265},{id:4,title:"Лицо полностью",price:3200,hint:"Выгодно от 3 зон"}]},body:{key:"body",title:"Тело",items:[{id:5,title:"Подмышки",price:1495,group:"Торс"},{id:6,title:"Ареолы",price:1265,group:"Торс"},{id:7,title:"Межгрудное пространство",price:1495,group:"Торс",genderOnly:"male"},{id:8,title:"Грудная клетка полностью",price:2250,group:"Торс",genderOnly:"male"},{id:9,title:"Линия живота",price:1265,group:"Торс"},{id:10,title:"Живот полностью",price:2250,group:"Торс"},{id:11,title:"Поясница",price:2550,group:"Спина"},{id:12,title:"Лопатки",price:2550,group:"Спина"},{id:13,title:"Спина полностью",price:3800,group:"Спина"},{id:14,title:"Классическое бикини",price:2550,group:"Интимные зоны",hint:"По линии белья"},{id:15,title:"Тотальное бикини",price:4350,group:"Интимные зоны",hint:"Включая межъягодичную зону"},{id:16,title:"Межъягодичная зона",price:1495,group:"Интимные зоны"},{id:17,title:"Ягодицы",price:3795,group:"Интимные зоны"}]},hands:{key:"hands",title:"Руки",items:[{id:18,title:"Пальцы рук",price:1265},{id:19,title:"Предплечье",price:3250},{id:20,title:"Плечо",price:3200},{id:21,title:"Руки полностью",price:4300,hint:"Предплечье + плечо"}]},legs:{key:"legs",title:"Ноги",items:[{id:22,title:"Голени",price:3795},{id:23,title:"Бёдра",price:4025},{id:24,title:"Ноги полностью",price:6325,hint:"Голени + бёдра"},{id:25,title:"Пальцы ног",price:1265}]}},n=[{id:"goleni-podmyshki",title:"Голени + подмышки",requiredItemIds:[22,5],price:4700,price5:11750},{id:"totalnoe-podmyshki",title:"Тотальное бикини + подмышки",requiredItemIds:[15,5],price:5390,price5:13475},{id:"goleni-bikini-podmyshki",title:"Голени + глубокое бикини + подмышки",requiredItemIds:[22,15,5],price:8850,price5:22125},{id:"ruki-podmyshki",title:"Руки полностью + подмышки",requiredItemIds:[21,5],price:13475,price5:13475},{id:"totalnoe-nogi",title:"Тотальное бикини + ноги полностью",requiredItemIds:[15,24],price:9990,price5:24975},{id:"nogi-bikini-podmyshki",title:"Ноги + тотальное бикини + подмышки",requiredItemIds:[24,15,5],price:11490,price5:28725},{id:"vse-telo",title:"Всё тело",requiredItemIds:[21,5,9,15,24],price:14950,price5:37375}],i=new Set(n.flatMap(e=>e.requiredItemIds)),l={4:[1,2,3,26],10:[9],13:[11,12],15:[14,16],21:[19,20],24:[22,23]},o={};for(let[e,t]of Object.entries(l))for(let r of t)o[r]||(o[r]=[]),o[r].push(Number(e));let d={"hands-r":"hands","legs-r":"legs"};function c(e){return Math.round(e).toLocaleString("ru-RU")+" ₽"}var m=e.i(57688);let u=[{zone:"head",paths:[`M 690,120
       C 640,120 590,170 570,250
       C 555,330 560,390 580,430
       C 600,470 640,510 700,530
       L 768,545
       L 836,530
       C 896,510 936,470 956,430
       C 976,390 981,330 966,250
       C 946,170 896,120 846,120
       Z`]},{zone:"body",paths:[`M 690,545
       L 660,580
       L 630,640
       L 610,720
       L 595,810
       L 585,900
       L 580,1000
       L 585,1080
       L 595,1160
       L 610,1240
       L 625,1300
       L 640,1350
       C 680,1400 720,1420 768,1420
       C 816,1420 856,1400 896,1350
       L 911,1300
       L 926,1240
       L 941,1160
       L 951,1080
       L 956,1000
       L 951,900
       L 941,810
       L 926,720
       L 906,640
       L 876,580
       L 846,545
       Z`]},{zone:"hands",paths:[`M 600,580
       L 565,650
       L 530,740
       L 500,840
       L 475,940
       L 455,1040
       L 440,1130
       L 425,1220
       L 415,1290
       L 410,1350
       L 425,1380
       L 455,1365
       L 465,1300
       L 475,1220
       L 490,1130
       L 505,1040
       L 525,940
       L 545,850
       L 570,760
       L 590,680
       L 605,630
       Z`,`M 936,580
       L 971,650
       L 1006,740
       L 1036,840
       L 1061,940
       L 1081,1040
       L 1096,1130
       L 1111,1220
       L 1121,1290
       L 1126,1350
       L 1111,1380
       L 1081,1365
       L 1071,1300
       L 1061,1220
       L 1046,1130
       L 1031,1040
       L 1011,940
       L 991,850
       L 966,760
       L 946,680
       L 931,630
       Z`]},{zone:"legs",paths:[`M 650,1400
       L 640,1480
       L 632,1570
       L 625,1660
       L 620,1760
       L 618,1860
       L 620,1960
       L 624,2060
       L 627,2160
       L 627,2260
       L 622,2360
       L 618,2440
       L 613,2510
       L 612,2580
       L 618,2620
       L 632,2645
       L 655,2660
       L 672,2640
       L 672,2590
       L 667,2510
       L 662,2430
       L 662,2340
       L 667,2240
       L 674,2140
       L 683,2040
       L 692,1940
       L 698,1840
       L 703,1740
       L 710,1640
       L 718,1540
       L 728,1460
       L 742,1400
       L 768,1420
       Z`,`M 886,1400
       L 896,1480
       L 904,1570
       L 911,1660
       L 916,1760
       L 918,1860
       L 916,1960
       L 912,2060
       L 909,2160
       L 909,2260
       L 914,2360
       L 918,2440
       L 923,2510
       L 924,2580
       L 918,2620
       L 904,2645
       L 881,2660
       L 864,2640
       L 864,2590
       L 869,2510
       L 874,2430
       L 874,2340
       L 869,2240
       L 862,2140
       L 853,2040
       L 844,1940
       L 838,1840
       L 833,1740
       L 826,1640
       L 818,1540
       L 808,1460
       L 794,1400
       L 768,1420
       Z`]}],x=[{zone:"head",paths:[`M 690,100
       C 630,100 570,150 555,240
       C 540,320 545,380 570,420
       C 595,460 640,500 700,520
       L 768,535
       L 836,520
       C 896,500 941,460 966,420
       C 991,380 996,320 981,240
       C 966,150 906,100 846,100
       Z`]},{zone:"body",paths:[`M 650,535
       L 600,580
       L 565,650
       L 540,740
       L 525,840
       L 520,940
       L 520,1040
       L 525,1140
       L 540,1220
       L 560,1300
       L 580,1360
       C 620,1410 690,1440 768,1440
       C 846,1440 916,1410 956,1360
       L 976,1300
       L 996,1220
       L 1011,1140
       L 1016,1040
       L 1016,940
       L 1011,840
       L 996,740
       L 971,650
       L 936,580
       L 886,535
       Z`]},{zone:"hands",paths:[`M 545,590
       L 510,660
       L 475,750
       L 445,850
       L 420,960
       L 400,1060
       L 385,1160
       L 370,1250
       L 360,1320
       L 355,1380
       L 370,1410
       L 400,1395
       L 415,1330
       L 425,1260
       L 440,1160
       L 455,1060
       L 475,960
       L 495,860
       L 520,770
       L 540,690
       L 555,640
       Z`,`M 991,590
       L 1026,660
       L 1061,750
       L 1091,850
       L 1116,960
       L 1136,1060
       L 1151,1160
       L 1166,1250
       L 1176,1320
       L 1181,1380
       L 1166,1410
       L 1136,1395
       L 1121,1330
       L 1111,1260
       L 1096,1160
       L 1081,1060
       L 1061,960
       L 1041,860
       L 1016,770
       L 996,690
       L 981,640
       Z`]},{zone:"legs",paths:[`M 640,1420
       L 630,1500
       L 622,1590
       L 616,1690
       L 612,1790
       L 612,1890
       L 616,1990
       L 620,2090
       L 624,2190
       L 624,2290
       L 620,2390
       L 616,2470
       L 612,2540
       L 614,2600
       L 624,2640
       L 645,2655
       L 665,2655
       L 678,2635
       L 678,2590
       L 672,2520
       L 668,2440
       L 668,2360
       L 672,2260
       L 680,2160
       L 688,2060
       L 696,1960
       L 702,1860
       L 708,1760
       L 714,1660
       L 720,1560
       L 728,1480
       L 742,1430
       L 768,1440
       Z`,`M 896,1420
       L 906,1500
       L 914,1590
       L 920,1690
       L 924,1790
       L 924,1890
       L 920,1990
       L 916,2090
       L 912,2190
       L 912,2290
       L 916,2390
       L 920,2470
       L 924,2540
       L 922,2600
       L 912,2640
       L 891,2655
       L 871,2655
       L 858,2635
       L 858,2590
       L 864,2520
       L 868,2440
       L 868,2360
       L 864,2260
       L 856,2160
       L 848,2060
       L 840,1960
       L 834,1860
       L 828,1760
       L 822,1660
       L 816,1560
       L 808,1480
       L 794,1430
       L 768,1440
       Z`]}],p=t.default.env.NEXT_PUBLIC_BASE_PATH||"",f=[{zone:"head",label:"Лицо",dotTop:"10.3%",dotLeft:"53.5%",labelTop:"10.3%"},{zone:"body",label:"Тело",dotTop:"33.1%",dotLeft:"51.2%",labelTop:"33.1%"},{zone:"hands",label:"Руки",dotTop:"46.9%",dotLeft:"71.6%",labelTop:"46.9%"},{zone:"legs",label:"Ноги",dotTop:"66.5%",dotLeft:"57.9%",labelTop:"66.5%"}];function h({gender:e,activeZone:t,selectedCounts:s,onZoneClick:a,onGenderChange:n}){return(0,r.jsxs)("div",{className:"card overflow-hidden",children:[(0,r.jsx)("div",{className:"relative pt-4 pb-2",children:(0,r.jsxs)("div",{className:"relative grid grid-cols-[1fr_70px] items-start",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(m.default,{src:"male"===e?`${p}/male.png`:`${p}/female.png`,alt:"Зоны тела",width:446,height:800,className:"w-full h-auto select-none",draggable:!1,priority:!0}),(0,r.jsxs)("svg",{viewBox:"0 0 1536 2752",preserveAspectRatio:"xMidYMid meet",className:"absolute inset-0 w-full h-full z-10",children:[("female"===e?u:x).map(e=>e.paths.map((s,n)=>(0,r.jsx)("path",{d:s,fill:t===e.zone?"rgba(8,145,178,0.05)":"transparent",stroke:"none",className:"cursor-pointer transition-all duration-200",style:{pointerEvents:"all"},onMouseEnter:r=>{t!==e.zone&&r.currentTarget.setAttribute("fill","rgba(8,145,178,0.04)")},onMouseLeave:r=>{t!==e.zone&&r.currentTarget.setAttribute("fill","transparent")},onClick:()=>a(e.zone)},`zone-${e.zone}-${n}`))),f.map(e=>{let s=t===e.zone,n=parseFloat(e.dotLeft)/100*1536,i=parseFloat(e.dotTop)/100*2752;return(0,r.jsxs)("g",{children:[(0,r.jsx)("line",{x1:n,y1:i,x2:1536,y2:i,stroke:s?"#0891B2":"#CBD5E1",strokeWidth:s?3:2,strokeDasharray:s?"none":"8 6",className:"transition-all duration-300 pointer-events-none"}),(0,r.jsx)("circle",{cx:n,cy:i,r:s?12:10,fill:s?"#0891B2":"#06B6D4",opacity:s?1:.6,className:"transition-all duration-300 cursor-pointer",onClick:()=>a(e.zone)})]},e.zone)})]})]}),(0,r.jsx)("div",{className:"relative h-full",children:f.map(e=>{let n=t===e.zone,i=s[e.zone]??0,l=i>0;return(0,r.jsxs)("button",{onClick:()=>a(e.zone),className:`
                    absolute left-0 flex items-center gap-1
                    px-2.5 py-1.5 rounded-lg
                    text-[12px] font-semibold whitespace-nowrap
                    transition-all duration-300 cursor-pointer
                    ${n?"bg-cyan-600 text-white shadow-md shadow-cyan-600/20":l?"bg-cyan-50 text-cyan-700 hover:bg-cyan-100":"bg-gray-50 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"}
                  `,style:{top:e.labelTop,transform:"translateY(-50%)"},children:[e.label,i>0&&(0,r.jsx)("span",{className:`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${n?"bg-white text-cyan-600":"bg-cyan-600 text-white"}`,children:i},i)]},e.zone)})})]})}),(0,r.jsxs)("div",{className:"flex items-center justify-center gap-2 py-3 border-t border-gray-100",children:[(0,r.jsx)("span",{onClick:()=>n("female"),className:`text-xs font-medium cursor-pointer transition-colors whitespace-nowrap font-[family-name:var(--font-display)] ${"female"===e?"text-cyan-600 font-bold":"text-gray-500"}`,children:"Женский"}),(0,r.jsx)("div",{onClick:()=>n("female"===e?"male":"female"),className:"w-11 h-6 bg-cyan-600 rounded-full relative cursor-pointer flex-shrink-0",children:(0,r.jsx)("div",{className:`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${"male"===e?"left-[22px]":"left-0.5"}`})}),(0,r.jsx)("span",{onClick:()=>n("male"),className:`text-xs font-medium cursor-pointer transition-colors whitespace-nowrap font-[family-name:var(--font-display)] ${"male"===e?"text-cyan-600 font-bold":"text-gray-500"}`,children:"Мужской"})]})]})}function g({zone:e,selectedIds:t,priceMultiplier:s,gender:a,onToggle:n}){return(0,r.jsxs)("div",{className:"card overflow-hidden animate-in",children:[(0,r.jsxs)("div",{className:"px-5 pt-4 pb-3 border-b border-gray-100",children:[(0,r.jsx)("h3",{className:"text-base font-bold text-gray-800 font-[family-name:var(--font-display)]",children:e.title}),(0,r.jsx)("p",{className:"text-xs text-gray-400 mt-0.5",children:"Цена за 1 сеанс"})]}),(0,r.jsx)("ul",{className:"py-2 max-h-[380px] overflow-y-auto scrollbar-thin",children:e.items.filter(e=>!e.genderOnly||e.genderOnly===a).map((a,l,o)=>{let d=t.has(a.id),m=Math.round(a.price*s),u=a.group&&(0===l||o[l-1].group!==a.group);return(0,r.jsxs)("li",{className:"animate-fade-up",style:{animationDelay:`${40*l}ms`},children:[u&&(0,r.jsx)("div",{className:"px-5 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider",children:a.group}),(0,r.jsxs)("div",{onClick:()=>n(e.key,a.id),className:`
                  flex items-center gap-2 px-4 py-3 cursor-pointer
                  transition-colors duration-300
                  ${d?"bg-cyan-50":"hover:bg-cyan-50/50"}
                `,children:[(0,r.jsx)("div",{className:`
                  w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center flex-shrink-0
                  transition-all duration-300
                  ${d?"bg-cyan-600 border-cyan-600":"border-gray-200"}
                `,children:(0,r.jsx)("svg",{width:"12",height:"12",fill:"none",stroke:"white",strokeWidth:"2.5",className:`transition-opacity duration-200 ${d?"opacity-100 animate-check":"opacity-0 scale-0"}`,children:(0,r.jsx)("polyline",{points:"2,6 5,9 10,3"})})}),(0,r.jsxs)("span",{className:"flex-1 min-w-0",children:[(0,r.jsxs)("span",{className:"text-sm font-medium text-gray-800 block",children:[a.title,i.has(a.id)&&(0,r.jsxs)("span",{className:"relative group/tip inline-block ml-1 align-top cursor-help",children:[(0,r.jsx)("span",{className:"text-amber-400 text-[10px]",children:"✦"}),(0,r.jsx)("span",{className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-gray-800 text-white text-[10px] whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-30",children:"Выгоднее в комплексе"})]})]}),a.hint&&(0,r.jsx)("span",{className:"text-[10px] text-gray-400 block leading-tight",children:a.hint})]}),(0,r.jsx)("span",{className:"text-xs sm:text-sm font-semibold text-cyan-600 whitespace-nowrap",children:c(m)})]})]},a.id)})})]})}function b({selected:e,sessions:t,priceMultiplier:s,onRemoveItem:i,onClear:l,onSessionChange:o,onSubmit:d,onPayOnline:m}){let u=Object.entries(e).filter(([,e])=>e.size>0);if(0===u.length)return null;let x=new Set;u.forEach(([,e])=>e.forEach(e=>x.add(e)));let p=new Set,f=[];for(let e of[...n].map(e=>{let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(a)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);return{...e,saving:t-e.price}}).sort((e,t)=>t.saving-e.saving)){let t=e.requiredItemIds.every(e=>x.has(e)),r=e.requiredItemIds.every(e=>!p.has(e));if(t&&r){e.requiredItemIds.forEach(e=>p.add(e));let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(a)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);f.push({title:e.title,price:e.price,separatePrice:t,itemIds:e.requiredItemIds})}}let h=0;f.forEach(e=>{h+=Math.round(e.price*s)}),u.forEach(([e,t])=>{a[e].items.filter(e=>t.has(e.id)&&!p.has(e.id)).forEach(e=>{h+=Math.round(e.price*s)})});let g=h*t,y=t>=5,j=y?Math.round(50*g/100):0,v=g-j;return(0,r.jsxs)("div",{className:"card overflow-hidden animate-in",children:[(0,r.jsxs)("div",{className:"px-5 pt-4 pb-3 border-b border-gray-100 flex justify-between items-center",children:[(0,r.jsx)("h3",{className:"text-base font-bold text-gray-800",children:"Ваш выбор"}),(0,r.jsx)("button",{onClick:l,className:"text-xs text-red-500 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors",children:"Сбросить"})]}),f.length>0&&(0,r.jsxs)("div",{className:"px-5 py-3 border-b border-gray-100",children:[(0,r.jsx)("div",{className:"text-[0.72rem] font-bold uppercase tracking-wider text-emerald-500 mb-2",children:"Комплексы"}),f.map((e,t)=>{let n=Math.round(e.price*s),i=Math.round(e.separatePrice*s);return(0,r.jsxs)("div",{className:"py-1.5",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsx)("span",{className:"text-sm font-medium text-gray-800",children:e.title}),(0,r.jsxs)("span",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{className:"text-xs text-gray-400 line-through",children:c(i)}),(0,r.jsx)("span",{className:"text-sm font-semibold text-emerald-600",children:c(n)})]})]}),(0,r.jsx)("div",{className:"text-[11px] text-gray-400 mt-0.5",children:e.itemIds.map(e=>{for(let t of Object.values(a)){let r=t.items.find(t=>t.id===e);if(r)return r.title}return""}).join(" + ")})]},t)})]}),u.map(([e,t])=>{let n=a[e].items.filter(e=>t.has(e.id)&&!p.has(e.id));return 0===n.length?null:(0,r.jsxs)("div",{className:"px-5 py-3 border-b border-gray-100 last:border-b-0",children:[(0,r.jsx)("div",{className:"text-[0.72rem] font-bold uppercase tracking-wider text-gray-400 mb-2",children:a[e].title}),n.map(t=>(0,r.jsxs)("div",{className:"flex justify-between items-center py-1.5",children:[(0,r.jsx)("span",{className:"text-sm font-medium text-gray-800",children:t.title}),(0,r.jsxs)("span",{className:"flex items-center gap-2.5",children:[(0,r.jsx)("span",{className:"text-sm font-semibold text-gray-800",children:c(Math.round(t.price*s))}),(0,r.jsx)("button",{onClick:()=>i(e,t.id),className:"w-[22px] h-[22px] flex items-center justify-center text-gray-400 rounded hover:text-red-500 hover:bg-red-50 transition-colors",children:(0,r.jsxs)("svg",{width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,r.jsx)("line",{x1:"3",y1:"3",x2:"11",y2:"11"}),(0,r.jsx)("line",{x1:"11",y1:"3",x2:"3",y2:"11"})]})})]})]},t.id))]},e)}),(0,r.jsxs)("div",{className:"px-5 py-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center pt-2 pb-3 border-t border-gray-100",children:[(0,r.jsx)("span",{className:"text-base font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"Итого"}),(0,r.jsx)("span",{className:`text-2xl font-bold animate-price-pop font-[family-name:var(--font-display)] ${y?"text-emerald-600":"text-cyan-600"}`,children:y?c(v):c(g)},v)]}),t>1&&(0,r.jsxs)("div",{className:"flex justify-between items-center text-xs text-gray-400 -mt-2 mb-2",children:[(0,r.jsxs)("span",{children:[c(h)," × ",t," сеансов"]}),y&&(0,r.jsx)("span",{className:"line-through",children:c(g)})]}),(0,r.jsxs)("button",{onClick:()=>{m(y?v:g,[...f.map(e=>e.title),...u.flatMap(([e,t])=>a[e].items.filter(e=>t.has(e.id)&&!p.has(e.id)).map(e=>e.title))].join(", "),t)},className:"w-full mt-2 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 active:translate-y-0 transition-all",children:[(0,r.jsx)("span",{className:"text-lg font-bold tracking-wide block",children:"Оплатить онлайн"}),(0,r.jsx)("span",{className:"text-xs font-medium text-white/70 block mt-0.5",children:"+1 сеанс в подарок"})]}),(0,r.jsx)("button",{onClick:d,className:"w-full mt-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all",children:"Оставить заявку"})]}),(0,r.jsx)("div",{className:`
        animate-fade-up mx-4 mb-4 rounded-xl p-4 transition-all duration-500
        ${y?"bg-emerald-50/60 border border-emerald-200/50":"bg-gray-50/80 border border-gray-200/50"}
      `,children:y?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,r.jsx)("span",{className:"text-sm font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"Скидка 50% применена"}),(0,r.jsx)("button",{onClick:()=>o(1),className:"text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",children:"Отменить"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between mt-3",children:[(0,r.jsxs)("span",{className:"text-xs text-gray-500",children:[t," из 15 сеансов"]}),(0,r.jsxs)("div",{className:"flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white",children:[(0,r.jsx)("button",{onClick:()=>o(Math.max(1,t-1)),className:"w-9 h-9 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-50 transition-colors",children:"−"}),(0,r.jsx)("input",{type:"number",value:t,onChange:e=>{o(Math.max(1,Math.min(15,parseInt(e.target.value)||1)))},className:"w-10 text-center text-sm font-bold border-x border-gray-200 py-1 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"}),(0,r.jsx)("button",{onClick:()=>o(Math.min(15,t+1)),className:"w-9 h-9 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-50 transition-colors",children:"+"})]})]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,r.jsx)("span",{className:"text-sm text-gray-600",children:"Курсом дешевле"}),(0,r.jsx)("span",{className:"text-sm font-semibold text-cyan-600",children:c(Math.round(.5*g))})]}),(0,r.jsx)("p",{className:"text-[11px] text-gray-400 mb-3",children:"От 5 сеансов — скидка 50%"}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("div",{className:"flex gap-1",children:[1,2,3,4,5].map(e=>(0,r.jsx)("div",{className:`w-2 h-2 rounded-full transition-all duration-300 ${t>=e?"bg-cyan-500":"bg-gray-200"}`},e))}),(0,r.jsxs)("div",{className:"flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white",children:[(0,r.jsx)("button",{onClick:()=>o(Math.max(1,t-1)),className:"w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors",children:"−"}),(0,r.jsx)("input",{type:"number",value:t,onChange:e=>{o(Math.max(1,Math.min(15,parseInt(e.target.value)||1)))},className:"w-10 text-center text-sm font-bold border-x border-gray-200 py-1 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"}),(0,r.jsx)("button",{onClick:()=>o(Math.min(15,t+1)),className:"w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors",children:"+"})]})]})]})})]})}function y(e){for(let t of Object.values(a)){let r=t.items.find(t=>t.id===e);if(r)return r.title}return""}function j({selected:e,priceMultiplier:t,sessions:s,onAddItems:i}){let l,o=(l=new Set,Object.values(e).forEach(e=>e.forEach(e=>l.add(e))),l);if(0===o.size)return null;let d=function(e,t,r){let s=[];for(let i of n){let n=i.requiredItemIds,l=n.filter(t=>e.has(t)),o=n.filter(t=>!e.has(t));if(0===l.length)continue;let d=(n.reduce((e,r)=>e+Math.round(function(e){for(let t of Object.values(a)){let r=t.items.find(t=>t.id===e);if(r)return r.price}return 0}(r)*t),0)-Math.round(i.price*t))*r;d<=0||s.push({complex:i,progress:l.length/n.length,completed:l.length,total:n.length,missingIds:o,missingTitles:o.map(e=>y(e)),saving:d,isComplete:0===o.length})}s.sort((e,t)=>e.isComplete!==t.isComplete?e.isComplete?-1:1:t.saving-e.saving);let i=new Set,l=[];for(let e of s){if(e.isComplete){if(e.complex.requiredItemIds.some(e=>i.has(e)))continue;e.complex.requiredItemIds.forEach(e=>i.add(e))}l.push(e)}return l.filter(e=>!!e.isComplete||e.complex.requiredItemIds.some(e=>!i.has(e))).slice(0,4)}(o,t,s);return 0===d.length?null:(0,r.jsxs)("div",{className:"space-y-3",children:[(0,r.jsx)("h3",{className:"text-sm font-bold text-gray-400 uppercase tracking-wider font-[family-name:var(--font-display)]",children:"Комплексы"}),d.map((e,t)=>{let n=Math.round(100*e.progress);return(0,r.jsxs)("div",{className:`
              animate-fade-up rounded-xl border-2 p-4 transition-all duration-500
              ${e.isComplete?"border-emerald-400 bg-emerald-50":"border-gray-200 bg-white"}
            `,style:{animationDelay:`${80*t}ms`},children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,r.jsx)("span",{className:`text-sm font-bold ${e.isComplete?"text-emerald-700":"text-gray-800"}`,children:e.complex.title}),e.isComplete&&(0,r.jsx)("span",{className:"text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full",children:"Собран!"})]}),(0,r.jsx)("div",{className:"relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2",children:(0,r.jsx)("div",{className:`
                  absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
                  ${e.isComplete?"bg-emerald-500":"bg-gray-300"}
                `,style:{width:`${n}%`}})}),(0,r.jsx)("div",{className:"space-y-1 mb-2",children:e.complex.requiredItemIds.map(e=>{let t=o.has(e);return(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)("div",{className:`
                      w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${t?"bg-emerald-500":"bg-gray-300"}
                    `,children:t&&(0,r.jsx)("svg",{width:"10",height:"10",fill:"none",stroke:"white",strokeWidth:"2.5",children:(0,r.jsx)("polyline",{points:"1.5,5 4,7.5 8.5,2.5"})})}),(0,r.jsx)("span",{className:`text-xs ${t?"text-gray-700":"text-gray-400"}`,children:y(e)})]},e)})}),"vse-telo"===e.complex.id&&(0,r.jsx)("p",{className:"text-[10px] text-gray-400 italic mb-1",children:"Линия живота или любая зона на выбор: губа, подбородок, межбровка, бакенбарды"}),(0,r.jsxs)("div",{className:`
              text-xs font-semibold
              ${e.isComplete?"text-emerald-600":"text-gray-400"}
            `,children:["Выгода: ",c(e.saving),s>1?` за ${s} сеансов`:""]}),!e.isComplete&&i&&(0,r.jsxs)("button",{onClick:()=>{i(e.missingIds.map(e=>({zone:function(e){for(let[t,r]of Object.entries(a))if(r.items.some(t=>t.id===e))return t;return""}(e),id:e})))},className:"w-full mt-2 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold transition-colors cursor-pointer",children:["Добавить: ",e.missingTitles.join(", ")]})]},e.complex.id)})]})}let v=[{code:"+7",flag:"🇷🇺",name:"Россия",maxDigits:10},{code:"+374",flag:"🇦🇲",name:"Армения",maxDigits:8},{code:"+39",flag:"🇮🇹",name:"Италия",maxDigits:10},{code:"+34",flag:"🇪🇸",name:"Испания",maxDigits:9},{code:"+1",flag:"🇺🇸",name:"США",maxDigits:10},{code:"+90",flag:"🇹🇷",name:"Турция",maxDigits:10},{code:"+971",flag:"🇦🇪",name:"ОАЭ",maxDigits:9},{code:"+49",flag:"🇩🇪",name:"Германия",maxDigits:11}];function L({isOpen:e,onClose:t,orderLines:a,totalPrice:n,sessions:i=1,gender:l="female"}){var o,d;let c,[m,u]=(0,s.useState)(""),[x,p]=(0,s.useState)(""),[f,h]=(0,s.useState)(""),[g,b]=(0,s.useState)(!1),[y,j]=(0,s.useState)(!1),[w,N]=(0,s.useState)(!1),[k,C]=(0,s.useState)(0),[S,_]=(0,s.useState)(!1),O=(0,s.useRef)(null),I=v[k];(0,s.useEffect)(()=>{function e(e){O.current&&!O.current.contains(e.target)&&_(!1)}return S&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[S]);let E=x.replace(/\D/g,""),z=m.trim().length>=2&&E.length>=7&&g&&!w;async function M(){if(!z)return;N(!0);let e={name:m.trim(),phone:`${I.code}${E}`,telegram:f.trim(),gender:l,sessions:i,services:a?.map(e=>e.title).join(", ")||"",total:n||"",date:new Date().toISOString()};try{await fetch("https://script.google.com/macros/s/AKfycbxRfSiaORge7dVQJ0GBhhVCPZ_Ezp_ZBqo1A8f0aqxHCwx5zOBC4q8Dn5r0XCASJsOx/exec",{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),j(!0)}catch{j(!0)}finally{N(!1)}}function P(){t(),setTimeout(()=>{u(""),p(""),h(""),b(!1),j(!1),N(!1)},300)}let $=(o=a||[],d=n||"",c=o.map(e=>`${e.title} — ${e.price}`).join("\n"),`Здравствуйте! Рассчитал(а) в калькуляторе (${"male"===l?"мужской":"женский"}):

${c}

Итого: ${d}
Сеансов: ${i}

Хочу записаться на консультацию`),R=`https://t.me/Lazurit_msk?text=${encodeURIComponent($)}`,D=`https://wa.me/79999990144?text=${encodeURIComponent($)}`;return(0,r.jsx)("div",{className:`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40
        transition-all duration-300
        ${e?"opacity-100 visible":"opacity-0 invisible"}
      `,onClick:e=>{e.target===e.currentTarget&&P()},children:(0,r.jsxs)("div",{className:`
          bg-white rounded-2xl shadow-elevated w-full max-w-[420px] relative
          transition-all duration-300 max-h-[90vh] overflow-y-auto
          ${e?"translate-y-0 scale-100":"translate-y-5 scale-[0.95]"}
        `,children:[(0,r.jsx)("button",{onClick:P,className:"absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10",children:(0,r.jsxs)("svg",{width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,r.jsx)("line",{x1:"4",y1:"4",x2:"12",y2:"12"}),(0,r.jsx)("line",{x1:"12",y1:"4",x2:"4",y2:"12"})]})}),y?(0,r.jsxs)("div",{className:"p-6 text-center py-8",children:[(0,r.jsxs)("svg",{width:"48",height:"48",fill:"none",className:"mx-auto mb-3",children:[(0,r.jsx)("circle",{cx:"24",cy:"24",r:"20",stroke:"#10B981",strokeWidth:"2",className:"animate-circle-draw"}),(0,r.jsx)("polyline",{points:"14,24 22,32 34,18",stroke:"#10B981",strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"animate-draw-check"})]}),(0,r.jsx)("h4",{className:"text-base font-bold text-gray-800 mb-1",children:"Заявка отправлена!"}),(0,r.jsxs)("p",{className:"text-sm text-gray-500 mb-4",children:["Мы перезвоним в течение 15 минут",(0,r.jsx)("br",{}),"в рабочее время (9:00–20:00)"]}),(0,r.jsx)("button",{onClick:P,className:"px-6 py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors",children:"Закрыть"})]}):(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsx)("h3",{className:"text-lg font-bold text-center mb-4 font-[family-name:var(--font-display)]",children:"Записаться"}),a&&a.length>0&&(0,r.jsxs)("div",{className:"mb-5 bg-gray-50 rounded-xl p-3 max-h-[120px] overflow-y-auto scrollbar-thin",children:[(0,r.jsx)("ul",{className:"space-y-1",children:a.map((e,t)=>(0,r.jsxs)("li",{className:"flex justify-between text-xs text-gray-600",children:[(0,r.jsx)("span",{className:"truncate mr-2",children:e.title}),(0,r.jsx)("span",{className:"text-gray-800 font-medium whitespace-nowrap",children:e.price})]},t))}),n&&(0,r.jsxs)("div",{className:"flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm font-bold text-gray-800",children:[(0,r.jsx)("span",{children:"Итого"}),(0,r.jsx)("span",{className:"text-cyan-600",children:n})]})]}),(0,r.jsxs)("div",{className:"space-y-3",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"text-xs font-medium text-gray-500 mb-1 block",children:"ФИО"}),(0,r.jsx)("input",{type:"text",value:m,onChange:e=>u(e.target.value),placeholder:"Фамилия Имя Отчество",className:"w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all bg-white"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"text-xs font-medium text-gray-500 mb-1 block",children:"Телефон"}),(0,r.jsxs)("div",{className:"flex gap-0",children:[(0,r.jsxs)("div",{className:"relative",ref:O,children:[(0,r.jsxs)("button",{type:"button",onClick:()=>_(!S),className:"flex items-center gap-1 px-2.5 py-2.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm min-w-[80px]",children:[(0,r.jsx)("span",{className:"text-base",children:I.flag}),(0,r.jsx)("span",{className:"text-gray-700 font-medium",children:I.code}),(0,r.jsx)("svg",{width:"10",height:"10",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-gray-400 ml-0.5",children:(0,r.jsx)("polyline",{points:"2,3 5,7 8,3"})})]}),S&&(0,r.jsx)("div",{className:"absolute top-full left-0 mt-1 bg-white rounded-xl shadow-elevated border border-gray-100 py-1 z-20 min-w-[200px]",children:v.map((e,t)=>(0,r.jsxs)("button",{onClick:()=>{C(t),_(!1),p("")},className:`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${t===k?"bg-cyan-50 text-cyan-700":"text-gray-700"}`,children:[(0,r.jsx)("span",{className:"text-base",children:e.flag}),(0,r.jsx)("span",{className:"font-medium",children:e.code}),(0,r.jsx)("span",{className:"text-gray-400",children:e.name})]},e.code))})]}),(0,r.jsx)("input",{type:"tel",value:function(e){if(0===e.length)return"";let t="";return e.length>0&&(t=e.slice(0,3)),e.length>3&&(t+=" "+e.slice(3,6)),e.length>6&&(t+=" "+e.slice(6,8)),e.length>8&&(t+=" "+e.slice(8,10)),e.length>10&&(t+=" "+e.slice(10)),t}(x),onChange:e=>{p(e.target.value.replace(/\D/g,"").slice(0,I.maxDigits))},placeholder:"",className:"flex-1 px-3.5 py-2.5 rounded-r-xl border border-gray-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all bg-white min-w-0"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{className:"text-xs font-medium text-gray-500 mb-1 block",children:["Telegram для связи ",(0,r.jsx)("span",{className:"text-gray-300",children:"(необязательно)"})]}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("span",{className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm",children:"@"}),(0,r.jsx)("input",{type:"text",value:f,onChange:e=>h(e.target.value.replace(/^@/,"")),placeholder:"username",className:"w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all bg-white"})]})]})]}),(0,r.jsxs)("label",{className:"flex items-start gap-2.5 cursor-pointer mt-4",children:[(0,r.jsx)("div",{onClick:()=>b(!g),className:`
                  w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all cursor-pointer
                  ${g?"bg-cyan-600 border-cyan-600":"border-gray-300"}
                `,children:(0,r.jsx)("svg",{width:"12",height:"12",fill:"none",stroke:"white",strokeWidth:"2.5",className:`transition-all ${g?"opacity-100 scale-100":"opacity-0 scale-0"}`,children:(0,r.jsx)("polyline",{points:"2,6 5,9 10,3"})})}),(0,r.jsxs)("span",{className:"text-xs text-gray-500 leading-relaxed",children:["Я даю согласие на"," ",(0,r.jsx)("a",{href:"https://lazepil.ru/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-cyan-600 underline hover:text-cyan-700",children:"обработку персональных данных"})]})]}),(0,r.jsx)("button",{onClick:M,disabled:!z,className:`w-full mt-4 py-3 rounded-xl text-white text-sm font-bold tracking-wide transition-all
                ${z?"bg-cyan-600 hover:bg-cyan-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0":"bg-gray-300 cursor-not-allowed"}`,children:w?"Отправка...":"Отправить заявку"}),(0,r.jsxs)("div",{className:"flex items-center gap-3 my-4",children:[(0,r.jsx)("div",{className:"flex-1 border-t border-gray-100"}),(0,r.jsx)("span",{className:"text-xs text-gray-300",children:"или напишите нам"}),(0,r.jsx)("div",{className:"flex-1 border-t border-gray-100"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-2.5",children:[(0,r.jsxs)("a",{href:R,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2AABEE]/10 text-[#2AABEE] text-sm font-medium hover:bg-[#2AABEE]/20 transition-colors",children:[(0,r.jsx)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:(0,r.jsx)("path",{d:"M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.49 8.18l-1.81 8.52c-.14.6-.5.75-.99.47l-2.76-2.04-1.33 1.28c-.15.15-.27.27-.56.27l.2-2.82 5.12-4.63c.22-.2-.05-.31-.34-.12l-6.33 3.99-2.73-.85c-.59-.19-.61-.59.12-.88l10.68-4.12c.5-.18.93.12.77.87z"})}),"Telegram"]}),(0,r.jsxs)("a",{href:D,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors",children:[(0,r.jsx)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:(0,r.jsx)("path",{d:"M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 13.81c-.25.71-1.48 1.35-2.04 1.41-.53.05-1.02.24-3.41-.71-2.89-1.15-4.73-4.11-4.87-4.3-.15-.19-1.17-1.56-1.17-2.97 0-1.42.74-2.12 1-2.41.27-.29.58-.36.78-.36.19 0 .39.01.56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.78 1.28 1.67 2.07 1.14 1.01 2.11 1.32 2.41 1.47.29.15.46.13.64-.08.17-.21.75-.88.95-1.18.2-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.71-.18 1.42z"})}),"WhatsApp"]})]}),(0,r.jsx)("p",{className:"text-[10px] text-gray-300 text-center mt-2",children:"Ваш расчёт подтянется в сообщение автоматически"})]})]})})}e.s(["default",0,function(){let[e,t]=(0,s.useState)("female"),[i,m]=(0,s.useState)(null),[u,x]=(0,s.useState)({head:new Set,hands:new Set,body:new Set,legs:new Set}),[p,f]=(0,s.useState)(1),[y,v]=(0,s.useState)(!1),[w,N]=(0,s.useState)([]),[k,C]=(0,s.useState)(""),[S,_]=(0,s.useState)(!1),[O,I]=(0,s.useState)(!1),E="male"===e?1.3:1;(0,s.useEffect)(()=>{"success"===new URLSearchParams(window.location.search).get("payment")&&(_(!0),window.history.replaceState({},"",window.location.pathname))},[]);let z=(0,s.useCallback)(e=>{t(e),x(t=>{let r={...t};for(let[t,s]of Object.entries(r)){let n=new Set;s.forEach(r=>{let s=a[t]?.items.find(e=>e.id===r);s&&(!s.genderOnly||s.genderOnly===e)&&n.add(r)}),r[t]=n}return r})},[]),M={};Object.entries(u).forEach(([e,t])=>{M[e]=t.size});let P=(0,s.useCallback)(e=>{m(d[e]??e),setTimeout(()=>{let e=document.getElementById("service-list");e&&window.innerWidth<1024&&e.scrollIntoView({behavior:"smooth",block:"start"})},100)},[]),$=(0,s.useCallback)((e,t)=>{x(r=>{let s={...r},a=new Set(r[e]);if(a.has(t))a.delete(t);else{a.add(t);let e=l[t];e&&e.forEach(e=>a.delete(e));let r=o[t];r&&r.forEach(e=>a.delete(e))}return s[e]=a,s})},[]),R=(0,s.useCallback)((e,t)=>{x(r=>{let s={...r},a=new Set(r[e]);return a.delete(t),s[e]=a,s})},[]),D=(0,s.useCallback)(e=>{x(t=>{let r={...t};for(let{zone:t,id:s}of e){let e=new Set(r[t]);e.add(s);let a=l[s];a&&a.forEach(t=>e.delete(t));let n=o[s];n&&n.forEach(t=>e.delete(t)),r[t]=e}return r})},[]),T=(0,s.useCallback)(()=>{let e=new Set;Object.values(u).forEach(t=>t.forEach(t=>e.add(t)));let t=new Set,r=[];for(let s of[...n].map(e=>{let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(a)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);return{...e,saving:t-e.price}}).sort((e,t)=>t.saving-e.saving))s.requiredItemIds.every(r=>e.has(r)&&!t.has(r))&&(s.requiredItemIds.forEach(e=>t.add(e)),r.push({title:s.title,price:c(Math.round(s.price*E))}));Object.entries(u).forEach(([e,s])=>{a[e].items.filter(e=>s.has(e.id)&&!t.has(e.id)).forEach(e=>{r.push({title:e.title,price:c(Math.round(e.price*E))})})});let s=0;r.forEach(e=>{s+=parseInt(e.price.replace(/\D/g,""))});let i=s*p,l=p>=5?Math.round(i/2):i,o=p>1?` (${p} сеансов)`:"";N(r),C(c(l)+o),v(!0)},[u,p,E]),q=(0,s.useCallback)(()=>{x({head:new Set,hands:new Set,body:new Set,legs:new Set}),m(null),f(1)},[]),A=(0,s.useCallback)((t,r,s)=>{I(!0);let a=new URLSearchParams({action:"payment",amount:String(t),services:r,sessions:String(s),gender:e,return_url:window.location.origin+window.location.pathname+"?payment=success"});window.location.href="https://script.google.com/macros/s/AKfycbxRfSiaORge7dVQJ0GBhhVCPZ_Ezp_ZBqo1A8f0aqxHCwx5zOBC4q8Dn5r0XCASJsOx/exec?"+a.toString()},[e]),B=Object.values(u).some(e=>e.size>0);return(0,s.useEffect)(()=>{let e=document.querySelectorAll(".scroll-reveal"),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add("is-visible"),t.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -40px 0px"});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]),(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,r.jsx)("div",{className:"bg-gray-100 border-b border-gray-200 text-center py-1.5 px-4",children:(0,r.jsxs)("span",{className:"text-xs text-gray-500",children:["Бета-версия · ",(0,r.jsx)("a",{href:"https://t.me/lazuritbeauty",target:"_blank",rel:"noopener noreferrer",className:"text-cyan-600 hover:text-cyan-700 transition-colors",children:"Напишите, что улучшить"})]})}),(0,r.jsxs)("div",{className:"max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-14",children:[(0,r.jsx)("header",{className:"mb-6 text-center",children:(0,r.jsx)("h1",{className:"text-2xl sm:text-3xl font-extrabold tracking-tight font-[family-name:var(--font-display)] text-gray-800",children:"Калькулятор лазерной эпиляции"})}),!i&&!B&&(0,r.jsxs)("div",{className:"lg:hidden card p-5 mb-5",children:[(0,r.jsxs)("div",{className:"flex items-start gap-3 mb-4",children:[(0,r.jsx)("div",{className:"w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center flex-shrink-0",children:(0,r.jsx)("svg",{width:"20",height:"20",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-cyan-600",children:(0,r.jsx)("path",{d:"M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"})})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-base font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"Выберите зону"}),(0,r.jsx)("p",{className:"text-sm text-gray-400",children:"Нажмите на любую часть тела"})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-3 gap-2",children:[(0,r.jsxs)("div",{className:"text-center p-2.5 rounded-xl bg-gray-50",children:[(0,r.jsx)("span",{className:"text-base font-extrabold text-cyan-600 font-[family-name:var(--font-display)] block",children:"−50%"}),(0,r.jsx)("span",{className:"text-[10px] text-gray-500 block mt-0.5",children:"Скидка от 5 сеансов"})]}),(0,r.jsxs)("div",{className:"text-center p-2.5 rounded-xl bg-gray-50",children:[(0,r.jsx)("span",{className:"text-base font-extrabold text-amber-500 font-[family-name:var(--font-display)] block",children:"✦"}),(0,r.jsx)("span",{className:"text-[10px] text-gray-500 block mt-0.5",children:"Совмещайте зоны — цена ниже"})]}),(0,r.jsxs)("div",{className:"text-center p-2.5 rounded-xl bg-gray-50",children:[(0,r.jsx)("span",{className:"text-base font-extrabold text-emerald-600 font-[family-name:var(--font-display)] block",children:"+1"}),(0,r.jsx)("span",{className:"text-[10px] text-gray-500 block mt-0.5",children:"Сеанс в подарок при оплате онлайн"})]})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-[400px_1fr_280px] gap-5 items-start",children:[(0,r.jsx)(h,{gender:e,activeZone:i,selectedCounts:M,onZoneClick:P,onGenderChange:z}),(0,r.jsxs)("div",{className:"flex flex-col gap-5",children:[!i&&!B&&(0,r.jsxs)("div",{className:"hidden lg:block card p-8",children:[(0,r.jsxs)("div",{className:"flex items-start gap-3 mb-5",children:[(0,r.jsx)("div",{className:"w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center flex-shrink-0",children:(0,r.jsx)("svg",{width:"22",height:"22",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-cyan-600",children:(0,r.jsx)("path",{d:"M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"})})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-lg font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"Выберите зону"}),(0,r.jsx)("p",{className:"text-sm text-gray-400",children:"Нажмите на любую часть тела, чтобы увидеть доступные услуги"})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-3 gap-3",children:[(0,r.jsxs)("div",{className:"text-center p-3 rounded-xl bg-gray-50",children:[(0,r.jsx)("span",{className:"text-lg font-extrabold text-cyan-600 font-[family-name:var(--font-display)] block",children:"−50%"}),(0,r.jsx)("span",{className:"text-[10px] text-gray-500 block mt-1",children:"Скидка от 5 сеансов"})]}),(0,r.jsxs)("div",{className:"text-center p-3 rounded-xl bg-gray-50",children:[(0,r.jsx)("span",{className:"text-lg font-extrabold text-amber-500 font-[family-name:var(--font-display)] block",children:"✦"}),(0,r.jsx)("span",{className:"text-[10px] text-gray-500 block mt-1",children:"Совмещайте зоны — цена ниже"})]}),(0,r.jsxs)("div",{className:"text-center p-3 rounded-xl bg-gray-50",children:[(0,r.jsx)("span",{className:"text-lg font-extrabold text-emerald-600 font-[family-name:var(--font-display)] block",children:"+1"}),(0,r.jsx)("span",{className:"text-[10px] text-gray-500 block mt-1",children:"Сеанс в подарок при оплате онлайн"})]})]})]}),i&&a[i]&&(0,r.jsx)("div",{id:"service-list"}),i&&a[i]&&(0,r.jsx)(g,{zone:a[i],selectedIds:u[i],priceMultiplier:E,gender:e,onToggle:$}),(0,r.jsx)("div",{className:"lg:hidden",children:(0,r.jsx)(j,{selected:u,priceMultiplier:E,sessions:p,onAddItems:D})}),(0,r.jsx)(b,{selected:u,sessions:p,priceMultiplier:E,onRemoveItem:R,onClear:q,onSessionChange:f,onSubmit:T,onPayOnline:A})]}),(0,r.jsx)("div",{className:"hidden lg:block",children:(0,r.jsx)("div",{className:"lg:sticky lg:top-5",children:(0,r.jsx)(j,{selected:u,priceMultiplier:E,sessions:p,onAddItems:D})})})]})]}),(0,r.jsx)(L,{isOpen:y,onClose:()=>v(!1),orderLines:w,totalPrice:k,sessions:p,gender:e}),S&&(0,r.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40",children:(0,r.jsxs)("div",{className:"bg-white rounded-2xl shadow-elevated w-full max-w-[400px] p-8 text-center",children:[(0,r.jsxs)("svg",{width:"56",height:"56",fill:"none",className:"mx-auto mb-4",children:[(0,r.jsx)("circle",{cx:"28",cy:"28",r:"24",stroke:"#10B981",strokeWidth:"2",className:"animate-circle-draw"}),(0,r.jsx)("polyline",{points:"16,28 25,37 40,22",stroke:"#10B981",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"animate-draw-check"})]}),(0,r.jsx)("h3",{className:"text-xl font-bold text-gray-800 mb-2 font-[family-name:var(--font-display)]",children:"Оплата прошла!"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mb-6",children:"Запишитесь на удобное время"}),(0,r.jsx)("a",{href:"https://b606463.yclients.com",target:"_blank",rel:"noopener noreferrer",className:"block w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold tracking-wide transition-all",children:"Записаться онлайн"}),(0,r.jsx)("button",{onClick:()=>_(!1),className:"mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors",children:"Закрыть"})]})}),O&&(0,r.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/30",children:(0,r.jsxs)("div",{className:"bg-white rounded-2xl shadow-elevated px-8 py-6 text-center",children:[(0,r.jsx)("div",{className:"w-8 h-8 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"}),(0,r.jsx)("p",{className:"text-sm text-gray-600",children:"Создаём платёж..."})]})})]})}],52683)}]);