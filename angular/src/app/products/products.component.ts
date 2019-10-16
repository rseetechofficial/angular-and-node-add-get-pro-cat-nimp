import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private newProTitle : String;
  private newProPrice : String;
  private newProDesc : String;
  private newProCat : String;

  private categories : any[];

  private products : any[];
  constructor(private http : HttpClient) { }

  ngOnInit() {
      this.getProducts();
      this.getCategory();
  }

  getCategory(){

    this.http.get("http://localhost:3003/api/admin/categories").subscribe(
      (res : any)=>{
          //alert(JSON.stringify(res.categories));
          this.categories = res.categories;
      },
      (err)=>{
        console.log("Error is ",err);
      }
    )

  }

  getProducts(){

    this.http.get("http://localhost:3003/api/admin/products").subscribe(
      (res : any)=>{
          //console.log("List of products ",JSON.stringify(res));
          this.products = res.products;
      },
      (err)=>{
        console.log("Error is ",err);
      }
    )

  }

  addNewProduct(){
    const newProTitle = this.newProTitle;
    const newProPrice = this.newProPrice;
    const newProDesc = this.newProDesc;
    const newProCat = this.newProCat;

    const newProObj = {
      title : newProTitle,
      price : newProPrice,
      description : newProDesc,
      category : newProCat

    }

    this.http.post("http://localhost:3003/api/admin/products", newProObj).subscribe(
      (res : any)=>{
        //alert(JSON.stringify(res));
        this.getProducts();
      }, 
      (err)=>{
        console.log("Error is", err);
      }
    )
}


}
