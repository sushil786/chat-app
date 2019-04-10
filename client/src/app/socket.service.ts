import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io('http://localhost:8000')
  constructor() { }

  sendMessage(data) {
    this.socket.emit('chat', data)
  }

  recieveMessage() {
    let observable = new Observable<{ name: String, message: String }>(observer => {
      this.socket.on('chat', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  /*userTyping(data){
    this.socket.emit('typing',data)
  }

  displayTyping(){
    let observable = new Observable<{name:String}>(observer=>{
      this.socket.on('typing',(data)=>{
        observer.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    return observable;
  }*/

}
