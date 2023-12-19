//definimos como abstract para que não seja possível fazer uma instancia direta da classe, pois no caso ela só serve para ter seus métodos herdados pelos seus filhos

import { inspect } from "../decorators/inspect.js";
import { logarTempodeExecução } from "../decorators/logar-tempo-de-execução.js";

export abstract class View<T> {
  //implementando Generics <T> para que possamos utilizar diferentes tipos de parâmetros(int,string,etc..) nos filhos que irão herdar os métodos do pai
  protected elemento: HTMLElement;

  constructor(seletor: string) {
    // ? sinal de parâmetro opcional
    {
      const element = document.querySelector(seletor);
      if (element) {
        this.elemento = element as HTMLElement;
      } else {
        throw Error(`Seletor ${seletor} não existe no DOM. verifique`);
      }
    }
  }
  @logarTempodeExecução(true)
  @inspect
  public update(model: T): void {
    let template = this.template(model);
    this.elemento.innerHTML = template;
  }

  //apenas a classe pai e as filhas tem acesso a métodos proteced
  protected abstract template(model: T): string; //método que o pai não sabe como irá implementar, apenas os filhos definirão isso, dessa forma será lançado um erro em tempo de desenvolvimeto para que o filho entenda que tem que implementar essa classe
}
