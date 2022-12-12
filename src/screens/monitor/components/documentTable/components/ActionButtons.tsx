import {Box, IconButton} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  display: flex;
`;

export const ActionButtons = () => {

    return (
        <StyledBox>
            <IconButton>
                <DownloadIcon fontSize='small' />
            </IconButton>
            <IconButton>
                <RemoveRedEyeIcon fontSize='small' />
            </IconButton>
            <IconButton>
                <SearchIcon fontSize='small' />
            </IconButton>
        </StyledBox>
    )
}

