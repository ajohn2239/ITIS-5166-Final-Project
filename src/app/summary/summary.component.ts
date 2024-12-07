import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import * as d3 from 'd3';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @ViewChild('chart1Svg', { static: true }) chart1Svg!: ElementRef;
  chart1Data: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getChart1Data().subscribe((data) => {
      this.chart1Data = data.chart1;
      this.createPieChart();
    });

    // Ensure responsiveness
    d3.select(window).on('resize', this.resizeChart.bind(this));
  }

  createPieChart(): void {
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(this.chart1Svg.nativeElement)
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeSet3);

    const pie = d3.pie().value((d: any) => d['Strongly Agree']);
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    const arcs = g
      .selectAll('.arc')
      .data(pie(this.chart1Data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add paths with animation
    arcs.append('path')
      .attr('d', (d: any) => arc(d)) // Start with zero-size arcs
      .style('fill', (d: any) => color(d.data.label))

    // Add text labels
    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .text((d: any) => d.data.label)
      .style('text-anchor', 'middle')
      .style('font-size', '12px');

  // Add a legend
  const legend = svg
  .append('g')
  .attr('transform', `translate(${width - 200}, 20)`);

const legendItems = legend
  .selectAll('.legend-item')
  .data(pie(this.chart1Data))
  .enter()
  .append('g')
  .attr('class', 'legend-item')
  .attr('transform', (d, i) => `translate(0, ${i * 20})`);

legendItems
  .append('rect')
  .attr('x', 0)
  .attr('width', 18)
  .attr('height', 18)
  .style('fill', (d: any) => color(d.data.label));

legendItems
  .append('text')
  .attr('x', 20)
  .attr('y', 9)
  .attr('dy', '.35em')
  .text((d: any) => `${d.data.label}: ${d.data['Strongly Agree']}`)
  .style('font-size', '12px');
  }

  resizeChart(): void {
    const svgElement = this.chart1Svg.nativeElement;
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
