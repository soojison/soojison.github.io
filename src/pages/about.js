import React from "react";
import Layout from '../containers/Layout';

const About = () => {
  return (
    <Layout>
    <div className="content">
      <h1>Hi there,</h1>
      <p>
        My name is Sooji and I'm a jack of all trades. I do some design and
        full-stack development work at Intuit. I'm passionate about making
        websites that are user-friendly. I have a bachelors in Computer Science
        and Theatre and Dance, with a minor in Linguistics.
      </p>
      <p>
        In my free time, I might be found making mechanical keyboards, embroidering,
        cooking hearty meals, and playing fetch with my dog Crouton.
      </p>
      <p>
        You can find me on <a href="https://github.com/soojison" target="_blank">Github</a>,
        or on other undisclosed places by serendipity.
      </p>
      <h1>*</h1>
      <p>This site was made with React, Parcel, and Three.js</p>
    </div>
    </Layout>
  );
};

export default About;
