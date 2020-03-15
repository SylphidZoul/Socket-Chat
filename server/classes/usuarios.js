
class Usuarios {

  constructor(){
    this.personas = []
  }

  agregarPersona(id, nombre, sala){
    let persona = {
      id,
      nombre,
      sala
    }

    this.personas.push(persona)

    return this.personas
  }

  getPersona(id){
    // filter devuelve una nueva array construida a partir de que la condicion sea true, por lo qe tambien debemos ponerle el indice
    let persona = this.personas.filter( persona =>  persona.id === id)[0]

    return persona;
  }
  
  getPersonas(){

    return this.personas
  }

  getPersonasPorSala( sala ){

    let personasEnSala = this.personas.filter( persona => persona.sala === sala)

    return personasEnSala
  }

  borrarPersona(id){

    let personaBorrada = this.getPersona(id)
    // Lo mismo qe arriba, creo una nueva array a partir de qe la condicion sea true, en este caso va a excluir de la array
    // la persona que estoy buscando
    this.personas = this.personas.filter( persona => persona.id !== id)

    return personaBorrada;
  }
}

module.exports = {
  Usuarios
}