import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone:true, 
  imports: [RouterOutlet, 
    FormsModule, CommonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  username = 'username';
  message = ''; 
  messages: {username: string; message: string}[] =[];  

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
      Pusher.logToConsole = true;

    const pusher = new Pusher('31d6155b4467c43db667', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message',(data:{username: string; message: string}) => {
      this.messages.push(data);
    });
  }

  submit(): void{
    this.http.post('http://localhost:8000/api/messages',{
      username: this.username, 
      message: this.message
    }).subscribe(()=> this.message = ''); 
  }
}
