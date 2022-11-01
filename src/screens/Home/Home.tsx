import React, { FC } from "react";
import { Grid } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { AssetsModel } from "../../api/assets";
import { AssetCard } from "../../components/AssetCard";
import { WithLoader } from "../../components/WithLoader";

export const Home: FC = () => {
  const { data, error } = useSWR<{ results: AssetsModel[] }>(
    "/api/assets.json",
    fetcher
  );

  return (
    <WithLoader isData={Boolean(data)} isError={error}>
      <Grid container spacing={2}>
        {(data ? data.results : []).map((asset) => (
          <Grid item xs={3} key={asset.id}>
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </WithLoader>
  );
};
