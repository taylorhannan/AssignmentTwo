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
    });
  }
}
