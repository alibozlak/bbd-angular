import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../../services/store/store-service';
import { HomeComponentService } from '../../services/home-component/home-component-service';
import { RemovalDateSection } from '../../models/home-component/removal-date-section.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, MatButtonModule, MatIconModule, 
            MatCardHeader, MatCard, MatCardTitle, MatCardSubtitle, MatCardContent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  
  private userService : UserService = inject(UserService);
  private storeService : StoreService = inject(StoreService);
  private homeComponentService : HomeComponentService = inject(HomeComponentService);

  public isUserAdmin = localStorage.getItem('role') === "admin" ? true : false;
  public storeName : String | undefined;
  public storeCode : String | undefined;
  public homeComponentResponseDto : RemovalDateSection[] | undefined;

  ngOnInit(): void {
    let userId : number = parseInt(localStorage.getItem("userId")!);

    this.userService.getStoreIdByUserId(userId).subscribe(response => {
      localStorage.setItem("storeId", response.object.toString());

      this.storeService.getStoreByStoreId(response.object).subscribe(response2 => {      
        this.storeName = response2.object.storeName;
        this.storeCode = response2.object.storeCode;
      });
    });

    this.homeComponentService.getBbdListByUserId(userId).subscribe(response => {
      this.homeComponentResponseDto = response.object;
    });
  }

  public convertLocalDateStringToTurkeyDateString(localDateString : String) : String {
    return `${localDateString.substring(8)}-${localDateString.substring(5,7)}-${localDateString.substring(0,4)}`;
  }


}
