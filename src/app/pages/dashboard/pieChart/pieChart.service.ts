import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { CONFIG_ENV } from '../../../app.config';
import { Http } from '@angular/http';

@Injectable()
export class PieChartService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  constructor(private _baConfig: BaThemeConfigProvider, private _http: Http) {
  }

  getData() {
    // let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    let pieColor = '#ec8600';
    console.log('load chart');
    return [
      {
        color: 'red',
        description: 'Tus Propiedades',
        number: '0',
        percentage: 0,
        stats: '12',
        icon: 'home',
      }, {
        color: pieColor,
        description: 'Tus Ventas',
        stats: '$ 2000',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Tus clientes',
        stats: '20',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'Tus visitas',
        stats: '10',
        icon: 'refresh',
      }
    ];
  }

  getUserData(officeId, userId) {
    return this._http.get(this.PATH_SERVER + '&c=user&m=get_pie_chart_dashboard&office_id=' + officeId + '&user_id=' + userId)
      .map(res => res.json());
  }
}
