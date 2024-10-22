import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})
export class CriarPensamentoComponent {
  pensamento: Pensamento = {
    id: 2,
    conteudo: "Aprendendo Angular",
    autoria: "DEV",
    modelo:""
  }
  constructor() {}

  criarPensamento(){
    alert('Pensamento criado com sucesso!');
  }
  cancelar(){
    alert('Pensamento cancelado com sucesso!');
  }
}
