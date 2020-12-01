import React, { useState, useEffect } from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import { Container, Row, Col } from 'react-grid-system';
import Web3 from 'web3';

export default () => {
  const [loading, setLoading] = useState(true);
  const [ethAddress, setEthAddress] = useState(null);

  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!ethEnabled()) {
      alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
    } else {
      const web3 = window.web3;
      window.ethereum.request({ method: 'eth_accounts' })
      .then(account => {
        setEthAddress(account); 
        setLoading(false);
      });
      ethereum.on('accountsChanged', function (accounts) {
        setEthAddress(accounts[0]); 
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <h1>1729 Earn</h1>
      <p>
        This is <a href="/">1729</a> Earn where you can access paid tasks.
      </p>
        {loading ?
              <BounceLoader
                css={"display: inline-block"}
                size={50}
                color={"#a00"}
                loading={loading}
              />
        :
          <Container>
            <Row style={{ justifyContent: "center" }}>
              <Col className="content" sm={12}>
                { ethAddress ? <h3>{ethAddress}</h3> : null}
                <p>This would display paid tasks depending on your credentials.</p>
              </Col>
            </Row>
          </Container>
        }
    </>
  )
}
