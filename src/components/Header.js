import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Box,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
  } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupIcon from '@mui/icons-material/Group';
import ShareIcon from '@mui/icons-material/Share';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function Header({ onSearch, initialTitle = "Team Task Management" }) {
    const [title, setTitle] = useState(initialTitle);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
  
    const handleOpenEditModal = () => {
      setIsEditModalOpen(true);
      setEditedTitle(title);
    };
  
    const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
    };
  
    const handleSaveTitle = () => {
      setTitle(editedTitle);
      setIsEditModalOpen(false);
    };
  
    return (
      <>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <EditNoteIcon sx={{ fontSize: 30, mr: 1 }} />
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 0, 
                mr: 4, 
                cursor: 'pointer' 
              }}
              onClick={handleOpenEditModal}
            >
              {title}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search cards..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => onSearch(e.target.value)}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<ShareIcon />}
                variant="outlined"
                size="small"
              >
                Share
              </Button>
              <Button
                startIcon={<GroupIcon />}
                variant="outlined"
                size="small"
              >
                Members (1)
              </Button>
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
  
        <Dialog 
          open={isEditModalOpen} 
          onClose={handleCloseEditModal}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Edit Project Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Project Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
            <Button onClick={handleSaveTitle} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
  export default Header;
  