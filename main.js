var operationsBtn = document.querySelectorAll('.operation'),
    numbersBtn = document.querySelectorAll('.number'),
    decBtn = document.getElementById('dec'),
    resetBtn = document.getElementById('reset'),
    clearBtn = document.getElementById('clear'),
    timeBtn = document.getElementById('time'),
    curDateBtn = document.getElementById('curDate'),
    displayDsp = document.getElementById('disp'),
    memCurNumber = 0,
    memNewNumber = false, // будет true когда закончили ввод числа
    memCashOperation = ''; //последняя сохраненная операция

for (var i = 0; i<operationsBtn.length; i++) {
    var operation = operationsBtn[i];
    operation.addEventListener('click', function(e) {
        operationFn(e.target.textContent) 
    });
};

for (var i = 0; i<numbersBtn.length; i++) { 
    var number = numbersBtn[i];
    number.addEventListener('click', function(e) {
        numberFn(e.target.textContent)
    });
};

decBtn.addEventListener('click', decBtnFn);

resetBtn.addEventListener('click', resetBtnFn);

clearBtn.addEventListener('click', clearBtnFn);

timeBtn.addEventListener('click', timeBtnFn);

curDateBtn.addEventListener('click', curDateBtnFn);



function numberFn (numbersBtn) {
    var displayDspStr = displayDsp.value.toString();
    var displayDspLength = displayDspStr.length; 
    if (memNewNumber) {
        	displayDsp.value = numbersBtn;
        	memNewNumber = false;
    } else {
        if (displayDsp.value === '0') {
            displayDsp.value = numbersBtn;
        } else {
            if (displayDspLength<10) {
                displayDsp.value += numbersBtn;
            } /*else {
                var a = parseFloat(memCurNumber);
                memCurNumber = a.toExponential();
            }*/
        }
    }
};

function operationFn (op) {
    var localA = displayDsp.value;
    if (memNewNumber && memCashOperation !== '=') {
        displayDsp.value = memCurNumber;
    } else {
        memNewNumber = true;
        if (memCashOperation === '+') {
            memCurNumber += parseFloat(localA);
        } else if (memCashOperation === '-') {
            memCurNumber -= parseFloat(localA);
        } else if (memCashOperation === '/') {
            memCurNumber /= parseFloat(localA);
        } else if (memCashOperation === 'x') {
            memCurNumber *= parseFloat(localA);
        } else if (memCashOperation == '%' ) {
            memCurNumber *= parseFloat(localA/100);
        } else { //функция равно "="
            memCurNumber = parseFloat(localA);
        }
        displayDsp.value = memCurNumber;

                /* блок вывода результата в экспонентном виде*/ 
                var maxNum = parseFloat(displayDsp.value)
                
                if (maxNum>9999999999 || maxNum<0.00000001) {
                		displayDsp.value = memCurNumber.toExponential(5);
                } else {
                    displayDsp.value = memCurNumber;
                };  

        memCashOperation = op; 
        if (displayDsp.value == Infinity || displayDsp.value == -Infinity) {
            displayDsp.value = "Ошибка!";
        };
    };
};

function decBtnFn () {
    var locDec = displayDsp.value;
    if (memNewNumber) {
        locDec = '0.';
        memNewNumber = false;
    } else {
        if (locDec.indexOf('.') === -1) {
            locDec += '.';
        }
    };
    displayDsp.value = locDec;
};

function resetBtnFn () {
    displayDsp.value = 0;
    memCashOperation = 0;
};

function clearBtnFn () {
    var clearLoc = displayDsp.value;
    memNewNumber = false;
    var clearLocStr = clearLoc.toString(); //привел число к строке bb
    if (clearLocStr.length != 1)  {
        clearLoc = parseFloat(clearLocStr.slice(0, -1));
    } else {
        clearLoc = 0;
    };
    if (isNaN(clearLoc)) {
      displayDsp.value = 0;
    } else {
    	displayDsp.value = clearLoc;
    };
};

function timeBtnFn1 () {
	var timeloc = new Date();
    memNewNumber = false; 
    displayDsp.value = timeloc.toLocaleString("ru", {hour: 'numeric', minute: 'numeric', second: 'numeric'});
};

function timeBtnFn () {
    var timerId = setInterval(timeBtnFn1, 1000);
    setTimeout(function() {clearInterval(timerId); displayDsp.value = 0}, 5000);
};

function curDateBtnFn () {
	var dateloc = new Date();
    displayDsp.value = dateloc.toLocaleString("ru", {day: 'numeric', month: 'numeric', year: 'numeric'});
    memNewNumber = true;
};