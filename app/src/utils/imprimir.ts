import { Negociacao } from "../models/negociacao";
import { Imprimivel } from "../interfaces/imprimivels";

export function imprimir(...objetos: Array<Imprimivel>) {
  for (let objeto of objetos) {
    console.log(objeto.paraTexto());
  }
}
