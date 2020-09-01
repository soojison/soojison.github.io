import React from "react";
import Layout from "../containers/Layout";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import ReactMarkdown from "react-markdown";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      content: {},
    };
  }

  // TODO: convert this to async/await
  // TODO: enable markdown styling in text from contentful
  componentDidMount() {
    const uid = this.props.match.params.url;

    const contentful = require("contentful");
    const client = contentful.createClient({
      space: `${process.env.CONTENTFUL_SPACE_ID}`,
      accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    });

    client
      .getEntries({ content_type: "workDetail", "fields.uid[match]": uid })
      .then((response) => {
        if (response.items.length === 1) {
          // then we good
          this.setState({ content: response.items[0].fields });
        }
      })
      .catch(console.error);
  }

  render() {
    const { content } = this.state;
    console.log(content);
    return (
      <Layout>
        <div className="content">
          {isEmpty(content) && <p>Nothing written yet!</p>}
          {!isEmpty(content) && (
            <div>
              <img src={content.header.fields.file.url} className="headerImg" />
              <h1>{content.title}</h1>
              <h3>{content.capacity}</h3>
              <img src={content.poster.fields.file.url} className="posterImg" />
              <ReactMarkdown source={content.desc} />
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default Details;
