import React, { FC, useCallback, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { AssetsModel, CreateAssetsModel } from "../../api/assets";
import { WithLoader } from "../../components/WithLoader";
import { fetcher } from "../../utils/fetcher";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Button,
  Box,
} from "@mui/material";

import { Delete, Edit, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal";
import { EditAssetModal } from "../../components/EditAssetModal";

export const Dashboard: FC = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR<{ results: AssetsModel[] }>(
    "/api/assets.json",
    fetcher
  );

  const [assetToDelete, setAssetToDelete] = useState<AssetsModel>();
  const [assetToEdit, setAssetToEdit] = useState<
    AssetsModel | CreateAssetsModel
  >();

  const createHandler = useCallback(() => {
    setAssetToEdit({
      title: "",
      price: 0,
    });
  }, []);

  const deleteHandler = useCallback(() => {
    const deletingId = assetToDelete ? assetToDelete.id : undefined;
    mutate(
      "/api/assets.json",
      (resp: { results: AssetsModel[] }) => {
        return {
          results: resp.results.filter((item) => item.id !== deletingId),
        };
      },
      {
        revalidate: false,
      }
    );
    setAssetToDelete(undefined);
  }, [setAssetToDelete, assetToDelete, mutate]);

  const cancelDeleteHandler = useCallback(() => {
    setAssetToDelete(undefined);
  }, [setAssetToDelete]);

  const editHandler = useCallback(() => {
    // make edit request
    mutate("/api/assets.json");
    setAssetToEdit(undefined);
  }, [setAssetToDelete, mutate]);

  const cancelEditHandler = useCallback(() => {
    setAssetToEdit(undefined);
  }, [setAssetToDelete]);

  const reorder = useCallback(
    (id: number, newPosition: number) => {
      mutate(
        "/api/assets.json",
        (resp: { results: AssetsModel[] }) => {
          const asset = resp.results.find((item) => item.id === id);

          if (asset) {
            const reordered = resp.results.filter((item) => item.id !== id);
            reordered.splice(newPosition, 0, asset);

            return {
              results: reordered,
            };
          }

          return resp;
        },
        {
          revalidate: false,
        }
      );
    },
    [mutate]
  );

  return (
    <WithLoader isData={Boolean(data)} isError={error}>
      <Box mb={2}>
        <Button onClick={createHandler} variant="contained">
          Create asset
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "50px" }}>Preview</TableCell>
              <TableCell sx={{ width: "50px" }}>ID</TableCell>
              <TableCell sx={{ width: "80px" }}>Preview</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Price, $</TableCell>
              <TableCell align="right" sx={{ width: "50px" }}></TableCell>
              <TableCell align="right" sx={{ width: "50px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data ? data.results : []).map((asset, idx, assets) => (
              <TableRow key={asset.id}>
                <TableCell align="right">
                  <Box sx={{ dispaly: "flex", flexDirection: "column" }}>
                    {idx !== 0 && (
                      <IconButton
                        size="small"
                        onClick={() => reorder(asset.id, idx - 1)}
                      >
                        <ArrowUpward />
                      </IconButton>
                    )}
                    {idx !== assets.length - 1 && (
                      <IconButton
                        size="small"
                        onClick={() => reorder(asset.id, idx + 1)}
                      >
                        <ArrowDownward />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{asset.id}</TableCell>
                <TableCell>
                  <Avatar
                    alt={asset.title}
                    src={asset.previewUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {asset.title}
                </TableCell>
                <TableCell align="right">{asset.price}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => setAssetToEdit(asset)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => setAssetToDelete(asset)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDeleteModal
        asset={assetToDelete}
        onDelete={deleteHandler}
        onCancel={cancelDeleteHandler}
      />
      <EditAssetModal
        asset={assetToEdit}
        onSave={editHandler}
        onCancel={cancelEditHandler}
      />
    </WithLoader>
  );
};
