import React, { FC, useCallback } from "react";
import { Check, DeleteOutline, Replay } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ContentAdjustmentButton } from "./ContentAdjustmentButton";
import { ContentAdjustment } from "./content-adjustment";

interface GroupCardActionsProps {
  keepIt: boolean;
  contentAdjustment: ContentAdjustment;
  keepItChanged: (keepIt: boolean) => void;
  contentAdjustmentChanged: (contentAdjustment: ContentAdjustment) => void;
}

export const GroupCardActions: FC<GroupCardActionsProps> = ({
  keepIt,
  contentAdjustment,
  keepItChanged,
  contentAdjustmentChanged,
}) => {
  /* Callbacks */
  const handleKeepItClick = useCallback(() => {
    keepItChanged(!keepIt);
  }, [keepItChanged, keepIt]);
  //
  const handleSelectContentAdjustment = useCallback(
    (contentAdjustment: ContentAdjustment) => {
      contentAdjustmentChanged(contentAdjustment);
    },
    [contentAdjustmentChanged]
  );

  /* Renderer */
  return (
    <>
      <Button
        size="small"
        startIcon={<Check />}
        style={{
          backgroundColor: keepIt ? "#F2F7FF" : "",
          textTransform: "none",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
        onClick={handleKeepItClick}
      >
        Keep It
      </Button>
      <Button
        size="small"
        startIcon={<Replay />}
        style={{
          textTransform: "none",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Try Again
      </Button>
      <Button
        size="small"
        startIcon={<DeleteOutline />}
        style={{
          textTransform: "none",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Delete
      </Button>
      <ContentAdjustmentButton
        contentAdjustment={contentAdjustment}
        onSelectContentAdjustment={handleSelectContentAdjustment}
      />
    </>
  );
};
