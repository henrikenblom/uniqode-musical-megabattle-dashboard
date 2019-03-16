import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {HighScoreEntry, PlayerStats, StatWinnerEntry} from '../declarations';
import {animate, style, transition, trigger} from '@angular/animations';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1.5s 1.5s ease-in')
      ]),
      transition(':leave',
        animate('1.5s ease-out',
          style({opacity: 0})))
    ])
  ]
})
export class DashboardComponent implements OnInit {

  MAX_PAGE_INDEX = 7;
  MAX_SCORES = 5;
  VIEW_DELAY = 11500;
  initialized = false;
  highScoreEntries: HighScoreEntry[] = [];
  mostInvoluntaryRocker: StatWinnerEntry;
  popMaster: StatWinnerEntry;
  edmMaster: StatWinnerEntry;
  musicLover: StatWinnerEntry;
  soulMaster: StatWinnerEntry;
  discoMaster: StatWinnerEntry;
  currentPageIndex = 0;
  pop = new Howl({src: '../../assets/zapsplat_cartoon_pop_small_lid.mp3', volume: 0.2});

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
    }, this.VIEW_DELAY);
  }

  private fetchHighScores() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('points', 'desc'))
      .snapshotChanges().forEach(data => {
      this.pop.play();
      this.highScoreEntries = [];
      let pos = 1;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        this.highScoreEntries.push({points: stats.points, userId: statsDocument.payload.doc.id, position: pos});
        if (pos++ === this.MAX_SCORES) {
          break;
        }
      }
      if (!this.initialized && this.highScoreEntries.length > 0) {
        this.initialized = true;
        this.fetchMostInvoluntaryRocker();
        this.fetchPopMaster();
        this.fetchEdmMaster();
        this.fetchSoulMaster();
        this.fetchDiscoMaster();
        this.fetchMusicLover();
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
      let currentRocker: StatWinnerEntry = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().rock_points,
        likes: data[0].payload.doc.data().rock_likes,
        category: 'rock-'
      };
      let furthestDistance = currentRocker.points - currentRocker.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.rock_points - stats.rock_likes) > furthestDistance) {
          currentRocker = {
            userId: statsDocument.payload.doc.id,
            points: stats.rock_points,
            likes: stats.rock_likes,
            category: 'rock-'
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
      let currentMaster: StatWinnerEntry = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().pop_points,
        likes: data[0].payload.doc.data().pop_likes,
        category: 'pop-'
      };
      let factor = currentMaster.points + currentMaster.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.pop_points + stats.pop_likes) > factor) {
          currentMaster = {
            userId: statsDocument.payload.doc.id,
            points: stats.pop_points,
            likes: stats.pop_likes,
            category: 'pop-'
          };
          factor = currentMaster.points + currentMaster.likes;
        }
      }
      this.popMaster = currentMaster;
    });
  }

  private fetchEdmMaster() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('edm_points', 'desc'))
      .snapshotChanges().forEach(data => {
      let currentMaster: StatWinnerEntry = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().edm_points,
        likes: data[0].payload.doc.data().edm_likes,
        category: 'edm-'
      };
      let factor = currentMaster.points + currentMaster.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.edm_points + stats.edm_likes) > factor) {
          currentMaster = {
            userId: statsDocument.payload.doc.id,
            points: stats.edm_points,
            likes: stats.edm_likes,
            category: 'edm-'
          };
          factor = currentMaster.points + currentMaster.likes;
        }
      }
      this.edmMaster = currentMaster;
    });
  }

  private fetchSoulMaster() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('soul_points', 'desc'))
      .snapshotChanges().forEach(data => {
      let currentMaster: StatWinnerEntry = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().soul_points,
        likes: data[0].payload.doc.data().soul_likes,
        category: 'soul-'
      };
      let factor = currentMaster.points + currentMaster.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.soul_points + stats.soul_likes) > factor) {
          currentMaster = {
            userId: statsDocument.payload.doc.id,
            points: stats.soul_points,
            likes: stats.soul_likes,
            category: 'soul-'
          };
          factor = currentMaster.points + currentMaster.likes;
        }
      }
      this.soulMaster = currentMaster;
    });
  }

  private fetchDiscoMaster() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('disco_points', 'desc'))
      .snapshotChanges().forEach(data => {
      let currentMaster: StatWinnerEntry = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().disco_points,
        likes: data[0].payload.doc.data().disco_likes,
        category: 'disco-'
      };
      let factor = currentMaster.points + currentMaster.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        if ((stats.disco_points + stats.disco_likes) > factor) {
          currentMaster = {
            userId: statsDocument.payload.doc.id,
            points: stats.disco_points,
            likes: stats.disco_likes,
            category: 'disco-'
          };
          factor = currentMaster.points + currentMaster.likes;
        }
      }
      this.discoMaster = currentMaster;
    });
  }

  private fetchMusicLover() {
    this.db.collection('musicquiz')
      .doc('scoreboard')
      .collection<PlayerStats>('stats', ref =>
        ref.orderBy('points', 'desc'))
      .snapshotChanges().forEach(data => {
      let currentLover: StatWinnerEntry = {
        userId: data[0].payload.doc.id,
        points: data[0].payload.doc.data().points,
        likes: this.summarizeLikes(data[0].payload.doc.data() as PlayerStats),
        category: ''
      };
      let factor = currentLover.likes;
      for (const statsDocument of data) {
        const stats = statsDocument.payload.doc.data() as PlayerStats;
        const totalLikes = this.summarizeLikes(stats);
        if (totalLikes > factor) {
          currentLover = {
            userId: statsDocument.payload.doc.id,
            points: stats.points,
            likes: totalLikes,
            category: ''
          };
          factor = totalLikes;
        }
      }
      this.musicLover = currentLover;
    });
  }

  private summarizeLikes(stats: PlayerStats): number {
    return stats.pop_likes
      + stats.rock_likes
      + stats.soul_likes
      + stats.indie_likes
      + stats.rnb_likes
      + stats.disco_likes
      + stats.rap_likes
      + stats.reggae_likes
      + stats.edm_likes
      + stats.punk_likes;
  }

}
