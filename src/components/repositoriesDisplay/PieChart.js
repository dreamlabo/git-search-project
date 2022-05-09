import React from 'react';
import './repositoriesDisplay_styles.css';
import { RadialGauge, StackedRadialGaugeSeries, StackedRadialGaugeLabel } from 'reaviz';

const PieChart = ({percent, language, percentDisplay}) => {
    const dataValues = [{ key: language, data: percent }]
  return (
    <div >
        <p className='repository__inner-container__values'>{language }</p> 
        <RadialGauge
            data={dataValues}
            minValue={0}
            maxValue={100}
            height={125}
            width={125}
            series={<StackedRadialGaugeSeries 
                    colorScheme={'#A213BA'} 
            label={<StackedRadialGaugeLabel 
                label={percentDisplay} />} 
            />}
            />
    </div>
  )
}

export default PieChart