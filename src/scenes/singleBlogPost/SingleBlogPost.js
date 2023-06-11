import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "state/api";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Product = ({ _id, firstName, lastName, email, picture }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

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
          {email} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          rerum sit ut quo ea harum quae pariatur exercitationem obcaecati
          quidem quos ratione aut dolorem, totam qui laboriosam animi esse dolor
          accusantium quibusdam dolorum sint provident amet nobis. Animi,
          commodi illum.
        </Typography>
        <Box
          sx={{
            margin: "auto",
          }}
        >
          <img src={picture} width="850rem" alt="hello" />
        </Box>
      </CardContent>

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

const Comments = () => {
  return <Box>comments</Box>;
};

const SingleBlogPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBlogQuery(id);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      {data || !isLoading ? (
        <>
          <Box
            mt="20px"
            display="flex"
            widthFull
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Product
              _id={data._id}
              firstName={data.firstName}
              lastName={data.lastName}
              email={data.email}
              picture={data.picture}
            />
          </Box>
          <Comments />
        </>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default SingleBlogPost;
