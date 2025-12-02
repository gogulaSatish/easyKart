import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import React from "react";
import {
  QRCodePng,
  appStorePng,
  googlePlayPng,
  facebookPng,
  instagramPng,
  twitterPng,
  linkedinPng,
  notFoundPageAnimation,
} from "../../assets";
import SendIcon from "@mui/icons-material/Send";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  const labelStyles = {
    color: "white",
    textDecoration: "none",
    fontWeight: 300,
    cursor: "pointer",
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: is700 ? "1.5rem" : "3rem",
        paddingLeft: is700 ? "1rem" : is500 ? "0.5rem" : "3rem",
        paddingRight: is700 ? "1rem" : is500 ? "0.5rem" : "3rem",
        paddingBottom: "1.5rem",
        rowGap: is700 ? "2rem" : "5rem",
        color: theme.palette.primary.light,
        justifyContent: "space-around",
      }}
    >
      {/* upper */}
      <Stack
        flexDirection={"row"}
        rowGap={is700 ? "1.5rem" : "1rem"}
        justifyContent={is700 ? "center" : "space-around"}
        flexWrap={"wrap"}
        columnGap={is500 ? 0 : 2}
      >
        <Stack rowGap={"1rem"} padding={is500 ? "0.5rem" : "1rem"}>
          <Typography variant={is700 ? "body1" : "h6"} fontSize={is700 ? "1rem" : "1.5rem"}>
            Exclusive
          </Typography>
          <Typography variant={is700 ? "body2" : "h6"}>Subscribe</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>Get 10% off your first order</Typography>
          <TextField
            placeholder="Enter your email"
            size={is500 ? "small" : "medium"}
            sx={{ border: "1px solid white", borderRadius: "6px" }}
            InputProps={{
              endAdornment: (
                <IconButton size={is500 ? "small" : "medium"}>
                  <SendIcon sx={{ color: theme.palette.primary.light, fontSize: is500 ? "1.2rem" : "1.5rem" }} />
                </IconButton>
              ),
              style: { color: "whitesmoke", fontSize: is500 ? "0.9rem" : "1rem" },
            }}
          />
        </Stack>

        <Stack rowGap={"1rem"} padding={is500 ? "0.5rem" : "1rem"}>
          <Typography variant={is700 ? "body2" : "h6"}>Support</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>
            77 Oak Street, Apt. 201, Springfield, IL 62704.
          </Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>exclusive@gmail.com</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>+1-99999-9999</Typography>
        </Stack>

        <Stack rowGap={"1rem"} padding={is500 ? "0.5rem" : "1rem"}>
          <Typography variant={is700 ? "body2" : "h6"}>Account</Typography>
          <Typography sx={labelStyles} component={Link} to={"/profile"} variant={is500 ? "caption" : "body2"}>
            My Account
          </Typography>
          <Typography sx={labelStyles} component={Link} to={"/cart"} variant={is500 ? "caption" : "body2"}>
            Cart
          </Typography>
          <Typography sx={labelStyles} component={Link} to={"/wishlist"} variant={is500 ? "caption" : "body2"}>
            Wishlist
          </Typography>
          <Typography sx={labelStyles} component={Link} to={"/"} variant={is500 ? "caption" : "body2"}>
            Shop
          </Typography>
        </Stack>

        <Stack rowGap={"1rem"} padding={is500 ? "0.5rem" : "1rem"}>
          <Typography variant={is700 ? "body2" : "h6"}>Quick Links</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>Privacy Policy</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>Terms Of Use</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>FAQ</Typography>
          <Typography sx={labelStyles} variant={is500 ? "caption" : "body2"}>Contact</Typography>
        </Stack>

        <Stack rowGap={"1rem"} padding={is500 ? "0.5rem" : "1rem"}>
          <Typography variant={is700 ? "body2" : "h6"}>Download App</Typography>
          <Typography
            sx={{ ...labelStyles, color: "graytext", fontWeight: 500 }}
            variant={is500 ? "caption" : "body2"}
          >
            Save $3 with App New User Only
          </Typography>
          <Stack flexDirection={"row"} columnGap={".5rem"}>
            <Box width={is500 ? "70px" : "100px"} height={is500 ? "70px" : "100px"}>
              <img
                src={QRCodePng}
                height={"100%"}
                width={"100%"}
                style={{ objectFit: "contain" }}
                alt="QR Code"
              />
            </Box>

            <Stack justifyContent={"space-around"}>
              <Stack>
                <img
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  src={googlePlayPng}
                  alt="GooglePlay"
                />
              </Stack>
              <Stack>
                <img
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  src={appStorePng}
                  alt="AppStore"
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack mt={0.6} flexDirection={"row"} columnGap={is500 ? "1rem" : "2rem"}>
            <MotionConfig whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
              <motion.img
                style={{ cursor: "pointer", width: is500 ? "20px" : "24px", height: is500 ? "20px" : "24px" }}
                src={facebookPng}
                alt="Facebook"
              />
              <motion.img
                style={{ cursor: "pointer", width: is500 ? "20px" : "24px", height: is500 ? "20px" : "24px" }}
                src={twitterPng}
                alt="Twitter"
              />
              <motion.img
                style={{ cursor: "pointer", width: is500 ? "20px" : "24px", height: is500 ? "20px" : "24px" }}
                src={instagramPng}
                alt="Instagram"
              />
              <motion.img
                style={{ cursor: "pointer", width: is500 ? "20px" : "24px", height: is500 ? "20px" : "24px" }}
                src={linkedinPng}
                alt="Linkedin"
              />
            </MotionConfig>
          </Stack>
        </Stack>
      </Stack>

      {/* lower */}
      <Stack alignSelf={"center"}>
        <Typography color={"GrayText"} variant={is500 ? "caption" : "body2"}>
          &copy; Easy Kart {new Date().getFullYear()}. All rights reserved
        </Typography>
      </Stack>
    </Stack>
  );
};
