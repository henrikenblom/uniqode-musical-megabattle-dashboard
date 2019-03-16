import {AfterViewInit, Component, Input} from '@angular/core';
import {StatWinnerEntry, User} from '../declarations';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-stat-winner',
  templateUrl: './stat-winner.component.html',
  styleUrls: ['./stat-winner.component.css']
})
export class StatWinnerComponent implements AfterViewInit {

  @Input()
  entryData: StatWinnerEntry;
  user: User;

  constructor(private db: AngularFirestore) {
  }

  ngAfterViewInit() {
    this.fetchGuest();
  }

  private fetchGuest() {
    this.db.collection('users').doc<User>(this.entryData.userId).valueChanges()
      .forEach(guest => {
        this.user = guest;
      });
  }
}
