import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://localhost:7286/api/"

  email: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.email.asObservable();

  UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdObserve = this.UserId.asObservable();


  GetGymAndClassItems(type:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetClassOrGym/${type}`)
  }


  GetAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/AllProducts`);
  }


  GetAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Categories/AllCategories`);
  }
  GetProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Categories/ProductsByCategoryId2/${categoryId}`);
  }


  GetGymAndClassItemDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetItemsDetails/${id}`)
  }

  GetGymAndClassItemAvailableTime(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetAvailableTime/${id}`)
  }

  GetSubscriptions(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetSubscription/${id}`)
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}User/Register`, data)
}
  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}User/LOGIN`, data)
  }

  getTips(): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Nutirition/Tips`)
  }


  getCategorieRecipe(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Nutirition/RecipesCategory`);
  }
  
  getRecipesByCategory(categoryId: number): Observable<any[]> {
    const url = `https://localhost:7286/api/Nutirition/Recipes/${categoryId}`; 
    return this.http.get<any[]>(url);
  }



  getRecipeDetails(id: number): Observable<any> {
    const url = `https://localhost:7286/api/Nutirition/Recipesdetels/${id}`; 
    return this.http.get<any>(url); 
  }





  GetProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/Product/${id}`)
  }

  GetRandom3ProductsByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/GetRandom3ProductsByCategory/${id}`)
  }

  GetLast3ProductsByCategory(categoryId: any) {
    return this.http.get<any[]>(`${this.baseUrl}Products/GetLast3ProductsByCategory/${categoryId}`);
  }


 


  addCartItem(userId: number, cartItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Cart/addCartItems/${userId}`, cartItem);
  }

  submitContact(contactData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}Contact`, contactData);
  }

  getContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}Contact/contact`);
  }




  addSubscribtionToEnrolled(data:any): Observable<any> {
    
    return this.http.post<any>(`https://localhost:7286/api/Pyment/checkoutForSubscription`, data)
  }

  getTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Testimonials`);

  }
  addTestimonial(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Testimonials`, formData)
  }

  


  getCartItems(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cart/getCartItems/${id}`)
  }

  getCartTotal(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cart/getCartTotal/${id}`)
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Cart/deleteCartItem/${cartItemId}`)
  }

  changeCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Cart/changeCartItemQuantity/${cartItemId}`, quantity)
  }

  moveFromCartToOrder(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Cart/moveFromCartToOrder/${userId}`, null)
  }

  getUserInfoForOrder(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}CheckOut/getUserInfoForOrder/${userId}`)
  }

  getCartDetailsForCheckout(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}CheckOut/getCartDetailsForCheckout/${userId}`)
  }


  BSCArtList: any = []
  BSCArtListSub = new BehaviorSubject<any>(this.BSCArtList)
  BSCArtListObs = this.BSCArtListSub.asObservable()

  BSAddToCart(data: any) {
    //debugger
    var record = this.BSCArtList.find((x: any) => x.productId == data.productId)

    if (record) {
      record.quantity += data.quantity
      console.log(record)
      //console.log(this.BSCArtList)

      //alert("product already exist in the cart")
    }
    else {
      this.BSCArtList.push(data);
      this.BSCArtListSub.next(this.BSCArtList)
      //console.log(this.BSCArtList)
    }

  }

  getProductInfoForCart(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cart/getProductInfoForCart/${productId}`)
  }

  BSCArtTotal(data: any): number {
    let total: any = 0;
    data.forEach((item: any) => {
      total += item.quantity * item.price
    })
    console.log(total)
    return total
  }


  BSCartItemDelete(productId: number) {

    const index = this.BSCArtList.findIndex((x: any) => x.productId === productId);

    if (index !== -1) {
      this.BSCArtList.splice(index, 1); // Remove the item using splice
      this.BSCArtListSub.next([...this.BSCArtList]); // Update the BehaviorSubject with a new array
    } else {
      alert("No product was found");
    }

  }

  BSCartItemQuantity(productId: number, quantity: number) {
    var product = this.BSCArtList.find((a: any) => a.productId == productId);

    if (product) {
      product.quantity += quantity; // Corrected 'Quantity' to 'quantity'

      // Optional: Prevent negative quantities
      if (product.quantity < 0) {
        product.quantity = 0;
      }

      this.BSCArtListSub.next([...this.BSCArtList]);
    }
  }





}



 



