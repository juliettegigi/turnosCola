const path=require('path');
const fs=require('fs');

const CANTIDAD_ESCRITORIOS=4;

class Ticket{
    constructor(numero,escritorio){
        this.numero=numero;
        this.escritorio=escritorio;//para saber a q escritorio se le establece
    }
}

class TicketControl{
    constructor(){
        

        this.ultimo=0;// ticket q voy a estar atendiendo
        this.hoy=new Date().getDate();// tiene el número del dia, para saber si lo que tengo en la DB es igual al día de hoy
        this.tickets=[];//tickets por atender,un arr de ticket
        this.ticketXescritorio=[];//los que están siendo atendidos,tengo cuatro escritorios
        // a esto lo voy a almacenar en una DB, en un archivo json
        this.init();//si se cae el sevidor, tengo que cargarlos con datos que tenía
    }

 

    //grabar en archivo de texto//guardo por si se reiniciase el backend
    guardarDB(){
        const dbPath=path.join(__dirname,'../db/data.json');//
        fs.writeFileSync(dbPath,JSON.stringify(this))//el stringify me convierte el objeto a json
    }
    //para inicializar la clase
    init(){
       //leo el archivo json
       const {hoy,tickets,ultimo,ticketXescritorio}=require('../db/data.json');// es un json, pero data va a ser un objeto literal de js
       
       if(hoy===this.hoy){ // estoy en el mismo dia==>recargo el servidor
        this.tickets=tickets;
        this.ultimo=ultimo;
        this.ticketXescritorio=ticketXescritorio;
       }
       else{ //sino es otro dia
         this.guardarDB(); //guardo las variables con la inicialización q se hizo en el constructor
       }
    } 

   encolarTickets(){
    this.ultimo+=1;
    const ticket=new Ticket(this.ultimo,null);//creo un ticket, solo le pongo el número, porq el escritorio se va a asignar cuando se descole
    this.tickets.push(ticket);// una vez insertado actualizo la DB
    this.guardarDB();
    return 'Ticket '+this.ultimo; //retorno el ticket creado y encolado
   }

   atenderTicket(escritorio){//se descola y se le asigna un escritorio al ticket
    //validar si no tengo ticket
    if(this.tickets.length===0){return null;}
    //quito el 1er elemento del arreglo y lo pongo en el arreglo de los escritorios para que se vayan mostrando por pantalla los atendidos
    const ticket=this.tickets.shift();
    ticket.escritorio=escritorio;
    this.ticketXescritorio[escritorio-1]=ticket;//actualizo la DB
    this.guardarDB();
    return ticket 
}

cantidadDeEscritorios(){
    return CANTIDAD_ESCRITORIOS;   
}
 
}

module.exports=TicketControl;