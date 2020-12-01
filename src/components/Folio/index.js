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
  const [pageId, setPageId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.i1729.com/sheets/${pageId}`)
    .then(res => {
      setContent(res.data);
      setLoading(false);
    })
    .catch(error  => {
      console.log(error);
    });
  }, [pageId]);

  const Folio = ({ content }) => {

    return content.map(item => {
      let url;
      if (!item.Link || item.Link == "") {
        url = null;
      } else {
        url = item.Link;
      }

      let title = item.Title ? item.Title  : "";
      let description = item.Description ? truncate(item.Description)  : "";
      let creators = item.Creators ? item.Creators  : "";
      let year = item.Year ? item.Year  : "";
      let years = item['Year(s)'] ? item['Year(s)']  : "";
      let tags = item.Tags ? item.Tags : "";

      return (
        <Col className="content" sm={3}>
          { url ? 
            <a href={url}>
{/*
              <div className="content-image">
                <img src="https://1729.com/favicon.ico" />
              </div>
*/}
              <div className="content-title">
                <p>{title}</p>
                <p>{creators}</p>
                <p>{year}{years}</p>
                <p>{description}</p>
                <p>{tags}</p>
              </div>
            </a>
          : 
            <>
{/*
              <div className="content-image">
                <img src="https://1729.com/favicon.ico" />
              </div>
*/}
              <div className="content-title">
                <p>{title}</p>
                <p>{creators}</p>
                <p>{year}{years}</p>
                <p>{description}</p>
                <p>{tags}</p>
              </div>
            </>
          }
        </Col>
      )
    }); 

  }

  return (
    <>
      <h1>1729 Folio</h1>
      <p>This is the <a href="/">1729</a> folio.</p>
      <p>
        <a onClick={() => setPageId(0)}>Movies</a>,
        <a onClick={() => setPageId(591081063)}> Books</a>,
        <a onClick={() => setPageId(1032384874)}> Shows</a>,
        <a onClick={() => setPageId(817074681)}> Economics</a>,
        <a onClick={() => setPageId(1290940784)}> YouTube</a>,
        <a onClick={() => setPageId(761551777)}> Articles</a>,
        <a onClick={() => setPageId(722574441)}> Heros</a>,
        <a onClick={() => setPageId(2117214079)}> Podcasts</a>,
        <a onClick={() => setPageId(21040091)}> Science</a>,
        <a onClick={() => setPageId(1963291594)}> TikToks</a>
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
            <Folio content={content} />
          </Row>
        </Container>
      }
    </>
  )
}
