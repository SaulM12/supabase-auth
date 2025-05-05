import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loading = false

  signInForm: FormGroup

  constructor(
    private readonly supabase: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService
  ) {
    this.signInForm = this.formBuilder.group({
      email: ''
    })
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const { error } = await this.supabase.signIn(email)
      if (error) throw error
      this.toastService.showSuccess('Enviado Correctamente', 'Revisa tu correo electronico')
    } catch (error) {
      if (error instanceof Error) {
        this.toastService.showError('No se pudo enviar', error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
}
