!function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=5)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){this.setX(t),this.setY(e)}return t.prototype.setX=function(t){void 0===t&&(t=0),this.x=t},t.prototype.setY=function(t){void 0===t&&(t=0),this.y=t},t.prototype.magnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},t.prototype.normilize=function(){var t=this.magnitude();return 0!=t&&1!=t&&(this.x=this.x/t,this.y=this.y/t),this},t.prototype.heading=function(){return Math.atan2(this.y,this.x)},t.prototype.add=function(t,e){return void 0!==e?(this.x+=t,this.y+=e):(this.x+=t.x,this.y+=t.y),this},t.prototype.subtract=function(t,e){return void 0!==e?(this.x-=t,this.y-=e):(this.x-=t.x,this.y-=t.y),this},t.prototype.setMagnitude=function(t){return this.normilize(),this.multiply(t),this},t.prototype.multiply=function(t){return this.x*=t,this.y*=t,this},t.prototype.magnitudeNorm=function(){return Math.pow(this.x,2)+Math.pow(this.y,2)},t.prototype.limit=function(t){return this.magnitudeNorm()>t*t&&(this.normilize(),this.multiply(t)),this},t.subtract=function(e,i){return new t(e.x-i.x,e.y-i.y)},t.add=function(e,i){return new t(e.x+i.x,e.y+i.y)},t}();e.Vector=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(0),n=function(){function t(t,e,i){this.pos=new o.Vector(t,e),this.context=i}return t.prototype.display=function(){this.context.beginPath(),this.context.styleColor="green",this.context.arc(this.pos.x,this.pos.y,5,0,2*Math.PI),this.context.fillStyle="red",this.context.fill()},t}();e.Target=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(0),n=function(){function t(t,e){this.acc=new o.Vector,this.position=t,this.contex=e,this.velocity=new o.Vector(1,1),this.speed=4,this.force=.2}return t.prototype.seek=function(t){var e=o.Vector.subtract(t,this.position);e.setMagnitude(this.speed);var i=o.Vector.subtract(e,this.velocity);i.limit(this.force),this.acc.add(i)},t.prototype.hunt=function(t){var e,i=this,n=1e9,s=0;t.forEach(function(t,r){var h=new o.Vector(t.pos.x-i.position.x,t.pos.y-i.position.y).magnitude();n>h&&(e=t,n=h,s=r)}),this.seek(e.pos),this.position.x>e.pos.x-7&&this.position.x<e.pos.x+7&&this.position.y>e.pos.y-7&&this.position.y<e.pos.y+7&&t.splice(s,1)},t.prototype.update=function(){this.velocity.add(this.acc),this.velocity.limit(this.speed),this.position.add(this.velocity),this.acc.multiply(0)},t.prototype.draw=function(){this.contex.beginPath(),this.contex.arc(this.position.x,this.position.y,5,0,2*Math.PI),this.contex.stroke()},t}();e.Entity=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e,i){this.frames=60,this.element=document.getElementById(t),this.width=e,this.height=i,this.createCanvas(e,i),this.setAnimation()}return t.prototype.setFrames=function(t){this.frames=t,this.resetAnimation()},t.prototype.resetAnimation=function(){clearInterval(this.anim),this.setAnimation()},t.prototype.createCanvas=function(t,e){var i=this,o=document.createElement("canvas");o.setAttribute("width",""+t),o.setAttribute("height",""+e),o.setAttribute("style","border:1px solid #000000");var n=o.getContext("2d");this.element.appendChild(o),this.context=n,this.canvas=o,this.canvas.addEventListener("mousemove",function(t){i.mouseX=t.clientX,i.mouseY=t.clientY})},t.prototype.setAnimation=function(){var t=this;this.anim=setInterval(function(){t.draw()},1e3/this.frames)},t}();e.Canvas=o},function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0});var s=i(3),r=i(2),h=i(0),c=i(1),u=function(t){function e(e,i,o){var n=t.call(this,e,i,o)||this;return n.targets=[],n.setFrames(60),n.generateFood(30),n.mouseV=new h.Vector,n.entity=new r.Entity(new h.Vector(10,10),n.context),n}return n(e,t),e.prototype.generateFood=function(t){for(var e=0;e<t;e++)this.targets.push(new c.Target(Math.floor(Math.random()*this.width),Math.floor(Math.random()*this.height),this.context))},e.prototype.draw=function(){Math.random()<.01&&this.generateFood(2),this.mouseX&&this.mouseY&&(this.mouseV.x=this.mouseX,this.mouseV.y=this.mouseY,console.log(this.mouseV)),this.context.clearRect(0,0,this.width,this.height),this.targets.forEach(function(t){t.display()}),this.entity.hunt(this.targets),this.entity.update(),this.entity.draw()},e}(s.Canvas);e.Environment=u},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(4);window.onload=function(){new o.Environment("app",600,600)}}]);