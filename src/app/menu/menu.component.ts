import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

import { MatListModule } from '@angular/material/list';
import { baseURL } from '../shared/baseurl';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})



export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;
  errMess: string;
  constructor(private dishService: DishService, @Inject('baseURL') public BaseURL)  { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,errmess => this.errMess = <any>errmess);

  }

}

