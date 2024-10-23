import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3000/pensamentos";
  constructor(private http: HttpClient) { }

  listar(limit: number,filtro:string,favoritos:boolean): Observable<Pensamento[]> {
    const qtdItens = limit;
    const pagina = 1;
    let params = new HttpParams().set('_page', pagina).set('_limit', qtdItens);

    if (filtro.trim()) {
      params = params.set('conteudo', filtro);
    }

    if(favoritos){
      params = params.set('favorito', favoritos);
    }


    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    if (pensamento.id) {
      pensamento.id = pensamento.id.toString();
    }
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.put<Pensamento>(`${this.API}/${pensamento.id}`, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  deletar(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(`${this.API}/${id.toString()}`);
  }
}
