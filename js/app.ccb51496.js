(function(t){function e(e){for(var r,u,s=e[0],i=e[1],o=e[2],b=0,f=[];b<s.length;b++)u=s[b],Object.prototype.hasOwnProperty.call(a,u)&&a[u]&&f.push(a[u][0]),a[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);l&&l(e);while(f.length)f.shift()();return c.push.apply(c,o||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,s=1;s<n.length;s++){var i=n[s];0!==a[i]&&(r=!1)}r&&(c.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},a={app:0},c=[];function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/password/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=e,s=s.slice();for(var o=0;o<s.length;o++)e(s[o]);var l=i;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"3dd6":function(t,e,n){"use strict";n("9b94")},4422:function(t,e,n){},"64a7":function(t,e,n){"use strict";n("a643")},"824a":function(t,e,n){},8873:function(t,e,n){"use strict";n("be07")},"9b94":function(t,e,n){},a643:function(t,e,n){},a728:function(t,e,n){"use strict";n("824a")},b947:function(t,e,n){"use strict";n("f7e1")},be07:function(t,e,n){},c65b:function(t,e,n){"use strict";n("4422")},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function a(t,e,n,a,c,u){var s=Object(r["k"])("game");return Object(r["g"])(),Object(r["c"])("div",{id:"app",class:{fullscreen:u.isFullscreen}},[Object(r["f"])(s)],2)}var c=Object(r["n"])("data-v-50c1e71b");Object(r["i"])("data-v-50c1e71b");var u={class:"game"},s={class:"stage"},i={key:1,class:"part"},o={key:1,class:"instructions"},l=Object(r["f"])("li",null,"Hints are given with each guess",-1),b=Object(r["f"])("li",null,"Restart for a new password",-1);Object(r["h"])();var f,p=c((function(t,e,n,a,c,f){var p=Object(r["k"])("difficulty-select"),d=Object(r["k"])("attempt-input"),j=Object(r["k"])("attempt-list");return Object(r["g"])(),Object(r["c"])("div",u,[Object(r["f"])(p,{max:t.maxlength,value:t.selectedLength,onChange:t.setDifficulty,onReset:t.restart},null,8,["max","value","onChange","onReset"]),Object(r["f"])("div",s,[t.isWinner?(Object(r["g"])(),Object(r["c"])("div",i,"You Win")):(Object(r["g"])(),Object(r["c"])(d,{key:0,size:t.maxlength+1,max:t.selectedLength,value:t.state.stage,disabled:!t.isValid,onSubmit:t.submit,onInput:t.setStage},null,8,["size","max","value","disabled","onSubmit","onInput"]))]),t.state.attempts.length>0?(Object(r["g"])(),Object(r["c"])(j,{key:0,attempts:t.state.attempts,assist:t.isWinner},null,8,["attempts","assist"])):(Object(r["g"])(),Object(r["c"])("ul",o,[Object(r["f"])("li",null,"Guess the "+Object(r["l"])(t.selectedLength)+" digit password",1),l,b]))])})),d=n("5c40"),j=(n("a15b"),n("a1e9")),O=n("2909"),m=(n("a9e3"),n("99af"),n("8ba4"),n("d81d"),n("caad"),n("2532"),n("4de4"),n("c21d")),v=n.n(m);function g(t){return{password:h(t),attempts:[],stage:[]}}function h(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=[],r=t;r>0;r--)n.push(Number(v()(0,e-1)));return n}function y(t,e){if(null==t||null==e)return!1;var n=t.length===e.length,r=[].concat(Object(O["a"])(t),Object(O["a"])(e)).every(Number.isInteger);return n&&r}function S(t,e){var n=y(t,e);if(!1===n)return{valid:n,score:void 0};var r=t.map((function(t){return String(t)})),a=e.map((function(t){return String(t)}));for(var c in t){var u=t[c],s=e[c];u===s&&(r[c]=a[parseInt(c)]=f.MATCH)}for(var i in t){var o=t[i];if(r[i]!==f.MATCH&&a.includes(String(o))){var l=a.indexOf(String(o));r[i]=a[l]=f.CLOSE_MATCH}}for(var b in t)r[b]!==f.MATCH&&r[b]!==f.CLOSE_MATCH&&(r[b]=f.PASS),a[b]!==f.MATCH&&a[b]!==f.CLOSE_MATCH&&(a[b]=f.PASS);return{valid:n,score:a}}function k(t,e){var n;return(null===(n=e.test.score)||void 0===n?void 0:n.filter((function(e){return e===t})).length)||0}function C(t,e,n){return[].concat(Object(O["a"])(e),[{solution:n,test:S(t,n)}])}function w(t,e){return e.some((function(e){return k(f.MATCH,e)===t.length}))}(function(t){t["MATCH"]="match",t["CLOSE_MATCH"]="close_match",t["PASS"]="pass"})(f||(f={}));var x=Object(j["k"])(5),A=Object(j["k"])(3),_=Object(j["j"])(g(A.value)),M=Object(d["d"])((function(){return _.attempts&&w(_.password,_.attempts)})),H=Object(d["d"])((function(){if(_.password&&_.attempts){var t=function(){return y(_.password,_.stage)},e=function(){return null==_.attempts||0===_.attempts.length},n=function(){return _.stage.join("")!==_.attempts[_.attempts.length-1].solution.join("")};return t()&&(e()||n())}return!1}));function T(){_.attempts=C(_.password,_.attempts,_.stage),_.stage=[]}function I(){Object.assign(_,g(A.value))}function P(t){A.value=t}function L(t){_.stage=t}Object(d["C"])(A,(function(){return I()}));var N=Object(r["n"])("data-v-679ef780");Object(r["i"])("data-v-679ef780");var z={class:"password"},E=Object(r["f"])("br",null,null,-1);Object(r["h"])();var V=N((function(t,e,n,a,c,u){return Object(r["g"])(),Object(r["c"])("div",z,[(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["j"])(t.max,(function(e){return Object(r["g"])(),Object(r["c"])("a",{href:"",class:["part",{active:e<=t.value}],onClick:Object(r["m"])((function(n){return t.$emit("change",e)}),["prevent"]),key:e},"*",10,["onClick"])})),128)),E,Object(r["f"])("a",{href:"",class:"restart",onClick:e[1]||(e[1]=Object(r["m"])((function(e){return t.$emit("reset")}),["prevent"]))},"restart")])})),W=Object(d["k"])({props:{max:{type:Number,default:5},value:{type:Number,default:3}}});n("3dd6");W.render=V,W.__scopeId="data-v-679ef780";var B=W,D=Object(r["f"])("br",null,null,-1);function R(t,e,n,a,c,u){return Object(r["g"])(),Object(r["c"])("form",{class:"stage",onSubmit:e[2]||(e[2]=Object(r["m"])((function(){return t.handleSubmit&&t.handleSubmit.apply(t,arguments)}),["prevent"]))},[Object(r["f"])("input",{autofocus:"",inputmode:"numeric",pattern:"[0-9]*",size:t.size,maxlength:t.max,onInput:e[1]||(e[1]=Object(r["m"])((function(){return t.handleInput&&t.handleInput.apply(t,arguments)}),["stop","prevent"])),value:t.textValue},null,40,["size","maxlength","value"]),D,Object(r["f"])("button",{class:"stage-submit",disabled:t.disabled},"submit",8,["disabled"])],32)}n("ac1f"),n("1276");var q=Object(d["k"])({props:{max:{type:Number,default:3},size:{type:Number,default:5},value:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1}},setup:function(t,e){var n=e.emit,r=Object(d["d"])((function(){return t.value.join("")}));function a(t){t.stopImmediatePropagation(),n("submit")}function c(t){var e=t.target||null;e&&n("input",e.value.split("").map((function(t){return Number(t)})))}return{textValue:r,handleSubmit:a,handleInput:c}}});n("8873");q.render=R;var F=q,G={class:"attempts"};function J(t,e,n,a,c,u){var s=Object(r["k"])("attempt");return Object(r["g"])(),Object(r["c"])("ul",G,[(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["j"])(t.orderedAttempts,(function(e,n){return Object(r["g"])(),Object(r["c"])(s,{class:"attempt",key:n,number:t.attempts.length-n,attempt:e,assist:t.assist},null,8,["number","attempt","assist"])})),128))])}n("fb6a");var $=n("ade3"),Y=Object(r["n"])("data-v-14500f4e");Object(r["i"])("data-v-14500f4e");var K={class:"attempt"},Q={class:"attempt-number"},U={class:"parts"},X={class:"hint"};Object(r["h"])();var Z=Y((function(t,e,n,a,c,u){return Object(r["g"])(),Object(r["c"])("div",K,[Object(r["f"])("div",Q,[t.assist?(Object(r["g"])(),Object(r["c"])(r["a"],{key:0},[Object(r["e"])("#"+Object(r["l"])(t.number),1)],64)):Object(r["d"])("",!0)]),Object(r["f"])("div",U,[(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["j"])(t.attempt.solution,(function(e,n){return Object(r["g"])(),Object(r["c"])("span",{class:[Object($["a"])({},t.attempt.test.score[n],t.assist),"part"],key:n},Object(r["l"])(e),3)})),128))]),Object(r["f"])("div",X,[(Object(r["g"])(!0),Object(r["c"])(r["a"],null,Object(r["j"])(t.hints,(function(e){return Object(r["g"])(),Object(r["c"])("span",{class:e,key:e},Object(r["l"])(t.getCount(e,t.attempt)),3)})),128))])])})),tt=Object(d["k"])({props:{number:{type:Number,required:!0},attempt:{type:Object,required:!0},assist:{type:Boolean,default:!1}},setup:function(){var t=[f.MATCH,f.CLOSE_MATCH];return{hints:t,getCount:k}}});n("b947");tt.render=Z,tt.__scopeId="data-v-14500f4e";var et=tt,nt=Object(d["k"])({props:{attempts:{type:Array,default:function(){return[]}},assist:{type:Boolean}},components:{Attempt:et},setup:function(t){var e=Object(d["d"])((function(){return t.attempts.slice().reverse()}));return{orderedAttempts:e}}});n("64a7");nt.render=J;var rt=nt,at=Object(d["k"])({components:{DifficultySelect:B,AttemptInput:F,AttemptList:rt},setup:function(){return{maxlength:x,selectedLength:A,state:_,isWinner:M,isValid:H,submit:T,restart:I,setDifficulty:P,setStage:L}}});n("c65b");at.render=p,at.__scopeId="data-v-50c1e71b";var ct=at,ut={components:{Game:ct},computed:{isFullscreen:function(){return(screen.availHeight||screen.height-30)<=window.innerHeight}}};n("a728");ut.render=a;var st=ut;Object(r["b"])(st).mount("#app")},f7e1:function(t,e,n){}});
//# sourceMappingURL=app.ccb51496.js.map