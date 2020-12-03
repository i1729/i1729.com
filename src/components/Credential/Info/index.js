import React, { useState, useEffect, useRef } from "react"
import BounceLoader from "react-spinners/BounceLoader"
import { useParams } from "react-router-dom"
import axios from "axios";

export default () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contributor1729, setContributor1729] = useState(null);
  const [user, setUser] = useState({
    id: id
  });

  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

  const sign1729 = (address) => {
    setLoading(true);
    axios.get('https://api.i1729.com/sign1729/' + address)
    .then(res => {
      setLoading(false);
      setContributor1729(true);
    })
    .catch(error  => {
      console.log(error);
      setLoading(false);
    });
  }

  useEffect(() => {
    axios.get('https://api.i1729.com/user/' + id)
    .then(res => {
      setUser(res.data);
      if (user.contributor1729 == true) {
        if (!ethEnabled()) {
          alert("Please install an Ethereum-compatible browser or extension like MetaMask to get your 1729 cryptocredential!");
        } else {
          const web3 = window.web3;
          window.ethereum.request({ method: 'eth_accounts' })
          .then(address => {
            sign1729(address); 
            setLoading(false);
          });
          ethereum.on('accountsChanged', function (accounts) {
            sign1729(accounts[0]); 
            setLoading(false);
          });
        }
      }
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
          <h1>1729 Contributor Cryptocredential: {contributor1729 ? contributor1729.toString() : "false"}</h1>
        </>
      }
    </>
  )
}
