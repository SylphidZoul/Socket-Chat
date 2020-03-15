const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utilidades')

const usuarios = new Usuarios()

io.on('connection', (client) => {

    console.log('Usuario conectado');

    // ===================================================================================
    //                      Al conectarse un usuario al chat
    // ===================================================================================
    client.on('entrarChat', (usuario, callback) => {
        
        if (!usuario.nombre || !usuario.sala){
            return callback({
                err: true,
                message: 'El nombre y la sala son necesario.'
            })
        }

        client.join(usuario.sala)

        usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala)
        
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala))

        callback(usuarios.getPersonasPorSala(usuario.sala))
    })

    //====================================================================================
    //                          Al un usuario mandar un mensaje
    // ===================================================================================
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje(persona.nombre, data.mensaje)

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    })

    //====================================================================================
    //                      Al desconectarse un usuario
    //====================================================================================
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id)
        
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió del chat.`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala))
    })

    client.on('mensajePrivado', (data) =>{

        let persona = usuarios.getPersona(client.id)
        
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});