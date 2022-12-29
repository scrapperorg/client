import Grid from "@mui/material/Grid";
import {Button, Card, CardContent, Chip, Stack} from "@mui/material";
import React from "react";

function DocumentAttachments() {
    return (
        <Grid container spacing={4}>
            <Grid item md={10}>
                <Card>
                    <CardContent>
                        <Chip label="Atasamente" color="primary" size="medium" sx={{mb: 3}}/>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item md={2}>
                <Stack gap={4}>
                    <Button variant='contained'>Ataseaza document</Button>
                </Stack>
            </Grid>
        </Grid>);
}

export default React.memo(DocumentAttachments);
