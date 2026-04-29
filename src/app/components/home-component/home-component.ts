import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponentService } from '../../services/home-component/home-component-service';
import { RemovalDateSection } from '../../models/home-component/removal-date-section.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { utilFunctions } from '../../utils/project-constant';
import { BbdListItemForRemovalDateSection } from '../../models/home-component/bbd-list-item-for-removal-date-section.model';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, MatButtonModule, MatIconModule, 
            MatCardHeader, MatCard, MatCardTitle, MatCardSubtitle, MatCardContent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  
  private homeComponentService : HomeComponentService = inject(HomeComponentService);

  public isUserAdmin = localStorage.getItem('role') === "admin" ? true : false;
  public storeName : String | undefined;
  public storeCode : String | undefined;
  public removalDateSectionList : RemovalDateSection[] | undefined;
  public bestBeforeDatePastList : BbdListItemForRemovalDateSection[] | undefined;

  ngOnInit(): void {
    let userId : number = parseInt(localStorage.getItem("userId")!);

    this.homeComponentService.getBbdListByUserId(userId).subscribe(response => {
      localStorage.setItem("storeId", response.object.homePageStoreResponseDto.storeId.toString());

      this.storeCode = response.object.homePageStoreResponseDto.storeCode;
      this.storeName = response.object.homePageStoreResponseDto.storeName;

      this.removalDateSectionList = response.object.homePageWholeList.removalDateSectionList;
      this.bestBeforeDatePastList = response.object.homePageWholeList.bestBeforeDatePastList;
    });
  }

  public convertLocalDateStringToTurkeyDateString(localDateString : String) : String {
    return utilFunctions.convertLocalDateStringToTurkeyDateString(localDateString);
  }


}
