
// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnGenerarTicket= document.querySelector('#btnGenerarTicket');


const socket = io();



socket.on('connect', () => {
    console.log('Conectado');

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});




btnGenerarTicket.addEventListener( 'click', () => {

    console.log("algo");
    
    socket.emit( 'generar-ticket');
    });

