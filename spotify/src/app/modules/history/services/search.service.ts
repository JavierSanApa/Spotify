import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  getAllTracks$(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${this.URL}/tracks`);
  }
}