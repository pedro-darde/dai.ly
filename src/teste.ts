class Teste {
    teste: string;
    constructor(teste: string) {
        this.teste = teste
    }
    static describeIt(instance: Teste): string[] {
        return Object.getOwnPropertyNames(instance)
    }
}

const teste = new Teste("FODASE")
console.log(Teste.describeIt(teste))