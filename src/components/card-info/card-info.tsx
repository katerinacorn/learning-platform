import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    ImageListItemBar, IconButton, Typography, Chip, Box,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { CourseContext } from '../../App';
import InfoIcon from '@mui/icons-material/Info';

interface Lesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
    meta: any[];
}

interface Props {
    id: string;
    title: string;
    lessonsCount: number;
    lessons?: Lesson[];
    meta?: {
        skills?: string[];
    };
    rating: number;
}

const CardInfo = ({ id, title, lessonsCount, meta = {}, rating }: Props) => {
    const { courseID, setCourseID } = useContext(CourseContext);
    //console.log('setCourseID: ', setCourseID);
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/${id}`);
        setCourseID(id);
    };
    return (
        <ImageListItemBar
            sx={{ padding: '0 10px' }}
            position="below"
            title={(
                <Box>
                    <Typography>{title}</Typography>
                    <Rating size="small" name="half-rating-read" precision={0.1} value={rating} readOnly />
                </Box>
            )}
            subtitle={(
                <Box display="flex" flexDirection="column" flexWrap="wrap">
                    <Typography variant="caption" color="textSecondary">
                        Lessons:
                        {' '}
                        {lessonsCount}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                        {meta.skills?.map((skill) => (
                            <Chip key={skill} label={skill} color="primary" variant="filled" size="small" sx={{ fontSize: '10px' }} />
                        ))}
                    </Box>
                </Box>
            )}
            actionIcon={(
                <IconButton
                    aria-label={`info about ${title}`}
                    onClick={handleItemClick}
                    color="primary"
                >
                    <InfoIcon />
                </IconButton>
            )}
        />
    );
};

export default CardInfo;
