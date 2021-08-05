import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './Widgets.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets () {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon/>
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className='widgets'>
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon/>
            </div>
            {newsArticle("Javascript", "Tops News - React is top trending JS framework")}
            {newsArticle("Olympics update", "Tops News - PV Sindhu won bronze")}
            {newsArticle("Covid19 news", "Tops News - India crosses 5 billion vaccinations")}
            {newsArticle("Weather updates", "Tops News - Maharashtra records highest rainfall")}
            {newsArticle("Healthy tips", "Tops News - Daily yoga helps to increase your immune system")}
        </div>
    );
}

export default Widgets
