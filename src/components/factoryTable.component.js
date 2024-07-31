import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Divider,
  InputAdornment,
  Paper,
  Chip,
} from "@mui/material";
import { debounce } from "lodash";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TopBreadcrumbs from "./topBreadcrumbs.component";
import {
  getListOfAllSuppliers,
  getSearchResultOfSuppliers,
  getSupplierById,
} from "../reducers/supplier.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getFactoryById,
  getListOfAllFactories,
  getSearchResultOfFactories,
} from "../reducers/factory.reducer";
import { selectOrganisationId } from "../selectors/login.selector";
import {
  selectFactoryCache,
  selectFactoryList,
  selectSearchCount,
  selectSearchResultsFactoryList,
  selectTotalCount,
} from "../selectors/factory.selector";
const FactoryTable = () => {
  const dispatch = useDispatch();

  const factoriesList = useSelector(selectFactoryList);

  const totalCount = useSelector(selectTotalCount);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredFactories, setFilteredFactories] = useState([]);

  const [count, setCount] = useState(totalCount);

  const factoryCache = useSelector((state) => selectFactoryCache(state, page));
  const navigate = useNavigate();

  const organisationId = useSelector(selectOrganisationId);
  const searchCount = useSelector(selectSearchCount);
  const searchResults = useSelector(selectSearchResultsFactoryList);
  useEffect(() => {
    if (searchTerm !== "") {
      setCount(searchCount);
    } else {
      setCount(totalCount);
    }
  }, [totalCount, searchCount]);

  useEffect(() => {
    if (searchTerm !== "") {
      setFilteredFactories(searchResults);
    } else {
      setFilteredFactories(factoriesList);
    }
  }, []);
  useEffect(() => {
    if (factoryCache) {
      setFilteredFactories(factoryCache);
    } else {
      const limit = 8;
      const offset = (page - 1) * limit;

      //   dispatch(getListOfAllSuppliers({ page, limit, offset }));
      dispatch(getListOfAllFactories({ page, limit, offset, organisationId }));
    }
  }, [page, factoryCache]);
  const debouncedFetchFactories = useCallback(
    debounce((term) => {
      dispatch(getSearchResultOfFactories({ search: term }));
    }, 500), // Delay in milliseconds
    []
  );
  useEffect(() => {
    if (searchTerm !== "") {
      let filtered = factoriesList.filter((factory) => {
        const searchFields = [
          factory.name,
          factory.supplierName,
          factory.location,
        ];
        return searchFields.some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      if (filtered && filtered.length === 0 && searchTerm !== "") {
        debouncedFetchFactories(searchTerm);
        // setCount(searchCount);
        filtered = searchResults;
      }

      setFilteredFactories(filtered);
    } else {
      setFilteredFactories(factoryCache);
    }
  }, [searchTerm, searchCount, debouncedFetchFactories]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setCount(totalCount);
    }
  };
  const location = useLocation();

  const navigateToFactoryDetails = (supplierId, factoryId) => {
    dispatch(getFactoryById({ supplierId, factoryId }));
    dispatch(getSupplierById(supplierId));
    navigate(`/suppliers/${supplierId}/factory/${factoryId}`);
  };
  return (
    <Box sx={{ p: 2, mr: 2 }}>
      <TopBreadcrumbs />
      <Typography variant="h6" style={{ fontSize: 20, fontWeight: 600 }}>
        Sites
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ fontSize: 14, fontWeight: 400, marginBottom: 8 }}
      >
        Manage your sites here
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1, mt: 2 }}>
        <TextField
          label="Search site"
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          sx={{ width: "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src="./search.svg" alt="Search" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px", // Set the border radius here
          overflow: "hidden", // Hide the border overflow
          margin: "0 auto", // Center the table horizontally
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
            }}
          >
            <TableRow>
              <TableCell sx={{ width: "20%" }}>Site Name</TableCell>
              <TableCell sx={{ width: "15%" }}>Site ID</TableCell>
              <TableCell sx={{ width: "20%" }}>Country</TableCell>
              <TableCell sx={{ width: "10%" }}>Tier</TableCell>
              <TableCell sx={{ width: "20%" }}>Suppliers</TableCell>
              <TableCell sx={{ width: "20%" }}>Action Alert</TableCell>
              <TableCell sx={{ width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFactories &&
              filteredFactories.length > 0 &&
              filteredFactories.map((factory) => (
                <TableRow
                  key={factory.factoryId}
                  sx={{
                    "& td": {
                      padding: "8px 16px",
                      borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    },
                  }}
                >
                  <TableCell>{factory?.name}</TableCell>
                  <TableCell>{factory?.factoryIdFromMetadata || "-"}</TableCell>
                  <TableCell>{factory?.location}</TableCell>
                  <TableCell>{factory?.tier || "-"}</TableCell>
                  <TableCell>{factory?.supplierName || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={factory?.actionAlert || "No"}
                      sx={{
                        borderRadius: "16px",
                        fontWeight: 500,
                        fontSize: 12,
                        backgroundColor:
                          factory?.actionAlert == "Yes" ? "#FECDCA" : "#F2F4F7",
                        color:
                          factory?.actionAlert == "Yes" ? "#B42318" : "default",
                      }}
                    />{" "}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigateToFactoryDetails(
                          factory.supplierId,
                          factory.factoryId
                        )
                      }
                      sx={{
                        backgroundColor: "#6172F3",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#5667e2",
                          fontWeight: "bold",
                        },
                        textTransform: "none",
                        width: "79px",
                        height: "40px",
                        borderRadius: "8px",
                      }}
                      size="small"
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {searchTerm !== "" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 24px 16px 24px",
            }}
          ></Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 24px 16px 24px",
            }}
          >
            <Button
              variant="outlined"
              disabled={page === 1}
              startIcon={<NavigateBeforeIcon />}
              onClick={(e) => handlePageChange(e, page - 1)}
              sx={{
                width: "111px",
                height: "36px",
                padding: "8px 12px",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                backgroundColor: "white",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "white",
                  color: "text.primary",
                  fontWeight: "bold",
                },

                textTransform: "none",
              }}
            >
              Previous
            </Button>

            <Pagination
              count={count}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              showFirstButton={false}
              showLastButton={false}
              hideNextButton={true}
              hidePrevButton={true}
              sx={{
                "& .MuiPaginationItem-root": {
                  border: "none",
                },
                "& .Mui-selected": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white",
                },
              }}
            />

            <Button
              variant="outlined"
              endIcon={<NavigateNextIcon />}
              disabled={page === count}
              onClick={(e) => handlePageChange(e, page + 1)}
              sx={{
                width: "111px",
                height: "36px",
                padding: "8px 12px",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                backgroundColor: "white",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "white",
                  color: "text.primary",
                  fontWeight: "bold",
                },

                textTransform: "none",
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default FactoryTable;
