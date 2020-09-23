const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands;

bands.addBand(new Band('ACDC'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

// Mesajes de Sockets
io.on('connection', client => { 
   console.log('Cliente conectado');

   client.emit('active-bands', bands.getBands());

   client.on('disconnect', () => {
      console.log('Cliente desconectado');
   });

   client.on('mensaje', (payload) => {
      // client.emit('msj', {admin: 'Solo al cliente'});
      io.emit('mensaje', {admin: 'Nuevo Mensaje'});
   });

   client.on('emitir-mensaje', (payload) => {
      // console.log(payload);
      // io.emit('nuevo-mensaje', payload); // Emite a todos.
      client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos al que lo emitio.
   });

   client.on('vote-band', (payload) => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });

   client.on('add-band', (payload) => {
      // const newBand = new Band(payload.name);
      bands.addBand(new Band(payload.name));
      io.emit('active-bands', bands.getBands());
   });

   client.on('delete-band', (payload) => {
      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });
});
