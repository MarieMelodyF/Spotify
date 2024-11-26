import React from "react";
import { Box } from "@mui/material";

interface BoxPanelProps {
  children: React.ReactNode;
}

interface BoxPanelProps {
  children: React.ReactNode;
  maxwdith?: string | number;
  borderRadius?: number;
  padding?: number;
  bgcolor?: string;
}

const BoxPanel: React.FC<BoxPanelProps> = ({
  children,
  maxwdith = "400",
  borderRadius = 2,
  padding = 2,
  bgcolor = "background.default",
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: bgcolor,
        padding: padding,
        backgroundColor: "rgb(30, 55, 31)",
        borderRadius: borderRadius,
        maxwdith: maxwdith,
      }}
    >
      {children}
    </Box>
  );
};

export default BoxPanel;
