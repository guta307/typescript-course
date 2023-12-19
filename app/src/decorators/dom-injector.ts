export function domInjector(seletor: string) {
  // Retorna a função do Decorator.
  return function (target: any, propertyKey: string) {
    // Define uma variável 'elemento' para armazenar a referência do elemento do DOM.
    // Inicialmente, não é atribuído nenhum valor (undefined).
    let elemento: HTMLElement;
    // Define um getter para a propriedade.
    const getter = function () {
      // Verifica se 'elemento' ainda não foi inicializado.
      if (!elemento) {
        // Se 'elemento' é undefined, busca o elemento no DOM usando o seletor fornecido.

        // O tipo do elemento é assegurado como HTMLElement.
        // Busca e retorna o elemento do DOM com base no seletor fornecido.
        elemento = <HTMLElement>document.querySelector(seletor);
      }
      // Retorna o elemento. Se já tiver sido buscado antes, retorna a referência armazenada,
      // caso contrário, retorna o elemento recém-buscado.

      return elemento;
    };
    // Define a propriedade com o getter personalizado no objeto de destino.
    // Isso substitui a propriedade original pela propriedade com getter.
    Object.defineProperty(target, propertyKey, { get: getter });
  };
}
