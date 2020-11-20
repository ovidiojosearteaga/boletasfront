import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  configurationForm:FormGroup;

  errorMessage:string;

  successMessage:string;

  isNewConfig:boolean;

  configurationData;

  constructor(
    private fb:FormBuilder,
    private tickets:TicketsService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.tickets.getMaxTickets().subscribe(
      (resp:any) => {
        const max_tickets = resp.data[0]?.max_tickets ? resp.data[0]?.max_tickets : 0;
        this.isNewConfig = resp.data[0]?.max_tickets === undefined;
        this.configurationData = resp.data[0];
        this.configurationForm.controls['max_tickets'].setValue(max_tickets);
      },
      err => console.log(err)
    );
  }

  private initForm() : void {
    this.configurationForm = this.fb.group({
      max_tickets: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onUpdate() : void {
    if (this.configurationForm.invalid)
      return;

    const maxTickets = this.configurationForm.controls['max_tickets'].value;

    if (this.isNewConfig) {
      this.addMaxTicketsConfig(maxTickets);

    } else {
      console.log('no');
      console.log(this.configurationData);
      this.updateMaxTicketsConfig(maxTickets);
    }

  }

  private addMaxTicketsConfig(maxTickets:number) {
    this.tickets.addMaxTicketsConfig(maxTickets).subscribe(
      resp => {
        this.showSuccessMessage();
       },
      err => { 
        console.log(err);
        this.showErrorMessage(err.error.message);
      }
    );
  }

  private updateMaxTicketsConfig(maxTickets) {
    this.tickets.updateMaxTicketsConfig(maxTickets, this.configurationData.id).subscribe(
      resp => {
        this.showSuccessMessage();
       },
      err => { 
        console.log(err);
        this.showErrorMessage(err.error.message);
      }
    );
  }

  private showSuccessMessage() : void {
    this.successMessage = "Configuración actualizada exitosamente";
    setTimeout(() => { this.successMessage = undefined }, 7000);
  }

  private showErrorMessage(message:string) : void {
    this.errorMessage = message
    setTimeout(() => { this.errorMessage = undefined }, 7000);
  }

}
