import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// service
import { RunesService } from 'src/app/services/runes.service';
import { MapItemsService } from 'src/app/services/map-items.service';




@Component({
  selector: 'app-table-log',
  templateUrl: './table-log.component.html',
  styleUrls: ['./table-log.component.scss']
})
export class TableLogComponent implements OnInit {
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() heroesNameLocal: IheroLocal;
  @Input() data: any[];
  @Input() objectives: any[];
  @Input() mapItemLocal: any;
  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }
  dataSource = new MatTableDataSource();

  runesLocal: any;

  sort;
  displayedColumns: string[] = ['time', 'isRadiant', 'player_slot', 'delta'];

  logFilterObj = {
    objectives: true,
    kills: true,
    runes: true
  };

  logFilterKeyArr = [];

  heroList = [];

  // sideItems
  sideItems = ['radiant', 'dire'];
  sideAllItems = ['radiant', 'dire'];

  // Type
  typeItems = ['objectives', 'kills', 'runes'];
  typeAllItems = ['objectives', 'kills', 'runes'];

  // Heroes
  heroItems = [];
  heroAllItems = [];

  constructor(
    private runesService: RunesService,
  ) {}

  ngOnInit(): void {
    this.getRunesLocal();
    // extract the data
    this.dataSource.data = this.extractData();
    // this.filterData(this.extractData(), this.logFilterObj);
    this.extractHeroList(this.data);

    this.sideItems.forEach(i => {
      this.logFilterObj[i] = true;
    });

    this.logFilterKeyArr = Object.keys(this.logFilterObj);
  }

  extractHeroList(data: any): any[] {
    data.forEach(i => {
      const { hero_id } = i;
      this.heroList.push(this.heroesLocal[hero_id]?.name);
      this.heroAllItems.push(this.heroesLocal[hero_id]?.name);
      this.logFilterObj[this.heroesLocal[hero_id]?.name] = false;
    });
    // console.log(this.heroList);
    return this.heroList;
  }

  // extract matches players[] to less data to meet for this page table
  extractData(): any[] {
    const killsLogData = this.extractSpecificLogData(this.data, 'kills');
    const runesLogData = this.extractSpecificLogData(this.data, 'runes');
    const objectivesLogData = this.extractObjectiveLogData(this.objectives, 'objectives');
    const finalData = [];
    finalData.push(...killsLogData, ...runesLogData, ...objectivesLogData);
    // console.log(finalData.sort((a, b) => a.time - b.time));
    return finalData.sort((a, b) => a.time - b.time);
  }

  extractObjectiveLogData(objectives: any[], field: string): any[] {
    const specificLogData = [];
    objectives.forEach(i => {
      if (i.player_slot && i.player_slot >= 0) {
        const playerOverallData = this.data.find(x => x.player_slot === i.player_slot);
        const {
          hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
          isRadiant,
              } = playerOverallData;
        const player = {
          hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname
        };
        specificLogData.push({
          ...i,
          player_slot,
          player,
          side: isRadiant ? 'radiant' : 'dire',
          isRadiant,
          log_type: field,
          hero: this.heroesLocal[hero_id].name
        });
      } else if (!i.player_slot && i.unit) {
        specificLogData.push({
          ...i,
          player_slot: -1,
          player: null,
          side: i.unit?.includes('badguys') ? 'dire' : 'radiant',
          isRadiant: i.unit?.includes('badguys') ? false : true,
          log_type: field,
          hero: null
        });
      }  else if (!i.player_slot && !i.unit) {
        specificLogData.push({
          ...i,
          player_slot: -1,
          player: null,
          side: 'radiant',
          isRadiant: true,
          log_type: field,
          hero: null
        });
      }
    });
    return specificLogData.sort((a, b) => a.time - b.time);
  }

  extractSpecificLogData(data: any[], field: string): any[] {
    const specificLogData = [];
    data.forEach(i => {
      const {
        hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        isRadiant,
            } = i;
      const log = [];
      const player = {
        hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname
      };
      i[field + '_log'].forEach(l => {
        log.push({
          player_slot,
          player,
          side: isRadiant ? 'radiant' : 'dire',
          isRadiant,
          ...l,
          log_type: field,
          hero: this.heroesLocal[hero_id].name
        });
      });
      specificLogData.push(...log);
    });
    return specificLogData.sort((a, b) => a.time - b.time);
  }

  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  getRunesLocal(): any {
    this.runesService.getRunesLocal().subscribe(data => {
      this.runesLocal = data;
    }, err => {
      console.log(err);
    });
  }

  filterData(data: any[], keys: any, filterHero: boolean): any[] {
    data = data.filter(i => {
      // if filterHero, that means we will filter hero
      if (filterHero) {
        return keys[i.log_type] && keys[i.side] && keys[i.hero];
      } else {
        // if filterHero false, that means we don't filter hero, just show them all
        return keys[i.log_type] && keys[i.side];
      }
    });
    // console.log(data);
    return data;
  }

  filter(value, trueFalse): any {
    this.logFilterObj[value] = trueFalse;
    this.logFilterObj = {
      ...this.logFilterObj,
      ...this.logFilterObj[value]
    };
    this.filterDataNext();
  }

  // chips filter function
  emitValue(e): any {
    // console.log(e);
    this.filter(e[0], e[1]);
  }

  filterDataNext(): any {
    let filterHero = false;
    const heroList = Object.keys(this.logFilterObj).filter(i => i.includes('npc_dota_hero_'));

    const heroListA = [];
    heroList.forEach(i => {
      heroListA.push(this.logFilterObj[i]);
      return heroListA;
    });
    // console.log(heroListA)
    // now if we select one of hero id, will set a flag to filterHero
    // If all or none hero id are selected, filterHero will be flase
    if (heroListA.filter(i => i === false).length === 10 ||
    heroListA.filter(i => i === true).length === 10) {
      filterHero = false;
    } else {
      filterHero = true;
    }
    this.dataSource.data = this.filterData(this.extractData(), this.logFilterObj, filterHero);
  }

}
