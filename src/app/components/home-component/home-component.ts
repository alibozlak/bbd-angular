import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user-service';
import { BbdRecordService } from '../../services/bbd-record/bbd-record-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  
  private userService : UserService = inject(UserService);
  private bbdRecordService : BbdRecordService = inject(BbdRecordService);

  public isUserAdmin = localStorage.getItem('role') === "admin" ? true : false;

  ngOnInit(): void {
    this.userService.getStoreIdByUserId(parseInt(localStorage.getItem("userId")!)).subscribe(response => {
      localStorage.setItem("storeId", response.object.toString())
    });
  }
}
