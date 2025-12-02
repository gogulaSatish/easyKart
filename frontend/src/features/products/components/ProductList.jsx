import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectProductIsFilterOpen,
  selectProductTotalResults,
  selectProducts,
  toggleFilters,
} from "../ProductSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from "./ProductCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import { selectBrands } from "../../brands/BrandSlice";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { selectCategories } from "../../categories/CategoriesSlice";
import Pagination from "@mui/material/Pagination";
import { ITEMS_PER_PAGE } from "../../../constants";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { toast } from "react-toastify";
import {
  banner1,
  banner2,
  banner3,
  banner4,
  loadingAnimation,
} from "../../../assets";
import {
  resetCartItemAddStatus,
  selectCartItemAddStatus,
} from "../../cart/CartSlice";
import { LayoutGroupContext, motion } from "framer-motion";
import { ProductBanner } from "./ProductBanner";
import ClearIcon from "@mui/icons-material/Clear";
import Lottie from "lottie-react";

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];

const bannerImages = [banner1, banner3, banner2, banner4];

export const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const theme = useTheme();

  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is488 = useMediaQuery(theme.breakpoints.down(488));

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const loggedInUser = useSelector(selectLoggedInUser);

  const productFetchStatus = useSelector(selectProductFetchStatus);

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const dispatch = useDispatch();

  //Slider (slick- carasouel)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // show 4 products at a time
    slidesToScroll: 1, // scroll 1 product at a time
    autoplay: false, // auto swipe enabled
    autoplaySpeed: 2000, // 3 seconds delay
    responsive: [
      // make responsive adjustments
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const categoryGroups = {
    electronics: ["smartphones", "laptops", "mens-watches", "womens-watches"],
    fashionAndAccessories: [
      "tops",
      "womens-dresses",
      "sunglasses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
      "mens-shirts",
      "mens-shoes",
    ],
    homeAndLiving: ["lighting", "home-decoration", "furniture", "groceries"],
    beautyAndPersonalCare: ["fragrances", "skincare"],
    automotiveAndOutdoors: ["automotive", "motorcycle"],
  };

  // Function to get category IDs for a group by name filter
  const getCategoryIdsByNames = (groupNames) =>
    categories
      .filter((cat) => groupNames.includes(cat.name))
      .map((cat) => cat._id.toString());

  // Usage:
  const electronicsIds = getCategoryIdsByNames(categoryGroups.electronics);
  const fashionIds = getCategoryIdsByNames(
    categoryGroups.fashionAndAccessories
  );
  const homeAndLivingIds = getCategoryIdsByNames(categoryGroups.homeAndLiving);
  const beautyIds = getCategoryIdsByNames(categoryGroups.beautyAndPersonalCare);
  const automotiveIds = getCategoryIdsByNames(
    categoryGroups.automotiveAndOutdoors
  );

  // Then use these IDs to filter products:
  const electronicsFiltered = products.filter((prod) =>
    electronicsIds.includes(prod.category.toString())
  );
  const fashionFiltered = products.filter((prod) =>
    fashionIds.includes(prod.category.toString())
  );
  const homeAndLivingFiltered = products.filter((prod) =>
    homeAndLivingIds.includes(prod.category.toString())
  );
  const beautyFiltered = products.filter((prod) =>
    beautyIds.includes(prod.category.toString())
  );
  const automotiveFiltered = products.filter((prod) =>
    automotiveIds.includes(prod.category.toString())
  );

  const handleBrandFilters = (e) => {
    const filterSet = new Set(filters.brand);

    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }

    const filterArray = Array.from(filterSet);
    setFilters({ ...filters, brand: filterArray });
  };

  const handleCategoryFilters = (e) => {
    const filterSet = new Set(filters.category);

    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }

    const filterArray = Array.from(filterSet);
    setFilters({ ...filters, category: filterArray });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  useEffect(() => {
    const finalFilters = { ...filters };

    // finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters["sort"] = sort;

    if (!loggedInUser?.isAdmin) {
      finalFilters["user"] = true;
    }

    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, page, sort]);

  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: productId };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex(
        (item) => item.product._id === productId
      );
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };

  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") {
      toast.success("Product added to wishlist");
    } else if (wishlistItemAddStatus === "rejected") {
      toast.error("Error adding product to wishlist, please try again later");
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === "fulfilled") {
      toast.success("Product removed from wishlist");
    } else if (wishlistItemDeleteStatus === "rejected") {
      toast.error(
        "Error removing product from wishlist, please try again later"
      );
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Error fetching products, please try again later");
    }
  }, [productFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductFetchStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  return (
    <>
      {/* filters side bar */}

      {productFetchStatus === "pending" ? (
        <Stack
          width={is500 ? "35vh" : "25rem"}
          height={"calc(100vh - 4rem)"}
          justifyContent={"center"}
          marginRight={"auto"}
          marginLeft={"auto"}
        >
          <Lottie animationData={loadingAnimation} />
        </Stack>
      ) : (
        <>
          <motion.div
            style={{
              position: "fixed",
              backgroundColor: "white",
              height: "100vh",
              padding: is500 ? "0.75rem" : "1rem",
              overflowY: "scroll",
              width: is500 ? "100vw" : is600 ? "90vw" : "30rem",
              zIndex: 500,
            }}
            variants={{ show: { left: 0 }, hide: { left: -500 } }}
            initial={"hide"}
            transition={{ ease: "easeInOut", duration: 0.7, type: "spring" }}
            animate={isProductFilterOpen === true ? "show" : "hide"}
          >
            {/* fitlers section */}
            <Stack
              mb={"5rem"}
              sx={{ scrollBehavior: "smooth", overflowY: "scroll" }}
            >
              <Typography variant="h4">New Arrivals</Typography>

              <IconButton
                onClick={handleFilterClose}
                style={{ position: "absolute", top: 15, right: 15 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ClearIcon fontSize="medium" />
                </motion.div>
              </IconButton>

              <Stack rowGap={2} mt={4}>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Totes
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Backpacks
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Travel Bags
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Hip Bags
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Laptop Sleeves
                </Typography>
              </Stack>

              {/* brand filters */}
              <Stack mt={2}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="brand-filters"
                    id="brand-filters"
                  >
                    <Typography>Brands</Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 0 }}>
                    <FormGroup onChange={handleBrandFilters}>
                      {brands?.map((brand) => (
                        <motion.div
                          style={{ width: "fit-content" }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FormControlLabel
                            sx={{ ml: 1 }}
                            control={<Checkbox whileHover={{ scale: 1.1 }} />}
                            label={brand.name}
                            value={brand._id}
                          />
                        </motion.div>
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Stack>

              {/* category filters */}
              <Stack mt={2}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="brand-filters"
                    id="brand-filters"
                  >
                    <Typography>Category</Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 0 }}>
                    <FormGroup onChange={handleCategoryFilters}>
                      {categories?.map((category) => (
                        <motion.div
                          style={{ width: "fit-content" }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FormControlLabel
                            sx={{ ml: 1 }}
                            control={<Checkbox whileHover={{ scale: 1.1 }} />}
                            label={category.name}
                            value={category._id}
                          />
                        </motion.div>
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </Stack>
          </motion.div>

          <Stack mb={"3rem"}>
            {/* banners section */}
            {!is600 && (
              <Stack
                sx={{
                  width: "100%",
                  height: is800 ? "300px" : is1200 ? "400px" : "500px",
                }}
              >
                <ProductBanner images={bannerImages} />
              </Stack>
            )}

            {/* products */}
            <Stack
              rowGap={is600 ? 3 : 5}
              mt={is600 ? 2 : 0}
              sx={{ m: is500 ? 1.5 : is600 ? 2 : 3 }}
            >
              {/* sort options */}
              <Stack
                flexDirection={"row"}
                mr={is500 ? "1rem" : is600 ? "1.5rem" : "2rem"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                columnGap={is600 ? 2 : 5}
              >
                <Stack
                  alignSelf={"flex-end"}
                  width={is500 ? "10rem" : "12rem"}
                  sx={{ backgroundColor: "#c4c4d4" }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="sort-dropdown" sx={{ color: "black" }}>
                      Sort
                    </InputLabel>
                    <Select
                      variant="standard"
                      labelId="sort-dropdown"
                      label="Sort"
                      onChange={(e) => setSort(e.target.value)}
                      value={sort}
                    >
                      <MenuItem bgcolor="text.secondary" value={null}>
                        Reset
                      </MenuItem>
                      {sortOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
              {/* product slider */}
              <Box
                sx={{
                  p: is500 ? 2 : is600 ? 2.5 : 4,
                  mb: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#c4c4d4",
                }}
              >
                <Typography
                  variant={is500 ? "h5" : is600 ? "h4" : "h3"}
                  sx={{ mb: 2 }}
                >
                  Electronics{" "}
                </Typography>
                <Slider {...settings}>
                  {electronicsFiltered.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                    />
                  ))}
                </Slider>
              </Box>

              {/* product slider */}
              <Box
                sx={{
                  p: is500 ? 2 : is600 ? 2.5 : 4,
                  mb: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#c4c4d4",
                }}
              >
                <Typography
                  variant={is500 ? "h5" : is600 ? "h4" : "h3"}
                  sx={{ mb: 2 }}
                >
                  Fashion & Accessories
                </Typography>

                <Slider {...settings}>
                  {fashionFiltered.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                    />
                  ))}
                </Slider>
              </Box>
              {/* product slider */}
              <Box
                sx={{
                  p: is500 ? 2 : is600 ? 2.5 : 4,
                  mb: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#c4c4d4",
                }}
              >
                <Typography
                  variant={is500 ? "h5" : is600 ? "h4" : "h3"}
                  sx={{ mb: 2 }}
                >
                  Home & Living
                </Typography>

                <Slider {...settings}>
                  {homeAndLivingFiltered.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                    />
                  ))}
                </Slider>
              </Box>
              {/* product slider */}
              <Box
                sx={{
                  p: is500 ? 2 : is600 ? 2.5 : 4,
                  mb: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#c4c4d4",
                }}
              >
                <Typography
                  variant={is500 ? "h5" : is600 ? "h4" : "h3"}
                  sx={{ mb: 2 }}
                >
                  Beauty & Personal Care
                </Typography>

                <Slider {...settings}>
                  {beautyFiltered.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                    />
                  ))}
                </Slider>
              </Box>
              {/* product slider */}
              <Box
                sx={{
                  p: is500 ? 2 : is600 ? 2.5 : 4,
                  mb: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  border: 3,
                  borderRadius: 2,
                  borderColor: "#c4c4d4",
                }}
              >
                <Typography
                  variant={is500 ? "h5" : is600 ? "h4" : "h3"}
                  sx={{ mb: 2 }}
                >
                  Automotive & Outdoors
                </Typography>

                <Slider {...settings}>
                  {automotiveFiltered.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand.name}
                      price={product.price}
                      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                    />
                  ))}
                </Slider>
              </Box>
              {/* pagination */}
              {/* <Stack
                alignSelf={is488 ? "center" : "flex-end"}
                mr={is488 ? 0 : 5}
                rowGap={2}
                p={is488 ? 1 : 0}
              >
                <Pagination
                  size={is488 ? "medium" : "large"}
                  page={page}
                  onChange={(e, page) => setPage(page)}
                  count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                  variant="outlined"
                  shape="rounded"
                />
                <Typography textAlign={"center"}>
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {page * ITEMS_PER_PAGE > totalResults
                    ? totalResults
                    : page * ITEMS_PER_PAGE}{" "}
                  of {totalResults} results
                </Typography>
              </Stack> */}
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};
