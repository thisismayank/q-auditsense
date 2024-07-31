import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Grid,
} from "@mui/material";

const TwoLineCard = ({ title, nextAuditDate, inHowManyDays }) => {
  return (
    <Card
      variant="outlined"
      style={{
        marginBottom: 24,
        borderRadius: 7,
        border: "1px solid var(--Gray-300, #D0D5DD)",
        background: "#FFF",
        boxShadow:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        minHeight: 182,
      }}
    >
      <CardContent style={{ padding: "16px 32px" }}>
        {title && (
          <Typography
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#344054",
              marginBottom: 10,
            }}
          >
            {title}
          </Typography>
        )}
        <Divider />
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={inHowManyDays ? 6 : 12}>
            {nextAuditDate && (
              <Typography
                style={{
                  color: "#344054",
                  fontFamily: "Inter",
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  letterSpacing: "-0.72px",
                }}
              >
                {nextAuditDate}
              </Typography>
            )}
          </Grid>
          {inHowManyDays && (
            <Grid item xs={6}>
              <Button
                sx={{
                  borderRadius: "8.534px",
                  border: "1.422px solid var(--Gray-300, #D0D5DD)",
                  background: "var(--Base-White, #FFF)",
                  textTransform: "none",
                  color: "#344054",
                  textAlign: "center",
                  fontSize: "19.913px",
                  fontWeight: 500,
                  padding: "16px 32px 32px 32px",
                }}
              >
                {nextAuditDate ? "In 302 days" : "No Next Audit Date"}
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TwoLineCard;
