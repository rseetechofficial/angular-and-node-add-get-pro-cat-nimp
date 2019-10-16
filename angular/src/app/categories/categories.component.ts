import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private newCat : String;

  private categories : any[];

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.getCategoryData();
  }

  getCategoryData(){

    this.http.get("http://localhost:3003/api/admin/categories").subscribe(
      (res : any)=>{
          //alert(JSON.stringify(res.categories.length));
          this.categories = res.categories;
      },
      (err)=>{
        console.log("Error is ",err);
      }
    )

  }

  addNewCategory(){
      const newCat = this.newCat;
      const newCatObj = {
        name : newCat
      }

      this.http.post("http://localhost:3003/api/admin/categories", newCatObj).subscribe(
        (res : any)=>{
          //alert(JSON.stringify(res));
          this.getCategoryData();
        }, 
        (err)=>{
          console.log("Error is", err);
        }
      )
  }

}
