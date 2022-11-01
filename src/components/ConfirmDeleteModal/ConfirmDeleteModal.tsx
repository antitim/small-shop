import React, { FC, useCallback, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { AssetsModel } from "../../api/assets";

interface ConfirmDeleteModalProps {
  asset: AssetsModel | undefined;
  onCancel: () => void;
  onDelete: () => void;
}

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  asset,
  onCancel,
  onDelete,
}) => {
  const [isOpen, setOpen] = useState<boolean>(Boolean(asset));
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    setOpen(Boolean(asset));
  }, [asset]);

  const deleteHandler = useCallback(() => {
    onDelete();
    handleClose();
  }, [onDelete, handleClose]);

  const cancelHandler = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  if (!asset) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Do you want delete {asset.title}</DialogTitle>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={deleteHandler} autoFocus variant="contained">
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
