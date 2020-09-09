import React from "react";
import Layout from "../containers/Layout";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resumes: [],
    };
  }

  componentDidMount() {
    const contentful = require("contentful");
    const client = contentful.createClient({
      space: `${process.env.CONTENTFUL_SPACE_ID}`,
      accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    });

    client
      .getEntries({ content_type: "resume" })
      .then((response) => {
        const items = response.items.map((x) => x.fields.media.fields);
        console.log(items);
        this.setState({ resumes: items });
      })
      .catch(console.error);
  }

  render() {
    return (
      <Layout>
        <div className="content">
          <h1>Hi there,</h1>
          <p>
            Sooji Son is a jack of all trades based in Iowa City. Currently she
            is working as a designer and a full-stack developer at Intuit, and
            before that she studied Computer Science, Theatre and Dance, and
            Linguistics at Grinnell College. Professionally, she enjoys finding
            ways to make websites that are user-friendly. Outside of work, she
            wants to learn more about generative models to create art, 3D
            modeling and sculpting, and other web development tools.
          </p>
          <p>
            You can find her on{" "}
            <a href="https://github.com/soojison" target="_blank">
              Github
            </a>
            , or on other undisclosed places by serendipity.
          </p>

          <h1>Need More?</h1>
          <p>Here are my resumes:</p>
          <ul>
            {this.state.resumes.map((x) => {
              return (
                <li>
                  <a href={x.file.url} target="_blank">
                    {x.description}
                  </a>
                </li>
              );
            })}
          </ul>

          <h1>*</h1>
          <p>
            This site was made with React, TypeScript, Parcel, and Three.js. The
            content is being served from Contentful, and the colorways of the
            page have been inspired from{" "}
            <a
              href="https://en.wikipedia.org/wiki/Space-cadet_keyboard"
              target="_blank"
            >
              Space Cadet
            </a>
            . You can find the iconic Gorton fonts{" "}
            <a
              href="https://github.com/drdnar/GortonDigital/releases"
              target="_blank"
            >
              here
            </a>
            .
          </p>
        </div>
      </Layout>
    );
  }
}

export default About;
