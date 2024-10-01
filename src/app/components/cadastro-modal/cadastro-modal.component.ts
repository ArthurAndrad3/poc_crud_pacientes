import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-cadastro-modal',
  templateUrl: './cadastro-modal.component.html',
  styleUrls: ['./cadastro-modal.component.css']
})
export class CadastroModalComponent {
  displayModal: boolean = false; // Controla a visibilidade do modal
  isViewMode: boolean = false; // Controla se o modal está em modo de visualização 
  isEditMode: boolean = false; // Controla se o modal está em modo de edição
  errorMessage: string = '';
  newPatient: { 
    nome: string; 
    data_nascimento: string; 
    cpf: string; 
    cartao_sus?: string; 
    sexo: string; 
    telefone_celular: string; 
    telefone_responsavel?: string; 
    email?: string; 
    nome_mae: string; 
    cep: string; 
    estado?: string; 
    cidade?: string; 
    endereco?: string; 
    complemento?: string; 
    bairro?: string; 
  } = { 
    nome: '', 
    data_nascimento: '', 
    cpf: '', 
    cartao_sus: '', 
    sexo: '', 
    telefone_celular: '', 
    nome_mae: '', 
    cep: '' 
  }; // Objeto para armazenar os dados do paciente
  
  cpfValidator(control: any) {
    const cpf = control.value;
    if (cpf && cpf.length === 14) {
      const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      return regex.test(cpf) ? null : { cpfInvalid: true };
    }
    return null;
  }
  
  phoneValidator(control: any) {
    const phone = control.value;
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato: (99) 99999-9999
    return regex.test(phone) ? null : { phoneInvalid: true };
  }

  @Output() patientAdded: EventEmitter<any> = new EventEmitter(); // Emissor de eventos
  @Output() patientEdited: EventEmitter<any> = new EventEmitter();

  // Método para mostrar o modal
  showDialog() {
    this.errorMessage = ''; // Limpa a mensagem de erro ao abrir o modal
    this.displayModal = true;
  }

  // Método para esconder o modal
  hideDialog() {
    this.displayModal = false;
    this.resetForm(); // Reseta o formulário
    this.isViewMode = false; // Desativa o modo de visualização
  }

  // Método para salvar o paciente
  savePatient() {
    this.errorMessage = ''; // Limpa a mensagem de erro antes de verificar
    if (this.validateForm()) {
      if (this.isEditMode) {
        this.patientEdited.emit(this.newPatient); // Emite os dados do paciente editado
      } else {
        this.patientAdded.emit(this.newPatient); // Emite os dados do novo paciente
      }
      this.hideDialog(); // Esconde o modal após salvar
    }
  }
  validateForm(): boolean {
    const messages: string[] = [];

    if (!this.newPatient.nome || this.newPatient.nome.length < 3) {
      messages.push('Nome é obrigatório.');
    }
    if (!this.newPatient.data_nascimento) {
      messages.push('Data de Nascimento é obrigatória.');
    }
    if (!this.newPatient.cpf) {
      messages.push('CPF é obrigatório.');
    }
    if (!this.newPatient.sexo) {
      messages.push('Sexo é obrigatório.');
    }
    if (!this.newPatient.telefone_celular) {
      messages.push('Telefone celular é obrigatório.');
    }
    if (!this.newPatient.nome_mae) {
      messages.push('Nome da Mãe é obrigatório.');
    }
    if (!this.newPatient.cep) {
      messages.push('CEP é obrigatório.');
    }

    if (messages.length > 0) {
      this.errorMessage = messages.join(' '); // Junta as mensagens em uma string
      return false; // Formulário inválido
    }

    return true; // Formulário válido
  }

  // Método para resetar o formulário
  resetForm() {
    this.isEditMode = false;
    this.newPatient = { 
      nome: '', 
      data_nascimento: '', 
      cpf: '', 
      sexo: '', 
      telefone_celular: '', 
      nome_mae: '', 
      cep: '' 
    };
  }
  viewPatient(patient: any, isEditMode: boolean = false) {
    this.newPatient = { ...patient }; // Clona o objeto do paciente
    this.isViewMode = !isEditMode; // Se não for modo de edição, ativa modo de visualização
    this.isEditMode = isEditMode; // Define se o modal está em modo de edição
    this.showDialog(); // Exibe o modal
  }
}