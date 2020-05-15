import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import { URLify } from "../../utils/string";

import Grid from "../../components/grid";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const RepositoriesPage = ({ data }) => {
  const { totalCount, repositories } = data?.repositoriesData;

  if (totalCount == null || repositories == null) return;

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <br />
      <p>
        <b>{totalCount}</b> repos
      </p>
      <br />
      <Grid>
        {repositories.map(repository => (
          <Link
            key={`repository__${repository.owner.name}__${repository.name}`}
            to={URLify(`${repository.owner.name}/${repository.name}`)}
          >
            {repository.owner.name}/{repository.name}
            {!!repository.image?.childImageSharp?.fluid && (
              <Img
                fluid={repository.image?.childImageSharp?.fluid}
                alt={`vim color scheme repository ${repository.name}`}
              />
            )}
            <br />
          </Link>
        ))}
      </Grid>
      <br />
    </Layout>
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    repositoriesData: allRepository(
      sort: { fields: stargazers_count, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      repositories: nodes {
        name
        description
        owner {
          name
        }
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default RepositoriesPage;
