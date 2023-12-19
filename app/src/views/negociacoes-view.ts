import { escapar } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {
  //colocamos protected também para que as instâncias dessa classe também n tenham acesso, pois por padrão o TS define como public
  @escapar
  protected template(model: Negociacoes): string {
    return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                    </tr>
                </thead>

                <tbody>
                    ${model
                      .lista()
                      .map((negociacao) => {
                        return `
                        <tr>
                            <td>${this.formatar(negociacao._data)}</td>
                            <td>${negociacao._quantidade}</td>
                            <td>${negociacao._valor}</td>
                        </tr>
                        `;
                      })
                      .join(" ")}
                </tbody>
            </table>

        `;
  }

  private formatar(data: Date): string {
    return new Intl.DateTimeFormat().format(data);
  }
}
