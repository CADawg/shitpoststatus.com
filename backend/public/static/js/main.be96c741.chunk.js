(this.webpackJsonpshitpoststatus=this.webpackJsonpshitpoststatus||[]).push([[0],{159:function(t,e,i){},206:function(t,e){},208:function(t,e){},218:function(t,e){},220:function(t,e){},246:function(t,e){},247:function(t,e){},252:function(t,e){},254:function(t,e){},278:function(t,e){},296:function(t,e,i){"use strict";i.r(e);var s=i(0),n=i(1),a=i.n(n),o=i(144),d=i.n(o),c=(i(159),function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,297)).then((function(e){var i=e.getCLS,s=e.getFID,n=e.getFCP,a=e.getLCP,o=e.getTTFB;i(t),s(t),n(t),a(t),o(t)}))}),r=i(152),h=i(6),l=i(23),u=i.n(l),b=i(48),j=i(153),v=i(31),p=i(32),x=i(10),f=i(34),g=i(33),O=(i(78),i(145)),y=i(40),m=i.n(y),w=i(148),k=i.n(w),I=i(16),S=i.n(I),D=i(46),N=i.n(D),C=i(49),_=i.n(C),V=i(149),P=i.n(V),B=i(150),F=i.n(B),E=i(18),L=i(47),U=function(t){Object(f.a)(i,t);var e=Object(g.a)(i);function i(){return Object(v.a)(this,i),e.apply(this,arguments)}return Object(p.a)(i,[{key:"render",value:function(){return Object(s.jsxs)("button",{onClick:this.props.onClick,className:"fancy-button"+(this.props.isGreen?" fancy-button--green":""),disabled:!this.props.enabled||!1,children:[Object(s.jsx)("div",{className:"icon",children:this.props.iconElement?this.props.iconElement:Object(s.jsx)(L.a,{icon:this.props.icon})}),Object(s.jsx)("div",{className:"text",children:this.props.children})]})}}]),i}(a.a.Component),A=function(t){Object(f.a)(i,t);var e=Object(g.a)(i);function i(t){var s;Object(v.a)(this,i),(s=e.call(this,t)).previousVideo=function(){if(this.canBack()){var t=this.state.history[this.state.vidIndex-1];window.history.pushState({video:t},"","?v="+t),this.setState({vidIndex:this.state.vidIndex-1,video:this.findVideoById(t)})}}.bind(Object(x.a)(s)),s.nextVideo=function(){var t,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.state.vidIndex>=this.state.history.length-1||!0===e)if(t=!0===e?this.randomAll():this.randomUnwatched()){var s=1,n=!0===e?[]:this.state.history;n.push(t.id),S.a.set("history",n),window.history.pushState({video:t.id},"","?v="+t.id),this.setState({history:n,vidIndex:this.state.vidIndex+s,video:t})}else window.history.pushState({video:null},"","?"),this.setState({video:null,vidIndex:this.state.vidIndex+1});else t=this.findVideoById(this.state.history[this.state.vidIndex+1]),window.history.pushState({video:t.id},"","?v="+t.id),this.setState({video:Object(j.a)({},t),vidIndex:this.state.vidIndex+1});return t}.bind(Object(x.a)(s)),s.onVidEnd=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];null!==this.state.video.id&&this.state.autoplay&&this.nextVideo(!1,t)}.bind(Object(x.a)(s)),s.canNext=function(){return this.getUnwatched().length>0||this.state.vidIndex<this.state.history.length}.bind(Object(x.a)(s)),s.resetWatched=function(){this.setState({video:this.nextVideo(!0),vidIndex:0}),S.a.remove("history")}.bind(Object(x.a)(s)),s.onError=function(){var t=new FormData;t.set("video",this.state.video.id),m.a.post("/videos/error",t).then((function(){return console.log("Error Reported!")})),this.onVidEnd(!0)}.bind(Object(x.a)(s)),s.setYtPlayer=function(t){this.setState({ytPlayer:t.target})}.bind(Object(x.a)(s)),s.castVote=function(){var t=Object(b.a)(u.a.mark((function t(e){var i,s,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=this.state.video.id,this.setState({votes:!1}),(s=new FormData).set("weight",e),s.set("id",this.state.uuid),s.set("video",this.state.video.id),t.next=8,m.a.post("/videos/vote",s);case 8:!1!==(n=t.sent).data&&["-1","0","1"].includes(n.data.toString())&&this.state.video.id===i&&(this.state.video.myvoteweight=n.data.toString(),this.videos[this.state.vidIndex].myvoteweight=n.data.toString(),this.setState({video:this.state.video})),this.setState({votes:!0});case 11:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}().bind(Object(x.a)(s)),s.canBack=function(){return this.state.vidIndex>0}.bind(Object(x.a)(s)),s.toggleAutoplay=function(){this.setState({autoplay:!this.state.autoplay})}.bind(Object(x.a)(s)),s.toggleSubmitDialog=function(){this.state.ytPlayer&&!1===this.state.submitDialog&&this.state.ytPlayer.pauseVideo(),this.setState({submitDialog:!this.state.submitDialog,submitResponse:"",submitLink:""})}.bind(Object(x.a)(s)),s.toggleUserDialog=function(){this.state.ytPlayer&&!1===this.state.userDialog&&this.state.ytPlayer.pauseVideo(),this.setState({userDialog:!this.state.userDialog,showPassword:!1})}.bind(Object(x.a)(s)),s.handleInput=function(t){s.setState({submitLink:t.target.value})},s.submitDialogSubmit=function(){var t=Object(b.a)(u.a.mark((function t(e){var i,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),e.stopPropagation(),(i=new FormData).set("id",s.state.uuid),i.set("video",s.state.submitLink),t.next=7,m.a.post("/videos/submit",i);case 7:n=t.sent,console.log(n.data),n.data&&s.setState({submitLink:"",submitResponse:n.data});case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),s.onTogglePassword=function(t){t.preventDefault(),t.stopPropagation(),this.setState({showPassword:!this.state.showPassword})}.bind(Object(x.a)(s)),s.state={video:"unloaded",vidIndex:-1,autoplay:!0,history:[],uuid:"",submitLink:"",userDialog:!1,showPassword:!1,submitDialog:!1,nameIdenticon:""},s.videos=[];var n=N.a.parse(window.location.search,{ignoreQueryPrefix:!0}),a=n.uuid;if(("string"==typeof a||a instanceof String)&&a.length<=36)s.state.uuid=a,S.a.set("uuid",a),window.location.search="";else if(S.a.get("uuid"))s.state.uuid=S.a.get("uuid");else{var o=k()();s.state.uuid=o,S.a.set("uuid",o)}return s.vidid=n.v||!1,s.state.nameIdenticon=F.a.stringify(P()(s.state.uuid)),S.a.get("history")&&(s.state.history=S.a.get("history"),s.state.vidIndex=s.state.history.length-1),s}return Object(p.a)(i,[{key:"componentDidMount",value:function(){var t=Object(b.a)(u.a.mark((function t(){var e;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.a.get("/videos/get",{params:{id:this.state.uuid}});case 2:if(t.t0=t.sent.data,t.t0){t.next=5;break}t.t0=[];case 5:this.videos=t.t0,this.vidid&&(e=this.findVideoById(this.vidid))?this.state.history.includes(this.vidid)?this.setState({vidIndex:this.state.history.indexOf(this.vidid),video:e}):(this.state.history.push(e.id),this.setState({history:this.state.history,vidIndex:this.state.vidIndex+1,video:e})):this.setState({video:this.nextVideo()});case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"findVideoById",value:function(t){for(var e=0;e<this.videos.length;e++)if(this.videos[e].id===t)return this.videos[e];return!1}},{key:"randomUnwatched",value:function(){var t=this.getUnwatched();return t[Math.floor(Math.random()*t.length)]}},{key:"randomAll",value:function(){return this.videos[Math.floor(Math.random()*this.videos.length)]}},{key:"getUnwatched",value:function(){for(var t=[],e=0;e<this.videos.length;e++)this.state.history.includes(this.videos[e].id)||t.push(this.videos[e]);return t}},{key:"showYoutube",value:function(){return"unloaded"===this.state.video?Object(s.jsx)("div",{className:"youtube-box",children:Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"yt-loading-bb"})})}):this.state.video?Object(s.jsxs)("div",{className:"youtube-box",children:[Object(s.jsx)("h1",{children:"Shitpost Status"}),Object(s.jsx)("p",{children:"This is the text behind the video player, which plays shit post status (shitpost status) videos automatically."}),Object(s.jsx)("p",{children:"If you're seeing this, I've probably coded something wrong... sorry!"}),Object(s.jsx)("p",{children:"Want to watch Shitpost Status videos, but without having to click through or wait a few seconds each time? If so, shitpost status is for you. I made this project with a friend as I was fed up of having the experience interrupted by the flow of youtube and I wanted it to feel more like a true compilation."}),Object(s.jsx)("p",{children:"An online Massively Multiplayer Youtube Compilation. Contribute and people will see your user icon when they play a shitpost status video you submitted!"}),Object(s.jsx)(O.a,{containerClassName:"vid_box_box",onPlay:this.setYtPlayer,id:"shit_post_status_vid",videoId:this.state.video.id,opts:{playerVars:{autoplay:1},host:"https://www.youtube-nocookie.com"},onError:this.onError,onEnd:this.onVidEnd})]}):Object(s.jsxs)("div",{className:"no-more-youtube-box",children:[Object(s.jsx)("h1",{children:"We've run out of videos to show you!"}),Object(s.jsxs)("div",{children:[Object(s.jsx)("button",{onClick:this.resetWatched,children:"Click Here"})," to Reset your watch list and start again!"]})]})}},{key:"fancyButtonEnabled",value:function(t,e){return t&&this.state.video.myvoteweight!==e}},{key:"fancyButtonIsGreen",value:function(t){return this.state.video&&"unloaded"!==this.state.video&&this.state.video.myvoteweight===t}},{key:"showYoutubeBasedFeatures",value:function(){var t=this,e=this.state.video&&"unloaded"!==this.state.video,i=e&&parseFloat(this.state.video.upvotes)+parseFloat(this.state.video.downvotes)>0;return Object(s.jsxs)(a.a.Fragment,{children:[Object(s.jsx)(U,{icon:E.b,enabled:this.fancyButtonEnabled(e,"1"),isGreen:this.fancyButtonIsGreen("1"),onClick:function(){return t.castVote("1")},children:"Upvote"}),Object(s.jsx)(U,{icon:E.a,enabled:this.fancyButtonEnabled(e,"-1"),isGreen:this.fancyButtonIsGreen("-1"),onClick:function(){return t.castVote("-1")},children:"Downvote"}),Object(s.jsx)(U,{icon:E.h,enabled:this.fancyButtonEnabled(e,"0"),isGreen:this.fancyButtonIsGreen("0"),onClick:function(){return t.castVote("0")},children:"No Vote"}),i?Object(s.jsxs)("div",{className:"votes-info",children:[Object(s.jsxs)("p",{children:["Upvotes: ",this.state.video.upvotes]}),Object(s.jsxs)("p",{children:["Downvotes: ",this.state.video.downvotes]}),Object(s.jsxs)("p",{children:["Liked: ",(parseFloat(this.state.video.upvotes)/(parseFloat(this.state.video.upvotes)+parseInt(this.state.video.downvotes))*100).toFixed(0)," %"]})]}):Object(s.jsxs)("div",{className:"votes-info",children:[Object(s.jsx)("p",{children:"Upvotes: 0"}),Object(s.jsx)("p",{children:"Downvotes: 0"}),Object(s.jsx)("p",{children:"Liked: 0%"})]}),Object(s.jsx)(U,{iconElement:e?Object(s.jsx)("span",{children:Object(s.jsx)(_.a,{seed:this.state.video.submitter,size:8})}):Object(s.jsx)("span",{className:"blockies"}),enabled:e,onClick:this.backOnClick,children:"Contributor"})]})}},{key:"submitDialog",value:function(){return Object(s.jsx)("div",{className:"dialog-background"+(this.state.submitDialog?"":" hidden"),children:Object(s.jsxs)("div",{className:"dialog",children:[Object(s.jsx)("button",{className:"close-btn",onClick:this.toggleSubmitDialog,children:"\xd7"}),Object(s.jsx)("h1",{children:"Submit a Video"}),Object(s.jsx)("p",{className:"paragraph-fold",children:'Add a "Shitpost Status" video to the website. 11-character video codes, youtu.be and youtube.com links accepted!'}),Object(s.jsxs)("form",{className:"wide",children:[Object(s.jsx)("div",{children:Object(s.jsx)("label",{htmlFor:"vid_url_sps",children:"Youtube Link"})}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{type:"text",id:"vid_url_sps",value:this.state.submitLink,onChange:this.handleInput})}),Object(s.jsx)("button",{onClick:this.submitDialogSubmit,children:"Submit"}),Object(s.jsx)("p",{children:this.state.submitResponse})]})]})})}},{key:"userDialog",value:function(){return Object(s.jsx)("div",{className:"dialog-background"+(this.state.userDialog?"":" hidden"),children:Object(s.jsxs)("div",{className:"dialog",children:[Object(s.jsx)("button",{className:"close-btn",onClick:this.toggleUserDialog,children:"\xd7"}),Object(s.jsx)("h1",{children:"Your account"}),Object(s.jsx)("p",{className:"paragraph-fold",children:"Copy your account details down here so you can log in elsewhere!"}),Object(s.jsxs)("form",{className:"account",children:[Object(s.jsx)("div",{children:Object(s.jsx)("label",{htmlFor:"name_identicon_box",children:"Public Name"})}),Object(s.jsxs)("div",{className:"image_and_text",children:[Object(s.jsx)(_.a,{seed:this.state.nameIdenticon,size:8}),Object(s.jsx)("input",{type:"text",readOnly:!0,id:"name_identicon_box",value:this.state.nameIdenticon})]}),Object(s.jsx)("div",{className:"gib_space",children:Object(s.jsx)("label",{htmlFor:"password_ll",children:"Password (Login Link)"})}),Object(s.jsxs)("div",{className:"show_hide_password_line",children:[Object(s.jsx)("input",{value:window.location.origin+"?uuid="+this.state.uuid,type:this.state.showPassword?"text":"password",id:"password_ll",readOnly:!0,onChange:this.handleInput}),Object(s.jsx)("button",{onClick:this.onTogglePassword,children:Object(s.jsx)(L.a,{icon:E.d})})]}),Object(s.jsx)("label",{children:"or "}),this.state.showPassword?Object(s.jsxs)("span",{children:["Drag this link into your bookmarks -> ",Object(s.jsx)("a",{href:"?uuid="+this.state.uuid,children:"Shitpost Status"})]}):"****"]})]})})}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"App",children:[this.showYoutube(),this.submitDialog(),this.userDialog(),Object(s.jsxs)("nav",{role:"navigation",className:"navbar",children:[Object(s.jsx)(U,{icon:E.f,enabled:this.canBack(),onClick:this.previousVideo,children:"Back"}),Object(s.jsx)(U,{icon:E.g,enabled:this.canNext(),onClick:this.nextVideo,children:"Forward"}),this.showYoutubeBasedFeatures(),Object(s.jsx)(U,{icon:this.state.autoplay?E.c:E.h,enabled:!0,onClick:this.toggleAutoplay,children:"Autoplay"}),Object(s.jsx)(U,{icon:E.e,enabled:!0,onClick:this.toggleSubmitDialog,children:"Submit Video"}),Object(s.jsx)(U,{onClick:this.toggleUserDialog,iconElement:Object(s.jsx)(_.a,{seed:this.state.nameIdenticon,size:8}),enabled:!0,children:Object(s.jsx)("span",{children:"Account"})}),this.videos?Object(s.jsx)("div",{className:"votes-info",children:Object(s.jsxs)("p",{children:["Videos Loaded: ",this.videos.length]})}):"",Object(s.jsxs)("div",{className:"votes-info",children:[Object(s.jsx)("p",{children:Object(s.jsx)("a",{href:"https://github.com/Snaddyvitch-Dispenser",rel:"noopener noreferrer",target:"_blank",children:"Developer"})}),Object(s.jsx)("p",{children:Object(s.jsx)("a",{href:"https://discord.gg/AKh4mwGsRz",rel:"noopener noreferrer",target:"_blank",children:"Discord"})}),Object(s.jsx)("p",{children:Object(s.jsx)("a",{href:"https://peakd.com/@shitpoststatus",rel:"noopener noreferrer",target:"_blank",children:"Blog"})})]})]})]})}}]),i}(a.a.Component),G=function(t){Object(f.a)(i,t);var e=Object(g.a)(i);function i(t){var s;Object(v.a)(this,i),s=e.call(this,t);var n=N.a.parse(window.location.search,{ignoreQueryPrefix:!0}),a=n.uuid,o=n.v||!1;return("string"==typeof a||a instanceof String)&&a.length<=36&&(S.a.set("uuid",a),window.location.search=""),!1!==o&&""!==o&&(window.location.href="/watch?v="+o),s}return Object(p.a)(i,[{key:"render",value:function(){return Object(s.jsx)("div",{className:"homepage",children:Object(s.jsx)("button",{className:"fancy-button fancy-button__homepage",onClick:function(){window.location.href="/watch"},children:"Get Watching"})})}}]),i}(a.a.Component);function Y(){return Object(s.jsx)(r.a,{children:Object(s.jsxs)(h.c,{children:[Object(s.jsx)(h.a,{path:"/watch",children:Object(s.jsx)(A,{})}),Object(s.jsx)(h.a,{path:"/",children:Object(s.jsx)(G,{})})]})})}d.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(Y,{})}),document.getElementById("root")),c()},78:function(t,e,i){}},[[296,1,2]]]);