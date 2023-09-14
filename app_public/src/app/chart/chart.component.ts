import Web3 from 'web3';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import myContractDef from "../../../../app_dapp/build/contracts/BuyBook.json";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  contract: any;
  private provider = {
    server: "sensei.lavbic.net",
    port: 8545,
  };

  constructor(private router: Router){}

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  allBooksInEthereum: any = {
    labels: [
      'Harry Potter',
      'Lord of the rings',
      'Land of Big Numbers',
      'The Hunger Games',
      'Game of Thrones',
    ],
    dataset: {
      data: [65, 59, 80, 81, 56],
      label: 'Total amount of sales revenue in ETH'
    }
  }
  private labelsTest = [
    'Harry Potter',
    'Lord of the rings',
    'Land of Big Numbers',
    'The Hunger Games',
    'Game of Thrones',
  ];

  private datasetTest = {
    data: [65, 59, 80, 81, 56],
    label: 'Total amount of sales revenue in ETH',
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.allBooksInEthereum.labels,
    datasets: [this.allBooksInEthereum.dataset],
  };

  // // events
  // public chartClicked(e: any): void {
  //   if (e.active.length > 0) {
  //     const index = e.active[0].index;
  //     let url = "books/bookDetails/" + index
  //     this.router.navigate([url])
  //   }
  // }

  async loadData() {
    let allBooksInBlockchain = await this.contract.getBooks();
    for (let i = 0; i < allBooksInBlockchain.length; i++) {
      this.allBooksInEthereum.labels.push(allBooksInBlockchain[i].title);
      this.allBooksInEthereum.dataset.data.push(allBooksInBlockchain[i].paidFor);
    }
    if (this.allBooksInEthereum.labels.length > 1) {
      this.allBooksInEthereum.sort((a: any, b: any) => parseFloat(a.dataset.data) - parseFloat(b.dataset.data));
      this.allBooksInEthereum = this.allBooksInEthereum.slice(0, 5);
    } else if (this.allBooksInEthereum.labels.length == 0) {
      this.allBooksInEthereum.labels = this.labelsTest;
      this.allBooksInEthereum.dataset = this.datasetTest;
    }

  }

  async connectBlockchain() {
      let TruffleContract = require("truffle-contract");
      let BuyBook = await TruffleContract(myContractDef);
      BuyBook.setProvider(new Web3.providers.WebsocketProvider(
        "ws://" + this.provider.server + ":" + this.provider.port
      ));

      this.contract = await BuyBook.deployed();
    (await this.contract.BuyingEndEvent()).on("data", async () => {
      await this.loadData();
    });
  }

  async ngOnInit() {
    // await this.connectBlockchain();
    // await this.loadData();
    // if (this.allBooksInEthereum.labels.length == 0) {
    //   this.allBooksInEthereum.labels = this.labelsTest;
    //   this.allBooksInEthereum.dataset = this.datasetTest;
    // }
    // this.barChartData.labels = this.allBooksInEthereum.labels;
    // this.barChartData.datasets = [this.allBooksInEthereum.dataset];
  }
}
