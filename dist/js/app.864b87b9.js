(function(e){function t(t){for(var a,o,c=t[0],l=t[1],d=t[2],s=0,u=[];s<c.length;s++)o=c[s],i[o]&&u.push(i[o][0]),i[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);h&&h(t);while(u.length)u.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,c=1;c<n.length;c++){var l=n[c];0!==i[l]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},i={app:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var h=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2474:function(e,t,n){},"54f6":function(e,t,n){"use strict";var a=n("2474"),i=n.n(a);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("3a0f"),n("a3a3"),n("4d0b");var a=n("329b"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("vueAuth",{attrs:{"tree-data":e.treeData,expand:!0}})],1)},r=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"yn-authtree"},[n("ul",{staticClass:"yn-authtree-list",attrs:{id:e.id}},e._l(e.treeData,function(t,a){return n("vueAuthtreeNode",{key:a,attrs:{"item-data":t,expand:e.expand,onexpand:e.onexpand,expandLevel:e.expandLevel,onchange:e.onchange,onTextClick:e.onTextClick,"auth-tree-id":e.id}})}))])},c=[],l=(n("25d7"),n("5a09"),n("84fb"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"authtree-node",class:{combination:e.hasChildren,leaf:!e.hasChildren,expanded:e.isExpand,shrink:!e.isExpand}},[n("div",{staticClass:"authtree-node-content"},[n("div",{staticClass:"node-content-inner"},[n("label",{staticClass:"authtree-node-checkbox",class:{checked:e.itemData.checked,disabled:e.itemData.disabled,readonly:e.itemData.readonly,indeterminate:e.indeterminate}},[e._m(0),n("input",{staticClass:"checkbox_original",attrs:{type:"checkbox",name:e.itemData.name,disabled:e.itemData.disabled,readonly:e.itemData.readonly},domProps:{value:e.itemData.value,checked:e.itemData.checked},on:{change:e.checkboxChange}})]),n("span",{staticClass:"checkbox-label-text",on:{click:function(t){return t.stopPropagation(),e.textClick(t)}}},[e._v(e._s(e.itemData.text))]),e.hasChildren?n("span",{staticClass:"authtree-node-btn expand-btn",on:{click:function(t){t.stopPropagation(),e.expandNode(!0)}}},[n("span",{staticClass:"iconfont icon-zhankai"})]):e._e(),e.hasChildren?n("span",{staticClass:"authtree-node-btn shrink-btn",on:{click:function(t){t.stopPropagation(),e.expandNode(!1)}}},[n("span",{staticClass:"iconfont icon-shousuo1"})]):e._e()])]),e.hasChildren?n("ul",{staticClass:"authtree-children"},e._l(e.itemData.children,function(t,a){return n("VueAuthtreeNode",{key:a,attrs:{"item-data":t,expand:e.expand,onexpand:e.onexpand,expandLevel:e.expandLevel,onchange:e.onchange,onTextClick:e.onTextClick,"auth-tree-id":e.authTreeId}})})):e._e()])}),d=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"checkbox-view"},[n("i",{staticClass:"iconfont icon-xuanzhong"}),n("i",{staticClass:"iconfont icon-hengxian"})])}],h=(n("cf54"),{name:"VueAuthtreeNode",props:{itemData:{type:Object,default:function(){return{}}},expand:{type:Boolean,default:!1},expandLevel:{type:Number,default:-1},onexpand:{type:Function,default:null},onchange:{type:Function,default:null},onTextClick:{type:Function,default:null},authTreeId:{type:String,default:""}},data:function(){return{isExpand:this.expand||!1,indeterminate:!1}},methods:{expandNode:function(e){if(this.onexpand&&"function"===typeof this.onexpand){var t=this.onexpand(this.itemData,this._expandNode);if(!1===t)return}this._expandNode(!!e)},checkboxChange:function(e){var t=e.currentTarget||e.target,n=t.checked,a=this.$children&&this.$children.length>0;this.itemData.readonly||(this.itemData.checked=n,!n&&a&&(this.indeterminate=!1),a&&this.setChildValue(this,n),this.setParentValue(this.$parent,n),this.onchange&&"function"===typeof this.onchange&&this.onchange(this.itemData,this))},setChildValue:function(e,t){var n=this;e.$children&&e.$children.length>0&&e.$children.forEach(function(e){e.itemData.checked=t,e.$children&&e.$children.length&&(t||(e.indeterminate=!1),n.setChildValue(e,t))})},setParentValue:function(e,t){if("VueAuthtreeNode"===e.$options.name){if(t){var n=this.childCheckedAll(e.$children);e.itemData.checked=t,e.indeterminate=!n&&t}else{var a=this.childNotCheckedAll(e.$children);a?(e.itemData.checked=t,e.indeterminate=!1):e.indeterminate=!0}this.setParentValue(e.$parent,t)}},childCheckedAll:function(e){var t=!0;if(0!==e.length){for(var n=0,a=e.length;n<a;n++){var i=e[n];if(!i.itemData.checked){t=!1;break}i.$children&&i.$children.length>0&&(t=this.childCheckedAll(i.$children))}return t}},childNotCheckedAll:function(e){var t=!0;if(0!==e.length){var n=[];this._forEachChildren(e,n);for(var a=n.length-1;a>=0;a--)if(n[a].checked){t=!1;break}return t}},textClick:function(){this.onTextClick&&"function"===typeof this.onTextClick&&this.onTextClick(this.itemData,this)},_forEachChildren:function(e,t){var n=this;return e.forEach(function(e){t.push(e.itemData),e.$children&&e.$children.length>0&&n._forEachChildren(e.$children,t)}),t},_expandNode:function(e){this.isExpand=!!e,this.calWidth()},_calculateLevel:function(e){var t=0;return"VueAuthtreeNode"===e.$options.name&&(t++,t+=this._calculateLevel(e.$parent)),t},calWidth:function(){var e=this;this.$nextTick(function(){var t=document.getElementById(e.authTreeId),n=t.cloneNode(!0),a=document.createElement("div"),i="position: absolute;top: -9999px;opacity: 0;width: 9999px;",r="display: inline-block;width: auto;opacity: 0;";a.style.cssText=i,n.id="",n.style.cssText=r,a.appendChild(n),document.body.appendChild(a);var o=setTimeout(function(){t.style.width=n.clientWidth+"px",document.body.removeChild(a),clearTimeout(o)},20)})}},computed:{hasChildren:function(){return this.itemData.children&&this.itemData.children.length>0}},mounted:function(){if(this.hasChildren){var e=this.childCheckedAll(this.$children);this.indeterminate=this.itemData.checked&&!e}this.expand&&(this.expandLevel>0&&this._calculateLevel(this)>this.expandLevel&&this.$parent._expandNode(!1),this.calWidth())}}),s=h,u=(n("54f6"),n("048f")),p=Object(u["a"])(s,l,d,!1,null,"ff84e3b4",null);p.options.__file="VueAuthtreeNode.vue";var f=p.exports,m={name:"VueAuthtree",props:{treeData:{type:Array,default:function(){return[]}},expand:{type:Boolean,default:!1},expandLevel:{type:Number,default:-1},onexpand:{type:Function,default:null},onchange:{type:Function,default:null},onTextClick:{type:Function,default:null}},data:function(){return{version:"1.0.0",id:"ynAuthTree_"+(new Date).getTime()+"_"+Math.random().toString(32).substr(2)}},methods:{getCheckedNodes:function(e,t){e=!!e,t=!!t;var n=[];return this.tiledData.forEach(function(a){a.checked&&(e||t?e&&!t?a.disabled||n.push(a):!e&&t&&(a.readonly||n.push(a)):n.push(a))}),n},getCheckedValues:function(e,t){var n=this.getCheckedNodes(e,t),a=[];return n.forEach(function(e){a.push(e.value)}),a},_tiled:function(e){var t=this,n=[];return 0==e.length?e:(e.forEach(function(e){n.push(e),e.children&&Array.prototype.push.apply(n,t._tiled(e.children))}),n)}},components:{vueAuthtreeNode:f},computed:{tiledData:function(){return this._tiled(this.treeData)}}},x=m,v=(n("b94a"),Object(u["a"])(x,o,c,!1,null,"10d80099",null));v.options.__file="VueAuthtree.vue";var y=v.exports,k={name:"app",data:function(){return{treeData:[{text:"小学",value:"primarySchool",name:"primary_school",checked:!1,disabled:!1,readonly:!1,children:[{text:"语文",value:"language",name:"primary_school",checked:!0,disabled:!1,readonly:!1},{text:"数学",value:"mathematics",name:"primary_school",checked:!1,disabled:!1,readonly:!1,children:[{text:"数学-上册",value:"mathematics1",name:"primary_school",checked:!1,disabled:!1,readonly:!1},{text:"数学-下册",value:"mathematics2",name:"primary_school",checked:!1,disabled:!1,readonly:!1,children:[{text:"数学-下册1",value:"mathematics2",name:"primary_school",checked:!1,disabled:!1,readonly:!1,children:[{text:"数学-下册11",value:"mathematics21",name:"primary_school",checked:!1,disabled:!1,readonly:!1},{text:"数学-下册112",value:"mathematics212",name:"primary_school",checked:!1,disabled:!1,readonly:!1}]}]}]}]}]}},methods:{onChange:function(e,t){console.log(e)},textClick:function(e){console.log(e)}},components:{vueAuth:y}},b=k,C=Object(u["a"])(b,i,r,!1,null,null,null);C.options.__file="App.vue";var g=C.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(g)}}).$mount("#app")},8645:function(e,t,n){},b94a:function(e,t,n){"use strict";var a=n("8645"),i=n.n(a);i.a}});
//# sourceMappingURL=app.864b87b9.js.map