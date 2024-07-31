import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";

import { selectAuditData } from "../../selectors/audit.selector";

const ListOfAuditDocuments = ({ includeType = "export" }) => {
  const selectedAuditData = useSelector(selectAuditData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAuditData) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [selectedAuditData]);
  if (!selectedAuditData || selectedAuditData.files.length === 0) {
    return null;
  }
  return (
    <Card
      style={{
        padding: "0px 32px",
        boxShadow:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

        border: "1px solid rgba(234, 236, 240, 1)",
        borderRadius: "12px",
        marginTop: 8,
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography
              sx={{ fontWeight: 700, fontSize: 16, color: "#344054" }}
            >
              Supporting Documents
            </Typography>
          </Grid>
          <Grid item>
            {/* <Button
              variant="outlined"
              sx={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--Gray-300, #D0D5DD)",
                background: "var(--Base-White, #FFF)",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                fontWeight: 600,
                fontSize: 14,
                color: "#344054",
                textTransform: "none",
              }}
            >
              Manage
            </Button> */}
          </Grid>
        </Grid>

        {/* Actual information */}

        <Grid container spacing={2} sx={{ mb: 1 }}>
          {selectedAuditData.files
            ?.filter((audit) => audit.type === includeType)
            .map((audit) => (
              <Grid item xs={2} sx={{ mx: 1 }}>
                <Link
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                    textDecoration: "underline",
                    textDecorationColor: "#45464E",
                    "&:hover": {
                      textDecorationColor: "rgba(69, 70, 78, 0.8)",
                    },
                  }}
                  href={audit.url}
                  target="_blank"
                >
                  {audit?.name}
                </Link>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ListOfAuditDocuments;
