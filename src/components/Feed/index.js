import React, { useState, useEffect } from 'react'
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { Container, Row, Col } from 'react-grid-system';

function truncate(input) {
   if (input.length > 80) {
      return input.substring(0, 80) + '...';
   }
   return input;
};

export default () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.i1729.com/feed')
    .then(res => {
      setContent(res.data);
      setLoading(false);
    })
    .catch(error  => {
      console.log(error);
    });
  }, []);

  const Feed = ({ content }) => {

    return content.map(item => {
      let url;
      if (!item.url || item.url == "") {
        url = null;
      } else {
        url = item.url;
      }

      let title = item.title ? item.title  : "";
      let description = item.description ? truncate(item.description)  : "";
      let creator = item.creator ? item.creator  : "";
      let created = item.created ? item.created  : "";
      let image = item.image ? item.image  : null; 

      return (
        <Col className="content" sm={3}>
          { url ? 
            <a href={url}>
              { image ?
                <div className="content-image">
                  <img src={image} />
                </div>
              : null }
              <div className="content-title">
                <p>{title}</p>
                <p>{creator}</p>
                <p>{created}</p>
                <p>{description}</p>
              </div>
            </a>
          : 
            <>
              { image ?
                <div className="content-image">
                  <img src={image} />
                </div>
              : null }
              <div className="content-title">
                <p>{title}</p>
                <p>{creator}</p>
                <p>{created}</p>
                <p>{description}</p>
              </div>
            </>
          }
        </Col>
      )
    }); 

  }

  return (
    <>
      <h1>1729 Feed</h1>
      <p>This is the <a href="/">1729</a> feed. You can view the RSS version <a href="https://api.i1729.com/rssfeed">here</a>.</p>
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
            <Feed content={content} />
          </Row>
        </Container>
      }
    </>
  )
}
