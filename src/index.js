function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.split(' ').join('');
    let arr = [];

    let stecNum = [];
    let stecOper = [];
    Array.prototype.last = function(n) {
        return this[this.length-n];
    }

    let strNum = '1234567890';
    let strOper = '()+-*/';
    let temp = '';
    let result = 0;

    let prior = {
        ')': 0,
        '(': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    
    let calc = {
        '+': (a,b) => {
            return a+b;
        },
        '-': (a,b) => {
            return a-b;
        },
        '*': (a,b) => {
            return a*b;
        },
        '/': (a,b) => {
            return a/b;
        }
    }
    
    for(let i=0; i<expr.length; i++) {
        if(strNum.includes(expr[i])) {
            temp += expr[i];
        } else {
            if(temp.length>0) {
                arr.push(parseInt(temp));
                temp = '';
            }
            
            if(strOper.includes(expr[i])) {
                arr.push(expr[i]);
            }
        }

        if(i==expr.length-1 && temp.length>0) {
            arr.push(parseInt(temp));
            temp = '';
        }       
    }

    for(let i=0; i<arr.length; i++) {
        
        if(typeof arr[i] == "number") {
            stecNum.push(arr[i]);
            
        }

        if(typeof arr[i] == "string") {
            if(arr[i] == '(') {
                stecOper.push(arr[i]);
                continue;
            }

            if(arr[i] == ')') {
                if(stecOper.last(1) == '(') {
                    stecOper.splice(-1, 1);
                    continue;
                }
                
                if(stecOper.length>0) {
                    let tempRes = calc[stecOper.last(1)](stecNum.last(2), stecNum.last(1));
                    stecNum.splice(-2, 2);
                    stecOper.splice(-1, 1);
                    stecNum.push(tempRes);
                    i--;
                    continue;
                } 
                
                throw "ExpressionError: Brackets must be paired";
            }

            if(stecOper.length == 0 || prior[stecOper.last(1)] < prior[arr[i]]) {
                stecOper.push(arr[i]);
                continue;
            }

            if(prior[stecOper.last(1)] >= prior[arr[i]]) {
                let tempRes = calc[stecOper.last(1)](stecNum.last(2), stecNum.last(1));
                stecNum.splice(-2, 2);
                stecOper.splice(-1, 1);
                stecNum.push(tempRes);
                i--;
            }
        }
        if(i == arr.length-1) {
            for(let j=stecOper.length-1; j>-1; j--) {
                let tempRes = calc[stecOper.last(1)](stecNum.last(2), stecNum.last(1));
                stecNum.splice(-2, 2);
                stecOper.splice(-1, 1);
                stecNum.push(tempRes);
            }
        }
    }
    result = stecNum[0];
    console.log(arr);
    console.log(stecNum);
    console.log(stecOper);

    if(result==Infinity) {
        throw Error("TypeError: Division by zero.");
    }
    return result;
}

module.exports = {
    expressionCalculator
}