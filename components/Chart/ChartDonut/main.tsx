import React, { useLayoutEffect } from "react";
import styles from './main.module.css'

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

//chart type
import * as am5percent from "@amcharts/amcharts5/percent";

function ChartDonut({chartID, data} : {chartID: string, data: {[key:string]: number}}) {
  //const chart = useRef(null);
  useLayoutEffect(() => {
    //var root = am5.Root.new("chartdiv2");
    var root = am5.Root.new(chartID);
    const myTheme = am5.Theme.new(root);
    myTheme.rule("Label").setAll({
        fill: am5.color(0xecedee),
        fontSize: "0.8rem"
    });

    root.setThemes([
        am5themes_Animated.new(root),
        myTheme
      ]);
      
      var chart = root.container.children.push( 
        am5percent.PieChart.new(root, {
          layout: root.horizontalLayout
        }) 
      );
      
      // Create series
      var series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "category"
        })
      );

      const data2: { value: number, category: string }[] = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const category = key;
          const value = data[key];
          const transformedItem = { value, category };
          data2.push(transformedItem);
        }
      }


      series.data.setAll(data2);
      series.labels.template.set("forceHidden", true);
      series.ticks.template.set("forceHidden", true);
      
      // Add legend
      var legend = chart.children.push(am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
        height: am5.percent(80),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical"
        })
      }));
      
      legend.data.setAll(series.dataItems);
    root?._logo?.dispose();

    series.appear(1000, 100);
  }, [chartID]);

  return <div className={styles.main} id={chartID}></div>;
}
export default ChartDonut;
