import { Component, ViewChild } from '@angular/core';
import { PatientService } from '../app/services/patient.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meu-sistema-pacientes';
  value: string | undefined;
  patients: any[] = []; // Array para armazenar pacientes
  allPatients: any[] = []; // Todos os pacientes, sem filtro
  searchSubject: Subject<string> = new Subject<string>();

  constructor(private patientService: PatientService) { } // Injeta o serviço
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  loadPatients() {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data; // Carrega os pacientes ao iniciar
    });
  }

  onPatientAdded(patient: any) {
    console.log('Novo Paciente:', patient);
    
    this.patientService.addPatient(patient).subscribe(response => {
      console.log('Paciente adicionado:', response);
      this.patients.push(response);
      this.loadPatients(); // Recarrega a lista de pacientes do servidor
      this.notificationComponent.showMessage('Paciente salvo com sucesso!');
    }, error => {
      this.notificationComponent.showMessage('Erro ao adicionar paciente!');
      console.error('Erro ao adicionar paciente:', error);
    });
  }
   // Método para editar um paciente existente
   onPatientEdited(patient: any) {
    this.patientService.updatePatient(patient).subscribe(response => {
      console.log('Paciente atualizado:', response);
      this.loadPatients(); // Recarrega a lista de pacientes
      this.notificationComponent.showMessage('Paciente atualizado com sucesso!');
    }, error => {
      this.notificationComponent.showMessage('Erro ao atualizar paciente!');
      console.error('Erro ao atualizar paciente:', error);
    });
  }

  ngOnInit() {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data; // Carrega os pacientes ao iniciar
      this.allPatients = data;
    });
    this.searchSubject
    .pipe(debounceTime(300)) // Adiciona um delay de 300ms antes de aplicar o filtro
    .subscribe(searchText => {
      this.filterPatients(searchText);
    });
}
  filterPatients(searchText: string) {
    if (searchText) {
      this.patients = this.allPatients.filter(patient =>
        patient.nome.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.patients = this.allPatients; // Restaura a lista completa se o campo de busca estiver vazio
    }
  }
  onSearchChange(event: any) {
    this.searchSubject.next(event.target.value); // Emite o valor para o Subject
  }
  
  onDeletePatient(id: string) {
    console.log('Tentando excluir paciente com ID:', id);
    const confirmed = confirm('Você tem certeza que deseja excluir este paciente?'); // Pergunta de confirmação
    if (confirmed) {
        this.patientService.deletePatient(id).subscribe(() => {
            console.log('Paciente excluído com sucesso');
            this.notificationComponent.showMessage('Paciente excluído com sucesso!');
            this.loadPatients(); // Recarrega a lista após a exclusão
        }, error => {
            this.notificationComponent.showMessage('Erro ao excluir paciente!');
            console.error('Erro ao excluir paciente:', error);
        });
    }
}
  
}