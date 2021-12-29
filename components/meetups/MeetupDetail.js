import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

function MeetupDetails(props) {
  return (
    <section className={classes.details}>
      <img src={props.image} alt={props.title}></img>
      <h2>{props.title}</h2>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetails;
