import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempodeExecução } from "../decorators/logar-tempo-de-execução.js";
import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesServices } from "../services/negociacoes-services.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  // Importa um Decorator chamado domInjector. Este Decorator é usado para associar
  // propriedades de uma classe a elementos específicos do DOM.
  @domInjector("#data")
  private inputData: HTMLInputElement;

  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;

  @domInjector("#valor")
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacaoService = new NegociacoesServices();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @logarTempodeExecução()
  @inspect
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );

    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apensa negociações em dias úteis são aceitas");
      return;
    }
    this.negociacoes.adiciona(negociacao);

    imprimir(negociacao, this.negociacoes);
    this.limparFormulario();
    this.atualizaView();
  }

  private ehDiaUtil(data: Date) {
    return (
      data.getDay() >= DiaDaSemana.SEGUNDA && data.getDay() < DiaDaSemana.SABADO
    );
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputData.focus();
  }

  importaDados(): void {
    this.negociacaoService
      .obterNegociacoes()
      .then((negociacoesDeHoje) => {
        return negociacoesDeHoje.filter((negociacaoDeHoje) => {
          return !this.negociacoes
            .lista()
            .some((negociacao) => negociacao.ehIgual(negociacaoDeHoje));
        });
      })
      .then((negociacoesDeHoje) => {
        for (let negociacao of negociacoesDeHoje) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso");
  }
}
