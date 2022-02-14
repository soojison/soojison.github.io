import React from "react";
import Layout from "../containers/Layout";
import Card from "../containers/Card";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

const Home = (props) => {
  const contentful = require("contentful");
  const client = contentful.createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  });

  const { isLoading, error, data } = useQuery("list", () =>
    client.getEntries({ content_type: "page" })
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="content">
          <h1>Digital Projects</h1>
          <p>TBD.</p>
          <h1>Theatre Projects</h1>
          Loading
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="content">
          <h1>Theatre Projects</h1>
          Something went wrong
          <h1>Digital Projects</h1>
          <p>TBD.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="content">
        <h1>Theatre Projects</h1>
        <div className="entries">
          {data.items.map((entry) => (
            <Card
              key={entry.fields.link}
              link={`projects/${entry.fields.link}`}
              name={entry.fields.name}
              desc={entry.fields.desc}
              photo={entry.fields.pic}
            />
          ))}
        </div>
        <h1>Digital Projects</h1>
        <p>TBD.</p>
      </div>
    </Layout>
  );
};

export default Home;
