/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  SOBRE */
    
    
        /* button  SOBRE */
    
    
        /* button  REGISTRAR OCORENCIA */
    
    
        /* button  REGISTRAR OCORENCIA */
    
    
        /* button  REGISTRAR OCORENCIA */
    
    
        /* button  CONFIGURAÇOES DA CONTA */
    $(document).on("click", ".uib_w_4", function(evt)
    {
         /*global activate_page */
         activate_page("#configuracao"); 
    });
    
        /* button  AJUDA */
    $(document).on("click", ".uib_w_5", function(evt)
    {
         /*global activate_page */
         activate_page("#Ajuda"); 
    });
    
        /* button  Voltar */
    $(document).on("click", ".uib_w_24", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
        /* button  Voltar */
    $(document).on("click", ".uib_w_18", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
        /* button  REGISTRAR OCORENCIA */
    
    
        /* button  REGISTRAR OCORENCIA */
    $(document).on("click", ".uib_w_2", function(evt)
    {
         /*global activate_page */
         activate_page("#RegistrarOcorencia"); 
    });
    
        /* button  Voltar */
    $(document).on("click", ".uib_w_36", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
        /* button  Enviar */
    $(document).on("click", ".uib_w_51", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
        /* button  Voltar */
    $(document).on("click", ".uib_w_68", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
        /* button  SOBRE */
    $(document).on("click", ".uib_w_6", function(evt)
    {
         /*global activate_page */
         activate_page("#Sobre"); 
    });
    
        /* button  VERIFICAR HISTORICO */
    $(document).on("click", ".uib_w_3", function(evt)
    {
         /*global activate_page */
         activate_page("#historico"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
