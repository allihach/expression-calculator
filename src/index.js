function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.trim();
    let arr = [];
    let stecNum = [];
    let stecOper = [];
    let strNum = '1234567890';
    let strOper = '()+-*/';
    let temp = '';
    let prior = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    let result = 0;

    let calc = {
        '+': addit = (a,b) => {
            return a+b;
        },
        '-': subtract = (a,b) => {
            return a-b;
        },
        '*': multy = (a,b) => {
            return a*b;
        },
        '/': divis = (a,b) => {
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
        if(i==expr.length-1) {
            arr.push(parseInt(temp));
            temp = '';
        }
        
    }
    for(let j=0; j<arr.length; j++) {
        if(typeof arr[j] == "number") {
            stecNum.push(arr[j]);
        } else {
            if(stecOper.length==0 || prior[stecOper[stecOper.length-1]]<=prior[arr[j]]) {
                stecOper.push(arr[j]);
            } else {
                let tempRes = calc[stecOper[stecOper.length-1]](stecNum[stecNum.length-2],stecNum[stecNum.length-1]);
                stecOper.splice(-1,1);
                stecNum.splice(-2,2);
                stecNum.push(tempRes);
                j--;
            }
            
        }
        if(j==arr.length-1) {
            for(let a=0; a<stecOper.length; a++) {
                let tempRes = calc[stecOper[stecOper.length-1]](stecNum[stecNum.length-2],stecNum[stecNum.length-1]);
                stecOper.splice(-1,1);
                stecNum.splice(-2,2);
                stecNum.push(tempRes);
            }
            result = stecNum[0];
        }
    }
    console.log(result);
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