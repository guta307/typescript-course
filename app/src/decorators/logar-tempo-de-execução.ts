export function logarTempodeExecução(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      let divisor = 1;
      let unidade = "milisegundos";
      if (emSegundos) {
        (divisor = 1000), (unidade = "segundos");
      }
      const t1 = performance.now();
      const retorno = metodoOriginal.apply(this, args); //método original executa no contexto de this, que será executado na classe e passa como parãmetro os argumentos do array
      const t2 = performance.now();
      console.log(
        `${propertyKey}, o tempo de execução: ${(t2 - t1) / divisor} ${unidade}`
      );
      retorno;
    };
    return descriptor;
  };
}
