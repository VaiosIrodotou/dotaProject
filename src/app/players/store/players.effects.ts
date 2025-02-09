import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

// service
import { PlayersService } from '../services/players.service';

// model
import { IWinlose } from '../model/winlose';
import { IPlayer } from '../model/general';
import { IPeer } from '../model/peer';
import { IHeroesPlayed } from '../model/hero-played';

// ngrx
import * as playersActions from './players.actions';
import { IMatch } from 'src/app/matches/model/match';
import { IRecentMatch } from 'src/app/matches/model/recent-match';
import { ICount } from '../model/count';
import { ITotal } from '../model/total';
import { IRanking } from '../model/ranking';
import { IPro } from '../model/pro';
import { IHistogram } from '../model/histogram';
import { IRecord } from '../model/record';
import { ITrend } from '../model/trend';
import { IRating } from '../model/rating';


@Injectable()
export class PlayersEffects {
  constructor(
    private actions$: Actions,
    private playersService: PlayersService
  ) {}

  // get player win lose
  getWinLoseCount$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_WIN_LOSE_COUNT),
    switchMap(({ accountId, queryParams }) =>
      this.playersService.getWinLoseCount(accountId, queryParams)
        .pipe(
          map((playersWinLoseCount: IWinlose )  =>
              new playersActions.LoadPlayersWinLoseCountSuccess(accountId, queryParams, playersWinLoseCount)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get player 'my record with' win lose
  getMyRecordWithWinLoseCount$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_MY_RECORD_WITH_WIN_LOSE_COUNT),
    switchMap(({ accountId, queryParams }) =>
      this.playersService.getWinLoseCount(accountId, queryParams)
        .pipe(
          map((playersWinLoseCount: IWinlose )  =>
              new playersActions.LoadPlayersMyRecordWithWinLoseCountSuccess(accountId, queryParams, playersWinLoseCount)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get play data
  getGeneral$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_GENERAL),
    switchMap(({ accountId }) =>
      this.playersService.getPlayerData(accountId)
        .pipe(
          map((playersGeneral: IPlayer) =>
            new playersActions.LoadPlayersGeneralSuccess(accountId, playersGeneral)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get play peers
  getPeers: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_PEERS),
      switchMap(({ accountId, queryParams }) =>
        this.playersService.getPlayerPeers(accountId, queryParams)
        .pipe(
          map((playersPeers: IPeer[]) =>
            new playersActions.LoadPlayersPeersSuccess(accountId, queryParams, playersPeers)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get player peers filter
  getPeersFilter: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_PEERS_FILTER),
      switchMap(({ accountId }) =>
        this.playersService.getPlayerPeers(accountId)
        .pipe(
          map((playersPeersFilter: IPeer[]) =>
            new playersActions.LoadPlayersPeersFilterSuccess(accountId, playersPeersFilter)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // get player heroes played
  getPlayerHeroesPlayed: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_HEROES_PLAYED),
      switchMap(({ accountId, queryParams }) =>
        this.playersService.getPlayerHeroesPlayed(accountId, queryParams)
          .pipe(
            map((playersHeroesPlayed: IHeroesPlayed[]) =>
              new playersActions.LoadPlayersHeroesPlayedSuccess(accountId, queryParams, playersHeroesPlayed)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // Load player matches
  getPlayerMatches$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_MATCHES),
      switchMap(({ accountId, queryParams, fields }) =>
        this.playersService.getPlayerMatches(accountId, queryParams)
          .pipe(
            map((playersMatches: IMatch[]) =>
              new playersActions.LoadPlayersMatchesSuccess(accountId, queryParams, playersMatches)
          ),
          catchError(() =>
            EMPTY
          )
        )
      ),
    )
  );
  // Load player recent matches
  getPlayerRecentMatches$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_RECENT_MATCHES),
      switchMap(({ accountId }) =>
        this.playersService.getPlayerRecentMatches(accountId)
          .pipe(
            map((playersRecentMatches: IRecentMatch[]) =>
              new playersActions.LoadPlayersRecentMatchesSuccess(accountId, playersRecentMatches)
            ),
            catchError(() =>
              EMPTY
            )
          )
      )
    ),
  );

  // Load player counts
  getPlayerCounts$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_COUNTS),
      switchMap(({ accountId, queryParams }) =>
        this.playersService.getPlayerCounts(accountId, queryParams)
          .pipe(
            map((playersCounts: ICount) =>
              new playersActions.LoadPlayersCountsSuccess(accountId, queryParams, playersCounts)
            ),
            catchError(() =>
              EMPTY
            )
          )
      )
    ),
  );

  // Load player totals
  getPlayerTotals$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_TOTALS),
      switchMap(({ accountId, queryParams }) =>
        this.playersService.getPlayerTotals(accountId, queryParams)
        .pipe(
          map((playersTotals: ITotal[]) =>
            new playersActions.LoadPlayersTotalsSuccess(accountId, queryParams, playersTotals)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // Load player rankings
  getPlayerRankings$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_RANKINGS),
      switchMap(({ accountId }) =>
        this.playersService.getPlayerRankings(accountId)
        .pipe(
          map((playersRankings: IRanking[]) =>
            new playersActions.LoadPlayersRankingsSuccess(accountId, playersRankings)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // Load player pros
  getPlayersPros$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_PROS),
      switchMap(({ accountId, queryParams }) =>
        this.playersService.getPlayersPros(accountId, queryParams)
        .pipe(
          map((playersPros: IPro[]) =>
            new playersActions.LoadPlayersProsSuccess(accountId, queryParams, playersPros)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );

  // Players records
  getPlayerRecords$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_RECORDS),
    switchMap(({ accountId, queryParams, field }) =>
      this.playersService.getPlayerRecords(accountId, field, queryParams)
      .pipe(
        map((records: IRecord[]) =>
          new playersActions.LoadPlayersRecordsSuccess(accountId, field, queryParams, records)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
);

  // Players histograms
  getPlayerHistograms$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_HISTOGRAMS),
    switchMap(({ accountId, queryParams, field }) =>
      this.playersService.getPlayerHistograms(accountId, field, queryParams)
      .pipe(
        map((histograsms: IHistogram[]) =>
          new playersActions.LoadPlayersHistogramsSuccess(accountId, field, queryParams, histograsms)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  ),
);

// Players trends
getPlayerTrends$: Observable<Action> = createEffect(() =>
this.actions$.pipe(
  ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_TRENDS),
  switchMap(({ accountId, queryParams, field }) =>
    this.playersService.getPlayerTrends(accountId, field, queryParams)
    .pipe(
      map((trends: ITrend[]) =>
        new playersActions.LoadPlayersTrendsSuccess(accountId, field, queryParams, trends)
      ),
      catchError(() =>
        EMPTY
      )
    )
  )
),
);

  // Players wardmap
  getPlayerWardMaps$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_WARDMAP),
    switchMap(({ accountId, queryParams }) =>
      this.playersService.getPlayerWardMaps(accountId, queryParams)
      .pipe(
        map((wardMaps: any) =>
          new playersActions.LoadPlayersWardMapsSuccess(accountId, queryParams, wardMaps)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  )
);

  // Players wordcloud
  getPlayerWordClouds$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_WORDCLOUD),
    switchMap(({ accountId, queryParams }) =>
      this.playersService.getPlayerWordClouds(accountId, queryParams)
      .pipe(
        map((wordClouds: any) =>
          new playersActions.LoadPlayersWordCloudsSuccess(accountId, queryParams, wordClouds)
        ),
        catchError(() =>
          EMPTY
        )
      )
    )
  )
);

  // Players ratings
  getPlayersRatings$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playersActions.PlayersActionTypes.LOAD_PLAYERS_RATINGS),
      switchMap(({ accountId }) =>
        this.playersService.getPlayerRatings(accountId)
        .pipe(
          map((ratings: IRating[]) =>
            new playersActions.LoadPlayersRatingsSuccess(accountId, ratings)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    )
  );

  getProPlayers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playersActions.PlayersActionTypes.LOAD_PRO_PLAYERS),
      switchMap(() =>
        this.playersService.getProPlayers()
        .pipe(
          map((pros: IPro[]) =>
            new playersActions.LoadProPlayersSuccess(pros)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );
  // rank tier distribution
  getRankTierDistribution$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playersActions.PlayersActionTypes.LOAD_RANK_TIER_DISTRIBUTION),
      switchMap(() =>
        this.playersService.getRankTierDistribution()
        .pipe(
          map((data: any) =>
            // we only need the ranks current
            new playersActions.LoadRankTierDistributionSuccess(data.ranks)
          ),
          catchError(() =>
            EMPTY
          )
        )
      )
    ),
  );
}
