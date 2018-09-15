import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	messages = [];
	message;
	connection;
	imagepath = '';
	username:string = '';

	constructor(private socketService: SocketService, private router: Router, private http: HttpClient) {}

	ngOnInit() {
    // Gets messages sent and subscribes to node.js socket server, checks for logged in user
		this.connection = this.socketService.getMessages().subscribe(message => {
			this.messages.push(message);
			this.message = "";
		});

		if (!sessionStorage.username || !sessionStorage.email) {
			sessionStorage.clear();
			alert("You are not logged in!")
			this.router.navigateByUrl('');
		}

		this.username = sessionStorage.username;

		const req = this.http.post('http://localhost:3000/api/users', {})
			.subscribe((data: any) => {
					if (data.userData) {
						this.imagepath = data.userData[0].imagepath;
						console.log(this.imagepath);
					} else {
						alert('Error!');
						return;
					}
				},
				err => {
					alert('An error has occured trying to get user image.')
					console.log("Error occured");
					return;
				});
	}

	sendMessage() {
		// Pushes message to socketService & logs datetime + user who sent the message.
		let date = new Date();
		//let usernamestr = username.replace(/\"/g, ""));
		if (this.message == null || this.message === "") {
			alert('You must enter a message to send something!');
		} else {
			this.socketService.sendMessage(this.message + ' (' + this.username + ') - Sent at ' + date.getHours() + ':' + date.getMinutes());
			this.message = "";
		}
	}
}
