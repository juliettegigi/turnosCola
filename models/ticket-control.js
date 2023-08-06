const path=require('path');
const fs=require('fs');

class Ticket{
    constructor(numero,escritorio){
        this.numero=numero;
        this.escritorio=escritorio;//para saber a q escritorio se le establece
    }
}

class TicketControl{
    constructor(){
        this.ultimo=0;//útimo ticket q voy a estar atendiendo
        this.hoy=new Date().getDate();// tiene el número del dia, para saber si lo que tengo en la DB es igual al día de hoy
        this.tickets=[];//acá van a estar todos los tickets pendientes,un arr de ticket
        this.ultimos4=[];//son los que se muestran , el q se atiende y los 3 q le siguen
        // a esto lo voy a almacenar en una DB, en un archivo json

        this.init();//inicializo
    }

 

    //grabar en archivo de texto//guardo por si se reiniciase el backend
    guardarDB(){
        const dbPath=path.join(__dirname,'../db/data.json');//
        fs.writeFileSync(dbPath,JSON.stringify(this))//el stringify me convierte el objeto a json
    }
    //para inicializar la clase
    init(){
       //leo el archivo json
       const {hoy,tickets,ultimo,ultimos4}=require('../db/data.json');// es un json, pero data va a ser un objeto literal de js
       //tengo que evaluar si el dia de hoy es igual al de la data
       if(hoy===this.hoy){ // estoy en el mismo dia y estoy recargando el servidor
        this.tickets=tickets;
        this.ultimo=ultimo;
        this.ultimos4=ultimos4;
       }
       else{ //sino es otro dia
         this.guardarDB(); //reinicializo las variables
       }
    } 

   encolar(){
    this.ultimo+=1;
    const ticket=new Ticket(this.ultimo,null);
    this.tickets.push(ticket);// una vez insertado lo guardo en la DB
    this.guardarDB();//para saber cual fue el nuevo ticket  y se quedara ahí por si se reiniciase el backend
    return 'Ticket '+this.ultimo;
   }

   atenderTicket(escritorio){//el escritorio es el que atiende un ticket respectivo //retorno el ticket q este escritorio tiene que atender
    //validar si no tengo ticket
    if(this.tickets.length===0){return null;}
    const ticket=this.tickets.shift();//me retorna el elemento eliminado, el 1ro. Este es el ticket que tengo q atender ahora y este tiene que estar en los ultimos4, en la pantalla
    ticket.escritorio=escritorio;
    this.ultimos4.unshift(ticket);//añado al inicio
    if(this.ultimos4.length>4){
        this.ultimos4.splice(-1,1);//1er arg=position,-1 quiere decir "fin del arr", me remueve los elementos, desde el final del arr, segundo argumento=cantidad==> me remueve un elemento desde el final del arr y el 3er,4to...argumentos son elementos que quiero agregar 
    }  
    this.guardarDB();
    return ticket 
}
 
}

module.exports=TicketControl;