import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {HighScoreEntry, PlayerStats, StatWinnerEntry} from '../declarations';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({opacity: 0}),
        animate('1s ease',
          style({opacity: '*'}))]),
      transition(':leave', [style({opacity: '*'}),
        animate('1s ease',
          style({opacity: 0}))])
    ]),
    trigger('fade-fast', [
      transition(':enter', [style({opacity: 0}),
        animate('.5s ease',
          style({opacity: '*'}))]),
      transition(':leave', [style({opacity: '*'}),
        animate('.5s ease',
          style({opacity: 0}))])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  MAX_PAGE_INDEX = 2;
  MAX_SCORES = 5;
  highScoreEntries: HighScoreEntry[] = [];
  mostInvoluntaryRocker: StatWinnerEntry;
  popMaster: StatWinnerEntry;
  currentPageIndex = 0;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.fetchHighScores();
  }

  private startDashboardRotation() {
    setInterval(() => {
      this.currentPageIndex++;
      if (this.currentPageIndex > this.MAX_PAGE_INDEX) {
        this.currentPageIndex = 0;
      }
    }, 10000);
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
        if (pos++ === this.MAX_SCORES) {
          break;
        }
      }
      if (this.highScoreEntries.length > 0) {
        this.fetchMostInvoluntaryRocker();
        this.fetchPopMaster();
        this.startDashboardRotation();
      }
    });
  }

  private fetchMostInvoluntaryRocker() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('rock_points', 'desc'))
      .snapshotChanges().forEach(data => {
      let currentRocker = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().rock_points,
        likes: data[0].payload.doc.data().rock_likes,
        category: 'rock'
      };
      let furthestDistance = currentRocker.points - currentRocker.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.rock_points - stats.rock_likes) > furthestDistance) {
          currentRocker = {
            userId: statsDocument.payload.doc.id,
            points: stats.rock_points,
            likes: stats.rock_likes,
            category: 'rock'
          };
          furthestDistance = currentRocker.points - currentRocker.likes;
        }
      }
      this.mostInvoluntaryRocker = currentRocker;
    });
  }

  private fetchPopMaster() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('pop_points', 'desc'))
      .snapshotChanges().forEach(data => {
      let currentPopMaster = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().pop_points,
        likes: data[0].payload.doc.data().pop_likes,
        category: 'pop'
      };
      let factor = currentPopMaster.points + currentPopMaster.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.pop_points + stats.pop_likes) > factor) {
          currentPopMaster = {
            userId: statsDocument.payload.doc.id,
            points: stats.pop_points,
            likes: stats.pop_likes,
            category: 'pop'
          };
          factor = currentPopMaster.points + currentPopMaster.likes;
        }
      }
      this.popMaster = currentPopMaster;
    });
  }

}
