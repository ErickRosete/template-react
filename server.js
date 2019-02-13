const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const multer = require("multer");
const bodyParser = require("body-parser");

const externalRequest = require("./middleware/external-requests");

const { saveImage, saveImages } = require("./helpers/images");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(externalRequest);

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

const upload = multer({
    dest: "/uploads"
});

app.post('/uploadImage', upload.single("file"), (req, res) => {
    saveImage(req, res);
});

app.post('/uploadImages', upload.array("files"), (req, res) => {
    saveImages(req, res);
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@admincluster-zdvxr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
    .then(() => app.listen(5000))
    .catch(err => console.log(err));