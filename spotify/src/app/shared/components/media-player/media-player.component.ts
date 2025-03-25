import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //TODO: Programación reactiva!
import { FavoriteService } from '@shared/services/favorite.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  @Input() track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };

  listObservers$: Array<Subscription> = []

  state: string = 'paused'

  isMuted: boolean = false;

  constructor(public multimediaService: MultimediaService,
    private trackService: TrackService,
    private favoriteService: FavoriteService
    ) { }

  playRandomTrack(): void {
    this.trackService.getAllRandom$().subscribe(randomTracks => {
      if (randomTracks && randomTracks.length > 0) {
        const randomIndex = Math.floor(Math.random() * randomTracks.length);
        const randomTrack = randomTracks[randomIndex];
        this.multimediaService.trackInfo$.next(randomTrack);
      }
    });
  }

  restartTrack(): void {
    if (this.multimediaService.audio) {
      this.multimediaService.audio.currentTime = 0;
      this.multimediaService.audio.play();
    }
  }


  ngOnInit(): void {

    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$]

  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('🔴🔴🔴🔴🔴🔴🔴 BOOOOM')
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1500 (por ejemplo) - x
    const percentageFromX = (clickX * 100) / width
    console.log('Click (x): ', percentageFromX)
    this.multimediaService.seekAudio(percentageFromX)

  }

  muteUnmute(): void {
    this.isMuted = !this.isMuted;
    this.multimediaService.toggleMute();
  }

  playPreviousTrack(): void {
    this.multimediaService.playPrevious();
  }
  
  playNextTrack(): void {
    this.multimediaService.playNext();
  }
  

  toggleFavorite(): void {
    const currentTrack = this.multimediaService.trackInfo$.getValue();
    if (currentTrack) {
      this.favoriteService.toggleFavorite(currentTrack);
    }
  }

  isFavorite(): boolean {
    const currentTrack = this.multimediaService.trackInfo$.getValue();
    return currentTrack 
      ? this.favoriteService.isFavorite(currentTrack._id)
      : false;
  }
}
