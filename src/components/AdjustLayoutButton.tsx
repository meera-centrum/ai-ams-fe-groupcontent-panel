import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { AdjustLayoutPopover } from "./AdjustLayoutPopover";
import { Tune } from "@mui/icons-material";
import { GroupLayout } from "./group-layout";

interface AdjustLayoutButtonProps {
  groupLayout: GroupLayout;
  onSelectGroupLayout: (groupLayout: GroupLayout) => void;
}

export const AdjustLayoutButton: React.FC<AdjustLayoutButtonProps> = ({
  groupLayout,
  onSelectGroupLayout,
}) => {
  /* States */
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );

  /* Callbacks */
  const handleClosePopover = () => {
    setAnchorElement(null);
  };
  //
  const handleSelect = (groupLayout: GroupLayout) => {
    onSelectGroupLayout(groupLayout);
  };
  //
  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget);
    },
    [setAnchorElement]
  );

  /* Renderer */
  return (
    <>
      <Button
        variant="contained"
        startIcon={<Tune />}
        style={{
          backgroundColor: "#f4f6f8",
          color: "#737d97",
          boxShadow: "none",
          textTransform: "none",
          fontWeight: "bold",
        }}
        onClick={handleButtonClick}
      >
        Layout
      </Button>
      <AdjustLayoutPopover
        anchorElement={anchorElement}
        groupLayout={groupLayout}
        onClose={handleClosePopover}
        onSelect={handleSelect}
      />
    </>
  );
};
