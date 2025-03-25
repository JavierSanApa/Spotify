import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { FavoriteService } from '@shared/services/favorite.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
})
export class FavoritePageComponent {
  tracks$: Observable<TrackModel[]>;

  constructor(private favoriteService: FavoriteService) {
    this.tracks$ = this.favoriteService.favoriteTracks$;
  }
}
