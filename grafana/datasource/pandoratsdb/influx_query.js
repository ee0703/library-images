/*! grafana - v4.0.0-1480439068 - 2016-11-29
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","./query_part","app/core/utils/kbn"],function(a){var b,c,d,e;return{setters:[function(a){b=a},function(a){c=a},function(a){d=a}],execute:function(){e=function(){function a(a,b,c){this.target=a,this.templateSrv=b,this.scopedVars=c,a.policy=a.policy||"default",a.dsType="influxdb",a.resultFormat=a.resultFormat||"time_series",a.tags=a.tags||[],a.groupBy=a.groupBy||[{type:"time",params:["$interval"]},{type:"fill",params:["null"]}],a.select=a.select||[[{type:"field",params:["value"]},{type:"mean",params:[]}]],this.updateProjection()}return a.$inject=["target","templateSrv","scopedVars"],a.prototype.updateProjection=function(){this.selectModels=b["default"].map(this.target.select,function(a){return b["default"].map(a,c["default"].create)}),this.groupByParts=b["default"].map(this.target.groupBy,c["default"].create)},a.prototype.updatePersistedParts=function(){this.target.select=b["default"].map(this.selectModels,function(a){return b["default"].map(a,function(a){return{type:a.def.type,params:a.params}})})},a.prototype.hasGroupByTime=function(){return b["default"].find(this.target.groupBy,function(a){return"time"===a.type})},a.prototype.hasFill=function(){return b["default"].find(this.target.groupBy,function(a){return"fill"===a.type})},a.prototype.addGroupBy=function(a){var b=a.match(/^(\w+)\((.*)\)$/),d=b[1],e=b[2],f=c["default"].create({type:d,params:[e]}),g=this.target.groupBy.length;0===g?this.target.groupBy.push(f.part):"time"===d?this.target.groupBy.splice(0,0,f.part):"tag"===d&&"fill"===this.target.groupBy[g-1].type?this.target.groupBy.splice(g-1,0,f.part):this.target.groupBy.push(f.part),this.updateProjection()},a.prototype.removeGroupByPart=function(a,d){var e=c["default"].getCategories();"time"===a.def.type&&(this.target.groupBy=b["default"].filter(this.target.groupBy,function(a){return"fill"!==a.type}),this.target.select=b["default"].map(this.target.select,function(a){return b["default"].filter(a,function(a){var b=c["default"].create(a);return b.def.category!==e.Aggregations&&b.def.category!==e.Selectors})})),this.target.groupBy.splice(d,1),this.updateProjection()},a.prototype.removeSelect=function(a){this.target.select.splice(a,1),this.updateProjection()},a.prototype.removeSelectPart=function(a,c){if("field"===c.def.type){if(this.selectModels.length>1){var d=b["default"].indexOf(this.selectModels,a);this.selectModels.splice(d,1)}}else{var e=b["default"].indexOf(a,c);a.splice(e,1)}this.updatePersistedParts()},a.prototype.addSelectPart=function(a,b){var d=c["default"].create({type:b});d.def.addStrategy(a,d,this),this.updatePersistedParts()},a.prototype.renderTagCondition=function(a,b,c){var d="",e=a.operator,f=a.value;return b>0&&(d=(a.condition||"AND")+" "),e||(e=/^\/.*\/$/.test(f)?"=~":"="),"=~"!==e&&"!~"!==e?(c&&(f=this.templateSrv.replace(f,this.scopedVars)),">"!==e&&"<"!==e&&(f="'"+f.replace(/\\/g,"\\\\")+"'")):c&&(f=this.templateSrv.replace(f,this.scopedVars,"regex")),d+'"'+a.key+'" '+e+" "+f},a.prototype.getMeasurementAndPolicy=function(a){var b=this.target.policy,c=this.target.measurement||"measurement";return c.match("^/.*/")?a&&(c=this.templateSrv.replace(c,this.scopedVars,"regex")):c='"'+c+'"',b="default"!==b?'"'+this.target.policy+'".':"",b+c},a.prototype.interpolateQueryStr=function(a,c,e){if(!c.multi&&!c.includeAll)return a;if("string"==typeof a)return d["default"].regexEscape(a);var f=b["default"].map(a,d["default"].regexEscape);return f.join("|")},a.prototype.render=function(a){var c=this,d=this.target;if(d.rawQuery)return a?this.templateSrv.replace(d.query,this.scopedVars,this.interpolateQueryStr):d.query;var e,f,g="SELECT ";for(e=0;e<this.selectModels.length;e++){var h=this.selectModels[e],i="";for(f=0;f<h.length;f++){var j=h[f];i=j.render(i)}e>0&&(g+=", "),g+=i}g+=" FROM "+this.getMeasurementAndPolicy(a)+" WHERE ";var k=b["default"].map(d.tags,function(b,d){return c.renderTagCondition(b,d,a)});g+=k.join(" "),g+=(k.length>0?" AND ":"")+"$timeFilter";var l="";for(e=0;e<this.groupByParts.length;e++){var m=this.groupByParts[e];e>0&&(l+="fill"===m.def.type?" ":", "),l+=m.render("")}return l.length&&(g+=" GROUP BY "+l),d.fill&&(g+=" fill("+d.fill+")"),g},a.prototype.renderAdhocFilters=function(a){var c=this,d=b["default"].map(a,function(a,b){return c.renderTagCondition(a,b,!1)});return d.join(" ")},a}(),a("default",e)}}});