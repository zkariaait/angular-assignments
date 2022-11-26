import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish : Dish;
  promotion : Promotion;
  leader : Leader
  errMess: string;

  constructor(private dishService: DishService , private leaderService: LeaderService,
    private promotionService: PromotionService, @Inject('baseURL') public BaseURL
    ) { }

  ngOnInit(): void {
    
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader);
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.errMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);;

  }

}
