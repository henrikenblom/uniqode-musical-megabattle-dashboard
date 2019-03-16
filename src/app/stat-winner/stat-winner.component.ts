import {AfterViewInit, Component, Input} from '@angular/core';
import {StatWinnerEntry, User} from '../declarations';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-stat-winner',
  templateUrl: './stat-winner.component.html',
  styleUrls: ['./stat-winner.component.css']
})
export class StatWinnerComponent implements AfterViewInit {

  get genderizedHeader(): string {
    if (this.isFemale()) {
      return this.header.replace('kung', 'drottning')
        .replace('Calvin Harris', 'Zara Larsson');
    } else {
      return this.header;
    }
  }

  @Input()
  entryData: StatWinnerEntry;
  @Input()
  header: string;
  user: User;

  constructor(private db: AngularFirestore) {
  }

  ngAfterViewInit() {
    this.fetchUser();
  }

  private fetchUser() {
    this.db.collection('users').doc<User>(this.entryData.userId).valueChanges()
      .forEach(u => {
        this.user = u;
      });
  }

  private isFemale(): boolean {
    return this.user.displayName.startsWith('Linda')
      || this.user.displayName.startsWith('Sara')
      || this.user.displayName.startsWith('Veronica')
      || this.user.displayName.startsWith('Sandra')
      || this.user.displayName.startsWith('Susan')
      || this.user.displayName.startsWith('Viktoria');
  }
}
