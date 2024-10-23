import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

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
  favorito = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu mural';

  constructor(private service: PensamentoService, private router: Router ) { }

  ngOnInit() {
    this.service.listar(this.qtdAtual,this.filtro,this.favorito).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos;

    });
  }

  carregarMais() {
    this.service.listar(++this.qtdAtual,this.filtro,this.favorito).subscribe(pensamentos => {
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
    this.service.listar(this.qtdAtual,this.filtro,this.favorito).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos;
    });
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos';
    this.haMaisPensamentos = true;
    this.favorito = !this.favorito;
    this.service.listar(this.qtdAtual,this.filtro,this.favorito).subscribe(pensamentosFav => {
      this.listaPensamentos = pensamentosFav;
      this.listaFavoritos = pensamentosFav;
    });
  }

  recarregarComponente(){
    this.titulo = 'Meu mural';
    this.favorito = false;
    this.qtdAtual = 3;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
