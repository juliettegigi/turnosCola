// Referencias del HTML
const listado=document.getElementById("listado");
const btnIngresar=document.querySelector('button');
let conectado=true;
const socket = io();



socket.on('connect', () => {
    console.log('Conectado');
    btnIngresar.disabled=false;
    if(conectado)
socket.emit('cantidad-escritorios',(cantidad)=>{

    for(let i=1;i<=cantidad;i++){
        const opc=document.createElement('option');
        opc.value=i;
        opc.innerHTML=i;
        listado.appendChild(opc);
    }
     

})

});

socket.on('disconnect', () => {
    conectado=false;
    btnIngresar.disabled=true;
});




