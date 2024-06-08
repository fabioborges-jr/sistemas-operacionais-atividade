var memory: string[] = [];
var countFreeBlock: number = 0;
var nameProcess: number = 1;
const memorySize = 2 * 2 * 2 * 2; // Define o tamanho da memória como 16

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
        console.log(`MEU NOME É ${this.name} e meu tamanho é de ${this.size}`);
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
                    return true; // Processo alocado com sucesso
                }
            } else {
                initialFreeBlockSpace = -1;
                countFreeBlock = 0;
            }
        }

        console.log(`Não foi possível alocar o processo ${this.name}.`);
        return false; // Não foi possível alocar o processo
    }
}

let process1 = new Process("P1");
let process2 = new Process("P2");
let process3 = new Process("P3");
let process4 = new Process("P4");

process1.apresentar();
process2.apresentar();
process3.apresentar();
process4.apresentar();
process1.firstFit();
process2.firstFit()
process3.firstFit()
process4.firstFit()


console.log(memory);

