import React, { Component } from 'react';
import { styled } from 'styled-components';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles({
    root: {
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
        "& .heading": {
            color: "blue",
            margin: 0,
            marginBottom: "10px"
        },
        "& .chip-wrapper": {
            marginTop: "20px",
            display: "flex",
            gridGap: "10px"
        }
    },
});

const Repo = ({ props }) => {
    const classes = useStyles();
    console.log(props)
    return (
        <Grid xs={5} className={classes.root}>
            <h1 className="heading">{props.name}</h1>
            {props.language && <div>Language: {props.language}</div>}
            {props.html_url && <div>HTML_Url: <a href={props.html_url} target="_blank" >{props.html_url}</a></div>}
            {/* {created_at && <div>Created At: {created_at}</div>} */}
            {props.description && <div><b>Description:</b> {props.description}</div>}
            <div className="chip-wrapper">
                <Chip label={props.default_branch} color="primary" />
                <Chip label={props.created_at} color="primary" />
                <Chip label={props.visibility} color="primary" />
            </div>

        </Grid>
    )
}
export default Repo;
