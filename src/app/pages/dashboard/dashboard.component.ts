import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { After } from 'node:v8';


declare function buildTooltip(props: any, options: any): void;

declare function buildChart(selector: string, shared: any, light: any,   dark: any): void;

declare function buildTooltipCompareTwo(props: any, arg1: { title: string; mode: any; hasTextLabel: boolean; wrapperExtClasses: string; markerExtClasses: string; }): void;

declare function buildTooltipForDonut(props: any, arg1: any): void;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetsModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, AfterViewInit{
  
  loading = signal<boolean>(false);

  readonly platformId = inject(PLATFORM_ID);
  readonly service = inject(DashboardService);

  categoryPieChartLabel = signal<string[]>([]);
  categoryPieChartData = signal<any>([]);

  voucherFeesData = signal<any>([]);
  voucherExpenseData = signal<any>([]);

  voucherCategory = signal<any>([]);

  voucherDashboard = signal<any>(undefined);

  constructor() {
    this.service.searchCategoryVoucherMonthly(2024, 'AUGUST').subscribe({
      next: result => {
        this.categoryPieChartLabel.set(result.map((value: any) => value.categoryName));
        this.categoryPieChartData.set(result.map((value: any) => value.vouchers));
        console.log(this.categoryPieChartData());
        console.log(this.categoryPieChartLabel());
      }
    });

    this.service.searchCategoryVoucherYearly(2024).subscribe({
      next: result => {
        console.log(result)
      }
    })

    this.service.searchVoucherMonthly(2024, 'AUGUST').subscribe({
      next: result => {
        this.voucherCategory.set(result.map((value: any) => value.label))
        this.voucherFeesData.set(result.map((value: any) => value.fees))
        this.voucherExpenseData.set(result.map((value: any) => value.expenses))
        console.log(result)
      }
    })
  }

  ngAfterViewInit(): void {

    console.log(this.voucherDashboard());

    if(!this.voucherDashboard()) {
      this.voucherDashboard.set(this.buildVoucherDashboard());
    }
  }

  ngOnInit(): void {

      if(isPlatformBrowser(this.platformId)) {

        if(!this.voucherDashboard()) {
          this.voucherDashboard.set(this.buildVoucherDashboard())
        }

        buildChart('#hs-single-area', (mode: any) => ({
          chart: {
            height: 320,
            type: 'area',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          series: [
            {
              name: 'Visitors',
              data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70]
            }
          ],
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight',
            width: 2
          },
          grid: {
            strokeDashArray: 2
          },
          fill: {
            type: 'gradient',
            gradient: {
              type: 'vertical',
              shadeIntensity: 1,
              opacityFrom: 0.1,
              opacityTo: 0.8
            }
          },
          xaxis: {
            type: 'category',
            tickPlacement: 'on',
            categories: [
              '25 January 2023',
              '26 January 2023',
              '27 January 2023',
              '28 January 2023',
              '29 January 2023',
              '30 January 2023',
              '31 January 2023',
              '1 February 2023',
              '2 February 2023',
              '3 February 2023',
              '4 February 2023',
              '5 February 2023'
            ],
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              stroke: {
                dashArray: 0
              },
              dropShadow: {
                show: false
              }
            },
            tooltip: {
              enabled: false
            },
            labels: {
              style: {
                colors: '#9ca3af',
                fontSize: '13px',
                fontFamily: 'Inter, ui-sans-serif',
                fontWeight: 400
              },
              formatter: (title: any) => {
                let t = title;
  
                if (t) {
                  const newT = t.split(' ');
                  t = `${newT[0]} ${newT[1].slice(0, 3)}`;
                }
  
                return t;
              }
            }
          },
          yaxis: {
            labels: {
              align: 'left',
              minWidth: 0,
              maxWidth: 140,
              style: {
                colors: '#9ca3af',
                fontSize: '13px',
                fontFamily: 'Inter, ui-sans-serif',
                fontWeight: 400
              },
              formatter: (value: number) => value >= 1000 ? `${value / 1000}k` : value
            }
          },
          tooltip: {
            x: {
              format: 'MMMM yyyy'
            },
            y: {
              formatter: (value: number) => `${value >= 1000 ? `${value / 1000}k` : value}`
            },
            custom: function (props: { ctx?: any; dataPointIndex?: any; }) {
              const { categories } = props.ctx.opts.xaxis;
              const { dataPointIndex } = props;
              const title = categories[dataPointIndex].split(' ');
              const newTitle = `${title[0]} ${title[1]}`;
  
              return buildTooltip(props, {
                title: newTitle,
                mode,
                valuePrefix: '',
                hasTextLabel: true,
                markerExtClasses: '!rounded-sm',
                wrapperExtClasses: 'min-w-28'
              });
            }
          },
          responsive: [{
            breakpoint: 568,
            options: {
              chart: {
                height: 300
              },
              labels: {
                style: {
                  colors: '#9ca3af',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400
                },
                offsetX: -2,
                formatter: (title: string | any[]) => title.slice(0, 3)
              },
              yaxis: {
                labels: {
                  align: 'left',
                  minWidth: 0,
                  maxWidth: 140,
                  style: {
                    colors: '#9ca3af',
                    fontSize: '11px',
                    fontFamily: 'Inter, ui-sans-serif',
                    fontWeight: 400
                  },
                  formatter: (value: number) => value >= 1000 ? `${value / 1000}k` : value
                }
              },
            },
          }]
        }), {
          colors: ['#2563eb', '#9333ea'],
          fill: {
            gradient: {
              stops: [0, 90, 100]
            }
          },
          xaxis: {
            labels: {
              style: {
                colors: '#9ca3af'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#9ca3af'
              }
            }
          },
          grid: {
            borderColor: '#e5e7eb'
          }
        }, {
          colors: ['#3b82f6', '#a855f7'],
          fill: {
            gradient: {
              stops: [100, 90, 0]
            }
          },
          xaxis: {
            labels: {
              style: {
                colors: '#a3a3a3',
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#a3a3a3'
              }
            }
          },
          grid: {
            borderColor: '#404040'
          }
      
        
        
        });       
      
  
        buildChart('#hs-pie-chart', () => ({
          chart: {
            width: 400,
            height: 320,
            type: 'pie',
            zoom: {
              enabled: false
            }
          },
          series: this.categoryPieChartData(),
          labels: this.categoryPieChartLabel(),
          title: {
            show: false
          },
          dataLabels: {
            style: {
              fontSize: '20px',
              fontFamily: 'Inter, ui-sans-serif',
              fontWeight: '400',
              colors: ['#fff', '#fff', '#1f2937']
            },
            dropShadow: {
              enabled: false
            },
            formatter: (value: number) => `${value.toFixed(1)} %`
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -15
              }
            }
          },
          legend: {
            show: false
          },
          stroke: {
            width: 4
          },
          grid: {
            padding: {
              top: -10,
              bottom: -14,
              left: -9,
              right: -9
            }
          },
          tooltip: {
            enabled: false
          },
          states: {
            hover: {
              filter: {
                type: 'none'
              }
            }
          }
        }), {
          colors: ['#3b82f6', '#22d3ee', '#e5e7eb'],
          stroke: {
            colors: ['rgb(255, 255, 255)']
          }
        }, {
          colors: ['#3b82f6', '#22d3ee', '#404040'],
          stroke: {
            colors: ['rgb(38, 38, 38)']
          }
        });
      }

      buildChart('#hs-doughnut-chart', (mode: string) => ({
        chart: {
          height: 300,
          width: 400,
          type: 'donut',
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '76%'
            }
          }
        },
        series: [47, 23, 30],
        labels: ['Tailwind CSS', 'Preline UI', 'Others'],
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5
        },
        grid: {
          padding: {
            top: -12,
            bottom: -11,
            left: -12,
            right: -12
          }
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          }
        },
        tooltip: {
          enabled: true,
          custom: function (props: any) {
            return buildTooltipForDonut(
              props,
              mode === 'dark' ? ['#fff', '#fff', '#000'] : ['#fff', '#fff', '#000']
            );
          }
        }
      }), {
        colors: ['#3b82f6', '#22d3ee', '#e5e7eb'],
        stroke: {
          colors: ['rgb(255, 255, 255)']
        }
      }, {
        colors: ['#3b82f6', '#22d3ee', '#404040'],
        stroke: {
          colors: ['rgb(38, 38, 38)']
        }
      });
    }




    buildVoucherDashboard() {

      

      return buildChart('#voucher-dashboard', (mode: any) => ({
          chart: {
            height: 300,
            type: 'area',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          series: [
            {
              name: 'Fees',
              data: this.voucherFeesData()
            },
            {
              name: 'Expenses',
              data: this.voucherExpenseData()
            }
          ],
          legend: {
            show: true
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'straight',
            width: 2
          },
          grid: {
            strokeDashArray: 2
          },
          fill: {
            type: 'gradient',
            gradient: {
              type: 'vertical',
              shadeIntensity: 1,
              opacityFrom: 0.1,
              opacityTo: 0.8
            }
          },
          xaxis: {
            type: 'category',
            tickPlacement: 'on',
            categories: this.voucherCategory(),
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              stroke: {
                dashArray: 0
              },
              dropShadow: {
                show: false
              }
            },
            tooltip: {
              enabled: false
            },
            labels: {
              style: {
                colors: '#9ca3af',
                fontSize: '13px',
                fontFamily: 'Inter, ui-sans-serif',
                fontWeight: 400
              },
              formatter: (title: any) => {
                let t = title;

                return t;
              }
            }
          },
          yaxis: {
            labels: {
              align: 'left',
              minWidth: 0,
              maxWidth: 140,
              style: {
                colors: '#9ca3af',
                fontSize: '13px',
                fontFamily: 'Inter, ui-sans-serif',
                fontWeight: 400
              },
              formatter: (value: number) => value >= 1000 ? `${value / 1000}k` : value
            }
          },
          tooltip: {
            x: {
              format: 'MMMM yyyy'
            },
            y: {
              formatter: (value: number) => `$${value >= 1000 ? `${value / 1000}k` : value}`
            },
            custom: function (props: { ctx?: any; dataPointIndex?: any; }) {
              const { categories } = props.ctx.opts.xaxis;
              const { dataPointIndex } = props;
              const title = categories[dataPointIndex].split(' ');
              const newTitle = `${title[0]} ${title[1]}`;

              return buildTooltip(props, {
                title: newTitle,
                mode,
                hasTextLabel: true,
                wrapperExtClasses: 'min-w-28',
                labelDivider: ':',
                labelExtClasses: 'ms-2'
              });
            }
          },
          responsive: [{
            breakpoint: 568,
            options: {
              chart: {
                height: 300
              },
              labels: {
                style: {
                  colors: '#9ca3af',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400
                },
                offsetX: -2,
                formatter: (title: string | any[]) => title.slice(0, 3)
              },
              yaxis: {
                labels: {
                  align: 'left',
                  minWidth: 0,
                  maxWidth: 140,
                  style: {
                    colors: '#9ca3af',
                    fontSize: '11px',
                    fontFamily: 'Inter, ui-sans-serif',
                    fontWeight: 400
                  },
                  formatter: (value: number) => value >= 1000 ? `${value / 1000}k` : value
                }
              },
            },
          }]
        }), {
          colors: ['#2563eb', '#9333ea'],
          fill: {
            gradient: {
              stops: [0, 90, 100]
            }
          },
          xaxis: {
            labels: {
              style: {
                colors: '#9ca3af'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#9ca3af'
              }
            }
          },
          grid: {
            borderColor: '#e5e7eb'
          }
        }, {
          colors: ['#3b82f6', '#a855f7'],
          fill: {
            gradient: {
              stops: [100, 90, 0]
            }
          },
          xaxis: {
            labels: {
              style: {
                colors: '#a3a3a3',
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#a3a3a3'
              }
            }
          },
          grid: {
            borderColor: '#404040'
          }
    });
    }
  

}


