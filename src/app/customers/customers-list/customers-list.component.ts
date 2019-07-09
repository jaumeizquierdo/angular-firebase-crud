import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomersList();
  }

  // In the code above, we use snapshotChanges() with RxJS map() operator to get the key (Firebase id) of each item.

  getCustomersList() {
    this.customerService.getCustomerList().snapshotChanges().pipe(
      map(changes =>
        changes.map( c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.customers = customers;
    });
  }

  deleteCustomers() {
    this.customerService.deleteAll().catch( err => console.log(err) );
  }

}
