import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Card from "../components/TOCCard";

import { initAuth } from '../services/auth'
initAuth()

import "./index.css";
import Sidebar from "../components/sidebar";

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query HomepageTOC {
        site {
          siteMetadata {
            title
            subtitle
            description
            keywords
          }
        }
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___order] }, filter: {fields: { isCourse: { eq: true } }}) {
          edges {
            node {
              id
              frontmatter {
                order
                path
                title
              }
            }
          }
        }
      }
    `}
    render={props => (

      <div className="index">

        <div className="jumbotron gradient">
          <h1>{props.site.siteMetadata.title}</h1>
          <h2>{props.site.siteMetadata.subtitle}</h2>
        </div>

        <Card
          title="Courses"
          content={props.allMarkdownRemark.edges}
        />
      </div>
    )}
  />
);

export default IndexPage;
