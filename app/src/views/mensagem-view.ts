import { View } from "./view.js";

export class MensagemView extends View<string> {
  //colocamos protected também para que as instâncias dessa classe também n tenham acesso, pois por padrão o TS define como public
  protected template(model: string): string {
    return `
            <p class "alert alert-info">${model}<p>
        `;
  }
}
