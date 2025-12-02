import {
  FormHelperText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { addToCartAsync, selectCartItems } from "../../cart/CartSlice";
import { motion } from "framer-motion";

export const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  stockQuantity,
  handleAddRemoveFromWishlist,
  isWishlistCard,
  isAdminCard,
}) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  let isProductAlreadyinWishlist = -1;

  const theme = useTheme();
  const is1410 = useMediaQuery(theme.breakpoints.down(1410));
  const is932 = useMediaQuery(theme.breakpoints.down(932));
  const is752 = useMediaQuery(theme.breakpoints.down(752));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is608 = useMediaQuery(theme.breakpoints.down(608));
  const is488 = useMediaQuery(theme.breakpoints.down(488));
  const is408 = useMediaQuery(theme.breakpoints.down(408));

  isProductAlreadyinWishlist = wishlistItems.some(
    (item) => item.product._id === id
  );

  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  return (
    <>
      {isProductAlreadyinWishlist !== -1 ? (
        <Stack
          component={
            isAdminCard ? "" : isWishlistCard ? "" : is408 ? "" : Paper
          }
          mt={is408 ? 2 : 0}
          elevation={1}
          p={is408 ? 1.5 : is488 ? 1.5 : is608 ? 1.75 : 2}
          width={
            is408
              ? "auto"
              : is488
              ? "180px"
              : is608
              ? "220px"
              : is752
              ? "280px"
              : is932
              ? "240px"
              : is1410
              ? "300px"
              : "340px"
          }
          sx={{
            cursor: "pointer",
            borderRadius: 3,
            height: is408
              ? "450px"
              : is488
              ? "480px"
              : is608
              ? "500px"
              : is752
              ? "520px"
              : "525px",
            margin: "0 auto",
            backgroundColor: isAdminCard ? "tranparent" : "#c4c4d4",
            boxShadow: isAdminCard ? "none" : 7,
          }}
          onClick={() => navigate(`/product-details/${id}`)}
        >
          {/* image display */}
          <Stack>
            <img
              width={"100%"}
              style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
              height={"100%"}
              src={thumbnail}
              alt={`${title} photo unavailable`}
            />
          </Stack>

          {/* lower section */}
          <Stack flex={2} justifyContent={"flex-end"} spacing={1} rowGap={2}>
            <Stack>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={
                    is408 ? "body2" : is488 ? "body1" : is608 ? "body1" : "h6"
                  }
                  fontWeight={400}
                >
                  {title}
                </Typography>
                {!isAdminCard && (
                  <motion.div
                    whileHover={{ scale: 1.3, y: -10, zIndex: 100 }}
                    whileTap={{ scale: 1 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      checked={isProductAlreadyinWishlist}
                      onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                  </motion.div>
                )}
              </Stack>
              <Typography
                variant={is408 ? "caption" : "body2"}
                color={"text.secondary"}
              >
                {brand}
              </Typography>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant={is408 ? "body2" : "body1"}>
                ${price}
              </Typography>
              {!isWishlistCard
                ? isProductAlreadyInCart
                  ? "Added to cart"
                  : !isAdminCard && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 1 }}
                        onClick={(e) => handleAddToCart(e)}
                        style={{
                          padding: is408
                            ? "6px 8px"
                            : is488
                            ? "7px 10px"
                            : is608
                            ? "8px 12px"
                            : "10px 15px",
                          borderRadius: "3px",
                          outline: "none",
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: "black",
                          color: "white",
                          fontSize: is408
                            ? ".65rem"
                            : is488
                            ? ".7rem"
                            : is500
                            ? ".75rem"
                            : is608
                            ? ".8rem"
                            : ".9rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: ".5rem",
                          }}
                        >
                          <p>Add To Cart</p>
                        </div>
                      </motion.button>
                    )
                : ""}
            </Stack>
            {stockQuantity <= 20 && (
              <FormHelperText sx={{ fontSize: ".9rem" }} error>
                {stockQuantity === 1
                  ? "Only 1 stock is left"
                  : "Only few are left"}
              </FormHelperText>
            )}
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
};
