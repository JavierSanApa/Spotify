import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteTracksSubject = new BehaviorSubject<TrackModel[]>([]);
  public favoriteTracks$ = this.favoriteTracksSubject.asObservable();

  constructor() {
    this.loadFavoritesFromStorage();
  }

  toggleFavorite(track: TrackModel): void {
    const currentFavorites = this.favoriteTracksSubject.value;
    const trackIndex = currentFavorites.findIndex(t => t._id === track._id);

    if (trackIndex === -1) {
      currentFavorites.push(track);
    } else {
      currentFavorites.splice(trackIndex, 1);
    }

    this.favoriteTracksSubject.next(currentFavorites);
    localStorage.setItem('favoriteTracks', JSON.stringify(currentFavorites));
  }

  isFavorite(trackId: string): boolean {
    return this.favoriteTracksSubject.value.some(track => track._id === trackId);
  }

  private loadFavoritesFromStorage(): void {
    const stored = localStorage.getItem('favoriteTracks');
    if (stored) {
      this.favoriteTracksSubject.next(JSON.parse(stored));
    }
  }
}