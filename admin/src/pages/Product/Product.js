import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout";
import Link from "react-router-dom/Link";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../components/Spinner/Spinner";
import { DELETE_PRODUCT, GET_PRODUCTS } from "./constants";

import CardList from "../../components/Product/CardList/CardList";

//Buttons
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
// import Button from "@material-ui/core/Button";

//Dialog
import DeleteDialog from "../../components/Dialog/DeleteDialog";
import { Query, Mutation } from "react-apollo";

const styles = theme => ({
  product: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

export class ProductPage extends Component {
  state = {
    openDialog: false,
    selectedId: null
  };

  handleClickOpenDeleteDialog = id => {
    this.setState({
      selectedId: id,
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Layout title="Lista de productos">
        <div className={classes.product}>
          <Query query={GET_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return <p>Error :( recarga la pagina!</p>;
              return (
                <CardList
                  products={data.products}
                  openDeleteDialog={this.handleClickOpenDeleteDialog}
                />
              );
            }}
          </Query>

          <Mutation
            mutation={DELETE_PRODUCT}
            update={(cache, { data: { deleteProduct } }) => {
              const { products } = cache.readQuery({ query: GET_PRODUCTS });
              const productIndex = products.findIndex(
                product => product._id === deleteProduct._id
              );
              products.splice(productIndex, 1);
              cache.writeQuery({
                query: GET_PRODUCTS,
                data: { products }
              });
            }}
          >
            {deleteProduct => (
              <DeleteDialog
                info="producto"
                open={this.state.openDialog}
                onConfirm={() => {
                  deleteProduct({
                    variables: { id: this.state.selectedId }
                  });
                  this.setState({
                    selectedId: null,
                    openDialog: false
                  });
                }}
                onCancel={this.handleCloseDialog}
              />
            )}
          </Mutation>

          <Link className={classes.fab} to="/product/add">
            <Fab color="primary" aria-label="Add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </Layout>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductPage);
