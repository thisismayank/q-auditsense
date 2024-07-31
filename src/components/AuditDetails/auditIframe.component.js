import React from "react";
import { Grid, Skeleton, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuditXlsxFile } from "../../selectors/audit.selector";

const AuditIframe = () => {
  const selectedIframeData = useSelector(selectAuditXlsxFile);

  return (
    <Box sx={{ px: 4 }}>
      {selectedIframeData && selectedIframeData[0]?.url ? (
        <iframe
          style={{
            width: "100%",
            height: "700px",
            border: "1px solid var(--Border-200, #E5E5E5)",
            borderRadius: "10px",
          }}
          src={selectedIframeData[0].iframeUrl}
        ></iframe>
      ) : (
        [...Array(10)].map((_, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={3}>
              <Skeleton
                height={50}
                animation={index % 2 === 0 ? "wave" : "pulse"}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                height={50}
                animation={index % 2 === 0 ? "pulse" : "wave"}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                height={50}
                animation={index % 2 === 0 ? "wave" : "pulse"}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                height={50}
                animation={index % 2 === 0 ? "pulse" : "wave"}
              />
            </Grid>
          </Grid>
        ))
      )}
    </Box>
  );
};

export default AuditIframe;
