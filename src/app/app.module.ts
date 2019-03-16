import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import { HighscoreEntryComponent } from './highscore-entry/highscore-entry.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StatWinnerComponent } from './stat-winner/stat-winner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HighscoreEntryComponent,
    StatWinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
