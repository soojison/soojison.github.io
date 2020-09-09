import React from "react";
import Layout from "../containers/Layout";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import ReactMarkdown from "react-markdown";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Document, Page } from "react-pdf/dist/esm/entry.parcel";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      content: {},
      numPages: null,
      pageNumber: 1,
      loaded: false,
      errored: false,
    };
  }

  handle = (promise) => {
    return promise
      .then((data) => [data, undefined])
      .catch((error) => Promise.resolve([undefined, error]));
  };

  // TODO: convert this to async/await
  // TODO: enable markdown styling in text from contentful
  async componentDidMount() {
    const uid = this.props.match.params.url;

    const contentful = require("contentful");
    const client = contentful.createClient({
      space: `${process.env.CONTENTFUL_SPACE_ID}`,
      accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    });

    const [response, error] = await this.handle(
      client.getEntries({
        content_type: "workDetail",
        "fields.uid[match]": uid,
      })
    );

    if (error) {
      this.setState({ loaded: true, errored: true });
    } else {
      const fields = response.items[0].fields;
      this.setState({
        content: fields,
        loaded: true,
        errored: false,
      });
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  previousPage = () => {
    this.setState((prevState) => ({
      ...prevState,
      pageNumber: prevState.pageNumber - 1,
    }));
  };

  nextPage = () => {
    this.setState((prevState) => ({
      ...prevState,
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { content, loaded, errored, pageNumber, numPages } = this.state;
    console.log(content);
    if (!loaded) {
      return (
        <Layout>
          <div className="content">
            <p>Nothing written yet!</p>
          </div>
        </Layout>
      );
    }
    const images = content.photos
      ? content.photos.map((x) => ({
          original: x.fields.file.url,
          thumbnail: x.fields.file.url,
        }))
      : [];
    const poster = content.poster ? content.poster.fields.file.url : "";
    const pdf = content.brochure ? content.brochure.fields.file.url : "";
    const pdfName = content.brochure ? content.brochure.fields.title : "";
    return (
      <Layout>
        <div className="content">
          <h1>{content.title}</h1>
          <img src={poster} className="posterImg" />
          <h3>{content.capacity}</h3>
          <h4>{content.toolsUsed}</h4>
          <ReactMarkdown source={content.desc} escapeHtml={false} />
          <h1>Media</h1>
          <ImageGallery items={images} />
          {content.brochure && (
            <>
              <h1>{pdfName}</h1>
              <Document file={pdf} onLoadSuccess={this.onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <div>
                <p>
                  Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                  {numPages || "--"}
                </p>

                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={() => this.previousPage()}
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={() => this.nextPage()}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </Layout>
    );
  }
}

export default Details;
