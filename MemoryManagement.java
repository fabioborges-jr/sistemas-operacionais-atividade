import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

public class MemoryManagement {
    static String[] memory = new String[64];
    static int nameProcess = 1;
    static int lastProcessIndex = -1;
    static List<String> processList = new ArrayList<>();
    static final int memorySize = (int) Math.pow(2, 6);

    static {
        for (int i = 0; i < memorySize; i++) {
            memory[i] = "0";
        }
    }

    static class Process {
        String name;
        int size;

        Process(String name) {
            this.name = name;
            this.size = new Random().nextInt(memorySize / 4) + 1;
        }

        void announce() {
            System.out.println("PROCESSO " + this.name + " CRIADO E SEU TAMANHO E DE " + this.size);
        }

        void firstFit() {
            int initialFreeBlockSpace = -1;
            int countFreeBlock = 0;

            for (int i = 0; i < memory.length; i++) {
                if (memory[i].equals("0")) {
                    if (initialFreeBlockSpace == -1) {
                        initialFreeBlockSpace = i;
                    }
                    countFreeBlock += 1;

                    if (countFreeBlock >= this.size) {
                        for (int j = initialFreeBlockSpace; j < initialFreeBlockSpace + this.size; j++) {
                            memory[j] = this.name;
                        }
                        lastProcessIndex = i;

                        System.out.println("PROCESSO " + this.name + " INSERIDO COM FIRST-FIT");
                        printMemory();
                        processList.add(this.name);
                        return;
                    }
                } else {
                    initialFreeBlockSpace = -1;
                    countFreeBlock = 0;
                }
            }

            System.out.println("NAO FOI POSSIVEL ALOCAR O PROCESSO " + this.name + " COM O METODO FIRST-FIT");
        }

        void nextFit() {
            System.out.println("ULTIMO PROCESSO INSERIDO FOI NO INDEX " + lastProcessIndex);
            int countFreeBlock = 0;

            for (int i = lastProcessIndex + 1; i < memory.length; i++) {
                if (memory[i].equals("0")) {
                    countFreeBlock += 1;

                    if (countFreeBlock >= this.size) {
                        for (int j = i - this.size + 1; j <= i; j++) {
                            memory[j] = this.name;
                        }
                        lastProcessIndex = i;
                        System.out.println("PROCESSO " + this.name + " INSERIDO COM NEXT-FIT");
                        printMemory();
                        processList.add(this.name);
                        return;
                    }
                } else {
                    System.out.println("NAO FOI POSSIVEL UTILIZAR O NEXT-FIT PARA O PROCESSO " + this.name + ", PROCURANDO NO INICIO DA MEMÓRIA");
                    this.firstFit();
                    countFreeBlock = 0;
                    return;
                }
            }

            System.out.println("NAO FOI POSSIVEL ALOCAR O PROCESSO " + this.name + " COM O PROCESSO NEXT-FIT");
        }

        void bestFit() {
            int bestBlockIndex = -1;
            int bestBlockSize = memory.length + 1;

            int currentBlockIndex = -1;
            int currentBlockSize = 0;

            for (int i = 0; i < memory.length; i++) {
                if (memory[i].equals("0")) {
                    if (currentBlockIndex == -1) {
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

            if (bestBlockIndex != -1) {
                for (int j = bestBlockIndex; j < bestBlockIndex + this.size; j++) {
                    memory[j] = this.name;
                }
                lastProcessIndex = bestBlockIndex + this.size - 1;
                System.out.println("PROCESSO " + this.name + " INSERIDO COM BEST-FIT");
                printMemory();
                processList.add(this.name);
                return;
            }

            System.out.println("NAO FOI POSSIVEL ALOCAR O PROCESSO " + this.name + " COM O PROCESSO BEST-FIT");
        }

        void worstFit() {
            int worstBlockIndex = -1;
            int worstBlockSize = 0;

            int currentBlockIndex = -1;
            int currentBlockSize = 0;

            for (int i = 0; i < memory.length; i++) {
                if (memory[i].equals("0")) {
                    if (currentBlockIndex == -1) {
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

            if (currentBlockSize > worstBlockSize && currentBlockSize >= this.size) {
                worstBlockIndex = currentBlockIndex;
                worstBlockSize = currentBlockSize;
            }

            if (worstBlockIndex != -1) {
                for (int j = worstBlockIndex; j < worstBlockIndex + this.size; j++) {
                    memory[j] = this.name;
                }
                lastProcessIndex = worstBlockIndex + this.size - 1;
                System.out.println("PROCESSO " + this.name + " INSERIDO COM WORST-FIT");
                printMemory();
                processList.add(this.name);
                return;
            }

            System.out.println("NAO FOI POSSIVEL ALOCAR O PROCESSO " + this.name + " COM O PROCESSO WORST-FIT");
        }
    }

    static void removeProcess(String processName) {
        for (int i = 0; i < memory.length; i++) {
            if (memory[i].equals(processName)) {
                memory[i] = "0";
                processList.remove(processName);
            }
        }
        System.out.println("PROCESSO " + processName + " REMOVIDO.");
        printMemory();
    }

    static void printMemory() {
        for (String mem : memory) {
            System.out.print(mem + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Process process = new Process("P" + nameProcess);
                process.announce();
                process.firstFit();
                nameProcess += 1;
            }
        }, 0, 5000);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Process process = new Process("P" + nameProcess);
                process.announce();
                process.nextFit();
                nameProcess += 1;
            }
        }, 0, 5000);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Process process = new Process("P" + nameProcess);
                process.announce();
                process.bestFit();
                nameProcess += 1;
            }
        }, 0, 5000);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Process process = new Process("P" + nameProcess);
                process.announce();
                process.worstFit();
                nameProcess += 1;
            }
        }, 0, 5000);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (!processList.isEmpty()) {
                    String processName = processList.get(new Random().nextInt(processList.size()));
                    removeProcess(processName);
                }
            }
        }, 0, 5000);
    }
}


