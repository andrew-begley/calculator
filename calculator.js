class Calculator {
    constructor(previousOpText, currentOpText) {
     this.previousOpText = previousOpText;
     this.currentOpText = currentOpText;
     this.clear();   
    }

    clear() {
        this.currentOp = " ";
        this.previousOp = " ";
        this.operation = undefined;
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }

    sign() {
        if (this.previousOp !== " " && this.currentOp === " ") return;
        this.currentOp = parseFloat(this.currentOp) * -1;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOp.includes(".")) return;
        this.currentOp = this.currentOp.toString() + number.toString();
    }

    chooseOp(operation){
        if (this.currentOp === " ") return;
        if (this.previousOp !== " ") {
            this.compute();
        }
        this.operation = operation;
        this.previousOp = this.currentOp;
        this.currentOp = " ";
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOp);
        const current = parseFloat(this.currentOp);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+": 
                computation = prev + current;
                break;
           case "-": 
                computation = prev - current;
                 break;
            case "*": 
                computation = prev * current;
                break;
            case "/": 
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOp = computation;
        this.operation = undefined;
        this.previousOp = " ";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits  = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits  = stringNumber.split('.')[1];
        let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
    }

    updateDisplay(){
        this.currentOpText.innerText = 
            this.getDisplayNumber(this.currentOp);
        if(this.operation != null) {
            this.previousOpText.innerText =
                `${this.getDisplayNumber(this.previousOp)} ${this.operation}`;
        } else {
            this.previousOpText.innerText = '';
          }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const signButton = document.querySelector("[data-sign]");
const previousOpText = document.querySelector("[data-previousOp]");
const currentOpText = document.querySelector("[data-currentOp]");

const calculator = new Calculator(previousOpText, currentOpText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay ();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay ();
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})

signButton.addEventListener("click", button => {
    calculator.sign();
    calculator.updateDisplay();
})