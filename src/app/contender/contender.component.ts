import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PlayerStats, User} from '../declarations';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-contender',
  templateUrl: './contender.component.html',
  styleUrls: ['./contender.component.css']
})
export class ContenderComponent implements OnChanges {

  @Input()
  userId: string;
  user: User;
  stats: PlayerStats;
  description: string;

  constructor(private db: AngularFirestore) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchUser();
  }

  private fetchUser() {
    this.db.collection('users')
      .doc<User>(this.userId).valueChanges()
      .forEach(u => {
        this.user = u;
        delete this.stats;
        this.db.collection('musicquiz')
          .doc('scoreboard')
          .collection('stats')
          .doc<PlayerStats>(this.userId)
          .valueChanges()
          .forEach(s => {
            if (s) {
              this.stats = s;
              this.extractSkill();
            }
          });
      });
  }

  private extractSkill() {
    let skill = '';
    let favours = '';
    let skillPoint = 0;
    let likePoint = 0;
    let goodAt = false;
    let likes = false;
    if (this.stats.punk_likes > likePoint) {
      favours = 'punk';
      likes = true;
      likePoint = this.stats.punk_likes;
    }
    if (this.stats.edm_likes > likePoint) {
      favours = 'EDM';
      likes = true;
      likePoint = this.stats.edm_likes;
    }
    if (this.stats.reggae_likes > likePoint) {
      favours = 'reggae';
      likes = true;
      likePoint = this.stats.reggae_likes;
    }
    if (this.stats.rap_likes > likePoint) {
      favours = 'rap';
      likes = true;
      likePoint = this.stats.rap_likes;
    }
    if (this.stats.disco_likes > likePoint) {
      favours = 'disco';
      likes = true;
      likePoint = this.stats.disco_likes;
    }
    if (this.stats.rnb_likes > likePoint) {
      favours = 'R\'n\'B';
      likes = true;
      likePoint = this.stats.rnb_likes;
    }
    if (this.stats.rock_likes > likePoint) {
      favours = 'rock';
      likes = true;
      likePoint = this.stats.rock_likes;
    }
    if (this.stats.indie_likes > likePoint) {
      favours = 'indie';
      likes = true;
      likePoint = this.stats.indie_likes;
    }
    if (this.stats.soul_likes > likePoint) {
      favours = 'soul';
      likes = true;
      likePoint = this.stats.soul_likes;
    }
    if (this.stats.pop_likes > likePoint) {
      favours = 'pop';
      likes = true;
      likePoint = this.stats.pop_likes;
    }
    if (this.stats.punk_points > skillPoint) {
      skill = 'punk';
      skillPoint = this.stats.punk_points;
      goodAt = true;
    }
    if (this.stats.edm_points > skillPoint) {
      skill = 'EDM';
      skillPoint = this.stats.edm_points;
      goodAt = true;
    }
    if (this.stats.reggae_points > skillPoint) {
      skill = 'reggae';
      skillPoint = this.stats.reggae_points;
      goodAt = true;
    }
    if (this.stats.rap_points > skillPoint) {
      skill = 'rap';
      skillPoint = this.stats.rap_points;
      goodAt = true;
    }
    if (this.stats.disco_points > skillPoint) {
      skill = 'disco';
      skillPoint = this.stats.disco_points;
      goodAt = true;
    }
    if (this.stats.rnb_points > skillPoint) {
      skill = 'R\'n\'B';
      skillPoint = this.stats.rnb_points;
      goodAt = true;
    }
    if (this.stats.rock_points > skillPoint) {
      skill = 'rock';
      skillPoint = this.stats.rock_points;
      goodAt = true;
    }
    if (this.stats.indie_points > skillPoint) {
      skill = 'indie';
      skillPoint = this.stats.indie_points;
      goodAt = true;
    }
    if (this.stats.soul_points > skillPoint) {
      skill = 'soul';
      skillPoint = this.stats.soul_points;
      goodAt = true;
    }
    if (this.stats.pop_points > skillPoint) {
      skill = 'pop';
      goodAt = true;
    }
    this.description = '';
    if (!goodAt && !likes) {
      this.description = 'Har inte hittat sin nisch än';
    } else if (goodAt && skill === favours) {
      this.description = 'Kan och gillar ' + skill;
    } else if (goodAt && !likes) {
      this.description = 'Vass på ' + skill;
    } else if (goodAt && likes) {
      this.description = 'Gillar ' + favours + ', grym på ' + skill;
    } else {
      this.description += 'Diggar ' + favours;
    }
  }

}
