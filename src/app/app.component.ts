import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { Session } from '@supabase/supabase-js';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-root',
  imports: [AuthComponent, AccountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'myapp';
  session: Session | null = null

  constructor(private readonly supabase:AuthService){
    this.session = supabase.session
  }

  ngOnInit(){
    this.supabase.authChanges((event, session) => {
      this.session = session
    })
  }

}
