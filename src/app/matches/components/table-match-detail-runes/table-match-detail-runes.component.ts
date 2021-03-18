import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-match-detail-runes',
  templateUrl: './table-match-detail-runes.component.html',
  styleUrls: ['./table-match-detail-runes.component.scss']
})
export class TableMatchDetailRunesComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  // above is common player column
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'player_slot',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ];

  runsKeyObj: any = {
    0: {
      tooltip: 'Double Damage'
    },
    1: {
      tooltip: 'Haste'
    },
    2: {
      tooltip: 'Illusion'
    },
    3: {
      tooltip: 'Invisibility'
    },
    4: {
      tooltip: 'Regeneration'
    },
    5: {
      tooltip: 'Bounty'
    },
    6: {
      tooltip: 'Arcane'
    }
  };
  sort;
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }
  // extract matches players[] to less data to meet for this page table
  extractData(data): any[] {
    const finalData = [];
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        runes, } = z;
      finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        0: runes[0],
        1: runes[1],
        2: runes[2],
        3: runes[3],
        4: runes[4],
        5: runes[5],
        6: runes[6],
      });
    });

    return finalData;
  }
  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  calPerfectData(data: any, field: string, min: string = '', subField?: string): number {
    const dataField = data.map(item => item[field]).filter(i => i !== undefined);
    const dataWithSubField = data.map(item => item[field]).map(sub => sub[subField]).filter(i => i !== undefined);
    if (!min) {
      if (subField) {
        return Math.max(...dataWithSubField);
      }
      return Math.max(...dataField);
    } else {
      if (subField) {
        return Math.min(...dataWithSubField);
      }
      return Math.min(...dataField);
    }
  }

}
