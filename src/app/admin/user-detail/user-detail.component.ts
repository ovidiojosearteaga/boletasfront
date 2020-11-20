import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITickets } from 'src/app/models/itickets';
import { IUser } from 'src/app/models/iuser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId:number;
  user:IUser;

  tickets:ITickets[] = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private userService:UserService
  ) { 
    this.userId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  private getUserDetail() : void {
    this.userService.getUserDetail(this.userId).subscribe(
      (resp:any) => {
        this.user = resp.data as IUser;
      },
      err => console.log(err)
    );
  }
}
