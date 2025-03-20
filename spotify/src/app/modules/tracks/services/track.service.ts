import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;


  constructor(private httpClient: HttpClient) {

  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]>{
    return new Promise((resolve, reject) =>{
      const listTmp = listTracks.filter(a => a._id != id)
      resolve(listTmp)
    })
  }


  /* @returns todas las canciones */

  /* @returns {data: […1,…2,…3]} */
  getAllTacks$(): Observable<any>{

    return this.httpClient.get(`${this.URL}/tracks`)

    .pipe(
      map(({ data }: any) =>{
        return data
      })
    )
    
  }
/*
 *  @returns Devolver canciones random 
 */
  getAllRandom$(): Observable<any>{

    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      tap(data => console.log('🔴🔴🔴', data)),
      mergeMap(({ data }: any) => this.skipById(data,2) ),
      /*map((dataInversa) =>{ //TODO: Aplicar un filter común de array
        return dataInversa.filter((track: TrackModel) => track.artist?.name != "David Guetta" )
      })*/
      tap(data => console.log('🆗🆗🆗', data)),
      catchError((err) => {
        const {status, statusText} = err;
        console.log('Algo pasó, revisame 🆗⚠⚠', [status, statusText])
        return of([])
      })
    )
    
  }
}
