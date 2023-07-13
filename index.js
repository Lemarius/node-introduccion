const port = 8000;



const express = require('express');
const app = express();
const fs = require('fs/promises'); // viene de FileSystem para leer archivos (en este caso .json) Para usar el metodo callback es solo fs, si es modo promesas hay que añadirle /promises

const testFile = __dirname + '/data/test.json'

// Middleware 
app.use(express.static(__dirname + '/public')); // Para que sea capaz de leer los archivos estáticos de public, así se pueden añadir el css.

// app.get('/test', (req, res) => {

//     // Callback error first

//     fs.readFile(testFile, (error, data) => {
//         if(error) {
//             res.send('Error al leer el archivo');
//             return; 
//         }
//         const jsonData = JSON.parse(data)

//         res.send(jsonData);
//     })

// }); // Con app.get indicas que depende de la ruta en la que estés en el proyecto, llama a un html u otro.

app.get('/test', async(req, res) => {

    // Callback error first

    try{
        const data = await fs.readFile(testFile);
        const jsonData = await JSON.parse(data);
        res.send(jsonData)
    } catch (err) {
        res.send('Error al leer el archivo');
    }

});


app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});