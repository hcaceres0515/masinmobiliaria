import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Tus Propiedades',
        stats: '12',
        icon: 'person',
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
}
