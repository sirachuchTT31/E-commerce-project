import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';

@Component({
  selector: 'app-header-global',
  templateUrl: './header-global.component.html',
  styleUrls: ['./header-global.component.scss']
})
export class HeaderGlobalComponent {
  is_Token: any
  role: any
  constructor(private localstorageService: TokenStorageService) {

  }
  ngOnInit() {
    this.is_Token = this.localstorageService.tokenStorage
    this.role = this.localstorageService.roleStorage
  }
}
