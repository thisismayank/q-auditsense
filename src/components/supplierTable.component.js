import React, { useEffect, useState, useCallback } from "react";
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
  Grid,
} from "@mui/material";
import { debounce } from "lodash";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TopBreadcrumbs from "./topBreadcrumbs.component";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  getListOfAllSuppliers,
  getSearchResultOfSuppliers,
  getSupplierById,
} from "../reducers/supplier.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  selectSearchCount,
  selectSearchResultsSupplierList,
  selectSupplierCache,
  selectSupplierList,
  selectTotalCount,
} from "../selectors/supplier.selector";
import SupplierModal from "./supplierModal.component";

const SupplierTable = () => {
  const dispatch = useDispatch();
  const suppliersList = useSelector(selectSupplierList);

  const totalCount = useSelector(selectTotalCount);
  const searchResults = useSelector(selectSearchResultsSupplierList);
  const searchCount = useSelector(selectSearchCount);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [count, setCount] = useState(totalCount);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const supplierCache = useSelector((state) =>
    selectSupplierCache(state, page)
  );
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (searchTerm !== "") {
      setCount(searchCount);
    } else {
      setCount(totalCount);
    }
  }, [totalCount, searchCount]);
  useEffect(() => {
    if (searchTerm !== "") {
      setFilteredSuppliers(searchResults);
    } else {
      setFilteredSuppliers(suppliersList);
    }
  }, []);
  useEffect(() => {
    if (supplierCache) {
      setFilteredSuppliers(supplierCache);
    } else {
      const limit = 8;
      const offset = (page - 1) * limit;
      dispatch(getListOfAllSuppliers({ page, limit, offset }));
    }
  }, [page, supplierCache, dispatch]);
  const debouncedFetchSuppliers = useCallback(
    debounce((term) => {
      dispatch(getSearchResultOfSuppliers({ search: term }));
    }, 500), // Delay in milliseconds
    []
  );
  useEffect(() => {
    if (searchTerm !== "") {
      let filtered = suppliersList.filter((supplier) => {
        const searchFields = [supplier.name, supplier.country];
        return searchFields.some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      if (filtered && filtered.length === 0 && searchTerm !== "") {
        debouncedFetchSuppliers(searchTerm);
        setCount(searchCount);
        filtered = searchResults;
      }
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(supplierCache);
    }
  }, [searchTerm, searchCount, debouncedFetchSuppliers]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setCount(totalCount);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedSuppliers = React.useMemo(() => {
    if (sortConfig.key) {
      return [...filteredSuppliers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredSuppliers;
  }, [filteredSuppliers, sortConfig]);

  const location = useLocation();

  const navigateToSupplierDetails = (supplierId) => {
    dispatch(getSupplierById(supplierId));
    // dispatch(getListOfAllFactories({ limit: 8, offset: 0, supplierId }));
    navigate(`${location.pathname}/${supplierId}`);
  };

  return (
    <Box sx={{ p: 2, mr: 2 }}>
      <TopBreadcrumbs />
      <Typography variant="h6" style={{ fontSize: 20, fontWeight: 600 }}>
        Suppliers
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ fontSize: 14, fontWeight: 400, marginBottom: 8 }}
      >
        Manage your suppliers here
      </Typography>
      <Divider />
      <Grid container justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "#6172F3",
              color: "white",
              "&:hover": {
                backgroundColor: "#5667e2",
                fontWeight: "bold",
              },
              textTransform: "none",
              width: "120px",
              height: "40px",
              borderRadius: "8px",
            }}
            size="small"
          >
            Add suppliers
          </Button>
        </Grid>
        <SupplierModal open={modalOpen} handleClose={handleCloseModal} />

        <Grid item>
          <TextField
            label="Search supplier"
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
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px", // Set the border radius here
          overflow: "hidden", // Hide the border overflow
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
            }}
          >
            <TableRow>
              <TableCell sx={{ width: "15%" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      color: "#475467",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Supplier Name
                  </Typography>
                  <SwapVertIcon
                    sx={{
                      cursor: "pointer",
                      marginLeft: "4px",
                    }}
                    onClick={() => handleSort("name")}
                  />
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: "10%",
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleSort("supplierIdFromMetadata")}
              >
                Supplier ID
              </TableCell>
              <TableCell
                sx={{
                  width: "10%",
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleSort("country")}
              >
                Country
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleSort("totalFactory")}
              >
                Total Site Count
              </TableCell>
              <TableCell
                sx={{
                  width: "10%",
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleSort("tier1")}
              >
                Tier 1
              </TableCell>
              <TableCell
                sx={{
                  width: "10%",
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleSort("tier2")}
              >
                Tier 2
              </TableCell>
              <TableCell
                sx={{
                  width: "10%",
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                Action Alert
              </TableCell>
              <TableCell sx={{ width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSuppliers &&
              sortedSuppliers.length > 0 &&
              sortedSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.supplierId}
                  sx={{
                    "& td": {
                      padding: "8px 16px",
                      borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    },
                  }}
                >
                  <TableCell>{supplier?.name}</TableCell>
                  <TableCell>
                    {supplier?.supplierIdFromMetadata || "–"}
                  </TableCell>
                  <TableCell>{supplier?.country}</TableCell>
                  <TableCell
                    sx={{ borderLeft: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    {supplier?.factoryData?.totalFactories || "-"}
                  </TableCell>
                  <TableCell>{supplier?.factoryData?.tier1 || "-"}</TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    {supplier?.factoryData?.tier2 || "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={supplier?.actionAlert}
                      sx={{
                        borderRadius: "16px",
                        fontWeight: 500,
                        fontSize: 12,
                        backgroundColor:
                          supplier?.actionAlert == "Yes"
                            ? "#FECDCA"
                            : "#F2F4F7",
                        color:
                          supplier?.actionAlert == "Yes"
                            ? "#B42318"
                            : "default",
                      }}
                    />{" "}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigateToSupplierDetails(supplier?.supplierId)
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

export default SupplierTable;
