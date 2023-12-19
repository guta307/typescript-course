import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

// Define uma classe chamada 'Negociacao'.
// A palavra-chave 'implements' é usada para aplicar o contrato definido pela interface 'Imprimivel'.
// Isso significa que a classe 'Negociacao' deve implementar o método 'paraTexto', conforme definido na interface 'Imprimivel'.
export class Negociacoes implements Modelo<Negociacoes> {
  private negociacoes: Negociacao[] = [];

  public adiciona(negociacao: Negociacao): void {
    this.negociacoes.push(negociacao);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;
  }

  // Implementação concreta do método 'paraTexto' exigido pela interface 'Imprimivel'.
  // Este método deve retornar uma representação em texto da instância da classe 'Negociacao'.
  public paraTexto(): string {
    return JSON.stringify(this.negociacoes, null, 2);
  }

  public ehIgual(negociacoes: Negociacoes): boolean {
    return (
      JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista)
    );
  }
}
