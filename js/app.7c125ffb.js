(function(t){function e(e){for(var c,s,i=e[0],u=e[1],o=e[2],p=0,f=[];p<i.length;p++)s=i[p],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(c in u)Object.prototype.hasOwnProperty.call(u,c)&&(t[c]=u[c]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,o||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],c=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(c=!1)}c&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var c={},r={app:0},a=[];function s(e){if(c[e])return c[e].exports;var n=c[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=c,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)s.d(n,c,function(e){return t[e]}.bind(null,c));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/password/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var o=0;o<i.length;o++)e(i[o]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"0946":function(t,e,n){"use strict";n("6338")},"0e05":function(t,e,n){"use strict";n("28a4")},"28a4":function(t,e,n){},6338:function(t,e,n){},"9c1b":function(t,e,n){},c936:function(t,e,n){"use strict";n("9c1b")},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23");function r(t,e,n,r,a,s){var i=Object(c["j"])("game");return Object(c["f"])(),Object(c["c"])("div",{id:"app",class:{fullscreen:s.isFullscreen}},[Object(c["e"])(i)],2)}n("d81d"),n("ac1f"),n("1276"),n("a9e3"),n("a15b"),n("fb6a");var a=Object(c["m"])("data-v-1425ccd6");Object(c["h"])("data-v-1425ccd6");var s={class:"game"},i={class:"password"},u=Object(c["e"])("br",null,null,-1),o={class:"stage"},l=Object(c["e"])("br",null,null,-1),p={key:1,class:"part"},f={key:0,class:"attempts"},b={key:1,class:"instructions"},j=Object(c["e"])("li",null,"Hints are given with each guess",-1),m=Object(c["e"])("li",null,"Restart for a new password",-1);Object(c["g"])();var O=a((function(t,e,n,r,a,O){var d=Object(c["j"])("attempt");return Object(c["f"])(),Object(c["c"])("div",s,[Object(c["e"])("p",i,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["i"])(t.state.maxlength,(function(e){return Object(c["f"])(),Object(c["c"])("a",{href:"",class:["part",{active:e<=t.state.pw.length}],onClick:Object(c["l"])((function(n){return t.setDifficulty(e)}),["prevent"]),key:e},"*",10,["onClick"])})),128)),u,Object(c["e"])("a",{href:"",class:"restart",onClick:e[1]||(e[1]=Object(c["l"])((function(){return t.restart&&t.restart.apply(t,arguments)}),["prevent"]))},"restart")]),Object(c["e"])("div",o,[t.isWinner?(Object(c["f"])(),Object(c["c"])("div",p,"You Win")):(Object(c["f"])(),Object(c["c"])("form",{key:0,onSubmit:e[3]||(e[3]=Object(c["l"])((function(){return t.submit&&t.submit.apply(t,arguments)}),["prevent"]))},[Object(c["e"])("input",{autofocus:"",inputmode:"numeric",pattern:"[0-9]*",size:t.state.maxlength+1,maxlength:t.state.pw.length,onInput:e[2]||(e[2]=function(e){return t.setStage(e.target.value.split("").map((function(t){return Number(t)})))}),value:t.state.stage.join("")},null,40,["size","maxlength","value"]),l,Object(c["e"])("button",{class:"stage-submit",disabled:!t.isValid},"submit",8,["disabled"])],32))]),t.state.attempts.length>0?(Object(c["f"])(),Object(c["c"])("ul",f,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["i"])(t.state.attempts.slice().reverse(),(function(e,n){return Object(c["f"])(),Object(c["c"])(d,{class:"attempt",key:n,number:t.state.attempts.length-n,attempt:e,assist:t.isWinner},null,8,["number","attempt","assist"])})),128))])):(Object(c["f"])(),Object(c["c"])("ul",b,[Object(c["e"])("li",null,"Guess the "+Object(c["k"])(t.state.pw.length)+" digit password",1),j,m]))])})),d=Object(c["m"])("data-v-8450858a");Object(c["h"])("data-v-8450858a");var h={class:"self"},v={key:0,class:"number"},g={class:"parts"},w={class:"match"},y={class:"close-match"};Object(c["g"])();var k=d((function(t,e,n,r,a,s){return Object(c["f"])(),Object(c["c"])("div",h,[Object(c["e"])("div",{class:["hint","text-right",{assist:n.assist}]},[n.assist?(Object(c["f"])(),Object(c["c"])("span",v,"#"+Object(c["k"])(n.number),1)):Object(c["d"])("",!0)],2),Object(c["e"])("div",g,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["i"])(n.attempt.solution,(function(t,e){return Object(c["f"])(),Object(c["c"])("span",{class:[{"close-match":!s.isMatch(t,e)&&s.isCorrect(t,e),match:s.isMatch(t,e)},"part"],key:e},Object(c["k"])(t),3)})),128))]),Object(c["e"])("div",{class:["hint","text-left",{assist:n.assist}]},[Object(c["e"])("span",w,Object(c["k"])(s.matchCount),1),Object(c["e"])("span",y,Object(c["k"])(s.closeMatchCount),1)],2)])})),x=n("2909"),S=n("ade3"),_=(n("8ba4"),n("caad"),n("2532"),n("4de4"),n("99af"),n("c21d")),C=n.n(_),M="valid",P="score",T="match",D="close-match",I="pass";function L(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=[],c=t;c>0;c--)n.push(Number(C()(0,e-1)));return n}function W(t,e){var n=t.length===e.length,c=e.every((function(t){return Number.isInteger(t)}));return n&&c}function A(t,e){var n,c,r=W(t,e);if(!1===r)return c={},Object(S["a"])(c,M,r),Object(S["a"])(c,P,void 0),c;var a=t.map((function(t){return String(t)})),s=e.map((function(t){return String(t)}));for(var i in t){var u=t[i],o=e[i];u===o&&(a[i]=s[parseInt(i)]=T)}for(var l in t){var p=t[l];if(a[l]!==T&&s.includes(String(p))){var f=s.indexOf(String(p));a[l]=s[f]=D}}for(var b in t)a[b]!==T&&a[b]!==D&&(a[b]=I),s[b]!==T&&s[b]!==D&&(s[b]=I);return n={},Object(S["a"])(n,M,r),Object(S["a"])(n,P,s),n}function H(t,e){var n;return null===(n=e.test[P])||void 0===n?void 0:n.filter((function(e){return e===t})).length}function N(t,e,n){return[].concat(Object(x["a"])(e),[{solution:n,test:A(t,n)}])}function z(t,e){return e.some((function(e){return H(T,e)===t.length}))}var F={props:["number","attempt","assist"],computed:{matchCount:function(){return H(T,this.attempt)},closeMatchCount:function(){return H(D,this.attempt)}},methods:{isMatch:function(t,e){return this.assist&&this.attempt.test[P][e]===T},isCorrect:function(t,e){return this.assist&&this.attempt.test[P][e]===D}}};n("0e05");F.render=k,F.__scopeId="data-v-8450858a";var G=F,J=n("5c40"),V=n("a1e9"),B=Object(J["j"])({components:{Attempt:G},setup:function(){var t=Object(V["j"])({maxlength:5,selectedLength:3,pw:L(3),startTimestamp:void 0,lastAttemptTimestamp:Date.now(),attempts:[],stage:[]}),e=Object(J["d"])((function(){return!!t.attempts&&z(t.pw,t.attempts)})),n=Object(J["d"])((function(){if(t.pw&&t.attempts){var e=function(){return W(t.pw,t.stage)},n=function(){return null==t.attempts||0===t.attempts.length},c=function(){return t.stage.join("")!==t.attempts[t.attempts.length-1].solution.join("")};return e()&&(n()||c())}return!1}));function c(){t.attempts=N(t.pw,t.attempts,t.stage),t.stage=[],1===t.attempts.length&&(t.startTimestamp=Date.now())}function r(){t.pw=L(t.selectedLength),t.attempts=[],t.stage=[],t.lastAttemptTimestamp=Date.now()}function a(e){t.selectedLength=e}function s(e){t.stage=e}return Object(J["B"])((function(){return t.selectedLength}),(function(){return r()})),{state:t,isWinner:e,isValid:n,submit:c,restart:r,setDifficulty:a,setStage:s}}});n("0946");B.render=O,B.__scopeId="data-v-1425ccd6";var R=B,Y={components:{Game:R},computed:{isFullscreen:function(){return(screen.availHeight||screen.height-30)<=window.innerHeight}}};n("c936");Y.render=r;var q=Y;Object(c["b"])(q).mount("#app")}});
//# sourceMappingURL=app.7c125ffb.js.map