webpackJsonp([12],{"0pTW":function(t,e){},VZrM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),r=a("exGp"),i=a.n(r),c=a("teIl"),d=a("TVmP"),o={data:function(){return{id:null,pageIndex:1,pageSize:100,cards:[],activeIndex:null}},methods:{fetch:function(){var t=this;return i()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("card/category/page",{params:{page_index:t.pageIndex,page_size:t.pageSize,parent_id:0,type:1}});case 2:200==(a=e.sent).code&&(t.cards=a.data.result);case 4:case"end":return e.stop()}},e,t)}))()},toDetail:function(t,e){this.$router.push({name:"mianSecond",params:{id:e}})}},created:function(){var t=this;return i()(s.a.mark(function e(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},mounted:function(){this.fetch()},components:{Header:c.a,Footer:d.a}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("Header"),t._v(" "),a("div",{staticClass:"main"},[t._m(0),t._v(" "),a("div",{staticClass:"star-cards"},t._l(t.cards,function(e,n){return a("div",{key:n,staticClass:"card-item",class:{on:t.activeIndex==n},on:{click:function(a){t.activeIndex=n,t.id=e.id}}},[a("div",{staticClass:"card-des",on:{click:function(a){return t.toDetail(t.activeIndex,e.id)}}},[a("div",{staticClass:"star-name"},[t._v(t._s(e.name))])])])}),0)]),t._v(" "),a("Footer")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rotate-section"},[e("div",{staticClass:"text-box"}),this._v(" "),e("div",{staticClass:"rotate-img"})])}]};var l=a("VU/8")(o,u,!1,function(t){a("0pTW")},"data-v-5e872874",null);e.default=l.exports}});
//# sourceMappingURL=12.536a49acd9d25798ae5b.js.map