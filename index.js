// express
const express = require('express');
const app = express();

const fs = require('fs');

app.listen(3000, () => {
	console.log('Se inicio el servidor en el puerto 3000');
});

// public
app.use(express.static('assets'));

// html raiz
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// Arreglo de nombres
const usuarios = {
	usuarios: ['Juan', 'Jocelyn', 'Astrid', 'María', 'Ignacia', 'Javier', 'Brian'],
};

// Ruta GET para devolver arreglo de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
	res.send(JSON.stringify(usuarios));
});

// middleware
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
	const nombre = req.params.usuario;

	const usuario = usuarios.usuarios.find((elemento) => {
		return elemento == nombre;
	});

	usuario == undefined ? res.sendFile(__dirname + '/assets/images/who.jpeg') : next();
});

// redireccion del juego
app.get('/abracadabra/juego/:usuario', (req, res) => {
	res.redirect('http://localhost:3000/');
});

// get true or false
app.get('/abracadabra/conejo/:n', (req, res) => {
	const n = Math.floor(Math.random() * (5 - 1)) + 1;

	const numero = req.params.n;

	numero == n
		? res.sendFile(__dirname + '/assets/images/conejito.jpg')
		: res.sendFile(__dirname + '/assets/images/voldemort.jpg');
});

// ruta default
app.get('*', (req, res) => {
	res.send(`
            <center>
                <h1>Aquí no hay nada, vuelve a busca</h1> 
            </center>
            `);
});
