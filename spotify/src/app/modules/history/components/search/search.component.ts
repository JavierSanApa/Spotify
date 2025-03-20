import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter<any> = new EventEmitter()

  src: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string): void{

    if(term.length >= 3){
      this.callbackData.emit(term)
      console.log('LLAMAMOS A NUESTRA API HTTP GET ----->', term);
    }
    

  }

  /*callSearch(term: string): void {
    if(term.length >= 3){
      this.callBackData.emit(term)
      console.log('LLAMAMOS A NUESTRA API HTTP GET ----->', term)
    }
  }*/
 
}