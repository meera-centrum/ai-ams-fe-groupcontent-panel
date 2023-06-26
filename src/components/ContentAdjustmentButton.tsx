import { ArrowDropDown, Tune } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC, useCallback } from "react";
import { ContentAdjustmentPopover } from "./ContentAdjustmentPopover";
import { ContentAdjustment } from "./content-adjustment";

interface ContentAdjustmentButtonProps {
  contentAdjustment: ContentAdjustment;
  onSelectContentAdjustment: (contentAdjustment: ContentAdjustment) => void;
}

export const ContentAdjustmentButton: FC<ContentAdjustmentButtonProps> = ({
  contentAdjustment,
  onSelectContentAdjustment,
}) => {
  /* States */
  const [anchorElement, setAnchorElement] =
    React.useState<HTMLButtonElement | null>(null);

  /* Callbacks */
  const handleClosePopover = () => {
    setAnchorElement(null);
  };
  //
  const handleSelect = (contentAdjustment: ContentAdjustment) => {
    onSelectContentAdjustment(contentAdjustment);
  };
  //
  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget);
    },
    [setAnchorElement]
  );

  return (
    <>
      <Button
        size="small"
        startIcon={<Tune />}
        endIcon={<ArrowDropDown />}
        onClick={handleButtonClick}
        style={{
          textTransform: "none",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Adjust
      </Button>
      <ContentAdjustmentPopover
        anchorElement={anchorElement}
        contentAdjustment={contentAdjustment}
        onClose={handleClosePopover}
        onSelect={handleSelect}
      />
    </>
  );
};
