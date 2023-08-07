const arr=[document.getElementById("lblTicket1"),
           document.getElementById("lblTicket2"),
           document.getElementById("lblTicket3"),
           document.getElementById("lblTicket4"),];
const arr2=[document.getElementById("lblEscritorio1"),
            document.getElementById("lblEscritorio2"),
            document.getElementById("lblEscritorio3"),
            document.getElementById("lblEscritorio4"),];


const socket=io();



socket.on('estado-actual',payload=>{//payload es un arreglo q va a contener los 4 tickets.server emite esto cuando se conecta
    //puede ocurrir que no existan los 4 tickets
   socket.emit('cantidad-escritorios',cantidad=>{
    for(let i=0;i<cantidad;i++){
       arr[i].innerHTML=payload[i] ? "Ticket "+payload[i].numero : '';
       arr2[i].innerHTML=payload[i] ?"Escritorio "+ payload[i].escritorio : '';
      }
       
      })
})

