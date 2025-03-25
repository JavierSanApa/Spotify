import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent implements OnInit {
  tracks: Array<TrackModel> = [];
  filteredTracks: Array<TrackModel> = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getAllTracks$().subscribe((response: any) => {
      const { data } = response;
      this.tracks = data;
      this.filteredTracks = data;
    });
  }

  searchTracks(term: string): void {
    if (!term) {
      this.filteredTracks = this.tracks;
      return;
    }
    
    this.filteredTracks = this.tracks.filter(track => 
      track.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}