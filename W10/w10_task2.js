d3.csv("https://224x011x.github.io/InfoVis2022/W10/w10_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:40, left:55}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class  ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 1024,
            height: config.height || 1024,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right ;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom ;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height,0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate( ${self.inner_width}),0`);
        
        self.Title = self.chart.append('g')
        .append("text")
        .attr("x",70)
        .attr("y",-5)
        .text("Task2");
        
        self.X = self.chart.append('g')
            .append("text")
            .attr("x",70)
            .attr("y",220)
            .text("X-Axis");
        
                  
        self.Y = self.chart.append('g')
            .append("text")
            .attr("x",-120)
            .attr("y",-30)
            .attr('transform','rotate(-90)')
            .text("Y-Axis");
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [0, ymax] );

        self.render();
    }

    render() {
        let self = this;

        let circles = self.chart.selectAll("circle")
            .data(self.data)
            .join("circle")
                  
        circles
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );
        
            circles
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                        .style('left', (e.pageX + padding) + 'px')
                        .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                    .style('opacity', 0);
            });

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}
