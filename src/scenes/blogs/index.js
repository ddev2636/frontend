import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetBlogsQuery } from "state/api";
import { useNavigate } from "react-router-dom";

const Product = ({ _id, firstName, lastName, email, picture }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {firstName}
        </Typography>
        <Typography variant="h5" component="div">
          {lastName}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {email}
        </Typography>
        <Box
          sx={{
            margin: "auto",
          }}
        >
          <img src={picture} height="100rem" alt="hello" />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={() => navigate(`/blogs/${_id}`)}
        >
          New Page
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      ></Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetBlogsQuery();
  //console.log(data);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BLOGS" subtitle="See your list of blogs." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(({ _id, firstName, lastName, email, picture }) => (
            <Product
              _id={_id}
              firstName={firstName}
              lastName={lastName}
              email={email}
              picture={picture}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
