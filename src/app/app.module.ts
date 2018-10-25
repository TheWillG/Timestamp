import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
import { AddComponent } from './components/add/add.component';
import { IonicStorageModule } from '@ionic/storage';
import { CountdownComponent } from './components/countdown/countdown.component';
import { EditComponent } from './components/edit/edit.component';
import { ResetConfirmComponent } from './components/reset-confirm/reset-confirm.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [AppComponent, AddComponent, CountdownComponent, EditComponent, ResetConfirmComponent, HistoryComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
