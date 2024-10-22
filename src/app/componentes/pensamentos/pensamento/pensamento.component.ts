import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent {
  @Input() pensamento: Pensamento = {
    id: 1,
    conteudo: "i love angular",
    autoria: "desconhecido",
    modelo: "modelo3"
  }

  larguraPensamento(): string {
    return this.pensamento.conteudo.length >= 250 ? 'pensamento-g' : 'pensamento-p';
  }

}
