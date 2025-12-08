let a;
let b;

while (true) {

    a = Number(prompt("Digite algo:"));

    if (Number.isNaN(a) === true) {
        alert("Você digitou uma string.");
        break;

    }else {
        let b = Number(prompt("Digite outro número:"));
        
        if (Number.isNaN(b) === true) {
            alert(`Isso ${b} não é um número, tente novamente.`);
            break;
            
        }else {
            while (true) {
                while (true) {
                    operacao = prompt("Digite uma operação: + - * /");

                    if (operacao === "+") {
                        alert(`A soma de ${a} + ${b} é igual a: ${a+b}`);
                        break;

                    }else if (operacao === "-") {
                        alert(`A subtração de ${a} - ${b} é igual a: ${a-b}`);
                        break;

                    }else if (operacao === "*") {
                        alert(`A multiplicação de ${a} * ${b} é igual a: ${a*b}`);
                        break;

                    }else if (operacao === "/") {
                        alert(`A divisão de ${a} / ${b} é igual a: ${a/b}`);
                        break;

                    }else {
                        alert("Operação inválida, tente novamente.");
                    }
                }

                while (true) {
                    let resposta = prompt("Você gostaria de fazer outra operação? (sim/não)");
                
                    if (resposta.toLowerCase() === "sim" || resposta.toLowerCase() === "s") {
                        break;
                    
                    }else if (resposta.toLowerCase() === "não" || resposta.toLowerCase() === "nao" || resposta.toLowerCase() === "n") {
                        alert("Até a próxima!");
                        process.exit();
                    }
                    else {
                        alert("Resposta inválida, fechando o programa.");
                        process.exit();
                    }

                    break;
                }

                break;
            }


        }
        
    }


}
