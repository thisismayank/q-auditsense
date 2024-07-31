import { styled } from "@mui/material/styles";

export const TextFieldQuestionnaire = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    // backgroundColor: "#f4f4f4", // Example style: background color
  },
  "& .MuiInputLabel-root": {
    color: "#333",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc", // Example style: border color
    },
    "&:hover fieldset": {
      borderColor: "#999", // Example style: border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#666", // Example style: border color when focused
    },
  },
}));
