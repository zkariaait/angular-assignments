import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { LEADERS } from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders: Leader[] = LEADERS;


  constructor(private leaderService: LeaderService) {
   }

  ngOnInit(): void {
    
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
    

  }

}
