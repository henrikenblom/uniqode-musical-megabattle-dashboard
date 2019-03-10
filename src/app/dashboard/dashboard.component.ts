import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {HighScoreEntry, PlayerStats} from '../declarations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  highScoreEntries: HighScoreEntry[] = [];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.fetchHighScores();
  }

  private fetchHighScores() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('points', 'desc'))
      .snapshotChanges().forEach(data => {
      this.highScoreEntries = [];
      let pos = 1;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        this.highScoreEntries.push({points: stats.points, userId: statsDocument.payload.doc.id, position: pos});
        if (pos++ === 6) {
          break;
        }
      }
    });

  }

}
