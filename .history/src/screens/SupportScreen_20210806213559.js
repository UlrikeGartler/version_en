import React, { useState } from "react";
import { Button } from "../core-components/Button";
import {  Link} from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";

import {useQuery} from "react-query"

async function fetchImageUrl(ref) {
  const storageRef = firebase.storage().ref(ref);
  const url = await storageRef.getDownloadURL()
  return url
}

function useImageUrl(ref) {
  const {data} = useQuery(
    ref, // key
    () => fetchImageUrl(ref), // fetcher
    {suspense: true} // options
  )
  return data
}

export function SupportScreen(props) {
 

  var storageRef = firebase.storage().ref();

  storageRef
    .child("Bilder/Supportbild/group-2351896_1280.jpg")
    .getDownloadURL()
    .then(function (url) {
      var img = document.getElementById("firstImage");
      img.src = url;
    })
    .catch(function (error) {});

  return (
    <div className="screen">
      <img id="firstImage" alt="landscape" height="120" width="120" />
      <br></br>
      <Link to="/mainCategory">
        <Button id="supportButton" text="Ich brauche Unterstützung"></Button>
      </Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    // buyStrategy: (project) => dispatch(buyStrategy(project)),
  };
};

export default connect(null, mapDispatchToProps)(SupportScreen);