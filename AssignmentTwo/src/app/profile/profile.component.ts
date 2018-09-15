import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImguploadService } from '../imgupload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private imguploadService: ImguploadService) { }
  username: string = '';
	email: string = '';
	role: string = '';
  selectedfile = null;
  imagepath = '';

  ngOnInit() {
    if (!sessionStorage.username || !sessionStorage.email) {
      sessionStorage.clear();
      alert("You are not logged in!")
      this.router.navigateByUrl('');
    }

    this.username = sessionStorage.username;
    this.email = sessionStorage.email;
    this.role = sessionStorage.role;


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

  onFileSelected(event){
    console.log(event);
    this.selectedfile = event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image',this.selectedfile,this.selectedfile.name);
    this.imguploadService.imgupload(fd).subscribe(res=>{
      this.imagepath = res.data.filename;
      console.log(res.data.filename + ' , ' + res.data.size);

			const req = this.http.post('http://localhost:3000/api/userimage', {
					username: this.username,
          email: this.email,
          role: this.role,
          imagepath: this.imagepath
				})
				.subscribe((data: any) => {
						if (data.success) {
							alert('Image uploaded successfully!');
						} else {
							alert('Error!');
							return;
						}
					},
					err => {
						alert('An error has occured trying to upload image.')
						console.log("Error occured");
						return;
					});
    });
  }
}
