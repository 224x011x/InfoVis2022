d3.csv("https://224x011x.github.io/InfoVis2022/W08/w08_Task03.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value;});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            radius: 128
        };

        const piechart = new PieChart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });


class PieChart{
    constructor(config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            radius: config.radius || 128
        }
        this.data = data;
        this.init();
    }
    
    init() {
        let self = this;
        
        self.svg = d3.select( self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height)
        .append('g')
        .attr('transform',`translate(${self.config.width/2},${self.config.height/2})`);

    self.pie = d3.pie()
        .value(d => d.value );
        
    self.arc = d3.arc()
        .innerRadius(self.config.radius/2)
        .outerRadius(self.config.radius);
        
        self.color = d3.scaleOrdinal()
            .range(["red","green","blue","brown","orange"]);

}
    update() {
        let self = this;
        self.render();
    }
    
    render() {
        let self = this;
        
        self.svg.selectAll('pie')
        .data(self.pie(self.data))
        .enter()
        .append('path')
        .attr('d', self.arc )
        .attr('fill',d => self.color(d.index))
        .attr('stroke', 'white')
        .style('stroke-width','2px');
        
        self.svg.selectAll('pie')
            .data(self.pie(self.data))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${self.arc.centroid(d)})`)
            .style("text-anchor", "middle")
            .style("font-size",20)
            .text(d => d.data.label );
    }
}
