"use strict";var App={};
"use strict";var $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document);
"use strict";var hyperspace=$(".hyperspace");
"use strict";App["goto"]=function(t,e){var i=$("section.visible"),n=$("."+t),s=e?"up":"down";if(!n||"boolean"!=typeof e)throw new Error("Wrong arguments: "+n+", "+e);if(i==n)throw new Error("Moving to the same page..");i&&(i.classList.remove("visible"),i.classList.add("exit-"+s),i.addEventListener("animationend",function(t){i.classList.remove("exit-"+s)})),n.classList.add("visible"),n.classList.add("enter-"+s),n.addEventListener("animationend",function(t){n.classList.remove("enter-"+s)})};for(var bindNavigation=function(t){t.addEventListener("click",function(t){App["goto"](this.getAttribute("data-target"),"up"===this.getAttribute("data-direction"))})},elements=$$(".begin"),i=elements.length-1;i>=0;i--)bindNavigation(elements[i]);
"use strict";console.log("Libs and App loaded !");
//# sourceMappingURL=script.js.map
