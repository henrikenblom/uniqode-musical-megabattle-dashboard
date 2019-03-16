import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HighScoreEntry, User} from '../declarations';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-highscore-entry',
  templateUrl: './highscore-entry.component.html',
  styleUrls: ['./highscore-entry.component.css']
})
export class HighscoreEntryComponent implements AfterViewInit {

  @Input()
  entryData: HighScoreEntry;
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
