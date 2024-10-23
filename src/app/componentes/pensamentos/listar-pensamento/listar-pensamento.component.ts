import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})
export class ListarPensamentoComponent {

  listaPensamentos: Pensamento[] = [];
  qtdAtual: number = 3;
  haMaisPensamentos: boolean = true;
  filtro: string = '';

  constructor(private service: PensamentoService ) { }

  ngOnInit() {
    this.service.listar(this.qtdAtual,this.filtro).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos;

    });
  }

  carregarMais() {
    this.service.listar(++this.qtdAtual,this.filtro).subscribe(pensamentos => {
      const idsPensamentos = this.listaPensamentos.map(p => p.id);
      const pensamentosNaoInseridos = pensamentos.filter(p => !idsPensamentos.includes(p.id));
      if (!pensamentosNaoInseridos.length) {
        this.haMaisPensamentos = false;
      }else{
        this.listaPensamentos.push(...pensamentosNaoInseridos);
      }
    });
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.service.listar(this.qtdAtual,this.filtro).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos;
    });
  }
}
