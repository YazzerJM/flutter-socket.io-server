const {io} = require('../index')


// Mesajes de Sockets
io.on('connection', client => {
   console.log('Cliente conectado');

   client.on('disconnect', () => {
      console.log('Cliente desconectado');
   });

   client.on('mensaje', (payload) => {
      console.log('Mensaje!!!', payload);

      client.emit('msj', {admin: 'Solo al cliente'});
      io.emit('mensaje', {admin: 'Nuevo Mensaje'});
   });
});