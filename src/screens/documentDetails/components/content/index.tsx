import {Box, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {DocumentDetailsContext} from 'screens/documentDetails/context';
import Grid from "@mui/material/Grid";
import WarningIcon from '@mui/icons-material/Warning';
import DocumentGeneralData from "../documentGeneralData";
import DocumentActivity from "../documentActivity";
import DocumentProcessedData from "../documentProcessedData";
import DocumentAttachments from "../documentAttachments";

export default function DocumentDetailsContent() {

    const {document} = useContext(DocumentDetailsContext);

    if (!document) return null

    return (
        <>
            <Grid container>
                <Grid item md={10}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Typography variant='h2'>
                                Document
                            </Typography>
                        </Grid>
                        {document.isRulesBreaker &&
                            <Grid item>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <WarningIcon color="warning" fontSize="medium" sx={{mr: 2}}/>
                                    <Typography>Acest document contravine normelor in vigoare</Typography>
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{mb: 4}}>
                <DocumentGeneralData document={document}/>
            </Box>

            <Box sx={{mb: 4}}>
                <DocumentActivity document={document}/>
            </Box>

            <Box sx={{mb: 4}}>
                <DocumentProcessedData/>
            </Box>

            <Box sx={{mb: 4}}>
                <DocumentAttachments/>
            </Box>

        </>
    );
}