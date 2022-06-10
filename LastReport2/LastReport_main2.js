d3.csv("https://224x011x.github.io/InfoVis2022/LastReport2/russia_losses.csv")
    .then( data => {
        data.forEach( (d,i) => {
            d.x = +d.day;
            d.ac = +d.aircraft;
            d.hel = +d.helicopter;
            d.tan = +d.tank;
            d.APC = +d.APC;
            d.fa = +d.fieldartillery;
            d.MRL = +d.MRL;
            d.ma = +d.militaryauto;
            d.ft = +d.fueltank;
            d.dr = +d.drone;
            d.ns = +d.navalship;
            d.aa = +d.antiaircraftwarfare;
            d.se = +d.specialequipment;
            d.mSs = +d.mobileSRBMsystem;
            d.vft = +d.vehiclesandfueltanks;
            d.cm = +d.cruisemissiles;
            d.hum = +d.personnel;
            
            d.index = i;
        });

        const barchart = new BarChart({
                    parent: '#drawing_region_barchart',
                    width: 600,
                    height: 600,
                    margin: {top:10, right:50, bottom:50, left:100},
                    xlabel: 'xlabel',
                    ylabel: 'ylabel',
                    title: "title",
                    }, data);
                
                const scatter_plot = new ScatterPlot( {
                    parent: '#drawing_region_scatterplot',
                    width: 600,
                    height: 600,
                    margin: {top:10, right:10, bottom:50, left:100},
                    xlabel: 'Sepal length [cm]',
                    ylabel: 'Sepal width [cm]',
                    }, data );
                
                
                d3.select('#Decision1')
                .on('click', d => {
                    const BarData = document.getElementById('BarValue');
                    const num = BarData.selectedIndex;
                    const str = BarData.options[num].value;
                    barchart.update()
                    document.getElementById("span1").textContent = str;
                });


                d3.select('#Decision2')
                .on('click', d => {
                    const VerticalData = document.getElementById('VerticalValue');
                    const Verticalnum = VerticalData.selectedIndex;
                    const Verticalstr = VerticalData.options[Verticalnum].value;
                    scatter_plot.update();
                    document.getElementById("span3").textContent = Verticalstr;
                });

                d3.select('#Decision3')
                .on('click', d => {
                    barchart.update();
                    scatter_plot.update();
                });

                d3.select('#Decision4')
                .on('click', d => {
                    data.forEach( (d,i) =>{
                    d.color = 'steelblue'
                });
                    barchart.update()
                    scatter_plot.update();
                });
                
                d3.select('#radius-slider')
                .on('input', function() {
                    data.forEach( (d,i) =>{
                    d.radius = this.value
                });
                    scatter_plot.update();
                    d3.select('#radius-value').text(this.value);
                });


            })
            .catch( error => {
                console.log( error );
            });


