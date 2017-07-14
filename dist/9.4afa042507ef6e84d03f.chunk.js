webpackJsonp([9],{1452:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=t(0),n=t(14),s=t(354),r=t(1491),i=t(355),l=t(1545),m=t(1490),d=t(715),c=(t.n(d),t(1467)),u=t(1465),p=t(13);t.d(a,"CustomerModule",(function(){return f}));var f=(function(){function e(){}return e=__decorate([t.i(o.NgModule)({imports:[n.CommonModule,s.a,p.FormsModule,d.Ng2SmartTableModule,i.a.forRoot(),i.b.forRoot(),l.a],entryComponents:[m.a],declarations:[r.a,m.a,m.b],providers:[c.a,u.a]}),__metadata("design:paramtypes",[])],e)})()},1465:function(e,a,t){"use strict";var o=t(0),n=t(42),s=t(38),r=t(121),i=t(161);t.n(i);t.d(a,"a",(function(){return l}));var l=(function(){function e(e,a){this._http=e,this._router=a,this.PATH_SERVER=r.a._SERVER,this.componentMethodCallSource=new i.Subject,this.componentMethodCalled$=this.componentMethodCallSource.asObservable(),console.log("Init customer service")}return e.prototype.callUpdateTableService=function(){this.componentMethodCallSource.next()},e.prototype.getCustomersByUser=function(e){return this._http.get(this.PATH_SERVER+"&c=customer&m=get_customers_by_user&user_id="+e).map((function(e){return e.json()}))},e.prototype.getCustomersByOffice=function(e){return this._http.get(this.PATH_SERVER+"&c=customer&m=get_customers_by_office&office_id="+e).map((function(e){return e.json()}))},e.prototype.addCustomer=function(e){var a=new n.Headers({"Content-Type":"text/plain"}),t=new n.RequestOptions({headers:a,method:"post"}),o=JSON.stringify(e);return this._http.post(this.PATH_SERVER+"&c=customer&m=add_customer",o,t).map((function(e){return e.json()}))},e.prototype.editCustomer=function(e){var a=new n.Headers({"Content-Type":"text/plain"}),t=new n.RequestOptions({headers:a,method:"post"}),o=JSON.stringify(e);return this._http.post(this.PATH_SERVER+"&c=customer&m=edit_customer",o,t).map((function(e){return e.json()}))},e.prototype.deleteCustomerById=function(e){return this._http.get(this.PATH_SERVER+"&c=customer&m=delete_customer_by_id&customer_id="+e).map((function(e){return e.json()}))},e.prototype.getCustomerTypes=function(){return[{id:"1",name:"Vendedor"},{id:"2",name:"Comprador"}]},e.prototype.searchCustomerByKeyword=function(e){return this._http.get(this.PATH_SERVER+"&c=customer&m=get_customer_by_keyword&keyword="+e).map((function(e){return e.json()}))},e=__decorate([t.i(o.Injectable)(),__metadata("design:paramtypes",[n.Http,s.b])],e)})()},1467:function(e,a,t){"use strict";var o=t(0);t.d(a,"a",(function(){return n}));var n=(function(){function e(){this.smartTableData=[{id:1,firstName:"Mark",lastName:"Otto",username:"@mdo",email:"mdo@gmail.com",age:"28"},{id:2,firstName:"Jacob",lastName:"Thornton",username:"@fat",email:"fat@yandex.ru",age:"45"},{id:3,firstName:"Larry",lastName:"Bird",username:"@twitter",email:"twitter@outlook.com",age:"18"},{id:4,firstName:"John",lastName:"Snow",username:"@snow",email:"snow@gmail.com",age:"20"},{id:5,firstName:"Jack",lastName:"Sparrow",username:"@jack",email:"jack@yandex.ru",age:"30"},{id:6,firstName:"Ann",lastName:"Smith",username:"@ann",email:"ann@gmail.com",age:"21"},{id:7,firstName:"Barbara",lastName:"Black",username:"@barbara",email:"barbara@yandex.ru",age:"43"},{id:8,firstName:"Sevan",lastName:"Bagrat",username:"@sevan",email:"sevan@outlook.com",age:"13"},{id:9,firstName:"Ruben",lastName:"Vardan",username:"@ruben",email:"ruben@gmail.com",age:"22"},{id:10,firstName:"Karen",lastName:"Sevan",username:"@karen",email:"karen@yandex.ru",age:"33"},{id:11,firstName:"Mark",lastName:"Otto",username:"@mark",email:"mark@gmail.com",age:"38"},{id:12,firstName:"Jacob",lastName:"Thornton",username:"@jacob",email:"jacob@yandex.ru",age:"48"},{id:13,firstName:"Haik",lastName:"Hakob",username:"@haik",email:"haik@outlook.com",age:"48"},{id:14,firstName:"Garegin",lastName:"Jirair",username:"@garegin",email:"garegin@gmail.com",age:"40"},{id:15,firstName:"Krikor",lastName:"Bedros",username:"@krikor",email:"krikor@yandex.ru",age:"32"},{id:16,firstName:"Francisca",lastName:"Brady",username:"@Gibson",email:"franciscagibson@comtours.com",age:11},{id:17,firstName:"Tillman",lastName:"Figueroa",username:"@Snow",email:"tillmansnow@comtours.com",age:34},{id:18,firstName:"Jimenez",lastName:"Morris",username:"@Bryant",email:"jimenezbryant@comtours.com",age:45},{id:19,firstName:"Sandoval",lastName:"Jacobson",username:"@Mcbride",email:"sandovalmcbride@comtours.com",age:32},{id:20,firstName:"Griffin",lastName:"Torres",username:"@Charles",email:"griffincharles@comtours.com",age:19},{id:21,firstName:"Cora",lastName:"Parker",username:"@Caldwell",email:"coracaldwell@comtours.com",age:27},{id:22,firstName:"Cindy",lastName:"Bond",username:"@Velez",email:"cindyvelez@comtours.com",age:24},{id:23,firstName:"Frieda",lastName:"Tyson",username:"@Craig",email:"friedacraig@comtours.com",age:45},{id:24,firstName:"Cote",lastName:"Holcomb",username:"@Rowe",email:"coterowe@comtours.com",age:20},{id:25,firstName:"Trujillo",lastName:"Mejia",username:"@Valenzuela",email:"trujillovalenzuela@comtours.com",age:16},{id:26,firstName:"Pruitt",lastName:"Shepard",username:"@Sloan",email:"pruittsloan@comtours.com",age:44},{id:27,firstName:"Sutton",lastName:"Ortega",username:"@Black",email:"suttonblack@comtours.com",age:42},{id:28,firstName:"Marion",lastName:"Heath",username:"@Espinoza",email:"marionespinoza@comtours.com",age:47},{id:29,firstName:"Newman",lastName:"Hicks",username:"@Keith",email:"newmankeith@comtours.com",age:15},{id:30,firstName:"Boyle",lastName:"Larson",username:"@Summers",email:"boylesummers@comtours.com",age:32},{id:31,firstName:"Haynes",lastName:"Vinson",username:"@Mckenzie",email:"haynesmckenzie@comtours.com",age:15},{id:32,firstName:"Miller",lastName:"Acosta",username:"@Young",email:"milleryoung@comtours.com",age:55},{id:33,firstName:"Johnston",lastName:"Brown",username:"@Knight",email:"johnstonknight@comtours.com",age:29},{id:34,firstName:"Lena",lastName:"Pitts",username:"@Forbes",email:"lenaforbes@comtours.com",age:25},{id:35,firstName:"Terrie",lastName:"Kennedy",username:"@Branch",email:"terriebranch@comtours.com",age:37},{id:36,firstName:"Louise",lastName:"Aguirre",username:"@Kirby",email:"louisekirby@comtours.com",age:44},{id:37,firstName:"David",lastName:"Patton",username:"@Sanders",email:"davidsanders@comtours.com",age:26},{id:38,firstName:"Holden",lastName:"Barlow",username:"@Mckinney",email:"holdenmckinney@comtours.com",age:11},{id:39,firstName:"Baker",lastName:"Rivera",username:"@Montoya",email:"bakermontoya@comtours.com",age:47},{id:40,firstName:"Belinda",lastName:"Lloyd",username:"@Calderon",email:"belindacalderon@comtours.com",age:21},{id:41,firstName:"Pearson",lastName:"Patrick",username:"@Clements",email:"pearsonclements@comtours.com",age:42},{id:42,firstName:"Alyce",lastName:"Mckee",username:"@Daugherty",email:"alycedaugherty@comtours.com",age:55},{id:43,firstName:"Valencia",lastName:"Spence",username:"@Olsen",email:"valenciaolsen@comtours.com",age:20},{id:44,firstName:"Leach",lastName:"Holcomb",username:"@Humphrey",email:"leachhumphrey@comtours.com",age:28},{id:45,firstName:"Moss",lastName:"Baxter",username:"@Fitzpatrick",email:"mossfitzpatrick@comtours.com",age:51},{id:46,firstName:"Jeanne",lastName:"Cooke",username:"@Ward",email:"jeanneward@comtours.com",age:59},{id:47,firstName:"Wilma",lastName:"Briggs",username:"@Kidd",email:"wilmakidd@comtours.com",age:53},{id:48,firstName:"Beatrice",lastName:"Perry",username:"@Gilbert",email:"beatricegilbert@comtours.com",age:39},{id:49,firstName:"Whitaker",lastName:"Hyde",username:"@Mcdonald",email:"whitakermcdonald@comtours.com",age:35},{id:50,firstName:"Rebekah",lastName:"Duran",username:"@Gross",email:"rebekahgross@comtours.com",age:40},{id:51,firstName:"Earline",lastName:"Mayer",username:"@Woodward",email:"earlinewoodward@comtours.com",age:52},{id:52,firstName:"Moran",lastName:"Baxter",username:"@Johns",email:"moranjohns@comtours.com",age:20},{id:53,firstName:"Nanette",lastName:"Hubbard",username:"@Cooke",email:"nanettecooke@comtours.com",age:55},{id:54,firstName:"Dalton",lastName:"Walker",username:"@Hendricks",email:"daltonhendricks@comtours.com",age:25},{id:55,firstName:"Bennett",lastName:"Blake",username:"@Pena",email:"bennettpena@comtours.com",age:13},{id:56,firstName:"Kellie",lastName:"Horton",username:"@Weiss",email:"kellieweiss@comtours.com",age:48},{id:57,firstName:"Hobbs",lastName:"Talley",username:"@Sanford",email:"hobbssanford@comtours.com",age:28},{id:58,firstName:"Mcguire",lastName:"Donaldson",username:"@Roman",email:"mcguireroman@comtours.com",age:38},{id:59,firstName:"Rodriquez",lastName:"Saunders",username:"@Harper",email:"rodriquezharper@comtours.com",age:20},{id:60,firstName:"Lou",lastName:"Conner",username:"@Sanchez",email:"lousanchez@comtours.com",age:16}],this.metricsTableData=[{image:"app/browsers/chrome.svg",browser:"Google Chrome",visits:"10,392",isVisitsUp:!0,purchases:"4,214",isPurchasesUp:!0,percent:"45%",isPercentUp:!0},{image:"app/browsers/firefox.svg",browser:"Mozilla Firefox",visits:"7,873",isVisitsUp:!0,purchases:"3,031",isPurchasesUp:!1,percent:"28%",isPercentUp:!0},{image:"app/browsers/ie.svg",browser:"Internet Explorer",visits:"5,890",isVisitsUp:!1,purchases:"2,102",isPurchasesUp:!1,percent:"17%",isPercentUp:!1},{image:"app/browsers/safari.svg",browser:"Safari",visits:"4,001",isVisitsUp:!1,purchases:"1,001",isPurchasesUp:!1,percent:"14%",isPercentUp:!0},{image:"app/browsers/opera.svg",browser:"Opera",visits:"1,833",isVisitsUp:!0,purchases:"83",isPurchasesUp:!0,percent:"5%",isPercentUp:!1}]}return e.prototype.getData=function(){var e=this;return new Promise(function(a,t){setTimeout((function(){a(e.smartTableData)}),2e3)})},e=__decorate([t.i(o.Injectable)(),__metadata("design:paramtypes",[])],e)})()},1490:function(e,a,t){"use strict";var o=t(0),n=t(355),s=t(1467),r=t(715),i=(t.n(r),t(1465)),l=t(38),m=t(1546);t.d(a,"a",(function(){return d})),t.d(a,"b",(function(){return c}));var d=(function(){function e(e,a){this._router=e,this._customerService=a,this.showPermissionFlag=!1}return e.prototype.ngOnInit=function(){this.userData=JSON.parse(localStorage.getItem("userData")),this.customerTypes=this._customerService.getCustomerTypes(),this.customerData=this.value,this.value.user_id!==this.userData.id&&"admin"!==this.userData.rol_name||(this.showPermissionFlag=!0)},e.prototype.deleteUser=function(){this._customerService.callUpdateTableService()},e.prototype.showEditModal=function(){this.customerSelected=Object.assign({},this.customerData),this.editModal.show()},e.prototype.hideEditModal=function(){this.customerData=this.customerSelected,this.editModal.hide()},e.prototype.showViewModal=function(){this.viewModal.show()},e.prototype.hideViewModal=function(){this.viewModal.hide()},e.prototype.showDeleteModal=function(){this.deleteModal.show()},e.prototype.hideDeleteModal=function(){this.deleteModal.hide()},e.prototype.onEditCustomer=function(e){var a=this;this._customerService.editCustomer(e).subscribe((function(e){return alert(e)}),(function(){a.editModal.hide(),a._customerService.callUpdateTableService()}))},e.prototype.onDeleteCustomer=function(e){var a=this;this._customerService.deleteCustomerById(e).subscribe((function(e){return alert(e)}),(function(){a.deleteModal.hide(),a._customerService.callUpdateTableService()}))},__decorate([t.i(o.ViewChild)("editModal"),__metadata("design:type",n.d)],e.prototype,"editModal",void 0),__decorate([t.i(o.ViewChild)("deleteModal"),__metadata("design:type",n.d)],e.prototype,"deleteModal",void 0),__decorate([t.i(o.ViewChild)("viewModal"),__metadata("design:type",n.d)],e.prototype,"viewModal",void 0),__decorate([t.i(o.Input)(),__metadata("design:type",Object)],e.prototype,"value",void 0),__decorate([t.i(o.Input)(),__metadata("design:type",Object)],e.prototype,"rowData",void 0),e=__decorate([t.i(o.Component)({selector:"actions-table",template:t(1679),styles:[".alert-danger { padding: 5px 10px; margin-top: 5px; font-size: 10px} "]}),__metadata("design:paramtypes",[l.b,i.a])],e)})(),c=(function(){function e(e,a,t){var o=this;this.service=e,this._customerService=a,this._router=t,this.query="",this.settings={noDataMessage:"No se encontraron registros.",actions:{add:!1,edit:!1,delete:!1},columns:{id:{title:"ID",type:"number",filter:!1},name:{title:"Nombre",type:"string",filter:!1},email:{title:"E-mail",type:"string",filter:!1},type_name:{title:"Tipo",type:"string",filter:{type:"list",config:{selectText:"Todos",list:[{value:"Vendedor",title:"Vendedor"},{value:"Comprador",title:"Comprador"}]}}},createdAt:{title:"Creado",type:"date",filter:!1},item:{title:"Acciones",type:"custom",renderComponent:d,filter:!1}}},this.source=new r.LocalDataSource,this.showPermissionFlag=!1,this._customerService.componentMethodCalled$.subscribe((function(){o.getCustomersData()}))}return e.prototype.ngOnInit=function(){this.userData=JSON.parse(localStorage.getItem("userData")),this.newCustomerData=new m.a(1,this.userData.id,this.userData.office_id,"","","","","","",new m.b(1,"")),this.customerTypes=this._customerService.getCustomerTypes(),"admin"===this.userData.rol_name&&(this.showPermissionFlag=!0),this.getCustomersData()},e.prototype.updateList=function(){alert("update List")},e.prototype.getCustomersData=function(){var e=this;this._customerService.getCustomersByUser(this.userData.id).subscribe((function(a){return e.customers=a}),(function(e){return alert(e)}),(function(){e.customers=e.sourceLoadTable(e.customers),e.source.load(e.customers)}))},e.prototype.onSearch=function(e){void 0===e&&(e=""),this.source.setFilter([{field:"name",search:e},{field:"email",search:e}],!0)},e.prototype.showAddModal=function(){this.addModal.show()},e.prototype.hideAddModal=function(){this.addModal.hide()},e.prototype.onChangeUserFilter=function(e){var a=this;"1"===e?this._customerService.getCustomersByUser(this.userData.id).subscribe((function(e){return a.customers=e}),(function(e){return alert(e)}),(function(){a.source.load(a.sourceLoadTable(a.customers))})):this._customerService.getCustomersByOffice(this.userData.office_id).subscribe((function(e){return a.customers=e}),(function(e){return alert(e)}),(function(){a.source.load(a.sourceLoadTable(a.customers))}))},e.prototype.onAddCustomer=function(e){var a=this;this._customerService.addCustomer(e).subscribe((function(e){return alert(e)}),(function(){a.addModal.hide(),a.getCustomersData()}))},e.prototype.onUserRowSelect=function(e){},e.prototype.sourceLoadTable=function(e){return Object(e).forEach((function(e){var a;"1"===e.customer_type?(e.type_name="Vendedor",a=new m.b(e.customer_type,"Vendedor")):(e.type_name="Comprador",a=new m.b(e.customer_type,"Comprador")),e.item=new m.a(e.id,e.user_id,e.office_id,e.name,e.email,e.first_phone,e.second_phone,e.address,e.createdAt,a)})),e},__decorate([t.i(o.ViewChild)("addModal"),__metadata("design:type",n.d)],e.prototype,"addModal",void 0),e=__decorate([t.i(o.Component)({selector:"customers-list",template:t(1680),styles:[".alert-danger { padding: 5px 10px; margin-top: 5px; font-size: 10px} "]}),__metadata("design:paramtypes",[s.a,i.a,l.b])],e)})()},1491:function(e,a,t){"use strict";var o=t(0),n=t(38);t.d(a,"a",(function(){return s}));var s=(function(){function e(e){this._router=e}return e.prototype.ngOnInit=function(){},e=__decorate([t.i(o.Component)({template:"\n    <router-outlet></router-outlet>\n  "}),__metadata("design:paramtypes",[n.b])],e)})()},1545:function(e,a,t){"use strict";var o=t(38),n=t(1491),s=t(1490);t.d(a,"a",(function(){return i}));var r=[{path:"",component:n.a,children:[{path:"",component:s.b},{path:"customers_list",component:s.b}]}],i=o.a.forChild(r)},1546:function(e,a,t){"use strict";t.d(a,"a",(function(){return o})),t.d(a,"b",(function(){return n}));var o=(function(){function e(e,a,t,o,n,s,r,i,l,m){this.id=e,this.user_id=a,this.office_id=t,this.name=o,this.email=n,this.first_phone=s,this.second_phone=r,this.address=i,this.createdAt=l,this.customerType=m}return e})(),n=(function(){function e(e,a){this.id=e,this.name=a}return e})()},1679:function(e,a){e.exports='\n<button class="btn btn-success btn-icon" type="button" tooltip="Ver" (click)="showViewModal(customerData)">\n  <i class="ion-search"></i>\n</button>\n\n<button *ngIf=\'showPermissionFlag\' class="btn btn-info btn-icon" type="button" tooltip="Editar" (click)="showEditModal(customerData)">\n  <i class="ion-edit"></i>\n</button>\n\n<button *ngIf=\'showPermissionFlag\' class="btn btn-danger btn-icon" type="button" tooltip="Eliminar" (click)="showDeleteModal()">\n  <i class="ion-trash-a"></i>\n</button>\n\n<!-- View modal -->\n<div bsModal #viewModal="bs-modal" class="modal fade" [config]="{backdrop: \'static\'}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="line-height: initial;">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close pull-right" aria-label="Close" (click)="hideViewModal()">\n          <span aria-hidden="true">&times;</span>\n        </button>\n        <h4 class="modal-title">Ver Cliente</h4>\n      </div>\n      <div class="modal-body">\n\n        <form #customerEditForm="ngForm" novalidate>\n\n          <div class="form-group">\n            <label for="name">Nombre *</label>\n            <input type="text" class="form-control" name="name" [(ngModel)]="customerData.name" disabled>\n          </div>\n\n          <div class="form-group">\n\n            <label for="email">Email *</label>\n            <input type="text" class="form-control"  name="email" [(ngModel)]="customerData.email" disabled>\n\n          </div>\n\n          <div class="form-group">\n            <label for="phone1">Telefono 1</label>\n            <input type="text" class="form-control" name="first_phone" [(ngModel)]="customerData.first_phone" disabled>\n          </div>\n\n          <div class="form-group">\n            <label for="phone2">Telefono 2</label>\n            <input type="text" class="form-control" name="second_phone" [(ngModel)]="customerData.second_phone" disabled>\n          </div>\n\n          <div class="form-group">\n            <label for="address">Direccion</label>\n            <input type="text" class="form-control"  name="address" [(ngModel)]="customerData.address" disabled>\n          </div>\n\n          <div class="form-group">\n            <label for="customer_type">Tipo de usuario</label>\n            <input type="text" class="form-control" name="customerType" [(ngModel)]="customerData.customerType.name" disabled>\n          </div>\n\n          <hr>\n\n          <div class="form-group">\n            <button type="button" class="btn btn-danger" (click)="hideViewModal()">Cerrar</button>\n          </div>\n\n        </form>\n\n      </div>\n\n    </div>\n  </div>\n</div>\n\n<!-- Edit modal -->\n<div bsModal #editModal="bs-modal" class="modal fade" [config]="{backdrop: \'static\'}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="line-height: initial;">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close pull-right" aria-label="Close" (click)="hideEditModal()">\n          <span aria-hidden="true">&times;</span>\n        </button>\n        <h4 class="modal-title">Editar Cliente</h4>\n      </div>\n      <div class="modal-body">\n\n          <form #customerEditForm="ngForm" novalidate>\n\n            <div class="form-group">\n              <label for="name">Nombre *</label>\n              <input type="text" class="form-control"  id="name" placeholder="Nombre y apellidos" name="name" [(ngModel)]="customerData.name" required #name="ngModel">\n\n              <div [hidden]="name.valid || name.pristine" class="alert alert-danger">\n                * Nombre es requerido\n              </div>\n\n            </div>\n\n            <div class="form-group">\n\n              <label for="email">Email *</label>\n              <input type="text" class="form-control" id="email" placeholder="Correo electronico" name="email" [(ngModel)]="customerData.email" required #email="ngModel">\n\n              <div [hidden]="email.valid || email.pristine" class="alert alert-danger">\n                * Email es requerido\n              </div>\n\n            </div>\n\n            <div class="form-group">\n              <label for="phone1">Telefono 1</label>\n              <input type="text" class="form-control" id="phone1" placeholder="Telefono celular" name="first_phone" [(ngModel)]="customerData.first_phone">\n            </div>\n\n            <div class="form-group">\n              <label for="phone2">Telefono 2</label>\n              <input type="text" class="form-control" id="phone2" placeholder="Telefono fijo" name="second_phone" [(ngModel)]="customerData.second_phone">\n            </div>\n\n            <div class="form-group">\n              <label for="address">Direccion</label>\n              <input type="text" class="form-control" id="address" placeholder="Direccion" name="address" [(ngModel)]="customerData.address">\n            </div>\n\n            <div class="form-group">\n              <label for="customer_type">Tipo de usuario</label>\n              <select id="customer_type" class="form-control" [(ngModel)]="customerData.customerType.id" name="customerType" required>\n                <option *ngFor="let item of customerTypes" [ngValue]="item.id">{{item.name}}</option>\n              </select>\n            </div>\n\n            <hr>\n\n            <div class="form-group">\n              <button type="button" class="btn btn-success confirm-btn" [disabled]="!customerEditForm.form.valid" (click)="onEditCustomer(customerData)">Guardar</button>\n              <button type="button" class="btn btn-danger" (click)="hideEditModal()">Cancelar</button>\n            </div>\n\n          </form>\n\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<!-- Delete modal -->\n<div bsModal #deleteModal="bs-modal" class="modal fade" [config]="{backdrop: \'static\'}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="line-height: initial;">\n  <div class="modal-dialog modal-sm">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button class="close" aria-label="Close" (click)="hideDeleteModal()">\n          <span aria-hidden="true">&times;</span>\n        </button>\n        <h4 class="modal-title">Eliminar registro</h4>\n      </div>\n      <div class="modal-body">\n        ¿Esta seguro que desea eliminar a {{customerData.name}}?\n      </div>\n      <div class="modal-footer">\n\n        <button class="btn btn-success" (click)="onDeleteCustomer(customerData.id)">Aceptar</button>\n        <button class="btn btn-danger confirm-btn" (click)="hideDeleteModal()">Cancelar</button>\n\n      </div>\n    </div>\n  </div>\n</div>\n'},1680:function(e,a){e.exports='<div class="widgets">\n\n  <div class="row">\n\n    <div class="col-md-7">\n\n      <div class="form-group">\n        <label class="col-sm-3 form-control-label">Busqueda</label>\n        <div class="col-sm-9">\n          <input #search class="form-control" type="text" placeholder="Buscar..." (keyup)="onSearch(search.value)">\n        </div>\n      </div>\n\n    </div>\n\n    <div class="col-md-3">\n\n      <div class="form-group">\n        <label class="col-sm-4 form-control-label" name="userType">Filtro</label>\n        <div class="col-sm-8">\n          <select class="form-control" id="userType" (change)="onChangeUserFilter($event.target.value)">\n            <option value="1"> Mis clientes </option>\n            <option value="2" *ngIf="showPermissionFlag"> Todos </option>\n          </select>\n        </div>\n      </div>\n\n    </div>\n\n    <!--\n    <div class="col-md-3">\n\n      <div class="form-group">\n        <label class="col-sm-4 form-control-label" name="userType">Tipo</label>\n        <div class="col-sm-8">\n          <select class="form-control" id="userType" (change)="onChangeUserType($event.target.value)">\n            <option value=""> Todos </option>\n            <option value="1"> Vendedor </option>\n            <option value="2"> Comprador </option>\n          </select>\n        </div>\n      </div>\n\n    </div>-->\n\n    <div class="col-md-2">\n\n      <button class="btn btn-success" (click)="showAddModal()">\n        <i class="ion-plus-round"></i>  Agregar Cliente\n      </button>\n    </div>\n\n  </div>\n\n  <br>\n\n  <div class="row">\n    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (userRowSelect)="onUserRowSelect($event)"></ng2-smart-table>\n  </div>\n\n</div>\n\n\n<!-- Large modal -->\n<div bsModal #addModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="line-height: initial;">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close pull-right" aria-label="Close" (click)="hideAddModal()">\n          <span aria-hidden="true">&times;</span>\n        </button>\n        <h4 class="modal-title">Agregar Cliente</h4>\n      </div>\n      <div class="modal-body">\n\n        <form #customerAddForm="ngForm" novalidate>\n\n          <div class="form-group">\n            <label for="name">Nombre *</label>\n            <input type="text" class="form-control"  id="name" placeholder="Nombre y apellidos" name="name" [(ngModel)]="newCustomerData.name" required #name="ngModel">\n\n            <div [hidden]="name.valid || name.pristine" class="alert alert-danger">\n              * Nombre es requerido\n            </div>\n\n          </div>\n\n          <div class="form-group">\n\n            <label for="email">Email *</label>\n            <input type="text" class="form-control" id="email" placeholder="Correo electronico" name="email" [(ngModel)]="newCustomerData.email" required #email="ngModel">\n\n            <div [hidden]="email.valid || email.pristine" class="alert alert-danger">\n              * Email es requerido\n            </div>\n\n          </div>\n\n          <div class="form-group">\n            <label for="phone1">Telefono 1</label>\n            <input type="text" class="form-control" id="phone1" placeholder="Telefono celular" name="first_phone" [(ngModel)]="newCustomerData.first_phone">\n          </div>\n\n          <div class="form-group">\n            <label for="phone2">Telefono 2</label>\n            <input type="text" class="form-control" id="phone2" placeholder="Telefono fijo" name="second_phone" [(ngModel)]="newCustomerData.second_phone">\n          </div>\n\n          <div class="form-group">\n            <label for="address">Direccion</label>\n            <input type="text" class="form-control" id="address" placeholder="Direccion" name="address" [(ngModel)]="newCustomerData.address">\n          </div>\n\n          <div class="form-group">\n            <label for="customer_type">Tipo de usuario</label>\n            <select id="customer_type" class="form-control">\n              <option *ngFor="let item of customerTypes" [ngValue]="item.id">{{item.name}}</option>\n            </select>\n          </div>\n\n          <hr>\n\n          <div class="form-group">\n            <button type="submit" class="btn btn-success confirm-btn" [disabled]="!customerAddForm.form.valid" (click)="onAddCustomer(newCustomerData)">Guardar</button>\n            <button class="btn btn-danger" style="">Cancelar</button>\n          </div>\n\n        </form>\n\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n'}});