(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,r)=>{"use strict";function s({widthInt:e,heightInt:t,blurWidth:r,blurHeight:a,blurDataURL:i,objectFit:n}){let l=r?40*r:e,o=a?40*a:t,d=l&&o?`viewBox='0 0 ${l} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===n?"xMidYMid":"cover"===n?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return s}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return n}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let i=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let s=e.r(43369),a=e.r(88143),i=e.r(87690),n=["-moz-initial","fill","none","scale-down",void 0];function l(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:r=!1,priority:c=!1,preload:m=!1,loading:u,className:p,quality:x,width:f,height:h,fill:g=!1,style:b,overrideSrc:y,onLoad:j,onLoadingComplete:v,placeholder:L="empty",blurDataURL:w,fetchPriority:N,decoding:C="async",layout:k,objectFit:_,objectPosition:S,lazyBoundary:I,lazyRoot:M,...O},E){var z;let P,$,R,{imgConf:T,showAltText:q,blurComplete:D,defaultLoader:A}=E,B=T||i.imageConfigDefault;if("allSizes"in B)P=B;else{let e=[...B.deviceSizes,...B.imageSizes].sort((e,t)=>e-t),t=B.deviceSizes.sort((e,t)=>e-t),r=B.qualities?.sort((e,t)=>e-t);P={...B,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===A)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let W=O.loader||A;delete O.loader,delete O.srcSet;let U="__next_img_default"in W;if(U){if("custom"===P.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=W;W=t=>{let{config:r,...s}=t;return e(s)}}if(k){"fill"===k&&(g=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[k];e&&(b={...b,...e});let r={responsive:"100vw",fill:"100vw"}[k];r&&!t&&(t=r)}let F="",Z=o(f),G=o(h);if((z=e)&&"object"==typeof z&&(l(z)||void 0!==z.src)){let t=l(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if($=t.blurWidth,R=t.blurHeight,w=w||t.blurDataURL,F=t.src,!g)if(Z||G){if(Z&&!G){let e=Z/t.width;G=Math.round(t.height*e)}else if(!Z&&G){let e=G/t.height;Z=Math.round(t.width*e)}}else Z=t.width,G=t.height}let X=!c&&!m&&("lazy"===u||void 0===u);(!(e="string"==typeof e?e:F)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,X=!1),P.unoptimized&&(r=!0),U&&!P.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let H=o(x),V=Object.assign(g?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:_,objectPosition:S}:{},q?{}:{color:"transparent"},b),Y=D||"empty"===L?null:"blur"===L?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:Z,heightInt:G,blurWidth:$,blurHeight:R,blurDataURL:w||"",objectFit:V.objectFit})}")`:`url("${L}")`,J=n.includes(V.objectFit)?"fill"===V.objectFit?"100% 100%":"cover":V.objectFit,K=Y?{backgroundSize:J,backgroundPosition:V.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},Q=function({config:e,src:t,unoptimized:r,width:a,quality:i,sizes:n,loader:l}){if(r){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,s.getDeploymentId)();if(e){let r=t.indexOf("?");if(-1!==r){let s=new URLSearchParams(t.slice(r+1));s.get("dpl")||(s.append("dpl",e),t=t.slice(0,r)+"?"+s.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},r,s){if(s){let r=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=r.exec(s);)a.push(parseInt(e[2]));if(a.length){let r=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,a,n),c=o.length-1;return{sizes:n||"w"!==d?n:"100vw",srcSet:o.map((r,s)=>`${l({config:e,src:t,quality:i,width:r})} ${"w"===d?r:s+1}${d}`).join(", "),src:l({config:e,src:t,quality:i,width:o[c]})}}({config:P,src:e,unoptimized:r,width:Z,quality:H,sizes:t,loader:W}),ee=X?"lazy":u;return{props:{...O,loading:ee,fetchPriority:N,width:Z,height:G,decoding:C,className:p,style:{...V,...K},sizes:Q.sizes,srcSet:Q.srcSet,src:y||Q.src},meta:{unoptimized:r,preload:m||c,placeholder:L,fill:g}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return l}});let s=e.r(71645),a="u"<typeof window,i=a?()=>{}:s.useLayoutEffect,n=a?()=>{}:s.useEffect;function l(e){let{headManager:t,reduceComponentsToState:r}=e;function l(){if(t&&t.mountedInstances){let e=s.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return a&&(t?.mountedInstances?.add(e.children),l()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),n(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return f},defaultHead:function(){return m}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let i=e.r(55682),n=e.r(90809),l=e.r(43476),o=n._(e.r(71645)),d=i._(e.r(98879)),c=e.r(42732);function m(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let p=["name","httpEquiv","charSet","itemProp"];function x(e){let t,r,s,a;return e.reduce(u,[]).reverse().concat(m().reverse()).filter((t=new Set,r=new Set,s=new Set,a={},e=>{let i=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?i=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?i=!1:r.add(e.type);break;case"meta":for(let t=0,r=p.length;t<r;t++){let r=p[t];if(e.props.hasOwnProperty(r))if("charSet"===r)s.has(r)?i=!1:s.add(r);else{let t=e.props[r],s=a[r]||new Set;("name"!==r||!n)&&s.has(t)?i=!1:(s.add(t),a[r]=s)}}}return i})).reverse().map((e,t)=>{let r=e.key||t;return o.default.cloneElement(e,{key:r})})}let f=function({children:e}){let t=(0,o.useContext)(c.HeadManagerContext);return(0,l.jsx)(d.default,{reduceComponentsToState:x,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let s=e.r(55682)._(e.r(71645)),a=e.r(87690),i=s.default.createContext(a.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return s}});let s=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function s(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,t.qualities[0]):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return s}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let s=e.r(70965),a=e.r(43369);function i({config:e,src:t,width:r,quality:n}){let l=(0,a.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let r=new URLSearchParams(t.slice(e+1)),s=r.get("dpl");if(s){l=s,r.delete("dpl");let a=r.toString();t=t.slice(0,e)+(a?"?"+a:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let o=(0,s.findClosestQuality)(n,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${o}${t.startsWith("/")&&l?`&dpl=${l}`:""}`}i.__next_img_default=!0;let n=i},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let s=e.r(71645);function a(e,t){let r=(0,s.useRef)(null),a=(0,s.useRef)(null);return(0,s.useCallback)(s=>{if(null===s){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=i(e,s)),t&&(a.current=i(t,s))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return j}});let s=e.r(55682),a=e.r(90809),i=e.r(43476),n=a._(e.r(71645)),l=s._(e.r(74080)),o=s._(e.r(25633)),d=e.r(8927),c=e.r(87690),m=e.r(18556);e.r(33525);let u=e.r(65856),p=s._(e.r(1948)),x=e.r(18581),f={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,r,s,a,i,n){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let s=!1,a=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>s,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{s=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}s?.current&&s.current(e)}}))}function g(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,n.forwardRef)(({src:e,srcSet:t,sizes:r,height:s,width:a,decoding:l,className:o,style:d,fetchPriority:c,placeholder:m,loading:u,unoptimized:p,fill:f,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:j,setShowAltText:v,sizesInput:L,onLoad:w,onError:N,...C},k)=>{let _=(0,n.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&h(e,m,b,y,j,p,L))},[e,m,b,y,j,N,p,L]),S=(0,x.useMergedRef)(k,_);return(0,i.jsx)("img",{...C,...g(c),loading:u,width:a,height:s,decoding:l,"data-nimg":f?"fill":"1",className:o,style:d,sizes:r,srcSet:t,src:e,ref:S,onLoad:e=>{h(e.currentTarget,m,b,y,j,p,L)},onError:e=>{v(!0),"empty"!==m&&j(!0),N&&N(e)}})});function y({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,r),null):(0,i.jsx)(o.default,{children:(0,i.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let j=(0,n.forwardRef)((e,t)=>{let r=(0,n.useContext)(u.RouterContext),s=(0,n.useContext)(m.ImageConfigContext),a=(0,n.useMemo)(()=>{let e=f||s||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),a=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:a,localPatterns:"u"<typeof window?s?.localPatterns:e.localPatterns}},[s]),{onLoad:l,onLoadingComplete:o}=e,x=(0,n.useRef)(l);(0,n.useEffect)(()=>{x.current=l},[l]);let h=(0,n.useRef)(o);(0,n.useEffect)(()=>{h.current=o},[o]);let[g,j]=(0,n.useState)(!1),[v,L]=(0,n.useState)(!1),{props:w,meta:N}=(0,d.getImgProps)(e,{defaultLoader:p.default,imgConf:a,blurComplete:g,showAltText:v});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(b,{...w,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:x,onLoadingCompleteRef:h,setBlurComplete:j,setShowAltText:L,sizesInput:e.sizes,ref:t}),N.preload?(0,i.jsx)(y,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return c},getImageProps:function(){return d}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let i=e.r(55682),n=e.r(8927),l=e.r(5500),o=i._(e.r(1948));function d(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let c=l.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},52683,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let s={head:{key:"head",title:"Лицо",items:[{id:1,title:"Верхняя губа",price:1265},{id:2,title:"Подбородок",price:1265},{id:3,title:"Бакенбарды",price:1265},{id:26,title:"Межбровное пространство",price:1265},{id:4,title:"Лицо полностью",price:3200,hint:"Выгодно от 3 зон"}]},body:{key:"body",title:"Тело",items:[{id:5,title:"Подмышки",price:1495,group:"Торс"},{id:6,title:"Ареолы",price:1265,group:"Торс"},{id:7,title:"Межгрудное пространство",price:1495,group:"Торс",genderOnly:"male"},{id:8,title:"Грудная клетка полностью",price:2250,group:"Торс",genderOnly:"male"},{id:9,title:"Линия живота",price:1265,group:"Торс"},{id:10,title:"Живот полностью",price:2250,group:"Торс"},{id:11,title:"Поясница",price:2550,group:"Спина"},{id:12,title:"Лопатки",price:2550,group:"Спина"},{id:13,title:"Спина полностью",price:3800,group:"Спина"},{id:14,title:"Классическое бикини",price:2550,group:"Интимные зоны",hint:"По линии белья"},{id:15,title:"Тотальное бикини",price:4350,group:"Интимные зоны",hint:"Включая межъягодичную зону"},{id:16,title:"Межъягодичная зона",price:1495,group:"Интимные зоны"},{id:17,title:"Ягодицы",price:3795,group:"Интимные зоны"}]},hands:{key:"hands",title:"Руки",items:[{id:18,title:"Пальцы рук",price:1265},{id:19,title:"Предплечье",price:3250},{id:20,title:"Плечо",price:3200},{id:21,title:"Руки полностью",price:4300,hint:"Предплечье + плечо"}]},legs:{key:"legs",title:"Ноги",items:[{id:22,title:"Голени",price:3795},{id:23,title:"Бёдра",price:4025},{id:24,title:"Ноги полностью",price:6325,hint:"Голени + бёдра"},{id:25,title:"Пальцы ног",price:1265}]}},a=[{id:"goleni-podmyshki",title:"Голени + подмышки",requiredItemIds:[22,5],price:4700,price5:11750},{id:"totalnoe-podmyshki",title:"Тотальное бикини + подмышки",requiredItemIds:[15,5],price:5390,price5:13475},{id:"goleni-bikini-podmyshki",title:"Голени + глубокое бикини + подмышки",requiredItemIds:[22,15,5],price:8850,price5:22125},{id:"ruki-podmyshki",title:"Руки полностью + подмышки",requiredItemIds:[21,5],price:13475,price5:13475},{id:"totalnoe-nogi",title:"Тотальное бикини + ноги полностью",requiredItemIds:[15,24],price:9990,price5:24975},{id:"nogi-bikini-podmyshki",title:"Ноги + тотальное бикини + подмышки",requiredItemIds:[24,15,5],price:11490,price5:28725},{id:"vse-telo",title:"Всё тело",requiredItemIds:[21,5,9,15,24],price:14950,price5:37375}],i=new Set(a.flatMap(e=>e.requiredItemIds)),n={4:[1,2,3,26],10:[9],13:[11,12],15:[14,16],21:[19,20],24:[22,23]},l={};for(let[e,t]of Object.entries(n))for(let r of t)l[r]||(l[r]=[]),l[r].push(Number(e));let o={"hands-r":"hands","legs-r":"legs"};function d(e){return Math.round(e).toLocaleString("ru-RU")+" ₽"}var c=e.i(47167),m=e.i(57688);let u=[{zone:"head",paths:[`M 690,120
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
       Z`]}],p=[{zone:"head",paths:[`M 690,100
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
       Z`]}],x=c.default.env.NEXT_PUBLIC_BASE_PATH||"",f=[{zone:"head",label:"Лицо",dotTop:"10.3%",dotLeft:"53.5%",labelTop:"10.3%"},{zone:"body",label:"Тело",dotTop:"33.1%",dotLeft:"51.2%",labelTop:"33.1%"},{zone:"hands",label:"Руки",dotTop:"46.9%",dotLeft:"71.6%",labelTop:"46.9%"},{zone:"legs",label:"Ноги",dotTop:"66.5%",dotLeft:"57.9%",labelTop:"66.5%"}];function h({gender:e,activeZone:r,selectedCounts:s,onZoneClick:a,onGenderChange:i}){return(0,t.jsxs)("div",{className:"card-premium relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 z-20 shadow-[0_1px_8px_rgba(6,182,212,0.3)]"}),(0,t.jsx)("div",{className:"relative pt-4 pb-2",children:(0,t.jsxs)("div",{className:"relative grid grid-cols-[1fr_70px] items-start",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(m.default,{src:"male"===e?`${x}/male.png`:`${x}/female.png`,alt:"Зоны тела",width:446,height:800,className:"w-full h-auto select-none",draggable:!1,priority:!0}),(0,t.jsxs)("svg",{viewBox:"0 0 1536 2752",preserveAspectRatio:"xMidYMid meet",className:"absolute inset-0 w-full h-full z-10",children:[("female"===e?u:p).map(e=>e.paths.map((s,i)=>(0,t.jsx)("path",{d:s,fill:r===e.zone?"rgba(8,145,178,0.05)":"transparent",stroke:"none",className:"cursor-pointer transition-all duration-200",style:{pointerEvents:"all"},onMouseEnter:t=>{r!==e.zone&&t.currentTarget.setAttribute("fill","rgba(8,145,178,0.04)")},onMouseLeave:t=>{r!==e.zone&&t.currentTarget.setAttribute("fill","transparent")},onClick:()=>a(e.zone)},`zone-${e.zone}-${i}`))),f.map(e=>{let s=r===e.zone,i=parseFloat(e.dotLeft)/100*1536,n=parseFloat(e.dotTop)/100*2752;return(0,t.jsxs)("g",{children:[(0,t.jsx)("line",{x1:i,y1:n,x2:1536,y2:n,stroke:s?"#0891B2":"#CBD5E1",strokeWidth:s?3:2,strokeDasharray:s?"none":"8 6",className:"transition-all duration-300 pointer-events-none"}),(0,t.jsx)("circle",{cx:i,cy:n,r:s?12:10,fill:s?"#0891B2":"#06B6D4",opacity:s?1:.6,className:"transition-all duration-300 cursor-pointer",onClick:()=>a(e.zone)})]},e.zone)})]})]}),(0,t.jsx)("div",{className:"relative h-full",children:f.map(e=>{let i=r===e.zone,n=s[e.zone]??0,l=n>0;return(0,t.jsxs)("button",{onClick:()=>a(e.zone),className:`
                    absolute left-0 flex items-center gap-1
                    px-2.5 py-1.5 rounded-lg
                    text-[12px] font-semibold whitespace-nowrap font-[family-name:var(--font-display)]
                    transition-all duration-300 cursor-pointer
                    ${i?"bg-cyan-600 text-white shadow-md shadow-cyan-600/20":l?"bg-cyan-50 text-cyan-700 hover:bg-cyan-100":"bg-gray-50 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"}
                  `,style:{top:e.labelTop,transform:"translateY(-50%)"},children:[e.label,n>0&&(0,t.jsx)("span",{className:`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center animate-badge-pop ${i?"bg-white text-cyan-600":"bg-cyan-600 text-white"}`,children:n},n)]},e.zone)})})]})}),(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2 py-3 border-t border-gray-100",children:[(0,t.jsx)("span",{onClick:()=>i("female"),className:`text-xs font-medium cursor-pointer transition-colors whitespace-nowrap font-[family-name:var(--font-display)] ${"female"===e?"text-cyan-600 font-bold":"text-gray-500"}`,children:"Женский"}),(0,t.jsx)("div",{onClick:()=>i("female"===e?"male":"female"),className:"w-11 h-6 bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-inner rounded-full relative cursor-pointer flex-shrink-0",children:(0,t.jsx)("div",{className:`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${"male"===e?"left-[22px]":"left-0.5"}`})}),(0,t.jsx)("span",{onClick:()=>i("male"),className:`text-xs font-medium cursor-pointer transition-colors whitespace-nowrap font-[family-name:var(--font-display)] ${"male"===e?"text-cyan-600 font-bold":"text-gray-500"}`,children:"Мужской"})]})]})}function g({zone:e,selectedIds:r,priceMultiplier:s,gender:a,onToggle:n}){return(0,t.jsxs)("div",{className:"card-premium overflow-hidden animate-in relative",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 z-20 shadow-[0_1px_8px_rgba(6,182,212,0.3)]"}),(0,t.jsxs)("div",{className:"px-5 pt-4 pb-3 border-b border-gray-100",children:[(0,t.jsx)("h3",{className:"text-base font-bold text-gray-800 font-[family-name:var(--font-display)]",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-gray-400 mt-0.5",children:"Цена за 1 сеанс"})]}),(0,t.jsx)("ul",{className:"py-2 max-h-[380px] overflow-y-auto scrollbar-thin",children:e.items.filter(e=>!e.genderOnly||e.genderOnly===a).map((a,l,o)=>{let c=r.has(a.id),m=Math.round(a.price*s),u=a.group&&(0===l||o[l-1].group!==a.group);return(0,t.jsxs)("li",{className:"animate-fade-up",style:{animationDelay:`${40*l}ms`},children:[u&&(0,t.jsx)("div",{className:"px-5 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider",children:a.group}),(0,t.jsxs)("div",{onClick:()=>n(e.key,a.id),className:`
                  flex items-center gap-2 px-4 py-3 cursor-pointer
                  transition-colors duration-300 hover:-translate-y-[1px] hover:shadow-sm
                  ${c?"bg-cyan-50":"hover:bg-cyan-50/50"}
                `,children:[(0,t.jsx)("div",{className:`
                  w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center flex-shrink-0
                  transition-all duration-300
                  ${c?"bg-cyan-600 border-cyan-600":"border-gray-200"}
                `,children:(0,t.jsx)("svg",{width:"12",height:"12",fill:"none",stroke:"white",strokeWidth:"2.5",className:`transition-opacity duration-200 ${c?"opacity-100 animate-check":"opacity-0 scale-0"}`,children:(0,t.jsx)("polyline",{points:"2,6 5,9 10,3"})})}),(0,t.jsxs)("span",{className:"flex-1 min-w-0",children:[(0,t.jsxs)("span",{className:"text-sm font-medium text-gray-800 block",children:[a.title,i.has(a.id)&&(0,t.jsxs)("span",{className:"relative group/tip inline-block ml-1 align-top cursor-help",children:[(0,t.jsx)("span",{className:"text-amber-400 text-[10px]",children:"✦"}),(0,t.jsx)("span",{className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-gray-800 text-white text-[10px] whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-30",children:"Выгоднее в комплексе"})]})]}),a.hint&&(0,t.jsx)("span",{className:"text-[10px] text-gray-400 block leading-tight",children:a.hint})]}),(0,t.jsx)("span",{className:"text-xs sm:text-sm font-semibold text-cyan-600 whitespace-nowrap",children:d(m)})]})]},a.id)})})]})}function b({selected:e,sessions:r,priceMultiplier:i,onRemoveItem:n,onClear:l,onSessionChange:o,onSubmit:c}){let m=Object.entries(e).filter(([,e])=>e.size>0);if(0===m.length)return null;let u=new Set;m.forEach(([,e])=>e.forEach(e=>u.add(e)));let p=new Set,x=[];for(let e of[...a].map(e=>{let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(s)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);return{...e,saving:t-e.price}}).sort((e,t)=>t.saving-e.saving)){let t=e.requiredItemIds.every(e=>u.has(e)),r=e.requiredItemIds.every(e=>!p.has(e));if(t&&r){e.requiredItemIds.forEach(e=>p.add(e));let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(s)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);x.push({title:e.title,price:e.price,separatePrice:t,itemIds:e.requiredItemIds})}}let f=0;x.forEach(e=>{f+=Math.round(e.price*i)}),m.forEach(([e,t])=>{s[e].items.filter(e=>t.has(e.id)&&!p.has(e.id)).forEach(e=>{f+=Math.round(e.price*i)})});let h=f*r,g=r>=5,y=g?Math.round(50*h/100):0,j=h-y;return(0,t.jsxs)("div",{className:"card-premium overflow-hidden animate-in relative",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 z-20 shadow-[0_1px_8px_rgba(6,182,212,0.3)]"}),(0,t.jsxs)("div",{className:"px-5 pt-4 pb-3 border-b border-gray-100 flex justify-between items-center",children:[(0,t.jsx)("h3",{className:"text-base font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"Ваш выбор"}),(0,t.jsx)("button",{onClick:l,className:"text-xs text-red-500 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors",children:"Сбросить"})]}),x.length>0&&(0,t.jsxs)("div",{className:"px-5 py-3 border-b border-gray-100",children:[(0,t.jsx)("div",{className:"text-[0.72rem] font-bold uppercase tracking-wider text-emerald-500 mb-2",children:"Комплексы"}),x.map((e,r)=>{let a=Math.round(e.price*i),n=Math.round(e.separatePrice*i);return(0,t.jsxs)("div",{className:"py-1.5",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-gray-800",children:e.title}),(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-xs text-gray-400 line-through",children:d(n)}),(0,t.jsx)("span",{className:"text-sm font-semibold text-emerald-600",children:d(a)})]})]}),(0,t.jsx)("div",{className:"text-[11px] text-gray-400 mt-0.5",children:e.itemIds.map(e=>{for(let t of Object.values(s)){let r=t.items.find(t=>t.id===e);if(r)return r.title}return""}).join(" + ")})]},r)})]}),m.map(([e,r])=>{let a=s[e].items.filter(e=>r.has(e.id)&&!p.has(e.id));return 0===a.length?null:(0,t.jsxs)("div",{className:"px-5 py-3 border-b border-gray-100 last:border-b-0",children:[(0,t.jsx)("div",{className:"text-[0.72rem] font-bold uppercase tracking-wider text-gray-400 mb-2",children:s[e].title}),a.map(r=>(0,t.jsxs)("div",{className:"flex justify-between items-center py-1.5",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-gray-800",children:r.title}),(0,t.jsxs)("span",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("span",{className:"text-sm font-semibold text-gray-800",children:d(Math.round(r.price*i))}),(0,t.jsx)("button",{onClick:()=>n(e,r.id),className:"w-[22px] h-[22px] flex items-center justify-center text-gray-400 rounded hover:text-red-500 hover:bg-red-50 hover:rotate-90 transition-transform transition-colors",children:(0,t.jsxs)("svg",{width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("line",{x1:"3",y1:"3",x2:"11",y2:"11"}),(0,t.jsx)("line",{x1:"11",y1:"3",x2:"3",y2:"11"})]})})]})]},r.id))]},e)}),(0,t.jsxs)("div",{className:"px-5 py-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center pt-2 pb-3 border-t border-gray-100",children:[(0,t.jsx)("span",{className:"text-base font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"Итого"}),(0,t.jsx)("span",{className:`text-2xl font-bold animate-price-pop font-[family-name:var(--font-display)] ${g?"text-emerald-600":"text-cyan-600"}`,children:g?d(j):d(h)},j)]}),r>1&&(0,t.jsxs)("div",{className:"flex justify-between items-center text-xs text-gray-400 -mt-2 mb-2",children:[(0,t.jsxs)("span",{children:[d(f)," × ",r," сеансов"]}),g&&(0,t.jsx)("span",{className:"line-through",children:d(h)})]}),(0,t.jsxs)("button",{onClick:c,className:"w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-400 text-white text-lg font-bold tracking-wide hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 active:translate-y-0 transition-all relative overflow-hidden group",children:[(0,t.jsx)("span",{className:"relative z-10",children:"Записаться"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"})]})]}),(0,t.jsx)("div",{className:`
        animate-fade-up mx-4 mb-4 rounded-xl p-4 transition-all duration-500
        ${g?"bg-emerald-50/60 border border-emerald-200/50":"bg-gray-50/80 border border-gray-200/50"}
      `,children:g?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsx)("span",{className:"text-sm font-bold text-gray-800 font-[family-name:var(--font-display)]",children:"🎉 Скидка 50%"}),(0,t.jsx)("button",{onClick:()=>o(1),className:"text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",children:"Отменить"})]}),(0,t.jsxs)("div",{className:"animate-fade-up rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 px-3 py-2 flex items-center justify-between shadow-sm",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-white",children:"Бонусный сеанс"}),(0,t.jsx)("span",{className:"text-xs font-bold text-white/90",children:"+1 бесплатно"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-3",children:[(0,t.jsxs)("span",{className:"text-xs text-gray-500",children:[r," из 15 сеансов"]}),(0,t.jsxs)("div",{className:"flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white",children:[(0,t.jsx)("button",{onClick:()=>o(Math.max(1,r-1)),className:"w-9 h-9 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-50 transition-colors",children:"−"}),(0,t.jsx)("input",{type:"number",value:r,onChange:e=>{o(Math.max(1,Math.min(15,parseInt(e.target.value)||1)))},className:"w-10 text-center text-sm font-bold border-x border-gray-200 py-1 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"}),(0,t.jsx)("button",{onClick:()=>o(Math.min(15,r+1)),className:"w-9 h-9 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-50 transition-colors",children:"+"})]})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:"text-sm text-gray-600",children:"Курсом дешевле"}),(0,t.jsx)("span",{className:"text-sm font-semibold text-cyan-600",children:d(Math.round(.5*h))})]}),(0,t.jsx)("p",{className:"text-[11px] text-gray-400 mb-3",children:"От 5 сеансов — цена вдвое ниже + бонусный сеанс"}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("div",{className:"flex gap-1",children:[1,2,3,4,5].map(e=>(0,t.jsx)("div",{className:`w-2 h-2 rounded-full transition-all duration-300 ${r>=e?"bg-cyan-500":"bg-gray-200"}`},e))}),(0,t.jsxs)("div",{className:"flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white",children:[(0,t.jsx)("button",{onClick:()=>o(Math.max(1,r-1)),className:"w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors",children:"−"}),(0,t.jsx)("input",{type:"number",value:r,onChange:e=>{o(Math.max(1,Math.min(15,parseInt(e.target.value)||1)))},className:"w-10 text-center text-sm font-bold border-x border-gray-200 py-1 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"}),(0,t.jsx)("button",{onClick:()=>o(Math.min(15,r+1)),className:"w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors",children:"+"})]})]})]})})]})}function y(e){for(let t of Object.values(s)){let r=t.items.find(t=>t.id===e);if(r)return r.title}return""}function j({selected:e,priceMultiplier:r,sessions:i,onAddItems:n}){let l,o=(l=new Set,Object.values(e).forEach(e=>e.forEach(e=>l.add(e))),l);if(0===o.size)return null;let c=function(e,t,r){let i=[];for(let n of a){let a=n.requiredItemIds,l=a.filter(t=>e.has(t)),o=a.filter(t=>!e.has(t));if(0===l.length)continue;let d=(a.reduce((e,r)=>e+Math.round(function(e){for(let t of Object.values(s)){let r=t.items.find(t=>t.id===e);if(r)return r.price}return 0}(r)*t),0)-Math.round(n.price*t))*r;d<=0||i.push({complex:n,progress:l.length/a.length,completed:l.length,total:a.length,missingIds:o,missingTitles:o.map(e=>y(e)),saving:d,isComplete:0===o.length})}i.sort((e,t)=>e.isComplete!==t.isComplete?e.isComplete?-1:1:t.saving-e.saving);let n=new Set,l=[];for(let e of i){if(e.isComplete){if(e.complex.requiredItemIds.some(e=>n.has(e)))continue;e.complex.requiredItemIds.forEach(e=>n.add(e))}l.push(e)}return l.filter(e=>!!e.isComplete||e.complex.requiredItemIds.some(e=>!n.has(e))).slice(0,4)}(o,r,i);return 0===c.length?null:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-gray-400 uppercase tracking-wider font-[family-name:var(--font-display)]",children:"Комплексы"}),c.map((e,r)=>{let a=Math.round(100*e.progress);return(0,t.jsxs)("div",{className:`
              animate-fade-up rounded-xl border-2 p-4 transition-all duration-500
              ${e.isComplete?"border-emerald-400/60 bg-gradient-to-br from-emerald-50 to-white shadow-lg shadow-emerald-100/50 relative overflow-hidden":"border-gray-200/60 card-premium"}
            `,style:{animationDelay:`${80*r}ms`},children:[e.isComplete&&(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/20 to-transparent animate-shimmer pointer-events-none rounded-xl"}),(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:`text-sm font-bold font-[family-name:var(--font-display)] ${e.isComplete?"text-emerald-700":"text-gray-800"}`,children:e.complex.title}),e.isComplete&&(0,t.jsx)("span",{className:"text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full",children:"Собран!"})]}),(0,t.jsx)("div",{className:"relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2",children:(0,t.jsx)("div",{className:`
                  absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
                  ${e.isComplete?"bg-emerald-500":"bg-gray-300"}
                `,style:{width:`${a}%`}})}),(0,t.jsx)("div",{className:"space-y-1 mb-2",children:e.complex.requiredItemIds.map(e=>{let r=o.has(e);return(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:`
                      w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${r?"bg-emerald-500":"bg-gray-300"}
                    `,children:r&&(0,t.jsx)("svg",{width:"10",height:"10",fill:"none",stroke:"white",strokeWidth:"2.5",children:(0,t.jsx)("polyline",{points:"1.5,5 4,7.5 8.5,2.5"})})}),(0,t.jsx)("span",{className:`text-xs ${r?"text-gray-700":"text-gray-400"}`,children:y(e)})]},e)})}),"vse-telo"===e.complex.id&&(0,t.jsx)("p",{className:"text-[10px] text-gray-400 italic mb-1",children:"Линия живота или любая зона на выбор: губа, подбородок, межбровка, бакенбарды"}),(0,t.jsxs)("div",{className:`
              text-xs font-semibold
              ${e.isComplete?"text-emerald-600":"text-gray-400"}
            `,children:["Выгода: ",d(e.saving),i>1?` за ${i} сеансов`:""]}),!e.isComplete&&n&&(0,t.jsxs)("button",{onClick:()=>{n(e.missingIds.map(e=>({zone:function(e){for(let[t,r]of Object.entries(s))if(r.items.some(t=>t.id===e))return t;return""}(e),id:e})))},className:"w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white text-xs font-semibold transition-colors cursor-pointer",children:["Добавить: ",e.missingTitles.join(", ")]})]},e.complex.id)})]})}function v({isOpen:e,onClose:s,orderLines:a,totalPrice:i}){let[n,l]=(0,r.useState)(""),[o,d]=(0,r.useState)(""),[c,m]=(0,r.useState)(""),[u,p]=(0,r.useState)(!1),[x,f]=(0,r.useState)(!1);function h(){s(),setTimeout(()=>{l(""),d(""),m(""),p(!1),f(!1)},300)}return n.trim()&&o.replace(/\D/g,"").length,(0,t.jsx)("div",{className:`
        fixed inset-0 z-50 flex items-center justify-center p-5
        bg-gray-950/40 backdrop-blur-md
        transition-all duration-300
        ${e?"opacity-100 visible":"opacity-0 invisible"}
      `,onClick:e=>{e.target===e.currentTarget&&h()},children:(0,t.jsxs)("div",{className:`
          bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 w-full max-w-[400px] p-7 relative
          transition-all duration-300
          ${e?"translate-y-0 scale-100":"translate-y-5 scale-[0.95]"}
        `,children:[(0,t.jsx)("button",{onClick:h,className:"absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors",children:(0,t.jsxs)("svg",{width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("line",{x1:"4",y1:"4",x2:"12",y2:"12"}),(0,t.jsx)("line",{x1:"12",y1:"4",x2:"4",y2:"12"})]})}),x?(0,t.jsxs)("div",{className:"text-center py-5",children:[(0,t.jsxs)("svg",{width:"48",height:"48",fill:"none",className:"mx-auto mb-3",children:[(0,t.jsx)("circle",{cx:"24",cy:"24",r:"20",stroke:"#10B981",strokeWidth:"2",className:"animate-circle-draw"}),(0,t.jsx)("polyline",{points:"14,24 22,32 34,18",stroke:"#10B981",strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"animate-draw-check"})]}),(0,t.jsx)("h4",{className:"text-base font-bold text-gray-800 mb-1",children:"Заявка отправлена!"}),(0,t.jsxs)("p",{className:"text-sm text-gray-500 mb-4",children:["Мы перезвоним в течение 15 минут",(0,t.jsx)("br",{}),"в рабочее время (9:00–20:00)"]}),(0,t.jsx)("button",{onClick:h,className:"px-6 py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors",children:"Закрыть"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-center mb-4 font-[family-name:var(--font-display)]",children:"Контактные данные"}),a&&a.length>0&&(0,t.jsxs)("div",{className:"mb-4 bg-gray-50 rounded-lg p-3 max-h-[140px] overflow-y-auto",children:[(0,t.jsx)("ul",{className:"space-y-1",children:a.map((e,r)=>(0,t.jsxs)("li",{className:"flex justify-between text-xs text-gray-600",children:[(0,t.jsx)("span",{className:"truncate mr-2",children:e.title}),(0,t.jsx)("span",{className:"text-gray-800 font-medium whitespace-nowrap",children:e.price})]},r))}),i&&(0,t.jsxs)("div",{className:"flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm font-bold text-gray-800",children:[(0,t.jsx)("span",{children:"Итого"}),(0,t.jsx)("span",{className:"text-cyan-600",children:i})]})]}),(0,t.jsxs)("div",{className:"text-center py-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-3",children:(0,t.jsx)("span",{className:"text-xl",children:"🚀"})}),(0,t.jsx)("p",{className:"text-sm font-semibold text-gray-700 mb-1",children:"Запись скоро заработает"}),(0,t.jsxs)("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Сейчас калькулятор в бета-режиме.",(0,t.jsx)("br",{}),"Мы готовим онлайн-запись — совсем скоро!"]})]}),(0,t.jsx)("div",{className:"hidden",children:(0,t.jsxs)("label",{className:"flex items-start gap-2.5 cursor-pointer",children:[(0,t.jsx)("div",{onClick:()=>p(!u),className:`
                    w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all cursor-pointer
                    ${u?"bg-cyan-600 border-cyan-600":"border-gray-300"}
                  `,children:(0,t.jsx)("svg",{width:"12",height:"12",fill:"none",stroke:"white",strokeWidth:"2.5",className:`transition-all ${u?"opacity-100 scale-100":"opacity-0 scale-0"}`,children:(0,t.jsx)("polyline",{points:"2,6 5,9 10,3"})})}),(0,t.jsxs)("span",{className:"text-xs text-gray-500 leading-relaxed",children:["Я даю согласие на"," ",(0,t.jsx)("a",{href:"https://lazepil.ru/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-cyan-600 underline hover:text-cyan-700",children:"обработку персональных данных"})]})]})})]})]})})}e.s(["default",0,function(){let[e,i]=(0,r.useState)("female"),[c,m]=(0,r.useState)(null),[u,p]=(0,r.useState)({head:new Set,hands:new Set,body:new Set,legs:new Set}),[x,f]=(0,r.useState)(1),[y,L]=(0,r.useState)(!1),[w,N]=(0,r.useState)([]),[C,k]=(0,r.useState)(""),_="male"===e?1.3:1,S=(0,r.useCallback)(e=>{i(e),p(t=>{let r={...t};for(let[t,a]of Object.entries(r)){let i=new Set;a.forEach(r=>{let a=s[t]?.items.find(e=>e.id===r);a&&(!a.genderOnly||a.genderOnly===e)&&i.add(r)}),r[t]=i}return r})},[]),I={};Object.entries(u).forEach(([e,t])=>{I[e]=t.size});let M=(0,r.useCallback)(e=>{m(o[e]??e)},[]),O=(0,r.useCallback)((e,t)=>{p(r=>{let s={...r},a=new Set(r[e]);if(a.has(t))a.delete(t);else{a.add(t);let e=n[t];e&&e.forEach(e=>a.delete(e));let r=l[t];r&&r.forEach(e=>a.delete(e))}return s[e]=a,s})},[]),E=(0,r.useCallback)((e,t)=>{p(r=>{let s={...r},a=new Set(r[e]);return a.delete(t),s[e]=a,s})},[]),z=(0,r.useCallback)(e=>{p(t=>{let r={...t};for(let{zone:t,id:s}of e){let e=new Set(r[t]);e.add(s);let a=n[s];a&&a.forEach(t=>e.delete(t));let i=l[s];i&&i.forEach(t=>e.delete(t)),r[t]=e}return r})},[]),P=(0,r.useCallback)(()=>{let e=new Set;Object.values(u).forEach(t=>t.forEach(t=>e.add(t)));let t=new Set,r=[];for(let i of[...a].map(e=>{let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(s)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);return{...e,saving:t-e.price}}).sort((e,t)=>t.saving-e.saving))i.requiredItemIds.every(r=>e.has(r)&&!t.has(r))&&(i.requiredItemIds.forEach(e=>t.add(e)),r.push({title:i.title,price:d(Math.round(i.price*_))}));Object.entries(u).forEach(([e,a])=>{s[e].items.filter(e=>a.has(e.id)&&!t.has(e.id)).forEach(e=>{r.push({title:e.title,price:d(Math.round(e.price*_))})})});let i=0;r.forEach(e=>{i+=parseInt(e.price.replace(/\D/g,""))});let n=i*x,l=x>=5?Math.round(n/2):n,o=x>1?` (${x} сеансов)`:"";N(r),k(d(l)+o),L(!0)},[u,x,_]),$=(0,r.useCallback)(()=>{p({head:new Set,hands:new Set,body:new Set,legs:new Set}),m(null),f(1)},[]),R=Object.values(u).some(e=>e.size>0);return(0,r.useEffect)(()=>{let e=document.querySelectorAll(".scroll-reveal"),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add("is-visible"),t.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -40px 0px"});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]),(0,t.jsxs)("div",{className:"min-h-screen bg-[#f8fafb] relative overflow-hidden",children:[(0,t.jsxs)("div",{className:"fixed inset-0 -z-10 pointer-events-none","aria-hidden":"true",children:[(0,t.jsx)("div",{className:"absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-100/40 blur-[120px]"}),(0,t.jsx)("div",{className:"absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-[100px]"})]}),(0,t.jsx)("div",{className:"bg-gray-800 text-white text-center py-2 px-4",children:(0,t.jsxs)("span",{className:"text-xs sm:text-sm font-medium",children:["⚡ Бета-версия · ",(0,t.jsx)("a",{href:"https://t.me/lazuritbeauty",target:"_blank",rel:"noopener noreferrer",className:"underline underline-offset-2 hover:text-cyan-300 transition-colors",children:"Напишите, что улучшить"})]})}),(0,t.jsxs)("div",{className:"max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-14",children:[(0,t.jsxs)("header",{className:"mb-8 sm:mb-10",children:[(0,t.jsx)("h1",{className:"sm:hidden text-lg font-extrabold tracking-tight font-[family-name:var(--font-display)] text-gray-800 mb-3 px-1 whitespace-nowrap text-center",children:"Калькулятор лазерной эпиляции"}),(0,t.jsxs)("div",{className:"card-premium relative overflow-hidden px-5 sm:px-8 py-4 sm:py-6",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 shadow-[0_1px_8px_rgba(6,182,212,0.3)]"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-0",children:[(0,t.jsxs)("div",{className:"hidden sm:block sm:pr-5",children:[(0,t.jsx)("h1",{className:"text-2xl font-extrabold tracking-tight font-[family-name:var(--font-display)] bg-[length:200%_auto] bg-gradient-to-r from-cyan-700 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient-x",children:"Калькулятор лазерной эпиляции"}),(0,t.jsx)("p",{className:"text-gray-400 text-xs mt-0.5",children:"Выберите зоны · рассчитайте стоимость · запишитесь"})]}),(0,t.jsx)("p",{className:"sm:hidden text-gray-400 text-xs mb-3 text-center",children:"Выберите зоны · рассчитайте стоимость · запишитесь"}),(0,t.jsxs)("div",{className:"hidden sm:flex items-center gap-0",children:[(0,t.jsx)("div",{className:"flex items-center gap-3 border-l border-gray-200/60 px-5 py-1",children:(0,t.jsxs)("div",{children:[(0,t.jsxs)("span",{className:"text-sm font-semibold text-gray-700 block whitespace-nowrap",children:["от 5 сеансов — ",(0,t.jsx)("span",{className:"text-cyan-600",children:"−50%"})]}),(0,t.jsx)("span",{className:"text-xs text-gray-400 whitespace-nowrap",children:"Скидка на каждый сеанс"})]})}),(0,t.jsx)("div",{className:"flex items-center gap-3 border-l border-gray-200/60 px-5 py-1",children:(0,t.jsxs)("div",{children:[(0,t.jsxs)("span",{className:"text-sm font-semibold text-gray-700 block whitespace-nowrap",children:[(0,t.jsx)("span",{className:"text-amber-500",children:"✦"})," Комплекс"]}),(0,t.jsx)("span",{className:"text-xs text-amber-600 whitespace-nowrap",children:"Зоны вместе дешевле"})]})}),(0,t.jsx)("div",{className:"flex items-center gap-3 border-l border-gray-200/60 px-5 py-1",children:(0,t.jsxs)("div",{children:[(0,t.jsxs)("span",{className:"text-sm font-semibold text-gray-700 block whitespace-nowrap",children:[(0,t.jsx)("span",{className:"text-violet-500",children:"🎁"})," Бонусный сеанс"]}),(0,t.jsx)("span",{className:"text-xs text-violet-500 whitespace-nowrap",children:"При оплате онлайн"})]})})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-2 sm:hidden",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 rounded-lg bg-cyan-50/60 border border-cyan-200/30 px-3 py-2 w-full",children:[(0,t.jsx)("span",{className:"text-xs font-bold text-cyan-600 flex-shrink-0",children:"−50%"}),(0,t.jsxs)("div",{className:"text-center flex-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-gray-700 block",children:"от 5 сеансов"}),(0,t.jsx)("span",{className:"text-[10px] text-gray-400",children:"Скидка на каждый сеанс"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 rounded-lg bg-amber-50/60 border border-amber-200/30 px-3 py-2 w-full",children:[(0,t.jsx)("span",{className:"text-xs text-amber-500 flex-shrink-0",children:"✦"}),(0,t.jsxs)("div",{className:"text-center flex-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-gray-700 block",children:"Комплекс зон"}),(0,t.jsx)("span",{className:"text-[10px] text-gray-400",children:"Несколько зон вместе — дешевле"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 rounded-lg bg-violet-50/60 border border-violet-200/30 px-3 py-2 w-full",children:[(0,t.jsx)("span",{className:"text-xs flex-shrink-0",children:"🎁"}),(0,t.jsxs)("div",{className:"text-center flex-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-gray-700 block",children:"Бонусный сеанс"}),(0,t.jsx)("span",{className:"text-[10px] text-violet-500",children:"При оплате онлайн"})]})]})]})]})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-[400px_1fr_280px] gap-5 items-start",children:[(0,t.jsx)(h,{gender:e,activeZone:c,selectedCounts:I,onZoneClick:M,onGenderChange:S}),(0,t.jsxs)("div",{className:"flex flex-col gap-5",children:[!c&&!R&&(0,t.jsxs)("div",{className:"card-premium p-12 text-center",children:[(0,t.jsx)("div",{className:"w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,t.jsx)("svg",{width:"24",height:"24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-cyan-600",children:(0,t.jsx)("path",{d:"M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122M5.828 12.172l-2.122 2.122"})})}),(0,t.jsx)("h3",{className:"text-base font-semibold mb-1.5",children:"Выберите зону"}),(0,t.jsxs)("p",{className:"text-sm text-gray-500 leading-relaxed",children:["Нажмите на любую часть тела,",(0,t.jsx)("br",{}),"чтобы увидеть доступные услуги"]}),(0,t.jsx)("div",{className:"mt-4 pt-4 border-t border-gray-100",children:(0,t.jsx)("p",{className:"text-xs text-cyan-600 font-medium",children:"Выбирайте несколько зон — покажем выгодные комплексы со скидкой"})})]}),c&&s[c]&&(0,t.jsx)(g,{zone:s[c],selectedIds:u[c],priceMultiplier:_,gender:e,onToggle:O}),(0,t.jsx)(b,{selected:u,sessions:x,priceMultiplier:_,onRemoveItem:E,onClear:$,onSessionChange:f,onSubmit:P})]}),(0,t.jsx)("div",{children:(0,t.jsx)("div",{className:"lg:sticky lg:top-5",children:(0,t.jsx)(j,{selected:u,priceMultiplier:_,sessions:x,onAddItems:z})})})]})]}),(0,t.jsx)(v,{isOpen:y,onClose:()=>L(!1),orderLines:w,totalPrice:C})]})}],52683)}]);