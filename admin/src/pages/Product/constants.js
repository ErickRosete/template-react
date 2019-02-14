import gql from "graphql-tag";

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      _id
      name
      imageLinks
      shortDescription
      description
      videoLink
      subcategories {
        _id
        name
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  {
    products {
      _id
      name
      imageLinks
      shortDescription
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation CreateProduct(
    $name: String
    $imageLinks: [String]
    $videoLink: String
    $shortDescription: String
    $description: String
    $subcategories: [ID]
  ) {
    createProduct(
      productInput: {
        name: $name
        videoLink: $videoLink
        imageLinks: $imageLinks
        shortDescription: $shortDescription
        description: $description
        subcategories: $subcategories
      }
    ) {
      _id
      name
      imageLinks
      shortDescription
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $imageLinks: [String]
    $videoLink: String
    $shortDescription: String
    $description: String
    $subcategories: [ID]
  ) {
    updateProduct(
      id: $id
      productInput: {
        name: $name
        imageLinks: $imageLinks
        videoLink: $videoLink
        shortDescription: $shortDescription
        description: $description
        subcategories: $subcategories
      }
    ) {
      _id
      name
      imageLinks
      shortDescription
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      _id
    }
  }
`;
