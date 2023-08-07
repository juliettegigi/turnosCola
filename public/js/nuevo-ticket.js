const lblNuevoTicket=document.querySelector('#lblNuevoTicket');
const btnGenerarTicket= document.querySelector('#btnGenerarTicket');




const socket = io();

socket.on('ultimo-ticket',(ultimo)=>{ // este evento  se usa una sola vez ==> sería mejor con una petición http
    lblNuevoTicket.innerHTML='Ticket '+ultimo;
})

socket.on('connect', () => {
    //console.log('Conectado');
    //si se conecta habilito el botón
    btnGenerarTicket.disabled=false;
  

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    //si se me desconecta, se me cae el server, lo deshabilito
    btnGenerarTicket.disabled=true;
});




btnGenerarTicket.addEventListener( 'click', () => {

  
    socket.emit( 'generar-ticket',(ticketStr)=>{// le mando una función para que me la ejecute con el string "Ticket 8"
            lblNuevoTicket.innerHTML=ticketStr;
    });
    });

