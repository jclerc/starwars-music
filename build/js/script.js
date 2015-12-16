"use strict";var App={};!function(){App["goto"]=function(e,n){var t=$("section.visible"),i=$(".page."+e),o=n?"up":"down";if(!i||"boolean"!=typeof n)throw new Error("Wrong arguments: "+i+", "+n);if(t==i)throw new Error("Moving to the same page..");if(t){var a=t.getAttribute("data-page");App.call(a,"unloading"),t.classList.remove("visible"),t.classList.add("exit-"+o),t.addEventListener("animationend",function r(e){App.call(a,"unloaded"),t.removeEventListener("animationend",r),t.classList.remove("exit-"+o)})}App.call(e,"loading"),i.classList.add("visible"),i.classList.add("enter-"+o),i.addEventListener("animationend",function s(n){App.call(e,"loaded"),i.removeEventListener("animationend",s),i.classList.remove("enter-"+o),App.setLocation(e)})},App.home=function(){window.location.reload()};var e=!1;App.setLocation=function(n){e=!0,window.location.hash="#/"+n,setTimeout(function(){e=!1},1)},App.gotoHash=function(n){if(!e){if(window.location.hash&&window.location.hash.length>2){var t=window.location.hash.substring(2),i=$(".page."+t);if("home"===t)return void App.home();if(i&&i.classList.contains("page")){var o=$("section.visible");if(o){o.classList.remove("visible");var a=o.getAttribute("data-page");App.call(a,"unloading"),App.call(a,"unloaded")}return i.classList.add("visible"),App.call(t,"loading"),App.call(t,"loaded"),void(window.HYPERSPACE=!1)}}n&&App.home()}};var n={};App.call=function(e,t){if(n[e]&&n[e][t])for(var i=n[e][t].length-1;i>=0;i--)n[e][t][i]()},App.bind=function(e,t,i){n[e]||(n[e]={}),n[e][t]||(n[e][t]=[]),n[e][t].push(i)}}(),window.AudioContext=function(){return window.AudioContext||window.webkitAudioContext||window.mozAudioContext}(),function(){for(var e=0,n=["webkit","moz"],t=0;t<n.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[n[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[t]+"CancelAnimationFrame"]||window[n[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n,t){var i=(new Date).getTime(),o=Math.max(0,16-(i-e)),a=window.setTimeout(function(){n(i+o)},o);return e=i+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}();var $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document);!function(){var e=!1,n=$(".episode-1 .drawing canvas");if(n&&n.getContext){n.width=window.innerWidth,n.height=window.innerHeight;var t,i,o,a,r,s=n.getContext("2d"),d=n.width,c=n.height,l=40,u=30,p=null,f=!1,m=1024,v="audio/episode1.mp3",w=~~(c/2),h=0,g=function(){i=t.createBufferSource(),o=t.createAnalyser(),a=t.createScriptProcessor(m,1,1),r=new Uint8Array(o.frequencyBinCount),i.connect(t.destination),i.connect(o),o.connect(a),a.connect(t.destination)},A=function(e){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=function(){t.decodeAudioData(n.response,function(e){p=e,b(p)},L)},n.send()},b=function(e){i.buffer=e,i.start(0,38),i.loop=!0,f=!0},L=function(e){console.warn(e)};s.strokeStyle="white",s.shadowBlur=100,s.shadowColor="rgb(220, 20, 220)";var y=function(){if(e){x(),s.lineWidth=~~(4+8*Math.random());var n,t,i=0,o=r.length,a=~~(o/u),l=~~(d/u);for(s.beginPath(),s.moveTo(0,w),n=0,t=a;o-a>t;t+=a)n++,i=c-c*r[t]/256-1,s.lineTo(n*l,i);for(s.lineTo(d,w),s.stroke(),s.beginPath(),s.moveTo(0,w),n=0,t=o-a;t>=a;t-=a)n++,i=c-c*r[t]/256-1,s.lineTo(n*l,i);for(s.lineTo(d,w),s.stroke(),s.beginPath(),s.moveTo(0,w),n=0,t=o-a;t>=a;t-=a)n++,s.lineTo(n*l,50*Math.random()-25+w);s.lineTo(d,w),s.stroke()}},x=function(){s.clearRect(0,0,d,c)};try{t=new AudioContext}catch(T){console.warn("Web Audio API is not supported in this browser")}App.bind("episode-1","loaded",function(n){e=!0,g(),a.addEventListener("audioprocess",function(e){var n=(new Date).getTime();h>n-l||(h=n,o.getByteTimeDomainData(r),f===!0&&window.requestAnimationFrame(y))}),null===p?A(v):b(p)}),App.bind("episode-1","unloading",function(){e=!1,i.stop(0),x(),f=!1})}}(),function(){var e=.1,n=!0;App.bind("home","unloading",function(){var n=setInterval(function(){e=1.3*(e+.1),e>70&&clearInterval(n)},100),t=$(".page.home"),i=$(".page.select");t.classList.add("exit-hyperspace"),i.classList.add("enter-hyperspace")}),App.bind("home","unloaded",function(){n=!1;var e=$(".page.home"),t=$(".page.select");e.classList.remove("visible"),e.classList.remove("exit-hyperspace"),t.classList.remove("enter-hyperspace")}),function(t){if(t.width=window.innerWidth,t.height=window.innerHeight,t.getContext){for(var i=t.getContext("2d"),o=t.width,a=t.height,r=100,s=10,d=[],c=function(){var e=Math.random(),n=Math.random(),t=~~(80*Math.random()+20);return{x:e*o,y:n*a,xs:(e*o-o/2)/500,ys:(n*a-a/2)/500,size:~~(t/20),length:Math.random()*s,color:"rgb("+t+", "+t+", "+~~(t+20*Math.random())+")"}},l=0;r>l;l++)d.push(c());!function u(){if(n){window.requestAnimationFrame(u),i.clearRect(0,0,o,a);for(var t=0;r>t;t++){var s=d[t];(s.x<0||s.y<0||s.x>o||s.y>a)&&(s=d[t]=c()),i.strokeStyle=s.color,i.lineWidth=s.size,i.shadowBlur=5,i.lineCap="round",i.shadowColor="#555",i.beginPath(),i.moveTo(s.x,s.y),i.lineTo(s.x+.1+s.length*s.xs*e,s.y+s.length*s.ys*e),i.stroke(),s.x+=s.xs*e,s.y+=s.ys*e}}}()}}($(".hyperspace"))}(),$(".begin").addEventListener("click",function(e){App.call("home","unloading"),App.call("select","loading");var n=$(".page.select");n.addEventListener("animationend",function t(e){n.removeEventListener("animationend",t),App.call("home","unloaded"),App.call("select","loaded"),$(".page.select").classList.add("visible"),App.setLocation("select")})});for(var bindNavigation=function(e){e.addEventListener("click",function(e){App["goto"](this.getAttribute("data-target"),"up"===this.getAttribute("data-direction")),e.preventDefault()})},elements=$$(".navigation"),i=elements.length-1;i>=0;i--)bindNavigation(elements[i]);window.addEventListener("hashchange",App.gotoHash),App.gotoHash(!1),function(){var e={lastMove:0,leftOffset:window.screen.width/2-100,rightOffset:0,screenScale:100-100/1.75,selectCards:$(".select .cards")};e.percentDivisor=window.screen.width-e.rightOffset-e.leftOffset;var n=function(n){var t=(new Date).getTime();if(e.lastMove<t-20){e.lastMove=t;var i=(n.screenX-e.leftOffset)/e.percentDivisor;0>i?i=0:i>1&&(i=1),e.selectCards.style.transform="translateZ(0) translateX(-"+i*e.screenScale+"%)"}};App.bind("select","loading",function(){document.addEventListener("mousemove",n)}),App.bind("select","unloading",function(){document.removeEventListener("mousemove",n)})}(),function(){for(var e=$$(".button-vote"),n=function(n){n.addEventListener("click",function(t){for(var i=e.length-1;i>=0;i--)e[i].innerHTML="Je vote";n.innerHTML="Vote validé !"})},t=e.length-1;t>=0;t--)n(e[t])}(),console.log("Libs and App loaded !");
//# sourceMappingURL=script.js.map
