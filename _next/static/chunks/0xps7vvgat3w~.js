(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,r)=>{"use strict";function s({widthInt:e,heightInt:t,blurWidth:r,blurHeight:i,blurDataURL:l,objectFit:n}){let a=r?40*r:e,o=i?40*i:t,d=a&&o?`viewBox='0 0 ${a} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===n?"xMidYMid":"cover"===n?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${l}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return s}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={VALID_LOADERS:function(){return l},imageConfigDefault:function(){return n}};for(var i in s)Object.defineProperty(r,i,{enumerable:!0,get:s[i]});let l=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let s=e.r(43369),i=e.r(88143),l=e.r(87690),n=["-moz-initial","fill","none","scale-down",void 0];function a(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:r=!1,priority:c=!1,preload:u=!1,loading:m,className:p,quality:f,width:h,height:x,fill:g=!1,style:b,overrideSrc:y,onLoad:L,onLoadingComplete:j,placeholder:v="empty",blurDataURL:w,fetchPriority:N,decoding:C="async",layout:_,objectFit:k,objectPosition:S,lazyBoundary:O,lazyRoot:M,...I},z){var E;let P,$,R,{imgConf:T,showAltText:q,blurComplete:D,defaultLoader:A}=z,W=T||l.imageConfigDefault;if("allSizes"in W)P=W;else{let e=[...W.deviceSizes,...W.imageSizes].sort((e,t)=>e-t),t=W.deviceSizes.sort((e,t)=>e-t),r=W.qualities?.sort((e,t)=>e-t);P={...W,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===A)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let B=I.loader||A;delete I.loader,delete I.srcSet;let U="__next_img_default"in B;if(U){if("custom"===P.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=B;B=t=>{let{config:r,...s}=t;return e(s)}}if(_){"fill"===_&&(g=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[_];e&&(b={...b,...e});let r={responsive:"100vw",fill:"100vw"}[_];r&&!t&&(t=r)}let F="",Z=o(h),G=o(x);if((E=e)&&"object"==typeof E&&(a(E)||void 0!==E.src)){let t=a(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if($=t.blurWidth,R=t.blurHeight,w=w||t.blurDataURL,F=t.src,!g)if(Z||G){if(Z&&!G){let e=Z/t.width;G=Math.round(t.height*e)}else if(!Z&&G){let e=G/t.height;Z=Math.round(t.width*e)}}else Z=t.width,G=t.height}let X=!c&&!u&&("lazy"===m||void 0===m);(!(e="string"==typeof e?e:F)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,X=!1),P.unoptimized&&(r=!0),U&&!P.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let H=o(f),V=Object.assign(g?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:S}:{},q?{}:{color:"transparent"},b),Y=D||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,i.getImageBlurSvg)({widthInt:Z,heightInt:G,blurWidth:$,blurHeight:R,blurDataURL:w||"",objectFit:V.objectFit})}")`:`url("${v}")`,J=n.includes(V.objectFit)?"fill"===V.objectFit?"100% 100%":"cover":V.objectFit,K=Y?{backgroundSize:J,backgroundPosition:V.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},Q=function({config:e,src:t,unoptimized:r,width:i,quality:l,sizes:n,loader:a}){if(r){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,s.getDeploymentId)();if(e){let r=t.indexOf("?");if(-1!==r){let s=new URLSearchParams(t.slice(r+1));s.get("dpl")||(s.append("dpl",e),t=t.slice(0,r)+"?"+s.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},r,s){if(s){let r=/(^|\s)(1?\d?\d)vw/g,i=[];for(let e;e=r.exec(s);)i.push(parseInt(e[2]));if(i.length){let r=.01*Math.min(...i);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,i,n),c=o.length-1;return{sizes:n||"w"!==d?n:"100vw",srcSet:o.map((r,s)=>`${a({config:e,src:t,quality:l,width:r})} ${"w"===d?r:s+1}${d}`).join(", "),src:a({config:e,src:t,quality:l,width:o[c]})}}({config:P,src:e,unoptimized:r,width:Z,quality:H,sizes:t,loader:B}),ee=X?"lazy":m;return{props:{...I,loading:ee,fetchPriority:N,width:Z,height:G,decoding:C,className:p,style:{...V,...K},sizes:Q.sizes,srcSet:Q.srcSet,src:y||Q.src},meta:{unoptimized:r,preload:u||c,placeholder:v,fill:g}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return a}});let s=e.r(71645),i="u"<typeof window,l=i?()=>{}:s.useLayoutEffect,n=i?()=>{}:s.useEffect;function a(e){let{headManager:t,reduceComponentsToState:r}=e;function a(){if(t&&t.mountedInstances){let e=s.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return i&&(t?.mountedInstances?.add(e.children),a()),l(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),l(()=>(t&&(t._pendingUpdate=a),()=>{t&&(t._pendingUpdate=a)})),n(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return h},defaultHead:function(){return u}};for(var i in s)Object.defineProperty(r,i,{enumerable:!0,get:s[i]});let l=e.r(55682),n=e.r(90809),a=e.r(43476),o=n._(e.r(71645)),d=l._(e.r(98879)),c=e.r(42732);function u(){return[(0,a.jsx)("meta",{charSet:"utf-8"},"charset"),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let p=["name","httpEquiv","charSet","itemProp"];function f(e){let t,r,s,i;return e.reduce(m,[]).reverse().concat(u().reverse()).filter((t=new Set,r=new Set,s=new Set,i={},e=>{let l=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?l=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?l=!1:r.add(e.type);break;case"meta":for(let t=0,r=p.length;t<r;t++){let r=p[t];if(e.props.hasOwnProperty(r))if("charSet"===r)s.has(r)?l=!1:s.add(r);else{let t=e.props[r],s=i[r]||new Set;("name"!==r||!n)&&s.has(t)?l=!1:(s.add(t),i[r]=s)}}}return l})).reverse().map((e,t)=>{let r=e.key||t;return o.default.cloneElement(e,{key:r})})}let h=function({children:e}){let t=(0,o.useContext)(c.HeadManagerContext);return(0,a.jsx)(d.default,{reduceComponentsToState:f,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return l}});let s=e.r(55682)._(e.r(71645)),i=e.r(87690),l=s.default.createContext(i.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return s}});let s=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function s(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,t.qualities[0]):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return s}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let s=e.r(70965),i=e.r(43369);function l({config:e,src:t,width:r,quality:n}){let a=(0,i.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let r=new URLSearchParams(t.slice(e+1)),s=r.get("dpl");if(s){a=s,r.delete("dpl");let i=r.toString();t=t.slice(0,e)+(i?"?"+i:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let o=(0,s.findClosestQuality)(n,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${o}${t.startsWith("/")&&a?`&dpl=${a}`:""}`}l.__next_img_default=!0;let n=l},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let s=e.r(71645);function i(e,t){let r=(0,s.useRef)(null),i=(0,s.useRef)(null);return(0,s.useCallback)(s=>{if(null===s){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=l(e,s)),t&&(i.current=l(t,s))},[e,t])}function l(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return L}});let s=e.r(55682),i=e.r(90809),l=e.r(43476),n=i._(e.r(71645)),a=s._(e.r(74080)),o=s._(e.r(25633)),d=e.r(8927),c=e.r(87690),u=e.r(18556);e.r(33525);let m=e.r(65856),p=s._(e.r(1948)),f=e.r(18581),h={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/lazurit-calc/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function x(e,t,r,s,i,l,n){let a=e?.src;e&&e["data-loaded-src"]!==a&&(e["data-loaded-src"]=a,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let s=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>s,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{s=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}s?.current&&s.current(e)}}))}function g(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,n.forwardRef)(({src:e,srcSet:t,sizes:r,height:s,width:i,decoding:a,className:o,style:d,fetchPriority:c,placeholder:u,loading:m,unoptimized:p,fill:h,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:L,setShowAltText:j,sizesInput:v,onLoad:w,onError:N,...C},_)=>{let k=(0,n.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&x(e,u,b,y,L,p,v))},[e,u,b,y,L,N,p,v]),S=(0,f.useMergedRef)(_,k);return(0,l.jsx)("img",{...C,...g(c),loading:m,width:i,height:s,decoding:a,"data-nimg":h?"fill":"1",className:o,style:d,sizes:r,srcSet:t,src:e,ref:S,onLoad:e=>{x(e.currentTarget,u,b,y,L,p,v)},onError:e=>{j(!0),"empty"!==u&&L(!0),N&&N(e)}})});function y({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&a.default.preload?(a.default.preload(t.src,r),null):(0,l.jsx)(o.default,{children:(0,l.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let L=(0,n.forwardRef)((e,t)=>{let r=(0,n.useContext)(m.RouterContext),s=(0,n.useContext)(u.ImageConfigContext),i=(0,n.useMemo)(()=>{let e=h||s||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),i=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:i,localPatterns:"u"<typeof window?s?.localPatterns:e.localPatterns}},[s]),{onLoad:a,onLoadingComplete:o}=e,f=(0,n.useRef)(a);(0,n.useEffect)(()=>{f.current=a},[a]);let x=(0,n.useRef)(o);(0,n.useEffect)(()=>{x.current=o},[o]);let[g,L]=(0,n.useState)(!1),[j,v]=(0,n.useState)(!1),{props:w,meta:N}=(0,d.getImgProps)(e,{defaultLoader:p.default,imgConf:i,blurComplete:g,showAltText:j});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(b,{...w,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:f,onLoadingCompleteRef:x,setBlurComplete:L,setShowAltText:v,sizesInput:e.sizes,ref:t}),N.preload?(0,l.jsx)(y,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return c},getImageProps:function(){return d}};for(var i in s)Object.defineProperty(r,i,{enumerable:!0,get:s[i]});let l=e.r(55682),n=e.r(8927),a=e.r(5500),o=l._(e.r(1948));function d(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/lazurit-calc/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let c=a.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},52683,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let s={head:{key:"head",title:"Лицо",items:[{id:1,title:"Верхняя губа",price:1265},{id:2,title:"Подбородок",price:1265},{id:3,title:"Бакенбарды",price:1265,genderOnly:"male"},{id:4,title:"Лицо полностью",price:3200,hint:"Губа + подбородок + бакенбарды"}]},body:{key:"body",title:"Тело",items:[{id:5,title:"Подмышки",price:1495,group:"Торс"},{id:6,title:"Ареолы",price:1265,group:"Торс"},{id:7,title:"Межгрудное пространство",price:1495,group:"Торс",genderOnly:"male"},{id:8,title:"Грудная клетка полностью",price:2250,group:"Торс",genderOnly:"male"},{id:9,title:"Линия живота",price:1265,group:"Торс"},{id:10,title:"Живот полностью",price:2250,group:"Торс"},{id:11,title:"Поясница",price:2550,group:"Спина"},{id:12,title:"Лопатки",price:2550,group:"Спина"},{id:13,title:"Спина полностью",price:3800,group:"Спина"},{id:14,title:"Классическое бикини",price:2550,group:"Интимные зоны",hint:"По линии белья"},{id:15,title:"Тотальное бикини",price:4350,group:"Интимные зоны",hint:"Полная обработка зоны бикини"},{id:16,title:"Межъягодичная зона",price:1495,group:"Интимные зоны"},{id:17,title:"Ягодицы",price:3795,group:"Интимные зоны"}]},hands:{key:"hands",title:"Руки",items:[{id:18,title:"Пальцы рук",price:1265},{id:19,title:"Предплечье",price:3250},{id:20,title:"Плечо",price:3200},{id:21,title:"Руки полностью",price:4300,hint:"Предплечье + плечо"}]},legs:{key:"legs",title:"Ноги",items:[{id:22,title:"Голени",price:3795},{id:23,title:"Бёдра",price:4025},{id:24,title:"Ноги полностью",price:6325,hint:"Голени + бёдра"},{id:25,title:"Пальцы ног",price:1265}]}},i=[{id:"goleni-podmyshki",title:"Голени + подмышки",requiredItemIds:[22,5],price:4700,price5:11750},{id:"totalnoe-podmyshki",title:"Тотальное бикини + подмышки",requiredItemIds:[15,5],price:5390,price5:13475},{id:"goleni-bikini-podmyshki",title:"Голени + глубокое бикини + подмышки",requiredItemIds:[22,15,5],price:8850,price5:22125},{id:"ruki-podmyshki",title:"Руки полностью + подмышки",requiredItemIds:[21,5],price:13475,price5:13475},{id:"totalnoe-nogi",title:"Тотальное бикини + ноги полностью",requiredItemIds:[15,24],price:9990,price5:24975},{id:"nogi-bikini-podmyshki",title:"Ноги + тотальное бикини + подмышки",requiredItemIds:[24,15,5],price:11490,price5:28725},{id:"vse-telo",title:"Всё тело",requiredItemIds:[21,5,9,15,24],price:14950,price5:37375}],l={"hands-r":"hands","legs-r":"legs"};function n(e){return Math.round(e).toLocaleString("ru-RU")+" ₽"}e.i(47167);var a=e.i(57688);let o=[{zone:"head",paths:[`M 690,120
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
       Z`]}],d=[{zone:"head",paths:[`M 690,100
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
       Z`]},{zone:"legs",paths:[`M 610,1400
       L 595,1490
       L 585,1580
       L 575,1680
       L 570,1780
       L 570,1880
       L 575,1980
       L 580,2090
       L 585,2190
       L 585,2290
       L 580,2390
       L 575,2470
       L 570,2540
       L 572,2600
       L 585,2640
       L 610,2655
       L 645,2655
       L 660,2635
       L 660,2590
       L 650,2520
       L 645,2440
       L 645,2360
       L 650,2260
       L 660,2160
       L 668,2060
       L 678,1960
       L 688,1860
       L 698,1760
       L 708,1660
       L 718,1560
       L 728,1470
       L 742,1420
       L 768,1440
       Z`,`M 926,1400
       L 941,1490
       L 951,1580
       L 961,1680
       L 966,1780
       L 966,1880
       L 961,1980
       L 956,2090
       L 951,2190
       L 951,2290
       L 956,2390
       L 961,2470
       L 966,2540
       L 964,2600
       L 951,2640
       L 926,2655
       L 891,2655
       L 876,2635
       L 876,2590
       L 886,2520
       L 891,2440
       L 891,2360
       L 886,2260
       L 876,2160
       L 868,2060
       L 858,1960
       L 848,1860
       L 838,1760
       L 828,1660
       L 818,1560
       L 808,1470
       L 794,1420
       L 768,1440
       Z`]}],c="/lazurit-calc",u=[{zone:"head",label:"Лицо",dotTop:"10.3%",dotLeft:"53.5%",labelTop:"10.3%"},{zone:"body",label:"Тело",dotTop:"33.1%",dotLeft:"51.2%",labelTop:"33.1%"},{zone:"hands",label:"Руки",dotTop:"46.9%",dotLeft:"71.6%",labelTop:"46.9%"},{zone:"legs",label:"Ноги",dotTop:"66.5%",dotLeft:"57.9%",labelTop:"66.5%"}];function m({gender:e,activeZone:r,selectedCounts:s,onZoneClick:i,onGenderChange:l}){return(0,t.jsxs)("div",{className:"bg-white rounded-2xl shadow-md relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-600 to-cyan-500 z-20"}),(0,t.jsx)("div",{className:"relative pt-4 pb-2",children:(0,t.jsxs)("div",{className:"relative grid grid-cols-[1fr_70px] items-start",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(a.default,{src:"male"===e?`${c}/male.png`:`${c}/female.png`,alt:"Зоны тела",width:1536,height:2752,className:"w-full h-auto select-none",draggable:!1,priority:!0}),(0,t.jsxs)("svg",{viewBox:"0 0 1536 2752",preserveAspectRatio:"xMidYMid meet",className:"absolute inset-0 w-full h-full z-10",children:[("female"===e?o:d).map(e=>e.paths.map((s,l)=>(0,t.jsx)("path",{d:s,fill:r===e.zone?"rgba(8,145,178,0.05)":"transparent",stroke:"none",className:"cursor-pointer transition-all duration-200",style:{pointerEvents:"all"},onMouseEnter:t=>{r!==e.zone&&t.currentTarget.setAttribute("fill","rgba(8,145,178,0.04)")},onMouseLeave:t=>{r!==e.zone&&t.currentTarget.setAttribute("fill","transparent")},onClick:()=>i(e.zone)},`zone-${e.zone}-${l}`))),u.map(e=>{let s=r===e.zone,l=parseFloat(e.dotLeft)/100*1536,n=parseFloat(e.dotTop)/100*2752;return(0,t.jsxs)("g",{children:[(0,t.jsx)("line",{x1:l,y1:n,x2:1536,y2:n,stroke:s?"#0891B2":"#CBD5E1",strokeWidth:s?3:2,strokeDasharray:s?"none":"8 6",className:"transition-all duration-300 pointer-events-none"}),(0,t.jsx)("circle",{cx:l,cy:n,r:s?12:10,fill:s?"#0891B2":"#06B6D4",opacity:s?1:.6,className:"transition-all duration-300 cursor-pointer",onClick:()=>i(e.zone)})]},e.zone)})]})]}),(0,t.jsx)("div",{className:"relative h-full",children:u.map(e=>{let l=r===e.zone,n=s[e.zone]??0,a=n>0;return(0,t.jsxs)("button",{onClick:()=>i(e.zone),className:`
                    absolute left-0 flex items-center gap-1
                    px-2.5 py-1.5 rounded-lg
                    text-[12px] font-semibold whitespace-nowrap
                    transition-all duration-300 cursor-pointer
                    ${l?"bg-cyan-600 text-white shadow-md shadow-cyan-600/20":a?"bg-cyan-50 text-cyan-700 hover:bg-cyan-100":"bg-gray-50 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"}
                  `,style:{top:e.labelTop,transform:"translateY(-50%)"},children:[e.label,n>0&&(0,t.jsx)("span",{className:`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${l?"bg-white text-cyan-600":"bg-cyan-600 text-white"}`,children:n})]},e.zone)})})]})}),(0,t.jsxs)("div",{className:"flex items-center justify-center gap-3 py-3 border-t border-gray-100",children:[(0,t.jsx)("span",{onClick:()=>l("female"),className:`text-xs font-medium cursor-pointer transition-colors ${"female"===e?"text-cyan-600 font-bold":"text-gray-500"}`,children:"Женский"}),(0,t.jsx)("div",{onClick:()=>l("female"===e?"male":"female"),className:"w-11 h-6 bg-cyan-600 rounded-full relative cursor-pointer flex-shrink-0",children:(0,t.jsx)("div",{className:`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ${"male"===e?"left-[22px]":"left-0.5"}`})}),(0,t.jsx)("span",{onClick:()=>l("male"),className:`text-xs font-medium cursor-pointer transition-colors ${"male"===e?"text-cyan-600 font-bold":"text-gray-500"}`,children:"Мужской"})]})]})}function p({zone:e,selectedIds:r,priceMultiplier:s,gender:i,onToggle:l}){return(0,t.jsxs)("div",{className:"bg-white rounded-2xl shadow-md overflow-hidden animate-in",children:[(0,t.jsxs)("div",{className:"px-5 pt-4 pb-3 border-b border-gray-100",children:[(0,t.jsx)("h3",{className:"text-base font-bold text-gray-800",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-gray-400 mt-0.5",children:"Цена за 1 сеанс"})]}),(0,t.jsx)("ul",{className:"py-2 max-h-[380px] overflow-y-auto scrollbar-thin",children:e.items.filter(e=>!e.genderOnly||e.genderOnly===i).map((i,a,o)=>{let d=r.has(i.id),c=Math.round(i.price*s),u=i.group&&(0===a||o[a-1].group!==i.group);return(0,t.jsxs)("li",{children:[u&&(0,t.jsx)("div",{className:"px-5 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider",children:i.group}),(0,t.jsxs)("div",{onClick:()=>l(e.key,i.id),className:`
                  flex items-center gap-3 px-5 py-3 cursor-pointer
                  transition-colors duration-300
                  ${d?"bg-cyan-50":"hover:bg-cyan-50/50"}
                `,children:[(0,t.jsx)("div",{className:`
                  w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center flex-shrink-0
                  transition-all duration-300
                  ${d?"bg-cyan-600 border-cyan-600":"border-gray-200"}
                `,children:(0,t.jsx)("svg",{width:"12",height:"12",fill:"none",stroke:"white",strokeWidth:"2.5",className:`transition-all duration-300 ${d?"opacity-100 scale-100":"opacity-0 scale-0"}`,children:(0,t.jsx)("polyline",{points:"2,6 5,9 10,3"})})}),(0,t.jsxs)("span",{className:"flex-1 min-w-0",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-gray-800 block",children:i.title}),i.hint&&(0,t.jsx)("span",{className:"text-[10px] text-gray-400 block leading-tight",children:i.hint})]}),(0,t.jsx)("span",{className:"text-sm font-semibold text-cyan-600 whitespace-nowrap",children:n(c)})]})]},i.id)})})]})}function f({selected:e,sessions:r,priceMultiplier:l,onRemoveItem:a,onClear:o,onSessionChange:d,onSubmit:c}){let u=Object.entries(e).filter(([,e])=>e.size>0);if(0===u.length)return null;let m=new Set;u.forEach(([,e])=>e.forEach(e=>m.add(e)));let p=new Set,h=[];for(let e of[...i].map(e=>{let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(s)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);return{...e,saving:t-e.price}}).sort((e,t)=>t.saving-e.saving)){let t=e.requiredItemIds.every(e=>m.has(e)),r=e.requiredItemIds.every(e=>!p.has(e));t&&r&&(e.requiredItemIds.forEach(e=>p.add(e)),h.push({title:e.title,price:e.price,itemIds:e.requiredItemIds}))}let x=0;h.forEach(e=>{x+=Math.round(e.price*l)}),u.forEach(([e,t])=>{s[e].items.filter(e=>t.has(e.id)&&!p.has(e.id)).forEach(e=>{x+=Math.round(e.price*l)})});let g=x*r,b=r>=5,y=b?Math.round(50*g/100):0,L=g-y,j=Math.round(100*Math.min(r/5,1)),v=Math.max(0,5-r);return(0,t.jsxs)("div",{className:"bg-white rounded-2xl shadow-md overflow-hidden animate-in",children:[(0,t.jsxs)("div",{className:"px-5 pt-4 pb-3 border-b border-gray-100 flex justify-between items-center",children:[(0,t.jsx)("h3",{className:"text-base font-bold text-gray-800",children:"Ваш выбор"}),(0,t.jsx)("button",{onClick:o,className:"text-xs text-red-500 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors",children:"Сбросить"})]}),h.length>0&&(0,t.jsxs)("div",{className:"px-5 py-3 border-b border-gray-100",children:[(0,t.jsx)("div",{className:"text-[0.72rem] font-bold uppercase tracking-wider text-emerald-500 mb-2",children:"Комплексы"}),h.map((e,r)=>(0,t.jsxs)("div",{className:"py-1.5",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-gray-800",children:e.title}),(0,t.jsx)("span",{className:"text-sm font-semibold text-emerald-600",children:n(Math.round(e.price*l))})]}),(0,t.jsx)("div",{className:"text-[11px] text-gray-400 mt-0.5",children:e.itemIds.map(e=>{for(let t of Object.values(s)){let r=t.items.find(t=>t.id===e);if(r)return r.title}return""}).join(" + ")})]},r))]}),u.map(([e,r])=>{let i=s[e].items.filter(e=>r.has(e.id)&&!p.has(e.id));return 0===i.length?null:(0,t.jsxs)("div",{className:"px-5 py-3 border-b border-gray-100 last:border-b-0",children:[(0,t.jsx)("div",{className:"text-[0.72rem] font-bold uppercase tracking-wider text-gray-400 mb-2",children:s[e].title}),i.map(r=>(0,t.jsxs)("div",{className:"flex justify-between items-center py-1.5",children:[(0,t.jsx)("span",{className:"text-sm font-medium text-gray-800",children:r.title}),(0,t.jsxs)("span",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("span",{className:"text-sm font-semibold text-gray-800",children:n(Math.round(r.price*l))}),(0,t.jsx)("button",{onClick:()=>a(e,r.id),className:"w-[22px] h-[22px] flex items-center justify-center text-gray-400 rounded hover:text-red-500 hover:bg-red-50 transition-colors",children:(0,t.jsxs)("svg",{width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("line",{x1:"3",y1:"3",x2:"11",y2:"11"}),(0,t.jsx)("line",{x1:"11",y1:"3",x2:"3",y2:"11"})]})})]})]},r.id))]},e)}),(0,t.jsxs)("div",{className:`
        mx-4 mt-4 rounded-xl border-2 p-4 transition-all duration-500
        ${b?"border-emerald-400 bg-emerald-50":"border-cyan-200 bg-cyan-50/30"}
      `,children:[(0,t.jsxs)("div",{className:"mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"text-sm font-bold text-gray-800",children:b?"🎉 Скидка 50% активна!":"Купите курс — сэкономьте 50%"}),!b&&(0,t.jsxs)("span",{className:"text-xs text-gray-500",children:["ещё ",v," ",1===v?"сеанс":v<5?"сеанса":"сеансов"]})]}),(0,t.jsx)("p",{className:"text-xs text-gray-400 mt-0.5",children:b?"Курс из 5 сеансов — для стойкого результата":"Лазерная эпиляция работает курсами. Выберите от 5 визитов — цена за каждый снижается вдвое"})]}),(0,t.jsxs)("div",{className:"relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3",children:[(0,t.jsx)("div",{className:`
              absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
              ${b?"bg-emerald-500":"bg-cyan-500"}
            `,style:{width:`${j}%`}}),[1,2,3,4,5].map(e=>(0,t.jsx)("div",{className:`
                absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white
                transition-all duration-300
                ${r>=e?b?"bg-emerald-500":"bg-cyan-500":"bg-gray-300"}
              `,style:{left:`${e/5*100-2}%`}},e))]}),!b&&(0,t.jsx)("p",{className:"text-xs text-gray-400 mb-3 text-center",children:"🎁 При 5 сеансах — бонусный сеанс в подарок"}),(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("label",{className:"text-sm font-semibold text-gray-700",children:"Сеансов"}),(0,t.jsxs)("div",{className:"flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white",children:[(0,t.jsx)("button",{onClick:()=>d(Math.max(1,r-1)),className:"w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold text-lg hover:bg-cyan-50 transition-colors",children:"−"}),(0,t.jsx)("input",{type:"number",value:r,onChange:e=>{d(Math.max(1,Math.min(99,parseInt(e.target.value)||1)))},className:"w-10 text-center text-base font-bold border-x border-gray-200 py-1.5 bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none"}),(0,t.jsx)("button",{onClick:()=>d(Math.min(99,r+1)),className:"w-9 h-9 flex items-center justify-center text-cyan-600 font-semibold text-lg hover:bg-cyan-50 transition-colors",children:"+"})]})]})]}),b&&(0,t.jsx)("div",{className:"mx-4 mt-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 p-3 text-white text-center",children:(0,t.jsx)("span",{className:"text-sm font-bold",children:"🎁 +1 сеанс в подарок!"})}),(0,t.jsxs)("div",{className:"px-5 py-4 mt-2",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center py-1",children:[(0,t.jsx)("span",{className:"text-sm text-gray-500",children:r>1?`${n(x)} \xd7 ${r} сеансов`:"Стоимость"}),(0,t.jsx)("span",{className:`text-sm font-bold ${b?"text-gray-400 line-through":"text-gray-800"}`,children:n(g)})]}),(0,t.jsxs)("div",{className:"flex justify-between items-center py-1",children:[(0,t.jsx)("span",{className:`text-sm ${b?"text-emerald-600 font-semibold":"text-gray-400"}`,children:"Со скидкой 50%"}),(0,t.jsx)("span",{className:`text-sm font-bold ${b?"text-emerald-600":"text-gray-400"}`,children:n(Math.round(.5*g))})]}),(0,t.jsxs)("div",{className:"flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-200",children:[(0,t.jsx)("span",{className:"text-base font-bold text-gray-800",children:"Итого"}),(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"text-sm text-gray-400 line-through",children:n(g)}),(0,t.jsx)("span",{className:`text-xl font-bold ${b?"text-emerald-600":"text-cyan-600"}`,children:b?n(L):n(g)})]})]}),!b&&(0,t.jsxs)("p",{className:"text-xs text-center text-gray-400 mt-1",children:["Добавьте сеансов — и цена снизится до ",n(Math.round(.5*g))]}),(0,t.jsx)("button",{onClick:c,className:"w-full mt-4 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 active:translate-y-0 transition-all",children:"Записаться"})]})]})}function h(e){for(let t of Object.values(s)){let r=t.items.find(t=>t.id===e);if(r)return r.title}return""}function x({selected:e,priceMultiplier:r,sessions:l,onAddItems:a}){let o,d=(o=new Set,Object.values(e).forEach(e=>e.forEach(e=>o.add(e))),o);if(0===d.size)return null;let c=function(e,t,r){let l=[];for(let n of i){let i=n.requiredItemIds,a=i.filter(t=>e.has(t)),o=i.filter(t=>!e.has(t));if(0===a.length)continue;let d=(i.reduce((e,r)=>e+Math.round(function(e){for(let t of Object.values(s)){let r=t.items.find(t=>t.id===e);if(r)return r.price}return 0}(r)*t),0)-Math.round(n.price*t))*r;d<=0||l.push({complex:n,progress:a.length/i.length,completed:a.length,total:i.length,missingIds:o,missingTitles:o.map(e=>h(e)),saving:d,isComplete:0===o.length})}l.sort((e,t)=>e.isComplete!==t.isComplete?e.isComplete?-1:1:t.saving-e.saving);let n=new Set,a=[];for(let e of l){if(e.isComplete){if(e.complex.requiredItemIds.some(e=>n.has(e)))continue;e.complex.requiredItemIds.forEach(e=>n.add(e))}a.push(e)}return a.filter(e=>!!e.isComplete||e.complex.requiredItemIds.some(e=>!n.has(e))).slice(0,4)}(d,r,l);return 0===c.length?null:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-gray-500 uppercase tracking-wider",children:"Комплексы"}),c.map(e=>{let r=Math.round(100*e.progress);return(0,t.jsxs)("div",{className:`
              rounded-xl border-2 p-4 transition-all duration-500
              ${e.isComplete?"border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-100":"border-gray-200 bg-white"}
            `,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:`text-sm font-bold ${e.isComplete?"text-emerald-700":"text-gray-800"}`,children:e.complex.title}),e.isComplete&&(0,t.jsx)("span",{className:"text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full",children:"Собран!"})]}),(0,t.jsx)("div",{className:"relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2",children:(0,t.jsx)("div",{className:`
                  absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
                  ${e.isComplete?"bg-emerald-500":"bg-gray-300"}
                `,style:{width:`${r}%`}})}),(0,t.jsx)("div",{className:"space-y-1 mb-2",children:e.complex.requiredItemIds.map(e=>{let r=d.has(e);return(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:`
                      w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${r?"bg-emerald-500":"bg-gray-300"}
                    `,children:r&&(0,t.jsx)("svg",{width:"10",height:"10",fill:"none",stroke:"white",strokeWidth:"2.5",children:(0,t.jsx)("polyline",{points:"1.5,5 4,7.5 8.5,2.5"})})}),(0,t.jsx)("span",{className:`text-xs ${r?"text-gray-700":"text-gray-400"}`,children:h(e)})]},e)})}),(0,t.jsxs)("div",{className:`
              text-xs font-semibold
              ${e.isComplete?"text-emerald-600":"text-gray-400"}
            `,children:["Выгода: ",n(e.saving),l>1?` за ${l} сеансов`:""]}),!e.isComplete&&a&&(0,t.jsxs)("button",{onClick:()=>{a(e.missingIds.map(e=>({zone:function(e){for(let[t,r]of Object.entries(s))if(r.items.some(t=>t.id===e))return t;return""}(e),id:e})))},className:"w-full mt-2 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold transition-colors cursor-pointer",children:["Добавить: ",e.missingTitles.join(", ")]})]},e.complex.id)})]})}function g(e){let t=e.replace(/\D/g,"").slice(0,11),r="";return t.length>0&&(r="8"),t.length>1&&(r+=" "+t.slice(1,4)),t.length>4&&(r+=" "+t.slice(4,7)),t.length>7&&(r+=" "+t.slice(7,9)),t.length>9&&(r+=" "+t.slice(9,11)),r}function b({isOpen:e,onClose:s,orderLines:i,totalPrice:l}){let[n,a]=(0,r.useState)(""),[o,d]=(0,r.useState)(""),[c,u]=(0,r.useState)(""),[m,p]=(0,r.useState)(!1),[f,h]=(0,r.useState)(!1),x=n.trim()&&o.replace(/\D/g,"").length>=11&&m;function y(){s(),setTimeout(()=>{a(""),d(""),u(""),p(!1),h(!1)},300)}return(0,t.jsx)("div",{className:`
        fixed inset-0 z-50 flex items-center justify-center p-5
        bg-gray-900/50 backdrop-blur-sm
        transition-all duration-300
        ${e?"opacity-100 visible":"opacity-0 invisible"}
      `,onClick:e=>{e.target===e.currentTarget&&y()},children:(0,t.jsxs)("div",{className:`
          bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-7 relative
          transition-all duration-300
          ${e?"translate-y-0 scale-100":"translate-y-5 scale-[0.97]"}
        `,children:[(0,t.jsx)("button",{onClick:y,className:"absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors",children:(0,t.jsxs)("svg",{width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("line",{x1:"4",y1:"4",x2:"12",y2:"12"}),(0,t.jsx)("line",{x1:"12",y1:"4",x2:"4",y2:"12"})]})}),f?(0,t.jsxs)("div",{className:"text-center py-5",children:[(0,t.jsxs)("svg",{width:"48",height:"48",fill:"none",stroke:"#10B981",strokeWidth:"2",className:"mx-auto mb-3",children:[(0,t.jsx)("circle",{cx:"24",cy:"24",r:"20"}),(0,t.jsx)("polyline",{points:"14,24 22,32 34,18"})]}),(0,t.jsx)("h4",{className:"text-base font-bold text-gray-800 mb-1",children:"Заявка отправлена!"}),(0,t.jsxs)("p",{className:"text-sm text-gray-500 mb-4",children:["Мы перезвоним в течение 15 минут",(0,t.jsx)("br",{}),"в рабочее время (9:00–20:00)"]}),(0,t.jsx)("button",{onClick:y,className:"px-6 py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors",children:"Закрыть"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-center mb-4",children:"Контактные данные"}),i&&i.length>0&&(0,t.jsxs)("div",{className:"mb-4 bg-gray-50 rounded-lg p-3 max-h-[140px] overflow-y-auto",children:[(0,t.jsx)("ul",{className:"space-y-1",children:i.map((e,r)=>(0,t.jsxs)("li",{className:"flex justify-between text-xs text-gray-600",children:[(0,t.jsx)("span",{className:"truncate mr-2",children:e.title}),(0,t.jsx)("span",{className:"text-gray-800 font-medium whitespace-nowrap",children:e.price})]},r))}),l&&(0,t.jsxs)("div",{className:"flex justify-between mt-2 pt-2 border-t border-gray-200 text-sm font-bold text-gray-800",children:[(0,t.jsx)("span",{children:"Итого"}),(0,t.jsx)("span",{className:"text-cyan-600",children:l})]})]}),(0,t.jsxs)("div",{className:"space-y-3.5",children:[(0,t.jsx)("input",{type:"text",placeholder:"Фамилия Имя Отчество",value:n,onChange:e=>a(e.target.value),className:"w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"}),(0,t.jsx)("input",{type:"tel",placeholder:"8 900 000 00 00",value:o,onChange:e=>d(g(e.target.value)),className:"w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"}),(0,t.jsx)("div",{className:"relative",children:(0,t.jsx)("input",{type:"tel",placeholder:"Telegram (необязательно)",value:c,onChange:e=>u(g(e.target.value)),className:"w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"})}),(0,t.jsxs)("label",{className:"flex items-start gap-2.5 cursor-pointer",children:[(0,t.jsx)("div",{onClick:()=>p(!m),className:`
                    w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all cursor-pointer
                    ${m?"bg-cyan-600 border-cyan-600":"border-gray-300"}
                  `,children:(0,t.jsx)("svg",{width:"12",height:"12",fill:"none",stroke:"white",strokeWidth:"2.5",className:`transition-all ${m?"opacity-100 scale-100":"opacity-0 scale-0"}`,children:(0,t.jsx)("polyline",{points:"2,6 5,9 10,3"})})}),(0,t.jsxs)("span",{className:"text-xs text-gray-500 leading-relaxed",children:["Я даю согласие на"," ",(0,t.jsx)("a",{href:"https://lazepil.ru/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-cyan-600 underline hover:text-cyan-700",children:"обработку персональных данных"})]})]})]}),(0,t.jsx)("button",{onClick:function(){x&&h(!0)},disabled:!x,className:"w-full mt-5 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none",children:"Отправить заявку"})]})]})})}e.s(["default",0,function(){let[e,a]=(0,r.useState)("female"),[o,d]=(0,r.useState)(null),[c,u]=(0,r.useState)({head:new Set,hands:new Set,body:new Set,legs:new Set}),[h,g]=(0,r.useState)(1),[y,L]=(0,r.useState)(!1),[j,v]=(0,r.useState)([]),[w,N]=(0,r.useState)(""),C="male"===e?1.3:1,_=(0,r.useCallback)(e=>{a(e),u(t=>{let r={...t};for(let[t,i]of Object.entries(r)){let l=new Set;i.forEach(r=>{let i=s[t]?.items.find(e=>e.id===r);i&&(!i.genderOnly||i.genderOnly===e)&&l.add(r)}),r[t]=l}return r})},[]),k={};Object.entries(c).forEach(([e,t])=>{k[e]=t.size});let S=(0,r.useCallback)(e=>{d(l[e]??e)},[]),O=(0,r.useCallback)((e,t)=>{u(r=>{let s={...r},i=new Set(r[e]);return i.has(t)?i.delete(t):i.add(t),s[e]=i,s})},[]),M=(0,r.useCallback)((e,t)=>{u(r=>{let s={...r},i=new Set(r[e]);return i.delete(t),s[e]=i,s})},[]),I=(0,r.useCallback)(e=>{u(t=>{let r={...t};for(let{zone:t,id:s}of e){let e=new Set(r[t]);e.add(s),r[t]=e}return r})},[]),z=(0,r.useCallback)(()=>{let e=new Set;Object.values(c).forEach(t=>t.forEach(t=>e.add(t)));let t=new Set,r=[];for(let l of[...i].map(e=>{let t=e.requiredItemIds.reduce((e,t)=>{for(let r of Object.values(s)){let s=r.items.find(e=>e.id===t);if(s)return e+s.price}return e},0);return{...e,saving:t-e.price}}).sort((e,t)=>t.saving-e.saving))l.requiredItemIds.every(r=>e.has(r)&&!t.has(r))&&(l.requiredItemIds.forEach(e=>t.add(e)),r.push({title:l.title,price:n(Math.round(l.price*C))}));Object.entries(c).forEach(([e,i])=>{s[e].items.filter(e=>i.has(e.id)&&!t.has(e.id)).forEach(e=>{r.push({title:e.title,price:n(Math.round(e.price*C))})})});let l=0;r.forEach(e=>{l+=parseInt(e.price.replace(/\D/g,""))});let a=l*h,o=h>=5?Math.round(a/2):a,d=h>1?` (${h} сеансов)`:"";v(r),N(n(o)+d),L(!0)},[c,h,C]),E=(0,r.useCallback)(()=>{u({head:new Set,hands:new Set,body:new Set,legs:new Set}),d(null),g(1)},[]),P=Object.values(c).some(e=>e.size>0);return(0,t.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,t.jsxs)("div",{className:"max-w-[1400px] mx-auto px-5 py-6 pb-10",children:[(0,t.jsxs)("header",{className:"text-center mb-8",children:[(0,t.jsx)("h1",{className:"text-2xl font-extrabold tracking-tight bg-gradient-to-br from-gray-800 to-cyan-600 bg-clip-text text-transparent",children:"Калькулятор лазерной эпиляции"}),(0,t.jsx)("p",{className:"text-gray-500 text-sm mt-1",children:"Выберите зону на теле и рассчитайте стоимость"}),(0,t.jsx)("p",{className:"inline-block mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5",children:"Курс от 5 сеансов — скидка 50% + бонусный сеанс в подарок"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-[400px_1fr_280px] gap-5 items-start",children:[(0,t.jsx)(m,{gender:e,activeZone:o,selectedCounts:k,onZoneClick:S,onGenderChange:_}),(0,t.jsxs)("div",{className:"flex flex-col gap-5",children:[!o&&!P&&(0,t.jsxs)("div",{className:"bg-white rounded-2xl shadow-md p-12 text-center",children:[(0,t.jsx)("div",{className:"w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,t.jsx)("svg",{width:"24",height:"24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-cyan-600",children:(0,t.jsx)("path",{d:"M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122M5.828 12.172l-2.122 2.122"})})}),(0,t.jsx)("h3",{className:"text-base font-semibold mb-1.5",children:"Выберите зону"}),(0,t.jsxs)("p",{className:"text-sm text-gray-500 leading-relaxed",children:["Нажмите на любую часть тела,",(0,t.jsx)("br",{}),"чтобы увидеть доступные услуги"]}),(0,t.jsx)("div",{className:"mt-4 pt-4 border-t border-gray-100",children:(0,t.jsx)("p",{className:"text-xs text-cyan-600 font-medium",children:"Выбирайте несколько зон — покажем выгодные комплексы со скидкой"})})]}),o&&s[o]&&(0,t.jsx)(p,{zone:s[o],selectedIds:c[o],priceMultiplier:C,gender:e,onToggle:O}),(0,t.jsx)(f,{selected:c,sessions:h,priceMultiplier:C,onRemoveItem:M,onClear:E,onSessionChange:g,onSubmit:z})]}),(0,t.jsx)("div",{className:"lg:sticky lg:top-5",children:(0,t.jsx)(x,{selected:c,priceMultiplier:C,sessions:h,onAddItems:I})})]})]}),(0,t.jsx)(b,{isOpen:y,onClose:()=>L(!1),orderLines:j,totalPrice:w})]})}],52683)}]);