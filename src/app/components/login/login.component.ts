import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { InteropsService } from 'src/app/services/interops.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Show = false;

  constructor(public Auth: AccountService, private inter: InteropsService) {
    this.inter.OpenLogin = () => {
      this.Show = true;
    };
  }

  ngOnInit(): void {
  }

  Exit(): void {
    this.Show = false;
  }

}
