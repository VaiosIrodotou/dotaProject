import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.scss']
})
export class MedalsComponent implements OnInit {
  medals = [];
  tierMapping = ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine' , 'Immortal'];
  isLoading = true;
  constructor() { }

  ngOnInit(): void {
    this.generalMedalsData();
  }

  generalMedalsData(): any {
    const unknowMedal = {
      leaderboard_rank: null,
      rank_tier: null,
    };

    this.medals.push(unknowMedal);

    for (let i = 1; i < 8; i++) {
      for (let k = 1; k < 6; k++) {
        const medal = {
          leaderboard_rank: null,
          rank_tier: +(i + '' + k + '')
        };
        this.medals.push(medal);
      }
    }

    const immortalMedal = [
      {
        leaderboard_rank: 1000,
        rank_tier: 80
      },
      {
        leaderboard_rank: 100,
        rank_tier: 80
      },
      {
        leaderboard_rank: 10,
        rank_tier: 80
      },
      {
        leaderboard_rank: 1,
        rank_tier: 80
      },
    ];

    this.medals.push(...immortalMedal);
    this.isLoading = false;
    // console.log(this.medals);
    return this.medals;
  }

}
