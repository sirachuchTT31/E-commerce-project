import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-menu-flag',
  templateUrl: './header-menu-flag.component.html',
  styleUrls: ['./header-menu-flag.component.scss']
})
export class HeaderMenuFlagComponent {
  @Input() home: string = 'Home'
  @Input() menu_category: string = ''
  @Input() menu_detail: string = ''
}
