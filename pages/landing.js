// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import React, { useEffect, useState } from "react";
import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";
// @material-ui/icons

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  // const [flag, setFlag] = useState();

  const useFetch = (query) => {
    if (!query) return;
    const fetchData = async () => {
      const response = await fetch(query);
      const result = await response.json();

      if (result.results && result.results.length) {
        result.results.map(async (itr) => {
          const flagData = await getFlagData(itr);
          itr.flag = flagData.data.flag;

          return itr;
        });

        setTimeout(() => {
          setData(result.results);
        }, 100);
      }
    };

    fetchData();
  };

  useEffect(() => {
    useFetch("https://randomuser.me/api/?results=10");
  }, []);

  const getFlagData = async (elem) => {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${elem.nat}`
    );

    return res;
  };

  const { ...rest } = props;
  return (
    <div>
      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <GridContainer>
            {data.map(
              ({ name, email, dob, phone, picture, location, flag }, id) => (
                <GridItem xs={12} md={4} key={`card_${id}`}>
                  <Card>
                    <CardHeader>
                      <img src={picture.medium} alt={`profile_${id}`} />
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem md={8}>
                          {name.first} {name.last}
                        </GridItem>
                        <GridItem md={4}>
                          <img
                            src={flag}
                            alt="flag"
                            className={classes.fluidImg}
                          />
                        </GridItem>
                      </GridContainer>
                      <hr />
                      <p>Age: {dob.age}</p>
                      <hr />
                      <p>Phone: {phone}</p>
                      <hr />
                      <p>Email: {email}</p>
                      <hr />
                      <p>
                        Address: {location.street.number} {location.street.name}
                        {", "}
                        {location.city}
                        {", "}
                        {location.state}
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
              )
            )}
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
