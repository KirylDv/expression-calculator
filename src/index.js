function eval() {
    // Do not use eval!!!
    return;
}

function sya(expr) {
    expr = " " + expr + " ";
    let finalStack = [];
    let operatorStack = [];
    let tempNum = "";
    for (let i = 0; i < expr.length; i++) {
        let elem = expr[i];
        switch (elem) {
            case "(":
                if (tempNum !== ""){
                    finalStack.push(tempNum);
                    tempNum = "";
                }
                operatorStack.push(elem);
                break;
            case " ":
                if (tempNum !== ""){
                    finalStack.push(tempNum);
                    tempNum = "";
                }
                break;    
            case ")":
                if (tempNum !== ""){
                    finalStack.push(tempNum);
                    tempNum = "";
                }
                let tempOp = operatorStack.pop();
                while (tempOp !== "("){
                    finalStack.push(tempOp);
                    tempOp = operatorStack.pop();
                }
                break;
            case "+":
            case "-":
                if (tempNum !== ""){
                    finalStack.push(tempNum);
                    tempNum = "";
                }
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(")
                    finalStack.push(operatorStack.pop());
                operatorStack.push(elem);
                break;
            case "*":
            case "/":
                if (tempNum !== ""){
                    finalStack.push(tempNum);
                    tempNum = "";
                }
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(" && 
                         (operatorStack[operatorStack.length - 1] === "*" || operatorStack[operatorStack.length - 1] === "/"))
                   finalStack.push(operatorStack.pop());
                operatorStack.push(elem);
                break;
            default:
                tempNum += elem;
                break;
        }
    };
    while (operatorStack.length)
        finalStack.push(operatorStack.pop());
        return finalStack;
}

function rpn(expr) {
    expr = sya(expr);
    const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
    };

    let stack = [];
    expr.forEach((token) => {
        if (token in operators) {
            let y = stack.pop();
            let x = stack.pop();
            if(token === "/" && y === 0) {
                throw("TypeError: Division by zero.");
            }
            stack.push(operators[token](x, y));
        } else {
            stack.push(+token);
        }
    });

    return stack.pop();
}

function expressionCalculator(expr) {
    let a = 0;
    for (let char of expr) {
        if (char === "("){
            a++;
        }
        else if (char === ")") {
            a--;
        }
        if (a < 0) {
            throw("ExpressionError: Brackets must be paired");
        }
    }
    if (a !== 0) {
        throw("ExpressionError: Brackets must be paired");
    }
    return rpn(expr);
}

module.exports = {
    expressionCalculator
}