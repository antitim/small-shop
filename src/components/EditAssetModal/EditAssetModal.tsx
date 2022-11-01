import React, { FC, useCallback, useEffect, useState } from "react";
import { AssetsModel, CreateAssetsModel } from "../../api/assets";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";

interface EditAssetModalProps {
  asset: AssetsModel | CreateAssetsModel | undefined;
  onSave: () => void;
  onCancel: () => void;
}

export const EditAssetModal: FC<EditAssetModalProps> = ({
  asset,
  onSave,
  onCancel,
}) => {
  const [isOpen, setOpen] = useState<boolean>(Boolean(asset));
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    setOpen(Boolean(asset));
  }, [asset]);

  const saveHandler = useCallback(() => {
    onSave();
    handleClose();
  }, [onSave, handleClose]);

  const cancelHandler = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  if (!asset) return null;

  const isEditing = "id" in asset;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {isEditing && <DialogTitle>Editing {asset.title}</DialogTitle>}
      {!isEditing && <DialogTitle>Creating asset</DialogTitle>}
      <DialogContent>
        <>
          {isEditing && asset.previewUrl && (
            <Box sx={{ position: "relative" }}>
              <Box m={2} sx={{ position: "absolute", right: 0 }}>
                <Button variant="contained" color="error">
                  Delete Image
                </Button>
              </Box>
              <img width="100%" src={asset.previewUrl} />
            </Box>
          )}
          {(!isEditing || !asset.previewUrl) && (
            <Button variant="contained" component="label">
              Upload Image
              <input hidden accept="image/*" type="file" />
            </Button>
          )}
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            defaultValue={asset.title}
          />
          <TextField
            margin="dense"
            type="number"
            label="Price"
            fullWidth
            variant="standard"
            defaultValue={asset.price}
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
          />
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={saveHandler} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
