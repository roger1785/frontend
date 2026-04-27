function Hora() {
    const fecha = new Date();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();    
    return (
        <div>
            <h2>Hora actual</h2>    
            <p>{hora}:{minutos}:{segundos}</p>
        </div>
    );
}

export default Hora;
