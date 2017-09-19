import {Component} from '@angular/core';

import {FeedService} from './feed.service';

import 'style-loader!./feed.scss';
import {AuthService} from '../../auth-service';

@Component({
  selector: 'feed',
  templateUrl: './feed.html'
})
export class Feed {

  public feed: Array<Object>;

  public usersBest: Array<Object>;
  public userData: any;

  constructor(private _feedService: FeedService, private _authService: AuthService) {

    this.userData = this._authService.getUserData();
  }

  ngOnInit() {

    this.getUsersBest();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this._feedService.getData();
  }

  private getUsersBest() {
    let officeId = this.userData.office_id;
    this._feedService.getUsersBest(officeId).subscribe(
      (data) => { this.usersBest = data; },
      (error) => {},
      () => {
        console.log(this.usersBest);
      }
    );
  }
}
