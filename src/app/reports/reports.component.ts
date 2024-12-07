import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart2Svg', { static: true }) chart2Svg!: ElementRef;
  chart2Data: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getChart2Data().subscribe((data) => {
      this.chart2Data = data.chart2;
      this.createPieChart2();
    });

    // Ensure responsiveness
    d3.select(window).on('resize', this.resizeChart.bind(this));
  }
  
  createPieChart2(): void {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    
    const svg = d3.select(this.chart2Svg.nativeElement)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
    const pie = d3.pie()
      .value((d: any) => d.Yes)  // Using 'Yes' for chart2
      .sort(null);  // Keep the data order as is
  
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
    const color = d3.scaleOrdinal(d3.schemePaired);
  
    const pieData = pie(this.chart2Data);
  
    const arcs = svg.selectAll('.arc')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    arcs.append('path')
      .attr('d', (d: any) => arc(d))
      .style('fill', (d: any) => color(d.data.label));
  
    // Optionally, add text labels for each slice
    arcs.append('text')
      .attr('transform', (d: any) => 'translate(' + arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.label);

       // Adding the legend
  const legend = svg.append('g')
  .attr('transform', `translate(${width - 200}, 20)`);

const legendItems = legend
  .selectAll('.legend-item')
  .data(pieData)
  .enter()
  .append('g')
  .attr('class', 'legend-item')
  .attr('transform', (d, i) => `translate(0, ${i * 25})`);

legendItems.append('rect')
  .attr('x', 0)
  .attr('width', 18)
  .attr('height', 18)
  .style('fill', (d: any) => color(d.data.label));

legendItems.append('text')
  .attr('x', 20)
  .attr('y', 9)
  .attr('dy', '.35em')
  .text((d: any) => `${d.data.label}: ${d.data.Yes}`)
  .style('font-size', '12px');
  }

  resizeChart(): void {
    const svgElement = this.chart2Svg.nativeElement;
    const width = svgElement.clientWidth;
    const height = width;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgElement).attr('width', width).attr('height', height);
    const g = svg.select('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    g.selectAll('.arc path').attr('d', (d: any) => arc(d)!);
    g.selectAll('.arc text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`);
  }
}