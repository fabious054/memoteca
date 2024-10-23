import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3001/pensamentos";
  constructor(private http: HttpClient) { }

  listar(limit: number): Observable<Pensamento[]> {
    const qtdItens = limit;
    const pagina = 1;
    let params = new HttpParams().set('_page', pagina).set('_limit', qtdItens);


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

  deletar(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(`${this.API}/${id.toString()}`);
  }
}
