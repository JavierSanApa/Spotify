import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)

  public audio!: HTMLAudioElement //TODO:<audio>

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')

  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')

  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')

  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  public tracks: TrackModel[] = [];
  private currentTrackIndex: number = 0;


  callback: EventEmitter<any> = new EventEmitter<any>()

  constructor(private trackService: TrackService) {
    this.loadTracks();

    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOK => {
      if (responseOK) {
        this.setAudio(responseOK)
      }
    })

    this.listenAllEvents()

  }

  loadTracks(): void {
    this.trackService.getAllTacks$().subscribe(tracks => {
      this.tracks = tracks;
      // Aquí también podrías asignar una pista inicial si lo deseas
    });
  }

  playNext(): void {
    // Si es la última pista, vuelve al inicio
    if (this.currentTrackIndex >= this.tracks.length - 1) {
      this.currentTrackIndex = 0; // Vuelve a la primera pista
    } else {
      this.currentTrackIndex++;
    }
    this.setTrackByIndex(this.currentTrackIndex);
  }
  
  playPrevious(): void {
    // Si es la primera pista, ve a la última
    if (this.currentTrackIndex <= 0) {
      this.currentTrackIndex = this.tracks.length - 1; // Cambia al último índice
    } else {
      this.currentTrackIndex--;
    }
    this.setTrackByIndex(this.currentTrackIndex);
  }
  

  private setTrackByIndex(index: number): void {
    const track = this.tracks[index];
    if (track) {
      this.trackInfo$.next(track);
      this.setAudio(track);
    }
  }

  private listenAllEvents(): void {

    this.audio.addEventListener('timeupdate', this.calculateTime, false)

    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)

  }

  private setPlayerStatus = (state: any) => {
    // console.log('😲😲😲', state);
    switch (state.type) { //TODO: ---> play, playing...
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused') // Si algo sale mal, hay algún error, pausamos
        break;
    }
  }

  private calculateTime = () => {

    //console.groupCollapsed('Disparando evento')
    const { duration, currentTime } = this.audio
    //console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)

  }

  setPercentage(currentTime: number, duration: number): void {
    /*TODO: duration ------> 100%
            currentTime --->  %
            (currentTime *100)/duration = %
    */
    let percentage = (currentTime * 100) / duration
    this.playerPercentage$.next(percentage)
  }

  private setTimeElapsed(currentTime: number): void {

    let seconds = Math.floor(currentTime % 60) //TODO: 1, 2,5, 18...números enteros. Obtenemos segundos
    let minutes = Math.floor((currentTime / 60) % 60) //TODO: Obtenemos los minutos en numeros enteros

    //TODO: 00:00 -----> 01:05 ----->10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)

  }

  private setRemaining(currentTime: number, duration: number): void {

    let timeLeft = duration - currentTime

    let seconds = Math.floor(timeLeft % 60) //TODO: 1, 2,5, 18...números enteros. Obtenemos segundos
    let minutes = Math.floor((timeLeft / 60) % 60) //TODO: Obtenemos los minutos en numeros enteros

    //TODO: 00:00 -----> 01:05 ----->10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes

    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)

  }


  //TODO: Funciones públicas
  public setAudio(track: TrackModel): void {
    console.log('🚿🚿🚿🚿', track)
    this.audio.src = track.url
    this.audio.play()

  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void {

    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond

  }

  toggleMute(): void {
    this.audio.muted = !this.audio.muted;
  }

  
}
