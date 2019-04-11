import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: String;
  name: String;
  typing : String;
  messageArray: Array<{ name: String, message: String }> = [];
  user: String
  constructor(private socket: SocketService) {

    this.socket.recieveMessage().subscribe(
      data => {
        this.message = ""
        this.messageArray.push(data)
      }
    )

    /*this.socket.displayTyping().subscribe(
      data=>{
        this.user=data.name
      })*/

  }

  ngOnInit() {
  }
  
  sendMessage() {
    this.socket.sendMessage({
      message: this.message,
      name: this.name
    })
  }

  /*userTyping(){
    this.socket.userTyping({name:this.name})
  }*/
}
