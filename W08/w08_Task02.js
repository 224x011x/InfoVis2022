d3.csv("https://224x011x.github.io/InfoVis2022/W08/w08_Task02.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:0, bottom:20, left:0}
        };

        const linechart = new LineChart( config, data );
        linechart.update();
    })
    .catch( error => {
        console.log( error );
    });


class LineChart{
    constructor(config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:20, left:0}
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

    self.line = d3.line()
        .x( d => d.x )
        .y( d => d.y );
        
    self.area = d3.area()
        .x( d => d.x )
        .y1( d => d.y )
        .y0(d3.max(self.data, d => d.y ) + 10);
            
    self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right ;
    self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom ;

    self.xscale = d3.scaleLinear()
        .range([0, self.inner_width]);

    self.yscale = d3.scaleBand()
        .range([0, self.inner_height])

    self.xaxis = d3.axisBottom( self.xscale )
        .ticks(5)
        .tickSizeOuter(0);

    self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`)


    self.yaxis = d3.axisLeft( self.yscale )
        .tickSizeOuter(0);

    self.yaxis_group = self.chart.append('g')
        
}
    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain(self.data.map(d => d.label)).paddingInner(0.1);

        self.render();
    }
    
    render() {
        let self = this;
            
        self.svg.append('path')
        .attr('d', self.area(self.data))
        .attr('stroke', 'black')
        .attr('fill', 'blue');
        
     self.svg.selectAll("circle")
        .data(self.data)
        .enter()
        .append("circle")
        .attr("cx", d => d.x )
        .attr("cy", d => d.y )
        .attr("r", d => 5)
        
        self.xaxis_group
            .call( self.xaxis );
        
        self.yaxis_group
            .call( self.yaxis );
    }
}
