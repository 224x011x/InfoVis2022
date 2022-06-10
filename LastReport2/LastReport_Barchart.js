class BarChart{
constructor(config, data) {
    this.config = {
        parent: config.parent,
        width: config.width || 256,
        height: config.height || 256,
        margin: config.margin || {top:10, right:10, bottom:50, left:60},
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
    
    self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right ;
    self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom ;
    
    self.xscale = d3.scaleLinear()
        .range([0, self.inner_width]);
    
    self.yscale = d3.scaleBand()
        .range([0, self.inner_height])
    
    self.xaxis = d3.axisBottom( self.xscale )
    
    self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`)
    
    self.yaxis = d3.axisLeft( self.yscale )
        .tickSizeOuter(0);
    
    self.yaxis_group = self.chart.append('g')
        .attr('transform', `translate( ${self.inner_width}),0`);
    
    const xlabel_space = 40;
    const BarData = document.getElementById('BarValue');
    const num = BarData.selectedIndex;
    const str = BarData.options[num].value;
    
    self.svg.append('text')
        .style('font-size', '12px')
        .attr('x', self.config.margin.left + self.inner_width / 2)
        .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
        .attr('text-anchor', 'middle')
        .text(   );
    
    const ylabel_space = 45;
    self.svg.append('text')
        .style('font-size', '12px')
        .attr('transform', `rotate(-90)`)
        .attr('y', self.config.margin.left/2 - ylabel_space)
        .attr('x', -self.config.margin.top - self.inner_height / 2)
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .text( '' );
}

update() {
    let self = this;
    let padding = 10;
    let height = 20;
    const BarData = document.getElementById('BarValue');
    const num = BarData.selectedIndex;
    const str = BarData.options[num].value;

    //データの追加
    if (num == 1){
        self.bvalue = d => d.ac    ;
    }else if (num == 2){
        self.bvalue = d => d.hel    ;
    }else if(num == 3){
        self.bvalue = d => d.tan    ;
    }else if(num == 4){
        self.bvalue = d => d.APC    ;
    }else if(num == 5){
        self.bvalue = d => d.fa   ;
    }else if(num == 6){
        self.bvalue = d => d.MRL   ;
    }else if(num == 7){
        self.bvalue = d => d.ma   ;
    }else if(num == 8){
        self.bvalue = d => d.ft   ;
    }else if(num == 9){
        self.bvalue = d => d.dr   ;
    }else if(num == 10){
        self.bvalue = d => d.ns  ;
    }else if(num == 11){
        self.bvalue = d => d.aa   ;
    }else if(num == 12){
        self.bvalue = d => d.se   ;
    }else if(num == 13){
        self.bvalue = d => d.mSs  ;
    }else if(num == 14){
        self.bvalue = d => d.vft  ;
    }else if(num == 15){
        self.bvalue = d => d.cm ;
    }else{
        self.bvalue = d => d.hum;
    }

    const xmin = d3.min( self.data, self.bvalue );
    const xmax = d3.max( self.data, self.bvalue );
    self.xscale.domain( [0, xmax*1.1] );
    const ymin = d3.min( self.data, d => d.y );
    const ymax = d3.max( self.data, d => d.y );
    
    self.yscale.domain(self.data.map(d => d.date)).paddingInner(0.1);
    
    self.chart.selectAll("rect")
        .data(self.data)
        .join("rect")
        .transition().duration(1000)
        .attr("x", 0)
        .attr("y", d => self.yscale(d.date))
        .attr("width", d => self.xscale(self.bvalue(d)))
        .attr("height", self.yscale.bandwidth())
        .attr('fill', d => d.color || 'steelblue');

    self.chart.selectAll("rect")
        .on('mouseover', (e,d) => {
            d3.select('#tooltip')
            .style('opacity', 1)
            .html(`<div class="tooltip-label">${d.date}</div>(${self.bvalue(d)})`);
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
        })
        .on('click',(e,d) =>{
            d3.select(d.i)
            const SelectedColor = document.getElementById('SelectColor');
            const num = SelectedColor.selectedIndex;
            const str = SelectedColor.options[num].value;
            if(d.color == 'steelblue'){
            d.color = str
            this.update()
            }else{
            d.color = 'steelblue'
            this.update()
            }

        });
    self.render();
}

render() {
    let self = this;
    self.xaxis_group
        .call( self.xaxis );
    self.yaxis_group
        .call( self.yaxis );
    }
}
