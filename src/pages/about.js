import React from "react";
import Layout from "../containers/Layout";

const About = () => {
  return (
    <Layout>
      <div className="content">
        <h1>Hi there,</h1>
        <p>
          Sooji Son is a jack of all trades based in Iowa City. Currently she is
          working as a designer and a full-stack developer at Intuit, and before
          that she studied Computer Science, Theatre and Dance, and Linguistics
          at Grinnell College. Professionally, she enjoys finding ways to make
          websites that are user-friendly. Outside of work, she wants to learn
          more about generative models to create art, 3D modeling and sculpting,
          and other web development tools.
        </p>
        <p>
          You can find her on{" "}
          <a href="https://github.com/soojison" target="_blank">
            Github
          </a>
          , or on other undisclosed places by serendipity.
        </p>
        <h1>*</h1>
        <p>This site was made with React, Parcel, and Three.js</p>
      </div>
    </Layout>
  );
};

export default About;
