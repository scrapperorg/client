import React from 'react';
import styled from "styled-components";
import {Box} from "@mui/material";
import StarsIcon from '@mui/icons-material/Stars';
import WarningIcon from '@mui/icons-material/Warning';
import {DocumentDto} from "services/api/dtos";

const StyledBox = styled(Box)`
  display: flex;
`;

export interface DocumentMarksProps {
    document: DocumentDto;
}

export const DocumentMarks = ({ document }: DocumentMarksProps) => {
    return <StyledBox>
        {document.project.presentsInterest && <StarsIcon color="primary" fontSize="small"/>}
        {document.isRulesBreaker && <WarningIcon color="warning" fontSize="small"/>}
    </StyledBox>
}
