import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from "../CartSlice";
import { Link } from "react-router-dom";

export const CartItem = ({
  id,
  thumbnail,
  title,
  category,
  brand,
  price,
  quantity,
  stockQuantity,
  productId,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is552 = useMediaQuery(theme.breakpoints.down(552));
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  const handleAddQty = () => {
    const update = { _id: id, quantity: quantity + 1 };
    dispatch(updateCartItemByIdAsync(update));
  };
  const handleRemoveQty = () => {
    if (quantity === 1) {
      dispatch(deleteCartItemByIdAsync(id));
    } else {
      const update = { _id: id, quantity: quantity - 1 };
      dispatch(updateCartItemByIdAsync(update));
    }
  };

  const handleProductRemove = () => {
    dispatch(deleteCartItemByIdAsync(id));
  };

  return (
    <Stack
      boxShadow={7}
      bgcolor={"#c4c4d4"}
      component={is900 ? "" : Paper}
      p={is900 ? 1.5 : is600 ? 1.5 : 2}
      elevation={1}
      flexDirection={is600 ? "column" : "row"}
      justifyContent={"space-between"}
      alignItems={is600 ? "flex-start" : "center"}
    >
      {/* image and details */}
      <Stack
        flexDirection={"row"}
        rowGap={"1rem"}
        alignItems={is600 ? "flex-start" : "center"}
        columnGap={is600 ? 1.5 : 2}
        flexWrap={"wrap"}
        width={is600 ? "100%" : "auto"}
      >
        <Stack
          width={is552 ? "80px" : is600 ? "100px" : "200px"}
          height={is552 ? "80px" : is600 ? "100px" : "200px"}
          component={Link}
          to={`/product-details/${productId}`}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: "1 / 1",
              objectFit: "contain",
            }}
            src={thumbnail}
            alt={`${title} image unavailabe`}
          />
        </Stack>

        <Stack alignSelf={is600 ? "auto" : ""}>
          <Typography
            component={Link}
            to={`/product-details/${productId}`}
            sx={{ textDecoration: "none", color: theme.palette.primary.main }}
            variant={is480 ? "body2" : "h6"}
            fontWeight={500}
          >
            {title}
          </Typography>
          <Typography variant={is480 ? "caption" : "body2"} color={"text.secondary"}>
            {brand}
          </Typography>
          <Typography variant={is480 ? "caption" : "body2"} mt={1}>Quantity</Typography>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <IconButton onClick={handleRemoveQty} size={is480 ? "small" : "medium"}>
              <RemoveIcon fontSize={is480 ? "small" : "medium"} />
            </IconButton>
            <Typography variant={is480 ? "body2" : "body1"}>{quantity}</Typography>
            <IconButton onClick={handleAddQty} size={is480 ? "small" : "medium"}>
              <AddIcon fontSize={is480 ? "small" : "medium"} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      {/* price and remove button */}
      <Stack
        justifyContent={"space-evenly"}
        alignSelf={is600 ? "flex-end" : is552 ? "flex-end" : ""}
        height={is600 ? "auto" : "100%"}
        rowGap={"1rem"}
        alignItems={is600 ? "flex-end" : "flex-end"}
        width={is600 ? "100%" : "auto"}
        flexDirection={is600 ? "row" : "column"}
        justifyContent={is600 ? "space-between" : "space-evenly"}
      >
        <Typography variant={is480 ? "body2" : "body1"}>${price}</Typography>
        <Button
          size={is480 ? "small" : ""}
          onClick={handleProductRemove}
          variant="contained"
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};
