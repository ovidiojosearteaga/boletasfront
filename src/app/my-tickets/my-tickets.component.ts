import { Component, Input, OnInit } from '@angular/core';
import { ITickets } from '../models/itickets';
import { TicketsService } from '../services/tickets/tickets.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  tickets:ITickets[] = [];

  successMessage:string;

  errorMessage:string;

  ticketsAvailable:number = null;

  @Input() userId:number = undefined;

  constructor(
    private ticketsService:TicketsService
  ) { }

  ngOnInit(): void {
    this.getTicketsAvailable();
    this.getTickets();
  }

  private getTicketsAvailable() : void {
    this.ticketsService.getTicketsAvailable().subscribe(
      (resp:any) => {
        if (resp.data !== null)
          this.ticketsAvailable = resp.data.tickets_available;
      },
      err => console.log(err)
    );
  }

  private getTickets() : void {
    this.ticketsService.getTickets(this.userId).subscribe(
      (resp:any) => {
        this.tickets = resp.data;
      },
      err => console.log(err)
    );
  }

  onDelete(id:number) {
    if (!confirm('¿Estás seguro de eliminar esta reserva de boleta?'))
      return;

    this.ticketsService.delete(id).subscribe(
      resp => this.updateData(),
      err => console.log(err)
    );
  }

  onReserve() {
    if (!confirm('¿Estás seguro de realizar esta reserva de boleta?'))
      return;

    this.ticketsService.reserve().subscribe(
      resp => {
        this.updateData();
        this.showSuccefullyMessage();
      },
      err => {
        console.log(err),
        this.showErrorMessage(err.error.message)
      }
    );
  }

  private updateData() : void {
    this.getTicketsAvailable();
    this.getTickets();
  }

  private showSuccefullyMessage() : void {
    this.successMessage = "Reserva creada exitosamente";
    setTimeout(() => this.successMessage = undefined, 7000);
  }

  private showErrorMessage(message:string) : void {
    if (message === "No has tickets.") {
      this.errorMessage = "No quedan boletas disponibles. Gracias.";
      
    } else {
      this.errorMessage = message;
    }

    setTimeout(() => this.errorMessage = undefined, 7000);
  }

}
