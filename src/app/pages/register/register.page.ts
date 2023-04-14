import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  passwordsMatch = true;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userAuth: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }),
    this.errorMessage = '';;
  }

  ngOnInit() {
  }

  onConfirmPasswordChange() {
    const password = this.registerForm.controls['password'].value;
    const confirmPassword = this.registerForm.controls['confirmPassword'].value;
    this.passwordsMatch = password === confirmPassword;
  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.passwordsMatch = false;
        return;
      }
      this.userAuth.register(this.registerForm.value)
        .then(response => {console.log(response)
        this.router.navigate(["/login"])})
        .catch(error => {
          const errorCode = error.code;
          this.errorMessage = "valor de la lista" || 'Ha ocurrido un error.';
        });
    }
    else {
    }
  }
}
