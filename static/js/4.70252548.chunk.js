(this["webpackJsonprok-talents"]=this["webpackJsonprok-talents"]||[]).push([[4],{258:function(e,t,a){},261:function(e,t,a){},262:function(e,t,a){},263:function(e,t,a){},264:function(e,t,a){},265:function(e,t,a){},268:function(e,t,a){"use strict";a.r(t);var s=a(7),o=a(8),n=a(10),r=a(9),i=a(6),l=a(11),c=a(0),p=a.n(c),h=a(246),m=a(247),u=a.n(m),d=a(245),v=a.n(d),b=a(122),g=a(69),w=a.n(g),f=a(267),y=a(259),E=a(260),S=a(108),j=a(16),x=a(17),O=a(50),T=(a(258),function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(o.a)(t,[{key:"createPopover",value:function(e){return p.a.createElement(f.a,{placement:this.props.placement,style:this.props.style,outOfBoundaries:this.props.outOfBoundaries,arrowProps:this.props.arrowProps,className:this.props.className},p.a.createElement(v.a,{compressor:2.2},p.a.createElement("div",null,p.a.createElement(f.a.Title,null,p.a.createElement("div",{className:"node-tooltip-title"},this.props.talentName),this.props.isShownTalentID&&p.a.createElement("div",{className:"node-tooltip-id"},this.props.talentID),p.a.createElement("div",{style:{clear:"both"}})),p.a.createElement(f.a.Content,{className:"node-tooltip-body"},p.a.createElement("div",null,p.a.createElement("div",{className:"node-tooltip-bg node-tooltip-bg".concat(this.props.value===this.props.max?"-max":"-next")},p.a.createElement("div",null,p.a.createElement("b",null,this.props.value!==this.props.max?"Next level:":"Maxed:")),this.props.text),p.a.createElement(y.a,{id:"node-tooltip-assign-container"},p.a.createElement(E.a,null,p.a.createElement(S.a,null,this.props.value>0&&p.a.createElement(x.a,{className:"node-tooltip-decrease-button",icon:j.f,size:"2x",onClick:this.props.talentDecrease})),p.a.createElement(S.a,{xs:5},p.a.createElement(v.a,{compressor:.4},p.a.createElement("span",null,this.props.value+"/"+this.props.max))),p.a.createElement(S.a,null,this.props.calcPointsRemaining()>0&&this.props.value!==this.props.max&&p.a.createElement(x.a,{className:"node-tooltip-increase-button",icon:j.g,size:"2x",onClick:this.props.talentIncrease})))))))))}},{key:"render",value:function(){return p.a.createElement(p.a.Fragment,null,p.a.createElement(w.a,{minDeviceWidth:O.c},this.createPopover("desktop")),p.a.createElement(w.a,{maxDeviceWidth:O.c-1},this.createPopover("mobile")))}}]),t}(c.Component)),P=a(28),k=(a(261),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).talentIncrease=a.talentIncrease.bind(Object(i.a)(a)),a.talentDecrease=a.talentDecrease.bind(Object(i.a)(a)),a.setTooltip=a.setTooltip.bind(Object(i.a)(a)),a.getStyle=a.getStyle.bind(Object(i.a)(a)),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.value!==e.value||this.props.nodeSize!==e.nodeSize||this.props.isShownValues!==e.isShownValues||this.props.isShownTalentID!==e.isShownTalentID||this.props.isSpeedMode!==e.isSpeedMode}},{key:"getStyle",value:function(){var e={};return e.top=this.props.y,e.left=this.props.x,"node-large"===this.props.type?e.backgroundImage="url(".concat("","/images/talents/").concat(this.props.image,".png)"):e.backgroundImage="url(".concat("","/images/talents/").concat(this.props.color,"GenericSmall.png)"),e}},{key:"setTooltip",value:function(){var e=this.props.treeData[this.props.treeName][this.props.idx].values;return this.props.value===this.props.max?Object(P.e)(this.props.tooltip,e,this.props.max-1):Object(P.e)(this.props.tooltip,e,this.props.value)}},{key:"talentIncrease",value:function(){var e=this;if(this.props.calcPointsRemaining()>0){var t=this.props.treeData[this.props.treeName][this.props.idx].prereq,a=!0,s=[];t.forEach((function(t){e.props.fullTree[t-1]!==Object(P.c)(e.props.treeData[e.props.treeName][t].values)&&(a=!1,s.push(p.a.createElement("li",{key:t},p.a.createElement("strong",null,e.props.treeData[e.props.treeName][t].name))))})),a?this.props.value<this.props.max&&(this.props.changeTalentValue(this.props.color,this.props.idx,"increase"),h.jsPlumb.select({source:document.getElementById("".concat(this.props.treeName+this.props.idx))}).addClass("line-".concat(this.props.color))):this.props.showPrereqToast(s)}else this.props.showPointLimitToast()}},{key:"talentDecrease",value:function(e){var t=this.props.treeData[this.props.treeName][this.props.idx].dep,a=!0,s=!0,o=!1,n=void 0;try{for(var r,i=t[Symbol.iterator]();!(s=(r=i.next()).done);s=!0){var l=r.value;if(this.props.fullTree[l-1]>0){a=!1;break}}}catch(c){o=!0,n=c}finally{try{s||null==i.return||i.return()}finally{if(o)throw n}}a&this.props.value>0&&(this.props.changeTalentValue(this.props.color,this.props.idx,"decrease"),1===this.props.value&&h.jsPlumb.select({source:document.getElementById("".concat(this.props.treeName+this.props.idx))}).removeClass("line-".concat(this.props.color)))}},{key:"render",value:function(){var e=this,t="node-large"===this.props.type?.3:.2,a=this.props.isShownValues&&0!==this.props.value;return this.props.isSpeedMode?p.a.createElement(N,{talentID:this.props.treeName+this.props.idx,getStyle:this.getStyle,isShownValues:a,nodeSize:this.props.nodeSize,type:this.props.type,compressor:t,value:this.props.value,max:this.props.max,onClick:this.talentIncrease,onContextMenu:function(t){t.preventDefault(),e.talentDecrease()}}):p.a.createElement(D,Object.assign({},this.props,{talentIncrease:this.talentIncrease,talentDecrease:this.talentDecrease,setTooltip:this.setTooltip,getStyle:this.getStyle,compressor:t,nodeSize:this.props.nodeSize,isShownValues:a}))}}]),t}(c.Component)),D=function(e){return p.a.createElement(b.a,{trigger:"click",placement:"right",rootClose:!0,flip:!0,delay:{show:0,hide:0},overlay:p.a.createElement(T,{calcPointsRemaining:e.calcPointsRemaining,talentDecrease:e.talentDecrease,talentIncrease:e.talentIncrease,isShownTalentID:e.isShownTalentID,idx:e.idx,talentID:e.treeName+e.idx,talentName:e.talentName,value:e.value,max:e.max,text:e.setTooltip()})},p.a.createElement(N,{talentID:e.treeName+e.idx,getStyle:e.getStyle,isShownValues:e.isShownValues,nodeSize:e.nodeSize,type:e.type,compressor:e.compressor,value:e.value,max:e.max,onContextMenu:function(e){return e.preventDefault()}}))},N=function(e){return p.a.createElement("div",{"data-testid":e.talentID,id:e.talentID,className:"node ".concat(e.type,"-").concat(e.nodeSize," ").concat(0===e.value?"node-inactive":""),style:e.getStyle(),onClick:e.onClick,onContextMenu:e.onContextMenu},e.isShownValues&&p.a.createElement(v.a,{compressor:e.compressor},p.a.createElement("div",{className:"node-value","data-testid":"node-value"},e.value+"/"+e.max)))},I=k,C=a(43),M=(a(262),function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(o.a)(t,[{key:"drawNodes",value:function(){for(var e=[],t=this.props.treeName,a=1;a<this.props.data.length+1;a++){var s=this.props.treeData[t][a];e.push(p.a.createElement(I,{changeTalentValue:this.props.changeTalentValue,calcPointsRemaining:this.props.calcPointsRemaining,showPrereqToast:this.props.showPrereqToast,showPointLimitToast:this.props.showPointLimitToast,isShownValues:this.props.isShownValues,isShownTalentID:this.props.isShownTalentID,isSpeedMode:this.props.isSpeedMode,nodeSize:this.props.nodeSize,treeData:this.props.treeData,key:t+a,idx:a,treeName:t,talentName:s.name,image:s.image,tooltip:s.text,type:s.type,value:this.props.data[a-1],max:Object(P.c)(s.values),fullTree:this.props.data,x:s.pos[0]+"%",y:s.pos[1]+"%",color:this.props.color}))}return e}},{key:"render",value:function(){return p.a.createElement(C.a,null,p.a.createElement("div",{id:"tree-".concat(this.props.color),className:"tree-container"},this.drawNodes(),this.props.isShownMouseXY&&p.a.createElement("div",{id:"tree-".concat(this.props.color,"-mouse")},"X: ",parseFloat(this.props.mouseX).toFixed(1)," Y:"," ",parseFloat(this.props.mouseY).toFixed(1))))}}]),t}(c.Component)),Y=(a(263),function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return!!this.props.commander&&p.a.createElement("div",{id:"tree-center"},p.a.createElement("div",{id:"hexagon-bg"},p.a.createElement("img",{src:"".concat("","/images/ui/hexagon.png"),alt:"Commander Hexagon"})),p.a.createElement("img",{"data-testid":"hexagon-commander",id:"hexagon-commander",src:"".concat("","/images/commanders/").concat(this.props.commander,".png"),alt:this.props.commander,onClick:function(){e.props.toggleSelect()}}),p.a.createElement("div",{id:"hexagon-label-container"},p.a.createElement("div",{className:"hexagon-label hexagon-label-red"},p.a.createElement(v.a,{compressor:.7},p.a.createElement("div",null,this.props.isShownTotals&&p.a.createElement("div",{className:"tree-total","data-testid":"tree-total"},"(".concat(this.props.calcPointsSpent("red"),")")),Object(P.d)("red",this.props.commander)))),p.a.createElement("div",{className:"hexagon-label hexagon-label-yellow"},p.a.createElement(v.a,{compressor:.7},p.a.createElement("div",null,this.props.isShownTotals&&p.a.createElement("div",{className:"tree-total","data-testid":"tree-total"},"(".concat(this.props.calcPointsSpent("yellow"),")")),Object(P.d)("yellow",this.props.commander)))),p.a.createElement("div",{className:"hexagon-label hexagon-label-blue"},p.a.createElement(v.a,{compressor:.7},p.a.createElement("div",null,this.props.isShownTotals&&p.a.createElement("div",{className:"tree-total","data-testid":"tree-total"},"(".concat(this.props.calcPointsSpent("blue"),")")),Object(P.d)("blue",this.props.commander))))))}}]),t}(c.Component)),q=a(266),X=(a(264),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).state={open:!1},a.hide=a.hide.bind(Object(i.a)(a)),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"show",value:function(){this.setState({open:!0})}},{key:"hide",value:function(){this.setState({open:!1})}},{key:"render",value:function(){return p.a.createElement(q.a,{autohide:!0,delay:2e3,show:this.state.open,onClose:this.hide},p.a.createElement(q.a.Header,null,p.a.createElement("span",{className:"bullet bg-red"}),p.a.createElement("strong",{className:"mr-auto"},this.props.header)),p.a.createElement(q.a.Body,null,this.props.body))}}]),t}(c.Component)),z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).state={open:!1},a.hide=a.hide.bind(Object(i.a)(a)),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"show",value:function(){this.setState({open:!0})}},{key:"hide",value:function(){this.setState({open:!1})}},{key:"render",value:function(){return p.a.createElement(q.a,{autohide:!0,delay:2e3,show:this.state.open,onClose:this.hide},p.a.createElement(q.a.Header,null,p.a.createElement("span",{className:"bullet bg-red"}),p.a.createElement("strong",{className:"mr-auto"},"Incomplete Talents")),p.a.createElement(q.a.Body,null,"Upgrade talents to the maximum level first:",this.props.msg))}}]),t}(c.Component),V=a(13),L=(a(265),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).state={prereqMsg:""},a.showPrereqToast=a.showPrereqToast.bind(Object(i.a)(a)),a.showPointLimitToast=a.showPointLimitToast.bind(Object(i.a)(a)),a.setMousePosition=a.setMousePosition.bind(Object(i.a)(a)),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.repaint);var e=this;h.jsPlumb.ready((function(){h.jsPlumb.setContainer(document.getElementById("tree-square-content")),e.drawLines()}));var t=document.querySelector("#tree-square-content");this.panZoomInstance=u()(t,{minZoom:1,maxZoom:3,pinchSpeed:.5,zoomDoubleClickSpeed:1,bounds:!0,boundsPadding:.5,smoothScroll:!1,onTouch:function(e){return!1},filterKey:function(e){return!0}}),this.panZoomInstance.on("transform",(function(e){document.body.click()}))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.repaint)}},{key:"resetPanZoom",value:function(){this.panZoomInstance.moveTo(0,0),this.panZoomInstance.zoomAbs(0,0,1)}},{key:"repaint",value:function(){h.jsPlumb.repaintEverything()}},{key:"drawLines",value:function(){var e=this;this.props.commander&&(h.jsPlumb.deleteEveryEndpoint(),h.jsPlumb.setSuspendDrawing(!0),["red","yellow","blue"].forEach((function(t){var a=Object(P.d)(t,e.props.commander);Object.keys(e.props.treeData[a]).forEach((function(s){var o=0===e.props[t][s-1]?"":"line-".concat(t);e.props.treeData[a][s].prereq.forEach((function(e){h.jsPlumb.connect({source:document.getElementById("".concat(a).concat(s)),target:document.getElementById("".concat(a).concat(e)),endpoint:["Dot",{cssClass:"line-endpoint",radius:1}],connector:["Straight",{cssClass:"line ".concat(o)}],anchors:[["Perimeter",{shape:"Circle"}],["Perimeter",{shape:"Circle"}]]})}))}))})),h.jsPlumb.setSuspendDrawing(!1,!0))}},{key:"toggleMouseListeners",value:function(){this.props.isShownMouseXY?window.addEventListener("mousemove",this.setMousePosition):window.removeEventListener("mousemove",this.setMousePosition)}},{key:"setMousePosition",value:function(e){var t=document.getElementById("tree-red").getBoundingClientRect(),a=document.getElementById("tree-yellow").getBoundingClientRect(),s=document.getElementById("tree-blue").getBoundingClientRect();setTimeout(this.setState({redX:(e.clientX-t.left+window.scrollX)/t.width*100,redY:(e.clientY-t.top+window.scrollY)/t.height*100,yellowX:(e.clientX-a.left+window.scrollX)/a.width*100,yellowY:(e.clientY-a.top+window.scrollY)/a.height*100,blueX:(e.clientX-s.left+window.scrollX)/s.width*100,blueY:(e.clientY-s.top+window.scrollY)/s.height*100}),2e3)}},{key:"showPrereqToast",value:function(e){var t=this;this.setState({prereqMsg:e},(function(){t.prereqToastRef.show()}))}},{key:"showPointLimitToast",value:function(){this.pointLimitToastRef.show()}},{key:"render",value:function(){var e=this,t={changeTalentValue:this.props.changeTalentValue,calcPointsRemaining:this.props.calcPointsRemaining,showPrereqToast:this.showPrereqToast,showPointLimitToast:this.showPointLimitToast,isShownValues:this.props.isShownValues,isShownMouseXY:this.props.isShownMouseXY,isShownTalentID:this.props.isShownTalentID,isSpeedMode:this.props.isSpeedMode,nodeSize:this.props.nodeSize,treeData:this.props.treeData,commander:this.props.commander};return p.a.createElement("div",{id:"tree-panel","data-testid":"tree-panel"},p.a.createElement(z,{ref:function(t){return e.prereqToastRef=t},msg:this.state.prereqMsg}),p.a.createElement(X,{ref:function(t){return e.pointLimitToastRef=t},header:"Talent Limit",body:"You have spent the maximum number of talent points"}),this.props.dataVersion<V.c&&p.a.createElement("div",{"data-testid":"version-warning",id:"version-warning"},"(warning: this build uses an old ",p.a.createElement("br",null)," version of the game data)"),p.a.createElement("div",{id:"tree-square-container"},p.a.createElement("div",{id:"tree-square-section"},p.a.createElement("div",{id:"tree-square-content"},p.a.createElement(M,Object.assign({},t,{color:"red",treeName:Object(P.d)("red",this.props.commander),data:this.props.red,mouseX:this.state.redX,mouseY:this.state.redY})),p.a.createElement(M,Object.assign({},t,{color:"yellow",treeName:Object(P.d)("yellow",this.props.commander),data:this.props.yellow,mouseX:this.state.yellowX,mouseY:this.state.yellowY})),p.a.createElement(M,Object.assign({},t,{color:"blue",treeName:Object(P.d)("blue",this.props.commander),data:this.props.blue,mouseX:this.state.blueX,mouseY:this.state.blueY})),p.a.createElement(Y,{toggleSelect:this.props.toggleSelect,calcPointsSpent:this.props.calcPointsSpent,isShownTotals:this.props.isShownTotals&&this.props.commander,commander:this.props.commander||"unknown"})))))}}]),t}(c.Component));t.default=L}}]);
//# sourceMappingURL=4.70252548.chunk.js.map