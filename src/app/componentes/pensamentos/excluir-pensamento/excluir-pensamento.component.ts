import { PensamentoService } from './../pensamento.service';
import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css'
})
export class ExcluirPensamentoComponent {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private PensamentoService: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.PensamentoService.buscarPorId(parseInt(id!)).subscribe(pensamento => {
      this.pensamento = pensamento;
    });
  }

  excluir(): void {
   if(this.pensamento.id){
    this.PensamentoService.deletar(this.pensamento.id).subscribe(() => {
      this.router.navigate(['/']);
    });
   }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

}
