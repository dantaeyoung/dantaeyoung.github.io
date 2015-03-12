var d3clockfunc=function(t,e,a){function n(t){for(var e=window.location.search.substring(1),a=e.split("&"),n=0;n<a.length;n++){var r=a[n].split("=");if(r[0]===t)return r[1]}}function r(){void 0!==n("destination")?(l(),window.destination=n("destination"),navigator.geolocation?navigator.geolocation.getCurrentPosition(o,i):alert("Sorry, your browser does not support geolocation services.")):($("svg").hide(),$(".address-form").show(),alert("Sorry, no location entered!"))}function o(t){s(t.coords.latitude,t.coords.longitude)}function i(){}function s(t,e){var a=new google.maps.DirectionsService,n={origin:t+","+e,destination:window.destination,travelMode:google.maps.DirectionsTravelMode.TRANSIT};a.route(n,function(a,n){if(console.log(t+","+e),n==google.maps.DirectionsStatus.OK){if(console.log(a),r in a.routes[0].legs[0])var r=a.routes[0].legs[0].arrival_time.value;else{var r=new Date;r.setSeconds(r.getSeconds()+a.routes[0].legs[0].duration.value)}window.transitHandData[0].value=r.getHours()%12+r.getMinutes()/60,window.transitHandData[1].value=r.getMinutes()+r.getSeconds()/60,window.transitHandData[2].value=r.getSeconds(),console.log(window.transitHandData);var o=d3.select("#transit-hands");o.selectAll("path").data(window.transitHandData).enter().append("path").attr("class",function(t){return t.type+"-transitHand transitHand"}).attr("d",function(t){return"M"+t.width/2+" "+t.balance+" L"+t.width/-2+" "+t.balance+" L0 "+t.length+" Z"}).attr("transform",function(t){return"rotate("+t.scale(t.value)%360+")"})}})}function l(){d();var t=e.find("svg")[0],a=d3.select(t).attr("width",f).attr("height",v).attr("viewBox","0 0 "+f+" "+v).attr("preserveAspectRatio","xMidyMid"),n=a.append("g").attr("id","clock-face").attr("transform","translate("+(g+h)+","+(g+h)+")");n.selectAll(".second-tick").data(d3.range(0,60)).enter().append("line").attr("class","second-tick").attr("x1",0).attr("x2",0).attr("y1",x).attr("y2",x+secondTickLength).attr("transform",function(t){return console.log("minutetick"),"rotate("+T(t/1)%360+")"}),n.selectAll(".hour-tick").data(d3.range(0,12)).enter().append("line").attr("class","hour-tick").attr("x1",0).attr("x2",0).attr("y1",hourTickStart).attr("y2",hourTickStart+hourTickLength).attr("transform",function(t){return"rotate("+D(t)+")"}),n.selectAll(".hour-label").data(d3.range(0,12)).enter().append("text").attr("class","hour-label").attr("text-anchor","middle").attr("x",function(t){return hourLabelRadius*Math.sin(D(t)*u)}).attr("y",function(t){return-hourLabelRadius*Math.cos(D(t)*u)+hourLabelYOffset}).text(function(t){return(t+11)%12+1}),n.append("g").attr("id","face-overlay").append("circle").attr("class","hands-cover").attr("x",0).attr("y",0).attr("r",g/50);var r=d3.select("#clock-face").append("g").attr("id","transit-hands"),o=n.append("g").attr("id","clock-hands");o.selectAll("path").data(A).enter().append("path").attr("class",function(t){return t.type+"-hand hand"}).attr("d",function(t){return"M"+t.width/2+" "+t.balance+" L"+t.width/-2+" "+t.balance+" L0 "+t.length+" Z"}).attr("transform",function(t){return"rotate("+t.scale(t.value)%360+")"})}function c(){d3.select("#clock-hands").selectAll("path").data(A).transition().ease("linear").attr("transform",function(t){return"rotate("+t.scale(t.value)%360+")"})}function d(){var t=new Date,e=3600*t.getHours()+60*t.getMinutes()+t.getSeconds(),a=1e3*e+t.getMilliseconds();A[0].value=t.getHours()%12+t.getMinutes()/60,A[1].value=t.getMinutes()+t.getSeconds()/60,A[2].value=t.getSeconds()}var u=.0174532925,g=200,h=50,f=2*(g+h),v=2*(g+h),p=2*g/4,w=10,b=20,m=g-30,y=8,k=20,L=4,S=g,M=30,x=g;secondTickLength=-10,hourTickStart=g,hourTickLength=-18,secondLabelRadius=g+16,secondLabelYOffset=5,hourLabelRadius=g-40,hourLabelYOffset=7;var D=d3.scale.linear().domain([0,12]).range([0,360]),H=d3.scale.linear().domain([0,60]).range([0,360]),T=d3.scale.linear().domain([0,60]).range([0,360]),A=[{type:"hour",value:0,scale:D,length:-p,balance:b,width:w},{type:"minute",value:0,scale:H,length:-m,balance:k,width:y},{type:"second",value:0,scale:T,length:-S,balance:M,width:L}];window.transitHandData=[{type:"hour",value:0,scale:D,length:-p,balance:b,width:w},{type:"minute",value:0,scale:H,length:-m,balance:k,width:y},{type:"second",value:0,scale:T,length:-S,balance:M,width:L}],r(),setInterval(function(){d(),c()},100),d3.select(self.frameElement).style("height",v+"px")};