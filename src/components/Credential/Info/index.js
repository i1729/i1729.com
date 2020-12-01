import React, { useState, useEffect, useRef } from "react"
import BounceLoader from "react-spinners/BounceLoader"
import { useParams } from "react-router-dom"
import axios from "axios";

export default () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: id
  });

  useEffect(() => {
    axios.get('https://api.i1729.com/user/' + id)
    .then(res => {
      setUser(res.data);
      setLoading(false);
    })
    .catch(error  => {
      console.log(error);
    });
  }, []);

  return (
    <>
      {loading ? 
            <BounceLoader
              css={"display: inline-block"}
              size={50}
              color={"#a00"}
              loading={loading}
            />
      : 
        <>
          <h1>Name: {user.screen_name}</h1>
          <h1>Verified: {user.verified.toString()}</h1>
          <h1>Followers: {user.followers_count}</h1>
          <h1>1729 Contributor: {user.contributor1729.toString()}</h1>
        </>
      }
    </>
  )
}
