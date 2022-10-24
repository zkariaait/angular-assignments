import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

import { MatListModule } from '@angular/material/list';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})




export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;

  selectedDish: Dish;



  onSelect(dish: Dish) {
    
    this.selectedDish = dish;
  }
  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes();
  }

}

