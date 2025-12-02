import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserByIdAsync,
  selectUserInfo,
} from "../../user/UserSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser, setLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";
import { axiosi } from "../../../config/axios";
import { useState } from "react";
import { useEffect } from "react";

export const Navbar = ({ isProductList = false }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is900 = useMediaQuery(theme.breakpoints.down(900));

  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleToggleFilters = () => {
  //   dispatch(toggleFilters());
  // };

  const settings = [
    { name: "Home", to: "/" },
    {
      name: "Profile",
      to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile",
    },
    {
      name: loggedInUser?.isAdmin ? "Orders" : "My orders",
      to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { name: "Logout", to: "/logout" },
  ];

  const isAdmin = loggedInUser?.isAdmin || false;
  const [loading, setLoading] = useState(false);
  const handleToggleAdmin = async () => {
    setLoading(true);
    try {
      const updatedStatus = !isAdmin;
      //  Update backend
      await axiosi.patch(`/users/${loggedInUser._id}`, {
        isAdmin: updatedStatus,
      });

      //  Refetch updated user
      const updatedUser = await dispatch(
        fetchLoggedInUserByIdAsync(loggedInUser._id)
      ).unwrap();

      //  Update AuthSlice state
      dispatch(setLoggedInUser(updatedUser));

      //  Navigate accordingly
      navigate(updatedStatus ? "/admin/dashboard" : "/", { replace: true });
    } catch (error) {
      console.error("Failed to toggle admin status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        borderBottom: "thick solid black",
        backgroundColor: "#ffffffff",
        boxShadow: "none",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          p: is600 ? 0.5 : 1,
          height: is900 ? "3.5rem" : "4rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: is900 ? "wrap" : "nowrap",
          gap: is900 ? 1 : 0,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: is900 ? 0 : 2,
            display: { xs: "none", md: "flex" },
            fontSize: is900 ? "1.5rem" : "2.25rem",
            fontWeight: 900,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          EASY KART
        </Typography>

        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          columnGap={is900 ? 0.5 : 2}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userInfo?.name} src="null" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={"text.primary"}
                  sx={{ textDecoration: "none" }}
                  to="/admin/add-product"
                  textAlign="center"
                >
                  Add new Product
                </Typography>
              </MenuItem>
            )}
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={"text.primary"}
                  sx={{ textDecoration: "none" }}
                  to={setting.to}
                  textAlign="center"
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant={is900 ? "body2" : "h6"} fontWeight={300}>
            {is480
              ? `${userInfo?.name.toString().split(" ")[0]}`
              : `Hey👋, ${userInfo?.name}`}
          </Typography>
          {loggedInUser.isAdmin && (
            <Button variant="contained" color="error" size={is900 ? "small" : "medium"}>
              Admin
            </Button>
          )}
          <Stack
            sx={{
              flexDirection: "row",
              columnGap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color="error">
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && (
              <Stack>
                <Badge badgeContent={wishlistItems?.length} color="error">
                  <IconButton component={Link} to={"/wishlist"}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Badge>
              </Stack>
            )}
            <Button
              variant="contained"
              onClick={handleToggleAdmin}
              disabled={loading}
              size={is900 ? "small" : "medium"}
            >
              {isAdmin ? "User" : "Admin"}
            </Button>
            {/* {isProductList && (
              <IconButton onClick={handleToggleFilters}>
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )} */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
