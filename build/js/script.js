"use strict";function AmbientLight(e,n){this.video=e,this.ambient=n,this.light1=$(".light-1",n),this.light2=$(".light-2",n),this.interval=-1}var App={},$=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document);!function(){App["goto"]=function(e,n){var t=$("section.visible"),i=$(".page."+e),o=n?"up":"down";if(!i||"boolean"!=typeof n)throw new Error("Wrong arguments: "+i+", "+n);if(t==i)throw new Error("Moving to the same page..");if(t){var a=t.getAttribute("data-page");App.call(a,"unloading"),t.classList.remove("visible"),t.classList.add("exit-"+o),t.addEventListener("animationend",function r(e){App.call(a,"unloaded"),t.removeEventListener("animationend",r),t.classList.remove("exit-"+o)})}App.call(e,"loading"),i.classList.add("visible"),i.classList.add("enter-"+o),i.addEventListener("animationend",function s(n){App.call(e,"loaded"),i.removeEventListener("animationend",s),i.classList.remove("enter-"+o),App.setLocation(e)})},App.home=function(){window.location.reload()};var e=!1;App.setLocation=function(n){e=!0,window.location.hash="#/"+n,setTimeout(function(){e=!1},1)},App.gotoHash=function(n){if(!e){if(window.location.hash&&window.location.hash.length>2){var t=window.location.hash.substring(2),i=$(".page."+t);if("home"===t)return void App.home();if(i&&i.classList.contains("page")){var o=$("section.visible");if(o){o.classList.remove("visible");var a=o.getAttribute("data-page");App.call(a,"unloading"),App.call(a,"unloaded")}return i.classList.add("visible"),App.call(t,"loading"),App.call(t,"loaded"),void(window.HYPERSPACE=!1)}}n&&App.home()}};var n={};App.call=function(e,t){if(n[e]&&n[e][t])for(var i=n[e][t].length-1;i>=0;i--)n[e][t][i]()},App.bind=function(e,t,i){n[e]||(n[e]={}),n[e][t]||(n[e][t]=[]),n[e][t].push(i)}}(),window.AudioContext=function(){return window.AudioContext||window.webkitAudioContext||window.mozAudioContext}(),function(){for(var e=0,n=["webkit","moz"],t=0;t<n.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[n[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[t]+"CancelAnimationFrame"]||window[n[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n,t){var i=(new Date).getTime(),o=Math.max(0,16-(i-e)),a=window.setTimeout(function(){n(i+o)},o);return e=i+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),AmbientLight.prototype.play=function(){this.ambient.classList.add("active");var e=this;this.interval=setInterval(function(){var n=e.light1.classList.contains("active")?e.light2:e.light1;if(!n.children[0]){var t=document.createElement("canvas");t.getContext("2d");t.width=1,t.height=1,t.classList.add("background"),n.appendChild(t)}n.children[0].getContext("2d").drawImage(e.video,0,0,1,1),e.light1.classList.toggle("active"),e.light2.classList.toggle("active")},1e3)},AmbientLight.prototype.stop=function(){this.ambient.classList.remove("active"),clearInterval(this.interval)},function(){var e=!1,n=$(".episode-1 .drawing canvas"),t=$(".episode-1 .video"),i=new AmbientLight(t,$(".episode-1 .ambient"));if(n&&n.getContext){n.width=window.innerWidth,n.height=window.innerHeight;var o,a,r,s,d,c,l=n.getContext("2d"),p=n.width,u=n.height,h=30,v=30,f=40,m=null,g=!1,w=1024,A="media/episode1.mp3",b=~~(p/2),L=~~(u/2),y=0,T=-1,x=0,C=Math.PI/2,E=function(){a=o.createBufferSource(),r=o.createAnalyser(),s=o.createScriptProcessor(w,1,1),d=new Uint8Array(r.frequencyBinCount),c=new Uint8Array(r.frequencyBinCount),a.connect(o.destination),a.connect(r),r.connect(s),s.connect(o.destination)},M=function(e){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=function(){o.decodeAudioData(n.response,function(e){m=e,q(m)},k)},n.send()},q=function(e){a.buffer=e,a.start(0,38),a.loop=!0,g=!0},k=function(e){console.warn(e)},F=function(e){for(var n,t=0,i=e.length,o=0;i>o;o++)t+=e[o];return n=t/i};l.strokeStyle="white",l.shadowBlur=100,l.shadowColor="rgb(220, 20, 220)";var D=function(){l.lineWidth=3;var e,n,t=d.length,i=~~(t/v),o=~~(p/v),a=150;for(l.beginPath(),l.moveTo(0,L),e=0,n=i;t-i>n;n+=i)e++,l.lineTo(e*o,(Math.random()*a-a/2)*x+L);l.lineTo(p,L),l.stroke()},I=function(){if(e){P();var n,t,i=0,o=c.length-300,a=~~(o/f),r=~~(b/f);for(l.lineWidth=~~(3+6*Math.random()),l.beginPath(),l.moveTo(0,L),n=0,t=o-a;t>=0;t-=a)n++,i=c[t+5]/256,l.lineTo(n*r,u-L-i*L*Math.sin(C+n/5)*x);for(n=0,t=0;o-2*a>t;t+=a)n++,i=c[t+5]/256,l.lineTo(b+n*r,u-L-i*L*Math.cos(C+n/5)*x);l.lineTo(p,L),l.stroke();var s=d.length,h=~~(s/v),m=~~(p/v);for(l.lineWidth=~~(2+4*Math.random()),l.beginPath(),l.moveTo(0,L),n=0,t=h;s-h>t;t+=h)n++,i=u-u*d[t]/256-1,l.lineTo(n*m,i);for(l.lineTo(p,L),l.stroke(),l.beginPath(),l.moveTo(0,L),n=0,t=s-h;t>=h;t-=h)n++,i=u-u*d[t]/256-1,l.lineTo(n*m,i);l.lineTo(p,L),l.stroke()}},P=function(){l.clearRect(0,0,p,u)};try{o=new AudioContext}catch(H){console.warn("Web Audio API is not supported in this browser")}App.bind("episode-1","loaded",function(){e=!0,E(),t.currentTime=0,t.play(),i.play(),s.addEventListener("audioprocess",function(e){var n=(new Date).getTime();y>n-h||(y=n,x=F(c)/100,r.getByteTimeDomainData(d),r.getByteFrequencyData(c),g===!0&&window.requestAnimationFrame(I))}),null===m?M(A):q(m),T=setInterval(D,62)}),App.bind("episode-1","unloading",function(){clearInterval(T),i.stop(),e=!1,a.stop(0),g=!1}),App.bind("episode-1","unloaded",function(){P(),t.currentTime=0,t.pause()})}}(),function(){var e=($(".episode-2 .drawing canvas"),$(".episode-2 .video")),n=new AmbientLight(e,$(".episode-2 .ambient"));App.bind("episode-2","loaded",function(){e.play(),n.play()}),App.bind("episode-2","unloading",function(){n.stop()}),App.bind("episode-2","unloaded",function(){e.pause()})}(),function(){var e=.1,n=!0;App.bind("home","unloading",function(){var n=setInterval(function(){e=1.3*(e+.1),e>70&&clearInterval(n)},100),t=$(".page.home"),i=$(".page.select");t.classList.add("exit-hyperspace"),i.classList.add("enter-hyperspace")}),App.bind("home","unloaded",function(){n=!1;var e=$(".page.home"),t=$(".page.select");e.classList.remove("visible"),e.classList.remove("exit-hyperspace"),t.classList.remove("enter-hyperspace")}),function(t){if(t.width=window.innerWidth,t.height=window.innerHeight,t.getContext){for(var i=t.getContext("2d"),o=t.width,a=t.height,r=100,s=10,d=[],c=function(){var e=Math.random(),n=Math.random(),t=~~(80*Math.random()+20);return{x:e*o,y:n*a,xs:(e*o-o/2)/500,ys:(n*a-a/2)/500,size:~~(t/20),length:Math.random()*s,color:"rgb("+t+", "+t+", "+~~(t+20*Math.random())+")"}},l=0;r>l;l++)d.push(c());!function p(){if(n){window.requestAnimationFrame(p),i.clearRect(0,0,o,a);for(var t=0;r>t;t++){var s=d[t];(s.x<0||s.y<0||s.x>o||s.y>a)&&(s=d[t]=c()),i.strokeStyle=s.color,i.lineWidth=s.size,i.shadowBlur=5,i.lineCap="round",i.shadowColor="#555",i.beginPath(),i.moveTo(s.x,s.y),i.lineTo(s.x+.1+s.length*s.xs*e,s.y+s.length*s.ys*e),i.stroke(),s.x+=s.xs*e,s.y+=s.ys*e}}}()}}($(".hyperspace"))}(),function(){var e=function(e){var n=new Image;n.src=e};App.init=function(){for(var n=$$("img"),t=n.length-1;t>=0;t--)e(n[t].src);window.addEventListener("load",function(){})}}(),function(){$(".begin").addEventListener("click",function(e){App.call("home","unloading"),App.call("select","loading");var n=$(".page.select");n.addEventListener("animationend",function t(e){n.removeEventListener("animationend",t),App.call("home","unloaded"),App.call("select","loaded"),$(".page.select").classList.add("visible"),App.setLocation("select")})});for(var e=function(e){e.addEventListener("click",function(e){App["goto"](this.getAttribute("data-target"),"up"===this.getAttribute("data-direction")),e.preventDefault()})},n=$$(".navigation"),t=n.length-1;t>=0;t--)e(n[t]);window.addEventListener("hashchange",App.gotoHash)}(),function(){var e={lastMove:0,leftOffset:window.screen.width/2-100,rightOffset:0,screenScale:100-100/1.75,selectCards:$(".select .cards")};e.percentDivisor=window.screen.width-e.rightOffset-e.leftOffset;var n=function(n){var t=(new Date).getTime();if(e.lastMove<t-20){e.lastMove=t;var i=(n.screenX-e.leftOffset)/e.percentDivisor;0>i?i=0:i>1&&(i=1),e.selectCards.style.transform="translateZ(0) translateX(-"+i*e.screenScale+"%)"}};App.bind("select","loading",function(){console.log("LOADING"),document.addEventListener("mousemove",n)}),App.bind("select","unloading",function(){document.removeEventListener("mousemove",n)})}(),function(){for(var e=$$(".button-vote"),n=function(n){n.addEventListener("click",function(t){for(var i=e.length-1;i>=0;i--)e[i].innerHTML="Je vote";n.innerHTML="Vote validé !"})},t=e.length-1;t>=0;t--)n(e[t])}(),App.gotoHash(!1),console.log("Libs and App loaded !");
//# sourceMappingURL=script.js.map
