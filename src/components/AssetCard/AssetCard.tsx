import React, { FC } from "react";
import { AssetsModel } from "../../api/assets";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

interface AssetCardProps {
  asset: AssetsModel;
}

export const AssetCard: FC<AssetCardProps> = ({ asset }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={asset.previewUrl}
        alt={asset.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {asset.title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {asset.price} $
        </Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<ShoppingCart />}>Buy</Button>
      </CardActions>
    </Card>
  );
};
