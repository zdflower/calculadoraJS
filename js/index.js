var expresion = "";
var display;
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
    //chequear si la expresión ya tenía un '.', 
    //hay que distinguir si el punto está en un mismo operando o no.
    if(num != '.'){
      expresion = String(expresion).concat(String(num));
    } else {
      if(esValidoDecimal(String(expresion))){//el parámetro es desde dónde revisa la expresión
        expresion = String(expresion).concat(String(num));
      }
    }
	}
	display.textContent = expresion;
}

function esValidoDecimal(expr){
  //busco desde el último punto si hay un operador
  //si expr.lastIndexOf('.') != -1 hay un '.', tomar la substring desde ese índice hasta el final y ahí buscar un operador, si no hay entonces no se puede agregar otro .
  var i = expr.lastIndexOf('.');
  //alert("i: " + i);
  if (i != -1){ //encontraste un .
    //en expr[i:] buscar el primer operador que aparezca
    var subst = expr.slice(i);
    var mas = subst.indexOf('+');
    var menos = subst.indexOf('-');
    var por = subst.indexOf('*');
    var dividido = subst.indexOf('/');
    if ((mas != -1) || (menos != -1) || (por != -1) || (dividido != -1)){
      return true;
    } else {
      return false;
    }
  } else {
    //no encontraste un punto, podés poner un punto
    return true;
  }
}

function clearDisplayHistory(){
    display = document.getElementById('display');
    expresion = "0";
    display.textContent = expresion;	
}

function mostrarOperacion(op){
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
  expresion = Number(eval(expresion).toFixed(4));//lo volví a convertir a número para que si los decimales son 0, los descarte
  display.textContent = expresion;
}