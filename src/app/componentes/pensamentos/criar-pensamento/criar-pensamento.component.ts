import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})
export class CriarPensamentoComponent {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      conteudo: ["",Validators.compose([Validators.required,Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ["",Validators.compose([Validators.required,Validators.minLength(3)])],
      modelo: ["modelo1",[Validators.required]]
    });
  }

  criarPensamento(){
    console.log(this.formulario);

    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(()=>{
        this.router.navigate(['/listarPensamento']);
      });
    }else{
      return;
    }

  }
  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

  idGenerator(){
    let id = Math.floor(Math.random() * 1000);
    return id;
  }
}
