(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"do/P":function(t,n,o){"use strict";o.r(n),o.d(n,"TeamModule",(function(){return V}));var e=o("ofXK"),r=o("tyNb"),i=o("fXoL"),c=o("lJxs"),a=o("XNiG"),s=o("quSY");class p extends a.a{constructor(){super(...arguments),this.value=null,this.hasNext=!1,this.hasCompleted=!1}_subscribe(t){return this.hasError?(t.error(this.thrownError),s.a.EMPTY):this.hasCompleted&&this.hasNext?(t.next(this.value),t.complete(),s.a.EMPTY):super._subscribe(t)}next(t){this.hasCompleted||(this.value=t,this.hasNext=!0)}error(t){this.hasCompleted||super.error(t)}complete(){this.hasCompleted=!0,this.hasNext&&super.next(this.value),super.complete()}}var d=o("oB13"),b=o("tk/3");let g=(()=>{class t{constructor(t){this.http=t,this.constributorsPath="assets/contributors.json",this.knownGroups=["Core Team","Core Team ESP"],this.contributors=this.getContributors()}getContributors(){const t=this.http.get(this.constributorsPath).pipe(Object(c.a)(t=>{const n={};return Object.keys(t).forEach(o=>{const e=t[o],r=e.group,i=n[r];i?i.push(e):n[r]=[e]}),n}),Object(c.a)(t=>Object.keys(t).map(n=>{const o=this.knownGroups.indexOf(n);return{name:n,order:-1===o?this.knownGroups.length:o,contributors:t[n].sort(u)}})),t=>Object(d.a)(new p)(t));return t.connect(),t}}return t.\u0275fac=function(n){return new(n||t)(i.Zb(b.a))},t.\u0275prov=i.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();function u(t,n){return 1}var l=o("XiUz"),f=o("znSr");function h(t,n){1&t&&(i.Vb(0,"a",7),i.Ec(1," Ver biograf\xeda "),i.Ub())}function x(t,n){if(1&t){const t=i.Wb();i.Vb(0,"a",8),i.dc("click",(function(n){return i.vc(t),n.stopPropagation()})),i.Qb(1,"span",9),i.Vb(2,"span",10),i.Ec(3),i.Ub(),i.Ub()}if(2&t){const t=i.hc();i.oc("href",t.person.twitter,i.xc),i.Bb(3),i.Gc("Twitter ",t.person.name,"")}}function m(t,n){if(1&t){const t=i.Wb();i.Vb(0,"a",8),i.dc("click",(function(n){return i.vc(t),n.stopPropagation()})),i.Qb(1,"span",11),i.Vb(2,"span",10),i.Ec(3),i.Ub(),i.Ub()}if(2&t){const t=i.hc();i.oc("href",t.person.github,i.xc),i.Bb(3),i.Gc("Github ",t.person.name,"")}}function C(t,n){if(1&t){const t=i.Wb();i.Vb(0,"a",8),i.dc("click",(function(n){return i.vc(t),n.stopPropagation()})),i.Qb(1,"span",12),i.Vb(2,"span",10),i.Ec(3),i.Ub(),i.Ub()}if(2&t){const t=i.hc();i.oc("href",t.person.website,i.xc),i.Bb(3),i.Gc("Sitio web ",t.person.name,"")}}function O(t,n){if(1&t){const t=i.Wb();i.Vb(0,"div",13),i.dc("click",(function(){i.vc(t);const n=i.hc();return n.flipCard(n.person)})),i.Vb(1,"h3"),i.Ec(2),i.Ub(),i.Vb(3,"p",14),i.Ec(4),i.Ub(),i.Ub()}if(2&t){const t=i.hc();i.Bb(2),i.Fc(t.person.name),i.Bb(2),i.Fc(t.person.bio)}}const P=function(t){return{flipped:t}};let M=(()=>{class t{constructor(){this.noPicture="_no-one.png",this.pictureBase="assets/images/bios/"}flipCard(t){t.isFlipped=!t.isFlipped}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=i.Jb({type:t,selectors:[["app-team"]],inputs:{person:"person"},decls:12,vars:11,consts:[[1,"contributor-card",3,"ngClass"],[1,"card-front"],[1,"contributor-image"],[1,"contributor-info"],["mat-button","",4,"ngIf"],["mat-button","","class","icon","target","_blank",3,"href","click",4,"ngIf"],["class","card-back",3,"click",4,"ngIf"],["mat-button",""],["mat-button","","target","_blank",1,"icon",3,"href","click"],["aria-hidden","true",1,"fa","fa-twitter","fa-2x"],[1,"sr-only"],["aria-hidden","true",1,"fa","fa-github","fa-2x"],["aria-hidden","true",1,"fa","fa-link","fa-2x"],[1,"card-back",3,"click"],[1,"contributor-bio"]],template:function(t,n){1&t&&(i.Vb(0,"div"),i.Vb(1,"div",0),i.Vb(2,"div",1),i.Vb(3,"h3"),i.Ec(4),i.Ub(),i.Vb(5,"div",2),i.Vb(6,"div",3),i.Cc(7,h,2,0,"a",4),i.Cc(8,x,4,2,"a",5),i.Cc(9,m,4,2,"a",5),i.Cc(10,C,4,2,"a",5),i.Ub(),i.Ub(),i.Ub(),i.Cc(11,O,5,2,"div",6),i.Ub(),i.Ub()),2&t&&(i.Bb(1),i.nc("ngClass",i.qc(9,P,n.person.isFlipped)),i.Bb(3),i.Fc(n.person.name),i.Bb(1),i.Bc("background-image","url("+(n.person.picture||n.noPicture)+")",i.Ib),i.Bb(2),i.nc("ngIf",n.person.bio),i.Bb(1),i.nc("ngIf",n.person.twitter),i.Bb(1),i.nc("ngIf",n.person.github),i.Bb(1),i.nc("ngIf",n.person.website),i.Bb(1),i.nc("ngIf",n.person.isFlipped))},directives:[e.k,f.a,e.m],styles:["@media handheld and (max-width:480px),screen and (max-width:480px),screen and (max-width:900px){app-team-list[_ngcontent-%COMP%]   .grid-fluid[_ngcontent-%COMP%]{width:auto;margin-left:20px;margin-right:20px;float:none;display:block}}.group-buttons[_ngcontent-%COMP%]{margin:32px auto}.group-buttons[_ngcontent-%COMP%]   a.selected[_ngcontent-%COMP%]{background-color:#d81b60;color:#fff}.contributor-group[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center}app-team[_ngcontent-%COMP%]{background:#fff;margin:8px;position:relative;cursor:pointer;border-radius:4px;box-shadow:0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12);transition:all .3s;perspective:800px}app-team[_ngcontent-%COMP%]:hover{transform:translate3d(0,-3px,0);box-shadow:0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12)}  app-team:hover .contributor-image{transform:scale(1.05)}  app-team:hover .contributor-info{opacity:1}.contributor-info[_ngcontent-%COMP%]{background:hsla(0,0%,50.2%,.5);height:168px;width:168px;display:flex;flex-direction:row;justify-content:center;align-items:center;text-align:center;opacity:0;border-radius:50%}.contributor-info[_ngcontent-%COMP%]   [mat-button][_ngcontent-%COMP%]{color:#fff;font-size:14px;font-weight:500;margin:8px;padding:0}.contributor-info[_ngcontent-%COMP%]   [mat-button][_ngcontent-%COMP%]:hover{color:grey}.contributor-info[_ngcontent-%COMP%]   [mat-button].icon[_ngcontent-%COMP%]{min-width:20px;width:20px}.contributor-info[_ngcontent-%COMP%]   [mat-button].icon[_ngcontent-%COMP%]   .fa-2x[_ngcontent-%COMP%]{font-size:20px}div.contributor-card[_ngcontent-%COMP%]{width:250px;height:270px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:relative;overflow:hidden;border-radius:4px;transform-style:preserve-3d;transition:transform .5s ease}div.contributor-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:8px 0}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%], div.contributor-card[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%]{width:100%;height:100%;text-align:center;display:flex;flex-direction:column;box-sizing:border-box}div.contributor-card[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%]{justify-content:center}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:center;padding:16px 24px;transform:rotateY(180deg)}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:none}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px 0;font-size:12px;line-height:14px;text-align:left}div.contributor-card.flipped[_ngcontent-%COMP%]{transform:rotateY(180deg)}div.contributor-card.flipped[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%]{display:none}.contributor-image[_ngcontent-%COMP%]{display:flex;justify-content:center;border-radius:50%;align-items:center;height:168px;width:168px;background-size:cover;background-position:50%;margin:8px auto;border:2px solid grey;transition:all .2s ease-in-out}section[_ngcontent-%COMP%]{font-weight:500;padding:8px;margin:0;white-space:nowrap;overflow:hidden;text-transform:uppercase}app-team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], section[_ngcontent-%COMP%]{font-size:14px;text-overflow:ellipsis}app-team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{cursor:pointer;line-height:18px;margin:8px 16px;overflow:scroll;font-weight:400}"]}),t})();function _(t,n){if(1&t){const t=i.Wb();i.Vb(0,"a",3),i.dc("click",(function(){i.vc(t);const o=n.$implicit;return i.hc().selectGroup(o)})),i.Ec(1),i.Ub()}if(2&t){const t=n.$implicit,o=i.hc();i.Fb("selected",t===o.selectedGroup),i.Bb(1),i.Fc(t.name)}}function v(t,n){1&t&&i.Qb(0,"app-team",7),2&t&&i.nc("person",n.$implicit)}function w(t,n){if(1&t&&(i.Vb(0,"section",4),i.Vb(1,"div",5),i.Cc(2,v,1,1,"app-team",6),i.Ub(),i.Ub()),2&t){const t=i.hc();i.Bb(2),i.nc("ngForOf",t.selectedGroup.contributors)}}const y=[{path:"",component:(()=>{class t{constructor(t){this.contributorService=t}ngOnInit(){this.contributorService.contributors.subscribe(t=>{this.groups=t,this.groupNames=t.map(t=>t.name),this.selectGroup(this.groups[0])})}selectGroup(t){this.selectedGroup=t}}return t.\u0275fac=function(n){return new(n||t)(i.Pb(g))},t.\u0275cmp=i.Jb({type:t,selectors:[["app-team-list"]],decls:3,vars:2,consts:[["fxLayout","","fxLayoutAlign","center",1,"group-buttons"],["class","button mat-button filter-button",3,"selected","click",4,"ngFor","ngForOf"],["class","grid-fluid",4,"ngIf"],[1,"button","mat-button","filter-button",3,"click"],[1,"grid-fluid"],[1,"contributor-group"],[3,"person",4,"ngFor","ngForOf"],[3,"person"]],template:function(t,n){1&t&&(i.Vb(0,"div",0),i.Cc(1,_,2,3,"a",1),i.Ub(),i.Cc(2,w,3,1,"section",2)),2&t&&(i.Bb(1),i.nc("ngForOf",n.groups),i.Bb(1),i.nc("ngIf",n.selectedGroup))},directives:[l.b,l.a,e.l,e.m,M],styles:["@media handheld and (max-width:480px),screen and (max-width:480px),screen and (max-width:900px){app-team-list[_ngcontent-%COMP%]   .grid-fluid[_ngcontent-%COMP%]{width:auto;margin-left:20px;margin-right:20px;float:none;display:block}}.group-buttons[_ngcontent-%COMP%]{margin:32px auto}.group-buttons[_ngcontent-%COMP%]   a.selected[_ngcontent-%COMP%]{background-color:#d81b60;color:#fff}.contributor-group[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center}app-team[_ngcontent-%COMP%]{background:#fff;margin:8px;position:relative;cursor:pointer;border-radius:4px;box-shadow:0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12);transition:all .3s;perspective:800px}app-team[_ngcontent-%COMP%]:hover{transform:translate3d(0,-3px,0);box-shadow:0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12)}  app-team:hover .contributor-image{transform:scale(1.05)}  app-team:hover .contributor-info{opacity:1}.contributor-info[_ngcontent-%COMP%]{background:hsla(0,0%,50.2%,.5);height:168px;width:168px;display:flex;flex-direction:row;justify-content:center;align-items:center;text-align:center;opacity:0;border-radius:50%}.contributor-info[_ngcontent-%COMP%]   [mat-button][_ngcontent-%COMP%]{color:#fff;font-size:14px;font-weight:500;margin:8px;padding:0}.contributor-info[_ngcontent-%COMP%]   [mat-button][_ngcontent-%COMP%]:hover{color:grey}.contributor-info[_ngcontent-%COMP%]   [mat-button].icon[_ngcontent-%COMP%]{min-width:20px;width:20px}.contributor-info[_ngcontent-%COMP%]   [mat-button].icon[_ngcontent-%COMP%]   .fa-2x[_ngcontent-%COMP%]{font-size:20px}div.contributor-card[_ngcontent-%COMP%]{width:250px;height:270px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:relative;overflow:hidden;border-radius:4px;transform-style:preserve-3d;transition:transform .5s ease}div.contributor-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:8px 0}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%], div.contributor-card[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%]{width:100%;height:100%;text-align:center;display:flex;flex-direction:column;box-sizing:border-box}div.contributor-card[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%]{justify-content:center}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:center;padding:16px 24px;transform:rotateY(180deg)}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:none}div.contributor-card[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px 0;font-size:12px;line-height:14px;text-align:left}div.contributor-card.flipped[_ngcontent-%COMP%]{transform:rotateY(180deg)}div.contributor-card.flipped[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%]{display:none}.contributor-image[_ngcontent-%COMP%]{display:flex;justify-content:center;border-radius:50%;align-items:center;height:168px;width:168px;background-size:cover;background-position:50%;margin:8px auto;border:2px solid grey;transition:all .2s ease-in-out}section[_ngcontent-%COMP%]{font-weight:500;padding:8px;margin:0;white-space:nowrap;overflow:hidden;text-transform:uppercase}app-team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], section[_ngcontent-%COMP%]{font-size:14px;text-overflow:ellipsis}app-team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{cursor:pointer;line-height:18px;margin:8px 16px;overflow:scroll;font-weight:400}"]}),t})()}];let k=(()=>{class t{}return t.\u0275mod=i.Nb({type:t}),t.\u0275inj=i.Mb({factory:function(n){return new(n||t)},imports:[[r.e.forChild(y)],r.e]}),t})();var U=o("YUcS");let V=(()=>{class t{}return t.\u0275mod=i.Nb({type:t}),t.\u0275inj=i.Mb({factory:function(n){return new(n||t)},imports:[[e.c,k,U.a]]}),t})()}}]);