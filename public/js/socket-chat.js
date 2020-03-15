var socket = io();
var params = new URLSearchParams(window.location.search);

if ( !params.has('nombre') || !params.has('sala')){
    window.location = 'index.html'
    throw new Error('El nombre y sala son necesarios')
}
var usuario = {nombre: params.get('nombre'), sala: params.get('sala')}

//========================================================================================
//                               Al conectarse al chat
//========================================================================================
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){
        console.log(resp)
    })

});

// =======================================================================================
//                                  Al desconectarse el usuario
//========================================================================================
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');


});

// =======================================================================================
//                              Cuando un usuario envia un mensaje
// =======================================================================================
// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

//========================================================================================
// Escuchar cuando un usuario entra y sale del chat:
//========================================================================================
// Cuando alguien se desconecta del chat
socket.on('crearMensaje', function(mensaje) {
    
    console.log('Servidor:', mensaje);
    
});

//cuando alguien se une al chat:
socket.on('listaPersonas', function(personas){

    console.log(personas)
})

//========================================================================================
//                           Mensajes privados
//========================================================================================

socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje privado: ', mensaje)
})