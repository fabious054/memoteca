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

  constructor(private service: PensamentoService ) { }

  ngOnInit() {
    this.service.listar().subscribe(pensamentos => {
      console.log(pensamentos);
      this.listaPensamentos = pensamentos;

    });
  }

}
