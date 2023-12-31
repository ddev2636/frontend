import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Blog from "scenes/blogs";
import BlogPost from "scenes/blogpost";
import SingleBlogPost from "scenes/singleBlogPost/SingleBlogPost";
import SignIn from "scenes/signin";
import Register from "scenes/register";
import { setUser } from "state/auth";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  if (user) {
    dispatch(setUser(JSON.parse(user)));
  }
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="register" element={<Register />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogpost" element={<BlogPost />} />
              <Route path="/blogs/:id" element={<SingleBlogPost />} />

              {/* <Route path='/' element={<Navigate to='/dashboard' replace/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/products' element={<Products/>}/>
            </Route> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
