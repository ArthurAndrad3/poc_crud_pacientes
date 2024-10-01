import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  message: string = '';
  display: boolean = false;

  showMessage(msg: string) {
    this.message = msg;
    this.display = true;

    // Esconder a mensagem após 3 segundos
    setTimeout(() => {
      this.display = false;
      this.message='';
    }, 2000);
  }
}

