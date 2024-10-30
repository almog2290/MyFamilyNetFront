import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  },
  button: {
    position: 'relative',
    zIndex: 2
  }
}));

// ==============================|| Catalog - PAGE CARD ||============================== //

const PageCard = ({ isLoading, page, icon }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleShow = () => {
    //navigate to page and props page
    navigate(`/page?id=${page.id}&name=${page.name}&desc=${page.description}`);
  };

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0, flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: 'warning.light',
                      color: page?.description === 'Meeting attends' ? 'error.dark' : 'warning.dark'
                    }}
                  >
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: isSmallScreen ? 1 : 0.45, mb: isSmallScreen ? 1 : 0.45, textAlign: isSmallScreen ? 'center' : 'left' }}
                  primary={<Typography variant="h4">{page?.name}</Typography>}
                  secondary={
                    !isSmallScreen && (
                      <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.5 }}>
                        {page?.description}
                      </Typography>
                    )
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', ml: isSmallScreen ? 0 : 2, mt: isSmallScreen ? 1 : 0 }}>
                  <PeopleIcon sx={{ color: 'grey.500', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: 'grey.700', fontWeight: 'bold' }}>
                    Followers: {page?.followers}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: isSmallScreen ? 0 : 2, mt: isSmallScreen ? 1 : 0 }}>
                  <PostAddIcon sx={{ color: 'grey.500', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: 'grey.700', fontWeight: 'bold' }}>
                    Posts: {page?.posts}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="warning"
                  endIcon={<PreviewIcon />}
                  sx={{ ml: isSmallScreen ? 0 : 2, mt: isSmallScreen ? 1 : 0 }}
                  onClick={handleShow}
                >
                  Show
                </Button>
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

PageCard.propTypes = {
  isLoading: PropTypes.bool,
  page: PropTypes.object,
  icon: PropTypes.node
};

export default PageCard;