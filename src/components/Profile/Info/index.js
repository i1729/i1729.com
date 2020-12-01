import React, { useState, useEffect } from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from "react-router-dom"
import Web3 from 'web3';

export default () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [ensAddress, setEnsAddress] = useState(null);
  const [ensName, setEnsName] = useState(null);
  const [ensContentHash, setContentHash] = useState(null);

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
      alert("Please install an Ethereum-compatible browser or extension like MetaMask to use 1729!");
    } else {
      const web3 = window.web3;
      if (web3.utils.isAddress(id)) { 
        setEnsAddress(id);
        setEnsName("Ethereum Address");
        setLoading(false);
      } else {
        const tempEnsName = id + ".eth";
        setEnsName(tempEnsName);
        web3.eth.ens.getAddress(tempEnsName).then((address) => {
          if (address) {
            setEnsAddress(address); 
            setLoading(false);
          }
        });
        web3.eth.ens.getContenthash(tempEnsName).then((hash) => {
          if (hash) {
            setEnsContentHash(hash); 
            setLoading(false);
          }
        });
      }
    }
  }, []);

  return (
    <>
      <h1>1729</h1>
      <p>
        This is <a href="/">1729</a> cryptoprofile. It resolves from <a href="https://ens.domains">ENS</a>.
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
                <h3>{ensName}</h3>
                { ensAddress ? <p>{ensAddress}</p> : null}
                { ensContentHash ? <p>{ensContentHash}</p> : null}
              </Col>
            </Row>
          </Container>
        }
    </>
  )
}
