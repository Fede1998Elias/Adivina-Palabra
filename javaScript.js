//Arreglo que contiene las palabras para jugar
let arrayPalabras = ["GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA"];
//Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Instrumento Musical",
    "Animal de la selva",
    "Es un color",
    "Nombre de mujer",
    "Hardware de computadora",
    "Es un Pais"
];
//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual;

//arreglo que contiene la palabra actual con la que estoy jugando
let arrayPalabraActual = [];

//Cantidad de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

//Funcion que carga la  palabra nueva para jugar
function cargarNuevaPalabra() {
    //Aumento en uno cantidad de palabras jugadas y controlo si llego a su limite
    cantPalabrasJugadas++; //Incrementa en uno la cantidad de palabras jugadas cada vez que se llama a esta función. Esto se hace para llevar la cuenta de cuántas palabras se han jugado.
    if (cantPalabrasJugadas > 6) { //Verifica si la cantidad de palabras jugadas ha superado el límite de 6 palabras. Si es así, significa que se han jugado todas las palabras del arreglo arrayPalabras.
        //volvemos a cargar el arreglo
        //Si se han jugado más de 6 palabras, se vuelven a cargar los arreglos arrayPalabras y ayudas con las palabras y las ayudas originales. Esto es útil para reiniciar el juego después de haber jugado todas las palabras una vez.
        arrayPalabras = ["GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA"];
        ayudas = [
            "Instrumento Musical",
            "Animal de la selva",
            "Es un color",
            "Nombre de mujer",
            "Hardware de computadora",
            "Es un Pais"
        ];
    }

    //Selecciono una posicion random
   
    posActual = Math.floor(Math.random() * arrayPalabras.length);
    
    // Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual]; 
    //cantidad de letras que tiene esa palabra
    totalQueDebeAcertar = palabra.length;

    //coloco en 0 la cantidad acertadas hasta el momento
    cantidadAcertadas = 0; 
                        
   
    arrayPalabraActual = palabra.split('');

    //limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("palabra").innerHTML = ""; 
    
    //limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("letrasIngresadas").innerHTML = "";

    //Cargamos la cantidad de divs (letras) que tiene la palabra
    for (let i = 0; i < palabra.length; i++) {
        var divLetra = document.createElement("div");
        divLetra.className = "letra"; 
        document.getElementById("palabra").appendChild(divLetra); 
    }

    // Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    // seteamos los intentos
    intentosRestantes = 5;
   
    document.getElementById("intentos").innerHTML = intentosRestantes;


    // Cargamos la ayuda de la pregunta
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
     
}

//llamada para cargar la primera palabra del juego
cargarNuevaPalabra();


document.addEventListener("keydown", event => {
    
    if (isLetter(event.key)) {
       
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
       
        letrasIngresadas = letrasIngresadas.split('');

      
        if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
          
            let acerto = false;
       
            // Recorro el arreglo que contiene la palabra para verificar si la letra ingresada está
            for (let i = 0; i < arrayPalabraActual.length; i++) {
               
                if (arrayPalabraActual[i] == event.key.toUpperCase()) { // Acertó
                   
                   // Si el usuario acierta una letra, esta línea coloca esa letra en el div correspondiente en la pantalla
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true; 
                
                    cantidadAcertadas++;
                }
            }

            //Controlo si acerto al menos una letra
            if (acerto == true) {
                //controlamos si ya acerto todas
                if (totalQueDebeAcertar == cantidadAcertadas) {
                    //asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                //No acerto, decremento los intentos restantes
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                //controlamos si ya acabo todas la oportunidades
                if (intentosRestantes <= 0) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                }
            }

          
            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }

});

function isLetter(str) {
   
    return str.length === 1 && str.match(/[a-z]/i);
}
