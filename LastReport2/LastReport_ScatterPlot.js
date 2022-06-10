class ScatterPlot {
    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
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
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );
        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSize(5)
            .tickPadding(5);
        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5)
            .tickSize(5)
            .tickPadding(5);
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
        self.yaxis_group = self.chart.append('g')
             .attr('transform', `translate( ${self.inner_width}),0`);
        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('x', self.config.margin.left + self.inner_width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .attr('text-anchor', 'middle')
            .text(  );
        const ylabel_space = 45;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space -30 )
            .attr('x', -self.config.margin.top - self.inner_height / 2)
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text(  );
}

    update() {
        let self = this;
        /*const HorizontalData = document.getElementById('HorizontalValue');
        const Horizontalnum = HorizontalData.selectedIndex;
        const Horizontalstr = HorizontalData.options[Horizontalnum].value;
        //データの追加
        if (Horizontalnum == 1){
            self.xvalue = d => d.ac    ;
        }else if (Horizontalnum == 2){
            self.xvalue = d => d.hel   ;
        }else if(Horizontalnum == 3){
            self.xvalue = d => d.tan    ;
        }else if(Horizontalnum == 4){
            self.xvalue = d => d.APC   ;
        }else if(Horizontalnum == 5){
            self.xvalue = d => d.fa    ;
        }else if(Horizontalnum == 6){
            self.xvalue = d => d.MRL   ;
        }else if(Horizontalnum == 7){
            self.xvalue = d => d.ma   ;
        }else if(Horizontalnum == 8){
            self.xvalue = d => d.ft   ;
        }else if(Horizontalnum == 9){
            self.xvalue = d => d.dr   ;
        }else if(Horizontalnum == 10){
            self.xvalue = d => d.ns   ;
        }else if(Horizontalnum == 11){
            self.xvalue = d => d.aa  ;
        }else if(Horizontalnum == 12){
            self.xvalue = d => d.se   ;
        }else{
            self.xvalue = d => d.mSs   ;
        }*/
        
        self.xvalue = d => d.x;

        const VerticalData = document.getElementById('VerticalValue');
        const Verticalnum = VerticalData.selectedIndex;
        const Verticalstr = VerticalData.options[Verticalnum].value;
        //データの追加
        if (Verticalnum == 1){
            self.yvalue = d => d.ac   ;
        }else if (Verticalnum == 2){
            self.yvalue = d => d.hel  ;
        }else if(Verticalnum == 3){
            self.yvalue = d => d.tan   ;
        }else if(Verticalnum == 4){
            self.yvalue = d => d.APC  ;
        }else if(Verticalnum == 5){
            self.yvalue = d => d.fa  ;
        }else if(Verticalnum == 6){
            self.yvalue = d => d.MRL   ;
        }else if(Verticalnum == 7){
            self.yvalue = d => d.ma  ;
        }else if(Verticalnum == 8){
            self.yvalue = d => d.ft   ;
        }else if(Verticalnum == 9){
            self.yvalue = d => d.dr  ;
        }else if(Verticalnum == 10){
            self.yvalue = d => d.ns  ;
        }else if(Verticalnum == 11){
            self.yvalue = d => d.aa  ;
        }else if(Verticalnum == 12){
            self.yvalue = d => d.se   ;
        }else if(Verticalnum == 13){
        self.yvalue = d => d.mSs ;
        }else if(Verticalnum == 14){
            self.yvalue = d => d.vft ;
        }else if(Verticalnum == 15){
            self.yvalue = d => d.cm ;
        }else{
            self.yvalue = d => d.hum ;
        }
        
        const xmin = d3.min( self.data, self.xvalue );
        const xmax = d3.max( self.data, self.xvalue );
        self.xscale.domain( [0, xmax] );
        const ymin = d3.min( self.data, self.yvalue );
        const ymax = d3.max( self.data, self.yvalue );
        self.yscale.domain( [0, ymax] );
        self.render();
}

    render() {
        let self = this;
        let circles = self.chart.selectAll("circle")
            .data(self.data)
            .join('circle');
            
        const circle_color = 'steelblue';
        const circle_radius = 10;
        circles
            .transition().duration(1000)
            .attr("r",d => d.radius || 10 )
            .attr("cx", d => self.xscale( self.xvalue(d) ) )
            .attr("cy", d => self.yscale( self.yvalue(d) ) )
            .attr('fill', d => d.color || 'steelblue');

        circles
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                .style('opacity', 1)
                .html(`<div class="tooltip-label">${d.area}</div>(${self.xvalue(d)}, ${self.yvalue(d)})`);
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
