import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const BlogPost = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "https://social-backend4.onrender.com/blog/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    onSubmitProps.resetForm();
  };
  // const register = async (values, onSubmitProps) => {
  //   // this allows us to send form info with image
  //   console.log(values);
  //   const formData = new FormData();
  //   for (let value in values) {
  //     formData.append(value, values[value]);
  //   }
  //   //formData.append("picturePath", values.picture.name);

  //   const savedUserResponse = await fetch("http://localhost:5001/blog/posts", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const savedUser = await savedUserResponse.json();
  //   console.log(savedUser);
  //   onSubmitProps.resetForm();
  // };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              paddingX: "2rem",
              paddingY: "2rem",
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <>
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={async (acceptedFiles) => {
                    try {
                      if (acceptedFiles.length === 0) {
                        console.log("No files selected.");
                        return;
                      }

                      const storageRef = ref(storage, "Posts/" + uuid());

                      const uploadTask = uploadBytesResumable(
                        storageRef,
                        acceptedFiles[0]
                      );

                      uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                          // Progress monitoring can be implemented here if needed
                        },
                        (error) => {
                          console.log("Error uploading file:", error);
                        },
                        async () => {
                          await getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                              setFieldValue("picture", downloadURL);
                              console.log(downloadURL);
                            }
                          );
                        }
                      );
                    } catch (error) {
                      console.log("Error uploading file:", error);
                    }
                  }}

                  // onDrop={(acceptedFiles) =>
                  //   //setFieldValue("picture", acceptedFiles[0])
                  //   console.log(acceptedFiles[0])
                  // }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0rem",
                  p: "1rem",
                  backgroundColor: "#070812",
                  color: "#f6f6f6",
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {"REGISTER"}
              </Button>
            </>
          </Box>
          {/* BUTTONS */}
          {/* <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0rem",
                p: "1rem",
                backgroundColor: "#070812",
                color: "#f6f6f6",
                "&:hover": { color: palette.primary.main },
              }}
            >
              {"REGISTER"}
            </Button>
          </Box> */}
        </form>
      )}
    </Formik>
  );
};

export default BlogPost;
