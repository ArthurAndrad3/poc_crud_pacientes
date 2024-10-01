import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  id: string;
  nome: string;
  data_nascimento: string;
  cpf: string;
  cartao_sus: string;
  sexo: string;
  telefone_celular: string;
  telefone_responsavel: string;
  email: string;
  nome_mae: string;
  cep: string;
  estado: string;
  cidade: string;
  endereco: string;
  complemento: string;
  bairro: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}
  

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  addPatient(patient: Patient): Observable<any> {
    return this.http.post(this.apiUrl, patient); // Adiciona um novo paciente
}
  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePatient(patient: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${patient.id}`, patient); // Atualiza o paciente existente
  }
}
