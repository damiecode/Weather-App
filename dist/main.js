!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.getElementById("second-section"),r=document.querySelector("#search-form"),o=document.querySelector("#search-form input"),c=document.getElementById("msg"),a=document.querySelector("#city"),i=document.querySelector(".city-name"),d=document.querySelector(".data-name"),s=document.querySelector("#data-country"),u=document.getElementById("change-temp"),l=document.getElementById("city-temp"),m=document.querySelector(".city-icon"),y=document.getElementById("unit"),p=document.getElementById("caption");let f=0,h="°F";const b=e=>{const{cod:t,main:b,name:g,sys:w,weather:L}=e;if(200===t){c.style.display="none",n.style.display="block";const e=`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${L[0].icon}.svg`;a.classList.add("city"),i.setAttribute("data-name",`${g} ${w.country}`),d.innerHTML=`${g}`,s.innerHTML=`${w.country}`,s.classList.add("data-country"),u.classList.add("temp-btn"),y.classList.add("unit"),y.innerText=`${h}`,f=b.temp.toFixed(2),l.innerHTML=`${f}${h}`,m.src=e,m.alt=`${L[0].description}`,p.innerHTML=`${L[0].description}`;const t=document.getElementById("background");t.classList="",p.innerHTML.includes("rain")?t.classList.add("rainyday"):p.innerHTML.includes("haze")||p.innerHTML.includes("cloud")?t.classList.add("cloudyday"):t.classList.add("clearday")}else c.style.display="block",n.style.display="none";r.reset(),o.focus(),o.value=""},g=e=>e.then(e=>[e,void 0]).catch(e=>Promise.resolve([void 0,e])),w=async(e,t)=>{if(1===t){const[t,n]=await g(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=7cf4ed0e4a1eb8c3cb4dfe318b6205c9&units=metric`));if(n)throw new Error("could not fetch API");const[r,o]=await g(t.json());if(o)throw new Error("could not fetch weather");b(r)}else{const[t,n]=await g(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=7cf4ed0e4a1eb8c3cb4dfe318b6205c9&units=imperial`));if(n)throw new Error("could not fetch API");const[r,o]=await g(t.json());if(o)throw new Error("could not fetch weather");b(r)}};r.addEventListener("submit",e=>{e.preventDefault(),w(o.value)}),u.addEventListener("click",e=>{e.preventDefault(),(()=>{const e=d.innerText;let t=0;u.innerHTML="Change temperature to °C",l.innerHTML.includes("°F")?(t=1,w(e,t),h="°C",u.innerText="Change temperature to °F"):l.innerHTML.includes("°C")&&(w(e,t),h="°F",u.innerText="Change temperature to °C")})()})}]);