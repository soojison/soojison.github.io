import React, { useState, useEffect } from "react";
import Layout from "../containers/Layout";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import ReactMarkdown from "react-markdown";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Document, Page } from "react-pdf/dist/esm/entry.parcel";
import { useQuery } from "react-query";

const Details = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const uid = props.match.params.url;

  const contentful = require("contentful");
  const client = contentful.createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  });

  const { isLoading, error, data } = useQuery(uid, () =>
    client.getEntries({
      content_type: "workDetail",
      "fields.uid[match]": uid,
    })
  );

  let body;
  if (isLoading) body = "Loading...";

  if (error) body = "An error has occurred: " + error.message;

  if (!isLoading & !error) {
    const content = data.items[0].fields;
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };

    const images = content.photos
      ? content.photos.map((x) => ({
          original: x.fields.file.url,
          thumbnail: x.fields.file.url,
        }))
      : [];
    const poster = content.poster ? content.poster.fields.file.url : "";
    const pdf = content.brochure ? content.brochure.fields.file.url : "";
    const pdfName = content.brochure ? content.brochure.fields.title : "";
    body = (
      <div className="content">
        <h1>{content.title}</h1>
        <img src={poster} className="posterImg" />
        <h3>{content.capacity}</h3>
        <h4>{content.toolsUsed}</h4>
        <ReactMarkdown source={content.desc} escapeHtml={false} />
        <h1>Media</h1>
        <ImageGallery items={images} />
        {content.brochure && (
          <div className="brochure">
            <h1>{pdfName}</h1>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div>
              <p>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>

              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </button>

              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <Layout>{body}</Layout>;
};

export default Details;
