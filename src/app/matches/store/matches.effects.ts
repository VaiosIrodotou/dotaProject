import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

// service
import { MatchesService } from '../services/matches.service';

// ngrx
import * as MatchesAction from './matches.actions';

// model
import { IMatch } from '../model/match';
import { IRecentMatch } from '../model/recent-match';

@Injectable()
export class MatchesEffects {
  constructor(
    private matchesService: MatchesService,
    private actions$: Actions
  ) {}


}
