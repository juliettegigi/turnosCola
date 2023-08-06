const escritorioh1=document.querySelector("#escritorioh1")
const btnAtender=document.querySelector("#btnAtender")
const atendiendoA=document.querySelector("#atendiendoA")
const divNoTickets=document.querySelector("#divNoTickets")
const lblPendientes=document.getElementById("lblPendientes")
function comienzaConEscritorioYNumero(palabra) {

    const regex = /^escritorio \d+$/;
    
    return  regex.test(palabra)
  }



//para leer los parametros de la url
const searchParams=new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){// si no existe "escritorio" en la url
    window.location='index.html'; // lleva al usuario a index.html
    throw new Error('El escritorio es obligatorio')
}

const escritorio=searchParams.get("escritorio");//escritorio que me viene en la url

if(!comienzaConEscritorioYNumero(escritorio))// si no tiene la forma escritorio+numero
   window.location='index.html'; // lleva al usuario a index.html

// coloco el nombre del escritorio en el h4   
escritorioh1.innerHTML=escritorio;   
divNoTickets.style.display='none';




const socket = io();



socket.on('connect', () => {
   btnAtender.disabled=false;
   socket.emit('cantidad-de-tickets',(cantidad)=>{
    lblPendientes.innerHTML=cantidad; 
   })

});

socket.on('disconnect', () => {
    btnAtender.disabled=true;
});



socket.on('tickets-cambio-cantidad', cantidad => {
    lblPendientes.innerHTML=cantidad;   
    if(cantidad===0)
      divNoTickets.style.display='';
    else divNoTickets.style.display='none';
})
btnAtender.addEventListener( 'click', () => {
     
     socket.emit('atender-ticket',{escritorio},({ok,ticket})=>{ //recibo el ticket q tengo que atender, le pongo payload porq puede devolverme si no hay tickets, el ticket, por eso voy a recibir un objeto
        if(ok){
          atendiendoA.innerHTML="Ticket "+ticket.numero;
          const audio=new Audio('../audio/new-ticket.mp3'); //clase propia dle nav web
          audio.play();
        }
         
        else {
            atendiendoA.innerHTML="Nadie.";
            }
     })
    
    });

