import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 🔹 Importa esto
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule

const routes: Routes = [
  // tus rutas aquí
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      ReactiveFormsModule,
      CommonModule // 🔹 Necesario para ngStyle, ngFor, ngI
      ,       // ✅ Agregado
    HttpClientModule
    )
  ],

 
});
