function ordenar() {
    const vet = [2, 1, 23, 34, 15, 65, 57, 8, 19]
    console.log("Vetor antes de ser ordenado: " + vet)

    for (let i = 0; i < vet.length; i++) {
        for (let y = i; y < vet.length; y++) {
            aux = vet[i]

            if (aux > vet[y]) {
                vet[i] = vet[y]
                vet[y] = aux
                aux = vet[i]
            }
        }
    }

    console.log("\n\nVetor depois de ser ordenado: " + vet)
}

function tempoDecorrido(funcao) {
    // pega os argumentos a serem repassados
    var args = Array.prototype.slice.call(arguments, 1);

    // logo antes da execução
    var inicio = performance.now();

    // executa a função passada, passando os argumentos se for o caso
    funcao.apply(null, args);

    // logo após a execução
    return performance.now() - inicio;
}

function monstrarTemp() {
    console.log(tempoDecorrido(ordenar, 10) + "\n\n")
}
