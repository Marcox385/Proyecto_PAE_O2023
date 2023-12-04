import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/publics/api.service';

@Component({
  selector: 'bgc-recuadro',
  templateUrl: './recuadro.component.html',
  styleUrls: ['./recuadro.component.scss']
})
export class RecuadroComponent implements OnInit {
  datos: any;

  constructor(public dialogRef: MatDialogRef<RecuadroComponent>, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.obtenerDatos().subscribe(
      (data) => {
        this.datos = data;
        console.log('Datos obtenidos:', this.datos);
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  cerrarRecuadro(): void {
    this.dialogRef.close();
  }
}
