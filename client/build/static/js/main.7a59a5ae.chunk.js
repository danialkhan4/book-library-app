(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{147:function(e,t,a){e.exports=a(245)},177:function(e,t,a){},202:function(e,t,a){},234:function(e,t,a){},241:function(e,t,a){},242:function(e,t,a){},243:function(e,t,a){},245:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(14),o=a.n(r),c=a(55),i=a(71),u=a(29),s=a(79),m=a.n(s);a(152),a(155);m.a.initializeApp({apiKey:"AIzaSyCbb11Pr-rx9Sk6oFW95_eP8LmZpxEdJEM",authDomain:"book-library-app-8eb19.firebaseapp.com",databaseURL:"https://book-library-app-8eb19.firebaseio.com",projectId:"book-library-app-8eb19",storageBucket:"book-library-app-8eb19.appspot.com",messagingSenderId:"553206836295",appId:"1:553206836295:web:ca4ff0892ff6fd281b1562",measurementId:"G-KFFN83VGEQ"});var b=m.a.auth(),h=(m.a.firestore(),m.a),p=a(50),f=a.n(p),E=a(61),d=a(253),g=a(254),v=a(255),k=a(120),y=a.n(k),I=(a(177),a(247));a(178),I.a.SubMenu;var N=function(){return l.a.createElement("div",{className:"sidebar"})},O=a(69),j=a.n(O),L=a(86),S=a(248),C=a(246),w=a(249),x=(a(202),a(250)),R=a(251),A=a(252),B=C.a.Text,G=l.a.createElement(I.a,{onClick:console.log("click")},l.a.createElement(I.a.Item,{key:"1"},"Read"),l.a.createElement(I.a.Item,{key:"2"},"Currently reading"),l.a.createElement(I.a.Item,{key:"3"},"Want to read"));var M=function(e){for(var t,a=[],n=[],r=e.authors.length-1,o=0;o<e.authors.length;o++)1===e.authors.length?a.push(l.a.createElement(B,{key:o},e.authors[o])):o!==r?a.push(l.a.createElement(B,{key:o},e.authors[o],", ")):a.push(l.a.createElement(B,{key:o},e.authors[o]));return e.subtitle?n.push(l.a.createElement(B,{key:e.name,strong:!0},e.name,": ",e.subtitle,l.a.createElement("br",null))):n.push(l.a.createElement(B,{key:e.name,strong:!0},e.name,l.a.createElement("br",null))),console.log(e.isLibraryRender),t=e.isLibraryRender?l.a.createElement(E.a,{onClick:function(){console.log("removing");var t={title:e.name,authors:e.authors,subtitle:e.subtitle,thumbnail:e.thumbnail};f.a.post("/api/user/remove",{bookData:t}).then((function(t){console.log(t),e.onChange()}))},style:{marginRight:5}},l.a.createElement(x.a,null)):l.a.createElement(E.a,{onClick:function(){var t={title:e.name,authors:e.authors,subtitle:e.subtitle,thumbnail:e.thumbnail};f.a.post("/api/user/add",{bookData:t})},style:{marginRight:5}},l.a.createElement(R.a,null),"Add to shelf"),l.a.createElement("div",{className:"bookCard"},l.a.createElement("img",{className:"imageContainer",alt:n,src:e.thumbnail}),l.a.createElement("div",{className:"textContainer"},n,l.a.createElement("br",null),a),l.a.createElement("div",{className:"options"},t,e.isLibraryRender&&l.a.createElement(w.a,{overlay:G},l.a.createElement(E.a,{type:"dashed"},"Mark as ",l.a.createElement(A.a,null)))))},_=(a(234),S.a.Search);function z(e){return"undefined"===typeof e}var F=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(""),i=Object(c.a)(o,2),u=i[0],s=i[1];function m(){return(m=Object(L.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,0!==u.length&&u){e.next=3;break}return e.abrupt("return");case 3:f.a.get("https://www.googleapis.com/books/v1/volumes?q="+u+"&key=AIzaSyC8h_mfSuQv6QnzAbucMydsQlFOVEvhU_o").then((function(e){console.log(e.data.items),r(e.data.items)})).catch((function(e){console.log(e)})),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return l.a.createElement("div",{className:"bookSearch"},l.a.createElement("div",{id:"numInput"},l.a.createElement(_,{onChange:function(e){s(e.target.value.trim())},placeholder:"Book Title",onSearch:function(){return m.apply(this,arguments)},enterButton:!0})),l.a.createElement("div",{className:"listing"},a&&a.map((function(e,t){return function(e){z(e.volumeInfo.imageLinks)&&(e.volumeInfo.imageLinks={thumbnail:"default",smallThumbnail:"default"});z(e.volumeInfo.subtitle)&&(e.volumeInfo.subtitle=!1);z(e.volumeInfo.authors)&&(e.volumeInfo.authors=[" "]);z(e.volumeInfo.title)&&(e.volumeInfo.title=" ")}(e),l.a.createElement(M,{key:e.id,name:e.volumeInfo.title,thumbnail:e.volumeInfo.imageLinks.thumbnail,subtitle:e.volumeInfo.subtitle,authors:e.volumeInfo.authors,isLibraryRender:!1})}))))};a(241);var P=function(e){var t=Object(n.useState)([]),a=Object(c.a)(t,2),r=a[0],o=a[1];function i(){return u.apply(this,arguments)}function u(){return(u=Object(L.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.user?f.a.get("/api/library").then((function(e){o(e.data)})).catch((function(e){console.log(e)})):o([])}catch(a){console.log(a)}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(n.useEffect)((function(){i()}),[e.user]),l.a.createElement("div",{className:"bookLibrary"},e.loggedIn?l.a.createElement("h1",{className:"library"},"Welcome ",e.user&&e.user.displayName):l.a.createElement("h1",{className:"library"},"Login to see your library"),l.a.createElement("div",{className:"listing"},r&&r.map((function(e,t){return l.a.createElement(M,{key:e.title+e.authors,name:e.title,onChange:i,thumbnail:e.thumbnail,subtitle:e.subtitle,authors:e.authors,isLibraryRender:!0})}))))},Q=(a(242),a(243),a(142));function W(){var e=new h.auth.GoogleAuthProvider;b.signInWithPopup(e)}function D(e){console.log("logged out"),b.signOut()}var J=function(){var e=Object(Q.a)(b),t=Object(c.a)(e,1)[0],a=Object(n.useState)(null),r=Object(c.a)(a,2),o=r[0],s=r[1];return Object(n.useEffect)((function(){s(b.currentUser)}),[t]),Object(n.useEffect)((function(){o&&f.a.post("/api/user",{uid:o.uid})}),[o]),l.a.createElement(i.a,null,l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"navbar"},l.a.createElement("div",{className:"leftInfo"},l.a.createElement("div",{className:"title"},l.a.createElement(i.b,{id:"title",to:"/"},"Books Library")),l.a.createElement("div",{className:"buttons"},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(i.b,{to:"/"},"My Library")),l.a.createElement("li",null,l.a.createElement(i.b,{to:"/search"},"Search")),l.a.createElement("li",null,l.a.createElement(i.b,{to:"/settings"},"Settings"))))),l.a.createElement("div",{className:"rightInfo"},l.a.createElement("div",{className:"links"},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(E.a,{href:"https://github.com/danialkhan4/book-library-web-app",target:"_blank",type:"link",block:!0},l.a.createElement(d.a,null),"View Github")),l.a.createElement("li",null,l.a.createElement(E.a,{href:"https://developers.google.com/books",target:"_blank",type:"link",block:!0},l.a.createElement(g.a,null),"Google Books")))),l.a.createElement("div",{className:"login"},l.a.createElement("ul",null,l.a.createElement("li",null,function(e,t){return e?l.a.createElement(E.a,{onClick:D},l.a.createElement(v.a,null),"Log out"):l.a.createElement(y.a,{onClick:W,type:"dark"})}(t)))))),l.a.createElement(N,null)),l.a.createElement(u.a,{exact:!0,path:"/search",component:F}),l.a.createElement(u.a,{exact:!0,path:"/"},l.a.createElement(P,{loggedIn:t,user:o})))};o.a.render(l.a.createElement(J,null),document.getElementById("root"))}},[[147,1,2]]]);
//# sourceMappingURL=main.7a59a5ae.chunk.js.map