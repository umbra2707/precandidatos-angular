import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import DATA from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  distritos = new FormControl();
  listas = new FormControl();
  sexo = new FormControl();
  enlace = new FormControl();

  distritosSeleccionados: number[];
  listasSeleccionadas: string[];
  sexosSeleccionados: string[];
  tieneEnlace: string[];

  listaListas: string[] = ['IND', 'LDP', 'LIMS', 'TC', 'FyF', 'INN', 'MAC', 'COORD', 'CONFUSAM', 'CxD', 'LCh', 'MIN', 'SUM', 'MSA', 'CPUI', 'AyS', 'CSM', 'AP', 'II', 'APD20', 'CTW', 'OSTW', 'PFCP', 'APxD', 'ICC', 'FPT', 'CIND', 'COL', 'CEM'].sort();
  listaDistritos: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
  listaSexos: string[] = ['H', 'M', 'T'];

  displayedColumns: string[] = ['key', 'distrito', 'nombre', 'sexo', 'lista', 'enlace'];
  dataSource = new MatTableDataSource<Precandidato>(DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar() {
    let dataFiltrada = this.distritosSeleccionados && this.distritosSeleccionados.length > 0 ? DATA.filter(a => this.distritosSeleccionados.includes(a.distrito)) : DATA;
    dataFiltrada = this.listasSeleccionadas && this.listasSeleccionadas.length > 0 ? dataFiltrada.filter(a => this.listasSeleccionadas.includes(a.lista)) : dataFiltrada;
    dataFiltrada = this.sexosSeleccionados && this.sexosSeleccionados.length > 0 ? dataFiltrada.filter(a => this.sexosSeleccionados.includes(a.sexo)) : dataFiltrada;

    this.actualizarLista(dataFiltrada);
  }

  actualizarLista(data: any[]) {
    this.dataSource = new MatTableDataSource<Precandidato>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface Precandidato {
  key: number;
  distrito: number;
  nombre: string;
  sexo: string;
  lista: string;
  enlace: string;
}
