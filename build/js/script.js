"use strict";var App={};
"use strict";var $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document);
"use strict";App["goto"]=function(e,t){var i=$("section.visible"),n=$("."+e),s=t?"up":"down";if(!n||"boolean"!=typeof t)throw new Error("Wrong arguments: "+n+", "+t);if(i==n)throw new Error("Moving to the same page..");i&&(i.classList.remove("visible"),i.classList.add("exit-"+s),i.addEventListener("animationend",function(e){i.classList.remove("exit-"+s)})),n.classList.add("visible"),n.classList.add("enter-"+s),n.addEventListener("animationend",function(e){n.classList.remove("enter-"+s)})};for(var bindNavigation=function(e){e.addEventListener("click",function(e){App["goto"](this.getAttribute("target"),"up"===this.getAttribute("direction"))})},elements=$$(".begin"),i=elements.length-1;i>=0;i--)bindNavigation(elements[i]);
"use strict";console.log("Libs and App loaded !");
//# sourceMappingURL=script.js.map
