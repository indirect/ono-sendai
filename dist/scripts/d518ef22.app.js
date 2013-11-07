(function(){var a,b,c,d,e,f=[].slice;_.mixin({multiSort:function(){var a,b,c;return a=arguments[0],c=2<=arguments.length?f.call(arguments,1):[],b=a.slice(),b.sort(function(a,b){var d,e,f,g;for(f=0,g=c.length;g>f;f++)if(d=c[f],0!==(e=d(a,b)))return e;return e})},concat:function(){var a,b,c,d,e;for(c=1<=arguments.length?f.call(arguments,0):[],b=[],d=0,e=c.length;e>d;d++)a=c[d],null!=a&&(b=b.concat(a));return b},replace:function(){var a,b;return b=arguments[0],a=2<=arguments.length?f.call(arguments,1):[],b.replace.apply(b,a)},filterObj:function(a,b){var c,d;return _.object(function(){var e;e=[];for(c in a)d=a[c],b(c,d)&&e.push([c,d]);return e}())},noop:function(){}}),e=function(a){return function(b,c){return function(){var d,e;return d=1<=arguments.length?f.call(arguments,0):[],e=this,_[a](b,_.bind.apply(_,[c,e].concat(f.call(d))))}}},_.mixin({profile:function(a,b){var c;b?c=a:(b=a,c="");try{return console.profile(c),b()}finally{console.profileEnd(c)}},time:function(a,b){try{return console.time(a),b()}finally{console.timeEnd(a)}},logGroup:function(a,b){try{return console.group(a),b()}finally{console.groupEnd(a)}},profiled:e("profile"),timed:e("time"),logGrouped:e("logGroup")}),a="ąàáäâãåæăćęèéëêìíïîłńòóöôõōøśșțùúüûñçżź",d="aaaaaaaaaceeeeeiiiilnooooooosstuuuunczz",c=RegExp("["+a+"]","g"),b=_.object(_.zip(_.str.chars(a),_.str.chars(d))),_.mixin({stripDiacritics:function(a){return a=String(a).toLowerCase().replace(c,function(a){return b[a]})}})}).call(this),function(){var a,b=[].slice;_.mixin(_.str.exports()),angular.module("deckBuilder",["ui.bootstrap.buttons","ui.bootstrap.tooltip","pasvaz.bindonce"]).config(["$locationProvider",function(b){return a(),"undefined"!=typeof window&&null!==window&&/localhost/.test(window.location.host)?b.html5Mode(!0):b.html5Mode(!1).hashPrefix("!"),FastClick.attach(document.body)}]),a=function(){var a,c,d,e,f,g,h,i;return i=["#000"],c=["#2D053D","#440C59","#60157C","#79209D","#9927BF"],g=_(c).chain().clone().reverse().concat(i,c).map(function(a){return"font-size: 10px; background: "+a+"; color: white; padding: 3px 1px;"}).value(),d=_.repeat("%c ",c.length),e=16,f=_.repeat(" ",e),h=_.center("ONO-SENDAI",e),a=_.center("by scott hyndman",e),_.each([f,h,a,f],function(a){return console.log.apply(console,[""+d+"%c "+a+" "+d].concat(b.call(g)))}),console.log("")}}.call(this),function(){angular.module("deckBuilder").controller("CardsCtrl",["$rootScope","$scope","$window","$log","$q","cardService","urlStateService",function(a,b,c,d,e,f,g){var h;return b.selectedCard=null,e.all([f.getCards(),f.query(b.filter)]).then(function(a){var c,e;return c=a[0],e=a[1],d.debug("Assigning cards with default ordering"),b.cards=e.applyOrdering(c,function(a){return a.id})}),a.broadcastZoomStart=function(){return b.$broadcast("zoomStart")},a.broadcastZoomEnd=function(){return b.$broadcast("zoomEnd")},b.selectCard=function(a){return d.info("Selected card changing to "+a.title),b.selectedCard=a},b.deselectCard=function(){return d.info("Card deselected"),b.selectedCard=null},b.isCardShown=function(a,b){return null!=b[a.id]},h=_.debounce(function(a){return b.$apply(function(){return g.updateUrl(a)})},500),b.$watch("filter",function(a){return h(a),f.query(a).then(function(a){return d.debug("Assigning new query result",a),b.queryResult=a})},!0)}])}.call(this),function(){angular.module("deckBuilder").controller("FiltersCtrl",["$scope","filterUI",function(a,b){var c,d;return a.filterUI=b,d=_.findWhere(b,{name:"general"}),c=a.filter.fieldFilters.faction,a.$watch("filter.side",function(b,e){var f,g,h;if(b!==e){a.filter.activeGroup=d,h=[];for(f in c)g=c[f],h.push(c[f]=!0);return h}}),a.toggleGroup=function(b){return a.filter.activeGroup=a.filter.activeGroup!==b?b:d},a.isActiveGroup=function(a,b){return b?a.name===b.name:!1},a.isGroupShown=function(a,b){return null!=a.side?a.side===b:!0},a.isFieldShown=function(a,b,c,d){return"general"===b.name||c.name===b.name&&(void 0===a.side||a.side===d)},a.isFieldDisabled=function(a,b,c){var d;return"general"===b.name&&(null!=(d=c.hiddenGeneralFields)?d[a.name]:void 0)}}])}.call(this),function(){angular.module("deckBuilder").controller("MainCtrl",["$scope","$http","urlStateService",function(a,b,c){return a.filter=c.generatedQueryArgs,a.grid={zoom:.5},b.get("/data/version.json").success(function(b){return a.version=b.version})}])}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}},d=[].slice;b=function(){function a(){this.ordering={},this.groups={},this.length=0,this._ordinalOffset=0}return a.prototype.addCard=function(a,b,c){return this.length++,null==this.ordering[b.id]&&(this.ordering[b.id]=c+this._ordinalOffset,this.groups[b.id]=b,this._ordinalOffset++),this.ordering[a.id]=c+this._ordinalOffset},a.prototype.isShown=function(a){return null!=this.ordering[a]},a.prototype.applyOrdering=function(a,b){var c=this;return _.sortBy(a,function(a){var d;return null!=(d=c.ordering[b(a)])?d:Number.MAX_VALUE})},a}(),a=function(){function a(a,b,d,f){var g=this;this.$log=b,this.searchService=d,this.filterDescriptors=f,this._augmentCards=c(this._augmentCards,this),this._sortFnFor=c(this._sortFnFor,this),this._groupCards=c(this._groupCards,this),this._buildFilterFunction=c(this._buildFilterFunction,this),this.relevantFilters=c(this.relevantFilters,this),this._enabledTypes=c(this._enabledTypes,this),this._matchesFilter=c(this._matchesFilter,this),this._filterCards=c(this._filterCards,this),this._searchCards=c(this._searchCards,this),this.searchService=d,this._cards=[],this._cardsPromise=a.get(e).then(function(a){var b,c;return g._cards=a.data,c=a.status,b=a.headers,window.cards=g._cards,g.searchService.indexCards(g._cards),g._augmentCards(g._cards),g._cards})}var e,f,g,h,i;return e="/data/cards.json",f={Identity:0,Event:1,Hardware:2,Program:3,Resource:4,Agenda:5,Asset:6,Operation:7,ICE:8,Upgrade:9},g={Anarch:0,Criminal:1,"Haas-Bioroid":2,Jinteki:3,NBN:4,Shaper:5,"Weyland Consortium":6,Neutral:7},i={"Core Set":0,"What Lies Ahead":1,"Trace Amount":2,"Cyber Exodus":3,"A Study in Static":4,"Humanity's Shadow":5,"Future Proof":6,"Creation and Control":7,"Opening Moves":8,"Second Thoughts":9,"Mala Tempora":10,"True Colors":11,"Fear and Loathing":12,"Double Time":13},h={and:function(){var a,b,c,e,f;for(c=arguments[0],a=2<=arguments.length?d.call(arguments,1):[],e=0,f=c.length;f>e;e++)if(b=c[e],!b.apply(null,a))return!1;return!0},"=":function(a,b){return a===b},"<":function(a,b){return b>a},"≤":function(a,b){return b>=a},">":function(a,b){return a>b},"≥":function(a,b){return a>=b}},a.prototype.subTypes={corp:{},runner:{}},a.prototype.comparisonOperators=["=","<","≤",">","≥"],a.prototype.getCards=function(){return this._cardsPromise},a.prototype.query=function(a){var b=this;return null==a&&(a={}),this._cardsPromise.then(function(c){return _.logGroup("Card query",_.timed("Query duration",function(){var d,e,f;return b.$log.debug("Args:",a),d=b._filterCards(a,b._searchCards(a,c)),e=b._groupCards(a,d),f=b._buildQueryResult(a,e),b.$log.debug("Cards matching query: "+f.length),f}))})},a.prototype._searchCards=function(a){var b;return b=a.search,_.trim(b).length>0?this.searchService.search(b):this._cards},a.prototype._filterCards=function(a,b){var c,d,e,f,g,h;for(d=this._enabledTypes(a),e=this._buildFilterFunction(a,d),h=[],f=0,g=b.length;g>f;f++)c=b[f],this._matchesFilter(c,a,{enabledTypes:d,filterFn:e})&&h.push(c);return h},a.prototype._matchesFilter=function(a,b,c){var d,e;return d=c.enabledTypes,e=c.filterFn,(null!=b.side?a.side===b.side:!0)&&(null!=d?d[a.type]:!0)&&(null!=e?e(a):!0)},a.prototype._enabledTypes=function(a){var b,c,d,e;return b=null!=(e=a.activeGroup)?e.name:void 0,null==b||"general"===b?null:(c=this.filterDescriptors[b].cardType,d={},d[c]=!0,d)},a.prototype.relevantFilters=function(a,b){var c,d,e=this;return null==b&&(b=!0),d=["general"],c={},null!=a.activeGroup&&"general"!==a.activeGroup.name&&(d.push(a.activeGroup.name),c=this.filterDescriptors[a.activeGroup.name].excludedGeneralFields||{}),_(d).chain().map(function(a){return e.filterDescriptors[a]}).filter(function(a){return null!=a.fieldFilters}).pluck("fieldFilters").map(function(d){return _.filterObj(d,function(d,f){var g;return g=a.fieldFilters[d],null==c[d]&&(!b||e._isFilterApplicable(f,g,a))})}).map(_.pairs).flatten(!0).object().value()},a.prototype._isFilterApplicable=function(a,b,c){switch(a.type){case"numeric":return null!=b.operator&&null!=b.value;case"search":return null!=c.search&&!!c.search.length;default:return!0}},a.prototype._buildFilterFunction=function(a){var b,c,d=this;return c=this.relevantFilters(a),_.isEmpty(c)?void 0:(b=_(c).chain().map(function(b,c){return d._buildFilter(b,a.fieldFilters[c])}).compact().value(),_.partial(h.and,b))},a.prototype._buildFilter=function(a,b){switch(a.type){case"numeric":return this._buildNumericFilter(a,b);case"inSet":return this._buildInSetFilter(a,b);case"search":return void 0;default:return console.warn("Unknown filter type: "+a.type)}},a.prototype._buildNumericFilter=function(a,b){return function(c){var d,e,f,g,i;for(d=_.isArray(a.cardField)?a.cardField:[a.cardField],g=0,i=d.length;i>g;g++)if(e=d[g],null!=c[e])return f=c[e],h[b.operator](f,b.value);return!1}},a.prototype._buildInSetFilter=function(a,b){return function(c){var d;return d="faction"===a.cardField?""+c.side+": "+c.faction:c[a.cardField],b[a.modelMappings[d]]}},a.prototype._groupCards=function(a,b){var c,d,e;return c=a.groupings,d=_(c).chain().concat(["title"]).map(this._sortFnFor).value(),(e=_(b).chain()).multiSort.apply(e,d).groupBy(function(a){return _.map(c,function(b){return a[b]})}).pairs().map(function(a){return{id:a[0].replace(/,/g," ").toLowerCase(),type:"group",title:a[0].split(","),cards:a[1]}}).value()},a.prototype._buildQueryResult=function(a,c){var d,e;return d=0,e=new b,_(c).each(function(a){return _.each(a.cards,function(b){return e.addCard(b,a,d++)})}),e},a.prototype._sortFnFor=function(a){switch(a){case"type":return function(a,b){return f[a.type]-f[b.type]};case"faction":return function(a,b){return g[a.faction]-g[b.faction]};case"cost":case"factioncost":return function(b,c){return void 0===b[a]||void 0===c[a]?0:b[a]-c[a]};case"setname":return function(a,b){return i[a.setname]-i[b.setname]};default:return function(b,c){return b[a].localeCompare(c[a])}}},a.prototype._augmentCards=function(a){var b,c,d,e,f,g,h,i,j,k;for(k=[],e=0,g=a.length;g>e;e++){for(b=a[e],b.subtypes=null!=b.subtype?b.subtype.split(" - "):[],b.id=b.imagesrc,c=b.side.toLowerCase(),i=b.subtypes,f=0,h=i.length;h>f;f++)d=i[f],null!=this.subTypes[c][d]?this.subTypes[c][d]++:this.subTypes[c][d]=1;switch(b.type){case"ICE":k.push(b.subroutinecount=(null!=(j=b.text.match(/\[Subroutine\]/g))?j.length:void 0)||0);break;case"Identity":k.push(delete b.cost);break;default:k.push(void 0)}}return k},a}(),angular.module("deckBuilder").service("cardService",["$http","$log","searchService","filterDescriptors",function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,arguments,function(){})}])}.call(this),function(){angular.module("deckBuilder").value("filterDefaults",{side:"Corp",groupings:["faction","type"],fieldFilters:{faction:{haasBioroid:!0,jinteki:!0,nbn:!0,weyland:!0,corpNeutral:!0,anarch:!0,criminal:!0,shaper:!0,runnerNeutral:!0},cost:{operator:"="},factionCost:{operator:"="},influenceLimit:{operator:"="},minimumDeckSize:{operator:"="},points:{operator:"="},assetTrashCost:{operator:"="},subroutineCount:{operator:"="},iceStrength:{operator:"="},influence:{operator:"="},upgradeTrashCost:{operator:"="},memoryUnits:{operator:"="},baseLink:{operator:"="}}}).constant("filterUI",[{name:"general",fieldFilters:[{name:"faction",type:"faction",icon:"faction",side:{corp:[{name:"Haas-Bioroid",abbr:"HB",model:"haasBioroid"},{name:"Jinteki",abbr:"J",model:"jinteki"},{name:"NBN",abbr:"NBN",model:"nbn"},{name:"Weyland Consortium",abbr:"W",model:"weyland"},{name:"Neutral",abbr:"N",model:"corpNeutral"}],runner:[{name:"Anarch",abbr:"A",model:"anarch"},{name:"Criminal",abbr:"C",model:"criminal"},{name:"Shaper",abbr:"S",model:"shaper"},{name:"Neutral",abbr:"N",model:"runnerNeutral"}]}},{name:"search",type:"search",placeholder:"Keyword Search",icon:"search"},{name:"cost",type:"numeric",placeholder:"Cost",icon:"credit"},{name:"factionCost",type:"numeric",placeholder:"Influence",icon:"influence",max:5}]},{name:"identities",hiddenGeneralFields:{cost:!0,factionCost:!0},fieldFilters:[{name:"influenceLimit",type:"numeric",placeholder:"Influence Limit",icon:"influence"},{name:"minimumDeckSize",type:"numeric",placeholder:"Min. Deck Size",icon:"minimum-deck-size"},{side:"Runner",name:"baseLink",type:"numeric",placeholder:"Base Link",icon:"link-strength"}]},{name:"agendas",side:"Corp",fieldFilters:[{name:"points",type:"numeric",placeholder:"Agenda Points",icon:"agenda-point"}]},{name:"assets",side:"Corp",fieldFilters:[{name:"assetTrashCost",type:"numeric",placeholder:"Trash Cost",icon:"trash-cost"}]},{name:"operations",side:"Corp"},{name:"ice",side:"Corp",fieldFilters:[{name:"subroutineCount",type:"numeric",placeholder:"# Subroutines",icon:"subroutine"},{name:"iceStrength",type:"numeric",placeholder:"Strength",icon:"strength"}]},{name:"upgrades",side:"Corp",fieldFilters:[{name:"upgradeTrashCost",type:"numeric",placeholder:"Trash Cost",icon:"trash-cost"}]},{name:"events",side:"Runner"},{name:"hardware",side:"Runner"},{name:"programs",side:"Runner",fieldFilters:[{name:"memoryUnits",type:"numeric",placeholder:"Memory Units",icon:"memory-unit"}]},{name:"resources",side:"Runner"}]).constant("filterDescriptors",{general:{fieldFilters:{faction:{type:"inSet",cardField:"faction",modelMappings:{"Corp: Haas-Bioroid":"haasBioroid","Corp: Jinteki":"jinteki","Corp: NBN":"nbn","Corp: Weyland Consortium":"weyland","Corp: Neutral":"corpNeutral","Runner: Anarch":"anarch","Runner: Criminal":"criminal","Runner: Shaper":"shaper","Runner: Neutral":"runnerNeutral"}},search:{type:"search"},cost:{type:"numeric",cardField:["advancementcost","cost"]},factionCost:{type:"numeric",cardField:"factioncost"}}},identities:{cardType:"Identity",excludedGeneralFields:{cost:!0,factionCost:!0},fieldFilters:{influenceLimit:{type:"numeric",cardField:"influencelimit"},minimumDeckSize:{type:"numeric",cardField:"minimumdecksize"},baseLink:{type:"numeric",cardField:"baselink",inclusionPredicate:function(a){return"Runner"===a.side}}}},ice:{cardType:"ICE",fieldFilters:{subroutineCount:{type:"numeric",cardField:"subroutinecount"},iceStrength:{type:"numeric",cardField:"strength"}}},agendas:{cardType:"Agenda",fieldFilters:{points:{type:"numeric",cardField:"agendapoints"}}},assets:{cardType:"Asset",fieldFilters:{assetTrashCost:{type:"numeric",cardField:"trash"}}},operations:{cardType:"Operation"},upgrades:{cardType:"Upgrade",fieldFilters:{upgradeTrashCost:{type:"numeric",cardField:"trash"}}},events:{cardType:"Event"},hardware:{cardType:"Hardware"},programs:{cardType:"Program",fieldFilters:{memoryUnits:{type:"numeric",cardField:"memoryunits"}}},resources:{cardType:"Resource"}})}.call(this),function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a){var c,d,e,f,g,h;for(this.$q=a,this._tokenize=b(this._tokenize,this),this._mapResultsToCards=b(this._mapResultsToCards,this),this.search=b(this.search,this),this.indexCards=b(this.indexCards,this),c=[{lbl:"stripDiacritics",fn:_.stripDiacritics}],f=0,g=c.length;g>f;f++)h=c[f],e=h.lbl,d=h.fn,lunr.Pipeline.registerFunction(d,e);lunr.tokenizer=this._tokenize,this._index=lunr(function(){var a,b;for(a=0,b=c.length;b>a;a++)d=c[a].fn,this.pipeline.before(function(){},d);return this.ref("title"),this.field("title",{boost:10}),this.field("type"),this.field("subtype"),this.field("text")}),window.searchIndex=this._index,window.search=this._index.search.bind(this._index)}return a.prototype.indexCards=function(a){var b,c,d,e;for(this.cards=a,this._cardsByTitle=_.object(_.zip(_.pluck(a,"title"),a)),e=this.cards,c=0,d=e.length;d>c;c++)b=e[c],this._index.add(b);return this._index.pipeline.remove(lunr.stopWordFilter)},a.prototype.search=function(a){return this._mapResultsToCards(this._index.search(a))},a.prototype._mapResultsToCards=function(a){var b,c,d,e;if(null==a)return[];for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this._cardsByTitle[b.ref]);return e},a.prototype._tokenize=function(a){return arguments.length&&null!=a?_.isArray(a)?a.map(function(a){return a.toLowerCase()}):_(a.toString()).chain().replace(/[\[\]{}'"]/g," ").stripTags().words().map(function(a){return a.split("-")}).flatten().map(function(a){return a.replace(/[^\w\d\s]+$/," ").replace(/^[^\w\d\s]+/," ").trim()}).value():[]},a}(),angular.module("deckBuilder").service("searchService",["$q",function(b){return new a(b)}])}.call(this),function(){var a;a=function(){function a(a,c,d){this.$window=a,this.$q=c,this.$log=d,this.div=this.$window.document.createElement("div"),this.transitionProperty=this.getVendorPropertyName("transition"),this.transitionEndEvent=b[this.transitionProperty]}var b;return b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},a.prototype.getVendorPropertyName=_.memoize(function(a){var b,c,d,e,f;if(a in this.div.style)return a;if(c=["Moz","Webkit","O","ms"],a=_.capitalize(a),a in this.div.style)return a;for(e=0,f=c.length;f>e;e++)if(b=c[e],d=b+a,d in this.div.style)return d}),a.prototype.cssDurationToMs=function(a){var b;return(b=a.match(/(\d+)ms/))?Number(b[1]):(b=a.match(/(\d+(\.\d+)?)s/))?1e3*Number(b[1]):void 0},a.prototype.cssPixelLengthToNumber=function(a){var b;return a?(b=a.match(/^(\d+(\.\d+)?)/),Number(b[1])):0},a.prototype.getTransitionDuration=function(a,b){var c;return null==b&&(b=this.$window.getComputedStyle(this._node(a))),c=b[this.transitionProperty].split(/\s+/),this.cssDurationToMs(c[1])+this.cssDurationToMs(c[3])},a.prototype.getTransitionEndPromise=function(a){var b,c,d=this;return b=this.$q.defer(),a.one(this.transitionEndEvent,c=function(){return d.$log.debug("Transition complete"),b.resolve()}),b.promise},a.prototype._node=function(a){return a instanceof $?a.get(0):a},a}(),angular.module("deckBuilder").service("cssUtils",["$window","$q","$log",function(b,c,d){return new a(b,c,d)}])}.call(this),function(){"use strict";var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c,d,e,f,g){var h;this.$rootScope=a,this.$location=c,this.$log=d,this.cardService=e,this.filterUI=f,this.filterDefaults=g,this._locationChanged=b(this._locationChanged,this),this.generatedUrl=void 0,this.$rootScope.$on("$locationChangeSuccess",this._locationChanged),h=_.find(this.filterUI,function(a){return"general"===a.name}).fieldFilters,this.factionUiMappingsBySide=_.find(h,function(a){return"faction"===a.name}).side,this.generatedQueryArgs=this._queryArgsFromUrl()}var c,d;return c={"=":"eq","<":"lt","≤":"lte",">":"gt","≥":"gte"},d=_.invert(c),a.prototype.updateUrl=function(a){var b,d,e,f,g,h,i,j,k;this.$log.debug("Updating URL with latest query arguments"),g=this.cardService.relevantFilters(a),i="/cards/"+a.side.toLowerCase(),"general"!==a.activeGroup.name&&(i+="/"+a.activeGroup.name),h={};for(e in g)switch(d=g[e],b=a.fieldFilters[e],d.type){case"numeric":k=b.value,j=c[b.operator],h[e]=""+j+":"+k;break;case"inSet":h[e]=function(){switch(e){case"faction":return f=this.factionUiMappingsBySide[a.side.toLowerCase()],this._factionSearchVal(f,b);default:return this.$log.warn("No URL mapping available for "+e),""}}.call(this);break;case"search":h.search=a.search}return this.$location.url(i).search(h).replace(),this.generatedUrl=this.$location.url()},a.prototype._factionSearchVal=function(a,b){return _.every(a,function(a){return b[a.model]})?"all":_(a).chain().filter(function(a){return b[a.model]}).pluck("abbr").value().join(",")},a.prototype._locationChanged=function(){return this.$location.url()!==this.generatedUrl?(this.$log.debug("URL changed to "+this.$location.url()),this.generatedQueryArgs=this._queryArgsFromUrl(),this.$rootScope.$broadcast("urlFilterChange",this.generatedQueryArgs)):void 0},a.prototype._cardsUrlMatcher=/^\/cards\/(corp|runner)(?:\/([^\/]+))?/,a.prototype._queryArgsFromUrl=function(){var a,b,c,e,f,g,h,i,j,k,l,m,n,o,p;if(a=this.$location.path().match(this._cardsUrlMatcher),h=angular.copy(this.filterDefaults),h.activeGroup=_.findWhere(this.filterUI,{name:"general"}),null!=a){m=a[1],h.side=_.capitalize(m),a[2]&&(h.activeGroup=null!=(o=_.findWhere(this.filterUI,{name:a[2]}))?o:h.activeGroup),k=this.cardService.relevantFilters(h,!1),l=this.$location.search();for(f in k)if(b=k[f],null!=l[f])switch(b.type){case"search":h.search=l.search;break;case"numeric":if(p=l[f].split(":"),g=p[0],n=p[1],null==n||null==g||null==d[g])break;h.fieldFilters[f]={operator:d[g],value:Number(n)};break;case"inSet":if("all"===l[f])break;"faction"===f?(c=l[f].split(","),j=this.factionUiMappingsBySide[m],e=_.object(_.map(c,function(a){return _.findWhere(j,{abbr:a}).model}),[]),i=h.fieldFilters.faction,_.each(i,function(a,b){return i[b]=b in e})):this.$log.warn("No URL mapping available for "+f)}}else this.$log.debug("No matching URL pattern. Assigning query arg defaults");return h},a}(),angular.module("deckBuilder").service("urlStateService",["$rootScope","$location","$log","cardService","filterUI","filterDefaults",function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,arguments,function(){})}])}.call(this),function(){angular.module("deckBuilder").directive("nrCardsView",["$window","$q","$log","$animate","$timeout","cssUtils",function(a,b,c,d,e,f){return{restrict:"E",transclude:!0,templateUrl:"/views/directives/nr-cards-view.html",scope:{queryResult:"=",zoom:"=",selectedCard:"="},link:function(d,g){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V;return C="grid",i=g.find(".content-container"),j=i.width(),E=20,T=10,r=6,u=!1,p=$([]),o=$([]),q=null,l=null,m=null,J=[],A=[],t=[],P={},Q=f.getVendorPropertyName("transform"),H=null,w=1,s=function(){var a;return j!==(a=i.width())?(j=a,!0):!1},v=function(a){var b;return b=function(a){return a.attributes["grid-id"].value},p=i.find(".grid-item"),o=i.find(".grid-header"),q=$(a.applyOrdering(p.add(o),b)),p=$(a.applyOrdering(p,b)),o=$(a.applyOrdering(o,b))},n=function(a,b,c){var e,f,g;return null==c&&(c=!1),g=c?1:d.zoom*w,f=""+a+":"+w,null==P[f]&&(P[f]={width:parseFloat(b.css("width")),height:parseFloat(b.css("height"))}),e=P[f],{width:e.width*g,height:e.height*g}},y=function(a){return a.classList.contains("grid-item")},x=function(a){return a.classList.contains("grid-header")},G=function(){var a,b,c,d,e,k,l,m,o,p,s,u,v,w,x,z,B,C,D,F,G,I,K,L,M,O;if(u=q,u.length){for(e=$(_.find(u,function(a){return a.classList.contains("grid-header")})),z=!0,K=$(_.find(u,function(a){return a.classList.contains("grid-item")&&(z=!z)})),s=n("item",K),m=n("header",e,!0),a=j-2*r,B=Math.floor((a+E)/(s.width+E)),C=B-1,D=Math.ceil(u.length/B),l=(a-B*s.width)/C,d=function(){var a,b;for(b=[],o=a=0;B>=0?B>a:a>B;o=B>=0?++a:--a)b.push(o*(s.width+l)+r);return b}(),J=[],A=[],t=[],k=0,b=0,c=function(a,b){var c,d,e,f;return null==b&&(b=!1),c=_.last(J),d=b?m.height:s.height,d+=2*T,f=c?c.position+c.height:0,e={firstElement:a,height:d,position:f},J.push(e),e},w=0,o=M=0,O=u.length;O>M;o=++M)p=u[o],y(p)?(G=Math.floor(k/B)+b,G===J.length&&(H.isShown(p.attributes["grid-id"].value)&&(w=G),c(p)),p.idx=A.push({x:d[k%B],y:J[G].position+T})-1,p.row=G,k++):(I=c(p,!0),p.idx=t.push({x:0,y:I.position+T})-1,p.row=J.length-1,b=J.length,k=0);return h(),N(),v=J[w],x=v.position+v.height,F=function(){return i.height(x)},g.hasClass("transitioned")?(L=f.getTransitionEndPromise(K),x>i.height()?(F(),L):L.then(F)):F()}},F=function(){var a;a=p,!a.length},D=function(a){var c,d;return null==a&&(a=!1),d=a?k():b.when(),c="grid"===C?G:F,d.then(c).then(function(){return a?R():void 0})},B=_.debounce(D,300),h=function(){var a,b,c,e,f,g,h,i,j,k,l;if(!_.isEmpty(A))for(c=p,e=c.length,a=i=0,k=A.length;k>i&&(h=A[a],a!==p.length);a=++i)b=p[a],H.isShown(b.attributes["grid-id"].value)?($(b).removeClass("hidden"),f="translate3d("+h.x+"px, "+h.y+"px, 0)                          scale("+Number(d.zoom)*w+")",g=e-1,b.style.zIndex!==g&&(b.style.zIndex=g),b.style[Q]!==f&&(b.style[Q]=f)):$(b).addClass("hidden");if(!_.isEmpty(t))for(c=o,e=c.length,a=j=0,l=t.length;l>j&&(h=t[a],a!==o.length);a=++j)b=o[a],b.style.zIndex=e-a,b.style[Q]="translate3d("+t[a].x+"px, "+t[a].y+"px, 0)"},U=function(){return s()?(c.debug("Laying out grid (grid width change)"),D(!1)):void 0},$(a).resize(U),M=g.parents(".scrollable").first(),N=function(){var a,b;return null==l||J.length<=l.row?M.scrollTop(0):(b=J[l.row],a=b.position+b.height*m,M.scrollTop(a))},L=function(){var a,b,d;if(!u)return d=M.scrollTop(),a=_.sortedIndex(J,{position:d},function(a){return a.position})-1,0>a&&(a=0),b=J[a],l!==b.firstElement&&c.debug('New focus element determined "%s"',$(b.firstElement).attr("title")),l=b.firstElement,m=(d-b.position)/b.height},M.scroll(_.debounce(L,100)),z=function(){return d.zoom>.35},S=function(){return d.zoom>.5?1:d.zoom>.35?2:void 0},k=function(){var a;return a=3,c.debug("Downscaling grid items to 1/"+a),K(a)},R=function(){var a;return z()?(a=S(),c.debug("Upscaling grid items to 1/"+a),K(a)):(c.debug("Upscaling not performed (zoom level too low)"),b.when())},K=function(a){var c;return w===a?b.when():(c=g.hasClass("transitioned"),g.removeClass("transitioned"),g.removeClass("downscaled-1-"+w),w=a,g.toggleClass("downscaled-1-"+a,1!==a),h(),c?e(function(){return g.toggleClass("transitioned",c)}):b.when())},O=function(a){return C=a?"detail":(c.debug("No cards selected. Displaying cards in grid mode"),"grid"),B()},d.$watch("selectedCard",O),I=function(a){c.debug("Laying out grid (query)"),H=a,e(function(){return v(H),D(g.hasClass("transitioned"))})},d.$watch("queryResult",I),d.$on("zoomStart",function(){return"function"==typeof console.groupCollapsed&&console.groupCollapsed("Zoom"),e(function(){return k()}),u=!0}),d.$on("zoomEnd",function(){return c.debug("New zoom level: "+d.zoom),R(),u=!1,"function"==typeof console.groupEnd?console.groupEnd("Zoom"):void 0}),V=function(){return u?D():B()},d.$watch("zoom",V)}}}])}.call(this),function(){angular.module("deckBuilder").directive("nrNav",function(){return{templateUrl:"/views/directives/nr-nav.html",replace:!0,restrict:"E"}})}.call(this),function(){angular.module("deckBuilder").directive("numericFilter",["cardService",function(a){return{templateUrl:"/views/directives/nr-numeric-filter.html",scope:{filter:"=filterAttr",placeholder:"@",id:"@",max:"@",outerDisabled:"@uiDisabled"},restrict:"E",link:function(b,c){var d,e;return b.comparisonOperators=a.comparisonOperators,e=c.find("input"),e.keydown(jwerty.event("esc",function(){return b.$apply(function(){return b.filter.value=void 0})})),d=!0,b.$watch("filter.operator",function(){return d?d=!1:e.focus()}),b.$watch("outerDisabled",function(a){return b.uiDisabled="true"===a?!0:!1})}}}])}.call(this),function(){angular.module("deckBuilder").directive("nrSubnav",function(){return{templateUrl:"/views/directives/nr-subnav.html",replace:!1,restrict:"E"}})}.call(this),function(){angular.module("deckBuilder").directive("subtypeFilter",function(){return{template:"<div></div>",restrict:"E",link:function(){}}})}.call(this),function(){angular.module("deckBuilder").directive("uiAllOrOneBox",["$parse",function(a){return{restrict:"A",require:"ngModel",link:function(b,c,d,e){var f,g;return g=a(d.uiAllOrOneBox),f=d.uiAllOrOneBoxField,e.$render=function(){var a,d;return d=g(b),a=_.all(d,function(a){return a})?!1:e.$modelValue,c.toggleClass("active",a)},c.on("click",function(){var a,d,h;if(d=g(b),c.hasClass("active"))for(a in d)h=d[a],d[a]=!0;else{for(a in d)h=d[a],d[a]=!1;d[f]=!0}return b.$apply(function(){return e.$render()})})}}}])}.call(this),function(){angular.module("deckBuilder").directive("dropdownToggle",["$document","$location",function(a){var b,c;return c=null,b=function(){},{restrict:"CA",link:function(d,e){return d.$watch("$location.path",function(){return b()}),e.parent().bind("click",function(){return b()}),e.bind("click",function(d){var f,g;return g=e===c,d.preventDefault(),d.stopPropagation(),c&&b(),g?void 0:(f=e.parent(),f.addClass("open"),f.find(".dropdown-menu a:first").focus(),c=e,b=function(d){return d&&(d.preventDefault(),d.stopPropagation()),a.unbind("click",b),e.parent().removeClass("open"),b=angular.noop,c=null},a.bind("click",b))})}}}]).directive("dropdownMenu",["$document",function(a){return{restrict:"CA",link:function(b,c){var d,e;return d=c.parent(),e=d.find(".dropdown-toggle"),c.keydown(function(b){var f,g,h;if(jwerty.is("esc/up/down/enter/space",b)&&(b.preventDefault(),b.stopPropagation(),!c.is(".disabled, :disabled"))){if(g=d.hasClass("open"),jwerty.is("esc",b))return e.click(),e.focus(),void 0;if(jwerty.is("enter/space",b))return $(b.target).click(),void 0;if(h=c.find("a"),!_.isEmpty(h))return f=h.index(a.attr("activeElement")),jwerty.is("up",b)&&f>0?f--:jwerty.is("down",b)&&f<h.length-1&&f++,h.eq(f).focus()}})}}}])}.call(this),function(){angular.module("deckBuilder").directive("uiHotkey",["$log",function(a){return jwerty.key("tab",function(){}),{restrict:"A",link:function(b,c,d){var e;return a.debug("Binding element to %s %o",d.uiHotkey,c.get(0)),e=function(a){return a.preventDefault(),c.is("button, .btn")?a.click():c.focus().select()},d.uiHotkey?jwerty.key(d.uiHotkey,e):void 0}}}])}.call(this),function(){var a;a=function(a,b){var c;switch(b){case"type":switch(a){case"Agenda":case"Asset":case"Operation":case"Upgrade":case"Event":case"Program":case"Resource":return""+a+"s";case"Identity":return"Identities";default:return a}break;case"cost":return a=parseInt(a),_.isNaN(a)?"Cost N/A":(c=""+a+" Credit",(0===a||a>1)&&(c+="s"),c);case"factioncost":return""!==a?""+a+" Influence":"Influence N/A";default:return a}},angular.module("deckBuilder").filter("primaryGroupTitle",function(){return function(b,c){return c.length>1?a(b[1],c[1]):a(b[0],c[0])}}).filter("secondaryGroupTitle",function(){return function(b,c){return c.length>1?a(b[0],c[0]):""}})}.call(this);