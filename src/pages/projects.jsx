import React, { useState, useEffect } from "react";
import Layout from "../containers/Layout";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

const Projects = (props) => {
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
          <h1>Digital Projects</h1>
          <p>TBD.</p>
          <h1>Theatre Projects</h1>
          Something went wrong
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="content">
        <h1>Digital Projects</h1>
        <p>TBD.</p>
        <h1>Theatre Projects</h1>
        {data.items.map((entry) => (
          <div>
            <NavLink to={`projects/${entry.fields.link}`}>
              {entry.fields.name}
            </NavLink>
            : {entry.fields.desc}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Projects;
