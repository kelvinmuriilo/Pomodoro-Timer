//-----------------------------------------POMODORO TIMER ----------------------------------------------//
/*Desenvolvido por Kelvin Murilo*/
var padraoMinutoPomodoro = 24
var padraoMinutoCurta = 4
var padraoMinutoLonga = 9
var contadorMinutosCiclo = window.localStorage.getItem('minutosDoContador') - 1 //Minutos do ciclo Pomodoro
var valorMinutosPlonga = window.localStorage.getItem('minutosPausaLonga') - 1 //Minutos da pausa longa
var valorMinutosPcurta = window.localStorage.getItem('minutosPausaCurta') - 1 //Minutos pausa curta
var statusCiclo = false
var statusPause = false
var statusPausaLonga = false
var statusPausaCurta = false
if (contadorMinutosCiclo < 0) {
	contadorMinutosCiclo = 24
}

document.getElementById('timer').innerHTML = ('00' + (contadorMinutosCiclo + 1)).slice(-2) + ':' + ('00' + '0').slice(-2)


//document.getElementById('tempo').innerHTML = ('00' + (contadorMinutosCiclo+1)).slice(-2) + ':00'	

function timer(tipoPomodoro) {
	if (tipoPomodoro === 'pomodoro') {
		let minutos = contadorMinutosCiclo
		ciclo(minutos, contadorMinutosCiclo, padraoMinutoPomodoro)

	}

	if (tipoPomodoro === 'pausaCurta') {
		let minutos = valorMinutosPcurta
		ciclo(minutos, valorMinutosPcurta, padraoMinutoCurta)
	}
}

/*Função que cria os ciclos de tempo das pausas e do pomodoro*/
function ciclo(valorMinuto, valorGlobalMinuto, valorMinutoPadrao) {
	let segundos = 60
	if (valorMinuto <= 0) {
		valorMinuto = valorMinutoPadrao
	}
	cicloPomodoro = setInterval(function () {
		if (segundos == 0 && valorMinuto == 0) {
			clearInterval(cicloPomodoro)
			valorMinuto = valorGlobalMinuto
		}

		/*if (valorMinuto < 0) {
			valorMinuto = valorGlobalMinuto
		}*/

		if (valorMinuto >= 0 && segundos > 0) {
			segundos -= 1
		}

		document.getElementById('timer').innerHTML = ('00' + valorMinuto).slice(-2) + ':' + ('00' + segundos).slice(-2)

		if (valorMinuto > 0 && segundos == 0) {
			valorMinuto -= 1
			segundos = 60
		}
	}, 1000)
}


function obterValores() {
	let contadorMinutosCiclo = document.getElementById('ciclo_pomodoro').value // Minutos do ciclo pomodoro
	let contadorMinutos = document.getElementById('pausa_curta').value 		   // Minutos da pausa curta
	let contadorMinutosPLonga = document.getElementById('pausa_longa').value	// Minutos da pausa longa		
	window.localStorage.setItem('minutosDoContador', contadorMinutosCiclo)
	window.localStorage.setItem('minutosPausaCurta', contadorMinutos)
	window.localStorage.setItem('minutosPausaLonga', contadorMinutosPLonga)
}
/*
function iniciarCronometro() {
	var valorContadorSegundos = 60
	if (statusCiclo == false && statusPausaCurta == false && statusPausaLonga == false) {
		document.getElementById('label1').className = "btn btn-secondary active"
		document.getElementById('label2').className = "btn btn-secondary"
		document.getElementById('label3').className = "btn btn-secondary"
		alterarDisplay('timerPomodoro')
		statusCiclo = true
		statusPause = false
		let valorContadorMinutos = contadorMinutosCiclo

		ciclo = setInterval(function () {
			if (valorContadorMinutos == 0 && valorContadorSegundos == 0) {
				clearInterval(ciclo)
				statusCiclo = false
				statusPause = false
				valorContadorMinutos = window.localStorage.getItem('minutosDoContador') - 1

				if (valorContadorMinutos < 0) {
					valorContadorMinutos = 24
				}
			}
			if (valorContadorSegundos > 0) {
				valorContadorSegundos -= 1
			}
			document.getElementById('tempoPomodoro').innerHTML = ('00' + valorContadorMinutos).slice(-2) + ':' + ('00' + valorContadorSegundos).slice(-2)
			if (valorContadorSegundos == 0 && valorContadorMinutos > 0) {
				valorContadorMinutos -= 1
				valorContadorSegundos = 60
			}
		}, 1000)
		return statusPause, statusCiclo
	}
}

function retomarContagem() {
	if (statusPause) {
		statusPausaLonga = true
		pLonga = setInterval(function () {
			if (contadorMinutos == 0 && contadorSegundos == 0) {
				clearInterval(pLonga)
				statusPausaLonga = false
			}
			if (contadorSegundos > 0) {
				contadorSegundos -= 1
			}
			document.getElementById('tempoPausaLonga').innerHTML = ('00' + contadorMinutos).slice(-2) + ':' + ('00' + contadorSegundos).slice(-2)
			if (contadorSegundos == 0 && contadorMinutos > 0) {
				contadorMinutos -= 1
				contadorSegundos = 60
			}
		}, 1000)
	}

	if (statusPause) {
		statusPausaCurta = true
		pCurta = setInterval(function () {
			if (contadorMinutos == 0 && contadorSegundos == 0) {
				clearInterval(pCurta)
				statusPausaLonga = false
			}
			if (contadorSegundosPcurta > 0) {
				contadorSegundosPcurta -= 1
			}
			document.getElementById('tempoPausaCurta').innerHTML = ('00' + contadorMinutosPcurta).slice(-2) + ':' + ('00' + contadorSegundosPcurta).slice(-2)
			if (contadorSegundosPcurta == 0 && contadorMinutosPcurta > 0) {
				contadorMinutosPcurta -= 1
				contadorSegundosPcurta = 60
			}
		}, 1000)
	}
}


function pausarContagem() {
	statusPause = true
	if (statusCiclo == true) {
		clearInterval(ciclo)
		statusCiclo = false
	}
	if (statusPausaLonga === true) {
		clearInterval(pLonga)
	}
	if (statusPausaCurta === true) {
		clearInterval(pCurta)
	}
	return statusPause, statusCiclo
}

function reiniciarContagem() {
	/*valorContadorSegundos = 60
	valorContadorMinutos = window.localStorage.getItem('minutosDoContador')-1
	iniciarCronometro()

//------------------------------------------------------PAUSA LONGA---------------------------------------------------------// 

if (valorMinutosPlonga < 0) {
	contadorMinutos = 9
}


function pausaLonga() {
	let contadorSegundos = 60
	if (statusCiclo == false && statusPausaLonga == false && statusPausaCurta == false) {
		document.getElementById('label1').className = "btn btn-secondary"
		document.getElementById('label2').className = "btn btn-secondary"
		document.getElementById('label3').className = "btn btn-secondary active"
		alterarDisplay('timerPausaLonga')
		contadorMinutos = valorMinutosPlonga
		pLonga = setInterval(function () {
			if (contadorMinutos == 0 && contadorSegundos == 0) {
				clearInterval(pLonga)
				statusPausaLonga = false
			}
			if (contadorSegundos > 0) {
				contadorSegundos -= 1
				statusPausaLonga = true
			}
			document.getElementById('tempoPausaLonga').innerHTML = ('00' + contadorMinutos).slice(-2) + ':' + ('00' + contadorSegundos).slice(-2)
			if (contadorSegundos == 0 && contadorMinutos > 0) {
				contadorMinutos -= 1
				contadorSegundos = 60
				statusPausaLonga = true
			}
		}, 1000)
		statusPausaLonga = true
	}
	return statusPausaLonga
}
//---------------------------------------------------PAUSA CURTA----------------------------------------------------------//


var contadorSegundosPcurta = 60
var pausas = 0

function pausaCurta() {

	if (statusCiclo == false && statusPausaCurta == false && statusPausaLonga == false) {
		document.getElementById('label1').className = "btn btn-secondary"
		document.getElementById('label2').className = "btn btn-secondary active"
		document.getElementById('label3').className = "btn btn-secondary"
		alterarDisplay('timerPausaCurta')
		contadorMinutosPcurta = valorMinutosPcurta
		if (contadorMinutosPcurta < 0) {
			contadorMinutosPcurta = 4
		}
		statusPausaCurta = true
		pCurta = setInterval(function () {
			if (contadorMinutosPcurta == 0 && contadorSegundosPcurta == 0) {
				clearInterval(pCurta)
				statusPausaCurta = false
			}
			if (contadorSegundosPcurta > 0) {
				contadorSegundosPcurta -= 1
			}
			document.getElementById('tempoPausaCurta').innerHTML = ('00' + contadorMinutosPcurta).slice(-2) + ':' + ('00' + contadorSegundosPcurta).slice(-2)
			if (contadorSegundosPcurta == 0 && contadorMinutosPcurta > 0) {
				contadorMinutosPcurta -= 1
				contadorSegundosPcurta = 60
			}
		}, 1000)
		statusPausaCurta = true
	}
	return statusPausaCurta
}
*/

var statusConfigurar = false

function configurar() {
	if (statusConfigurar == false) {
		document.getElementById('pageConfig').style.display = 'inline-block'
		statusConfigurar = true
	} else {
		document.getElementById('pageConfig').style.display = 'none'
		statusConfigurar = false
	}
}


function alterarDisplay(timer) {
	if (timer == 'timerPomodoro') {
		document.getElementById('timerPomodoro').style.display = 'inline-block'
		document.getElementById('timerPausaCurta').style.display = 'none'
		document.getElementById('timerPausaLonga').style.display = 'none'
	}
	else if (timer == 'timerPausaCurta') {
		document.getElementById('timerPausaCurta').style.display = 'inline-block'
		document.getElementById('timerPomodoro').style.display = 'none'
		document.getElementById('timerPausaLonga').style.display = 'none'
	}

	else if (timer == 'timerPausaLonga') {
		document.getElementById('timerPausaCurta').style.display = 'none'
		document.getElementById('timerPomodoro').style.display = 'none'
		document.getElementById('timerPausaLonga').style.display = 'inline-block'
	}

	if (!statusCiclo && !statusPausaCurta && !statusPausaLonga) {

	}
}

function activeMenu() {


}

