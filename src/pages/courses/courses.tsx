import {
    Container, Stack, Pagination, Typography,
} from '@mui/material';

export const Courses = () => (
    <Container>
        <Typography variant="h1" component="h1">Courses!</Typography>

        <Stack spacing={2}>
            <Pagination count={10} variant="outlined" color="primary" />
        </Stack>
    </Container>
);
