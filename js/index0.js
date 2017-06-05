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
    //  alert("es válido decimal? " + esValidoDecimal());
      if(esValidoDecimal(0, String(expresion))){//el parámetro es desde dónde revisa la expresión
        expresion = String(expresion).concat(String(num));
      }
    }
	}
	display.textContent = expresion;
}

function esValidoDecimal(j, str){

  var expr = //str.substring(j);
  var i = expr.indexOf('.'); 
  alert("expr: " + expr);
  if (i == -1){//no encontraste un . antes
    return true; //podés agregar uno
  } else { //hay un punto, ahora tenés que ver si después de ese punto en algún momento aparece algún operador
    var subst = String(expr).substring(i);
    //¿está bien esta guarda?
    //alert("había un punto, subst " + subst);
   // console.log(subst.indexOf('+') != -1 || subst.indexOf('-') != -1 || subst.indexOf('*') != -1 || subst.indexOf('/') != -1);
   var mas = subst.indexOf('+');
   var menos = subst.indexOf('-');
   var por = subst.indexOf('*');
   var dividido = subst.indexOf('/');
   var hayUnOperadorDespues = (mas != -1) || (menos != -1) || (por  != -1) || (dividido != -1);
   //alert("hay un + después?: " + hayUnMasDespues);
    if (hayUnOperadorDespues){
      var k = (mas)? mas: (menos)? menos: (por)? por: dividido;
      alert("subst: " + subst + "k: " + k);
      return true && resultado(k, subst);// && esValidoDecimal(k); //acá podría hacer una llamada recursiva pasándole el índice el operador, pero cómo sabés cuál encontró
    } else {
      return false;
    }
  }
}

function resultado(k, str){
  if (str.length < 1){
    return true;
  } else {
    esValidoDecimal(k, str);
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