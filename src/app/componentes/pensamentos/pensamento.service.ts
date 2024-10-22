import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3001/pensamentos";
  constructor(private http: HttpClient) { }

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API);
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
