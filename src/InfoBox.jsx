import React from 'react';
import "./InfoBox.css";
import {prettyPrintStat} from "./util";
import {Card, CardContent, Typography} from "@material-ui/core"

const InfoBox = ({title, cases, isRed, active, total, ...props}) => {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infobox__cases ${!isRed && "infoBox__cases--green"}`}>{prettyPrintStat(cases)}</h2>
                <Typography className="infobox__total" color="textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
