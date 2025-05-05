import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(title: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: detail,
      life: 3000,
    });
  }

  showInfo(title: string,detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: detail,
      life: 3000,
    });
  }

  showWarning(title: string,detail: string) {
    this.messageService.add({ severity: 'warn', summary: title, detail: detail, life: 3000 });
  }

  showError(title: string,detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: detail,
      life: 3000,
    });
  }
}
