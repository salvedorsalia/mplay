/*****************************
Autor:Jose Carlos Ruiz
Fecha Modificacion: 07/07/2018
Archivo JS
******************************/
var $$ = Dom7;

var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  /*panel: {
    swipe: 'left',
  },*/
  // Add default routes
  routes: routes
  // ... other parameters
});


var mainView = app7.views.create('.view-main'); 


var app = {

    autentificado: false,
    usuario:"",
    password:"",
    nombre:"",
    email:"",
    estado:"",
    mensaje:"",
    urlVideo:"",
    tituloVideo:"",
    hostname:"https://veracruz.sintesis.mx",
   




    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        console.log("VARIABLE AUTENTIFICADO:"+window.localStorage.getItem("autentificado"));


          if(window.localStorage.getItem("autentificado")=="true"){

             mainView.router.navigate('/home/',{animate:true});


          }


         
        
         
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },
    loginAccess:function(){


      this.usuario = $$('#usuario').val();
      this.password = $$('#password').val();


      if(this.usuario == "" || this.password == ""){
         
         app7.dialog.alert('Debes de ingresar usuario y/o contraseña');
           
      }else{

        app7.preloader.show();
        
  

        app7.request({
              url: this.hostname+'/mplay/api/login.php',
              data:{username:this.usuario,password: this.password},
              method: 'POST',
              crossDomain: true,

              success:function(data){

                app7.preloader.hide();
                var objson = JSON.parse(data);
               
                
                 
                 if (objson.data == "autentificado") {

                  window.localStorage.setItem("autentificado", "true");
                  this.autentificado = window.localStorage.getItem("autentificado");
                  //console.log(this.autentificado); 
                   mainView.router.navigate('/home/',{animate:true});

                 }else{

                  app7.dialog.alert("usuario o password incorrecto");
                 }
                
                //console.log(objson.data);

              },

              error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(data);
              }


});
             
          

      }

    },
    
    RegisterAccess:function(){

      mainView.router.navigate('/register/',{animate:true});
      app7.panel.close();

    
    },

    Contacto:function(){

      mainView.router.navigate('/Contacto/',{animate:true});
      app7.panel.close();

    
    },

    Home:function(){

      mainView.router.navigate('/home/',{animate:true});
      app7.panel.close();

    
    },


    RegisterUser: function(){

      this.nombre = $$('#frm_name').val();
      this.usuario = $$('#frm_username').val();
      this.password = $$('#frm_password').val();
     

   
     app7.request({
              url: this.hostname+'/mplay/api/users.php',
              data:{usuario:this.usuario,password: this.password,nombre: this.nombre},
              method: 'POST',
              crossDomain: true,

              success:function(data){

                app7.preloader.hide();
                var objson = JSON.parse(data);


                 if (objson.data == "registrado") {

                  window.localStorage.setItem("registrado", "true");
                  this.autentificado = window.localStorage.getItem("registrado");
                  //console.log(this.autentificado); 
                  

                 }else{

                  app7.dialog.alert("Gracias por tu registro favor de imgresar");
                   mainView.router.navigate('/login/',{animate:true});
                 }

},
                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(data);
              
}
              });

   

    },


     FormularioContacto: function(){

      this.nombre = $$('#nombre_contacto').val();
      this.email = $$('#email_contacto').val();
      this.estado = $$('#estado_contacto').val();
      this.mensaje = $$('#comentarios_contacto').val();

        if(this.nombre!="" || this.email!="" || this.estado!="" || this.mensaje!="")
{
     

     app7.request({
              url: this.hostname+'/mplay/api/contacto.php',
              data:{nombre:this.nombre,email: this.email,estado: this.estado,mensaje: this.mensaje},
              method: 'POST',
              crossDomain: true,

              success:function(data){

                app7.preloader.hide();
                var objson = JSON.parse(data);
                app7.dialog.alert("Gracias por tu mensaje Nos Comunicaremos A La Mas Brebedad Posible");
                mainView.router.navigate('/home/',{animate:true});



},
                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(data);
              
}
              });

     }else{

    app7.dialog.alert("Favor de verificar tus datos");
   }

    },

    loginClose:function(){
     

        app7.panel.close();
        app7.dialog.confirm('¿Seguro, deseas salir de la aplicación?', function () {
            
        window.localStorage.setItem("autentificado", "false");
        mainView.router.navigate('/login/',{animate:true});
    
      });

    }
};


function showMenu(){

   app7.panel.open('left', true);

}


$$(document).on('page:init', '.page[data-name="home"]', function (e) {
      console.log('View Home load Init!');
      app7.panel.allowOpen = true;
      app7.panel.enableSwipe('left');

      var $ptrContent = app7.ptr.create('.ptr-content');

      $ptrContent.on('refresh', function (e) {

        
        getVideos();
        getSlider();



        

      });


      getSlider();
      getVideos();

      
});



function goVideo(titulo,url){
  
  app.tituloVideo =titulo;
  app.urlVideo=url;
  mainView.router.navigate('/video/',{animate:true});
}

$$(document).on('page:init', '.page[data-name="video"]', function (e) {


 
  console.log(app.urlVideo);

  $$('.videoyoutube iframe').remove();
  $$('<iframe width="100%" height="200"  frameborder="0" allowfullscreen>').attr('src',app.urlVideo).appendTo('.videoyoutube');








});



function getVideos(){


  app7.preloader.show();
  app7.request({
              url: app.hostname+'/mplay/api/videos.php',
              method: 'GET',
              crossDomain: true,

              success:function(data){

             
                app7.preloader.hide();
                app7.ptr.done();
                $$('#content-videos').html("");
                
                var objson = JSON.parse(data);
                var video ="";

                for(x in objson.data){
                  console.log(objson.data[x].titulo);

                  video='<div class="item"><div class="post"><img src="'+objson.data[x].imagen+'" onClick="goVideo(\''+objson.data[x].titulo+'\',\''+objson.data[x].url+'\')"><div class="time">'+objson.data[x].duraccion+'</div></div><h5>'+objson.data[x].titulo+'</h5><p>Por:'+objson.data[x].autor+'</p><p>'+objson.data[x].visitas+' visitas | '+objson.data[x].fecha+'</p></div>'

                  $$('#content-videos').append(video);
                }

                

              },

                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(error);
              
}
              });



}


function getSlider(){


  app7.preloader.show();
  app7.request({
              url: app.hostname+ '/mplay/api/slider.php',
              method: 'GET',
              crossDomain: true,

              success:function(data){

             
                app7.preloader.hide();
                var objson = JSON.parse(data);
                var video ="";

                var swiper = app7.swiper.get('.swiper-container');
                swiper.removeAllSlides();

                for(x in objson.data){
                  console.log(objson.data[x].titulo);

                
                  var slide ='<div class="swiper-slide"><div class="mask"></div><img class="respimg" src="/img/'+objson.data[x].imagen+'"><div class="caption"><h2>'+objson.data[x].titulo+'</h2><p>'+objson.data[x].fecha+'</p><button>Ver Mas</button> </div></div>'
                


                swiper.appendSlide(slide);

                }



                

              },

                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(error);
              
}
              });



}






function RefreshVideos(){

   
   app7.request({
              url: app.hostname+'/mplay/api/videos.php',
              method: 'GET',
              crossDomain: true,

              success:function(data){

                app7.ptr.done();
                $$('#content-videos').html("");

             
                
                var objson = JSON.parse(data);
                var video ="";

                for(x in objson.data){
                  console.log(objson.data[x].titulo);

                  video='<div class="item"><div class="post"><img src="'+objson.data[x].imagen+'"><div class="time">'+objson.data[x].duraccion+'</div></div><h5>'+objson.data[x].titulo+'</h5><p>Por:'+objson.data[x].autor+'</p><p>'+objson.data[x].visitas+' visitas | '+objson.data[x].fecha+'</p></div>'

                  $$('#content-videos').append(video);
                }

                

              },

                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(error);
              
}
              });


}


$$(document).on('page:init', '.page[data-name="search"]', function (e) {

 // buscar("papa");

 $$('#search').on('keyup', function (e) {
var keyCode = e.keyCode || e.which;

if (keyCode === 13) {

buscar($$('#search').val());
e.preventDefault();
return false;

}else{


}

});
  

  });



function buscar(buscar){

  var buscar=buscar;
  
  $$('#list-search').html('');


  
  app7.preloader.show();
  app7.request({
              url: app.hostname+'/mplay/api/search.php?buscar='+buscar,
              method: 'GET',
              crossDomain: true,

              success:function(data){

              

             
                app7.preloader.hide();
                var objson = JSON.parse(data);
                var video ="";

                if(objson.data =="Videos No Encontrado"){

                  video = "404 No Se Encontro Nada";
                  $$('#list-search').append(video);
                }else{


                  for(x in objson.data){
                  console.log(objson.data[x].titulo);

                  video='<li><a href="#" class="item-link item-content"><div class="item-media"><img src="/img/'+objson.data[x].imagen+'" width="100" /></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+objson.data[x].titulo+'</div> </div> <div class="item-subtitle">'+objson.data[x].autor+'</div><div class="item-text">'+objson.data[x].fecha+'</div></div> </a> </li>'

                  $$('#list-search').append(video);
                }



                }
               

                

                

              },

                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(error);
              
}
              });



}
