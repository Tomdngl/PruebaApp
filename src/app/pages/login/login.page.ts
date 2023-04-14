import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  formularioLogin : FormGroup;

  constructor(public fb : FormBuilder, private userAuth: UserService, private router: Router) {
    this.formularioLogin = this.fb.group(
      {
        'email' : new FormControl("", Validators.required),
        'password' : new FormControl("", Validators.required)
      }
    );
  }

  Login() {
    if(this.formularioLogin.valid)
    {
      this.userAuth.login(this.formularioLogin.value).then(response => { console.log(response)
      this.router.navigate(["/welcome"])
      })
      .catch(error => { console.log(error)});      
    }
    else
    {
      console.log("mal");
    }
  }

  ngOnInit() {
  }

}