(this["webpackJsonprok-talents"]=this["webpackJsonprok-talents"]||[]).push([[3],{193:function(e,t,a){},194:function(e,t,a){},195:function(e,t,a){},196:function(e,t,a){},197:function(e,t,a){},198:function(e,t,a){},199:function(e,t,a){},202:function(e,t,a){"use strict";a.r(t);var n=a(12),o=a(13),s=a(15),r=a(14),i=a(16),l=a(0),c=a.n(l),p=a(180),m=a(182),d=a.n(m),u=a(18),h=a(19),b=a(181),v=a.n(b),g=a(84),f=a(201),E=(a(193),function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement(f.a,{placement:this.props.placement,style:this.props.style,outOfBoundaries:this.props.outOfBoundaries,arrowProps:this.props.arrowProps,className:this.props.className},c.a.createElement(f.a.Title,null,c.a.createElement("div",{className:"node-tooltip-title"},this.props.talentName),this.props.isShownTalentID&&c.a.createElement("div",{className:"node-tooltip-id"},this.props.talentID),c.a.createElement("div",{style:{clear:"both"}})),c.a.createElement(f.a.Content,{className:"node-tooltip-body"},c.a.createElement("div",{className:"node-tooltip-bg node-tooltip-bg".concat(this.props.value===this.props.max?"-max":"-next")},c.a.createElement("div",null,c.a.createElement("b",null,this.props.value!==this.props.max?"Next level:":"Maxed:")),this.props.text),!this.props.isEmbed&&c.a.createElement("div",{id:"node-tooltip-assign-container"},c.a.createElement(h.a,{className:"node-tooltip-decrease",icon:u.j,size:"2x",onClick:this.props.talentDecrease}),c.a.createElement("span",{className:"node-tooltip-value"},this.props.value+"/"+this.props.max),c.a.createElement(h.a,{className:"node-tooltip-increase",icon:u.k,size:"2x",onClick:this.props.talentIncrease}))))}}]),t}(l.Component)),w=a(9),y=(a(194),function(e){function t(){var e,a;Object(n.a)(this,t);for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(i)))).getStyle=function(){var e={};return e.top=a.props.y,e.left=a.props.x,"node-large"===a.props.type?e.backgroundImage="url(".concat("","/images/talents/").concat(a.props.image,".png)"):e.backgroundImage="url(".concat("","/images/talents/").concat(a.props.color,"GenericSmall.png)"),e},a.setTooltip=function(){var e=a.props.treeData[a.props.treeName][a.props.idx].values;return a.props.value===a.props.max?Object(w.k)(a.props.tooltip,e,a.props.max-1):Object(w.k)(a.props.tooltip,e,a.props.value)},a.talentIncrease=function(){if(a.props.calcPointsRemaining()>0){var e=a.props.treeData[a.props.treeName][a.props.idx].prereq,t=!0,n=[];e.forEach((function(e){a.props.fullTree[e-1]!==Object(w.d)(a.props.treeData[a.props.treeName][e].values)&&(t=!1,n.push(c.a.createElement("li",{key:e},c.a.createElement("strong",null,a.props.treeData[a.props.treeName][e].name))))})),t?a.props.value<a.props.max&&(a.props.changeTalentValue(a.props.color,a.props.idx,a.props.value,"increase"),p.jsPlumb.select({source:document.getElementById("".concat(a.props.treeName+a.props.idx))}).addClass("line-".concat(a.props.color))):a.props.showPrereqToast(n)}else a.props.showPointLimitToast()},a.talentDecrease=function(e){var t=a.props.treeData[a.props.treeName][a.props.idx].dep,n=!0,o=!0,s=!1,r=void 0;try{for(var i,l=t[Symbol.iterator]();!(o=(i=l.next()).done);o=!0){var c=i.value;if(a.props.fullTree[c-1]>0){n=!1;break}}}catch(m){s=!0,r=m}finally{try{o||null==l.return||l.return()}finally{if(s)throw r}}n&a.props.value>0&&(a.props.changeTalentValue(a.props.color,a.props.idx,a.props.value,"decrease"),1===a.props.value&&p.jsPlumb.select({source:document.getElementById("".concat(a.props.treeName+a.props.idx))}).removeClass("line-".concat(a.props.color)))},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.value!==e.value||this.props.nodeSize!==e.nodeSize||this.props.isShownValues!==e.isShownValues||this.props.isShownTalentID!==e.isShownTalentID||this.props.isSpeedMode!==e.isSpeedMode}},{key:"render",value:function(){var e=this,t="node-large"===this.props.type?.31:.21,a=this.props.isShownValues&&0!==this.props.value;return this.props.isSpeedMode?c.a.createElement(x,{talentID:this.props.treeName+this.props.idx,getStyle:this.getStyle,isShownValues:a,nodeSize:this.props.nodeSize,type:this.props.type,compressor:t,value:this.props.value,max:this.props.max,onClick:this.talentIncrease,onContextMenu:function(t){t.preventDefault(),e.talentDecrease()}}):c.a.createElement(S,Object.assign({},this.props,{talentIncrease:this.talentIncrease,talentDecrease:this.talentDecrease,setTooltip:this.setTooltip,getStyle:this.getStyle,compressor:t,nodeSize:this.props.nodeSize,isShownValues:a,isEmbed:this.props.isEmbed}))}}]),t}(l.Component)),S=function(e){return c.a.createElement(g.a,{trigger:"click",placement:"right",rootClose:!0,flip:!0,delay:{show:0,hide:0},overlay:c.a.createElement(E,{calcPointsRemaining:e.calcPointsRemaining,talentDecrease:e.talentDecrease,talentIncrease:e.talentIncrease,isShownTalentID:e.isShownTalentID,isEmbed:e.isEmbed,idx:e.idx,talentID:e.treeName+e.idx,talentName:e.talentName,value:e.value,max:e.max,text:e.setTooltip()})},c.a.createElement(x,{talentID:e.treeName+e.idx,getStyle:e.getStyle,isShownValues:e.isShownValues,nodeSize:e.nodeSize,type:e.type,compressor:e.compressor,value:e.value,max:e.max,onContextMenu:function(e){return e.preventDefault()}}))},x=function(e){return c.a.createElement("div",{"data-testid":e.talentID,id:e.talentID,className:"node ".concat(e.type,"-").concat(e.nodeSize," ").concat(0===e.value?"node-inactive":""),style:e.getStyle(),onClick:e.onClick,onContextMenu:e.onContextMenu},e.isShownValues&&c.a.createElement(v.a,{compressor:e.compressor},c.a.createElement("div",{className:"node-value","data-testid":"node-value"},e.value+"/"+e.max)))},j=y,O=a(44),T=(a(195),function(e){function t(){var e,a;Object(n.a)(this,t);for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(i)))).drawNodes=function(){for(var e=[],t=a.props.treeName,n=1;n<a.props.data.length+1;n++){var o=a.props.treeData[t][n];e.push(c.a.createElement(j,{changeTalentValue:a.props.changeTalentValue,calcPointsRemaining:a.props.calcPointsRemaining,showPrereqToast:a.props.showPrereqToast,showPointLimitToast:a.props.showPointLimitToast,isShownValues:a.props.isShownValues,isShownTalentID:a.props.isShownTalentID,isSpeedMode:a.props.isSpeedMode,isEmbed:a.props.isEmbed,nodeSize:a.props.nodeSize,treeData:a.props.treeData,key:t+n,idx:n,treeName:t,talentName:o.name,image:o.image,tooltip:o.text,type:o.type,value:a.props.data[n-1],max:Object(w.d)(o.values),fullTree:a.props.data,x:o.pos[0]+"%",y:o.pos[1]+"%",color:a.props.color}))}return e},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement(O.a,null,c.a.createElement("div",{id:"tree-".concat(this.props.color),className:"tree-container"},this.drawNodes(),this.props.isShownMouseXY&&c.a.createElement("div",{id:"tree-".concat(this.props.color,"-mouse")},"X: ",parseFloat(this.props.mouseX).toFixed(1)," Y:"," ",parseFloat(this.props.mouseY).toFixed(1))))}}]),t}(l.Component));a(196);var N=function(e){return!!e.commander&&c.a.createElement("div",{id:"tree-center"},c.a.createElement("div",{id:"hexagon-bg"},c.a.createElement("img",{src:"".concat("","/images/ui/hexagon.png"),alt:"Commander Hexagon"})),c.a.createElement("img",{"data-testid":"hexagon-commander",id:"hexagon-commander",src:"".concat("","/images/commanders/").concat(e.commander,".png"),alt:e.commander}),c.a.createElement("div",{id:"hexagon-label-container"},c.a.createElement("div",{className:"hexagon-label hexagon-label-red"},c.a.createElement(v.a,{compressor:.7},c.a.createElement("div",null,e.isShownTotals&&c.a.createElement("div",{className:"tree-total","data-testid":"tree-total"},"(".concat(e.calcPointsSpent("red"),")")),Object(w.e)("red",e.commander)))),c.a.createElement("div",{className:"hexagon-label hexagon-label-yellow"},c.a.createElement(v.a,{compressor:.7},c.a.createElement("div",null,e.isShownTotals&&c.a.createElement("div",{className:"tree-total","data-testid":"tree-total"},"(".concat(e.calcPointsSpent("yellow"),")")),Object(w.e)("yellow",e.commander)))),c.a.createElement("div",{className:"hexagon-label hexagon-label-blue"},c.a.createElement(v.a,{compressor:.7},c.a.createElement("div",null,e.isShownTotals&&c.a.createElement("div",{className:"tree-total","data-testid":"tree-total"},"(".concat(e.calcPointsSpent("blue"),")")),Object(w.e)("blue",e.commander))))))},P=a(11);a(197);var D=function(e){var t={visibility:e.show?"visible":"hidden",fontSize:e.embed?"0.9em":""};return c.a.createElement("div",{id:"banner","data-testid":"banner",style:t},c.a.createElement("div",null,"Created at"," ",c.a.createElement("a",{href:P.e,target:"_blank",rel:"noopener noreferrer"},P.e.split("//")[1])),c.a.createElement("img",{src:"".concat("","/icon.svg"),alt:"roktalents banner"}))},I=a(200),k=(a(198),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(r.a)(t).call(this,e))).show=function(){a.setState({open:!0})},a.hide=function(){a.setState({open:!1})},a.state={open:!1},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.header!==e.header||this.props.body!==e.body||this.state.open!==t.open}},{key:"render",value:function(){return c.a.createElement(I.a,{autohide:!0,delay:3e3,show:this.state.open,onClose:this.hide},c.a.createElement(I.a.Header,null,c.a.createElement("strong",{className:"mr-auto"},this.props.header)),c.a.createElement(I.a.Body,null,this.props.body))}}]),t}(l.Component)),C=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(r.a)(t).call(this,e))).show=function(){a.setState({open:!0})},a.hide=function(){a.setState({open:!1})},a.state={open:!1},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.msg!==e.msg||this.state.open!==t.open}},{key:"render",value:function(){return c.a.createElement(I.a,{autohide:!0,delay:4e3,show:this.state.open,onClose:this.hide},c.a.createElement(I.a.Header,null,c.a.createElement("strong",{className:"mr-auto"},"Incomplete Talents")),c.a.createElement(I.a.Body,null,"Upgrade talents to the maximum level first:",this.props.msg))}}]),t}(l.Component),M=(a(199),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(r.a)(t).call(this,e))).resetPanZoom=function(){a.panZoomInstance.moveTo(0,0),a.panZoomInstance.zoomAbs(0,0,1)},a.repaint=function(){p.jsPlumb.repaintEverything()},a.drawLines=function(){a.props.commander&&(p.jsPlumb.deleteEveryEndpoint(),p.jsPlumb.setSuspendDrawing(!0),["red","yellow","blue"].forEach((function(e){var t=Object(w.e)(e,a.props.commander);Object.keys(a.props.treeData[t]).forEach((function(n){var o=0===a.props[e][n-1]?"":"line-".concat(e);a.props.treeData[t][n].prereq.forEach((function(e){p.jsPlumb.connect({source:document.getElementById("".concat(t).concat(n)),target:document.getElementById("".concat(t).concat(e)),endpoint:["Dot",{cssClass:"line-endpoint",radius:1}],connector:["Straight",{cssClass:"line ".concat(o)}],anchors:[["Perimeter",{shape:"Circle"}],["Perimeter",{shape:"Circle"}]]})}))}))})),p.jsPlumb.setSuspendDrawing(!1,!0))},a.toggleMouseListeners=function(){a.props.isShownMouseXY?window.addEventListener("mousemove",a.setMousePosition):window.removeEventListener("mousemove",a.setMousePosition)},a.setMousePosition=function(e){var t=document.getElementById("tree-red").getBoundingClientRect(),n=document.getElementById("tree-yellow").getBoundingClientRect(),o=document.getElementById("tree-blue").getBoundingClientRect();setTimeout(a.setState({redX:(e.clientX-t.left+window.scrollX)/t.width*100,redY:(e.clientY-t.top+window.scrollY)/t.height*100,yellowX:(e.clientX-n.left+window.scrollX)/n.width*100,yellowY:(e.clientY-n.top+window.scrollY)/n.height*100,blueX:(e.clientX-o.left+window.scrollX)/o.width*100,blueY:(e.clientY-o.top+window.scrollY)/o.height*100}),2e3)},a.showPrereqToast=function(e){a.setState({prereqMsg:e},(function(){a.prereqToastRef.show()}))},a.showPointLimitToast=function(){a.pointLimitToastRef.show()},a.state={prereqMsg:""},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.repaint);var e=this;if(p.jsPlumb.ready((function(){p.jsPlumb.setContainer(document.getElementById("tree-square-content")),e.drawLines()})),!Object(w.i)()){var t=document.querySelector("#tree-square-content");this.panZoomInstance=d()(t,{minZoom:1,maxZoom:3,pinchSpeed:.5,zoomDoubleClickSpeed:1,bounds:!0,boundsPadding:.5,smoothScroll:!1,onTouch:function(e){return!1},filterKey:function(e){return!0}}),this.panZoomInstance.on("transform",(function(e){document.body.click()}))}}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.repaint)}},{key:"render",value:function(){var e=this,t={changeTalentValue:this.props.changeTalentValue,calcPointsRemaining:this.props.calcPointsRemaining,showPrereqToast:this.showPrereqToast,showPointLimitToast:this.showPointLimitToast,isShownValues:this.props.isShownValues,isShownMouseXY:this.props.isShownMouseXY,isShownTalentID:this.props.isShownTalentID,isSpeedMode:this.props.isSpeedMode,nodeSize:this.props.nodeSize,treeData:this.props.treeData,commander:this.props.commander};return c.a.createElement("div",{id:"tree-panel","data-testid":"tree-panel"},c.a.createElement(C,{ref:function(t){return e.prereqToastRef=t},msg:this.state.prereqMsg}),c.a.createElement(k,{ref:function(t){return e.pointLimitToastRef=t},header:"Talent Limit",body:"You have spent the maximum number of talent points"}),this.props.dataVersion<P.d&&c.a.createElement("div",{"data-testid":"version-warning",id:"version-warning"},"Warning: this build uses an ",c.a.createElement("br",null)," old version of the game data"),this.props.isEmbed?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{"data-testid":"embed-message",id:"embed-message"},"View full build:"," ",c.a.createElement("a",{href:Object(w.f)(),target:"_blank",rel:"noopener noreferrer"},Object(w.a)(this.props.commander,this.props.red,this.props.yellow,this.props.blue),c.a.createElement(h.a,{id:"external-icon",icon:u.g}))),c.a.createElement(D,{show:!0,embed:!0})):c.a.createElement(D,{show:!1,embed:!1}),c.a.createElement("div",{id:"tree-square-container"},c.a.createElement("div",{id:"tree-square-section"},c.a.createElement("div",{id:"tree-square-content"},c.a.createElement(T,Object.assign({},t,{color:"red",treeName:Object(w.e)("red",this.props.commander),data:this.props.red,mouseX:this.state.redX,mouseY:this.state.redY,isEmbed:this.props.isEmbed})),c.a.createElement(T,Object.assign({},t,{color:"yellow",treeName:Object(w.e)("yellow",this.props.commander),data:this.props.yellow,mouseX:this.state.yellowX,mouseY:this.state.yellowY,isEmbed:this.props.isEmbed})),c.a.createElement(T,Object.assign({},t,{color:"blue",treeName:Object(w.e)("blue",this.props.commander),data:this.props.blue,mouseX:this.state.blueX,mouseY:this.state.blueY,isEmbed:this.props.isEmbed})),c.a.createElement(N,{calcPointsSpent:this.props.calcPointsSpent,isShownTotals:this.props.isShownTotals&&this.props.commander,commander:this.props.commander||"unknown"})))))}}]),t}(l.Component));t.default=M}}]);
//# sourceMappingURL=3.9b59fab8.chunk.js.map