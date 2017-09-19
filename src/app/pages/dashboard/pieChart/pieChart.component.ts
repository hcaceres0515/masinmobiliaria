import {Component} from '@angular/core';

import {PieChartService} from './pieChart.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';
import {AuthService} from '../../auth-service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html'
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: any;
  public userCharts: Array<Object>;
  public userData: any;
  private _init = false;

  constructor(private _pieChartService: PieChartService, private _authService: AuthService) {
    this.userData = this._authService.getUserData();
    // this.charts = this._pieChartService.getUserData(1, 1);
    // this.charts = this._pieChartService.getData();
    // this._loadPieCharts();
    // console.log(this.charts);
    this.loadPieChart();



  }

  ngAfterViewInit() {
    if (!this._init) {
      setTimeout(() => {
        this._loadPieCharts();
        // this.loadPieChart();
        // this._updatePieCharts();
        this._init = true;
      }, 1000);

    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }

  private loadPieChart() {
    let userId = this.userData.id;
    let officeId = this.userData.office_id;

    this._pieChartService.getUserData(officeId, userId).subscribe(
      (data) => { this.charts = data; },
      (error) => {},
      () => {
      }
    );
  }
}
