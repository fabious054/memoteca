import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

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
    modelo: "modelo3",
    favorito: false
  }

  constructor(private service: PensamentoService ) { }

  larguraPensamento(): string {
    return this.pensamento.conteudo.length >= 250 ? 'pensamento-g' : 'pensamento-p';
  }

  mudarIconeFavorito() : string {
    if(!this.pensamento.favorito) {
      return "inativo";
    }
    return "ativo";
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe();
  }

}
