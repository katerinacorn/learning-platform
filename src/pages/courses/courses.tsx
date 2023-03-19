import React, { useEffect, useState, useContext } from 'react';
import {
    Container, useMediaQuery, Stack, Box, Pagination, Typography, ImageList, ImageListItem,
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import { getCourses } from '../../services/courses-fetch-service';
import CardInfo from '../../components/card-info/card-info';
import theme from '../../styles';
import { CourseContext } from '../../App';

interface ICourse {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: string;
    description: string;
    duration: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink: string;
    rating: number;
    meta: {
        slug: string;
        skills: string[];
        courseVideoPreview: {
            link: string;
            duration: number;
            previewImageLink: string;
        };
    };
}

interface CourseData {
    courses: ICourse[];
}
const Courses = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ICourse[]>([]);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const { courseID, setCourseID } = useContext(CourseContext);

    function sliceCourses(courses: ICourse[], page: number, pageSize: number): ICourse[] {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return courses.slice(startIndex, endIndex);
    }

    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.launchDate).getTime();
        const dateB = new Date(b.launchDate).getTime();
        return dateB - dateA;
    });
    const courses = sliceCourses(sortedData, page, 10);

    useEffect(() => {
        getCourses().then((response: CourseData) => { setData(response.courses); setCount(response.courses.length); });
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Container maxWidth="xl">
            <Box m="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography variant="h2" component="h1">Available courses</Typography>

                <ImageList sx={{ width: '100%', height: '100%' }} gap={8} cols={isMobile ? 1 : 2} rowHeight="auto">
                    {courses.map((course) => {
                        const {
                            id, previewImageLink, title, lessonsCount, rating, meta,
                        } = course;
                        return (
                            <ImageListItem
                                key={id}
                                onClick={() => {
                                    navigate(`/${id}`);
                                    setCourseID(id);
                                }}
                                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#4c4c4c0f" } }}>
                                <img
                                    src={`${previewImageLink}/cover.webp`}
                                    srcSet={`${previewImageLink}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={title}
                                    loading="lazy"
                                />
                                <CardInfo id={id} title={title} rating={rating} meta={meta} lessonsCount={lessonsCount} />
                            </ImageListItem>
                        );
                    })}
                </ImageList>

                <Stack spacing={2}>
                    <Pagination count={Math.ceil(count / 10)} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
                </Stack>

            </Box>

            <Outlet />
        </Container>
    );
};

export default Courses;
