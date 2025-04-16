import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paginaprincipal',
  standalone: false,
  templateUrl: './paginaprincipal.component.html',
  styleUrl: './paginaprincipal.component.css'
})
export class PaginaprincipalComponent {
  cards = [
    { title: 'Modulo ACTIVOS', text: 'Este módulo identifica, clasifica y protege los activos de información de la organización. Garantiza su registro, asignación de responsabilidades y aplicación de controles de seguridad para mitigar riesgos, asegurando su confidencialidad, integridad y disponibilidad.', boton: 'Activos  →', link: '/assets'},
    { title: 'Modulo GAP', text: 'Regula el acceso a los sistemas y datos de la organización, asegurando que solo usuarios autorizados puedan interactuar con información sensible. Implementa controles, monitorea accesos y gestiona permisos para minimizar riesgos de seguridad.', boton: 'GAP   →', link: '/gap' },
    { title: 'Modulo Riesgos', text: 'Identifica, evalúa y mitiga riesgos de seguridad de la información. Permite analizar amenazas, vulnerabilidades y su impacto, aplicando controles y estrategias para reducir riesgos y garantizar la continuidad del negocio.',  boton: 'Riesgos   →'  }
  ];

  
}
