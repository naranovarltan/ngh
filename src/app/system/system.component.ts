import {Component, HostBinding} from '@angular/core';

import {fadeStateTrigget} from '../shared/amination/fade.animation';

@Component({
  selector: 'na-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigget]
})
export class SystemComponent {
  @HostBinding('@fade') a = true;
}
