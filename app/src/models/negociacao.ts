import { Modelo } from "../interfaces/modelo.js";

// Define uma classe chamada 'Negociacao'.
// A palavra-chave 'implements' é usada para aplicar o contrato definido pela interface 'Imprimivel'.
// Isso significa que a classe 'Negociacao' deve implementar o método 'paraTexto', conforme definido na interface 'Imprimivel'.
export class Negociacao implements Modelo<Negociacao> {
  constructor(
    public readonly _data: Date,
    public readonly _quantidade: number,
    public readonly _valor: number
  ) {}

  get data(): Date {
    const data = new Date(this._data.getTime());
    return data;
  }
  get volume(): number {
    return this._quantidade * this._valor;
  }

  public static criaDe(
    dataString: string,
    quantidadeString: string,
    valorString: string
  ): Negociacao {
    const exp = /-/g;
    const date = new Date(dataString.replace(exp, ","));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);
    return new Negociacao(date, quantidade, valor);
  }

  // Implementação concreta do método 'paraTexto' exigido pela interface 'Imprimivel'.
  // Este método deve retornar uma representação em texto da instância da classe 'Negociacao'.
  public paraTexto(): string {
    return `Data: ${this.data}, Quantidade: ${this._quantidade}, Valor:${this._valor}`;
  }

  public ehIgual(negociacao: Negociacao): boolean {
    return (
      this.data.getDate() === negociacao.data.getDate() &&
      this.data.getMonth() === negociacao.data.getMonth() &&
      this.data.getFullYear() === negociacao.data.getFullYear()
    );
  }
}
