const TicketControl = require("../models/ticket-control");
//cada vez q se reinicializa el backend, esta instancia va a ser única, por eso no va dentro del socket controller, sino, se crearían varias instancias por cada cliente que se
const ticketControl= new TicketControl();    

const socketController = (socket) => {
   socket.emit('ultimo-ticket',ticketControl.ultimo)// el socket va a emitir,alguien va a escuchar a este evento, va a enviarle el ultimo ticket
   // const objeto= new TicketControl();   
   console.log("Cliente conectado ",socket.id);
   console.log(ticketControl);
   socket.emit('estado-actual',ticketControl.ultimos4)
   //socket.on('disconnect', () => {    });

    socket.on('cantidad-de-tickets',cb=>{
        cb(ticketControl.tickets.length)
    })

    socket.on('generar-ticket', (payload,  callback ) => {
    
        const ultimoTicket=ticketControl.encolar();//me retorna un string "Ticket 8"
        console.log("pp",ultimoTicket);
        callback(ultimoTicket);// ejecuto con esto la función q me pasa el emiter
        //TODO:notificar qu hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickets-cambio-cantidad',ticketControl.tickets.length)
    })


    socket.on('atender-ticket',({escritorio},cb)=>{// me emiten un evento para que atiennda a un cliente y les retorne el numero de ticket, a ese número lo van a plasmar en el html
        //tengo q ejecutar el callback con el ticket q hay q atender
        if(!escritorio) {
            return cb({ok:false,msg:'El escritorio es obligatorio'})
        }
    
        const ticket=ticketControl.atenderTicket(escritorio);// me retorna un ticket q tiene dos propiedades, el numero y escritorio
//TODO:notificar cambio en los ultimos4, alguien va a escuchar cuando los ultimos 4 cambien, la pantalla "publico"

socket.broadcast.emit('tickets-cambio-cantidad',ticketControl.tickets.length)
socket.emit('tickets-cambio-cantidad',ticketControl.tickets.length)
socket.broadcast.emit('estado-actual',ticketControl.ultimos4)//le emito a todas las pantallas q escuchen a estado-actual, sino se emite  a quien emitió el "atender ticket"

        if(!ticket)
             cb({ok:false,msg:'No hay tickets pendientes.'})
        else cb({ok:true,ticket})
    })

}

    

module.exports = {
    socketController
}

