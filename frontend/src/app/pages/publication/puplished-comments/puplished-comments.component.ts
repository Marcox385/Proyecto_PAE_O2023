import { Component, Input } from '@angular/core';

@Component({
  selector: 'bgc-puplished-comments',
  templateUrl: './puplished-comments.component.html',
  styleUrls: ['./puplished-comments.component.scss']
})
export class PuplishedCommentsComponent {
  @Input() comments: any[] = [];
}
