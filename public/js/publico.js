const arr=[document.getElementById("lblTicket1"),
           document.getElementById("lblTicket2"),
           document.getElementById("lblTicket3"),
           document.getElementById("lblTicket4"),];
const arr2=[document.getElementById("lblEscritorio1"),
            document.getElementById("lblEscritorio2"),
            document.getElementById("lblEscritorio3"),
            document.getElementById("lblEscritorio4"),];

const lblEscritorio1=document.getElementById("lblEscritorio1");

console.log('Público HTML');

const socket=io();

socket.on('connect',()=>{
    //Acá ponemos cosas para cuando nos reconectamos
    console.log("conectado");
})

socket.on('disconnect',()=>{
  //cosas para cuando se cae el servidor
})

socket.on('estado-actual',payload=>{//este evento es un arreglo q va a contener los 4 tickets.cuando el servidor va a emitir este evento? cuando se conecte y cuando
    //puede ocurrir que no existan los 4 tickets
   
    for(let i=0;i<4;i++)
       arr[i].innerHTML=payload[i] ? "Ticket "+payload[i].numero : '';
    for(let i=0;i<4;i++)
       arr2[i].innerHTML=payload[i] ? payload[i].escritorio : '';
})

