import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { Session, Subscription } from '@supabase/supabase-js';
import { AccountComponent } from './account/account.component';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  imports: [AuthComponent, AccountComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'myapp';
  private authSubscription: { data: { subscription: Subscription; }; } | null = null
  session: Session | null = null

  constructor(private readonly supabase:AuthService){
    this.session = supabase.session
  }

  ngOnInit(){
    this.authSubscription = this.supabase.authChanges((event, session) => {
      this.session = session
    })
  }

  ngOnDestroy(){
    if (this.authSubscription) {
      this.authSubscription.data.subscription.unsubscribe()
    }
    
  }

}
