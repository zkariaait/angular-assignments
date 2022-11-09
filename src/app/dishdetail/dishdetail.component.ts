import { MatListModule } from '@angular/material/list';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { rating } from '../shared/rating';
import {MatSliderModule} from '@angular/material/slider';


//dish:Dish







const DISH = {
  id: '0',
  name: 'Uthappizza',
  image: '/assets/images/uthappizza.png',
  category: 'mains',
  featured: true,
  label: 'Hot',
  price: '4.99',
  // tslint:disable-next-line:max-line-length
  description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  comments: [
       {
           rating: 5,
           comment: 'Imagine all the eatables, living in conFusion!',
           author: 'John Lemon',
           date: '2012-10-16T17:57:28.556094Z'
       },
       {
           rating: 4,
           comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
           author: 'Paul McVites',
           date: '2014-09-05T17:57:28.556094Z'
       },
       {
           rating: 3,
           comment: 'Eat it, just eat it!',
           author: 'Michael Jaikishan',
           date: '2015-02-13T17:57:28.556094Z'
       },
       {
           rating: 4,
           comment: 'Ultimate, Reaching for the stars!',
           author: 'Ringo Starry',
           date: '2013-12-02T17:57:28.556094Z'
       },
       {
           rating: 2,
           comment: 'It\'s your birthday, we\'re gonna party!',
           author: '25 Cent',
           date: '2011-12-02T17:57:28.556094Z'
       }
   ]
};




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  date : string;
  dish:Dish
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  feedbackForm: FormGroup;
  selectDish: Dish;
  
 
  @ViewChild('fform') feedbackFormDirective;
  formErrors = {
    'author': ''
  };


  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    }
    
  };


  
  
  constructor(private dishservice: DishService,private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location) {

      this.createForm();
     }

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  
 // this.dish = this.dishservice.getDish(id);
}
createForm() {
  this.feedbackForm = this.fb.group({
    author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    rating: ['', [Validators.required] ],
    comment: '',
    date: ''
  });
  this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
}

setPrevNext(dishId: string) {
  const index = this.dishIds.indexOf(dishId);
  this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
}

goBack(): void {
  this.location.back();
}
onValueChanged(data?: any) {
  if (!this.feedbackForm) { return; }
  const form = this.feedbackForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}
onSubmit() {
  
  this.feedbackForm.get('date')?.setValue((new Date()).toISOString());
  this.comment = this.feedbackForm.value;
  console.log(this.comment);
  this.dish.comments.push(this.comment);
  console.log(this.comment);
 // DISH[index].comments.push({author :this.comment.})
  this.feedbackForm.reset({
    author: '',
    rating: '',
    comment: '',
    date: ''
  });
  this.feedbackFormDirective.resetForm();
}

}
