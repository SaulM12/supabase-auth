import { Component, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { AuthSession } from '@supabase/supabase-js';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-account',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  loading = false
  profile!: Profile
  @Input()
  session!: AuthSession
  updateProfileForm!:FormGroup

  constructor(
    private readonly supabase: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly toastService:ToastService
  ) {
    this.updateProfileForm = this.formBuilder.group({
      username: [''],
      website: [''],
      avatar_url: ['']
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getProfile()
    const { username, website, avatar_url } = this.profile
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
    })
  }

  async getProfile() {
    try {
      this.loading = true
      const { user } = this.session
      const { data: profile, error, status } = await this.supabase.profile(user)
      if (error && status !== 406) {
        throw error
      }
      if (profile) {
        this.profile = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true
      const { user } = this.session
      const username = this.updateProfileForm.value.username as string
      const website = this.updateProfileForm.value.website as string
      const avatar_url = this.updateProfileForm.value.avatar_url as string
      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
        website,
        avatar_url,
      })
      if (error) throw error
      this.toastService.showSuccess('Actualizado','El perfil se actualizó correctamente')
    } catch (error) {
      if (error instanceof Error) {
        this.toastService.showError('Error','No se pudo actualizar el perfil')
      }
    } finally {
      this.loading = false
    }
  }

  async signOut() {
    await this.supabase.signOut()
  }

}
