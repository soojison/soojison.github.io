import React from "react";
import Layout from "../containers/Layout";
import { NavLink } from "react-router-dom";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      theatre: [],
    };
  }

  componentDidMount() {
    const contentful = require("contentful");
    const client = contentful.createClient({
      space: `${process.env.CONTENTFUL_SPACE_ID}`,
      accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    });

    client
      .getEntries({ content_type: "page" })
      .then((response) => {
        const items = response.items.map((x) => x.fields);
        this.setState({ theatre: items });
      })
      .catch(console.error);
  }

  render() {
    return (
      <Layout>
        <div className="content">
          <h1>Digital Projects</h1>
          <p>TBD.</p>
          <h1>Theatre Projects</h1>
          {this.state.theatre.map((entry) => (
            <div>
              <NavLink to={`projects/${entry.link}`}>{entry.name}</NavLink>:{" "}
              {entry.desc}
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Projects;
