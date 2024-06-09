var memory: string[] = [];
var nameProcess: number = 1;
var lastProcessIndex:number=-1
var processList: string[] = [];
// Tamanho da memória na base 2
const memorySize = Math.pow(2, 6);


for (var i = 0; i < memorySize; i++) {
    memory[i] = "0";
}

class Process {
    name: string;
    size: number;

    constructor(name: string) {
        this.name = name;
        this.size = Math.round(Math.random() * (memorySize / 4)) + 1;
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
                    console.log(memory)
                    processList.push(this.name)
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
                    processList.push(this.name)
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

        if (currentBlockSize >= this.size && currentBlockSize < bestBlockSize) {
            bestBlockIndex = currentBlockIndex;
            bestBlockSize = currentBlockSize;
        }

        if (bestBlockIndex !== -1) {
            for (let j = bestBlockIndex; j < bestBlockIndex + this.size; j++) {
                memory[j] = this.name;
            }
            lastProcessIndex=bestBlockIndex+this.size-1
            console.log(`PROCESSO ${this.name} INSERIDO COM BEST-FIT`)
            console.log(memory);
            processList.push(this.name)
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
                if (currentBlockSize > worstBlockSize && currentBlockSize >= this.size) {
                    worstBlockIndex = currentBlockIndex;
                    worstBlockSize = currentBlockSize;
                }
                currentBlockIndex = -1;
                currentBlockSize = 0;
            }
        }

        // Check at the end of memory if the current free block was not checked
        if (currentBlockSize > worstBlockSize && currentBlockSize >= this.size) {
            worstBlockIndex = currentBlockIndex;
            worstBlockSize = currentBlockSize;
        }

        if (worstBlockIndex !== -1) {
            for (let j = worstBlockIndex; j < worstBlockIndex + this.size; j++) {
                memory[j] = this.name;
            }
            lastProcessIndex=worstBlockIndex+this.size-1
            console.log(`PROCESSO ${this.name} INSERIDO COM WORST-FIT`)
            console.log(memory);
            processList.push(this.name)
            return
        }

        console.log(`NÃO FOI POSSÍVEL ALOCAR O PROCESSO ${this.name} COM O PROCESSO WORST-FIT`);
        return
    }
}

function removeProcess(processName: string) {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i] === processName) {
            memory[i] = "0";
            processList = processList.filter((value) => value !== processName);
        }
    }
    console.log(`PROCESSO ${processName} REMOVIDO.`);
    console.log(memory);
}

//Testes aleatórios infinitos com firstFit a cada 5 segundos
setInterval(() => {
    let process = new Process(`P${nameProcess}`);
    process.apresentar();
    process.firstFit();
    nameProcess += 1;
}, 5000);

//Testes aleatórios infinitos com nextFit a cada 5 segundos
setInterval(() => {
    let process = new Process(`P${nameProcess}`);
    process.apresentar();
    process.nextFit();
    nameProcess += 1;
}, 5000);

//Testes aleatórios infinitos com bestFit a cada 5 segundos
setInterval(() => {
    let process = new Process(`P${nameProcess}`);
    process.apresentar();
    process.bestFit();
    nameProcess += 1;
}, 5000);

//Testes aleatórios infinitos com worstFit a cada 5 segundos
setInterval(() => {
    let process = new Process(`P${nameProcess}`);
    process.apresentar();
    process.worstFit();
    nameProcess += 1;
}, 5000);

//Testes para remover processos a cada 15 segundos
setInterval(() => {
    if (processList.length > 0) {
        let processName = processList[Math.floor(Math.random() * processList.length)];
        removeProcess(processName);
    }
}, 15000);