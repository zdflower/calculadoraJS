var expresion = "";//si pongo 0 inicialmente, después no funciona bien
var display;// = document.getElementById('display');

/*************************************************************
Falta:

¿cómo ingresar números negativos?

longitud de la expresión mostrada en el display, si es demasiado larga sobrepasa el lugar disponible. podría usar un tag de input en vez del div display
¿pero de qué tamaño? Me parece que no, porque en un input de tipo texto vos podés escribir y se borra el placeholder, así no es.

escribir tests, fórmulas, expresiones, detectar cosas que permite esta calculadora y que no debería

corregir esto: después de clickear = se debería mostrar el resultado pero después, si empiezo a escribir otro número debería limpiar el display y comenzar una nueva fórmula
esto es importante, ¿habría que guardar un historial de última tecla clickeada y si fue igual y la actual es un número o . limpiar la expresión y empezar una nueva?
porque si no, tendrías que limpiar explícitamente el display clickeando clear.

empezar de cero, hacer un cálculo, limpiar el display, empezar un nuevo cálculo
empezar de cero, hacer un cálculo, utilizar el resultado de ese cálculo en otro

podría agregar un botón de ans, es decir que usa el último resultado


¿Qué no sería válido? 
  00 o más ceros delante
  3.567.21 dos puntos decimales <-- cómo chequear esto, de modo que lo evite, pero que permita "3.567+2.5", es decir,
   no alcanza con chequear si la expresión contiene un '.', porque podría ser de otro operando y no del mismo.
  4+-5, dos operadores juntos, aunque esto se podría llegar a interpretar como 4 + (-5)


problema con la precisión: me muestra 4 decimales aunque sean 0, por ejemplo en 2*4= 8.0000

***************************************************************/

function mostrarNumero(num){
	display = document.getElementById('display');
	
	if (expresion === ""){
	  expresion = "0";
	}
	
	if (expresion === "0"){
	  if(num == '.'){
	    expresion = String(expresion).concat(String(num));
	  }
	  else {
	    expresion = num;
	  }
	} else {
    //chequear si la expresión ya tenía un '.', pero hay un pequeñísimo problema, ya que si sólo permite un ., no te deja tener dos números decimales!
    //hay que hacer un test más fino y distinguir si el punto está en un mismo número o no, es decir si encuentra un . pero en algún lugar después hay un operador, entonces te debería permitir volver a usar el .
    //if(num == '.' && String(expresion).includes('.')){
      //nada
    //}
    //else {
    expresion = String(expresion).concat(String(num));
    //}
	}
	display.textContent = expresion;
}

function clearDisplayHistory(){
    display = document.getElementById('display');
    expresion = "0";
    display.textContent = expresion;	
}

function mostrarOperacion(op){
  /* ¿Qué puede pasar?
   Que la expresión esté vacía, 
   que la expresión tenga un sólo número, 
   que el final de la expresión tenga un número seguido de una operación, 
   que el final de la expresión tenga un número seguido de una operación seguido de un número
  */

  //chequear si lo último que se había clickeado era otra operación, en ese caso reemplazarla por la actual op
  //qué pasa al evaluar si antes de un operador hay un .
  
  display = document.getElementById('display');
  if (expresion === ""){
    expresion = "0";
    expresion = String(expresion).concat(op);
  } else {
    //la expresión no es vacía, ¿tiene al menos 2 elementos?
    //quiero distinguir entre si termina con una operación o no
    if(String(expresion).endsWith('+') || String(expresion).endsWith('-') || String(expresion).endsWith('*') || String(expresion).endsWith('/')){
      expresion = String(expresion.slice(0, expresion.length - 1)) + String(op);
    } else {
        expresion = String(expresion).concat(op);
    }
  }

    display.textContent= expresion;
}

function resolver(){
  expresion = eval(expresion).toFixed(4); //con 4 decimales
  // tal vez estaría bueno que sólo usara 4 decimales y los mostrara si fueran distintos de 0
  display.textContent = expresion;
}