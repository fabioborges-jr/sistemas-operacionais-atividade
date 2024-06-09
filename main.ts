var memory: string[] = [];
var nameProcess: number = 1;
var lastProcessIndex:number=-1
const memorySize = 2 * 2 * 2 * 2 * 2; // Define o tamanho da memória como 16

// Fill memory with free spaces
for (var i = 0; i < memorySize; i++) {
    memory[i] = "0";
}

class Process {
    name: string;
    size: number;

    constructor(name: string) {
        this.name = name;
        this.size = Math.round(Math.random() * (memorySize / 4)) + 1; // Tamanho do processo variando de 1 a 4
    }

    apresentar() {
        console.log(`PROCESSO ${this.name} CRIADO E SEU TAMANHO É DE ${this.size}`);
    }

    firstFit() {
        let initialFreeBlockSpace = -1;
        let countFreeBlock = 0;

        for (let i = 0; i < memory.length; i++) {
            if (memory[i] === "0") {
                if (initialFreeBlockSpace === -1) {
                    initialFreeBlockSpace = i;
                }
                countFreeBlock += 1;

                if (countFreeBlock >= this.size) {
                    for (let j = initialFreeBlockSpace; j < initialFreeBlockSpace + this.size; j++) {
                        memory[j] = this.name;
                    }
                    lastProcessIndex=i
                    console.log(`PROCESSO ${this.name} INSERIDO COM FIRST-FIT`)
                    console.log(memory);
                    return;
                }
            } else {
                initialFreeBlockSpace = -1;
                countFreeBlock = 0;
            }
        }

        console.log(`NÃO FOI POSSÍVEL ALOCAR O PROCESSO ${this.name} COM O MÉTODO FIRST-FIT`);
    }

    nextFit() {
        console.log(`ÚLTIMO PROCESSO INSERIDO FOI NO INDEX ${lastProcessIndex}`	)
        let countFreeBlock = 0;

        for (let i = lastProcessIndex+1; i < memory.length; i++) {
            if (memory[i] === "0") {
                countFreeBlock += 1

                if (countFreeBlock >= this.size) {
                    for (let j = i - this.size + 1; j <= i; j++) {
                        memory[j] = this.name;
                    }
                    lastProcessIndex=i
                    console.log(`PROCESSO ${this.name} INSERIDO COM NEXT-FIT`)
                    console.log(memory)
                    return
                }
            } else {
                console.log(`NÃO FOI POSSÍVEL UTILIZAR O NEXT-FIT PARA O PROCESSO ${this.name}, PROCURANDO NO INÍCIO DA MEMÓRIA`);
                this.firstFit()
                countFreeBlock = 0
                return
            }
        }

        console.log(`NÃO FOI POSSÍVEL ALOCAR O PROCESSO ${this.name} COM O PROCESSO NEXT-FIT`);
    }

    bestFit() {
        let bestBlockIndex = -1;
        let bestBlockSize = memory.length + 1;

        let currentBlockIndex = -1;
        let currentBlockSize = 0;

        for (let i = 0; i < memory.length; i++) {
            if (memory[i] === "0") {
                if (currentBlockIndex === -1) {
                    currentBlockIndex = i;
                }
                currentBlockSize += 1;
            } else {
                if (currentBlockSize >= this.size && currentBlockSize < bestBlockSize) {
                    bestBlockIndex = currentBlockIndex;
                    bestBlockSize = currentBlockSize;
                }
                currentBlockIndex = -1;
                currentBlockSize = 0;
            }
        }

        // Check at the end of memory if the current free block was not checked
        if (currentBlockSize >= this.size && currentBlockSize < bestBlockSize) {
            bestBlockIndex = currentBlockIndex;
            bestBlockSize = currentBlockSize;
        }

        if (bestBlockIndex !== -1) {
            for (let j = bestBlockIndex; j < bestBlockIndex + this.size; j++) {
                memory[j] = this.name;
            }
            lastProcessIndex=i
            console.log(`PROCESSO ${this.name} INSERIDO COM BEST-FIT`)
            console.log(memory);

            return
        }

        console.log(`NÃO FOI POSSÍVEL ALOCAR O PROCESSO ${this.name} COM O PROCESSO BEST-FIT`);
        return; // Não foi possível alocar o processo
    }

    worstFit() {
        //alocar o processo onde tiver o maior espaço livre
        let worstBlockIndex = -1;
        let worstBlockSize = 0;

        let currentBlockIndex = -1;
        let currentBlockSize = 0;
        

        for (let i = 0; i < memory.length; i++) {
            if (memory[i] === "0") {
                if (currentBlockIndex === -1) {
                    currentBlockIndex = i;
                }
                currentBlockSize += 1;
            } else {
                if (currentBlockSize > worstBlockSize) {
                    worstBlockIndex = currentBlockIndex;
                    worstBlockSize = currentBlockSize;
                }
                currentBlockIndex = -1;
                currentBlockSize = 0;
            }
        }

        // Check at the end of memory if the current free block was not checked
        if (currentBlockSize > worstBlockSize) {
            worstBlockIndex = currentBlockIndex;
            worstBlockSize = currentBlockSize;
        }

        if (worstBlockIndex !== -1) {
            for (let j = worstBlockIndex; j < worstBlockIndex + this.size; j++) {
                memory[j] = this.name;
            }
            lastProcessIndex=worstBlockIndex+this.size
            console.log(`PROCESSO ${this.name} INSERIDO COM WORST-FIT`)
            console.log(memory);
            return
        }

        console.log(`NÃO FOI POSSÍVEL ALOCAR O PROCESSO ${this.name} COM O PROCESSO WORST-FIT`);
        return; // Não foi possível alocar o processo
    }
}

function removeProcess(processName: string) {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i] === processName) {
            memory[i] = "0";
        }
    }
    console.log(`PROCESSO ${processName} REMOVIDO.`);
    console.log(memory);
}

// Exemplo de uso
let process1 = new Process("P1");
process1.apresentar();
process1.firstFit();

let process2 = new Process("P2");
process2.apresentar();
process2.nextFit();



let process3 = new Process("P3");
process3.apresentar();
process3.bestFit();


let process4 = new Process("P4");
process4.apresentar();
process4.worstFit();
removeProcess("P3")

// Faça mais testes
let process5 = new Process("P5");
process5.apresentar();
process5.firstFit();

//remover processo
removeProcess("P1")


let process6 = new Process("P6");
process6.apresentar();
process6.nextFit();

let process7 = new Process("P7");
process7.apresentar();
process7.bestFit();

//remover processo
removeProcess("P2")

let process8 = new Process("P8");
process8.apresentar();
process8.worstFit();
removeProcess("P5")

//faça mais testes
let process9 = new Process("P9");
process9.apresentar();
process9.firstFit();

let process10 = new Process("P10");
process10.apresentar();
process10.nextFit();

let process11 = new Process("P11");
process11.apresentar();
process11.bestFit();

let process12 = new Process("P12");
process12.apresentar();
process12.worstFit();
removeProcess("P6")



