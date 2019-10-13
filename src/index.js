function eval() {
    // Do not use eval!!!
    return;
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
    expr.split(' ').forEach((token) => {
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
    }
    if(a !== 0) {
        throw("ExpressionError: Brackets must be paired");
    }


    return rpn(expr);
}

module.exports = {
    expressionCalculator
}