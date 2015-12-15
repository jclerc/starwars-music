"use strict";var App={};
"use strict";var $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document);
"use strict";App["goto"]=function(s,i){var e=$("section.visible"),t=$("."+s),o=i?"up":"down";if(!t||"boolean"!=typeof i)throw new Error("Wrong arguments");e&&(e.classList.remove("visible"),e.classList.add("exit-"+o)),t.classList.add("visible"),t.classList.add("enter-"+o)};
"use strict";console.log("Libs and App loaded !");
//# sourceMappingURL=script.js.map
