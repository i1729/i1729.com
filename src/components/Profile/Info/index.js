import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { setupENS } from "@ensdomains/ui";
import BounceLoader from "react-spinners/BounceLoader";
import { Container, Row, Col } from 'react-grid-system';

export default () => {
  const { id } = useParams();
  const ENS_NAME = id + ".eth";
  const [loading, setLoading] = useState(true);
  const [ensAddress, setEnsAddress] = useState(null);
  const [ensUrl, setEnsUrl] = useState(null);

  useEffect(async () => {
    const { registrar, ens } = await setupENS()

    const owner = await ens.getOwner(ENS_NAME)
    setEnsAddress(owner);
    const url = await ens.getText(ENS_NAME, 'url')
    setEnsUrl(url);

    setLoading(false);
  }, []);

  return (
    <>
      <h1>1729 Cryptoprofile</h1>
      <p>This is the cryptoprofile for <a href="/">1729</a>. It resolves from <a href="https://app.ens.domains/">ENS</a>.</p>
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
              <h3>{ENS_NAME}</h3>
              { ensAddress ? <p>{ensAddress}</p> : null}
              { ensUrl ? <p><a href={ensUrl}>{ensUrl}</a></p> : null }
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}
